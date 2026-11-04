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

## 4. Multi-Tone Cel Shading & Material Depth (`CEL_SHADING_LINT`)
- **Named Historical Figures & Key Human Actors (Priority)**:
  - For all named figures, commanders, suspects, and leaders, prioritize articulated die-cut `<CutoutPuppet headSrc="..." />` rigs.
  - Pair an authentic archival portrait head (prepared with a tactile `#F4EFE6` die-cut cardstock border via `scripts/crop_puppet_head.py`) with a textured, period-accurate uniform/attire body from `src/components/CutoutPuppet.tsx`.
- **Anonymous Crowds, Soldiers & Tally Units**:
  - Depict anonymous rank-and-file figures as multi-tier silhouettes with authentic uniform accents (collar tabs, epaulets, helmets).
  - Separate silhouettes from dark backgrounds using **atmospheric backlighting** (soft radial horizon glow, warm firelight, or dawn gradients).
- **Multi-Tone Cel Shading Standard**:
  - Every focal subject must be built with **at least 3 distinct tonal values**:
    1. *Layer 1: Shadow / Base Tone* (ambient occlusion / shaded under-facet).
    2. *Layer 2: Midtone / Material Body* (true local color of historical materials: wool, stone, steel, brass).
    3. *Layer 3: Highlight / Core Rim Tone* (lightward-facing plane or specular rim).
    4. *Layer 4: Accent / Details* (dials, insignia, rivets, seams).
  - Compose using `src/kit/CelShading.tsx` (`HISTORICAL_CEL_PALETTES`, `<CelShadedBody />`, `<CelShadedFacet />`, `<CelRimFilter />`).
  - **Rejection of Flat Monochrome Voids**: Any focal subject exceeding $85\%$ flat dark fill without midtone/highlight facets triggers a fatal `CEL_SHADING_LINT` error.
- **Visual Reference Blueprint Protocol (Zero Direct Image Pasting / Zero Potrace Tracing)**:
  - Potrace auto-tracing is eliminated. Archival photographs must never be auto-traced into noisy, 1-bit binary silhouette blobs.
  - Ingested photographic plates in `projects/<slug>/plates/` serve strictly as **Visual Reference Blueprints** to inform vector drafting (studying silhouette landmarks, structural paneling, material colors, and proportions) and as sources for articulated die-cut portrait heads (`<CutoutPuppet headSrc="..." />`).
  - Raw unmasked `<img>`, `<Image>`, and `<image>` tags inside vector scene components are strictly prohibited (`PHOTO_PASTE_LINT`).
- **6-Layer Vector Anatomy Standard**:
  Translate reference blueprints into the 6-layer vector hierarchy:
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
