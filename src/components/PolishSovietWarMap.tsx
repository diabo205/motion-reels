import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface PolishSovietWarMapProps {
  x?: number;
  y?: number;
  scale?: number;
  opacity?: number;
}

/**
 * Authentic 1920 Polish-Soviet War Tactical Cartographic Vector Scene
 * Faithfully reconstructed from official historical operational maps:
 * - PBW August 1920 (Wikimedia Commons 960px-PBW_August_1920.png)
 * - Battle of Warsaw Phase 1 (Wikimedia Commons 960px-Battle_of_Warsaw_-_Phase_1.png)
 *
 * Cartographic Features:
 * 1. Allied War Council Drafting Table: Expansive linen-parchment military map pinned to dark walnut command board.
 * 2. Authentic River Network: Meandering Vistula (Wisła), Narew, Bug, Wkra, and Wieprz river systems.
 * 3. Geopolitical Boundaries: Polish territory, East Prussia international border, Baltic coastline, Polesie wetlands.
 * 4. Division-Level Order of Battle:
 *    - Polish 5th Army (Sikorski) defending Modlin & Wkra.
 *    - Polish 1st Army (Latinik) defending the Warsaw bridgehead & Radzymin.
 *    - Polish 2nd Army guarding the middle Vistula.
 *    - Polish Strike Group (Piłsudski) assembled along the Wieprz River.
 *    - Soviet Red Army (Tukhachevsky): 4th Army, 15th Army, 3rd Army, 16th Army, and 3rd Cavalry Corps.
 * 5. Broad Operational Vectors: Thick, legible operational staff arrows with high-contrast text pills.
 * 6. Dynamic Operations:
 *    - Frames 0-35: Soviet assault prongs advance to within 13 miles of Warsaw; Radzymin contested.
 *    - Frame 36+: Piłsudski's decisive Wieprz counter-stroke explodes northward into the Soviet flank.
 * 7. Hero Feature: Major-General Adrian Carton de Wiart's Warsaw Inter-Allied Mission HQ with live radar telemetry.
 * 8. Prestige Cartographic Accents: 8-point nautical compass rose, alternating graticule border (52°-54°N, 19°-24°E),
 *    metric scale bar, corner brass pins, and clean tactical legend in the open lower-left quadrant.
 */
