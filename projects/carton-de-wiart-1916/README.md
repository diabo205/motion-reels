# Project: The Unkillable Soldier — Sir Adrian Carton de Wiart VC (1916)

## Overview
A high-retention, cinematic 9:16 kinetic motion graphics documentary reel capturing the legendary, unbelievable wartime odyssey of Sir Adrian Carton de Wiart VC. Shot eleven times across three major conflicts, surviving two plane crashes, losing his left eye and left hand (biting off his own shattered fingers in the Somme trenches), escaping an Italian fortress through a tunnel dug with one hand, and confronting Mao Tse-tung as Churchill's wartime envoy—Carton de Wiart embodied an unbroken spirit of resilience, culminating in his famous memoirs: "Frankly, I had enjoyed the war."

## Specifications
- **Resolution**: 1080 x 1920 (9:16 vertical)
- **Framerate**: 60 FPS
- **BPM**: 112.35 BPM (Librosa transient-driven analysis: 343 transients, 65 drops, 63 crashes)
- **Total Duration**: 25 scenes • 3,443 total frames • **57.38 seconds** (Strictly within the 45.0s – 58.33s short-form ceiling; $\le 3,500$ frames @ 60 FPS)
- **Pacing**: 2.08s – 2.67s per cut (125 to 160 frames per scene; zero static holds)
- **Audio**: `audio/bgm_carton.mp3` (Meet Her At The Love Parade - Slowed) + synchronized procedural foley SFX library
  - **Act I: The Hook (0.0s – 4.30s / Scenes 1–2)**: The Unkillable Soldier hook (shot 11 times, zero fear) and the Second Boer War river ambush.
  - **Act II: The Inciting Crisis (4.30s – 15.83s / Scenes 3–7)**: Indian Cavalry boar charges, Somaliland dervish fortress assault, three bullets through the eye socket & ear, Western Front return with midnight eyepatch, and Ypres artillery duels.
  - **Act III: The Escalating Crucible (15.83s – 35.80s / Scenes 8–15)**: Battlefield amputation of severed fingers in the field hospital, Somme La Boisselle command rallying, bullet through the skull survival, Victoria Cross gallantry award, Polish-Soviet War border defence, dual aircraft crash landings, Cossack cavalry train gunfight, and speeding railway carriage leap.
  - **Act IV: The Turning Point (35.80s – 48.78s / Scenes 16–21)**: World War II recall at age 60, Short Sunderland flying boat strafing run, Mediterranean sea crash & swim to Italian captivity, Vincigliata fortress prison, 7-month one-handed tunnel escape, and sunburned peasant disguise capture.
  - **Act V: The Symmetric Resolution & Loop (48.78s – 57.38s / Scenes 22–25)**: Churchill & Mao diplomatic envoy in Chongqing, tally of eleven combat wounds, *Happy Odyssey* memoir quotation ("Frankly I had enjoyed the war"), and the seamless looping tribute to Sir Adrian Carton de Wiart VC.

## Locked Canvas Palette & Atmospheric Staging
- **Palette**: Locked `CONFLICT_CRISIS` theme across the entire reel:
  - *Sky Gradients*: MOTIVATED warm terracotta (`#9A3412`), amber veld (`#B45309`), deep Mediterranean azure (`#1E3A8A`), and dark smoke umber (`#1C1917`).
  - *Staging Styles*: Tactile torn paper (`TACTILE_TORN_PAPER`), `SUNBURST_HERO`, `WOOD_PANEL`, and `GRAPH_GRID`.
  - *Setup Text*: Antique Parchment White (`#FDFBF7`)
  - *Payoff Text*: Crimson VC Red (`#DC2626` / `#EF4444`)
  - *Uniform Materials*: Authentic khaki wool serge (`#3B3426`), polished brass buttons (`#F59E0B`), and midnight eyepatch (`#18181B`).
- **Particle Layer**: Persistent atmospheric combat ash (`ASH`) seeded deterministically.

## Kinetic Typography & Zero-Clutter Hierarchy
- **Three-Element Cap**:
  1. Top Context Tag: Location/Date badge (`hudVisible: true`) displayed only when setting shifts.
  2. White Setup Line: Sharp on global Frame 0, fades in with blur-to-sharp at `0.0s` (`triggerFrameOffset: 0`).
  3. Red Payoff Line: Scale-slams on the exact Librosa-detected bass drop or crash transient in `[18, 45]` frames.
- **Strict Word Budget**: 6 to 8 words total per scene (strictly within the 6–10 word budget; all lines under 35 characters; readable in 1.2s).
- **Single Font Family**: Vendored `Montserrat Black` in ALL-CAPS with `+0.04em` tracking. Zero banned cursive or typewriter fonts.
- **Zero Illustration Text & Single-Source Metrics**: No captions inside lower artwork. Zero duplicated metrics.

## 9:16 Platform Safe Zones
- **Text Zone (18% – 42%)**: Pinned strictly between `y = 346px` and `y = 806px`.
- **Artwork Zone (45% – 78%)**: Pinned strictly between `y = 864px` and `y = 1498px`.
- **Bottom UI Buffer (Bottom 22%)**: `y = 1498px` to `1920px` kept clear of focal content.
- **Right Action Stack Buffer (Right 15%)**: `x = 918px` to `1080px` kept clear of focal content.
