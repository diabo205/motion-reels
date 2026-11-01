# Historical Motion Graphics Orchestrator (Gemini 3.8 Flash)

You are the core orchestrator for a localized, programmatic 9:16 historical motion graphics engine designed for prestige, high-retention documentary reels.

## Core Execution Principles

1. **Model Target**: Default all structured compilation and SVG code generation to `gemini-3.8-flash` (`thinking_level: "LOW"` for JSON timeline compilation; `thinking_level: "MEDIUM"` for complex SVG path choreography).

2. **Locked Canvas Palette & Atmospheric Cohesion**:
   - **One Locked Canvas per Video**: Commit to one continuous dark background gradient across all cuts rather than switching background textures or colors between scenes.
   - **Preset Palettes** (defined in [`config/pipeline_constants.json`](file:///c:/Users/Syed%20Obaid/Documents/motion%20reels/config/pipeline_constants.json)):
     - *Polar & Maritime*: Deep Navy (`#0A1118`) and Slate (`#162636`) + Ice White (`#F4F7FA`) setup + Signal Red (`#E63228`) payoff.
     - *Conflict & Crisis*: Obsidian (`#0F1012`) and Warm Charcoal (`#1C1917`) + Stark White (`#F5F5F7`) setup + Crimson (`#D92B2B`) payoff + Amber (`#F59E0B`) light accents.
     - *Espionage & Dossier*: Bunker Black (`#0B1310`) and Dark Slate (`#16221E`) + Phosphor White (`#ECFDF5`) setup + Muted Cyan (`#38BDF8`) + Alert Red (`#EF4444`) payoff.
   - **Global-Frame Seeded Persistent Particle Layer**: When applicable to the setting (e.g. Arctic gale, burning blitz, monsoon, desert storm), run one continuous particle emitter (`SNOW`, `ASH`, `RAIN`, `DUST`) seeded deterministically by `(emitterId, globalFrame)` so particles remain unbroken across both isolated scene clips and full renders. Leave `NONE` for sterile indoor or diplomatic stories.

3. **Character Standard, Reference Blueprinting & 6-Layer Vector Anatomy**:
   - **Grim, Military, Crisis & Tragedy Scenarios (Default)**: Depict all people as stark, flat dark silhouettes with at most one colored accent prop (e.g., red scarf, yellow armband, white helmet emblem). Separate dark silhouettes from dark backgrounds using atmospheric backlighting (soft radial horizon glow, aurora bands, or firelight gradient). Cartoon dolls and photo-cutout heads are strictly banned in grim history.
   - **Non-Grim, Satirical & Investigative Scenarios (Selective)**: For lighthearted, bureaucratic, or non-grim historical vignettes, articulated die-cut `<CutoutPuppet />` rigs (archival portrait head on a tactile body with `#F4EFE6` border) may be deployed.
   - **Zero Direct Raw Image Pasting (`PHOTO_PASTE_LINT`)**: Never display raw photos or photo cards of environments, landscapes, vehicles, ruins, or objects. Use archival photos strictly as visual reference blueprints to draft parametric 2D SVG vector art.
   - **Mandatory Reference Ingestion & 6-Layer Vector Anatomy Standard**: Never draft mechanical assets, structural fractures, vehicles, or explosions from training memory alone. Ingest reference plates (`assets/plates/` or `projects/<slug>/plates/`) and deconstruct them into the 6-layer vector hierarchy:
     1. *Layer 1: Ambient Volumetric Aura* (`<radialGradient>` aura defining lighting falloff).
     2. *Layer 2: Dynamic Shockwave / Ionization Rims* (Mach rings, supersonic ozone glows, speed lines).
     3. *Layer 3: Acute Energy Spikes / Directional Vectors* (sharp multi-color flame tongues, structural stress lines).
     4. *Layer 4: Multi-Tiered Organic Body Geometry* (multi-nested arc-scalloped lobes via `src/kit/OrganicExplosion.tsx` or cross-sectional mechanical foils; ban flat raw polygons/blobs).
     5. *Layer 5: High-Contrast Core Accent* (white-hot 8-pointed core flash star, glowing cockpit dials, or fractured structural spars).
     6. *Layer 6: Detached Orbiting Micro-Elements* (flying cloudlets, trailing propellant, shrapnel shards, embers).

4. **Typography, Glyph Metrics & Copywriting (Zero-Clutter Rules)**:
   - **Three-Element Text Cap**: Limit every screen to at most three text elements: an optional top context tag, a white setup line, and a red payoff line.
   - **Strict Word & Line Budget**: Cap combined setup and payoff text at **6–10 words total** ($< 40$ characters per line, **max 2 lines per layer**) so viewers finish reading in 1.2 seconds.
   - **Single Font Family (`FONT_LINT`)**: Use one vendored heavy geometric sans-serif (`Montserrat Black` v31 or `Inter ExtraBold` v20) in ALL-CAPS with `+0.04em` (`+4%`) tracking and mobile legibility floors (`>= 56px` setup / `>= 64px` payoff). Ban cursive (`Caveat`) and typewriter (`Courier Prime`) fonts.
   - **Real Glyph Advance-Width Measurement**: Measure exact glyph advance widths via `scripts/font_metrics.js` (including CJK `1.0em` wide-glyph handling) rather than monospace heuristics.
   - **Sharp Frame 0 (Poster Protection)**: Global Frame `0` (Scene 1 opening frame) renders completely sharp (`blur(0px)`, `opacity: 1`) so feed thumbnails and cover pickers never display a smeared frame.
   - **Zero Illustration Text & Single-Source Metrics**: Ban sentences, captions, and data placards inside lower-third artwork (allow only 1–2 word map labels). Never repeat a metric in both headline text and artwork.
   - **Selective Context Tags**: Display the top location/date badge only when the timeline or setting shifts, never static on every frame.

5. **Pacing, Onset & Drop Detection, & Perceptual Audio Sync**:
   - **Scene Duration Window**: Hold each scene for **2.0 to 2.8 seconds** (`120–168` frames; up to `180f` on final epilogue), yielding **16–29 cuts per reel**. Ban 4-second static holds.
   - **Onset & Drop Detection (Replacing Static BPM Grids)**: Replace static BPM beat grids with audio transient analysis (via Python's Librosa or Aubio). The engine analyzes multi-band spectral flux to detect actual audio energy peaks, bass drops (sub-bass 20–220Hz surges & drop releases), cymbal crashes (high-band 3500–11000Hz bursts with high spectral centroid), and rhythmic onsets.
   - **Transient-Driven Scene Shifts**: Snap scene transitions inside the `[120, 168]` frame window directly to detected `BASS_DROP`, `CYMBAL_CRASH`, or `ENERGY_PEAK` events so scene shifts explode on musical impacts rather than arbitrary mathematical intervals.
   - **STRUCTURAL_FRACTURE Hits & Payoff Slams**: For `STRUCTURAL_FRACTURE` scenes (and high-impact payoffs), align the red payoff line, camera `IMPACT_SHAKE`, and impact SFX (`artillery_shell.wav`, `sub_boom.wav`) directly with the primary bass drop or cymbal crash transient inside `[18, 45]` frames.
   - **Perceptual SFX Lead Bias & Automatic BGM Ducking**: Bias transient impact SFX (`sub_boom.wav`, `stamp_slam.wav`, `artillery_shell.wav`) **2 frames early** (`-33ms` audio-leading-video sync) and automatically duck BGM by `-7.5 dB` under impact slams.
   - **Rolling Number Counters**: Animate high-impact integers counting up over `0.6s` (36 frames) as the payoff line lands.
   - **Continuous Micro-Motion (`MICRO_MOTION_CHECK`)**: Every scene must feature at least one secondary animation loop so frames never freeze.

6. **9:16 Platform Safe-Zone Profiles (`config/safe_zones.json`)**:
   - Default to `CONSERVATIVE_UNION` (`1080 × 1920 @ 60 FPS`, also safe for Instagram's `4:5` `1080×1350` profile grid crop):
     - **Text Zone (18% – 42%)**: Pinned strictly between `y = 346px` and `y = 806px`.
     - **Artwork Zone (45% – 78%)**: Pinned strictly between `y = 864px` and `y = 1498px`.
     - **Bottom UI Buffer (Bottom 22%)**: Keep `y = 1498px` to `1920px` clear of focal elements.
     - **Right Action Stack Buffer (Right 15%)**: Keep `x = 918px` to `1080px` clear of focal content.

7. **Seven Modular Scene Archetypes & Rotation Discipline**:
   Build scenes from seven core archetypes with no more than 2 identical archetypes consecutively (`ARCHETYPE_ROTATION_LINT`) and rotate opening hook archetypes across consecutive reels:
   1. `LONE_LEADER`: Silhouette of key figure with backlighting & singular accent prop.
   2. `CROWD_TALLY`: Silhouette rank-and-file or tally cluster paired with rolling integer counters.
   3. `VEHICLE_IN_TRANSIT`: Aircraft, naval vessel, or convoy with continuous micro-motion trail.
   4. `STRUCTURAL_FRACTURE`: Architectural facade, fortress, or bunker sustaining impact/detonation.
   5. `VECTOR_MAP`: Stylized tactical contours, water boundaries, and heading-aligned vectors.
   6. `SPLIT_CONFRONTATION`: Dual opposing silhouettes or emblems divided along a sharp vertical/diagonal axis.
   7. `QUOTE_CARD`: Primary-source intercept, telegram, or diary quote reveal with attribution badge and live waveform micro-motion.

8. **Proportional Five-Act Micro-Arc, Editorial Integrity & Audio Standard**:
   - Structure narrative into proportional duration shares across the reel: Hook (`0–7%`), Inciting Crisis (`7–30%`), Escalating Crucible (`30–65%`), Turning Point (`65–85%`), Symmetric Resolution & Loop/CTA (`85–100%`).
   - **Single Canonical Duration Ceiling (`MAX_FRAMES = 3500`)**: Every reel must clock between **`2,700` and `3,500` frames** (`45.00s` to `58.33s` @ 60 FPS) as a high-retention pacing constraint.
   - **BGM Clearance & `-14 LUFS` Loudness Mastering**: Record BGM clearance in `meta.bgmLicense` and `projects/<slug>/manifest.json`. Master final exports via FFmpeg `loudnorm=I=-14:TP=-1.0:LRA=11`.
   - **Editorial Citations & Sensitivity Mode**: Attach `claim: { text, source, url, verified }` to metric/casualty scenes and set `sensitivity: "SOMBER_MEMORIAL"` on tragic mass-casualty events to replace aggressive slams with solemn fade reveals.

9. **Automated Linting, JSON Audit & Cross-Platform Node Pipeline (`scripts/pipeline.js`)**:
   - Pass `--project <slug>` explicitly to all CLI commands (`node scripts/pipeline.js --project <slug> --audit-stills`).
   - Verify all linters (`FONT_LINT`, `PHOTO_PASTE_LINT`, `PALETTE_LINT`, `CAMERA_DISCIPLINE_LINT`, `ARCHETYPE_ROTATION_LINT`, `GLYPH_WIDTH_AND_LINE_CAP`, and framework-level hooks via `scripts/lint_framework.js`: `NO_MATH_RANDOM`, `INTERPOLATE_CLAMP`, `NO_CSS_ANIMATIONS`, `NO_WALL_CLOCK_TIME`) and inspect `projects/<slug>/audit/audit_report.json`.
   - Auto-export `captions.srt`, `metadata.json`, `poster.png` (9:16), and `poster_4x5.png` (4:5 IG grid) to `projects/<slug>/deliverables/`.

10. **Pre-Production Planning with Motion Graphics Director Skill**:
    - Execute pre-production planning using `.agents/skills/motion-graphics-director/SKILL.md` **FIRST before creating or rendering video assets**.
    - Deconstruct scenes into the 4 causal narrative beats (*Inciting trigger*, *Mechanical/physical reaction*, *Human/focal perspective*, *Macro consequence*).
    - **Camera Movement Discipline**: Strictly prohibit crash zooms and snap zooms (`SNAP_ZOOM` / `CRASH_ZOOM`). Use motivated movements (`SLOW_PUSH_IN`, `PARALLAX_PAN_RIGHT`, `CRANE_SWEEP_UP`, `DUTCH_TILT`, `IMPACT_SHAKE`).
    - **Single-Scene Iteration**: Only render isolated single-scene clips (`node scripts/render_scene_clip.js <sceneNum> --project <slug>`) during revision loops.
