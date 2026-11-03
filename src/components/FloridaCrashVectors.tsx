import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { createArcScallopedCloud, create8PointedStarPath } from '../kit/OrganicExplosion';

/**
 * Deterministic Pseudo-Random Generator (Seed-Based)
 * 100% frame determinism across all Remotion renders without Math.random()
 */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * High-Altitude Troposphere Atmospheric Backlight
 */
const HighAltitudeAtmosphericAura: React.FC<{
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  color?: string;
  id?: string;
}> = ({
  cx = 540,
  cy = 1180,
  rx = 480,
  ry = 260,
  color = '#38BDF8',
  id = 'troposphereAura',
}) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.12) * 0.04;
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.75" />
          <stop offset="40%" stopColor="#1E3A8A" stopOpacity="0.45" />
          <stop offset="80%" stopColor="#0F172A" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#020617" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx * pulse}
        ry={ry * pulse}
        fill={`url(#${id})`}
      />
    </g>
  );
};

/**
 * Explosive Fire & Emergency Radial Backlight
 */
const FieryEmergencyAura: React.FC<{
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  color?: string;
  id?: string;
}> = ({
  cx = 540,
  cy = 1180,
  rx = 480,
  ry = 270,
  color = '#F59E0B',
  id = 'emergencyFireAura',
}) => {
  const frame = useCurrentFrame();
  const flicker = 1 + Math.sin(frame * 0.22) * 0.06 + Math.cos(frame * 0.38) * 0.04;
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.85" />
          <stop offset="35%" stopColor="#DC2626" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#7F1D1D" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx * flicker}
        ry={ry * flicker}
        fill={`url(#${id})`}
      />
    </g>
  );
};

/**
 * SCENE 01: LEARJET VERTICAL DIVE HERO (DIRECT OPENING ON VERTICAL DIVE HOOK)
 * Opens directly on the 48-degree violent vertical plunge from 00:10
 */
export const LearjetVerticalDiveHero: React.FC<{ durationFrames?: number }> = ({ durationFrames = 101 }) => {
  const frame = useCurrentFrame();
  // Opens directly on the 48-degree steep dive on Frame 0, accelerating to 54 degrees
  const pitchAngle = interpolate(frame, [0, durationFrames], [48, 54], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shudder = Math.sin(frame * 0.85) * 4.5;
  const streakPhase = (frame * 26) % 160;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <FieryEmergencyAura cx={540} cy={1180} id="verticalDiveHeroAura" />

      {/* Aerodynamic Stress Streamlines */}
      <g stroke="#EF4444" strokeWidth="2.5" opacity={0.65} strokeDasharray="16 10">
        <line x1="200" y1="940" x2="800" y2="1240" />
        <line x1="160" y1="1020" x2="840" y2="1360" />
        <line x1="120" y1="1100" x2="760" y2="1420" />
      </g>

      {/* Dive Compression Streaks */}
      <g stroke="#FCA5A5" strokeWidth="2" opacity={0.35} strokeDasharray="20 14">
        <line x1={260} y1={720 - streakPhase} x2={260} y2={1520 - streakPhase} />
        <line x1={540} y1={660 - streakPhase} x2={540} y2={1460 - streakPhase} />
        <line x1={820} y1={740 - streakPhase} x2={820} y2={1540 - streakPhase} />
      </g>

      {/* Nosediving Aircraft Profile - Opened Directly on Vertical Dive */}
      <g transform={`translate(${540 + shudder}, ${1180 + shudder}) rotate(${pitchAngle}) translate(-540, -1180)`}>
        {/* Full Learjet 60 Fuselage with Cabin Roof & Cockpit */}
        <path
          d="M 890 1165 
             C 860 1152, 835 1146, 815 1142
             L 755 1125
             C 680 1124, 480 1124, 380 1125
             C 330 1127, 275 1146, 230 1164
             C 230 1168, 250 1182, 320 1196
             C 380 1205, 450 1205, 520 1205
             L 800 1205
             C 840 1200, 875 1182, 890 1165
             Z"
          fill="#F8FAFC"
          stroke="#0F172A"
          strokeWidth="2.5"
        />

        {/* Cockpit Canopy */}
        <path d="M 812 1144 L 755 1127 L 760 1147 L 808 1149 Z" fill="#0284C7" />

        {/* Passenger Windows */}
        {[480, 530, 580, 630, 680].map((cx, idx) => (
          <rect key={idx} x={cx - 5} y={1152} width="10" height="16" rx="5" fill="#0F172A" />
        ))}

        {/* Red Cheatline */}
        <path d="M 870 1166 L 360 1168" stroke="#DC2626" strokeWidth="3" />

        {/* T-Tail & Deflected Trim Tab (Root Cause of Pitch Down) */}
        <path
          d="M 380 1125 C 345 1118, 305 1090, 275 988 L 225 988 L 265 1145 L 320 1135 Z"
          fill="#94A3B8"
          stroke="#475569"
          strokeWidth="1.5"
        />
        {/* Horizontal Stabilizer deflected down aggressively */}
        <path d="M 190 1005 L 305 995 L 315 1010 L 195 1020 Z" fill="#EF4444" stroke="#DC2626" strokeWidth="2" />
        {/* Deflection Angle Arrow */}
        <path d="M 180 980 Q 155 1005 175 1030" fill="none" stroke="#F59E0B" strokeWidth="3" />

        {/* Engine Nacelle with Stress Flash */}
        <rect x="288" y="1118" width="106" height="28" rx="10" fill="#1E293B" stroke="#F59E0B" strokeWidth="2" />
        <circle cx="286" cy="1132" r="8" fill="#DC2626" />

        {/* Low Swept Wing with Stress Bending */}
        <path d="M 640 1205 L 380 1270 L 368 1262 L 525 1195 Z" fill="#64748B" stroke="#0F172A" strokeWidth="2" />
        <path d="M 378 1270 L 388 1222 L 396 1224 L 384 1271 Z" fill="#EF4444" />
      </g>

      {/* Structural Fracture Warning Label */}
      <g transform="translate(320, 1420)">
        <rect x="0" y="0" width="440" height="42" rx="8" fill="#7F1D1D" stroke="#EF4444" strokeWidth="2" />
        <text x="220" y="27" fill="#FEF2F2" fontSize="18" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.05em">
          UNCOMMANDED TRIM RUNAWAY
        </text>
      </g>
    </svg>
  );
};

/**
 * SCENE 01 (ARCHIVAL CRUISE): LEARJET CRUISE HERO
 * High-altitude Learjet 60 business twinjet cruising smoothly over cloud deck
 */
export const LearjetCruiseHero: React.FC<{ durationFrames?: number }> = ({ durationFrames = 101 }) => {
  const frame = useCurrentFrame();
  const bobbing = Math.sin(frame * 0.08) * 6;
  const contrailFade = interpolate(frame % 30, [0, 30], [0.85, 0.25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <defs>
        {/* Volumetric fuselage cylinder gradient */}
        <linearGradient id="fuselageBodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#F8FAFC" />
          <stop offset="70%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>

        {/* Engine nacelle metallic gradient */}
        <linearGradient id="engineNacelleGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#E2E8F0" />
          <stop offset="85%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>

        {/* Cockpit glass reflection gradient */}
        <linearGradient id="cockpitGlassGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="45%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>

      <HighAltitudeAtmosphericAura cx={540} cy={1160} color="#38BDF8" id="cruiseAura" />

      {/* Cloud undercast layer in lower third */}
      <g opacity={0.65}>
        <path
          d="M 60 1340 Q 240 1300 420 1330 Q 620 1280 840 1320 Q 980 1290 1060 1340 L 1080 1520 L 0 1520 Z"
          fill="#1E293B"
        />
        <path
          d="M 0 1370 Q 180 1330 380 1360 Q 580 1310 780 1350 Q 940 1320 1080 1370 L 1080 1540 L 0 1540 Z"
          fill="#0F172A"
        />
      </g>

      {/* Learjet 60 Authentic Silhouette & Material Rig */}
      <g transform={`translate(0, ${bobbing})`}>
        {/* Contrails from twin rear turbofans (aligned to engine exhaust at y=1132) */}
        <line
          x1="285"
          y1="1127"
          x2="20"
          y2="1127"
          stroke="#F8FAFC"
          strokeWidth="7"
          strokeLinecap="round"
          opacity={contrailFade}
        />
        <line
          x1="285"
          y1="1136"
          x2="40"
          y2="1144"
          stroke="#94A3B8"
          strokeWidth="4"
          strokeLinecap="round"
          opacity={contrailFade * 0.75}
        />

        {/* Swept Far Wing (Behind Fuselage) */}
        <path
          d="M 540 1130 L 415 1075 L 435 1068 L 575 1125 Z"
          fill="#475569"
        />

        {/* T-Tail Fin (Vertical Stabilizer Sweeping from Cabin Crown) */}
        <path
          d="M 380 1125 C 345 1118, 305 1090, 275 988 L 225 988 L 265 1145 L 320 1135 Z"
          fill="#E2E8F0"
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />
        {/* Rudder Hinge & Split Line */}
        <line x1="250" y1="1005" x2="280" y2="1140" stroke="#94A3B8" strokeWidth="1.5" />
        
        {/* Tail Bullet Fairing (Acorn) at Top of Vertical Fin */}
        <ellipse cx="255" cy="988" rx="36" ry="8" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
        
        {/* Horizontal Stabilizer (Top of T-Tail) */}
        <path
          d="M 210 990 L 315 984 L 305 978 L 195 984 Z"
          fill="#0F172A"
          stroke="#475569"
          strokeWidth="1"
        />

        {/* Ventral Delta Fins (Yaw strakes under tail cone) */}
        <path
          d="M 290 1190 L 255 1218 L 280 1215 L 310 1192 Z"
          fill="#334155"
        />

        {/* --- FULL LEARJET 60 FUSELAGE (With Complete Cabin Roof & Crown) --- */}
        {/* Outer Aerodynamic Shell */}
        <path
          d="M 890 1165 
             C 860 1152, 835 1146, 815 1142
             L 755 1125
             C 680 1124, 480 1124, 380 1125
             C 330 1127, 275 1146, 230 1164
             C 230 1168, 250 1182, 320 1196
             C 380 1205, 450 1205, 520 1205
             L 800 1205
             C 840 1200, 875 1182, 890 1165
             Z"
          fill="url(#fuselageBodyGrad)"
          stroke="#94A3B8"
          strokeWidth="1"
        />

        {/* Lower Belly Shadow & 3D Curvature Keel */}
        <path
          d="M 320 1196 
             C 400 1205, 600 1205, 800 1205
             C 840 1200, 875 1182, 890 1165
             C 855 1192, 750 1212, 580 1212
             C 420 1212, 320 1204, 280 1192
             Z"
          fill="#0F172A"
          opacity={0.7}
        />

        {/* Authentic Red Cheatline / Speedstripe (Learjet Signature) */}
        <path
          d="M 872 1166 
             C 840 1165, 800 1168, 750 1168 
             L 360 1168 
             C 300 1168, 260 1166, 235 1165"
          fill="none"
          stroke="#DC2626"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Secondary Gold Pinstripe */}
        <path
          d="M 855 1171 
             C 820 1172, 780 1173, 740 1173 
             L 370 1173"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />

        {/* Cockpit Windshield (Integrated into Sloping Nose-to-Roof Brow) */}
        <path
          d="M 812 1144 L 780 1132 L 778 1148 L 808 1150 Z"
          fill="url(#cockpitGlassGrad)"
          stroke="#0F172A"
          strokeWidth="1"
        />
        <path
          d="M 776 1131 L 752 1126 L 752 1144 L 774 1147 Z"
          fill="url(#cockpitGlassGrad)"
          stroke="#0F172A"
          strokeWidth="1"
        />
        {/* Windshield Glare Highlight */}
        <line x1="805" y1="1144" x2="784" y2="1136" stroke="#E0F2FE" strokeWidth="1.5" strokeLinecap="round" opacity={0.8} />

        {/* Passenger Cabin Windows (7 Distinct Learjet Oval Windows) */}
        {[450, 495, 540, 585, 630, 675, 720].map((cx, idx) => (
          <g key={idx}>
            <rect
              x={cx - 6}
              y={1152}
              width="12"
              height="18"
              rx="6"
              fill="#0F172A"
              stroke="#38BDF8"
              strokeWidth="1.2"
            />
            <line
              x1={cx - 2}
              y1={1155}
              x2={cx - 2}
              y2={1162}
              stroke="#BAE6FD"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={0.85}
            />
          </g>
        ))}

        {/* Passenger Forward Boarding Door Outline */}
        <rect
          x="420"
          y="1144"
          width="18"
          height="48"
          rx="5"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="1.2"
          opacity={0.6}
        />
        <circle cx="434" cy="1168" r="1.5" fill="#475569" />

        {/* Low-Mounted Near Swept Wing with Blended Winglet */}
        <path
          d="M 640 1205 L 380 1270 L 368 1262 L 525 1195 Z"
          fill="#CBD5E1"
          stroke="#94A3B8"
          strokeWidth="1.5"
        />
        {/* Flap Track Aerodynamic Canoe */}
        <ellipse
          cx="460"
          cy="1235"
          rx="15"
          ry="3.5"
          transform="rotate(-14, 460, 1235)"
          fill="#475569"
        />
        {/* Blended Upward Canted Winglet */}
        <path
          d="M 378 1270 L 388 1222 L 396 1224 L 384 1271 Z"
          fill="#0284C7"
          stroke="#0369A1"
          strokeWidth="1"
        />

        {/* Rear Mounted Pratt & Whitney PW305A Engine Nacelle */}
        <path
          d="M 360 1145 L 325 1145 L 315 1133 L 345 1133 Z"
          fill="#475569"
        />
        <rect
          x="288"
          y="1118"
          width="106"
          height="28"
          rx="10"
          fill="url(#engineNacelleGrad)"
          stroke="#F59E0B"
          strokeWidth="1.5"
        />
        <ellipse cx="394" cy="1132" rx="4" ry="13" fill="#0F172A" />
        <ellipse cx="394" cy="1132" rx="2" ry="5" fill="#F59E0B" />
        <ellipse cx="288" cy="1132" rx="4" ry="11" fill="#1E293B" />
        <ellipse cx="286" cy="1132" rx="3" ry="7" fill="#F97316" opacity={0.85} />

        {/* Tail Registration Marking on Fin */}
        <text
          x="280"
          y="1075"
          fill="#1E293B"
          fontSize="12"
          fontWeight="900"
          fontFamily="Montserrat"
          letterSpacing="0.06em"
          transform="rotate(-40, 280, 1075)"
          opacity={0.8}
        >
          N722BD
        </text>

        {/* HUD Registration & Altitude Telemetry Pill */}
        <g transform="translate(420, 1290)">
          <rect
            x="0"
            y="0"
            width="170"
            height="28"
            rx="6"
            fill="#0F172A"
            stroke="#38BDF8"
            strokeWidth="1.5"
          />
          <circle cx="16" cy="14" r="4" fill="#38BDF8" />
          <text
            x="94"
            y="19"
            fill="#F8FAFC"
            fontSize="12"
            fontWeight="900"
            fontFamily="Montserrat"
            textAnchor="middle"
            letterSpacing="0.05em"
          >
            N722BD • FL350 CRUISE
          </text>
        </g>
      </g>
    </svg>
  );
};

