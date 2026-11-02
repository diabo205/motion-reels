import React from 'react';
import { interpolate, useCurrentFrame, staticFile } from 'remotion';

interface CossackTrainDuelProps {
  durationFrames?: number;
}

/**
 * Authentic 1920 Polish-Soviet War: One-Handed Revolver Duel on the Speeding Armoured Train
 *
 * Historical Incident (August 1920, Battle of Warsaw / Radzymin Corridor):
 * Major-General Adrian Carton de Wiart VC was traveling near the frontline on the Polish Armoured
 * Train P.P. "ŚMIAŁY" (Armoured Train No. 2) when Red Army Cossack cavalry (Budyonny's 1st Cavalry Army)
 * ambushed the rail line. Carton de Wiart—having had his shattered left hand amputated at Ypres in 1915—
 * stepped onto the exterior running board of the speeding train, drew his service Webley Mk VI revolver
 * with his single remaining hand, and engaged the charging Cossacks in an epic running gunfight.
 *
 * Cinematic Composition (Unified Scene, No Split Screen):
 * - Left: Charging Red Army Cossack cavalryman on an athletic galloping warhorse in traditional crimson
 *   Cherkesska, Astrakhan papakha fur hat with Soviet red star, gazyr cartridge tubes, and drawn steel shasqua sabre.
 * - Right: Polish Armoured Train P.P. "ŚMIAŁY" with riveted 3-tone camouflage armor, spinning wheels,
 *   machine-gun cupola, and high-speed scrolling railway ties.
 * - Center-Right: Adrian Carton de Wiart VC on the running board with his empty left sleeve pinned flat to his tunic,
 *   leveling his Webley revolver left and firing on the Bass Drop transient (Frame 32).
 * - Gunfire & Hit: 6-layer vector muzzle flash, supersonic bullet tracer, sabre sparks, and Cossack recoil.
 */
