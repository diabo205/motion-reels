# Library Index

Components available for building scenes. Compose from these before drawing new vector art. The build skill and `vector-scene-architect` read this file first.

**Maintenance:** add an entry whenever a component is added to `src/kit/` or `src/library/`. Keep each entry to four lines.

**Status of this draft:** names and one-line descriptions come from the README. Every entry is verified against the component's source file.

## Entry format

### ComponentName
- Path: `src/...`
- Props: `name: type` (one line)
- Use for: one line
- Archetypes: which of the seven it suits

---

## Reference scene

### Scene 02: `02_the_detonation_blast` (`peshawar-2009`)
*Status: `DRAFT: needs owner approval`*

This scene exemplifies the engine's Peshawar Staging Standard, multi-tier value separation, two-phase reactive motion, library composition, and safe-zone compliance.

#### 1. Staging & Substrate
- **Mode**: `PAPER_EXTERIOR` staging substrate on quadrille drafting paper with organic grain.
- **Sky Palette**: Warm setting-motivated sky gradient (`["#B8292F", "#1A090B"]`), contrasting deep ground silhouettes with fiery crimson-to-black dusk tones.
- **Atmospheric Separation**: Eliminates flat black voids (`#090D12`) by bathing the midground in soft radial backlighting motivated by the blast epicenter.

#### 2. Multi-Tier Value Hierarchy & 6-Layer Vector Anatomy
Constructed via the 6-layer vector explosion hierarchy in `src/components/PeshawarVectors.tsx` (`BlastShockwaveVector`), mapping to `src/kit/OrganicExplosion.tsx`:
1. **Layer 1 (Ambient Volumetric Aura)**: `<radialGradient id="blastCoreAura">` centered at `(540, 1100)` with a 480px falloff radius and 0.65 opacity.
2. **Layer 2 (Ionization & Shockwave Rims)**: Dual concentric shockwave rings expanding outward from radius 60px to 620px in `#FFD54F` and `#FFFFFF`.
3. **Layer 3 (Acute Energy Spikes)**: 13 sharp radiating flame tongues (lengths 375–440px) in fiery orange (`#FF8F00`) with inner yellow highlight spikes (`#FFD54F`).
4. **Layer 4 (Multi-Tiered Organic Body Geometry)**: Three nested arc-scalloped lobes generated via `createArcScallopedCloud()` (11 outer lobes in crimson `#D32F2F`, 10 mid-tier lobes in amber `#FF8F00`, 8 inner lobes in bright yellow `#FFEE58`).
5. **Layer 5 (High-Contrast Core Accent)**: White-hot 8-pointed core flash star (`#FFFFFF`) with 12-frame decay settling into a pulsing core.
6. **Layer 6 (Detached Orbiting Elements)**: 8 orbiting cloudlets drifting outward between frames 0 and 80 (`cloudletDrift = interpolate(frame, [0, 80], [0, 45], { extrapolateRight: 'clamp' })`).

#### 3. Two-Phase Reactive Motion
- **Phase 1 (Frames 0–18, Detonation Blast)**: Violent explosive bloom expanding from `scale: 0.15` to overshoot at `1.28` (frame 6) before settling to `1.0` at frame 18 (`interpolate(frame, [0, 6, 18], [0.15, 1.28, 1.0], { extrapolateRight: 'clamp' })`). Camera executes `IMPACT_SHAKE` (intensity 1.0) synchronized with `artillery_shell.wav`.
- **Phase 2 (Frames 18+, Secondary Micro-Motion & Payoff)**: Continuous boiling oscillation (`1.0 + 0.04 * Math.sin(frame * 0.18)`), expanding shockwave rings, and drifting cloudlets. At frame 60, the red payoff line slams with `SCALE_SLAM` alongside `sub_boom.wav`.