/**
 * SCENE 02: AUSTIN TO BAHAMAS FLIGHT PATH MAP
 */
/**
 * SCENE 02: AUSTIN TO BAHAMAS FLIGHT PATH MAP (Authentic Cartography Standard)
 */
export const FloridaFlightPathMap: React.FC<{ durationFrames?: number }> = ({ durationFrames = 120 }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, durationFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Dynamic jet telemetry position along flight path
  const cruiseProgress = Math.min(progress / 0.75, 1.0);
  const diveProgress = progress > 0.75 ? (progress - 0.75) / 0.25 : 0;

  // Cruise arc: Austin (140, 1010) -> Gulf (430, 1160) -> Naples landfall (720, 1294)
  const jetX =
    progress <= 0.75
      ? interpolate(cruiseProgress, [0, 1], [140, 720], { extrapolateRight: 'clamp' })
      : interpolate(diveProgress, [0, 1], [720, 770], { extrapolateRight: 'clamp' });
  const jetY =
    progress <= 0.75
      ? interpolate(cruiseProgress, [0, 0.5, 1], [1010, 1165, 1294], { extrapolateRight: 'clamp' })
      : interpolate(diveProgress, [0, 1], [1294, 1255], { extrapolateRight: 'clamp' });

  const pulseRing = 14 + Math.sin(frame * 0.18) * 5;
  const crashPulse = 18 + Math.sin(frame * 0.3) * 7;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <defs>
        {/* Ocean depth bathymetric glow */}
        <radialGradient id="gulfBathymetry" cx="44%" cy="62%" r="45%">
          <stop offset="0%" stopColor="#0F2440" />
          <stop offset="60%" stopColor="#0B1728" />
          <stop offset="100%" stopColor="#070C16" />
        </radialGradient>

        {/* Coastal shallow shelf waters glow */}
        <linearGradient id="coastalShelfGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0369A1" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0284C7" stopOpacity="0.2" />
        </linearGradient>

        {/* Emergency trajectory red glow filter */}
        <filter id="distressGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <HighAltitudeAtmosphericAura cx={540} cy={1180} color="#0284C7" id="mapAura" />

      {/* Sea Background Basin */}
      <rect x="40" y="860" width="1000" height="660" rx="14" fill="url(#gulfBathymetry)" stroke="#1E293B" strokeWidth="2" />

      {/* Nautical & Tactical Lat/Long Coordinates Grid */}
      <g stroke="#38BDF8" strokeWidth="0.8" opacity={0.18} strokeDasharray="4 8">
        {/* Longitude Meridians */}
        <line x1="140" y1="880" x2="140" y2="1500" />
        <line x1="260" y1="880" x2="260" y2="1500" />
        <line x1="434" y1="880" x2="434" y2="1500" />
        <line x1="600" y1="880" x2="600" y2="1500" />
        <line x1="776" y1="880" x2="776" y2="1500" />
        <line x1="920" y1="880" x2="920" y2="1500" />

        {/* Latitude Parallels */}
        <line x1="60" y1="940" x2="1020" y2="940" />
        <line x1="60" y1="1060" x2="1020" y2="1060" />
        <line x1="60" y1="1170" x2="1020" y2="1170" />
        <line x1="60" y1="1275" x2="1020" y2="1275" />
        <line x1="60" y1="1380" x2="1020" y2="1380" />
        <line x1="60" y1="1460" x2="1020" y2="1460" />
      </g>

      {/* Coordinate Labels */}
      <g fill="#38BDF8" fontSize="10" fontWeight="700" fontFamily="Montserrat" opacity={0.4}>
        <text x="145" y="895">98°W</text>
        <text x="265" y="895">95°W</text>
        <text x="439" y="895">90°W</text>
        <text x="605" y="895">85°W</text>
        <text x="781" y="895">80°W</text>
        <text x="925" y="895">76°W</text>

        <text x="68" y="936">32°N</text>
        <text x="68" y="1056">30°N</text>
        <text x="68" y="1166">28°N</text>
        <text x="68" y="1271">26°N</text>
        <text x="68" y="1376">24°N</text>
      </g>

      {/* Ocean Geographic Water Body Typography */}
      <text
        x="430"
        y="1225"
        fill="#38BDF8"
        fontSize="17"
        fontWeight="900"
        fontFamily="Montserrat"
        textAnchor="middle"
        letterSpacing="0.25em"
        opacity={0.35}
      >
        GULF OF MEXICO
      </text>
      <text
        x="890"
        y="1140"
        fill="#38BDF8"
        fontSize="15"
        fontWeight="900"
        fontFamily="Montserrat"
        textAnchor="middle"
        letterSpacing="0.22em"
        opacity={0.32}
      >
        ATLANTIC OCEAN
      </text>
      <text
        x="730"
        y="1415"
        fill="#38BDF8"
        fontSize="11"
        fontWeight="800"
        fontFamily="Montserrat"
        textAnchor="middle"
        letterSpacing="0.14em"
        opacity={0.28}
      >
        STRAITS OF FLORIDA
      </text>

      {/* --- REAL SOUTHEASTERN US & FLORIDA PENINSULA COASTLINE (Cartographic Blueprint) --- */}
      {/* Continental Landmass */}
      <path
        d="M 60 920 
           L 60 1060 
           C 100 1065, 140 1070, 180 1080 
           C 210 1088, 230 1092, 260 1090 
           C 300 1088, 330 1085, 360 1092 
           C 390 1098, 410 1115, 434 1122 
           C 445 1125, 450 1115, 442 1102 
           C 435 1090, 460 1078, 490 1075 
           C 520 1072, 550 1076, 575 1082 
           C 590 1088, 605 1100, 615 1105 
           C 628 1112, 638 1105, 646 1095 
           C 655 1088, 668 1102, 672 1120 
           C 678 1145, 680 1170, 688 1188 
           C 692 1198, 682 1210, 684 1222 
           C 688 1236, 705 1248, 712 1262 
           C 716 1272, 718 1282, 720 1294 
           C 724 1312, 730 1330, 742 1342 
           C 752 1352, 762 1345, 768 1332 
           C 774 1318, 775 1298, 776 1280 
           C 778 1262, 782 1245, 782 1228 
           C 782 1210, 780 1190, 785 1172 
           C 792 1152, 804 1142, 795 1128 
           C 786 1115, 775 1090, 768 1065 
           C 760 1035, 755 1005, 750 970 
           L 750 920 Z"
        fill="#1A2536"
        stroke="#38BDF8"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />

      {/* Internal State Borders (Subtle Tactical Etching) */}
      <g stroke="#475569" strokeWidth="1" strokeDasharray="3 4" opacity={0.5}>
        {/* Texas - Louisiana Border */}
        <line x1="260" y1="1090" x2="260" y2="920" />
        {/* Louisiana - Mississippi Border */}
        <line x1="390" y1="1098" x2="390" y2="920" />
        {/* Mississippi - Alabama Border */}
        <line x1="480" y1="1075" x2="480" y2="920" />
        {/* Alabama - Florida Panhandle Border */}
        <line x1="535" y1="1074" x2="535" y2="990" />
        <line x1="535" y1="990" x2="640" y2="990" />
        {/* Georgia - Florida Border */}
        <line x1="640" y1="990" x2="750" y2="990" />
      </g>

      {/* Lake Okeechobee (South Florida Distinctive Landmark) */}
      <ellipse cx="752" cy="1235" rx="14" ry="18" fill="#080E1A" stroke="#38BDF8" strokeWidth="1.5" />
      <text x="752" y="1239" fill="#38BDF8" fontSize="8" fontWeight="800" fontFamily="Montserrat" textAnchor="middle" opacity={0.65}>
        L. OKEECHOBEE
      </text>

      {/* Florida Keys Chain Arcing to Key West */}
      <g stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" opacity={0.85}>
        <line x1="770" y1="1342" x2="755" y2="1362" />
        <line x1="750" y1="1368" x2="732" y2="1380" />
        <line x1="726" y1="1384" x2="702" y2="1394" />
      </g>
      <text x="696" y="1410" fill="#94A3B8" fontSize="9" fontWeight="700" fontFamily="Montserrat">
        KEY WEST
      </text>

      {/* Bahamas Archipelago Islands */}
      <g>
        {/* Grand Bahama */}
        <path
          d="M 830 1220 C 850 1218, 875 1215, 890 1214 C 885 1220, 860 1224, 835 1225 Z"
          fill="#334155"
          stroke="#38BDF8"
          strokeWidth="1.5"
        />
        <text x="860" y="1210" fill="#94A3B8" fontSize="9" fontWeight="800" fontFamily="Montserrat" textAnchor="middle">
          GRAND BAHAMA
        </text>

        {/* Great Abaco */}
        <path
          d="M 900 1215 Q 920 1230, 915 1260 Q 905 1245, 900 1215 Z"
          fill="#334155"
          stroke="#38BDF8"
          strokeWidth="1.5"
        />

        {/* Bimini */}
        <ellipse cx="806" cy="1295" rx="5" ry="8" fill="#334155" stroke="#38BDF8" strokeWidth="1" />

        {/* Andros Island */}
        <path
          d="M 845 1315 C 855 1330, 865 1365, 860 1395 C 848 1385, 840 1350, 838 1325 Z"
          fill="#334155"
          stroke="#38BDF8"
          strokeWidth="1.5"
        />

        {/* New Providence (Nassau) */}
        <ellipse cx="895" cy="1320" rx="14" ry="7" fill="#334155" stroke="#38BDF8" strokeWidth="1.2" />
        <text x="895" y="1335" fill="#94A3B8" fontSize="9" fontWeight="800" fontFamily="Montserrat" textAnchor="middle">
          NASSAU
        </text>

        {/* North Eleuthera (MYEH Destination Island) */}
        <path
          d="M 915 1275 Q 938 1295, 928 1345 Q 922 1315, 915 1275 Z"
          fill="#0284C7"
          stroke="#38BDF8"
          strokeWidth="2"
        />
      </g>

      {/* Cuba Northern Coastline (Southern Boundary) */}
      <path
        d="M 680 1450 C 740 1440, 820 1445, 930 1455 L 930 1480 L 680 1480 Z"
        fill="#1E293B"
        stroke="#475569"
        strokeWidth="1.5"
      />
      <text x="780" y="1468" fill="#64748B" fontSize="11" fontWeight="800" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.1em">
        CUBA
      </text>

      {/* Regional State Labels */}
      <text x="140" y="945" fill="#64748B" fontSize="13" fontWeight="900" fontFamily="Montserrat" letterSpacing="0.08em">
        TEXAS
      </text>
      <text x="715" y="1035" fill="#64748B" fontSize="13" fontWeight="900" fontFamily="Montserrat" letterSpacing="0.08em">
        FLORIDA
      </text>
      <text x="880" y="1255" fill="#38BDF8" fontSize="12" fontWeight="900" fontFamily="Montserrat" letterSpacing="0.08em" opacity={0.8}>
        BAHAMAS
      </text>

      {/* --- FLIGHT PATH TELEMETRY: PLANNED ROUTE (KAUS -> MYEH) --- */}
      <path
        d="M 140 1010 Q 450 1180, 720 1294 L 776 1262 L 922 1300"
        fill="none"
        stroke="#64748B"
        strokeWidth="2.5"
        strokeDasharray="8 6"
        opacity={0.65}
      />

      {/* Planned Route Distance Placard */}
      <g transform="translate(350, 1150)">
        <rect x="0" y="0" width="230" height="24" rx="4" fill="#0F172A" stroke="#475569" strokeWidth="1" />
        <text x="115" y="16" fill="#94A3B8" fontSize="10" fontWeight="800" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.05em">
          PLANNED: 1,180 NM • FL350
        </text>
      </g>

      {/* --- ACTUAL FLOWN TRAJECTORY (Dynamic with timeline) --- */}
      {/* 1. Normal Cruise Segment across Gulf of Mexico */}
      <path
        d="M 140 1010 Q 450 1180, 720 1294"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="4"
        strokeDasharray="720"
        strokeDashoffset={720 * (1 - cruiseProgress)}
      />

      {/* 2. Emergency Plunge & Divergent Dive into Palm Beach County */}
      {progress > 0.75 && (
        <path
          d="M 720 1294 Q 745 1305, 770 1255"
          fill="none"
          stroke="#EF4444"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#distressGlow)"
          strokeDasharray="120"
          strokeDashoffset={120 * (1 - diveProgress)}
        />
      )}

      {/* --- WAYPOINT 1: ORIGIN AUSTIN (KAUS) --- */}
      <g>
        <circle cx="140" cy="1010" r="7" fill="#10B981" />
        <circle cx="140" cy="1010" r={pulseRing} fill="none" stroke="#10B981" strokeWidth="1.5" opacity={0.7} />
        <g transform="translate(60, 968)">
          <rect x="0" y="0" width="160" height="28" rx="5" fill="#064E3B" stroke="#10B981" strokeWidth="1.5" />
          <text x="80" y="18" fill="#ECFDF5" fontSize="12" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.04em">
            AUSTIN (KAUS)
          </text>
        </g>
      </g>

      {/* --- WAYPOINT 2: INGRESS CRISIS (NAPLES, FL LANDFALL) --- */}
      {progress > 0.65 && (
        <g>
          <circle cx="720" cy="1294" r="8" fill="#F59E0B" />
          <circle cx="720" cy="1294" r={pulseRing} fill="none" stroke="#F59E0B" strokeWidth="2" />
          <g transform="translate(615, 1315)">
            <rect x="0" y="0" width="180" height="25" rx="5" fill="#451A03" stroke="#F59E0B" strokeWidth="1.5" />
            <text x="90" y="17" fill="#FEF3C7" fontSize="10" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
              FL350 ICING ENCOUNTER
            </text>
          </g>
        </g>
      )}

      {/* --- WAYPOINT 3: PALM BEACH COUNTY IMPACT CRASH SITE --- */}
      {progress > 0.82 && (
        <g>
          <circle cx="770" cy="1255" r={crashPulse} fill="none" stroke="#EF4444" strokeWidth="3" opacity={0.85} />
          <circle cx="770" cy="1255" r="9" fill="#DC2626" />
          <polygon points="770,1243 780,1255 770,1267 760,1255" fill="#FEF2F2" stroke="#EF4444" strokeWidth="1.5" />

          {/* Impact Placard */}
          <g transform="translate(650, 1180)">
            <rect x="0" y="0" width="240" height="36" rx="6" fill="#450A0A" stroke="#EF4444" strokeWidth="2" />
            <text x="120" y="16" fill="#FEE2E2" fontSize="11" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.04em">
              CRASH: PALM BEACH CO.
            </text>
            <text x="120" y="29" fill="#FCA5A5" fontSize="9" fontWeight="800" fontFamily="Montserrat" textAnchor="middle">
              12:50 PM EST • FLIGHT END
            </text>
          </g>
        </g>
      )}

      {/* --- WAYPOINT 4: DESTINATION NORTH ELEUTHERA (MYEH) --- */}
      <g>
        <circle cx="922" cy="1300" r="7" fill="#0284C7" />
        <circle cx="922" cy="1300" r={pulseRing} fill="none" stroke="#38BDF8" strokeWidth="1.5" opacity={0.8} />
        <g transform="translate(820, 1345)">
          <rect x="0" y="0" width="190" height="28" rx="5" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="1.5" />
          <text x="95" y="18" fill="#F0F9FF" fontSize="11" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.04em">
            N. ELEUTHERA (MYEH)
          </text>
        </g>
      </g>

      {/* Mini Aircraft Radar Blip Moving Along Route */}
      <g transform={`translate(${jetX}, ${jetY})`}>
        <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
        {/* Miniature swept jet icon */}
        <path d="M 0 -8 L 6 4 L 0 2 L -6 4 Z" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1" />
      </g>

      {/* Telemetry Header Badge */}
      <g transform="translate(370, 890)">
        <rect x="0" y="0" width="340" height="30" rx="6" fill="#0B132B" stroke="#38BDF8" strokeWidth="1.5" />
        <circle cx="20" cy="15" r="4" fill="#38BDF8" />
        <text x="175" y="20" fill="#E0F2FE" fontSize="11" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.06em">
          FLIGHT N722BD RADAR TELEMETRY
        </text>
      </g>
    </svg>
  );
};

