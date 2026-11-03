---
name: script-beat-compiler
description: Compiles a script, scene specs and an audio beat grid into a frame-accurate 60fps timeline JSON. Invoke after pre-production and audio analysis, or when retiming a reel.
tools: ["read_file", "write_file", "edit_file", "run_command"]
mainAgent: false
subagent: true
model: flash
commandExecutionPolicy: auto
---
# Script & Audio-Anchor Compiler

Translate the script, `projects/<slug>/scene_specs.json`, `assets/audio/beat_grid.json`, `config/pipeline_constants.json` and `config/retention_priors.json` into `src/timelines/<project>.json`, valid against `.agents/skills/build-historical-reel/schemas/timeline.schema.json`.

Numbers (total duration, scene pacing window, hook cap, word budget, font floors, dead hold) come from `config/pipeline_constants.json`. Read them there. The audit enforces them.

## What the spec gives you and what you decide

The scene spec supplies archetype, staging, beat, camera, text, library components and approximate frames. Its frame values (`startFrame`, `durationFrames`, `payoffFrameOffset`, `sfx.frame`) are provisional. You set the final frames by snapping to the beat grid.

## Rules

1. **Cuts and duration.**
   - Snap each `startFrame` to a recommended cut (`BASS_DROP`, `CYMBAL_CRASH`, `ENERGY_PEAK`) from `beat_grid.json`.
   - Keep every scene inside the pacing window. If a snap would break the window, move the cut to the nearest transient that fits. Do not stretch the window.
   - Total duration must fall inside the config's range. The final epilogue scene may use the longer epilogue limit.
   - Bias each archetype toward its best duration bucket in `config/retention_priors.json`.

2. **Hook (Scene 1).**
   - Archetype is `SPLIT_CONFRONTATION`, `STRUCTURAL_FRACTURE` or `VEHICLE_IN_TRANSIT`, and differs from the opening archetype of the previous two reels (`recentHookArchetypeHistory`).
   - Duration is at most the hook cap in the config.
   - Frame 0 is fully sharp. The setup text starts at `triggerFrameOffset: 0` with no typewriter animation.
   - A heavy impact SFX is scheduled on frame 0.

3. **Five acts, proportional.** Stretch the acts across the actual reel length: I Hook 0–7%, II Inciting Crisis 7–30%, III Escalating Crucible 30–65%, IV Turning Point 65–85%, V Resolution and Loop 85–100%. Act I is an immediate high-stakes crisis. Act V flows back into Scene 1 (`meta.loopSeamless: true`). There are no fixed scene counts per act.

4. **Text layers.** At most three per scene:
   - Optional context tag, shown only when the setting or time shifts and never on consecutive scenes.
   - White setup line, `triggerFrameOffset: 0`.
   - Red payoff line, `triggerFrameOffset` set to the strongest transient (`BASS_DROP`, `CYMBAL_CRASH`, `ENERGY_PEAK` or `BEAT_ONSET`) that falls 18–45 frames after the scene's `startFrame`. Never hardcode one offset across scenes.
   - Copy follows the word and line budget in the config, measured with `scripts/font_metrics.js`.

5. **Archetypes.** Use the archetype from the spec. No archetype more than twice in a row. Space `STRUCTURAL_FRACTURE` or `SPLIT_CONFRONTATION` every 4–6 scenes. `STRUCTURAL_FRACTURE` scenes lock the impact hit, camera shake and SFX to the primary `BASS_DROP` or `CYMBAL_CRASH` in `structuralFractureRecommendations`. `QUOTE_CARD` scenes carry `visualPayload.quoteAttribution`.

6. **Camera.** One of `STATIC`, `SLOW_PUSH_IN`, `PARALLAX_PAN_RIGHT`, `CRANE_SWEEP_UP`, `DUTCH_TILT`, `IMPACT_SHAKE`. `SNAP_ZOOM` and `CRASH_ZOOM` are banned. `STRUCTURAL_FRACTURE` scenes use `IMPACT_SHAKE`, except `SOMBER_MEMORIAL` scenes, which use a slow fade instead.

7. **Editorial.** Every scene with a metric or casualty figure carries `claim: { text, source, url, verified }`. Solemn casualty or memorial scenes get `sensitivity: "SOMBER_MEMORIAL"`, so `KineticTextStack` and `HistoricalReel` use `SLOW_REVEAL` fades instead of slams.

8. **Audio.** Transient SFX (`sub_boom.wav`, `stamp_slam.wav`, `artillery_shell.wav`) use `leadFrames: 2`.

9. **Meta.** Include `meta.bgmLicense` (`{ source, licenseType, clearanceId }`) and `meta.loopSeamless`.

## Validate

```powershell
npm run audit:fast -- --project <slug>
```
Fix every error. `BEAT_SYNC_PAYOFF` and `CAMERA_DISCIPLINE_LINT` can be fixed automatically with `npm run audit:fix -- --project <slug>`. Report anything you could not fix, with the lint code.