#### 4. Safe Zones & Kinetic Typography
- **Text Zone (18% – 42% height)**: Pinned strictly between `y = 346px` and `y = 806px`.
  - Setup line (`PRIMARY_STATEMENT`): *"A DEAFENING SHOCKWAVE TORE THE SKY."* in `PURE_WHITE`.
  - Payoff line (`SECONDARY_ACCENT`): *"A MOSQUE & 4 BUILDINGS COLLAPSED."* in `ALERT_RED`.
- **Artwork Zone (45% – 78% height)**: Epicenter anchored at `(x: 540px, y: 1100px)`, cleanly separated from both headline text above and platform UI buffers below (`y > 1498px`).

---

## Kit (`src/kit/`) — engine primitives

### AtmosphericBackground
- Path: `src/kit/AtmosphericBackground.tsx`
- Props: `skyGradient?: string[], theme?: 'DESERT_TWILIGHT' | 'ALERT_RED' | 'TACTICAL_DARK' | 'EMERALD_HONOR' | 'NIGHT_RADAR' | 'POLAR_MARITIME' | 'CONFLICT_CRISIS' | 'ESPIONAGE_DOSSIER', stageStyle?: PaperStageStyle, showDunes?: boolean, showSmoke?: boolean, particleEmitter?: ParticleType, globalFrame?: number`
- Use for: Staging substrate, sky gradient, and the global-frame seeded continuous particle emitter layer (`SNOW`, `ASH`, `RAIN`, `DUST`, `NONE`).
- Archetypes: all

### BeatGrid
- Path: `src/kit/BeatGrid.tsx`
- Props: `beatGrid: BeatGridData | null, children: React.ReactNode`
- Use for: Audio transient and beat synchronization aligning cuts and payoffs to `BASS_DROP`, `CYMBAL_CRASH`, and `ENERGY_PEAK`.
- Archetypes: all

### GlyphLayer
- Path: `src/kit/GlyphLayer.tsx`
- Props: `layers: GlyphTextLayerSpec[], fontFamily?: 'Montserrat' | 'Inter', styleMode?: 'DOCUMENTARY_SANS' | 'TACTILE_TORN_PAPER', palette?: PaletteTheme, sensitivity?: 'STANDARD' | 'SOMBER_MEMORIAL' | 'HIGH_SENSITIVITY', safeZoneWidth?: number, quoteAttribution?: string, contextTag?: { flagEmoji?: string; title?: string; headerContext?: string }`
- Use for: Pinned kinetic typography stack enforcing three-element text cap, font floors, word budget, and rolling number counters.
- Archetypes: all

### OrganicExplosion
- Path: `src/kit/OrganicExplosion.tsx`
- Props: `cx?: number, cy?: number, scale?: number, coreFlash?: number, wobble?: number, cloudletDrift?: number, tierColors?: FireballTierColors, shockwaves?: ShockwaveParams, showSpikes?: boolean, showCloudlets?: boolean, showSparks?: boolean`
- Use for: Six-layer parametric explosions, detonations, arc-scalloped cloud lobes, and dynamic shockwaves.
- Archetypes: `STRUCTURAL_FRACTURE`, `SPLIT_CONFRONTATION`, `VEHICLE_IN_TRANSIT`

### SafeZoneContainer
- Path: `src/kit/SafeZoneContainer.tsx`
- Props: `profile?: SafeZoneProfileName | string, showDebugOverlay?: boolean, children: React.ReactNode`
- Use for: Keeping content inside 9:16 platform safe-zone bounds (TextSlot 18%-42%, ArtworkSlot 45%-78%).
- Archetypes: all

### SFXTrigger
- Path: `src/kit/SFXTrigger.tsx`
- Props: `trigger: SfxTriggerSpec, sceneStartFrame: number, sensitivity?: 'STANDARD' | 'SOMBER_MEMORIAL' | 'HIGH_SENSITIVITY'`
- Use for: Audio SFX playback with -2 frames lead bias and BGM ducking, with `SOMBER_MEMORIAL` suppression.
- Archetypes: all