/**
 * SCENE 03: ICING VS TURBOFAN SPLIT CONFRONTATION
 */
/**
 * SCENE 03: ICING VS TURBOFAN SPLIT CONFRONTATION (Clean Technical HUD)
 */
export const IcingVsTurbofanSplit: React.FC<{ durationFrames?: number }> = ({ durationFrames = 120 }) => {
  const frame = useCurrentFrame();
  const rotorAngle = (frame * 18) % 360;
  const vibrationShudder = Math.sin(frame * 0.9) * 3;
  const icePulse = 1.0 + Math.sin(frame * 0.15) * 0.05;
  const streamOffset = (frame * 8) % 40;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <defs>
        {/* Frost ice crystal gradient */}
        <linearGradient id="rimeFrostGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#BAE6FD" />
          <stop offset="75%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        {/* Airfoil metallic skin gradient */}
        <linearGradient id="wingSkinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="30%" stopColor="#334155" />
          <stop offset="70%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        {/* Titanium turbofan blade gradient */}
        <linearGradient id="fanBladeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>

        {/* Engine thermal stress core glow */}
        <radialGradient id="engineStressGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <HighAltitudeAtmosphericAura cx={540} cy={1180} color="#0284C7" id="splitIcingAura" />

      {/* ========================================================================= */}
      {/* LEFT PANEL: AIRFRAME ICING & AERODYNAMIC STALL                            */}
      {/* ========================================================================= */}
      <g transform="translate(50, 880)">
        {/* Card Background */}
        <rect x="0" y="0" width="460" height="580" rx="14" fill="#0B1324" stroke="#1E293B" strokeWidth="2" />
        {/* Top Accent Strip (Cold Frost Cyan) */}
        <path d="M 0 14 Q 0 0 14 0 L 446 0 Q 460 0 460 14 L 460 38 L 0 38 Z" fill="#0C4A6E" />
        <text x="230" y="25" fill="#38BDF8" fontSize="12" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.08em">
          AIRFRAME // WING ICING
        </text>

        {/* Ambient Ice Atmosphere Dust */}
        <g opacity={0.6}>
          {Array.from({ length: 8 }).map((_, i) => (
            <circle
              key={i}
              cx={40 + ((i * 55 + frame * 2) % 400)}
              cy={80 + (i * 28) % 180}
              r={1.5 + (i % 2)}
              fill="#BAE6FD"
            />
          ))}
        </g>

        {/* --- DETAILED AIRFOIL CROSS-SECTION (NACA 64A Wing Profile) --- */}
        <g transform="translate(40, 160)">
          {/* Incoming Laminar Airflow Streamlines */}
          <g stroke="#38BDF8" strokeWidth="2" strokeDasharray="14 10" opacity={0.7}>
            <line x1={0 - streamOffset} y1="60" x2="80" y2="60" />
            <line x1={10 - streamOffset} y1="90" x2="80" y2="90" />
            <line x1={0 - streamOffset} y1="120" x2="80" y2="120" />
            <line x1={15 - streamOffset} y1="150" x2="80" y2="150" />
          </g>

          {/* Aerodynamic Wing Body */}
          <path
            d="M 100 110 
               C 100 65, 180 50, 270 65 
               C 330 75, 360 95, 390 110 
               C 340 120, 280 135, 210 140 
               C 150 145, 100 135, 100 110 Z"
            fill="url(#wingSkinGrad)"
            stroke="#64748B"
            strokeWidth="2.5"
          />

          {/* Titanium Leading Edge De-Icing Slat */}
          <path
            d="M 100 110 
               C 100 75, 130 68, 155 72 
               L 155 138 
               C 125 140, 100 132, 100 110 Z"
            fill="#475569"
            stroke="#94A3B8"
            strokeWidth="1.5"
          />

          {/* Severe Double-Horn Rime Ice Growth (Stagnation Point Accretion) */}
          <g transform={`scale(${icePulse}) translate(${(1 - icePulse) * 80}, ${(1 - icePulse) * 110})`}>
            {/* Upper & Lower Aerodynamic Ice Horns */}
            <path
              d="M 115 72 
                 C 95 62, 70 48, 60 55 
                 C 55 60, 68 74, 52 78 
                 C 40 82, 48 94, 38 102 
                 C 32 108, 42 118, 35 125 
                 C 45 130, 50 142, 62 148 
                 C 72 152, 92 145, 115 138 
                 C 100 125, 95 95, 115 72 Z"
              fill="url(#rimeFrostGrad)"
              stroke="#E0F2FE"
              strokeWidth="2"
              filter="drop-shadow(0 0 10px rgba(56, 189, 248, 0.6))"
            />
            {/* Crystalline Frost Spikes */}
            <line x1="58" y1="58" x2="42" y2="48" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <line x1="48" y1="88" x2="32" y2="82" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <line x1="38" y1="108" x2="22" y2="108" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="44" y1="126" x2="28" y2="132" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <line x1="60" y1="148" x2="48" y2="160" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Violent Airflow Detachment & Turbulent Stall Vortices (Over Upper Wing) */}
          <g stroke="#EF4444" strokeWidth="2" fill="none">
            {/* Boundary layer separation line */}
            <path d="M 60 55 Q 120 15, 220 20 Q 300 25, 380 60" strokeDasharray="6 4" />
            {/* Stalled vortex eddies */}
            <path d="M 160 38 Q 175 25, 190 38 Q 185 50, 170 45" />
            <path d="M 230 40 Q 248 26, 265 42 Q 258 55, 240 50" />
            <path d="M 300 50 Q 320 35, 340 55 Q 330 68, 312 62" />
          </g>

          <text x="260" y="30" fill="#EF4444" fontSize="10" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.06em">
            LIFT SEPARATION // STALL ONSET
          </text>
        </g>

        {/* Telemetry Metric Placards */}
        <g transform="translate(30, 420)">
          {/* Lift Loss Metric Bar */}
          <rect x="0" y="0" width="400" height="42" rx="6" fill="#1E293B" stroke="#0284C7" strokeWidth="1.5" />
          <text x="18" y="26" fill="#94A3B8" fontSize="11" fontWeight="800" fontFamily="Montserrat">
            LIFT RETENTION
          </text>
          {/* Progress gauge */}
          <rect x="160" y="12" width="220" height="18" rx="4" fill="#0F172A" />
          <rect x="160" y="12" width="136" height="18" rx="4" fill="#EF4444" />
          <text x="270" y="26" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
            62% (-38%)
          </text>

          {/* Ice Thickness Status */}
          <rect x="0" y="52" width="400" height="34" rx="6" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="20" cy="69" r="5" fill="#38BDF8" />
          <text x="35" y="73" fill="#F0F9FF" fontSize="11" fontWeight="900" fontFamily="Montserrat" letterSpacing="0.04em">
            RIME ICE ACCRETION: 2.8 INCHES
          </text>
        </g>
      </g>

      {/* ========================================================================= */}
      {/* CENTER ILLUMINATED DIVISION SEAM & WARNING ICON                           */}
      {/* ========================================================================= */}
      <g>
        {/* Glowing vertical division line */}
        <line x1="540" y1="870" x2="540" y2="1470" stroke="#F59E0B" strokeWidth="3" opacity={0.8} />
        <line x1="540" y1="870" x2="540" y2="1470" stroke="#FFFFFF" strokeWidth="1" opacity={0.9} />

        {/* Center Conflict Diamond Badge */}
        <g transform="translate(540, 1170)">
          <polygon points="0,-24 24,0 0,24 -24,0" fill="#0B1324" stroke="#F59E0B" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="14" fill="#F59E0B" />
          <text x="0" y="5" fill="#0F172A" fontSize="13" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
            !
          </text>
        </g>
      </g>

      {/* ========================================================================= */}
      {/* RIGHT PANEL: PRATT & WHITNEY PW305A TURBOFAN COMPRESSOR STRAIN            */}
      {/* ========================================================================= */}
      <g transform="translate(570, 880)">
        {/* Card Background */}
        <rect x="0" y="0" width="460" height="580" rx="14" fill="#0B1324" stroke="#1E293B" strokeWidth="2" />
        {/* Top Accent Strip (Emergency Thermal Red) */}
        <path d="M 0 14 Q 0 0 14 0 L 446 0 Q 460 0 460 14 L 460 38 L 0 38 Z" fill="#7F1D1D" />
        <text x="230" y="25" fill="#FEE2E2" fontSize="12" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.08em">
          PROPULSION // PW305A CORE
        </text>

        {/* --- TURBOFAN ROTOR ASSEMBLY WITH SHUDDER / VIBRATION --- */}
        <g transform={`translate(${230 + vibrationShudder}, ${240 + vibrationShudder})`}>
          {/* Radial Vibration Stress Shockwaves */}
          <circle cx="0" cy="0" r={130 + Math.sin(frame * 0.4) * 6} fill="none" stroke="#EF4444" strokeWidth="2" opacity={0.6} />
          <circle cx="0" cy="0" r={145 + Math.sin(frame * 0.4 + 1) * 8} fill="none" stroke="#DC2626" strokeWidth="1.5" opacity={0.4} />

          {/* Engine Nacelle Cowl Intake Ring */}
          <circle cx="0" cy="0" r="120" fill="url(#engineStressGlow)" stroke="#CBD5E1" strokeWidth="9" />
          <circle cx="0" cy="0" r="114" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="110" fill="#0B0F19" />

          {/* Rotating Titanium Fan Rotor Blades */}
          <g transform={`rotate(${rotorAngle}, 0, 0)`}>
            {Array.from({ length: 16 }).map((_, i) => (
              <path
                key={i}
                d="M 0 -18 
                   C 10 -40, 18 -75, 14 -108 
                   L -6 -106 
                   C -2 -75, -5 -40, 0 -18 Z"
                fill="url(#fanBladeGrad)"
                stroke="#64748B"
                strokeWidth="1"
                transform={`rotate(${i * 22.5}, 0, 0)`}
              />
            ))}

            {/* Aerodynamic Spinner Cone with Anti-Bird Warning Spiral */}
            <circle cx="0" cy="0" r="32" fill="#1E293B" stroke="#E2E8F0" strokeWidth="2" />
            <path
              d="M 0 0 
                 Q 8 -8, 14 -4 
                 Q 22 2, 20 16 
                 Q 14 26, 0 28"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="0" cy="0" r="6" fill="#EF4444" />
          </g>

          {/* Ingested Ice Crystals Entering Intake Cowl */}
          <g opacity={0.85}>
            <polygon points="65,-90 75,-80 60,-82" fill="#BAE6FD" stroke="#38BDF8" strokeWidth="1" />
            <polygon points="90,-50 102,-42 88,-40" fill="#BAE6FD" stroke="#38BDF8" strokeWidth="1" />
            <polygon points="-75,-70 -85,-60 -70,-62" fill="#BAE6FD" stroke="#38BDF8" strokeWidth="1" />
            <line x1="85" y1="-100" x2="60" y2="-75" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" />
            <line x1="-95" y1="-85" x2="-70" y2="-60" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" />
          </g>
        </g>

        {/* Propulsion Telemetry Placards */}
        <g transform="translate(30, 420)">
          {/* Vibration Gauge Metric Bar */}
          <rect x="0" y="0" width="400" height="42" rx="6" fill="#1E293B" stroke="#DC2626" strokeWidth="1.5" />
          <text x="18" y="26" fill="#FCA5A5" fontSize="11" fontWeight="800" fontFamily="Montserrat">
            CORE VIBRATION
          </text>
          {/* Exceedance gauge */}
          <rect x="160" y="12" width="220" height="18" rx="4" fill="#0F172A" />
          <rect x="160" y="12" width="205" height="18" rx="4" fill="#EF4444" />
          <text x="270" y="26" fill="#FEF2F2" fontSize="11" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
            4.8 IPS [DANGER]
          </text>

          {/* Compressor Surge Status Alert */}
          <rect x="0" y="52" width="400" height="34" rx="6" fill="#450A0A" stroke="#EF4444" strokeWidth="1.5" />
          <circle cx="20" cy="69" r="5" fill="#EF4444" />
          <text x="35" y="73" fill="#FEE2E2" fontSize="11" fontWeight="900" fontFamily="Montserrat" letterSpacing="0.04em">
            COMPRESSOR SURGE // THRUST ROLLBACK
          </text>
        </g>
      </g>
    </svg>
  );
};

