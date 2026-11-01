import React from 'react';
import { useCurrentFrame } from 'remotion';

// ============================================================================
// 1. FIGHTER JET SILHOUETTE (Parametric Supersonic / Interceptor Silhouette)
// ============================================================================
export interface FighterJetSilhouetteProps {
  scale?: number;
  angle?: number;
  showAfterburner?: boolean;
  afterburnerColor?: string;
  hullColor?: string;
  strokeColor?: string;
  facing?: 'LEFT' | 'RIGHT';
}

export const FighterJetSilhouette: React.FC<FighterJetSilhouetteProps> = ({
  scale = 1,
  angle = 0,
  showAfterburner = true,
  afterburnerColor = '#F59E0B',
  hullColor = '#0A0D12',
  strokeColor = '#1E2836',
  facing = 'RIGHT',
}) => {
  const frame = useCurrentFrame();
  const flameJitter = Math.sin(frame * 1.5) * 6;
  const flip = facing === 'LEFT' ? 'scaleX(-1)' : '';

  return (
    <g transform={`rotate(${angle}) ${flip} scale(${scale})`}>
      {showAfterburner && (
        <g transform="translate(-160, 48)">
          <polygon
            points={`0,${16 + flameJitter} -180,${24} 0,${32 - flameJitter}`}
            fill={afterburnerColor}
            opacity={0.85 + 0.15 * Math.sin(frame)}
          />
          <polygon
            points={`0,${19 + flameJitter * 0.5} -110,${24} 0,${29 - flameJitter * 0.5}`}
            fill="#E63228"
          />
          <ellipse cx="-40" cy="24" rx="20" ry="8" fill="#FFF" opacity={0.9} />
        </g>
      )}

      {/* Main Fuselage Body Silhouette */}
      <path
        d="M -160 42 L -90 38 L 40 28 L 220 20 L 380 20 L 520 28 L 680 42 L 780 50 L 860 62 L 780 72 L 640 84 L 460 92 L 180 92 L -40 88 L -140 76 L -160 68 Z"
        fill={hullColor}
        stroke={strokeColor}
        strokeWidth="3"
      />
      {/* Nose Pitot Tube */}
      <line x1="860" y1="62" x2="930" y2="62" stroke="#64748B" strokeWidth="3" />
      {/* Cockpit Canopy */}
      <path
        d="M 320 20 C 380 -8 480 -8 540 28 Z"
        fill="#1E293B"
        stroke="#475569"
        strokeWidth="2"
      />
      {/* Wing Profile */}
      <path
        d="M 40 40 L -60 210 L -20 215 L 200 60 Z"
        fill="#070A0F"
        stroke={strokeColor}
        strokeWidth="3"
      />
      {/* Horizontal Stabilizer Tail */}
      <path
        d="M -120 48 L -180 120 L -140 125 L -70 54 Z"
        fill="#070A0F"
        stroke={strokeColor}
        strokeWidth="2"
      />
      {/* Vertical Tail Fin */}
      <path
        d="M -100 40 L -170 -110 L -120 -110 L -20 32 Z"
        fill="#0A0D12"
        stroke={strokeColor}
        strokeWidth="3"
      />
    </g>
  );
};

// ============================================================================
// 2. TANK / ARMORED VEHICLE SILHOUETTE
// ============================================================================
export interface TankSilhouetteProps {
  scale?: number;
  turretAngle?: number;
  hullColor?: string;
  treadColor?: string;
  accentProp?: 'RED_STAR' | 'WHITE_STAR' | 'IRON_CROSS' | 'NONE';
  facing?: 'LEFT' | 'RIGHT';
}