### WeatheredMilitaryStamp
- Path: `src/kit/WeatheredMilitaryStamp.tsx`
- Props: `text: string, subText?: string, color?: string, slamProgress?: number, rotation?: number`
- Use for: Double-bordered weathered rubber ink stamps for classified, dossier, and alert reveals.
- Archetypes: `QUOTE_CARD`, `SPLIT_CONFRONTATION`, `LONE_LEADER`

### tokens
- Path: `src/kit/tokens.ts`
- Exports: `PIPELINE_CONSTANTS, SAFE_ZONES_CONFIG, FPS, CANVAS_WIDTH, CANVAS_HEIGHT, MIN_FRAMES, MAX_FRAMES, MIN_SCENE_FRAMES, TARGET_MAX_SCENE_FRAMES, MAX_SCENE_FRAMES, PAYOFF_BEAT_WINDOW_FRAMES, SFX_PERCEPTUAL_LEAD_FRAMES, BGM_DUCK_DB, LOUDNESS_TARGET_LUFS, LOUDNESS_TRUE_PEAK_DBTP, ALL_CAPS_TRACKING_EM, MIN_SETUP_FONT_PX, MIN_PAYOFF_FONT_PX, MAX_LINES_PER_LAYER, MAX_LINE_CHARS, WORD_BUDGET_MIN, WORD_BUDGET_MAX, CORE_ARCHETYPES, ALLOWED_CAMERA_MOVEMENTS, PALETTES, getSafeZoneProfile, SPRING_PRESETS, MOTION, CAMERA_PRESETS, driftOffsetPx, pushInScale, parallaxOffsetPx, craneSweep, dutchTiltDeg, shakeOffsetPx`
- Use for: Immutable framework constants, layout boundaries, typography floors, locked palettes, and motion presets.

## Library (`src/library/`)

### `atmospheric/` — locked palettes and PRNG particle emitters

### AtmosphericBackground (Library Re-export)
- Path: `src/library/atmospheric/AtmosphericBackground.tsx`
- Props: `skyGradient?: string[], theme?: string, stageStyle?: PaperStageStyle, showDunes?: boolean, showSmoke?: boolean, particleEmitter?: ParticleType, globalFrame?: number`
- Use for: Library re-export of atmospheric staging background and global-frame seeded particle emitter.
- Archetypes: all

### `characters/` — parameterized commander silhouettes and marching ranks

### MarchingInfantryRank
- Path: `src/library/characters/MarchingInfantryRank.tsx`
- Props: `soldierCount?: number, spacing?: number, scale?: number, silhouetteColor?: string, bayonetAccentColor?: string, facing?: 'LEFT' | 'RIGHT'`
- Use for: Animated marching infantry rank with individualized stride phase offsets and swaying bayonet rifles.
- Archetypes: `CROWD_TALLY`, `SPLIT_CONFRONTATION`

### SilhouetteCharacter
- Path: `src/library/characters/SilhouetteCharacter.tsx`
- Props: `figureType?: 'COMMANDER' | 'PILOT' | 'SOLDIER' | 'DIPLOMAT' | 'SCIENTIST' | 'CUSTOM', accentColor?: string, accentProp?: 'SCARF' | 'CAP_BAND' | 'MEDAL' | 'ARMBAND' | 'HEADPHONES' | 'TIE' | 'NONE', backlightType?: 'AMBER_FIRE' | 'AURORA_CYAN' | 'RADAR_GREEN' | 'ICE_WHITE' | 'NONE', positionX?: number, positionY?: number, scale?: number, facing?: 'LEFT' | 'RIGHT', customSvgPath?: string, customAccentPath?: string`
- Use for: Parameterized key figure silhouette with atmospheric radial backlighting, breathing micro-motion, and singular accent prop.
- Archetypes: `LONE_LEADER`, `SPLIT_CONFRONTATION`, `QUOTE_CARD`

### `hardware/` — aircraft, warships, armored vehicles, radar dishes

