import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { loadFont as loadBlackOpsOne } from '@remotion/google-fonts/BlackOpsOne';
import { loadFont as loadBarlowCondensed } from '@remotion/google-fonts/BarlowCondensed';
import { loadFont as loadCourierPrime } from '@remotion/google-fonts/CourierPrime';

const blackOps = loadBlackOpsOne();
const barlow = loadBarlowCondensed();
const courier = loadCourierPrime();

// ==========================================
// 1. HIGH-FIDELITY LOCKHEED T-33A JET VECTOR
// ==========================================
export const T33JetSilhouette: React.FC<{
  scale?: number;
  showAfterburner?: boolean;
  angle?: number;
  highlightControls?: boolean;
  showInstructor?: boolean;
}> = ({ scale = 1, showAfterburner = true, angle = 0, highlightControls = false, showInstructor = true }) => {
  const frame = useCurrentFrame();
  const flameJitter = Math.sin(frame * 1.5) * 6;

  return (
    <g transform={`rotate(${angle}) scale(${scale})`}>
      {/* Jet Exhaust & Afterburner Flame */}
      {showAfterburner && (
        <g transform="translate(-160, 48)">
          <polygon
            points={`0,${16 + flameJitter} -180,${24} 0,${32 - flameJitter}`}
            fill="#F4B942"
            opacity={0.85 + 0.15 * Math.sin(frame)}
          />
          <polygon
            points={`0,${19 + flameJitter * 0.5} -110,${24} 0,${29 - flameJitter * 0.5}`}
            fill="#E63946"
          />
          <ellipse cx="-40" cy="24" rx="20" ry="8" fill="#FFF" opacity="0.9" />
        </g>
      )}

      {/* Main Fuselage Body Silhouette */}
      <path
        d="M -160 42 L -90 38 L 40 28 L 220 20 L 380 20 L 520 28 L 680 42 L 780 50 L 860 62 L 780 72 L 640 84 L 460 92 L 180 92 L -40 88 L -140 76 L -160 68 Z"
        fill="#0A0D12"
        stroke="#1E2836"
        strokeWidth="3"
      />

      {/* Nose Pitot Tube */}
      <line x1="860" y1="62" x2="930" y2="62" stroke="#5BC0BE" strokeWidth="4" />

      {/* Low-Mounted Swept Wing & Wingtip Fuel Tank */}
      <path
        d="M 320 86 L 240 210 L 410 220 L 490 88 Z"
        fill="#07090C"
        stroke="#1E2836"
        strokeWidth="2.5"
      />
      {/* Cylindrical Tip Tank */}
      <ellipse cx="325" cy="215" rx="100" ry="24" fill="#0E131A" stroke="#5BC0BE" strokeWidth="2" />
      <polygon points="425,215 445,210 445,220" fill="#E63946" />

      {/* Vertical Tail Fin & Rudder */}
      <path
        d="M -120 40 L -60 -120 L 20 -120 L 4 -20 L 20 30 Z"
        fill="#0B0E14"
        stroke="#1E2836"
        strokeWidth="3"
      />
      {/* Horizontal Stabilizer */}
      <polygon points="-110,18 -180,-8 -120,-8 -70,22" fill="#0A0D12" stroke="#1E2836" strokeWidth="2" />

      {/* Tandem Bubble Canopy Glass */}
      <path
        d="M 330 20 C 370 -48, 590 -48, 640 24 Z"
        fill="#121C26"
        stroke="#5BC0BE"
        strokeWidth="3.5"
      />
      {/* Canopy Glare Highlight Streak */}
      <path
        d="M 380 12 C 410 -28, 560 -28, 600 16"
        fill="none"
        stroke="#5BC0BE"
        strokeWidth="3"
        strokeDasharray="140 40"
        opacity="0.6"
      />
      {/* Canopy Middle Arch Divider */}
      <line x1="485" y1="-32" x2="495" y2="24" stroke="#0A0D12" strokeWidth="8" />

      {/* Front Cockpit Pilot: Rashid Minhas (Helmet Visor & Oxygen Mask) */}
      <g transform="translate(545, -2)">
        <circle cx="0" cy="0" r="22" fill="#050709" stroke="#E63946" strokeWidth="2" />
        <path d="M 6 -6 Q 16 0 14 10 L 6 12 Z" fill="#5BC0BE" opacity="0.9" /> {/* Visor */}
        <rect x="-18" y="16" width="36" height="24" fill="#0A0D12" rx="4" />
      </g>

      {/* Rear Cockpit Pilot: Matiur Rahman (Instructor silhouette) */}
      {showInstructor && (
        <g transform="translate(425, -2)">
          <circle cx="0" cy="0" r="22" fill="#050709" stroke="#5BC0BE" strokeWidth="1.5" />
          <path d="M 6 -6 Q 16 0 14 10 L 6 12 Z" fill="#3D4B5C" />
          <rect x="-18" y="16" width="36" height="24" fill="#0A0D12" rx="4" />
        </g>
      )}

      {/* Mechanically Linked Control Rods (Red Dashed Line) */}
      {highlightControls && (
        <g>
          <line
            x1="430"
            y1="34"
            x2="550"
            y2="34"
            stroke="#E63946"
            strokeWidth="8"
            strokeDasharray="12 8"
          />
          <circle cx="430" cy="34" r="8" fill="#E63946" />
          <circle cx="550" cy="34" r="8" fill="#E63946" />
        </g>
      )}

      {/* Engine Air Intake Scoop */}
      <path d="M 520 45 C 500 50, 470 70, 480 82 L 530 82 Z" fill="#040608" stroke="#1E2836" strokeWidth="2" />

      {/* PAF Green Roundel On Rear Fuselage */}
      <g transform="translate(140, 56) scale(0.65)">
        <circle r="28" fill="#01411C" stroke="#F8F9FA" strokeWidth="4" />
        <circle r="16" fill="#F8F9FA" />
        <circle r="7" fill="#01411C" />
      </g>
    </g>
  );
};

