# init_antigravity_reels.ps1 - Native PowerShell initializer for Antigravity Historical Reels Engine
$ErrorActionPreference = "Stop"

Write-Host "[1/6] Creating Antigravity workspace directories..."
$dirs = @(
    ".agents/rules",
    ".agents/agents",
    ".agents/skills/build-historical-reel/schemas",
    ".agents/skills/build-historical-reel/scripts",
    "assets/audio",
    "assets/plates",
    "src/components",
    "src/timelines"
)
foreach ($d in $dirs) {
    if (-not (Test-Path $d)) {
        New-Item -ItemType Directory -Path $d -Force | Out-Null
    }
}

Write-Host "[2/6] Writing root AGENTS.md & .agents/rules/ invariants..."

$agentsMd = @'
# Historical Motion Graphics Orchestrator (Gemini 3.8 Flash)

You are the core orchestrator for a localized, programmatic 9:16 historical motion graphics engine modeled on high-retention tactical vector reels.

## Core Execution Principles
1. **Model Target**: Default all structured compilation and SVG code generation to `gemini-3.8-flash` (`thinking_level: "LOW"` for JSON timeline compilation; `thinking_level: "MEDIUM"` for complex SVG path choreography).
2. **Zero Static Templates**: Every scene must combine animated background gradients/plates, parallax foreground silhouettes or cartography, and beat-quantized kinetic typography.
3. **Strict Schema Adherence**: Never edit `src/timelines/current_reel.json` without validating against `.agents/skills/build-historical-reel/schemas/timeline.schema.json`.
4. **Parallel Subagent Delegation**: When `/build-historical-reel` is triggered, run `extract_beat_grid.py` first, invoke `script-beat-compiler` to generate the master timeline, and then concurrently invoke `vector-scene-architect` and `atmospheric-plate-prompter`.
'@
[System.IO.File]::WriteAllText((Join-Path (Get-Location) "AGENTS.md"), $agentsMd, [System.Text.Encoding]::UTF8)

$rule1 = @'
---
trigger: always_on
---
# 9:16 Visual System & Safe-Zone Constraints

- **Canvas Resolution**: `1080x1920` at `60fps`.
- **TikTok Safe Zones**:
  - Top clearance: `200px` minimum.
  - Bottom clearance: `440px` minimum (reserved for platform captions/audio marquee).
  - Right clearance: `110px` minimum (reserved for like/comment/share stack).
- **Persistent Subject Tracker**: Render `<PersistentHudBadge />` at `top: 220px, left: 64px` across all body scenes (`hudVisible: true`), hidden only on opening hook (`scene 0`) and final summary emblem.
- **Color Palette Tokens**:
  - `PURE_WHITE`: `#F8F9FA`
  - `ALERT_RED`: `#E63946`
  - `MEDAL_GOLD`: `#F4B942`
  - `TACTICAL_CYAN`: `#5BC0BE`
  - `MUTED_CREAM`: `#E8DFCA`
  - `SILHOUETTE_BLACK`: `#0F0E0E`
'@
[System.IO.File]::WriteAllText((Join-Path (Get-Location) ".agents/rules/01-visual-system.md"), $rule1, [System.Text.Encoding]::UTF8)

$rule2 = @'
---
trigger: glob
globs: ["src/**/*.tsx", "src/timelines/*.json"]
---
# Kinetic Typography & Retention Rules

1. **No Soft Dissolves**: Never use opacity fade-ins longer than 3 frames (50ms). Use 2-frame step-scaled pop-ins (`scale(1.18) -> scale(1.0)`).
2. **Staggered Line Stacking**: Split sentences into 2 to 3 short punchy clauses (max 4 words per line). Stack them sequentially on consecutive beat markers without clearing the previous line until the scene cuts.
3. **Word Cap**: Maximum 12 words visible on screen at any single frame (excluding map labels and field dispatch cards).
4. **Mandatory Telemetry**: Any mention of distance, countdowns, dates, or casualties must invoke `<TelemetryCounter />` or `<TacticalMap />` rather than plain static text.
'@
[System.IO.File]::WriteAllText((Join-Path (Get-Location) ".agents/rules/02-kinetic-typography.md"), $rule2, [System.Text.Encoding]::UTF8)

Write-Host "[3/6] Configuring Antigravity Subagents (.agents/agents/)..."

$agent1 = @'
---
name: script-beat-compiler
description: Compiles raw historical scripts and audio beat grids into a frame-accurate 60fps timeline JSON file. Invoke first when building or retiming a reel.
tools: ["view_file", "replace_file_content", "run_command"]
mainAgent: false
subagent: true
model: flash
commandExecutionPolicy: auto
---
# Script & Audio-Anchor Compiler Subagent

Your sole responsibility is translating a raw historical narrative + `assets/audio/beat_grid.json` into `src/timelines/current_reel.json`.

