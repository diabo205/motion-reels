import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import {
  Scene01STRUCTURALFRACTURESilhouette,
  Scene02SPLITCONFRONTATIONSilhouette,
  Scene03LONELEADERSilhouette,
  Scene04VECTORMAPSilhouette,
  Scene05CROWDTALLYSilhouette,
  Scene06LONELEADERSilhouette,
  Scene07STRUCTURALFRACTURESilhouette,
  Scene08SPLITCONFRONTATIONSilhouette,
  Scene09QUOTECARDSilhouette,
  Scene10LONELEADERSilhouette,
  Scene11QUOTECARDSilhouette,
  Scene12SPLITCONFRONTATIONSilhouette,
  Scene13STRUCTURALFRACTURESilhouette,
  Scene14QUOTECARDSilhouette,
  Scene15CROWDTALLYSilhouette,
  Scene16LONELEADERSilhouette,
  Scene17STRUCTURALFRACTURESilhouette,
  Scene18SPLITCONFRONTATIONSilhouette,
  Scene19QUOTECARDSilhouette,
  Scene20VEHICLEINTRANSITSilhouette,
  Scene21LONELEADERSilhouette,
  Scene22SPLITCONFRONTATIONSilhouette,
  Scene23STRUCTURALFRACTURESilhouette,
  Scene24QUOTECARDSilhouette,
  Scene25CROWDTALLYSilhouette,
  Scene26LONELEADERSilhouette,
} from '../../projects/burari-deaths-2018/plates/TracedPlateAssets';

const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/**
 * Deterministic pseudo-random generator without Math.random()
 */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// =========================================================================
// REUSABLE VOLUMETRIC AURAS & STRUCTURAL DETAIL LAYERS
// =========================================================================

export const TerracottaDawnAura: React.FC<{ cx?: number; cy?: number; rx?: number; ry?: number; id?: string }> = ({
  cx = 540,
  cy = 1180,
  rx = 460,
  ry = 260,
  id = 'terracottaDawnAura',
}) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.1) * 0.03;
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EA580C" stopOpacity={0.65} />
          <stop offset="40%" stopColor="#9A3412" stopOpacity={0.4} />
          <stop offset="80%" stopColor="#431407" stopOpacity={0.15} />
          <stop offset="100%" stopColor="#1C1917" stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={rx * pulse} ry={ry * pulse} fill={`url(#${id})`} />
    </g>
  );
};

export const MidnightVoidAura: React.FC<{ cx?: number; cy?: number; rx?: number; ry?: number; id?: string }> = ({
  cx = 540,
  cy = 1180,
  rx = 480,
  ry = 280,
  id = 'midnightVoidAura',
}) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.08) * 0.02;
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1E293B" stopOpacity={0.7} />
          <stop offset="45%" stopColor="#0F172A" stopOpacity={0.45} />
          <stop offset="85%" stopColor="#020617" stopOpacity={0.2} />
          <stop offset="100%" stopColor="#020617" stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={rx * pulse} ry={ry * pulse} fill={`url(#${id})`} />
    </g>
  );
};

export const IncenseDiyaFlameAura: React.FC<{ cx?: number; cy?: number; rx?: number; ry?: number; id?: string }> = ({
  cx = 540,
  cy = 1180,
  rx = 440,
  ry = 250,
  id = 'incenseDiyaFlameAura',
}) => {
  const frame = useCurrentFrame();
  const flicker = 1 + Math.sin(frame * 0.22) * 0.05 + Math.cos(frame * 0.35) * 0.03;
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.75} />
          <stop offset="35%" stopColor="#D97706" stopOpacity={0.45} />
          <stop offset="75%" stopColor="#78350F" stopOpacity={0.2} />
          <stop offset="100%" stopColor="#1C1917" stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={rx * flicker} ry={ry * flicker} fill={`url(#${id})`} />
    </g>
  );
};

export const TacticalCordonAura: React.FC<{ cx?: number; cy?: number; rx?: number; ry?: number; id?: string }> = ({
  cx = 540,
  cy = 1180,
  rx = 460,
  ry = 260,
  id = 'tacticalCordonAura',
}) => {
  const frame = useCurrentFrame();
  const strobe = 1 + Math.sin(frame * 0.18) * 0.06;
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0284C7" stopOpacity={0.7} />
          <stop offset="35%" stopColor="#1E3A8A" stopOpacity={0.45} />
          <stop offset="75%" stopColor="#0F172A" stopOpacity={0.2} />
          <stop offset="100%" stopColor="#020617" stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={rx * strobe} ry={ry * strobe} fill={`url(#${id})`} />
    </g>
  );
};

export const VedicSacredCanopyAura: React.FC<{ cx?: number; cy?: number; rx?: number; ry?: number; id?: string }> = ({
  cx = 540,
  cy = 1180,
  rx = 480,
  ry = 270,
  id = 'vedicSacredCanopyAura',
}) => {
  const frame = useCurrentFrame();
  const glow = 1 + Math.sin(frame * 0.09) * 0.03;
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.65} />
          <stop offset="40%" stopColor="#4C1D95" stopOpacity={0.4} />
          <stop offset="80%" stopColor="#1E1B4B" stopOpacity={0.15} />
          <stop offset="100%" stopColor="#090D12" stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={rx * glow} ry={ry * glow} fill={`url(#${id})`} />
    </g>
  );
};

/**
 * Tangled North Delhi overhead power wiring clusters
 */
export const OverheadPowerWiringLayer: React.FC = () => {
  return (
    <g stroke="#18181B" strokeWidth="2.5" fill="none" opacity="0.65">
      <path d="M 0 920 Q 270 980 540 940 T 1080 910" />
      <path d="M 0 950 Q 320 1010 640 970 T 1080 940" />
      <path d="M 0 980 Q 220 1040 500 1000 T 1080 970" />
      <path d="M 120 900 L 120 1060 M 340 920 L 340 1050 M 760 910 L 760 1040" stroke="#27272A" strokeWidth="3" />
      <circle cx="120" cy="940" r="5" fill="#52525B" />
      <circle cx="340" cy="960" r="5" fill="#52525B" />
      <circle cx="760" cy="950" r="5" fill="#52525B" />
    </g>
  );
};

/**
 * Iron welded ceiling ventilation rebar mesh
 */
export const CeilingIronMeshLayer: React.FC<{ opacity?: number }> = ({ opacity = 0.55 }) => {
  return (
    <g stroke="#090D12" strokeWidth="3.5" fill="none" opacity={opacity}>
      <path d="M 120 880 L 960 880" />
      <path d="M 120 920 L 960 920" />
      <path d="M 120 960 L 960 960" />
      <path d="M 120 1000 L 960 1000" />
      <path d="M 120 1040 L 960 1040" />
      <path d="M 160 860 L 160 1060" />
      <path d="M 240 860 L 240 1060" />
      <path d="M 320 860 L 320 1060" />
      <path d="M 400 860 L 400 1060" />
      <path d="M 480 860 L 480 1060" />
      <path d="M 560 860 L 560 1060" />
      <path d="M 640 860 L 640 1060" />
      <path d="M 720 860 L 720 1060" />
      <path d="M 800 860 L 800 1060" />
      <path d="M 880 860 L 880 1060" />
      <path d="M 960 860 L 960 1060" />
      <rect x="110" y="860" width="860" height="205" stroke="#27272A" strokeWidth="6" rx="4" />
    </g>
  );
};

/**
 * Authentic Delhi urban architectural details (brick mortar, cracks, cornices, wires)
 */
export const DelhiArchitecturalDetails: React.FC = () => {
  return (
    <g stroke="#27272A" strokeWidth="2" fill="none" opacity="0.6">
      <path d="M 120 940 L 480 940 M 120 980 L 480 980 M 120 1020 L 480 1020 M 120 1060 L 480 1060" />
      <path d="M 180 940 L 180 980 M 260 940 L 260 980 M 340 940 L 340 980 M 420 940 L 420 980" />
      <path d="M 220 980 L 220 1020 M 300 980 L 300 1020 M 380 980 L 380 1020 M 460 980 L 460 1020" />
      <path d="M 600 940 L 960 940 M 600 980 L 960 980 M 600 1020 L 960 1020 M 600 1060 L 960 1060" />
      <path d="M 660 940 L 660 980 M 740 940 L 740 980 M 820 940 L 820 980 M 900 940 L 900 980" />
      <path d="M 700 980 L 700 1020 M 780 980 L 780 1020 M 860 980 L 860 1020 M 940 980 L 940 1020" />
      <path d="M 140 1120 Q 320 1140 500 1120 T 860 1120" stroke="#78350F" strokeWidth="3" />
      <path d="M 160 1240 Q 340 1260 520 1240 T 880 1240" stroke="#78350F" strokeWidth="3" />
      <path d="M 320 900 L 320 1440" stroke="#18181B" strokeWidth="4" />
      <path d="M 760 900 L 760 1440" stroke="#18181B" strokeWidth="4" />
      <path d="M 240 1380 L 280 1440 L 320 1380" stroke="#DC2626" strokeWidth="2" />
      <path d="M 720 1380 L 760 1440 L 800 1380" stroke="#DC2626" strokeWidth="2" />
    </g>
  );
};

/**
 * Drifting ash particles and smoke embers
 */

/**
 * Authentic interior temple and wooden mandir carving details
 */
