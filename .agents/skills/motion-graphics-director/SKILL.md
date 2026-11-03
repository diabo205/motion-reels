---
name: motion-graphics-director
description: Pre-production for the 9:16 historical reel engine. Turns a script into a per-scene spec (archetype, staging, beat, frames, camera, text, motion presets, library components). Use before compiling any timeline or drawing assets. Other documentary styles (3D narrative, CAD explainer, archival collage) are in reference/other-styles.md.
---
# Documentary Motion Graphics Director

Output: `projects/<slug>/scene_specs.json`, one entry per scene, in the format at the bottom of this file. The build step implements the spec, so each entry should be specific enough that a scene can be drawn from it without further creative decisions.

Numbers come from `config/pipeline_constants.json` and `config/retention_priors.json`. The planning table below is a copy for convenience. If it disagrees with the config, the config wins, and the table needs fixing.

## 1. Read the priors

Read `config/retention_priors.json` (schema: `config/retention_priors.schema.json`) before planning.

**Scene 1 (hook)**
- Archetype must be `SPLIT_CONFRONTATION`, `STRUCTURAL_FRACTURE` or `VEHICLE_IN_TRANSIT`. The other four archetypes are not allowed on Scene 1. Retention deltas for each are in the config.
- Do not reuse the opening archetype of the previous two reels (`recentHookArchetypeHistory`).
- Duration: target 96 frames, hard cap 108.
- Frame 0 is fully sharp (no blur, full opacity) because it becomes the thumbnail and poster. No typewriter animation.
- A heavy impact SFX (`sub_boom.wav` or `war_drum.wav`) plays on frame 0.
- Setup text names the antagonist or entity and the stakes. No abstract or passive mystery copy.

**Scenes 2 onward**
- Bias each scene's duration toward the high-retention window for its archetype (`archetypeRetentionPriors[scene_type].optimal_duration_range` and `duration_delta_matrix`).
- Place `STRUCTURAL_FRACTURE` or `SPLIT_CONFRONTATION` every 4–6 scenes to avoid mid-video drop-off.
- No more than two consecutive scenes with the same archetype.
- Use at least three different staging modes across the reel, each motivated by the narrative (see section 4).

## 2. Planning table

| Item | Value |
| :--- | :--- |
| Total duration | 2,700–3,500 frames (45.00–58.33s at 60 FPS) |
| Scene duration | 84–132 frames; final epilogue up to 150 |
| Cuts per reel | 22–34 |
| Scene 1 | 96 frames target, 108 cap |
| Payoff beat | first musical transient in frames 18–45 of the scene |
| Post-payoff hold | 72 frames max without a secondary action |
| Text | 3–7 words total, under 40 characters per line, 2 lines max per layer |
| Acts (share of runtime) | I Hook 0–7%, II Inciting Crisis 7–30%, III Escalating Crucible 30–65%, IV Turning Point 65–85%, V Resolution and Loop 85–100% |

## 3. Break the script into beats

Each event in the script maps to a short run of scenes that covers four beats. Each scene is tagged with the beat it carries.

1. **TRIGGER**: the initial action, command, environmental shift or failure point.
2. **REACTION**: the chain of physical, structural or tactical consequences.
3. **FOCAL**: a specific operator or micro-level point of view that grounds the scale.
4. **MACRO**: a pull-out to the geographic or strategic picture.

## 4. Ground the scene in reality

