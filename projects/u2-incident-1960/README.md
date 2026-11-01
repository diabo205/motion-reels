# Project: 1 May 1960 U-2 Incident Cold War Espionage Reel (Revised Settings)

## Overview
A prestige, high-retention 9:16 kinetic motion graphics documentary reel covering the dramatic shootdown of CIA pilot Francis Gary Powers in a Lockheed U-2 reconnaissance aircraft over Sverdlovsk, Soviet Union, on May 1, 1960. The mission—Operation GRAND SLAM—took off from Peshawar Air Station, Pakistan, and its aftermath exposed Eisenhower's NASA weather plane cover story, caused the collapse of the 1960 Paris East-West Peace Summit, and led to the legendary 1962 "Bridge of Spies" prisoner exchange for Soviet spymaster Rudolf Abel.

## Specifications (Revised Historical Motion Standard)
- **Resolution**: 1080 x 1920 (9:16 vertical)
- **Framerate**: 60 FPS
- **BPM**: 104 BPM (beat-quantized keyframes @ 34.6 frames/beat, 138.5 frames/bar)
- **Total Duration**: 19 scenes • 2,948 total frames • **49.13 seconds** (Strictly within the 45.0s – 58.5s short-form ceiling; $\le 3,500$ frames @ 60 FPS)
- **Pacing**: 2.50s – 2.75s per cut (150 to 165 frames per scene; no 4-second static holds)
- **Audio**: `public/audio/bgm_u2.mp3` + synchronized procedural foley SFX library
  - **Act I: The Hook (0.0s – 5.0s / Scenes 1–2)**: Peshawar takeoff & 70,000 ft stratosphere climb.
  - **Act II: The Inciting Crisis (5.0s – 17.6s / Scenes 3–7)**: Continental flight corridor, Hycon camera, Soviet P-30 radar alert, 14-missile salvo, and supersonic proximity detonation (Missile Drop @ 15.0s / Bar 7-8).
  - **Act III: The Escalating Crucible (17.6s – 30.4s / Scenes 8–12)**: Cockpit struggle, KGB farm capture, White House cover-up dossier, fake NASA U-2, and Kremlin 4-day silent trap.
  - **Act IV: The Turning Point (30.4s – 40.7s / Scenes 13–16)**: Khrushchev bombshell speech, Gorky Park exhibition, Paris summit collapse, and Moscow trial.
  - **Act V: The Symmetric Resolution (40.7s – 49.0s / Scenes 17–19)**: Glienicke Bridge swap, SR-71 Blackbird transition, and engraved brass memorial plaque.

## Locked Canvas Palette & Atmospheric Cohesion
- **Palette**: Locked `ESPIONAGE_DOSSIER` theme across the entire video:
  - *Background*: Bunker Black (`#0B1310`) to Dark Slate (`#16221E`)
  - *Setup Text*: Phosphor White (`#ECFDF5` / `#F4F7FA`)
  - *Payoff Text*: Alert Red (`#EF4444` / `#E63228`)
  - *Accent*: Radar Cyan (`#38BDF8`) & Amber (`#FFD166`)
- **Particle Layer**: Disabled (`NONE`) to preserve sterile high-level espionage and archival clarity.

## Kinetic Typography & Zero-Clutter Hierarchy
- **Three-Element Cap**:
  1. Top Context Tag: Location/Era badge (`hudVisible: true`) displayed **strictly when setting shifts**.
  2. White Setup Line: Fades in with a 150ms blur-to-sharp transition at `0.0s` (`triggerFrameOffset: 0`).
  3. Red Payoff Line: Scale-slams on the musical beat at `0.5s` (`triggerFrameOffset: 30`).
- **Strict Word Budget**: 7 to 10 words total per scene (strictly within the 6–10 word budget; all lines under 35 characters; readable in 1.2s).
- **Single Font Family**: Heavy geometric sans-serif (`Montserrat Black` / `Inter ExtraBold`) in ALL-CAPS across the entire reel. Zero cursive (`Caveat`) or typewriter (`Courier Prime`) font clutter.
- **Zero Illustration Text & Single-Source Metrics**: No data placards or sentence blocks inside lower-third artwork. Zero duplicated metrics.