/**
 * SCENE 04: PILOT INITIAL ATC QUOTE CARD
 */
export const PilotInitialAtcQuote: React.FC<{ durationFrames?: number }> = ({ durationFrames = 120 }) => {
  const frame = useCurrentFrame();

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <HighAltitudeAtmosphericAura cx={540} cy={1180} color="#38BDF8" id="quoteAtcAura" />

      {/* Tactical Parchment / Cardboard Container */}
      <g transform="translate(140, 950)">
        <rect
          x="0"
          y="0"
          width="800"
          height="450"
          rx="18"
          fill="#0F172A"
          stroke="#475569"
          strokeWidth="3"
        />
        {/* Top Header Strip */}
        <path d="M 0 18 Q 0 0 18 0 L 782 0 Q 800 0 800 18 L 800 55 L 0 55 Z" fill="#1E293B" />
        <circle cx="35" cy="28" r="8" fill="#10B981" />
        <text x="55" y="34" fill="#94A3B8" fontSize="16" fontWeight="800" fontFamily="Montserrat" letterSpacing="0.08em">
          ATC VOICE TRANSCRIPT • FREQ 128.500 MHz
        </text>

        {/* Oscilloscope Waveform */}
        <path
          d={`M 60 110 ${Array.from({ length: 30 })
            .map((_, i) => {
              const h = Math.sin((frame * 0.4) + i * 0.7) * (i > 8 && i < 22 ? 22 : 6);
              return `L ${60 + i * 23} ${110 + h}`;
            })
            .join(' ')}`}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="3.5"
        />

        {/* Quoted Radio Speech */}
        <text x="400" y="210" fill="#F8FAFC" fontSize="30" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
          "WE ARE MANAGING ICING..."
        </text>
        <text x="400" y="260" fill="#FBBF24" fontSize="28" fontWeight="800" fontFamily="Montserrat" textAnchor="middle">
          "REQUESTING CLIMB TO FL370"
        </text>

        {/* Radio Intercept Seal */}
        <g transform="translate(260, 340)">
          <rect x="0" y="0" width="280" height="36" rx="8" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="1.5" />
          <text x="140" y="24" fill="#DBEAFE" fontSize="14" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.06em">
            MIAMI CENTER RADAR INTERCEPT
          </text>
        </g>
      </g>
    </svg>
  );
};

/**
 * SCENE 05: MIAMI CENTER RADAR VECTORS
 */
export const MiamiRadarVectors: React.FC<{ durationFrames?: number }> = ({ durationFrames = 107 }) => {
  const frame = useCurrentFrame();
  const sweepAngle = (frame * 5) % 360;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <HighAltitudeAtmosphericAura cx={540} cy={1180} color="#10B981" id="radarAura" />

      {/* Radar CRT Scope Screen */}
      <g transform="translate(190, 880)">
        <circle cx="350" cy="300" r="280" fill="#022C22" stroke="#059669" strokeWidth="4" />
        {/* Concentric Range Rings */}
        <circle cx="350" cy="300" r="90" fill="none" stroke="#047857" strokeWidth="1.5" strokeDasharray="4 6" />
        <circle cx="350" cy="300" r="180" fill="none" stroke="#047857" strokeWidth="1.5" strokeDasharray="4 6" />
        <circle cx="350" cy="300" r="260" fill="none" stroke="#047857" strokeWidth="1.5" />

        {/* Crosshair Axes */}
        <line x1="70" y1="300" x2="630" y2="300" stroke="#047857" strokeWidth="1.5" />
        <line x1="350" y1="20" x2="350" y2="580" stroke="#047857" strokeWidth="1.5" />

        {/* Rotating Phosphor Sweep Line */}
        <line
          x1="350"
          y1="300"
          x2={350 + Math.cos((sweepAngle * Math.PI) / 180) * 270}
          y2={300 + Math.sin((sweepAngle * Math.PI) / 180) * 270}
          stroke="#34D399"
          strokeWidth="3.5"
          opacity={0.8}
        />

        {/* Primary Target Blip (N722BD) */}
        <g transform="translate(380, 240)">
          <circle cx="0" cy="0" r="6" fill="#EF4444" />
          <circle cx="0" cy="0" r="14" fill="none" stroke="#EF4444" strokeWidth="2" opacity={0.7} />
          {/* Data Tag Box */}
          <rect x="15" y="-30" width="160" height="50" rx="4" fill="#064E3B" stroke="#34D399" strokeWidth="1" />
          <text x="25" y="-12" fill="#A7F3D0" fontSize="13" fontWeight="900" fontFamily="Montserrat">
            N722BD • LJ60
          </text>
          <text x="25" y="8" fill="#F87171" fontSize="12" fontWeight="800" fontFamily="Montserrat">
            FL350 v 21000FPM
          </text>
        </g>
      </g>
    </svg>
  );
};

/**
 * SCENE 06: TRIM UPSET FRACTURE (AERODYNAMIC FAILURE)
 */
export const TrimRunawayDiveFracture: React.FC<{ durationFrames?: number }> = ({ durationFrames = 129 }) => {
  const frame = useCurrentFrame();
  const pitchAngle = interpolate(frame, [0, 40], [0, 48], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shudder = Math.sin(frame * 0.8) * 4;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <FieryEmergencyAura cx={540} cy={1180} id="trimAura" />

      {/* Aerodynamic Stress Streamlines */}
      <g stroke="#EF4444" strokeWidth="2.5" opacity={0.6} strokeDasharray="16 10">
        <line x1="200" y1="940" x2="800" y2="1240" />
        <line x1="160" y1="1020" x2="840" y2="1360" />
        <line x1="120" y1="1100" x2="760" y2="1420" />
      </g>

      {/* Nosediving Aircraft Profile */}
      <g transform={`translate(${540 + shudder}, ${1180 + shudder}) rotate(${pitchAngle}) translate(-540, -1180)`}>
        {/* Full Learjet 60 Fuselage with Cabin Roof & Cockpit */}
        <path
          d="M 890 1165 
             C 860 1152, 835 1146, 815 1142
             L 755 1125
             C 680 1124, 480 1124, 380 1125
             C 330 1127, 275 1146, 230 1164
             C 230 1168, 250 1182, 320 1196
             C 380 1205, 450 1205, 520 1205
             L 800 1205
             C 840 1200, 875 1182, 890 1165
             Z"
          fill="#F8FAFC"
          stroke="#0F172A"
          strokeWidth="2.5"
        />

        {/* Cockpit Canopy */}
        <path d="M 812 1144 L 755 1127 L 760 1147 L 808 1149 Z" fill="#0284C7" />

        {/* Passenger Windows */}
        {[480, 530, 580, 630, 680].map((cx, idx) => (
          <rect key={idx} x={cx - 5} y={1152} width="10" height="16" rx="5" fill="#0F172A" />
        ))}

        {/* Red Cheatline */}
        <path d="M 870 1166 L 360 1168" stroke="#DC2626" strokeWidth="3" />

        {/* T-Tail & Deflected Trim Tab (Root Cause of Pitch Down) */}
        <path
          d="M 380 1125 C 345 1118, 305 1090, 275 988 L 225 988 L 265 1145 L 320 1135 Z"
          fill="#94A3B8"
          stroke="#475569"
          strokeWidth="1.5"
        />
        {/* Horizontal Stabilizer deflected down aggressively */}
        <path d="M 190 1005 L 305 995 L 315 1010 L 195 1020 Z" fill="#EF4444" stroke="#DC2626" strokeWidth="2" />
        {/* Deflection Angle Arrow */}
        <path d="M 180 980 Q 155 1005 175 1030" fill="none" stroke="#F59E0B" strokeWidth="3" />

        {/* Engine Nacelle with Stress Flash */}
        <rect x="288" y="1118" width="106" height="28" rx="10" fill="#1E293B" stroke="#F59E0B" strokeWidth="2" />
        <circle cx="286" cy="1132" r="8" fill="#DC2626" />

        {/* Low Swept Wing with Stress Bending */}
        <path d="M 640 1205 L 380 1270 L 368 1262 L 525 1195 Z" fill="#64748B" stroke="#0F172A" strokeWidth="2" />
        <path d="M 378 1270 L 388 1222 L 396 1224 L 384 1271 Z" fill="#EF4444" />
      </g>

      {/* Structural Fracture Warning Label */}
      <g transform="translate(320, 1420)">
        <rect x="0" y="0" width="440" height="42" rx="8" fill="#7F1D1D" stroke="#EF4444" strokeWidth="2" />
        <text x="220" y="27" fill="#FEF2F2" fontSize="18" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.05em">
          UNCOMMANDED TRIM RUNAWAY
        </text>
      </g>
    </svg>
  );
};

/**
 * SCENE 07: TWENTY THOUSAND FPM QUOTE CARD
 */
export const TwentyThousandFpmQuoteCard: React.FC<{ durationFrames?: number }> = ({ durationFrames = 124 }) => {
  const frame = useCurrentFrame();

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <FieryEmergencyAura cx={540} cy={1180} id="maydayAura" />

      {/* Red Alert Cardboard Card */}
      <g transform="translate(140, 940)">
        <rect
          x="0"
          y="0"
          width="800"
          height="460"
          rx="18"
          fill="#1C1917"
          stroke="#EF4444"
          strokeWidth="3.5"
        />

        {/* Flashing Top Border */}
        <rect x="0" y="0" width="800" height="50" rx="18" fill="#7F1D1D" />
        <circle cx="40" cy="25" r="9" fill={frame % 16 < 8 ? '#EF4444' : '#FCA5A5'} />
        <text x="65" y="32" fill="#FEF2F2" fontSize="17" fontWeight="900" fontFamily="Montserrat" letterSpacing="0.08em">
          EMERGENCY DESCENT RATE ALERT
        </text>

        {/* Panicked Transmission Text */}
        <text x="400" y="180" fill="#EF4444" fontSize="38" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
          "MAYDAY, MAYDAY!"
        </text>
        <text x="400" y="240" fill="#F8FAFC" fontSize="28" fontWeight="800" fontFamily="Montserrat" textAnchor="middle">
          "DESCENDING 20,000 FEET"
        </text>
        <text x="400" y="290" fill="#F59E0B" fontSize="28" fontWeight="800" fontFamily="Montserrat" textAnchor="middle">
          "PER MINUTE!"
        </text>

        {/* Live Audio Waveform Peak */}
        <path
          d={`M 80 370 ${Array.from({ length: 32 })
            .map((_, i) => {
              const h = Math.sin(frame * 0.6 + i * 0.9) * (i > 10 && i < 24 ? 35 : 10);
              return `L ${80 + i * 20} ${370 + h}`;
            })
            .join(' ')}`}
          fill="none"
          stroke="#DC2626"
          strokeWidth="4"
        />
      </g>
    </svg>
  );
};

/**
 * SCENE 08: OVERSPEED SHOCKWAVE FRACTURE
 */