// ==========================================
// 2. TECHNICAL COCKPIT BLUEPRINT SCHEMATIC
// ==========================================
export const T33BlueprintCallout: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.08 * Math.sin(frame / 3.5);

  return (
    <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
      {/* Precision Blueprint Grid & Coordinate System */}
      <defs>
        <pattern id="technicalGrid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#132030" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="1.5" fill="#5BC0BE" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="1080" height="1920" fill="url(#technicalGrid)" />

      {/* Corner Technical Frame Reticles */}
      <g stroke="#5BC0BE" strokeWidth="2" fill="none" opacity="0.6">
        <path d="M 60 120 L 60 60 L 120 60" />
        <path d="M 960 60 L 1020 60 L 1020 120" />
        <path d="M 60 1800 L 60 1860 L 120 1860" />
        <path d="M 960 1860 L 1020 1860 L 1020 1800" />
      </g>

      {/* Header Context Divider Line */}
      <g transform="translate(540, 290)">
        <line x1="-420" y1="0" x2="420" y2="0" stroke="#5BC0BE" strokeWidth="2" strokeDasharray="16 10" opacity="0.4" />
      </g>

      {/* Center Large T-33 Side Profile Jet Illustration */}
      <g transform="translate(110, 800) scale(0.95)">
        <T33JetSilhouette scale={1.05} showAfterburner={false} highlightControls={true} />

        {/* Dimension Leader Lines */}
        <line x1="220" y1="280" x2="680" y2="280" stroke="#5BC0BE" strokeWidth="2" strokeDasharray="6 6" />
        <text x="450" y="315" textAnchor="middle" fill="#5BC0BE" fontFamily="'Barlow Condensed', sans-serif" fontSize="24" letterSpacing="3">
          COCKPIT BAY SPAN: 3.42 METERS
        </text>
      </g>

      {/* Pin 1: Front Cockpit Minhas */}
      <g transform="translate(620, 680)">
        <line x1="0" y1="0" x2="60" y2="-42" stroke="#E63946" strokeWidth="3" />
        <g transform={`translate(60, -42) scale(${pulse})`}>
          <circle r="30" fill="#E63946" stroke="#FFF" strokeWidth="3" />
          <text y="10" textAnchor="middle" fill="#FFF" fontFamily="'Black Ops One', sans-serif" fontSize="30">1</text>
        </g>
      </g>

      {/* Pin 2: Rear Cockpit Rahman */}
      <g transform="translate(500, 680)">
        <line x1="0" y1="0" x2="-40" y2="-42" stroke="#E63946" strokeWidth="3" />
        <g transform={`translate(-40, -42) scale(${pulse})`}>
          <circle r="30" fill="#E63946" stroke="#FFF" strokeWidth="3" />
          <text y="10" textAnchor="middle" fill="#FFF" fontFamily="'Black Ops One', sans-serif" fontSize="30">2</text>
        </g>
      </g>

      {/* Pin 3: Mechanically Linked Flight Control Rods */}
      <g transform="translate(570, 930)">
        <line x1="0" y1="0" x2="0" y2="70" stroke="#E63946" strokeWidth="3" />
        <g transform={`translate(0, 100) scale(${pulse})`}>
          <circle r="30" fill="#E63946" stroke="#FFF" strokeWidth="3" />
          <text y="10" textAnchor="middle" fill="#FFF" fontFamily="'Black Ops One', sans-serif" fontSize="30">3</text>
        </g>
      </g>

      {/* Structured Technical Callout Cards in Lower Third */}
      <g transform="translate(100, 1160)">
        {/* Card 1 */}
        <g transform="translate(0, 0)">
          <rect width="880" height="90" fill="#0C141E" stroke="#25384D" strokeWidth="2" rx="8" />
          <circle cx="50" cy="45" r="22" fill="#E63946" />
          <text x="50" y="53" textAnchor="middle" fill="#FFF" fontFamily="'Black Ops One', sans-serif" fontSize="22">1</text>
          <text x="95" y="40" fill="#F8F9FA" fontFamily="'Barlow Condensed', sans-serif" fontSize="32" fontWeight="900" letterSpacing="1">
            FRONT SEAT: PILOT OFFICER RASHID MINHAS
          </text>
          <text x="95" y="70" fill="#5BC0BE" fontFamily="'Barlow Condensed', sans-serif" fontSize="24" letterSpacing="2">
            20 YEARS OLD • 2ND SOLO FLIGHT • NO. 2 SQUADRON
          </text>
        </g>

        {/* Card 2 */}
        <g transform="translate(0, 115)">
          <rect width="880" height="90" fill="#0C141E" stroke="#25384D" strokeWidth="2" rx="8" />
          <circle cx="50" cy="45" r="22" fill="#E63946" />
          <text x="50" y="53" textAnchor="middle" fill="#FFF" fontFamily="'Black Ops One', sans-serif" fontSize="22">2</text>
          <text x="95" y="40" fill="#F8F9FA" fontFamily="'Barlow Condensed', sans-serif" fontSize="32" fontWeight="900" letterSpacing="1">
            REAR SEAT: FLT. LT. MATIUR RAHMAN
          </text>
          <text x="95" y="70" fill="#E63946" fontFamily="'Barlow Condensed', sans-serif" fontSize="24" letterSpacing="2">
            INSTRUCTOR PILOT • UNSEATED HIJACK OVERRIDE
          </text>
        </g>

        {/* Card 3 */}
        <g transform="translate(0, 230)">
          <rect width="880" height="90" fill="#0C141E" stroke="#E63946" strokeWidth="2.5" rx="8" />
          <circle cx="50" cy="45" r="22" fill="#E63946" />
          <text x="50" y="53" textAnchor="middle" fill="#FFF" fontFamily="'Black Ops One', sans-serif" fontSize="22">3</text>
          <text x="95" y="40" fill="#F8F9FA" fontFamily="'Barlow Condensed', sans-serif" fontSize="32" fontWeight="900" letterSpacing="1">
            MECHANICALLY LINKED DUAL CONTROLS
          </text>
          <text x="95" y="70" fill="#F4B942" fontFamily="'Barlow Condensed', sans-serif" fontSize="24" letterSpacing="2">
            CANNOT DISCONNECT HYDRAULICALLY • PHYSICAL STRUGGLE
          </text>
        </g>
      </g>
    </svg>
  );
};

// ==========================================
// 3. TACTICAL SINDH MAP & TOPOGRAPHY
// ==========================================
export const SindhBorderTelemetry: React.FC<{ durationFrames: number }> = ({ durationFrames }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, durationFrames * 0.85], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Curved Bezier Flight path from Karachi (240, 780) to Sujawal (720, 960)
  const jetX = interpolate(progress, [0, 1], [240, 720]);
  const jetY = interpolate(progress, [0, 1], [780, 960]) + Math.sin(progress * Math.PI) * -50;
  const radarSweep = (frame * 3.5) % 360;

  return (
    <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
      {/* Topographic Contour Elevation Waves */}
      <g stroke="#1F2F28" strokeWidth="2" fill="none" opacity="0.45">
        <path d="M 0 520 Q 300 480 600 540 T 1080 500" />
        <path d="M 0 640 Q 360 610 720 660 T 1080 620" />
        <path d="M 0 760 Q 280 720 620 780 T 1080 740" />
        <path d="M 0 880 Q 420 840 760 900 T 1080 860" />
        <path d="M 0 1000 Q 320 960 680 1020 T 1080 980" />
        <path d="M 0 1120 Q 260 1080 580 1140 T 1080 1100" />
      </g>

      {/* Arabian Sea Coastline & Indus River Delta Silhouette */}
      <path
        d="M 0 980 C 120 940, 200 890, 240 850 C 310 780, 220 700, 140 680 L 0 680 Z"
        fill="#07121E"
        stroke="#1A334E"
        strokeWidth="3"
      />
      <text x="70" y="770" fill="#254A70" fontFamily="'Barlow Condensed', sans-serif" fontSize="26" letterSpacing="4" fontWeight="700">
        ARABIAN SEA
      </text>

      {/* Indus River Channel Winding to Delta */}
      <path
        d="M 520 400 Q 560 620 530 820 T 480 1140"
        fill="none"
        stroke="#152B3E"
        strokeWidth="12"
      />

      {/* Indian International Border Line (Flashing Red Warning) */}
      <path
        d="M 910 460 Q 860 820 930 1240"
        fill="none"
        stroke="#E63946"
        strokeWidth="7"
        strokeDasharray="20 14"
      />
      <g transform="translate(865, 780) rotate(85)">
        <rect x="-240" y="-24" width="480" height="48" fill="#E63946" rx="6" />
        <text y="9" textAnchor="middle" fill="#F8F9FA" fontFamily="'Black Ops One', sans-serif" fontSize="22" letterSpacing="2">
          INDIAN BORDER (32 MILES)
        </text>
      </g>

      {/* Origin: PAF Base Masroor (Karachi) with Pulsing Radar Rings */}
      <g transform="translate(240, 780)">
        <circle r="95" fill="none" stroke="#5BC0BE" strokeWidth="2" strokeDasharray="8 8" opacity="0.35" />
        <circle r="50" fill="none" stroke="#5BC0BE" strokeWidth="2.5" opacity="0.6" />
        <circle r="12" fill="#E63946" />
        {/* Radar Sweeper Needle */}
        <line
          x1="0"
          y1="0"
          x2={95 * Math.cos((radarSweep * Math.PI) / 180)}
          y2={95 * Math.sin((radarSweep * Math.PI) / 180)}
          stroke="#5BC0BE"
          strokeWidth="3"
        />
        <text x="0" y="130" textAnchor="middle" fill="#F8F9FA" fontFamily="'Black Ops One', sans-serif" fontSize="28">
          PAF MASROOR
        </text>
        <text x="0" y="160" textAnchor="middle" fill="#5BC0BE" fontFamily="'Barlow Condensed', sans-serif" fontSize="22" letterSpacing="3">
          KARACHI • ORIGIN 11:30
        </text>
      </g>

      {/* Destination Crash Site: Sujawal */}
      <g transform="translate(720, 960)">
        <circle r="40" fill="none" stroke="#F4B942" strokeWidth="3" strokeDasharray="8 6" />
        <circle r="14" fill="#F4B942" />
        <text x="0" y="125" textAnchor="middle" fill="#F4B942" fontFamily="'Black Ops One', sans-serif" fontSize="28">
          SUJAWAL
        </text>
        <text x="0" y="155" textAnchor="middle" fill="#E8DFCA" fontFamily="'Barlow Condensed', sans-serif" fontSize="22" letterSpacing="2">
          CRASH SITE • 32 MI TO BORDER
        </text>
      </g>

      {/* Animated Flight Path Line */}
      <path
        d={`M 240 780 Q 480 730 ${jetX} ${jetY}`}
        fill="none"
        stroke="#F8F9FA"
        strokeWidth="6"
        strokeDasharray="16 10"
      />

      {/* Jet Marker on Path */}
      <g transform={`translate(${jetX}, ${jetY}) rotate(25) scale(0.24)`}>
        <T33JetSilhouette scale={1} showAfterburner={true} />
      </g>
    </svg>
  );
};

