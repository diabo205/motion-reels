---
name: build-historical-reel
description: End-to-end workflow to compile a historical script and audio track into a beat-synced 9:16 kinetic motion graphics reel. Invoke with /build-historical-reel.
---
# Build Historical Reel Skill (Cinematic Documentary Motion Engine)

Follow these steps sequentially whenever the user invokes `/build-historical-reel` or provides a new historical script:

0. **Project Isolation, Manifest & Asset Preflight**:
   - Create or identify `projects/<project-slug>/` (`plates/`, `audit/`, `deliverables/`, `manifest.json`, `README.md`).
   - Pass `--project <project-slug>` explicitly to all CLI tools.
   - Record BGM license clearance (`meta.bgmLicense`) and consult `config/retention_priors.json` so the opening Scene 1 hook archetype does not repeat the previous reel's opening archetype.
   - Downscale raw archival reference plates to $\le 1080\text{px}$ width and $\le 350\text{KB}$, stripping Exif metadata.
   - Register the project composition in `src/Root.tsx`.

0.5. **Pre-Production Storyboard & Direction Planning (`motion-graphics-director`)**:
   - Execute pre-production direction and storyboarding using `.agents/skills/motion-graphics-director/SKILL.md` **FIRST before compiling timelines or drafting assets**.
   - **Ingest Empirical Retention Priors (`config/retention_priors.json`)**:
     - Check `recentHookArchetypeHistory` to rotate the Scene 1 hook archetype across consecutive reels.
     - Bias Scene 1 duration to `pacingPriors.targetHookDurationFrames: 128` (2.13s).
     - Cross-reference `scene_type → optimal_duration_range → observed_retention_delta` in `config/retention_priors.json` to bias scene durations toward high-retention windows and space `STRUCTURAL_FRACTURE` / `SPLIT_CONFRONTATION` beats every 4–6 cuts.
   - Deconstruct every scene into the 4 core narrative beats:
     1. *Inciting trigger*: The initial action, command, environmental shift, or failure point.
     2. *Mechanical/physical reaction*: The chain of physical, structural, or tactical consequences.
     3. *Human/focal perspective*: Grounding the scale through a specific operator or micro-level POV.
     4. *Macro consequence*: Pulling out to an expansive geographic or strategic overview.
   - **Camera Movement Discipline (`CAMERA_DISCIPLINE_LINT`)**: Strictly prohibit crash zooms and snap zooms (`SNAP_ZOOM` / `CRASH_ZOOM`). Use motivated movements (`SLOW_PUSH_IN`, `PARALLAX_PAN_RIGHT`, `CRANE_SWEEP_UP`, `DUTCH_TILT`, `IMPACT_SHAKE`).

1. **Extract Audio Transient Beat Grid (Onset & Drop Detection)**:
   Execute:
   ```powershell
   python .agents/skills/build-historical-reel/scripts/extract_beat_grid.py assets/audio/bgm.mp3 assets/audio/beat_grid.json
   ```
   Replaces static BPM grids with deep audio transient analysis (via Librosa or Aubio):
   - Multi-band spectral flux extraction for bass drops (20–220Hz), cymbal crashes (3.5k–11kHz), broadband energy peaks, and rhythmic onsets.
   - Computes `recommendedSceneCuts` (`120–168f`) snapped to drops and crashes.
   - Computes `structuralFractureRecommendations` syncing destructive impact hits and SFX directly to heavy audio transients.

2. **Generate Procedural Foley & Cinematic SFX Assets**:
   Run:
   ```powershell
   python .agents/skills/build-historical-reel/scripts/generate_sfx.py
   ```
   Synthesizes WAV sound effects (`sub_boom.wav`, `stamp_slam.wav`, `counter_roll.wav`, `rifle_crack.wav`, `metal_clang.wav`) into `assets/audio/sfx/` and `public/audio/sfx/`.

3. **Compile Beat-Synced Timeline**:
   Invoke subagent `script-beat-compiler` with the raw script, `assets/audio/beat_grid.json`, `config/pipeline_constants.json`, and `config/retention_priors.json` to generate `src/timelines/<project>.json` adhering to `.agents/skills/build-historical-reel/schemas/timeline.schema.json`.
   - **Pacing & Cut Frequency**: Hold each scene for **2.0 to 2.8 seconds** (`120–168` frames; up to `180f` on final epilogue), yielding **16–29 cuts per reel**.
   - **Single Canonical Duration Ceiling (`MAX_FRAMES = 3500`)**: Total duration must clock between **`2,700` and `3,500` frames** (`45.00s` to `58.33s` @ 60 FPS) for optimal short-form retention pacing.
   - **Proportional Five-Act Micro-Arc**: Hook (`0–7%`), Inciting Crisis (`7–30%`), Escalating Crucible (`30–65%`), Turning Point (`65–85%`), Symmetric Resolution & Loop/CTA (`85–100%`).
   - **Beat-Quantized Typography & Word Budget**: Optional top context tag (only on setting shift) + white setup line (`triggerFrameOffset: 0`, sharp on global Frame `0`) + red payoff line synced to the first detected beat in `[18, 45]` frames (`0.30s–0.75s`). Cap combined setup and payoff at **6–10 words total** ($< 40$ chars/line, **max 2 lines per layer**).
   - **Assign Seven Modular Archetypes**: `LONE_LEADER`, `CROWD_TALLY`, `VEHICLE_IN_TRANSIT`, `STRUCTURAL_FRACTURE`, `VECTOR_MAP`, `SPLIT_CONFRONTATION`, `QUOTE_CARD`.
   - **Editorial Citations & Sensitivity Mode**: Include `claim: { text, source, url, verified }` on metric scenes and `sensitivity: "SOMBER_MEMORIAL"` on solemn casualty scenes.

