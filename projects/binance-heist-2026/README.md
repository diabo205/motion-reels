# Project: 2026 Binance Heist & North Korea Cyber Offensive

## Overview
A high-retention, cinematic 9:16 kinetic motion graphics documentary reel capturing the human, emotional, and geopolitical reality of the North Korea hack on Binance. Rather than dry technical jargon, this reel tells a gripping emotional story: how an impoverished nation living in complete nocturnal blackout deployed its conscripted teenage cyber army (Unit 121 / TraderTraitor) to drain $6.36 billion from millions of unsuspecting global accounts in twenty silent minutes—transforming digital savings directly into nuclear warheads and intercontinental ballistic missiles. The narrative culminates with Binance deploying its corporate reserves to shield ordinary depositors and delivers the stark final revelation: the frontline of modern warfare is no longer the border—it is already inside your pocket.

## Specifications
- **Resolution**: 1080 x 1920 (9:16 vertical)
- **Framerate**: 60 FPS
- **BPM**: 123.05 BPM (Librosa transient-driven analysis: 532 transients, 147 drops, 73 crashes)
- **Total Duration**: 24 scenes • 3,500 total frames • **58.33 seconds** (Strictly within the 45.0s – 58.33s short-form ceiling; $\le 3,500$ frames @ 60 FPS)
- **Pacing**: 2.06s – 2.80s per cut (124 to 168 frames per scene; zero static holds)
- **Audio**: `audio/bgm_binance.mp3` (HELLBLADE - discipline) + synchronized procedural foley SFX library
  - **Act I: The Hook (0.0s – 5.08s / Scenes 1–2)**: Cyber attribution alert ($6.36B vanished in 20 minutes) and satellite night view of North Korea in darkness.
  - **Act II: The Inciting Crisis (5.08s – 17.43s / Scenes 3–7)**: Subterranean Unit 121 bunker, conscripted cyber cadets, parallel realities split, the security fracture, and millions of global balances draining.
  - **Act III: The Escalating Crucible (17.43s – 37.26s / Scenes 8–15)**: Binance war room defender, 10 blockchains bleeding liquidity, emergency freeze vs escape, declassified finding (rocket fuel), Hwasong ICBM roll, rocket engine ignition, and corporate bailout sacrifice.
  - **Act IV: The Turning Point (37.26s – 49.36s / Scenes 16–20)**: Physical borders bypassed by code, medals pinned on captive child soldiers, frozen cell isolation, fortress breach without artillery, and UN cyber doctrine dossier.
  - **Act V: The Symmetric Resolution & Loop (49.36s – 58.33s / Scenes 21–24)**: Smartphone vs mountain silo confrontation, oceanic cables ghost wealth, terminal screen blackout, and the chilling loop realization: "NEVER AT THE BORDER / ALREADY IN YOUR POCKET".

## Locked Canvas Palette & Atmospheric Cohesion
- **Palette**: Locked `ESPIONAGE_DOSSIER` theme across the entire reel:
  - *Background*: Bunker Black (`#0B1310`) to Dark Slate (`#16221E`)
  - *Setup Text*: Phosphor White (`#ECFDF5`)
  - *Payoff Text*: Alert Red (`#EF4444`)
  - *Accent*: Terminal Cyan (`#38BDF8`) & Amber Glow (`#F59E0B`)
- **Particle Layer**: Subtle subterranean floating particulate (`DUST`) seeded deterministically.

## Kinetic Typography & Zero-Clutter Hierarchy
- **Three-Element Cap**:
  1. Top Context Tag: Location/Incident badge (`hudVisible: true`) displayed only when setting shifts.
  2. White Setup Line: Sharp on global Frame 0, fades in with blur-to-sharp at `0.0s` (`triggerFrameOffset: 0`).
  3. Red Payoff Line: Scale-slams on the exact Librosa-detected bass drop or crash transient in `[18, 45]` frames.
- **Strict Word Budget**: 7 to 9 words total per scene (strictly within the 6–10 word budget; all lines under 35 characters; readable in 1.2s).
- **Single Font Family**: Vendored `Montserrat Black` in ALL-CAPS with `+0.04em` tracking. Zero banned cursive or typewriter fonts.
- **Zero Illustration Text & Single-Source Metrics**: No captions inside lower artwork. Zero duplicated metrics.

## 9:16 Platform Safe Zones
- **Text Zone (18% – 42%)**: Pinned strictly between `y = 346px` and `y = 806px`.
- **Artwork Zone (45% – 78%)**: Pinned strictly between `y = 864px` and `y = 1498px`.
- **Bottom UI Buffer (Bottom 22%)**: `y = 1498px` to `1920px` kept clear of focal content.
- **Right Action Stack Buffer (Right 15%)**: `x = 918px` to `1080px` kept clear of focal content.
