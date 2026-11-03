---
name: motion-graphics-director
description: "Direct, storyboard, and visualize any scene across popular YouTube documentary motion graphics styles (Stylized 3D Narrative, Technical CAD Explainer, Flat Vector Infographic, Archival Mixed-Media Collage). Use when scripting, storyboarding, designing, or animating historical events, military actions, engineering feats, or journalistic breakdowns for documentary or motion graphic videos."
---
# Documentary Motion Graphics Director

A structured workflow for directing, storyboarding, and animating any complex documentary scene across popular YouTube motion graphics styles, covering historical events, tactical engagements, engineering concepts, geopolitical investigations, and scientific explainers.

## When to Use

- Storyboarding or choreographing any scene for an animated documentary or video essay
- Translating complex real-world events, mechanical processes, or technical timelines into clear visual sequences
- Adapting scene composition, camera movement, VFX, and typography to specific creator aesthetics
- Directing dramatic historical moments, tactical decisions, forensic reconstructions, or systemic breakdowns

## Phase 0.5: Ingest Empirical Retention Priors (`config/retention_priors.json`)

Before scripting, storyboarding, or compiling the timeline, consult `config/retention_priors.json` (validated by `config/retention_priors.schema.json`) to close the feedback loop between published video performance and animation parameters:

1. **Scene 1 Hook Selection & Duration Lock (`HOOK_ARCHETYPE_LINT`, `HOOK_PACING_LINT`, `HOOK_TYPEWRITER_LINT`)**:
   - **Allowed Hook Archetypes**: Scene 1 must use an empirical high-hold archetype: `SPLIT_CONFRONTATION` (+2.08% delta), `STRUCTURAL_FRACTURE` (+1.32% delta), or `VEHICLE_IN_TRANSIT` (+1.70% delta).
   - **Banned Hook Archetypes**: `QUOTE_CARD`, `VECTOR_MAP`, `DOCUMENT_CARD`, and `LONE_LEADER` are strictly prohibited on Scene 1 due to high feed swipe-away rates.
   - **Archetype Rotation**: Inspect `recentHookArchetypeHistory` to ensure Scene 1 does not reuse the opening archetype of the previous 2 reels (`ARCHETYPE_ROTATION_LINT`).
   - **Target Hook Duration**: Bias Scene 1 strictly to `pacingPriors.targetHookDurationFrames: 96–108f` (1.6s–1.8s @ 60 FPS) to stop feed scrolling within 1.2 seconds. Exceeding 108f is a fatal linter error.
   - **Sharp Frame 0 (Poster Protection)**: Keep Global Frame 0 sharp (`blur(0px)`, `opacity: 1`) for feed thumbnails and poster generation (`projects/<slug>/deliverables/poster.png`). `TYPEWRITER` animations on Scene 1 are strictly prohibited (`HOOK_TYPEWRITER_LINT`).
   - **Immediate Frame 0 Audio Transient**: Trigger a heavy impact SFX (`sub_boom.wav`, `war_drum.wav`) on frame 0 to immediately anchor audience attention.
   - **Visceral High-Stakes Copy**: Frame 0 setup text must establish the primary antagonist, entity, and stakes immediately (no abstract or passive mystery copy).

2. **High-Density Archetype Duration Biasing & Staging Diversity (`STAGING_DIVERSITY_LINT`)**:
   - For every scene in Acts II–V, cross-reference its assigned archetype against `archetypeRetentionPriors[scene_type].optimal_duration_range` and `duration_delta_matrix`.
   - Bias scene cut durations toward high-retention windows (**`84–132 frames` / 1.4s–2.2s**; up to `168f` on final epilogue), yielding **22–32 cuts per reel**.
   - Total reel duration remains strictly between **`2,700` and `3,500` frames** (`45.00s` to `58.33s`).
   - **Staging Diversity (Peshawar Standard)**: Never lock an entire reel into a monotonous dark void. Rotate among at least **3 distinct stage styles** (`SUNBURST_HERO`, `PAPER_EXTERIOR`, `GRAPH_GRID`, `WOOD_PANEL`, `NIGHT_FELT`, `SPLIT_HORIZON`) and motivated sky gradients.