- **References first.** No vehicle, uniform, building or terrain is drawn from memory. Every scene needs a plate in `projects/<slug>/plates/` (ingested by the build step) and the spec names which one.
- **Material hierarchy.** Subjects are built from authentic materials and depth tiers. A figure, vehicle or building is never a single flat color, including in dark scenes. Examples: khaki wool serge, polished brass, scarlet collar tabs; sandstone masonry with mortar joints, terracotta fort walls; two-tone camouflage hulls, blued steel with walnut grips, rusted iron plating.
- **Sky and staging.** Pick a setting-motivated sky: terracotta and umber for the Middle East, amber and mahogany for South Africa, dawn gold for the Mediterranean, deep azure for maritime, slate-navy for maps and blueprints. Staging modes: `SUNBURST_HERO`, `PAPER_EXTERIOR`, `GRAPH_GRID`, `WOOD_PANEL`, `NIGHT_FELT`, `SPLIT_HORIZON`.
- **Separation.** Radial backlight, horizon glow and rim light separate the subject from the background.
- **Weather.** Particle emitters are seeded by global frame so weather does not reset on cuts.
- **Mechanical fidelity.** Show realistic stress, deformation and structural failure. Avoid fiery Hollywood explosions where physics does not support them.
- **Citations and sensitivity.** Every metric or casualty claim carries `claim: { text, source, url, verified }`. Mass-casualty scenes use `sensitivity: "SOMBER_MEMORIAL"`.

## 5. Directing the flat-vector style

The engine renders parametric 2D SVG in Remotion. Scenes use the seven archetypes: `LONE_LEADER`, `CROWD_TALLY`, `VEHICLE_IN_TRANSIT`, `STRUCTURAL_FRACTURE`, `VECTOR_MAP`, `SPLIT_CONFRONTATION`, `QUOTE_CARD`.

- Every scene follows two phases: setup motion, then a payoff hit with a secondary state change on the transient frame. Presets are in `.agents/skills/build-historical-reel/rules/motion.md`.
- Camera is one preset per scene from the same file. Crash zooms and snap zooms are not used.
- Prefer components in `src/library/` (see `src/library/INDEX.md`). The spec lists which components each scene uses, so the build step composes instead of redrawing.
- Die-cut `CutoutPuppet` rigs suit bureaucratic, satirical or non-grim vignettes.
- For other documentary styles (3D narrative, CAD explainer, archival collage) see `reference/other-styles.md`.

## 6. Sound

- The red payoff line and the camera `IMPACT_SHAKE` land on the first strong musical transient in frames 18–45 of the scene.
- Impact SFX plays 2 frames early, and BGM ducks by 7.5 dB under it. Final mix is -14 LUFS integrated, -1.0 dBTP.
- `SOMBER_MEMORIAL` scenes drop percussive slams. Ambient wind or strings carry the weight.

## 7. Output: scene spec

Write `projects/<slug>/scene_specs.json` as an array. One entry per scene:

```json
{
  "scene": 7,
  "act": "III",
  "beat": "REACTION",
  "archetype": "STRUCTURAL_FRACTURE",
  "staging": "PAPER_EXTERIOR",
  "startFrame": 612,
  "durationFrames": 120,
  "plate": "plate_07.jpg",
  "library": ["hardware/ArmoredVehicle", "kit/OrganicExplosion"],
  "camera": "SLOW_PUSH_IN",
  "phase1": { "motion": "STAGGER_IN + DRIFT", "elements": ["vehicle", "dust trail"] },
  "phase2": { "payoffFrameOffset": 32, "hit": "IMPACT_HIT", "secondaryChange": "OrganicExplosion on hull" },
  "text": { "tag": null, "setup": "SHELL HITS THE HULL", "payoff": "CREW TRAPPED" },
  "sfx": { "file": "artillery_shell.wav", "frame": 642 },
  "claim": null,
  "sensitivity": null,
  "viewerSees": "One sentence: what the viewer should see at the payoff frame."
}
```

`viewerSees` is the check the build step uses when it looks at the stills.

## 8. Close the loop

When real retention data is available from YouTube Studio (CSV) or TikTok Analytics (JSON):
```powershell
node scripts/telemetry_priors.js --ingest projects/<slug>/telemetry.json --project <slug>
```
This updates `config/retention_priors.json`, which this skill reads in section 1.

## Gotchas

- `TYPEWRITER` animation on Scene 1 fails `HOOK_TYPEWRITER_LINT`.
- Raw `<img>` or `<image>` in vector scenes fails `PHOTO_PASTE_LINT`.
- Text outside the safe zones in `config/safe_zones.json` fails the safe-zone audit.
- A scene spec without a plate, a library list or a `viewerSees` line is incomplete.