// ==========================================
// 4. WEATHERED RUBBER STAMP COMPONENT
// ==========================================
export const WeatheredMilitaryStamp: React.FC<{
  text: string;
  subText?: string;
  color?: string;
  slamProgress?: number;
}> = ({ text, subText, color = '#C1272D', slamProgress = 1.0 }) => {
  return (
    <g transform={`rotate(-11) scale(${slamProgress})`}>
      {/* Outer Double-Bordered Distressed Rubber Ink Frame (Translucent Interior like Reference Video) */}
      <rect
        x="-340"
        y="-92"
        width="680"
        height="184"
        fill="rgba(193, 39, 45, 0.14)"
        stroke={color}
        strokeWidth="10"
        rx="14"
        strokeDasharray="210 6 80 5 140 6"
      />
      <rect
        x="-324"
        y="-76"
        width="648"
        height="152"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        rx="8"
      />
      {/* Heavy Stamp Text */}
      <text
        y={subText ? 12 : 28}
        textAnchor="middle"
        fill={color}
        fontFamily="'Black Ops One', sans-serif"
        fontSize="82"
        letterSpacing="6"
      >
        {text}
      </text>
      {subText && (
        <text
          y="54"
          textAnchor="middle"
          fill="#EAE3D2"
          fontFamily={courier.fontFamily}
          fontSize="23"
          letterSpacing="2.5"
          fontWeight="700"
        >
          {subText}
        </text>
      )}
    </g>
  );
};

// ========================================================
// 5. M24 CHAFFEE / LIGHT TANK HIGH-CONTRAST SILHOUETTE
// ========================================================
export const M24ChaffeeTankSilhouette: React.FC<{
  scale?: number;
  gunAngle?: number;
  showSearchlight?: boolean;
  showCommander?: boolean;
  trackOffset?: number;
}> = ({
  scale = 1,
  gunAngle = -4,
  showSearchlight = false,
  showCommander = false,
  trackOffset = 0,
}) => {
  const frame = useCurrentFrame();
  const lightFlicker = 0.65 + 0.15 * Math.sin(frame * 0.45) + 0.1 * Math.cos(frame * 0.9);
  const wheelSpin = (frame * 5 + trackOffset * 4) % 360;

  return (
    <g transform={`scale(${scale})`}>
      <defs>
        {/* Searchlight Beam Linear Gradient */}
        <linearGradient id="searchlightBeam" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="15%" stopColor="#FFF4D0" stopOpacity="0.75" />
          <stop offset="55%" stopColor="#5BC0BE" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#5BC0BE" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Searchlight Brilliant Light Cone Sweeping Forward */}
      {showSearchlight && (
        <g transform="translate(68, -84) rotate(-14)">
          <polygon
            points="0,-10 950,-240 1020,160 0,10"
            fill="url(#searchlightBeam)"
            opacity={lightFlicker}
          />
          {/* Intense Glow at Lens */}
          <ellipse cx="6" cy="0" rx="14" ry="10" fill="#FFFFFF" opacity="0.95" />
          <circle cx="6" cy="0" r="28" fill="#FFF4D0" opacity="0.4" />
        </g>
      )}

      {/* Tracks & Lower Running Gear */}
      {/* Track Base Shadow */}
      <rect x="-195" y="44" width="390" height="8" rx="4" fill="#000000" opacity="0.5" />

      {/* Continuous Caterpillar Track Band */}
      <path
        d="M -180 44 L 175 44 C 205 44, 210 18, 195 2 C 185 -10, 165 -16, 140 -16 L -150 -16 C -175 -16, -195 -10, -205 4 C -215 20, -205 44, -180 44 Z"
        fill="#0D1117"
        stroke="#1E2836"
        strokeWidth="3.5"
      />

      {/* Track Link Ridges / Treads */}
      {[-165, -135, -105, -75, -45, -15, 15, 45, 75, 105, 135, 165].map((tx) => (
        <line
          key={`tread-bot-${tx}`}
          x1={tx}
          y1="40"
          x2={tx}
          y2="46"
          stroke="#364557"
          strokeWidth="3.5"
        />
      ))}
      {[-140, -110, -80, -50, -20, 10, 40, 70, 100, 130].map((tx) => (
        <line
          key={`tread-top-${tx}`}
          x1={tx}
          y1="-18"
          x2={tx}
          y2="-13"
          stroke="#2A3745"
          strokeWidth="3"
        />
      ))}

      {/* 5 Large Road Wheels with Rotating Spokes */}
      {[-130, -65, 0, 65, 130].map((wx, idx) => (
        <g key={`wheel-${idx}`} transform={`translate(${wx}, 20)`}>
          {/* Wheel Rubber Rim */}
          <circle r="22" fill="#141A23" stroke="#253545" strokeWidth="4" />
          {/* Wheel Steel Hub */}
          <circle r="14" fill="#0B0E14" />
          {/* Rotating Spoke Lines */}
          <g transform={`rotate(${wheelSpin})`}>
            <line x1="-12" y1="0" x2="12" y2="0" stroke="#3E5268" strokeWidth="2.5" />
            <line x1="0" y1="-12" x2="0" y2="12" stroke="#3E5268" strokeWidth="2.5" />
          </g>
          {/* Center Axle Cap */}
          <circle r="5" fill="#E63946" />
        </g>
      ))}

      {/* Front Drive Sprocket */}
      <g transform="translate(182, 10)">
        <circle r="16" fill="#1A2330" stroke="#384C61" strokeWidth="3" />
        <circle r="8" fill="#0B0E14" />
        <g transform={`rotate(${wheelSpin * 1.2})`}>
          <line x1="-14" y1="0" x2="14" y2="0" stroke="#E63946" strokeWidth="2.5" />
          <line x1="0" y1="-14" x2="0" y2="14" stroke="#E63946" strokeWidth="2.5" />
        </g>
      </g>

      {/* Rear Idler Wheel */}
      <g transform="translate(-182, 10)">
        <circle r="15" fill="#1A2330" stroke="#384C61" strokeWidth="3" />
        <circle r="7" fill="#0B0E14" />
      </g>

      {/* Upper Track Return Rollers */}
      {[-95, -30, 35, 100].map((rx, idx) => (
        <circle key={`roller-${idx}`} cx={rx} cy="-6" r="6" fill="#1E2A38" stroke="#33465A" strokeWidth="2" />
      ))}

      {/* Hull Side Skirts & Armor Plate */}
      <polygon
        points="-190,-16 185,-16 175,-32 -180,-32"
        fill="#141B24"
        stroke="#243445"
        strokeWidth="2.5"
      />

      {/* Sloped Glacis Front Armor & Mudguard */}
      <path
        d="M 120 -32 L 195 -18 L 180 -42 L 95 -50 Z"
        fill="#1C2735"
        stroke="#2C3F54"
        strokeWidth="2"
      />
      {/* Front Headlight on Mudguard */}
      <circle cx="168" cy="-40" r="5" fill="#FFF4D0" stroke="#2C3F54" strokeWidth="1.5" />

      {/* Hull Machine Gun Ball Port */}
      <circle cx="132" cy="-40" r="6" fill="#0E141B" stroke="#384C61" strokeWidth="2" />
      <line x1="134" y1="-40" x2="152" y2="-40" stroke="#0A0E14" strokeWidth="3" strokeLinecap="round" />

      {/* Main Hull Body (Low-Profile Light Tank Chaffee Hull) */}
      <path
        d="M -180 -32 L 125 -32 L 85 -54 L -165 -54 Z"
        fill="#18222E"
        stroke="#283A4D"
        strokeWidth="2.5"
      />

      {/* Rear Engine Deck with Louvers */}
      <rect x="-160" y="-52" width="65" height="18" fill="#111720" rx="2" />
      {[-150, -140, -130, -120, -110].map((lx) => (
        <line key={`louv-${lx}`} x1={lx} y1="-50" x2={lx} y2="-36" stroke="#2B3A4C" strokeWidth="2" />
      ))}

      {/* Cast Rounded Turret */}
      <path
        d="M -85 -54 C -90 -98, 65 -98, 72 -54 Z"
        fill="#1E2A38"
        stroke="#2E4357"
        strokeWidth="3"
      />

      {/* Turret Bustle (Aft Extension) */}
      <polygon points="-85,-54 -115,-58 -110,-76 -78,-80" fill="#18222E" stroke="#2E4357" strokeWidth="2" />

      {/* 75mm Main Gun Mantlet & Barrel Assembly */}
      <g transform={`translate(68, -72) rotate(${gunAngle})`}>
        {/* Mantlet Pivot Block */}
        <path d="M 0 -14 L 18 -10 L 18 10 L 0 14 Z" fill="#2E4357" stroke="#3E5770" strokeWidth="2.5" />
        {/* Main 75mm Gun Barrel */}
        <rect x="18" y="-5" width="160" height="10" fill="#141B24" stroke="#2C3D50" strokeWidth="2" rx="1.5" />
        {/* Reinforced Barrel Sleeve / Collar */}
        <rect x="42" y="-7" width="28" height="14" fill="#1C2735" rx="1.5" />
        {/* Muzzle Brake at Barrel Tip */}
        <path d="M 175 -8 L 195 -8 L 195 8 L 175 8 Z" fill="#253545" stroke="#3D536B" strokeWidth="2" />
        <line x1="184" y1="-7" x2="184" y2="7" stroke="#0E141B" strokeWidth="2.5" />
      </g>

      {/* Commander Cupola / Vision Ring */}
      <rect x="-42" y="-96" width="34" height="12" rx="3" fill="#141B24" stroke="#32475C" strokeWidth="2" />
      {[-36, -26, -16].map((vx) => (
        <rect key={`periscope-${vx}`} x={vx} y="-94" width="5" height="4" fill="#5BC0BE" />
      ))}

      {/* Searchlight Housing Fixture on Turret Roof */}
      {showSearchlight && (
        <g transform="translate(64, -86)">
          <rect x="-8" y="-8" width="16" height="16" rx="3" fill="#253545" stroke="#3D536B" strokeWidth="2" />
          <ellipse cx="6" cy="0" rx="4" ry="7" fill="#FFFFFF" />
          <line x1="0" y1="8" x2="4" y2="18" stroke="#141B24" strokeWidth="3" />
        </g>
      )}

      {/* Commander Figure Standing in Cupola (if showCommander) */}
      {showCommander && (
        <g transform="translate(-25, -104)">
          {/* Khaki / Helmet Head */}
          <circle cx="0" cy="-14" r="11" fill="#4A4332" stroke="#2E291E" strokeWidth="2" />
          {/* Peaked cap / helmet rim */}
          <path d="M -12 -16 Q 0 -22 12 -16 L 8 -10 Q 0 -15 -8 -10 Z" fill="#2E291E" />
          {/* Binoculars held in hands */}
          <rect x="2" y="-18" width="14" height="7" rx="2" fill="#111317" />
          {/* Commander Torso in Hatch */}
          <rect x="-12" y="-3" width="24" height="16" fill="#3D3728" rx="3" />
        </g>
      )}

      {/* Tactical White Identification Star on Turret */}
      <g transform="translate(-10, -74) scale(0.65)" opacity="0.8">
        <polygon
          points="0,-14 4,-4 14,-4 6,3 9,13 0,7 -9,13 -6,3 -14,-4 -4,-4"
          fill="#F8F9FA"
        />
      </g>
    </g>
  );
};

