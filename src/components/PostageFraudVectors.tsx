import {
  Scene01SPLITCONFRONTATIONSilhouette,
  Scene02CROWDTALLYSilhouette,
  Scene03LONELEADERSilhouette,
  Scene04VECTORMAPSilhouette,
  Scene05QUOTECARDSilhouette,
  Scene06SPLITCONFRONTATIONSilhouette,
  Scene07LONELEADERSilhouette,
  Scene08VEHICLEINTRANSITSilhouette,
  Scene09VECTORMAPSilhouette,
  Scene10QUOTECARDSilhouette,
  Scene11LONELEADERSilhouette,
  Scene12STRUCTURALFRACTURESilhouette,
  Scene13CROWDTALLYSilhouette,
  Scene14VEHICLEINTRANSITSilhouette,
  Scene15LONELEADERSilhouette,
  Scene16STRUCTURALFRACTURESilhouette,
  Scene17VECTORMAPSilhouette,
  Scene18SPLITCONFRONTATIONSilhouette,
  Scene19QUOTECARDSilhouette,
  Scene20VEHICLEINTRANSITSilhouette,
  Scene21STRUCTURALFRACTURESilhouette,
  Scene22LONELEADERSilhouette,
  Scene23CROWDTALLYSilhouette,
  Scene24SPLITCONFRONTATIONSilhouette,
  Scene25QUOTECARDSilhouette,
  Scene26STRUCTURALFRACTURESilhouette,
  Scene27LONELEADERSilhouette,
  Scene28SPLITCONFRONTATIONSilhouette,
} from '../../projects/postage-fraud-2026/plates/TracedPlateAssets';
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { createArcScallopedCloud, create8PointedStarPath } from '../kit/OrganicExplosion';
import { driftOffsetPx, SPRING_PRESETS } from '../kit/tokens';
import { WeatheredMilitaryStamp } from '../kit/WeatheredMilitaryStamp';
import { SilhouetteCharacter } from '../library/characters/SilhouetteCharacter';
import { PulsatingBattleMarker } from '../library/tactical/PulsatingBattleMarker';
import { TacticalRadarGrid } from '../library/tactical/TacticalRadarGrid';
import { TransportAircraftSilhouette } from '../library/hardware/MilitaryHardware';
import { MarchingInfantryRank } from '../library/characters/MarchingInfantryRank';

/**
 * Deterministic Clamping Options for Remotion interpolate()
 */
const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/**
 * Seed-based deterministic pseudo-random generator (zero Math.random)
 */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Atmospheric Radial Backlight Auras
 */
const TerracottaAtmosphericAura: React.FC<{
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  id?: string;
}> = ({ cx = 540, cy = 1180, rx = 440, ry = 250, id = 'terracottaAura' }) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.12) * 0.04;
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

const FederalNavyAura: React.FC<{
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  id?: string;
}> = ({ cx = 540, cy = 1180, rx = 460, ry = 260, id = 'federalNavyAura' }) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.1) * 0.03;
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
      <ellipse cx={cx} cy={cy} rx={rx * pulse} ry={ry * pulse} fill={`url(#${id})`} />
    </g>
  );
};

const FieryExplosionAura: React.FC<{
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  id?: string;
}> = ({ cx = 540, cy = 1180, rx = 480, ry = 270, id = 'fieryExplosionAura' }) => {
  const frame = useCurrentFrame();
  const flicker = 1 + Math.sin(frame * 0.24) * 0.06 + Math.cos(frame * 0.41) * 0.03;
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.85} />
          <stop offset="35%" stopColor="#DC2626" stopOpacity={0.55} />
          <stop offset="70%" stopColor="#7F1D1D" stopOpacity={0.25} />
          <stop offset="100%" stopColor="#0F172A" stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={rx * flicker} ry={ry * flicker} fill={`url(#${id})`} />
    </g>
  );
};

const CyberGreenAura: React.FC<{
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  id?: string;
}> = ({ cx = 540, cy = 1180, rx = 450, ry = 250, id = 'cyberGreenAura' }) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame * 0.16) * 0.05;
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity={0.65} />
          <stop offset="40%" stopColor="#047857" stopOpacity={0.35} />
          <stop offset="80%" stopColor="#064E3B" stopOpacity={0.15} />
          <stop offset="100%" stopColor="#022C22" stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={rx * pulse} ry={ry * pulse} fill={`url(#${id})`} />
    </g>
  );
};

