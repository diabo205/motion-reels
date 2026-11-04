#!/usr/bin/env python3
"""
Audio Transient & Onset/Drop Analysis Engine (60 FPS)
Replaces static BPM beat grids with true audio transient analysis (via Librosa or Aubio).

Detects:
  - Dynamic beats & bars (tempo tracking)
  - Audio energy peaks (broadband RMS & spectral flux peaks)
  - Bass drops (sub-bass 20-220Hz sudden power surges & drop releases)
  - Cymbal crashes (high-band 3500-11000Hz transient bursts with high spectral centroid)
  - Rhythmic note onsets

Drives:
  - Transient-quantized scene cuts (120-168 frames / 2.0s-2.8s) snapped to actual drops and crashes
  - STRUCTURAL_FRACTURE impact hits, red payoff text slams, and SFX trigger frames
  - Perceptual SFX lead (-2 frames / -33ms) and automatic soundtrack ducking
"""
import json
import math
import os
import struct
import subprocess
import sys
import tempfile
import wave

# Load canonical constants from config/pipeline_constants.json
CONSTANTS_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))),
    "config",
    "pipeline_constants.json",
)
try:
    with open(CONSTANTS_PATH, "r", encoding="utf-8") as cf:
        CONSTANTS = json.load(cf)
except Exception:
    CONSTANTS = {}

FPS = CONSTANTS.get("FPS", 60)
MAX_FRAMES = CONSTANTS.get("MAX_FRAMES", 3500)
MIN_SCENE_FRAMES = CONSTANTS.get("MIN_SCENE_FRAMES", 120)
TARGET_MAX_SCENE_FRAMES = CONSTANTS.get("TARGET_MAX_SCENE_FRAMES", 168)
PAYOFF_WINDOW = CONSTANTS.get("PAYOFF_BEAT_WINDOW_FRAMES", [18, 45])
SFX_LEAD_FRAMES = CONSTANTS.get("SFX_PERCEPTUAL_LEAD_FRAMES", 2)


def get_audio_duration(audio_path: str) -> float:
    try:
        cmd = [
            "ffprobe",
            "-i",
            audio_path,
            "-show_entries",
            "format=duration",
            "-v",
            "quiet",
            "-of",
            "csv=p=0",
        ]
        output = subprocess.check_output(cmd, text=True, stderr=subprocess.DEVNULL).strip()
        return round(float(output), 3)
    except Exception:
        return round(MAX_FRAMES / FPS, 2)


def normalize_array(arr):
    import numpy as np
    mn = float(np.min(arr))
    mx = float(np.max(arr))
    denom = mx - mn
    if denom <= 1e-9:
        return np.zeros_like(arr, dtype=float)
    return (arr - mn) / denom