// ========================================================
// 6. C-130 HERCULES FOUR-ENGINE AIRLIFT TRANSPORT
// ========================================================
export const C130HerculesSilhouette: React.FC<{
  scale?: number;
  angle?: number;
  showProps?: boolean;
}> = ({ scale = 1, angle = -3, showProps = true }) => {
  const frame = useCurrentFrame();
  const propSpin = (frame * 48) % 360;

  return (
    <g transform={`rotate(${angle}) scale(${scale})`}>
      {/* Turboprop Exhaust Shimmer Behind Wings */}
      {[-85, -25, 45, 105].map((ex, idx) => (
        <line
          key={`exhaust-${idx}`}
          x1={ex}
          y1="8"
          x2={ex - 40}
          y2="8"
          stroke="#F4B942"
          strokeWidth="4"
          strokeDasharray="14 10"
          opacity={0.45 + 0.15 * Math.sin(frame * 0.8 + idx)}
        />
      ))}

      {/* Main High-Mounted Straight Wing (Spanning ~560px) */}
      <path
        d="M -160 -12 L 180 -12 L 150 14 L -130 14 Z"
        fill="#141B24"
        stroke="#283A4D"
        strokeWidth="3"
      />

      {/* 4 Turboprop Engine Nacelles */}
      {[-85, -25, 45, 105].map((nx, idx) => (
        <g key={`nacelle-${idx}`} transform={`translate(${nx}, 0)`}>
          {/* Nacelle Cowling */}
          <rect x="-12" y="-8" width="38" height="16" rx="4" fill="#1C2735" stroke="#33475C" strokeWidth="2" />
          {/* Propeller Spinner Cone */}
          <polygon points="26,-6 38,0 26,6" fill="#E63946" />

          {/* 4-Blade Spinning Propeller Discs & Blur */}
          {showProps && (
            <g transform="translate(32, 0)">
              {/* Translucent blurred spinning disc */}
              <ellipse rx="4" ry="38" fill="rgba(244, 185, 66, 0.28)" />
              {/* Rotating sharp blade highlights */}
              <g transform={`rotate(${propSpin + idx * 45})`}>
                <line x1="0" y1="-36" x2="0" y2="36" stroke="#FFFFFF" strokeWidth="2" opacity="0.65" />
                <circle cx="0" cy="-34" r="2" fill="#F4B942" />
                <circle cx="0" cy="34" r="2" fill="#F4B942" />
              </g>
            </g>
          )}
        </g>
      ))}

      {/* Bulky C-130 Hercules Fuselage */}
      {/* Upswept Rear Cargo Ramp & Tail Cone */}
      <path
        d="M 230 4 C 255 12, 255 28, 225 36 L -160 36 L -240 18 L -240 6 L -160 4 Z"
        fill="#18232E"
        stroke="#2C3F54"
        strokeWidth="3.5"
      />

      {/* Nose Radome (characteristic blunt thimble nose) */}
      <path
        d="M 225 10 C 250 14, 250 30, 220 34 Z"
        fill="#0E141B"
        stroke="#243445"
        strokeWidth="2"
      />

      {/* Cockpit Canopy Windows (Stepped multi-pane glass) */}
      <g transform="translate(195, 6)">
        <polygon points="0,0 20,-2 24,10 4,10" fill="#5BC0BE" opacity="0.9" />
        <polygon points="-14,1 -2,0 2,10 -10,10" fill="#5BC0BE" opacity="0.75" />
      </g>

      {/* Side Landing Gear Sponson Blister */}
      <rect x="-35" y="24" width="95" height="18" rx="8" fill="#121820" stroke="#253545" strokeWidth="2.5" />
      {/* Dual Main Landing Wheels tucked into sponson */}
      <ellipse cx="-10" cy="38" rx="10" ry="5" fill="#0B0D11" />
      <ellipse cx="20" cy="38" rx="10" ry="5" fill="#0B0D11" />

      {/* Tall Vertical Tail Fin & Rudder */}
      <path
        d="M -150 4 L -215 -90 L -165 -90 L -120 4 Z"
        fill="#16202A"
        stroke="#2C3F54"
        strokeWidth="3"
      />
      {/* Dorsal Fin Leading Edge Fillet */}
      <path d="M -90 4 L -150 4 L -140 -20 Z" fill="#16202A" />

      {/* High Horizontal Tailplane Stabilizers */}
      <polygon points="-215,-70 -265,-75 -245,-60 -195,-60" fill="#121820" stroke="#253545" strokeWidth="2" />

      {/* Paratroop Jump Door Outline on Aft Fuselage */}
      <rect x="-130" y="14" width="16" height="18" fill="none" stroke="#33475C" strokeWidth="1.5" />

      {/* PAF Green Roundel On Aft-Center Fuselage */}
      <g transform="translate(-85, 22) scale(0.48)">
        <circle r="22" fill="#01411C" stroke="#F8F9FA" strokeWidth="3" />
        <circle r="12" fill="#F8F9FA" />
        <circle r="5" fill="#01411C" />
      </g>

      {/* Large Transport Identity Text along Forward Fuselage */}
      <text
        x="48"
        y="25"
        fill="#5BC0BE"
        fontFamily={barlow.fontFamily}
        fontSize="12"
        fontWeight="900"
        letterSpacing="2"
      >
        PAF • C-130B
      </text>
    </g>
  );
};