### FighterJetSilhouette
- Path: `src/library/hardware/MilitaryHardware.tsx`
- Props: `scale?: number, angle?: number, showAfterburner?: boolean, afterburnerColor?: string, hullColor?: string, strokeColor?: string, facing?: 'LEFT' | 'RIGHT'`
- Use for: Supersonic jet interceptor silhouette with animated afterburner flame jitter.
- Archetypes: `VEHICLE_IN_TRANSIT`, `SPLIT_CONFRONTATION`

### TankSilhouette
- Path: `src/library/hardware/MilitaryHardware.tsx`
- Props: `scale?: number, turretAngle?: number, hullColor?: string, treadColor?: string, accentProp?: 'RED_STAR' | 'WHITE_STAR' | 'IRON_CROSS' | 'NONE', facing?: 'LEFT' | 'RIGHT'`
- Use for: Armored battle tank silhouette with rotating tread wheels and adjustable turret angle.
- Archetypes: `VEHICLE_IN_TRANSIT`, `STRUCTURAL_FRACTURE`, `SPLIT_CONFRONTATION`

### TransportAircraftSilhouette
- Path: `src/library/hardware/MilitaryHardware.tsx`
- Props: `scale?: number, bankAngle?: number, showPropellers?: boolean, facing?: 'LEFT' | 'RIGHT'`
- Use for: Heavy four-turboprop transport / cargo aircraft with rotating propeller blur discs.
- Archetypes: `VEHICLE_IN_TRANSIT`

### NavalVesselSilhouette
- Path: `src/library/hardware/MilitaryHardware.tsx`
- Props: `scale?: number, vesselType?: 'CARGO' | 'DESTROYER', facing?: 'LEFT' | 'RIGHT', waterlineColor?: string`
- Use for: Warship (destroyer) or cargo vessel silhouette with animated pitching hull and water wake line.
- Archetypes: `VEHICLE_IN_TRANSIT`, `SPLIT_CONFRONTATION`

### RadarDishSilhouette
- Path: `src/library/hardware/MilitaryHardware.tsx`
- Props: `scale?: number, rotationSpeed?: number, highlightBeams?: boolean`
- Use for: Early warning radar dish array on lattice tower with animated rotating sweep beam.
- Archetypes: `VECTOR_MAP`, `STRUCTURAL_FRACTURE`, `LONE_LEADER`

### `tactical/` — radar sweeps, D3-geo animated map projections, flags

### TacticalRadarGrid
- Path: `src/library/tactical/TacticalRadarGrid.tsx`
- Props: `radius?: number, sweepSpeed?: number, gridColor?: string, accentColor?: string, showSweep?: boolean, blips?: RadarBlip[]`
- Use for: Tactical radar sweep scope with compass ticks, concentric range rings, rotating sweep sector, and target blips.
- Archetypes: `VECTOR_MAP`, `LONE_LEADER`

### WavingFlagSvg
- Path: `src/library/tactical/WavingFlagSvg.tsx`
- Props: `width?: number, height?: number, x?: number, y?: number, showPole?: boolean, showRadarRings?: boolean, flagImage?: string`
- Use for: Sliced parametric 2D wave cloth simulation for national or military flags with flagpole and radar rings.
- Archetypes: `LONE_LEADER`, `QUOTE_CARD`, `SPLIT_CONFRONTATION`

### AnimatedFrontline
- Path: `src/library/tactical/AnimatedFrontline.tsx`
- Props: `id?: string, path: string, alliedColor?: string, hostileColor?: string, lineWidth?: number, style?: 'DUAL_RIBBON' | 'JAGGED_TEETH' | 'HAZARD_STRIPES' | 'GLOWING_LINE', animated?: boolean, clashPoints?: ClashPoint[], frontlineLabel?: string, fontFamily?: string`
- Use for: High-contrast military combat frontlines dividing friendly and hostile territory with animated pulse, clash points, and hazard ribbons.
- Archetypes: `VECTOR_MAP`, `SPLIT_CONFRONTATION`