## 9:16 Platform Safe Zones
- **Text Zone (18% – 42%)**: Strictly pinned between `y = 346px` and `y = 806px`.
- **Artwork Zone (45% – 78%)**: Strictly pinned between `y = 864px` and `y = 1498px`.
- **Bottom UI Buffer (Bottom 22%)**: `y = 1498px` to `1920px` kept completely free of focal elements.
- **Right Action Stack (Right 15%)**: `x = 918px` to `1080px` clear of focal artwork and labels.

## Vector Components (`src/components/U2IncidentVectors.tsx`)
1. `PeshawarAirbaseU2DawnSilhouette`: Runway 17/35 at PAF Badaber, pre-dawn lamps, control tower, and U-2 on taxiway with Gary Powers puppet (`poseSwitchFrame={30}`).
2. `U2StratosphereTelemetryVector`: Cruising at 70,500 ft, curved earth horizon, ozone blue glow, parametric rolling altimeter dial.
3. `GrandSlamContinentalMapVector`: 2,900-mile flight corridor from Peshawar to Bodø, Norway with clean geometric waypoint labels.
4. `HyconCameraSurveillanceSchematic`: 36-inch f/10 optical folding camera, film rolls, and Mayak plutonium complex aerial negative.
5. `SovietP30RadarAlertVector`: P-30 "Duga" rotating lattice radar and green CRT oscilloscope blip.
6. `S75DvinaLaunchBatteryVector`: Elevated rail launcher, rocket booster blast plume, and 14-missile salvo counter.
7. `U2ExplosionDestructionVector`: Proximity warhead detonation with concentric geometric blast rings, fragmentation shrapnel polygons, sliced stabilizer drifting along dotted trajectories, and telemetry readouts (`ALT: 70,500 FT`, `PITCH TRIM: FAILED`, `G-LIMIT EXCEEDED`).
8. `PowersBailoutAndCurareCoinCard`: Cockpit struggle against negative-G spin and unreachable destruct switches (0–0.7s), followed by pilot ejection into stratosphere freefall and high-altitude parachute canopy bloom at 15,000 FT holding open for 1.72s (1.08s–2.80s).
9. `KgbGroundCaptureVector`: Kosulino collective farm landscape, confiscated silenced .22 pistol, rubles, and Powers surrounded.
10. `NasaCoverUpDossierCard`: Redacted executive memo with black classified bars, official cover story stamp, and Eisenhower puppet (`poseSwitchFrame={30}`).
11. `FakeNasaU2SchematicVector`: Edwards AFB press showcase of U-2 with fake yellow tail band and registration `NASA 55741`.
12. `KhrushchevSupremeSovietPodiumStage`: Grand Kremlin Palace rostrum, gold hammer & sickle emblem, and smiling Khrushchev puppet (`poseSwitchFrame={30}`).
13. `KhrushchevSpeechBombshellVector`: Supreme Soviet speech bombshell card with impact shake and triumph gesture (`poseSwitchFrame={30}`).
14. `GorkyParkWreckageExhibitionVector`: Moscow public pavilion display of zinc-chromate green U-2 wreckage, camera lenses, and crowd.
15. `ParisSummitCollapseCard`: Diplomatic deadlock card with cancelled détente status and confrontation puppets (`poseSwitchFrame={30}`).
16. `MoscowMilitaryTribunalCard`: Hall of Columns trial, prisoner dock, and military tribunal guilty verdict (`poseSwitchFrame={30}`).
17. `GlienickeBridgeSpiesVector`: Famous "Bridge of Spies" iron truss bridge in freezing Berlin fog with Powers and Rudolf Abel swap (`poseSwitchFrame={30}`).
18. `WavingFlagSovietUsStage`: 120-slice waving Soviet flag transitioning to SR-71 Blackbird stratosphere silhouette.
19. `U2EpilogueBrassPlaqueCard`: Weathered bronze engraved memorial plaque with 4 corner hex screws, gold laurel leaves, and historic epilogue.