export const PolishSovietWarMap: React.FC<PolishSovietWarMapProps> = ({
  x = 540,
  y = 1170,
  scale = 1.0,
  opacity = 1.0,
}) => {
  const frame = useCurrentFrame();

  // Subtle breathing zoom on the tactical board
  const mapZoom = interpolate(frame, [0, 80], [0.98, 1.02], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Soviet Offensive Vectors sweep in from the East (frames 0 to 32)
  const sovietSweep = interpolate(frame, [0, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Polish Counter-Offensive thrust explodes at frame 36 (bass drop / payoff slam)
  const counterSweep = interpolate(frame, [36, 68], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Radar ping radiating from Carton de Wiart's Warsaw Command Post
  const radarRadius = (frame * 1.6) % 70;
  const radarOpacity = interpolate(radarRadius, [0, 25, 70], [0.85, 0.5, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Compass rose secondary slow rotation
  const compassAngle = (frame * 0.12) % 360;

  // Frontline tactical danger pulsation
  const frontPulse = 0.7 + 0.3 * Math.sin(frame * 0.18);

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale * mapZoom})`}
      opacity={opacity}
      style={{ filter: 'drop-shadow(0px 20px 40px rgba(0, 0, 0, 0.85))' }}
    >
      <defs>
        {/* Parchment Substrate Texture Gradient */}
        <linearGradient id="mapParchmentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5EDE0" />
          <stop offset="45%" stopColor="#EDE3CE" />
          <stop offset="85%" stopColor="#E4D7BE" />
          <stop offset="100%" stopColor="#DACDB0" />
        </linearGradient>

        {/* East Prussia Neutral Frontier Gradient */}
        <linearGradient id="eastPrussiaGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#D9CEB8" />
          <stop offset="100%" stopColor="#C9BCA4" />
        </linearGradient>

        {/* Soviet Invasion Danger Wash Gradient */}
        <linearGradient id="sovietDangerWash" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.0" />
          <stop offset="25%" stopColor="#DC2626" stopOpacity="0.08" />
          <stop offset="60%" stopColor="#B91C1C" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#991B1B" stopOpacity="0.28" />
        </linearGradient>

        {/* Tactical River Watercourse Gradient */}
        <linearGradient id="vistulaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="50%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>

        {/* Piłsudski Counter-Stroke Emerald Vector Gradient */}
        <linearGradient id="counterStrikeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>

        {/* Soviet Advance Arrow Gradient */}
        <linearGradient id="sovietArrowGrad" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#991B1B" />
          <stop offset="50%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>

        {/* War Table Quadrille Grid Pattern */}
        <pattern id="tacticalGridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#78350F" strokeWidth="0.5" strokeOpacity="0.12" />
          <circle cx="0" cy="0" r="0.8" fill="#78350F" opacity="0.18" />
        </pattern>

        {/* East Prussia Frontier Diagonal Hatch Pattern */}
        <pattern id="prussiaHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#8C7E6A" strokeWidth="1.2" opacity="0.25" />
        </pattern>

        {/* Corner Brass Pin Shadow */}
        <filter id="brassPinShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Internal coordinate space: Center is at (0, 0).
          Map frame spans x = -470 to +470 (width = 940px).
          Map frame spans y = -315 to +315 (height = 630px).
          Safe from right stack buffer: 540 + 350 = 890 <= 900px!
      */}

      {/* =========================================================================
          LAYER 1: MAP BOARD SUBSTRATE & MILITARY QUADRILLE DRAFTING GRID
          ========================================================================= */}
      {/* Heavy Walnut War Room Table Edge */}
      <rect x="-476" y="-321" width="952" height="642" rx="10" fill="#1C140E" stroke="#0F0A06" strokeWidth="3" />

      {/* Parchment Map Sheet */}
      <rect
        x="-470"
        y="-315"
        width="940"
        height="630"
        rx="6"
        fill="url(#mapParchmentGrad)"
        stroke="#451A03"
        strokeWidth="2"
      />

      {/* Internal Quadrille Grid */}
      <rect x="-454" y="-299" width="908" height="598" fill="url(#tacticalGridPattern)" />

      {/* Military Alternating Graticule Border (Black & White Staff Margin) */}
      <rect
        x="-458"
        y="-303"
        width="916"
        height="606"
        fill="none"
        stroke="#1E1B18"
        strokeWidth="3.5"
      />
      <rect
        x="-454"
        y="-299"
        width="908"
        height="598"
        fill="none"
        stroke="#78350F"
        strokeWidth="1"
      />

      {/* Graticule Latitude/Longitude Coordinate Ticks */}
      <g fill="#573618" fontSize="8.5" fontFamily="Montserrat, sans-serif" fontWeight="800" opacity="0.85">
        {/* Top/Bottom Longitude Markers */}
        <text x="-350" y="-306" textAnchor="middle">19°E</text>
        <text x="-210" y="-306" textAnchor="middle">20°E</text>
        <text x="-60" y="-306" textAnchor="middle">21°E</text>
        <text x="110" y="-306" textAnchor="middle">22°E</text>
        <text x="250" y="-306" textAnchor="middle">23°E</text>
        <text x="350" y="-306" textAnchor="middle">24°E</text>

        <text x="-350" y="312" textAnchor="middle">19°E</text>
        <text x="-210" y="312" textAnchor="middle">20°E</text>
        <text x="-60" y="312" textAnchor="middle">21°E</text>
        <text x="110" y="312" textAnchor="middle">22°E</text>
        <text x="250" y="312" textAnchor="middle">23°E</text>
        <text x="350" y="312" textAnchor="middle">24°E</text>

        {/* Left/Right Latitude Markers */}
        <text x="-463" y="-190" textAnchor="middle" transform="rotate(-90, -463, -190)">54°N</text>
        <text x="-463" y="-50" textAnchor="middle" transform="rotate(-90, -463, -50)">53°N</text>
        <text x="-463" y="90" textAnchor="middle" transform="rotate(-90, -463, 90)">52°N</text>
        <text x="-463" y="230" textAnchor="middle" transform="rotate(-90, -463, 230)">51°N</text>

        <text x="463" y="-190" textAnchor="middle" transform="rotate(90, 463, -190)">54°N</text>
        <text x="463" y="-50" textAnchor="middle" transform="rotate(90, 463, -50)">53°N</text>
        <text x="463" y="90" textAnchor="middle" transform="rotate(90, 463, 90)">52°N</text>
        <text x="463" y="230" textAnchor="middle" transform="rotate(90, 463, 230)">51°N</text>
      </g>

      {/* =========================================================================
          LAYER 2: GEOPOLITICAL TERRITORIES & REGIONAL COLORATIONS
          ========================================================================= */}
      {/* 1. East Prussia (Neutral German Territory in North) */}
      <path
        d="M -454 -299 L 240 -299 L 210 -265 L 60 -245 L -70 -235 L -200 -220 L -330 -195 L -454 -165 Z"
        fill="url(#eastPrussiaGrad)"
      />
      <path
        d="M -454 -299 L 240 -299 L 210 -265 L 60 -245 L -70 -235 L -200 -220 L -330 -195 L -454 -165 Z"
        fill="url(#prussiaHatch)"
      />
      {/* East Prussian International Boundary Line */}
      <path
        d="M -454 -165 L -330 -195 L -200 -220 L -70 -235 L 60 -245 L 210 -265 L 240 -299"
        fill="none"
        stroke="#451A03"
        strokeWidth="2"
        strokeDasharray="9, 3, 2, 3"
      />
      <text
        x="-240"
        y="-250"
        fill="#574635"
        fontSize="12"
        fontFamily="Montserrat, sans-serif"
        fontWeight="900"
        letterSpacing="0.2em"
        opacity="0.85"
      >
        EAST PRUSSIA (GERMANY)
      </text>

      {/* 2. Baltic Coast / Danzig Gulf in far Northwest */}
      <path
        d="M -454 -299 L -390 -299 Q -420 -250 -454 -240 Z"
        fill="#93C5FD"
        stroke="#0284C7"
        strokeWidth="1.5"
        opacity="0.75"
      />
      <text
        x="-435"
        y="-275"
        fill="#0369A1"
        fontSize="9"
        fontFamily="Montserrat, sans-serif"
        fontWeight="800"
        letterSpacing="0.1em"
      >
        BALTIC
      </text>

      {/* 3. Bolshevik Red Army Advance Wash (Eastern Theatre Danger Area) */}
      <path
        d="M -20 -235 C 10 -150, 40 -80, 0 5 C -25 45, 10 110, 50 170 L 454 170 L 454 -299 L 240 -299 L 210 -265 L 60 -245 Z"
        fill="url(#sovietDangerWash)"
      />

      {/* 4. Polesie Wetlands / Pripet Marshes in Southeast */}
      <g opacity="0.45" stroke="#047857" strokeWidth="1.2">
        <path d="M 280 180 Q 305 176 330 180 M 290 186 Q 315 182 340 186" fill="none" />
        <path d="M 320 205 Q 345 200 370 205 M 335 212 Q 360 207 385 212" fill="none" />
        <text
          x="330"
          y="235"
          fill="#065F46"
          fontSize="8"
          fontFamily="Montserrat, sans-serif"
          fontWeight="800"
          letterSpacing="0.12em"
        >
          PRIPIAT MARSHES
        </text>
      </g>

      {/* =========================================================================
          LAYER 3: HISTORICAL STRATEGIC WATERWAYS (Realistic Meanders)
          ========================================================================= */}
      {/* 1. Vistula River (Wisła) - Master Defensive Barrier */}
      <path
        d="M 100 299 C 85 245, 65 215, 40 170 C 15 125, -25 90, -60 30 C -85 -10, -110 -25, -140 -40 C -180 -35, -230 -25, -270 -25 C -315 -25, -340 -15, -370 -30 C -400 -50, -420 -85, -454 -130"
        fill="none"
        stroke="url(#vistulaGrad)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Vistula River Surface Highlight */}
      <path
        d="M 100 299 C 85 245, 65 215, 40 170 C 15 125, -25 90, -60 30 C -85 -10, -110 -25, -140 -40 C -180 -35, -230 -25, -270 -25 C -315 -25, -340 -15, -370 -30 C -400 -50, -420 -85, -454 -130"
        fill="none"
        stroke="#E0F2FE"
        strokeWidth="1.2"
        strokeDasharray="24, 12"
        opacity="0.8"
      />
      <text
        x="-330"
        y="-38"
        fill="#0369A1"
        fontSize="10"
        fontFamily="Montserrat, sans-serif"
        fontWeight="800"
        letterSpacing="0.14em"
        transform="rotate(-12, -330, -38)"
      >
        VISTULA (WISŁA)
      </text>

      {/* 2. Narew River (Northern Flank Waterway) */}
      <path
        d="M 420 -250 C 330 -230, 240 -210, 160 -195 C 100 -185, 30 -145, -25 -95 C -65 -65, -105 -50, -140 -40"
        fill="none"
        stroke="#0284C7"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <text
        x="180"
        y="-165"
        fill="#0284C7"
        fontSize="8.5"
        fontFamily="Montserrat, sans-serif"
        fontWeight="800"
        letterSpacing="0.1em"
        transform="rotate(-12, 180, -165)"
      >
        NAREW RIVER
      </text>

      {/* 3. Bug River (Major Eastern Tributary) */}
      <path
        d="M 360 85 C 290 65, 210 35, 140 10 C 70 -15, 0 -35, -65 -55"
        fill="none"
        stroke="#0369A1"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <text
        x="210"
        y="30"
        fill="#0369A1"
        fontSize="8.5"
        fontFamily="Montserrat, sans-serif"
        fontWeight="800"
        letterSpacing="0.1em"
        transform="rotate(-16, 210, 30)"
      >
        BUG RIVER
      </text>

      {/* 4. Wkra River (Sikorski's Defense Line) */}
      <path
        d="M -180 -220 C -160 -170, -150 -130, -165 -95 C -170 -75, -155 -55, -145 -48"
        fill="none"
        stroke="#0EA5E9"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <text
        x="-185"
        y="-135"
        fill="#0284C7"
        fontSize="8"
        fontFamily="Montserrat, sans-serif"
        fontWeight="800"
        letterSpacing="0.08em"
        transform="rotate(65, -185, -135)"
      >
        WKRA
      </text>

      {/* 5. Wieprz River (Piłsudski's Launchpad) */}
      <path
        d="M 260 270 C 190 240, 130 205, 90 185 C 65 175, 50 172, 40 170"
        fill="none"
        stroke="#0284C7"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text
        x="130"
        y="210"
        fill="#0369A1"
        fontSize="8.5"
        fontFamily="Montserrat, sans-serif"
        fontWeight="800"
        letterSpacing="0.1em"
        transform="rotate(-28, 130, 210)"
      >
        WIEPRZ RIVER
      </text>

      {/* 6. Pilica River (Southern Vistula Tributary) */}
      <path
        d="M -150 140 C -100 130, -50 115, -15 100"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* =========================================================================
          LAYER 4: STRATEGIC MILITARY RAILWAYS (Armoured Train Lines)
          ========================================================================= */}
      <g stroke="#1E293B" strokeWidth="2.2" opacity="0.65">
        {/* Main Line: Warsaw -> Siedlce -> Brest-Litovsk */}
        <path d="M -60 30 L 30 45 L 170 65 L 320 85" fill="none" strokeDasharray="5, 3" />
        {/* Northern Line: Warsaw -> Białystok -> Grodno */}
        <path d="M -60 30 L 40 -40 L 190 -120 L 300 -160 L 340 -210" fill="none" strokeDasharray="5, 3" />
        {/* Southern Line: Warsaw -> Dęblin -> Lublin */}
        <path d="M -60 30 L -15 100 L 40 170 L 120 230" fill="none" strokeDasharray="5, 3" />
      </g>
      {/* Armoured Train Patrol Sector Flag (placed south along Warsaw-Dęblin rail) */}
      <g transform="translate(-15, 95)">
        <rect x="-8" y="-6" width="16" height="12" rx="2" fill="#D97706" stroke="#451A03" strokeWidth="1" />
        <circle cx="-4" cy="6" r="2" fill="#1C1917" />
        <circle cx="4" cy="6" r="2" fill="#1C1917" />
        <text
          x="12"
          y="4"
          fill="#451A03"
          fontSize="7.5"
          fontFamily="Montserrat, sans-serif"
          fontWeight="900"
        >
          ARMOURED TRAIN PP 14 "ŚMIAŁY"
        </text>
      </g>

      {/* =========================================================================
          LAYER 5: THE DANGER ENCIRCLEMENT (13-15 August 1920 Warsaw Perimeter)
          Pushed to within 13 miles (20 km) of Warsaw at Radzymin
          ========================================================================= */}
      <g id="warsawDefensePerimeter">
        {/* Danger Halo Arc */}
        <path
          d="M -150 -60 C -110 -30, 20 -15, 0 15 C -15 35, 10 90, 40 170"
          fill="none"
          stroke="#EF4444"
          strokeWidth="7"
          strokeOpacity={frontPulse * 0.4}
          strokeLinecap="round"
        />

        {/* Tactical Frontline Dash */}
        <path
          d="M -150 -60 C -110 -30, 20 -15, 0 15 C -15 35, 10 90, 40 170"
          fill="none"
          stroke="#DC2626"
          strokeWidth="3"
          strokeDasharray="7, 4"
          strokeLinecap="round"
        />

        {/* Frontline Callout Badge */}
        <g transform="translate(10, -42)">
          <rect x="-95" y="-10" width="190" height="20" rx="3" fill="#450A0A" stroke="#EF4444" strokeWidth="1.2" />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fill="#FEF2F2"
            fontSize="8"
            fontFamily="Montserrat, sans-serif"
            fontWeight="900"
            letterSpacing="0.08em"
          >
            RED ARMY FRONT · 13 MILES
          </text>
        </g>
      </g>

      {/* =========================================================================
          LAYER 6: RED ARMY MASS OPERATIONAL VECTORS (Tukhachevsky's Armies)
          Four heavy Soviet advance prongs sweeping toward Warsaw & Lower Vistula
          ========================================================================= */}
      <g id="sovietAdvanceVectors">
        {/* 1. Northern Envelopment: 4th Army & III Cavalry Corps sweeping west */}
        <path
          d="M 280 -210 C 130 -195, -20 -170, -220 -140"
          fill="none"
          stroke="url(#sovietArrowGrad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray="500"
          strokeDashoffset={500 * (1 - sovietSweep)}
        />
        <polygon points="-220,-140 -195,-156 -198,-124" fill="#DC2626" opacity={sovietSweep > 0.8 ? 1 : 0} />
        {/* High-Contrast Army Designation Pill */}
        <g transform="translate(0, -210)">
          <rect x="-8" y="-9" width="175" height="18" rx="3" fill="#1C140E" stroke="#DC2626" strokeWidth="1" />
          <text x="79" y="3.5" textAnchor="middle" fill="#FEF2F2" fontSize="7.5" fontFamily="Montserrat, sans-serif" fontWeight="900">
            4TH ARMY (SHUVAYEV) & III CAVALRY
          </text>
        </g>

        {/* 2. Direct Push on Modlin & Pułtusk: 15th Army */}
        <path
          d="M 290 -85 C 180 -75, 50 -55, -90 -45"
          fill="none"
          stroke="url(#sovietArrowGrad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray="400"
          strokeDashoffset={400 * (1 - sovietSweep)}
        />
        <polygon points="-90,-45 -68,-60 -70,-30" fill="#DC2626" opacity={sovietSweep > 0.8 ? 1 : 0} />
        <g transform="translate(130, -78)">
          <rect x="-8" y="-9" width="110" height="18" rx="3" fill="#1C140E" stroke="#DC2626" strokeWidth="1" />
          <text x="47" y="3.5" textAnchor="middle" fill="#FEF2F2" fontSize="7.5" fontFamily="Montserrat, sans-serif" fontWeight="900">
            15TH ARMY (KORK)
          </text>
        </g>

        {/* 3. Direct Assault on Radzymin / Warsaw Bridgehead: 3rd Army */}
        <path
          d="M 310 -5 C 200 5, 80 15, -5 18"
          fill="none"
          stroke="url(#sovietArrowGrad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray="340"
          strokeDashoffset={340 * (1 - sovietSweep)}
        />
        <polygon points="-5,18 18,5 15,31" fill="#DC2626" opacity={sovietSweep > 0.8 ? 1 : 0} />
        <g transform="translate(140, 5)">
          <rect x="-8" y="-9" width="135" height="18" rx="3" fill="#1C140E" stroke="#DC2626" strokeWidth="1" />
          <text x="59" y="3.5" textAnchor="middle" fill="#FEF2F2" fontSize="7.5" fontFamily="Montserrat, sans-serif" fontWeight="900">
            3RD ARMY (LAZAREVICH)
          </text>
        </g>

        {/* 4. Southern Thrust via Siedlce: 16th Army */}
        <path
          d="M 320 65 C 220 60, 110 50, -25 35"
          fill="none"
          stroke="url(#sovietArrowGrad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray="350"
          strokeDashoffset={350 * (1 - sovietSweep)}
        />
        <polygon points="-25,35 -3,22 -5,48" fill="#DC2626" opacity={sovietSweep > 0.8 ? 1 : 0} />
        <g transform="translate(130, 55)">
          <rect x="-8" y="-9" width="130" height="18" rx="3" fill="#1C140E" stroke="#DC2626" strokeWidth="1" />
          <text x="57" y="3.5" textAnchor="middle" fill="#FEF2F2" fontSize="7.5" fontFamily="Montserrat, sans-serif" fontWeight="900">
            16TH ARMY (SOLLOHUB)
          </text>
        </g>
      </g>

      {/* =========================================================================
          LAYER 7: POLISH DEFENSIVE FORMATIONS (Order of Battle - Green NATO Boxes)
          ========================================================================= */}
      {/* 5th Army (Gen. Sikorski) north of Warsaw */}
      <g transform="translate(-180, -70)">
        <rect x="-8" y="-6" width="16" height="12" fill="#047857" stroke="#064E3B" strokeWidth="1" />
        <line x1="-8" y1="-6" x2="8" y2="6" stroke="#FFFFFF" strokeWidth="1" />
        <line x1="-8" y1="6" x2="8" y2="-6" stroke="#FFFFFF" strokeWidth="1" />
        <text x="11" y="4" fill="#065F46" fontSize="7.5" fontFamily="Montserrat, sans-serif" fontWeight="900">
          5TH ARMY (SIKORSKI)
        </text>
      </g>

      {/* 1st Army (Gen. Latinik) holding Warsaw Bridgehead */}
      <g transform="translate(-85, -5)">
        <rect x="-8" y="-6" width="16" height="12" fill="#047857" stroke="#064E3B" strokeWidth="1" />
        <line x1="-8" y1="-6" x2="8" y2="6" stroke="#FFFFFF" strokeWidth="1" />
        <line x1="-8" y1="6" x2="8" y2="-6" stroke="#FFFFFF" strokeWidth="1" />
        <text x="-12" y="16" fill="#065F46" fontSize="7.5" fontFamily="Montserrat, sans-serif" fontWeight="900" textAnchor="end">
          1ST ARMY (LATINIK)
        </text>
      </g>

      {/* 2nd Army guarding Central Vistula */}
      <g transform="translate(-40, 135)">
        <rect x="-8" y="-6" width="16" height="12" fill="#047857" stroke="#064E3B" strokeWidth="1" />
        <line x1="-8" y1="-6" x2="8" y2="6" stroke="#FFFFFF" strokeWidth="1" />
        <line x1="-8" y1="6" x2="8" y2="-6" stroke="#FFFFFF" strokeWidth="1" />
        <text x="11" y="4" fill="#065F46" fontSize="7.5" fontFamily="Montserrat, sans-serif" fontWeight="900">
          2ND ARMY (ROJA)
        </text>
      </g>

      {/* 4th Army & Strike Group (Marshal Piłsudski) along Wieprz River */}
      <g transform="translate(60, 205)">
        <rect x="-8" y="-6" width="16" height="12" fill="#047857" stroke="#064E3B" strokeWidth="1" />
        <line x1="-8" y1="-6" x2="8" y2="6" stroke="#FFFFFF" strokeWidth="1" />
        <line x1="-8" y1="6" x2="8" y2="-6" stroke="#FFFFFF" strokeWidth="1" />
        <text x="12" y="4" fill="#065F46" fontSize="8" fontFamily="Montserrat, sans-serif" fontWeight="900">
          4TH ARMY (PIŁSUDSKI)
        </text>
      </g>

      {/* =========================================================================
          LAYER 8: POLISH-ALLIED COUNTER-OFFENSIVE ("MIRACLE ON THE VISTULA")
          Surges forward at frame 36 from the Wieprz line into the Soviet flank
          ========================================================================= */}
      {frame >= 36 && (
        <g id="counterStrokeGroup">
          {/* Decisive Flank Thrust Vector surging Northward */}
          <path
            d="M 70 190 C 40 120, 25 50, -5 -35"
            fill="none"
            stroke="url(#counterStrikeGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray="320"
            strokeDashoffset={320 * (1 - counterSweep)}
            style={{ filter: 'drop-shadow(0px 0px 8px #10B981)' }}
          />
          <polygon
            points="-5,-35 -16,-10 8,-15"
            fill="#FEF08A"
            stroke="#047857"
            strokeWidth="1.5"
            opacity={counterSweep > 0.6 ? 1 : 0}
          />

          {/* Counter-Stroke Identification Placard */}
          <g transform="translate(55, 140)">
            <rect x="-8" y="-10" width="186" height="20" rx="3" fill="#064E3B" stroke="#34D399" strokeWidth="1.2" />
            <text
              x="85"
              y="4"
              textAnchor="middle"
              fill="#ECFDF5"
              fontSize="8"
              fontFamily="Montserrat, sans-serif"
              fontWeight="900"
              letterSpacing="0.06em"
            >
              WIEPRZ COUNTER-STROKE (PIŁSUDSKI)
            </text>
          </g>
        </g>
      )}

      {/* =========================================================================
          LAYER 9: STRATEGIC FORTRESSES & HISTORICAL BATTLE SITES
          ========================================================================= */}
      {/* 1. MODLIN FORTRESS (Northern Anchor Star Redoubt) */}
      <g transform="translate(-140, -40)">
        <polygon points="0,-8 6,-2 8,6 0,4 -8,6 -6,-2" fill="#D97706" stroke="#451A03" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="2.5" fill="#DC2626" />
        <text x="0" y="-13" fill="#451A03" fontSize="9" fontFamily="Montserrat, sans-serif" fontWeight="900" textAnchor="middle">
          MODLIN
        </text>
      </g>

      {/* 2. RADZYMIN (Breakthrough Battle Site - Aug 14) */}
      <g transform="translate(-15, 5)">
        {/* Crossed Swords Battle Site */}
        <g stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round">
          <line x1="-6" y1="-6" x2="6" y2="6" />
          <line x1="6" y1="-6" x2="-6" y2="6" />
        </g>
        <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
        <text x="10" y="4" fill="#991B1B" fontSize="8.5" fontFamily="Montserrat, sans-serif" fontWeight="900">
          RADZYMIN (AUG 14)
        </text>
      </g>

      {/* 3. DĘBLIN (Southern Fortress Rail Confluence) */}
      <g transform="translate(40, 170)">
        <polygon points="0,-6 6,0 0,6 -6,0" fill="#D97706" stroke="#451A03" strokeWidth="1.2" />
        <text x="10" y="4" fill="#451A03" fontSize="8" fontFamily="Montserrat, sans-serif" fontWeight="800">
          DĘBLIN
        </text>
      </g>

      {/* 4. BREST-LITOVSK (Eastern Fortress Rail Junction) - Positioned safely inside safe zone */}
      <g transform="translate(310, 85)">
        <circle cx="0" cy="0" r="5" fill="#DC2626" stroke="#FEF08A" strokeWidth="1.2" />
        <text x="-9" y="4" fill="#991B1B" fontSize="8.5" fontFamily="Montserrat, sans-serif" fontWeight="900" textAnchor="end">
          BREST-LITOVSK
        </text>
      </g>

      {/* 5. LUBLIN (Southern Provincial Capital) */}
      <g transform="translate(120, 230)">
        <circle cx="0" cy="0" r="4" fill="#475569" stroke="#1E293B" strokeWidth="1" />
        <text x="8" y="3" fill="#1E293B" fontSize="8" fontFamily="Montserrat, sans-serif" fontWeight="800">
          LUBLIN
        </text>
      </g>

      {/* 6. GRODNO (Northeast Fortress) */}
      <g transform="translate(340, -210)">
        <circle cx="0" cy="0" r="4" fill="#DC2626" stroke="#FEF08A" strokeWidth="1" />
        <text x="-8" y="3" fill="#991B1B" fontSize="8" fontFamily="Montserrat, sans-serif" fontWeight="800" textAnchor="end">
          GRODNO
        </text>
      </g>

      {/* 7. PŁOCK (Heroic River Defense) */}
      <g transform="translate(-270, -25)">
        <circle cx="0" cy="0" r="4" fill="#047857" stroke="#064E3B" strokeWidth="1" />
        <text x="8" y="3" fill="#065F46" fontSize="8" fontFamily="Montserrat, sans-serif" fontWeight="800">
          PŁOCK
        </text>
      </g>

      {/* 8. SIEDLCE (Central Rail Hub) */}
      <g transform="translate(170, 75)">
        <circle cx="0" cy="0" r="3.5" fill="#64748B" stroke="#1E293B" strokeWidth="1" />
        <text x="8" y="3" fill="#334155" fontSize="8" fontFamily="Montserrat, sans-serif" fontWeight="800">
          SIEDLCE
        </text>
      </g>

      {/* =========================================================================
          LAYER 10: HERO ALLIED MISSION PIN (Carton de Wiart's Warsaw HQ)
          Focal point at Warsaw (-60, 30) with pulsing radar telemetry and British badge
          ========================================================================= */}
      <g id="cartonWarsawHQGroup" transform="translate(-60, 30)">
        {/* Radar Concentric Detection Waves */}
        <circle
          cx="0"
          cy="0"
          r={radarRadius}
          fill="none"
          stroke="#D97706"
          strokeWidth="1.8"
          opacity={radarOpacity}
        />
        <circle
          cx="0"
          cy="0"
          r={radarRadius * 0.55}
          fill="none"
          stroke="#F59E0B"
          strokeWidth="1.2"
          opacity={radarOpacity * 0.8}
        />

        {/* Outer Gold Fortress Medallion */}
        <circle cx="0" cy="0" r="14" fill="#D97706" stroke="#451A03" strokeWidth="2" />
        <circle cx="0" cy="0" r="10" fill="#1C1917" stroke="#FEF08A" strokeWidth="1.2" />

        {/* Center Polish White Eagle / Red Field */}
        <circle cx="0" cy="0" r="6" fill="#DC2626" />
        <polygon points="0,-4 3,3 -3,3" fill="#FFFFFF" />

        {/* Hero City Title Placard */}
        <g transform="translate(0, -23)">
          <rect x="-55" y="-11" width="110" height="20" rx="3" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.4" />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fill="#FEF08A"
            fontSize="10.5"
            fontFamily="Montserrat, sans-serif"
            fontWeight="900"
            letterSpacing="0.12em"
          >
            WARSAW
          </text>
        </g>

        {/* British Military Mission Badge */}
        <g transform="translate(0, 24)">
          <rect x="-92" y="-10" width="184" height="19" rx="3" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.2" />
          <text
            x="0"
            y="3.5"
            textAnchor="middle"
            fill="#F0F9FF"
            fontSize="7.5"
            fontFamily="Montserrat, sans-serif"
            fontWeight="900"
            letterSpacing="0.08em"
          >
            BRITISH MISSION // CARTON DE WIART
          </text>
        </g>
      </g>

      {/* =========================================================================
          LAYER 11: TACTICAL MILITARY CARTOGRAPHIC ACCENTS
          Compass Rose, Distance Scale Bar, Map Header Cartouche, and Legend
          ========================================================================= */}
      {/* 1. Compass Rose (Bottom-Left Sector) */}
      <g transform={`translate(-385, 230) rotate(${compassAngle})`} opacity="0.85">
        <circle cx="0" cy="0" r="28" fill="#FAF5EE" stroke="#78350F" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="24" fill="none" stroke="#D97706" strokeWidth="0.8" strokeDasharray="3, 3" />
        {/* 8-Pointed Nautical Star */}
        <polygon points="0,-22 4,-6 20,0 4,6 0,22 -4,6 -20,0 -4,-6" fill="#78350F" />
        <polygon points="0,-22 0,0 20,0" fill="#D97706" />
        <polygon points="0,22 0,0 -20,0" fill="#451A03" />
        <circle cx="0" cy="0" r="3.5" fill="#1C1917" />
      </g>
      {/* Compass "N" North Indicator */}
      <text
        x="-385"
        y="196"
        textAnchor="middle"
        fill="#451A03"
        fontSize="10"
        fontFamily="Montserrat, sans-serif"
        fontWeight="900"
      >
        N
      </text>

      {/* 2. Tactical Distance Scale Bar (Bottom-Right Sector) */}
      <g transform="translate(210, 275)">
        <rect x="0" y="0" width="55" height="7" fill="#1E293B" stroke="#0F172A" strokeWidth="0.8" />
        <rect x="55" y="0" width="55" height="7" fill="#F8FAFC" stroke="#0F172A" strokeWidth="0.8" />
        <text x="0" y="-4" fill="#334155" fontSize="8" fontFamily="Montserrat, sans-serif" fontWeight="800">0</text>
        <text x="55" y="-4" fill="#334155" fontSize="8" fontFamily="Montserrat, sans-serif" fontWeight="800">50</text>
        <text x="110" y="-4" fill="#334155" fontSize="8" fontFamily="Montserrat, sans-serif" fontWeight="800">100 KM</text>
      </g>

      {/* 3. Top Cartouche Banner: Strategic Operation Header */}
      <g transform="translate(0, -276)">
        <rect x="-260" y="-13" width="520" height="26" rx="4" fill="#1C140E" stroke="#78350F" strokeWidth="1.4" />
        <text
          x="0"
          y="4.5"
          textAnchor="middle"
          fill="#FEF08A"
          fontSize="10.5"
          fontFamily="Montserrat, sans-serif"
          fontWeight="900"
          letterSpacing="0.14em"
        >
          INTER-ALLIED MISSION · BATTLE OF WARSAW (AUGUST 1920)
        </text>
      </g>

      {/* 4. Tactical Map Legend (Open Lower-Left Quadrant between Compass & Scale, zero river collisions) */}
      <g transform="translate(-295, 230)">
        <rect x="0" y="0" width="160" height="60" rx="4" fill="#FAF5EE" stroke="#78350F" strokeWidth="1.2" />
        {/* Legend Row 1: Soviet Assault */}
        <line x1="10" y1="13" x2="30" y2="13" stroke="#DC2626" strokeWidth="3.5" />
        <text x="36" y="16" fill="#7F1D1D" fontSize="7.5" fontFamily="Montserrat, sans-serif" fontWeight="900">
          RED ARMY ADVANCE AXIS
        </text>
        {/* Legend Row 2: Polish Defensive Perimeter */}
        <line x1="10" y1="29" x2="30" y2="29" stroke="#047857" strokeWidth="3" strokeDasharray="4, 2" />
        <text x="36" y="32" fill="#065F46" fontSize="7.5" fontFamily="Montserrat, sans-serif" fontWeight="900">
          POLISH DEFENSE FORCES
        </text>
        {/* Legend Row 3: Polish Counter-Stroke */}
        <line x1="10" y1="45" x2="30" y2="45" stroke="#10B981" strokeWidth="4" />
        <text x="36" y="48" fill="#047857" fontSize="7.5" fontFamily="Montserrat, sans-serif" fontWeight="900">
          PIŁSUDSKI COUNTER-STROKE
        </text>
      </g>

      {/* 5. Corner Brass Pushpins (Tactile Paper Collage Staging) */}
      {[
        [-460, -305],
        [460, -305],
        [-460, 305],
        [460, 305],
      ].map(([px, py], idx) => (
        <g key={idx} transform={`translate(${px}, ${py})`} filter="url(#brassPinShadow)">
          <circle cx="0" cy="0" r="6" fill="#F59E0B" stroke="#78350F" strokeWidth="1" />
          <circle cx="-1.5" cy="-1.5" r="2" fill="#FEF3C7" opacity="0.8" />
        </g>
      ))}
    </g>
  );
};