export const OverspeedShockwaveFracture: React.FC<{ durationFrames?: number }> = ({ durationFrames = 122 }) => {
  const frame = useCurrentFrame();
  const shockScale = interpolate(frame % 20, [0, 20], [0.8, 1.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockOpacity = interpolate(frame % 20, [0, 20], [0.9, 0.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <FieryEmergencyAura cx={540} cy={1180} id="overspeedAura" />

      {/* Near-Vertical Jet Nose Pointing Down */}
      <g transform="translate(540, 1140) rotate(78)">
        {/* Mach Cone Compression Rings */}
        <ellipse
          cx="280"
          cy="0"
          rx={80 * shockScale}
          ry={140 * shockScale}
          fill="none"
          stroke="#F8FAFC"
          strokeWidth="4"
          opacity={shockOpacity}
        />
        <ellipse
          cx="180"
          cy="0"
          rx={100 * shockScale}
          ry={170 * shockScale}
          fill="none"
          stroke="#EF4444"
          strokeWidth="3"
          opacity={shockOpacity * 0.8}
        />

        {/* Fuselage in High-G Dive */}
        <path
          d="M -260 0 C -120 -35, 120 -30, 280 0 C 120 30, -120 35, -260 0 Z"
          fill="#E2E8F0"
          stroke="#0F172A"
          strokeWidth="4"
        />
        {/* Cockpit canopy */}
        <path d="M 190 -20 L 240 0 L 190 20 Z" fill="#0284C7" />

        {/* Wings with Wingtip Shock Vortices */}
        <path d="M 0 -25 L -120 -180 L -80 -185 L 60 -20 Z" fill="#94A3B8" />
        <path d="M 0 25 L -120 180 L -80 185 L 60 20 Z" fill="#CBD5E1" />

        {/* Wingtip supersonic shock rings */}
        <circle cx="-100" cy="-180" r={16 * shockScale} fill="none" stroke="#F59E0B" strokeWidth="2" opacity={shockOpacity} />
        <circle cx="-100" cy="180" r={16 * shockScale} fill="none" stroke="#F59E0B" strokeWidth="2" opacity={shockOpacity} />
      </g>

      {/* Transonic Overspeed Indicator */}
      <g transform="translate(320, 1430)">
        <rect x="0" y="0" width="440" height="42" rx="8" fill="#450A0A" stroke="#EF4444" strokeWidth="2" />
        <text x="220" y="27" fill="#FEE2E2" fontSize="18" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.05em">
          CRITICAL OVER-MACH FLUTTER
        </text>
      </g>
    </svg>
  );
};

/**
 * SCENE 09: ALTIMETER COLLAPSE TALLY BOARD
 */
export const AltimeterCollapseTallyBoard: React.FC<{ durationFrames?: number }> = ({ durationFrames = 125 }) => {
  const frame = useCurrentFrame();
  const currentAlt = Math.round(
    interpolate(frame, [0, durationFrames], [35000, 8750], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  // Altimeter pointer rotations (hundreds pointer & thousands pointer)
  const thousandsDeg = (35000 - currentAlt) * 0.036;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <FieryEmergencyAura cx={540} cy={1180} color="#DC2626" id="altimeterAura" />

      {/* Flight Instrument Gauge Dial */}
      <g transform="translate(340, 920)">
        <circle cx="200" cy="200" r="190" fill="#090D12" stroke="#475569" strokeWidth="8" />
        <circle cx="200" cy="200" r="175" fill="#0F172A" stroke="#1E293B" strokeWidth="4" />

        {/* Dial Numbers: 0 through 9 */}
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i * 36 - 90) * (Math.PI / 180);
          const x = 200 + Math.cos(angle) * 140;
          const y = 200 + Math.sin(angle) * 140 + 7;
          return (
            <text
              key={i}
              x={x}
              y={y}
              fill="#F8FAFC"
              fontSize="24"
              fontWeight="900"
              fontFamily="Montserrat"
              textAnchor="middle"
            >
              {i}
            </text>
          );
        })}

        {/* Barber-Pole Low Altitude Warning Flag */}
        <rect x="150" y="140" width="100" height="26" fill="#DC2626" stroke="#FEF2F2" strokeWidth="1.5" />
        <text x="200" y="158" fill="#FEF2F2" fontSize="13" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
          PULL UP
        </text>

        {/* Needle Unwinding Counter-Clockwise */}
        <g transform={`rotate(${-thousandsDeg}, 200, 200)`}>
          <polygon points="200,50 193,200 207,200" fill="#F8FAFC" />
          <polygon points="200,70 190,200 210,200" fill="#EF4444" />
          <circle cx="200" cy="200" r="18" fill="#F59E0B" />
        </g>
      </g>

      {/* Digital Readout Banner */}
      <g transform="translate(240, 1370)">
        <rect x="0" y="0" width="600" height="90" rx="14" fill="#020617" stroke="#EF4444" strokeWidth="3" />
        <text x="300" y="38" fill="#94A3B8" fontSize="18" fontWeight="800" fontFamily="Montserrat" textAnchor="middle">
          RADAR PRESSURE ALTITUDE
        </text>
        <text x="300" y="78" fill="#EF4444" fontSize="42" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.04em">
          {currentAlt.toLocaleString()} FT
        </text>
      </g>
    </svg>
  );
};

/**
 * SCENE 10: FINAL PANICKED MAYDAY QUOTE
 */
export const FinalPanickedMaydayQuote: React.FC<{ durationFrames?: number }> = ({ durationFrames = 122 }) => {
  const frame = useCurrentFrame();

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <FieryEmergencyAura cx={540} cy={1180} id="finalMaydayAura" />

      {/* Distress Transcript Box */}
      <g transform="translate(140, 940)">
        <rect
          x="0"
          y="0"
          width="800"
          height="460"
          rx="18"
          fill="#0F172A"
          stroke="#EF4444"
          strokeWidth="4"
        />

        {/* Warning Hazard Stripes */}
        <rect x="0" y="0" width="800" height="40" rx="18" fill="#B91C1C" />
        <text x="400" y="27" fill="#FEF2F2" fontSize="16" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.08em">
          LIVEATC.NET AUDIO ARCHIVE • 12:49:50 PM
        </text>

        {/* Final Chilling Words */}
        <text x="400" y="170" fill="#EF4444" fontSize="36" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
          "WE'RE GOING TO CRASH"
        </text>
        <text x="400" y="225" fill="#EF4444" fontSize="36" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
          "INTO THE GROUND!"
        </text>

        {/* Transmission Static Noise Bar */}
        <path
          d={`M 60 330 ${Array.from({ length: 36 })
            .map((_, i) => {
              const h = Math.sin(frame * 0.9 + i * 1.4) * 28;
              return `L ${60 + i * 19} ${330 + h}`;
            })
            .join(' ')}`}
          fill="none"
          stroke="#F59E0B"
          strokeWidth="3"
        />

        {/* Loss of Radar Contact Badge */}
        <g transform="translate(240, 390)">
          <rect x="0" y="0" width="320" height="34" rx="6" fill="#7F1D1D" stroke="#F87171" strokeWidth="1" />
          <text x="160" y="22" fill="#FEF2F2" fontSize="13" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
            TRANSPONDER LOST: 8,750 FT
          </text>
        </g>
      </g>
    </svg>
  );
};

/**
 * SCENE 11: PALM BEACH TACTICAL MAP
 */
/**
 * SCENE 11: PALM BEACH COUNTY APPROACH & IMPACT LOCATOR MAP (Authentic Cartography)
 */
export const PalmBeachTacticalMap: React.FC<{ durationFrames?: number }> = ({ durationFrames = 111 }) => {
  const frame = useCurrentFrame();
  const descentProgress = interpolate(frame, [0, durationFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const shockwavePulse = 18 + Math.sin(frame * 0.35) * 8;

  // Descending dive trajectory coordinates:
  // Starts at upper-west (260, 990) -> (420, 1070) -> (550, 1140) -> Impact at (645, 1205)
  const jetX = interpolate(descentProgress, [0, 0.4, 0.8, 1], [260, 420, 550, 645], { extrapolateRight: 'clamp' });
  const jetY = interpolate(descentProgress, [0, 0.4, 0.8, 1], [990, 1070, 1140, 1205], { extrapolateRight: 'clamp' });

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <defs>
        {/* County basin land gradient */}
        <radialGradient id="pbBasinGrad" cx="60%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="70%" stopColor="#111827" />
          <stop offset="100%" stopColor="#0B0F19" />
        </radialGradient>

        {/* Lake Okeechobee water gradient */}
        <linearGradient id="okeechobeeWaterGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#082F49" />
        </linearGradient>

        {/* Atlantic Ocean coastal gradient */}
        <linearGradient id="atlanticCoastGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#082F49" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>

        {/* Impact glow filter */}
        <filter id="impactRedGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <HighAltitudeAtmosphericAura cx={540} cy={1180} color="#DC2626" id="pbMapAura" />

      {/* Map Boundary Container */}
      <rect x="40" y="860" width="1000" height="660" rx="14" fill="url(#pbBasinGrad)" stroke="#334155" strokeWidth="2" />

      {/* Grid Reticle */}
      <g stroke="#38BDF8" strokeWidth="0.8" opacity={0.16} strokeDasharray="4 8">
        <line x1="60" y1="920" x2="1020" y2="920" />
        <line x1="60" y1="1040" x2="1020" y2="1040" />
        <line x1="60" y1="1160" x2="1020" y2="1160" />
        <line x1="60" y1="1280" x2="1020" y2="1280" />
        <line x1="60" y1="1400" x2="1020" y2="1400" />

        <line x1="180" y1="880" x2="180" y2="1500" />
        <line x1="360" y1="880" x2="360" y2="1500" />
        <line x1="540" y1="880" x2="540" y2="1500" />
        <line x1="720" y1="880" x2="720" y2="1500" />
        <line x1="900" y1="880" x2="900" y2="1500" />
      </g>

      {/* Tactical Coordinate Labels */}
      <g fill="#38BDF8" fontSize="10" fontWeight="700" fontFamily="Montserrat" opacity={0.35}>
        <text x="185" y="895">80°40'W</text>
        <text x="365" y="895">80°25'W</text>
        <text x="545" y="895">80°15'W</text>
        <text x="725" y="895">80°08'W</text>
        <text x="905" y="895">80°03'W</text>

        <text x="68" y="915">26°55'N</text>
        <text x="68" y="1035">26°45'N</text>
        <text x="68" y="1155">26°38'N</text>
        <text x="68" y="1275">26°28'N</text>
        <text x="68" y="1395">26°18'N</text>
      </g>

      {/* --- WEST WATER BODY: LAKE OKEECHOBEE (Eastern Shoreline) --- */}
      <path
        d="M 40 860 L 140 860 C 165 920, 185 980, 180 1050 C 175 1110, 150 1160, 120 1210 C 95 1250, 60 1285, 40 1310 Z"
        fill="url(#okeechobeeWaterGrad)"
        stroke="#38BDF8"
        strokeWidth="2"
      />
      <text x="95" y="1040" fill="#38BDF8" fontSize="11" fontWeight="800" fontFamily="Montserrat" letterSpacing="0.12em" opacity={0.7} transform="rotate(-90, 95, 1040)">
        LAKE OKEECHOBEE
      </text>

      {/* Western Everglades Agricultural Area (EAA) Grid */}
      <g stroke="#334155" strokeWidth="0.8" opacity={0.4} strokeDasharray="3 3">
        <line x1="180" y1="960" x2="380" y2="960" />
        <line x1="170" y1="1040" x2="380" y2="1040" />
        <line x1="150" y1="1120" x2="380" y2="1120" />
        <line x1="130" y1="1200" x2="380" y2="1200" />
        <line x1="280" y1="880" x2="280" y2="1320" />
      </g>
      <text x="270" y="935" fill="#64748B" fontSize="10" fontWeight="800" fontFamily="Montserrat" letterSpacing="0.1em">
        EVERGLADES CONSERVATION AREA
      </text>

      {/* --- EAST WATER BODY: ATLANTIC OCEAN & LAKE WORTH LAGOON --- */}
      {/* Intracoastal Waterway / Lagoon */}
      <path
        d="M 915 860 L 915 1520 L 935 1520 L 935 860 Z"
        fill="#0369A1"
        opacity={0.5}
      />
      {/* Palm Beach Barrier Island */}
      <rect x="935" y="880" width="22" height="600" rx="3" fill="#334155" stroke="#38BDF8" strokeWidth="1" />
      <text x="946" y="1180" fill="#94A3B8" fontSize="9" fontWeight="800" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.1em" transform="rotate(90, 946, 1180)">
        PALM BEACH ISLAND
      </text>
      {/* Atlantic Ocean */}
      <rect x="957" y="860" width="83" height="660" fill="url(#atlanticCoastGrad)" />
      <text x="995" y="1180" fill="#38BDF8" fontSize="11" fontWeight="800" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.15em" opacity={0.7} transform="rotate(90, 995, 1180)">
        ATLANTIC OCEAN
      </text>

      {/* County Borders (Martin County North / Broward County South) */}
      <g stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="6 4" opacity={0.5}>
        <line x1="140" y1="885" x2="915" y2="885" />
        <text x="540" y="880" fill="#94A3B8" fontSize="10" fontWeight="800" fontFamily="Montserrat" textAnchor="middle">
          MARTIN CO. BORDER
        </text>
        <line x1="60" y1="1495" x2="915" y2="1495" />
        <text x="540" y="1510" fill="#94A3B8" fontSize="10" fontWeight="800" fontFamily="Montserrat" textAnchor="middle">
          BROWARD CO. BORDER
        </text>
      </g>

      {/* --- HIGHWAY NETWORK & MAJOR THOROUGHFARES --- */}
      {/* 1. Florida's Turnpike (SR 91) */}
      <path
        d="M 520 885 C 515 1000, 510 1150, 505 1300 C 500 1380, 490 1440, 485 1495"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="4"
        opacity={0.8}
      />
      <g transform="translate(495, 1050) rotate(-90)">
        <rect x="-60" y="-12" width="120" height="18" rx="3" fill="#0B132B" stroke="#F59E0B" strokeWidth="1" />
        <text x="0" y="2" fill="#F59E0B" fontSize="9" fontWeight="800" fontFamily="Montserrat" textAnchor="middle">
          FL TURNPIKE
        </text>
      </g>

      {/* 2. Interstate 95 (I-95 Coastal Corridor) */}
      <line x1="840" y1="885" x2="840" y2="1495" stroke="#38BDF8" strokeWidth="4.5" opacity={0.8} />
      <g transform="translate(825, 1050) rotate(-90)">
        <rect x="-45" y="-12" width="90" height="18" rx="3" fill="#0B132B" stroke="#38BDF8" strokeWidth="1" />
        <text x="0" y="2" fill="#38BDF8" fontSize="9" fontWeight="800" fontFamily="Montserrat" textAnchor="middle">
          INTERSTATE 95
        </text>
      </g>

      {/* 3. Southern Boulevard (SR 80 / US 98 East-West Artery) */}
      <line x1="180" y1="1020" x2="915" y2="1020" stroke="#64748B" strokeWidth="3" opacity={0.7} />
      <text x="350" y="1012" fill="#94A3B8" fontSize="9" fontWeight="700" fontFamily="Montserrat">
        SOUTHERN BLVD (SR 80)
      </text>

      {/* 4. Forest Hill Boulevard */}
      <line x1="380" y1="1110" x2="880" y2="1110" stroke="#475569" strokeWidth="2.5" opacity={0.6} />
      <text x="400" y="1104" fill="#64748B" fontSize="8" fontWeight="700" fontFamily="Montserrat">
        FOREST HILL BLVD
      </text>

      {/* 5. Military Trail (SR 809 - CRITICAL CRASH ARTERY) */}
      <line x1="650" y1="920" x2="650" y2="1460" stroke="#F59E0B" strokeWidth="7" />
      <line x1="650" y1="920" x2="650" y2="1460" stroke="#FEF3C7" strokeWidth="1.5" strokeDasharray="10 8" />
      <g transform="translate(635, 1050) rotate(-90)">
        <rect x="-60" y="-12" width="120" height="18" rx="3" fill="#0B132B" stroke="#F59E0B" strokeWidth="1" />
        <text x="0" y="2" fill="#FEF3C7" fontSize="9" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
          MILITARY TRAIL
        </text>
      </g>

      {/* 6. Cresthaven Boulevard (CRASH INTERSECTION ARTERY) */}
      <line x1="510" y1="1205" x2="840" y2="1205" stroke="#CBD5E1" strokeWidth="4" />
      <text x="535" y="1198" fill="#F8FAFC" fontSize="10" fontWeight="800" fontFamily="Montserrat">
        CRESTHAVEN BLVD
      </text>

      {/* 7. Lake Worth Road (SR 802) */}
      <line x1="420" y1="1310" x2="900" y2="1310" stroke="#64748B" strokeWidth="2.5" opacity={0.6} />
      <text x="430" y="1302" fill="#64748B" fontSize="8" fontWeight="700" fontFamily="Montserrat">
        LAKE WORTH RD (SR 802)
      </text>

      {/* --- PALM BEACH INTERNATIONAL AIRPORT (KPBI) DETAIL --- */}
      <g transform="translate(740, 950)">
        <polygon points="0,0 120,-10 130,80 10,70" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.2" />
        <line x1="10" y1="20" x2="115" y2="20" stroke="#F8FAFC" strokeWidth="3.5" />
        <line x1="30" y1="5" x2="95" y2="65" stroke="#F8FAFC" strokeWidth="2.5" />
        <line x1="20" y1="45" x2="105" y2="45" stroke="#94A3B8" strokeWidth="2" />
        <rect x="10" y="-22" width="105" height="18" rx="3" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="1" />
        <text x="62" y="-10" fill="#E0F2FE" fontSize="9" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
          KPBI AIRPORT
        </text>
      </g>

      {/* --- MAR-MAK COLONY MOBILE HOME PARK RESIDENTIAL COMMUNITY --- */}
      <g transform="translate(668, 1215)">
        <rect x="0" y="0" width="135" height="85" rx="5" fill="#1E293B" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="5 3" />
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={i} x1="10" y1={15 + i * 14} x2="125" y2={15 + i * 14} stroke="#475569" strokeWidth="1" strokeDasharray="3 2" />
        ))}
        {Array.from({ length: 6 }).map((_, j) => (
          <line key={j} x1={15 + j * 20} y1="10" x2={15 + j * 20} y2="75" stroke="#475569" strokeWidth="1" strokeDasharray="3 2" />
        ))}
        <rect x="10" y="90" width="145" height="20" rx="3" fill="#0F172A" stroke="#38BDF8" strokeWidth="1" />
        <text x="82" y="104" fill="#38BDF8" fontSize="9" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
          ~600 HOMES EVACUATED
        </text>
      </g>

      {/* --- N722BD TERMINAL UNCONTROLLED DIVE VECTOR --- */}
      <path
        d="M 260 990 Q 450 1080, 645 1205"
        fill="none"
        stroke="#EF4444"
        strokeWidth="4.5"
        filter="url(#impactRedGlow)"
        strokeDasharray="600"
        strokeDashoffset={600 * (1 - descentProgress)}
      />

      {/* Altitude Milestone Checkpoints */}
      <g>
        {/* 1. Final Transponder Ping */}
        <circle cx="260" cy="990" r="5" fill="#EF4444" />
        <rect x="180" y="960" width="140" height="20" rx="3" fill="#450A0A" stroke="#EF4444" strokeWidth="1" />
        <text x="250" y="974" fill="#FEE2E2" fontSize="8" fontWeight="800" fontFamily="Montserrat" textAnchor="middle">
          8,750 FT (LAST PING)
        </text>

        {/* 2. Critical Dive Over-speed */}
        {descentProgress > 0.4 && (
          <g>
            <circle cx="430" cy="1075" r="5" fill="#EF4444" />
            <rect x="350" y="1045" width="150" height="20" rx="3" fill="#450A0A" stroke="#EF4444" strokeWidth="1" />
            <text x="425" y="1059" fill="#FEE2E2" fontSize="8" fontWeight="800" fontFamily="Montserrat" textAnchor="middle">
              4,200 FT • 24,000 FPM
            </text>
          </g>
        )}

        {/* 3. Final Mayday Call */}
        {descentProgress > 0.75 && (
          <g>
            <circle cx="560" cy="1150" r="5" fill="#EF4444" />
            <rect x="490" y="1120" width="135" height="20" rx="3" fill="#450A0A" stroke="#EF4444" strokeWidth="1" />
            <text x="557" y="1134" fill="#FEE2E2" fontSize="8" fontWeight="800" fontFamily="Montserrat" textAnchor="middle">
              1,100 FT • MAYDAY!
            </text>
          </g>
        )}
      </g>

      {/* --- GROUND ZERO: IMPACT SITE AT EMPTY CORRIDOR LOT --- */}
      {descentProgress > 0.85 && (
        <g>
          {/* Concentric Detonation Shockwaves */}
          <circle cx="645" cy="1205" r={shockwavePulse} fill="none" stroke="#EF4444" strokeWidth="3" opacity={0.9} />
          <circle cx="645" cy="1205" r={shockwavePulse * 1.6} fill="none" stroke="#DC2626" strokeWidth="2" opacity={0.6} />
          <circle cx="645" cy="1205" r="9" fill="#DC2626" />
          <polygon points="645,1193 654,1205 645,1217 636,1205" fill="#FFFFFF" stroke="#EF4444" strokeWidth="1.5" />

          {/* Impact Placard Badge */}
          <g transform="translate(520, 1225)">
            <rect x="0" y="0" width="230" height="36" rx="5" fill="#450A0A" stroke="#EF4444" strokeWidth="2" />
            <text x="115" y="16" fill="#FEE2E2" fontSize="11" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.04em">
              CRASH SITE: 12:50 PM
            </text>
            <text x="115" y="29" fill="#FCA5A5" fontSize="9" fontWeight="800" fontFamily="Montserrat" textAnchor="middle">
              MILITARY TRL & CRESTHAVEN
            </text>
          </g>
        </g>
      )}

      {/* Moving Jet Dive Icon along Descent */}
      <g transform={`translate(${jetX}, ${jetY}) rotate(48)`}>
        <path d="M 0 -8 L 6 4 L 0 2 L -6 4 Z" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1" />
      </g>

      {/* Telemetry Header Badge */}
      <g transform="translate(350, 890)">
        <rect x="0" y="0" width="380" height="30" rx="6" fill="#0B132B" stroke="#38BDF8" strokeWidth="1.5" />
        <circle cx="20" cy="15" r="4" fill="#EF4444" />
        <text x="195" y="20" fill="#E0F2FE" fontSize="11" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.06em">
          PALM BEACH CO. TACTICAL APPROACH RADAR
        </text>
      </g>
    </svg>
  );
};