## Execution Rules
1. Read `assets/audio/beat_grid.json` to get exact bar and beat frame numbers (at 60fps).
2. Segment the historical script into 15–22 scenes for a 50–60 second reel (~180 frames / 3.0 seconds average per scene).
3. Quantize every `startFrame` to a major bar downbeat and every `textLayers[].triggerFrameOffset` to a quarter-note or half-bar beat transient.
4. Assign the optimal `archetype` (`SILHOUETTE_ACTION`, `FLAG_BANNER`, `TACTICAL_MAP`, `DOCUMENT_CARD`, `BLUEPRINT_DIAGRAM`, `TELEMETRY_COUNTER`, `SPOTLIGHT_EMBLEM`).
5. Validate output against `.agents/skills/build-historical-reel/schemas/timeline.schema.json`.
'@
[System.IO.File]::WriteAllText((Join-Path (Get-Location) ".agents/agents/script-beat-compiler.md"), $agent1, [System.Text.Encoding]::UTF8)

$agent2 = @'
---
name: vector-scene-architect
description: Generates parametric 2D SVG silhouettes, tactical maps, and blueprint callout diagrams in React/Remotion from current_reel.json.
tools: ["view_file", "replace_file_content"]
mainAgent: false
subagent: true
model: flash
commandExecutionPolicy: sandbox
---
# Vector Scene Architect Subagent

You generate crisp, high-contrast 2D SVG art and motion paths inside `src/components/GeneratedSilhouettes.tsx` based on `src/timelines/current_reel.json`.

## Aesthetic Rules
- Foreground silhouettes must use flat `#0F0E0E` fill with zero gradients.
- Highlight focal points (wounds, insignias, target reticles, artillery flashes) strictly in `#E63946` (Alert Red), `#F4B942` (Gold), or `#FFFFFF`.
- Animate continuous subtle secondary motion on every frame: rising smoke circles (`opacity: 0.25`), drifting embers/feathers, or oscillating wing/limb cycles using `Math.sin(frame / 4)`.
'@
[System.IO.File]::WriteAllText((Join-Path (Get-Location) ".agents/agents/vector-scene-architect.md"), $agent2, [System.Text.Encoding]::UTF8)

$agent3 = @'
---
name: atmospheric-plate-prompter
description: Translates historical scene descriptions into high-contrast 9:16 atmospheric photography prompts and generates background plates.
tools: ["view_file", "replace_file_content", "run_command"]
mainAgent: false
subagent: true
model: flash
commandExecutionPolicy: sandbox
---
# Atmospheric Plate Prompter Subagent

For every scene in `src/timelines/current_reel.json`, populate `visualPayload.atmosphericPlatePrompt` and write a batch manifest to `assets/plates/prompt_manifest.json`.

## Mandatory Prompt Template
"[Subject in stark black silhouette in lower third], [era-specific historical setting], volumetric battle smoke and atmospheric haze, extreme chiaroscuro lighting, warm twilight amber horizon (#B86B43) fading into pitch-black upper sky (#090D12) providing clean negative space in top 45% of frame for typography, shot on 35mm anamorphic vertical 9:16 crop, pushed Ilford HP5 film grain, high contrast --ar 9:16 --no text, watermarks, bright midtones"
'@
[System.IO.File]::WriteAllText((Join-Path (Get-Location) ".agents/agents/atmospheric-plate-prompter.md"), $agent3, [System.Text.Encoding]::UTF8)

Write-Host "[4/6] Creating Antigravity Skill Bundle (/build-historical-reel)..."

$skill = @'
---
name: build-historical-reel
description: End-to-end workflow to compile a historical script and audio track into a beat-synced 9:16 kinetic motion graphics reel. Invoke with /build-historical-reel.
---
# Build Historical Reel Skill

Follow these steps sequentially whenever the user invokes `/build-historical-reel` or provides a new historical script:

1. **Extract Audio Beat Grid**:
   Run `python3 .agents/skills/build-historical-reel/scripts/extract_beat_grid.py assets/audio/bgm.mp3 assets/audio/beat_grid.json`.
2. **Compile Beat-Synced Timeline**:
   Invoke subagent `script-beat-compiler` with the user's raw script and `assets/audio/beat_grid.json` to generate `src/timelines/current_reel.json`.
3. **Parallel Visual Generation**:
   Invoke `vector-scene-architect` and `atmospheric-plate-prompter` concurrently using `invoke_subagent`.
4. **Preview / Render**:
   Execute `.agents/skills/build-historical-reel/scripts/render_pipeline.sh --preview` (or `--render` for final MP4 output).
'@
[System.IO.File]::WriteAllText((Join-Path (Get-Location) ".agents/skills/build-historical-reel/SKILL.md"), $skill, [System.Text.Encoding]::UTF8)

