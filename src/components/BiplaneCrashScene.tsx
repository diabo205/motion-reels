import React from 'react';
import { useCurrentFrame, interpolate, staticFile } from 'remotion';

interface BiplaneCrashSceneProps {
  durationFrames?: number;
}

/**
 * BiplaneCrashScene.tsx
 * 
 * Major-General Adrian Carton de Wiart VC surviving the 1919-1920 Polish aircraft crash.
 * Replaces the corrupted, pixelated autotrace path (TRACED_PATHS.biplane) with authentic
 * multi-tier parametric 2D SVG vector art based on archival reference plates:
 *   - plate_biplane_crash_wreck.jpg
 *   - plate_biplane_wreck_fortepan.jpg
 *   - plate_remarkable_biplane_crash.jpg
 *   - plate_sargent_crashed_aeroplane.jpg
 *
 * 2-Phase Narrative Choreography:
 *   - Phase 1 (Frames 0-31): "AIRCRAFT CRASH LANDING"
 *     Violent nose-down impact in Polish peat marsh. Biplane tail high, skid trench
 *     churning the turf, wings shuddering with splinter shards. Adrian pulls himself
 *     out of the cockpit, bracing his single right arm on the leather coaming.
 *   - Phase 2 (Frames 32-159): "SURVIVED PLANE WRECK"
 *     Detonating on Frame 32 (bass drop transient + artillery shell impact + sub boom).
 *     Adrian vaults down into the foreground (scale 1.75, ~420px tall), standing proud,
 *     calm, and utterly unscathed.
 *     Features: Pinned empty left sleeve, right hand holding malacca swagger cane,
 *     signature midnight silk eyepatch, peaked officer cap, British khaki uniform,
 *     and 6-layer volumetric smoking engine wreckage burning in the background.
 */
