#!/usr/bin/env python3
"""
Audio Transient & Onset Beat Grid Generator for Florida Plane Crash 2026.
BGM: Bloody Mary (Instrumental Remix) [Full Version]
Produces: assets/audio/beat_grid_florida_crash.json & public/audio/beat_grid_florida_crash.json
"""
import subprocess
import json
import os
import numpy as np

FPS = 60
MAX_FRAMES = 3500
MIN_SCENE_FRAMES = 88
TARGET_HOOK_FRAMES = 108
TARGET_SCENE_FRAMES = 136
MAX_SCENE_FRAMES = 146
PAYOFF_WINDOW = [18, 45]
SFX_LEAD_FRAMES = 2

audio_path = "assets/audio/bgm_florida_crash.mp3"
cmd = ["ffmpeg", "-i", audio_path, "-ac", "1", "-ar", "22050", "-f", "s16le", "-"]
p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
raw, _ = p.communicate()
samples = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0

sr = 22050
hop = sr / FPS
n_frames = int(len(samples) / hop)
duration_sec = len(samples) / float(sr)

# Energy and flux
env = np.array([np.sqrt(np.mean(samples[int(i*hop):int((i+1)*hop)]**2)) for i in range(n_frames)])
flux = np.maximum(0, np.diff(env, prepend=env[0]))
mean_f = float(np.mean(flux))
std_f = float(np.std(flux))

bpm = 88.8
beat_interval_frames = (60.0 / bpm) * FPS  # ~40.54 frames per beat

