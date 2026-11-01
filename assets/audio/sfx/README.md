# Shared Procedural Foley & Cinematic SFX Library

Universal, standardized audio assets synthesized for 60 FPS historical documentary reels.

---

## 1. Cue Standards & Ducking Rules

* **Perceptual Lead Bias**: All transient impact SFX (`sub_boom.wav`, `stamp_slam.wav`, `rifle_crack.wav`) should lead the visual impact by **2 frames** (`-33ms` audio-leading-video sync) for crisp perceptual synchronization.
* **BGM Ducking**: When `stamp_slam.wav` or `sub_boom.wav` lands, duck background music by **`-7.5 dB`** with a 6-frame release.
* **Mastering Target**: All reel audio must be mastered to broadcast standard **`-14 LUFS`**, `-1.0 dBTP`, and `LRA=11` via FFmpeg `loudnorm`.

---

## 2. Audio Manifest

| File | Sample Duration | Typical Narrative Cue |
| :--- | :--- | :--- |
| **`stamp_slam.wav`** | `0.70s` | Red payoff line impact slams (`offset = 18–45f`), date stamps. |
| **`sub_boom.wav`** | `1.20s` | Scene cuts, detonation impacts, turning points, crisis escalation. |
| **`counter_roll.wav`** | `0.80s` | Rolling number counter updates (`0.6s` / 36 frames duration). |
| **`radar_ping.wav`** | `0.45s` | Radar sweep blips, tactical map coordinate lock-ons. |
| **`artillery_shell.wav`**| `1.40s` | Explosions, structural fractures, naval broadsides. |
| **`rifle_crack.wav`** | `0.50s` | Kinetic gunfire, skirmishes, assassination triggers. |
| **`metal_clang.wav`** | `0.65s` | Melee collisions, tank armor deflections, gate breaches. |
| **`paper_rip.wav`** | `0.28s` | Declassification reveals, telegram reveals, dossier unfoldings. |
| **`war_drum.wav`** | `0.90s` | Dramatic cadence under troop movements, march reveals. |
| **`typewriter_burst.wav`** | `0.65s` | Rapid primary-source wire reveals, ticker tape alerts. |
| **`typewriter_tick.wav`** | `0.06s` | Single character telemetry clicks. |