export const InteriorTempleCarvingDetails: React.FC = () => {
  return (
    <g stroke="#F59E0B" strokeWidth="2.5" fill="none" opacity="0.55">
      <path d="M 140 920 Q 340 900 540 920 T 940 920" />
      <path d="M 140 960 Q 340 940 540 960 T 940 960" />
      <path d="M 140 1000 Q 340 980 540 1000 T 940 1000" />
      <path d="M 160 920 C 160 950 180 970 200 950 S 240 920 240 950" />
      <path d="M 320 920 C 320 950 340 970 360 950 S 400 920 400 950" />
      <path d="M 480 920 C 480 950 500 970 520 950 S 560 920 560 950" />
      <path d="M 640 920 C 640 950 660 970 680 950 S 720 920 720 950" />
      <path d="M 800 920 C 800 950 820 970 840 950 S 880 920 880 950" />
      <path d="M 220 1040 L 260 1120 L 300 1040" stroke="#D97706" strokeWidth="3" />
      <path d="M 420 1040 L 460 1120 L 500 1040" stroke="#D97706" strokeWidth="3" />
      <path d="M 620 1040 L 660 1120 L 700 1040" stroke="#D97706" strokeWidth="3" />
      <path d="M 820 1040 L 860 1120 L 900 1040" stroke="#D97706" strokeWidth="3" />
      <path d="M 180 1280 Q 540 1320 900 1280" stroke="#B45309" strokeWidth="3.5" />
      <path d="M 200 1340 Q 540 1380 880 1340" stroke="#B45309" strokeWidth="3.5" />
    </g>
  );
};

/**
 * Authentic forensic cordon, rebar mesh, and crime scene markers
 */
export const ForensicCordonMeshDetails: React.FC = () => {
  return (
    <g stroke="#38BDF8" strokeWidth="2" fill="none" opacity="0.55">
      <path d="M 100 900 L 980 900 M 100 940 L 980 940 M 100 980 L 980 980" />
      <path d="M 100 1020 L 980 1020 M 100 1060 L 980 1060 M 100 1100 L 980 1100" />
      <path d="M 140 880 L 140 1120 M 260 880 L 260 1120 M 380 880 L 380 1120" />
      <path d="M 500 880 L 500 1120 M 620 880 L 620 1120 M 740 880 L 740 1120 M 860 880 L 860 1120" />
      <path d="M 120 1380 L 320 1440 L 520 1380 L 720 1440 L 920 1380" stroke="#EF4444" strokeWidth="3" />
      <path d="M 120 1420 L 320 1480 L 520 1420 L 720 1480 L 920 1420" stroke="#EF4444" strokeWidth="3" />
      <path d="M 220 1220 L 250 1260 L 280 1220" stroke="#F59E0B" strokeWidth="2.5" />
      <path d="M 420 1220 L 450 1260 L 480 1220" stroke="#F59E0B" strokeWidth="2.5" />
      <path d="M 620 1220 L 650 1260 L 680 1220" stroke="#F59E0B" strokeWidth="2.5" />
      <path d="M 820 1220 L 850 1260 L 880 1220" stroke="#F59E0B" strokeWidth="2.5" />
    </g>
  );
};

export const FloatingAshEmbers: React.FC = () => {
  return (
    <g fill="#FEF08A" opacity="0.45">
      <path d="M 180 940 Q 185 930 190 940 T 180 940 Z" />
      <path d="M 320 980 Q 325 970 330 980 T 320 980 Z" />
      <path d="M 460 920 Q 465 910 470 920 T 460 920 Z" />
      <path d="M 640 960 Q 645 950 650 960 T 640 960 Z" />
      <path d="M 780 930 Q 785 920 790 930 T 780 930 Z" />
      <path d="M 220 1040 Q 225 1030 230 1040 T 220 1040 Z" />
      <path d="M 520 1060 Q 525 1050 530 1060 T 520 1060 Z" />
      <path d="M 840 1020 Q 845 1010 850 1020 T 840 1020 Z" />
      <path d="M 380 1120 Q 385 1110 390 1120 T 380 1120 Z" />
      <path d="M 680 1140 Q 685 1130 690 1140 T 680 1140 Z" />
    </g>
  );
};

// =========================================================================
// 1. SCENE 1: BurariHouseFacadeFracture (Hook, STRUCTURAL_FRACTURE)
// =========================================================================
export const BurariHouseFacadeFracture: React.FC<{ durationFrames?: number }> = ({ durationFrames = 96 }) => {
  const frame = useCurrentFrame();
  const splitProgress = interpolate(frame, [0, 38], [0, 36], CLAMP);
  const flash = interpolate(frame, [36, 42, 54], [0, 0.85, 0], CLAMP);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id="masonryWash" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9A3412" />
            <stop offset="50%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#1C1917" />
          </linearGradient>
          <radialGradient id="houseCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DC2626" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#991B1B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#450A0A" stopOpacity="0" />
          </radialGradient>
        </defs>

        <TerracottaDawnAura cx={540} cy={1180} />
        <OverheadPowerWiringLayer />
        <DelhiArchitecturalDetails />
        <FloatingAshEmbers />

        {/* Traced authentic Delhi street facade blueprint */}
        <g transform="translate(0, 150) scale(1.0)" opacity="0.45">
          <Scene01STRUCTURALFRACTURESilhouette />
        </g>

        {/* Left House Facade Wing */}
        <g transform={`translate(${-splitProgress}, 0)`}>
          <path
            d="M 120 1480 L 120 960 L 320 960 L 320 920 L 520 920 L 520 1480 Z"
            fill="url(#masonryWash)"
            stroke="#1C1917"
            strokeWidth="4"
          />
          {/* Windows and Balcony Details */}
          <rect x="160" y="1000" width="110" height="140" fill="#090D12" stroke="#27272A" strokeWidth="3" />
          <rect x="340" y="980" width="130" height="180" fill="#090D12" stroke="#27272A" strokeWidth="3" />
          <path d="M 160 1140 L 270 1140 M 340 1160 L 470 1160" stroke="#F59E0B" strokeWidth="3" />
          {/* Balcony Railings */}
          <path d="M 140 1180 L 300 1180 M 140 1200 L 300 1200" stroke="#18181B" strokeWidth="3" />
          <path d="M 160 1180 L 160 1220 M 200 1180 L 200 1220 M 240 1180 L 240 1220 M 280 1180 L 280 1220" stroke="#18181B" strokeWidth="2.5" />
          {/* Ground Floor Shutter */}
          <rect x="140" y="1260" width="360" height="210" fill="#18181B" stroke="#27272A" strokeWidth="4" />
          <path d="M 140 1290 L 500 1290 M 140 1320 L 500 1320 M 140 1350 L 500 1350 M 140 1380 L 500 1380 M 140 1410 L 500 1410 M 140 1440 L 500 1440" stroke="#090D12" strokeWidth="2" />
        </g>

        {/* Right House Facade Wing */}
        <g transform={`translate(${splitProgress}, 0)`}>
          <path
            d="M 560 920 L 760 920 L 760 960 L 960 960 L 960 1480 L 560 1480 Z"
            fill="url(#masonryWash)"
            stroke="#1C1917"
            strokeWidth="4"
          />
          {/* Windows & Balcony */}
          <rect x="610" y="980" width="130" height="180" fill="#090D12" stroke="#27272A" strokeWidth="3" />
          <rect x="810" y="1000" width="110" height="140" fill="#090D12" stroke="#27272A" strokeWidth="3" />
          <path d="M 610 1160 L 740 1160 M 810 1140 L 920 1140" stroke="#F59E0B" strokeWidth="3" />
          {/* Ground Floor Shutter Right */}
          <rect x="580" y="1260" width="360" height="210" fill="#18181B" stroke="#27272A" strokeWidth="4" />
          <path d="M 580 1290 L 940 1290 M 580 1320 L 940 1320 M 580 1350 L 940 1350 M 580 1380 L 940 1380 M 580 1410 L 940 1410 M 580 1440 L 940 1440" stroke="#090D12" strokeWidth="2" />
        </g>

        {/* Jagged Central Structural Fracture Fissure */}
        <path
          d="M 530 890 L 550 960 L 525 1040 L 555 1130 L 520 1220 L 550 1330 L 525 1420 L 545 1490"
          stroke="#EF4444"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 535 960 L 490 990 M 525 1040 L 565 1070 M 555 1130 L 485 1170 M 520 1220 L 560 1250 M 550 1330 L 500 1360"
          stroke="#F87171"
          strokeWidth="3.5"
          fill="none"
        />

        {/* Interior Void Revealing Faint Suspended Cords */}
        <g opacity={Math.min(1, splitProgress / 20)}>
          <ellipse cx="540" cy="1180" rx="40" ry="140" fill="url(#houseCoreGlow)" />
          <path d="M 525 930 L 525 1180 M 540 930 L 540 1200 M 555 930 L 555 1180" stroke="#FEE2E2" strokeWidth="2" strokeDasharray="3,3" />
        </g>

        {/* Detonation / Dawn Reveal Flash */}
        {flash > 0 && (
          <rect x="0" y="864" width="1080" height="634" fill="#FEF08A" opacity={flash * 0.4} />
        )}
      </svg>
    </div>
  );
};