export const BiplaneCrashScene: React.FC<BiplaneCrashSceneProps> = ({ durationFrames = 159 }) => {
  const frame = useCurrentFrame();

  // ---------------------------------------------------------------------------
  // TIMING & KINEMATICS
  // ---------------------------------------------------------------------------
  const HIT_FRAME = 32;

  // Phase 1 crash impact shudder (Frames 0-26 settling)
  const impactDecay = interpolate(frame, [0, 26], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const planeShudderY = Math.sin(frame * 1.6) * 10 * impactDecay;
  const planeShudderRot = Math.cos(frame * 1.4) * 2 * impactDecay;

  // Adrian Carton de Wiart Transition: Cockpit (Phase 1) -> Heroic Foreground Stance (Phase 2)
  const adrianStepT = interpolate(frame, [HIT_FRAME - 4, HIT_FRAME + 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Coordinates for Adrian (scaled to commanding hero presence: ~420px tall)
  const adrianX = interpolate(adrianStepT, [0, 1], [530, 280], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const adrianY = interpolate(adrianStepT, [0, 1], [1160, 1270], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const adrianScale = interpolate(adrianStepT, [0, 1], [1.05, 1.72], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Idle micro-motion for Adrian in Phase 2
  const idleBreathing = Math.sin(frame * 0.08) * 1.8;
  const coatFlutter = Math.sin(frame * 0.12) * 2.5;

  // Engine flame & smoke micro-motion loops
  const flamePulse = (frame * 12) % 16;
  const smokeProgress = (frame * 1.4) % 360;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox="0 0 1080 1920"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <defs>
          {/* Peat Marsh Sky & Fog Gradients */}
          <linearGradient id="crashSkyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#351402" />
            <stop offset="40%" stopColor="#5C2405" />
            <stop offset="70%" stopColor="#8C3805" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Peat Marsh Ground Bed Gradient */}
          <linearGradient id="marshPeatGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#242C1B" />
            <stop offset="30%" stopColor="#1C2315" />
            <stop offset="70%" stopColor="#14190F" />
            <stop offset="100%" stopColor="#0D110A" />
          </linearGradient>

          {/* Biplane Doped Fabric Canvas Gradient */}
          <linearGradient id="biplaneFabricGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#556644" />
            <stop offset="50%" stopColor="#435235" />
            <stop offset="100%" stopColor="#323F27" />
          </linearGradient>

          {/* Fuselage Camouflage Shading */}
          <linearGradient id="fuselageShadingGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5A6D48" />
            <stop offset="45%" stopColor="#425134" />
            <stop offset="100%" stopColor="#2A3521" />
          </linearGradient>

          {/* Metallic Cowl & Engine Iron */}
          <linearGradient id="engineIronGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* Mahogany Propeller Wood */}
          <linearGradient id="propellerWoodGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="50%" stopColor="#54250A" />
            <stop offset="100%" stopColor="#3B1804" />
          </linearGradient>

          {/* Impact Trench Crater Depth */}
          <radialGradient id="craterTrenchGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#120E0B" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#221A14" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#242C1B" stopOpacity="0" />
          </radialGradient>

          {/* Engine Detonation Volumetric Heat Aura */}
          <radialGradient id="engineHeatAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#D97706" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#B45309" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#78350F" stopOpacity="0" />
          </radialGradient>

          {/* Core Fire Flame Gradient */}
          <linearGradient id="coreFlameGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="40%" stopColor="#F59E0B" />
            <stop offset="80%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>

          {/* Glow Filter for Fire & Sparks */}
          <filter id="flameGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Adrian Hero Contact Drop Shadow */}
          <filter id="cartonHeroShadow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="-6" dy="10" stdDeviation="7" floodColor="#090B08" floodOpacity="0.7" />
          </filter>

          {/* Oval Clip Path for Adrian Carton de Wiart Head Medallion (Crisp 1px border alignment) */}
          <clipPath id="cartonCrashHeadClip">
            <ellipse cx="0" cy="-48" rx="26" ry="35" />
          </clipPath>
        </defs>

        {/* =========================================================================
            LAYER 1: ATMOSPHERIC HORIZON & DISTANT POLISH TREELINE
            Warm sunset sky, tactile sunburst rays, and distant pine silhouettes.
            ========================================================================= */}
        <g id="skyAndHorizon">
          {/* Subtle Tactile Sunburst Paper Rays from Crash Epicenter */}
          <g opacity="0.12" transform="translate(480, 1340)">
            {[-60, -45, -30, -15, 0, 15, 30, 45, 60].map((deg) => (
              <polygon
                key={deg}
                points="0,0 700,-600 750,-560"
                fill="#FEF08A"
                transform={`rotate(${deg})`}
              />
            ))}
          </g>

          {/* Polish Pine & Birch Treeline Silhouette */}
          <path
            d="M 0 1260 
               L 45 1230 L 80 1255 L 120 1220 L 160 1245 L 210 1210 L 260 1240 
               L 310 1215 L 360 1235 L 420 1205 L 480 1240 L 530 1210 L 590 1245 
               L 650 1200 L 710 1235 L 770 1205 L 830 1230 L 890 1210 L 950 1235 
               L 1010 1205 L 1080 1225 L 1080 1380 L 0 1380 Z"
            fill="#1A2214"
            opacity="0.85"
          />

          {/* Midground Low Marsh Dune */}
          <path
            d="M 0 1290 Q 320 1260 640 1285 T 1080 1270 L 1080 1420 L 0 1420 Z"
            fill="#222B18"
          />

          {/* Peat Marsh Foreground Bed (Artwork Safe Zone Anchor) */}
          <path
            d="M 0 1320 Q 380 1300 760 1315 T 1080 1305 L 1080 1920 L 0 1920 Z"
            fill="url(#marshPeatGrad)"
          />

          {/* Skid Trench & Impact Churn Hole */}
          <ellipse
            cx="520"
            cy="1360"
            rx="340"
            ry="85"
            fill="url(#craterTrenchGrad)"
          />
          {/* Churned Black Dirt Mounds & Trench Furrows */}
          <path
            d="M 320 1355 Q 420 1335 530 1350 Q 650 1325 770 1345 Q 860 1330 900 1355 L 870 1385 Q 690 1405 510 1390 Q 370 1395 320 1355 Z"
            fill="#16110D"
          />
          <path
            d="M 420 1362 Q 560 1345 710 1358 L 680 1380 Q 550 1370 425 1378 Z"
            fill="#0D0907"
          />

          {/* Broken Wooden Boundary Stakes Splintered by Crash */}
          <g id="splinteredFence" fill="#5A432D" stroke="#3D2B1C" strokeWidth="1.5">
            <polygon points="180,1355 192,1354 188,1310 178,1315" />
            <polygon points="205,1362 216,1360 222,1325 212,1322" transform="rotate(18, 210, 1360)" />
            <polygon points="860,1350 870,1348 875,1320 864,1318" transform="rotate(-24, 865, 1350)" />
            <polygon points="170,1362 250,1370 248,1376 168,1368" />
          </g>
        </g>

        {/* =========================================================================
            LAYER 2: AUTHENTIC BIPLANE CRASH WRECKAGE (NO AUTOTRACE BLOBS)
            Repositioned strictly inside the 9:16 safe zone (x = 560, scale = 1.08)
            so tail remains safely inside x < 918px and nose anchors the burning crater.
            ========================================================================= */}
        <g
          id="biplaneWreckageGroup"
          transform={`translate(560, ${1270 + planeShudderY}) rotate(${-25 + planeShudderRot}) scale(1.08)`}
        >
          {/* Ambient Engine Heat Volumetric Aura at nose */}
          <circle cx="-210" cy="50" r="180" fill="url(#engineHeatAura)" />

          {/* --- BIPLANE LOWER WING (BURIED & CRUMPLED IN PEAT) --- */}
          <g id="lowerWing">
            {/* Lower Wing Main Body */}
            <path
              d="M -160 55 L 60 40 L 160 70 L -120 90 Z"
              fill="url(#biplaneFabricGrad)"
              stroke="#222C1A"
              strokeWidth="2.5"
            />
            {/* Wing Rib Highlight Lines */}
            <line x1="-120" y1="52" x2="-90" y2="86" stroke="#5F754D" strokeWidth="1.5" />
            <line x1="-70" y1="48" x2="-40" y2="83" stroke="#5F754D" strokeWidth="1.5" />
            <line x1="-20" y1="44" x2="10" y2="79" stroke="#5F754D" strokeWidth="1.5" />
            <line x1="30" y1="42" x2="60" y2="76" stroke="#5F754D" strokeWidth="1.5" />
            <line x1="80" y1="46" x2="110" y2="73" stroke="#5F754D" strokeWidth="1.5" />

            {/* Crumpled & Torn Outer Wingtip Digging into Dirt */}
            <path
              d="M -160 55 L -195 65 L -185 85 L -140 88 Z"
              fill="#354228"
              stroke="#1C2415"
              strokeWidth="1.8"
            />
            {/* Exposed Wooden Wing Rib Structure */}
            <path
              d="M -185 68 L -205 78 L -190 85 Z"
              fill="#8C6641"
              stroke="#5C4126"
              strokeWidth="1.5"
            />
          </g>

          {/* --- BIPLANE FUSELAGE MONOCOQUE --- */}
          <g id="fuselage">
            {/* Main Fuselage Body (Tapering to Tail) */}
            <path
              d="M -220 30 
                 L -120 -10 
                 L 40 -15 
                 L 260 -2 
                 L 380 10 
                 L 380 28 
                 L 260 38 
                 L 40 45 
                 L -120 52 
                 L -220 55 Z"
              fill="url(#fuselageShadingGrad)"
              stroke="#1E2716"
              strokeWidth="2.8"
            />

            {/* Longitudinal Stringer Seams */}
            <path
              d="M -120 8 L 40 5 L 260 14 L 380 18"
              fill="none"
              stroke="#627850"
              strokeWidth="1.5"
              strokeDasharray="12, 4"
            />
            <path
              d="M -120 28 L 40 25 L 260 26 L 380 20"
              fill="none"
              stroke="#2B3721"
              strokeWidth="1.5"
            />

            {/* Open Pilot Cockpit Opening with Padded Leather Coaming */}
            <ellipse cx="-20" cy="-14" rx="38" ry="10" fill="#18120C" stroke="#4A3423" strokeWidth="3.2" />
            <path
              d="M -58 -14 Q -20 -24 18 -14"
              fill="none"
              stroke="#785338"
              strokeWidth="3.5"
            />
            {/* Small Curved Celluloid Windscreen */}
            <path
              d="M -55 -15 L -62 -30 L -38 -28 L -35 -16 Z"
              fill="#94A3B8"
              opacity="0.65"
              stroke="#CBD5E1"
              strokeWidth="1.2"
            />

            {/* Rear Observer / Gunner Cockpit Opening */}
            <ellipse cx="65" cy="-12" rx="32" ry="9" fill="#140F0A" stroke="#422E1F" strokeWidth="2.5" />
          </g>

          {/* --- TAIL EMPENNAGE (HIGH IN THE AIR AT 380px) --- */}
          <g id="tailEmpennage" transform="translate(370, 18)">
            {/* Horizontal Stabilizer & Elevator */}
            <polygon
              points="0,-8 50,-35 70,-30 20,-2"
              fill="#425235"
              stroke="#1E2716"
              strokeWidth="1.8"
            />
            {/* Vertical Fin & Tail Rudder */}
            <path
              d="M -20 -4 L 35 -95 L 65 -90 L 45 -4 Z"
              fill="#4A5C3B"
              stroke="#1E2716"
              strokeWidth="2.2"
            />

            {/* Authentic Polish Air Force Chessboard Marking (Szachownica Lotnicza) */}
            <g transform="translate(20, -55) rotate(-15) scale(0.72)">
              <rect x="-18" y="-18" width="36" height="36" fill="#F4EFE6" stroke="#18181B" strokeWidth="1.5" />
              <rect x="-18" y="-18" width="18" height="18" fill="#DC2626" />
              <rect x="0" y="0" width="18" height="18" fill="#DC2626" />
              <rect x="0" y="-18" width="18" height="18" fill="#F4EFE6" />
              <rect x="-18" y="0" width="18" height="18" fill="#F4EFE6" />
              <rect x="-18" y="-18" width="36" height="36" fill="none" stroke="#DC2626" strokeWidth="1.5" />
            </g>
          </g>

          {/* --- BIPLANE UPPER WING & INTERPLANE STRUTS --- */}
          <g id="upperWingAndStruts">
            {/* Wooden Interplane Struts (Connecting Lower and Upper Wings) */}
            {/* Inner Pair - Intact */}
            <polygon points="-75,45 -67,45 -72,-55 -80,-55" fill="#6B4E31" stroke="#3D2918" strokeWidth="1.8" />
            <polygon points="-55,42 -47,42 -52,-58 -60,-58" fill="#8C6641" stroke="#4A3320" strokeWidth="1.8" />

            {/* Outer Pair - Shattered / Fractured from crash impact */}
            <polygon points="50,40 58,40 45,-10 38,-8" fill="#6B4E31" stroke="#3D2918" strokeWidth="1.8" />
            <polygon points="40,-12 48,-10 65,-60 57,-60" fill="#8C6641" stroke="#4A3320" strokeWidth="1.8" transform="rotate(-18, 48, -10)" />
            {/* Jagged wood splinter at strut break */}
            <polygon points="42,-14 46,-8 52,-12" fill="#D97706" />

            {/* Snapped Rigging Tension Wires Draping */}
            <path
              d="M -75 45 Q -20 10 57 -60"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="1.5"
              strokeDasharray="4, 2"
            />
            <path
              d="M -52 -58 Q 0 0 45 -10"
              fill="none"
              stroke="#64748B"
              strokeWidth="1.2"
            />
            {/* Snapped wire loose end dangling */}
            <path
              d="M 45 -10 Q 55 15 50 35"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="1.4"
            />

            {/* Upper Wing Main Aerofoil */}
            <path
              d="M -170 -55 L 70 -70 L 190 -35 L -110 -20 Z"
              fill="url(#biplaneFabricGrad)"
              stroke="#222C1A"
              strokeWidth="2.8"
            />
            {/* Upper Wing Rib Highlight Lines */}
            <line x1="-130" y1="-53" x2="-80" y2="-23" stroke="#637C52" strokeWidth="1.5" />
            <line x1="-80" y1="-57" x2="-30" y2="-27" stroke="#637C52" strokeWidth="1.5" />
            <line x1="-30" y1="-61" x2="20" y2="-31" stroke="#637C52" strokeWidth="1.5" />
            <line x1="20" y1="-65" x2="70" y2="-35" stroke="#637C52" strokeWidth="1.5" />
            <line x1="70" y1="-68" x2="120" y2="-38" stroke="#637C52" strokeWidth="1.5" />
            <line x1="120" y1="-60" x2="160" y2="-36" stroke="#637C52" strokeWidth="1.5" />

            {/* Allied Concentric Roundel on Upper Wing */}
            <g transform="translate(110, -50) scale(0.95)">
              <ellipse cx="0" cy="0" rx="26" ry="14" fill="#DC2626" />
              <ellipse cx="0" cy="0" rx="18" ry="9.5" fill="#F4EFE6" />
              <ellipse cx="0" cy="0" rx="10" ry="5.2" fill="#1D4ED8" />
            </g>
          </g>

          {/* --- NOSE, ENGINE COWL & SNAPPED PROPELLER --- */}
          <g id="engineAndPropeller">
            {/* Crumpled Blued-Steel Engine Cowling */}
            <path
              d="M -220 30 L -255 35 L -265 60 L -220 55 Z"
              fill="url(#engineIronGrad)"
              stroke="#0F172A"
              strokeWidth="2.5"
            />
            {/* Engine Louvers / Exhaust Manifold */}
            <line x1="-245" y1="38" x2="-230" y2="40" stroke="#1E293B" strokeWidth="2.5" />
            <line x1="-248" y1="45" x2="-233" y2="47" stroke="#1E293B" strokeWidth="2.5" />
            <line x1="-252" y1="52" x2="-237" y2="54" stroke="#1E293B" strokeWidth="2.5" />

            {/* Engine Crankcase Hub */}
            <circle cx="-260" cy="50" r="15" fill="#1E293B" stroke="#0F172A" strokeWidth="2.2" />

            {/* Snapped Mahogany Propeller Blade (Top Half Snapped) */}
            <path
              d="M -260 48 L -280 20 L -270 12 L -256 46 Z"
              fill="url(#propellerWoodGrad)"
              stroke="#2B1405"
              strokeWidth="1.8"
            />
            {/* Splintered Tip of Top Blade */}
            <polygon points="-280,20 -284,14 -278,16 -274,10 -270,12" fill="#D97706" />

            {/* Bottom Propeller Blade (Bent Backward into Dirt Trench) */}
            <path
              d="M -260 52 L -285 92 L -272 96 L -254 54 Z"
              fill="url(#propellerWoodGrad)"
              stroke="#2B1405"
              strokeWidth="1.8"
            />

            {/* Sheared Landing Gear Wheel (Dislodged in Mud) */}
            <g transform="translate(-140, 85) rotate(22)">
              <ellipse cx="0" cy="0" rx="30" ry="15" fill="#18181B" stroke="#27272A" strokeWidth="2.8" />
              <ellipse cx="0" cy="0" rx="18" ry="9" fill="#475569" />
              <line x1="-15" y1="0" x2="15" y2="0" stroke="#94A3B8" strokeWidth="1.2" />
              <line x1="0" y1="-8" x2="0" y2="8" stroke="#94A3B8" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="4.5" fill="#0F172A" />
              <line x1="0" y1="0" x2="-25" y2="-45" stroke="#334155" strokeWidth="3.5" />
            </g>
          </g>

          {/* --- 6-LAYER VOLUMETRIC SMOKE, FIRE & SPARK SYSTEM --- */}
          <g id="engineFireAndSmoke" transform="translate(-255, 45)">
            {/* Layer 2: Core Acute Flame Tongue (Flickering at Cowl) */}
            <g filter="url(#flameGlow)">
              <path
                d={`M -10 -5 
                   Q ${-25 - (flamePulse % 6)} ${-35 - flamePulse} ${-40 - (flamePulse % 8)} ${-60 - flamePulse}
                   Q ${-20 + (flamePulse % 5)} ${-45} -5 -15 Z`}
                fill="url(#coreFlameGrad)"
              />
              <circle cx="-12" cy="-10" r="6" fill="#FFFBEB" opacity="0.9" />
            </g>

            {/* Layer 3: Volumetric Rolling Smoke Plumes (Drifting Up & Right) */}
            {[0, 1, 2, 3, 4, 5, 6].map((idx) => {
              const puffOffset = (smokeProgress + idx * 52) % 360;
              const puffT = puffOffset / 360;
              const px = -20 + puffT * 280 + Math.sin(frame * 0.05 + idx) * 20;
              const py = -15 - puffT * 420;
              const pr = 24 + puffT * 70;
              const pOpacity = interpolate(puffT, [0, 0.15, 0.75, 1], [0.3, 0.78, 0.45, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

              const smokeColor = idx % 2 === 0 ? '#18181B' : '#27272A';

              return (
                <circle
                  key={idx}
                  cx={px}
                  cy={py}
                  r={pr}
                  fill={smokeColor}
                  opacity={pOpacity}
                />
              );
            })}

            {/* Secondary Billow Outlines for Organic Cardstock Feel */}
            {[0, 1, 2].map((idx) => {
              const puffOffset = (smokeProgress * 0.8 + idx * 110) % 320;
              const puffT = puffOffset / 320;
              const px = -10 + puffT * 240;
              const py = -30 - puffT * 350;
              const pr = 30 + puffT * 60;
              return (
                <circle
                  key={`outline_${idx}`}
                  cx={px}
                  cy={py}
                  r={pr}
                  fill="none"
                  stroke="#3F3F46"
                  strokeWidth="1.5"
                  opacity={interpolate(puffT, [0, 0.2, 0.8, 1], [0, 0.4, 0.3, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  })}
                />
              );
            })}

            {/* Layer 6: Floating Detached Ember Sparks */}
            {[0, 1, 2, 3, 4].map((idx) => {
              const sparkOffset = (frame * 3 + idx * 45) % 180;
              const sparkT = sparkOffset / 180;
              const sx = -15 + sparkT * 150 + Math.sin(frame * 0.15 + idx) * 25;
              const sy = -20 - sparkT * 280;
              const sr = 3 - sparkT * 1.8;
              const sparkOpacity = interpolate(sparkT, [0, 0.2, 0.8, 1], [0, 1, 0.8, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

              return (
                <circle
                  key={`spark_${idx}`}
                  cx={sx}
                  cy={sy}
                  r={Math.max(1, sr)}
                  fill={idx % 2 === 0 ? '#FBBF24' : '#F97316'}
                  opacity={sparkOpacity}
                  filter="url(#flameGlow)"
                />
              );
            })}
          </g>
        </g>

        {/* =========================================================================
            LAYER 3: MAJOR-GENERAL ADRIAN CARTON DE WIART VC
            The Unkillable Soldier:
              - Phase 1 (Frames 0-31): Cockpit exit struggle through impact shudder.
              - Phase 2 (Frames 32-159): Strides forward into commanding hero position (scale 1.72).
            Full Anatomical & Uniform Hierarchy:
              - Peaked Service Cap with scarlet general staff band & gold bullion emblem
              - Signature midnight silk eyepatch over left eye
              - Pinned empty left sleeve (one-handed WWI combat veteran)
              - Polished malacca swagger cane with gold knob held in right hand
              - Sam Browne leather cross-belt, scarlet gorget tabs, VC medal ribbons
              - Khaki cavalry breeches & tall black riding boots planted firmly in turf
            ========================================================================= */}
        <g
          id="cartonDeWiartHero"
          transform={`translate(${adrianX}, ${adrianY + planeShudderY * 0.35}) scale(${adrianScale})`}
          filter="url(#cartonHeroShadow)"
        >
          {/* Subtle Ground Contact Shadow on Turf */}
          <ellipse
            cx="0"
            cy="114"
            rx="55"
            ry="16"
            fill="#0D110A"
            opacity="0.85"
          />

          {/* --- LOWER BODY: KHAKI CAVALRY RIDING BREECHES & TRENCH BOOTS --- */}
          <g id="cartonLegs">
            {/* Left Leg (Stationary Stance) */}
            <polyline
              points="-14,48 -22,82 -20,112"
              fill="none"
              stroke="#3B3426"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Polished Black Riding Boot (Left) */}
            <polygon points="-28,96 -10,96 -8,114 -32,114" fill="#18181B" stroke="#09090B" strokeWidth="1.5" />
            <polygon points="-34,110 -8,110 -8,115 -34,115" fill="#09090B" />

            {/* Right Leg (Heroic Stride Forward) */}
            <polyline
              points="14,48 24,80 26,112"
              fill="none"
              stroke="#3B3426"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Polished Black Riding Boot (Right) */}
            <polygon points="12,96 34,96 36,114 14,114" fill="#18181B" stroke="#09090B" strokeWidth="1.5" />
            <polygon points="12,110 38,110 38,115 12,115" fill="#09090B" />
          </g>

          {/* --- TORSO & KHAKI OFFICER TUNIC --- */}
          <g id="cartonTorso" transform={`translate(0, ${idleBreathing})`}>
            {/* Main Khaki Wool Serge Officer Tunic Body */}
            <path
              d={`M -34 -20 L 32 -20 L ${28 + coatFlutter} 58 L ${-30 + coatFlutter} 58 Z`}
              fill="#423B2B"
              stroke="#241F16"
              strokeWidth="2.8"
            />

            {/* Sam Browne Leather Cross-Belt & Waistband */}
            <line x1="-24" y1="-20" x2="20" y2="44" stroke="#2B1810" strokeWidth="7.5" />
            <rect x="-32" y="40" width="62" height="11" fill="#3E2415" stroke="#1A0D08" strokeWidth="1.5" />
            {/* Polished Brass Belt Buckle */}
            <rect x="-4" y="38" width="12" height="15" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />

            {/* Scarlet General Staff Collar Tabs (Red Gorget Patches) */}
            <polygon points="-28,-20 -18,-11 -21,-4 -31,-13" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
            <polygon points="24,-20 14,-11 17,-4 27,-13" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
            <line x1="-25" y1="-17" x2="-21" y2="-8" stroke="#FBBF24" strokeWidth="1.2" />
            <line x1="21" y1="-17" x2="17" y2="-8" stroke="#FBBF24" strokeWidth="1.2" />

            {/* Polished Brass General Service Buttons Down Tunic Front */}
            {[-8, 8, 24].map((by) => (
              <circle key={by} cx="-2" cy={by} r="2.8" fill="#FBBF24" stroke="#78350F" strokeWidth="0.8" />
            ))}

            {/* Medal Ribbon Bar (Crimson Victoria Cross + DSO + Boer War) */}
            <g transform="translate(6, -14)">
              <rect x="0" y="0" width="8" height="5" fill="#991B1B" stroke="#1C1812" strokeWidth="0.6" />
              <rect x="8" y="0" width="8" height="5" fill="#1E3A8A" stroke="#1C1812" strokeWidth="0.6" />
              <rect x="16" y="0" width="8" height="5" fill="#D97706" stroke="#1C1812" strokeWidth="0.6" />
            </g>

            {/* --- PINNED EMPTY LEFT SLEEVE (ONE-ARMED HISTORICAL REALITY) --- */}
            {/* Following 1915 Ypres amputation, left sleeve is folded flat and pinned */}
            <g id="pinnedEmptyLeftSleeve" transform="translate(26, -18)">
              <path
                d="M 0 0 C 12 12, 14 36, 10 52 C 4 52, -2 46, -4 36 L -2 0 Z"
                fill="#352F22"
                stroke="#1E1912"
                strokeWidth="2.2"
              />
              <line x1="2" y1="16" x2="8" y2="34" stroke="#241F16" strokeWidth="1.5" />
              {/* Golden Brass Safety Pin Fastener */}
              <g transform="translate(4, 24) rotate(-15)">
                <rect x="-2" y="-1" width="13" height="3.5" rx="1.5" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />
                <line x1="0" y1="1" x2="9" y2="1" stroke="#FEF08A" strokeWidth="1" />
                <circle cx="-1" cy="0.8" r="3" fill="#FBBF24" stroke="#78350F" strokeWidth="0.8" />
                <circle cx="10" cy="0.8" r="2.2" fill="#D97706" />
              </g>
            </g>

            {/* --- RIGHT ARM & POLISHED MALACCA SWAGGER CANE --- */}
            <g id="rightArmWithCane" transform="translate(-28, -16)">
              {/* Upper Arm & Forearm in Khaki Wool Serge */}
              <polyline
                points="0,0 -8,35 -6,68"
                fill="none"
                stroke="#423B2B"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Brown Leather Officer Glove Clenched on Cane Knob */}
              <circle cx="-6" cy="72" r="8.5" fill="#54331C" stroke="#2D1A0D" strokeWidth="1.5" />

              {/* Polished Malacca Wood Swagger Cane with Gold Knob Head */}
              <g transform="translate(-6, 70)">
                {/* Gold Knob Head */}
                <ellipse cx="0" cy="0" rx="5.5" ry="6.5" fill="#FBBF24" stroke="#B45309" strokeWidth="1.2" />
                {/* Malacca Wood Shaft extending all the way down to turf */}
                <line x1="0" y1="6" x2="3" y2="60" stroke="#4A2E1B" strokeWidth="3.5" />
                {/* Brass Ferrule Tip touching turf */}
                <line x1="2.8" y1="55" x2="3.1" y2="61" stroke="#F59E0B" strokeWidth="3.5" />
              </g>
            </g>

            {/* --- ARCHIVAL PORTRAIT HEAD MEDALLION --- */}
            <g id="cartonPortraitHead" transform="translate(-1, -16)">
              {/* Crisp Cream Paper Cutout Border Frame */}
              <ellipse
                cx="0"
                cy="-48"
                rx="27"
                ry="36"
                fill="#F4EFE6"
                stroke="#18181B"
                strokeWidth="2"
              />
              {/* Archival Photo Head cleanly clipped to portrait oval */}
              <image
                href={staticFile('plates/carton_face.png')}
                x="-36"
                y="-92"
                width="72"
                height="88"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#cartonCrashHeadClip)"
              />

              {/* British Officer Service Peaked Cap (Olive/Khaki Felt with Gold Bullion & Scarlet Trim) */}
              <g transform="translate(0, -76)">
                {/* Cap Crown (Peaked Khaki Felt) */}
                <path
                  d="M -34 -12 Q 0 -32 34 -12 Q 22 2 0 4 Q -22 2 -34 -12 Z"
                  fill="#423B2B"
                  stroke="#241F16"
                  strokeWidth="2"
                />
                {/* General Staff Scarlet Cap Band */}
                <path
                  d="M -30 -4 Q 0 -12 30 -4 L 28 4 Q 0 -3 -28 4 Z"
                  fill="#DC2626"
                  stroke="#991B1B"
                  strokeWidth="1.2"
                />
                {/* Gold Bullion Embroidered General Staff Cap Badge */}
                <circle cx="0" cy="-2" r="4.5" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
                {/* Polished Black Leather Visor with Edge Binding */}
                <path
                  d="M -26 4 Q 0 16 26 4 Q 14 0 0 -1 Q -14 0 -26 4 Z"
                  fill="#18181B"
                  stroke="#09090B"
                  strokeWidth="1.5"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