// ========================================================
// 7. MV SWAT FREIGHTER CARGO SHIP (CHITTAGONG PORT)
// ========================================================
export const MvSwatCargoShipSilhouette: React.FC<{
  scale?: number;
}> = ({ scale = 1 }) => {
  const frame = useCurrentFrame();
  const waterBob = Math.sin(frame * 0.08) * 4;
  const craneSway = Math.sin(frame * 0.06) * 8;
  const smokePuff1 = (frame * 1.5) % 120;
  const smokePuff2 = (frame * 1.5 + 60) % 120;

  return (
    <g transform={`scale(${scale}) translate(0, ${waterBob})`}>
      {/* Quayside Pier Bollards & Mooring Ropes on Far Left */}
      <g transform="translate(-380, 80)">
        <rect x="-30" y="20" width="80" height="40" fill="#2B241C" stroke="#16120E" strokeWidth="2" />
        {/* Cast Iron Mooring Bollard */}
        <path d="M 0 20 L 0 5 L -6 5 L -6 0 L 14 0 L 14 5 L 8 5 L 8 20 Z" fill="#15171C" />
        {/* Mooring Hawser Line to Ship Bow/Stern */}
        <line x1="4" y1="6" x2="90" y2="35" stroke="#E8DFCA" strokeWidth="2.5" strokeDasharray="8 4" />
      </g>

      {/* Smoke Puffs from Funnel */}
      <g transform="translate(-160, -90)">
        <circle
          cx={smokePuff1 * 0.8}
          cy={-smokePuff1 * 0.5}
          r={10 + smokePuff1 * 0.2}
          fill="#D8D0C5"
          opacity={Math.max(0, 0.45 - smokePuff1 / 180)}
        />
        <circle
          cx={smokePuff2 * 0.8}
          cy={-smokePuff2 * 0.5}
          r={10 + smokePuff2 * 0.2}
          fill="#D8D0C5"
          opacity={Math.max(0, 0.45 - smokePuff2 / 180)}
        />
      </g>

      {/* Main Freighter Ship Hull */}
      {/* Lower Red Boot-Topping Stripe (Waterline Armor) */}
      <path
        d="M 330 90 L 300 125 L -270 125 L -295 90 Z"
        fill="#8B2626"
        stroke="#5C1717"
        strokeWidth="2.5"
      />

      {/* Upper Dark Freighter Hull with Plumb Bow */}
      <path
        d="M 350 42 C 340 50, 335 70, 330 90 L -295 90 C -315 72, -315 52, -280 42 Z"
        fill="#14181F"
        stroke="#242C38"
        strokeWidth="3"
      />

      {/* White Sheer Strake Accent Line along Upper Hull */}
      <line x1="-280" y1="48" x2="340" y2="48" stroke="#EAE3D2" strokeWidth="2.5" opacity="0.8" />

      {/* Ship Identification Name on Bow */}
      <text
        x="290"
        y="65"
        fill="#F4EFE6"
        fontFamily={barlow.fontFamily}
        fontSize="16"
        fontWeight="900"
        letterSpacing="2"
      >
        MV SWAT
      </text>

      {/* Forward Cargo Holds & Hatch Coamings */}
      {/* Hold 1 */}
      <rect x="180" y="28" width="90" height="16" fill="#2E3745" stroke="#445366" strokeWidth="2" rx="2" />
      {/* Hold 2 */}
      <rect x="50" y="28" width="95" height="16" fill="#2E3745" stroke="#445366" strokeWidth="2" rx="2" />
      {/* Hold 3 */}
      <rect x="-80" y="28" width="85" height="16" fill="#2E3745" stroke="#445366" strokeWidth="2" rx="2" />

      {/* Derrick Crane Rigging Kingposts */}
      {/* Crane Mast 1 (Forward) */}
      <g transform="translate(160, 30)">
        <line x1="0" y1="0" x2="0" y2="-115" stroke="#3E4C5E" strokeWidth="6" />
        <line x1="-12" y1="-95" x2="12" y2="-95" stroke="#3E4C5E" strokeWidth="3" />
        {/* Swiveling Crane Boom */}
        <g transform={`rotate(${-35 + craneSway})`}>
          <line x1="0" y1="-8" x2="0" y2="-130" stroke="#F4B942" strokeWidth="4" />
          <line x1="0" y1="-130" x2="0" y2="-75" stroke="#EAE3D2" strokeWidth="1.5" strokeDasharray="4 2" />
          {/* Suspended Ammunition Pallet / Crate */}
          <g transform="translate(0, -75)">
            <rect x="-18" y="0" width="36" height="24" fill="#6B5035" stroke="#3D2B1B" strokeWidth="2" rx="2" />
            <text x="0" y="16" textAnchor="middle" fill="#F4B942" fontFamily={blackOps.fontFamily} fontSize="10">
              9,000 T
            </text>
          </g>
        </g>
      </g>

      {/* Crane Mast 2 (Midships) */}
      <g transform="translate(-15, 30)">
        <line x1="0" y1="0" x2="0" y2="-115" stroke="#3E4C5E" strokeWidth="6" />
        <line x1="-12" y1="-95" x2="12" y2="-95" stroke="#3E4C5E" strokeWidth="3" />
        <g transform={`rotate(${30 - craneSway})`}>
          <line x1="0" y1="-8" x2="0" y2="-125" stroke="#F4B942" strokeWidth="4" />
          <line x1="0" y1="-125" x2="0" y2="-70" stroke="#EAE3D2" strokeWidth="1.5" />
          <g transform="translate(0, -70)">
            <rect x="-16" y="0" width="32" height="22" fill="#5A432C" stroke="#2B1D12" strokeWidth="2" rx="2" />
            <text x="0" y="15" textAnchor="middle" fill="#FFFFFF" fontFamily={barlow.fontFamily} fontSize="11" fontWeight="900">
              AMMO
            </text>
          </g>
        </g>
      </g>

      {/* Aft Superstructure & Multi-Deck Bridge */}
      <g transform="translate(-200, 42)">
        {/* Lower Accommodation Deck */}
        <rect x="-70" y="-36" width="110" height="36" fill="#EAE3D2" stroke="#9A9284" strokeWidth="2" />
        {/* Portholes */}
        {[-55, -35, -15, 5, 25].map((px) => (
          <circle key={`porthole-${px}`} cx={px} cy="-18" r="4" fill="#1C242E" stroke="#5BC0BE" strokeWidth="1" />
        ))}

        {/* Upper Navigating Bridge */}
        <rect x="-60" y="-68" width="90" height="32" fill="#F4EFE6" stroke="#9A9284" strokeWidth="2" />
        {/* Bridge Window Visors */}
        {[-48, -32, -16, 0, 16].map((bx) => (
          <rect key={`bridge-win-${bx}`} x={bx} y="-62" width="10" height="12" fill="#5BC0BE" rx="1" />
        ))}

        {/* Funnel / Smokestack */}
        <g transform="translate(12, -70)">
          <rect x="-12" y="-38" width="24" height="38" fill="#C1272D" stroke="#661418" strokeWidth="2" />
          <rect x="-12" y="-38" width="24" height="10" fill="#16191E" />
        </g>

        {/* Radar Mast & Rigging */}
        <line x1="-15" y1="-68" x2="-15" y2="-120" stroke="#2B3542" strokeWidth="3" />
        <line x1="-28" y1="-115" x2="-2" y2="-115" stroke="#5BC0BE" strokeWidth="3" />

        {/* White Lifeboats in Davits */}
        <ellipse cx="-45" cy="-72" rx="14" ry="6" fill="#FFFFFF" stroke="#4A5568" strokeWidth="1.5" />
      </g>

      {/* Water Surface Wave Ripples */}
      <g opacity="0.65">
        <path
          d={`M -380 ${126 + waterBob * 0.4} Q -200 120 0 ${128 - waterBob * 0.4} T 380 126`}
          fill="none"
          stroke="#4EA5D9"
          strokeWidth="3"
        />
        <path
          d={`M -340 ${135 - waterBob * 0.3} Q -160 140 40 ${133 + waterBob * 0.3} T 360 135`}
          fill="none"
          stroke="#2A6888"
          strokeWidth="2.5"
          strokeDasharray="16 8"
        />
      </g>
    </g>
  );
};

