---
trigger: glob
globs: "src/**/*.tsx, src/timelines/*.json, .agents/**/*.md"
---
# Historical Motion Graphics Production Workflow Protocol

This protocol codifies the seven modular scene archetypes, proportional five-act narrative structure, zero-drift beat matching, editorial integrity, and automated pre-render QA standards.

---

## 1. Seven Modular Scene Archetypes & Rotation Discipline (`ARCHETYPE_ROTATION_LINT`)
Build scenes from these seven reusable templates, rotating archetypes so no single archetype repeats more than twice consecutively and consecutive projects never share the same Scene 1 hook archetype:
1. **`LONE_LEADER`**: Backlit dark silhouette of a key historical actor with at most one colored accent prop.
2. **`CROWD_TALLY`**: Repeating silhouette ranks or tally cluster paired with a synchronized `0.6s` rolling integer counter.
3. **`VEHICLE_IN_TRANSIT`**: Aircraft, warship, or armored vehicle traversing the lower-third artwork zone (`y = 864–1498px`) with continuous secondary micro-motion.
4. **`STRUCTURAL_FRACTURE`**: Architectural facade, fortress, bunker, or bridge sustaining impact with rising ember/smoke particles.
5. **`VECTOR_MAP`**: High-contrast topographic vector contours, water bodies, and route waypoints (`100px` vehicle clearance buffer, max 1–2 word labels).
6. **`SPLIT_CONFRONTATION`**: Two opposing commanders, forces, or doctrines separated by a sharp vertical or diagonal tension split.
7. **`QUOTE_CARD`**: Primary-source intercept, telegram, diary, or declassified cable reveal with source attribution pill (`visualPayload.quoteAttribution`) and live waveform micro-motion.

---

## 2. Proportional Five-Act Micro-Arc (`2,700–3,500` Frames / `45.00s–58.33s`)
Every script is structured into five proportional narrative blocks across the total reel duration:
- **Act I: The Hook (`0% – 7%` of duration, ~1–2 scenes)**
- **Act II: The Inciting Crisis (`7% – 30%` of duration, ~4–6 scenes)**
- **Act III: The Escalating Crucible (`30% – 65%` of duration, ~6–9 scenes)**
- **Act IV: The Turning Point (`65% – 85%` of duration, ~3–5 scenes)**
- **Act V: Symmetric Resolution & Loop/CTA (`85% – 100%` of duration, ~2–4 scenes)**

---

## 3. Pacing, Onset & Drop Detection & Audio Mastering
- **Single Canonical Ceiling (`MAX_FRAMES = 3500`)**: Every reel must clock between **`2,700` and `3,500` frames** (`45.00s` to `58.33s` @ 60 FPS) with **16 to 29 cuts** (`120–168f` per scene; up to `180f` on final epilogue).
- **Onset & Drop Detection (Replacing Static BPM Grids)**: `extract_beat_grid.py` utilizes Librosa/Aubio multi-band spectral flux to detect actual audio energy peaks, bass drops (sub-bass 20–220Hz), cymbal crashes (high-band 3500–11000Hz), and rhythmic onsets. Scene transitions within `[120, 168]` snap to drops and crashes, while `STRUCTURAL_FRACTURE` hits lock directly to audio impact transients.
- **Perceptual SFX Lead (`-2f`) & Automatic BGM Ducking (`-7.5 dB`)**: Transient SFX fire 2 frames early; BGM ducks automatically under payoff slams and explosions.
- **EBU R128 / Platform Loudness Mastering**: Final MP4 exports are mastered via FFmpeg `loudnorm=I=-14:TP=-1.0:LRA=11`.

---

## 4. Editorial Fact-Check Citations & Sensitivity Mode
- **Metric Citations (`scene.claim`)**: Every scene presenting quantitative casualties, distances, or dates includes `claim: { text, source, url, verified }`, automatically exported into `deliverables/metadata.json` and `post_copy.md`.
- **Sensitivity Mode (`SOMBER_MEMORIAL`)**: On solemn mass-casualty scenes, `SOMBER_MEMORIAL` disables triumphant scale slams and `stamp_slam.wav` in favor of dignified `SLOW_REVEAL` fades.

---

## 5. Automated Pre-Render QA & Deliverables (`scripts/pipeline.js`)
Before any production export:
1. Run `node scripts/pipeline.js --project <slug> --audit-stills --auto-fix`.
2. Inspect `projects/<slug>/audit/audit_report.json` (`passed: true`, zero `FONT_LINT`, `PHOTO_PASTE_LINT`, `PALETTE_LINT`, `CAMERA_DISCIPLINE_LINT`, or `GLYPH_WIDTH_AND_LINE_CAP` errors).
3. Verify generated deliverables in `projects/<slug>/deliverables/` (`captions.srt`, `metadata.json`, `post_copy.md`, `poster.png`, `poster_4x5.png`).