### ContestedTerritoryShading
- Path: `src/library/tactical/ContestedTerritoryShading.tsx`
- Props: `id?: string, path: string, faction?: TerritoryFaction, customColor?: string, patternStyle?: TerritoryPatternStyle, stripeSpacing?: number, stripeWidth?: number, stripeAngle?: number, opacity?: number, animated?: boolean, borderStrokeWidth?: number, borderDashArray?: string, label?: string, labelCenter?: [number, number], fontFamily?: string`
- Use for: Faction-coded cross-hatch, diagonal stripe, or glowing tint territory shading for military maps.
- Archetypes: `VECTOR_MAP`

### GeoJsonMapEngine
- Path: `src/library/tactical/GeoJsonMapEngine.ts`
- Props: `createTacticalProjector(config: GeoProjectorConfig): { pathGenerator, projectCoords, graticulePath }`
- Use for: D3-geo projection engine mapping geo-coordinates to 9:16 canvas SVG paths.
- Archetypes: `VECTOR_MAP`

### GeoTacticalMap
- Path: `src/library/tactical/GeoTacticalMap.tsx`
- Props: `geoJsonData?: any, projectorConfig?: GeoProjectorConfig, viewport?: MapViewport, theme?: 'POLAR' | 'CRISIS' | 'ESPIONAGE' | 'DESERT', showGraticule?: boolean, showBathymetry?: boolean, showCompassRose?: boolean, showScaleBar?: boolean, theaterTitle?: string, territories?: TacticalTerritoryConfig[], frontlines?: TacticalFrontlineConfig[], arrows?: TacticalArrowConfig[], markers?: TacticalMarkerConfig[], units?: TacticalUnitConfig[], fontFamily?: string`
- Use for: Full D3-geo tactical military operations map with graticule, bathymetry, compass rose, territory shading, frontlines, and offensive arrows.
- Archetypes: `VECTOR_MAP`

### PulsatingBattleMarker
- Path: `src/library/tactical/PulsatingBattleMarker.tsx`
- Props: `x: number, y: number, color?: string, size?: number, label?: string, sublabel?: string, pulseSpeed?: number, ringCount?: number, showCrosshairs?: boolean, impactFlash?: boolean, impactFrame?: number, fontFamily?: string`
- Use for: Pulsating battle marker with expanding concentric shockwave rings, crosshairs, and impact flashes for tactical map targets.
- Archetypes: `VECTOR_MAP`, `STRUCTURAL_FRACTURE`

### TacticalMovementArrow
- Path: `src/library/tactical/TacticalMovementArrow.tsx`
- Props: `id?: string, path: string, strokeColor?: string, strokeWidth?: number, arrowHead?: 'CHEVRON' | 'SPEARHEAD' | 'PINCER' | 'DOT' | 'NONE', arrowSize?: number, animationMode?: 'FLOWING_DASHES' | 'PROGRESSIVE_DRAW' | 'PULSING_SOLID', dashArray?: string, flowSpeed?: number, pathLength?: number, startFrame?: number, drawDuration?: number, opacity?: number, glow?: boolean, label?: string, labelPosition?: 'START' | 'MIDDLE' | 'END', unitSymbol?: string, fontFamily?: string`
- Use for: Animated offensive thrust arrows (flowing dashes, progressive draw, pulsing) with chevron, spearhead, or pincer heads.
- Archetypes: `VECTOR_MAP`, `VEHICLE_IN_TRANSIT`

### TroopUnitMarker
- Path: `src/library/tactical/TroopUnitMarker.tsx`
- Props: `x: number, y: number, branch?: UnitBranch, echelon?: UnitEchelon, designation?: string, factionColor?: string, scale?: number, animated?: boolean, marchSpeed?: number, fontFamily?: string`
- Use for: NATO-style military troop unit markers with branch symbols (infantry, armor, cavalry, etc.) and echelon pips.
- Archetypes: `VECTOR_MAP`, `CROWD_TALLY`