/**
 * SCENE 12: CRASH FIREBALL ORGANIC BLAST (6-LAYER ANATOMY)
 */
export const CrashFireballOrganicBlast: React.FC<{ durationFrames?: number }> = ({ durationFrames = 120 }) => {
  const frame = useCurrentFrame();
  const blastScale = interpolate(frame, [0, 20, durationFrames], [0.2, 1.15, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockRingR = interpolate(frame, [0, 30], [20, 480], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockRingOpacity = interpolate(frame, [0, 30], [1.0, 0.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Procedural multi-nested organic explosion lobes
  const outerCloud = createArcScallopedCloud(260, 14, [1.1, 0.9, 1.2, 0.85, 1.15, 1.0], frame * 0.05);
  const midCloud = createArcScallopedCloud(190, 12, [1.05, 0.95, 1.1, 0.9, 1.2], frame * 0.08);
  const innerCloud = createArcScallopedCloud(130, 10, [1.1, 0.9, 1.2, 0.95], frame * 0.1);
  const starFlash = create8PointedStarPath(110);

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      {/* LAYER 1: Ambient Volumetric Aura */}
      <FieryEmergencyAura cx={540} cy={1180} rx={500} ry={300} id="fireballMainAura" />

      {/* LAYER 2: Expanding Supersonic Shockwave Ring */}
      <circle
        cx="540"
        cy="1180"
        r={shockRingR}
        fill="none"
        stroke="#FEF3C7"
        strokeWidth="6"
        opacity={shockRingOpacity}
      />
      <circle
        cx="540"
        cy="1180"
        r={shockRingR * 0.85}
        fill="none"
        stroke="#F59E0B"
        strokeWidth="4"
        opacity={shockRingOpacity * 0.7}
      />

      <g transform={`translate(540, 1180) scale(${blastScale})`}>
        {/* LAYER 3: Acute Energy Spikes / Directional Flame Tongues */}
        {Array.from({ length: 8 }).map((_, i) => {
          const rot = i * 45 + Math.sin(frame * 0.3 + i) * 8;
          return (
            <polygon
              key={i}
              points="0,-320 -25,-180 25,-180"
              fill="#EF4444"
              opacity={0.85}
              transform={`rotate(${rot})`}
            />
          );
        })}

        {/* LAYER 4: Multi-Tiered Organic Body Geometry */}
        {/* Tier 4a: Dark Charcoal / Umber Outer Smoke Rim */}
        <path d={outerCloud} fill="#1C1917" stroke="#451A03" strokeWidth="6" />

        {/* Tier 4b: Crimson-Orange Mid Fireball Lobes */}
        <path d={midCloud} fill="#DC2626" stroke="#F59E0B" strokeWidth="5" />

        {/* Tier 4c: High-Temperature Bright Amber Inner Body */}
        <path d={innerCloud} fill="#FBBF24" stroke="#FEF08A" strokeWidth="4" />

        {/* LAYER 5: High-Contrast Core Flash Star */}
        <path d={starFlash} fill="#FFFFFF" stroke="#FEF9C3" strokeWidth="3" />

        {/* LAYER 6: Detached Orbiting Micro-Elements (Flying Shrapnel & Embers) */}
        {Array.from({ length: 16 }).map((_, i) => {
          const seed = i + 1;
          const dist = 220 + pseudoRandom(seed * 4) * 140;
          const angle = (seed * 22.5 + frame * (seed % 2 === 0 ? 0.8 : -0.8)) * (Math.PI / 180);
          const px = Math.cos(angle) * dist;
          const py = Math.sin(angle) * dist;
          return (
            <circle
              key={i}
              cx={px}
              cy={py}
              r={3 + pseudoRandom(seed * 7) * 4}
              fill={seed % 3 === 0 ? '#FFFFFF' : seed % 2 === 0 ? '#F59E0B' : '#DC2626'}
            />
          );
        })}
      </g>
    </svg>
  );
};

/**
 * SCENE 13: CASUALTY MANIFEST TALLY
 */
export const CasualtyManifestTally: React.FC<{ durationFrames?: number }> = ({ durationFrames = 121 }) => {
  const frame = useCurrentFrame();
  const soulsCount = Math.round(
    interpolate(frame, [0, 40], [0, 9], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <FieryEmergencyAura cx={540} cy={1180} color="#7F1D1D" id="casualtyAura" />

      {/* Tally Plaque Frame */}
      <g transform="translate(140, 920)">
        <rect x="0" y="0" width="800" height="520" rx="16" fill="#0F172A" stroke="#DC2626" strokeWidth="3.5" />
        <rect x="0" y="0" width="800" height="55" rx="16" fill="#450A0A" />
        <text x="400" y="36" fill="#FEE2E2" fontSize="18" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.08em">
          OFFICIAL PASSENGER & CREW RECORD
        </text>

        {/* 9 Silhouette Figures Arranged in Rows */}
        <g transform="translate(90, 90)">
          {Array.from({ length: 9 }).map((_, i) => {
            const row = Math.floor(i / 5);
            const col = i % 5;
            const active = i < soulsCount;
            return (
              <g key={i} transform={`translate(${col * 130}, ${row * 130})`}>
                {/* Person Silhouette Head & Shoulders */}
                <circle cx="35" cy="25" r="18" fill={active ? '#EF4444' : '#334155'} />
                <path
                  d="M 10 75 C 10 50, 60 50, 60 75 Z"
                  fill={active ? '#EF4444' : '#334155'}
                />
              </g>
            );
          })}
        </g>

        {/* Counter Pill Banner */}
        <g transform="translate(180, 390)">
          <rect x="0" y="0" width="440" height="85" rx="12" fill="#1C1917" stroke="#DC2626" strokeWidth="2.5" />
          <text x="220" y="35" fill="#94A3B8" fontSize="16" fontWeight="800" fontFamily="Montserrat" textAnchor="middle">
            SOULS LOST ON BOARD
          </text>
          <text x="220" y="74" fill="#EF4444" fontSize="38" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
            {soulsCount} FATALITIES • 0 GROUND
          </text>
        </g>
      </g>
    </svg>
  );
};

/**
 * SCENE 14: EMERGENCY SIRENS CONVOY
 */
export const EmergencySirensConvoy: React.FC<{ durationFrames?: number }> = ({ durationFrames = 134 }) => {
  const frame = useCurrentFrame();
  const sirenFlash = frame % 12 < 6;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <FieryEmergencyAura cx={540} cy={1180} color="#DC2626" id="sirensAura" />

      {/* Roadway Surface */}
      <line x1="100" y1="1380" x2="980" y2="1380" stroke="#475569" strokeWidth="8" />
      <line x1="100" y1="1395" x2="980" y2="1395" stroke="#F59E0B" strokeWidth="4" strokeDasharray="24 16" />

      {/* Palm Beach County Fire Rescue Engine */}
      <g transform="translate(240, 1080)">
        {/* Fire Truck Body */}
        <rect x="0" y="100" width="340" height="150" rx="8" fill="#DC2626" stroke="#991B1B" strokeWidth="3" />
        <rect x="0" y="100" width="100" height="80" fill="#FEF2F2" />
        <rect x="15" y="115" width="70" height="50" rx="4" fill="#0284C7" />

        {/* Equipment Compartments */}
        <rect x="120" y="130" width="80" height="100" rx="4" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="2" />
        <rect x="220" y="130" width="90" height="100" rx="4" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="2" />

        {/* Wheels */}
        <circle cx="70" cy="250" r="30" fill="#090D12" stroke="#64748B" strokeWidth="6" />
        <circle cx="270" cy="250" r="30" fill="#090D12" stroke="#64748B" strokeWidth="6" />

        {/* Top Emergency Lightbar (Alternating Red/Blue Strobe) */}
        <rect x="40" y="80" width="60" height="18" rx="4" fill="#1E293B" />
        <circle cx="50" cy="89" r="8" fill={sirenFlash ? '#EF4444' : '#1D4ED8'} />
        <circle cx="90" cy="89" r="8" fill={sirenFlash ? '#3B82F6' : '#DC2626'} />

        {/* Light Cones */}
        <polygon points="50,89 -80,-40 -20,-80" fill="#EF4444" opacity={sirenFlash ? 0.35 : 0.05} />
        <polygon points="90,89 220,-40 280,-80" fill="#3B82F6" opacity={sirenFlash ? 0.05 : 0.35} />

        <text x="170" y="125" fill="#FEF2F2" fontSize="13" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
          PALM BEACH FIRE RESCUE
        </text>
      </g>

      {/* Police Patrol Cruiser Following */}
      <g transform="translate(680, 1160)">
        <rect x="0" y="70" width="220" height="90" rx="8" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3" />
        <path d="M 40 70 L 70 30 L 160 30 L 190 70 Z" fill="#0284C7" opacity={0.8} />
        <circle cx="45" cy="160" r="22" fill="#090D12" stroke="#64748B" strokeWidth="4" />
        <circle cx="175" cy="160" r="22" fill="#090D12" stroke="#64748B" strokeWidth="4" />

        {/* Cruiser Strobe */}
        <rect x="95" y="16" width="40" height="14" rx="3" fill="#0F172A" />
        <circle cx="103" cy="23" r="6" fill={sirenFlash ? '#3B82F6' : '#EF4444'} />
        <circle cx="127" cy="23" r="6" fill={sirenFlash ? '#EF4444' : '#3B82F6'} />
      </g>
    </svg>
  );
};

/**
 * SCENE 15: FIRE COMMANDER PERIMETER (LONE LEADER)
 */
export const FireCommanderPerimeter: React.FC<{ durationFrames?: number }> = ({ durationFrames = 130 }) => {
  const frame = useCurrentFrame();

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <FieryEmergencyAura cx={540} cy={1180} color="#F59E0B" id="commanderAura" />

      {/* Incident Commander Silhouette in High-Vis Bunker Gear */}
      <g transform="translate(540, 1260)">
        {/* Firefighter Helmet */}
        <ellipse cx="0" cy="-210" rx="32" ry="22" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
        <path d="M -38 -205 Q 0 -225 38 -205 Q 45 -195 35 -190 L -35 -190 Z" fill="#D97706" />

        {/* Head & Neck */}
        <circle cx="0" cy="-185" r="16" fill="#0F172A" />

        {/* Torso & Bunker Coat */}
        <path
          d="M -75 -160 L 75 -160 L 95 0 L -95 0 Z"
          fill="#1C1917"
          stroke="#44403C"
          strokeWidth="3"
        />

        {/* Reflective Fluorescent Strips across chest */}
        <rect x="-80" y="-120" width="160" height="18" fill="#FACC15" />
        <rect x="-80" y="-95" width="160" height="10" fill="#E2E8F0" />
        <rect x="-88" y="-40" width="176" height="16" fill="#FACC15" />

        {/* Radio on Chest & Antenna */}
        <rect x="25" y="-130" width="28" height="40" rx="4" fill="#090D12" />
        <line x1="39" y1="-130" x2="39" y2="-175" stroke="#090D12" strokeWidth="3" />

        {/* Legs in Bunker Pants */}
        <rect x="-80" y="0" width="65" height="150" fill="#1C1917" />
        <rect x="15" y="0" width="65" height="150" fill="#1C1917" />
        <rect x="-80" y="90" width="65" height="16" fill="#FACC15" />
        <rect x="15" y="90" width="65" height="16" fill="#FACC15" />
      </g>

      {/* Perimeter Warning Tape across foreground */}
      <g transform="translate(0, 1420)">
        <polygon points="0,0 1080,20 1080,70 0,50" fill="#EAB308" />
        <text x="540" y="42" fill="#090D12" fontSize="22" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.1em">
          CRIME SCENE DO NOT CROSS • EVACUATION ZONE
        </text>
      </g>
    </svg>
  );
};

/**
 * SCENE 16: EVACUATION TALLY BOARD (600 RESIDENTS SAFE)
 */
export const EvacuationTallyBoard: React.FC<{ durationFrames?: number }> = ({ durationFrames = 135 }) => {
  const frame = useCurrentFrame();
  const evacuatedCount = Math.round(
    interpolate(frame, [0, 45], [0, 600], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <HighAltitudeAtmosphericAura cx={540} cy={1180} color="#10B981" id="evacAura" />

      {/* Community Protection Board */}
      <g transform="translate(140, 930)">
        <rect x="0" y="0" width="800" height="500" rx="16" fill="#064E3B" stroke="#059669" strokeWidth="3.5" />
        <rect x="0" y="0" width="800" height="55" rx="16" fill="#022C22" />
        <text x="400" y="36" fill="#A7F3D0" fontSize="18" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.08em">
          CIVILIAN EVACUATION CORRIDOR
        </text>

        {/* Mobile Home Silhouettes in Background */}
        <g transform="translate(70, 90)">
          {Array.from({ length: 4 }).map((_, i) => (
            <g key={i} transform={`translate(${i * 165}, 0)`}>
              <polygon points="70,0 135,35 5,35" fill="#0F172A" />
              <rect x="15" y="35" width="110" height="70" fill="#1E293B" stroke="#334155" strokeWidth="2" />
              <rect x="55" y="65" width="30" height="40" fill="#059669" />
            </g>
          ))}
        </g>

        {/* Counter Display Banner */}
        <g transform="translate(140, 270)">
          <rect x="0" y="0" width="520" height="150" rx="14" fill="#022C22" stroke="#10B981" strokeWidth="2.5" />
          <text x="260" y="45" fill="#6EE7B7" fontSize="19" fontWeight="800" fontFamily="Montserrat" textAnchor="middle">
            MOBILE HOME PARK RESIDENTS
          </text>
          <text x="260" y="115" fill="#34D399" fontSize="62" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
            {evacuatedCount}
          </text>
        </g>

        <text x="400" y="475" fill="#D1FAE5" fontSize="16" fontWeight="800" fontFamily="Montserrat" textAnchor="middle">
          SHELTERED AT CRESTHAVEN COMMUNITY CENTER
        </text>
      </g>
    </svg>
  );
};

/**
 * SCENE 17: NTSB VS FAA INVESTIGATION SPLIT
 */
export const NtsbVsFaaInvestigationSplit: React.FC<{ durationFrames?: number }> = ({ durationFrames = 109 }) => {
  const frame = useCurrentFrame();

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <HighAltitudeAtmosphericAura cx={540} cy={1180} color="#0284C7" id="ntsbAura" />

      {/* Diagonal Separation Axis */}
      <line x1="560" y1="880" x2="520" y2="1480" stroke="#F59E0B" strokeWidth="4" />

      {/* LEFT: National Transportation Safety Board (NTSB) */}
      <g transform="translate(180, 960)">
        <circle cx="160" cy="180" r="140" fill="#0F172A" stroke="#1E40AF" strokeWidth="6" />
        <circle cx="160" cy="180" r="120" fill="#1E3A8A" />

        {/* Federal American Eagle Crest */}
        <polygon points="160,110 135,160 185,160" fill="#F59E0B" />
        <path d="M 110 160 Q 160 145 210 160 L 195 210 Q 160 225 125 210 Z" fill="#F8FAFC" />
        <polygon points="160,195 140,240 180,240" fill="#F59E0B" />

        <rect x="70" y="340" width="180" height="32" rx="6" fill="#172554" stroke="#60A5FA" strokeWidth="2" />
        <text x="160" y="362" fill="#DBEAFE" fontSize="16" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
          NTSB GO-TEAM
        </text>
      </g>

      {/* RIGHT: Federal Aviation Administration (FAA) */}
      <g transform="translate(620, 960)">
        <circle cx="160" cy="180" r="140" fill="#0F172A" stroke="#0284C7" strokeWidth="6" />
        <circle cx="160" cy="180" r="120" fill="#0369A1" />

        {/* FAA Winged Propeller Seal */}
        <ellipse cx="160" cy="180" rx="28" ry="28" fill="#F59E0B" />
        <polygon points="160,180 80,150 70,170" fill="#F8FAFC" />
        <polygon points="160,180 240,150 250,170" fill="#F8FAFC" />
        <polygon points="160,180 160,260 175,260" fill="#F8FAFC" />

        <rect x="70" y="340" width="180" height="32" rx="6" fill="#082F49" stroke="#38BDF8" strokeWidth="2" />
        <text x="160" y="362" fill="#E0F2FE" fontSize="16" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
          FAA SAFETY
        </text>
      </g>
    </svg>
  );
};

/**
 * SCENE 18: SMOKING CRATER FORENSICS
 */
export const SmokingCraterForensics: React.FC<{ durationFrames?: number }> = ({ durationFrames = 123 }) => {
  const frame = useCurrentFrame();

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <FieryEmergencyAura cx={540} cy={1180} color="#78350F" id="craterAura" />

      {/* Ground Level Crater */}
      <g transform="translate(540, 1260)">
        {/* Deep Impact Crater Depression */}
        <ellipse cx="0" cy="0" rx="380" ry="120" fill="#090D12" stroke="#451A03" strokeWidth="6" />
        <ellipse cx="0" cy="10" rx="300" ry="80" fill="#1C1917" />
        <ellipse cx="0" cy="20" rx="180" ry="45" fill="#020617" />

        {/* Rising Smoke Wisps */}
        {Array.from({ length: 6 }).map((_, i) => {
          const offX = -120 + i * 48;
          const smokeRise = (frame * 2.5 + i * 35) % 180;
          const smokeOpacity = interpolate(smokeRise, [0, 80, 180], [0, 0.6, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <ellipse
              key={i}
              cx={offX + Math.sin(frame * 0.1 + i) * 15}
              cy={-smokeRise}
              rx={25 + i * 4}
              ry={18 + i * 3}
              fill="#78716C"
              opacity={smokeOpacity}
            />
          );
        })}

        {/* Scattered Aircraft Debris Shards */}
        <polygon points="-160,20 -120,-10 -100,15" fill="#94A3B8" />
        <polygon points="120,30 160,10 180,45" fill="#E2E8F0" />
        <polygon points="30,-20 70,-40 60,-5" fill="#CBD5E1" />

        {/* Forensic Evidence Number Markers */}
        {[
          { x: -140, y: -40, num: '1' },
          { x: 10, y: -60, num: '2' },
          { x: 150, y: -20, num: '3' },
        ].map((m, idx) => (
          <g key={idx} transform={`translate(${m.x}, ${m.y})`}>
            <polygon points="0,0 24,-36 48,0" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
            <text x="24" y="-10" fill="#090D12" fontSize="16" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
              {m.num}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

/**
 * SCENE 19: SECRETARY DUFFY STATEMENT QUOTE
 */
export const SecretaryDuffyStatementQuote: React.FC<{ durationFrames?: number }> = ({ durationFrames = 129 }) => {
  const frame = useCurrentFrame();

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <HighAltitudeAtmosphericAura cx={540} cy={1180} color="#0284C7" id="duffyAura" />

      {/* Official Government Briefing Placard */}
      <g transform="translate(140, 940)">
        <rect x="0" y="0" width="800" height="460" rx="16" fill="#0F172A" stroke="#3B82F6" strokeWidth="3" />
        <rect x="0" y="0" width="800" height="55" rx="16" fill="#1E3A8A" />

        <text x="400" y="36" fill="#DBEAFE" fontSize="17" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.08em">
          UNITED STATES DEPARTMENT OF TRANSPORTATION
        </text>

        {/* Quote Body */}
        <text x="400" y="180" fill="#F8FAFC" fontSize="34" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
          "A HORRIFIC AND DEVASTATING"
        </text>
        <text x="400" y="235" fill="#EF4444" fontSize="36" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
          "AVIATION TRAGEDY."
        </text>
        <text x="400" y="300" fill="#94A3B8" fontSize="22" fontWeight="700" fontFamily="Montserrat" textAnchor="middle">
          FULL FEDERAL INVESTIGATION UNDERWAY
        </text>

        {/* Attribution Pill */}
        <g transform="translate(200, 370)">
          <rect x="0" y="0" width="400" height="38" rx="8" fill="#1E293B" stroke="#60A5FA" strokeWidth="1.5" />
          <text x="200" y="25" fill="#FEF2F2" fontSize="15" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
            SEAN DUFFY • US TRANSPORTATION SEC.
          </text>
        </g>
      </g>
    </svg>
  );
};

/**
 * SCENE 20: BLACK BOX RECOVERY DOSSIER
 */
export const BlackBoxRecoveryDossier: React.FC<{ durationFrames?: number }> = ({ durationFrames = 140 }) => {
  const frame = useCurrentFrame();

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <HighAltitudeAtmosphericAura cx={540} cy={1180} color="#F59E0B" id="blackBoxAura" />

      {/* Forensic Examination Stage */}
      <g transform="translate(340, 980)">
        {/* Fluorescent Safety Orange Flight Data Recorder (FDR) */}
        <rect x="20" y="60" width="220" height="130" rx="12" fill="#EA580C" stroke="#C2410C" strokeWidth="4" />
        <rect x="40" y="80" width="180" height="90" fill="#C2410C" />

        {/* Underwater Locator Beacon (ULB) Cylinder */}
        <rect x="240" y="90" width="60" height="70" rx="10" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="3" />
        <text x="270" y="132" fill="#090D12" fontSize="11" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
          BEACON
        </text>

        {/* Handle / Mounting Bracket */}
        <path d="M 40 60 L 40 30 L 220 30 L 220 60" fill="none" stroke="#7C2D12" strokeWidth="8" />

        {/* Caution Labels */}
        <rect x="50" y="95" width="160" height="24" fill="#090D12" />
        <text x="130" y="112" fill="#FEF2F2" fontSize="12" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
          FLIGHT RECORDER
        </text>
        <rect x="50" y="130" width="160" height="24" fill="#090D12" />
        <text x="130" y="147" fill="#FEF2F2" fontSize="12" fontWeight="900" fontFamily="Montserrat" textAnchor="middle">
          DO NOT OPEN
        </text>
      </g>

      {/* Forensic Lab Analysis Seal */}
      <g transform="translate(300, 1370)">
        <rect x="0" y="0" width="480" height="48" rx="8" fill="#1C1917" stroke="#EA580C" strokeWidth="2" />
        <text x="240" y="31" fill="#FFEDD5" fontSize="17" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.05em">
          NTSB VEHICLE RECORDER LAB • WASHINGTON D.C.
        </text>
      </g>
    </svg>
  );
};

/**
 * SCENE 21: FLORIDA CRASH MEMORIAL PLINTH (SOMBER MEMORIAL)
 */
export const FloridaCrashMemorialPlinth: React.FC<{ durationFrames?: number }> = ({ durationFrames = 141 }) => {
  const frame = useCurrentFrame();

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <HighAltitudeAtmosphericAura cx={540} cy={1180} color="#F59E0B" id="memorialAura" />

      {/* Somber Granite Plinth */}
      <g transform="translate(540, 1260)">
        {/* Base Steps */}
        <polygon points="-380,120 380,120 340,60 -340,60" fill="#0F172A" />
        <polygon points="-320,60 320,60 280,0 -280,0" fill="#1E293B" />
        <rect x="-240" y="-120" width="480" height="120" fill="#090D12" stroke="#334155" strokeWidth="3" />

        {/* Inscription on Plinth */}
        <text x="0" y="-65" fill="#F8FAFC" fontSize="22" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.08em">
          IN MEMORY OF THE NINE SOULS
        </text>
        <text x="0" y="-30" fill="#F59E0B" fontSize="17" fontWeight="800" fontFamily="Montserrat" textAnchor="middle">
          NOVEMBER 1, 2026 • PALM BEACH COUNTY
        </text>

        {/* 9 Memorial Candles with Soft Glowing Flames */}
        <g transform="translate(-200, -120)">
          {Array.from({ length: 9 }).map((_, i) => {
            const flicker = Math.sin(frame * 0.2 + i * 1.3) * 3;
            return (
              <g key={i} transform={`translate(${i * 50}, 0)`}>
                {/* White Candle Pillar */}
                <rect x="0" y="-45" width="16" height="45" fill="#E2E8F0" rx="2" />
                {/* Wick */}
                <line x1="8" y1="-45" x2="8" y2="-52" stroke="#090D12" strokeWidth="2" />
                {/* Candle Flame Glow */}
                <ellipse cx="8" cy={-62 + flicker} rx="8" ry="14" fill="#F59E0B" opacity={0.9} />
                <ellipse cx="8" cy={-60 + flicker} rx="4" ry="8" fill="#FEF08A" />
              </g>
            );
          })}
        </g>

        {/* Black Mourning Ribbon */}
        <g transform="translate(0, 40)">
          <path d="M -25 -20 Q 0 -60 25 -20 L 35 25 L 0 5 L -35 25 Z" fill="#020617" stroke="#475569" strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
};

/**
 * SCENE 22: SYMMETRIC REEL LOOP HERO
 */
export const SymmetricReelLoopHero: React.FC<{ durationFrames?: number }> = ({ durationFrames = 140 }) => {
  const frame = useCurrentFrame();
  const climbY = interpolate(frame, [0, durationFrames], [20, -40], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <HighAltitudeAtmosphericAura cx={540} cy={1160} color="#F59E0B" id="loopAura" />

      {/* Learjet 60 Climbing Into High Sunset Sky */}
      <g transform={`translate(540, ${1180 + climbY}) rotate(-18) translate(-540, -1180)`}>
        {/* Contrail Streams Glowing in Sunset */}
        <line x1="285" y1="1132" x2="20" y2="1132" stroke="#F59E0B" strokeWidth="5" opacity={0.7} />

        {/* T-Tail */}
        <path
          d="M 380 1125 C 345 1118, 305 1090, 275 988 L 225 988 L 265 1145 L 320 1135 Z"
          fill="#0F172A"
          stroke="#F59E0B"
          strokeWidth="2"
        />
        <ellipse cx="255" cy="988" rx="36" ry="8" fill="#F59E0B" />
        <path d="M 210 990 L 315 984 L 305 978 L 195 984 Z" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5" />

        {/* Full Aerodynamic Fuselage Profile with Cabin Roof */}
        <path
          d="M 890 1165 
             C 860 1152, 835 1146, 815 1142
             L 755 1125
             C 680 1124, 480 1124, 380 1125
             C 330 1127, 275 1146, 230 1164
             C 230 1168, 250 1182, 320 1196
             C 380 1205, 450 1205, 520 1205
             L 800 1205
             C 840 1200, 875 1182, 890 1165
             Z"
          fill="#0F172A"
          stroke="#F59E0B"
          strokeWidth="3"
        />
        {/* Cockpit Canopy */}
        <path d="M 812 1144 L 755 1127 L 760 1147 L 808 1149 Z" fill="#F59E0B" />

        {/* Wings with Gold Horizon Rim Light */}
        <path d="M 640 1205 L 380 1270 L 368 1262 L 525 1195 Z" fill="#1E293B" stroke="#F59E0B" strokeWidth="2" />
        <path d="M 378 1270 L 388 1222 L 396 1224 L 384 1271 Z" fill="#F59E0B" />

        {/* Engine Nacelle */}
        <rect x="288" y="1118" width="106" height="28" rx="10" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
        <ellipse cx="286" cy="1132" rx="3" ry="7" fill="#EF4444" />
      </g>

      {/* Seamless Loop CTA Tag */}
      <g transform="translate(340, 1420)">
        <rect x="0" y="0" width="400" height="42" rx="8" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
        <text x="200" y="27" fill="#FEF3C7" fontSize="16" fontWeight="900" fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.08em">
          N722BD • FINAL INVESTIGATION REPORT
        </text>
      </g>
    </svg>
  );
};

/**
 * SCENE 14 (CONCLUDING TITLE CARD): NTSB PRIMARY FINDING CARD
 * Official docket summary of the National Transportation Safety Board's primary finding
 */
export const NtsbPrimaryFindingCard: React.FC<{ durationFrames?: number }> = ({ durationFrames = 162 }) => {
  const frame = useCurrentFrame();
  const cardScale = interpolate(frame, [0, 20], [0.96, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const glowPulse = Math.sin(frame * 0.1) * 0.15 + 0.85;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <defs>
        <radialGradient id="ntsbFindingAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0284C7" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#0F172A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#090D12" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="docketBorderGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>

      {/* Atmospheric Background Glow */}
      <circle cx={540} cy={1180} r={460} fill="url(#ntsbFindingAura)" opacity={glowPulse} />

      {/* Main Forensic Dossier Card Container */}
      <g transform={`translate(540, 1180) scale(${cardScale}) translate(-540, -1180)`}>
        {/* Shadow Plate */}
        <rect x={124} y={874} width={832} height={592} rx={20} fill="#090D12" opacity={0.8} />

        {/* Card Body */}
        <rect
          x={120}
          y={870}
          width={840}
          height={600}
          rx={18}
          fill="#0F172A"
          stroke="url(#docketBorderGrad)"
          strokeWidth={3}
        />

        {/* Top Header Bar */}
        <rect x={120} y={870} width={840} height={70} rx={18} fill="#1E293B" />
        <rect x={120} y={920} width={840} height={20} fill="#1E293B" />
        <line x1={120} y1={940} x2={960} y2={940} stroke="#38BDF8" strokeWidth={2} opacity={0.6} />

        {/* Official Eagle Seal Silhouette Emblem */}
        <g transform="translate(155, 885)">
          <circle cx={25} cy={25} r={22} fill="#0284C7" opacity={0.3} />
          <circle cx={25} cy={25} r={20} fill="none" stroke="#38BDF8" strokeWidth={2} />
          {/* Stylized Federal Crest */}
          <path d="M 25 10 L 32 20 L 42 22 L 34 30 L 37 40 L 25 33 L 13 40 L 16 30 L 8 22 L 18 20 Z" fill="#F8FAFC" />
        </g>

        {/* Header Text */}
        <text
          x={220}
          y={912}
          fill="#F8FAFC"
          fontSize={20}
          fontWeight={900}
          fontFamily="Montserrat"
          letterSpacing="0.08em"
        >
          NATIONAL TRANSPORTATION SAFETY BOARD
        </text>
        <text
          x={220}
          y={932}
          fill="#94A3B8"
          fontSize={12}
          fontWeight={800}
          fontFamily="Montserrat"
          letterSpacing="0.12em"
        >
          ACCIDENT INVESTIGATION DOCKET // FINAL PROBABLE CAUSE
        </text>

        {/* Case Reference Stamp */}
        <g transform="translate(680, 888)">
          <rect x={0} y={0} width={250} height={34} rx={6} fill="#7F1D1D" stroke="#EF4444" strokeWidth={1.5} />
          <text
            x={125}
            y={22}
            fill="#FEF2F2"
            fontSize={12}
            fontWeight={900}
            fontFamily="Montserrat"
            textAnchor="middle"
            letterSpacing="0.06em"
          >
            REPORT: NTSB-AAR-26/02
          </text>
        </g>

        {/* Primary Determination Title Box */}
        <g transform="translate(160, 970)">
          <rect x={0} y={0} width={760} height={150} rx={12} fill="#1E293B" stroke="#475569" strokeWidth={1.5} />
          
          <text
            x={30}
            y={38}
            fill="#F59E0B"
            fontSize={14}
            fontWeight={900}
            fontFamily="Montserrat"
            letterSpacing="0.14em"
          >
            PRIMARY CAUSAL FACTOR DETERMINATION
          </text>

          {/* Core Finding Statement */}
          <text
            x={30}
            y={82}
            fill="#FEF2F2"
            fontSize={30}
            fontWeight={900}
            fontFamily="Montserrat"
            letterSpacing="0.04em"
          >
            UNCOMMANDED TRIM RUNAWAY
          </text>

          <text
            x={30}
            y={122}
            fill="#EF4444"
            fontSize={18}
            fontWeight={800}
            fontFamily="Montserrat"
            letterSpacing="0.06em"
          >
            HORIZONTAL STABILIZER DRIVE FAILURE • CATASTROPHIC DIVE
          </text>
        </g>

        {/* Technical Analysis Grid */}
        <g transform="translate(160, 1145)">
          {/* Box 1: Pitch Trim Actuator */}
          <rect x={0} y={0} width={365} height={120} rx={10} fill="#182234" stroke="#334155" strokeWidth={1.5} />
          <text x={20} y={32} fill="#94A3B8" fontSize={12} fontWeight={800} fontFamily="Montserrat" letterSpacing="0.08em">
            COMPONENT ANALYSIS
          </text>
          <text x={20} y={62} fill="#F8FAFC" fontSize={18} fontWeight={900} fontFamily="Montserrat">
            PITCH TRIM ACTUATOR
          </text>
          <text x={20} y={92} fill="#38BDF8" fontSize={13} fontWeight={800} fontFamily="Montserrat">
            Continuous Full Nose-Down Deflection
          </text>

          {/* Box 2: Recovery Margin */}
          <rect x={395} y={0} width={365} height={120} rx={10} fill="#182234" stroke="#334155" strokeWidth={1.5} />
          <text x={415} y={32} fill="#94A3B8" fontSize={12} fontWeight={800} fontFamily="Montserrat" letterSpacing="0.08em">
            CREW RECOVERY WINDOW
          </text>
          <text x={415} y={62} fill="#EF4444" fontSize={18} fontWeight={900} fontFamily="Montserrat">
            AERODYNAMIC OVERRIDE IMPOSSIBLE
          </text>
          <text x={415} y={92} fill="#FCA5A5" fontSize={13} fontWeight={800} fontFamily="Montserrat">
            Full Control Column Deflection Overpowered
          </text>
        </g>

        {/* Stabilizer Position Telemetry Waveform */}
        <g transform="translate(160, 1285)">
          <rect x={0} y={0} width={760} height={105} rx={8} fill="#090D12" stroke="#1E293B" strokeWidth={1.5} />
          
          {/* Grid lines */}
          <line x1={30} y1={25} x2={730} y2={25} stroke="#1E293B" strokeWidth={1} strokeDasharray="4 4" />
          <line x1={30} y1={55} x2={730} y2={55} stroke="#1E293B" strokeWidth={1} strokeDasharray="4 4" />
          <line x1={30} y1={85} x2={730} y2={85} stroke="#1E293B" strokeWidth={1} strokeDasharray="4 4" />

          {/* Graph Legend */}
          <text x={30} y={20} fill="#64748B" fontSize={11} fontWeight={800} fontFamily="Montserrat">
            FLIGHT RECORDER TELEMETRY • STABILIZER ANGLE (DEGREES)
          </text>

          {/* Normal Flight Level Line */}
          <path
            d="M 30 50 L 280 50 L 320 52 L 350 90 L 730 90"
            fill="none"
            stroke="#EF4444"
            strokeWidth={3}
          />
          <circle cx={350} cy={90} r={4} fill="#EF4444" />
          <text x={360} y={80} fill="#EF4444" fontSize={11} fontWeight={900} fontFamily="Montserrat">
            RUNAWAY ONSET (-8.5°)
          </text>
        </g>

        {/* Official Board Seal Verification Footnote */}
        <g transform="translate(160, 1410)">
          <text x={380} y={24} fill="#94A3B8" fontSize={12} fontWeight={800} fontFamily="Montserrat" textAnchor="middle" letterSpacing="0.08em">
            OFFICIAL ADOPTION: NATIONAL TRANSPORTATION SAFETY BOARD • ALL 9 SOULS REMEMBERED
          </text>
        </g>
      </g>
    </svg>
  );
};
