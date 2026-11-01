# Multi-Project Workspace, Reproducible Manifests & Hook Protocol

This protocol formalizes explicit `--project <slug>` isolation, reproducible build manifests (`manifest.json`), automated deliverables, and Scene 1 hook engineering.

---

## 1. Multi-Project Directory Isolation & Explicit CLI Standard

Never rely on implicit global state (`current_reel.json`) without specifying `--project <slug>`. Every reel maintains a self-contained project bundle under `projects/<project-slug>/`:

```text
motion reels/
├── config/
│   ├── pipeline_constants.json     # Canonical MAX_FRAMES=3500, pacing, font & loudness constants
│   ├── safe_zones.json             # Per-platform safe-zone profiles (CONSERVATIVE_UNION, TIKTOK, etc.)
│   └── retention_priors.json       # Empirical per-archetype hold-rate priors & hook rotation history
├── projects/
│   └── <project-slug>/
│       ├── manifest.json           # Reproducible SHA-256 hashes (timeline, BGM, vendored fonts, license)
│       ├── telemetry.json          # Optional platform retention curve input for telemetry_priors.js
│       ├── plates/                 # Isolated historical photo reference blueprints (<=1080px, <=350KB)
│       ├── audit/                  # Rendered 1080x1920 QA stills + machine-readable audit_report.json
│       └── deliverables/           # Auto-emitted captions.srt, metadata.json, post_copy.md, poster.png, poster_4x5.png
├── scripts/
│   ├── pipeline.js                 # Primary cross-platform CLI (Preview, Audit, Render, Smoke, Deliverables)
│   ├── audit_and_validate.js       # Schema validator, code linter, glyph width & micro-motion auditor
│   ├── font_metrics.js             # TrueType hmtx glyph advance-width & 2-line wrap calculator
│   ├── export_deliverables.js      # SRT subtitle, citation metadata & 9:16 + 4:5 poster generator
│   └── telemetry_priors.js         # Retention curve analyzer & empirical prior updater
└── assets/fonts/
    └── font_manifest.json          # Vendored Montserrat-Black (v31) & Inter-ExtraBold (v20) SHA-256 locks
```

---

## 2. Scene 1 "Scroll-Stopping" Hook & Sharp Frame 0 Standard

1. **Sharp Frame 0 (Poster Protection)**:
   - Global Frame `0` (`scene.startFrame === 0 && frame === 0`) renders the Setup Line at **`blur(0px)` and `opacity: 1`** so platform feeds and cover pickers display a razor-sharp headline on Frame `0`.
   - `audit_and_validate.js` also exports Frame `0` to `projects/<slug>/deliverables/poster.png` (9:16) and `poster_4x5.png` (`1080×1350` center crop for Instagram profile grids).
2. **Hook Archetype Rotation**:
   - Consult `config/retention_priors.json` (`recentHookArchetypeHistory`) before selecting Scene 1's archetype so consecutive reels on the channel never open with the identical visual template.
3. **Beat-Quantized Impact Lockstep**:
   - **Frame 0**: Sharp setup headline + opening atmospheric soundscape.
   - **First Musical Downbeat (`18–45f`)**: Red payoff line slams in lockstep with a `-2` frame perceptually pre-biased `sub_boom.wav` or `stamp_slam.wav` while BGM ducks by `-7.5 dB`.