// ========================================================
// 8. DHAKA TACTICAL MAP & ARMORED SPEARHEAD VECTOR
// ========================================================
export const DhakaTacticalMapVector: React.FC<{ durationFrames?: number }> = ({ durationFrames = 180 }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, durationFrames * 0.8], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Spearhead coordinates from Dhaka Cantonment (360, 815)
  const p1X = interpolate(progress, [0, 1], [360, 240]);
  const p1Y = interpolate(progress, [0, 1], [815, 1085]);

  const p2X = interpolate(progress, [0, 1], [360, 720]);
  const p2Y = interpolate(progress, [0, 1], [815, 1055]);

  const p3X = interpolate(progress, [0, 1], [360, 490]);
  const p3Y = interpolate(progress, [0, 1], [815, 1215]);

  const p4X = interpolate(progress, [0, 1], [360, 225]);
  const p4Y = interpolate(progress, [0, 1], [815, 1250]);

  const radarSweep = (frame * 3) % 360;

  return (
    <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
      {/* Technical Tactical Grid Background */}
      <defs>
        <pattern id="dhakaTacticalGrid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#182A3A" strokeWidth="1.2" />
          <circle cx="60" cy="60" r="1.5" fill="#5BC0BE" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="1080" height="1920" fill="url(#dhakaTacticalGrid)" />

      {/* Map Border Frame & Coordinates (Strictly y >= 725 for >100px headroom below KineticTextStack) */}
      <rect x="50" y="725" width="980" height="675" fill="none" stroke="#253C52" strokeWidth="3" />
      <text x="68" y="752" fill="#5BC0BE" fontFamily={courier.fontFamily} fontSize="16" letterSpacing="2">
        LAT 23° 43' N • LONG 90° 24' E • DHAKA SECTOR GRID
      </text>

      {/* Buriganga River Channel */}
      <path
        d="M 60 1365 Q 220 1315 440 1365 T 820 1380 T 1020 1355"
        fill="none"
        stroke="#16324A"
        strokeWidth="30"
        strokeLinecap="round"
      />
      <text
        x="620"
        y="1373"
        fill="#2A597E"
        fontFamily={barlow.fontFamily}
        fontSize="22"
        fontWeight="700"
        letterSpacing="4"
      >
        BURIGANGA RIVER
      </text>

      {/* Cantonment Perimeter Zone (North) */}
      <polygon
        points="220,765 520,765 500,860 200,860"
        fill="rgba(230, 57, 70, 0.12)"
        stroke="#E63946"
        strokeWidth="2"
        strokeDasharray="6 4"
      />

      {/* Spearhead Attack Vector Paths */}
      <path
        d={`M 360 815 Q 280 940 ${p1X} ${p1Y}`}
        fill="none"
        stroke="#E63946"
        strokeWidth="5"
        strokeDasharray="14 8"
      />
      <path
        d={`M 360 815 Q 560 910 ${p2X} ${p2Y}`}
        fill="none"
        stroke="#E63946"
        strokeWidth="5"
        strokeDasharray="14 8"
      />
      <path
        d={`M 360 815 Q 420 1010 ${p3X} ${p3Y}`}
        fill="none"
        stroke="#E63946"
        strokeWidth="5"
        strokeDasharray="14 8"
      />
      <path
        d={`M 360 815 Q 290 1030 ${p4X} ${p4Y}`}
        fill="none"
        stroke="#E63946"
        strokeWidth="5"
        strokeDasharray="14 8"
      />

      {/* Animated M24 Chaffee Tanks advancing along routes */}
      <g transform={`translate(${p1X}, ${p1Y}) scale(0.18)`}>
        <M24ChaffeeTankSilhouette showSearchlight={true} />
      </g>
      <g transform={`translate(${p2X}, ${p2Y}) scale(0.18)`}>
        <M24ChaffeeTankSilhouette showSearchlight={true} />
      </g>
      <g transform={`translate(${p3X}, ${p3Y}) scale(0.18)`}>
        <M24ChaffeeTankSilhouette showSearchlight={true} />
      </g>
      <g transform={`translate(${p4X}, ${p4Y}) scale(0.18)`}>
        <M24ChaffeeTankSilhouette showSearchlight={true} />
      </g>

      {/* Objective Waypoint 1: DHAKA CANTONMENT */}
      <g transform="translate(360, 815)">
        <circle r="42" fill="none" stroke="#E63946" strokeWidth="2" strokeDasharray="6 4" />
        <circle r="12" fill="#E63946" />
        <line
          x1="0"
          y1="0"
          x2={42 * Math.cos((radarSweep * Math.PI) / 180)}
          y2={42 * Math.sin((radarSweep * Math.PI) / 180)}
          stroke="#E63946"
          strokeWidth="2.5"
        />
        <g transform="translate(-160, -34)">
          <rect width="320" height="34" fill="#0E1620" stroke="#E63946" strokeWidth="2" rx="4" />
          <text x="160" y="24" textAnchor="middle" fill="#FFFFFF" fontFamily={blackOps.fontFamily} fontSize="18" letterSpacing="1.5">
            DHAKA CANTONMENT (ORIGIN)
          </text>
        </g>
      </g>

      {/* Tejgaon Airport Runway */}
      <g transform="translate(550, 930)">
        <rect x="-80" y="-8" width="160" height="16" fill="#1C2E40" rx="3" transform="rotate(-30)" />
        <text x="0" y="32" textAnchor="middle" fill="#5BC0BE" fontFamily={courier.fontFamily} fontSize="14" fontWeight="700">
          TEJGAON AIRPORT
        </text>
      </g>

      {/* Objective Waypoint 2: PILKHANA EPR HQ */}
      <g transform="translate(185, 1085)">
        <circle r="12" fill="#E63946" />
        <circle r="26" fill="none" stroke="#E63946" strokeWidth="2" />
        <g transform="translate(0, 34)">
          <rect x="-90" y="0" width="180" height="32" fill="#0C141E" stroke="#E63946" strokeWidth="1.5" rx="3" />
          <text x="0" y="22" textAnchor="middle" fill="#F8F9FA" fontFamily={blackOps.fontFamily} fontSize="16">
            PILKHANA (EPR)
          </text>
        </g>
      </g>

      {/* Objective Waypoint 3: RAJARBAGH POLICE LINES */}
      <g transform="translate(780, 1055)">
        <circle r="12" fill="#E63946" />
        <circle r="26" fill="none" stroke="#E63946" strokeWidth="2" />
        <g transform="translate(0, 34)">
          <rect x="-95" y="0" width="190" height="32" fill="#0C141E" stroke="#E63946" strokeWidth="1.5" rx="3" />
          <text x="0" y="22" textAnchor="middle" fill="#F8F9FA" fontFamily={blackOps.fontFamily} fontSize="16">
            RAJARBAGH POLICE
          </text>
        </g>
      </g>

      {/* Objective Waypoint 4: DHAKA UNIVERSITY */}
      <g transform="translate(490, 1245)">
        <circle r="12" fill="#E63946" />
        <circle r="26" fill="none" stroke="#E63946" strokeWidth="2" />
        <g transform="translate(0, 34)">
          <rect x="-105" y="0" width="210" height="32" fill="#0C141E" stroke="#E63946" strokeWidth="1.5" rx="3" />
          <text x="0" y="22" textAnchor="middle" fill="#F8F9FA" fontFamily={blackOps.fontFamily} fontSize="16">
            DHAKA UNIVERSITY
          </text>
        </g>
      </g>

      {/* Objective Waypoint 5: DHANMONDI 32 */}
      <g transform="translate(185, 1245)">
        <circle r="12" fill="#F4B942" />
        <circle r="24" fill="none" stroke="#F4B942" strokeWidth="2" strokeDasharray="4 4" />
        <g transform="translate(0, 34)">
          <rect x="-85" y="0" width="170" height="32" fill="#0C141E" stroke="#F4B942" strokeWidth="1.5" rx="3" />
          <text x="0" y="22" textAnchor="middle" fill="#F4B942" fontFamily={blackOps.fontFamily} fontSize="15">
            DHANMONDI 32
          </text>
        </g>
      </g>

      {/* Lower-Frame Dual Telemetry Badges (Strictly y >= 1435) */}
      <g transform="translate(65, 1435)">
        {/* Left Telemetry Card */}
        <g transform="translate(0, 0)">
          <rect width="460" height="96" fill="#0B121A" stroke="#E63946" strokeWidth="2.5" rx="8" />
          <text x="24" y="44" fill="#F8F9FA" fontFamily={blackOps.fontFamily} fontSize="32" letterSpacing="2">
            6 HR DEADLINE
          </text>
          <text x="24" y="76" fill="#E63946" fontFamily={barlow.fontFamily} fontSize="20" fontWeight="700" letterSpacing="1.5">
            COMPLETE DHAKA LOCKDOWN BEFORE DAWN
          </text>
        </g>

        {/* Right Telemetry Card */}
        <g transform="translate(490, 0)">
          <rect width="460" height="96" fill="#0B121A" stroke="#5BC0BE" strokeWidth="2.5" rx="8" />
          <text x="24" y="44" fill="#F8F9FA" fontFamily={blackOps.fontFamily} fontSize="32" letterSpacing="2">
            20 ARMOR TANKS
          </text>
          <text x="24" y="76" fill="#5BC0BE" fontFamily={barlow.fontFamily} fontSize="20" fontWeight="700" letterSpacing="1.5">
            14 M24 CHAFFEE + 6 PT-76 DEPLOYED
          </text>
        </g>
      </g>
    </svg>
  );
};