// Reusable Detailed $100 Banknote Bill Component
const BanknoteBill: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  rotateDeg: number;
  skewDeg: number;
  scale?: number;
  opacity?: number;
  tier?: 'fg' | 'mg' | 'bg';
}> = ({ x, y, width, height, rotateDeg, skewDeg, scale = 1, opacity = 1, tier = 'mg' }) => {
  const w = width;
  const h = height;
  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotateDeg}) skewX(${skewDeg}) scale(${scale})`}
      opacity={opacity}
    >
      {/* Outer Paper Substrate */}
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={4} fill="#E2FBE8" stroke="#166534" strokeWidth={tier === 'fg' ? 2.5 : 1.5} />
      {/* Inner Engraved Guilloche Border */}
      <rect x={-w / 2 + 3} y={-h / 2 + 3} width={w - 6} height={h - 6} rx={2} fill="none" stroke="#14532D" strokeWidth={0.9} strokeDasharray="3 1.5" />
      <rect x={-w / 2 + 6} y={-h / 2 + 5} width={w - 12} height={h - 10} fill="#F0FDF4" stroke="#15803D" strokeWidth={0.6} />

      {/* Center Oval Medallion: Benjamin Franklin Portrait */}
      <ellipse cx={0} cy={0} rx={w * 0.18} ry={h * 0.38} fill="#DCFCE7" stroke="#14532D" strokeWidth={1.2} />
      {/* Stylized Franklin Head & Cravat Silhouette */}
      <path
        d={`M ${-w * 0.05} ${-h * 0.22}
           C ${w * 0.06} ${-h * 0.24}, ${w * 0.09} ${-h * 0.12}, ${w * 0.07} ${-h * 0.02}
           C ${w * 0.08} ${h * 0.08}, ${w * 0.05} ${h * 0.18}, ${0} ${h * 0.22}
           C ${-w * 0.06} ${h * 0.20}, ${-w * 0.08} ${h * 0.10}, ${-w * 0.08} ${0}
           C ${-w * 0.09} ${-h * 0.10}, ${-w * 0.08} ${-h * 0.20}, ${-w * 0.05} ${-h * 0.22} Z`}
        fill="#14532D"
      />
      {/* Franklin Shoulder / Coat */}
      <path
        d={`M ${-w * 0.12} ${h * 0.24}
           Q ${0} ${h * 0.15} ${w * 0.12} ${h * 0.24}
           L ${w * 0.14} ${h * 0.35}
           L ${-w * 0.14} ${h * 0.35} Z`}
        fill="#166534"
      />

      {/* Federal Reserve Black Seal (Left) */}
      <circle cx={-w * 0.28} cy={0} r={h * 0.2} fill="none" stroke="#0F172A" strokeWidth={0.8} strokeDasharray="2 1" />
      <text x={-w * 0.28} y={3} textAnchor="middle" fill="#0F172A" fontSize={h * 0.22} fontWeight="900" fontFamily="Montserrat">
        ★
      </text>

      {/* Treasury Green Seal (Right) */}
      <circle cx={w * 0.28} cy={0} r={h * 0.2} fill="none" stroke="#15803D" strokeWidth={1} strokeDasharray="2 1" />
      <text x={w * 0.28} y={3} textAnchor="middle" fill="#15803D" fontSize={h * 0.22} fontWeight="900" fontFamily="Montserrat">
        $
      </text>

      {/* 4 Corner 100 Numerals */}
      <text x={-w / 2 + 8} y={-h / 2 + 12} fill="#14532D" fontSize={h * 0.22} fontWeight="900" fontFamily="Montserrat">
        100
      </text>
      <text x={w / 2 - 8} y={-h / 2 + 12} textAnchor="end" fill="#14532D" fontSize={h * 0.22} fontWeight="900" fontFamily="Montserrat">
        100
      </text>
      <text x={-w / 2 + 8} y={h / 2 - 5} fill="#14532D" fontSize={h * 0.22} fontWeight="900" fontFamily="Montserrat">
        100
      </text>
      <text x={w / 2 - 8} y={h / 2 - 5} textAnchor="end" fill="#14532D" fontSize={h * 0.22} fontWeight="900" fontFamily="Montserrat">
        100
      </text>

      {/* Header Banner */}
      <text x={0} y={-h * 0.28} textAnchor="middle" fill="#14532D" fontSize={h * 0.12} fontWeight="800" fontFamily="Montserrat" letterSpacing="0.08em">
        FEDERAL RESERVE NOTE
      </text>
      {/* Bottom Banner */}
      <text x={0} y={h * 0.32} textAnchor="middle" fill="#14532D" fontSize={h * 0.12} fontWeight="800" fontFamily="Montserrat" letterSpacing="0.08em">
        THE UNITED STATES OF AMERICA
      </text>
    </g>
  );
};

// ============================================================================
// SCENE 01: EVIL HACKER LAUGHING IN CASH RAIN & LABELSBANK FRAUD WEBSITE
// Archetype: SPLIT_CONFRONTATION (Hacker Greed vs US Postal System Breach)
// Payoff: Frame 35 (Transient Slam & $126M Breach Alert)
// ============================================================================
export const KhanewalVsUspsSplitHero: React.FC<{ durationFrames?: number }> = ({ durationFrames = 102 }) => {
  const frame = useCurrentFrame();
  const isPayoff = frame >= 35;
  const fracturePulse = isPayoff ? interpolate(frame - 35, [0, 8, 22], [0, 1, 0.45], CLAMP) : 0;

  // Maniacal Laugh Physics (Bounce, Shoulder Chuckles, Mouth Flex)
  const laughFrequency = isPayoff ? 1.05 : 0.85;
  const laughBounce = Math.sin(frame * laughFrequency) * (isPayoff ? 5.5 : 3.2);
  const shoulderJolt = Math.cos(frame * laughFrequency) * (isPayoff ? 4.5 : 2.5);
  const mouthOpen = (isPayoff ? 17 : 11) + Math.sin(frame * laughFrequency) * (isPayoff ? 7.5 : 4.5);
  const headTilt = Math.sin(frame * 0.35) * (isPayoff ? 2.5 : 1.5);

  // Background Cyber Screen Glitch / CRT Scanline Motion
  const crtScan = (frame * 3.5) % 32;

  // Stolen Counter Number Rolling Animation
  const displayedMillions = isPayoff
    ? interpolate(frame - 35, [0, 30], [2.4, 126.4], CLAMP).toFixed(1)
    : '2.4';

  // Banknotes Configuration (24 distinct tumbling bills across 3 depth tiers)
  const banknoteDefs = [
    // Tier 1: Background Bills (Small, behind hacker, drifting)
    { id: 0, baseX: 160, startY: 860, speed: 4.8, rotSpeed: 1.4, baseRot: 15, scale: 0.65, tier: 'bg' as const },
    { id: 1, baseX: 320, startY: 980, speed: 5.2, rotSpeed: -1.8, baseRot: -25, scale: 0.7, tier: 'bg' as const },
    { id: 2, baseX: 760, startY: 890, speed: 4.6, rotSpeed: 1.6, baseRot: 35, scale: 0.68, tier: 'bg' as const },
    { id: 3, baseX: 890, startY: 1040, speed: 5.5, rotSpeed: -1.3, baseRot: -12, scale: 0.65, tier: 'bg' as const },
    { id: 4, baseX: 450, startY: 910, speed: 4.9, rotSpeed: 2.1, baseRot: 40, scale: 0.72, tier: 'bg' as const },
    { id: 5, baseX: 620, startY: 950, speed: 5.1, rotSpeed: -1.7, baseRot: -30, scale: 0.7, tier: 'bg' as const },

    // Tier 2: Midground Bills (Medium, fluttering around head and shoulders)
    { id: 6, baseX: 210, startY: 930, speed: 6.2, rotSpeed: 2.4, baseRot: -18, scale: 0.95, tier: 'mg' as const },
    { id: 7, baseX: 360, startY: 870, speed: 6.8, rotSpeed: -2.8, baseRot: 22, scale: 1.0, tier: 'mg' as const },
    { id: 8, baseX: 510, startY: 840, speed: 6.4, rotSpeed: 3.1, baseRot: -35, scale: 0.9, tier: 'mg' as const },
    { id: 9, baseX: 680, startY: 890, speed: 7.0, rotSpeed: -2.2, baseRot: 28, scale: 1.05, tier: 'mg' as const },
    { id: 10, baseX: 820, startY: 940, speed: 6.5, rotSpeed: 2.7, baseRot: -15, scale: 0.95, tier: 'mg' as const },
    { id: 11, baseX: 280, startY: 1050, speed: 6.9, rotSpeed: -2.5, baseRot: 42, scale: 1.0, tier: 'mg' as const },
    { id: 12, baseX: 740, startY: 1020, speed: 6.7, rotSpeed: 2.9, baseRot: -28, scale: 0.98, tier: 'mg' as const },
    { id: 13, baseX: 180, startY: 1110, speed: 7.2, rotSpeed: -3.0, baseRot: 14, scale: 1.02, tier: 'mg' as const },
    { id: 14, baseX: 870, startY: 1080, speed: 6.6, rotSpeed: 2.3, baseRot: -38, scale: 0.96, tier: 'mg' as const },
    { id: 15, baseX: 430, startY: 1140, speed: 7.1, rotSpeed: -2.6, baseRot: 19, scale: 1.0, tier: 'mg' as const },

    // Tier 3: Foreground Bills (Large, crisp, tumbling in 3D right in front of camera)
    { id: 16, baseX: 150, startY: 880, speed: 8.5, rotSpeed: 3.8, baseRot: -24, scale: 1.45, tier: 'fg' as const },
    { id: 17, baseX: 340, startY: 830, speed: 9.2, rotSpeed: -4.2, baseRot: 32, scale: 1.5, tier: 'fg' as const },
    { id: 18, baseX: 540, startY: 810, speed: 8.8, rotSpeed: 4.5, baseRot: -15, scale: 1.4, tier: 'fg' as const },
    { id: 19, baseX: 730, startY: 860, speed: 9.0, rotSpeed: -3.9, baseRot: 28, scale: 1.55, tier: 'fg' as const },
    { id: 20, baseX: 910, startY: 820, speed: 8.7, rotSpeed: 4.1, baseRot: -36, scale: 1.48, tier: 'fg' as const },
    { id: 21, baseX: 250, startY: 1020, speed: 9.4, rotSpeed: -4.4, baseRot: 20, scale: 1.6, tier: 'fg' as const },
    { id: 22, baseX: 630, startY: 990, speed: 8.9, rotSpeed: 4.0, baseRot: -22, scale: 1.52, tier: 'fg' as const },
    { id: 23, baseX: 820, startY: 1050, speed: 9.1, rotSpeed: -4.3, baseRot: 35, scale: 1.45, tier: 'fg' as const },
  ];

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <defs>
        {/* Volumetric Radial Aura from Terminal & Crime Hub */}
        <radialGradient id="cyberScreenGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={isPayoff ? '#DC2626' : '#10B981'} stopOpacity={0.65} />
          <stop offset="45%" stopColor={isPayoff ? '#991B1B' : '#047857'} stopOpacity={0.35} />
          <stop offset="85%" stopColor="#064E3B" stopOpacity={0.15} />
          <stop offset="100%" stopColor="#020617" stopOpacity={0} />
        </radialGradient>

        {/* Dual Rim Lighting Gradients for Hacker Silhouette */}
        <linearGradient id="hackerLeftEmeraldRim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#34D399" stopOpacity={0.9} />
          <stop offset="40%" stopColor="#10B981" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#052E16" stopOpacity={0} />
        </linearGradient>

        <linearGradient id="hackerRightRedRim" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={isPayoff ? '#F87171' : '#F59E0B'} stopOpacity={0.95} />
          <stop offset="45%" stopColor={isPayoff ? '#DC2626' : '#D97706'} stopOpacity={0.45} />
          <stop offset="100%" stopColor="#450A0A" stopOpacity={0} />
        </linearGradient>
      </defs>

      {/* BACKGROUND VOLUMETRIC AURA */}
      <rect x="0" y="860" width="1080" height="640" fill="url(#cyberScreenGlow)" opacity={0.85} />

      {/* =====================================================================
          1. BACKGROUND FRAUD WEBSITE TERMINAL: LABELSBANK.COM (y: 875..1480)
          ===================================================================== */}
      <g transform="translate(60, 875)">
        {/* Terminal Screen Outer Chassis */}
        <rect
          x="0"
          y="0"
          width="960"
          height="580"
          rx="12"
          fill="#030E10"
          stroke={isPayoff ? '#EF4444' : '#10B981'}
          strokeWidth="3.5"
        />

        {/* Top Browser Chrome Title Bar */}
        <rect x="0" y="0" width="960" height="42" rx="12" fill="#061A19" stroke={isPayoff ? '#B91C1C' : '#047857'} strokeWidth="1.5" />
        {/* macOS Window Controls */}
        <circle cx="28" cy="21" r="6" fill="#EF4444" />
        <circle cx="48" cy="21" r="6" fill="#F59E0B" />
        <circle cx="68" cy="21" r="6" fill="#10B981" />

        {/* URL Bar Badge */}
        <rect x="110" y="8" width="520" height="26" rx="6" fill="#011012" stroke="#064E3B" strokeWidth="1.2" />
        <text x="125" y="25" fill="#34D399" fontSize="13" fontWeight="800" fontFamily="Montserrat" letterSpacing="0.05em">
          🔒 https://labelsbank.com/admin // DARK WEB COUNTERFEIT FORGE
        </text>

        {/* Live Network Ping Badge */}
        <rect x="650" y="8" width="290" height="26" rx="6" fill="#011012" stroke="#064E3B" strokeWidth="1.2" />
        <text x="665" y="25" fill="#F59E0B" fontSize="12" fontWeight="800" fontFamily="Montserrat">
          TOR V3 ➔ KHANEWAL TO US-EAST-1
        </text>

        {/* CRT Horizontal Scanlines Overlay across Monitor */}
        <g opacity="0.18" stroke="#10B981" strokeWidth="1.2">
          {Array.from({ length: 18 }).map((_, i) => (
            <line key={i} x1="10" y1={55 + i * 28 + crtScan * 0.4} x2="950" y2={55 + i * 28 + crtScan * 0.4} />
          ))}
        </g>

        {/* Terminal Split: Left Pane (IMb Barcode Forgery Engine) */}
        <g transform="translate(25, 60)">
          <rect x="0" y="0" width="440" height="480" rx="8" fill="#041618" stroke="#0E483C" strokeWidth="2" />
          <text x="20" y="32" fill="#38BDF8" fontSize="14" fontWeight="900" fontFamily="Montserrat" letterSpacing="0.08em">
            [+] USPS PRIORITY FORGERY ENGINE
          </text>
          <text x="20" y="55" fill="#94A3B8" fontSize="11" fontWeight="700" fontFamily="Montserrat">
            ALGORITHM: CRC-16 COLLISION / ZERO_FEE ROUTE
          </text>

          {/* Cascading Counterfeit Postage Barcodes */}
          {[0, 1, 2, 3, 4].map((row) => {
            const rowY = 80 + row * 65;
            return (
              <g key={row} transform={`translate(20, ${rowY})`}>
                <rect x="0" y="0" width="400" height="52" rx="4" fill="#020B0D" stroke="#047857" strokeWidth="1.2" />
                {/* 25 IMb Barcode Bars */}
                {Array.from({ length: 28 }).map((_, b) => {
                  const barState = (row * 7 + b * 3) % 4;
                  const y1 = barState === 0 ? 12 : barState === 1 ? 4 : barState === 2 ? 14 : 4;
                  const y2 = barState === 0 ? 38 : barState === 1 ? 38 : barState === 2 ? 46 : 46;
                  return (
                    <line
                      key={b}
                      x1={18 + b * 13}
                      y1={y1}
                      x2={18 + b * 13}
                      y2={y2}
                      stroke="#4ADE80"
                      strokeWidth="3.2"
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Active Generation Metrics */}
          <text x="20" y="440" fill="#4ADE80" fontSize="13" fontWeight="800" fontFamily="Montserrat">
            TOTAL LABELS MINTED: 5,240,000+
          </text>
          <text x="20" y="465" fill="#38BDF8" fontSize="12" fontWeight="700" fontFamily="Montserrat">
            PRICE CHARGED: $2.00 / LABEL (90% OFF USPS)
          </text>
        </g>

        {/* Terminal Split: Right Pane (Massive Loot Extraction Counter) */}
        <g transform="translate(495, 60)">
          <rect
            x="0"
            y="0"
            width="440"
            height="480"
            rx="8"
            fill="#041618"
            stroke={isPayoff ? '#DC2626' : '#0E483C'}
            strokeWidth="2"
          />
          <text x="20" y="32" fill={isPayoff ? '#F87171' : '#FBBF24'} fontSize="14" fontWeight="900" fontFamily="Montserrat" letterSpacing="0.08em">
            {isPayoff ? '⚠️ ALERT: $126M EXTRACTED FROM AMERICA' : '[LIVE] U.S. POSTAL REVENUE DRAIN'}
          </text>

          {/* Massive Glowing Dollar Counter Card */}
          <g transform="translate(20, 55)">
            <rect
              x="0"
              y="0"
              width="400"
              height="110"
              rx="8"
              fill={isPayoff ? '#450A0A' : '#022C22'}
              stroke={isPayoff ? '#EF4444' : '#10B981'}
              strokeWidth="2.5"
            />
            <text x="20" y="34" fill="#94A3B8" fontSize="12" fontWeight="800" fontFamily="Montserrat">
              TOTAL POSTAL SYSTEM LOSS
            </text>
            <text
              x="20"
              y="85"
              fill={isPayoff ? '#FCA5A5' : '#4ADE80'}
              fontSize="44"
              fontWeight="900"
              fontFamily="Montserrat"
              letterSpacing="-0.02em"
            >
              ${displayedMillions}M
            </text>
          </g>

          {/* Payout Routing Rows to Pakistani Family Accounts */}
          <g transform="translate(20, 185)">
            <text x="0" y="15" fill="#94A3B8" fontSize="12" fontWeight="800" fontFamily="Montserrat">
              LAUNDERED TO 16 FAMILY ACCOUNTS:
            </text>
            {[
              { bank: 'HBL MULTAN (BROTHER_01)', amt: '$14.2M', cleared: true },
              { bank: 'UBL LAHORE (WIFE_DOM_01)', amt: '$11.8M', cleared: true },
              { bank: 'MEEZAN BANK (SISTER_01)', amt: '$9.5M', cleared: true },
              { bank: 'DUBAI REAL ESTATE ESCROW', amt: '$38.4M', cleared: true },
            ].map((acc, idx) => (
              <g key={idx} transform={`translate(0, ${30 + idx * 46})`}>
                <rect x="0" y="0" width="400" height="38" rx="4" fill="#01181B" stroke="#064E3B" strokeWidth="1.2" />
                <text x="14" y="24" fill="#F8FAFC" fontSize="12" fontWeight="800" fontFamily="Montserrat">
                  {acc.bank}
                </text>
                <text x="385" y="24" textAnchor="end" fill="#FBBF24" fontSize="13" fontWeight="900" fontFamily="Montserrat">
                  {acc.amt}
                </text>
              </g>
            ))}
          </g>

          {/* Flashing Cyber Breached Banner on Payoff */}
          {isPayoff && (
            <g transform="translate(20, 420)">
              <rect x="0" y="0" width="400" height="42" rx="4" fill="#7F1D1D" stroke="#EF4444" strokeWidth="2" />
              <text x="200" y="27" textAnchor="middle" fill="#FEF2F2" fontSize="14" fontWeight="900" fontFamily="Montserrat" letterSpacing="0.08em">
                FEDERAL GRAND JURY CHARGES FILED
              </text>
            </g>
          )}
        </g>
      </g>

      {/* =====================================================================
          2. BACKGROUND TIER BANKNOTE BILLS (Behind Hacker)
          ===================================================================== */}
      {banknoteDefs
        .filter((b) => b.tier === 'bg')
        .map((bill) => {
          const y = 840 + ((bill.startY + frame * bill.speed) % 650);
          const rot = bill.baseRot + frame * bill.rotSpeed;
          const skew = Math.sin(frame * 0.12 + bill.id) * 16;
          return (
            <BanknoteBill
              key={bill.id}
              x={bill.baseX}
              y={y}
              width={90}
              height={44}
              rotateDeg={rot}
              skewDeg={skew}
              scale={bill.scale}
              opacity={0.65}
              tier="bg"
            />
          );
        })}

      {/* =====================================================================
          3. THE EVIL HACKER (FAHEEM AKRAM) LAUGHING INTO CAMERA (x: 540)
          ===================================================================== */}
      <g transform={`translate(540, ${1120 + laughBounce}) rotate(${headTilt})`}>
        {/* Backlight Halo behind Head */}
        <circle cx="0" cy="-40" r="160" fill="url(#cyberScreenGlow)" opacity={0.6} />

        {/* Broad Athletic Shoulders & Dark Tech Hoodie / Nehru Jacket */}
        <g transform={`translate(0, ${shoulderJolt})`}>
          {/* Main Body Silhouette */}
          <path
            d="M -240 370
               C -230 250, -180 140, -110 95
               C -80 75, -50 70, 0 70
               C 50 70, 80 75, 110 95
               C 180 140, 230 250, 240 370
               L -240 370 Z"
            fill="#090D12"
            stroke="#1E293B"
            strokeWidth="3.5"
          />

          {/* Left Emerald Rim Highlight on Shoulder & Lapel */}
          <path
            d="M -235 370
               C -225 255, -178 145, -108 100
               C -80 80, -50 75, 0 75
               L -8 95
               C -55 98, -85 105, -112 122
               C -175 160, -215 260, -225 370 Z"
            fill="url(#hackerLeftEmeraldRim)"
          />

          {/* Right Red/Gold Rim Highlight on Shoulder & Lapel */}
          <path
            d="M 235 370
               C 225 255, 178 145, 108 100
               C 80 80, 50 75, 0 75
               L 8 95
               C 55 98, 85 105, 112 122
               C 175 160, 215 260, 225 370 Z"
            fill="url(#hackerRightRedRim)"
          />

          {/* Center Front Zipper Line & Collar Stand */}
          <line x1="0" y1="72" x2="0" y2="370" stroke="#334155" strokeWidth="3" />
          <line x1="0" y1="72" x2="0" y2="370" stroke="#0F172A" strokeWidth="1.5" strokeDasharray="6 4" />
          {/* Chrome Metal Zipper Pull */}
          <rect x="-4" y="110" width="8" height="16" rx="2" fill="#E2E8F0" stroke="#64748B" strokeWidth="1" />
        </g>

        {/* Neck & Muscular Trapezius Tendons */}
        <path
          d="M -45 80 L -42 20 Q 0 15 42 20 L 45 80 Z"
          fill="#111827"
          stroke="#1F2937"
          strokeWidth="2"
        />
        {/* Left & Right Neck Shadow Creases */}
        <path d="M -30 25 L -20 75" stroke="#064E3B" strokeWidth="2.5" opacity={0.6} />
        <path d="M 30 25 L 20 75" stroke="#7F1D1D" strokeWidth="2.5" opacity={0.6} />

        {/* Head & Facial Anatomy (Frontal Perspective looking straight at camera) */}
        <g transform="translate(0, -35)">
          {/* Outer Hood Contour Framing the Head */}
          <path
            d="M -115 40
               C -125 -60, -90 -150, 0 -155
               C 90 -155, 125 -60, 115 40
               C 105 85, 75 105, 55 105
               L -55 105
               C -75 105, -105 85, -115 40 Z"
            fill="#05080E"
            stroke="#1E293B"
            strokeWidth="3.5"
          />

          {/* Inner Face Silhouette (Skin & Jaw Tone) */}
          <path
            d="M -68 -50
               C -72 -10, -65 30, -50 68
               C -35 100, -18 108, 0 110
               C 18 108, 35 100, 50 68
               C 65 30, 72 -10, 68 -50
               C 60 -105, -60 -105, -68 -50 Z"
            fill="#1E293B"
            stroke="#334155"
            strokeWidth="2"
          />

          {/* Styled Pakistani Trimmed Dark Beard & Mustache */}
          <path
            d="M -54 22
               C -58 48, -45 92, -26 106
               C -14 114, 0 116, 0 116
               C 0 116, 14 114, 26 106
               C 45 92, 58 48, 54 22
               C 48 35, 36 45, 20 48
               C 10 50, -10 50, -20 48
               C -36 45, -48 35, -54 22 Z"
            fill="#05080E"
            stroke="#0B0F19"
            strokeWidth="2.5"
          />

          {/* Pointed Goatee & Chin Cleft */}
          <polygon points="-8,106 8,106 0,116" fill="#020408" />

          {/* Styled Mustache curling over Laughing Mouth */}
          <path
            d="M -38 12
               Q -18 5 0 12
               Q 18 5 38 12
               Q 22 22 0 18
               Q -22 22 -38 12 Z"
            fill="#05080E"
            stroke="#020408"
            strokeWidth="1.5"
          />

          {/* ==============================================================
              SINISTER LAUGHING MOUTH (Wide Open Grin, Teeth, Tongue)
              ============================================================== */}
          <g transform="translate(0, 32)">
            {/* Outer Mouth Cavity (Dark Crimson) */}
            <path
              d={`M -44 0
                 Q 0 ${mouthOpen * 1.5} 44 0
                 Q 0 ${-mouthOpen * 0.4} -44 0 Z`}
              fill="#450A0A"
              stroke="#7F1D1D"
              strokeWidth="2.5"
            />

            {/* Upper Teeth Row (Crisp White/Ivory Arch with Incisors) */}
            <path
              d={`M -36 0
                 Q 0 ${mouthOpen * 0.45} 36 0
                 L 32 -3
                 Q 0 -6 -32 -3 Z`}
              fill="#F8FAFC"
              stroke="#CBD5E1"
              strokeWidth="1"
            />
            {/* Tooth Division Lines */}
            {[-22, -11, 0, 11, 22].map((tx) => (
              <line key={tx} x1={tx} y1="-3" x2={tx} y2="4" stroke="#94A3B8" strokeWidth="1" />
            ))}

            {/* Lower Teeth Arch (Visible in Wide Maniacal Laugh) */}
            {mouthOpen > 12 && (
              <path
                d={`M -28 ${mouthOpen * 1.05}
                   Q 0 ${mouthOpen * 0.65} 28 ${mouthOpen * 1.05}
                   Q 0 ${mouthOpen * 1.3} -28 ${mouthOpen * 1.05} Z`}
                fill="#F1F5F9"
                stroke="#94A3B8"
                strokeWidth="0.8"
              />
            )}

            {/* Arched Tongue */}
            <path
              d={`M -22 ${mouthOpen * 0.8}
                 Q 0 ${mouthOpen * 0.4} 22 ${mouthOpen * 0.8}
                 Q 0 ${mouthOpen * 1.25} -22 ${mouthOpen * 0.8} Z`}
              fill="#BE123C"
              stroke="#9F1239"
              strokeWidth="1"
            />

            {/* Nasolabial Laugh Creases on Cheeks */}
            <path
              d="M -48 -14 Q -55 5 -42 22"
              fill="none"
              stroke="#090D14"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M 48 -14 Q 55 5 42 22"
              fill="none"
              stroke="#090D14"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>

          {/* Sculpted Nose with Bridge & Nostrils */}
          <path
            d="M 0 -35 L -3 10 Q 0 16 6 12 L 0 -35 Z"
            fill="#0F172A"
            stroke="#1E293B"
            strokeWidth="1.5"
          />
          {/* Nostril Flanges */}
          <path d="M -12 12 Q -7 6 0 12 Q 7 6 12 12" fill="none" stroke="#06090E" strokeWidth="2.5" />

          {/* ==============================================================
              PREDATORY EYES LOOKING STRAIGHT OUT AT THE CAMERA
              ============================================================== */}
          {/* Left Eye (Viewer's Left) */}
          <g transform="translate(-28, -12)">
            {/* Arched Wicked Eyebrow tilted down */}
            <path
              d="M -24 -14 Q -5 -22 18 -10"
              fill="none"
              stroke="#05080E"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Sclera & Eyelids */}
            <path
              d="M -20 0 Q 0 -9 18 0 Q 0 9 -20 0 Z"
              fill="#F8FAFC"
              stroke="#090D14"
              strokeWidth="2.2"
            />
            {/* Iris & Pupil staring dead center */}
            <circle cx="0" cy="0" r="6" fill="#022C22" stroke="#10B981" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="3.2" fill="#04070B" />
            {/* Terminal Reflection Glint in Pupil */}
            <circle cx="-1.5" cy="-1.5" r="1.5" fill="#34D399" />
          </g>

          {/* Right Eye (Viewer's Right) */}
          <g transform="translate(28, -12)">
            {/* Arched Wicked Eyebrow tilted down */}
            <path
              d="M -18 -10 Q 5 -22 24 -14"
              fill="none"
              stroke="#05080E"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Sclera & Eyelids */}
            <path
              d="M -18 0 Q 0 -9 20 0 Q 0 9 -18 0 Z"
              fill="#F8FAFC"
              stroke="#090D14"
              strokeWidth="2.2"
            />
            {/* Iris & Pupil staring dead center */}
            <circle cx="0" cy="0" r="6" fill="#450A0A" stroke="#EF4444" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="3.2" fill="#04070B" />
            {/* Terminal Reflection Glint in Pupil */}
            <circle cx="1.5" cy="-1.5" r="1.5" fill="#FCA5A5" />
          </g>

          {/* Modern Coder Glasses with Cyan/Red Specular Glint */}
          <g>
            {/* Left Hexagonal Lens Rim */}
            <polygon
              points="-46,-22 -10,-22 -6,8 -42,8"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2"
              opacity={0.85}
            />
            {/* Right Hexagonal Lens Rim */}
            <polygon
              points="10,-22 46,-22 42,8 6,8"
              fill="none"
              stroke="#F87171"
              strokeWidth="2"
              opacity={0.85}
            />
            {/* Nose Bridge Wire */}
            <line x1="-10" y1="-12" x2="10" y2="-12" stroke="#94A3B8" strokeWidth="2.5" />
            {/* Diagonal Glare Reflection Streaks across Lenses */}
            <line x1="-40" y1="5" x2="-16" y2="-20" stroke="#FFFFFF" strokeWidth="1.8" opacity={0.65} />
            <line x1="16" y1="5" x2="40" y2="-20" stroke="#FFFFFF" strokeWidth="1.8" opacity={0.65} />
          </g>
        </g>
      </g>

      {/* =====================================================================
          4. MIDGROUND TIER BANKNOTE BILLS (Fluttering around Hacker)
          ===================================================================== */}
      {banknoteDefs
        .filter((b) => b.tier === 'mg')
        .map((bill) => {
          const y = 840 + ((bill.startY + frame * bill.speed) % 650);
          const rot = bill.baseRot + frame * bill.rotSpeed;
          const skew = Math.sin(frame * 0.15 + bill.id) * 20;
          return (
            <BanknoteBill
              key={bill.id}
              x={bill.baseX}
              y={y}
              width={120}
              height={58}
              rotateDeg={rot}
              skewDeg={skew}
              scale={bill.scale}
              opacity={0.92}
              tier="mg"
            />
          );
        })}

      {/* =====================================================================
          5. FOREGROUND TIER BANKNOTE BILLS (Large, Tumbling in front of camera)
          ===================================================================== */}
      {banknoteDefs
        .filter((b) => b.tier === 'fg')
        .map((bill) => {
          const y = 830 + ((bill.startY + frame * bill.speed) % 660);
          const rot = bill.baseRot + frame * bill.rotSpeed;
          const skew = Math.sin(frame * 0.18 + bill.id) * 24;
          return (
            <BanknoteBill
              key={bill.id}
              x={bill.baseX}
              y={y}
              width={160}
              height={78}
              rotateDeg={rot}
              skewDeg={skew}
              scale={bill.scale}
              opacity={1}
              tier="fg"
            />
          );
        })}

      {/* =====================================================================
          6. PHASE 2 PAYOFF: EXPLOSIVE SHOCKWAVE & BLIZZARD OF CASH (Hit Frame 35)
          ===================================================================== */}
      {isPayoff && (
        <g>
          {/* Expanding Shockwave Ionization Rings */}
          <circle
            cx="540"
            cy="1180"
            r={50 + fracturePulse * 280}
            fill="none"
            stroke="#EF4444"
            strokeWidth={6 * (1 - fracturePulse * 0.8)}
            opacity={1 - fracturePulse * 0.8}
          />
          <circle
            cx="540"
            cy="1180"
            r={30 + fracturePulse * 380}
            fill="none"
            stroke="#FDE047"
            strokeWidth={4 * (1 - fracturePulse * 0.8)}
            opacity={0.8 - fracturePulse * 0.6}
          />

          {/* Flying Golden Spark Particle Bursts */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const dist = 60 + fracturePulse * 220;
            const sx = 540 + Math.cos(angle) * dist;
            const sy = 1180 + Math.sin(angle) * dist;
            return (
              <circle
                key={i}
                cx={sx}
                cy={sy}
                r={3 + (i % 3) * 1.5}
                fill={i % 2 === 0 ? '#FDE047' : '#EF4444'}
                opacity={1 - fracturePulse * 0.7}
              />
            );
          })}
        </g>
      )}
    </svg>
  );
};


// ============================================================================
// SCENE 02: RUPEES PARCEL TALLY BOARD (CROWD_TALLY, Payoff: Frame 35)
// ============================================================================
export const RupeesParcelTallyBoard: React.FC<{ durationFrames?: number }> = ({ durationFrames = 101 }) => {
  const frame = useCurrentFrame();
  const isPayoff = frame >= 35;
  const rollVal = interpolate(frame, [0, 35], [0, 35], CLAMP);
  const stampScale = isPayoff ? interpolate(frame - 35, [0, 5, 12], [2.2, 0.9, 1.0], CLAMP) : 0;
  const parcelJitter = Math.sin(frame * 0.4) * 2;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene02CROWDTALLYSilhouette color="#1E293B" opacity={0.35} scale={1.0} x={100} y={850} />
      <FederalNavyAura cx={540} cy={1180} rx={460} ry={250} id="tallyBoardAura" />

      
        {/* Corrugated Box Structural Creases & Authentic Packaging Tape Seams */}
        <path d="M 80 1150 Q 185 1160 290 1150" stroke="#78350F" strokeWidth="2.5" fill="none" />
        <path d="M 80 1200 Q 185 1208 290 1200" stroke="#78350F" strokeWidth="2.5" fill="none" />
        <path d="M 90 1020 Q 185 1028 280 1020" stroke="#78350F" strokeWidth="2" fill="none" />
        <path d="M 90 1070 Q 185 1076 280 1070" stroke="#78350F" strokeWidth="2" fill="none" />
        <path d="M 110 900 Q 190 906 270 900" stroke="#78350F" strokeWidth="2" fill="none" />
        <path d="M 790 1140 Q 895 1148 1000 1140" stroke="#78350F" strokeWidth="2.5" fill="none" />
        <path d="M 790 1200 Q 895 1208 1000 1200" stroke="#78350F" strokeWidth="2.5" fill="none" />
        <path d="M 800 1000 Q 895 1008 990 1000" stroke="#78350F" strokeWidth="2" fill="none" />
        <path d="M 820 890 Q 900 896 980 890" stroke="#78350F" strokeWidth="2" fill="none" />
        <path d="M 185 860 L 185 1270" stroke="#92400E" strokeWidth="3" strokeDasharray="8 4" fill="none" />
        <path d="M 895 850 L 895 1260" stroke="#92400E" strokeWidth="3" strokeDasharray="8 4" fill="none" />
        <path d="M 320 940 L 760 940 L 760 1420 L 320 1420 Z" stroke="#F59E0B" strokeWidth="2" fill="none" />

      {/* Massive Towering Stacks of Corrugated Parcels */}
      <g transform={`translate(0, ${parcelJitter})`}>
        {/* Left Parcel Column */}
        <rect x="80" y="1120" width="210" height="150" fill="#D97706" stroke="#78350F" strokeWidth="3" />
        <rect x="90" y="980" width="190" height="135" fill="#B45309" stroke="#78350F" strokeWidth="3" />
        <rect x="110" y="860" width="160" height="115" fill="#D97706" stroke="#78350F" strokeWidth="3" />
        {/* Right Parcel Column */}
        <rect x="790" y="1100" width="210" height="160" fill="#B45309" stroke="#78350F" strokeWidth="3" />
        <rect x="800" y="960" width="190" height="135" fill="#D97706" stroke="#78350F" strokeWidth="3" />
        <rect x="820" y="850" width="160" height="105" fill="#B45309" stroke="#78350F" strokeWidth="3" />

        {/* Priority Mail Labels & Blue/Red Striping */}
        {[
          { x: 95, y: 1145, w: 180 },
          { x: 105, y: 1005, w: 160 },
          { x: 805, y: 1125, w: 180 },
          { x: 815, y: 985, w: 160 },
        ].map((stripe, idx) => (
          <g key={idx}>
            <rect x={stripe.x} y={stripe.y} width={stripe.w} height="16" fill="#1E3A8A" />
            <rect x={stripe.x} y={stripe.y + 18} width={stripe.w} height="8" fill="#DC2626" />
            <rect x={stripe.x + 10} y={stripe.y + 32} width="50" height="25" fill="#F8FAFC" />
          </g>
        ))}
      </g>

      {/* Central Tactile Mechanical Cardstock Tally Board */}
      <g transform="translate(320, 940)">
        {/* Background Board Frame */}
        <rect x="0" y="0" width="440" height="480" rx="14" fill="#0F172A" stroke="#F59E0B" strokeWidth="4" />
        <rect x="14" y="14" width="412" height="452" rx="10" fill="#1E293B" stroke="#334155" strokeWidth="2" />

        {/* Header Banner */}
        <rect x="30" y="32" width="380" height="42" rx="6" fill="#090D12" stroke="#475569" strokeWidth="1.5" />
        <text x="220" y="60" textAnchor="middle" fill="#F59E0B" fontSize="18" fontWeight="800" fontFamily="Montserrat" letterSpacing="0.06em">
          COUNTERFEIT TOLL (PKR)
        </text>

        {/* Mechanical Rolling Digit Slots */}
        <g transform="translate(40, 110)">
          <rect x="0" y="0" width="360" height="140" rx="10" fill="#0A0E14" stroke="#F59E0B" strokeWidth="3" />
          <line x1="0" y1="70" x2="360" y2="70" stroke="#1E293B" strokeWidth="2" />
          <text x="180" y="95" textAnchor="middle" fill="#F8FAFC" fontSize="72" fontWeight="900" fontFamily="Montserrat">
            {Math.round(rollVal)}B
          </text>
        </g>

        {/* Currency Subtext */}
        <text x="220" y="295" textAnchor="middle" fill="#94A3B8" fontSize="22" fontWeight="700" fontFamily="Montserrat" letterSpacing="0.04em">
          RS 35,000,000,000
        </text>

        {/* Postal Verification Barcode Strip */}
        <g transform="translate(50, 330)">
          <rect x="0" y="0" width="340" height="70" fill="#F8FAFC" rx="6" />
          {[20, 36, 48, 64, 88, 104, 120, 144, 168, 184, 208, 232, 256, 280, 304].map((bx, i) => (
            <line key={i} x1={bx} y1="12" x2={bx} y2="58" stroke="#0F172A" strokeWidth={i % 2 === 0 ? 5 : 2.5} />
          ))}
        </g>

        {/* PHASE 2 PAYOFF: Weathered Red Stamp Slam */}
        {isPayoff && (
          <g transform={`translate(220, 240) scale(${stampScale})`}>
            <WeatheredMilitaryStamp
              text="35 BILLION PKR"
              subText="USPS FRAUD TOTAL"
              color="#DC2626"
              rotation={-8}
              slamProgress={stampScale}
            />
          </g>
        )}
      </g>
    </svg>
  );
};

// ============================================================================
// SCENE 03: FAHEEM VILLAGE DESK SILHOUETTE (LONE_LEADER, Payoff: Frame 35)
// ============================================================================
export const FaheemVillageDeskSilhouette: React.FC<{ durationFrames?: number }> = ({ durationFrames = 102 }) => {
  const frame = useCurrentFrame();
  const isPayoff = frame >= 35;
  const haloIntensity = isPayoff ? interpolate(frame - 35, [0, 8, 25], [0.2, 1.0, 0.85], CLAMP) : 0.15;
  const fanAngle = (frame * 6.5) % 360;
  const breathing = Math.sin(frame * 0.14) * 2.5;
  const flameFlicker = Math.sin(frame * 0.3) * 2;
  const steamWave = Math.sin(frame * 0.15) * 5;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene03LONELEADERSilhouette color="#9A3412" opacity={0.3} scale={1.0} x={100} y={880} />
      <defs>
        <linearGradient id="windowSunbeam" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity={0.28} />
          <stop offset="50%" stopColor="#F59E0B" stopOpacity={0.12} />
          <stop offset="100%" stopColor="#78350F" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="laptopScreenGlow" x1="0%" y1="0%" x2="100%" y2="60%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity={0.8} />
          <stop offset="40%" stopColor="#F59E0B" stopOpacity={0.45} />
          <stop offset="100%" stopColor="#B45309" stopOpacity={0} />
        </linearGradient>
      </defs>

      <TerracottaAtmosphericAura cx={540} cy={1180} rx={460} ry={260} id="villageDeskAura" />

      {/* Sunbeam Dust Shaft from High Arched Pinjra Window */}
      <polygon points="120,870 260,870 780,1480 520,1480" fill="url(#windowSunbeam)" />

      {/* Background: Traditional Weathered Red Brick Wall & Recessed Mortar */}
      <g stroke="#3D1408" strokeWidth="2">
        <rect x="80" y="860" width="920" height="620" fill="#2E130B" stroke="#431407" strokeWidth="4" />
        {[900, 935, 970, 1005, 1040, 1075, 1110, 1145, 1180, 1215, 1250, 1285, 1320, 1355, 1390, 1425, 1460].map((y, rowIdx) => (
          <g key={y}>
            <line x1="80" y1={y} x2="1000" y2={y} stroke="#4A180C" strokeWidth="2.5" />
            {Array.from({ length: 16 }).map((_, colIdx) => {
              const bx = 80 + colIdx * 58 + (rowIdx % 2 === 0 ? 0 : 29);
              return <line key={colIdx} x1={bx} y1={y} x2={bx} y2={y + 35} stroke="#381308" strokeWidth="1.5" />;
            })}
          </g>
        ))}
      </g>

      {/* Traditional Arched Niche (Taaq) Carved into Brick Wall */}
      <g transform="translate(160, 930)">
        {/* Niche Arch Recess */}
        <path d="M 0 160 L 0 50 Q 60 -10 120 50 L 120 160 Z" fill="#1C0B06" stroke="#4A180C" strokeWidth="3" />
        {/* Stepped Shelf Lintel */}
        <rect x="-10" y="155" width="140" height="15" fill="#3D180F" stroke="#5A2416" strokeWidth="2" />
        {/* Ancient Brass Diya Oil Lamp */}
        <ellipse cx="60" cy="148" rx="22" ry="7" fill="#B45309" stroke="#D97706" strokeWidth="2" />
        <path d="M 60 148 L 78 140 L 72 152 Z" fill="#D97706" />
        {/* Diya Flame with Warm Glow */}
        <circle cx="76" cy="136" r="14" fill="#F59E0B" opacity={0.35} />
        <ellipse cx="76" cy={136 + flameFlicker * 0.5} rx="5" ry="9" fill="#FEF08A" />
        {/* Rolled Land Registry Deed Scrolls Tied with Red Ribbon */}
        <rect x="15" y="125" width="30" height="28" rx="4" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
        <line x1="30" y1="125" x2="30" y2="153" stroke="#DC2626" strokeWidth="2.5" />
      </g>

      {/* Overhead Vintage Pakistani 3-Blade Ceiling Fan (Pak/Royal Fans) */}
      <g transform="translate(540, 875)">
        {/* Downrod and Ceiling Canopy */}
        <rect x="-18" y="-15" width="36" height="12" rx="3" fill="#29180E" stroke="#5A3E2D" strokeWidth="1.5" />
        <line x1="0" y1="-5" x2="0" y2="45" stroke="#78350F" strokeWidth="6" />
        {/* Heavy Cast-Iron Motor Housing with Gold Pinstripe */}
        <ellipse cx="0" cy="45" rx="32" ry="20" fill="#2E1B10" stroke="#92400E" strokeWidth="3" />
        <ellipse cx="0" cy="45" rx="22" ry="12" fill="#451A03" stroke="#D97706" strokeWidth="1.5" />
        <circle cx="0" cy="45" r="8" fill="#F59E0B" />
        {/* Rotating Curved Aerodynamic Blades with Motion Blur */}
        <g transform={`rotate(${fanAngle})`}>
          {[0, 120, 240].map((angle, i) => (
            <g key={i} transform={`rotate(${angle})`}>
              {/* Blade Shank Bracket */}
              <rect x="-8" y="24" width="16" height="18" fill="#78350F" stroke="#92400E" strokeWidth="1.5" />
              {/* Curved Timber Blade */}
              <path
                d="M -14 42
                   C -20 90, -18 135, -8 160
                   C 0 166, 16 164, 20 156
                   C 22 130, 18 85, 14 42 Z"
                fill="#3D2012"
                stroke="#78350F"
                strokeWidth="2"
                opacity={0.88}
              />
              {/* Center Pinstripe Stripe */}
              <line x1="2" y1="45" x2="6" y2="150" stroke="#F59E0B" strokeWidth="1.8" opacity={0.7} />
            </g>
          ))}
        </g>
      </g>

      {/* Solid Punjabi Sheesham Timber Pedestal Desk */}
      <g transform="translate(180, 1260)">
        {/* Heavy Rosewood Desktop Lintel */}
        <rect x="0" y="0" width="720" height="26" rx="3" fill="#4A2616" stroke="#2B140B" strokeWidth="3" />
        {/* Left Drawer Pedestal */}
        <rect x="25" y="26" width="220" height="190" fill="#381B0F" stroke="#2B140B" strokeWidth="3" />
        {/* 3 Drawer Panels with Recessed Molding & Brass Drop Handles */}
        {[38, 95, 152].map((dy) => (
          <g key={dy}>
            <rect x="40" y={dy} width="190" height="48" rx="2" fill="#2B140B" stroke="#5A2F1B" strokeWidth="2" />
            {/* Brass Drop Handle */}
            <rect x="120" y={dy + 18} width="30" height="8" rx="4" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
            <circle cx="135" cy={dy + 26} r="4" fill="#F59E0B" />
          </g>
        ))}
        {/* Right Desk Leg Support Post */}
        <rect x="650" y="26" width="45" height="190" fill="#381B0F" stroke="#2B140B" strokeWidth="3" />
        <rect x="635" y="200" width="75" height="16" fill="#2B140B" />
        {/* Center Modesty Screen Panel */}
        <rect x="245" y="45" width="405" height="130" fill="#2B140B" stroke="#4A2616" strokeWidth="2" opacity={0.9} />

        {/* Desk Surface Props: Pakistani Stamp Papers & Ledgers */}
        {/* Stack of Green-Bordered E-Stamp / Court Fee Deeds */}
        <g transform="translate(60, -32)">
          <rect x="0" y="0" width="130" height="32" rx="3" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
          <rect x="6" y="5" width="118" height="22" rx="2" fill="none" stroke="#059669" strokeWidth="2" strokeDasharray="4 2" />
          <line x1="20" y1="16" x2="110" y2="16" stroke="#0F172A" strokeWidth="2" strokeDasharray="3 3" />
          {/* Top Angled Ledger */}
          <rect x="15" y="-14" width="115" height="18" rx="2" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.2" transform="rotate(-3)" />
        </g>

        {/* Traditional Wooden Pen Stand & Brass Ruler */}
        <g transform="translate(210, -22)">
          <rect x="0" y="6" width="34" height="16" rx="2" fill="#2E1B10" stroke="#78350F" strokeWidth="1.5" />
          <line x1="8" y1="8" x2="4" y2="-18" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          <line x1="20" y1="8" x2="26" y2="-22" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
          {/* Brass Ruler */}
          <rect x="45" y="16" width="75" height="6" fill="#D97706" stroke="#B45309" strokeWidth="1" />
        </g>

        {/* Traditional Fluted Steel/Brass Chai Glass */}
        <g transform="translate(640, -36)">
          <polygon points="0,36 32,36 28,10 4,10" fill="#D97706" stroke="#92400E" strokeWidth="2" />
          <polygon points="4,33 28,33 25,14 7,14" fill="#F59E0B" opacity={0.75} />
          {/* Curved Steam Wisps */}
          <path
            d={`M 14 8 Q ${18 + steamWave} -8 14 -22 Q ${10 - steamWave} -34 16 -46`}
            fill="none"
            stroke="#FEF3C7"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={0.6}
          />
        </g>
      </g>

      {/* Seated Coder Silhouette: Faheem Akram (High Anatomical Fidelity) */}
      <g transform={`translate(${640}, ${1130 + breathing})`}>
        {/* High-Back Wooden Chair */}
        <g stroke="#1A110C" strokeWidth="4" fill="none">
          <line x1="45" y1="160" x2="40" y2="60" />
          <line x1="-30" y1="160" x2="-25" y2="60" />
          <line x1="40" y1="60" x2="48" y2="-45" strokeWidth="5" />
          <line x1="30" y1="55" x2="36" y2="-40" strokeWidth="3" />
          <rect x="-35" y="60" width="85" height="14" rx="3" fill="#2E1B10" stroke="#4A2616" strokeWidth="2" />
        </g>

        {/* Lower Body: Shalwar Drape and Seated Posture */}
        <path
          d="M 35 70
             C 25 65, -15 65, -45 75
             L -65 140
             C -55 165, -20 170, 5 165
             L 25 150
             L 40 135 Z"
          fill="#1E293B"
          stroke="#0F172A"
          strokeWidth="3"
        />

        {/* Upper Torso: Tailored Linen Kurta with Mandarin Collar */}
        <path
          d="M 35 65
             L 28 -5
             C 24 -28, 5 -36, -14 -30
             C -30 -24, -36 -4, -32 35
             L -35 75 Z"
          fill="#1E293B"
          stroke="#0F172A"
          strokeWidth="3"
        />
        {/* Mandarin Collar Accent */}
        <path d="M 8 -32 Q -5 -36 -18 -30" fill="none" stroke="#F59E0B" strokeWidth="2" />
        {/* Kurta Button Placket */}
        <line x1="-5" y1="-32" x2="-8" y2="25" stroke="#334155" strokeWidth="2" strokeDasharray="3 4" />

        {/* Anatomical Head in Profile: Hairline, Nose, Lips, Trim Beard */}
        <path
          d="M -5 -35
             C 2 -48, -8 -68, -24 -68
             C -38 -68, -44 -54, -42 -44
             C -48 -42, -50 -36, -48 -30
             C -50 -28, -52 -22, -49 -18
             C -44 -10, -38 -8, -28 -8
             C -18 -8, -14 -16, -12 -26 Z"
          fill="#0F172A"
        />
        {/* Neat Trimmed Beard Silhouette */}
        <path
          d="M -40 -30
             C -50 -24, -48 -14, -42 -8
             C -32 -4, -22 -8, -18 -14 Z"
          fill="#090D12"
        />
        {/* Ear Contour */}
        <ellipse cx="-24" cy="-35" rx="4" ry="6" fill="#1E293B" />

        {/* Articulated Arm Extending Forward & Typing Hands */}
        <path
          d="M -20 -15
             C -32 10, -42 28, -55 42
             L -95 44
             L -115 50
             L -95 56
             L -35 50 Z"
          fill="#1E293B"
          stroke="#0F172A"
          strokeWidth="2.5"
        />
        {/* Typing Fingers Poised over Keys */}
        <line x1="-95" y1="44" x2="-112" y2="46" stroke="#F8FAFC" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="-97" y1="48" x2="-114" y2="50" stroke="#F8FAFC" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="-95" y1="52" x2="-110" y2="54" stroke="#F8FAFC" strokeWidth="2.2" strokeLinecap="round" />

        {/* Wedge Laptop on Desk */}
        <g transform="translate(-195, 20)">
          {/* Base Deck & Keyboard Well */}
          <polygon points="0,38 85,38 78,32 10,32" fill="#18181B" stroke="#0F172A" strokeWidth="2" />
          <line x1="25" y1="35" x2="65" y2="35" stroke="#334155" strokeWidth="2.5" />
          {/* Trackpoint */}
          <circle cx="45" cy="34" r="1.5" fill="#EF4444" />
          {/* Screen Display Angled Back toward Faheem */}
          <polygon points="12,32 72,32 62,-22 18,-22" fill="#090D12" stroke="#27272A" strokeWidth="2" />
          {/* Glowing Amber Display Screen */}
          <polygon
            points="14,30 70,30 60,-20 20,-20"
            fill="#F59E0B"
            opacity={isPayoff ? haloIntensity : 0.35}
          />
          {/* Code Matrix Text Lines on Screen */}
          {[-12, -4, 4, 12, 20].map((cy, idx) => (
            <line
              key={idx}
              x1="24"
              y1={cy}
              x2={idx % 2 === 0 ? "62" : "50"}
              y2={cy}
              stroke="#FEF08A"
              strokeWidth="1.5"
              opacity={0.8}
            />
          ))}
          {/* Volumetric Light Cone Casting onto Faheem's Face, Chest, and Desk */}
          <polygon
            points="20,-18 60,-18 140,-45 120,20"
            fill="url(#laptopScreenGlow)"
            opacity={isPayoff ? haloIntensity : 0.4}
          />
        </g>
      </g>

      {/* PHASE 2 PAYOFF: Code Glow Blooms Outward, Illuminating Entire Room */}
      {isPayoff && (
        <g opacity={haloIntensity}>
          <circle cx="480" cy="1220" r="220" fill="url(#villageDeskAura)" />
          {/* Expanding Shockwave Arc Rings */}
          <circle cx="480" cy="1220" r="160" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="10 8" />
          <circle cx="480" cy="1220" r="240" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="14 10" />
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 04: KHANEWAL PUNJAB TACTICAL MAP (VECTOR_MAP, Payoff: Frame 35)
// ============================================================================
export const KhanewalPunjabTacticalMap: React.FC<{ durationFrames?: number }> = ({ durationFrames = 101 }) => {
  const frame = useCurrentFrame();
  const isPayoff = frame >= 35;
  const radarSweep = (frame * 3.8) % 360;
  const pingR = isPayoff ? interpolate(frame - 35, [0, 20], [20, 190], CLAMP) : 0;
  const pingAlpha = isPayoff ? interpolate(frame - 35, [0, 18], [0.95, 0], CLAMP) : 0;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <FederalNavyAura cx={540} cy={1180} rx={480} ry={270} id="punjabMapAura" />

      {/* Fine D3 Tactical Topographic Grid with Degree Annotations */}
      <g stroke="#334155" strokeWidth="1.5" opacity={0.45}>
        {[900, 980, 1060, 1140, 1220, 1300, 1380, 1460].map((y) => (
          <line key={y} x1="80" y1={y} x2="1000" y2={y} />
        ))}
        {[140, 260, 380, 500, 620, 740, 860, 980].map((x) => (
          <line key={x} x1={x} y1="880" x2={x} y2="1480" />
        ))}
      </g>

      {/* Lat/Long Coordinate Border Telemetry Tags */}
      <g fill="#64748B" fontSize="12" fontWeight="700" fontFamily="Montserrat">
        <text x="90" y="895">31°45'N</text>
        <text x="90" y="1145">30°18'N</text>
        <text x="90" y="1385">29°30'N</text>
        <text x="240" y="1475">71°00'E</text>
        <text x="480" y="1475">71°55'E</text>
        <text x="720" y="1475">73°10'E</text>
        <text x="920" y="1475">74°20'E</text>
      </g>

      {/* 16-Point Compass Rose */}
      <g transform="translate(180, 960)">
        <circle r="36" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 3" />
        <polygon points="0,-42 5,-12 0,0 -5,-12" fill="#38BDF8" />
        <polygon points="0,42 5,12 0,0 -5,12" fill="#64748B" />
        <polygon points="42,0 12,5 0,0 12,-5" fill="#64748B" />
        <polygon points="-42,0 -12,5 0,0 -12,-5" fill="#64748B" />
        <text x="0" y="-48" textAnchor="middle" fill="#38BDF8" fontSize="12" fontWeight="900" fontFamily="Montserrat">N</text>
      </g>

      {/* Topographic Elevation Contours of Southern Punjab Plain */}
      <g stroke="#1E3A8A" fill="none" opacity={0.4}>
        <path d="M 120 980 Q 320 940 540 1020 T 960 990" strokeWidth="1.5" strokeDasharray="8 6" />
        <path d="M 100 1100 Q 360 1080 580 1150 T 980 1120" strokeWidth="1.5" strokeDasharray="8 6" />
        <path d="M 120 1240 Q 380 1200 620 1280 T 960 1250" strokeWidth="1.5" strokeDasharray="8 6" />
      </g>

      {/* Canal Irrigation Grid / Agricultural Plots (Chak Grid) */}
      <g stroke="#0F766E" strokeWidth="1" strokeDasharray="4 6" opacity={0.35}>
        {[420, 460, 500, 540, 580, 620].map((x) => (
          <line key={x} x1={x} y1="1100" x2={x} y2="1280" />
        ))}
        {[1120, 1160, 1200, 1240].map((y) => (
          <line key={y} x1="400" y1={y} x2="640" y2={y} />
        ))}
      </g>

      {/* Hydrographic Vectors: Meandering Chenab & Ravi Rivers with Sandbars */}
      {/* Chenab River (West) */}
      <path
        d="M 220 890
           C 280 960, 240 1020, 290 1080
           C 340 1140, 310 1200, 360 1270
           C 410 1340, 380 1410, 440 1480"
        fill="none"
        stroke="#0284C7"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M 220 890
           C 280 960, 240 1020, 290 1080
           C 340 1140, 310 1200, 360 1270
           C 410 1340, 380 1410, 440 1480"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="2.5"
        strokeDasharray="18 10"
      />
      {/* Ravi River (East) */}
      <path
        d="M 640 890
           C 720 950, 680 1010, 740 1070
           C 800 1130, 770 1200, 830 1270
           C 890 1340, 860 1410, 920 1480"
        fill="none"
        stroke="#0284C7"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Main Line 1 (ML-1) Railway Corridor (Karachi - Khanewal - Lahore) */}
      <g>
        {/* Railway Track Base Bed */}
        <path
          d="M 260 1440 L 520 1180 L 880 960"
          fill="none"
          stroke="#78350F"
          strokeWidth="6"
        />
        {/* Alternating Railway Sleeper Ties */}
        <path
          d="M 260 1440 L 520 1180 L 880 960"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="6"
          strokeDasharray="6 6"
        />
        {/* Railway Junction Switch Siding at Khanewal */}
        <path
          d="M 480 1220 Q 520 1200 580 1210"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="3.5"
          strokeDasharray="4 4"
        />
      </g>

      {/* Miniature Vector Silhouette: Historic Khanewal Railway Clock Tower */}
      <g transform="translate(520, 1115)">
        {/* Clock Tower Stepped Brick Base */}
        <rect x="-24" y="0" width="48" height="30" fill="#7C2D12" stroke="#B45309" strokeWidth="2" />
        {/* Arched Doorway */}
        <path d="M -8 30 L -8 18 Q 0 12 8 18 L 8 30 Z" fill="#1C1917" />
        {/* Tower Main Shaft with Brick Corbel Dentils */}
        <rect x="-18" y="-35" width="36" height="35" fill="#9A3412" stroke="#B45309" strokeWidth="2" />
        {/* Stepped Balcony Cornice */}
        <rect x="-22" y="-38" width="44" height="6" fill="#D97706" />
        {/* Circular Clock Dial Chamber */}
        <rect x="-16" y="-58" width="32" height="20" fill="#7C2D12" stroke="#B45309" strokeWidth="2" />
        <circle cx="0" cy="-48" r="7" fill="#FEF08A" stroke="#451A03" strokeWidth="1.5" />
        <line x1="0" y1="-48" x2="0" y2="-53" stroke="#451A03" strokeWidth="1.5" />
        <line x1="0" y1="-48" x2="3" y2="-48" stroke="#451A03" strokeWidth="1.5" />
        {/* Domed Pyramidal Spire Roof */}
        <polygon points="-16,-58 0,-76 16,-58" fill="#B45309" stroke="#F59E0B" strokeWidth="1.5" />
        <line x1="0" y1="-76" x2="0" y2="-84" stroke="#F59E0B" strokeWidth="2" />
      </g>

      {/* Regional Nodes: Lahore, Multan, Sahiwal */}
      {/* Lahore Node */}
      <g transform="translate(880, 960)">
        <circle cx="0" cy="0" r="8" fill="#CBD5E1" stroke="#0F172A" strokeWidth="2" />
        <text x="16" y="5" fill="#CBD5E1" fontSize="16" fontWeight="900" fontFamily="Montserrat">
          LAHORE
        </text>
      </g>

      {/* Multan Node */}
      <g transform="translate(340, 1340)">
        <circle cx="0" cy="0" r="8" fill="#CBD5E1" stroke="#0F172A" strokeWidth="2" />
        <text x="-16" y="5" textAnchor="end" fill="#CBD5E1" fontSize="16" fontWeight="900" fontFamily="Montserrat">
          MULTAN
        </text>
      </g>

      {/* Rotating Tactical Radar Sweep Beam */}
      <g transform="translate(520, 1180)">
        <line
          x1="0"
          y1="0"
          x2={240 * Math.cos((radarSweep * Math.PI) / 180)}
          y2={240 * Math.sin((radarSweep * Math.PI) / 180)}
          stroke="#38BDF8"
          strokeWidth="3"
          opacity={0.7}
        />
        <circle r="120" fill="none" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="6 4" opacity={0.4} />
        <circle r="240" fill="none" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="8 6" opacity={0.3} />
      </g>

      {/* Focal Target Pin: Khanewal Railway Junction */}
      <g transform="translate(520, 1180)">
        <PulsatingBattleMarker
          x={0}
          y={0}
          color="#EA580C"
          size={26}
          label="KHANEWAL"
          sublabel="30°18'N, 71°55'E"
          showCrosshairs={true}
        />
      </g>

      {/* PHASE 2 PAYOFF: Amber Target Coordinate Ring Shockwave Expansion */}
      {isPayoff && (
        <g transform="translate(520, 1180)">
          <circle r={pingR} fill="none" stroke="#F59E0B" strokeWidth="4.5" opacity={pingAlpha} />
          <circle r={pingR * 0.7} fill="none" stroke="#EF4444" strokeWidth="3" opacity={pingAlpha} />
          <circle r={pingR * 0.4} fill="none" stroke="#FEF08A" strokeWidth="2" opacity={pingAlpha} />
          {/* Target Data Lock Reticle */}
          <g opacity={1 - pingAlpha * 0.5}>
            <rect x="-130" y="45" width="260" height="34" rx="6" fill="#7C2D12" stroke="#EA580C" strokeWidth="2" />
            <text x="0" y="68" textAnchor="middle" fill="#FEF08A" fontSize="16" fontWeight="900" fontFamily="Montserrat">
              ORIGIN NODE LOCKED
            </text>
          </g>
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 05: SOFTWARE DEGREE AMBITION CARD (QUOTE_CARD, Payoff: Frame 35)
// ============================================================================
export const SoftwareDegreeAmbitionCard: React.FC<{ durationFrames?: number }> = ({ durationFrames = 102 }) => {
  const frame = useCurrentFrame();
  const isPayoff = frame >= 35;
  const terminalSlide = isPayoff ? interpolate(frame - 35, [0, 10], [140, 0], CLAMP) : 140;
  const cursorBlink = Math.floor(frame / 14) % 2 === 0;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <TerracottaAtmosphericAura cx={540} cy={1180} rx={440} ry={250} id="degreeAmbitionAura" />

      {/* Framed University Diploma Card */}
      <g transform="translate(240, 920)">
        {/* Wood Frame */}
        <rect x="0" y="0" width="600" height="420" rx="10" fill="#78350F" stroke="#B45309" strokeWidth="4" />
        {/* Aged Parchment Substrate */}
        <rect x="18" y="18" width="564" height="384" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />

        {/* Gold Seal & Ribbons */}
        <circle cx="500" cy="330" r="34" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
        <path d="M 488 355 L 480 395 L 500 380 L 520 395 L 512 355 Z" fill="#DC2626" />

        {/* Calligraphic Heading & Degree */}
        <text x="300" y="80" textAnchor="middle" fill="#451A03" fontSize="24" fontWeight="900" fontFamily="Montserrat" letterSpacing="0.08em">
          UNIVERSITY OF THE PUNJAB
        </text>
        <line x1="80" y1="100" x2="520" y2="100" stroke="#B45309" strokeWidth="2" />
        <text x="300" y="150" textAnchor="middle" fill="#78350F" fontSize="20" fontWeight="700" fontFamily="Montserrat">
          BACHELOR OF SCIENCE IN
        </text>
        <text x="300" y="200" textAnchor="middle" fill="#991B1B" fontSize="32" fontWeight="900" fontFamily="Montserrat">
          SOFTWARE ENGINEERING
        </text>
        <text x="300" y="250" textAnchor="middle" fill="#451A03" fontSize="18" fontWeight="600" fontFamily="Montserrat">
          CONFERRED UPON FAHEEM AKRAM
        </text>
      </g>

      {/* Stacked Overdue Household Bills in Foreground */}
      <g transform="translate(200, 1260) rotate(-4)">
        <rect x="0" y="0" width="340" height="150" rx="6" fill="#F8FAFC" stroke="#DC2626" strokeWidth="3" />
        <rect x="20" y="20" width="160" height="20" fill="#1E293B" />
        <text x="170" y="100" textAnchor="middle" fill="#DC2626" fontSize="28" fontWeight="900" fontFamily="Montserrat">
          FINAL DEMAND • UNPAID
        </text>
      </g>

      {/* PHASE 2 PAYOFF: Glowing Terminal Eclipses the Bills */}
      {isPayoff && (
        <g transform={`translate(260, ${1100 + terminalSlide})`}>
          {/* Cyber Terminal Window */}
          <rect x="0" y="0" width="560" height="260" rx="10" fill="#090D12" stroke="#10B981" strokeWidth="3.5" />
          <rect x="0" y="0" width="560" height="34" rx="10" fill="#064E3B" />
          <circle cx="20" cy="17" r="6" fill="#EF4444" />
          <circle cx="40" cy="17" r="6" fill="#F59E0B" />
          <circle cx="60" cy="17" r="6" fill="#10B981" />
          <text x="90" y="23" fill="#D1FAE5" fontSize="14" fontWeight="800" fontFamily="Montserrat">
            ROOT@LABELSBANK-CORE:~
          </text>
          {/* Cascading Green Exploit Code */}
          <text x="24" y="70" fill="#34D399" fontSize="18" fontWeight="800" fontFamily="Montserrat">
            {'>'} INITIALIZING USPS IMb ENGINE...
          </text>
          <text x="24" y="110" fill="#10B981" fontSize="18" fontWeight="800" fontFamily="Montserrat">
            {'>'} BYPASSING ROUTING KEY VERIFICATION [OK]
          </text>
          <text x="24" y="150" fill="#FBBF24" fontSize="18" fontWeight="800" fontFamily="Montserrat">
            {'>'} GLOBAL STRIPE/CRYPTO GATEWAY ACTIVE
          </text>
          <text x="24" y="195" fill="#EF4444" fontSize="22" fontWeight="900" fontFamily="Montserrat">
            {'>'} EXPLOIT TARGET: $126,000,000 USD {cursorBlink ? '█' : ''}
          </text>
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 06: BARCODE CRYPTOGRAPHIC FLAW SPLIT (SPLIT_CONFRONTATION, Payoff: Frame 35)
// ============================================================================
export const BarcodeCryptographicFlawSplit: React.FC<{ durationFrames?: number }> = ({ durationFrames = 101 }) => {
  const frame = useCurrentFrame();
  const isPayoff = frame >= 35;
  const splitGap = isPayoff ? interpolate(frame - 35, [0, 8], [0, 85], CLAMP) : 0;
  const fracturePulse = isPayoff ? interpolate(frame - 35, [0, 8, 20], [0, 1, 0.5], CLAMP) : 0;
  const laserY = 960 + ((frame * 4.5) % 360);

  // 65-bar deterministic USPS Intelligent Mail Barcode (IMb) 4-state sequence
  // States: 0 = Tracker (T), 1 = Ascender (A), 2 = Descender (D), 3 = Full (F)
  const imbBars = [
    3, 1, 0, 2, 3, 0, 1, 3, 2, 0, 3, 1, 2, 0, 3, 3, 1, 0, 2, 1, 3, 0, 2, 3, 1,
    0, 3, 2, 1, 0, 3, 1, 0, 2, 3, 0, 1, 3, 2, 0, 3, 1, 2, 0, 3, 3, 1, 0, 2, 1,
    3, 0, 2, 3, 1, 0, 3, 2, 1, 0, 3, 1, 0, 2, 3
  ];

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene06SPLITCONFRONTATIONSilhouette color="#1E1B4B" opacity={0.4} scale={1.0} x={100} y={880} />
      <defs>
        <radialGradient id="lensGlow" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.35} />
          <stop offset="50%" stopColor="#0284C7" stopOpacity={0.15} />
          <stop offset="85%" stopColor="#1E3A8A" stopOpacity={0.08} />
          <stop offset="100%" stopColor="#0F172A" stopOpacity={0} />
        </radialGradient>
        <linearGradient id="laserBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity={0} />
          <stop offset="25%" stopColor="#EF4444" stopOpacity={0.8} />
          <stop offset="50%" stopColor="#FEE2E2" stopOpacity={1} />
          <stop offset="75%" stopColor="#EF4444" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
        </linearGradient>
      </defs>

      <FederalNavyAura cx={540} cy={1180} rx={480} ry={270} id="barcodeSplitAura" />

      {/* Engineering Millimeter Blueprint Background Grid */}
      <g stroke="#1E293B" strokeWidth="1.2" opacity={0.5}>
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={`h-${i}`} x1="80" y1={900 + i * 40} x2="1000" y2={900 + i * 40} />
        ))}
        {Array.from({ length: 24 }).map((_, i) => (
          <line key={`v-${i}`} x1="80 + i * 40" y1="900" x2="80 + i * 40" y2="1460" />
        ))}
      </g>

      {/* Precision Caliper / Micrometer Ticks on Top Margin */}
      <g stroke="#64748B" strokeWidth="1.5">
        <line x1="140" y1="940" x2="940" y2="940" />
        {Array.from({ length: 41 }).map((_, i) => {
          const tx = 140 + i * 20;
          const isMajor = i % 5 === 0;
          return <line key={i} x1={tx} y1="940" x2={tx} y2={isMajor ? 922 : 932} strokeWidth={isMajor ? 2 : 1} />;
        })}
      </g>
      <text x="540" y="920" textAnchor="middle" fill="#94A3B8" fontSize="13" fontWeight="800" fontFamily="Montserrat" letterSpacing="0.1em">
        USPS INTELLIGENT MAIL BARCODE (IMb) FORENSIC SPECIFICATION: 0.020" PITCH
      </text>

      {/* Optical Inspection Circular Reticle with Crosshairs */}
      <circle cx="540" cy="1180" r="320" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="12 8" />
      <circle cx="540" cy="1180" r="180" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="6 4" opacity={0.6} />
      <line x1="160" y1="1180" x2="920" y2="1180" stroke="#334155" strokeWidth="1.5" strokeDasharray="8 6" />
      <line x1="540" y1="900" x2="540" y2="1460" stroke="#334155" strokeWidth="1.5" strokeDasharray="8 6" />

      {/* LEFT HALF OF 65-BAR IMb MATRIX (Bars 0 to 32) */}
      <g transform={`translate(${-splitGap}, 0)`}>
        {/* Mounting Carrier Card */}
        <rect x="130" y="1030" width="390" height="300" rx="6" fill="#0A0F1D" stroke="#1E3A8A" strokeWidth="3" />
        <rect x="140" y="1040" width="370" height="280" rx="4" fill="#070A14" />
        {/* Bars 0 through 32 */}
        {imbBars.slice(0, 33).map((barType, i) => {
          const bx = 160 + i * 10.5;
          // 0 = Tracker (-18..18), 1 = Ascender (-55..18), 2 = Descender (-18..55), 3 = Full (-55..55)
          const y1 = barType === 0 ? 1162 : barType === 1 ? 1125 : barType === 2 ? 1162 : 1125;
          const y2 = barType === 0 ? 1198 : barType === 1 ? 1198 : barType === 2 ? 1235 : 1235;
          return (
            <path
              key={i}
              d={`M ${bx} ${y1} L ${bx} ${y2}`}
              stroke="#F8FAFC"
              strokeWidth="5"
              strokeLinecap="butt"
            />
          );
        })}
        {/* Barcode Sub-Label */}
        <text x="325" y="1295" textAnchor="middle" fill="#38BDF8" fontSize="13" fontWeight="800" fontFamily="Montserrat">
          ROUTING DOMAIN: 08442
        </text>
      </g>

      {/* RIGHT HALF OF 65-BAR IMb MATRIX (Bars 33 to 64) */}
      <g transform={`translate(${splitGap}, 0)`}>
        {/* Mounting Carrier Card */}
        <rect x="560" y="1030" width="390" height="300" rx="6" fill="#0A0F1D" stroke="#1E3A8A" strokeWidth="3" />
        <rect x="570" y="1040" width="370" height="280" rx="4" fill="#070A14" />
        {/* Bars 33 through 64 */}
        {imbBars.slice(33, 65).map((barType, i) => {
          const bx = 590 + i * 10.5;
          const y1 = barType === 0 ? 1162 : barType === 1 ? 1125 : barType === 2 ? 1162 : 1125;
          const y2 = barType === 0 ? 1198 : barType === 1 ? 1198 : barType === 2 ? 1235 : 1235;
          return (
            <path
              key={i}
              d={`M ${bx} ${y1} L ${bx} ${y2}`}
              stroke="#F8FAFC"
              strokeWidth="5"
              strokeLinecap="butt"
            />
          );
        })}
        {/* Barcode Sub-Label */}
        <text x="755" y="1295" textAnchor="middle" fill="#38BDF8" fontSize="13" fontWeight="800" fontFamily="Montserrat">
          CHECKSUM: CRC-16 COLLISION
        </text>
      </g>

      {/* High-Intensity Red Laser Scanner Sweep Line */}
      <g>
        <line x1="100" y1={laserY} x2="980" y2={laserY} stroke="url(#laserBeamGrad)" strokeWidth="5" />
        <line x1="100" y1={laserY} x2="980" y2={laserY} stroke="#F8FAFC" strokeWidth="1.5" />
      </g>

      {/* Forensic Inspection Magnifying Glass Tool (Left Foreground) */}
      <g transform="translate(340, 1170)">
        {/* Heavy Sheesham Timber Turned Handle */}
        <line x1="-120" y1="140" x2="-55" y2="60" stroke="#2B140B" strokeWidth="22" strokeLinecap="round" />
        <line x1="-120" y1="140" x2="-55" y2="60" stroke="#4A2616" strokeWidth="18" strokeLinecap="round" />
        {/* Brass Ferrule Bands */}
        <line x1="-62" y1="68" x2="-48" y2="52" stroke="#D97706" strokeWidth="24" strokeLinecap="round" />
        <line x1="-60" y1="66" x2="-50" y2="54" stroke="#F59E0B" strokeWidth="18" strokeLinecap="round" />
        {/* Outer Knurled Solid Brass Bezel Rim */}
        <circle cx="0" cy="0" r="105" fill="none" stroke="#92400E" strokeWidth="16" />
        <circle cx="0" cy="0" r="105" fill="none" stroke="#D97706" strokeWidth="12" />
        <circle cx="0" cy="0" r="105" fill="none" stroke="#F59E0B" strokeWidth="4" />
        {/* Inner Lens Holding Bezel */}
        <circle cx="0" cy="0" r="96" fill="url(#lensGlow)" stroke="#38BDF8" strokeWidth="3" />
        {/* Spherical Glass Glare Arc Refraction */}
        <path d="M -55 -45 Q 0 -85 55 -45" fill="none" stroke="#F8FAFC" strokeWidth="5" strokeLinecap="round" opacity={0.65} />
        <path d="M -40 -35 Q 0 -68 40 -35" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" opacity={0.5} />
      </g>

      {/* PHASE 2 PAYOFF: Fault Line Fracture & Cryptographic Diagnostic Exploit HUD */}
      {isPayoff && (
        <g>
          {/* Jagged High-Voltage Electric Fracture Bolts */}
          <path
            d="M 540 960 L 530 1050 L 555 1140 L 525 1240 L 545 1330 L 540 1420"
            fill="none"
            stroke="#EF4444"
            strokeWidth="5"
            opacity={fracturePulse}
          />
          <path
            d="M 540 960 L 530 1050 L 555 1140 L 525 1240 L 545 1330 L 540 1420"
            fill="none"
            stroke="#F8FAFC"
            strokeWidth="2.5"
            opacity={fracturePulse * 0.9}
          />

          {/* Radiating Spark Embers */}
          {Array.from({ length: 14 }).map((_, i) => {
            const rad = (i / 14) * Math.PI * 2;
            const dist = 60 + pseudoRandom(i * 19) * 80;
            return (
              <circle
                key={i}
                cx={540 + Math.cos(rad) * dist}
                cy={1180 + Math.sin(rad) * dist}
                r={2 + pseudoRandom(i * 7) * 2.5}
                fill={i % 2 === 0 ? '#EF4444' : '#FDE047'}
                opacity={fracturePulse}
              />
            );
          })}

          {/* Cryptographic Exploit Telemetry HUD Badge */}
          <g transform="translate(540, 1180)" opacity={fracturePulse}>
            {/* Background Container Plinth */}
            <rect x="-175" y="-55" width="350" height="110" rx="10" fill="#450A0A" stroke="#DC2626" strokeWidth="4" />
            <rect x="-165" y="-45" width="330" height="90" rx="6" fill="#1C0606" stroke="#991B1B" strokeWidth="1.5" />
            {/* Flashing Diagnostic Crosshairs */}
            <circle cx="-140" cy="0" r="12" fill="none" stroke="#EF4444" strokeWidth="2.5" />
            <line x1="-140" y1="-18" x2="-140" y2="18" stroke="#EF4444" strokeWidth="2" />
            <line x1="-158" y1="0" x2="-122" y2="0" stroke="#EF4444" strokeWidth="2" />
            {/* Telemetry Text */}
            <text x="15" y="-18" textAnchor="middle" fill="#FEF2F2" fontSize="18" fontWeight="900" fontFamily="Montserrat" letterSpacing="0.06em">
              CRC-16 COLLISION DETECTED
            </text>
            <text x="15" y="10" textAnchor="middle" fill="#F87171" fontSize="14" fontWeight="800" fontFamily="Montserrat">
              ROUTING KEY: 0x0000 (ACCEPTED)
            </text>
            <text x="15" y="32" textAnchor="middle" fill="#FBBF24" fontSize="13" fontWeight="800" fontFamily="Montserrat">
              ZERO PAYMENT VERIFIED
            </text>
          </g>
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 07: LABELSBANK DARK ROOM LAUNCH (LONE_LEADER, Payoff: Frame 36)
// ============================================================================
export const LabelsBankDarkRoomLaunch: React.FC<{ durationFrames?: number }> = ({ durationFrames = 102 }) => {

      
  const frame = useCurrentFrame();
  const isPayoff = frame >= 36;
  const monitorGlow = isPayoff ? interpolate(frame - 36, [0, 8, 20], [0.3, 1.0, 0.9], CLAMP) : 0.2;
  const pulse = Math.sin(frame * 0.22) * 5;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene07LONELEADERSilhouette color="#1E1B4B" opacity={0.4} scale={1.0} x={100} y={880} />
      {/* Rack-Mounted Server Routing Bus Lines & Ambient Data Cables */}
      <g opacity="0.6">
        <path d="M 80 1280 C 140 1310, 220 1320, 320 1300" stroke="#10B981" strokeWidth="2" fill="none" />
        <path d="M 80 1300 C 150 1330, 240 1340, 340 1320" stroke="#047857" strokeWidth="2.5" fill="none" />
        <path d="M 80 1320 C 160 1350, 260 1360, 360 1340" stroke="#065F46" strokeWidth="2" fill="none" />
        <path d="M 720 1300 C 800 1330, 880 1320, 1000 1280" stroke="#38BDF8" strokeWidth="2" fill="none" />
        <path d="M 700 1320 C 780 1350, 860 1340, 980 1300" stroke="#0284C7" strokeWidth="2.5" fill="none" />
        <path d="M 740 1340 C 820 1370, 900 1360, 1000 1320" stroke="#0369A1" strokeWidth="2" fill="none" />
        <path d="M 540 1000 L 540 1250" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        <path d="M 480 1100 Q 540 1060 600 1100" stroke="#34D399" strokeWidth="2" fill="none" />
      </g>
      <CyberGreenAura cx={540} cy={1180} rx={460} ry={260} id="darkRoomLaunchAura" />

      {/* Dark Room Studio Geometry */}
      <rect x="80" y="860" width="920" height="630" fill="#090D12" stroke="#1E293B" strokeWidth="2" />
      <line x1="80" y1="1340" x2="1000" y2="1340" stroke="#1E293B" strokeWidth="3" />

      {/* LEFT WIDESCREEN MONITOR: LabelsBank.com Portal */}
      <g transform="translate(180, 960)">
        <rect x="0" y="0" width="340" height="240" rx="8" fill="#042F2E" stroke="#10B981" strokeWidth={isPayoff ? 4 : 2} />
        {/* Domain Header */}
        <rect x="0" y="0" width="340" height="34" rx="8" fill="#065F46" />
        <text x="20" y="24" fill="#A7F3D0" fontSize="16" fontWeight="900" fontFamily="Montserrat">
          HTTPS://LABELSBANK.COM
        </text>
        {/* Active Portal Contents */}
        <rect x="20" y="55" width="300" height="45" rx="6" fill="#064E3B" />
        <text x="170" y="85" textAnchor="middle" fill="#34D399" fontSize="18" fontWeight="800" fontFamily="Montserrat">
          INSTANT $2 POSTAGE ENGINE
        </text>
        {/* Real-Time Counter */}
        <rect x="20" y="120" width="140" height="80" rx="6" fill="#022C22" stroke="#059669" strokeWidth="1.5" />
        <text x="90" y="150" textAnchor="middle" fill="#6EE7B7" fontSize="12" fontWeight="700" fontFamily="Montserrat">
          ORDERS / MIN
        </text>
        <text x="90" y="185" textAnchor="middle" fill="#F8FAFC" fontSize="28" fontWeight="900" fontFamily="Montserrat">
          {isPayoff ? '840' : '0'}
        </text>
        {/* Barcode Preview */}
        <rect x="180" y="120" width="140" height="80" rx="6" fill="#F8FAFC" />
        {[195, 210, 225, 245, 260, 280, 300].map((bx, i) => (
          <line key={i} x1={bx} y1="135" x2={bx} y2="185" stroke="#0F172A" strokeWidth={i % 2 === 0 ? 4 : 2} />
        ))}
      </g>

      {/* RIGHT WIDESCREEN MONITOR: High-Speed Barcode Generation Engine */}
      <g transform="translate(560, 960)">
        <rect x="0" y="0" width="340" height="240" rx="8" fill="#082F49" stroke="#0284C7" strokeWidth={isPayoff ? 4 : 2} />
        <rect x="0" y="0" width="340" height="34" rx="8" fill="#0369A1" />
        <text x="20" y="24" fill="#BAE6FD" fontSize="16" fontWeight="900" fontFamily="Montserrat">
          USPS API PAYLOAD GENERATOR
        </text>
        {/* Green Matrix Streaming Lines */}
        {[60, 90, 120, 150, 180, 210].map((ly, i) => (
          <text key={i} x="20" y={ly} fill="#38BDF8" fontSize="13" fontWeight="800" fontFamily="Montserrat">
            {`PAYLOAD_${i * 24} // 9205590164917382049281 [VALID]`}
          </text>
        ))}
      </g>

      {/* Desk Surface & Ergonomic Chair Silhouette */}
      <rect x="140" y="1280" width="800" height="80" fill="#18181B" stroke="#27272A" strokeWidth="3" />

      {/* Coder Silhouette from Behind, Bathing in Screen Glow */}
      <g transform={`translate(540, 1220)`}>
        {/* High-Back Executive Chair */}
        <path d="M -90 140 L -70 0 L 70 0 L 90 140 Z" fill="#0F172A" />
        <rect x="-80" y="-30" width="160" height="30" rx="8" fill="#1E293B" />
        {/* Coder Head & Shoulders with Glowing Rim Light */}
        <circle cx="0" cy="10" r="38" fill="#090D12" stroke={isPayoff ? '#34D399' : '#1E293B'} strokeWidth="3" />
        <path
          d="M -70 120 C -60 60, 60 60, 70 120 Z"
          fill="#090D12"
          stroke={isPayoff ? '#38BDF8' : '#1E293B'}
          strokeWidth="3.5"
        />
      </g>

      {/* PHASE 2 PAYOFF: Blazing Emerald/Cyan Volumetric Rays */}
      {isPayoff && (
        <g opacity={monitorGlow}>
          <polygon points="350,1080 730,1080 840,1400 240,1400" fill="url(#darkRoomLaunchAura)" opacity={0.35} />
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 08: USPS TWO DOLLAR LABEL TRANSIT (VEHICLE_IN_TRANSIT, Payoff: Frame 23)
// ============================================================================
export const UspsTwoDollarLabelTransit: React.FC<{ durationFrames?: number }> = ({ durationFrames = 95 }) => {

      
  const frame = useCurrentFrame();
  const isPayoff = frame >= 23;
  const truckBob = Math.sin(frame * 0.7) * 3;
  const roadDividePhase = (frame * 36) % 180;
  const labelFly = isPayoff ? interpolate(frame - 23, [0, 8, 20], [0, 1, 0.95], CLAMP) : 0;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene08VEHICLEINTRANSITSilhouette color="#0F172A" opacity={0.4} scale={1.0} x={80} y={900} />
      {/* Grumman LLV Body Paneling, Rivets & Road Surface Perspective Lines */}
      <g opacity="0.75">
        <path d="M 0 1480 L 1080 1480" stroke="#475569" strokeWidth="4" fill="none" />
        <path d="M 0 1520 L 1080 1520" stroke="#334155" strokeWidth="6" strokeDasharray="40 25" fill="none" />
        <path d="M 0 1560 L 1080 1560" stroke="#1E293B" strokeWidth="8" fill="none" />
        <path d="M 120 1100 L 480 1100" stroke="#94A3B8" strokeWidth="2" fill="none" />
        <path d="M 120 1140 L 480 1140" stroke="#64748B" strokeWidth="2" fill="none" />
        <path d="M 120 1220 L 480 1220" stroke="#334155" strokeWidth="2" fill="none" />
        <path d="M 180 1250 Q 240 1190 300 1250" stroke="#0F172A" strokeWidth="4" fill="none" />
        <path d="M 360 1250 Q 420 1190 480 1250" stroke="#0F172A" strokeWidth="4" fill="none" />
        <path d="M 520 1050 L 520 1350" stroke="#DC2626" strokeWidth="3" fill="none" />
        <path d="M 560 1050 L 560 1350" stroke="#1E3A8A" strokeWidth="3" fill="none" />
        <path d="M 600 1080 C 660 1040, 780 1040, 840 1080" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
        <path d="M 620 1120 C 680 1090, 760 1090, 820 1120" stroke="#D97706" strokeWidth="2" fill="none" />
        <path d="M 640 1160 C 700 1140, 740 1140, 800 1160" stroke="#B45309" strokeWidth="2" fill="none" />
        <path d="M 600 1220 L 840 1220" stroke="#475569" strokeWidth="2.5" fill="none" />
        <path d="M 220 1100 L 220 1180" stroke="#CBD5E1" strokeWidth="2" fill="none" />
        <path d="M 380 1100 L 380 1180" stroke="#CBD5E1" strokeWidth="2" fill="none" />
      </g>
      <FederalNavyAura cx={540} cy={1180} rx={460} ry={250} id="uspsTruckAura" />

      {/* Asphalt Highway Surface */}
      <rect x="80" y="1320" width="920" height="160" fill="#1E293B" stroke="#334155" strokeWidth="3" />
      {/* Dashed Road Divider Racing Left */}
      <g stroke="#F8FAFC" strokeWidth="6" strokeDasharray="60 50">
        <line x1={80 - roadDividePhase} y1="1400" x2={1080 - roadDividePhase} y2="1400" />
      </g>

      {/* Speeding White Grumman LLV USPS Mail Truck */}
      <g transform={`translate(${420}, ${1160 + truckBob})`}>
        {/* White Aluminum Truck Cab & Cargo Body */}
        <path
          d="M -260 80 
             L -260 -70 
             L 90 -70 
             L 170 10 
             L 210 10 
             L 210 80 
             Z"
          fill="#F8FAFC"
          stroke="#0F172A"
          strokeWidth="4"
        />

        {/* USPS Dark Sonic Blue Beltline */}
        <rect x="-260" y="20" width="470" height="24" fill="#1E3A8A" />
        {/* USPS Crimson Accent Stripe */}
        <rect x="-260" y="44" width="470" height="8" fill="#DC2626" />

        {/* Front Windshield & Side Windows */}
        <polygon points="90,-60 160,5 90,5" fill="#0284C7" stroke="#0F172A" strokeWidth="3" />
        <rect x="-30" y="-55" width="100" height="60" fill="#0284C7" stroke="#0F172A" strokeWidth="3" />

        {/* Front Headlight & Yellow Indicator */}
        <rect x="200" y="25" width="12" height="18" fill="#FBBF24" />
        <polygon points="212,25 360,-20 360,110 212,50" fill="#FEF08A" opacity={0.25} />

        {/* Wheels with Hub Spokes */}
        {[ -160, 130 ].map((wx, i) => (
          <g key={i} transform={`translate(${wx}, 80)`}>
            <circle cx="0" cy="0" r="44" fill="#0F172A" stroke="#334155" strokeWidth="4" />
            <circle cx="0" cy="0" r="22" fill="#CBD5E1" stroke="#0F172A" strokeWidth="2" />
            <line x1="-18" y1="0" x2="18" y2="0" stroke="#0F172A" strokeWidth="3" />
            <line x1="0" y1="-18" x2="0" y2="18" stroke="#0F172A" strokeWidth="3" />
          </g>
        ))}

        {/* Exhaust Puff Billowing Behind */}
        <ellipse cx="-280" cy="65" rx={18 + Math.sin(frame * 0.5) * 4} ry="10" fill="#94A3B8" opacity={0.5} />
      </g>

      {/* Freight Parcels on Curbside Staging */}
      <g transform="translate(140, 1190)">
        <rect x="0" y="0" width="140" height="130" fill="#B45309" stroke="#78350F" strokeWidth="3" />
        <line x1="0" y1="65" x2="140" y2="65" stroke="#78350F" strokeWidth="2" />
        <line x1="70" y1="0" x2="70" y2="130" stroke="#78350F" strokeWidth="2" />
      </g>

      {/* PHASE 2 PAYOFF: $2 Flat Rate Counterfeit Barcode Label Slams Down */}
      {isPayoff && (
        <g transform={`translate(210, 1250) scale(${labelFly})`}>
          <rect x="-90" y="-55" width="180" height="110" rx="8" fill="#F8FAFC" stroke="#DC2626" strokeWidth="4" />
          <rect x="-90" y="-55" width="180" height="28" fill="#DC2626" />
          <text x="0" y="-35" textAnchor="middle" fill="#F8FAFC" fontSize="16" fontWeight="900" fontFamily="Montserrat">
            PRIORITY MAIL FLAT RATE
          </text>
          <text x="0" y="10" textAnchor="middle" fill="#0F172A" fontSize="38" fontWeight="900" fontFamily="Montserrat">
            $2.00
          </text>
          {/* Micro Barcode */}
          {[ -70, -50, -35, -20, 0, 20, 40, 60, 70 ].map((bx, idx) => (
            <line key={idx} x1={bx} y1="20" x2={bx} y2="45" stroke="#0F172A" strokeWidth={idx % 2 === 0 ? 4 : 2} />
          ))}
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 09: SIXTEEN ACCOUNTS NETWORK MAP (VECTOR_MAP, Payoff: Frame 33)
// ============================================================================
export const SixteenAccountsNetworkMap: React.FC<{ durationFrames?: number }> = ({ durationFrames = 104 }) => {
  const frame = useCurrentFrame();
  const isPayoff = frame >= 33;
  const flowPhase = (frame * 5) % 36;
  const pulseScale = isPayoff ? 1 + Math.sin(frame * 0.3) * 0.08 : 1.0;
  const alertPulse = isPayoff ? interpolate(frame - 33, [0, 8, 20], [0.3, 1.0, 0.7], CLAMP) : 0;

  // 16 Structured Bank Nodes clustered by family and institution
  const accountClusters = [
    // Cluster 1: Brother Commercial Accounts (5 nodes)
    { id: 1, bank: 'HBL', role: 'BROTHER_01', iban: 'PK36 HABB 0012', x: 300, y: 1010 },
    { id: 2, bank: 'HBL', role: 'BROTHER_02', iban: 'PK36 HABB 0019', x: 220, y: 1090 },
    { id: 3, bank: 'MCB', role: 'BROTHER_03', iban: 'PK52 MUCB 0084', x: 210, y: 1180 },
    { id: 4, bank: 'UBL', role: 'BROTHER_04', iban: 'PK88 UNIL 0031', x: 250, y: 1270 },
    { id: 5, bank: 'ABL', role: 'BROTHER_05', iban: 'PK19 ABPA 0055', x: 340, y: 1330 },

    // Cluster 2: Wife & Sister Domestic Accounts (4 nodes)
    { id: 6, bank: 'MEZN', role: 'WIFE_DOM_01', iban: 'PK12 MEZN 0021', x: 740, y: 1010 },
    { id: 7, bank: 'MEZN', role: 'WIFE_DOM_02', iban: 'PK12 MEZN 0064', x: 840, y: 1080 },
    { id: 8, bank: 'BAFL', role: 'SISTER_01', iban: 'PK41 ALFH 0092', x: 860, y: 1180 },
    { id: 9, bank: 'BAFL', role: 'AUNT_ESCROW', iban: 'PK41 ALFH 0047', x: 810, y: 1270 },

    // Cluster 3: Faheem Primary Shell Accounts (7 nodes)
    { id: 10, bank: 'HBL', role: 'FAHEEM_01', iban: 'PK36 HABB 0101', x: 420, y: 960 },
    { id: 11, bank: 'HBL', role: 'FAHEEM_02', iban: 'PK36 HABB 0102', x: 540, y: 940 },
    { id: 12, bank: 'UBL', role: 'FAHEEM_03', iban: 'PK88 UNIL 0103', x: 650, y: 960 },
    { id: 13, bank: 'MCB', role: 'FAHEEM_04', iban: 'PK52 MUCB 0104', x: 440, y: 1380 },
    { id: 14, bank: 'MEZN', role: 'FAHEEM_05', iban: 'PK12 MEZN 0105', x: 540, y: 1400 },
    { id: 15, bank: 'ABL', role: 'FAHEEM_06', iban: 'PK19 ABPA 0106', x: 640, y: 1380 },
    { id: 16, bank: 'BAFL', role: 'FAHEEM_07', iban: 'PK41 ALFH 0107', x: 730, y: 1340 },
  ];

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene09VECTORMAPSilhouette color="#0F172A" opacity={0.35} scale={1.0} x={80} y={880} />
      <defs>
        <radialGradient id="hubCenterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.8} />
          <stop offset="45%" stopColor="#D97706" stopOpacity={0.35} />
          <stop offset="100%" stopColor="#451A03" stopOpacity={0} />
        </radialGradient>
      </defs>

      <FederalNavyAura cx={540} cy={1180} rx={480} ry={270} id="networkMapAura" />

      {/* Stylized Pakistan Contour Silhouette & Provincial Boundaries */}
      <g stroke="#1E3A8A" strokeWidth="2" fill="#0A0F1D" opacity={0.65}>
        <path
          d="M 220 1440 
             C 200 1380, 240 1280, 280 1220 
             C 340 1140, 390 1080, 480 1020 
             C 540 960, 680 920, 780 940 
             C 860 960, 910 1040, 890 1160 
             C 860 1280, 820 1380, 760 1440 
             Z"
        />
        {/* Indus River Baseline */}
        <path d="M 320 1440 Q 480 1240 680 1020" fill="none" stroke="#0284C7" strokeWidth="2.5" strokeDasharray="8 6" opacity={0.5} />
      </g>

      {/* Tactical Radar Concentric Range Rings & Degree Spoke Lines */}
      <g stroke="#334155" strokeWidth="1.2" opacity={0.4} fill="none">
        <circle cx="540" cy="1180" r="140" strokeDasharray="6 4" />
        <circle cx="540" cy="1180" r="260" strokeDasharray="10 8" />
        <circle cx="540" cy="1180" r="380" strokeDasharray="14 10" />
        <line x1="160" y1="1180" x2="920" y2="1180" />
        <line x1="540" y1="900" x2="540" y2="1460" />
      </g>

      {/* Cash Flow Data Conduits connecting Central Server to all 16 Nodes */}
      {accountClusters.map((node) => (
        <g key={`conduit-${node.id}`}>
          {/* Base Inactive Wire */}
          <path
            d={`M 540 1180 L ${node.x} ${node.y}`}
            stroke={isPayoff ? '#7F1D1D' : '#1E293B'}
            strokeWidth={isPayoff ? 3.5 : 2}
          />
          {/* Animated Flow Packets */}
          <path
            d={`M 540 1180 L ${node.x} ${node.y}`}
            stroke={isPayoff ? '#EF4444' : '#F59E0B'}
            strokeWidth={isPayoff ? 4 : 2.5}
            strokeDasharray={isPayoff ? '12 8' : '8 6'}
            strokeDashoffset={-flowPhase}
            opacity={isPayoff ? 0.95 : 0.75}
          />
        </g>
      ))}

      {/* 16 Satellite Account Cards with Pakistani Bank Badges */}
      {accountClusters.map((node) => {
        const isHbl = node.bank === 'HBL';
        const isMezn = node.bank === 'MEZN';
        const isUbl = node.bank === 'UBL';
        const badgeColor = isHbl ? '#059669' : isMezn ? '#D97706' : isUbl ? '#0284C7' : '#DC2626';

        return (
          <g key={`node-${node.id}`} transform={`translate(${node.x}, ${node.y}) scale(${pulseScale})`}>
            {/* Terminal Card Substrate */}
            <rect
              x="-48"
              y="-28"
              width="96"
              height="56"
              rx="6"
              fill={isPayoff ? '#450A0A' : '#0B1120'}
              stroke={isPayoff ? '#EF4444' : badgeColor}
              strokeWidth={isPayoff ? 2.5 : 1.8}
            />
            {/* Bank Header Bar */}
            <rect x="-48" y="-28" width="96" height="18" rx="4" fill={isPayoff ? '#991B1B' : badgeColor} />
            <text x="0" y="-15" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontWeight="900" fontFamily="Montserrat">
              {node.bank} • {node.role.split('_')[0]}
            </text>
            {/* Masked IBAN */}
            <text x="0" y="5" textAnchor="middle" fill="#CBD5E1" fontSize="9" fontWeight="800" fontFamily="Montserrat">
              {node.iban}
            </text>
            {/* Account Status Pill */}
            <rect
              x="-36"
              y="11"
              width="72"
              height="12"
              rx="3"
              fill={isPayoff ? '#EF4444' : '#1E293B'}
            />
            <text
              x="0"
              y="20"
              textAnchor="middle"
              fill={isPayoff ? '#FFFFFF' : '#38BDF8'}
              fontSize="8"
              fontWeight="900"
              fontFamily="Montserrat"
            >
              {isPayoff ? 'FROZEN' : 'ACTIVE_WIRE'}
            </text>
            {/* Pulsing Alert Reticle */}
            {isPayoff && (
              <circle r="34" fill="none" stroke="#EF4444" strokeWidth="2" opacity={alertPulse} strokeDasharray="4 3" />
            )}
          </g>
        );
      })}

      {/* Central Command Nexus: Faheem Akram / Khanewal Cyber Hub */}
      <g transform="translate(540, 1180)">
        {/* Atmospheric Radial Glow */}
        <circle cx="0" cy="0" r="90" fill="url(#hubCenterGlow)" />
        {/* Outer Server Gear Ring */}
        <circle cx="0" cy="0" r="54" fill="#18181B" stroke="#F59E0B" strokeWidth="5" />
        <circle cx="0" cy="0" r="46" fill="#090D12" stroke="#B45309" strokeWidth="2" strokeDasharray="6 4" />
        {/* Core Hub Badge */}
        <circle cx="0" cy="0" r="32" fill={isPayoff ? '#7F1D1D' : '#9A3412'} />
        <text x="0" y="-4" textAnchor="middle" fill="#FEF08A" fontSize="14" fontWeight="900" fontFamily="Montserrat">
          ORIGIN
        </text>
        <text x="0" y="14" textAnchor="middle" fill="#CBD5E1" fontSize="10" fontWeight="800" fontFamily="Montserrat">
          KHANEWAL
        </text>
        {/* Rotating Radar Beacon Tick */}
        <line
          x1="0"
          y1="0"
          x2={48 * Math.cos((frame * 0.1))}
          y2={48 * Math.sin((frame * 0.1))}
          stroke="#FDE047"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* PHASE 2 PAYOFF: System-Wide Red Alert Banner */}
      {isPayoff && (
        <g transform="translate(540, 905)" opacity={alertPulse}>
          <rect x="-190" y="-28" width="380" height="56" rx="8" fill="#7F1D1D" stroke="#EF4444" strokeWidth="3.5" />
          <text x="0" y="8" textAnchor="middle" fill="#FEF2F2" fontSize="20" fontWeight="900" fontFamily="Montserrat" letterSpacing="0.06em">
            16 BANK ACCOUNTS IDENTIFIED
          </text>
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 10: FAMILY SIGNATURE SHIELDS CARD (QUOTE_CARD, Payoff: Frame 33)
// ============================================================================
export const FamilySignatureShieldsCard: React.FC<{ durationFrames?: number }> = ({ durationFrames = 103 }) => {
  const frame = useCurrentFrame();
  const isPayoff = frame >= 33;
  const thumbprintScale = isPayoff ? interpolate(frame - 33, [0, 6, 12], [2.0, 0.9, 1.0], CLAMP) : 0;
  const penDrift = driftOffsetPx(frame, 2);

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <TerracottaAtmosphericAura cx={540} cy={1180} rx={440} ry={250} id="familySignatureAura" />

      {/* Cascading Bank Account Specimen Cards */}
      {[
        { x: 260, y: 920, rot: -4, title: 'ACCOUNT 1: BROTHER (5 ACCOUNTS)' },
        { x: 300, y: 1040, rot: 3, title: 'ACCOUNT 2: WIFE (2 ACCOUNTS)' },
        { x: 280, y: 1160, rot: -2, title: 'ACCOUNT 3: SISTER & AUNT' },
      ].map((card, i) => (
        <g key={i} transform={`translate(${card.x}, ${card.y}) rotate(${card.rot})`}>
          {/* Cardstock Substrate */}
          <rect x="0" y="0" width="500" height="150" rx="8" fill="#FDF8F0" stroke="#78350F" strokeWidth="3" />
          {/* Bank Header Bar */}
          <rect x="0" y="0" width="500" height="32" rx="8" fill="#1E3A8A" />
          <text x="20" y="22" fill="#F8FAFC" fontSize="14" fontWeight="800" fontFamily="Montserrat">
            HABIB BANK LIMITED • SPECIMEN SIGNATURE RECORD
          </text>
          {/* Form Fields */}
          <text x="20" y="65" fill="#451A03" fontSize="16" fontWeight="900" fontFamily="Montserrat">
            {card.title}
          </text>
          <line x1="20" y1="110" x2="260" y2="110" stroke="#94A3B8" strokeWidth="2" />
          <text x="20" y="130" fill="#64748B" fontSize="12" fontWeight="700" fontFamily="Montserrat">
            AUTHORIZED BIOMETRIC SIGNATURE
          </text>
          {/* Biometric Thumbprint Box */}
          <rect x="360" y="45" width="110" height="85" rx="6" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" strokeDasharray="6 4" />
        </g>
      ))}

      {/* Brass Fountain Pen Resting Diagonally */}
      <g transform={`translate(${680 + penDrift}, 1080) rotate(-42)`}>
        {/* Barrel */}
        <rect x="0" y="-12" width="220" height="24" rx="10" fill="#78350F" stroke="#D97706" strokeWidth="3" />
        <rect x="180" y="-14" width="30" height="28" fill="#F59E0B" />
        {/* Gold Nib */}
        <polygon points="220,-8 260,0 220,8" fill="#FBBF24" stroke="#92400E" strokeWidth="2" />
      </g>

      {/* PHASE 2 PAYOFF: Crimson Biometric Thumbprints Slam onto Cards */}
      {isPayoff && (
        <g>
          {[
            { cx: 680, cy: 1005, rot: -4 },
            { cx: 720, cy: 1125, rot: 3 },
            { cx: 700, cy: 1245, rot: -2 },
          ].map((tp, idx) => (
            <g key={idx} transform={`translate(${tp.cx}, ${tp.cy}) rotate(${tp.rot}) scale(${thumbprintScale})`}>
              <ellipse cx="0" cy="0" rx="38" ry="48" fill="none" stroke="#DC2626" strokeWidth="3.5" />
              <ellipse cx="0" cy="0" rx="28" ry="38" fill="none" stroke="#DC2626" strokeWidth="3" />
              <ellipse cx="0" cy="0" rx="18" ry="26" fill="none" stroke="#DC2626" strokeWidth="2.5" />
              <ellipse cx="0" cy="0" rx="8" ry="14" fill="#DC2626" />
            </g>
          ))}
          {/* Weathered Rubber Stamp Overlay */}
          <g transform="translate(540, 1370) scale(0.9)">
            <WeatheredMilitaryStamp
              text="FAMILY HUMAN SHIELDS"
              subText="16 ACCOUNTS IDENTIFIED"
              color="#DC2626"
              rotation={-3}
            />
          </g>
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 11: WIFE SISTER AUNT COURTYARD SILHOUETTE (LONE_LEADER, Payoff: Frame 33)
// ============================================================================
export const WifeSisterAuntCourtyardSilhouette: React.FC<{ durationFrames?: number }> = ({ durationFrames = 104 }) => {

      
  const frame = useCurrentFrame();
  const isPayoff = frame >= 33;
  const chainGlint = isPayoff ? interpolate(frame - 33, [0, 10, 20], [0, 1, 0.85], CLAMP) : 0;
  const breeze = Math.sin(frame * 0.15) * 3;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene11LONELEADERSilhouette color="#9A3412" opacity={0.4} scale={1.0} x={100} y={880} />
      {/* Traditional Punjabi Baked Brick Masonry Joints & Courtyard Architecture */}
      <g opacity="0.65">
        <path d="M 60 920 L 380 920" stroke="#78350F" strokeWidth="2" fill="none" />
        <path d="M 60 960 L 380 960" stroke="#78350F" strokeWidth="2" fill="none" />
        <path d="M 60 1000 L 380 1000" stroke="#78350F" strokeWidth="2" fill="none" />
        <path d="M 120 920 L 120 960" stroke="#78350F" strokeWidth="1.5" fill="none" />
        <path d="M 240 920 L 240 960" stroke="#78350F" strokeWidth="1.5" fill="none" />
        <path d="M 180 960 L 180 1000" stroke="#78350F" strokeWidth="1.5" fill="none" />
        <path d="M 300 960 L 300 1000" stroke="#78350F" strokeWidth="1.5" fill="none" />
        <path d="M 700 940 C 760 900, 880 900, 940 940" stroke="#B45309" strokeWidth="3" fill="none" />
        <path d="M 720 980 C 770 950, 870 950, 920 980" stroke="#92400E" strokeWidth="2" fill="none" />
      </g>
      <TerracottaAtmosphericAura cx={540} cy={1180} rx={440} ry={250} id="courtyardAura" />

      {/* Traditional Punjab Mughal Multi-Foil Archway */}
      <g stroke="#9A3412" strokeWidth="5" fill="#431407">
        <path
          d="M 180 1480 
             L 180 1060 
             C 180 960, 260 920, 340 950 
             C 420 900, 500 870, 540 850 
             C 580 870, 660 900, 740 950 
             C 820 920, 900 960, 900 1060 
             L 900 1480 
             Z"
        />
        {/* Intricate Inner Arch Inset */}
        <path
          d="M 230 1480 
             L 230 1100 
             C 230 1000, 310 970, 390 990 
             C 460 950, 520 920, 540 900 
             C 560 920, 620 950, 690 990 
             C 770 970, 850 1000, 850 1100 
             L 850 1480"
          fill="#1C1917"
          stroke="#EA580C"
          strokeWidth="3"
        />
      </g>

      {/* Courtyard Low Wooden Table */}
      <rect x="340" y="1320" width="400" height="120" rx="6" fill="#5A3E2D" stroke="#3D281D" strokeWidth="4" />
      <rect x="420" y="1300" width="240" height="24" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />

      {/* Three Female Silhouettes in Traditional Dupattas */}
      {/* 1. Wife (Left) */}
      <g transform={`translate(320, ${1190 + breeze})`}>
        <path d="M 0 130 C -20 60, 20 60, 0 130 Z" fill="#18181B" />
        <ellipse cx="0" cy="40" rx="32" ry="50" fill="#18181B" />
        <circle cx="5" cy="-20" r="22" fill="#090D12" />
        {/* Dupatta Drape */}
        <path d="M -15 -25 Q 25 -30 25 30 L 15 110 L -25 80 Z" fill="#7C2D12" />
      </g>

      {/* 2. Sister (Center) */}
      <g transform={`translate(540, ${1170 + breeze * 0.8})`}>
        <ellipse cx="0" cy="40" rx="36" ry="55" fill="#18181B" />
        <circle cx="0" cy="-24" r="24" fill="#090D12" />
        <path d="M -22 -30 Q 28 -30 25 40 L 20 120 L -28 90 Z" fill="#9A3412" />
      </g>

      {/* 3. Maternal Aunt (Right) */}
      <g transform={`translate(760, ${1190 + breeze})`}>
        <ellipse cx="0" cy="40" rx="34" ry="50" fill="#18181B" />
        <circle cx="-5" cy="-20" r="22" fill="#090D12" />
        <path d="M -25 -25 Q 15 -30 15 30 L 5 110 L -30 80 Z" fill="#7C2D12" />
      </g>

      {/* PHASE 2 PAYOFF: Shadowy Golden Wire-Transfer Chains Wrap Around */}
      {isPayoff && (
        <g opacity={chainGlint}>
          {/* Golden Chain Links */}
          <path
            d="M 230 1100 Q 540 1260 850 1100"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="8"
            strokeDasharray="16 10"
          />
          <path
            d="M 300 1320 Q 540 1380 780 1320"
            fill="none"
            stroke="#D97706"
            strokeWidth="6"
            strokeDasharray="14 8"
          />
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 12: USPS VAULT FRACTURE EXPLOSION (STRUCTURAL_FRACTURE, 19s Beat Drop Payoff: Frame 35)
// ============================================================================
export const UspsVaultFractureExplosion: React.FC<{ durationFrames?: number }> = ({ durationFrames = 105 }) => {

      
  const frame = useCurrentFrame();
  const isPayoff = frame >= 35;
  const blastScale = isPayoff ? interpolate(frame - 35, [0, 5, 20], [0.1, 1.25, 1.0], CLAMP) : 0;
  const shockwaveR = isPayoff ? interpolate(frame - 35, [0, 25], [40, 480], CLAMP) : 0;
  const shockwaveAlpha = isPayoff ? interpolate(frame - 35, [0, 22], [0.95, 0], CLAMP) : 0;

  // Cloud lobe paths generated via 6-layer kit helpers
  const outerCloud = createArcScallopedCloud(190, 11, [1.0, 1.25, 0.9, 1.3, 1.1, 0.85, 1.2, 1.0, 1.15, 0.95, 1.2], frame * 0.1);
  const midCloud = createArcScallopedCloud(140, 9, [1.1, 0.95, 1.2, 1.0, 1.3, 0.9, 1.15, 1.0, 1.2], frame * 0.15);
  const innerCloud = createArcScallopedCloud(90, 7, [1.0, 1.2, 0.9, 1.1, 1.3, 1.0, 1.15], frame * 0.2);
  const coreStar = create8PointedStarPath(110);

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene12STRUCTURALFRACTURESilhouette color="#7F1D1D" opacity={0.45} scale={1.0} x={80} y={880} />
      {/* Heavy Ballistic Steel Vault Stress Fractures & Detonation Shockwave Paths */}
      <g opacity="0.8">
        <path d="M 540 1180 L 420 980 L 360 880" stroke="#EF4444" strokeWidth="4" fill="none" />
        <path d="M 540 1180 L 680 960 L 740 860" stroke="#F87171" strokeWidth="4" fill="none" />
        <path d="M 540 1180 L 380 1280 L 260 1340" stroke="#DC2626" strokeWidth="3.5" fill="none" />
        <path d="M 540 1180 L 700 1300 L 820 1380" stroke="#B91C1C" strokeWidth="3.5" fill="none" />
        <path d="M 540 1180 L 540 850" stroke="#FEF08A" strokeWidth="3" fill="none" />
        <path d="M 480 1050 L 440 1080" stroke="#FCA5A5" strokeWidth="2" fill="none" />
        <path d="M 620 1040 L 660 1070" stroke="#FCA5A5" strokeWidth="2" fill="none" />
        <path d="M 460 1220 L 420 1250" stroke="#F87171" strokeWidth="2" fill="none" />
        <path d="M 640 1230 L 680 1260" stroke="#F87171" strokeWidth="2" fill="none" />
        <path d="M 320 1000 C 380 940, 480 920, 540 920" stroke="#991B1B" strokeWidth="2.5" fill="none" />
        <path d="M 760 1000 C 700 940, 600 920, 540 920" stroke="#991B1B" strokeWidth="2.5" fill="none" />
        <path d="M 300 1180 L 780 1180" stroke="#7F1D1D" strokeWidth="2" strokeDasharray="10 5" fill="none" />
        <path d="M 350 1100 Q 540 1050 730 1100" stroke="#FDE047" strokeWidth="2" fill="none" />
        <path d="M 350 1260 Q 540 1310 730 1260" stroke="#FDE047" strokeWidth="2" fill="none" />
        <path d="M 220 950 L 280 990 L 250 1040 Z" fill="#450A0A" stroke="#DC2626" strokeWidth="1.5" />
        <path d="M 860 950 L 800 990 L 830 1040 Z" fill="#450A0A" stroke="#DC2626" strokeWidth="1.5" />
        <path d="M 200 1300 L 260 1280 L 240 1340 Z" fill="#450A0A" stroke="#DC2626" strokeWidth="1.5" />
        <path d="M 880 1300 L 820 1280 L 840 1340 Z" fill="#450A0A" stroke="#DC2626" strokeWidth="1.5" />
        <path d="M 500 860 L 540 820 L 580 860 Z" fill="#FEF08A" />
        <path d="M 540 1180 C 480 1120, 480 1240, 540 1180 Z" fill="#FFFFFF" />
      </g>
      <FieryExplosionAura cx={540} cy={1180} rx={480} ry={270} id="vaultBlastAura" />

      {/* Neoclassical USPS Federal Treasury Vault Facade */}
      <g>
        {/* Classical Pediment & Entablature */}
        <polygon points="160,940 540,860 920,940" fill="#1E293B" stroke="#475569" strokeWidth="4" />
        <rect x="160" y="940" width="760" height="40" fill="#334155" stroke="#475569" strokeWidth="3" />
        {/* Fluted Granite Columns */}
        {[200, 340, 700, 840].map((colX, i) => (
          <rect key={i} x={colX} y="980" width="40" height="460" fill="#475569" stroke="#1E293B" strokeWidth="2" />
        ))}
        {/* Massive Circular Steel Vault Door in Center */}
        <g transform="translate(540, 1180)">
          <circle r="170" fill="#0F172A" stroke="#64748B" strokeWidth="8" />
          <circle r="140" fill="#1E293B" stroke="#94A3B8" strokeWidth="4" />
          {/* Radial Locking Bolts */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1={100 * Math.cos((angle * Math.PI) / 180)}
              y1={100 * Math.sin((angle * Math.PI) / 180)}
              x2={165 * Math.cos((angle * Math.PI) / 180)}
              y2={165 * Math.sin((angle * Math.PI) / 180)}
              stroke="#CBD5E1"
              strokeWidth="10"
              strokeLinecap="round"
            />
          ))}
          {/* Center Vault Wheel */}
          <circle r="40" fill="#334155" stroke="#F59E0B" strokeWidth="4" />
        </g>
      </g>

      {/* PHASE 2 PAYOFF: 19-SECOND BEAT DROP 6-LAYER ORGANIC EXPLOSION */}
      {isPayoff && (
        <g transform="translate(540, 1180)">
          {/* Layer 2: Dual Concentric Shockwave Rings */}
          <circle r={shockwaveR} fill="none" stroke="#F8FAFC" strokeWidth="6" opacity={shockwaveAlpha} />
          <circle r={shockwaveR * 0.7} fill="none" stroke="#FBBF24" strokeWidth="4" opacity={shockwaveAlpha} />

          {/* Layer 3: 14 Acute Energy Spikes */}
          <g transform={`scale(${blastScale})`}>
            {Array.from({ length: 14 }).map((_, i) => {
              const angle = (i / 14) * Math.PI * 2;
              const len = 220 + pseudoRandom(i * 17) * 90;
              return (
                <line
                  key={i}
                  x1="0"
                  y1="0"
                  x2={Math.cos(angle) * len}
                  y2={Math.sin(angle) * len}
                  stroke={i % 2 === 0 ? '#EF4444' : '#F59E0B'}
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              );
            })}
          </g>

          {/* Layer 4: Multi-Tiered Organic Body Geometry (Nested Arc-Scalloped Lobes) */}
          <g transform={`scale(${blastScale})`}>
            <path d={outerCloud} fill="#991B1B" stroke="#7F1D1D" strokeWidth="4" />
            <path d={midCloud} fill="#EA580C" stroke="#C2410C" strokeWidth="3" />
            <path d={innerCloud} fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
          </g>

          {/* Layer 5: High-Contrast Core Accent (White-Hot 8-Pointed Flash Star) */}
          <g transform={`scale(${blastScale})`}>
            <path d={coreStar} fill="#F8FAFC" opacity={0.95} />
          </g>

          {/* Layer 6: Orbiting Shrapnel / Cash / Barcode Shards */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const dist = 120 + blastScale * (120 + pseudoRandom(i * 31) * 80);
            return (
              <rect
                key={i}
                x={Math.cos(angle) * dist - 15}
                y={Math.sin(angle) * dist - 8}
                width="30"
                height="16"
                fill={i % 2 === 0 ? '#10B981' : '#F8FAFC'}
                stroke="#0F172A"
                strokeWidth="1.5"
                transform={`rotate(${i * 30 + frame * 4})`}
              />
            );
          })}
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 13: FIVE MILLION LABELS CONVEYOR TALLY (CROWD_TALLY, Payoff: Frame 33)
// ============================================================================
export const FiveMillionLabelsConveyorTally: React.FC<{ durationFrames?: number }> = ({ durationFrames = 104 }) => {

      
  const frame = useCurrentFrame();
  const isPayoff = frame >= 33;
  const beltPhase = (frame * 26) % 120;
  const counterVal = interpolate(frame, [0, 33], [0, 5.1], CLAMP);

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene13CROWDTALLYSilhouette color="#0F172A" opacity={0.35} scale={1.0} x={100} y={880} />
      {/* Industrial High-Speed Label Conveyor Belts & Spool Tension Arms */}
      <g opacity="0.7">
        <path d="M 120 1180 L 960 1180" stroke="#334155" strokeWidth="6" fill="none" />
        <path d="M 120 1240 L 960 1240" stroke="#1E293B" strokeWidth="8" fill="none" />
        <path d="M 140 1160 L 140 1260" stroke="#64748B" strokeWidth="3" fill="none" />
        <path d="M 280 1160 L 280 1260" stroke="#64748B" strokeWidth="3" fill="none" />
        <path d="M 420 1160 L 420 1260" stroke="#64748B" strokeWidth="3" fill="none" />
        <path d="M 560 1160 L 560 1260" stroke="#64748B" strokeWidth="3" fill="none" />
        <path d="M 700 1160 L 700 1260" stroke="#64748B" strokeWidth="3" fill="none" />
        <path d="M 840 1160 L 840 1260" stroke="#64748B" strokeWidth="3" fill="none" />
        <path d="M 160 1100 Q 240 1020 320 1100" stroke="#38BDF8" strokeWidth="2.5" fill="none" />
        <path d="M 760 1100 Q 840 1020 920 1100" stroke="#38BDF8" strokeWidth="2.5" fill="none" />
        <path d="M 200 950 L 880 950" stroke="#0F172A" strokeWidth="3" strokeDasharray="12 6" fill="none" />
        <path d="M 300 880 C 420 840, 660 840, 780 880" stroke="#F59E0B" strokeWidth="2" fill="none" />
      </g>
      <FederalNavyAura cx={540} cy={1180} rx={460} ry={250} id="conveyorTallyAura" />

      {/* Grid of 5,200 Buyer Nodes Matrix (Background Texture) */}
      <g opacity={0.35}>
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 14 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={180 + col * 55}
              cy={920 + row * 38}
              r="4"
              fill={(row + col + Math.floor(frame / 6)) % 4 === 0 ? '#38BDF8' : '#334155'}
            />
          ))
        )}
      </g>

      {/* High-Speed Postal Conveyor Belt Chassis */}
      <g transform="translate(140, 1260)">
        {/* Belt Base Deck */}
        <rect x="0" y="40" width="800" height="90" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="4" />
        {/* Rotating Belt Rollers */}
        {[60, 160, 260, 360, 460, 560, 660, 740].map((rx, i) => (
          <circle key={i} cx={rx} cy="85" r="28" fill="#1E293B" stroke="#475569" strokeWidth="3" />
        ))}
        {/* Moving Parcel Boxes */}
        {[
          { x: 100 - beltPhase, w: 90, h: 65 },
          { x: 260 - beltPhase, w: 110, h: 80 },
          { x: 440 - beltPhase, w: 95, h: 70 },
          { x: 610 - beltPhase, w: 105, h: 75 },
          { x: 780 - beltPhase, w: 100, h: 70 },
        ].map((box, i) => (
          <g key={i}>
            <rect x={box.x} y={40 - box.h} width={box.w} height={box.h} fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
            <rect x={box.x + 10} y={40 - box.h + 12} width={box.w - 20} height="20" fill="#F8FAFC" />
            <line x1={box.x + 15} y1={40 - box.h + 22} x2={box.x + box.w - 15} y2={40 - box.h + 22} stroke="#DC2626" strokeWidth="3" />
          </g>
        ))}
      </g>

      {/* Overhead High-Speed Optical Laser Scanner */}
      <g transform="translate(540, 1140)">
        <rect x="-60" y="-30" width="120" height="30" fill="#1E293B" stroke="#EF4444" strokeWidth="2.5" />
        {/* Red Laser Scanning Fan */}
        <polygon points="-50,0 50,0 120,130 -120,130" fill="#EF4444" opacity={0.25} />
      </g>

      {/* Massive Tally Board Display */}
      <g transform="translate(340, 930)">
        <rect x="0" y="0" width="400" height="150" rx="10" fill="#090D12" stroke="#F59E0B" strokeWidth="4" />
        <rect x="15" y="15" width="370" height="35" rx="6" fill="#1E293B" />
        <text x="200" y="40" textAnchor="middle" fill="#F59E0B" fontSize="16" fontWeight="900" fontFamily="Montserrat">
          5,200 SECRET BUYERS • U.S. TOTAL
        </text>
        <text x="200" y="115" textAnchor="middle" fill="#F8FAFC" fontSize="56" fontWeight="900" fontFamily="Montserrat">
          {counterVal.toFixed(1)}M LABELS
        </text>
      </g>
    </svg>
  );
};

// ============================================================================
// SCENE 14: ATLANTIC CARGO JET WIRE TRANSIT (VEHICLE_IN_TRANSIT, Payoff: Frame 37)
// ============================================================================
export const AtlanticCargoJetWireTransit: React.FC<{ durationFrames?: number }> = ({ durationFrames = 106 }) => {

      
  const frame = useCurrentFrame();
  const isPayoff = frame >= 37;
  const bankDeg = interpolate(frame, [0, durationFrames], [-8, -14], CLAMP);
  const jetBob = Math.sin(frame * 0.12) * 5;
  const fanSpin = (frame * 18) % 360;
  const currencyFlow = (frame * 14) % 180;
  const wirePulse = isPayoff ? interpolate(frame - 37, [0, 8, 20], [0.3, 1.0, 0.85], CLAMP) : 0.2;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene14VEHICLEINTRANSITSilhouette color="#9A3412" opacity={0.4} scale={1.0} x={80} y={880} />
      {/* Transatlantic Flight Trajectory Telemetry & Commercial Freighter Contours */}
      <g opacity="0.75">
        <path d="M 100 1350 C 350 1200, 650 1100, 980 1020" stroke="#F59E0B" strokeWidth="3.5" strokeDasharray="16 8" fill="none" />
        <path d="M 120 1370 C 370 1220, 670 1120, 1000 1040" stroke="#D97706" strokeWidth="2" fill="none" />
        <path d="M 350 1160 L 450 1160" stroke="#38BDF8" strokeWidth="2" fill="none" />
        <path d="M 550 1110 L 650 1110" stroke="#38BDF8" strokeWidth="2" fill="none" />
        <path d="M 750 1060 L 850 1060" stroke="#38BDF8" strokeWidth="2" fill="none" />
        <path d="M 200 1250 Q 250 1210 300 1250" stroke="#F8FAFC" strokeWidth="2.5" fill="none" />
        <path d="M 700 1000 Q 750 960 800 1000" stroke="#F8FAFC" strokeWidth="2.5" fill="none" />
        <path d="M 400 1300 L 700 1080" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="6 3" fill="none" />
      </g>
      <defs>
        <linearGradient id="sunsetSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0B132B" />
          <stop offset="45%" stopColor="#1C2541" />
          <stop offset="75%" stopColor="#4A180C" />
          <stop offset="100%" stopColor="#9A3412" />
        </linearGradient>
        <linearGradient id="contrailGrad" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#F8FAFC" stopOpacity={0.7} />
          <stop offset="70%" stopColor="#94A3B8" stopOpacity={0.25} />
          <stop offset="100%" stopColor="#64748B" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="engineGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
        </linearGradient>
      </defs>

      <TerracottaAtmosphericAura cx={540} cy={1180} rx={480} ry={270} id="cargoJetAura" />

      {/* Atlantic Atmospheric Cloud Banks & Sunset Horizon */}
      <g opacity={0.35}>
        <path d="M 0 1280 Q 280 1220 540 1260 T 1080 1240 L 1080 1490 L 0 1490 Z" fill="#1E293B" />
        <path d="M 0 1340 Q 320 1300 620 1350 T 1080 1320 L 1080 1490 L 0 1490 Z" fill="#0F172A" />
      </g>

      {/* Atlantic Oceanic Swell Vectors in Lower Third */}
      <g stroke="#0284C7" strokeWidth="2.5" opacity={0.65} fill="none">
        {[1380, 1420, 1460].map((y, i) => (
          <path
            key={i}
            d={`M 60 ${y} Q 320 ${y - 18} 540 ${y + 6} T 1020 ${y - 12}`}
            strokeDasharray={i % 2 === 0 ? '24 12' : '18 8'}
          />
        ))}
      </g>

      {/* High-Altitude White Contrail Streams */}
      <g transform={`translate(540, ${1100 + jetBob}) rotate(${bankDeg})`}>
        <path d="M -180 -18 L -680 -25" stroke="url(#contrailGrad)" strokeWidth="12" strokeLinecap="round" />
        <path d="M -180 8 L -680 15" stroke="url(#contrailGrad)" strokeWidth="12" strokeLinecap="round" />
        <path d="M -160 -45 L -640 -60" stroke="url(#contrailGrad)" strokeWidth="8" strokeLinecap="round" />
        <path d="M -160 38 L -640 50" stroke="url(#contrailGrad)" strokeWidth="8" strokeLinecap="round" />
      </g>

      {/* Detailed Boeing 747-8F Commercial Cargo Freighter Silhouette */}
      <g transform={`translate(540, ${1100 + jetBob}) rotate(${bankDeg})`}>
        {/* Main Fuselage Body with Iconic High Upper-Deck Hump */}
        <path
          d="M 280 6
             C 275 -12, 230 -28, 170 -35
             C 120 -40, 70 -42, 10 -40
             C -90 -38, -210 -25, -280 -6
             L -310 -4
             L -310 8
             C -240 18, -120 22, 10 22
             C 130 22, 220 18, 280 6 Z"
          fill="#0B1120"
          stroke="#38BDF8"
          strokeWidth="3.5"
        />

        {/* Cockpit Flight Deck Windows */}
        <path d="M 225 -22 L 252 -18 L 246 -12 L 222 -16 Z" fill="#38BDF8" />
        <polygon points="214,-22 222,-22 219,-16 211,-16" fill="#38BDF8" />

        {/* Swept High-Aspect Wings with Flap Track Fairings & Raked Wingtips */}
        {/* Port Main Wing */}
        <path
          d="M 35 5
             L -85 145
             L -65 148
             L 95 18
             Z"
          fill="#0F172A"
          stroke="#38BDF8"
          strokeWidth="2.5"
        />
        {/* Starboard Wing (Upper Bank Perspective) */}
        <path
          d="M 65 -22
             L -45 -135
             L -30 -138
             L 115 -18
             Z"
          fill="#0F172A"
          stroke="#38BDF8"
          strokeWidth="2.5"
        />
        {/* Empennage: Vertical Stabilizer Tail Fin */}
        <path
          d="M -235 -6
             L -290 -85
             L -268 -85
             L -195 -12
             Z"
          fill="#0B1120"
          stroke="#38BDF8"
          strokeWidth="2.5"
        />
        {/* Horizontal Tailplanes */}
        <path d="M -260 4 L -305 32 L -295 34 L -245 8 Z" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />

        {/* Four General Electric GEnx Turbofan Engine Nacelles with Spinning Disks */}
        {[
          { x: 30, y: 55, s: 1.1 },
          { x: -20, y: 95, s: 0.95 },
          { x: 50, y: -50, s: 1.05 },
          { x: 0, y: -90, s: 0.9 },
        ].map((eng, idx) => (
          <g key={idx} transform={`translate(${eng.x}, ${eng.y}) scale(${eng.s})`}>
            {/* Pylon Strut to Wing */}
            <path d="M 0 0 L -8 -12" stroke="#334155" strokeWidth="3" />
            {/* Engine Cowling Nacelle */}
            <path d="M -32 -12 L 32 -12 Q 36 -12 36 -4 L 36 4 Q 36 12 32 12 L -32 12 Q -36 12 -36 4 L -36 -4 Q -36 -12 -32 -12 Z" fill="#18181B" stroke="#64748B" strokeWidth="2" />
            {/* Intake Cowl Lip */}
            <path d="M 28 -11 C 30 -11, 32 -5, 32 0 C 32 5, 30 11, 28 11 C 26 11, 24 5, 24 0 C 24 -5, 26 -11, 28 -11 Z" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
            {/* Spinning Fan Disk Spokes */}
            <g transform={`translate(28, 0) rotate(${fanSpin})`}>
              <path d="M -3 -9 L 3 9 M -9 -3 L 9 3" stroke="#E2E8F0" strokeWidth="1.5" />
            </g>
            {/* Amber Combustion Exhaust Core */}
            <path d="M -32 -8 L -54 -4 L -54 4 L -32 8 Z" fill="url(#engineGlowGrad)" />
          </g>
        ))}

        {/* Wingtip Position Strobe Light */}
        <circle cx="-82" cy="147" r="4" fill={Math.sin(frame * 0.5) > 0 ? '#EF4444' : '#7F1D1D'} />
        <circle cx="-42" cy="-137" r="4" fill={Math.sin(frame * 0.5) > 0 ? '#22C55E' : '#14532D'} />
      </g>

      {/* PHASE 2 PAYOFF: Transatlantic Golden SWIFT Wire Transfer Data Streams */}
      {isPayoff && (
        <g opacity={wirePulse}>
          {/* Arcing Transatlantic Data Highway */}
          <path
            d="M 920 1100 C 740 1320, 460 1360, 140 1360"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="5"
            strokeDasharray="20 12"
            strokeDashoffset={-currencyFlow}
          />
          <path
            d="M 940 1130 C 760 1350, 480 1390, 160 1390"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="3.5"
            strokeDasharray="16 10"
            strokeDashoffset={-currencyFlow * 1.2}
          />

          {/* Cascading Golden Remittance Dollar Nodes */}
          {[
            { cx: 780, cy: 1220, label: '$2.5M' },
            { cx: 580, cy: 1310, label: '$8.2M' },
            { cx: 360, cy: 1360, label: '$14.6M' },
          ].map((pt, i) => (
            <g key={i} transform={`translate(${pt.cx}, ${pt.cy})`}>
              <circle cx="0" cy="0" r="24" fill="#14532D" stroke="#22C55E" strokeWidth="3" />
              <text x="0" y="6" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="900" fontFamily="Montserrat">
                {pt.label}
              </text>
            </g>
          ))}

          {/* Telemetry Route Banner */}
          <g transform="translate(540, 930)">
            <rect x="-180" y="-22" width="360" height="44" rx="6" fill="#78350F" stroke="#F59E0B" strokeWidth="2.5" />
            <text x="0" y="6" textAnchor="middle" fill="#FEF08A" fontSize="16" fontWeight="900" fontFamily="Montserrat">
              NEW YORK ➔ LAHORE • $126M WIRE
            </text>
          </g>
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 15: GOLDEN VILLA PARANOIA LEADER (LONE_LEADER, Payoff: Frame 35)
// ============================================================================
export const GoldenVillaParanoiaLeader: React.FC<{ durationFrames?: number }> = ({ durationFrames = 103 }) => {
  const frame = useCurrentFrame();
  const isPayoff = frame >= 35;
  const laserAngle = Math.sin(frame * 0.14) * 10;
  const targetLockPulse = isPayoff ? interpolate(frame - 35, [0, 8, 20], [0.3, 1.0, 0.85], CLAMP) : 0;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene15LONELEADERSilhouette color="#78350F" opacity={0.4} scale={1.0} x={100} y={880} />
      <defs>
        <linearGradient id="blindShadowGrad" x1="0%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="#090D12" stopOpacity={0.85} />
          <stop offset="50%" stopColor="#1E1714" stopOpacity={0.65} />
          <stop offset="100%" stopColor="#090D12" stopOpacity={0.9} />
        </linearGradient>
        <linearGradient id="goldBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="35%" stopColor="#FEF08A" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
      </defs>

      <TerracottaAtmosphericAura cx={540} cy={1180} rx={460} ry={260} id="goldenVillaAura" />

      {/* Luxury Villa Polished Italian Marble Floor with Reflective Perspective Lines */}
      <g stroke="#3D291F" strokeWidth="2" opacity={0.65}>
        <rect x="80" y="1320" width="920" height="160" fill="#1C140E" />
        {[1350, 1385, 1425, 1465].map((y) => (
          <path key={y} d={`M 80 ${y} L 1000 ${y}`} />
        ))}
        {[-300, -150, 0, 150, 300, 450].map((dx) => (
          <path key={dx} d={`M ${540 + dx * 0.4} 1320 L ${540 + dx * 1.2} 1480`} />
        ))}
      </g>

      {/* Massive Floor-to-Ceiling Mahogany Venetian Blinds casting Long Diagonal Shadows */}
      <g stroke="#18110B" strokeWidth="16" opacity={0.78}>
        {[890, 930, 970, 1010, 1050, 1090, 1130, 1170, 1210, 1250, 1290].map((y, i) => (
          <path key={i} d={`M 100 ${y} L 980 ${y}`} />
        ))}
      </g>

      {/* Illicit Wealth Display: Credenza with Bundled 5,000 PKR Notes & 1KG Gold Bullion */}
      <g transform="translate(180, 1220)">
        {/* Minimalist Modern Walnut Credenza */}
        <rect x="0" y="70" width="380" height="85" rx="4" fill="#2E1B10" stroke="#4A2616" strokeWidth="3" />
        <path d="M 0 70 L 380 70" stroke="#78350F" strokeWidth="3" />

        {/* Stack 1: Bundled Stacks of Pakistani 5,000 Rupee Currency Notes */}
        {[
          { x: 30, y: 40, w: 90, h: 28 },
          { x: 30, y: 12, w: 90, h: 28 },
          { x: 30, y: -16, w: 90, h: 28 },
          { x: 130, y: 40, w: 90, h: 28 },
          { x: 130, y: 12, w: 90, h: 28 },
        ].map((bundle, idx) => (
          <g key={`cur-${idx}`} transform={`translate(${bundle.x}, ${bundle.y})`}>
            <rect x="0" y="0" width={bundle.w} height={bundle.h} rx="3" fill="#0F766E" stroke="#042F2E" strokeWidth="2" />
            <rect x="0" y="5" width={bundle.w} height={bundle.h - 10} fill="#14B8A6" opacity={0.6} />
            {/* White Verification Paper Band */}
            <rect x="35" y="0" width="20" height={bundle.h} fill="#F8FAFC" stroke="#64748B" strokeWidth="1" />
            <text x="45" y="18" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="900" fontFamily="Montserrat">
              5K
            </text>
          </g>
        ))}

        {/* Stack 2: Detailed Pyramid of 1KG .999 Fine Gold Bullion Bars */}
        <g transform="translate(245, 0)">
          {/* Base Tier: 3 Bars */}
          {[0, 42, 84].map((bx, i) => (
            <g key={`gb-1-${i}`} transform={`translate(${bx}, 42)`}>
              <path d="M 0 26 L 40 26 L 36 0 L 4 0 Z" fill="url(#goldBarGrad)" stroke="#78350F" strokeWidth="1.5" />
              <text x="20" y="16" textAnchor="middle" fill="#451A03" fontSize="8" fontWeight="900" fontFamily="Montserrat">
                1 KG
              </text>
            </g>
          ))}
          {/* Mid Tier: 2 Bars */}
          {[21, 63].map((bx, i) => (
            <g key={`gb-2-${i}`} transform={`translate(${bx}, 16)`}>
              <path d="M 0 26 L 40 26 L 36 0 L 4 0 Z" fill="url(#goldBarGrad)" stroke="#78350F" strokeWidth="1.5" />
              <text x="20" y="16" textAnchor="middle" fill="#451A03" fontSize="8" fontWeight="900" fontFamily="Montserrat">
                .999
              </text>
            </g>
          ))}
          {/* Top Tier: 1 Bar */}
          <g transform="translate(42, -10)">
            <path d="M 0 26 L 40 26 L 36 0 L 4 0 Z" fill="url(#goldBarGrad)" stroke="#78350F" strokeWidth="1.5" />
            <text x="20" y="16" textAnchor="middle" fill="#451A03" fontSize="8" fontWeight="900" fontFamily="Montserrat">
                GOLD
            </text>
          </g>
        </g>
      </g>

      {/* Human Silhouette: Faheem Akram Standing Tensely by Window */}
      <g transform="translate(680, 1140)">
        {/* Lower Torso and Legs standing tensely */}
        <path
          d="M -30 160
             L -35 80
             L -40 20
             L 30 20
             L 25 80
             L 20 160
             Z"
          fill="#090D12"
          stroke="#1E1714"
          strokeWidth="3"
        />

        {/* Upper Torso: Silk Kurta Fabric Drape */}
        <path
          d="M -40 20
             L -34 -40
             C -28 -60, -10 -68, 12 -65
             C 32 -62, 38 -45, 34 20
             Z"
          fill="#090D12"
          stroke="#1E1714"
          strokeWidth="3"
        />

        {/* Head in Tense 3/4 Profile peering through Blinds */}
        <path
          d="M 6 -70
             C -2 -84, 8 -104, 24 -104
             C 38 -104, 44 -90, 42 -80
             C 48 -78, 50 -72, 48 -66
             C 50 -64, 52 -58, 49 -54
             C 44 -46, 38 -44, 28 -44
             C 18 -44, 14 -52, 12 -62 Z"
          fill="#090D12"
        />
        {/* Neat Jawline Beard Contour */}
        <path d="M 42 -66 C 50 -60, 48 -50, 42 -44 C 32 -40, 22 -44, 18 -50 Z" fill="#040608" />

        {/* Left Arm Raised Parting the Blind Slats with Articulated Hand */}
        <path
          d="M -25 -40
             C -35 -20, -50 0, -65 10
             L -80 0
             L -55 -25
             L -20 -50 Z"
          fill="#090D12"
          stroke="#1E1714"
          strokeWidth="2.5"
        />
        {/* Raised Forearm Reaching up to Window Blinds */}
        <path
          d="M -20 -45
             L -40 -90
             L -58 -105
             L -68 -95
             L -42 -75 Z"
          fill="#090D12"
        />
        {/* Articulated Hand & Fingers Separating Two Blind Slats */}
        <g transform="translate(-62, -105)">
          <line x1="0" y1="0" x2="-18" y2="-12" stroke="#F8FAFC" strokeWidth="3" strokeLinecap="round" />
          <line x1="2" y1="4" x2="-16" y2="-6" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="4" y1="8" x2="-14" y2="0" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Slanted Shadow Striping Across Faheem's Torso */}
        <line x1="-38" y1="-20" x2="32" y2="-20" stroke="#000000" strokeWidth="12" opacity={0.6} />
        <line x1="-36" y1="20" x2="28" y2="20" stroke="#000000" strokeWidth="12" opacity={0.6} />
        <line x1="-34" y1="60" x2="26" y2="60" stroke="#000000" strokeWidth="12" opacity={0.6} />
      </g>

      {/* PHASE 2 PAYOFF: Red Federal Surveillance Laser Beams Crossing Compound */}
      {isPayoff && (
        <g transform={`rotate(${laserAngle}, 540, 1180)`} opacity={targetLockPulse}>
          {/* Multiple High-Intensity Red Sniper / Tracking Beams */}
          <line x1="80" y1="940" x2="1000" y2="1280" stroke="#EF4444" strokeWidth="4.5" strokeDasharray="16 8" />
          <line x1="100" y1="1260" x2="980" y2="1040" stroke="#EF4444" strokeWidth="4.5" strokeDasharray="16 8" />
          <line x1="120" y1="1100" x2="960" y2="1190" stroke="#EF4444" strokeWidth="3" />

          {/* Primary Target Lock Reticle Centered on Faheem */}
          <g transform="translate(680, 1120)">
            <circle cx="0" cy="0" r="54" fill="none" stroke="#EF4444" strokeWidth="3.5" strokeDasharray="12 8" />
            <circle cx="0" cy="0" r="28" fill="none" stroke="#EF4444" strokeWidth="2" />
            <line x1="-65" y1="0" x2="65" y2="0" stroke="#EF4444" strokeWidth="3" />
            <line x1="0" y1="-65" x2="0" y2="65" stroke="#EF4444" strokeWidth="3" />
            <circle cx="0" cy="0" r="4" fill="#F8FAFC" />
          </g>

          {/* Secondary Target Lock Reticle Centered on Gold Bullion Credenza */}
          <g transform="translate(420, 1260)">
            <circle cx="0" cy="0" r="38" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="8 6" />
            <line x1="-48" y1="0" x2="48" y2="0" stroke="#EF4444" strokeWidth="2" />
            <line x1="0" y1="-48" x2="0" y2="48" stroke="#EF4444" strokeWidth="2" />
          </g>
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 16: FLORIDA GRAND JURY BOUNTY FRACTURE (STRUCTURAL_FRACTURE, Payoff: Frame 37)
// ============================================================================
export const FloridaGrandJuryBountyFracture: React.FC<{ durationFrames?: number }> = ({ durationFrames = 105 }) => {
  const frame = useCurrentFrame();
  const isPayoff = frame >= 37;
  const gavelImpact = isPayoff ? interpolate(frame - 37, [0, 4, 12], [0, 1, 0.2], CLAMP) : 0;
  const stampSlam = isPayoff ? interpolate(frame - 37, [0, 6, 14], [2.2, 0.95, 1.0], CLAMP) : 0;
  const blastScale = isPayoff ? interpolate(frame - 37, [0, 8, 22], [0.1, 1.25, 1.0], CLAMP) : 0;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene16STRUCTURALFRACTURESilhouette color="#7F1D1D" opacity={0.45} scale={1.0} x={80} y={880} />
      <FieryExplosionAura cx={540} cy={1180} rx={480} ry={270} id="grandJuryBountyAura" />

      {/* Classical Neoclassical Federal Courthouse Architecture */}
      <g transform="translate(0, 0)">
        {/* Upper Classical Pediment Architrave with Dentil Moldings */}
        <polygon points="120,930 540,865 960,930" fill="#0F172A" stroke="#334155" strokeWidth="4" />
        <rect x="100" y="930" width="880" height="30" fill="#1E293B" stroke="#334155" strokeWidth="3" />
        {/* Dentil Blocks Along Frieze */}
        {Array.from({ length: 22 }).map((_, i) => (
          <path key={i} d={`M ${120 + i * 38} 940 h 22 v 12 h -22 Z`} fill="#334155" />
        ))}

        {/* Fluted Limestone Ionic Columns (Left & Right Flanks) */}
        {/* Left Column Pair */}
        <g transform="translate(140, 960)">
          <rect x="0" y="0" width="85" height="480" fill="#0F172A" stroke="#334155" strokeWidth="3" />
          {[16, 32, 48, 64].map((cx) => (
            <path key={cx} d={`M ${cx} 20 L ${cx} 460`} stroke="#1E293B" strokeWidth="3" />
          ))}
          <rect x="-10" y="0" width="105" height="22" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
          <rect x="-10" y="460" width="105" height="26" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
        </g>
        {/* Right Column Pair */}
        <g transform="translate(855, 960)">
          <rect x="0" y="0" width="85" height="480" fill="#0F172A" stroke="#334155" strokeWidth="3" />
          {[16, 32, 48, 64].map((cx) => (
            <path key={cx} d={`M ${cx} 20 L ${cx} 460`} stroke="#1E293B" strokeWidth="3" />
          ))}
          <rect x="-10" y="0" width="105" height="22" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
          <rect x="-10" y="460" width="105" height="26" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
        </g>
      </g>

      {/* Official U.S. Federal Court / USPIS Grand Jury Great Seal Crest */}
      <g transform="translate(540, 1150)">
        {/* Heavy Bronze Shield */}
        <path
          d="M 0 -170
             C 150 -170, 205 -110, 205 20
             C 205 130, 90 205, 0 255
             C -90 205, -205 130, -205 20
             C -205 -110, -150 -170, 0 -170 Z"
          fill="#070C16"
          stroke="#F59E0B"
          strokeWidth="6"
        />
        {/* Inner Border Ring */}
        <path
          d="M 0 -155
             C 135 -155, 185 -100, 185 20
             C 185 118, 80 188, 0 236
             C -80 188, -185 118, -185 20
             C -185 -100, -135 -155, 0 -155 Z"
          fill="none"
          stroke="#B45309"
          strokeWidth="2"
          strokeDasharray="6 4"
        />

        {/* Heraldic Bald Eagle Silhouette with Outstretched Wings */}
        <path
          d="M 0 -120
             L -35 -75 L -95 -85 L -75 -40 L -140 -25 L -105 15 L -130 50 L -80 45 L -70 85 L -35 70 L 0 110
             L 35 70 L 70 85 L 80 45 L 130 50 L 105 15 L 140 -25 L 75 -40 L 95 -85 L 35 -75 Z"
          fill="#F8FAFC"
        />
        {/* Central Federal Stars & Stripes Escutcheon Shield */}
        <polygon points="-30,-20 30,-20 25,50 0,70 -25,50" fill="#1E3A8A" stroke="#DC2626" strokeWidth="2.5" />
        <rect x="-30" y="-20" width="60" height="22" fill="#0284C7" />
        {/* 13 Federal Stars Arc */}
        {Array.from({ length: 7 }).map((_, i) => {
          const angle = -140 + i * 46;
          const rad = (angle * Math.PI) / 180;
          return <circle key={i} cx={Math.cos(rad) * 155} cy={Math.sin(rad) * 155} r="4" fill="#FEF08A" />;
        })}
      </g>

      {/* Massive Solid Walnut Judicial Gavel Slams Down on Sounding Block */}
      <g transform={`translate(540, ${1020 + (isPayoff ? 100 : 0)})`}>
        {/* Sounding Block Base Plinth */}
        <ellipse cx="0" cy="115" rx="90" ry="24" fill="#2E1B10" stroke="#78350F" strokeWidth="4" />
        <ellipse cx="0" cy="110" rx="80" ry="20" fill="#451A03" stroke="#F59E0B" strokeWidth="2" />

        {/* Heavy Turned Judicial Gavel Head with Polished Brass Accent Bands */}
        <g transform={`rotate(${isPayoff ? 0 : -35})`}>
          {/* Mallet Barrel */}
          <rect x="-70" y="-35" width="140" height="70" rx="10" fill="#3D2012" stroke="#78350F" strokeWidth="4" />
          <rect x="-55" y="-35" width="110" height="70" fill="#4A2616" />
          {/* Polished Brass Binding Rings */}
          <rect x="-50" y="-35" width="12" height="70" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
          <rect x="38" y="-35" width="12" height="70" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
          {/* Turned Rosewood Handle */}
          <line x1="0" y1="-35" x2="0" y2="-170" stroke="#2E1B10" strokeWidth="18" strokeLinecap="round" />
          <line x1="0" y1="-35" x2="0" y2="-170" stroke="#5A2F1B" strokeWidth="12" strokeLinecap="round" />
          <rect x="-12" y="-180" width="24" height="20" rx="4" fill="#D97706" />
        </g>
      </g>

      {/* PHASE 2 PAYOFF: 6-Layer Shockwave Detonation & $100,000 BOUNTY Stamp */}
      {isPayoff && (
        <g>
          {/* Layer 2: Supersonic Ionization Mach Ring */}
          <circle cx="540" cy="1150" r={160 * blastScale} fill="none" stroke="#FBBF24" strokeWidth="5" opacity={gavelImpact} />

          {/* Layer 3: Directional Structural Fracture Spikes Cracking Columns */}
          <path
            d="M 540 1020 L 480 1110 L 520 1190 L 460 1280 L 500 1390"
            fill="none"
            stroke="#EF4444"
            strokeWidth="6"
          />
          <path
            d="M 540 1020 L 610 1120 L 570 1210 L 630 1310 L 580 1410"
            fill="none"
            stroke="#EF4444"
            strokeWidth="5"
          />

          {/* Layer 4: Multi-Nested Arc-Scalloped Shockwave Cloud */}
          <g transform={`translate(540, 1140) scale(${blastScale})`}>
            <path
              d={createArcScallopedCloud(170, 10, [1.0, 1.25, 0.9, 1.3, 1.1, 0.85, 1.2, 1.05, 1.3, 0.95], frame * 0.2)}
              fill="#DC2626"
              opacity={0.75}
            />
          </g>

          {/* Layer 5: High-Contrast 8-Pointed Core Flash Star */}
          <g transform={`translate(540, 1140) scale(${blastScale * 0.9})`}>
            <path d={create8PointedStarPath(120)} fill="#FEF08A" opacity={0.9} />
          </g>

          {/* Layer 6: Orbiting Limestone Masonry Shrapnel */}
          {Array.from({ length: 12 }).map((_, i) => {
            const rad = (i / 12) * Math.PI * 2;
            const dist = blastScale * (100 + pseudoRandom(i * 13) * 120);
            return (
              <polygon
                key={i}
                points="-10,-12 14,0 -6,14"
                fill="#CBD5E1"
                stroke="#475569"
                strokeWidth="2"
                transform={`translate(${540 + Math.cos(rad) * dist}, ${1150 + Math.sin(rad) * dist}) rotate(${i * 45})`}
              />
            );
          })}

          {/* Official Distressed $100,000 USPIS BOUNTY Rubber Stamp */}
          <g transform={`translate(540, 1220) scale(${stampSlam})`}>
            <WeatheredMilitaryStamp
              text="$100,000 BOUNTY"
              subText="WANTED BY U.S. POSTAL INSPECTION SERVICE"
              color="#DC2626"
              rotation={-7}
              slamProgress={stampSlam}
            />
          </g>
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 17: MIAMI TO LAHORE RADAR TRACE MAP (VECTOR_MAP, Payoff: Frame 35)
// ============================================================================
export const MiamiToLahoreRadarTraceMap: React.FC<{ durationFrames?: number }> = ({ durationFrames = 107 }) => {
  const frame = useCurrentFrame();
  const isPayoff = frame >= 35;
  const sweepAngle = (frame * 3.6) % 360;
  const traceProgress = isPayoff ? interpolate(frame - 35, [0, 20], [0, 1], CLAMP) : 0;
  const pingR = isPayoff ? interpolate(frame - 35, [0, 18], [15, 90], CLAMP) : 0;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene17VECTORMAPSilhouette color="#0F172A" opacity={0.35} scale={1.0} x={80} y={880} />
      <defs>
        <radialGradient id="miamiRadarAuraGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0284C7" stopOpacity={0.65} />
          <stop offset="45%" stopColor="#0B132B" stopOpacity={0.35} />
          <stop offset="100%" stopColor="#020617" stopOpacity={0} />
        </radialGradient>
      </defs>

      <FederalNavyAura cx={540} cy={1180} rx={480} ry={270} id="miamiLahoreRadarAura" />

      {/* Global Bathymetric Tactical Ocean Grid & Latitude/Longitude Lines */}
      <g stroke="#1E293B" strokeWidth="1.2" opacity={0.5}>
        {[900, 980, 1060, 1140, 1220, 1300, 1380, 1460].map((y) => (
          <path key={y} d={`M 80 ${y} L 1000 ${y}`} />
        ))}
        {[140, 260, 380, 500, 620, 740, 860, 980].map((x) => (
          <path key={x} d={`M ${x} 880 L ${x} 1480`} />
        ))}
      </g>

      {/* Continental Landmass Contours: North America (West) and Eurasia/Pakistan (East) */}
      <g stroke="#334155" strokeWidth="2.5" fill="#0A0F1D" opacity={0.7}>
        {/* Florida / US East Coast Silhouette */}
        <path d="M 120 1060 L 190 1080 L 220 1140 L 235 1200 L 210 1260 L 170 1240 L 140 1160 Z" />
        <path d="M 140 1040 Q 240 1120 230 1280" fill="none" stroke="#0284C7" strokeWidth="2" strokeDasharray="6 4" />
        {/* South Asian Subcontinent / Pakistan Coastline */}
        <path d="M 760 1060 L 820 1080 L 870 1140 L 890 1220 L 850 1320 L 790 1300 L 740 1200 Z" />
        <path d="M 740 1040 Q 860 1100 870 1260" fill="none" stroke="#0284C7" strokeWidth="2" strokeDasharray="6 4" />
      </g>

      {/* Submarine Transatlantic Fiber-Optic Cable Route Vectors (TAT-14 / SEA-ME-WE series) */}
      <g stroke="#1E3A8A" strokeWidth="2" strokeDasharray="8 6" fill="none" opacity={0.65}>
        <path d="M 220 1160 Q 420 1300 580 1280 T 850 1170" />
        <path d="M 220 1160 Q 480 1050 680 1090 T 850 1170" />
      </g>

      {/* Concentric Tactical Radar Scope Display Centered at (540, 1180) */}
      <g transform="translate(540, 1180)">
        <TacticalRadarGrid radius={290} sweepSpeed={2.4} gridColor="#1E3A8A" accentColor="#38BDF8" showSweep={true} />
      </g>

      {/* Miami Command Base Node: USPIS / Southern District of Florida */}
      <g transform="translate(220, 1160)">
        <circle cx="0" cy="0" r="18" fill="#0369A1" stroke="#38BDF8" strokeWidth="3" />
        <circle cx="0" cy="0" r="6" fill="#F8FAFC" />
        {/* Telemetry Tag */}
        <rect x="-85" y="-45" width="170" height="26" rx="4" fill="#082F49" stroke="#0284C7" strokeWidth="1.8" />
        <text x="0" y="-28" textAnchor="middle" fill="#38BDF8" fontSize="12" fontWeight="900" fontFamily="Montserrat">
          MIAMI (USPIS HQ)
        </text>
        <text x="0" y="35" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="800" fontFamily="Montserrat">
          25°46'N, 80°11'W
        </text>
      </g>

      {/* Lahore Target Node: NCCIA / FIA Headquarters */}
      <g transform="translate(850, 1170)">
        <circle cx="0" cy="0" r="18" fill={isPayoff ? '#991B1B' : '#7F1D1D'} stroke={isPayoff ? '#EF4444' : '#DC2626'} strokeWidth="3" />
        <circle cx="0" cy="0" r="6" fill="#FEF08A" />
        {/* Telemetry Tag */}
        <rect x="-85" y="-45" width="170" height="26" rx="4" fill="#450A0A" stroke="#DC2626" strokeWidth="1.8" />
        <text x="0" y="-28" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="900" fontFamily="Montserrat">
          LAHORE (NCCIA)
        </text>
        <text x="0" y="35" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="800" fontFamily="Montserrat">
          31°31'N, 74°20'E
        </text>
      </g>

      {/* Primary Transcontinental Cyber Intercept Arc Vector */}
      <path
        d="M 220 1160 Q 540 960 850 1170"
        fill="none"
        stroke="#334155"
        strokeWidth="4"
        strokeDasharray="10 8"
      />

      {/* PHASE 2 PAYOFF: High-Speed Crimson Trace Beam & Attribution Lock */}
      {isPayoff && (
        <g>
          {/* Active Red Intercept Laser Vector */}
          <path
            d="M 220 1160 Q 540 960 850 1170"
            fill="none"
            stroke="#EF4444"
            strokeWidth="6"
            strokeDasharray="720"
            strokeDashoffset={720 * (1 - traceProgress)}
          />
          <path
            d="M 220 1160 Q 540 960 850 1170"
            fill="none"
            stroke="#F8FAFC"
            strokeWidth="2.5"
            strokeDasharray="720"
            strokeDashoffset={720 * (1 - traceProgress)}
          />

          {/* Target Reticle Locked over Lahore / Khanewal Node */}
          <g transform="translate(850, 1170)">
            <circle r={pingR} fill="none" stroke="#EF4444" strokeWidth="3" opacity={1 - traceProgress * 0.5} />
            <circle r="42" fill="none" stroke="#EF4444" strokeWidth="3.5" strokeDasharray="10 6" />
            <line x1="-55" y1="0" x2="55" y2="0" stroke="#EF4444" strokeWidth="2.5" />
            <line x1="0" y1="-55" x2="0" y2="55" stroke="#EF4444" strokeWidth="2.5" />
          </g>

          {/* Cyber Attribution Status Header Card */}
          <g transform="translate(540, 920)">
            <rect x="-195" y="-25" width="390" height="50" rx="8" fill="#7F1D1D" stroke="#EF4444" strokeWidth="3" />
            <text x="0" y="8" textAnchor="middle" fill="#FEF2F2" fontSize="18" fontWeight="900" fontFamily="Montserrat" letterSpacing="0.05em">
              ATTRIBUTION: KHANEWAL / LAHORE
            </text>
          </g>
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 18: SIXTEEN ACCOUNTS FROZEN SPLIT (SPLIT_CONFRONTATION, Payoff: Frame 34)
// ============================================================================
export const SixteenAccountsFrozenSplit: React.FC<{ durationFrames?: number }> = ({ durationFrames = 102 }) => {
  const frame = useCurrentFrame();
  const isPayoff = frame >= 34;
  const sirenFlash = Math.sin(frame * 0.45) > 0;
  const wheelTurn = isPayoff ? interpolate(frame - 34, [0, 12], [0, 90], CLAMP) : 0;
  const stampSlam = isPayoff ? interpolate(frame - 34, [0, 6, 14], [2.2, 0.95, 1.0], CLAMP) : 0;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene18SPLITCONFRONTATIONSilhouette color="#7F1D1D" opacity={0.45} scale={1.0} x={80} y={880} />
      <defs>
        <clipPath id="splitLeftVault">
          <rect x="80" y="860" width="460" height="630" />
        </clipPath>
        <clipPath id="splitRightFamily">
          <rect x="540" y="860" width="460" height="630" />
        </clipPath>
        <linearGradient id="vaultDoorMetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="35%" stopColor="#1E293B" />
          <stop offset="70%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
      </defs>

      {/* LEFT HALF: MASSIVE COMMERCIAL BANK VAULT DOOR WITH LOCKING BOLTS & CHAINS */}
      <g clipPath="url(#splitLeftVault)">
        <FederalNavyAura cx={310} cy={1180} rx={340} ry={250} id="vaultFrozenAura" />

        {/* Subterranean Reinforced Concrete Vault Jamb Frame */}
        <rect x="80" y="860" width="460" height="630" fill="#0A0E17" stroke="#1E293B" strokeWidth="4" />
        {[920, 980, 1040, 1100, 1160, 1220, 1280, 1340, 1400].map((y) => (
          <line key={y} x1="80" y1={y} x2="540" y2={y} stroke="#1E293B" strokeWidth="1.5" />
        ))}

        {/* Massive Circular Forged Steel Vault Door */}
        <g transform="translate(310, 1180)">
          {/* Outer Heavy Steel Door Rim with Radial Locking Bolt Pockets */}
          <circle cx="0" cy="0" r="190" fill="#0F172A" stroke="#64748B" strokeWidth="8" />
          <circle cx="0" cy="0" r="175" fill="url(#vaultDoorMetal)" stroke="#334155" strokeWidth="3" />
          {/* 12 Heavy Radial Locking Chrome Bolts */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const bx = Math.cos(angle) * 165;
            const by = Math.sin(angle) * 165;
            return (
              <rect
                key={i}
                x="-12"
                y="-6"
                width="24"
                height="12"
                rx="3"
                fill="#CBD5E1"
                stroke="#475569"
                strokeWidth="1.5"
                transform={`translate(${bx}, ${by}) rotate(${(i / 12) * 360})`}
              />
            );
          })}

          {/* Geared Mechanical Combination Dials */}
          <circle cx="-65" cy="-55" r="32" fill="#1E293B" stroke="#94A3B8" strokeWidth="3" />
          <circle cx="-65" cy="-55" r="16" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="65" cy="-55" r="32" fill="#1E293B" stroke="#94A3B8" strokeWidth="3" />
          <circle cx="65" cy="-55" r="16" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />

          {/* Central Heavy 4-Spoke Chrome Wheel Handle */}
          <g transform={`rotate(${wheelTurn})`}>
            <circle cx="0" cy="0" r="48" fill="#1E293B" stroke="#CBD5E1" strokeWidth="6" />
            <circle cx="0" cy="0" r="20" fill="#0F172A" stroke="#64748B" strokeWidth="3" />
            {[0, 90, 180, 270].map((deg) => (
              <line
                key={deg}
                x1="0"
                y1="0"
                x2={75 * Math.cos((deg * Math.PI) / 180)}
                y2={75 * Math.sin((deg * Math.PI) / 180)}
                stroke="#E2E8F0"
                strokeWidth="10"
                strokeLinecap="round"
              />
            ))}
          </g>

          {/* Steel Identification Placard */}
          <rect x="-85" y="85" width="170" height="32" rx="4" fill="#0B132B" stroke="#38BDF8" strokeWidth="2" />
          <text x="0" y="106" textAnchor="middle" fill="#FEF08A" fontSize="13" fontWeight="900" fontFamily="Montserrat">
            16 ACCOUNTS • PKR
          </text>
        </g>

        {/* Heavy Forged Iron Chains Wrapped Diagonally across Vault Door */}
        {isPayoff && (
          <g stroke="#94A3B8" strokeWidth="12" strokeDasharray="28 16" strokeLinecap="round">
            <line x1="80" y1="920" x2="540" y2="1450" />
            <line x1="80" y1="1450" x2="540" y2="920" />
          </g>
        )}
      </g>

      {/* RIGHT HALF: DEVASTATED FAMILY SILHOUETTES ILLUMINATED BY POLICE SIRENS */}
      <g clipPath="url(#splitRightFamily)">
        {/* Pulsing Emergency Police Strobe Ambient Light (Alternating Red / Blue) */}
        <rect
          x="540"
          y="860"
          width="460"
          height="630"
          fill={sirenFlash ? '#7F1D1D' : '#1E3A8A'}
          opacity={0.38}
        />

        {/* Courtyard Brick Wall Background */}
        <g stroke="#2D120B" strokeWidth="2" opacity={0.5}>
          {[920, 970, 1020, 1070, 1120, 1170, 1220, 1270, 1320, 1370, 1420].map((y) => (
            <line key={y} x1="540" y1={y} x2="1000" y2={y} />
          ))}
        </g>

        {/* Realistic Emotive Family Silhouettes */}
        {/* Figure 1: Elderly Father with Walking Cane and Curved Back (Center-Left) */}
        <g transform="translate(650, 1220)">
          {/* Curved Back Torso in Wool Shawl & Kurta */}
          <path
            d="M -15 80
               L -20 20
               C -25 -10, -10 -35, 15 -35
               C 35 -35, 40 -15, 30 20
               L 25 80 Z"
            fill="#090D12"
          />
          {/* Head with Traditional Punjabi Turban in Profile */}
          <path
            d="M 12 -38
               C 5 -55, 18 -68, 32 -68
               C 46 -68, 52 -55, 48 -42
               C 52 -40, 54 -32, 48 -26
               C 42 -22, 35 -24, 25 -28 Z"
            fill="#090D12"
          />
          {/* Malacca Walking Cane */}
          <path d="M 45 10 L 52 80 L 52 140" stroke="#5A3E2D" strokeWidth="5" strokeLinecap="round" />
          <path d="M 45 10 Q 40 -2 32 4" stroke="#5A3E2D" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>

        {/* Figure 2: Distraught Mother / Wife with Draped Dupatta Head Covering (Center) */}
        <g transform="translate(770, 1200)">
          {/* Flowing Draped Chador / Dupatta over Head and Shoulders */}
          <path
            d="M -30 110
               L -35 20
               C -40 -30, -20 -65, 15 -65
               C 45 -65, 60 -30, 55 20
               L 50 110 Z"
            fill="#090D12"
          />
          {/* Arms Raised with Hands Covering Face in Grief */}
          <path d="M 5 -10 L 18 -38 L 30 -38 L 22 -10 Z" fill="#040608" />
          <circle cx="24" cy="-42" r="8" fill="#CBD5E1" opacity={0.6} />
        </g>

        {/* Figure 3: Younger Sister Clutching Mother's Arm (Right) */}
        <g transform="translate(880, 1240)">
          <path
            d="M -20 70
               L -22 15
               C -25 -15, -10 -40, 12 -40
               C 30 -40, 36 -15, 30 15
               L 26 70 Z"
            fill="#090D12"
          />
          <circle cx="14" cy="-45" r="18" fill="#090D12" />
          {/* Arm Reaching Out Clutching Mother */}
          <line x1="-12" y1="-5" x2="-55" y2="-20" stroke="#090D12" strokeWidth="10" strokeLinecap="round" />
        </g>
      </g>

      {/* Central Dividing Split Axis with Warning Stroke */}
      <line x1="540" y1="860" x2="540" y2="1490" stroke="#DC2626" strokeWidth="6" />

      {/* PHASE 2 PAYOFF: FROZEN Weathered Military Rubber Stamp on Left Vault */}
      {isPayoff && (
        <g transform={`translate(310, 1180) scale(${stampSlam})`}>
          <WeatheredMilitaryStamp
            text="FROZEN"
            subText="COURT ORDER 16-PKR"
            color="#DC2626"
            rotation={-12}
            slamProgress={stampSlam}
          />
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 19: NCCIA FAMILY FALLOUT DOSSIER (QUOTE_CARD, Payoff: Frame 35)
// ============================================================================
export const NcciaFamilyFalloutDossier: React.FC<{ durationFrames?: number }> = ({ durationFrames = 104 }) => {
  const frame = useCurrentFrame();
  const isPayoff = frame >= 35;
  const dossierOpen = isPayoff ? interpolate(frame - 35, [0, 10], [0, 1], CLAMP) : 0;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene19QUOTECARDSilhouette color="#78350F" opacity={0.35} scale={1.0} x={80} y={880} />
      <TerracottaAtmosphericAura cx={540} cy={1180} rx={440} ry={250} id="dossierFalloutAura" />

      {/* Classified NCCIA Kraft Dossier Folder */}
      <g transform="translate(240, 930)">
        {/* Exterior Folder Base */}
        <rect x="0" y="0" width="600" height="480" rx="12" fill="#78350F" stroke="#92400E" strokeWidth="4" />
        {/* Interior Page Revealed by Perspective Swing */}
        <rect x="20" y="20" width="560" height="440" rx="8" fill="#FEF3C7" stroke="#B45309" strokeWidth="2" />

        {/* Official Pakistani Emblem & Dossier Header */}
        <text x="300" y="65" textAnchor="middle" fill="#065F46" fontSize="20" fontWeight="900" fontFamily="Montserrat">
          GOVERNMENT OF PAKISTAN • NCCIA LAHORE
        </text>
        <line x1="40" y1="85" x2="560" y2="85" stroke="#92400E" strokeWidth="2" />

        {/* Family Tree Breakdown of Laundered Accounts */}
        {[
          { name: 'FAHEEM AKRAM (PRIMARY)', acc: '7 ACCOUNTS', col: '#DC2626' },
          { name: 'BROTHER (COMMERCIAL)', acc: '5 ACCOUNTS', col: '#92400E' },
          { name: 'WIFE (DOMESTIC HOLDINGS)', acc: '2 ACCOUNTS', col: '#92400E' },
          { name: 'SISTER (REMITTANCE)', acc: '1 ACCOUNT', col: '#92400E' },
          { name: 'MATERNAL AUNT (ESCROW)', acc: '1 ACCOUNT', col: '#92400E' },
        ].map((item, i) => (
          <g key={i} transform={`translate(40, ${130 + i * 55})`}>
            <rect x="0" y="0" width="520" height="42" rx="6" fill="#FDE68A" stroke={item.col} strokeWidth="2" />
            <text x="20" y="27" fill="#451A03" fontSize="16" fontWeight="900" fontFamily="Montserrat">
              {item.name}
            </text>
            <text x="500" y="27" textAnchor="end" fill={item.col} fontSize="16" fontWeight="900" fontFamily="Montserrat">
              {item.acc}
            </text>
          </g>
        ))}

        {/* PHASE 2 PAYOFF: Official RED FORENSIC AUDIT STAMP */}
        {isPayoff && (
          <g transform="translate(300, 390)">
            <WeatheredMilitaryStamp text="SYNDICATE IMPLICATED" subText="ALL ASSETS SEIZED" color="#DC2626" rotation={-5} />
          </g>
        )}
      </g>
    </svg>
  );
};

// ============================================================================
// SCENE 20: LAHORE NIGHT RAID CONVOY TRANSIT (VEHICLE_IN_TRANSIT, Payoff: Frame 35)
// ============================================================================
export const LahoreNightRaidConvoyTransit: React.FC<{ durationFrames?: number }> = ({ durationFrames = 99 }) => {
  const frame = useCurrentFrame();
  const isPayoff = frame >= 35;
  const strobe = Math.sin(frame * 0.8) > 0;
  const convoyBob = Math.sin(frame * 0.5) * 3.5;
  const roadDividePhase = (frame * 42) % 180;
  const wheelSpin = (frame * 24) % 360;
  const targetLockPulse = isPayoff ? interpolate(frame - 35, [0, 8, 20], [0.3, 1.0, 0.85], CLAMP) : 0;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene20VEHICLEINTRANSITSilhouette color="#1E1B4B" opacity={0.45} scale={1.0} x={80} y={900} />
      <defs>
        <linearGradient id="headlightConeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity={0.85} />
          <stop offset="40%" stopColor="#F59E0B" stopOpacity={0.35} />
          <stop offset="100%" stopColor="#D97706" stopOpacity={0} />
        </linearGradient>
        <radialGradient id="strobeRedAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity={0.85} />
          <stop offset="50%" stopColor="#DC2626" stopOpacity={0.35} />
          <stop offset="100%" stopColor="#7F1D1D" stopOpacity={0} />
        </radialGradient>
        <radialGradient id="strobeBlueAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.85} />
          <stop offset="50%" stopColor="#1E3A8A" stopOpacity={0.35} />
          <stop offset="100%" stopColor="#0F172A" stopOpacity={0} />
        </radialGradient>
      </defs>

      <FederalNavyAura cx={540} cy={1180} rx={480} ry={270} id="nightRaidConvoyAura" />

      {/* Distant Historic Lahore Silhouette: Badshahi Mosque Domes & Minarets */}
      <g opacity={0.38} fill="#090E17">
        {/* Main Central Mughal Bulbous Dome */}
        <path d="M 460 1200 Q 500 1110 540 1100 Q 580 1110 620 1200 Z" />
        <line x1="540" y1="1090" x2="540" y2="1102" stroke="#64748B" strokeWidth="2.5" />
        {/* Left Side Dome */}
        <path d="M 360 1210 Q 395 1135 430 1130 Q 465 1135 500 1210 Z" />
        {/* Right Side Dome */}
        <path d="M 580 1210 Q 615 1135 650 1130 Q 685 1135 720 1210 Z" />
        {/* Distant Octagonal Minaret Spire */}
        <rect x="220" y="1040" width="28" height="170" />
        <rect x="215" y="1030" width="38" height="12" rx="3" />
        <polygon points="220,1030 234,990 248,1030" />
        {/* Fort Parapet Battlements */}
        <rect x="100" y="1200" width="880" height="40" />
      </g>

      {/* Wet Lahore Rain-Swept Asphalt Surface */}
      <rect x="60" y="1320" width="960" height="170" fill="#0A0E17" stroke="#1E293B" strokeWidth="3" />
      {/* Specular Wet Road Puddle Reflections */}
      <ellipse cx="440" cy="1420" rx="160" ry="12" fill={strobe ? '#EF4444' : '#0284C7'} opacity={0.25} />
      <ellipse cx="780" cy="1430" rx="130" ry="10" fill={strobe ? '#0284C7' : '#EF4444'} opacity={0.2} />

      {/* Dashed High-Speed Highway Divider Racing Left */}
      <g stroke="#F8FAFC" strokeWidth="5" strokeDasharray="55 45">
        <line x1={60 - roadDividePhase} y1="1410" x2={1080 - roadDividePhase} y2="1410" />
      </g>

      {/* Tactical Convoy of 3 NCCIA/FIA Response Vehicles */}
      {[
        { x: 190, s: 0.78, type: 'LAND_CRUISER' },
        { x: 500, s: 1.0, type: 'HILUX_LEAD' },
        { x: 830, s: 0.82, type: 'TACTICAL_TRUCK' },
      ].map((suv, idx) => {
        const isLead = suv.type === 'HILUX_LEAD';
        const truckY = 1205 + convoyBob;

        return (
          <g key={idx} transform={`translate(${suv.x}, ${truckY}) scale(${suv.s})`}>
            {/* Front Headlight Forward Light Cones Slicing Through Rain/Mist */}
            <polygon points="180,32 460,-35 460,95 180,52" fill="url(#headlightConeGrad)" opacity={0.65} />

            {/* Heavy Steel Bull-Bar with Winch Mount */}
            <g stroke="#64748B" strokeWidth="3.5" fill="none">
              <path d="M 180 50 L 195 20 L 195 -10 L 175 -15" strokeLinecap="round" />
              <rect x="180" y="24" width="16" height="14" rx="2" fill="#334155" />
              <circle cx="188" cy="31" r="3" fill="#E2E8F0" />
            </g>

            {/* Tactical Vehicle Body (Double-Cab Toyota Hilux / LC Gun-Truck) */}
            <path
              d="M -180 55
                 L -180 -18
                 L -95 -22
                 L -50 -65
                 L 55 -65
                 L 115 0
                 L 175 10
                 L 180 55
                 Z"
              fill="#06090F"
              stroke="#1E293B"
              strokeWidth="3.5"
            />
            {/* Front Bumper & Rock Sliders */}
            <rect x="-185" y="48" width="370" height="12" rx="3" fill="#18181B" stroke="#334155" strokeWidth="2" />

            {/* Tinted Armored Glass Windows */}
            <polygon points="-40,-56 50,-56 95,-6 -40,-6" fill="#0B132B" stroke="#1E3A8A" strokeWidth="2.5" />
            <polygon points="-85,-18 -45,-56 -45,-6 -85,-6" fill="#0B132B" stroke="#1E3A8A" strokeWidth="2" />
            <line x1="10" y1="-56" x2="10" y2="-6" stroke="#1E293B" strokeWidth="3" />

            {/* Exterior Rearview Mirror & Door Seams */}
            <rect x="75" y="-12" width="12" height="10" rx="2" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
            <line x1="-35" y1="-6" x2="-35" y2="48" stroke="#1E293B" strokeWidth="2" />
            <line x1="35" y1="-6" x2="35" y2="48" stroke="#1E293B" strokeWidth="2" />

            {/* Safari Snorkel Air Intake Tube on A-Pillar */}
            <path d="M 125 15 L 105 -55 L 105 -68" fill="none" stroke="#334155" strokeWidth="4.5" strokeLinecap="round" />
            <ellipse cx="105" cy="-68" rx="6" ry="4" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />

            {/* Tubular Roof Cargo Rack with Spare Tire & Whip Antennas */}
            <rect x="-65" y="-76" width="120" height="11" rx="2" fill="none" stroke="#475569" strokeWidth="2.5" />
            <line x1="-50" y1="-76" x2="-50" y2="-65" stroke="#475569" strokeWidth="2.5" />
            <line x1="35" y1="-76" x2="35" y2="-65" stroke="#475569" strokeWidth="2.5" />
            {/* Mounted Spare Tire */}
            <ellipse cx="-15" cy="-80" rx="32" ry="7" fill="#090D12" stroke="#334155" strokeWidth="2" />
            {/* Flexible Spring Whip Antenna */}
            <line x1="-60" y1="-76" x2="-75" y2="-130" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
            <circle cx="-75" cy="-130" r="3" fill="#E2E8F0" />

            {/* Roof Emergency LED Strobe Light Bar */}
            <rect x="-10" y="-84" width="46" height="10" rx="3" fill="#18181B" stroke="#334155" strokeWidth="1.5" />
            <rect x="-8" y="-82" width="20" height="6" fill={strobe ? '#EF4444' : '#1E3A8A'} />
            <rect x="14" y="-82" width="20" height="6" fill={strobe ? '#1E3A8A' : '#38BDF8'} />

            {/* Radial Strobe Lighting Cones Emitted from Roof */}
            <circle cx="2" cy="-80" r="45" fill={strobe ? 'url(#strobeRedAura)' : 'url(#strobeBlueAura)'} opacity={0.7} />

            {/* Front Headlight Assembly */}
            <rect x="168" y="22" width="12" height="18" rx="2" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1.5" />
            <rect x="168" y="40" width="12" height="6" fill="#F59E0B" />

            {/* Heavy All-Terrain Knobby Deep-Tread Tires */}
            {[-115, 115].map((wx, ti) => (
              <g key={ti} transform={`translate(${wx}, 55)`}>
                {/* Outer Rubber Tire with Deep Tread Knobs */}
                <circle cx="0" cy="0" r="34" fill="#04070D" stroke="#1E293B" strokeWidth="5" />
                {/* 6 Wheel Alloy Spokes Rotating */}
                <g transform={`rotate(${wheelSpin})`}>
                  <circle cx="0" cy="0" r="22" fill="#0F172A" stroke="#64748B" strokeWidth="3" />
                  <circle cx="0" cy="0" r="8" fill="#CBD5E1" stroke="#334155" strokeWidth="2" />
                  {[0, 60, 120, 180, 240, 300].map((deg) => (
                    <line
                      key={deg}
                      x1="0"
                      y1="0"
                      x2={18 * Math.cos((deg * Math.PI) / 180)}
                      y2={18 * Math.sin((deg * Math.PI) / 180)}
                      stroke="#94A3B8"
                      strokeWidth="3.5"
                    />
                  ))}
                </g>
              </g>
            ))}

            {/* Tire Water Spray Mist Flying Behind Wheels */}
            <g opacity={0.45} stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round">
              <line x1="-155" y1="75" x2="-195" y2="70" />
              <line x1="-150" y1="82" x2="-210" y2="78" />
              <line x1="75" y1="78" x2="35" y2="75" />
            </g>
          </g>
        );
      })}

      {/* PHASE 2 PAYOFF: Converging Tactical Spotlights & Target Lock on Hideout */}
      {isPayoff && (
        <g opacity={targetLockPulse}>
          {/* Dual Tactical Spotlights Piercing Night Sky */}
          <polygon points="500,1140 860,860 930,860 500,1160" fill="#F8FAFC" opacity={0.32} />
          <polygon points="830,1140 880,860 950,860 830,1160" fill="#38BDF8" opacity={0.32} />

          {/* Tactical Target Lock Reticle over Raid Coordinates */}
          <g transform="translate(890, 890)">
            <circle cx="0" cy="0" r="38" fill="none" stroke="#EF4444" strokeWidth="3" strokeDasharray="10 6" />
            <line x1="-48" y1="0" x2="48" y2="0" stroke="#EF4444" strokeWidth="2.5" />
            <line x1="0" y1="-48" x2="0" y2="48" stroke="#EF4444" strokeWidth="2.5" />
            {/* Coordinates Badge */}
            <rect x="-90" y="44" width="180" height="26" rx="4" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1.5" />
            <text x="0" y="62" textAnchor="middle" fill="#FEF2F2" fontSize="12" fontWeight="900" fontFamily="Montserrat">
              RAID COORDINATES LOCKED
            </text>
          </g>
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 21: LAHORE HIDEOUT BREACH FRACTURE (STRUCTURAL_FRACTURE, Payoff: Frame 43)
// ============================================================================
export const LahoreHideoutBreachFracture: React.FC<{ durationFrames?: number }> = ({ durationFrames = 112 }) => {
  const frame = useCurrentFrame();
  const isPayoff = frame >= 43;
  const breachScale = isPayoff ? interpolate(frame - 43, [0, 5, 20], [0.1, 1.25, 1.0], CLAMP) : 0;
  const splinterSpread = isPayoff ? interpolate(frame - 43, [0, 20], [0, 220], CLAMP) : 0;

  const blastLobe = createArcScallopedCloud(160, 9, [1.0, 1.2, 0.9, 1.3, 1.1, 0.85, 1.2, 1.0, 1.15], frame * 0.15);

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene21STRUCTURALFRACTURESilhouette color="#7F1D1D" opacity={0.45} scale={1.0} x={80} y={880} />
      <FieryExplosionAura cx={540} cy={1180} rx={480} ry={270} id="hideoutBreachAura" />

      {/* Elaborately Carved Punjab Wooden Door */}
      <g transform="translate(540, 1180)">
        <rect x="-240" y="-280" width="480" height="560" rx="10" fill="#451A03" stroke="#290E02" strokeWidth="6" />
        {/* Iron Studs & Hinges */}
        {[-200, 200].map((hx, i) => (
          <g key={i}>
            <rect x={hx - 20} y="-200" width="40" height="30" fill="#18181B" />
            <rect x={hx - 20} y="150" width="40" height="30" fill="#18181B" />
          </g>
        ))}
        {[-140, -60, 60, 140].map((sx, i) =>
          [-180, -60, 60, 180].map((sy, j) => (
            <circle key={`${i}-${j}`} cx={sx} cy={sy} r="8" fill="#71717A" stroke="#18181B" strokeWidth="2" />
          ))
        )}
      </g>

      {/* Tactical Entry Team Silhouettes on Left */}
      <g transform="translate(200, 1260)">
        <SilhouetteCharacter figureType="SOLDIER" scale={0.9} facing="RIGHT" />
      </g>

      {/* PHASE 2 PAYOFF: Door Splinters Inward with 6-Layer Blast */}
      {isPayoff && (
        <g transform="translate(540, 1180)">
          {/* Shockwave Flash */}
          <circle r={splinterSpread * 1.5} fill="none" stroke="#F8FAFC" strokeWidth="6" opacity={0.8} />

          {/* Flying Splinters and Door Fragments */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const dist = splinterSpread * (0.8 + pseudoRandom(i * 19) * 0.5);
            return (
              <polygon
                key={i}
                points="-10,-35 15,0 -12,35"
                fill="#78350F"
                stroke="#B45309"
                strokeWidth="2"
                transform={`translate(${Math.cos(angle) * dist}, ${Math.sin(angle) * dist}) rotate(${i * 45})`}
              />
            );
          })}

          {/* Scalloped Dust and Fireball Bloom */}
          <g transform={`scale(${breachScale})`}>
            <path d={blastLobe} fill="#EA580C" opacity={0.85} />
            <path d={create8PointedStarPath(90)} fill="#F8FAFC" />
          </g>
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 22: IRON CUFFS ON CODER HANDS LEADER (LONE_LEADER, Payoff: Frame 36)
// ============================================================================
export const IronCuffsOnCoderHandsLeader: React.FC<{ durationFrames?: number }> = ({ durationFrames = 106 }) => {

      
  const frame = useCurrentFrame();
  const isPayoff = frame >= 36;
  const cuffClamp = isPayoff ? interpolate(frame - 36, [0, 5, 12], [40, 0, 0], CLAMP) : 40;
  const chainSway = Math.sin(frame * 0.12) * 5;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene22LONELEADERSilhouette color="#1E1B4B" opacity={0.45} scale={1.0} x={100} y={880} />
      {/* Heavy Blued-Steel Handcuff Chain Mechanism & Forensic Arrest Contours */}
      <g opacity="0.8">
        <path d="M 440 1220 C 460 1190, 480 1190, 500 1220" stroke="#64748B" strokeWidth="5" fill="none" />
        <path d="M 480 1220 C 500 1190, 520 1190, 540 1220" stroke="#94A3B8" strokeWidth="5" fill="none" />
        <path d="M 520 1220 C 540 1190, 560 1190, 580 1220" stroke="#64748B" strokeWidth="5" fill="none" />
        <path d="M 560 1220 C 580 1190, 600 1190, 620 1220" stroke="#94A3B8" strokeWidth="5" fill="none" />
        <path d="M 600 1220 C 620 1190, 640 1190, 660 1220" stroke="#64748B" strokeWidth="5" fill="none" />
        <path d="M 380 1160 C 350 1200, 350 1260, 380 1300" stroke="#334155" strokeWidth="6" fill="none" />
        <path d="M 700 1160 C 730 1200, 730 1260, 700 1300" stroke="#334155" strokeWidth="6" fill="none" />
        <path d="M 390 1170 C 365 1205, 365 1255, 390 1290" stroke="#64748B" strokeWidth="3" fill="none" />
        <path d="M 690 1170 C 715 1205, 715 1255, 690 1290" stroke="#64748B" strokeWidth="3" fill="none" />
        <path d="M 400 1230 L 420 1230" stroke="#0F172A" strokeWidth="4" fill="none" />
        <path d="M 660 1230 L 680 1230" stroke="#0F172A" strokeWidth="4" fill="none" />
        <path d="M 540 1120 L 540 1340" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="6 3" fill="none" />
      </g>
      <FederalNavyAura cx={540} cy={1180} rx={460} ry={250} id="cuffsLeaderAura" />

      {/* Matrix Binary Code Falling in Background */}
      <g opacity={isPayoff ? 0.2 : 0.65} fill="#10B981" fontSize="16" fontWeight="900" fontFamily="Montserrat">
        {[200, 320, 460, 600, 740, 880].map((x, i) => (
          <text key={i} x={x} y={960 + ((frame * 3 + i * 40) % 460)}>
            {`01001100 01100001`}
          </text>
        ))}
      </g>

      {/* Bowed Head Profile of Faheem Akram */}
      <g transform="translate(540, 1060)">
        <path
          d="M -50 80 
             C -60 10, -20 -40, 0 -50 
             C 30 -60, 50 -30, 40 10 
             C 30 50, 10 80, -50 80 Z"
          fill="#090D12"
        />
        {/* Slumped Shoulders */}
        <path d="M -120 160 C -60 80, 60 80, 120 160 Z" fill="#18181B" />
      </g>

      {/* Wrists Held Together in Foreground */}
      <g transform="translate(540, 1280)">
        {/* Left Wrist */}
        <rect x={-90 + cuffClamp * 0.5} y="-40" width="60" height="90" rx="20" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
        {/* Right Wrist */}
        <rect x={30 - cuffClamp * 0.5} y="-40" width="60" height="90" rx="20" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />

        {/* Heavy Blued-Steel Handcuffs Locking Over Wrists */}
        {/* Left Cuff Ratchet */}
        <ellipse cx={-60 + cuffClamp * 0.5} cy="5" rx="36" ry="48" fill="none" stroke="#94A3B8" strokeWidth="8" />
        {/* Right Cuff Ratchet */}
        <ellipse cx={60 - cuffClamp * 0.5} cy="5" rx="36" ry="48" fill="none" stroke="#94A3B8" strokeWidth="8" />

        {/* Center Connecting Steel Chain Links */}
        <g transform={`translate(0, ${chainSway})`}>
          <ellipse cx="-15" cy="5" rx="14" ry="8" fill="none" stroke="#CBD5E1" strokeWidth="4" />
          <ellipse cx="15" cy="5" rx="14" ry="8" fill="none" stroke="#CBD5E1" strokeWidth="4" />
        </g>
      </g>

      {/* PHASE 2 PAYOFF: Mechanical Lock Shockwave */}
      {isPayoff && (
        <g transform="translate(540, 1285)">
          <circle r={interpolate(frame - 36, [0, 15], [20, 160], CLAMP)} fill="none" stroke="#EF4444" strokeWidth="4" opacity={interpolate(frame - 36, [0, 15], [0.9, 0], CLAMP)} />
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 23: KHANEWAL VILLAGE GRIEF TALLY (CROWD_TALLY, Payoff: Frame 34)
// ============================================================================
export const KhanewalVillageGriefTally: React.FC<{ durationFrames?: number }> = ({ durationFrames = 103 }) => {

      
  const frame = useCurrentFrame();
  const isPayoff = frame >= 34;
  const tvFlicker = Math.sin(frame * 0.35) * 5;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene23CROWDTALLYSilhouette color="#9A3412" opacity={0.4} scale={1.0} x={100} y={880} />
      {/* Rustic South Punjab Brick Lane Masonry & Elder Walking Staff Contours */}
      <g opacity="0.7">
        <path d="M 140 1020 L 420 1020" stroke="#78350F" strokeWidth="2.5" fill="none" />
        <path d="M 140 1070 L 420 1070" stroke="#78350F" strokeWidth="2.5" fill="none" />
        <path d="M 140 1120 L 420 1120" stroke="#78350F" strokeWidth="2.5" fill="none" />
        <path d="M 210 1020 L 210 1070" stroke="#78350F" strokeWidth="1.5" fill="none" />
        <path d="M 350 1020 L 350 1070" stroke="#78350F" strokeWidth="1.5" fill="none" />
        <path d="M 280 1070 L 280 1120" stroke="#78350F" strokeWidth="1.5" fill="none" />
        <path d="M 660 1050 L 940 1050" stroke="#92400E" strokeWidth="2.5" fill="none" />
        <path d="M 660 1100 L 940 1100" stroke="#92400E" strokeWidth="2.5" fill="none" />
        <path d="M 750 1050 L 750 1100" stroke="#92400E" strokeWidth="1.5" fill="none" />
        <path d="M 850 1050 L 850 1100" stroke="#92400E" strokeWidth="1.5" fill="none" />
        <path d="M 540 1200 L 540 1520" stroke="#451A03" strokeWidth="5" fill="none" />
        <path d="M 536 1200 C 530 1180, 520 1180, 514 1200" stroke="#451A03" strokeWidth="5" fill="none" />
      </g>
      <TerracottaAtmosphericAura cx={540} cy={1180} rx={440} ry={250} id="villageGriefAura" />

      {/* Dimming Village Street Silhouettes */}
      <path d="M 80 1420 L 1000 1420" stroke="#7C2D12" strokeWidth="6" />

      {/* Bowed Elderly Father with Walking Cane on Left */}
      <g transform="translate(340, 1240)">
        {/* Slumped Body */}
        <ellipse cx="0" cy="50" rx="34" ry="70" fill="#090D12" />
        <circle cx="10" cy="-35" r="22" fill="#090D12" />
        {/* Malacca Walking Cane */}
        <line x1="35" y1="20" x2="50" y2="150" stroke="#78350F" strokeWidth="8" strokeLinecap="round" />
      </g>

      {/* Marching / Standing Somber Neighbors */}
      <g transform="translate(180, 1260)">
        <MarchingInfantryRank soldierCount={4} spacing={75} scale={0.7} silhouetteColor="#0F172A" />
      </g>

      {/* Glowing CRT TV in Village Window Showing Breaking News */}
      <g transform="translate(680, 1160)">
        <rect x="0" y="0" width="220" height="170" rx="14" fill="#18181B" stroke="#475569" strokeWidth="5" />
        {/* Glowing TV Screen */}
        <rect
          x="15"
          y="15"
          width="190"
          height="140"
          rx="10"
          fill={isPayoff ? '#0284C7' : '#FEF08A'}
          opacity={0.85 + tvFlicker * 0.02}
        />
        {/* News Headline Ticker */}
        <text x="110" y="70" textAnchor="middle" fill="#F8FAFC" fontSize="16" fontWeight="900" fontFamily="Montserrat">
          BREAKING NEWS
        </text>
        <text x="110" y="105" textAnchor="middle" fill="#EF4444" fontSize="14" fontWeight="800" fontFamily="Montserrat">
          KHANEWAL CODER HELD
        </text>
      </g>

      {/* PHASE 2 PAYOFF: 16 Family Accounts Implicated Tally Badge */}
      {isPayoff && (
        <g transform="translate(540, 940)">
          <rect x="-170" y="-28" width="340" height="56" rx="8" fill="#7F1D1D" stroke="#DC2626" strokeWidth="3" />
          <text x="0" y="8" textAnchor="middle" fill="#FEF2F2" fontSize="20" fontWeight="900" fontFamily="Montserrat">
            16 FAMILY ACCOUNTS EXPOSED
          </text>
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 24: EXTRADITION WATCHTOWER SPLIT (SPLIT_CONFRONTATION, Payoff: Frame 34)
// ============================================================================
export const ExtraditionWatchtowerSplit: React.FC<{ durationFrames?: number }> = ({ durationFrames = 105 }) => {
  const frame = useCurrentFrame();
  const isPayoff = frame >= 34;
  const searchlightRot = Math.sin(frame * 0.08) * 14;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene24SPLITCONFRONTATIONSilhouette color="#0F172A" opacity={0.4} scale={1.0} x={80} y={880} />
      <defs>
        <clipPath id="splitWatchtowerLeft">
          <polygon points="80,860 480,860 520,1490 80,1490" />
        </clipPath>
        <clipPath id="splitWatchtowerRight">
          <polygon points="480,860 1000,860 1000,1490 520,1490" />
        </clipPath>
      </defs>

      {/* LEFT: CUFFED PRISONER SILHOUETTE BEHIND BARS */}
      <g clipPath="url(#splitWatchtowerLeft)">
        <FederalNavyAura cx={280} cy={1180} rx={320} ry={240} id="prisonerSplitAura" />
        <g transform="translate(260, 1180)">
          <SilhouetteCharacter figureType="CUSTOM" scale={0.9} customSvgPath="M 0 100 C -30 20, 30 20, 0 100 Z" />
        </g>
        {/* Holding Cell Iron Bars */}
        {[140, 200, 260, 320, 380, 440].map((bx, i) => (
          <line key={i} x1={bx} y1="860" x2={bx} y2="1490" stroke="#1E293B" strokeWidth="8" />
        ))}
      </g>

      {/* RIGHT: U.S. FEDERAL PRISON WATCHTOWER & RAZOR WIRE */}
      <g clipPath="url(#splitWatchtowerRight)">
        <rect x="520" y="860" width="480" height="630" fill="#0F172A" />
        {/* Watchtower Platform */}
        <g transform="translate(760, 1020)">
          <rect x="-70" y="-50" width="140" height="90" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="3" />
          {/* Lattice Legs */}
          <line x1="-50" y1="40" x2="-90" y2="420" stroke="#334155" strokeWidth="6" />
          <line x1="50" y1="40" x2="90" y2="420" stroke="#334155" strokeWidth="6" />
        </g>
        {/* Razor Wire Coils */}
        <g stroke="#94A3B8" strokeWidth="3" fill="none">
          {[560, 620, 680, 740, 800, 860, 920].map((cx, i) => (
            <circle key={i} cx={cx} cy="1380" r="35" strokeDasharray="14 6" />
          ))}
        </g>
      </g>

      {/* Diagonal Division Seam */}
      <line x1="480" y1="860" x2="520" y2="1490" stroke="#DC2626" strokeWidth="4" />

      {/* PHASE 2 PAYOFF: Extradition Warrant Rubber Seal & Searchlight Sweep */}
      {isPayoff && (
        <g>
          {/* Sweeping White Searchlight Beam */}
          <polygon
            points="760,1020 180,1160 220,1320"
            fill="#F8FAFC"
            opacity={0.35}
            transform={`rotate(${searchlightRot}, 760, 1020)`}
          />
          <g transform="translate(500, 1220)">
            <WeatheredMilitaryStamp text="EXTRADITION WARRANT" subText="U.S. MARSHALS SERVICE" color="#DC2626" rotation={-8} />
          </g>
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 25: STORY CIRCLE TWO DOLLAR SHORTCUT CARD (QUOTE_CARD, Payoff: Frame 34)
// ============================================================================
export const StoryCircleTwoDollarShortcutCard: React.FC<{ durationFrames?: number }> = ({ durationFrames = 104 }) => {
  const frame = useCurrentFrame();
  const isPayoff = frame >= 34;
  const wheelSpin = (frame * 0.18) % 360;
  const burnEdge = isPayoff ? interpolate(frame - 34, [0, 20], [0, 1], CLAMP) : 0;
  const stampSlam = isPayoff ? interpolate(frame - 34, [0, 6, 14], [2.2, 0.95, 1.0], CLAMP) : 0;

  // Dan Harmon 8-Step Story Circle Node Data
  const storyCircleNodes = [
    { num: 'I', label: 'YOU', sub: 'KHANEWAL', angle: -90 },
    { num: 'II', label: 'NEED', sub: 'WEALTH', angle: -45 },
    { num: 'III', label: 'GO', sub: 'DARKWEB', angle: 0 },
    { num: 'IV', label: 'SEARCH', sub: 'USPS FLAW', angle: 45 },
    { num: 'V', label: 'FIND', sub: '$2 LABELS', angle: 90 },
    { num: 'VI', label: 'TAKE', sub: '$126M CASH', angle: 135 },
    { num: 'VII', label: 'RETURN', sub: 'RAID & FALL', angle: 180 },
    { num: 'VIII', label: 'CHANGE', sub: 'RUIN', angle: 225 },
  ];

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene25QUOTECARDSilhouette color="#78350F" opacity={0.35} scale={1.0} x={80} y={880} />
      <defs>
        <radialGradient id="storyDialAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.7} />
          <stop offset="45%" stopColor="#B45309" stopOpacity={0.3} />
          <stop offset="85%" stopColor="#451A03" stopOpacity={0.12} />
          <stop offset="100%" stopColor="#0B0907" stopOpacity={0} />
        </radialGradient>
        <radialGradient id="burnEdgeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#090D12" stopOpacity={0} />
          <stop offset="85%" stopColor="#DC2626" stopOpacity={0.65} />
          <stop offset="100%" stopColor="#FEF08A" stopOpacity={0.9} />
        </radialGradient>
      </defs>

      <TerracottaAtmosphericAura cx={540} cy={1180} rx={480} ry={270} id="storyCircleCardAura" />

      {/* Antique Brass & Dark Iron Astrolabe Narrative Dial Centered at (540, 1180) */}
      <g transform={`translate(540, 1180)`}>
        {/* Ambient Dial Glow */}
        <circle cx="0" cy="0" r="320" fill="url(#storyDialAura)" />

        {/* Outer Geared Brass Astrolabe Rim */}
        <circle cx="0" cy="0" r="290" fill="none" stroke="#78350F" strokeWidth="8" />
        <circle cx="0" cy="0" r="280" fill="none" stroke="#D97706" strokeWidth="3" strokeDasharray="12 6" />
        <circle cx="0" cy="0" r="265" fill="#0C0A08" stroke="#F59E0B" strokeWidth="2.5" />

        {/* 64 Fine Degree Calibrated Radial Ticks */}
        {Array.from({ length: 64 }).map((_, i) => {
          const deg = (i / 64) * 360;
          const rad = (deg * Math.PI) / 180;
          const isMajor = i % 8 === 0;
          return (
            <line
              key={i}
              x1={Math.cos(rad) * 265}
              y1={Math.sin(rad) * 265}
              x2={Math.cos(rad) * (isMajor ? 245 : 255)}
              y2={Math.sin(rad) * (isMajor ? 245 : 255)}
              stroke={isMajor ? '#FEF08A' : '#B45309'}
              strokeWidth={isMajor ? 2.5 : 1.2}
            />
          );
        })}

        {/* Rotating 8-Sector Astrological Spoke Vectors */}
        <g transform={`rotate(${wheelSpin})`}>
          {storyCircleNodes.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            return (
              <line
                key={i}
                x1="0"
                y1="0"
                x2={Math.cos(rad) * 230}
                y2={Math.sin(rad) * 230}
                stroke="#B45309"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
            );
          })}
        </g>

        {/* 8 Distinct Dan Harmon Story Circle Nodes around Perimeter */}
        {storyCircleNodes.map((node, i) => {
          const rad = ((node.angle + wheelSpin) * Math.PI) / 180;
          const nx = Math.cos(rad) * 225;
          const ny = Math.sin(rad) * 225;
          const isEighth = node.num === 'VIII';

          return (
            <g key={i} transform={`translate(${nx}, ${ny})`}>
              <circle
                cx="0"
                cy="0"
                r="30"
                fill={isEighth && isPayoff ? '#7F1D1D' : '#18120C'}
                stroke={isEighth && isPayoff ? '#EF4444' : '#F59E0B'}
                strokeWidth={isEighth && isPayoff ? 3.5 : 2.5}
              />
              <text x="0" y="-8" textAnchor="middle" fill="#FEF08A" fontSize="12" fontWeight="900" fontFamily="Montserrat">
                {node.num}
              </text>
              <text x="0" y="8" textAnchor="middle" fill="#F8FAFC" fontSize="9" fontWeight="900" fontFamily="Montserrat">
                {node.label}
              </text>
              <text x="0" y="19" textAnchor="middle" fill="#CBD5E1" fontSize="7" fontWeight="700" fontFamily="Montserrat">
                {node.sub}
              </text>
            </g>
          );
        })}
      </g>

      {/* Central Focal Artifact: Authentic $2 USPS Counterfeit Priority Mail Label */}
      <g transform="translate(540, 1180)">
        {/* Label Card Base */}
        <rect x="-140" y="-90" width="280" height="180" rx="8" fill="#F8FAFC" stroke="#0F172A" strokeWidth="4" />

        {/* USPS Sonic Blue Header Banner */}
        <rect x="-140" y="-90" width="280" height="42" rx="6" fill="#0A2540" />
        <rect x="-140" y="-48" width="280" height="8" fill="#DC2626" />
        <text x="0" y="-64" textAnchor="middle" fill="#F8FAFC" fontSize="16" fontWeight="900" fontFamily="Montserrat" letterSpacing="0.08em">
          PRIORITY MAIL • 2-DAY
        </text>

        {/* Authentic Tracking Barcode Matrix String */}
        <g transform="translate(0, -18)">
          {[-110, -95, -80, -65, -50, -35, -20, -5, 10, 25, 40, 55, 70, 85, 100, 115].map((bx, idx) => (
            <line
              key={idx}
              x1={bx}
              y1="-10"
              x2={bx}
              y2={idx % 3 === 0 ? "16" : "10"}
              stroke="#0F172A"
              strokeWidth={idx % 4 === 0 ? 4 : 2}
            />
          ))}
          <text x="0" y="28" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="800" fontFamily="Montserrat">
            9400 1118 9922 0014 8219 02
          </text>
        </g>

        {/* Illicit Counterfeit Price Callout ($2.00) */}
        <g transform="translate(0, 52)">
          <rect x="-70" y="-18" width="140" height="36" rx="6" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2" />
          <text x="0" y="8" textAnchor="middle" fill="#DC2626" fontSize="26" fontWeight="900" fontFamily="Montserrat">
            $2.00
          </text>
        </g>
      </g>

      {/* PHASE 2 PAYOFF: Smoldering Charred Embers & Distressed SEIZED Stamp */}
      {isPayoff && (
        <g transform="translate(540, 1180)">
          {/* Charred Burned Paper Edges */}
          <rect
            x="-146"
            y="-96"
            width="292"
            height="192"
            rx="10"
            fill="none"
            stroke="#EA580C"
            strokeWidth="8"
            strokeDasharray="22 10"
            opacity={burnEdge}
          />
          <rect
            x="-142"
            y="-92"
            width="284"
            height="184"
            rx="8"
            fill="none"
            stroke="#FEF08A"
            strokeWidth="3"
            strokeDasharray="14 8"
            opacity={burnEdge * 0.85}
          />

          {/* Floating Smoldering Ash / Embers Particles */}
          {Array.from({ length: 16 }).map((_, i) => {
            const rad = (i / 16) * Math.PI * 2;
            const dist = 110 + burnEdge * (40 + pseudoRandom(i * 17) * 90);
            return (
              <circle
                key={i}
                cx={Math.cos(rad) * dist}
                cy={Math.sin(rad) * dist}
                r={2 + pseudoRandom(i * 23) * 3}
                fill={i % 2 === 0 ? '#F59E0B' : '#EF4444'}
                opacity={burnEdge}
              />
            );
          })}

          {/* Distressed Crimson SEIZED Military Stamp Slammed Diagonally */}
          <g transform={`scale(${stampSlam})`}>
            <WeatheredMilitaryStamp
              text="SEIZED"
              subText="CRIMINAL FORFEITURE • U.S. DOJ"
              color="#DC2626"
              rotation={-14}
              slamProgress={stampSlam}
            />
          </g>
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 26: LABELSBANK MONITOR SHATTER FRACTURE (STRUCTURAL_FRACTURE, Payoff: Frame 36)
// ============================================================================
export const LabelsBankMonitorShatterFracture: React.FC<{ durationFrames?: number }> = ({ durationFrames = 104 }) => {

      {/* High-Impact Tempered Monitor Glass Shatter & Seizure Detonation Lines */}
      <g opacity="0.85">
        <path d="M 540 1160 L 360 940 L 280 880" stroke="#EF4444" strokeWidth="4" fill="none" />
        <path d="M 540 1160 L 720 940 L 800 880" stroke="#EF4444" strokeWidth="4" fill="none" />
        <path d="M 540 1160 L 340 1280 L 240 1360" stroke="#DC2626" strokeWidth="3.5" fill="none" />
        <path d="M 540 1160 L 740 1280 L 840 1360" stroke="#DC2626" strokeWidth="3.5" fill="none" />
        <path d="M 540 1160 L 540 880" stroke="#FDE047" strokeWidth="3" fill="none" />
        <path d="M 540 1160 L 540 1440" stroke="#FDE047" strokeWidth="3" fill="none" />
        <path d="M 460 1040 L 400 1080" stroke="#FCA5A5" strokeWidth="2.5" fill="none" />
        <path d="M 620 1040 L 680 1080" stroke="#FCA5A5" strokeWidth="2.5" fill="none" />
        <path d="M 440 1220 L 380 1250" stroke="#FCA5A5" strokeWidth="2.5" fill="none" />
        <path d="M 640 1220 L 700 1250" stroke="#FCA5A5" strokeWidth="2.5" fill="none" />
        <path d="M 380 980 Q 540 920 700 980" stroke="#991B1B" strokeWidth="3" fill="none" />
        <path d="M 360 1320 Q 540 1380 720 1320" stroke="#991B1B" strokeWidth="3" fill="none" />
        <path d="M 480 1120 L 520 1100 L 510 1140 Z" fill="#FFFFFF" />
        <path d="M 600 1120 L 560 1100 L 570 1140 Z" fill="#FFFFFF" />
        <path d="M 520 1200 L 560 1200 L 540 1240 Z" fill="#FDE047" />
        <path d="M 320 1160 L 760 1160" stroke="#B91C1C" strokeWidth="2" strokeDasharray="12 6" fill="none" />
        <path d="M 280 1020 L 320 980 L 300 1060 Z" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1.5" />
        <path d="M 800 1020 L 760 980 L 780 1060 Z" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1.5" />
        <path d="M 260 1260 L 300 1240 L 280 1300 Z" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1.5" />
        <path d="M 820 1260 L 780 1240 L 800 1300 Z" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1.5" />
        <path d="M 500 960 L 540 920 L 580 960 Z" fill="#FEF08A" />
      </g>

  const frame = useCurrentFrame();
  const isPayoff = frame >= 36;
  const shatterSpread = isPayoff ? interpolate(frame - 36, [0, 20], [0, 270], CLAMP) : 0;
  const arcBlast = isPayoff ? interpolate(frame - 36, [0, 6, 20], [0.1, 1.25, 1.0], CLAMP) : 0;
  const stampSlam = isPayoff ? interpolate(frame - 36, [0, 6, 14], [2.2, 0.95, 1.0], CLAMP) : 0;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene26STRUCTURALFRACTURESilhouette color="#7F1D1D" opacity={0.45} scale={1.0} x={80} y={880} />
      {/* High-Impact Tempered Monitor Glass Shatter & Seizure Detonation Lines */}
      <g opacity="0.85">
        <path d="M 540 1160 L 360 940 L 280 880" stroke="#EF4444" strokeWidth="4" fill="none" />
        <path d="M 540 1160 L 720 940 L 800 880" stroke="#EF4444" strokeWidth="4" fill="none" />
        <path d="M 540 1160 L 340 1280 L 240 1360" stroke="#DC2626" strokeWidth="3.5" fill="none" />
        <path d="M 540 1160 L 740 1280 L 840 1360" stroke="#DC2626" strokeWidth="3.5" fill="none" />
        <path d="M 540 1160 L 540 880" stroke="#FDE047" strokeWidth="3" fill="none" />
        <path d="M 540 1160 L 540 1440" stroke="#FDE047" strokeWidth="3" fill="none" />
        <path d="M 460 1040 L 400 1080" stroke="#FCA5A5" strokeWidth="2.5" fill="none" />
        <path d="M 620 1040 L 680 1080" stroke="#FCA5A5" strokeWidth="2.5" fill="none" />
        <path d="M 440 1220 L 380 1250" stroke="#FCA5A5" strokeWidth="2.5" fill="none" />
        <path d="M 640 1220 L 700 1250" stroke="#FCA5A5" strokeWidth="2.5" fill="none" />
        <path d="M 380 980 Q 540 920 700 980" stroke="#991B1B" strokeWidth="3" fill="none" />
        <path d="M 360 1320 Q 540 1380 720 1320" stroke="#991B1B" strokeWidth="3" fill="none" />
        <path d="M 480 1120 L 520 1100 L 510 1140 Z" fill="#FFFFFF" />
        <path d="M 600 1120 L 560 1100 L 570 1140 Z" fill="#FFFFFF" />
        <path d="M 520 1200 L 560 1200 L 540 1240 Z" fill="#FDE047" />
        <path d="M 320 1160 L 760 1160" stroke="#B91C1C" strokeWidth="2" strokeDasharray="12 6" fill="none" />
        <path d="M 280 1020 L 320 980 L 300 1060 Z" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1.5" />
        <path d="M 800 1020 L 760 980 L 780 1060 Z" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1.5" />
        <path d="M 260 1260 L 300 1240 L 280 1300 Z" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1.5" />
        <path d="M 820 1260 L 780 1240 L 800 1300 Z" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1.5" />
        <path d="M 500 960 L 540 920 L 580 960 Z" fill="#FEF08A" />
        <path d="M 450 1150 L 490 1180 L 440 1210 Z" fill="#EF4444" />
        <path d="M 630 1150 L 590 1180 L 640 1210 Z" fill="#EF4444" />
        <path d="M 510 1080 L 570 1080 L 540 1120 Z" fill="#FEF08A" />
        <path d="M 520 1240 L 560 1240 L 540 1270 Z" fill="#F87171" />
      </g>
      <FieryExplosionAura cx={540} cy={1180} rx={480} ry={270} id="monitorShatterAura" />

      {/* Cyber Command Room Desk & Ultra-Wide Curved Monitor Chassis */}
      <g transform="translate(540, 1180)">
        {/* Monitor Heavy Bezel & Stand Plinth */}
        <rect x="-80" y="180" width="160" height="24" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="2" />
        <line x1="0" y1="140" x2="0" y2="180" stroke="#334155" strokeWidth="20" strokeLinecap="round" />

        {/* Curved Monitor Screen Frame */}
        <rect x="-340" y="-210" width="680" height="390" rx="14" fill="#090D12" stroke="#334155" strokeWidth="8" />
        <rect x="-325" y="-195" width="650" height="360" rx="8" fill="#042F2E" />

        {/* LabelsBank.com Header Banner */}
        <rect x="-325" y="-195" width="650" height="50" rx="6" fill="#064E3B" />
        <circle cx="-290" cy="-170" r="12" fill="#10B981" />
        <text x="0" y="-162" textAnchor="middle" fill="#A7F3D0" fontSize="24" fontWeight="900" fontFamily="Montserrat" letterSpacing="0.08em">
          LABELSBANK.COM • MASTER TERMINAL
        </text>

        {/* Active Session & Balance Matrix */}
        <g transform="translate(0, -70)">
          <text x="0" y="0" textAnchor="middle" fill="#34D399" fontSize="36" fontWeight="900" fontFamily="Montserrat">
            $126,480,210.00
          </text>
          <text x="0" y="28" textAnchor="middle" fill="#6EE7B7" fontSize="14" fontWeight="800" fontFamily="Montserrat">
            5,200 REGISTERED BUYERS • ZERO-PAYMENT ROUTED
          </text>
        </g>

        {/* API Debug Terminal Lines */}
        {[-10, 15, 40, 65, 90].map((ly, i) => (
          <text key={i} x="-300" y={ly} fill="#38BDF8" fontSize="12" fontWeight="700" fontFamily="Montserrat">
            {`[NODE_0${i + 1}] USPS ROUTING CRC VERIFIED: TRUE // SESSION ID: 940011189922001482190${i}`}
          </text>
        ))}
      </g>

      {/* PHASE 2 PAYOFF: Monitor Shatters Outward with Federal Seizure Notice */}
      {isPayoff && (
        <g transform="translate(540, 1180)">
          {/* Glass Flying Shards */}
          {Array.from({ length: 18 }).map((_, i) => {
            const angle = (i / 18) * Math.PI * 2;
            const dist = shatterSpread * (0.8 + pseudoRandom(i * 23) * 0.5);
            return (
              <polygon
                key={i}
                points="-16,-22 22,0 -12,26"
                fill="#38BDF8"
                opacity={0.8}
                stroke="#F8FAFC"
                strokeWidth="2"
                transform={`translate(${Math.cos(angle) * dist}, ${Math.sin(angle) * dist}) rotate(${i * 45})`}
              />
            );
          })}

          {/* Core Electrical Arc Flare */}
          <g transform={`scale(${arcBlast})`}>
            <path d={createArcScallopedCloud(160, 9, [1.0, 1.25, 0.9, 1.3, 1.1, 0.85, 1.2, 1.0, 1.15], frame * 0.2)} fill="#DC2626" opacity={0.8} />
            <path d={create8PointedStarPath(110)} fill="#FEF08A" />
          </g>

          {/* Federal Seizure Rubber Stamp */}
          <g transform={`scale(${stampSlam})`}>
            <WeatheredMilitaryStamp text="DOMAIN SEIZED" subText="BY USPIS & U.S. DOJ" color="#DC2626" rotation={-5} slamProgress={stampSlam} />
          </g>
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 27: DARK CELL IRON BARS LEADER (LONE_LEADER, Payoff: Frame 35)
// ============================================================================
export const DarkCellIronBarsLeader: React.FC<{ durationFrames?: number }> = ({ durationFrames = 105 }) => {
  const frame = useCurrentFrame();
  const isPayoff = frame >= 35;
  const barsSlide = isPayoff ? interpolate(frame - 35, [0, 8], [420, 0], CLAMP) : 420;
  const barImpact = isPayoff ? interpolate(frame - 35, [8, 12, 22], [1, 0.4, 0], CLAMP) : 0;
  const dust = driftOffsetPx(frame, 3);
  const breathing = Math.sin(frame * 0.12) * 2;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene27LONELEADERSilhouette color="#1E1B4B" opacity={0.45} scale={1.0} x={100} y={880} />
      <defs>
        <linearGradient id="moonlightShaft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.4} />
          <stop offset="40%" stopColor="#0284C7" stopOpacity={0.2} />
          <stop offset="80%" stopColor="#1E3A8A" stopOpacity={0.08} />
          <stop offset="100%" stopColor="#0B132B" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="ironBarMetal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#090D12" />
          <stop offset="35%" stopColor="#475569" />
          <stop offset="65%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#04070D" />
        </linearGradient>
      </defs>

      <FederalNavyAura cx={540} cy={1180} rx={480} ry={270} id="darkCellAura" />

      {/* Brutalist Hand-Carved Stone Masonry Cell Walls */}
      <g stroke="#182234" strokeWidth="2.5">
        <rect x="80" y="860" width="920" height="630" fill="#0A0F1D" stroke="#1E293B" strokeWidth="4" />
        {[910, 965, 1020, 1075, 1130, 1185, 1240, 1295, 1350, 1405, 1460].map((y, rowIdx) => (
          <g key={y}>
            <line x1="80" y1={y} x2="1000" y2={y} stroke="#162032" strokeWidth="3" />
            {Array.from({ length: 10 }).map((_, colIdx) => {
              const bx = 80 + colIdx * 92 + (rowIdx % 2 === 0 ? 0 : 46);
              return <line key={colIdx} x1={bx} y1={y} x2={bx} y2={y + 55} stroke="#101826" strokeWidth="2" />;
            })}
          </g>
        ))}
      </g>

      {/* High Barred Cell Window Slit casting Cool Volumetric Moonlight Shaft */}
      <g transform="translate(180, 870)">
        {/* Recessed Window Aperture */}
        <rect x="0" y="0" width="120" height="65" rx="4" fill="#0284C7" stroke="#334155" strokeWidth="3" opacity={0.6} />
        {[30, 60, 90].map((wx) => (
          <line key={wx} x1={wx} y1="0" x2={wx} y2="65" stroke="#0F172A" strokeWidth="4" />
        ))}
        {/* Volumetric Blue Moonlight Shaft Slicing Down onto Floor */}
        <polygon points="0,65 120,65 740,610 380,610" fill="url(#moonlightShaft)" />
      </g>

      {/* Floating Silver Dust Motes in the Moonlight Beam */}
      {[
        { cx: 320, cy: 990, r: 2.5 },
        { cx: 420, cy: 1080, r: 3.5 },
        { cx: 480, cy: 1190, r: 2 },
        { cx: 560, cy: 1280, r: 3 },
        { cx: 360, cy: 1240, r: 2.2 },
        { cx: 620, cy: 1360, r: 2.8 },
      ].map((d, i) => (
        <circle key={i} cx={d.cx + Math.sin(frame * 0.08 + i) * 12} cy={d.cy + dust * 0.4} r={d.r} fill="#F8FAFC" opacity={0.65} />
      ))}

      {/* Heavy Concrete Prison Plinth Sleeping Bench */}
      <g transform="translate(420, 1310)">
        {/* Poured Concrete Plinth Base */}
        <rect x="-80" y="0" width="480" height="110" rx="4" fill="#151E2E" stroke="#253248" strokeWidth="3" />
        <rect x="-80" y="0" width="480" height="18" fill="#253248" />
        {/* Rolled Coarse Prison Blanket */}
        <ellipse cx="340" cy="-12" rx="35" ry="16" fill="#334155" stroke="#1E293B" strokeWidth="2" />
      </g>

      {/* Solitary Seated Silhouette of Faheem Akram with Head in Hands (Despair) */}
      <g transform={`translate(520, ${1190 + breathing})`}>
        {/* Seated Lower Body & Cloth Folds */}
        <path
          d="M -40 120
             L -45 50
             L -30 20
             L 30 20
             L 45 60
             L 40 120 Z"
          fill="#090D12"
          stroke="#1E293B"
          strokeWidth="2.5"
        />

        {/* Hunched Torso with Deeply Curved Spine */}
        <path
          d="M -30 20
             C -45 -10, -35 -40, -10 -60
             C 15 -60, 30 -35, 25 20
             Z"
          fill="#090D12"
          stroke="#1E293B"
          strokeWidth="2.5"
        />

        {/* Head Slumped Forward Resting in Cupped Hands */}
        <ellipse cx="8" cy="-55" rx="26" ry="24" fill="#090D12" />
        {/* Cupped Hands Supporting Face */}
        <path
          d="M -15 -40
             C -20 -50, -5 -65, 10 -65
             C 25 -65, 30 -50, 22 -40 Z"
          fill="#040608"
        />

        {/* Elbows Resting Firmly on Knees */}
        {/* Left Arm */}
        <path
          d="M -20 -35
             C -35 -15, -45 10, -35 30
             L -20 20
             L -10 -25 Z"
          fill="#090D12"
        />
        {/* Right Arm */}
        <path
          d="M 15 -35
             C 30 -15, 40 10, 32 30
             L 18 20
             L 8 -25 Z"
          fill="#090D12"
        />

        {/* Cool Moonlit Rim Highlight on Curved Spine & Shoulders */}
        <path
          d="M -24 -55 C -42 -20, -36 5, -28 35"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity={0.7}
        />
      </g>

      {/* PHASE 2 PAYOFF: Heavy Cold-Rolled Vertical Iron Prison Bars Slam Shut */}
      <g transform={`translate(${barsSlide}, 0)`}>
        {/* 8 Massive Cold-Rolled Cylindrical Pitted Iron Bars */}
        {[180, 280, 380, 480, 580, 680, 780, 880].map((bx, i) => (
          <g key={i}>
            <line x1={bx} y1="860" x2={bx} y2="1490" stroke="url(#ironBarMetal)" strokeWidth="22" />
            <line x1={bx - 4} y1="860" x2={bx - 4} y2="1490" stroke="#64748B" strokeWidth="4" />
            <line x1={bx + 6} y1="860" x2={bx + 6} y2="1490" stroke="#04070D" strokeWidth="4" />
          </g>
        ))}

        {/* Horizontal Forged Structural Crossbar Clamps with Heavy Rivets */}
        {[1020, 1340].map((cy, idx) => (
          <g key={idx}>
            <rect x="80" y={cy} width="920" height="30" rx="4" fill="#18181B" stroke="#475569" strokeWidth="3" />
            {/* Forged Round Rivet Heads */}
            {[180, 280, 380, 480, 580, 680, 780, 880].map((rx, ri) => (
              <circle key={ri} cx={rx} cy={cy + 15} r="6" fill="#94A3B8" stroke="#0F172A" strokeWidth="1.5" />
            ))}
          </g>
        ))}

        {/* Heavy Forged Iron Padlock & Chain Links (Lock Receiver) */}
        <g transform="translate(480, 1180)">
          {/* Iron Padlock Body */}
          <rect x="-24" y="-10" width="48" height="52" rx="8" fill="#18181B" stroke="#64748B" strokeWidth="3" />
          {/* Hardened Steel Shackle */}
          <path d="M -15 -10 L -15 -35 Q 0 -50 15 -35 L 15 -10" fill="none" stroke="#94A3B8" strokeWidth="7" />
          {/* Keyhole */}
          <circle cx="0" cy="12" r="5" fill="#090D12" />
          <polygon points="-3,14 3,14 2,24 -2,24" fill="#090D12" />
        </g>
      </g>

      {/* Impact Dust Shockwave when Bars Slam Shut */}
      {isPayoff && barImpact > 0 && (
        <g opacity={barImpact}>
          <circle cx="480" cy="1180" r="140" fill="none" stroke="#F8FAFC" strokeWidth="4" strokeDasharray="14 10" />
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SCENE 28: KHANEWAL ROOFTOP LOOP SPLIT (SPLIT_CONFRONTATION, Epilogue Seamless Loop, Payoff: Frame 34)
// ============================================================================
export const KhanewalRooftopLoopSplit: React.FC<{ durationFrames?: number }> = ({ durationFrames = 132 }) => {
  const frame = useCurrentFrame();
  const isPayoff = frame >= 34;
  const loopFade = isPayoff ? interpolate(frame - 34, [0, 20], [0.4, 1.0], CLAMP) : 0.4;
  const sunburstRot = (frame * 0.16) % 360;
  const windFlutter = Math.sin(frame * 0.2) * 4;

  return (
    <svg viewBox="0 0 1080 1920" className="w-full h-full">
      <Scene28SPLITCONFRONTATIONSilhouette color="#9A3412" opacity={0.4} scale={1.0} x={80} y={880} />
      <defs>
        <radialGradient id="loopSunburstAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EA580C" stopOpacity={0.7} />
          <stop offset="40%" stopColor="#9A3412" stopOpacity={0.4} />
          <stop offset="80%" stopColor="#431407" stopOpacity={0.15} />
          <stop offset="100%" stopColor="#1C1917" stopOpacity={0} />
        </radialGradient>
        <pattern id="jaliPatternScene28" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#431407" />
          <polygon points="8,1 15,8 8,15 1,8" fill="#1C1917" stroke="#7C2D12" strokeWidth="0.8" />
        </pattern>
      </defs>

      <TerracottaAtmosphericAura cx={540} cy={1180} rx={480} ry={270} id="loopHeroAura" />

      {/* Rotating Tactile Sunburst Paper Rays (Harmonizing with Scene 1 Frame 0) */}
      <g transform={`translate(540, 1180) rotate(${sunburstRot})`} opacity={0.28}>
        {Array.from({ length: 16 }).map((_, i) => (
          <polygon
            key={i}
            points="0,0 -35,-520 35,-520"
            fill="#F59E0B"
            transform={`rotate(${(i / 16) * 360})`}
          />
        ))}
      </g>

      {/* Distant Punjab Rooftops & Minarets at Twilight */}
      <g opacity={0.35} fill="#2D120B">
        <rect x="80" y="1180" width="80" height="100" />
        <polygon points="120,1130 105,1180 135,1180" />
        <rect x="250" y="1200" width="110" height="80" />
        <rect x="760" y="1170" width="95" height="110" />
        <polygon points="808,1120 794,1170 822,1170" />
      </g>

      {/* Return to Khanewal Parapet Wall (Exact Match to Scene 1 Architecture) */}
      <g transform="translate(0, 0)">
        {/* Parapet Foundation */}
        <rect x="80" y="1260" width="920" height="230" fill="#5F1E0C" stroke="#3D1408" strokeWidth="3" />
        {/* Stepped Parapet Coping Stones */}
        <rect x="70" y="1248" width="940" height="14" fill="#7C2D12" stroke="#431407" strokeWidth="2" />
        <rect x="75" y="1242" width="930" height="8" fill="#9A3412" />

        {/* Hand-Molded Brick Courses with Recessed Mortar Joints */}
        {[1275, 1295, 1315, 1335, 1355, 1375, 1395, 1415, 1435, 1455, 1475].map((y, rowIdx) => (
          <g key={y}>
            <line x1="80" y1={y} x2="1000" y2={y} stroke="#381308" strokeWidth="2" />
            {Array.from({ length: 18 }).map((_, colIdx) => {
              const bx = 80 + colIdx * 52 + (rowIdx % 2 === 0 ? 0 : 26);
              return <line key={colIdx} x1={bx} y1={y} x2={bx} y2={y + 20} stroke="#381308" strokeWidth="1.5" />;
            })}
          </g>
        ))}

        {/* Decorative Pierced Brick Jali Lattice Vent (Left Side) */}
        <rect x="140" y="1300" width="130" height="64" rx="4" fill="url(#jaliPatternScene28)" stroke="#852D16" strokeWidth="2.5" />
      </g>

      {/* Industrial Water Tank on Angle-Iron Stanchion Tower */}
      <g transform="translate(140, 1030)">
        <line x1="20" y1="120" x2="20" y2="230" stroke="#3D1408" strokeWidth="5" />
        <line x1="100" y1="120" x2="100" y2="230" stroke="#3D1408" strokeWidth="5" />
        <line x1="20" y1="135" x2="100" y2="215" stroke="#431407" strokeWidth="3" />
        <line x1="20" y1="215" x2="100" y2="135" stroke="#431407" strokeWidth="3" />
        <line x1="108" y1="10" x2="108" y2="230" stroke="#78350F" strokeWidth="2.5" />
        {[20, 45, 70, 95, 120, 150, 180, 210].map((ly) => (
          <line key={ly} x1="100" y1={ly} x2="116" y2={ly} stroke="#78350F" strokeWidth="2" />
        ))}
        <rect x="10" y="10" width="100" height="115" rx="10" fill="#3A1E14" stroke="#7C2D12" strokeWidth="3" />
        <line x1="10" y1="50" x2="110" y2="50" stroke="#5F1E0C" strokeWidth="2.5" />
        <line x1="10" y1="85" x2="110" y2="85" stroke="#5F1E0C" strokeWidth="2.5" />
        <path d="M 25 10 Q 60 -8 95 10 Z" fill="#5F1E0C" stroke="#7C2D12" strokeWidth="2" />
      </g>

      {/* Sagging Utility Cables with Ceramic Spool Insulators */}
      <g stroke="#18181B" fill="none">
        <path d="M 0 940 Q 320 980 620 930" strokeWidth="3" />
        <path d="M 100 960 Q 420 1020 780 950" strokeWidth="2" />
      </g>

      {/* THE POETIC ABSENCE: Empty Spindle Chair, Closed Laptop, Cold Chai Glass */}
      <g transform="translate(540, 1140)">
        {/* Empty Punjabi Wooden Spindle Chair */}
        <g stroke="#1E1714" strokeWidth="4" fill="none">
          <line x1="-30" y1="140" x2="-26" y2="60" />
          <line x1="30" y1="140" x2="26" y2="60" />
          <line x1="-28" y1="105" x2="28" y2="105" strokeWidth="3" />
          <line x1="-26" y1="60" x2="-32" y2="-20" strokeWidth="5" />
          <line x1="-18" y1="55" x2="-22" y2="-15" strokeWidth="2.5" />
          <line x1="-10" y1="55" x2="-14" y2="-15" strokeWidth="2.5" />
          <path d="M -38 -20 Q -23 -30 -8 -20" stroke="#3D291F" strokeWidth="6" strokeLinecap="round" />
          <rect x="-34" y="55" width="68" height="14" rx="3" fill="#2E1F17" stroke="#4D3426" strokeWidth="2" />
        </g>

        {/* Small Tea Table with Closed Silver Laptop & Cold Chai */}
        <g transform="translate(95, 25)">
          <rect x="-40" y="30" width="80" height="85" rx="3" fill="#29180E" stroke="#1E1714" strokeWidth="2.5" />
          <line x1="-40" y1="30" x2="40" y2="30" stroke="#5A3E2D" strokeWidth="3" />

          {/* Closed Silver Laptop Covered in a Thin Film of Dust */}
          <rect x="-28" y="22" width="56" height="8" rx="2" fill="#94A3B8" stroke="#334155" strokeWidth="1.5" />
          <line x1="-24" y1="26" x2="24" y2="26" stroke="#CBD5E1" strokeWidth="1" />

          {/* Cold, Abandoned Chai Glass (No Steam) */}
          <polygon points="18,30 32,30 30,12 20,12" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />

          {/* Stray Deed Document Fluttering in the Evening Breeze */}
          <polygon
            points={`-20,20 -5,${18 + windFlutter} 8,${22 - windFlutter} -8,25`}
            fill="#FEF3C7"
            stroke="#D97706"
            strokeWidth="1"
          />
        </g>
      </g>

      {/* PHASE 2 PAYOFF: Completed 8-Step Dan Harmon Story Circle Emblem */}
      {isPayoff && (
        <g transform="translate(540, 940)" opacity={loopFade}>
          {/* Glowing Golden Circular Orbit */}
          <circle r="95" fill="#0C0A08" stroke="#F59E0B" strokeWidth="4" />
          <circle r="95" fill="none" stroke="#FEF08A" strokeWidth="2" strokeDasharray="10 8" />

          {/* 8 Connected Golden Story Circle Nodes Glowing Consecutively */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            return (
              <g key={i} transform={`translate(${Math.cos(angle) * 95}, ${Math.sin(angle) * 95})`}>
                <circle r="12" fill="#7C2D12" stroke="#FEF08A" strokeWidth="2.5" />
                <text x="0" y="4" textAnchor="middle" fill="#FEF08A" fontSize="10" fontWeight="900" fontFamily="Montserrat">
                  {i + 1}
                </text>
              </g>
            );
          })}

          {/* Narrative Closure Badge */}
          <text x="0" y="-8" textAnchor="middle" fill="#FEF08A" fontSize="14" fontWeight="900" fontFamily="Montserrat" letterSpacing="0.08em">
            THE CIRCLE
          </text>
          <text x="0" y="12" textAnchor="middle" fill="#CBD5E1" fontSize="11" fontWeight="800" fontFamily="Montserrat">
            1 ➔ 8 CLOSES
          </text>
        </g>
      )}
    </svg>
  );
};