### `tactile/` — die-cut cards, puppets, rolling counters

### CutoutPuppet
- Path: `src/library/tactile/CutoutPuppet.tsx`
- Props: `character?: PuppetCharacter, x?: number, y?: number, scale?: number, rotation?: number, initialPose?: PuppetPose, switchedPose?: PuppetPose, poseSwitchFrame?: number, secondSwitchedPose?: PuppetPose, secondPoseSwitchFrame?: number, outfit?: PuppetOutfit, handwrittenLabel?: string, paperTagLabel?: string, ghostOnSwitch?: boolean, bulletWounds?: BulletWoundsConfig | boolean, children?: React.ReactNode`
- Use for: Articulated stop-motion paper-cut puppet rig with archival portrait head, tactile die-cut cardstock body, and dynamic pose switching.
- Archetypes: `LONE_LEADER`, `SPLIT_CONFRONTATION`, `QUOTE_CARD`

### PaperCutoutCard
- Path: `src/library/tactile/PaperCutoutCard.tsx`
- Props: `imagePath: string, caption?: string, subCaption?: string, top?: number, left?: string | number, width?: number, height?: number, rotateDeg?: number, framesPerBeat?: number, pulseIntensity?: number, tapeColor?: string`
- Use for: Polaroid-style archival photograph cutout card with torn masking tape tab and handwritten cursive caption.
- Archetypes: `QUOTE_CARD`, `LONE_LEADER`

### PaperSignCounter
- Path: `src/library/tactile/TactilePropCards.tsx`
- Props: `tagText: string, startValue: number, endValue: number, prefix?: string, suffix?: string, subLabel?: string, x?: number, y?: number, width?: number, rollStartFrame?: number, rollDurationFrames?: number, stampText?: string, stampFrame?: number, highlightRedOnEnd?: boolean, showSignPoles?: boolean`
- Use for: Rolling number counter sign on tactile cardstock with mechanical roll interpolation, stamp slam reveal, and signpost poles.
- Archetypes: `CROWD_TALLY`, `STRUCTURAL_FRACTURE`

### CascadingPaperStack
- Path: `src/library/tactile/TactilePropCards.tsx`
- Props: `items: CascadingPaperItem[], x?: number, y?: number, width?: number, handwrittenFooter?: string`
- Use for: Staggered paper slips stacking with individual rotation tilts and typewriter triggers.
- Archetypes: `QUOTE_CARD`, `LONE_LEADER`

### HingedCutoutReveal
- Path: `src/library/tactile/TactilePropCards.tsx`
- Props: `exteriorTitle: string, exteriorSub: string, interiorTitle: string, interiorLines: string[], openFrame?: number, stampText?: string, x?: number, y?: number`
- Use for: Hinged paper door card that swings open on `openFrame` to reveal secret classified dossier documents.
- Archetypes: `QUOTE_CARD`, `SPLIT_CONFRONTATION`

### `typography/` — telemetry badges and kinetic text stacks

### KineticTextStack
- Path: `src/library/typography/KineticTextStack.tsx`
- Props: `layers: TextLayerSpec[], fontFamily?: 'Montserrat' | 'Inter', styleMode?: 'DOCUMENTARY_SANS' | 'TACTILE_TORN_PAPER', sceneStartFrame?: number, palette?: 'POLAR_MARITIME' | 'CONFLICT_CRISIS' | 'ESPIONAGE_DOSSIER', sensitivity?: 'STANDARD' | 'SOMBER_MEMORIAL' | 'HIGH_SENSITIVITY', safeZoneProfile?: string, archetype?: string, quoteAttribution?: string`
- Use for: Pinned kinetic typography container with responsive auto-shrinking font size, torn paper substrates, and slam/pop reveals.
- Archetypes: all