// ========================================================
// 9. EBR DISPERSION TECHNICAL BLUEPRINT SCHEMATIC
// ========================================================
export const EbrDispersionSchematicVector: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.08 * Math.sin(frame / 3.5);
  const blinkSevered = Math.floor(frame / 14) % 2 === 0;

  const regiments = [
    { name: '1 EBR', location: 'JESSORE', x: 210, y: 940 },
    { name: '2 EBR', location: 'JOYDEBPUR', x: 520, y: 745 },
    { name: '3 EBR', location: 'SAIDPUR', x: 230, y: 755 },
    { name: '4 EBR', location: 'COMILLA', x: 800, y: 830 },
    { name: '8 EBR', location: 'CHITTAGONG', x: 830, y: 1020 },
    { name: '10 EBR', location: 'DHAKA', x: 480, y: 1035 },
  ];

  return (
    <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
      <defs>
        <pattern id="ebrGridPattern" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#152332" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="1.5" fill="#5BC0BE" opacity="0.35" />
        </pattern>
      </defs>
      <rect width="1080" height="1920" fill="url(#ebrGridPattern)" />

      {/* Blueprint Top Header Line (Strictly y >= 710 for >100px headroom) */}
      <g transform="translate(540, 710)">
        <line x1="-420" y1="0" x2="420" y2="0" stroke="#5BC0BE" strokeWidth="2" strokeDasharray="16 10" opacity="0.4" />
      </g>

      {/* East Pakistan Schematic Map Outline */}
      <path
        d="M 210 735 L 480 725 L 820 780 L 895 1060 L 780 1130 L 500 1095 L 240 1030 L 175 860 Z"
        fill="rgba(19, 37, 56, 0.45)"
        stroke="#223C57"
        strokeWidth="2.5"
      />

      {/* Dispersed Regiment Nodes & Severed Wireless Links */}
      {regiments.map((reg, idx) => (
        <g key={idx}>
          {/* Severed Wireless Comms Line from Dhaka GHQ (520, 910) */}
          <line
            x1="520"
            y1="910"
            x2={reg.x}
            y2={reg.y}
            stroke="#E63946"
            strokeWidth="3.5"
            strokeDasharray="10 8"
            opacity={blinkSevered ? 0.9 : 0.4}
          />
          {/* "WIRELESS CUT" badge */}
          <g transform={`translate(${(520 + reg.x) / 2}, ${(910 + reg.y) / 2})`}>
            <circle r="11" fill="#781216" stroke="#E63946" strokeWidth="1.5" />
            <line x1="-5" y1="-5" x2="5" y2="5" stroke="#FFFFFF" strokeWidth="2.2" />
            <line x1="5" y1="-5" x2="-5" y2="5" stroke="#FFFFFF" strokeWidth="2.2" />
          </g>

          {/* Regiment Node Badge */}
          <g transform={`translate(${reg.x}, ${reg.y})`}>
            <circle r="20" fill="#0C1520" stroke="#5BC0BE" strokeWidth="2.5" />
            <text y="6" textAnchor="middle" fill="#5BC0BE" fontFamily={blackOps.fontFamily} fontSize="13">
              {idx + 1}
            </text>
            <rect x="-65" y="24" width="130" height="36" fill="#0C1520" stroke="#253A4F" strokeWidth="1.5" rx="4" />
            <text x="0" y="42" textAnchor="middle" fill="#F8F9FA" fontFamily={blackOps.fontFamily} fontSize="14" letterSpacing="1">
              {reg.name}
            </text>
            <text x="0" y="55" textAnchor="middle" fill="#F4B942" fontFamily={barlow.fontFamily} fontSize="12" fontWeight="700">
              {reg.location}
            </text>
          </g>
        </g>
      ))}

      {/* Central Command Node: Dhaka Cantonment GHQ (520, 910) - Clear of all regiment labels */}
      <g transform="translate(520, 910)">
        <circle r="32" fill="rgba(230, 57, 70, 0.15)" stroke="#E63946" strokeWidth="2" />
        <circle r="11" fill="#E63946" />
        <rect x="-85" y="-60" width="170" height="26" fill="#0C1520" stroke="#E63946" strokeWidth="1.5" rx="4" />
        <text x="0" y="-42" textAnchor="middle" fill="#FFFFFF" fontFamily={blackOps.fontFamily} fontSize="15" letterSpacing="1.2">
          DHAKA GHQ HQ
        </text>
      </g>

      {/* Pin 1 Callout Target (Offset cleanly into open space between 2 EBR & 4 EBR) */}
      <g transform="translate(640, 790)">
        <line x1="-120" y1="120" x2="0" y2="0" stroke="#E63946" strokeWidth="2.5" />
        <g transform={`scale(${pulse})`}>
          <circle r="24" fill="#E63946" stroke="#FFF" strokeWidth="2.5" />
          <text y="8" textAnchor="middle" fill="#FFF" fontFamily={blackOps.fontFamily} fontSize="24">1</text>
        </g>
      </g>

      {/* 3 Structured Lower-Third Technical Callout Cards (width = 880, y = 1205) */}
      <g transform="translate(100, 1205)">
        {/* Card 1 */}
        <g transform="translate(0, 0)">
          <rect width="880" height="92" fill="#0C141E" stroke="#25384D" strokeWidth="2" rx="8" />
          <circle cx="50" cy="46" r="22" fill="#E63946" />
          <text x="50" y="54" textAnchor="middle" fill="#FFF" fontFamily={blackOps.fontFamily} fontSize="22">1</text>
          <text x="95" y="40" fill="#F8F9FA" fontFamily={barlow.fontFamily} fontSize="30" fontWeight="900" letterSpacing="1">
            EPR WIRELESS NETWORK SHUT DOWN
          </text>
          <text x="95" y="70" fill="#5BC0BE" fontFamily={barlow.fontFamily} fontSize="21" letterSpacing="1.5">
            TRANSMISSIONS CUT 24 MARCH • BENGALI UNITS PREVENTED FROM COORDINATING
          </text>
        </g>

        {/* Card 2 */}
        <g transform="translate(0, 112)">
          <rect width="880" height="92" fill="#0C141E" stroke="#25384D" strokeWidth="2" rx="8" />
          <circle cx="50" cy="46" r="22" fill="#E63946" />
          <text x="50" y="54" textAnchor="middle" fill="#FFF" fontFamily={blackOps.fontFamily} fontSize="22">2</text>
          <text x="95" y="40" fill="#F8F9FA" fontFamily={barlow.fontFamily} fontSize="30" fontWeight="900" letterSpacing="1">
            6 EAST BENGAL REGIMENTS SCATTERED
          </text>
          <text x="95" y="70" fill="#E63946" fontFamily={barlow.fontFamily} fontSize="21" letterSpacing="1.5">
            1, 2, 3, 4, 8 & 10 EBR DISPERSED ACROSS 6 REMOTE GARRISONS
          </text>
        </g>

        {/* Card 3 */}
        <g transform="translate(0, 224)">
          <rect width="880" height="92" fill="#0C141E" stroke="#E63946" strokeWidth="2.5" rx="8" />
          <circle cx="50" cy="46" r="22" fill="#E63946" />
          <text x="50" y="54" textAnchor="middle" fill="#FFF" fontFamily={blackOps.fontFamily} fontSize="22">3</text>
          <text x="95" y="40" fill="#F8F9FA" fontFamily={barlow.fontFamily} fontSize="30" fontWeight="900" letterSpacing="1">
            OFFICERS DISARMED & REASSIGNED
          </text>
          <text x="95" y="70" fill="#F4B942" fontFamily={barlow.fontFamily} fontSize="20" letterSpacing="1.5">
            HEAVY WEAPONS WITHHELD • BENGALI COMMANDERS UNDER SURVEILLANCE
          </text>
        </g>
      </g>
    </svg>
  );
};

