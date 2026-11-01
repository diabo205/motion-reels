#!/usr/bin/env bash
set -e

MODE="${1:---preview}"

# 1. Extract Beat Grid
if command -v python3 &>/dev/null; then
  python3 .agents/skills/build-historical-reel/scripts/extract_beat_grid.py assets/audio/bgm.mp3 assets/audio/beat_grid.json
  python3 .agents/skills/build-historical-reel/scripts/generate_sfx.py
fi

# 2. Pipeline Execution Modes
if [ "$MODE" = "--render" ]; then
  echo "[RENDER] Rendering 1080x1920 60fps MP4 via Remotion..."
  npx remotion render src/index.ts HistoricalReel out/reel_final.mp4 --codec=h264 --crf=18 --concurrency=80%
elif [ "$MODE" = "--audit-stills" ]; then
  echo "[AUDIT] Rendering still frames across all timeline scenes for visual QA..."
  mkdir -p out/audit
  python3 -c '
import json, subprocess
with open("src/timelines/current_reel.json") as f:
    data = json.load(f)
for s in data["scenes"]:
    frame = int(s["startFrame"] + s["durationFrames"] * 0.55)
    out = f"out/audit/{s[\"sceneId\"]}.png"
    print(f"  -> Rendering [{s[\"sceneId\"]}] at frame {frame}...")
    subprocess.run(["npx", "remotion", "still", "src/index.ts", "HistoricalReel", out, f"--frame={frame}", "--log=error"], check=True)
'
  echo "[AUDIT COMPLETE] All scene stills rendered to out/audit/"
else
  echo "[PREVIEW] Launching live Remotion Studio preview..."
  npx remotion studio src/index.ts
fi