export const CossackTrainDuel: React.FC<CossackTrainDuelProps> = () => {
  const frame = useCurrentFrame();

  // High-speed railway scroll offsets (creates blistering forward momentum)
  const trackTieScroll = (frame * 36) % 72;
  const wheelSpinAngle = (frame * 46) % 360;
  const telephonePoleScroll = (frame * 22) % 1200;
  const dustCloudScroll = (frame * 28) % 240;

  // Gallop rhythmic cycle for the warhorse & Cossack (energetic 4-beat gallop)
  const gallopPhase = Math.sin(frame * 0.5);
  const gallopY = gallopPhase * 8;
  const gallopRot = Math.cos(frame * 0.5) * 2.5;
  const legCycle = Math.sin(frame * 0.5);

  // Bass drop / gunshot hit timing at frame 32
  const isFiring = frame >= 32 && frame <= 39;
  const gunRecoilAngle = interpolate(frame, [32, 34, 39, 48], [0, -18, -6, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Cossack ballistic recoil & sabre deflection upon getting shot (frame 32)
  const cossackRecoilAngle = interpolate(frame, [32, 36, 46, 75], [0, -22, -12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cossackRecoilX = interpolate(frame, [32, 36, 55, 90], [0, -50, -32, -18], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Muzzle flash scale and opacity
  const muzzleFlashScale = interpolate(frame, [32, 34, 38], [0.5, 1.5, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const muzzleFlashOpacity = interpolate(frame, [32, 33, 38], [1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Bullet tracer zipping across the screen (frames 32 to 36)
  const tracerProgress = interpolate(frame, [32, 36], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Camera impact shake upon gunshot
  const cameraShake = interpolate(frame, [32, 34, 40, 50], [0, 10, 3, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Spark burst at the Cossack's sabre/chest on frame 34-42
  const sparkScale = interpolate(frame, [34, 36, 42], [0.2, 1.4, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sparkOpacity = interpolate(frame, [34, 36, 42], [1, 1, 0], {
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
          {/* Steppe Sunset Sky Gradient - seamless blend from text safe zone downwards */}
          <linearGradient id="steppeSunsetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7F1D1D" stopOpacity="0" />
            <stop offset="25%" stopColor="#7F1D1D" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#450A0A" />
            <stop offset="85%" stopColor="#2A1408" />
            <stop offset="100%" stopColor="#18110D" />
          </linearGradient>

          {/* Steppe Ground / Ballast Gradient */}
          <linearGradient id="steppeGroundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#423024" />
            <stop offset="35%" stopColor="#2A1E16" />
            <stop offset="100%" stopColor="#150E0A" />
          </linearGradient>

          {/* Polish Armoured Train Camouflage Gradients */}
          <linearGradient id="trainArmorOlive" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4D5D44" />
            <stop offset="60%" stopColor="#3A4733" />
            <stop offset="100%" stopColor="#262F22" />
          </linearGradient>

          <linearGradient id="trainArmorOchre" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#967545" />
            <stop offset="70%" stopColor="#735733" />
            <stop offset="100%" stopColor="#4E3B20" />
          </linearGradient>

          <linearGradient id="trainArmorCharcoal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#33373E" />
            <stop offset="60%" stopColor="#23262B" />
            <stop offset="100%" stopColor="#15171A" />
          </linearGradient>

          {/* Steel Rail Metallic Shimmer */}
          <linearGradient id="steelRailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="40%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Muzzle Flash Radial Aura */}
          <radialGradient id="muzzleFlashAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FEF08A" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="90%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </radialGradient>

          {/* Bullet Tracer Ionization Gradient */}
          <linearGradient id="bulletTracerGrad" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FEF08A" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </linearGradient>

          {/* Drop shadow for tactile paper cutout puppets */}
          <filter id="puppetPaperShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="3" dy="7" stdDeviation="5" floodColor="#000000" floodOpacity="0.75" />
          </filter>

          {/* Oval clip path for Adrian Carton de Wiart head medallion */}
          <clipPath id="cartonOvalMedallionClip">
            <ellipse cx="0" cy="-48" rx="28" ry="36" />
          </clipPath>

          {/* Drop shadow for train locomotive mass */}
          <filter id="trainMassShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="-6" dy="10" stdDeviation="8" floodColor="#000000" floodOpacity="0.8" />
          </filter>

          {/* Glow filter for sparks and muzzle blast */}
          <filter id="sparkGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* =========================================================================
            LAYER 1: PARALLAX STEPPE ENVIRONMENT & SCROLLING TELEGRAPH POLES
            ========================================================================= */}
        {/* Steppe Sky Substrate (Smooth gradient from below text) */}
        <rect x="0" y="660" width="1080" height="860" fill="url(#steppeSunsetGrad)" />

        {/* Distant Steppe Horizon Dunes (Atmospheric Silhouette) */}
        <path
          d="M 0 1020 Q 280 990 540 1015 Q 820 1040 1080 1010 L 1080 1520 L 0 1520 Z"
          fill="#23140D"
          opacity="0.8"
        />

        {/* Fast-Scrolling Telegraph Lines along the Rail Corridor */}
        {[-240, 320, 880, 1440].map((baseX, idx) => {
          const poleX = ((baseX - telephonePoleScroll + 1600) % 1600) - 200;
          return (
            <g key={idx} opacity="0.38">
              <line x1={poleX} y1="880" x2={poleX} y2="1280" stroke="#181008" strokeWidth="5" />
              <line x1={poleX - 40} y1="900" x2={poleX + 40} y2="900" stroke="#181008" strokeWidth="3.5" />
              <line x1={poleX - 35} y1="925" x2={poleX + 35} y2="925" stroke="#181008" strokeWidth="3" />
              {/* Glass Insulators */}
              {[-36, -18, 18, 36].map((ix) => (
                <rect key={ix} x={poleX + ix - 3} y="894" width="6" height="8" rx="1.5" fill="#38BDF8" opacity="0.6" />
              ))}
              {/* Telegraph Wire Droop */}
              <path
                d={`M ${poleX - 500} 900 Q ${poleX - 250} 930 ${poleX} 900 Q ${poleX + 250} 930 ${poleX + 500} 900`}
                fill="none"
                stroke="#181008"
                strokeWidth="1.4"
              />
            </g>
          );
        })}

        {/* Steppe Trackside Ground Base & Ballast */}
        <rect x="0" y="1280" width="1080" height="240" fill="url(#steppeGroundGrad)" />

        {/* Speed-Motion Dust Billows behind galloping horse & train */}
        <g opacity="0.3">
          {[0, 160, 320, 480, 640, 800, 960].map((bx, i) => {
            const dx = (bx - dustCloudScroll * 2 + 1200) % 1200 - 60;
            return (
              <circle
                key={i}
                cx={dx}
                cy={1335 + (i % 3) * 16}
                r={38 + (i % 4) * 14}
                fill="#967758"
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
                {/* Oak Tie Silhouette */}
                <rect x="0" y="0" width="26" height="34" rx="2" fill="#1C120C" stroke="#0D0704" strokeWidth="1" />
                {/* Iron Tie-Plate & Spikes */}
                <rect x="3" y="1" width="20" height="4" fill="#4B3B2F" />
                <rect x="3" y="27" width="20" height="4" fill="#4B3B2F" />
                <circle cx="7" cy="3" r="1.5" fill="#111827" />
                <circle cx="19" cy="3" r="1.5" fill="#111827" />
              </g>
            );
          })}

          {/* Steel Rail 1 (Top Profile with High-Speed Metallic Shimmer) */}
          <rect x="0" y="4" width="1080" height="7" fill="url(#steelRailGrad)" />
          <line x1="0" y1="3" x2="1080" y2="3" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.9" />
          <line x1="0" y1="11" x2="1080" y2="11" stroke="#1E293B" strokeWidth="1.5" />

          {/* Steel Rail 2 (Lower Base Profile) */}
          <rect x="0" y="28" width="1080" height="6" fill="#475569" />
          <line x1="0" y1="27" x2="1080" y2="27" stroke="#94A3B8" strokeWidth="1" opacity="0.7" />
        </g>

        {/* =========================================================================
            LAYER 3: POLISH ARMOURED TRAIN P.P. "ŚMIAŁY" (POCIĄG PANCERNY NR 2)
            Armored wagon with machine-gun sponson, running board & spinning wheels
            ========================================================================= */}
        <g id="polishArmouredTrain" transform="translate(560, 800)" filter="url(#trainMassShadow)">
          {/* Main Armored Locomotive / Artillery Wagon Body */}
          <g id="wagonArmorShell">
            {/* Base Armored Box */}
            <path
              d="M 60 480 L 520 480 L 520 180 L 160 180 L 120 220 L 60 220 Z"
              fill="url(#trainArmorOlive)"
              stroke="#1A2016"
              strokeWidth="4"
            />

            {/* Angular 3-Tone Camouflage Splinter Patches (1920 Polish Pattern) */}
            <polygon points="120,220 260,180 320,260 190,340 100,280" fill="url(#trainArmorOchre)" />
            <polygon points="280,310 440,240 520,300 480,420 330,400" fill="url(#trainArmorCharcoal)" />
            <polygon points="140,360 270,350 250,480 90,480" fill="url(#trainArmorOchre)" />

            {/* Armored Observation Cupola / Roof Turret */}
            <path
              d="M 180 180 L 210 130 L 360 130 L 390 180 Z"
              fill="url(#trainArmorOlive)"
              stroke="#1A2016"
              strokeWidth="3.5"
            />
            {/* Vision Slit / Armored Viewport */}
            <rect x="225" y="145" width="100" height="12" rx="2" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
            <line x1="225" y1="151" x2="325" y2="151" stroke="#38BDF8" strokeWidth="1.2" opacity="0.6" />

            {/* Protruding Maxim wz. 05 Heavy Machine Gun Sponson */}
            <g id="maximMachineGun" transform="translate(140, 240)">
              {/* Armored Barbette Shield */}
              <rect x="-15" y="-12" width="24" height="24" rx="4" fill="#262E20" stroke="#0F140D" strokeWidth="2" />
              {/* Fluted Water Jacket Barrel pointing forward/left */}
              <rect x="-65" y="-6" width="52" height="12" rx="3" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
              <rect x="-70" y="-8" width="6" height="16" rx="1.5" fill="#334155" />
              {/* Canvas Ammunition Belt Feed */}
              <path d="M -10 10 Q -5 25 -12 35" fill="none" stroke="#D97706" strokeWidth="4" strokeDasharray="3 2" />
            </g>

            {/* Steam / Coal Smoke Exhaust Stack on Wagon Roof */}
            <g transform="translate(420, 110)">
              <rect x="0" y="0" width="30" height="70" rx="3" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
              <ellipse cx="15" cy="0" rx="18" ry="6" fill="#334155" />
              {/* Trailing Coal Smoke Billows whipped backward by 50 km/h train speed */}
              {[
                { dx: 40, dy: -10, r: 24, op: 0.65 },
                { dx: 95, dy: -18, r: 35, op: 0.55 },
                { dx: 165, dy: -28, r: 48, op: 0.4 },
              ].map((sm, si) => (
                <circle
                  key={si}
                  cx={sm.dx + ((frame * 12) % 60)}
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
                {/* Horizontal lower seam rivets */}
                <circle cx={75 + rIdx * 32} cy="465" r="2.8" fill="#64748B" stroke="#1E293B" strokeWidth="0.8" />
                {/* Vertical seam rivets */}
                <circle cx="160" cy="200 + rIdx * 20" r="2.5" fill="#64748B" stroke="#1E293B" strokeWidth="0.8" />
                <circle cx="380" cy="200 + rIdx * 20" r="2.5" fill="#64748B" stroke="#1E293B" strokeWidth="0.8" />
              </g>
            ))}

            {/* Authentic Historical Stenciled Train Placard */}
            <g id="trainPlacard" transform="translate(200, 290)">
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
          <rect x="50" y="475" width="470" height="30" fill="#181B1F" stroke="#0D0E10" strokeWidth="2" />

          {/* Heavy Spinning Train Locomotive Spoked Wheels & Side-Rods */}
          {[120, 280, 440].map((wx, wIdx) => (
            <g key={wIdx} transform={`translate(${wx}, 515)`}>
              {/* Outer Steel Wheel Rim */}
              <circle cx="0" cy="0" r="42" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
              <circle cx="0" cy="0" r="36" fill="#334155" />
              <circle cx="0" cy="0" r="32" fill="#0F172A" />

              {/* Rotating Wheel Spokes & Crankpin */}
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
                {/* Counterweight Half-Moon */}
                <path d="M -22 -14 A 26 26 0 0 1 22 -14 Z" fill="#475569" />
                {/* Crankpin Hub */}
                <circle cx="16" cy="0" r="6" fill="#F1F5F9" stroke="#0F172A" strokeWidth="1.5" />
              </g>

              {/* Stationary Axle Center Cap */}
              <circle cx="0" cy="0" r="11" fill="#475569" stroke="#0F172A" strokeWidth="2" />
              <circle cx="0" cy="0" r="4" fill="#94A3B8" />
            </g>
          ))}

          {/* Heavy Mechanical Side Connecting Rod linking all wheels */}
          <g transform={`translate(0, ${Math.sin((wheelSpinAngle * Math.PI) / 180) * 16})`}>
            <rect x="110" y="508" width="345" height="14" rx="4" fill="#64748B" stroke="#1E293B" strokeWidth="2" />
            {[120, 280, 440].map((rx, ri) => (
              <circle key={ri} cx={rx + 16} cy="515" r="7" fill="#CBD5E1" stroke="#0F172A" strokeWidth="1.8" />
            ))}
          </g>

          {/* Outdoor Running Board Platform where Adrian Carton de Wiart stands */}
          <g id="runningBoardBalcony" transform="translate(-35, 410)">
            {/* Diamond-Plate Steel Floor */}
            <rect x="0" y="60" width="180" height="16" rx="2" fill="#334155" stroke="#1E293B" strokeWidth="2" />
            {/* Diamond Tread Stencil pattern */}
            {Array.from({ length: 12 }).map((_, tx) => (
              <line key={tx} x1={tx * 14 + 4} y1="62" x2={tx * 14 + 12} y2="74" stroke="#475569" strokeWidth="2" />
            ))}
            {/* Structural Underfloor Triangle Brackets */}
            <polygon points="15,76 35,76 35,115" fill="#1E293B" />
            <polygon points="140,76 160,76 140,115" fill="#1E293B" />

            {/* Industrial Tubular Steel Handrails & Safety Guardrail */}
            {/* Uprights */}
            <line x1="8" y1="10" x2="8" y2="60" stroke="#F59E0B" strokeWidth="3.5" />
            <line x1="90" y1="10" x2="90" y2="60" stroke="#F59E0B" strokeWidth="3" />
            <line x1="172" y1="10" x2="172" y2="60" stroke="#F59E0B" strokeWidth="3.5" />
            {/* Top Handrail Bar */}
            <line x1="0" y1="10" x2="180" y2="10" stroke="#F59E0B" strokeWidth="4.5" />
            {/* Mid Knee-Rail Bar */}
            <line x1="4" y1="35" x2="176" y2="35" stroke="#D97706" strokeWidth="3" />
          </g>
        </g>

        {/* =========================================================================
            LAYER 4: AUTHENTIC RED ARMY COSSACK CAVALRYMAN & GALLOPING WARHORSE
            Based directly on reference plates: cossack_cavalry_1920.jpg & cossack_charging_sabre.jpg
            Features: Papakha hat with Red Star, scarlet Cherkesska tunic, 16 ivory gazyrs,
            drawn curved Shasqua sabre, kinzhal dagger, and dynamic galloping bay warhorse.
            Compact, athletic proportions designed for point-blank confrontation!
            ========================================================================= */}
        <g
          id="cossackCavalryAttacker"
          transform={`translate(${270 + cossackRecoilX}, ${1230 + gallopY}) rotate(${cossackRecoilAngle + gallopRot})`}
          filter="url(#puppetPaperShadow)"
        >
          {/* --- THE GALLOPING WARHORSE (ATHLETIC DARK BAY CHARGER) --- */}
          <g id="warhorseBody">
            {/* Far Hind Leg (Dark Shadow Tone) */}
            <g transform={`rotate(${legCycle * 6 - 3})`}>
              <path
                d="M -15 20 C -35 45, -55 70, -75 95 L -68 100 L -48 78 C -35 58, -18 40, -8 26 Z"
                fill="#241209"
              />
              <path d="M -75 95 L -100 125 L -92 129 L -68 100 Z" fill="#1C0E07" />
              <polygon points="-100,125 -110,135 -102,139 -92,129" fill="#0F0F12" />
            </g>

            {/* Far Fore Leg (Reaching Forward) */}
            <g transform={`rotate(${-legCycle * 7 + 2})`}>
              <path
                d="M 95 60 C 112 82, 132 104, 152 124 L 144 129 C 124 110, 106 88, 90 66 Z"
                fill="#241209"
              />
              <polygon points="152,124 164,134 157,139 144,129" fill="#0F0F12" />
            </g>

            {/* Billowing Dust Puffs kicked up by hooves */}
            <g transform="translate(-95, 120)" opacity="0.4">
              <circle cx="0" cy="0" r="14" fill="#967758" />
              <circle cx="-16" cy="3" r="10" fill="#785E44" />
              <circle cx="-28" cy="8" r="7" fill="#5C4733" />
            </g>

            {/* Windswept Jet-Black Tail streaming behind */}
            <path
              d="M 0 12 C -35 4, -75 15, -115 4 C -95 24, -55 38, 0 28 Z"
              fill="#18181B"
              stroke="#0C0C0E"
              strokeWidth="1.5"
            />
            <path d="M -15 15 C -50 10, -90 15, -125 8 C -100 28, -60 36, -15 26 Z" fill="#27272A" />

            {/* Muscular Quarter, Flank & Belly (Compact Powerful Contour) */}
            <path
              d="M 20 -4 C -12 -15, -50 4, -68 28 C -82 54, -65 85, -30 90 C 8 96, 50 94, 88 78 C 120 66, 125 34, 105 12 C 80 -6, 50 2, 20 -4 Z"
              fill="#3D1D0E"
              stroke="#241108"
              strokeWidth="2.2"
            />
            {/* Defined Muscle Shading */}
            <path
              d="M -25 28 C -45 45, -38 75, -16 80 C 12 85, 42 72, 58 55 C 38 50, 0 42, -25 28 Z"
              fill="#4E2512"
            />

            {/* Near Hind Leg (Powerful Thigh, Sharp Hock Joint & Slender Cannon) */}
            <g transform={`rotate(${legCycle * 7})`}>
              <path
                d="M 5 20 C -12 42, -32 72, -52 98 C -42 104, -32 102, -14 76 C -1 58, 12 36, 16 22 Z"
                fill="#4E2512"
                stroke="#241108"
                strokeWidth="1.5"
              />
              <polyline
                points="-42,100 -62,122 -54,127 -36,104"
                fill="#3D1D0E"
                stroke="#241108"
                strokeWidth="1.5"
              />
              <polygon points="-62,122 -72,133 -62,137 -54,127" fill="#18181B" stroke="#0A0604" strokeWidth="1" />
              <polygon points="-70,131 -71,134 -65,136 -64,133" fill="#94A3B8" />
            </g>

            {/* Cossack Cavalry Saddle & Scarlet Shabrack (Saddle Blanket) with Gold Braid */}
            <polygon
              points="28,0 90,0 98,42 20,42"
              fill="#991B1B"
              stroke="#F59E0B"
              strokeWidth="2"
            />
            <line x1="24" y1="36" x2="95" y2="36" stroke="#FEF08A" strokeWidth="1.5" />
            {/* Dark Leather Saddle with Brass Cantle */}
            <path d="M 32 2 C 52 -5, 74 -5, 86 2 L 82 10 L 36 10 Z" fill="#18181B" stroke="#0F0F12" strokeWidth="1.2" />
            <circle cx="34" cy="3" r="2.2" fill="#F59E0B" />
            {/* Girth Strap & Brass Stirrup */}
            <line x1="62" y1="10" x2="62" y2="60" stroke="#2B150B" strokeWidth="3" />
            <polygon points="58,58 66,58 68,65 56,65" fill="#F59E0B" />

            {/* Near Fore Leg (Muscular Shoulder, Defined Knee & Cannon Bone) */}
            <g transform={`rotate(${-legCycle * 8})`}>
              <path
                d="M 102 54 C 118 76, 136 96, 154 116 L 145 121 C 127 102, 110 82, 94 62 Z"
                fill="#4E2512"
                stroke="#241108"
                strokeWidth="1.5"
              />
              <circle cx="130" cy="88" r="6.5" fill="#3D1D0E" />
              <line x1="130" y1="88" x2="164" y2="124" stroke="#3D1D0E" strokeWidth="11" strokeLinecap="round" />
              <polygon points="160,120 174,130 166,135 154,127" fill="#18181B" stroke="#0A0604" strokeWidth="1" />
              <polygon points="169,128 173,131 168,133 164,131" fill="#94A3B8" />
            </g>

            {/* Arched Muscular Neck & Throat Curve (Short, Proud, Collected) */}
            <path
              d="M 78 24 C 95 -12, 118 -48, 148 -66 C 168 -54, 172 -32, 154 -8 C 134 26, 118 60, 98 72 Z"
              fill="#3D1D0E"
              stroke="#241108"
              strokeWidth="2.2"
            />

            {/* Sculpted Equine Head (Turned in Combat collection) */}
            <path
              d="M 148 -66 C 160 -78, 184 -80, 198 -62 C 202 -50, 192 -38, 174 -34 C 160 -32, 152 -42, 148 -66 Z"
              fill="#35170B"
              stroke="#1C0D06"
              strokeWidth="1.5"
            />
            {/* Pricked Horse Ears */}
            <polygon points="152,-68 162,-86 168,-70" fill="#241108" />
            <polygon points="158,-66 168,-82 174,-68" fill="#4E2512" />
            {/* Determined Combat Eye with White Highlight */}
            <ellipse cx="174" cy="-58" rx="3.8" ry="2.6" fill="#0A0604" />
            <circle cx="175" cy="-59" r="1.1" fill="#FFFFFF" />
            {/* Flared Nostril & Mouth with Silver Snaffle Bit Ring */}
            <ellipse cx="192" cy="-52" rx="3.2" ry="1.8" fill="#180A04" />
            <circle cx="186" cy="-44" r="3" fill="#E2E8F0" stroke="#475569" strokeWidth="1" />

            {/* Windblown Jet-Black Mane */}
            <path d="M 108 -4 C 90 -22, 98 -45, 124 -60 C 115 -48, 107 -30, 116 -12 Z" fill="#18181B" />
            <path d="M 128 -28 C 110 -46, 118 -68, 144 -78 C 134 -65, 126 -46, 136 -28 Z" fill="#18181B" />

            {/* Leather Cavalry Bridle Straps & Taut Reins */}
            <line x1="162" y1="-66" x2="186" y2="-44" stroke="#2B150B" strokeWidth="2.4" />
            <line x1="176" y1="-52" x2="186" y2="-44" stroke="#2B150B" strokeWidth="1.8" />
            {/* Taut Leather Reins pulled back to Cossack's left hand */}
            <path d="M 186 -44 Q 145 -22 105 -55" fill="none" stroke="#2B150B" strokeWidth="2.5" />
          </g>

          {/* --- THE RED ARMY COSSACK CAVALRYMAN (BUDYONNY'S 1ST CAVALRY ARMY, 1920) --- */}
          <g id="cossackRider" transform="translate(56, -42)">
            {/* Cossack Leg in Black Leather Riding Boot in Stirrup */}
            <path
              d="M 5 30 L 18 58 L 11 84 L -2 84 L 7 58 L -3 30 Z"
              fill="#18181B"
              stroke="#0A0A0C"
              strokeWidth="1.5"
            />
            {/* Brass Spur */}
            <polygon points="-2,78 -7,78 -4,82" fill="#F59E0B" />

            {/* Scarlet Cherkesska Tunic Skirt draping over saddle */}
            <path
              d="M -14 20 L 30 20 L 36 54 L -6 54 Z"
              fill="#991B1B"
              stroke="#7F1D1D"
              strokeWidth="2"
            />

            {/* Authentic Caucasian Leather Belt with Silver Niello Mounts */}
            <rect x="-12" y="16" width="42" height="6.5" rx="1.2" fill="#271C15" stroke="#120D0A" strokeWidth="1" />
            {[-7, 3, 14, 25].map((sx) => (
              <circle key={sx} cx={sx} cy="19.2" r="2" fill="#E2E8F0" stroke="#475569" strokeWidth="0.7" />
            ))}

            {/* Curved Kinzhal Dagger in Silver Scabbard */}
            <g transform="translate(8, 20) rotate(35)">
              <rect x="-2.5" y="0" width="5" height="22" rx="1.5" fill="#E2E8F0" stroke="#334155" strokeWidth="1" />
              <polygon points="-2.5,22 2.5,22 0,30" fill="#E2E8F0" stroke="#334155" strokeWidth="0.8" />
              <rect x="-3.5" y="-7" width="7" height="7" rx="1.2" fill="#FEF3C7" stroke="#92400E" strokeWidth="1" />
            </g>

            {/* Upper Torso: Tailored Crimson Wool Cherkesska Coat (Dynamic Forward Combat Lean) */}
            <path
              d="M -15 18 L 28 18 L 32 -30 L -12 -30 Z"
              fill="#B91C1C"
              stroke="#7F1D1D"
              strokeWidth="2.5"
            />

            {/* Deep V-Neck Opening revealing Dark Beshmet Shirt */}
            <polygon points="2,-30 16,-30 9,-4" fill="#1E293B" />

            {/* --- HISTORICAL DETAIL: 16 IVORY GAZYR CARTRIDGE TUBES ACROSS CHEST --- */}
            {/* Left Breast Gazyr Pockets (8 tubes) */}
            <g transform="translate(-10, -17)">
              <rect x="0" y="0" width="17" height="14" rx="1.2" fill="#7F1D1D" stroke="#450A0A" strokeWidth="0.8" />
              {[1, 3, 5, 7, 9, 11, 13, 15].map((gx) => (
                <g key={gx}>
                  <line x1={gx} y1="0" x2={gx} y2="13" stroke="#F8FAFC" strokeWidth="1.5" />
                  <circle cx={gx} cy="1" r="1" fill="#F59E0B" />
                </g>
              ))}
            </g>

            {/* Right Breast Gazyr Pockets (8 tubes) */}
            <g transform="translate(14, -17)">
              <rect x="0" y="0" width="17" height="14" rx="1.2" fill="#7F1D1D" stroke="#450A0A" strokeWidth="0.8" />
              {[1, 3, 5, 7, 9, 11, 13, 15].map((gx) => (
                <g key={gx}>
                  <line x1={gx} y1="0" x2={gx} y2="13" stroke="#F8FAFC" strokeWidth="1.5" />
                  <circle cx={gx} cy="1" r="1" fill="#F59E0B" />
                </g>
              ))}
            </g>

            {/* Left Arm: Holding Reins taut */}
            <path
              d="M 25 -20 L 48 -8 L 52 -18"
              fill="none"
              stroke="#991B1B"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="52" cy="-18" r="4.8" fill="#3E2415" />

            {/* --- RIGHT ARM & DRAWN RUSSIAN SHASQUA SABRE (LEVELED TOWARD ADRIAN) --- */}
            <g id="sabreArm" transform="translate(4, -22)">
              {/* Crimson Upper Arm reaching right toward Adrian */}
              <polyline
                points="0,0 28,-14 65,-8"
                fill="none"
                stroke="#B91C1C"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Cuff */}
              <rect x="58" y="-14" width="10" height="12" rx="2" fill="#7F1D1D" stroke="#450A0A" strokeWidth="0.8" />
              {/* Hand gripping Sabre */}
              <circle cx="68" cy="-8" r="5.5" fill="#D4A373" />

              {/* The Russian Shasqua (Curved Cossack Sabre Thrusting Forward) */}
              <g id="shasquaSabre" transform="translate(70, -8) rotate(-8)">
                {/* Brass Bird-Head Pommel & Grip */}
                <path d="M 0 0 L -8 6 L -6 12 L 2 6 Z" fill="#F59E0B" stroke="#92400E" strokeWidth="1" />
                {/* Curved Lethal Steel Blade extending horizontally right toward Adrian */}
                <path
                  d="M 2 0 Q 55 -18 115 -12 Q 55 -6 0 4 Z"
                  fill="#F8FAFC"
                  stroke="#94A3B8"
                  strokeWidth="1.6"
                />
                {/* Polished Fuller Groove */}
                <path d="M 6 -1 Q 55 -15 105 -10" fill="none" stroke="#CBD5E1" strokeWidth="1.2" />
                {/* Sun Glint Star on Sabre Tip */}
                <polygon points="115,-12 110,-15 115,-18 120,-15" fill="#FFFFFF" />

                {/* --- DEFLECTED SPARK BURST AT SABRE BLADE (FRAME 34-42) --- */}
                {frame >= 34 && frame <= 42 && (
                  <g transform={`translate(75, -14) scale(${sparkScale})`} opacity={sparkOpacity} filter="url(#sparkGlow)">
                    <circle cx="0" cy="0" r="16" fill="#FFFFFF" />
                    <circle cx="0" cy="0" r="28" fill="#FEF08A" opacity="0.85" />
                    <circle cx="0" cy="0" r="45" fill="#F59E0B" opacity="0.45" />
                    {/* Acute Ricochet Spark Splinters */}
                    {[-40, 5, 50, 100, 155, 215].map((deg, sIdx) => (
                      <line
                        key={sIdx}
                        x1="0"
                        y1="0"
                        x2={40 * Math.cos((deg * Math.PI) / 180)}
                        y2={40 * Math.sin((deg * Math.PI) / 180)}
                        stroke="#FEF08A"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                      />
                    ))}
                  </g>
                )}
              </g>
            </g>

            {/* --- COSSACK HEAD & TRADITIONAL ASTRAKHAN PAPAKHA FUR HAT --- */}
            <g id="cossackHead" transform="translate(16, -44)">
              {/* Neck */}
              <rect x="-5" y="0" width="10" height="11" fill="#D4A373" />

              {/* Weathered Cossack Face */}
              <ellipse cx="0" cy="-5" rx="13" ry="15" fill="#D4A373" stroke="#A16207" strokeWidth="0.8" />

              {/* Fierce Combat Eyes & Eyebrows */}
              <ellipse cx="6" cy="-8" rx="3.2" ry="1.9" fill="#0F172A" />
              <circle cx="7" cy="-8.5" r="0.9" fill="#FFFFFF" />
              <line x1="1" y1="-12" x2="10" y2="-10" stroke="#18181B" strokeWidth="2.4" strokeLinecap="round" />

              {/* Prominent Drooping Cossack Cavalry Mustache */}
              <path
                d="M 0 -1 Q 7 1 14 -2 Q 17 6 11 9 Q 6 3 0 0 Z"
                fill="#18181B"
                stroke="#09090B"
                strokeWidth="1"
              />
              <path
                d="M 0 -1 Q -7 1 -14 -2 Q -17 6 -11 9 Q -6 3 0 0 Z"
                fill="#18181B"
                stroke="#09090B"
                strokeWidth="1"
              />

              {/* --- TALL ASTRAKHAN FLEECE PAPAKHA HAT --- */}
              <g id="astrakhanPapakha" transform="translate(0, -16)">
                {/* Scarlet Wool Crown Inset on top of Papakha */}
                <ellipse cx="0" cy="-24" rx="14" ry="5.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
                <line x1="0" y1="-29" x2="0" y2="-19" stroke="#FBBF24" strokeWidth="1.5" />
                <line x1="-14" y1="-24" x2="14" y2="-24" stroke="#FBBF24" strokeWidth="1.5" />

                {/* Textured Black Sheepskin Fleece Body */}
                <path
                  d="M -15 -22 C -20 -11, -19 2, -14 7 C -8 9, 8 9, 14 7 C 19 2, 20 -11, 15 -22 Z"
                  fill="#18181B"
                  stroke="#0C0A09"
                  strokeWidth="1.8"
                />
                {/* Astrakhan Curly Fleece Texture bumps */}
                {[-13, -7, 0, 7, 13].map((tx) => (
                  <circle key={tx} cx={tx} cy="-7" r="4.2" fill="#262626" />
                ))}
                {[-9, -2, 6, 11].map((tx) => (
                  <circle key={tx} cx={tx} cy="-16" r="3.8" fill="#262626" />
                ))}

                {/* Enamelled Soviet Red Star Badge with Gold Hammer & Sickle */}
                <g transform="translate(0, -5)">
                  <polygon
                    points="0,-8 2.2,-2.2 7.5,-2.2 3.4,1.2 5,6.5 0,3.3 -5,6.5 -3.4,1.2 -7.5,-2.2 -2.2,-2.2"
                    fill="#DC2626"
                    stroke="#FBBF24"
                    strokeWidth="1.2"
                  />
                  <circle cx="0" cy="0" r="1.4" fill="#FEF08A" />
                </g>
              </g>
            </g>
          </g>
        </g>

        {/* =========================================================================
            LAYER 5: SUPERSONIC BULLET TRACER BEAM & IMPACT SHOCKWAVES (FRAME 32 TO 36)
            Zipping directly from Adrian's Webley Mk VI muzzle (x: 475, y: 1140)
            to the Cossack's chest/sabre (x: 395, y: 1150)
            ========================================================================= */}
        {frame >= 32 && frame <= 38 && (
          <g id="bulletTracerFlight">
            {/* Supersonic Laser-Sharp Bullet Tracer Streak */}
            <line
              x1={475 - (475 - 395) * Math.max(0, tracerProgress - 0.55) * 2}
              y1={1140 - (1140 - 1150) * Math.max(0, tracerProgress - 0.55) * 2}
              x2={475 - (475 - 395) * tracerProgress}
              y2={1140 - (1140 - 1150) * tracerProgress}
              stroke="url(#bulletTracerGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#sparkGlow)"
            />
            {/* Mach Conical Shockwave Rings along Bullet Trajectory */}
            <circle
              cx={475 - (475 - 395) * tracerProgress}
              cy={1140 - (1140 - 1150) * tracerProgress}
              r="9"
              fill="none"
              stroke="#FEF08A"
              strokeWidth="2.2"
              opacity="0.9"
            />
            <circle
              cx={475 - (475 - 395) * tracerProgress + 18}
              cy={1140 - (1140 - 1150) * tracerProgress}
              r="15"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="1.5"
              opacity="0.6"
            />
          </g>
        )}

        {/* =========================================================================
            LAYER 6: ADRIAN CARTON DE WIART VC (ON THE RUNNING BOARD, FIRING LEFT)
            Heroic Cutout Puppet Staging with Pinned Empty Sleeve
            Positioned heroically on the diamond-plate running board
            ========================================================================= */}
        <g id="cartonHeroGunner" transform="translate(620, 1160)">
          {/* Outer Paper Cutout Drop Shadow */}
          <g filter="url(#puppetPaperShadow)">
            {/* --- Legs & Boots on Running Board --- */}
            <rect x="-20" y="60" width="18" height="58" rx="3" fill="#3B3426" stroke="#1C1812" strokeWidth="1.5" />
            <rect x="6" y="60" width="18" height="58" rx="3" fill="#3B3426" stroke="#1C1812" strokeWidth="1.5" />
            {/* Black Officer Riding Boots with Spurs */}
            <rect x="-22" y="92" width="22" height="28" rx="2.5" fill="#18181B" stroke="#0F0F12" strokeWidth="1.2" />
            <rect x="4" y="92" width="22" height="28" rx="2.5" fill="#18181B" stroke="#0F0F12" strokeWidth="1.2" />
            <circle cx="2" cy="112" r="2.5" fill="#F59E0B" />
            <circle cx="28" cy="112" r="2.5" fill="#F59E0B" />

            {/* --- British Khaki Officer Tunic Body --- */}
            <path
              d="M -38 -20 L 32 -20 L 28 66 L -34 66 Z"
              fill="#4A4031"
              stroke="#262018"
              strokeWidth="2.8"
            />
            {/* Scarlet General Staff Collar Tabs */}
            <polygon points="-32,-20 -22,-11 -25,-4 -35,-13" fill="#DC2626" />
            <polygon points="26,-20 16,-11 19,-4 29,-13" fill="#DC2626" />

            {/* Victoria Cross Ribbon Bar (Crimson VC Ribbon + WW1 Campaign Stars) */}
            <rect x="-28" y="-4" width="12" height="5" fill="#991B1B" stroke="#450A0A" strokeWidth="0.8" />
            <rect x="-16" y="-4" width="10" height="5" fill="#D97706" stroke="#450A0A" strokeWidth="0.8" />
            <rect x="-6" y="-4" width="10" height="5" fill="#2563EB" stroke="#450A0A" strokeWidth="0.8" />

            {/* Sam Browne Leather Cross-Belt */}
            <line x1="-28" y1="-20" x2="22" y2="48" stroke="#2B1810" strokeWidth="7" />
            <rect x="-12" y="46" width="40" height="9" fill="#3E2415" stroke="#1A0D08" strokeWidth="1" />
            <rect x="4" y="44" width="9" height="13" fill="#F59E0B" />
            {/* Polished Brass Tunic Buttons */}
            {[-10, 6, 22, 38].map((by) => (
              <circle key={by} cx="-3" cy={by} r="3" fill="#FBBF24" stroke="#78350F" strokeWidth="0.9" />
            ))}

            {/* --- KEY HISTORICAL DETAIL: PINNED EMPTY LEFT SLEEVE (ONE-ARMED) --- */}
            {/* Major-General Carton de Wiart lost his left hand at Ypres in 1915 */}
            <g id="pinnedEmptySleeve" transform="translate(26, -15)">
              {/* Empty Khaki Wool Sleeve Folded Flat & Pinned to Tunic */}
              <path
                d="M 0 0 C 10 12, 12 40, 8 62 C 3 62, -2 56, -4 44 L -2 0 Z"
                fill="#3B3426"
                stroke="#1E1912"
                strokeWidth="2"
              />
              {/* Sleeve Crease Folds */}
              <line x1="2" y1="20" x2="8" y2="38" stroke="#272118" strokeWidth="1.5" />
              <line x1="-1" y1="35" x2="6" y2="52" stroke="#272118" strokeWidth="1.5" />

              {/* Large Brass Officer Safety Pin fastening the empty sleeve */}
              <g transform="translate(3, 28) rotate(-15)">
                <rect x="-2" y="-1" width="12" height="3" rx="1.5" fill="#F59E0B" stroke="#78350F" strokeWidth="0.8" />
                <line x1="0" y1="1" x2="8" y2="1" stroke="#FEF08A" strokeWidth="1" />
                <circle cx="-1" cy="0.5" r="3" fill="#FBBF24" stroke="#78350F" strokeWidth="0.8" />
                <circle cx="9" cy="0.5" r="2" fill="#D97706" />
              </g>
            </g>

            {/* --- RIGHT ARM EXTENDED FIRING SERVICE WEBLEY MK VI (ONE-HANDED) --- */}
            <g id="aimingRightArm" transform={`translate(-30, -14) rotate(${gunRecoilAngle})`}>
              {/* Khaki Upper Arm reaching forward to the left */}
              <path
                d="M 0 0 L -42 -6 L -82 -10"
                fill="none"
                stroke="#4A4031"
                strokeWidth="18"
                strokeLinecap="round"
              />
              {/* Tunic Cuff with Brass Buttons */}
              <rect x="-90" y="-19" width="14" height="18" rx="2" fill="#3B3426" stroke="#1E1912" strokeWidth="1.2" />
              <circle cx="-84" cy="-14" r="2" fill="#FBBF24" />
              <circle cx="-84" cy="-7" r="2" fill="#FBBF24" />
              {/* Weathered Hand firmly gripping Revolver */}
              <circle cx="-92" cy="-10" r="7.5" fill="#D4A373" />

              {/* British Service Webley Mk VI .455 Revolver (Blued Steel) */}
              <g transform="translate(-95, -10)">
                {/* Checkered Walnut Grip */}
                <polygon points="0,0 10,22 3,24 -5,5" fill="#3E2415" stroke="#1A0D08" strokeWidth="1.2" />
                <circle cx="5" cy="24" r="2.5" fill="#94A3B8" /> {/* Lanyard Ring */}
                {/* Trigger Guard & Trigger */}
                <path d="M -5 6 C -12 6 -12 16 -4 16" fill="none" stroke="#1E293B" strokeWidth="2" />
                <line x1="-6" y1="9" x2="-8" y2="13" stroke="#334155" strokeWidth="1.8" />
                {/* Massive 6-Shot Steel Cylinder & Frame */}
                <rect x="-18" y="-9" width="22" height="16" rx="2" fill="#1E293B" stroke="#0F172A" strokeWidth="1.2" />
                {/* Cylinder Flutes */}
                <line x1="-15" y1="-5" x2="-2" y2="-5" stroke="#0F172A" strokeWidth="2" />
                <line x1="-15" y1="0" x2="-2" y2="0" stroke="#0F172A" strokeWidth="2" />
                <line x1="-15" y1="5" x2="-2" y2="5" stroke="#0F172A" strokeWidth="2" />
                {/* Heavy 6-Inch Break-Action Barrel */}
                <rect x="-50" y="-8.5" width="34" height="8" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                {/* Top Rib & Front Sight Blade */}
                <line x1="-50" y1="-8.5" x2="-18" y2="-8.5" stroke="#475569" strokeWidth="1.5" />
                <polygon points="-50,-8.5 -46,-13 -42,-8.5" fill="#0F172A" />
                {/* Hammer Cocked Back */}
                <polygon points="4,-7 10,-12 9,-5" fill="#334155" />

                {/* --- 6-LAYER VECTOR MUZZLE FLASH DETONATION AT FRAME 32 --- */}
                {isFiring && (
                  <g transform={`translate(-54, -5) scale(${muzzleFlashScale})`} opacity={muzzleFlashOpacity}>
                    {/* Layer 1: Ambient Volumetric Aura */}
                    <circle cx="0" cy="0" r="52" fill="url(#muzzleFlashAura)" />

                    {/* Layer 2: Mach Shockwave Rings */}
                    <circle cx="-18" cy="0" r="32" fill="none" stroke="#F59E0B" strokeWidth="3.5" opacity="0.85" />
                    <circle cx="-35" cy="0" r="48" fill="none" stroke="#EF4444" strokeWidth="2.5" opacity="0.65" />

                    {/* Layer 3: Acute Directional Flame Spikes */}
                    <polygon
                      points="0,-10 -42,-26 -18,-5 -58,0 -18,5 -42,26 0,10"
                      fill="#FEF08A"
                      stroke="#F59E0B"
                      strokeWidth="2"
                    />

                    {/* Layer 4: Multi-Lobed Expanding Gas Body */}
                    <ellipse cx="-20" cy="-8" rx="14" ry="10" fill="#FBBF24" opacity="0.8" />
                    <ellipse cx="-20" cy="8" rx="14" ry="10" fill="#FBBF24" opacity="0.8" />
                    <ellipse cx="-28" cy="0" rx="16" ry="12" fill="#FEF08A" opacity="0.9" />

                    {/* Layer 5: High-Contrast Core Flash Star */}
                    <polygon
                      points="0,-5 -22,-12 -7,-2 -32,0 -7,2 -22,12 0,5"
                      fill="#FFFFFF"
                    />

                    {/* Layer 6: Orbiting Gunsmoke & Spark Clouds */}
                    <circle cx="-30" cy="-22" r="8" fill="#F8FAFC" opacity="0.7" />
                    <circle cx="-38" cy="18" r="10" fill="#E2E8F0" opacity="0.6" />
                    <circle cx="-15" cy="26" r="6" fill="#CBD5E1" opacity="0.8" />
                  </g>
                )}
              </g>
            </g>

            {/* --- ADRIAN CARTON DE WIART ARCHIVAL PORTRAIT HEAD --- */}
            {/* Handcrafted Oval Die-Cut Paper Medallion with British Service Cap Accent */}
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
                clipPath="url(#cartonOvalMedallionClip)"
              />
              {/* British Officer Service Cap (Olive/Khaki Felt with Gold Bullion Trim) */}
              <g transform="translate(0, -78)">
                {/* Cap Crown */}
                <path d="M -30 0 C -25 -18, 25 -18, 30 0 Z" fill="#4A4031" stroke="#262018" strokeWidth="1.2" />
                {/* Cap Band */}
                <ellipse cx="0" cy="0" rx="30" ry="8" fill="#3B3426" stroke="#1E1912" strokeWidth="1.2" />
                {/* Gold Bullion Visor Chinstrap */}
                <line x1="-26" y1="1" x2="26" y2="1" stroke="#F59E0B" strokeWidth="2.4" />
                {/* Scarlet General Staff Cockade Badge */}
                <circle cx="0" cy="-5" r="4.2" fill="#DC2626" stroke="#FBBF24" strokeWidth="1" />
                {/* Patent Leather Visor Peak */}
                <path d="M -24 2 Q 0 8 24 2 Q 0 5 -24 2 Z" fill="#18181B" stroke="#0F0F12" strokeWidth="0.8" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
