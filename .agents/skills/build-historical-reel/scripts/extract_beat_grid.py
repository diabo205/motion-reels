#!/usr/bin/env python3
"""
Extracts BPM, bar downbeats, and transient hit frames (at 60 FPS) from an audio file.
Enforces the Zero-Cumulative-Drift Policy:
  - Cumulative beat timestamps are computed in float: t = beat_idx * (60.0 / bpm)
  - Rounded ONCE to absolute integer frames: frame = round(t * FPS)
  - Computes beat-quantized scene cut anchors (within [120, 168] frames / 2.0s-2.8s)
    and beat-synced payoff slam offsets (with -2 frame perceptual SFX lead bias).
"""
import json
import os
import subprocess
import sys

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


def compute_scene_cut_recommendations(beats: list, max_frames: int = MAX_FRAMES) -> list:
    """
    Snaps scene boundaries to the beat grid within [MIN_SCENE_FRAMES, TARGET_MAX_SCENE_FRAMES]
    (120-168 frames / 2.0s-2.8s) and computes each scene's beat-synced payoff slam offset
    plus perceptual SFX lead offset (-2 frames).
    """
    beat_frames = [b["frame"] for b in beats]
    if not beat_frames:
        return []

    cuts = []
    cur_start = 0
    scene_idx = 1

    while cur_start + MIN_SCENE_FRAMES <= max_frames:
        # Candidate beat frames falling inside [cur_start + 120, cur_start + 168]
        candidates = [
            bf
            for bf in beat_frames
            if MIN_SCENE_FRAMES <= (bf - cur_start) <= TARGET_MAX_SCENE_FRAMES and bf <= max_frames
        ]
        if candidates:
            # Prefer a 4-beat bar boundary if one falls inside the window, else median candidate
            bar_candidates = [
                b["frame"]
                for b in beats
                if b["frame"] in candidates and b.get("beat", 0) % 4 == 0
            ]
            next_cut = bar_candidates[0] if bar_candidates else candidates[len(candidates) // 2]
        else:
            next_cut = min(cur_start + 136, max_frames)

        dur = next_cut - cur_start
        if dur < MIN_SCENE_FRAMES:
            break

        # Find first beat inside the scene's payoff window [18, 45] frames after cur_start
        payoff_candidates = [
            bf - cur_start
            for bf in beat_frames
            if PAYOFF_WINDOW[0] <= (bf - cur_start) <= PAYOFF_WINDOW[1]
        ]
        payoff_offset = payoff_candidates[0] if payoff_candidates else 30
        sfx_offset = max(0, payoff_offset - SFX_LEAD_FRAMES)

        cuts.append(
            {
                "sceneIndex": scene_idx,
                "startFrame": cur_start,
                "durationFrames": dur,
                "payoffBeatOffset": payoff_offset,
                "sfxLeadOffset": sfx_offset,
            }
        )
        cur_start = next_cut
        scene_idx += 1

    return cuts


def generate_grid(bpm: float = 120.0, duration_sec: float = 58.33):
    """
    Zero-Cumulative-Drift Beat Grid Generator:
    Computes exact float time t = beat_idx * (60.0 / bpm) and rounds once to frame.
    """
    beat_interval_sec = 60.0 / bpm
    beats = []
    bars = []
    beat_idx = 0
    while True:
        t = beat_idx * beat_interval_sec
        if t > duration_sec:
            break
        frame = int(round(t * FPS))
        beat_entry = {"beat": beat_idx, "timeSec": round(t, 4), "frame": frame}
        beats.append(beat_entry)
        if beat_idx % 4 == 0:
            bars.append({"bar": beat_idx // 4, "timeSec": round(t, 4), "frame": frame})
        beat_idx += 1

    return {
        "bpm": round(bpm, 2),
        "fps": FPS,
        "maxFramesCeiling": MAX_FRAMES,
        "driftPolicy": "CUMULATIVE_FLOAT_SINGLE_ROUND",
        "sfxPerceptualLeadFrames": SFX_LEAD_FRAMES,
        "durationSec": duration_sec,
        "bars": bars,
        "beats": beats,
        "recommendedSceneCuts": compute_scene_cut_recommendations(beats, min(MAX_FRAMES, int(round(duration_sec * FPS)))),
    }


def detect_bpm_via_ffmpeg(audio_path: str) -> float:
    import math
    import struct
    import tempfile
    import wave

    tmp_wav = os.path.join(tempfile.gettempdir(), "bgm_bpm_probe.wav")
    try:
        subprocess.check_call(
            [
                "ffmpeg",
                "-y",
                "-i",
                audio_path,
                "-t",
                "60",
                "-ac",
                "1",
                "-ar",
                "24000",
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

        hop = 40  # 600 Hz envelope
        fps_env = sr / hop
        env = [
            math.sqrt(sum(s * s for s in samples[i : i + hop]) / hop)
            for i in range(0, len(samples) - hop, hop)
        ]
        onset = [max(0.0, env[i] - env[i - 1]) for i in range(1, len(env))]
        mean_o = sum(onset) / len(onset)
        onset_c = [x - mean_o for x in onset]

        best_bpm = 120.0
        best_score = -1e18
        for bpm in range(90, 181):
            lag = int(round((60.0 / bpm) * fps_env))
            count = len(onset_c) - lag
            if count <= 0:
                continue
            sc = sum(onset_c[i] * onset_c[i - lag] for i in range(lag, len(onset_c))) / count
            if sc > best_score:
                best_score = sc
                best_bpm = float(bpm)
        return best_bpm
    except Exception:
        return 120.0
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
    if os.path.exists(audio_path):
        duration_sec = get_audio_duration(audio_path)
        try:
            import librosa

            y, sr = librosa.load(audio_path, sr=None)
            tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr)
            beat_times = librosa.frames_to_time(beat_frames, sr=sr)
            bpm = float(tempo[0]) if hasattr(tempo, "__len__") else float(tempo)
            beats = [
                {"beat": i, "timeSec": round(float(t), 4), "frame": int(round(float(t) * FPS))}
                for i, t in enumerate(beat_times)
            ]
            bars = [
                {"bar": i // 4, "timeSec": b["timeSec"], "frame": b["frame"]}
                for i, b in enumerate(beats)
                if i % 4 == 0
            ]
            grid = {
                "bpm": round(bpm, 2),
                "fps": FPS,
                "maxFramesCeiling": MAX_FRAMES,
                "driftPolicy": "LIBROSA_TRANSIENT_SINGLE_ROUND",
                "sfxPerceptualLeadFrames": SFX_LEAD_FRAMES,
                "durationSec": round(float(librosa.get_duration(y=y, sr=sr)), 3),
                "bars": bars,
                "beats": beats,
                "recommendedSceneCuts": compute_scene_cut_recommendations(
                    beats, min(MAX_FRAMES, int(round(duration_sec * FPS)))
                ),
            }
        except ImportError:
            detected_bpm = detect_bpm_via_ffmpeg(audio_path)
            frames_per_beat = round((60.0 / detected_bpm) * FPS, 3)
            frames_per_bar = round(frames_per_beat * 4, 3)
            print(
                f"[INFO] Audio detected: {audio_path} ({duration_sec}s). "
                f"Detected {detected_bpm} BPM ({frames_per_beat} frames/beat, {frames_per_bar} frames/bar)."
            )
            grid = generate_grid(bpm=detected_bpm, duration_sec=duration_sec)
    else:
        print(f"[INFO] {audio_path} not found; generating default 120 BPM beat grid ({duration_sec}s).")
        grid = generate_grid(bpm=120.0, duration_sec=duration_sec)

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(grid, f, indent=2)
    try:
        pub_path = os.path.join("public", "audio", "beat_grid.json")
        os.makedirs(os.path.dirname(pub_path), exist_ok=True)
        with open(pub_path, "w", encoding="utf-8") as pf:
            json.dump(grid, pf, indent=2)
    except Exception:
        pass
    print(
        f"[OK] Beat grid written to {out_path} ({len(grid['bars'])} bars, "
        f"{len(grid['beats'])} beats, {len(grid['recommendedSceneCuts'])} recommended cuts @ {grid['bpm']} BPM)."
    )


if __name__ == "__main__":
    main()