# Generate beats and bars
beats = []
bars = []
b_idx = 0
while True:
    f = int(round(b_idx * beat_interval_frames))
    if f >= n_frames:
        break
    t = f / float(FPS)
    beats.append({"beat": b_idx, "timeSec": round(t, 4), "frame": f})
    if b_idx % 4 == 0:
        bars.append({"bar": b_idx // 4, "timeSec": round(t, 4), "frame": f})
    b_idx += 1

# Transients
transients = []
bass_drops = []
cymbal_crashes = []
energy_peaks = []
for f in range(n_frames):
    if flux[f] > mean_f + 0.9 * std_f:
        t = f / float(FPS)
        str_val = float(min(1.0, (flux[f] - mean_f) / (3.5 * std_f + 1e-6)))
        # Map to specific type
        if f % int(round(beat_interval_frames)) < 3 and str_val > 0.45:
            ttype = "BASS_DROP"
            bass_drops.append({"frame": f, "strength": round(str_val, 3)})
        elif str_val > 0.6:
            ttype = "CYMBAL_CRASH"
            cymbal_crashes.append({"frame": f, "strength": round(str_val, 3)})
        elif str_val > 0.35:
            ttype = "ENERGY_PEAK"
            energy_peaks.append({"frame": f, "strength": round(str_val, 3)})
        else:
            ttype = "BEAT_ONSET"

        transients.append({
            "frame": f,
            "timeSec": round(t, 4),
            "type": ttype,
            "strength": round(str_val, 3)
        })

# Compute recommended scene cuts and structural fracture recommendations
cuts = []
fractures = []
cur_start = 0
scene_idx = 1
total_scenes = 22

while scene_idx <= total_scenes and cur_start < MAX_FRAMES:
    if scene_idx == 1:
        target_dur = TARGET_HOOK_FRAMES
    elif scene_idx == total_scenes:
        target_dur = 160
    else:
        target_dur = TARGET_SCENE_FRAMES

    # Look for a transient or downbeat close to cur_start + target_dur
    window_min = cur_start + MIN_SCENE_FRAMES
    window_max = cur_start + MAX_SCENE_FRAMES
    
    candidates = [t for t in transients if window_min <= t["frame"] <= window_max]
    candidates.sort(key=lambda x: (
        0 if x["type"] == "BASS_DROP" else (1 if x["type"] == "CYMBAL_CRASH" else 2),
        abs(x["frame"] - (cur_start + target_dur))
    ))
    
    if candidates:
        best_cand = candidates[0]
        cut_frame = best_cand["frame"]
        cut_type = best_cand["type"]
    else:
        # Snap to nearest beat
        beat_cands = [b["frame"] for b in beats if window_min <= b["frame"] <= window_max]
        if beat_cands:
            cut_frame = min(beat_cands, key=lambda x: abs(x - (cur_start + target_dur)))
            cut_type = "BEAT_ONSET"
        else:
            cut_frame = cur_start + target_dur
            cut_type = "TEMPO_GRID"

    dur = cut_frame - cur_start

    # Determine payoff beat offset inside [18, 45]
    payoff_cands = [t for t in transients if (cur_start + PAYOFF_WINDOW[0]) <= t["frame"] <= (cur_start + PAYOFF_WINDOW[1])]
    payoff_cands.sort(key=lambda x: (
        0 if x["type"] in ("BASS_DROP", "CYMBAL_CRASH") else 1,
        -x["strength"],
        abs((x["frame"] - cur_start) - 30)
    ))
    
    if payoff_cands:
        payoff_offset = payoff_cands[0]["frame"] - cur_start
        payoff_type = payoff_cands[0]["type"]
    else:
        payoff_offset = 30
        payoff_type = "BEAT_ONSET"

    # Fracture hit
    scene_trans = [t for t in transients if (cur_start + 18) <= t["frame"] <= (cur_start + 45)]
    is_fracture = len(scene_trans) > 0 and (scene_idx in [6, 8, 12, 18])
    if is_fracture:
        best_hit = max(scene_trans, key=lambda x: x["strength"])
        hit_off = best_hit["frame"] - cur_start
        fractures.append({
            "sceneIndex": scene_idx,
            "startFrame": cur_start,
            "hitFrame": best_hit["frame"],
            "hitOffset": hit_off,
            "transientType": best_hit["type"],
            "strength": best_hit["strength"],
            "suggestedSfx": "artillery_shell.wav" if best_hit["type"] == "BASS_DROP" else "sub_boom.wav",
            "sfxOffset": max(0, hit_off - SFX_LEAD_FRAMES),
            "suggestedCamera": "IMPACT_SHAKE"
        })

    cuts.append({
        "sceneIndex": scene_idx,
        "startFrame": cur_start,
        "durationFrames": dur,
        "cutTriggerType": cut_type,
        "payoffBeatOffset": payoff_offset,
        "payoffTransientType": payoff_type,
        "sfxLeadOffset": max(0, payoff_offset - SFX_LEAD_FRAMES),
        "structuralFractureRecommended": is_fracture
    })

    cur_start = cut_frame
    scene_idx += 1

total_reel_frames = cur_start

grid = {
    "bpm": bpm,
    "fps": FPS,
    "maxFramesCeiling": MAX_FRAMES,
    "totalReelFrames": total_reel_frames,
    "driftPolicy": "TRANSIENT_ONSET_ANALYSIS",
    "analysisEngine": "numpy_spectral_flux",
    "sfxPerceptualLeadFrames": SFX_LEAD_FRAMES,
    "durationSec": round(duration_sec, 3),
    "transientStats": {
        "totalTransients": len(transients),
        "bassDropCount": len(bass_drops),
        "cymbalCrashCount": len(cymbal_crashes),
        "energyPeakCount": len(energy_peaks),
        "onsetCount": len(transients)
    },
    "bars": bars,
    "beats": beats,
    "transients": transients,
    "bassDrops": bass_drops,
    "cymbalCrashes": cymbal_crashes,
    "energyPeaks": energy_peaks,
    "recommendedSceneCuts": cuts,
    "structuralFractureRecommendations": fractures
}

out_paths = [
    "assets/audio/beat_grid_florida_crash.json",
    "public/audio/beat_grid_florida_crash.json"
]

for op in out_paths:
    os.makedirs(os.path.dirname(op), exist_ok=True)
    with open(op, "w", encoding="utf-8") as f:
        json.dump(grid, f, indent=2)

print(f"[OK] Wrote {len(cuts)} cuts across {total_reel_frames} frames ({total_reel_frames / FPS:.2f}s) to {out_paths[0]}")
