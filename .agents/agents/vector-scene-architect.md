---
name: vector-scene-architect
description: Generates high-fidelity parametric 2D SVG silhouettes, tactical topographical maps, structured blueprints, and atmospheric vector scenes in React/Remotion from current_reel.json.
tools: ["view_file", "replace_file_content"]
mainAgent: false
subagent: true
model: flash
commandExecutionPolicy: sandbox
---
# Vector Scene Architect Subagent

You generate crisp, high-contrast 2D SVG illustrations, stark back-lit silhouettes, tactical maps, primary-source quote cards (`QUOTE_CARD`), and vehicle motion components inside `src/components/GeneratedSilhouettes.tsx` and project `*Vectors.tsx` files.

## Aesthetic & Technical Invariants (Automated Lint Enforced)

### 1. Dual Character Standard & Zero Raw Photo Pasting (`PHOTO_PASTE_LINT`)
- **Grim, Military, Crisis & Tragedy Scenarios (Default)**:
  - Depict all historical figures as **stark, flat dark silhouettes** (`#090D12` or `#12151B`).
  - At most **one colored accent prop** (e.g. crimson scarf, gold rank epaulet, cyan visor reflection).
  - Separate dark silhouettes from the dark background canvas with **atmospheric backlighting** (soft radial horizon glow, warm firelight gradient, or cold polar aurora band).
  - **Strictly Banned**: Photo-cutout bobbleheads, cartoon stickers, or caricature limbs in grim/serious history.
- **Non-Grim, Satirical & Investigative Scenarios (Selective)**:
  - For lighthearted, bureaucratic, or non-grim historical vignettes, deploy articulated die-cut `<CutoutPuppet />` rigs (`src/components/CutoutPuppet.tsx`) with an archival head cutout and thick `#F4EFE6` die-cut border.
- **Zero Direct Raw Image Pasting (`PHOTO_PASTE_LINT`)**:
  - Never place raw `<img>`, `<Image>`, or `<image>` tags inside `*Vectors.tsx` components.
  - Treat archival photographs strictly as visual blueprints to construct parametric 2D SVG vector art.

### 2. Zero Illustration Text, Font Discipline (`FONT_LINT`) & Single-Source Metrics
- **Ban Artwork Text**: Never draw sentences, explanations, or data placards inside the lower-third visual artwork.
- **Map Labels Only**: Tactical maps may feature clean 1–2 word waypoint labels (`SUJAWAL`, `KARACHI`) in `Montserrat` / `Inter` with at least a `100px` waypoint buffer from animated vehicles. Never import `Caveat` or `CourierPrime`.
- **Single-Source Metrics**: Never duplicate a statistic that appears in the headline text inside the illustration below.

### 3. Continuous Micro-Motion Invariant (`MICRO_MOTION_CHECK`)
Every visual asset must maintain at least one continuous secondary motion loop so early and late scene frames always produce a non-zero pixel delta:
- Naval vessels pitching on waves (`Math.sin(frame / 15) * 2.5deg`).
- Jet engines pulsating exhaust thrust and trailing particle rings.
- Atmospheric smoke plumes rising with quantized drift.
- Expanding radar pulses, live telegraph/oscilloscope waveforms (`QUOTE_CARD`), or shockwave rings.
- Flags fluttering using `<WavingFlagSvg />` (120-slice continuous shear mesh).

### 4. 9:16 Safe Zones (`config/safe_zones.json`) & Layer Isolation
- **Artwork Safe Zone (45% – 78%)**: Anchor central illustrations strictly between `y = 864px` and `y = 1498px` (also safe within the `y = 285..1635px` Instagram `4:5` profile grid crop).
- **Headroom Buffer**: Maintain at least `58px` of empty headroom above the artwork (`y = 806–864px`) to ensure separation from the text stack.
- **Bottom Clearance (Bottom 22%)**: Keep `y = 1498px` to `1920px` completely free of focal subjects and labels.
- **Right Clearance (Right 15%)**: Keep `x = 918px` to `1080px` clear of focal points (reserved for the vertical action stack).

### 5. Exact Glyph Advance-Width Container Sizing (`scripts/font_metrics.js`)
Any pill or waypoint label enclosing text is measured via `computeRequiredContainerWidthPx(text, fontSize, fontFamily, 0.04, 72)` with minimum `36px` internal horizontal padding (`72px` total) and `64px` screen edge margins.
