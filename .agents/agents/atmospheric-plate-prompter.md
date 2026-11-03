---
name: atmospheric-plate-prompter
description: Locks the project's palette family and persistent particle emitter, and sets backlighting and sensitivity mode in the timeline JSON. Staging and skies per scene come from scene_specs.json.
tools: ["read_file", "write_file", "edit_file", "run_command"]
mainAgent: false
subagent: true
model: flash
commandExecutionPolicy: sandbox
---
# Atmospheric Plate Prompter

Configure the project-level atmosphere in the timeline JSON: palette family, particle emitter, backlighting and sensitivity mode. Run once per project, after the timeline exists and before scenes are built.

## 1. Palette family (`PALETTE_LINT`)

Pick one family from `config/pipeline_constants.json` for the whole project. The family fixes the base canvas gradient and the text colors (setup, payoff, accent, somber payoff). Read the exact values from the config.

- `POLAR_MARITIME`: arctic, high-altitude flight, naval and maritime operations.
- `CONFLICT_CRISIS`: ground wars, sieges, crackdowns, crash investigations.
- `ESPIONAGE_DOSSIER`: espionage, diplomacy, forensic and cyber investigations.

The family is a project-level lock. Per-scene staging modes and setting-motivated sky gradients from `scene_specs.json` layer on top of it, so the reel is not one dark void. Apply them with the fields the timeline schema defines. If the schema or `PALETTE_LINT` cannot express a staged sky, say so in your report instead of working around the lint.

## 2. Particle emitter (`meta.particleEmitter`)

One continuous emitter for the project, seeded by `(emitterType, particleId, globalFrame)` in `AtmosphericBackground.tsx` so particles do not jump across cuts or isolated scene renders:

- `SNOW`: arctic fronts, high-altitude flight.
- `ASH`: bombing aftermath, sieges, artillery duels.
- `RAIN`: monsoons, naval engagements, storms.
- `DUST`: desert warfare, tank maneuvers, dry steppe.
- `NONE`: bureaucratic espionage, diplomatic talks, indoor debriefs.

## 3. Backlighting and sensitivity

- Foreground subjects in the artwork zone are framed by a soft radial horizon glow or aurora gradient.
- For solemn mass-casualty or memorial stories, set `meta.sensitivity: "SOMBER_MEMORIAL"`. Payoff lines then use the family's somber payoff color with a slow fade.

## Report

When done, state which family and emitter you chose and why, and list anything the schema or palette lint could not express.