// =========================================================================
// 2. SCENE 2: NeighbourShutteredShopSplit (SPLIT_CONFRONTATION)
// =========================================================================
export const NeighbourShutteredShopSplit: React.FC<{ durationFrames?: number }> = ({ durationFrames = 114 }) => {
  const frame = useCurrentFrame();
  const panX = interpolate(frame, [0, durationFrames], [-12, 12], CLAMP);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <DelhiArchitecturalDetails />
        <FloatingAshEmbers />
        <defs>
          <linearGradient id="alleyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#090D12" />
          </linearGradient>
        </defs>
        <MidnightVoidAura cx={540} cy={1180} />
        <OverheadPowerWiringLayer />

        <g transform={`translate(${panX}, 0)`}>
          {/* Traced authentic facade reference */}
          <g transform="translate(140, 160) scale(0.85)" opacity="0.35">
            <Scene02SPLITCONFRONTATIONSilhouette />
          </g>

          {/* Left: Neighbour Gurcharan Singh holding milk packet */}
          <g transform="translate(180, 1020)">
            <ellipse cx="140" cy="80" rx="36" ry="46" fill="#18181B" />
            <path d="M 120 70 Q 140 50 160 70 L 155 90 Z" fill="#27272A" />
            <path d="M 90 125 C 90 110 190 110 190 125 L 205 380 L 75 380 Z" fill="#27272A" stroke="#090D12" strokeWidth="3" />
            {/* Extended arm holding white milk pouch */}
            <path d="M 175 160 L 250 200 L 260 250" stroke="#18181B" strokeWidth="16" strokeLinecap="round" fill="none" />
            <rect x="245" y="240" width="36" height="50" rx="4" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
            {/* Legs & Sandals */}
            <path d="M 110 380 L 105 450 M 170 380 L 175 450" stroke="#18181B" strokeWidth="18" strokeLinecap="round" />
            <ellipse cx="100" cy="450" rx="22" ry="8" fill="#090D12" />
            <ellipse cx="180" cy="450" rx="22" ry="8" fill="#090D12" />
          </g>

          {/* Vertical Dividing Axis */}
          <line x1="540" y1="880" x2="540" y2="1480" stroke="#38BDF8" strokeWidth="3.5" strokeDasharray="8,6" opacity="0.8" />

          {/* Right: Shuttered Grocery Storefront */}
          <g transform="translate(560, 960)">
            <rect x="20" y="40" width="380" height="420" fill="url(#alleyGradient)" stroke="#18181B" strokeWidth="4" />
            {/* Shutter Slats */}
            {Array.from({ length: 14 }).map((_, i) => (
              <line key={i} x1="20" y1={70 + i * 26} x2="400" y2={70 + i * 26} stroke="#334155" strokeWidth="2.5" />
            ))}
            {/* Heavy Brass Padlock Unopened */}
            <rect x="195" y="400" width="30" height="40" rx="5" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />
            <path d="M 200 400 A 10 10 0 0 1 220 400" stroke="#D97706" strokeWidth="5" fill="none" />
            {/* Uncollected Newspaper on Doorstep */}
            <rect x="140" y="445" width="70" height="20" rx="3" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 3. SCENE 3: FlashlightCorridorHero (LONE_LEADER)
// =========================================================================
export const FlashlightCorridorHero: React.FC<{ durationFrames?: number }> = ({ durationFrames = 108 }) => {
  const frame = useCurrentFrame();
  const beamAngle = Math.sin(frame * 0.08) * 3;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <ForensicCordonMeshDetails />
        <FloatingAshEmbers />
        <defs>
          <linearGradient id="beamGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#FEF9C3" stopOpacity="0.6" />
            <stop offset="80%" stopColor="#FEF08A" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <MidnightVoidAura cx={540} cy={1180} />
        <CeilingIronMeshLayer opacity={0.65} />

        {/* Traced authentic grill blueprint */}
        <g transform="translate(180, 180) scale(0.8)" opacity="0.4">
          <Scene03LONELEADERSilhouette />
        </g>

        {/* Corridor Perspective Walls */}
        <path d="M 80 880 L 320 1080 L 320 1480 L 80 1480 Z" fill="#1C1917" stroke="#27272A" strokeWidth="3" />
        <path d="M 1000 880 L 760 1080 L 760 1480 L 1000 1480 Z" fill="#1C1917" stroke="#27272A" strokeWidth="3" />
        <line x1="320" y1="1480" x2="760" y2="1480" stroke="#090D12" strokeWidth="6" />

        {/* Flashlight Beam Casting Long Diagonal Cone */}
        <g transform={`rotate(${beamAngle}, 240, 1280)`}>
          <polygon points="240,1280 880,980 940,1360" fill="url(#beamGrad)" />
        </g>

        {/* Silhouette of Neighbour at the Banister */}
        <g transform="translate(140, 1120)">
          <ellipse cx="80" cy="50" rx="30" ry="38" fill="#090D12" />
          <path d="M 50 85 C 50 80 120 80 120 85 L 130 320 L 40 320 Z" fill="#18181B" stroke="#090D12" strokeWidth="3" />
          {/* Extended arm holding flashlight */}
          <path d="M 100 120 L 170 145 L 210 140" stroke="#18181B" strokeWidth="14" strokeLinecap="round" fill="none" />
          <rect x="200" y="130" width="35" height="18" rx="3" fill="#D97706" />
          <ellipse cx="235" cy="139" rx="4" ry="9" fill="#FEF08A" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 4. SCENE 4: SantNagarTacticalMap (VECTOR_MAP)
// =========================================================================
export const SantNagarTacticalMap: React.FC<{ durationFrames?: number }> = ({ durationFrames = 108 }) => {
  const frame = useCurrentFrame();
  const sweep = (frame * 3.5) % 360;
  const pulse = 1 + Math.sin(frame * 0.2) * 0.08;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <ForensicCordonMeshDetails />
        <FloatingAshEmbers />
        <TacticalCordonAura cx={540} cy={1180} />

        {/* Traced authentic Delhi locator map blueprint */}
        <g transform="translate(120, 140) scale(0.9)" opacity="0.45">
          <Scene04VECTORMAPSilhouette />
        </g>

        {/* Tactical Quadrille Grid */}
        <g stroke="#1E3A8A" strokeWidth="1" opacity="0.35">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`h${i}`} x1="80" y1={880 + i * 70} x2="1000" y2={880 + i * 70} />
          ))}
          {Array.from({ length: 13 }).map((_, i) => (
            <line key={`v${i}`} x1={80 + i * 70} y1="880" x2={80 + i * 70} y2={1480} />
          ))}
        </g>

        {/* Winding Yamuna River Corridor */}
        <path
          d="M 680 880 Q 720 980 650 1080 T 700 1280 T 630 1480"
          stroke="#0284C7"
          strokeWidth="38"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M 680 880 Q 720 980 650 1080 T 700 1280 T 630 1480"
          stroke="#38BDF8"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />

        {/* Delhi Arterial Road Vectors */}
        <path d="M 120 1020 L 520 1140 L 960 1100" stroke="#F59E0B" strokeWidth="5" fill="none" />
        <path d="M 320 880 L 520 1140 L 460 1480" stroke="#F59E0B" strokeWidth="5" fill="none" />

        {/* Concentric Cordon Range Rings over Sant Nagar */}
        <g transform="translate(520, 1140)">
          <circle cx="0" cy="0" r={60 * pulse} stroke="#EF4444" strokeWidth="3" fill="none" />
          <circle cx="0" cy="0" r={110 * pulse} stroke="#EF4444" strokeWidth="2" strokeDasharray="6,6" fill="none" />
          <circle cx="0" cy="0" r={160 * pulse} stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4,4" fill="none" />
          <line x1="-30" y1="0" x2="30" y2="0" stroke="#EF4444" strokeWidth="3" />
          <line x1="0" y1="-30" x2="0" y2="30" stroke="#EF4444" strokeWidth="3" />
          <circle cx="0" cy="0" r="12" fill="#DC2626" />
        </g>

        {/* Radar Sweep Line */}
        <g transform="translate(520, 1140)">
          <line
            x1="0"
            y1="0"
            x2={160 * Math.cos((sweep * Math.PI) / 180)}
            y2={160 * Math.sin((sweep * Math.PI) / 180)}
            stroke="#38BDF8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 5. SCENE 5: ThreeGenerationsTallyBoard (CROWD_TALLY)