3. **Combating Retention Drop-Off Valleys & Dead Holds (`DEAD_HOLD_LINT`)**:
   - **2-Phase Reactive Mid-Scene Visuals**: Every scene executes a 2-phase narrative flow: Phase 1 (setup motion) -> Phase 2 (payoff hit impulse + secondary vector state transformation on the transient hit frame).
   - **Dead-Hold Prevention**: Cap post-payoff holds at $\le 72\text{f}$ (`1.2s`) without secondary micro-action or visual transition.
   - **Strategic Pacing Spikes**: Space high-impact, positive-delta archetypes (`STRUCTURAL_FRACTURE`, `SPLIT_CONFRONTATION`) every 4–6 scenes to create retention bumps and avoid mid-video drop-off valleys.
   - **No Consecutive Repetition**: Never place more than 2 consecutive scenes of the identical archetype.

4. **Payoff Alignment & Audio Sync**:
   - Align the red payoff line and camera `IMPACT_SHAKE` with the prominent musical transient (`optimalPayoffBeatIndex: 1`) in `[18, 45]` frames.
   - Trigger transient impact SFX (`sub_boom.wav`, `stamp_slam.wav`) `sfxPerceptualLeadFrames: 2` frames early (-33ms lead) with `-7.5 dB` BGM ducking.

5. **Closing the Loop via Ingestion CLI**:
   - When real performance curves become available from YouTube Studio (CSV) or TikTok Analytics (JSON), run `node scripts/pipeline.js --telemetry --ingest <path> --project <slug>` to update the priors automatically.

## Step 1: Deconstruct the Scene into Core Narrative Beats

Break down the event or topic into chronological, cause-and-effect visual beats:

1. **The inciting trigger**: The initial action, command, environmental shift, or failure point.
2. **The mechanical or physical reaction**: The chain of physical, structural, chemical, or tactical consequences.
3. **The human or focal perspective**: Grounding the scale through a specific participant, operator, instrument, or micro-level POV.
4. **The macro consequence**: Pulling out to a wide geographic, environmental, or strategic overview to show broader impact.

## Step 2: Establish Environmental, Editorial & Technical Grounding

Anchor the animation in authentic physical, historical, and editorial constraints:

- **Mandatory Reference Blueprinting (`MANDATORY_REFERENCE_PLATE_LINT`)**:
  - **Zero Abstract Guesswork**: Never draft mechanical assets, terrain maps, architecture, vehicles, or uniforms from memory or abstract speculation. Every scene requires real photographic or archival reference blueprints on disk in `projects/<slug>/plates/` before vector drawing starts.
  - **Binary Integrity Gate**: Every plate must pass binary magic-byte inspection (JPEG `0xFF 0xD8 0xFF`, PNG `\x89PNG`, WebP `RIFF...WEBP`) and be $\ge 10\text{KB}$. The pipeline strictly blocks compilation and rendering if reference images are missing or corrupt.
- **Environmental atmosphere**: Match lighting, atmospheric density, weather, and horizon curvature to the exact real-world setting. Seed persistent particle emitters (`SNOW`, `ASH`, `RAIN`, `DUST`) using global timeline frames so weather never resets on scene cuts.
- **Mechanical fidelity**: Avoid generic tropes (such as fiery Hollywood explosions in vacuums or instant disintegration); animate realistic material stress, deformation, fluid dynamics, or structural failure.
- **Verified citations & editorial sensitivity**: Pair every quantitative metric or casualty claim with a verified archival source citation (`claim: { text, source, url, verified }`). For solemn mass-casualty or memorial scenes, activate `sensitivity: "SOMBER_MEMORIAL"` to replace aggressive scale-slams and percussive thuds with dignified slow-fade reveals.

## Step 3: Direct the Scene Across the Four Primary Documentary Styles

Adapt visual composition, camera choreography, and asset treatment to the requested style:

### Camera Movement Restrictions (`CAMERA_DISCIPLINE_LINT`)
- **Strictly prohibit crash zooms and snap zooms (`SNAP_ZOOM` / `CRASH_ZOOM`)** across all styles. Avoid abrupt artificial focal-length snapping.
- Use motivated, physically grounded camera movements instead: deliberate linear push-ins (`SLOW_PUSH_IN`), multiplane parallax scrolling (`PARALLAX_PAN_RIGHT`), smooth vertical crane sweeps (`CRANE_SWEEP_UP`), subtle Dutch tilts (`DUTCH_TILT`), or decaying kinetic impact tremors (`IMPACT_SHAKE`).

