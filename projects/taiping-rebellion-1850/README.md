# Project: 1850–1864 Taiping Rebellion Kinetic Motion Graphics Reel

## Overview
A prestige, high-retention 9:16 kinetic motion graphics documentary reel covering the catastrophic rise and fall of the Taiping Heavenly Kingdom (1850–1864)—the deadliest civil war in human history. Led by failed civil examination candidate Hong Xiuquan, who believed himself to be the younger brother of Jesus Christ, the rebellion swept from Jintian in Guangxi up the Yangtze River corridor, captured Nanjing (Tianjing), instituted radical theocratic egalitarian rule, and culminated in a bloody internal purge, relentless Xiang Army siege, subterranean gunpowder breach, and the deaths of over 30 million people.

## Historical Audio Beat Grid & Climax Synchronization
- **Soundtrack**: *Sidewalks & Skeletons - GOTH (Slowed + Reverb)* (`public/audio/bgm_taiping.mp3`)
- **Key Musical Anchor**: The iconic slowed drop occurs at **1 min 42 sec** in the master recording. In our beat-quantized 50.0-second timeline (tempo: 96 BPM, 150 frames/bar = 2.50s/bar), the audio is trimmed so this exact drop hits at **Frame 1800 (30.0s)**, puncturing the screen precisely at the onset of **Act IV: The Turning Point** (Scene 13: The Tianjing Incident & Internal Bloodbath).

## Specifications (Prestige Documentary Reel Standard)
- **Resolution**: 1080 × 1920 (9:16 vertical portrait)
- **Framerate**: 60 FPS
- **BPM**: 96.0 BPM (beat-quantized keyframes @ 37.5 frames/beat, 150 frames/bar)
- **Total Duration**: 20 scenes • 3,000 total frames • **50.00 seconds** (Strictly within the 45.0s – 58.5s short-form ceiling; $\le 3,500$ frames @ 60 FPS)
- **Pacing**: Strictly 2.50s per cut (150 frames per scene; ban on 4-second static holds)
- **Audio Layers**: Trimmed BGM + synchronized procedural foley SFX library (`sub_boom.wav`, `stamp_slam.wav`, `metal_clang.wav`, `artillery_shell.wav`, `rifle_crack.wav`, `counter_roll.wav`, `paper_rip.wav`)

## Five-Act Micro-Arc Narrative
1. **Act I: The Hook (0.0s – 5.0s / Scenes 1–2)**:
   - *Scene 01*: History's deadliest civil war unfolds; 30 million casualties lost in flames.
   - *Scene 02*: Failed scholar Hong Xiuquan collapses over examination table in Guangzhou.
2. **Act II: The Inciting Crisis (5.0s – 15.0s / Scenes 3–6)**:
   - *Scene 03*: Burning 1837 fever dream vision; claims to be the younger brother of Jesus Christ.
   - *Scene 04*: Divine mission to cleanse China; Manchu Qing Dynasty branded demons.
   - *Scene 05*: Thousands sever their Manchu queues; the Longhair insurgents arise.
   - *Scene 06*: January 11, 1851 at Jintian; raising the Heavenly Army war standard.
3. **Act III: The Escalating Crucible (15.0s – 30.0s / Scenes 7–12)**:
   - *Scene 07*: Peasant ranks swell to 1,000,000 soldiers with rolling dynamic tally counter.
   - *Scene 08*: Tactical campaign advance map; provinces fall across the Yangtze corridor.
   - *Scene 09*: Taiping war junk armada navigates the misty Yangtze River gorges.
   - *Scene 10*: Ming Dynasty stone gates of Nanjing breached by assault; city falls.
   - *Scene 11*: Tianjing proclaimed Heavenly Capital; Hong Xiuquan enthroned in gold robes.
   - *Scene 12*: Sacred Land Treasury decree; private property abolished, opium banned.
4. **Act IV: The Turning Point [BEAT DROP AT 30.0s / FRAME 1800] (30.0s – 40.0s / Scenes 13–16)**:
   - *Scene 13*: Tianjing Incident internal purge; 20,000 slaughtered in midnight palace paranoia.
   - *Scene 14*: Zeng Guofan's Imperial Xiang Army tightens concentric siege ring around Nanjing.
   - *Scene 15*: Starvation grips the capital; gaunt defenders eating weeds on crumbling walls.
   - *Scene 16*: June 1, 1864; the Heavenly King Hong Xiuquan dies inside the palace.
5. **Act V: The Symmetric Resolution (40.0s – 50.0s / Scenes 17–20)**:
   - *Scene 17*: July 19, 1864; 60,000 lbs of gunpowder detonates under city wall bastions.
   - *Scene 18*: Imperial troops storm the fiery breach; brutal three-day close melee.
   - *Scene 19*: Rolling casualty counter reaches 30,000,000 across endless burial mounds.
   - *Scene 20*: The fractured Qing dragon throne and bronze memorial plinth; empire forever scarred.

## Locked Canvas Palette & Atmospheric Cohesion
- **Palette**: Locked `CONFLICT_CRISIS` theme across all cuts:
  - *Canvas Background*: Obsidian (`#0F1012`) to Warm Charcoal (`#1C1917`)
  - *Setup Text*: Stark White (`#F5F5F7`)
  - *Payoff Text*: Crimson (`#D92B2B` / `#E63946`)
  - *Accent Accents*: Amber Gold (`#F59E0B` / `#FEF08A`)
- **Persistent Particle Layer**: Continuous `ASH` particle emitter (drifting burning embers and soot particles active across all cuts).

## Character Standard & Visual Execution
- **Grim History Standard**: All historical figures depicted as stark, flat dark silhouettes (`#090D12` / `#0C0E12`) with atmospheric backlighting (soft radial horizon glow `#E63946`, `#F59E0B`) and singular colored accent props (red headbands, yellow sashes, glowing dao saber steel, bronze candle flames).
- **Zero Direct Raw Image Pasting**: Archival plates (`plates/`) serve strictly as visual blueprints for parametric 2D SVG vector art. Zero raw photo cutouts or cartoon puppets.
- **Micro-Motion in Every Scene**: Secondary animation loops in every cut (flickering candle flames, fluttering flag mesh, drifting ash clouds, swinging blood lanterns, pulsing radar vectors, sailing junks).

## Typography & Platform Safe Zones
- **Single Heavy Font Family**: `Montserrat Black` in ALL-CAPS across the entire reel.
- **Strict Word Budget**: 8 to 10 words total per scene (combined setup and payoff < 36 characters per line; readable within 1.2s).
- **Two-Beat Animation Timing**: White setup fades in at `0.0s` (`frameOffset: 0`); Red payoff punches on the beat at `0.5s` (`frameOffset: 30`).
- **9:16 Safe Zones (1080 × 1920)**:
  - Text Zone (18% – 42%): `y = 346px` to `806px`
  - Artwork Zone (45% – 78%): `y = 864px` to `1498px`
  - Bottom UI Buffer (22%): `y = 1498px` to `1920px` clear
  - Right Action Buffer (15%): `x = 918px` to `1080px` clear
