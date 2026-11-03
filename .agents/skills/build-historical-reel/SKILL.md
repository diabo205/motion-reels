---
name: build-historical-reel
description: Build a beat-synced 9:16 historical motion graphics reel (Remotion, 1080x1920 @ 60 FPS) from a script and a BGM track. Invoke with /build-historical-reel.
---
# Build Historical Reel

All numbers (duration, pacing, hook, fonts, safe zones, loudness) live in `config/pipeline_constants.json` and `config/safe_zones.json`. Linters enforce them. Read the config when you need a value, and fix whatever `projects/<slug>/audit/audit_report.json` reports. This file covers the order of work and the judgment calls the linters cannot check.

Pass `--project <slug>` to every CLI tool.

## Workflow

### 0. Project setup
- Create `projects/<slug>/` with `plates/`, `audit/`, `deliverables/`, `manifest.json`, `README.md`.
- Record the BGM license in `manifest.json` (`meta.bgmLicense`).
- Register the composition in `src/Root.tsx`.
- Downscale raw archival plates to 1080px wide or less and 350KB or less, and strip Exif.

### 1. Pre-production
Run `.agents/skills/motion-graphics-director/SKILL.md` first. It produces `projects/<slug>/scene_specs.json`. Do not compile a timeline or draw anything before that file exists.

### 2. Audio
```powershell
python .agents/skills/build-historical-reel/scripts/extract_beat_grid.py assets/audio/bgm.mp3 assets/audio/beat_grid.json
python .agents/skills/build-historical-reel/scripts/generate_sfx.py
```
The first command writes transient-based scene cut and impact recommendations. The second writes the SFX WAVs to `assets/audio/sfx/` and `public/audio/sfx/`.

### 3. Timeline
Invoke subagent `script-beat-compiler` with the script, `assets/audio/beat_grid.json`, `projects/<slug>/scene_specs.json`, `config/pipeline_constants.json` and `config/retention_priors.json`. Output: `src/timelines/<project>.json`, valid against `.agents/skills/build-historical-reel/schemas/timeline.schema.json`.

Then run the fast audit before any drawing:
```powershell
npm run audit:fast -- --project <slug>
```
Fix timeline errors here. They are cheap to fix now and expensive after scenes exist.

### 4. Reference plates & automated contour tracing
```powershell
node scripts/ingest_reference_plates.js --project <slug>
node scripts/trace_plate_contours.js --project <slug> --all
```
The pipeline blocks if any scene lacks a valid plate. The second command automatically traces authentic photographic silhouettes into `projects/<slug>/plates/TracedPlateAssets.tsx` and `traced_plate_assets.json` so you never have to guess bezier coordinates. After ingestion, open each plate and look at it. Write `projects/<slug>/plates/notes.json` with one entry per plate:
```json
{ "file": "plate_03.jpg", "subject": "Mk IV tank, side view",
  "observed": ["track run is longer than hull", "sponson on lower flank", "two-tone camouflage, dark upper band"] }
```
List proportions, material colors and silhouette landmarks you can actually see. Drawing starts after the notes exist.

### 5. Palette and atmosphere (once per project)
Invoke `atmospheric-plate-prompter`. It locks one palette family (`POLAR_MARITIME`, `CONFLICT_CRISIS` or `ESPIONAGE_DOSSIER`) and one global-frame seeded particle emitter (`SNOW`, `ASH`, `RAIN`, `DUST` or `NONE`) for the whole project. Staging mode is chosen per scene in the spec and rotates through at least three modes.

### 6. Scenes, one at a time
Invoke `vector-scene-architect` for scene N only. Do not generate all scenes at once. For each scene:

1. Read: the scene's entry in `scene_specs.json`, its plate and plate notes, `TracedPlateAssets.tsx`, `src/library/INDEX.md`, and `rules/motion.md`.
2. Compose from the library and traced assets first. Draw new vector art only for what the library and traced assets lack. Anything new and reusable goes into `src/library/` with an `INDEX.md` entry.
3. Take every motion from a named preset in `rules/motion.md`. Do not invent spring or easing numbers inline.
4. Render stills at frame 0, the payoff frame and the last frame of the scene (`node scripts/audit_and_validate.js --project <slug> --scene N`).
5. Look at the stills and check:
   - Readable at phone size.
   - At least three value tiers (sky or backdrop, midground, rim-lit foreground subject).
   - No subject reduced to a flat black shape or primitive stick figure (`PATH_COMPLEXITY_LINT`: >= 35 nodes, >= 5 paths, < 70% primitive ratio).
   - Nothing in the bottom 22% or right 15% platform buffers.
   - Subject matches the plate notes (proportions, materials, landmarks).
   - Text is legible and sits in the text safe zone.
6. Fix and re-render. Maximum three rounds per scene. If problems remain, write them to `projects/<slug>/audit/scene_notes.md` and move on.

### 7. Audit and deliverables
```powershell
node scripts/pipeline.js --project <slug> --audit-stills --auto-fix
```
Writes `audit_report.json` and `deliverables/` (captions, metadata, posters). Fix every error. Then run `npm run lint:framework`.

### 8. Iterate and render
- Single scene: `node scripts/render_scene_clip.js <sceneNum> --project <slug>`
- Studio preview: `node scripts/pipeline.js --project <slug> --preview`
- Master render with -14 LUFS mastering: `node scripts/pipeline.js --project <slug> --render`

## Judgment rules the linters cannot check

- **Dark scenes still have tiers.** Grim subjects use a dark palette with atmospheric backlight, a rim light, authentic material colors (see the director skill) and at most one accent prop. A subject filled with a single flat color has failed.
- **Library first.** Compose from `src/library/` before drawing paths.
- **Archival photos are references only.** Never place `<img>` or `<image>` inside vector scenes.
- **No text inside artwork.** No captions or placards in the lower art zone, and no metric shown twice.
- **Every scene has continuous secondary motion** on at least one layer, using a `DRIFT` or equivalent preset.
- **Camera moves are motivated.** Only the camera presets in `rules/motion.md`.
- **Editorial.** Metric and casualty scenes carry `claim: { text, source, url, verified }`. Mass-casualty scenes use `sensitivity: "SOMBER_MEMORIAL"`: no slam SFX, no aggressive shake, slow-fade reveals, subdued palette.