3.5. **Mandatory Photographic Reference Ingestion (`MANDATORY_REFERENCE_PLATE_LINT`)**:
   **STRICT SYSTEM REQUIREMENT: No SVG may be drawn without on-disk reference images.**
   Run:
   ```powershell
   node scripts/ingest_reference_plates.js --project <project-slug>
   ```
   - Ingests photographic or archival reference blueprints for every scene into `projects/<slug>/plates/`.
   - Strictly validates binary magic bytes (`0xFF 0xD8 0xFF` for JPEG, `\x89PNG` for PNG, `RIFF...WEBP` for WebP) and minimum size ($\ge 10\text{KB}$) to guarantee zero corrupted HTML error pages.
   - Enforces Wikimedia standard thumbnail steps (`960px` / `1280px` via `w.wiki/GHai`) to prevent 400 Bad Request and 429 rate limits.
   - Writes `projects/<slug>/plates/manifest.json`. The pipeline (`scripts/pipeline.js` and `scripts/audit_and_validate.js`) will abort with a blocking exit code if any scene lacks a verified reference plate.

4. **Parallel High-Fidelity Visual Generation**:
   Concurrently invoke:
   - `vector-scene-architect`:
     - **Mandatory Reference Blueprinting & 6-Layer Vector Anatomy**: Inspect on-disk reference plates from `projects/<slug>/plates/` before drafting any mechanical asset, structural fracture, or explosion. Deconstruct references into (1) Ambient Volumetric Aura, (2) Dynamic Shockwaves/Ozone, (3) Acute Fire Spikes, (4) Multi-Tiered Organic Body via `src/kit/OrganicExplosion.tsx`, (5) Core Accent Flash, (6) Detached Orbiting Cloudlets/Shrapnel.
     - **Grim & Serious Scenarios (Default)**: Flat dark silhouettes (`#090D12` / `#12151B`) with atmospheric backlighting and at most one accent prop.
     - **Zero Direct Image Pasting (`PHOTO_PASTE_LINT`)**: Archival photos serve strictly as visual reference to draw parametric 2D SVG vector art. Never place raw `<img>` or `<image>` tags in vector components.
     - **Zero Illustration Text & Single-Source Metrics**: No captions or data placards inside lower artwork. No duplicated metrics.
     - **Continuous Micro-Motion (`MICRO_MOTION_CHECK`)**: Every scene must feature at least one secondary animation loop.
     - **Safe Zones**: Respect `config/safe_zones.json` (`CONSERVATIVE_UNION` default: Text `y = 346–806px`, Artwork `y = 864–1498px`, Bottom 22% `y > 1498px` and Right 15% `x > 918px` clear).
   - `atmospheric-plate-prompter`:
     - Select and lock one continuous dark canvas gradient per project: `POLAR_MARITIME`, `CONFLICT_CRISIS`, or `ESPIONAGE_DOSSIER`.
     - Configure global-frame seeded persistent particle emitter (`SNOW`, `ASH`, `RAIN`, `DUST`, or `NONE`).

5. **Kinetic Typography & Exact Glyph Width Validation**:
   - Standardize on vendored `Montserrat Black` (v31) or `Inter ExtraBold` (v20) in **ALL-CAPS** with `+0.04em` tracking and mobile size floors (`>= 56px` setup / `>= 64px` payoff).
   - Validate exact glyph advance widths and 2-line wrapping via `scripts/font_metrics.js`.

6. **Automated Linting, Visual Audit & Deliverables (`--audit-stills`)**:
   Execute:
   ```powershell
   node scripts/pipeline.js --project <project-slug> --audit-stills --auto-fix
   ```
   Verifies `MAX_FRAMES = 3500`, beat-synced payoff offsets, glyph advance widths, `FONT_LINT`, `PHOTO_PASTE_LINT`, `PALETTE_LINT`, `CAMERA_DISCIPLINE_LINT`, `ARCHETYPE_ROTATION_LINT`, and writes `projects/<project-slug>/audit/audit_report.json` plus `projects/<project-slug>/deliverables/` (`captions.srt`, `metadata.json`, `poster.png`, `poster_4x5.png`).

7. **Single-Scene Iteration & Final `-14 LUFS` Master Render**:
   - Single-Scene Iteration: `node scripts/render_scene_clip.js <sceneNum> --project <project-slug>`
   - Live Studio Preview: `node scripts/pipeline.js --project <project-slug> --preview`
   - Master Production Export (with FFmpeg `-14 LUFS` loudness mastering): `node scripts/pipeline.js --project <project-slug> --render`
