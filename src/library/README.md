# Motion Reels Reusable Asset Library (`src/library`)

A battle-tested, modular library of parameterized React/Remotion visual components, procedural SFX, and animation rigs for 9:16 documentary reels (`1080x1920 @ 60 FPS`).

---

## 1. Directory Structure

```text
src/library/
├── atmospheric/          # Continuous deterministic particles & locked canvas themes
│   ├── AtmosphericBackground.tsx
│   └── index.ts
├── typography/           # Safe-zone pinned 2-beat kinetic text & telemetry pills
│   ├── KineticTextStack.tsx
│   ├── PersistentHudBadge.tsx
│   └── index.ts
├── tactile/              # Die-cut cards, rolling number counters, puppets
│   ├── PaperCutoutCard.tsx
│   ├── TactilePropCards.tsx  (PaperSignCounter, CascadingPaperStack, HingedCutoutReveal)
│   ├── CutoutPuppet.tsx
│   └── index.ts
├── characters/           # Parameterized commander/soldier silhouettes & marching ranks
│   ├── SilhouetteCharacter.tsx
│   ├── MarchingInfantryRank.tsx
│   └── index.ts
├── hardware/             # Tanks, fighter jets, transport planes, warships, radar dishes
│   ├── MilitaryHardware.tsx
│   └── index.ts
├── tactical/             # Concentric radar sweeps, crosshairs, sinusoidal flags
│   ├── TacticalRadarGrid.tsx
│   ├── WavingFlagSvg.tsx
│   └── index.ts
└── index.ts              # Master barrel export
```

---

## 2. Component Quick Reference

### Atmospheric & Backgrounds
* **`AtmosphericBackground`**: Continuous dark gradient canvas + deterministic PRNG particle emitters (`SNOW`, `ASH`, `RAIN`, `DUST`). Keyed to `(emitterId, globalFrame)` so particles remain unbroken across isolated cuts and full renders.
```tsx
import { AtmosphericBackground } from '../library';

<AtmosphericBackground
  theme="CONFLICT_CRISIS"
  particleEmitter="ASH"
  globalFrame={frame}
/>
```

### Kinetic Typography (Safe-Zone Enforced)
* **`KineticTextStack`**: Two-beat text reveal pinned strictly to the upper text zone ($y = 346\text{px}$ to $806\text{px}$). White setup line at `offset = 0` + Spring-damped red payoff slam at beat transients.
* **`PersistentHudBadge`**: Pinned top location/date telemetry pill badge.
```tsx
import { KineticTextStack, PersistentHudBadge } from '../library';

<PersistentHudBadge text="MOSCOW • MAY 1, 1960" frame={frame} />
<KineticTextStack
  textLayers={[
    { text: "AT 70,000 FEET", color: "#F4F7FA", triggerFrameOffset: 0 },
    { text: "RADAR LOCKED ON", color: "#E63228", triggerFrameOffset: 30 }
  ]}
  sceneStartFrame={scene.startFrame}
/>
```

### Tactile Props & Counters
* **`PaperSignCounter`**: Rolling number odometer counter with configurable start/end values, prefix (`$`, `CASUALTIES: `), and impact stamps (`CONFIRMED`, `DECLASSIFIED`).
```tsx
import { PaperSignCounter } from '../library';

<PaperSignCounter
  tagText="OFFICIAL LOSSES"
  startValue={0}
  endValue={137}
  rollStartFrame={12}
  rollDurationFrames={48}
  stampText="VERIFIED"
  stampFrame={65}
/>
```

### Characters & Troop Tallies
* **`SilhouetteCharacter`**: Grim history silhouette standard with atmospheric backlighting (`AMBER_FIRE`, `AURORA_CYAN`, `ICE_WHITE`) and singular accent prop (`SCARF`, `ARMBAND`, `MEDAL`).
* **`MarchingInfantryRank`**: Stride-phase offset marching silhouette columns with slanted bayonets for crowd tallies.
```tsx
import { SilhouetteCharacter, MarchingInfantryRank } from '../library';

<SilhouetteCharacter
  figureType="COMMANDER"
  accentColor="#E63228"
  accentProp="SCARF"
  backlightType="AMBER_FIRE"
  positionX={540}
  positionY={1180}
/>

<MarchingInfantryRank
  soldierCount={7}
  spacing={90}
  scale={1.2}
  facing="RIGHT"
/>
```

### Military Hardware Silhouettes
* **`FighterJetSilhouette`**: Supersonic jet with animated afterburner flame jitter.
* **`TankSilhouette`**: Rotating turret, tread road-wheels with continuous spin, and insignia.
* **`TransportAircraftSilhouette`**: Heavy lifter with turboprop blur discs.
* **`NavalVesselSilhouette`**: Destroyer or cargo ship with water wake and roll physics.
* **`RadarDishSilhouette`**: Early warning array with parabolic dish oscillation.
```tsx
import { TankSilhouette, FighterJetSilhouette, RadarDishSilhouette } from '../library';

<TankSilhouette scale={1.2} turretAngle={-8} accentProp="RED_STAR" />
<FighterJetSilhouette scale={1.4} angle={-15} showAfterburner={true} />
<RadarDishSilhouette scale={1.5} rotationSpeed={1.2} highlightBeams={true} />
```

### Tactical Grids & Flags
* **`TacticalRadarGrid`**: Concentric range rings, rotating sweep line, degree ticks, and pulsing blips.
* **`WavingFlagSvg`**: 120-slice sinusoidal cloth wave animation for national flags and banners.
```tsx
import { TacticalRadarGrid, WavingFlagSvg } from '../library';

<TacticalRadarGrid
  radius={280}
  sweepSpeed={1.0}
  blips={[
    { x: -90, y: -120, label: "BOGEY 01", isHostile: true },
    { x: 140, y: 60, label: "RECON" }
  ]}
/>
```