export const TankSilhouette: React.FC<TankSilhouetteProps> = ({
  scale = 1,
  turretAngle = 0,
  hullColor = '#090D12',
  treadColor = '#151A22',
  accentProp = 'WHITE_STAR',
  facing = 'RIGHT',
}) => {
  const frame = useCurrentFrame();
  const wheelSpin = (frame * 5) % 360;
  const flip = facing === 'LEFT' ? 'scaleX(-1)' : '';

  return (
    <g transform={`${flip} scale(${scale})`}>
      {/* Lower Treads Track */}
      <rect x="-240" y="40" width="480" height="70" rx="35" fill={treadColor} stroke="#2D3748" strokeWidth="4" />
      
      {/* Track Wheels with rotation micro-motion */}
      {[-180, -90, 0, 90, 180].map((cx, i) => (
        <g key={i} transform={`translate(${cx}, 75) rotate(${wheelSpin})`}>
          <circle r="26" fill="#0A0D12" stroke="#4A5568" strokeWidth="3" />
          <circle r="8" fill="#CBD5E1" />
          <line x1="-22" y1="0" x2="22" y2="0" stroke="#4A5568" strokeWidth="2" />
          <line x1="0" y1="-22" x2="0" y2="22" stroke="#4A5568" strokeWidth="2" />
        </g>
      ))}

      {/* Main Hull */}
      <path
        d="M -260 40 L -210 -15 L 180 -15 L 240 40 Z"
        fill={hullColor}
        stroke="#2D3748"
        strokeWidth="4"
      />

      {/* Rotating Turret & Gun Barrel */}
      <g transform={`translate(-20, -15) rotate(${turretAngle})`}>
        {/* Gun Barrel */}
        <rect x="70" y="-14" width="220" height="12" fill="#0A0D12" stroke="#334155" strokeWidth="2" />
        <rect x="270" y="-18" width="28" height="20" fill="#1E293B" />
        {/* Turret Mantlet & Cupola */}
        <path
          d="M -90 0 L -60 -45 L 60 -45 L 85 0 Z"
          fill={hullColor}
          stroke="#334155"
          strokeWidth="4"
        />
        <rect x="-40" y="-56" width="35" height="12" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="2" />

        {/* Accent Insignia */}
        {accentProp === 'RED_STAR' && (
          <polygon
            points="0,-28 4,-16 16,-16 6,-8 10,4 0,-4 -10,4 -6,-8 -16,-16 -4,-16"
            fill="#E63228"
          />
        )}
        {accentProp === 'WHITE_STAR' && (
          <polygon
            points="0,-28 4,-16 16,-16 6,-8 10,4 0,-4 -10,4 -6,-8 -16,-16 -4,-16"
            fill="#F4F7FA"
          />
        )}
        {accentProp === 'IRON_CROSS' && (
          <path
            d="M -8 -30 L -4 -24 L -10 -24 L -6 -18 L -12 -14 L -6 -10 L -10 -4 L -4 -4 L -8 2 L 0 -2 L 8 2 L 4 -4 L 10 -4 L 6 -10 L 12 -14 L 6 -18 L 10 -24 L 4 -24 L 8 -30 L 0 -26 Z"
            fill="#F4F7FA"
          />
        )}
      </g>
    </g>
  );
};

// ============================================================================
// 3. CARGO & MILITARY TRANSPORT AIRCRAFT (C-130 / Heavy Lifter)
// ============================================================================
export interface TransportAircraftProps {
  scale?: number;
  bankAngle?: number;
  showPropellers?: boolean;
  facing?: 'LEFT' | 'RIGHT';
}

export const TransportAircraftSilhouette: React.FC<TransportAircraftProps> = ({
  scale = 1,
  bankAngle = 0,
  showPropellers = true,
  facing = 'RIGHT',
}) => {
  const frame = useCurrentFrame();
  const propBlur = Math.sin(frame * 2) * 12;
  const flip = facing === 'LEFT' ? 'scaleX(-1)' : '';

  return (
    <g transform={`rotate(${bankAngle}) ${flip} scale(${scale})`}>
      {/* High-Mounted Wings */}
      <rect x="-340" y="-12" width="680" height="28" rx="8" fill="#0A0D12" stroke="#1E293B" strokeWidth="3" />

      {/* Turboprop Engines with Blur Discs */}
      {[-240, -110, 110, 240].map((cx, i) => (
        <g key={i} transform={`translate(${cx}, 0)`}>
          <rect x="-18" y="-22" width="36" height="48" rx="10" fill="#070A0F" stroke="#334155" strokeWidth="2" />
          {showPropellers && (
            <ellipse
              cx="0"
              cy="-24"
              rx={32 + propBlur * 0.2}
              ry="4"
              fill="rgba(244, 247, 250, 0.4)"
              stroke="rgba(244, 247, 250, 0.6)"
              strokeWidth="1"
            />
          )}
        </g>
      ))}

      {/* Main Cargo Fuselage */}
      <ellipse cx="0" cy="18" rx="280" ry="46" fill="#090D12" stroke="#1E293B" strokeWidth="4" />
      {/* Cockpit Canopy Windows */}
      <path d="M 210 6 L 246 16 L 210 22 Z" fill="#38BDF8" opacity={0.8} />
      {/* Tail Fin */}
      <path d="M -260 0 L -310 -110 L -270 -110 L -210 0 Z" fill="#090D12" stroke="#1E293B" strokeWidth="3" />
      {/* Horizontal Stabilizer */}
      <rect x="-310" y="-95" width="90" height="10" rx="3" fill="#070A0F" />
    </g>
  );
};

