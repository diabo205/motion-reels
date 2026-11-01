---
trigger: glob
globs: "src/**/*.tsx, src/timelines/*.json"
---
# Kinetic Typography, Beat-Sync & True Glyph Metrics Rules

## 1. Zero-Clutter Hierarchy & Three-Element Cap
Limit every scene to at most three distinct text elements:
1. **Optional Top Context Tag**: Chronological year or location badge (e.g. `BERLIN • 1961`). Display **only when the timeline or setting shifts**; do not keep static tags on every frame.
2. **White Setup Line**: Poses the premise or setup in crisp white block text (`triggerFrameOffset: 0`).
3. **Red Payoff Line**: Delivers the punchline, consequence, or twist on the musical beat (`triggerFrameOffset` in `[18, 45]` frames).
4. **Optional Quote Attribution Pill (`QUOTE_CARD`)**: Displayed below the quote when `archetype === "QUOTE_CARD"` or `visualPayload.quoteAttribution` is present.

---

## 2. Strict Word Budget, 2-Line Cap & Size Floors (`GLYPH_WIDTH_AND_LINE_CAP`)
- **Combined Setup + Payoff Budget**: Strictly **6–10 words total** per scene.
- **Line Length & Wrapping Cap**: Under 40 characters per line and **strictly $\le 2$ wrapped lines per layer** within the `952px` safe width.
- **Mobile Legibility Size Floors**:
  - Setup Line: Preferred `64px`, minimum floor **`56px`**.
  - Payoff Line: Preferred `72px`, minimum floor **`64px`**.
- **ALL-CAPS Tracking Spec**: Enforce explicit letter-spacing of **`+0.04em` (`+4%`)** so heavy ALL-CAPS grotesque type never reads as a solid wall.

---

## 3. Vendored Single Font Family & Real Glyph Measurement (`FONT_LINT`)
- Standardize on vendored **`Montserrat Black` (v31)** or **`Inter ExtraBold` (v20)** pinned in `public/fonts/` and `assets/fonts/font_manifest.json`.
- **Banned Fonts (`FONT_LINT`)**: Cursive scripts (`Caveat`), typewriter serif fonts (`Courier Prime`), and comic/decorative fonts are banned and automatically linted.
- **True Glyph Advance-Width Engine (`scripts/font_metrics.js` & `src/utils/fontMetrics.ts`)**:
  - Measure text widths using per-glyph `hmtx` advance tables (where `I = 0.375em` and `W = 1.165em` in Montserrat Black, and CJK/wide glyphs = `1.02em`) rather than a monospace multiplier.

---

## 4. Beat-Quantized Timing & Sharp Frame 0 Poster Protection
- **Sharp Frame 0 (Poster/Thumbnail Protection)**:
  - On Global Frame `0` (`scene.startFrame === 0 && frame === 0`), the Setup Line renders **completely sharp (`blur(0px)`) and at `100%` opacity** so social feed thumbnails and cover pickers never display a smeared frame.
- **Beat 2 — Beat-Synced Payoff Line (`[18, 45]` frames / `0.30s–0.75s`)**:
  - Synchronize `triggerFrameOffset` to the first detected beat in `beat_grid.json` falling within `[18, 45]` frames after `scene.startFrame` (auto-snapped via `--auto-fix`).
  - In `STANDARD` sensitivity mode: 3-frame scale slam (`scale(1.26) -> scale(1.0)`) in palette payoff red.
  - In `SOMBER_MEMORIAL` sensitivity mode: dignified 14-frame opacity fade (`SLOW_REVEAL`) in muted memorial tone (`somberPayoff`) with zero scale slam.
- **Perceptual SFX Lead Bias**:
  - Bias transient impact foley (`sub_boom.wav`, `stamp_slam.wav`) **2 frames early** (`~33ms` audio lead) so audio and visual slams are perceived in tight lockstep.
- **Rolling Number Counters**:
  - High-impact integers count up over **0.6 seconds** (`36` frames @ 60 FPS) as the payoff line lands.
