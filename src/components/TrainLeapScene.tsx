import React from 'react';
import { interpolate, useCurrentFrame, staticFile } from 'remotion';

interface TrainLeapSceneProps {
  durationFrames?: number;
}

/**
 * Authentic 1920 Polish-Soviet War: The One-Handed Speeding Train Leap
 *
 * Historical Incident (August 1920):
 * During the fierce running gunfight with Red Army Cossack cavalry, Major-General
 * Adrian Carton de Wiart VC was thrown or fell off the moving observation train.
 * Refusing to be abandoned in enemy cavalry territory, the one-armed general
 * sprinted alongside the tracks at breakneck speed, hurled himself into the air,
 * clamped his single remaining hand onto the iron handrail of the speeding
 * footplate, and hauled himself back aboard the moving train.
 *
 * Cinematic 2-Phase Choreography:
 * - Phase 1 (Frames 0 to 31): "FELL OFF MOVING TRAIN"
 *   Carton de Wiart sprints along the railway ballast in desperate pursuit,
 *   body leaning forward, boots churning gravel, single right arm reaching
 *   toward the speeding Polish Armoured Train P.P. "ŚMIAŁY", his left sleeve
 *   visibly pinned flat to his tunic.
 * - Phase 2 (Frames 32 to 159): "LEAPED BACK ABOARD" (Bass Drop + Metal Clang Transient)
 *   On Frame 32, Adrian leaps through the air! His single right hand SLAMS onto
 *   the tubular steel safety rail, triggering an explosion of friction sparks.
 *   His legs swing up onto the diamond-plate running board as he hoists his body
 *   weight aboard, safely remounting the speeding war train.
 */