$extractPy = @'
#!/usr/bin/env python3
"""
Extracts BPM, bar downbeats, and transient hit frames (at 60 FPS) from an audio file.
Falls back to a deterministic 140 BPM synth grid if no audio file is present yet.
"""
import json
import os
import sys

FPS = 60

def generate_fallback_grid(bpm: float = 140.0, duration_sec: float = 58.0):
    beat_interval_sec = 60.0 / bpm
    bar_interval_sec = beat_interval_sec * 4
    beats = []
    bars = []
    t = 0.0
    beat_idx = 0
    while t < duration_sec:
        frame = round(t * FPS)
        beats.append({"beat": beat_idx, "timeSec": round(t, 3), "frame": frame})
        if beat_idx % 4 == 0:
            bars.append({"bar": beat_idx // 4, "timeSec": round(t, 3), "frame": frame})
        t += beat_interval_sec
        beat_idx += 1
    return {"bpm": bpm, "fps": FPS, "durationSec": duration_sec, "bars": bars, "beats": beats}

def main():
    audio_path = sys.argv[1] if len(sys.argv) > 1 else "assets/audio/bgm.mp3"
    out_path = sys.argv[2] if len(sys.argv) > 2 else "assets/audio/beat_grid.json"

    if os.path.exists(audio_path):
        try:
            import librosa
            y, sr = librosa.load(audio_path, sr=None)
            tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr)
            beat_times = librosa.frames_to_time(beat_frames, sr=sr)
            bpm = float(tempo[0]) if hasattr(tempo, "__len__") else float(tempo)
            beats = [
                {"beat": i, "timeSec": round(float(t), 3), "frame": round(float(t) * FPS)}
                for i, t in enumerate(beat_times)
            ]
            bars = [b for i, b in enumerate(beats) if i % 4 == 0]
            grid = {"bpm": round(bpm, 2), "fps": FPS, "durationSec": round(float(librosa.get_duration(y=y, sr=sr)), 2), "bars": bars, "beats": beats}
        except ImportError:
            print("[WARN] librosa not installed; generating deterministic 140 BPM grid.")
            grid = generate_fallback_grid()
    else:
        print(f"[INFO] {audio_path} not found; generating default 140 BPM beat grid (58s).")
        grid = generate_fallback_grid()

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(grid, f, indent=2)
    print(f"[OK] Beat grid written to {out_path} ({len(grid['bars'])} bars, {len(grid['beats'])} beats @ {grid['bpm']} BPM).")

if __name__ == "__main__":
    main()
'@
[System.IO.File]::WriteAllText((Join-Path (Get-Location) ".agents/skills/build-historical-reel/scripts/extract_beat_grid.py"), $extractPy, [System.Text.Encoding]::UTF8)

Write-Host "[5/6] Writing Remotion Kinetic Typography & Telemetry Engine (src/components/)..."

$kineticTsx = @'
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export interface TextLayerSpec {
  text: string;
  triggerFrameOffset: number;
  tier: 'DISPLAY_HERO' | 'PRIMARY_STATEMENT' | 'SECONDARY_ACCENT' | 'SUB_CAPTION';
  colorToken: 'PURE_WHITE' | 'ALERT_RED' | 'MEDAL_GOLD' | 'TACTICAL_CYAN' | 'MUTED_CREAM';
  animation: 'HARD_POP' | 'SCALE_SLAM' | 'TYPEWRITER' | 'STAMP_THUD';
}

const COLOR_MAP: Record<TextLayerSpec['colorToken'], string> = {
  PURE_WHITE: '#F8F9FA',
  ALERT_RED: '#E63946',
  MEDAL_GOLD: '#F4B942',
  TACTICAL_CYAN: '#5BC0BE',
  MUTED_CREAM: '#E8DFCA',
};

const TIER_STYLE: Record<TextLayerSpec['tier'], React.CSSProperties> = {
  DISPLAY_HERO: { fontFamily: "'Alfa Slab One', serif", fontSize: 86, letterSpacing: '2px', lineHeight: 1.05 },
  PRIMARY_STATEMENT: { fontFamily: "'Alfa Slab One', serif", fontSize: 54, letterSpacing: '1.5px', lineHeight: 1.15 },
  SECONDARY_ACCENT: { fontFamily: "'Black Ops One', sans-serif", fontSize: 58, letterSpacing: '2px', lineHeight: 1.15 },
  SUB_CAPTION: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: 34, letterSpacing: '4px', fontWeight: 700 },
};