### Style 1: Stylized 3D Narrative (e.g. Yarnhub, Kings and Generals)
- Medium: Blender or Unreal Engine with stylized, cel-shaded, or gritty realism.
- Camera: Alternating visceral, handheld first-person POV shots with expansive tactical crane or drone sweeps (no crash zooms or snap zooms).
- Lighting and FX: Dynamic motivated point lights, atmospheric volumetric haze, realistic particle sparks and smoke, camera lens dirt, and sudden focal shudders on impact.

### Style 2: Technical & Engineering CAD Explainer (e.g. Real Engineering, Mustard, Branch Education)
- Medium: Clean 3D CAD/orthographic models against minimalist studio or grid backgrounds.
- Camera: Smooth, deliberate isometric or orthographic camera orbits with freeze-frame bullet-time moments.
- Graphical overlays: Sectional cutaways, exploded assembly views, finite-element stress heatmaps (green to red), animated airflow or force vectors, and synced telemetry HUD charts.

### Style 3: Flat Vector & Silhouette Infographic (e.g. Prestige 9:16 Historical Engine)
- Medium: Parametric 2D SVG vector illustrations and stark backlit silhouettes in React/Remotion (`1080×1920 @ 60 FPS`).
- Camera: Motivated linear push-ins, multiplane parallax pans, crane sweeps, and split-screen panels showing concurrent perspectives.
- Archetypes: Rotate across the 7 core archetypes (`LONE_LEADER`, `CROWD_TALLY`, `VEHICLE_IN_TRANSIT`, `STRUCTURAL_FRACTURE`, `VECTOR_MAP`, `SPLIT_CONFRONTATION`, `QUOTE_CARD`) with parameterized variants and continuous secondary micro-motion.

### Style 4: Archival Mixed-Media & Investigative Collage (e.g. Vox, Johnny Harris, Lemmino)
- Medium: 2.5D camera projection mapping or parametric primary-source dossier/intercept reconstructions (`QUOTE_CARD`).
- Camera: Virtual 3D push-ins on layered 2D planes, shallow depth of field, and tactile macro tilts.
- Graphical overlays: Declassified telegrams, primary-source quote cards with attribution pills, high-contrast vector schematics, and glowing topographic map traces.

## Step 4: Layer Beat-Quantized Pacing and Sound Design Directives

- **Beat-synced typography**: Sync payoff reveals to the first musical downbeat/beat in `[18, 45]` frames (`0.30s–0.75s`) after each scene cut rather than a static metronome offset. Keep Global Frame `0` sharp for thumbnail/poster legibility.
- **Perceptual audio-lead bias**: Trigger transient impact foley (`sub_boom.wav`, `stamp_slam.wav`) **2 frames early** (`~33ms` audio lead) and automatically duck BGM by `-7.5 dB` under impacts, mastering the final mix to `-14 LUFS` integrated / `-1.0 dBTP`.
- **Zero-clutter, anti-fatigue word budget**: Cap combined setup and payoff text at **3–7 words total** ($< 40$ chars/line, **max 2 lines per layer**). Mobile font floors: $\ge 64\text{px}$ setup / $\ge 76\text{px}$ payoff.
- **Silence & solemnity as impact**: In `SOMBER_MEMORIAL` scenes, suppress percussive slam SFX and allow ambient wind or solemn strings to carry the emotional weight.

## Gotchas

- Strictly prohibit crash zooms and snap zooms; enforced automatically by `CAMERA_DISCIPLINE_LINT`.
- `TYPEWRITER` animation is strictly prohibited on Scene 1 hook (`HOOK_TYPEWRITER_LINT`).
- Never paste raw `<img>` or `<image>` photographs into parametric vector scenes (`PHOTO_PASTE_LINT`).
- Avoid dead visual holds (`DEAD_HOLD_LINT`); cap post-payoff holds at $\le 100\text{f}$.
- Do not clutter the frame with wall-of-text explanations (`3–7` words total, max `2` lines per layer, measured with true glyph advance widths).
- Maintain visual hierarchy and platform safe zones (`config/safe_zones.json`).