def analyze_with_librosa(audio_path: str, duration_limit: float = None):
    import librosa
    import numpy as np
    from scipy.signal import find_peaks

    sr = 22050
    hop_length = 512  # ~23ms resolution (~2.6 video frames per audio hop)

    y, sr = librosa.load(audio_path, sr=sr, duration=duration_limit)
    duration_sec = float(librosa.get_duration(y=y, sr=sr))
    max_total_frames = min(MAX_FRAMES, int(round(duration_sec * FPS)))

    # 1. Dynamic Beat Tracking (Zero cumulative drift)
    tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr, hop_length=hop_length)
    bpm = float(tempo[0]) if hasattr(tempo, "__len__") else float(tempo)
    beat_times = librosa.frames_to_time(beat_frames, sr=sr, hop_length=hop_length)

    beats = [
        {"beat": i, "timeSec": round(float(t), 4), "frame": int(round(float(t) * FPS))}
        for i, t in enumerate(beat_times)
    ]
    bars = [
        {"bar": i // 4, "timeSec": b["timeSec"], "frame": b["frame"]}
        for i, b in enumerate(beats)
        if i % 4 == 0
    ]

    # 2. Multi-band Spectral Decomposition
    mel = librosa.feature.melspectrogram(
        y=y, sr=sr, hop_length=hop_length, n_mels=128, fmin=20, fmax=11000
    )
    freqs = librosa.mel_frequencies(n_mels=128, fmin=20, fmax=11000)

    bass_mask = (freqs >= 20) & (freqs <= 220)
    high_mask = (freqs >= 3400) & (freqs <= 11000)

    bass_power = np.mean(mel[bass_mask, :], axis=0)
    high_power = np.mean(mel[high_mask, :], axis=0)

    # Broadband Envelopes
    onset_env = librosa.onset.onset_strength(y=y, sr=sr, hop_length=hop_length)
    rms = librosa.feature.rms(y=y, hop_length=hop_length)[0]
    centroid = librosa.feature.spectral_centroid(y=y, sr=sr, hop_length=hop_length)[0]

    onset_norm = normalize_array(onset_env)
    rms_norm = normalize_array(rms)
    bass_norm = normalize_array(bass_power)
    high_norm = normalize_array(high_power)
    centroid_norm = normalize_array(centroid)

    min_dist_hops = max(1, int(sr * 0.14 / hop_length))  # ~140ms minimum distance between peaks

    # 3. Detect Note & Rhythmic Onsets
    onset_peaks, _ = find_peaks(
        onset_norm, height=0.12, distance=min_dist_hops, prominence=0.06
    )

    # 4. Detect Bass Drops (Sudden differential surges in sub-bass power)
    bass_diff = np.maximum(0, np.diff(bass_power, prepend=bass_power[0]))
    bass_diff_norm = normalize_array(bass_diff)
    bass_drop_peaks, _ = find_peaks(
        bass_diff_norm, height=0.18, distance=min_dist_hops * 2, prominence=0.10
    )

    # 5. Detect Cymbal Crashes (Sudden differential surges in high-band power + high centroid)
    high_diff = np.maximum(0, np.diff(high_power, prepend=high_power[0]))
    high_diff_norm = normalize_array(high_diff)
    crash_peaks, _ = find_peaks(
        high_diff_norm, height=0.18, distance=min_dist_hops * 2, prominence=0.10
    )

    # 6. Detect Broadband Explosive Energy Peaks
    energy_product = rms_norm * onset_norm
    energy_peaks_indices, _ = find_peaks(
        energy_product, height=0.22, distance=min_dist_hops * 2, prominence=0.12
    )

    # 7. Merge, Classify and Deduplicate Transient Events
    transients_by_frame = {}

    for idx in bass_drop_peaks:
        t = float(librosa.frames_to_time(idx, sr=sr, hop_length=hop_length))
        f = int(round(t * FPS))
        transients_by_frame[f] = {
            "frame": f,
            "timeSec": round(t, 4),
            "type": "BASS_DROP",
            "strength": round(float(bass_diff_norm[idx]), 3),
            "bassEnergy": round(float(bass_norm[idx]), 3),
            "highEnergy": round(float(high_norm[idx]), 3),
            "rms": round(float(rms_norm[idx]), 3),
        }

    for idx in crash_peaks:
        t = float(librosa.frames_to_time(idx, sr=sr, hop_length=hop_length))
        f = int(round(t * FPS))
        # Keep BASS_DROP unless crash is strictly higher
        if f not in transients_by_frame or transients_by_frame[f]["type"] != "BASS_DROP":
            transients_by_frame[f] = {
                "frame": f,
                "timeSec": round(t, 4),
                "type": "CYMBAL_CRASH",
                "strength": round(float(high_diff_norm[idx]), 3),
                "bassEnergy": round(float(bass_norm[idx]), 3),
                "highEnergy": round(float(high_norm[idx]), 3),
                "rms": round(float(rms_norm[idx]), 3),
            }

    for idx in energy_peaks_indices:
        t = float(librosa.frames_to_time(idx, sr=sr, hop_length=hop_length))
        f = int(round(t * FPS))
        if f not in transients_by_frame:
            transients_by_frame[f] = {
                "frame": f,
                "timeSec": round(t, 4),
                "type": "ENERGY_PEAK",
                "strength": round(float(energy_product[idx]), 3),
                "bassEnergy": round(float(bass_norm[idx]), 3),
                "highEnergy": round(float(high_norm[idx]), 3),
                "rms": round(float(rms_norm[idx]), 3),
            }

    for idx in onset_peaks:
        t = float(librosa.frames_to_time(idx, sr=sr, hop_length=hop_length))
        f = int(round(t * FPS))
        if f not in transients_by_frame:
            transients_by_frame[f] = {
                "frame": f,
                "timeSec": round(t, 4),
                "type": "BEAT_ONSET",
                "strength": round(float(onset_norm[idx]), 3),
                "bassEnergy": round(float(bass_norm[idx]), 3),
                "highEnergy": round(float(high_norm[idx]), 3),
                "rms": round(float(rms_norm[idx]), 3),
            }

    sorted_transients = [transients_by_frame[k] for k in sorted(transients_by_frame.keys())]

    bass_drops = [t for t in sorted_transients if t["type"] == "BASS_DROP"]
    cymbal_crashes = [t for t in sorted_transients if t["type"] == "CYMBAL_CRASH"]
    energy_peaks = [t for t in sorted_transients if t["type"] == "ENERGY_PEAK"]
    onsets = [t for t in sorted_transients if t["type"] == "BEAT_ONSET"]

    # 8. Transient-Driven Scene Cut Recommendations & STRUCTURAL_FRACTURE Hit Sync
    cuts = []
    structural_fracture_recs = []
    cur_start = 0
    scene_idx = 1

    while cur_start + MIN_SCENE_FRAMES <= max_total_frames:
        window_min = cur_start + MIN_SCENE_FRAMES
        window_max = min(max_total_frames, cur_start + TARGET_MAX_SCENE_FRAMES)

        # Transients in this scene's transition cut window
        w_transients = [
            t for t in sorted_transients if window_min <= t["frame"] <= window_max
        ]

        next_cut = None
        trigger_type = "FALLBACK"

        # Hierarchy for Scene Cuts:
        # 1. BASS_DROP (heavy low-end drop creates the most explosive scene shift)
        w_drops = [t for t in w_transients if t["type"] == "BASS_DROP"]
        if w_drops:
            w_drops.sort(key=lambda x: (-x["strength"], abs(x["frame"] - (cur_start + 136))))
            next_cut = w_drops[0]["frame"]
            trigger_type = "BASS_DROP"

        # 2. CYMBAL_CRASH / ENERGY_PEAK (impactful musical surge)
        if next_cut is None:
            w_crashes = [
                t for t in w_transients if t["type"] in ("CYMBAL_CRASH", "ENERGY_PEAK")
            ]
            if w_crashes:
                w_crashes.sort(key=lambda x: (-x["strength"], abs(x["frame"] - (cur_start + 136))))
                next_cut = w_crashes[0]["frame"]
                trigger_type = w_crashes[0]["type"]

        # 3. Standard Beat/Note Onset
        if next_cut is None and w_transients:
            w_transients.sort(key=lambda x: abs(x["frame"] - (cur_start + 136)))
            next_cut = w_transients[0]["frame"]
            trigger_type = w_transients[0]["type"]

        # 4. Bar downbeat from musical beats
        if next_cut is None:
            bar_cands = [
                b["frame"]
                for b in beats
                if window_min <= b["frame"] <= window_max and b.get("beat", 0) % 4 == 0
            ]
            if bar_cands:
                next_cut = bar_cands[0]
                trigger_type = "BAR_BOUNDARY"
            else:
                next_cut = min(cur_start + 136, max_total_frames)
                trigger_type = "TEMPO_GRID"

        dur = next_cut - cur_start
        if dur < MIN_SCENE_FRAMES:
            break

        # Payoff Slam Synchronization (inside [cur_start + 18, cur_start + 45])
        payoff_transients = [
            t
            for t in sorted_transients
            if (cur_start + PAYOFF_WINDOW[0]) <= t["frame"] <= (cur_start + PAYOFF_WINDOW[1])
        ]

        payoff_offset = 30
        payoff_type = "BEAT_CENTER"

        if payoff_transients:
            prio = {"BASS_DROP": 4, "CYMBAL_CRASH": 3, "ENERGY_PEAK": 2, "BEAT_ONSET": 1}
            payoff_transients.sort(
                key=lambda x: (
                    -prio.get(x["type"], 0),
                    -x["strength"],
                    abs((x["frame"] - cur_start) - 30),
                )
            )
            chosen_payoff = payoff_transients[0]
            payoff_offset = chosen_payoff["frame"] - cur_start
            payoff_type = chosen_payoff["type"]
        else:
            beat_cands = [
                b["frame"] - cur_start
                for b in beats
                if PAYOFF_WINDOW[0] <= (b["frame"] - cur_start) <= PAYOFF_WINDOW[1]
            ]
            if beat_cands:
                payoff_offset = min(beat_cands, key=lambda x: abs(x - 30))
                payoff_type = "BEAT_ONSET"

        sfx_offset = max(0, payoff_offset - SFX_LEAD_FRAMES)

        # STRUCTURAL_FRACTURE Hit Detection in this scene
        scene_transients = [t for t in sorted_transients if cur_start <= t["frame"] < next_cut]
        # Major bass drops or energy peaks suitable for architectural/fortress destruction
        fracture_candidates = [
            t for t in scene_transients if t["type"] in ("BASS_DROP", "CYMBAL_CRASH", "ENERGY_PEAK")
        ]
        has_fracture_hit = len(fracture_candidates) > 0
        
        if has_fracture_hit:
            # Find the best hit candidate inside or near the payoff window
            fracture_candidates.sort(
                key=lambda x: (
                    0 if (cur_start + PAYOFF_WINDOW[0] <= x["frame"] <= cur_start + PAYOFF_WINDOW[1]) else 1,
                    -x["strength"],
                )
            )
            best_hit = fracture_candidates[0]
            hit_offset = best_hit["frame"] - cur_start
            structural_fracture_recs.append(
                {
                    "sceneIndex": scene_idx,
                    "startFrame": cur_start,
                    "hitFrame": best_hit["frame"],
                    "hitOffset": hit_offset,
                    "transientType": best_hit["type"],
                    "strength": best_hit["strength"],
                    "suggestedSfx": "artillery_shell.wav" if best_hit["type"] == "BASS_DROP" else "sub_boom.wav",
                    "sfxOffset": max(0, hit_offset - SFX_LEAD_FRAMES),
                    "suggestedCamera": "IMPACT_SHAKE",
                }
            )

        cuts.append(
            {
                "sceneIndex": scene_idx,
                "startFrame": cur_start,
                "durationFrames": dur,
                "cutTriggerType": trigger_type,
                "payoffBeatOffset": payoff_offset,
                "payoffTransientType": payoff_type,
                "sfxLeadOffset": sfx_offset,
                "structuralFractureRecommended": has_fracture_hit and scene_idx > 1,
            }
        )

        cur_start = next_cut
        scene_idx += 1

    return {
        "bpm": round(bpm, 2),
        "fps": FPS,
        "maxFramesCeiling": MAX_FRAMES,
        "driftPolicy": "TRANSIENT_ONSET_ANALYSIS",
        "analysisEngine": "librosa",
        "sfxPerceptualLeadFrames": SFX_LEAD_FRAMES,
        "durationSec": round(duration_sec, 3),
        "transientStats": {
            "totalTransients": len(sorted_transients),
            "bassDropCount": len(bass_drops),
            "cymbalCrashCount": len(cymbal_crashes),
            "energyPeakCount": len(energy_peaks),
            "onsetCount": len(onsets),
        },
        "bars": bars,
        "beats": beats,
        "transients": sorted_transients,
        "bassDrops": bass_drops,
        "cymbalCrashes": cymbal_crashes,
        "energyPeaks": energy_peaks,
        "recommendedSceneCuts": cuts,
        "structuralFractureRecommendations": structural_fracture_recs,
    }


def analyze_with_aubio(audio_path: str):
    """Aubio C-extension fallback for onset and tempo detection."""
    import aubio

    hop_size = 512
    win_s = 1024
    samplerate = 22050

    s = aubio.source(audio_path, samplerate, hop_size)
    samplerate = s.samplerate

    o = aubio.onset("specflux", win_s, hop_size, samplerate)
    t = aubio.tempo("default", win_s, hop_size, samplerate)

    onsets = []
    tempo_beats = []
    total_frames = 0

    while True:
        samples, read = s()
        is_onset = o(samples)
        if is_onset:
            time_sec = float(o.get_last_s())
            onsets.append({"frame": int(round(time_sec * FPS)), "timeSec": round(time_sec, 4), "type": "BEAT_ONSET"})
        is_beat = t(samples)
        if is_beat:
            time_sec = float(t.get_last_s())
            tempo_beats.append({"frame": int(round(time_sec * FPS)), "timeSec": round(time_sec, 4)})
        total_frames += read
        if read < hop_size:
            break

    bpm = float(t.get_bpm()) if len(tempo_beats) > 0 else 120.0
    duration_sec = total_frames / float(samplerate)

    beats = [{"beat": i, "timeSec": b["timeSec"], "frame": b["frame"]} for i, b in enumerate(tempo_beats)]
    bars = [{"bar": i // 4, "timeSec": b["timeSec"], "frame": b["frame"]} for i, b in enumerate(beats) if i % 4 == 0]

    return {
        "bpm": round(bpm, 2),
        "fps": FPS,
        "maxFramesCeiling": MAX_FRAMES,
        "driftPolicy": "AUBIO_ONSET_ANALYSIS",
        "analysisEngine": "aubio",
        "sfxPerceptualLeadFrames": SFX_LEAD_FRAMES,
        "durationSec": round(duration_sec, 3),
        "transientStats": {
            "totalTransients": len(onsets),
            "bassDropCount": 0,
            "cymbalCrashCount": 0,
            "energyPeakCount": 0,
            "onsetCount": len(onsets),
        },
        "bars": bars,
        "beats": beats,
        "transients": onsets,
        "bassDrops": [],
        "cymbalCrashes": [],
        "energyPeaks": [],
        "recommendedSceneCuts": [],
        "structuralFractureRecommendations": [],
    }


def analyze_with_wave_fallback(audio_path: str, duration_sec: float):
    """Pure Python + FFmpeg fallback for low-resource or container environments."""
    tmp_wav = os.path.join(tempfile.gettempdir(), "bgm_transient_probe.wav")
    try:
        subprocess.check_call(
            [
                "ffmpeg",
                "-y",
                "-i",
                audio_path,
                "-t",
                str(int(duration_sec) + 1),
                "-ac",
                "1",
                "-ar",
                "22050",
                tmp_wav,
                "-loglevel",
                "error",
            ],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        with wave.open(tmp_wav, "rb") as w:
            sr = w.getframerate()
            n = w.getnframes()
            raw = w.readframes(n)
            samples = struct.unpack(f"<{n}h", raw)

        hop = 368  # ~60 Hz envelope
        env = [
            math.sqrt(sum(s * s for s in samples[i : i + hop]) / hop)
            for i in range(0, len(samples) - hop, hop)
        ]
        onset = [max(0.0, env[i] - env[i - 1]) for i in range(1, len(env))]
        mean_o = sum(onset) / max(1, len(onset))
        onset_c = [x - mean_o for x in onset]

        best_bpm = 120.0
        best_score = -1e18
        for bpm in range(90, 181):
            lag = int(round((60.0 / bpm) * 60))
            count = len(onset_c) - lag
            if count <= 0:
                continue
            sc = sum(onset_c[i] * onset_c[i - lag] for i in range(lag, len(onset_c))) / count
            if sc > best_score:
                best_score = sc
                best_bpm = float(bpm)

        beat_interval_sec = 60.0 / best_bpm
        beats = []
        bars = []
        beat_idx = 0
        while True:
            t = beat_idx * beat_interval_sec
            if t > duration_sec:
                break
            frame = int(round(t * FPS))
            beats.append({"beat": beat_idx, "timeSec": round(t, 4), "frame": frame})
            if beat_idx % 4 == 0:
                bars.append({"bar": beat_idx // 4, "timeSec": round(t, 4), "frame": frame})
            beat_idx += 1

        # Detect prominent transient peaks from energy envelope
        transients = []
        max_env = max(env) if env else 1.0
        for f, val in enumerate(onset):
            if val > mean_o * 1.8:
                t = f / 60.0
                transients.append(
                    {
                        "frame": f,
                        "timeSec": round(t, 4),
                        "type": "BEAT_ONSET",
                        "strength": round(min(1.0, val / (max_env + 1e-6)), 3),
                    }
                )

        return {
            "bpm": round(best_bpm, 2),
            "fps": FPS,
            "maxFramesCeiling": MAX_FRAMES,
            "driftPolicy": "CUMULATIVE_FLOAT_SINGLE_ROUND",
            "analysisEngine": "ffmpeg_wave_fallback",
            "sfxPerceptualLeadFrames": SFX_LEAD_FRAMES,
            "durationSec": duration_sec,
            "transientStats": {
                "totalTransients": len(transients),
                "bassDropCount": 0,
                "cymbalCrashCount": 0,
                "energyPeakCount": 0,
                "onsetCount": len(transients),
            },
            "bars": bars,
            "beats": beats,
            "transients": transients,
            "bassDrops": [],
            "cymbalCrashes": [],
            "energyPeaks": [],
            "recommendedSceneCuts": [],
            "structuralFractureRecommendations": [],
        }
    finally:
        if os.path.exists(tmp_wav):
            try:
                os.remove(tmp_wav)
            except Exception:
                pass


def main():
    audio_path = sys.argv[1] if len(sys.argv) > 1 else "assets/audio/bgm.mp3"
    out_path = sys.argv[2] if len(sys.argv) > 2 else "assets/audio/beat_grid.json"

    duration_sec = round(MAX_FRAMES / FPS, 2)
    grid = None

    if os.path.exists(audio_path):
        duration_sec = get_audio_duration(audio_path)
        # 1. Try Librosa (Primary, Full Transient & Drop Detection Engine)
        try:
            grid = analyze_with_librosa(audio_path)
            print(
                f"[INFO] Analyzed {audio_path} via Librosa: {grid['bpm']} BPM, "
                f"{grid['transientStats']['totalTransients']} transients "
                f"({grid['transientStats']['bassDropCount']} drops, "
                f"{grid['transientStats']['cymbalCrashCount']} crashes, "
                f"{grid['transientStats']['energyPeakCount']} energy peaks)."
            )
        except ImportError:
            # 2. Try Aubio
            try:
                grid = analyze_with_aubio(audio_path)
                print(f"[INFO] Analyzed {audio_path} via Aubio: {grid['bpm']} BPM ({grid['transientStats']['totalTransients']} onsets).")
            except ImportError:
                # 3. Pure Python + FFmpeg Fallback
                print(f"[WARN] Neither librosa nor aubio available; falling back to FFmpeg signal envelope.")
                grid = analyze_with_wave_fallback(audio_path, duration_sec)
    else:
        print(f"[INFO] {audio_path} not found; generating default 120 BPM grid.")
        grid = analyze_with_wave_fallback(audio_path, duration_sec)

    out_dir = os.path.dirname(out_path)
    if out_dir:
        os.makedirs(out_dir, exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(grid, f, indent=2)

    # Mirror to public/audio/beat_grid.json
    try:
        pub_path = os.path.join("public", "audio", "beat_grid.json")
        os.makedirs(os.path.dirname(pub_path), exist_ok=True)
        with open(pub_path, "w", encoding="utf-8") as pf:
            json.dump(grid, pf, indent=2)
    except Exception:
        pass

    cut_count = len(grid.get("recommendedSceneCuts", []))
    frac_count = len(grid.get("structuralFractureRecommendations", []))
    print(
        f"[OK] Audio transient beat grid written to {out_path} "
        f"({cut_count} recommended cuts, {frac_count} STRUCTURAL_FRACTURE anchors @ {grid['bpm']} BPM)."
    )


if __name__ == "__main__":
    main()