// =========================================================================
export const ThreeGenerationsTallyBoard: React.FC<{ durationFrames?: number }> = ({ durationFrames = 106 }) => {
  const frame = useCurrentFrame();
  const counterVal = Math.min(11, Math.floor(interpolate(frame, [0, 60], [1, 11], CLAMP)));

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <InteriorTempleCarvingDetails />
        <FloatingAshEmbers />
        <CeilingIronMeshLayer />
        <OverheadPowerWiringLayer />
        <MidnightVoidAura cx={540} cy={1180} />

        {/* Traced authentic family portrait blueprint */}
        <g transform="translate(100, 150) scale(0.9)" opacity="0.35">
          <Scene05CROWDTALLYSilhouette />
        </g>

        {/* Row of 11 Family Silhouettes */}
        <g transform="translate(100, 1160)">
          {Array.from({ length: 11 }).map((_, i) => {
            const isLit = i < counterVal;
            const x = i * 78;
            const heightScale = i === 0 ? 1.15 : i >= 9 ? 0.75 : 0.95; // grandmother taller seated/grandkids smaller
            return (
              <g key={i} transform={`translate(${x}, ${50 - heightScale * 50}) scale(${heightScale})`}>
                <ellipse cx="35" cy="30" rx="18" ry="24" fill={isLit ? '#F59E0B' : '#27272A'} />
                <path
                  d="M 15 60 C 15 55 55 55 55 60 L 65 180 L 5 180 Z"
                  fill={isLit ? '#D97706' : '#18181B'}
                  stroke="#090D12"
                  strokeWidth="2.5"
                />
                {isLit && <circle cx="35" cy="30" r="32" fill="#FEF08A" opacity="0.25" />}
              </g>
            );
          })}
        </g>

        {/* Brass Tally Board Base */}
        <g transform="translate(240, 1360)">
          <rect x="0" y="0" width="600" height="90" rx="8" fill="#1C1917" stroke="#F59E0B" strokeWidth="4" />
          <text x="300" y="40" fill="#94A3B8" fontSize="24" fontFamily="Montserrat" textAnchor="middle" fontWeight="bold">
            THREE GENERATIONS LOST
          </text>
          <text x="300" y="75" fill="#F59E0B" fontSize="36" fontFamily="Montserrat" textAnchor="middle" fontWeight="900">
            {counterVal} / 11 VICTIMS
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 6. SCENE 6: PriyankaEngagementHero (LONE_LEADER)
// =========================================================================
export const PriyankaEngagementHero: React.FC<{ durationFrames?: number }> = ({ durationFrames = 105 }) => {
  const frame = useCurrentFrame();
  const raysRotate = (frame * 0.4) % 360;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <InteriorTempleCarvingDetails />
        <FloatingAshEmbers />
        <CeilingIronMeshLayer />
        <OverheadPowerWiringLayer />
        <defs>
          <radialGradient id="festiveSunburst" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#D97706" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#78350F" stopOpacity="0" />
          </radialGradient>
        </defs>
        <TerracottaDawnAura cx={540} cy={1180} />

        {/* Festive Rotating Sunburst Rays */}
        <g transform={`translate(540, 1180) rotate(${raysRotate})`}>
          {Array.from({ length: 16 }).map((_, i) => (
            <polygon
              key={i}
              points="0,0 20,-480 -20,-480"
              transform={`rotate(${i * 22.5})`}
              fill="#FDE68A"
              opacity="0.12"
            />
          ))}
        </g>

        {/* Traced authentic marigold engagement blueprint */}
        <g transform="translate(120, 140) scale(0.9)" opacity="0.4">
          <Scene06LONELEADERSilhouette />
        </g>

        {/* Priyanka Silhouette with Detailed Festive Attire */}
        <g transform="translate(420, 960)">
          {/* Head & Elaborate Dupatta Drapes */}
          <ellipse cx="120" cy="80" rx="36" ry="46" fill="#18181B" />
          <path d="M 80 80 Q 120 40 160 80 L 190 260 L 50 260 Z" fill="#9A3412" stroke="#B45309" strokeWidth="3" opacity="0.7" />
          {/* Festive Marigold Garland around Neck */}
          <path d="M 90 120 Q 120 180 150 120" stroke="#F59E0B" strokeWidth="18" strokeLinecap="round" fill="none" />
          <path d="M 90 120 Q 120 180 150 120" stroke="#FEF08A" strokeWidth="8" strokeLinecap="round" strokeDasharray="10,8" fill="none" />
          {/* Bodice and Formal Anarkali Dress */}
          <path d="M 70 140 C 70 130 170 130 170 140 L 220 460 L 20 460 Z" fill="#1C1917" stroke="#F59E0B" strokeWidth="3" />
          {/* Traditional Bangles & Hands Holding Sweets Tray */}
          <path d="M 60 220 L 100 260 L 140 260" stroke="#18181B" strokeWidth="12" strokeLinecap="round" fill="none" />
          <circle cx="100" cy="260" r="10" fill="#F59E0B" />
          <circle cx="115" cy="260" r="10" fill="#DC2626" />
          <ellipse cx="120" cy="270" rx="45" ry="12" fill="#D97706" stroke="#FEF08A" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 7. SCENE 7: BindingsAndCottonFracture (STRUCTURAL_FRACTURE)
// =========================================================================
export const BindingsAndCottonFracture: React.FC<{ durationFrames?: number }> = ({ durationFrames = 103 }) => {
  const frame = useCurrentFrame();
  const shake = interpolate(frame, [0, 41], [0, 8], CLAMP);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <ForensicCordonMeshDetails />
        <FloatingAshEmbers />
        <MidnightVoidAura cx={540} cy={1180} />
        <CeilingIronMeshLayer opacity={0.6} />

        {/* Traced authentic mesh reference */}
        <g transform="translate(140, 160) scale(0.85)" opacity="0.35">
          <Scene07STRUCTURALFRACTURESilhouette />
        </g>

        {/* Bound Hands & Nylon Ropes Close-Up */}
        <g transform={`translate(${540 + Math.sin(frame * 0.4) * shake}, 1120)`}>
          {/* Wrist Cross-Section */}
          <rect x="-140" y="-80" width="120" height="180" rx="25" fill="#1C1917" stroke="#27272A" strokeWidth="4" />
          <rect x="20" y="-80" width="120" height="180" rx="25" fill="#1C1917" stroke="#27272A" strokeWidth="4" />
          {/* Heavy White Nylon Binding Ropes */}
          <path d="M -160 -30 L 160 -30 M -160 0 L 160 0 M -160 30 L 160 30 M -160 60 L 160 60" stroke="#F8FAFC" strokeWidth="12" strokeLinecap="round" />
          <path d="M -160 -30 L 160 -30 M -160 0 L 160 0 M -160 30 L 160 30 M -160 60 L 160 60" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" strokeDasharray="8,6" />

          {/* White Medical Cotton Ear Plugs Iconography */}
          <circle cx="-180" cy="-140" r="30" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />
          <circle cx="180" cy="-140" r="30" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />

          {/* Brown Adhesive Mouth Tape */}
          <rect x="-110" y="-220" width="220" height="50" rx="4" fill="#78350F" stroke="#451A03" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 8. SCENE 8: ElevenPipesWallSplit (SPLIT_CONFRONTATION)
// =========================================================================
export const ElevenPipesWallSplit: React.FC<{ durationFrames?: number }> = ({ durationFrames = 107 }) => {
  const frame = useCurrentFrame();
  const panY = interpolate(frame, [0, durationFrames], [-10, 10], CLAMP);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <DelhiArchitecturalDetails />
        <FloatingAshEmbers />
        <OverheadPowerWiringLayer />
        <CeilingIronMeshLayer />
        <TerracottaDawnAura cx={540} cy={1180} />

        {/* Traced authentic 11 pipes blueprint */}
        <g transform="translate(100, 140) scale(0.9)" opacity="0.4">
          <Scene08SPLITCONFRONTATIONSilhouette />
        </g>

        {/* Exposed Red Brick Facade Wall with Mortar Joints */}
        <g transform={`translate(0, ${panY})`}>
          <rect x="120" y="900" width="840" height="560" fill="#9A3412" stroke="#1C1917" strokeWidth="6" />
          {/* Brick Mortar Courses */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1="120" y1={920 + i * 44} x2="960" y2={920 + i * 44} stroke="#431407" strokeWidth="3" />
          ))}

          {/* Exactly Eleven PVC Pipes Protruding from Wall */}
          {/* 4 Straight Horizontal Pipes */}
          {Array.from({ length: 4 }).map((_, i) => {
            const x = 200 + i * 80;
            return (
              <g key={`straight${i}`} transform={`translate(${x}, 1080)`}>
                <rect x="0" y="0" width="30" height="90" rx="4" fill="#F1F5F9" stroke="#64748B" strokeWidth="3" />
                <ellipse cx="15" cy="90" rx="15" ry="6" fill="#090D12" />
              </g>
            );
          })}

          {/* 7 Bent Downward Elbow Pipes */}
          {Array.from({ length: 7 }).map((_, i) => {
            const x = 540 + i * 55;
            return (
              <g key={`bent${i}`} transform={`translate(${x}, 1080)`}>
                <path d="M 0 0 L 0 50 Q 0 80 25 80 L 40 80" stroke="#F1F5F9" strokeWidth="22" strokeLinecap="square" fill="none" />
                <ellipse cx="40" cy="80" rx="6" ry="11" fill="#090D12" />
              </g>
            );
          })}

          {/* Conduit Dimension Labels */}
          <text x="540" y="1420" fill="#FEF08A" fontSize="30" fontFamily="Montserrat" textAnchor="middle" fontWeight="bold">
            11 PVC OUTLETS: 4 STRAIGHT • 7 BENT
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 9. SCENE 9: MediaFrenzyQuoteCard (QUOTE_CARD)
// =========================================================================
export const MediaFrenzyQuoteCard: React.FC<{ durationFrames?: number }> = ({ durationFrames = 106 }) => {
  const frame = useCurrentFrame();
  const strobe = frame % 12 < 6 ? 1 : 0.4;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <TacticalCordonAura cx={540} cy={1180} />

        {/* Traced autopsy evidence blueprint */}
        <g transform="translate(120, 150) scale(0.9)" opacity="0.35">
          <Scene09QUOTECARDSilhouette />
        </g>

        {/* Television Newsroom Chyron Stack */}
        <g transform="translate(120, 980)">
          {/* Breaking News Scarlet Header */}
          <rect x="0" y="0" width="840" height="90" rx="6" fill="#DC2626" stroke="#991B1B" strokeWidth="3" />
          <circle cx="50" cy="45" r="14" fill="#FFFFFF" opacity={strobe} />
          <text x="85" y="55" fill="#FFFFFF" fontSize="38" fontFamily="Montserrat" fontWeight="900">
            BREAKING NEWS • BURARI HORROR
          </text>

          {/* Main Ticker Card */}
          <rect x="0" y="90" width="840" height="340" fill="#0F172A" stroke="#1E293B" strokeWidth="4" />
          {/* Microphone Cluster Silhouettes */}
          <path d="M 60 410 L 80 320 L 100 410 Z" fill="#334155" />
          <path d="M 120 410 L 140 290 L 160 410 Z" fill="#475569" />
          <path d="M 180 410 L 200 330 L 220 410 Z" fill="#334155" />

          {/* Sensation Headline Copy */}
          <text x="420" y="220" fill="#F8FAFC" fontSize="44" fontFamily="Montserrat" textAnchor="middle" fontWeight="bold">
            TANTRA • OCCULT • CONSPIRACY
          </text>
          <text x="420" y="300" fill="#EF4444" fontSize="36" fontFamily="Montserrat" textAnchor="middle" fontWeight="900">
            MEDIA FRENZY CONSUMES DELHI
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 10. SCENE 10: PrayerRoomShrineHero (LONE_LEADER)
// =========================================================================
export const PrayerRoomShrineHero: React.FC<{ durationFrames?: number }> = ({ durationFrames = 106 }) => {
  const frame = useCurrentFrame();
  const flamePulse = 1 + Math.sin(frame * 0.3) * 0.08;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <InteriorTempleCarvingDetails />
        <FloatingAshEmbers />
        <IncenseDiyaFlameAura cx={540} cy={1180} />

        {/* Traced authentic ancestor shrine blueprint */}
        <g transform="translate(140, 160) scale(0.85)" opacity="0.4">
          <Scene10LONELEADERSilhouette />
        </g>

        {/* Carved Mandir Shrine Architecture */}
        <g transform="translate(160, 940)">
          {/* Wooden Mandir Roof Arch */}
          <path d="M 60 120 Q 380 0 700 120 L 680 160 L 80 160 Z" fill="#78350F" stroke="#451A03" strokeWidth="5" />
          <rect x="80" y="160" width="600" height="360" fill="#1C1917" stroke="#78350F" strokeWidth="5" />

          {/* Mandir Carved Pillars */}
          <rect x="100" y="160" width="35" height="340" fill="#B45309" stroke="#78350F" strokeWidth="3" />
          <rect x="625" y="160" width="35" height="340" fill="#B45309" stroke="#78350F" strokeWidth="3" />

          {/* Framed Ancestor Portrait on Shelf */}
          <rect x="290" y="200" width="180" height="210" fill="#27272A" stroke="#F59E0B" strokeWidth="4" />
          <circle cx="380" cy="280" r="45" fill="#18181B" />
          {/* Flower Garland around Frame */}
          <path d="M 280 200 Q 380 340 480 200" stroke="#F59E0B" strokeWidth="12" fill="none" strokeDasharray="6,6" />

          {/* Stack of 11 Handwritten Diaries */}
          <g transform="translate(150, 420)">
            {Array.from({ length: 11 }).map((_, i) => (
              <rect
                key={i}
                x={i * 2}
                y={-i * 7}
                width="130"
                height="10"
                rx="2"
                fill={i % 2 === 0 ? '#1E3A8A' : '#1E293B'}
                stroke="#60A5FA"
                strokeWidth="1.5"
              />
            ))}
          </g>

          {/* Burning Brass Diya Lamp with Flickering Flame */}
          <g transform="translate(520, 420) scale(1.0)">
            <ellipse cx="25" cy="40" rx="25" ry="12" fill="#D97706" stroke="#B45309" strokeWidth="3" />
            <ellipse cx="25" cy={15} rx={12 * flamePulse} ry={22 * flamePulse} fill="#F59E0B" />
            <ellipse cx="25" cy={20} rx={6 * flamePulse} ry={12 * flamePulse} fill="#FEF08A" />
            {/* Curving Incense Smoke Path */}
            <path d="M 25 10 Q 15 -20 30 -50 T 20 -90" stroke="#E2E8F0" strokeWidth="2.5" fill="none" opacity="0.6" />
          </g>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 11. SCENE 11: PatriarchMemorialCard (QUOTE_CARD)
// =========================================================================
export const PatriarchMemorialCard: React.FC<{ durationFrames?: number }> = ({ durationFrames = 111 }) => {
  const frame = useCurrentFrame();
  const push = interpolate(frame, [0, durationFrames], [0.98, 1.02], CLAMP);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <IncenseDiyaFlameAura cx={540} cy={1180} />

        {/* Traced authentic ancestor portrait */}
        <g transform="translate(120, 150) scale(0.9)" opacity="0.35">
          <Scene11QUOTECARDSilhouette />
        </g>

        {/* Cardstock Framed Memorial Tribute Plinth */}
        <g transform={`translate(540, 1180) scale(${push})`}>
          <rect x="-380" y="-220" width="760" height="440" rx="10" fill="#1C1917" stroke="#78350F" strokeWidth="5" />
          <rect x="-360" y="-200" width="720" height="400" fill="#090D12" stroke="#B45309" strokeWidth="2" />

          {/* Draped Ancestor Profile Silhouette */}
          <g transform="translate(-240, -140)">
            <rect x="0" y="0" width="160" height="200" rx="6" fill="#18181B" stroke="#D97706" strokeWidth="3" />
            <ellipse cx="80" cy="80" rx="36" ry="46" fill="#F59E0B" opacity="0.3" />
            <path d="M 50 110 Q 80 150 110 110" stroke="#F59E0B" strokeWidth="8" fill="none" />
          </g>

          <text x="60" y="-80" fill="#F59E0B" fontSize="36" fontFamily="Montserrat" fontWeight="bold">
            PATRIARCH BHOPAL SINGH
          </text>
          <text x="60" y="-20" fill="#E2E8F0" fontSize="28" fontFamily="Montserrat">
            1930 — 2007
          </text>
          <line x1="60" y1="10" x2="300" y2="10" stroke="#78350F" strokeWidth="3" />
          <text x="60" y="60" fill="#94A3B8" fontSize="26" fontFamily="Montserrat">
            HEAD OF THE CHUNDAWATS
          </text>
          <text x="60" y="110" fill="#EF4444" fontSize="24" fontFamily="Montserrat" fontWeight="900">
            THE UNRESOLVED LOSS
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 12. SCENE 12: LalitTraumaSilenceSplit (SPLIT_CONFRONTATION)
// =========================================================================
export const LalitTraumaSilenceSplit: React.FC<{ durationFrames?: number }> = ({ durationFrames = 103 }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <DelhiArchitecturalDetails />
        <FloatingAshEmbers />
        <OverheadPowerWiringLayer />
        <CeilingIronMeshLayer />
        <MidnightVoidAura cx={540} cy={1180} />

        {/* Traced authentic facade reference */}
        <g transform="translate(100, 150) scale(0.9)" opacity="0.35">
          <Scene12SPLITCONFRONTATIONSilhouette />
        </g>

        {/* Left Side: Assault & Traumatic Silence */}
        <g transform="translate(140, 1020)">
          <rect x="0" y="0" width="360" height="420" fill="#1E1B4B" stroke="#4C1D95" strokeWidth="4" />
          {/* Silenced Head Contour with X Tape */}
          <ellipse cx="180" cy="180" rx="55" ry="75" fill="#090D12" stroke="#7C3AED" strokeWidth="3" />
          <path d="M 150 210 L 210 230 M 150 230 L 210 210" stroke="#EF4444" strokeWidth="6" />
          <text x="180" y="340" fill="#CBD5E1" fontSize="26" fontFamily="Montserrat" textAnchor="middle" fontWeight="bold">
            YEARS OF SILENCE
          </text>
        </g>

        {/* Central Split Axis */}
        <line x1="540" y1="880" x2="540" y2="1480" stroke="#7C3AED" strokeWidth="4" strokeDasharray="8,6" />

        {/* Right Side: Flatlined Voice Spectrum */}
        <g transform="translate(580, 1020)">
          <rect x="0" y="0" width="360" height="420" fill="#0F172A" stroke="#1E293B" strokeWidth="4" />
          {/* Flatline Audio Waveform */}
          <path d="M 30 210 L 140 210 L 160 210 L 180 210 L 330 210" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
          <circle cx="180" cy="210" r="10" fill="#DC2626" />
          <text x="180" y="340" fill="#CBD5E1" fontSize="26" fontFamily="Montserrat" textAnchor="middle" fontWeight="bold">
            VOICE ZERO (0 HZ)
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 13. SCENE 13: PossessionBreakthroughFracture (STRUCTURAL_FRACTURE)
// =========================================================================
export const PossessionBreakthroughFracture: React.FC<{ durationFrames?: number }> = ({ durationFrames = 108 }) => {
  const frame = useCurrentFrame();
  const auraScale = 1 + Math.sin(frame * 0.15) * 0.06;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <InteriorTempleCarvingDetails />
        <FloatingAshEmbers />
        <CeilingIronMeshLayer />
        <OverheadPowerWiringLayer />
        <defs>
          <radialGradient id="possessionAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.8" />
            <stop offset="45%" stopColor="#0D9488" stopOpacity="0.45" />
            <stop offset="85%" stopColor="#042F2E" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
        </defs>

        <TerracottaDawnAura cx={540} cy={1180} />

        {/* Traced authentic ancestor blueprint */}
        <g transform="translate(140, 150) scale(0.85)" opacity="0.35">
          <Scene13STRUCTURALFRACTURESilhouette />
        </g>

        {/* Dual Merging Silhouettes: Son Lalit & Spirit of Patriarch */}
        <g transform="translate(540, 1180)">
          <ellipse cx="0" cy="0" rx={240 * auraScale} ry={240 * auraScale} fill="url(#possessionAura)" />

          {/* Son Silhouette */}
          <g transform="translate(-40, -180)">
            <ellipse cx="0" cy="60" rx="35" ry="46" fill="#18181B" />
            <path d="M -30 95 C -30 90 30 90 30 95 L 45 320 L -45 320 Z" fill="#27272A" />
          </g>

          {/* Ghostly Patriarch Silhouette Layer Over Son */}
          <g transform="translate(40, -220)" opacity="0.75">
            <ellipse cx="0" cy="60" rx="42" ry="54" fill="#0D9488" stroke="#5EEAD4" strokeWidth="3" />
            <path d="M -35 105 C -35 100 35 100 35 105 L 55 360 L -55 360 Z" fill="#115E59" stroke="#2DD4BF" strokeWidth="2.5" />
            <path d="M -30 140 Q 0 180 30 140" stroke="#CCFBF1" strokeWidth="8" fill="none" />
          </g>

          {/* Jagged Psychic Fracture Bolt */}
          <path
            d="M 0 -260 L -30 -160 L 20 -70 L -40 20 L 30 120 L -10 240"
            stroke="#FEF08A"
            strokeWidth="5"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 14. SCENE 14: PriyankaDiariesWritingCard (QUOTE_CARD)
// =========================================================================
export const PriyankaDiariesWritingCard: React.FC<{ durationFrames?: number }> = ({ durationFrames = 104 }) => {
  const frame = useCurrentFrame();
  const penX = interpolate(frame, [0, durationFrames], [240, 780], CLAMP);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <TacticalCordonAura cx={540} cy={1180} />

        {/* Traced authentic notebook blueprint */}
        <g transform="translate(100, 140) scale(0.9)" opacity="0.4">
          <Scene14QUOTECARDSilhouette />
        </g>

        {/* Open Ruled Notebook Page */}
        <g transform="translate(140, 960)">
          <rect x="0" y="0" width="800" height="480" rx="8" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="4" />
          {/* Notebook Red Margin Line */}
          <line x1="100" y1="0" x2="100" y2="480" stroke="#EF4444" strokeWidth="3" />
          {/* Ruled Blue Ledger Lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={i} x1="100" y1={50 + i * 42} x2="760" y2={50 + i * 42} stroke="#93C5FD" strokeWidth="2" />
          ))}

          {/* Handwritten Script Simulator Path */}
          <path
            d="M 120 75 Q 160 65 200 75 T 280 75 T 360 75 T 440 75 T 520 75"
            stroke="#1E3A8A"
            strokeWidth="3.5"
            fill="none"
          />
          <path
            d="M 120 117 Q 180 107 240 117 T 380 117 T 520 117 T 640 117"
            stroke="#1E3A8A"
            strokeWidth="3.5"
            fill="none"
          />
          <path
            d="M 120 159 Q 200 149 280 159 T 420 159 T 580 159"
            stroke="#1E3A8A"
            strokeWidth="3.5"
            fill="none"
          />

          {/* Gold Fountain Pen Nib in Motion */}
          <g transform={`translate(${penX}, 150)`}>
            <polygon points="0,0 20,-60 -20,-60" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
            <rect x="-10" y="-140" width="20" height="80" fill="#1E293B" />
            <circle cx="0" cy="0" r="3" fill="#1E3A8A" />
          </g>

          <text x="440" y="440" fill="#475569" fontSize="24" fontFamily="Montserrat" textAnchor="middle" fontWeight="bold">
            11 YEARS OF REGISTERS • 2007–2018
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 15. SCENE 15: ProsperityExpansionTallyBoard (CROWD_TALLY)
// =========================================================================
export const ProsperityExpansionTallyBoard: React.FC<{ durationFrames?: number }> = ({ durationFrames = 106 }) => {
  const frame = useCurrentFrame();
  const shopCount = Math.min(3, Math.floor(interpolate(frame, [0, 50], [1, 3], CLAMP)));

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <DelhiArchitecturalDetails />
        <FloatingAshEmbers />
        <OverheadPowerWiringLayer />
        <CeilingIronMeshLayer />
        <TerracottaDawnAura cx={540} cy={1180} />

        {/* Traced authentic stools reference */}
        <g transform="translate(120, 160) scale(0.85)" opacity="0.35">
          <Scene15CROWDTALLYSilhouette />
        </g>

        {/* Three Expanding Business Fronts */}
        <g transform="translate(140, 960)">
          {Array.from({ length: 3 }).map((_, i) => {
            const isBuilt = i < shopCount;
            const x = i * 270;
            return (
              <g key={i} transform={`translate(${x}, 0)`} opacity={isBuilt ? 1 : 0.25}>
                <rect x="0" y="0" width="240" height="340" fill="#1C1917" stroke="#F59E0B" strokeWidth="4" rx="4" />
                <rect x="20" y="30" width="200" height="70" fill="#9A3412" stroke="#D97706" strokeWidth="2" />
                <text x="120" y="75" fill="#FEF08A" fontSize="20" fontFamily="Montserrat" textAnchor="middle" fontWeight="900">
                  {i === 0 ? 'GROCERY' : i === 1 ? 'PLYWOOD' : 'HARDWARE'}
                </text>
                {/* Rolling Shutter */}
                <rect x="20" y="120" width="200" height="200" fill="#090D12" stroke="#334155" strokeWidth="3" />
                {Array.from({ length: 6 }).map((_, j) => (
                  <line key={j} x1="20" y1={140 + j * 30} x2="220" y2={140 + j * 30} stroke="#475569" strokeWidth="2" />
                ))}
              </g>
            );
          })}
        </g>

        {/* Gold Prosperity Counter Banner */}
        <g transform="translate(240, 1360)">
          <rect x="0" y="0" width="600" height="85" rx="6" fill="#78350F" stroke="#F59E0B" strokeWidth="3" />
          <text x="300" y="55" fill="#FEF08A" fontSize="34" fontFamily="Montserrat" textAnchor="middle" fontWeight="900">
            BUSINESS FLOURISHED • 3 EXPANSIONS
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 16. SCENE 16: BadhTapasyaCommandHero (LONE_LEADER)
// =========================================================================
export const BadhTapasyaCommandHero: React.FC<{ durationFrames?: number }> = ({ durationFrames = 106 }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <InteriorTempleCarvingDetails />
        <FloatingAshEmbers />
        <DelhiArchitecturalDetails />
        <OverheadPowerWiringLayer />
        <VedicSacredCanopyAura cx={540} cy={1180} />

        {/* Traced authentic banyan tree roots */}
        <g transform="translate(100, 140) scale(0.9)" opacity="0.4">
          <Scene16LONELEADERSilhouette />
        </g>

        {/* Lalit Delivering The Fatal Command */}
        <g transform="translate(420, 980)">
          <ellipse cx="120" cy="70" rx="38" ry="48" fill="#18181B" />
          <path d="M 80 110 C 80 100 160 100 160 110 L 195 440 L 45 440 Z" fill="#27272A" stroke="#090D12" strokeWidth="3" />
          {/* Arm Raised Holding Sacred Copper Vessel */}
          <path d="M 150 140 L 220 100 L 250 80" stroke="#18181B" strokeWidth="16" strokeLinecap="round" fill="none" />
          <ellipse cx="255" cy="70" rx="20" ry="14" fill="#D97706" stroke="#B45309" strokeWidth="3" />
          {/* Flame rising from copper vessel */}
          <ellipse cx="255" cy="50" rx="8" ry="16" fill="#F59E0B" />
          {/* Red Sacred Cotton Threads Cascading */}
          <path d="M 255 80 Q 270 180 290 320" stroke="#DC2626" strokeWidth="4" fill="none" />
          <path d="M 255 80 Q 240 180 220 320" stroke="#DC2626" strokeWidth="4" fill="none" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 17. SCENE 17: BanyanTreeRootsFracture (STRUCTURAL_FRACTURE)
// =========================================================================
export const BanyanTreeRootsFracture: React.FC<{ durationFrames?: number }> = ({ durationFrames = 107 }) => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame * 0.08) * 6;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <InteriorTempleCarvingDetails />
        <FloatingAshEmbers />
        <DelhiArchitecturalDetails />
        <OverheadPowerWiringLayer />
        <VedicSacredCanopyAura cx={540} cy={1180} />

        {/* Traced authentic sprawling banyan tree canopy */}
        <g transform="translate(100, 140) scale(0.9)" opacity="0.45">
          <Scene17STRUCTURALFRACTURESilhouette />
        </g>

        {/* Sprawling Banyan Tree Canopy & Massive Aerial Roots */}
        <g transform="translate(120, 880)">
          {/* Dense Foliage Canopy Arch */}
          <path
            d="M 40 160 Q 240 40 440 120 T 800 160 L 760 240 L 60 240 Z"
            fill="#14532D"
            stroke="#166534"
            strokeWidth="4"
          />
          {/* Thick Horizontal Primary Branches */}
          <path d="M 60 200 Q 420 180 780 210" stroke="#1C1917" strokeWidth="34" strokeLinecap="round" fill="none" />

          {/* Ten Cascading Aerial Roots Descending to Earth */}
          {Array.from({ length: 10 }).map((_, i) => {
            const x = 120 + i * 66;
            const rootSway = sway * (i % 2 === 0 ? 1 : -1);
            return (
              <g key={i}>
                <path
                  d={`M ${x} 210 Q ${x + rootSway} 380 ${x} 580`}
                  stroke="#5A3E2D"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d={`M ${x - 4} 210 Q ${x + rootSway} 380 ${x - 4} 580`}
                  stroke="#3B261A"
                  strokeWidth="4"
                  fill="none"
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 18. SCENE 18: RootsVsDupattasSplit (SPLIT_CONFRONTATION)
// =========================================================================
export const RootsVsDupattasSplit: React.FC<{ durationFrames?: number }> = ({ durationFrames = 106 }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <InteriorTempleCarvingDetails />
        <FloatingAshEmbers />
        <CeilingIronMeshLayer />
        <OverheadPowerWiringLayer />
        <MidnightVoidAura cx={540} cy={1180} />

        {/* Traced authentic mesh reference */}
        <g transform="translate(100, 150) scale(0.9)" opacity="0.35">
          <Scene18SPLITCONFRONTATIONSilhouette />
        </g>

        {/* Left Side: Living Banyan Roots */}
        <g transform="translate(120, 920)">
          <rect x="0" y="0" width="380" height="520" fill="#14532D" opacity="0.25" stroke="#166534" strokeWidth="4" />
          <path d="M 20 60 Q 200 40 360 60" stroke="#1C1917" strokeWidth="22" fill="none" />
          {Array.from({ length: 5 }).map((_, i) => (
            <path
              key={i}
              d={`M ${70 + i * 60} 70 Q ${80 + i * 60} 260 ${70 + i * 60} 480`}
              stroke="#5A3E2D"
              strokeWidth="9"
              fill="none"
            />
          ))}
          <text x="190" y="490" fill="#FEF08A" fontSize="24" fontFamily="Montserrat" textAnchor="middle" fontWeight="bold">
            BANYAN ROOTS
          </text>
        </g>

        {/* Central Dividing Line */}
        <line x1="540" y1="880" x2="540" y2="1480" stroke="#EF4444" strokeWidth="4" strokeDasharray="8,6" />

        {/* Right Side: Ten Dupattas Suspended from Ceiling Mesh */}
        <g transform="translate(580, 920)">
          <rect x="0" y="0" width="380" height="520" fill="#090D12" stroke="#1E293B" strokeWidth="4" />
          {/* Iron Ceiling Mesh Bar */}
          <line x1="20" y1="60" x2="360" y2="60" stroke="#475569" strokeWidth="18" />
          {/* Silk Scarves Hanging */}
          {Array.from({ length: 5 }).map((_, i) => {
            const colors = ['#EF4444', '#F59E0B', '#3B82F6', '#10B981', '#EC4899'];
            return (
              <path
                key={i}
                d={`M ${70 + i * 60} 70 Q ${80 + i * 60} 260 ${70 + i * 60} 460`}
                stroke={colors[i]}
                strokeWidth="10"
                fill="none"
              />
            );
          })}
          <text x="190" y="490" fill="#EF4444" fontSize="24" fontFamily="Montserrat" textAnchor="middle" fontWeight="bold">
            CEILING SCARVES
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 19. SCENE 19: FinalPromiseQuoteCard (QUOTE_CARD)
// =========================================================================
export const FinalPromiseQuoteCard: React.FC<{ durationFrames?: number }> = ({ durationFrames = 107 }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <IncenseDiyaFlameAura cx={540} cy={1180} />

        {/* Traced authentic register blueprint */}
        <g transform="translate(120, 150) scale(0.9)" opacity="0.35">
          <Scene19QUOTECARDSilhouette />
        </g>

        {/* Weathered Diary Page with Chilling Final Promise */}
        <g transform="translate(140, 960)">
          <rect x="0" y="0" width="800" height="460" rx="10" fill="#1C1917" stroke="#78350F" strokeWidth="5" />
          <rect x="20" y="20" width="760" height="420" fill="#090D12" stroke="#B45309" strokeWidth="2" />

          <text x="400" y="90" fill="#F59E0B" fontSize="28" fontFamily="Montserrat" textAnchor="middle" fontWeight="bold">
            DIARY ENTRY • 30 JUNE 2018
          </text>
          <line x1="120" y1="120" x2="680" y2="120" stroke="#78350F" strokeWidth="3" />

          <text x="400" y="190" fill="#F8FAFC" fontSize="38" fontFamily="Montserrat" textAnchor="middle" fontWeight="bold">
            "THE EARTH WILL TREMBLE"
          </text>
          <text x="400" y="260" fill="#F8FAFC" fontSize="38" fontFamily="Montserrat" textAnchor="middle" fontWeight="bold">
            "THE SKY WILL PART"
          </text>
          <text x="400" y="340" fill="#EF4444" fontSize="42" fontFamily="Montserrat" textAnchor="middle" fontWeight="900">
            "AND FATHER WILL APPEAR"
          </text>

          <text x="400" y="410" fill="#94A3B8" fontSize="22" fontFamily="Montserrat" textAnchor="middle">
            DELHI POLICE EVIDENCE FILE #302/18
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 20. SCENE 20: MidnightStoolsTransitHero (VEHICLE_IN_TRANSIT)
// =========================================================================
export const MidnightStoolsTransitHero: React.FC<{ durationFrames?: number }> = ({ durationFrames = 103 }) => {
  const frame = useCurrentFrame();
  const transitX = interpolate(frame, [0, durationFrames], [-30, 30], CLAMP);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <ForensicCordonMeshDetails />
        <FloatingAshEmbers />
        <MidnightVoidAura cx={540} cy={1180} />
        <CeilingIronMeshLayer opacity={0.7} />

        {/* Traced authentic stools reference */}
        <g transform="translate(100, 150) scale(0.9)" opacity="0.35">
          <Scene20VEHICLEINTRANSITSilhouette />
        </g>

        {/* Eleven Stools in Transit Alignment Moving into Position */}
        <g transform={`translate(${transitX}, 0)`}>
          {Array.from({ length: 11 }).map((_, i) => {
            const x = 120 + i * 76;
            return (
              <g key={i} transform={`translate(${x}, 1280)`}>
                {/* Square Stool Seat */}
                <rect x="0" y="0" width="56" height="14" rx="3" fill="#D97706" stroke="#92400E" strokeWidth="2" />
                {/* 4 Stool Legs Spreading Down */}
                <line x1="6" y1="14" x2="2" y2="120" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
                <line x1="50" y1="14" x2="54" y2="120" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
                <line x1="18" y1="14" x2="16" y2="115" stroke="#451A03" strokeWidth="4" />
                <line x1="38" y1="14" x2="40" y2="115" stroke="#451A03" strokeWidth="4" />
                {/* Horizontal Rung */}
                <line x1="3" y1="65" x2="53" y2="65" stroke="#92400E" strokeWidth="3" />
              </g>
            );
          })}
        </g>

        {/* Floor Grid Coordinates */}
        <line x1="80" y1="1400" x2="1000" y2="1400" stroke="#334155" strokeWidth="3" strokeDasharray="6,6" />
      </svg>
    </div>
  );
};

// =========================================================================
// 21. SCENE 21: GrandmotherBedLeaderHero (LONE_LEADER)
// =========================================================================
export const GrandmotherBedLeaderHero: React.FC<{ durationFrames?: number }> = ({ durationFrames = 108 }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <InteriorTempleCarvingDetails />
        <FloatingAshEmbers />
        <CeilingIronMeshLayer />
        <OverheadPowerWiringLayer />
        <MidnightVoidAura cx={540} cy={1180} />

        {/* Traced authentic family matriarch reference */}
        <g transform="translate(120, 160) scale(0.85)" opacity="0.35">
          <Scene21LONELEADERSilhouette />
        </g>

        {/* Grandmother Narayani Devi Resting on Wooden Charpai */}
        <g transform="translate(240, 1080)">
          {/* Traditional Wooden Bed Frame */}
          <rect x="0" y="160" width="600" height="40" rx="4" fill="#5A3E2D" stroke="#3B261A" strokeWidth="4" />
          {/* 4 Turned Wooden Bed Legs */}
          <rect x="20" y="200" width="30" height="120" rx="5" fill="#3B261A" />
          <rect x="550" y="200" width="30" height="120" rx="5" fill="#3B261A" />
          {/* Woven Jute Webbing Pattern */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1={50 + i * 65} y1="160" x2={50 + i * 65} y2="200" stroke="#D97706" strokeWidth="4" />
          ))}

          {/* Draped Elderly Matriarch Silhouette */}
          <ellipse cx="140" cy="110" rx="40" ry="50" fill="#18181B" />
          <path d="M 90 120 Q 140 70 190 120 L 220 180 L 70 180 Z" fill="#E2E8F0" opacity="0.5" stroke="#94A3B8" strokeWidth="2" />
          {/* Quilt Blanket Covering Body */}
          <path d="M 120 140 C 260 120 450 130 520 180 L 100 180 Z" fill="#27272A" stroke="#090D12" strokeWidth="3" />

          {/* Solitary Walking Stick Leaned Against Bed */}
          <line x1="560" y1="80" x2="590" y2="300" stroke="#F59E0B" strokeWidth="7" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 22. SCENE 22: TommyTerraceBarkSplit (SPLIT_CONFRONTATION)
// =========================================================================
export const TommyTerraceBarkSplit: React.FC<{ durationFrames?: number }> = ({ durationFrames = 107 }) => {
  const frame = useCurrentFrame();
  const barkPulse = 1 + Math.sin(frame * 0.4) * 0.05;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <DelhiArchitecturalDetails />
        <FloatingAshEmbers />
        <OverheadPowerWiringLayer />
        <CeilingIronMeshLayer />
        <TerracottaDawnAura cx={540} cy={1180} />

        {/* Traced authentic pariah dog reference */}
        <g transform="translate(100, 140) scale(0.9)" opacity="0.4">
          <Scene22SPLITCONFRONTATIONSilhouette />
        </g>

        {/* Rooftop Parapet and Chained Dog Tommy */}
        <g transform="translate(260, 1040)">
          {/* Concrete Parapet Wall */}
          <rect x="0" y="260" width="600" height="180" fill="#1C1917" stroke="#27272A" strokeWidth="4" />
          <line x1="0" y1="260" x2="600" y2="260" stroke="#78350F" strokeWidth="8" />

          {/* Alert Barking Indian Pariah Dog Silhouette */}
          <g transform={`translate(160, 120) scale(${barkPulse})`}>
            {/* Athletic Tawny Torso */}
            <path d="M 60 70 C 100 50 180 50 200 90 L 190 150 L 50 140 Z" fill="#D97706" stroke="#92400E" strokeWidth="3" />
            {/* Pointed Head Barking Upward */}
            <path d="M 190 80 L 250 30 L 270 45 L 230 100 Z" fill="#B45309" stroke="#78350F" strokeWidth="2" />
            {/* Pricked Ears */}
            <polygon points="230,40 245,0 260,35" fill="#92400E" />
            {/* Curved Tail */}
            <path d="M 50 80 Q 20 40 40 10" stroke="#D97706" strokeWidth="12" strokeLinecap="round" fill="none" />
            {/* 4 Strong Legs */}
            <line x1="70" y1="140" x2="65" y2="260" stroke="#B45309" strokeWidth="14" strokeLinecap="round" />
            <line x1="100" y1="140" x2="95" y2="260" stroke="#78350F" strokeWidth="12" strokeLinecap="round" />
            <line x1="170" y1="140" x2="175" y2="260" stroke="#B45309" strokeWidth="14" strokeLinecap="round" />
            <line x1="195" y1="140" x2="200" y2="260" stroke="#78350F" strokeWidth="12" strokeLinecap="round" />

            {/* Heavy Galvanized Iron Chain Shackled to Railing */}
            <path d="M 210 100 Q 140 200 40 260" stroke="#E2E8F0" strokeWidth="6" strokeDasharray="6,4" fill="none" />
          </g>

          {/* Overturned Water Bowl */}
          <ellipse cx="480" cy="270" rx="35" ry="14" fill="#64748B" stroke="#334155" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 23. SCENE 23: StoolsToppleFracture (STRUCTURAL_FRACTURE)
// =========================================================================
export const StoolsToppleFracture: React.FC<{ durationFrames?: number }> = ({ durationFrames = 106 }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <ForensicCordonMeshDetails />
        <FloatingAshEmbers />
        <MidnightVoidAura cx={540} cy={1180} />
        <CeilingIronMeshLayer opacity={0.8} />

        {/* Traced authentic mesh reference */}
        <g transform="translate(100, 150) scale(0.9)" opacity="0.35">
          <Scene23STRUCTURALFRACTURESilhouette />
        </g>

        {/* Toppled Horizontal Stools on Ground */}
        <g transform="translate(140, 1300)">
          {Array.from({ length: 7 }).map((_, i) => {
            const x = i * 110;
            return (
              <g key={i} transform={`translate(${x}, 0) rotate(75)`}>
                <rect x="0" y="0" width="50" height="14" rx="3" fill="#78350F" stroke="#451A03" strokeWidth="2" />
                <line x1="6" y1="14" x2="2" y2="100" stroke="#451A03" strokeWidth="5" strokeLinecap="round" />
                <line x1="44" y1="14" x2="48" y2="100" stroke="#451A03" strokeWidth="5" strokeLinecap="round" />
              </g>
            );
          })}
        </g>

        {/* Suspended Shadow Silhouettes in Stillness */}
        <g transform="translate(160, 940)">
          {Array.from({ length: 5 }).map((_, i) => (
            <path key={i} d={`M ${i * 180 + 40} 0 L ${i * 180 + 40} 240`} stroke="#EF4444" strokeWidth="3" strokeDasharray="4,4" opacity="0.5" />
          ))}
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 24. SCENE 24: PsychologicalAutopsyCard (QUOTE_CARD)
// =========================================================================
export const PsychologicalAutopsyCard: React.FC<{ durationFrames?: number }> = ({ durationFrames = 106 }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <TacticalCordonAura cx={540} cy={1180} />

        {/* Traced authentic forensic dossier blueprint */}
        <g transform="translate(120, 150) scale(0.9)" opacity="0.35">
          <Scene24QUOTECARDSilhouette />
        </g>

        {/* Medical Diagnostic Report Card */}
        <g transform="translate(140, 960)">
          <rect x="0" y="0" width="800" height="460" rx="8" fill="#0F172A" stroke="#1E3A8A" strokeWidth="5" />
          <rect x="20" y="20" width="760" height="420" fill="#020617" stroke="#38BDF8" strokeWidth="2" />

          {/* Official Forensic Division Header */}
          <text x="400" y="80" fill="#38BDF8" fontSize="28" fontFamily="Montserrat" textAnchor="middle" fontWeight="bold">
            CENTRAL FORENSIC SCIENCE LABORATORY
          </text>
          <line x1="80" y1="110" x2="720" y2="110" stroke="#1E3A8A" strokeWidth="3" />

          {/* Big Stamp: SHARED PSYCHOSIS */}
          <g transform="translate(400, 240) rotate(-6)">
            <rect x="-280" y="-55" width="560" height="110" rx="6" fill="#450A0A" stroke="#DC2626" strokeWidth="4" />
            <text x="0" y="16" fill="#FCA5A5" fontSize="48" fontFamily="Montserrat" textAnchor="middle" fontWeight="900">
              SHARED PSYCHOSIS
            </text>
            <text x="0" y="44" fill="#EF4444" fontSize="20" fontFamily="Montserrat" textAnchor="middle" fontWeight="bold">
              FOLIE À PLUSIEURS • NO SUICIDAL INTENT
            </text>
          </g>

          <text x="400" y="380" fill="#94A3B8" fontSize="24" fontFamily="Montserrat" textAnchor="middle">
            DELUSION CONSUMED ENTIRE FAMILY
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 25. SCENE 25: MemorialTallyBoardHero (CROWD_TALLY)
// =========================================================================
export const MemorialTallyBoardHero: React.FC<{ durationFrames?: number }> = ({ durationFrames = 104 }) => {
  const frame = useCurrentFrame();
  const flamePulse = 1 + Math.sin(frame * 0.25) * 0.06;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <InteriorTempleCarvingDetails />
        <FloatingAshEmbers />
        <IncenseDiyaFlameAura cx={540} cy={1180} />

        {/* Traced authentic ancestor shrine */}
        <g transform="translate(100, 150) scale(0.9)" opacity="0.35">
          <Scene25CROWDTALLYSilhouette />
        </g>

        {/* Eleven Flickering Memorial Diyas */}
        <g transform="translate(100, 1140)">
          {Array.from({ length: 11 }).map((_, i) => {
            const x = i * 78;
            return (
              <g key={i} transform={`translate(${x}, 0)`}>
                <ellipse cx="35" cy="50" rx="24" ry="10" fill="#D97706" stroke="#92400E" strokeWidth="2" />
                <ellipse cx="35" cy={30} rx={10 * flamePulse} ry={18 * flamePulse} fill="#F59E0B" />
                <ellipse cx="35" cy={35} rx={5 * flamePulse} ry={10 * flamePulse} fill="#FEF08A" />
              </g>
            );
          })}
        </g>

        {/* Solemn Memorial Cardstock Plinth */}
        <g transform="translate(200, 1260)">
          <rect x="0" y="0" width="680" height="120" rx="8" fill="#1C1917" stroke="#F59E0B" strokeWidth="4" />
          <text x="340" y="50" fill="#E2E8F0" fontSize="28" fontFamily="Montserrat" textAnchor="middle" fontWeight="bold">
            IN MEMORY OF ELEVEN LIVES
          </text>
          <text x="340" y="95" fill="#F59E0B" fontSize="32" fontFamily="Montserrat" textAnchor="middle" fontWeight="900">
            BREAK THE SILENCE ON MENTAL HEALTH
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 26. SCENE 26: SilentHouseMonumentHero (LONE_LEADER)
// =========================================================================
export const SilentHouseMonumentHero: React.FC<{ durationFrames?: number }> = ({ durationFrames = 105 }) => {
  const frame = useCurrentFrame();
  const push = interpolate(frame, [0, durationFrames], [1.0, 1.04], CLAMP);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <TerracottaDawnAura cx={540} cy={1180} />
        <OverheadPowerWiringLayer />
        <DelhiArchitecturalDetails />
        <FloatingAshEmbers />

        {/* Traced authentic Burari house facade */}
        <g transform="translate(100, 140) scale(0.9)" opacity="0.45">
          <Scene26LONELEADERSilhouette />
        </g>

        {/* The House Standing Silent in Sant Nagar */}
        <g transform={`translate(540, 1180) scale(${push})`}>
          <rect x="-420" y="-220" width="840" height="440" fill="#1C1917" stroke="#27272A" strokeWidth="5" />
          {/* Iron Balconies Sealed */}
          <rect x="-360" y="-180" width="180" height="140" fill="#090D12" stroke="#334155" strokeWidth="3" />
          <rect x="180" y="-180" width="180" height="140" fill="#090D12" stroke="#334155" strokeWidth="3" />
          {/* Shutters Forever Closed */}
          <rect x="-380" y="40" width="760" height="160" fill="#090D12" stroke="#18181B" strokeWidth="4" />
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={i} x1="-380" y1={65 + i * 24} x2="380" y2={65 + i * 24} stroke="#27272A" strokeWidth="2.5" />
          ))}

          {/* Somber Dusk Window Incandescent Fading Glow */}
          <circle cx="0" cy="-100" r="40" fill="#FEF08A" opacity="0.25" />
        </g>
      </svg>
    </div>
  );
};