// ============================================================================
// 4. WARSHIP & CARGO VESSEL SILHOUETTE
// ============================================================================
export interface NavalVesselProps {
  scale?: number;
  vesselType?: 'CARGO' | 'DESTROYER';
  facing?: 'LEFT' | 'RIGHT';
  waterlineColor?: string;
}

export const NavalVesselSilhouette: React.FC<NavalVesselProps> = ({
  scale = 1,
  vesselType = 'DESTROYER',
  facing = 'RIGHT',
  waterlineColor = '#38BDF8',
}) => {
  const frame = useCurrentFrame();
  const waterWake = Math.sin(frame * 0.2) * 4;
  const roll = Math.sin(frame * 0.08) * 1.5;
  const flip = facing === 'LEFT' ? 'scaleX(-1)' : '';

  return (
    <g transform={`rotate(${roll}) ${flip} scale(${scale})`}>
      {/* Hull Profile */}
      <path
        d="M -340 10 L -290 60 L 310 60 L 370 10 L 290 10 L -340 10 Z"
        fill="#090D12"
        stroke="#1E293B"
        strokeWidth="3"
      />
      
      {/* Water Wake Line */}
      <path
        d={`M -380 62 Q -300 ${58 + waterWake} -100 62 T 180 ${62 - waterWake} T 410 62`}
        stroke={waterlineColor}
        strokeWidth="2.5"
        strokeDasharray="16 8"
        fill="none"
        opacity={0.65}
      />

      {vesselType === 'DESTROYER' ? (
        <>
          {/* Bridge Superstructure */}
          <path d="M 60 10 L 80 -40 L 160 -40 L 180 10 Z" fill="#0D131C" stroke="#334155" strokeWidth="2" />
          {/* Main Mast & Radar */}
          <line x1="120" y1="-40" x2="120" y2="-100" stroke="#64748B" strokeWidth="3" />
          <line x1="95" y1="-75" x2="145" y2="-75" stroke="#64748B" strokeWidth="2" />
          {/* Gun Turrets */}
          <path d="M 230 10 L 245 -6 L 275 -6 L 285 10 Z" fill="#0A0D12" stroke="#475569" strokeWidth="2" />
          <line x1="275" y1="2" x2="330" y2="-12" stroke="#475569" strokeWidth="3" />
        </>
      ) : (
        <>
          {/* Cargo Holds & Cranes */}
          <rect x="-240" y="-12" width="120" height="22" fill="#0F172A" stroke="#334155" strokeWidth="2" />
          <rect x="-80" y="-12" width="120" height="22" fill="#0F172A" stroke="#334155" strokeWidth="2" />
          {/* Aft Superstructure Bridge */}
          <rect x="180" y="-45" width="80" height="55" fill="#0D131C" stroke="#334155" strokeWidth="2" />
          <line x1="220" y1="-45" x2="220" y2="-85" stroke="#64748B" strokeWidth="3" />
        </>
      )}
    </g>
  );
};

// ============================================================================
// 5. RADAR DISH & EARLY WARNING ARRAY
// ============================================================================
export interface RadarDishProps {
  scale?: number;
  rotationSpeed?: number;
  highlightBeams?: boolean;
}

export const RadarDishSilhouette: React.FC<RadarDishProps> = ({
  scale = 1,
  rotationSpeed = 1,
  highlightBeams = true,
}) => {
  const frame = useCurrentFrame();
  const sweepAngle = (frame * 2 * rotationSpeed) % 360;

  return (
    <g transform={`scale(${scale})`}>
      {/* Lattice Tower Base */}
      <path d="M -40 120 L -15 0 L 15 0 L 40 120 Z" fill="#090D12" stroke="#334155" strokeWidth="2" />
      <line x1="-30" y1="80" x2="30" y2="40" stroke="#475569" strokeWidth="1.5" />
      <line x1="30" y1="80" x2="-30" y2="40" stroke="#475569" strokeWidth="1.5" />

      {/* Rotating Parabolic Dish */}
      <g transform={`translate(0, 0) rotate(${Math.sin((sweepAngle * Math.PI) / 180) * 35})`}>
        <path d="M -80 -25 C -50 -55 50 -55 80 -25 L 0 0 Z" fill="#0F172A" stroke="#38BDF8" strokeWidth="3" />
        <line x1="0" y1="-10" x2="0" y2="-60" stroke="#64748B" strokeWidth="2" />
        <circle cx="0" cy="-60" r="5" fill="#EF4444" />
        {highlightBeams && (
          <ellipse
            cx="0"
            cy="-80"
            rx="50"
            ry="10"
            fill="none"
            stroke="rgba(56, 189, 248, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
        )}
      </g>
    </g>
  );
};
