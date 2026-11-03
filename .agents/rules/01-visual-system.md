# 9:16 Visual System & Safe-Zone Constraints

## 1. Canvas & Configurable Safe-Zone Profiles (`config/safe_zones.json`)
- **Canvas Resolution**: `1080x1920` at `60fps`.
- **Default Profile (`CONSERVATIVE_UNION`)**:
  - **Text Safe Zone (18% – 42%)**: Pinned strictly between `y = 346px` and `y = 806px` (`x = 64..1016px`, max width `952px`, height `460px`).
  - **Headroom Buffer**: A minimum `58px` buffer separates text from artwork (`y = 806px` to `y = 864px`).
  - **Artwork Safe Zone (45% – 78%)**: Pinned strictly between `y = 864px` and `y = 1498px` (height `634px`).
  - **Bottom Clearance (Bottom 22%)**: Keep `y = 1498px` to `1920px` (`422px`) completely free of focal artwork, metric counters, or subtitles.
  - **Right Clearance (Right 15%)**: Keep `x = 918px` to `1080px` (`162px`) clear of focal subjects and labels.
  - **Instagram 4:5 Feed Grid Safety**: Both Text (`346–806px`) and Artwork (`864–1498px`) sit safely inside the center `1080×1350` (`y = 285..1635px`) 4:5 profile grid crop.
- **Additional Profiles**: `YOUTUBE_SHORTS`, `TIKTOK`, and `INSTAGRAM_REELS` selectable via `meta.safeZoneProfile`.

---

## 2. Locked Canvas Palette & Atmospheric Unity (`PALETTE_LINT`)
- **Single Locked Gradient**: Commit to one continuous dark background gradient across the entire video (`config/pipeline_constants.json`).
- **Three Story Palettes**:
  1. **Polar & Maritime (`POLAR_MARITIME`)**:
     - *Background*: Deep Navy (`#0A1118`) to Slate (`#162636`)
     - *Setup Text*: Ice White (`#F4F7FA`)
     - *Payoff Text*: Signal Red (`#E63228`) | *Somber Payoff*: (`#93C5FD`)
     - *Accent*: Pale Ice Cyan (`#A5F3FC`)
  2. **Conflict & Crisis (`CONFLICT_CRISIS`)**:
     - *Background*: Obsidian (`#0F1012`) to Warm Charcoal (`#1C1917`)
     - *Setup Text*: Stark White (`#F5F5F7`)
     - *Payoff Text*: Crimson (`#D92B2B`) | *Somber Payoff*: (`#D8B4A0`)
     - *Accent*: Warm Amber (`#F59E0B`)
  3. **Espionage & Dossier (`ESPIONAGE_DOSSIER`)**:
     - *Background*: Bunker Black (`#0B1310`) to Dark Slate (`#16221E`)
     - *Setup Text*: Phosphor White (`#ECFDF5`)
     - *Payoff Text*: Alert Red (`#EF4444`) | *Somber Payoff*: (`#67E8F9`)
     - *Accent*: Radar Cyan (`#38BDF8`)

---

## 3. Global-Frame Seeded Persistent Particle Emitter
- **Deterministic Global Seeding**: Particles (`SNOW`, `ASH`, `RAIN`, `DUST`) are seeded via a deterministic Mulberry32 PRNG keyed by `(emitterType, particleId)` and evaluated at `globalFrame = scene.startFrame + localFrame`.
- **Cross-Cut & Per-Scene Continuity**: Any isolated scene clip (`render_scene_clip.js`) or full master render reproduces the exact same continuous particle coordinates across cuts.
- **When Clean / Inapplicable**: For sterile indoor settings, diplomatic conferences, and boardroom archives, set `particleEmitter: "NONE"`.

---

## 4. Character Standard & Zero Direct Photo Pasting (`PHOTO_PASTE_LINT`)
- **Grim & Serious Scenarios (Default)**:
  - Depict figures as **stark, flat dark silhouettes** (`#090D12` or `#12151B`).
  - Allow at most **one colored accent prop** (e.g. red scarf, officer cap band, gold medal, white helmet).
  - Separate dark silhouettes from dark background using **atmospheric backlighting** (soft radial horizon glow, aurora bands, or warm firelight gradients).
- **Non-Grim & Satirical Scenarios (Selective)**:
  - For lighthearted, bureaucratic, or non-grim historical vignettes, articulated `<CutoutPuppet />` rigs may be selectively used.
- **Zero Raw Photographs on Screen (`PHOTO_PASTE_LINT`)**: Archival photos are used strictly as reference blueprints to craft custom SVG artwork; raw `<img>`, `<Image>`, and `<image>` tags inside vector scene components are automatically flagged by `audit_and_validate.js`.
- **Visual Density & Complexity Floor (`PATH_COMPLEXITY_LINT`)**:
  - Every scene vector component must satisfy:
    1. Minimum $\ge 35$ SVG nodes (hero archetypes `STRUCTURAL_FRACTURE`, `VEHICLE_IN_TRANSIT`, `SPLIT_CONFRONTATION`: $\ge 50$ nodes).
    2. Minimum $\ge 5$ distinct `<path>` elements and $\ge 35$ path command vertices.
    3. Basic geometric primitives (`<rect>`, `<circle>`, `<polygon>`) must not exceed $70\%$ of visual geometry without detailing paths.
    4. Minimum 1 volumetric gradient/lighting aura.
  - Crude geometric simplification (a rectangle for a desk, circle for head, 3 lines for fan) triggers a fatal exit code in `audit_and_validate.js`.
- **Automated Plate Tracing Pipeline (`scripts/trace_plate_contours.js`)**:
  - Run `node scripts/trace_plate_contours.js --project <slug> --all` to automatically extract authentic photographic vector silhouettes directly from ingested plates into `projects/<slug>/plates/TracedPlateAssets.tsx` and `traced_plate_assets.json`.
- **Mandatory Reference Ingestion & 6-Layer Vector Anatomy Standard**:
  Never draft mechanical assets, structural fractures, vehicles, or explosions from training memory alone. Before coding, reference plates MUST be ingested into `assets/plates/` or `projects/<slug>/plates/` and translated into the 6-layer vector hierarchy:
  1. *Layer 1: Ambient Volumetric Aura* (`<radialGradient>` aura defining lighting falloff).
  2. *Layer 2: Supersonic / Dynamic Atmospheric Disturbances* (Mach shockwave rings, ionization rims, speed lines).
  3. *Layer 3: Acute Energy Spikes / Directional Vectors* (sharp multi-color flame tongues, structural stress lines).
  4. *Layer 4: Multi-Tiered Organic Body Geometry* (multi-nested arc-scalloped lobes via `src/kit/OrganicExplosion.tsx` or cross-sectional mechanical foils; ban flat raw polygons/blobs).
  5. *Layer 5: High-Contrast Core Accent* (white-hot 8-pointed core flash star, glowing cockpit dials, or fractured structural spars).
  6. *Layer 6: Detached Orbiting Micro-Elements* (flying cloudlets, trailing propellant, shrapnel shards, embers).

---

## 5. Flags & Organic Waving Cloth Standard
- **Never draw flat/rigid SVG flag shapes**.
- **Parametric Waving Cloth Engine (`<WavingFlagSvg />`)**:
  - Slice source plate into $\ge 120$ vertical segments with continuous slope shear (`transform="skewY(angle)"`).
  - Dual-harmonic traveling wave physics with specular highlights on crests and velvet ambient shadows along wave troughs.