### PersistentHudBadge
- Path: `src/library/typography/PersistentHudBadge.tsx`
- Props: `flagEmoji: string, title: string, headerContext?: string, styleMode?: 'DOCUMENTARY_SANS' | 'TACTILE_TORN_PAPER', fontFamily?: 'Montserrat' | 'Inter'`
- Use for: Top persistent location, date, or operational theater context badge.
- Archetypes: all

## Scene archetype wrappers (`src/scenes/`)

### ArchetypeScene
- Path: `src/scenes/ArchetypeScene.tsx`
- Props: `sceneId: string, startFrame: number, durationFrames: number, archetype: string, camera: { movement: CameraMovementType; intensity: number }, textLayers: SceneTextLayerProps[], hudVisible?: boolean, headerContext?: string, flagEmoji?: string, title?: string, palette?: PaletteTheme, particleEmitter?: 'SNOW' | 'ASH' | 'RAIN' | 'DUST' | 'NONE', fontFamily?: 'Montserrat' | 'Inter', sensitivity?: 'STANDARD' | 'SOMBER_MEMORIAL' | 'HIGH_SENSITIVITY', quoteAttribution?: string, sfxTriggers?: SfxTriggerSpec[], isFinalScene?: boolean, ctaText?: string, children?: React.ReactNode`
- Use for: Universal composition shell providing camera motion, kinetic typography stack, persistent HUD badge, SFX triggers, and atmospheric background.
- Archetypes: all

### LoneLeaderScene
- Path: `src/scenes/LoneLeaderScene.tsx`
- Props: `leaderFigure: React.ReactNode` (extends `ArchetypeSceneProps` omitting `archetype`)
- Use for: Key commander or historical leader archetype centered against atmospheric horizon backlighting.
- Archetypes: `LONE_LEADER`

### CrowdTallyScene
- Path: `src/scenes/CrowdTallyScene.tsx`
- Props: `tallyArt: React.ReactNode` (extends `ArchetypeSceneProps` omitting `archetype`)
- Use for: Rank-and-file silhouettes or tally clusters paired with rolling number counters.
- Archetypes: `CROWD_TALLY`

### VehicleInTransitScene
- Path: `src/scenes/VehicleInTransitScene.tsx`
- Props: `vehicleArt: React.ReactNode` (extends `ArchetypeSceneProps` omitting `archetype`)
- Use for: Aircraft, naval vessels, armor convoys, or trains in continuous transit motion.
- Archetypes: `VEHICLE_IN_TRANSIT`

### StructuralFractureScene
- Path: `src/scenes/StructuralFractureScene.tsx`
- Props: `structureArt: React.ReactNode` (extends `ArchetypeSceneProps` omitting `archetype`)
- Use for: Architectural facades, bunkers, or structures sustaining explosive hits with synchronized screen shake.
- Archetypes: `STRUCTURAL_FRACTURE`

### VectorMapScene
- Path: `src/scenes/VectorMapScene.tsx`
- Props: `mapArt: React.ReactNode` (extends `ArchetypeSceneProps` omitting `archetype`)
- Use for: Stylized tactical contour maps with coordinate grids, frontline shifts, and heading vectors.
- Archetypes: `VECTOR_MAP`

### SplitConfrontationScene
- Path: `src/scenes/SplitConfrontationScene.tsx`
- Props: `leftFigure: React.ReactNode, rightFigure: React.ReactNode, splitAxisColor?: string` (extends `ArchetypeSceneProps` omitting `archetype`)
- Use for: Dual opposing silhouettes or emblems divided along a sharp vertical split axis.
- Archetypes: `SPLIT_CONFRONTATION`

### QuoteCardScene
- Path: `src/scenes/QuoteCardScene.tsx`
- Props: `quoteText: string, attribution: string, documentArt?: React.ReactNode` (extends `ArchetypeSceneProps` omitting `archetype`)
- Use for: Primary-source telegram, memo, or diary quote reveal with source attribution pill and live audio waveform.
- Archetypes: `QUOTE_CARD`