export const TrainLeapScene: React.FC<TrainLeapSceneProps> = () => {
  const frame = useCurrentFrame();

  // High-speed train scroll physics
  const trackTieScroll = (frame * 38) % 72;
  const wheelSpinAngle = (frame * 48) % 360;
  const telephonePoleScroll = (frame * 24) % 1200;
  const forestScroll = (frame * 12) % 1080;
  const dustCloudScroll = (frame * 30) % 240;

  // Running stride cycle for Phase 1 (0 to 31)
  const sprintPhase = Math.sin(frame * 0.7);
  const sprintBobY = Math.abs(Math.sin(frame * 0.7)) * 12;

  // 2-Phase Leap & Remount Kinematics (Hit frame: 32)
  // Phase 1 (0-28): Sprinting on ballast behind train
  // Phase 1.5 (28-32): Explosive launch & airborne flight
  // Phase 2 (32-45): Hand slams rail, body swings upward
  // Phase 2.5 (45-65): Pulling up onto the running board
  // Phase 3 (65-159): Firmly planted on running board, riding forward
  const leapProgress = interpolate(frame, [27, 32, 48, 70], [0, 0.65, 0.9, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Adrian's World Position across the leap
  const adrianX = interpolate(leapProgress, [0, 0.65, 1.0], [280, 480, 560], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const adrianY = interpolate(
    leapProgress,
    [0, 0.65, 0.85, 1.0],
    [1280 - sprintBobY, 1165, 1150, 1160],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  const adrianRot = interpolate(
    leapProgress,
    [0, 0.3, 0.65, 0.85, 1.0],
    [22, 35, -12, -4, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Camera impact shake on rail grab (Frame 32)
  const cameraShake = interpolate(frame, [32, 34, 42, 54], [0, 11, 4, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Metallic rail grab spark burst at (x: 525, y: 1170)
  const isSparking = frame >= 32 && frame <= 42;
  const sparkScale = interpolate(frame, [32, 34, 42], [0.3, 1.5, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sparkOpacity = interpolate(frame, [32, 33, 42], [1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Launch gravel burst at frame 28-36
  const launchDustScale = interpolate(frame, [27, 30, 38], [0.2, 1.4, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg
        viewBox="0 0 1080 1920"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          transform: `translate(${(frame % 2 === 0 ? 1 : -1) * cameraShake}px, ${Math.sin(frame) * cameraShake}px)`,
        }}
      >
        <defs>
          {/* Tactical Atmospheric Steppe Twilight Gradient */}
          <linearGradient id="trainLeapSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" stopOpacity="0" />
            <stop offset="25%" stopColor="#334155" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#1E293B" />
            <stop offset="85%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Steppe Trackside Ballast Bed Gradient */}
          <linearGradient id="ballastBedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#382E25" />
            <stop offset="35%" stopColor="#251C14" />
            <stop offset="100%" stopColor="#120D08" />
          </linearGradient>

          {/* Polish Armoured Train 3-Tone Camouflage Gradients */}
          <linearGradient id="armorOliveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A5A42" />
            <stop offset="60%" stopColor="#374431" />
            <stop offset="100%" stopColor="#242D20" />
          </linearGradient>

          <linearGradient id="armorOchreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#967746" />
            <stop offset="70%" stopColor="#755B34" />
            <stop offset="100%" stopColor="#4F3C21" />
          </linearGradient>

          <linearGradient id="armorCharcoalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#353A42" />
            <stop offset="60%" stopColor="#25282E" />
            <stop offset="100%" stopColor="#16181C" />
          </linearGradient>

          {/* Steel Rail Metallic Shimmer */}
          <linearGradient id="steelRailMetallic" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="40%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Friction Spark Radial Burst Gradient */}
          <radialGradient id="frictionSparkGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FEF08A" />
            <stop offset="65%" stopColor="#F59E0B" />
            <stop offset="90%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </radialGradient>

          {/* Drop shadow for paper puppets */}
          <filter id="leapPuppetShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="3" dy="7" stdDeviation="5" floodColor="#000000" floodOpacity="0.75" />
          </filter>

          {/* Drop shadow for train locomotive mass */}
          <filter id="trainHullShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="-6" dy="10" stdDeviation="8" floodColor="#000000" floodOpacity="0.8" />
          </filter>

          {/* Glow filter for sparks and metal friction */}
          <filter id="sparkGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Oval clip path for Adrian Carton de Wiart head portrait */}
          <clipPath id="cartonLeapHeadClip">
            <ellipse cx="0" cy="-48" rx="28" ry="36" />
          </clipPath>
        </defs>

        {/* =========================================================================
            LAYER 1: PARALLAX STEPPE ENVIRONMENT, PINE FOREST & TELEGRAPH WIRES
            Based on reference plate polish_armoured_train_2.jpg (Pine treeline & telegraphs)
            ========================================================================= */}
        {/* Tactical Sky Substrate */}
        <rect x="0" y="660" width="1080" height="860" fill="url(#trainLeapSkyGrad)" />

        {/* Distant Polish Pine Forest Silhouette (Parallax Treeline) */}
        {[-100, 260, 620, 980, 1340].map((fx, fi) => {
          const treeX = ((fx - forestScroll + 1440) % 1440) - 180;
          return (
            <g key={fi} opacity="0.32" transform={`translate(${treeX}, 970)`}>
              {/* Cluster of Jagged Pine Silhouettes */}
              <polygon points="0,0 20,-75 28,-75 48,0" fill="#141E18" />
              <polygon points="35,0 52,-90 60,-90 78,0" fill="#141E18" />
              <polygon points="65,0 80,-65 88,-65 102,0" fill="#141E18" />
              <polygon points="90,0 110,-105 118,-105 138,0" fill="#0D1410" />
              <polygon points="125,0 140,-80 148,-80 162,0" fill="#141E18" />
            </g>
          );
        })}

        {/* Fast-Scrolling Telegraph Lines along the Rail Corridor */}
        {[-240, 320, 880, 1440].map((baseX, idx) => {
          const poleX = ((baseX - telephonePoleScroll + 1600) % 1600) - 200;
          return (
            <g key={idx} opacity="0.4">
              <line x1={poleX} y1="880" x2={poleX} y2="1280" stroke="#0F172A" strokeWidth="5" />
              <line x1={poleX - 40} y1="900" x2={poleX + 40} y2="900" stroke="#0F172A" strokeWidth="3.5" />
              <line x1={poleX - 35} y1="925" x2={poleX + 35} y2="925" stroke="#0F172A" strokeWidth="3" />
              {/* Glass Insulators */}
              {[-36, -18, 18, 36].map((ix) => (
                <rect key={ix} x={poleX + ix - 3} y="894" width="6" height="8" rx="1.5" fill="#38BDF8" opacity="0.6" />
              ))}
              {/* Telegraph Wire Droop */}
              <path
                d={`M ${poleX - 500} 900 Q ${poleX - 250} 930 ${poleX} 900 Q ${poleX + 250} 930 ${poleX + 500} 900`}
                fill="none"
                stroke="#0F172A"
                strokeWidth="1.4"
              />
            </g>
          );
        })}

        {/* Speed Motion Horizontal Wind Streaks (Evokes 60 km/h Train Velocity) */}
        <g opacity="0.25">
          {[880, 940, 1010, 1080, 1150].map((sy, si) => (
            <line
              key={si}
              x1={(si * 220 - frame * 45) % 1080}
              y1={sy}
              x2={((si * 220 - frame * 45) % 1080) + 260}
              y2={sy}
              stroke="#E2E8F0"
              strokeWidth="2"
              strokeDasharray="40 80"
            />
          ))}
        </g>

        {/* Steppe Trackside Ground Base & Ballast */}
        <rect x="0" y="1280" width="1080" height="240" fill="url(#ballastBedGrad)" />

        {/* Speed-Motion Dust Billows along Ballast */}
        <g opacity="0.32">
          {[0, 160, 320, 480, 640, 800, 960].map((bx, i) => {
            const dx = (bx - dustCloudScroll * 2 + 1200) % 1200 - 60;
            return (
              <circle
                key={i}
                cx={dx}
                cy={1335 + (i % 3) * 16}
                r={38 + (i % 4) * 14}
                fill="#8C7053"
              />
            );
          })}
        </g>

        {/* =========================================================================
            LAYER 2: SPEEDING RAILWAY TRACK & TIMBER TIES
            ========================================================================= */}
        <g id="railwayCorridor" transform="translate(0, 1310)">
          {/* Railway Ballast Bed Gravel Texture */}
          <rect x="0" y="0" width="1080" height="42" fill="#2E2117" />
          <line x1="0" y1="0" x2="1080" y2="0" stroke="#1F150F" strokeWidth="2" />

          {/* High-Speed Scrolling Heavy Oak Timber Ties */}
          {Array.from({ length: 24 }).map((_, i) => {
            const tieX = i * 48 - trackTieScroll - 40;
            return (
              <g key={i} transform={`translate(${tieX}, 3)`}>
                <rect x="0" y="0" width="26" height="34" rx="2" fill="#1C120C" stroke="#0D0704" strokeWidth="1" />
                <rect x="3" y="1" width="20" height="4" fill="#4B3B2F" />
                <rect x="3" y="27" width="20" height="4" fill="#4B3B2F" />
                <circle cx="7" cy="3" r="1.5" fill="#111827" />
                <circle cx="19" cy="3" r="1.5" fill="#111827" />
              </g>
            );
          })}

          {/* Steel Rail 1 (Top Profile with Metallic Glint) */}
          <rect x="0" y="4" width="1080" height="7" fill="url(#steelRailMetallic)" />
          <line x1="0" y1="3" x2="1080" y2="3" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.9" />
          <line x1="0" y1="11" x2="1080" y2="11" stroke="#1E293B" strokeWidth="1.5" />

          {/* Steel Rail 2 (Lower Base Profile) */}
          <rect x="0" y="28" width="1080" height="6" fill="#475569" />
          <line x1="0" y1="27" x2="1080" y2="27" stroke="#94A3B8" strokeWidth="1" opacity="0.7" />
        </g>

        {/* =========================================================================
            LAYER 3: POLISH ARMOURED TRAIN P.P. "ŚMIAŁY" (POCIĄG PANCERNY NR 2)
            Modeled directly from authentic plates: polish_armoured_train_1.jpg & train_2.jpg
            Features: 3-tone camouflage, Maxim MG cupola, running board, spinning wheels
            ========================================================================= */}
        <g id="polishArmouredTrain" transform="translate(520, 800)" filter="url(#trainHullShadow)">
          {/* Main Armored Locomotive / Artillery Wagon Body */}
          <g id="wagonArmorShell">
            {/* Base Armored Hull */}
            <path
              d="M 40 480 L 560 480 L 560 180 L 140 180 L 100 220 L 40 220 Z"
              fill="url(#armorOliveGrad)"
              stroke="#1A2016"
              strokeWidth="4"
            />

            {/* Angular 3-Tone Camouflage Splinter Patches (1920 Polish Pattern) */}
            <polygon points="100,220 240,180 300,260 170,340 80,280" fill="url(#armorOchreGrad)" />
            <polygon points="260,310 420,240 540,290 500,420 320,400" fill="url(#armorCharcoalGrad)" />
            <polygon points="120,360 250,350 230,480 70,480" fill="url(#armorOchreGrad)" />

            {/* Armored Observation Cupola / Roof Turret */}
            <path
              d="M 160 180 L 190 130 L 340 130 L 370 180 Z"
              fill="url(#armorOliveGrad)"
              stroke="#1A2016"
              strokeWidth="3.5"
            />
            {/* Vision Slit / Armored Viewport */}
            <rect x="205" y="145" width="100" height="12" rx="2" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
            <line x1="205" y1="151" x2="305" y2="151" stroke="#38BDF8" strokeWidth="1.2" opacity="0.6" />

            {/* Protruding Maxim wz. 05 Heavy Machine Gun Sponson */}
            <g id="maximMachineGun" transform="translate(120, 240)">
              <rect x="-15" y="-12" width="24" height="24" rx="4" fill="#262E20" stroke="#0F140D" strokeWidth="2" />
              <rect x="-65" y="-6" width="52" height="12" rx="3" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
              <rect x="-70" y="-8" width="6" height="16" rx="1.5" fill="#334155" />
              <path d="M -10 10 Q -5 25 -12 35" fill="none" stroke="#D97706" strokeWidth="4" strokeDasharray="3 2" />
            </g>

            {/* Locomotive Steam & Coal Smoke Exhaust Stack on Roof */}
            <g transform="translate(400, 110)">
              <rect x="0" y="0" width="30" height="70" rx="3" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
              <ellipse cx="15" cy="0" rx="18" ry="6" fill="#334155" />
              {/* Trailing Coal Smoke Billows whipped backward by 60 km/h train speed */}
              {[
                { dx: 40, dy: -10, r: 26, op: 0.65 },
                { dx: 95, dy: -18, r: 38, op: 0.55 },
                { dx: 170, dy: -28, r: 52, op: 0.4 },
              ].map((sm, si) => (
                <circle
                  key={si}
                  cx={sm.dx + ((frame * 14) % 65)}
                  cy={sm.dy}
                  r={sm.r}
                  fill="#475569"
                  opacity={sm.op}
                />
              ))}
            </g>

            {/* Heavy Steel Rivet Seams along Armor Plates */}
            {Array.from({ length: 14 }).map((_, rIdx) => (
              <g key={rIdx}>
                <circle cx={60 + rIdx * 34} cy="465" r="2.8" fill="#64748B" stroke="#1E293B" strokeWidth="0.8" />
                <circle cx="140" cy="200 + rIdx * 20" r="2.5" fill="#64748B" stroke="#1E293B" strokeWidth="0.8" />
                <circle cx="360" cy="200 + rIdx * 20" r="2.5" fill="#64748B" stroke="#1E293B" strokeWidth="0.8" />
              </g>
            ))}

            {/* Official Stenciled Train Placard */}
            <g id="trainPlacard" transform="translate(180, 290)">
              <rect x="0" y="0" width="190" height="38" rx="3" fill="#1C1F24" stroke="#475569" strokeWidth="1.5" />
              <text
                x="95"
                y="19"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#F8FAFC"
                fontSize="14"
                fontWeight="900"
                fontFamily="'Montserrat', 'Inter', sans-serif"
                letterSpacing="0.12em"
              >
                P.P. &quot;ŚMIAŁY&quot;
              </text>
              <text
                x="95"
                y="31"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#94A3B8"
                fontSize="7.5"
                fontWeight="700"
                fontFamily="'Montserrat', 'Inter', sans-serif"
                letterSpacing="0.15em"
              >
                POCIĄG PANCERNY NR 2
              </text>
            </g>
          </g>

          {/* Armored Undercarriage Skirt */}
          <rect x="30" y="475" width="510" height="30" fill="#181B1F" stroke="#0D0E10" strokeWidth="2" />

          {/* Heavy Spinning Train Locomotive Spoked Wheels & Side-Rods */}
          {[100, 260, 420].map((wx, wIdx) => (
            <g key={wIdx} transform={`translate(${wx}, 515)`}>
              <circle cx="0" cy="0" r="42" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
              <circle cx="0" cy="0" r="36" fill="#334155" />
              <circle cx="0" cy="0" r="32" fill="#0F172A" />

              <g transform={`rotate(${wheelSpinAngle})`}>
                {Array.from({ length: 8 }).map((_, spkIdx) => (
                  <line
                    key={spkIdx}
                    x1="0"
                    y1="0"
                    x2={30 * Math.cos((spkIdx * Math.PI) / 4)}
                    y2={30 * Math.sin((spkIdx * Math.PI) / 4)}
                    stroke="#64748B"
                    strokeWidth="3.5"
                  />
                ))}
                <path d="M -22 -14 A 26 26 0 0 1 22 -14 Z" fill="#475569" />
                <circle cx="16" cy="0" r="6" fill="#F1F5F9" stroke="#0F172A" strokeWidth="1.5" />
              </g>

              <circle cx="0" cy="0" r="11" fill="#475569" stroke="#0F172A" strokeWidth="2" />
              <circle cx="0" cy="0" r="4" fill="#94A3B8" />
            </g>
          ))}

          {/* Heavy Mechanical Side Connecting Rod linking wheels */}
          <g transform={`translate(0, ${Math.sin((wheelSpinAngle * Math.PI) / 180) * 16})`}>
            <rect x="90" y="508" width="345" height="14" rx="4" fill="#64748B" stroke="#1E293B" strokeWidth="2" />
            {[100, 260, 420].map((rx, ri) => (
              <circle key={ri} cx={rx + 16} cy="515" r="7" fill="#CBD5E1" stroke="#0F172A" strokeWidth="1.8" />
            ))}
          </g>

          {/* Running Board Footplate Platform with Handrails & Steps */}
          <g id="runningBoardBalcony" transform="translate(-45, 410)">
            {/* Diamond-Plate Steel Floor */}
            <rect x="0" y="60" width="180" height="16" rx="2" fill="#334155" stroke="#1E293B" strokeWidth="2" />
            {Array.from({ length: 12 }).map((_, tx) => (
              <line key={tx} x1={tx * 14 + 4} y1="62" x2={tx * 14 + 12} y2="74" stroke="#475569" strokeWidth="2" />
            ))}
            <polygon points="15,76 35,76 35,115" fill="#1E293B" />
            <polygon points="140,76 160,76 140,115" fill="#1E293B" />

            {/* Industrial Tubular Steel Handrails & Safety Guardrail */}
            <line x1="8" y1="10" x2="8" y2="60" stroke="#F59E0B" strokeWidth="3.5" />
            <line x1="90" y1="10" x2="90" y2="60" stroke="#F59E0B" strokeWidth="3" />
            <line x1="172" y1="10" x2="172" y2="60" stroke="#F59E0B" strokeWidth="3.5" />
            <line x1="0" y1="10" x2="180" y2="10" stroke="#F59E0B" strokeWidth="4.5" />
            <line x1="4" y1="35" x2="176" y2="35" stroke="#D97706" strokeWidth="3" />

            {/* Boarding Ladder Access Steps hanging down from platform */}
            <g transform="translate(6, 76)">
              <line x1="0" y1="0" x2="0" y2="35" stroke="#F59E0B" strokeWidth="2.5" />
              <line x1="18" y1="0" x2="18" y2="35" stroke="#F59E0B" strokeWidth="2.5" />
              <line x1="0" y1="12" x2="18" y2="12" stroke="#F59E0B" strokeWidth="2.5" />
              <line x1="0" y1="24" x2="18" y2="24" stroke="#F59E0B" strokeWidth="2.5" />
            </g>
          </g>
        </g>

        {/* =========================================================================
            LAYER 4: LAUNCH DUST & IMPACT SPARKS (FRAME 28 TO 45)
            ========================================================================= */}
        {/* Launch Dust Cloud on Ballast where Adrian jumped */}
        {frame >= 27 && frame <= 38 && (
          <g transform="translate(280, 1340) scale(${launchDustScale})" opacity="0.6">
            <circle cx="0" cy="0" r="28" fill="#967758" />
            <circle cx="-25" cy="5" r="20" fill="#785E44" />
            <circle cx="22" cy="3" r="16" fill="#8C7053" />
            <circle cx="-45" cy="10" r="12" fill="#5C4733" />
          </g>
        )}

        {/* Handrail Iron Clang Spark Burst (Frame 32 to 42) */}
        {isSparking && (
          <g
            transform={`translate(485, 1175) scale(${sparkScale})`}
            opacity={sparkOpacity}
            filter="url(#sparkGlowFilter)"
          >
            <circle cx="0" cy="0" r="24" fill="#FFFFFF" />
            <circle cx="0" cy="0" r="42" fill="#FEF08A" opacity="0.85" />
            <circle cx="0" cy="0" r="68" fill="#F59E0B" opacity="0.5" />
            {/* Acute Friction Spark Spikes */}
            {[-60, -20, 25, 75, 130, 185, 240, 290].map((deg, sIdx) => (
              <line
                key={sIdx}
                x1="0"
                y1="0"
                x2={52 * Math.cos((deg * Math.PI) / 180)}
                y2={52 * Math.sin((deg * Math.PI) / 180)}
                stroke="#FEF08A"
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}
          </g>
        )}

        {/* =========================================================================
            LAYER 5: ADRIAN CARTON DE WIART VC (THE ONE-HANDED SPRINT & LEAP)
            Features: Pinned empty left sleeve, single muscular right arm grabbing rail,
            oval portrait medallion, and dynamic sprint/leap kinematics.
            ========================================================================= */}
        <g
          id="cartonLeapingHero"
          transform={`translate(${adrianX}, ${adrianY}) rotate(${adrianRot})`}
          filter="url(#leapPuppetShadow)"
        >
          {/* --- Legs & Boots Kinematics --- */}
          {/* Phase 1 (0 to 30): Sprinting stride on ballast */}
          {frame < 30 ? (
            <g id="sprintLegs">
              {/* Back trailing leg */}
              <polyline
                points="-10,50 -35,78 -65,102"
                fill="none"
                stroke="#3B3426"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polygon points="-62,96 -76,108 -66,114 -56,104" fill="#18181B" />
              {/* Front driving leg */}
              <polyline
                points="12,50 35,74 25,108"
                fill="none"
                stroke="#3B3426"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polygon points="20,102 32,114 22,120 12,110" fill="#18181B" />
            </g>
          ) : (
            /* Phase 2 (31 to 159): Mid-Air Leap & Remounting onto Running Board */
            <g id="leapingLegs">
              {/* Legs tucking and swinging up onto the platform */}
              <polyline
                points="-10,50 15,82 45,95"
                fill="none"
                stroke="#3B3426"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polygon points="40,90 54,98 48,106 36,98" fill="#18181B" />
              <polyline
                points="8,50 28,78 55,88"
                fill="none"
                stroke="#3B3426"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polygon points="50,82 64,90 58,98 46,90" fill="#18181B" />
            </g>
          )}

          {/* --- British Khaki Officer Tunic Body --- */}
          <path
            d="M -34 -20 L 32 -20 L 26 62 L -30 62 Z"
            fill="#4A4031"
            stroke="#262018"
            strokeWidth="2.8"
          />
          {/* Scarlet General Staff Collar Tabs */}
          <polygon points="-28,-20 -18,-11 -21,-4 -31,-13" fill="#DC2626" />
          <polygon points="24,-20 14,-11 17,-4 27,-13" fill="#DC2626" />

          {/* Sam Browne Leather Cross-Belt */}
          <line x1="-24" y1="-20" x2="20" y2="46" stroke="#2B1810" strokeWidth="7" />
          <rect x="-10" y="44" width="38" height="9" fill="#3E2415" stroke="#1A0D08" strokeWidth="1" />
          <rect x="4" y="42" width="9" height="13" fill="#F59E0B" />
          {/* Polished Brass Tunic Buttons */}
          {[-10, 6, 22, 38].map((by) => (
            <circle key={by} cx="-3" cy={by} r="2.8" fill="#FBBF24" stroke="#78350F" strokeWidth="0.8" />
          ))}

          {/* --- KEY HISTORICAL DETAIL: PINNED EMPTY LEFT SLEEVE (ONE-ARMED) --- */}
          {/* Following his 1915 Ypres amputation, left sleeve is pinned flat across chest */}
          <g id="pinnedEmptySleeve" transform="translate(24, -15)">
            <path
              d="M 0 0 C 10 12, 12 38, 8 58 C 3 58, -2 52, -4 40 L -2 0 Z"
              fill="#3B3426"
              stroke="#1E1912"
              strokeWidth="2"
            />
            <line x1="2" y1="18" x2="7" y2="36" stroke="#272118" strokeWidth="1.5" />
            {/* Officer's Gold Safety Pin */}
            <g transform="translate(3, 26) rotate(-15)">
              <rect x="-2" y="-1" width="12" height="3" rx="1.5" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />
              <line x1="0" y1="1" x2="8" y2="1" stroke="#FEF08A" strokeWidth="1" />
              <circle cx="-1" cy="0.5" r="2.8" fill="#FBBF24" stroke="#78350F" strokeWidth="0.8" />
              <circle cx="9" cy="0.5" r="2" fill="#D97706" />
            </g>
          </g>

          {/* --- SINGLE RIGHT ARM (DESPERATE REACH & IRON HANDRAIL GRIP) --- */}
          {frame < 32 ? (
            /* Phase 1: Arm fully extended forward reaching for the train handrail */
            <g id="reachingRightArm" transform="translate(-26, -14)">
              <polyline
                points="0,0 35,-8 75,-16"
                fill="none"
                stroke="#4A4031"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="68" y="-24" width="14" height="16" rx="2" fill="#3B3426" stroke="#1E1912" strokeWidth="1.2" />
              {/* Desperately outstretched fingers */}
              <circle cx="78" cy="-16" r="6.5" fill="#D4A373" />
              <line x1="82" y1="-20" x2="94" y2="-22" stroke="#D4A373" strokeWidth="3" strokeLinecap="round" />
              <line x1="83" y1="-16" x2="96" y2="-17" stroke="#D4A373" strokeWidth="3" strokeLinecap="round" />
              <line x1="82" y1="-12" x2="94" y2="-12" stroke="#D4A373" strokeWidth="3" strokeLinecap="round" />
            </g>
          ) : (
            /* Phase 2: Powerful bent arm firmly clamped onto the handrail, hoisting body */
            <g id="clampedRightArm" transform="translate(-26, -14)">
              <polyline
                points="0,0 28,-18 54,-4"
                fill="none"
                stroke="#4A4031"
                strokeWidth="17"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="46" y="-12" width="14" height="16" rx="2" fill="#3B3426" stroke="#1E1912" strokeWidth="1.2" />
              {/* Clenched fist wrapped tight around the rail */}
              <circle cx="56" cy="-4" r="7.5" fill="#D4A373" stroke="#A16207" strokeWidth="1.2" />
              {/* Knuckles clamped over yellow bar */}
              <line x1="52" y1="-8" x2="52" y2="0" stroke="#F59E0B" strokeWidth="4.5" />
            </g>
          )}

          {/* --- ADRIAN CARTON DE WIART ARCHIVAL PORTRAIT HEAD --- */}
          <g id="cartonPortraitHead" transform="translate(-2, -18)">
            {/* Cream Paper Cutout Border Frame */}
            <ellipse cx="0" cy="-48" rx="32" ry="40" fill="#F4EFE6" stroke="#E2D9CC" strokeWidth="2.5" />
            {/* Archival Photo Head clipped cleanly to portrait oval */}
            <image
              href={staticFile('plates/carton_face.png')}
              x="-36"
              y="-92"
              width="72"
              height="88"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#cartonLeapHeadClip)"
            />
            {/* British Officer Service Cap (Olive/Khaki Felt with Gold Bullion Trim) */}
            <g transform="translate(0, -78)">
              <path d="M -30 0 C -25 -18, 25 -18, 30 0 Z" fill="#4A4031" stroke="#262018" strokeWidth="1.2" />
              <ellipse cx="0" cy="0" rx="30" ry="8" fill="#3B3426" stroke="#1E1912" strokeWidth="1.2" />
              <line x1="-26" y1="1" x2="26" y2="1" stroke="#F59E0B" strokeWidth="2.4" />
              <circle cx="0" cy="-5" r="4.2" fill="#DC2626" stroke="#FBBF24" strokeWidth="1" />
              <path d="M -24 2 Q 0 8 24 2 Q 0 5 -24 2 Z" fill="#18181B" stroke="#0F0F12" strokeWidth="0.8" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
