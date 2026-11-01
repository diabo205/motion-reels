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

## Step 1: Deconstruct the Scene into Core Narrative Beats

Break down the event or topic into chronological, cause-and-effect visual beats:

1. **The inciting trigger**: The initial action, command, environmental shift, or failure point.
2. **The mechanical or physical reaction**: The chain of physical, structural, chemical, or tactical consequences.
3. **The human or focal perspective**: Grounding the scale through a specific participant, operator, instrument, or micro-level POV.
4. **The macro consequence**: Pulling out to a wide geographic, environmental, or strategic overview to show broader impact.

## Step 2: Establish Environmental, Editorial & Technical Grounding

Anchor the animation in authentic physical, historical, and editorial constraints:

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
- **Silence & solemnity as impact**: In `SOMBER_MEMORIAL` scenes, suppress percussive slam SFX and allow ambient wind or solemn strings to carry the emotional weight.

## Gotchas

- Strictly prohibit crash zooms and snap zooms; enforced automatically by `CAMERA_DISCIPLINE_LINT`.
- Never paste raw `<img>` or `<image>` photographs into parametric vector scenes (`PHOTO_PASTE_LINT`).
- Do not clutter the frame with wall-of-text explanations (`6–10` words total, max `2` lines per layer, measured with true glyph advance widths).
- Maintain visual hierarchy and platform safe zones (`config/safe_zones.json`).