export const KineticTextStack: React.FC<{ layers: TextLayerSpec[] }> = ({ layers }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        top: 320,
        left: 72,
        right: 72,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 18,
        zIndex: 20,
      }}
    >
      {layers.map((layer, idx) => {
        const localFrame = frame - layer.triggerFrameOffset;
        if (localFrame < 0) return null;

        // 2-frame hard pop-in protocol (no soft opacity dissolves)
        const scale =
          layer.animation === 'SCALE_SLAM'
            ? interpolate(localFrame, [0, 3], [1.45, 1.0], { extrapolateRight: 'clamp' })
            : interpolate(localFrame, [0, 2], [1.16, 1.0], { extrapolateRight: 'clamp' });

        const displayedText =
          layer.animation === 'TYPEWRITER'
            ? layer.text.slice(0, Math.max(1, Math.floor(localFrame * 1.5)))
            : layer.text;

        return (
          <div
            key={idx}
            style={{
              ...TIER_STYLE[layer.tier],
              color: COLOR_MAP[layer.colorToken],
              transform: `scale(${scale})`,
              textTransform: 'uppercase',
              textShadow: '0px 6px 18px rgba(0, 0, 0, 0.85)',
            }}
          >
            {displayedText}
          </div>
        );
      })}
    </div>
  );
};
'@
[System.IO.File]::WriteAllText((Join-Path (Get-Location) "src/components/KineticTextStack.tsx"), $kineticTsx, [System.Text.Encoding]::UTF8)

$hudTsx = @'
import React from 'react';

export const PersistentHudBadge: React.FC<{ flagEmoji: string; title: string; headerContext?: string }> = ({
  flagEmoji,
  title,
  headerContext,
}) => (
  <div style={{ position: 'absolute', top: 210, left: 64, right: 64, zIndex: 30 }}>
    {headerContext && (
      <div
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 30,
          letterSpacing: '3.5px',
          color: '#E8DFCA',
          textAlign: 'center',
          marginBottom: 16,
          fontWeight: 700,
        }}
      >
        {headerContext}
      </div>
    )}
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <span style={{ fontSize: 42 }}>{flagEmoji}</span>
      <span
        style={{
          fontFamily: "'Black Ops One', sans-serif",
          fontSize: 38,
          color: '#F8F9FA',
          letterSpacing: '2px',
          textShadow: '0 4px 12px rgba(0,0,0,0.9)',
        }}
      >
        {title}
      </span>
    </div>
  </div>
);
'@
[System.IO.File]::WriteAllText((Join-Path (Get-Location) "src/components/PersistentHudBadge.tsx"), $hudTsx, [System.Text.Encoding]::UTF8)

Write-Host "[6/6] Writing MCP Configuration (.agents/mcp_config.json) & Render Script..."

$mcpJson = @'
{
  "mcpServers": {
    "ffmpeg-media-pipeline": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./assets", "./src/timelines"],
      "timeoutSeconds": 300
    }
  }
}
'@
[System.IO.File]::WriteAllText((Join-Path (Get-Location) ".agents/mcp_config.json"), $mcpJson, [System.Text.Encoding]::UTF8)

$renderSh = @'
#!/usr/bin/env bash
set -euo pipefail

MODE="${1:---preview}"
python3 .agents/skills/build-historical-reel/scripts/extract_beat_grid.py

if [ "$MODE" == "--render" ]; then
  echo "[RENDER] Rendering 1080x1920 60fps MP4 via Remotion..."
  npx remotion render src/index.ts HistoricalReel out/reel_final.mp4 --codec=h264 --crf=18 --concurrency=80%
else
  echo "[PREVIEW] Launching live Remotion Studio preview..."
  npx remotion studio src/index.ts
fi
'@
[System.IO.File]::WriteAllText((Join-Path (Get-Location) ".agents/skills/build-historical-reel/scripts/render_pipeline.sh"), $renderSh, [System.Text.Encoding]::UTF8)

$renderPs1 = @'
param(
    [string]$Mode = "--preview"
)
$ErrorActionPreference = "Stop"

if (Get-Command python -ErrorAction SilentlyContinue) {
    python .agents/skills/build-historical-reel/scripts/extract_beat_grid.py
} elseif (Get-Command py -ErrorAction SilentlyContinue) {
    py .agents/skills/build-historical-reel/scripts/extract_beat_grid.py
}

if ($Mode -eq "--render") {
    Write-Host "[RENDER] Rendering 1080x1920 60fps MP4 via Remotion..."
    npx remotion render src/index.ts HistoricalReel out/reel_final.mp4 --codec=h264 --crf=18 --concurrency=80%
} else {
    Write-Host "[PREVIEW] Launching live Remotion Studio preview..."
    npx remotion studio src/index.ts
}
'@
[System.IO.File]::WriteAllText((Join-Path (Get-Location) ".agents/skills/build-historical-reel/scripts/render_pipeline.ps1"), $renderPs1, [System.Text.Encoding]::UTF8)

Write-Host "[DONE] Antigravity Historical Reels Engine initialized successfully."