// ========================================================
// 10. DHAKA UNIVERSITY BLUEPRINT ARCHITECTURAL VECTOR
// ========================================================
export const DhakaUniversityBlueprintVector: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.08 * Math.sin(frame / 3.5);
  const reticleSpin = (frame * 1.5) % 360;

  return (
    <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
      <defs>
        <pattern id="duGridPattern" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#162534" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="1.5" fill="#5BC0BE" opacity="0.35" />
        </pattern>
      </defs>
      <rect width="1080" height="1920" fill="url(#duGridPattern)" />

      {/* Blueprint Header Divider Line (Strictly y >= 725 for >100px headroom) */}
      <g transform="translate(540, 725)">
        <line x1="-420" y1="0" x2="420" y2="0" stroke="#5BC0BE" strokeWidth="2" strokeDasharray="16 10" opacity="0.4" />
      </g>

      {/* Architectural Campus Site Plan Footprints (Starts at y = 760) */}
      <g transform="translate(100, 760)">
        {/* Jagannath Hall Complex (Target 1) */}
        <g transform="translate(30, 20)">
          <rect width="380" height="155" fill="#141E28" stroke="#37516D" strokeWidth="2.5" rx="4" />
          <rect x="18" y="20" width="230" height="115" fill="#0E161F" stroke="#25384D" strokeWidth="1.5" rx="2" />
          <text x="34" y="68" fill="#FFFFFF" fontFamily={blackOps.fontFamily} fontSize="19" letterSpacing="1">
            JAGANNATH HALL
          </text>
          <text x="34" y="96" fill="#5BC0BE" fontFamily={courier.fontFamily} fontSize="13" fontWeight="700">
            HINDU DORMITORY
          </text>

          {/* Red Artillery Target Reticle 1 (Right side of hall block, clear of text) */}
          <g transform="translate(310, 78)">
            <circle r="44" fill="none" stroke="#E63946" strokeWidth="2" strokeDasharray="8 5" transform={`rotate(${reticleSpin})`} />
            <circle r="26" fill="none" stroke="#E63946" strokeWidth="1.5" />
            <line x1="-52" y1="0" x2="52" y2="0" stroke="#E63946" strokeWidth="2" />
            <line x1="0" y1="-52" x2="0" y2="52" stroke="#E63946" strokeWidth="2" />
            <circle r="5" fill="#E63946" />
          </g>
        </g>

        {/* Iqbal Hall (Sergeant Zahurul Haq Hall - Target 2) */}
        <g transform="translate(470, 20)">
          <rect width="380" height="155" fill="#141E28" stroke="#37516D" strokeWidth="2.5" rx="4" />
          <rect x="18" y="20" width="230" height="115" fill="#0E161F" stroke="#25384D" strokeWidth="1.5" rx="2" />
          <text x="34" y="68" fill="#FFFFFF" fontFamily={blackOps.fontFamily} fontSize="19" letterSpacing="1">
            IQBAL HALL
          </text>
          <text x="34" y="96" fill="#5BC0BE" fontFamily={courier.fontFamily} fontSize="13" fontWeight="700">
            STUDENT UNION HQ
          </text>

          {/* Red Artillery Target Reticle 2 (Right side of hall block, clear of text) */}
          <g transform="translate(310, 78)">
            <circle r="44" fill="none" stroke="#E63946" strokeWidth="2" strokeDasharray="8 5" transform={`rotate(${-reticleSpin})`} />
            <circle r="26" fill="none" stroke="#E63946" strokeWidth="1.5" />
            <line x1="-52" y1="0" x2="52" y2="0" stroke="#E63946" strokeWidth="2" />
            <line x1="0" y1="-52" x2="0" y2="52" stroke="#E63946" strokeWidth="2" />
            <circle r="5" fill="#E63946" />
          </g>
        </g>

        {/* Faculty Quarters & Rokeya Hall (Lower Row Left) */}
        <g transform="translate(30, 215)">
          <rect width="380" height="145" fill="#141E28" stroke="#37516D" strokeWidth="2" rx="4" />
          <rect x="18" y="20" width="344" height="105" fill="#0E161F" stroke="#25384D" strokeWidth="1.5" rx="2" />
          <text x="34" y="66" fill="#FFFFFF" fontFamily={blackOps.fontFamily} fontSize="19" letterSpacing="1">
            ROKEYA HALL & QUARTERS
          </text>
          <text x="34" y="94" fill="#5BC0BE" fontFamily={courier.fontFamily} fontSize="13" fontWeight="700">
            WOMEN'S HALL & FACULTY RESIDENCE
          </text>
        </g>

        {/* Shaheed Minar Monument (Lower Row Right - Target 3) */}
        <g transform="translate(470, 215)">
          <rect width="380" height="145" fill="#141E28" stroke="#E63946" strokeWidth="2.5" rx="4" />
          <text x="30" y="64" fill="#FFFFFF" fontFamily={blackOps.fontFamily} fontSize="19" letterSpacing="1">
            SHAHEED MINAR
          </text>
          <text x="30" y="92" fill="#E63946" fontFamily={courier.fontFamily} fontSize="13" fontWeight="700">
            SHELLED & DEMOLISHED
          </text>

          {/* Monument Pillar Graphic + Reticle on Right Side */}
          <g transform="translate(310, 72)">
            <rect x="-6" y="-24" width="12" height="36" fill="#E63946" rx="1.5" />
            <rect x="-20" y="-14" width="10" height="26" fill="#E63946" rx="1.5" />
            <rect x="10" y="-14" width="10" height="26" fill="#E63946" rx="1.5" />
            <circle cx="0" cy="-30" r="8" fill="#F4B942" />
            <circle r="42" fill="none" stroke="#E63946" strokeWidth="2" strokeDasharray="8 5" />
            <line x1="-48" y1="0" x2="48" y2="0" stroke="#E63946" strokeWidth="2" />
            <line x1="0" y1="-48" x2="0" y2="48" stroke="#E63946" strokeWidth="2" />
          </g>
        </g>
      </g>

      {/* Pin 1: Jagannath Hall (Top-left corner of box at y = 780, >150px below text stack) */}
      <g transform="translate(130, 780)">
        <g transform={`scale(${pulse})`}>
          <circle r="24" fill="#E63946" stroke="#FFF" strokeWidth="2.5" />
          <text y="8" textAnchor="middle" fill="#FFF" fontFamily={blackOps.fontFamily} fontSize="24">1</text>
        </g>
      </g>

      {/* Pin 2: Iqbal Hall (Top-left corner of box at y = 780) */}
      <g transform="translate(570, 780)">
        <g transform={`scale(${pulse})`}>
          <circle r="24" fill="#E63946" stroke="#FFF" strokeWidth="2.5" />
          <text y="8" textAnchor="middle" fill="#FFF" fontFamily={blackOps.fontFamily} fontSize="24">2</text>
        </g>
      </g>

      {/* Pin 3: Shaheed Minar (Top-left corner of box at y = 975) */}
      <g transform="translate(570, 975)">
        <g transform={`scale(${pulse})`}>
          <circle r="24" fill="#E63946" stroke="#FFF" strokeWidth="2.5" />
          <text y="8" textAnchor="middle" fill="#FFF" fontFamily={blackOps.fontFamily} fontSize="24">3</text>
        </g>
      </g>

      {/* 3 Structured Lower-Third Technical Callout Cards (width = 880, y = 1190) */}
      <g transform="translate(100, 1190)">
        {/* Card 1 */}
        <g transform="translate(0, 0)">
          <rect width="880" height="92" fill="#0C141E" stroke="#25384D" strokeWidth="2" rx="8" />
          <circle cx="50" cy="46" r="22" fill="#E63946" />
          <text x="50" y="54" textAnchor="middle" fill="#FFF" fontFamily={blackOps.fontFamily} fontSize="22">1</text>
          <text x="95" y="40" fill="#F8F9FA" fontFamily={barlow.fontFamily} fontSize="30" fontWeight="900" letterSpacing="1">
            JAGANNATH & IQBAL HALLS SHELLED
          </text>
          <text x="95" y="70" fill="#5BC0BE" fontFamily={barlow.fontFamily} fontSize="21" letterSpacing="1.5">
            18TH & 32ND PUNJAB OPENED FIRE WITH MORTARS & RECOILLESS RIFLES
          </text>
        </g>

        {/* Card 2 */}
        <g transform="translate(0, 112)">
          <rect width="880" height="92" fill="#0C141E" stroke="#25384D" strokeWidth="2" rx="8" />
          <circle cx="50" cy="46" r="22" fill="#E63946" />
          <text x="50" y="54" textAnchor="middle" fill="#FFF" fontFamily={blackOps.fontFamily} fontSize="22">2</text>
          <text x="95" y="40" fill="#F8F9FA" fontFamily={barlow.fontFamily} fontSize="30" fontWeight="900" letterSpacing="1">
            10 FACULTY PROFESSORS EXECUTED
          </text>
          <text x="95" y="70" fill="#E63946" fontFamily={barlow.fontFamily} fontSize="21" letterSpacing="1.5">
            DR. G.C. DEV & FACULTY TARGETED IN STAFF QUARTERS DURING THE NIGHT
          </text>
        </g>

        {/* Card 3 */}
        <g transform="translate(0, 224)">
          <rect width="880" height="92" fill="#0C141E" stroke="#E63946" strokeWidth="2.5" rx="8" />
          <circle cx="50" cy="46" r="22" fill="#E63946" />
          <text x="50" y="54" textAnchor="middle" fill="#FFF" fontFamily={blackOps.fontFamily} fontSize="22">3</text>
          <text x="95" y="40" fill="#F8F9FA" fontFamily={barlow.fontFamily} fontSize="30" fontWeight="900" letterSpacing="1">
            SHAHEED MINAR MONUMENT DEMOLISHED
          </text>
          <text x="95" y="70" fill="#F4B942" fontFamily={barlow.fontFamily} fontSize="21" letterSpacing="1.5">
            NATIONAL LANGUAGE MOVEMENT SYMBOL PULVERIZED BY HEAVY CANNON FIRE
          </text>
        </g>
      </g>
    </svg>
  );
};

