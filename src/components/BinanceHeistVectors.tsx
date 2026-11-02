import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { loadFont as loadMontserrat } from '@remotion/google-fonts/Montserrat';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import {
  DPRK_BORDER_PATH,
  ROK_BORDER_PATH,
  DMZ_BORDER_LINE,
  KOREA_CITIES,
} from './KoreaGeoData';

const montserrat = loadMontserrat('normal', { weights: ['800', '900'], subsets: ['latin'] });
const inter = loadInter('normal', { weights: ['800', '900'], subsets: ['latin'] });

/**
 * Procedural Deterministic Pseudo-Random Generator (Seed-Based)
 * Ensures 100% frame determinism across all Remotion renders without Math.random()
 */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * 6-Layer Organic Explosion Scalloped Lobe Generator
 */
function createOrganicBlastLobe(
  baseRadius: number,
  lobeCount: number,
  radiiScale: number[],
  wobble: number = 0
): string {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < lobeCount; i++) {
    const angle = (i / lobeCount) * Math.PI * 2 - Math.PI / 2;
    const r =
      baseRadius * (radiiScale[i % radiiScale.length] || 1.0) +
      Math.sin(angle * 2.5 + wobble) * 6;
    points.push({
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r,
    });
  }

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)} `;
  for (let i = 0; i < lobeCount; i++) {
    const next = points[(i + 1) % lobeCount];
    const curr = points[i];
    const dx = next.x - curr.x;
    const dy = next.y - curr.y;
    const dist = Math.hypot(dx, dy);
    const arcR = (dist * 0.62).toFixed(1);
    d += `A ${arcR} ${arcR} 0 0 1 ${next.x.toFixed(1)} ${next.y.toFixed(1)} `;
  }
  d += 'Z';
  return d;
}

// =========================================================================
// =========================================================================
// 1. SCENE 01: BINANCE_ALERT_QUOTE_CARD (Quote Hook)
// Monumental Cyber Vault Breach & Disintegrating $6B Liquidity Evaporation
// =========================================================================
const VANISHING_TOKENS = [
  { angle: 0.15, speed: 7.2, size: 24, type: 'COIN', rot: 45 },
  { angle: 0.58, speed: 8.8, size: 28, type: 'HEX', rot: 110 },
  { angle: 1.05, speed: 6.8, size: 20, type: 'BAR', rot: 25 },
  { angle: 1.52, speed: 9.4, size: 26, type: 'COIN', rot: 190 },
  { angle: 1.98, speed: 7.9, size: 30, type: 'HEX', rot: 75 },
  { angle: 2.45, speed: 6.5, size: 18, type: 'BAR', rot: 310 },
  { angle: 2.95, speed: 8.9, size: 25, type: 'COIN', rot: 140 },
  { angle: 3.42, speed: 7.4, size: 22, type: 'HEX', rot: 220 },
  { angle: 3.90, speed: 9.8, size: 28, type: 'COIN', rot: 60 },
  { angle: 4.38, speed: 6.9, size: 20, type: 'BAR', rot: 170 },
  { angle: 4.85, speed: 8.4, size: 26, type: 'HEX', rot: 290 },
  { angle: 5.32, speed: 7.6, size: 22, type: 'COIN', rot: 80 },
  { angle: 5.80, speed: 9.1, size: 24, type: 'HEX', rot: 160 },
  { angle: 0.38, speed: 10.5, size: 14, type: 'SHARD', rot: 15 },
  { angle: 2.20, speed: 11.2, size: 15, type: 'SHARD', rot: 135 },
  { angle: 3.65, speed: 10.8, size: 13, type: 'SHARD', rot: 245 },
  { angle: 5.05, speed: 11.6, size: 16, type: 'SHARD', rot: 320 },
  { angle: 1.25, speed: 10.0, size: 14, type: 'SHARD', rot: 95 },
];

export const BinanceAlertQuoteCard: React.FC = () => {
  const frame = useCurrentFrame();

  // Timing coordinates: Hit occurs at frame 29 (bass drop & "SIX BILLION DOLLARS VANISHED" slam)
  const breachProgress = interpolate(frame, [25, 36], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const doorSplit = breachProgress * 85; // Doors separate by 85px each side
  const shockProgress = interpolate(frame, [29, 68], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockRadius = 70 + shockProgress * 420;
  const shockOpacity = interpolate(shockProgress, [0, 0.2, 1], [0.95, 0.85, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const shockProgress2 = interpolate(frame, [34, 76], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockRadius2 = 50 + shockProgress2 * 360;
  const shockOpacity2 = interpolate(shockProgress2, [0, 0.25, 1], [0.75, 0.6, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Vertical liquidity column drain: from 100% full (380px) down to 0px
  const liquidDrainH = interpolate(frame, [0, 36], [380, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Pulse & alarm oscillations
  const alarmPulse = 0.75 + 0.25 * Math.sin(frame * 0.28);
  const gearRot = frame * 0.35;
  const redAlertStrobe = frame >= 28 && Math.sin(frame * 0.5) > 0;

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <defs>
        {/* Catastrophic Decompression Emergency Aura */}
        <radialGradient id="vaultBreachAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity={frame >= 28 ? 0.35 : 0.15} />
          <stop offset="60%" stopColor="#38BDF8" stopOpacity={frame < 28 ? 0.12 : 0.04} />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>

        {/* Liquid Gold/Liquidity Fill Gradient */}
        <linearGradient id="liquidityFillGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>

        {/* Golden Treasury Seal Gradient */}
        <radialGradient id="treasuryGoldGrad" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="45%" stopColor="#F59E0B" />
          <stop offset="85%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#78350F" />
        </radialGradient>

        {/* Metallic Titanium Vault Door Gradient */}
        <linearGradient id="vaultTitaniumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="50%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
      </defs>

      {/* Volumetric Center Aura */}
      <circle cx="540" cy="1180" r="440" fill="url(#vaultBreachAura)" />

      {/* ================================================================= */}
      {/* 1. TACTICAL DOSSIER TELEMETRY HUD (Upper/Lower Safe-Zone Accents) */}
      {/* ================================================================= */}
      <g transform="translate(180, 890)">
        <rect
          x="0"
          y="0"
          width="720"
          height="46"
          rx="6"
          fill="#0B1310"
          stroke="#16221E"
          strokeWidth="2"
        />
        {/* Pulsing Alert Indicators */}
        <circle cx="28" cy="23" r="7" fill="#EF4444" opacity={alarmPulse} />
        <circle cx="50" cy="23" r="5" fill="#F59E0B" />
        <circle cx="70" cy="23" r="5" fill="#38BDF8" />

        {/* Telemetry Status Line */}
        <text
          x="94"
          y="29"
          fill="#ECFDF5"
          fontFamily="Montserrat, sans-serif"
          fontSize="17"
          fontWeight="800"
          letterSpacing="0.12em"
        >
          {frame < 29
            ? 'PRIMARY RESERVE VAULT · RAPID OUTFLOW IN PROGRESS'
            : 'ALERT: VAULT INTEGRITY COLLAPSED · $6,000,000,000 EVAPORATED'}
        </text>

        {/* Top Outflow Speed Bar */}
        <rect
          x="12"
          y="41"
          width={interpolate(frame, [0, 36], [696, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })}
          height="3"
          fill={frame < 29 ? '#38BDF8' : '#EF4444'}
          opacity="0.9"
        />
      </g>

      {/* ================================================================= */}
      {/* 2. DUAL VERTICAL LIQUIDITY RESERVOIR COLUMNS (Visual Outflow Drain) */}
      {/* ================================================================= */}
      {/* Left Column (x = 180) */}
      <g transform="translate(180, 960)">
        {/* Column Casing */}
        <rect
          x="0"
          y="0"
          width="42"
          height="400"
          rx="8"
          fill="#090D12"
          stroke="#162636"
          strokeWidth="3"
        />
        {/* Interior Draining Fluid Column */}
        <rect
          x="6"
          y={400 - 6 - liquidDrainH}
          width="30"
          height={liquidDrainH}
          rx="4"
          fill="url(#liquidityFillGrad)"
          opacity="0.88"
        />
        {/* Tick Marks & Level Indicators */}
        {[0.2, 0.4, 0.6, 0.8].map((pct, i) => (
          <line
            key={i}
            x1="2"
            y1={400 * pct}
            x2="12"
            y2={400 * pct}
            stroke="#ECFDF5"
            strokeWidth="2"
            opacity="0.35"
          />
        ))}
        {/* Empty Warning Indicator */}
        {liquidDrainH < 20 && (
          <text
            x="21"
            y="378"
            fill="#EF4444"
            fontFamily="Montserrat, sans-serif"
            fontSize="12"
            fontWeight="900"
            textAnchor="middle"
            opacity={redAlertStrobe ? 1 : 0.3}
          >
            DEPLETED
          </text>
        )}
      </g>

      {/* Right Column (x = 858) */}
      <g transform="translate(858, 960)">
        {/* Column Casing */}
        <rect
          x="0"
          y="0"
          width="42"
          height="400"
          rx="8"
          fill="#090D12"
          stroke="#162636"
          strokeWidth="3"
        />
        {/* Interior Draining Fluid Column */}
        <rect
          x="6"
          y={400 - 6 - liquidDrainH}
          width="30"
          height={liquidDrainH}
          rx="4"
          fill="url(#liquidityFillGrad)"
          opacity="0.88"
        />
        {/* Tick Marks & Level Indicators */}
        {[0.2, 0.4, 0.6, 0.8].map((pct, i) => (
          <line
            key={i}
            x1="30"
            y1={400 * pct}
            x2="40"
            y2={400 * pct}
            stroke="#ECFDF5"
            strokeWidth="2"
            opacity="0.35"
          />
        ))}
        {/* Empty Warning Indicator */}
        {liquidDrainH < 20 && (
          <text
            x="21"
            y="378"
            fill="#EF4444"
            fontFamily="Montserrat, sans-serif"
            fontSize="12"
            fontWeight="900"
            textAnchor="middle"
            opacity={redAlertStrobe ? 1 : 0.3}
          >
            0.00
          </text>
        )}
      </g>

      {/* ================================================================= */}
      {/* 3. DYNAMIC SHOCKWAVE / IONIZATION RIMS (Triggered on frame 29 Slam) */}
      {/* ================================================================= */}
      {frame >= 29 && (
        <>
          <circle
            cx="540"
            cy="1180"
            r={shockRadius}
            fill="none"
            stroke="#EF4444"
            strokeWidth="5"
            opacity={shockOpacity}
          />
          <circle
            cx="540"
            cy="1180"
            r={shockRadius2}
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3"
            opacity={shockOpacity2}
          />
        </>
      )}

      {/* ================================================================= */}
      {/* 4. MONUMENTAL VAULT PERIMETER GEAR & TUNGSTEN DEADBOLT RING */}
      {/* ================================================================= */}
      <g transform="translate(540, 1180)">
        {/* Outer Heavy Steel Housing */}
        <circle
          cx="0"
          cy="0"
          r="215"
          fill="none"
          stroke="#16221E"
          strokeWidth="24"
        />
        <circle
          cx="0"
          cy="0"
          r="228"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="3"
          opacity="0.5"
        />

        {/* Rotating Concentric Gear Ring */}
        <g transform={`rotate(${gearRot})`}>
          {Array.from({ length: 24 }).map((_, idx) => {
            const rot = idx * 15;
            return (
              <rect
                key={idx}
                x="-8"
                y="-235"
                width="16"
                height="18"
                rx="3"
                fill="#1E293B"
                stroke="#38BDF8"
                strokeWidth="1.5"
                transform={`rotate(${rot})`}
              />
            );
          })}
        </g>

        {/* 12 Tungsten Retractable Deadbolts */}
        {Array.from({ length: 12 }).map((_, idx) => {
          const rot = idx * 30;
          const boltOffset = interpolate(frame, [25, 34], [0, 22], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <rect
              key={idx}
              x="-12"
              y={-195 - boltOffset}
              width="24"
              height="38"
              rx="4"
              fill={frame >= 28 ? '#EF4444' : '#64748B'}
              stroke="#ECFDF5"
              strokeWidth="2"
              transform={`rotate(${rot})`}
            />
          );
        })}
      </g>

      {/* ================================================================= */}
      {/* 5. HOLLOW VAULT INTERIOR CAVITY (Exposed Void upon Breach) */}
      {/* ================================================================= */}
      <g transform="translate(540, 1180)">
        {/* Cavernous Hollow Chamber */}
        <circle cx="0" cy="0" r="170" fill="#040608" />
        <circle
          cx="0"
          cy="0"
          r="165"
          fill="none"
          stroke="#EF4444"
          strokeWidth="2"
          strokeDasharray="8 8"
          opacity={alarmPulse}
        />

        {/* Evaporated Void Iconography */}
        {frame >= 28 && (
          <g opacity={interpolate(frame, [28, 42], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
            {/* Warning Diamond */}
            <polygon
              points="0,-48 48,0 0,48 -48,0"
              fill="#EF4444"
              opacity="0.25"
            />
            <polygon
              points="0,-48 48,0 0,48 -48,0"
              fill="none"
              stroke="#EF4444"
              strokeWidth="3"
            />
            <text
              x="0"
              y="10"
              fill="#ECFDF5"
              fontFamily="Montserrat, sans-serif"
              fontSize="28"
              fontWeight="900"
              textAnchor="middle"
            >
              $0
            </text>
          </g>
        )}
      </g>

      {/* ================================================================= */}
      {/* 6. FRACTURED SPLIT VAULT DOORS (Separating left/right at frame 29) */}
      {/* ================================================================= */}
      {/* Left Door Half */}
      <g transform={`translate(${540 - doorSplit}, 1180)`}>
        <path
          d="M 0 -170 A 170 170 0 0 0 0 170 L -10 120 L 15 60 L -15 -10 L 12 -80 L 0 -170 Z"
          fill="url(#vaultTitaniumGrad)"
          stroke={frame >= 28 ? '#EF4444' : '#38BDF8'}
          strokeWidth="3.5"
        />
        {/* Concentric Cryptographic Tumbler Notches */}
        <circle cx="0" cy="0" r="110" fill="none" stroke="#16221E" strokeWidth="6" />
        <line x1="-140" y1="0" x2="-40" y2="0" stroke="#ECFDF5" strokeWidth="2.5" opacity="0.6" />
        <line x1="-120" y1="-60" x2="-50" y2="-20" stroke="#ECFDF5" strokeWidth="2.5" opacity="0.6" />
        <line x1="-120" y1="60" x2="-50" y2="20" stroke="#ECFDF5" strokeWidth="2.5" opacity="0.6" />
      </g>

      {/* Right Door Half */}
      <g transform={`translate(${540 + doorSplit}, 1180)`}>
        <path
          d="M 0 -170 A 170 170 0 0 1 0 170 L -10 120 L 15 60 L -15 -10 L 12 -80 L 0 -170 Z"
          fill="url(#vaultTitaniumGrad)"
          stroke={frame >= 28 ? '#EF4444' : '#38BDF8'}
          strokeWidth="3.5"
        />
        {/* Concentric Cryptographic Tumbler Notches */}
        <circle cx="0" cy="0" r="110" fill="none" stroke="#16221E" strokeWidth="6" />
        <line x1="140" y1="0" x2="40" y2="0" stroke="#ECFDF5" strokeWidth="2.5" opacity="0.6" />
        <line x1="120" y1="-60" x2="50" y2="-20" stroke="#ECFDF5" strokeWidth="2.5" opacity="0.6" />
        <line x1="120" y1="60" x2="50" y2="20" stroke="#ECFDF5" strokeWidth="2.5" opacity="0.6" />
      </g>

      {/* Central Fracture Lightning Seam */}
      {frame >= 26 && frame < 48 && (
        <path
          d="M 540 1010 L 532 1080 L 552 1140 L 528 1210 L 548 1280 L 540 1350"
          fill="none"
          stroke="#EF4444"
          strokeWidth={frame >= 29 ? 6 : 3}
          opacity={alarmPulse}
        />
      )}

      {/* ================================================================= */}
      {/* 7. DISINTEGRATING WEALTH PARTICLES (The $6B Vanishing Explosion) */}
      {/* ================================================================= */}
      <g>
        {VANISHING_TOKENS.map((token, idx) => {
          // Pre-breach: trembling in center; Post-breach: exploding & evaporating into red smoke
          let dist: number;
          let alpha: number;
          let scale: number;
          let rotAngle = token.rot + frame * (token.speed * 0.75);

          if (frame < 28) {
            dist = 25 + 12 * Math.sin(frame * 0.3 + idx);
            alpha = 0.95;
            scale = 1.0;
          } else {
            const expProgress = interpolate(frame, [28, 70], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            dist = 40 + expProgress * token.speed * 32;
            alpha = interpolate(frame, [28, 38, 58, 72], [1, 0.95, 0.45, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            scale = interpolate(frame, [28, 70], [1.1, 0.25], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
          }

          if (alpha <= 0.01) return null;

          const px = 540 + Math.cos(token.angle) * dist;
          const py = 1180 + Math.sin(token.angle) * dist * 0.88;

          return (
            <g
              key={idx}
              transform={`translate(${px}, ${py}) rotate(${rotAngle}) scale(${scale})`}
              opacity={alpha}
            >
              {token.type === 'COIN' && (
                <>
                  <circle
                    cx="0"
                    cy="0"
                    r={token.size / 2}
                    fill={frame < 29 ? 'url(#treasuryGoldGrad)' : '#EF4444'}
                    stroke="#ECFDF5"
                    strokeWidth="2"
                  />
                  <text
                    x="0"
                    y={token.size * 0.22}
                    fill="#0B1310"
                    fontFamily="Montserrat, sans-serif"
                    fontSize={token.size * 0.65}
                    fontWeight="900"
                    textAnchor="middle"
                  >
                    $
                  </text>
                </>
              )}

              {token.type === 'HEX' && (
                <polygon
                  points={`0,-${token.size / 2} ${token.size * 0.45},-${token.size * 0.25} ${token.size * 0.45},${token.size * 0.25} 0,${token.size / 2} -${token.size * 0.45},${token.size * 0.25} -${token.size * 0.45},-${token.size * 0.25}`}
                  fill={frame < 29 ? '#38BDF8' : '#EF4444'}
                  stroke="#ECFDF5"
                  strokeWidth="2"
                />
              )}

              {token.type === 'BAR' && (
                <rect
                  x={-token.size * 0.6}
                  y={-token.size * 0.3}
                  width={token.size * 1.2}
                  height={token.size * 0.6}
                  rx="2"
                  fill={frame < 29 ? 'url(#treasuryGoldGrad)' : '#EF4444'}
                  stroke="#FDE047"
                  strokeWidth="1.5"
                />
              )}

              {token.type === 'SHARD' && (
                <polygon
                  points={`0,-${token.size} ${token.size * 0.4},0 0,${token.size} -${token.size * 0.4},0`}
                  fill={frame < 29 ? '#ECFDF5' : '#EF4444'}
                  opacity="0.9"
                />
              )}
            </g>
          );
        })}
      </g>

      {/* ================================================================= */}
      {/* 8. BOTTOM LIQUIDATION METER (Reinforcing Outflow to Zero) */}
      {/* ================================================================= */}
      <g transform="translate(240, 1420)">
        <rect
          x="0"
          y="0"
          width="600"
          height="32"
          rx="4"
          fill="#0B1310"
          stroke="#16221E"
          strokeWidth="2"
        />
        {/* Draining Progress Meter */}
        <rect
          x="4"
          y="4"
          width={interpolate(frame, [0, 36], [592, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })}
          height="24"
          rx="2"
          fill={frame < 28 ? 'url(#liquidityFillGrad)' : '#EF4444'}
          opacity="0.9"
        />
        <text
          x="300"
          y="22"
          fill="#ECFDF5"
          fontFamily="Montserrat, sans-serif"
          fontSize="14"
          fontWeight="800"
          letterSpacing="0.1em"
          textAnchor="middle"
        >
          {frame < 29
            ? 'TREASURY LIQUIDITY RESERVE: 100% -> 0%'
            : 'LIQUIDITY CONFIRMED AT ZERO · COMPLETE DRAIN'}
        </text>
      </g>
    </svg>
  );
};

// =========================================================================
// 2. SCENE 02: KOREA_PENINSULA_NIGHT_SATELLITE (Vector Map)
// Authentic GeoJSON Projection of the Korean Peninsula & North Korea
// =========================================================================
export const KoreaPeninsulaNightSatellite: React.FC = () => {
  const frame = useCurrentFrame();
  const radarSweep = (frame * 2.8) % 360;
  const pulseLight = 0.85 + 0.15 * Math.sin(frame * 0.25);

  const pyongyang = KOREA_CITIES.PYONGYANG;
  const seoul = KOREA_CITIES.SEOUL;
  const busan = KOREA_CITIES.BUSAN;
  const incheon = KOREA_CITIES.INCHEON;
  const daejeon = KOREA_CITIES.DAEJEON;
  const daegu = KOREA_CITIES.DAEGU;
  const gwangju = KOREA_CITIES.GWANGJU;

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <defs>
        {/* Blazing Seoul Nocturnal Megacity Aura */}
        <radialGradient id="seoulMegaAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>
        {/* Busan Maritime Port Light Glow */}
        <radialGradient id="busanPortAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>
        {/* Pyongyang Solitary Flickering Terminal Beacon */}
        <radialGradient id="pyongyangWeakBeacon" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#05070A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Satellite Coordinate Graticule Grid */}
      <g stroke="#16221E" strokeWidth="1" strokeDasharray="4 8" opacity="0.65">
        <line x1="160" y1="940" x2="920" y2="940" />
        <line x1="160" y1="1040" x2="920" y2="1040" />
        <line x1="160" y1="1144" x2="920" y2="1144" />
        <line x1="160" y1="1240" x2="920" y2="1240" />
        <line x1="160" y1="1340" x2="920" y2="1340" />
        <line x1="160" y1="1440" x2="920" y2="1440" />
        <line x1="360" y1="880" x2="360" y2="1480" />
        <line x1="540" y1="880" x2="540" y2="1480" />
        <line x1="720" y1="880" x2="720" y2="1480" />
      </g>

      {/* Tactical Coordinate Labels */}
      <text x="170" y="934" fill="#38BDF8" fontFamily={montserrat.fontFamily} fontSize="12" fontWeight="800" opacity="0.6">40°N PAEKTU</text>
      <text x="170" y="1138" fill="#EF4444" fontFamily={montserrat.fontFamily} fontSize="12" fontWeight="800" opacity="0.85">38°N DMZ BORDER</text>
      <text x="170" y="1434" fill="#F59E0B" fontFamily={montserrat.fontFamily} fontSize="12" fontWeight="800" opacity="0.6">35°N KOREA STRAIT</text>

      {/* 1. South Korea (ROK) Landmass - Blazing Electric Activity */}
      <path
        d={ROK_BORDER_PATH}
        fill="#0E1724"
        stroke="#1E293B"
        strokeWidth="2"
      />

      {/* Seoul / Incheon Megacity Radiant Light Aura */}
      <circle cx={seoul[0]} cy={seoul[1]} r="130" fill="url(#seoulMegaAura)" />
      <circle cx={busan[0]} cy={busan[1]} r="85" fill="url(#busanPortAura)" />
      <circle cx={daejeon[0]} cy={daejeon[1]} r="50" fill="url(#seoulMegaAura)" opacity="0.7" />
      <circle cx={daegu[0]} cy={daegu[1]} r="55" fill="url(#seoulMegaAura)" opacity="0.75" />
      <circle cx={gwangju[0]} cy={gwangju[1]} r="45" fill="url(#seoulMegaAura)" opacity="0.6" />

      {/* Gyeongbu Arterial Expressway Glowing Highway Corridors */}
      <path
        d={`M ${seoul[0]} ${seoul[1]} L ${daejeon[0]} ${daejeon[1]} L ${daegu[0]} ${daegu[1]} L ${busan[0]} ${busan[1]}`}
        fill="none"
        stroke="#F59E0B"
        strokeWidth="3"
        opacity="0.85"
      />
      <path
        d={`M ${seoul[0]} ${seoul[1]} L ${gwangju[0]} ${gwangju[1]}`}
        fill="none"
        stroke="#F59E0B"
        strokeWidth="2"
        opacity="0.75"
      />

      {/* South Korean City Hub Light Points */}
      {[seoul, incheon, daejeon, daegu, busan, gwangju].map((c, i) => (
        <circle key={i} cx={c[0]} cy={c[1]} r="5" fill="#FFFFFF" opacity={pulseLight} />
      ))}

      {/* 2. North Korea (DPRK) Landmass - The Black Hole of Light */}
      <path
        d={DPRK_BORDER_PATH}
        fill="#030507"
        stroke="#1E293B"
        strokeWidth="2.5"
      />

      {/* Red Glowing Military Demarcation Line (38th Parallel DMZ) */}
      <path
        d={DMZ_BORDER_LINE}
        fill="none"
        stroke="#EF4444"
        strokeWidth="4"
        strokeDasharray="8 4"
        opacity={0.85 + 0.15 * Math.sin(frame * 0.3)}
      />

      {/* Pyongyang Solitary Dying Flame Light Point */}
      <circle cx={pyongyang[0]} cy={pyongyang[1]} r="24" fill="url(#pyongyangWeakBeacon)" />
      <circle cx={pyongyang[0]} cy={pyongyang[1]} r="3" fill="#38BDF8" opacity={0.7 + 0.3 * Math.sin(frame * 0.4)} />

      {/* Satellite Reconnaissance Reticle Centered on Pyongyang */}
      <g transform={`translate(${pyongyang[0]}, ${pyongyang[1]})`}>
        <circle
          cx="0"
          cy="0"
          r="80"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="1.5"
          opacity="0.65"
        />
        <circle
          cx="0"
          cy="0"
          r="5"
          fill="#EF4444"
          opacity={0.9}
        />
        <line x1="-100" y1="0" x2="100" y2="0" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
        <line x1="0" y1="-100" x2="0" y2="100" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
        {/* Rotating Radar Sweep */}
        <line
          x1="0"
          y1="0"
          x2={80 * Math.cos((radarSweep * Math.PI) / 180)}
          y2={80 * Math.sin((radarSweep * Math.PI) / 180)}
          stroke="#38BDF8"
          strokeWidth="2"
          opacity="0.85"
        />
        {/* Target Badge */}
        <rect x="25" y="-35" width="160" height="24" rx="3" fill="#0B1310" stroke="#38BDF8" strokeWidth="1" />
        <text x="32" y="-19" fill="#38BDF8" fontFamily={montserrat.fontFamily} fontSize="11" fontWeight="900">
          PYONGYANG: 0.04% LUX
        </text>
      </g>
    </svg>
  );
};

// =========================================================================
// 3. SCENE 03: UNIT_121_CYBER_BUNKER (Lone Leader)
// Fixed Contrast: High-Intensity Phosphor Backlight & Edge Illumination
// =========================================================================
export const Unit121CyberBunker: React.FC = () => {
  const frame = useCurrentFrame();
  const screenFlicker = 0.9 + 0.1 * Math.sin(frame * 0.35);

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <defs>
        {/* High-Intensity Terminal Phosphor Cyan Aura */}
        <radialGradient id="cyberBunkerBacklight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.65" />
          <stop offset="50%" stopColor="#0B1310" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>
        {/* Overhead Fluorescent Industrial Spotlight Cone on Guard */}
        <linearGradient id="guardSpotlight" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ECFDF5" stopOpacity="0.45" />
          <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Atmospheric Horizon Phosphor Backlight - Separates Silhouettes from Room */}
      <circle cx="500" cy="1150" r="380" fill="url(#cyberBunkerBacklight)" opacity={screenFlicker} />

      {/* Subterranean Reinforced Concrete Beams with Crisp Architectural Outlines */}
      <rect x="0" y="864" width="1080" height="48" fill="#16221E" />
      <line x1="0" y1="912" x2="1080" y2="912" stroke="#38BDF8" strokeWidth="2" opacity="0.6" />
      <line x1="0" y1="864" x2="1080" y2="864" stroke="#2D3748" strokeWidth="2" />
      <rect x="220" y="864" width="36" height="600" fill="#121820" stroke="#1E293B" strokeWidth="1" />
      <rect x="820" y="864" width="36" height="600" fill="#121820" stroke="#1E293B" strokeWidth="1" />

      {/* Guard Spotlight Cone Beaming from Ceiling */}
      <polygon points="760,912 840,912 900,1400 700,1400" fill="url(#guardSpotlight)" />

      {/* Hacker Desk & Silhouetted Young Operator */}
      <g transform="translate(360, 1010)">
        {/* CRT Monitor with High-Contrast Green/Cyan Phosphor Frame */}
        <rect
          x="100"
          y="40"
          width="160"
          height="120"
          rx="8"
          fill="#162636"
          stroke="#38BDF8"
          strokeWidth="3.5"
        />
        <rect
          x="112"
          y="52"
          width="136"
          height="96"
          fill="#0B1310"
        />
        {/* Screen Angled Light Projection onto Desk */}
        <polygon
          points="112,148 248,148 290,240 70,240"
          fill="#38BDF8"
          opacity="0.2"
        />

        {/* Animated Terminal Code Text Lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={i}
            x1="120"
            y1={66 + i * 14}
            x2={120 + ((frame * 4 + i * 32) % 115)}
            y2={66 + i * 14}
            stroke="#38BDF8"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity={screenFlicker}
          />
        ))}

        {/* Conscript Silhouette with Crisp Edge Highlight Rim */}
        <path
          d="M 60 220 Q 80 120 140 100 Q 170 95 190 120 Q 210 160 220 220 Z"
          fill="#090D12"
          stroke="#38BDF8"
          strokeWidth="2.5"
        />
        {/* Head with Headset Accent and White Face Contour */}
        <circle cx="160" cy="90" r="32" fill="#090D12" stroke="#38BDF8" strokeWidth="2.5" />
        <path
          d="M 140 84 Q 160 60 180 84"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="5"
        />
        <circle cx="138" cy="92" r="9" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="182" cy="92" r="9" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />

        {/* Keyboard and Hands with Typing Micro-Motion and Ivory Highlights */}
        <rect x="80" y="190" width="180" height="26" rx="4" fill="#16221E" stroke="#38BDF8" strokeWidth="2" />
        <circle
          cx="125"
          cy={186 + Math.sin(frame * 0.8) * 3}
          r="10"
          fill="#090D12"
          stroke="#ECFDF5"
          strokeWidth="2"
        />
        <circle
          cx="175"
          cy={186 + Math.cos(frame * 0.8) * 3}
          r="10"
          fill="#090D12"
          stroke="#ECFDF5"
          strokeWidth="2"
        />
      </g>

      {/* Armed Guard Silhouette Standing Under Spotlight with High Contrast */}
      <g transform="translate(740, 950)">
        {/* Peaked Military Cap Silhouette with Razor Outline */}
        <polygon points="40,24 80,18 98,32 30,34" fill="#090D12" stroke="#38BDF8" strokeWidth="2" />
        <circle cx="60" cy="48" r="24" fill="#090D12" stroke="#38BDF8" strokeWidth="2" />
        {/* Trenchcoat Silhouette & Slung Rifle Barrel */}
        <path d="M 30 72 L 90 72 L 105 280 L 15 280 Z" fill="#090D12" stroke="#38BDF8" strokeWidth="2.5" />
        <line x1="88" y1="40" x2="108" y2="180" stroke="#ECFDF5" strokeWidth="5" />
        {/* Glowing Red Star on Peaked Cap */}
        <circle cx="60" cy="28" r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1" />
      </g>
    </svg>
  );
};

// =========================================================================
// 4. SCENE 04: PYONGYANG_CONSCRIPT_CADETS_TALLY (Crowd Tally)
// High-Contrast Glowing Terminal Grid & Cadets with Ivory Rim Lighting
// =========================================================================
export const PyongyangConscriptCadetsTally: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="cadetsStageGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
          <stop offset="55%" stopColor="#16221E" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="540" cy="1180" r="390" fill="url(#cadetsStageGlow)" />

      {/* Background Falling Binary Data Streams */}
      <g opacity="0.35">
        {Array.from({ length: 12 }).map((_, col) => (
          <text
            key={col}
            x={180 + col * 64}
            y={880 + ((frame * 4 + col * 75) % 560)}
            fill="#38BDF8"
            fontFamily={montserrat.fontFamily}
            fontSize="18"
            fontWeight="900"
          >
            {((col * 17 + frame) % 2 === 0 ? '10110' : '01001')}
          </text>
        ))}
      </g>

      {/* Rows of Identical Silhouetted Cadet Desks */}
      <g transform="translate(180, 1020)">
        {Array.from({ length: 4 }).map((_, row) => (
          <g key={row} transform={`translate(0, ${row * 90})`}>
            {Array.from({ length: 5 }).map((_, col) => {
              const typingWobble = Math.sin(frame * 0.3 + row * 2 + col);
              const crtGlow = 0.8 + 0.2 * Math.sin(frame * 0.25 + col * 1.5 + row);
              return (
                <g key={col} transform={`translate(${col * 148}, 0)`}>
                  {/* Desk with Cyan Trim */}
                  <rect x="10" y="52" width="120" height="12" rx="2" fill="#162636" stroke="#38BDF8" strokeWidth="1.5" />
                  {/* Glowing CRT Terminal */}
                  <rect x="44" y="24" width="36" height="28" rx="2" fill="#090D12" stroke="#38BDF8" strokeWidth="2" />
                  <rect x="47" y="27" width="30" height="22" rx="1" fill="#38BDF8" opacity={crtGlow * 0.75} />
                  {/* Head & Uniform with Ivory Rim Highlight */}
                  <circle cx="62" cy="10" r="14" fill="#090D12" stroke="#ECFDF5" strokeWidth="2" />
                  {/* Red Armband Accent */}
                  <rect x="42" y="32" width="8" height="6" fill="#EF4444" />
                  {/* Hands typing with Crisp Highlight */}
                  <circle cx="52" cy={48 + typingWobble * 2} r="4" fill="#090D12" stroke="#ECFDF5" strokeWidth="1.5" />
                  <circle cx="72" cy={48 - typingWobble * 2} r="4" fill="#090D12" stroke="#ECFDF5" strokeWidth="1.5" />
                </g>
              );
            })}
          </g>
        ))}
      </g>
    </svg>
  );
};

// =========================================================================
// 5. SCENE 05: PARALLEL_WORLDS_SPLIT (Split Confrontation)
// =========================================================================
export const ParallelWorldsSplit: React.FC = () => {
  const frame = useCurrentFrame();
  const splitX = 540;

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      {/* Left World: Freezing Dark Pyongyang (Obsidian Black & Single Kerosene Flickering Lamp) */}
      <rect x="0" y="864" width={splitX} height="634" fill="#090D12" />
      <g transform="translate(80, 940)">
        {/* Dark dilapidated apartment tenements */}
        <rect x="40" y="120" width="140" height="340" fill="#05070A" />
        <rect x="220" y="60" width="160" height="400" fill="#05070A" />
        {/* Single flickering amber window */}
        <rect
          x="100"
          y="240"
          width="24"
          height="32"
          fill="#F59E0B"
          opacity={0.55 + 0.35 * Math.sin(frame * 0.25)}
        />
        {/* Snow flurries on Pyongyang side */}
        {Array.from({ length: 8 }).map((_, i) => (
          <circle
            key={i}
            cx={50 + (i * 45 + frame * 1.5) % 360}
            cy={100 + (i * 35 + frame * 3.5) % 360}
            r="3"
            fill="#ECFDF5"
            opacity="0.6"
          />
        ))}
      </g>

      {/* Right World: Neon Digital Financial Metropolis (Glass Skyscraper Towers & Glowing Charts) */}
      <rect x={splitX} y="864" width={1080 - splitX} height="634" fill="#0F172A" />
      <g transform="translate(580, 940)">
        {/* Glowing glass skyscraper facades */}
        <rect x="40" y="60" width="160" height="400" fill="#162636" stroke="#38BDF8" strokeWidth="1.5" />
        <rect x="230" y="120" width="150" height="340" fill="#162636" stroke="#38BDF8" strokeWidth="1.5" />
        {/* Glowing Candlestick Chart Vectors */}
        {Array.from({ length: 7 }).map((_, i) => {
          const h = 40 + Math.sin(frame * 0.1 + i) * 30;
          return (
            <g key={i} transform={`translate(${60 + i * 42}, 260)`}>
              <line x1="12" y1="-20" x2="12" y2={h + 20} stroke="#38BDF8" strokeWidth="2" />
              <rect x="4" y="0" width="16" height={h} fill="#38BDF8" opacity="0.85" />
            </g>
          );
        })}
      </g>

      {/* Center High-Voltage Division Axis */}
      <line
        x1={splitX}
        y1="864"
        x2={splitX}
        y2="1498"
        stroke="#EF4444"
        strokeWidth="4"
        opacity={0.8 + 0.2 * Math.sin(frame * 0.3)}
      />
      <circle cx={splitX} cy={1180} r="18" fill="#0B1310" stroke="#EF4444" strokeWidth="3" />
      <text
        x={splitX}
        y={1187}
        fill="#ECFDF5"
        textAnchor="middle"
        fontFamily={montserrat.fontFamily}
        fontSize="18"
        fontWeight="900"
      >
        VS
      </text>
    </svg>
  );
};

// =========================================================================
// 6. SCENE 06: BINANCE_HOT_VAULT_BREACH (Structural Fracture)
// =========================================================================
export const BinanceHotVaultBreach: React.FC = () => {
  const frame = useCurrentFrame();

  // 6-Layer Vector Anatomy Standard
  // Layer 1: Volumetric Radial Aura
  // Layer 2: Mach Shockwave Rings
  // Layer 3: Acute Energy Spikes
  // Layer 4: Multi-Nested Arc-Scalloped Explosive Lobes
  // Layer 5: High-Contrast 8-Pointed Core Flash Star
  // Layer 6: Detached Orbiting Cryptographic Shards

  const blastScale =
    frame < 22
      ? interpolate(frame, [0, 8, 22], [0.4, 1.35, 1.05], { extrapolateRight: 'clamp' })
      : 1.05 + 0.03 * Math.sin(frame * 0.18);

  const shockRadius = interpolate(frame, [0, 30], [20, 280], { extrapolateRight: 'clamp' });
  const shockOpacity = interpolate(frame, [0, 24, 30], [0.9, 0.4, 0], { extrapolateRight: 'clamp' });

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="vaultDetonationAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Layer 1: Volumetric Aura */}
      <circle cx="540" cy="1180" r="380" fill="url(#vaultDetonationAura)" />

      {/* Shattered Hexagonal Cyber Vault Door Silhouette */}
      <g transform="translate(540, 1180)">
        <polygon
          points="0,-160 140,-80 140,80 0,160 -140,80 -140,-80"
          fill="#090D12"
          stroke="#16221E"
          strokeWidth="6"
        />

        {/* Layer 2: Expanding Mach Shockwave Rings */}
        <circle
          cx="0"
          cy="0"
          r={shockRadius}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="4"
          opacity={shockOpacity}
        />
        <circle
          cx="0"
          cy="0"
          r={shockRadius * 0.72}
          fill="none"
          stroke="#EF4444"
          strokeWidth="3"
          opacity={shockOpacity}
        />

        {/* Layer 3: Acute Energy Spikes */}
        {Array.from({ length: 12 }).map((_, idx) => {
          const angle = (idx / 12) * Math.PI * 2 + frame * 0.04;
          const length = (180 + Math.sin(idx * 3 + frame) * 60) * blastScale;
          return (
            <line
              key={idx}
              x1="0"
              y1="0"
              x2={Math.cos(angle) * length}
              y2={Math.sin(angle) * length}
              stroke={idx % 2 === 0 ? '#EF4444' : '#F59E0B'}
              strokeWidth="4"
            />
          );
        })}

        {/* Layer 4: Multi-Nested Arc-Scalloped Explosive Lobes */}
        <g transform={`scale(${blastScale})`}>
          <path
            d={createOrganicBlastLobe(120, 8, [1.1, 0.9, 1.2, 0.85], frame * 0.1)}
            fill="#EF4444"
            opacity="0.9"
          />
          <path
            d={createOrganicBlastLobe(85, 7, [1.05, 0.95, 1.15], frame * 0.15)}
            fill="#F59E0B"
            opacity="0.95"
          />
          <path
            d={createOrganicBlastLobe(55, 6, [1.0, 1.1, 0.9], frame * 0.2)}
            fill="#ECFDF5"
          />
        </g>

        {/* Layer 5: High-Contrast 8-Pointed Core Flash Star */}
        <polygon
          points="0,-50 12,-12 50,0 12,12 0,50 -12,12 -50,0 -12,-12"
          fill="#FFFFFF"
          opacity={0.85 + 0.15 * Math.sin(frame * 0.4)}
        />

        {/* Layer 6: Detached Orbiting Cryptographic Shards */}
        {Array.from({ length: 8 }).map((_, idx) => {
          const ang = idx * 0.8 + frame * 0.05;
          const dist = 160 + idx * 24;
          return (
            <rect
              key={idx}
              x={Math.cos(ang) * dist}
              y={Math.sin(ang) * dist}
              width="24"
              height="14"
              rx="2"
              fill="#38BDF8"
              opacity="0.85"
              transform={`rotate(${idx * 45 + frame * 2})`}
            />
          );
        })}
      </g>
    </svg>
  );
};

// =========================================================================
// 7. SCENE 07: GLOBAL_BALANCES_DRAINING_TALLY (Crowd Tally)
// =========================================================================
export const GlobalBalancesDrainingTally: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="tallyRedGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="540" cy="1180" r="380" fill="url(#tallyRedGlow)" />

      {/* Tumbling Digital Account Cards */}
      <g transform="translate(180, 960)">
        {Array.from({ length: 6 }).map((_, i) => {
          const cardY = ((i * 75 + frame * 5) % 450);
          const opacity = interpolate(cardY, [0, 80, 380, 450], [0, 1, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <g key={i} transform={`translate(${i % 2 === 0 ? 40 : 380}, ${cardY})`} opacity={opacity}>
              <rect
                x="0"
                y="0"
                width="320"
                height="62"
                rx="6"
                fill="#0B1310"
                stroke="#EF4444"
                strokeWidth="1.5"
              />
              <circle cx="28" cy="31" r="14" fill="#16221E" />
              <rect x="56" y="22" width="120" height="10" rx="2" fill="#ECFDF5" opacity="0.8" />
              {/* Rapidly dropping balance */}
              <text
                x="290"
                y="38"
                fill="#EF4444"
                textAnchor="end"
                fontFamily={montserrat.fontFamily}
                fontSize="18"
                fontWeight="900"
              >
                -$85,420
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

// =========================================================================
// 8. SCENE 08: SINGAPORE_WAR_ROOM_ENGINEER (Lone Leader)
// High-Contrast Incident War Room: Panoramic Screen Wall & Rim-Lit Engineer Silhouette
// =========================================================================
export const SingaporeWarRoomEngineer: React.FC = () => {
  const frame = useCurrentFrame();
  const alertBlink = 0.75 + 0.25 * Math.sin(frame * 0.35);

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="warRoomRedAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.55" />
          <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>
        {/* Desk Monitor Backlight Projection */}
        <radialGradient id="engineerBacklight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.75" />
          <stop offset="60%" stopColor="#ECFDF5" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="540" cy="1160" r="400" fill="url(#warRoomRedAura)" opacity={alertBlink} />

      {/* Massive Panoramic War Room Screen Wall */}
      <g transform="translate(140, 920)">
        <rect x="0" y="0" width="800" height="340" rx="8" fill="#0D161F" stroke="#EF4444" strokeWidth="3" />
        <rect x="0" y="0" width="800" height="38" rx="8" fill="#16221E" />
        <text
          x="30"
          y="26"
          fill="#ECFDF5"
          fontFamily={montserrat.fontFamily}
          fontSize="15"
          fontWeight="800"
          letterSpacing="0.1em"
        >
          INCIDENT RESPONSE WAR ROOM · LIVE PROTOCOL TELEMETRY
        </text>
        <text
          x="770"
          y="26"
          fill="#EF4444"
          textAnchor="end"
          fontFamily={montserrat.fontFamily}
          fontSize="15"
          fontWeight="900"
        >
          CRITICAL HOT WALLET DRAIN
        </text>
        {/* Oscilloscope Emergency Spikes */}
        <path
          d={`M 20 190 Q 140 ${190 - Math.sin(frame * 0.2) * 90} 260 190 T 500 ${190 + Math.cos(frame * 0.2) * 110} T 780 190`}
          fill="none"
          stroke="#EF4444"
          strokeWidth="4"
        />
        <path
          d={`M 20 230 Q 180 ${230 + Math.cos(frame * 0.25) * 60} 340 230 T 600 ${230 - Math.sin(frame * 0.25) * 70} T 780 230`}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="2.5"
          opacity="0.7"
        />
      </g>

      {/* Engineer Silhouette Backlight Aura */}
      <circle cx="540" cy="1260" r="140" fill="url(#engineerBacklight)" />

      {/* Solitary Engineer Silhouette Viewed from Behind */}
      <g transform="translate(470, 1200)">
        {/* Chair & Head with Ivory Rim Strokes */}
        <rect x="25" y="80" width="90" height="170" rx="10" fill="#090D12" stroke="#38BDF8" strokeWidth="2.5" />
        <circle cx="70" cy="45" r="30" fill="#090D12" stroke="#ECFDF5" strokeWidth="3" />
        {/* Shoulders with Crisp Ivory Outline */}
        <path
          d="M -10 100 Q 70 70 150 100 L 140 250 L 0 250 Z"
          fill="#090D12"
          stroke="#ECFDF5"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Luminous Headset with Glowing Earcups */}
        <path d="M 48 42 Q 70 20 92 42" fill="none" stroke="#ECFDF5" strokeWidth="5" />
        <rect x="42" y="38" width="10" height="20" rx="4" fill="#38BDF8" />
        <rect x="88" y="38" width="10" height="20" rx="4" fill="#38BDF8" />
      </g>

      {/* Twin Desk Monitors in Front of Engineer */}
      <g transform="translate(380, 1370)">
        <rect x="0" y="0" width="140" height="85" rx="6" fill="#090D12" stroke="#EF4444" strokeWidth="3" />
        <rect x="8" y="8" width="124" height="69" rx="3" fill="#EF4444" opacity="0.35" />
        <rect x="180" y="0" width="140" height="85" rx="6" fill="#090D12" stroke="#38BDF8" strokeWidth="3" />
        <rect x="188" y="8" width="124" height="69" rx="3" fill="#38BDF8" opacity="0.35" />
      </g>
    </svg>
  );
};

// =========================================================================
// 9. SCENE 09: TEN_BLOCKCHAINS_LIQUIDITY_MAP (Vector Map)
// Tactical Asia-Pacific Reconnaissance Map: Trans-Oceanic Cable Routes into Pyongyang
// =========================================================================
export const TenBlockchainsLiquidityMap: React.FC = () => {
  const frame = useCurrentFrame();
  const radarAngle = (frame * 3.2) % 360;
  const pulseAlert = 0.8 + 0.2 * Math.sin(frame * 0.3);

  // 10 Global Financial & Blockchain Server Hubs positioned on East Asia / Pacific projection
  const HUBS = [
    { name: 'ETH', city: 'TOKYO', x: 860, y: 1140 },
    { name: 'BNB', city: 'SINGAPORE', x: 260, y: 1420 },
    { name: 'SOL', city: 'SEOUL', x: 570, y: 1190 },
    { name: 'BTC', city: 'HONG KONG', x: 380, y: 1360 },
    { name: 'ARB', city: 'SHANGHAI', x: 490, y: 1280 },
    { name: 'OP',  city: 'OSAKA', x: 800, y: 1200 },
    { name: 'AVAX',city: 'TAIPEI', x: 440, y: 1440 },
    { name: 'POL', city: 'SYDNEY', x: 880, y: 1460 },
    { name: 'BASE',city: 'LONDON', x: 220, y: 980 },
    { name: 'TRX', city: 'DUBAI', x: 180, y: 1180 },
  ];

  const pyongyang = { x: 520, y: 1120 };

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="pyongyangSinkAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#EF4444" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Deep Ocean Tactical Grid Background */}
      <rect x="140" y="900" width="800" height="580" rx="10" fill="#06090D" stroke="#16221E" strokeWidth="3" />

      {/* Coordinate Lat/Long Grid Lines */}
      {[980, 1080, 1180, 1280, 1380].map((ly, i) => (
        <line key={i} x1="140" y1={ly} x2="940" y2={ly} stroke="#162636" strokeWidth="1" strokeDasharray="4 6" />
      ))}
      {[240, 380, 520, 660, 800].map((lx, i) => (
        <line key={i} x1={lx} y1="900" x2={lx} y2="1480" stroke="#162636" strokeWidth="1" strokeDasharray="4 6" />
      ))}

      {/* Coastline Vectors: Asian Mainland, Korean Peninsula & Japanese Archipelago */}
      {/* Chinese Coastline & Yellow Sea */}
      <path
        d="M 180 940 L 320 980 L 360 1060 L 340 1140 L 400 1200 L 440 1260 L 410 1340 L 360 1420 L 260 1480"
        fill="none"
        stroke="#1E293B"
        strokeWidth="3.5"
      />
      {/* Korean Peninsula Landmass Silhouette */}
      <path
        d="M 470 1040 L 540 1050 L 560 1100 L 550 1160 L 580 1220 L 560 1260 L 530 1250 L 510 1190 L 480 1120 Z"
        fill="#090D12"
        stroke="#38BDF8"
        strokeWidth="2.5"
      />
      {/* Japanese Archipelago Arc */}
      <path
        d="M 720 1020 L 800 1050 L 880 1110 L 870 1180 L 810 1240 L 760 1260 L 720 1290"
        fill="none"
        stroke="#1E293B"
        strokeWidth="3.5"
      />

      {/* Ten High-Speed Trans-Oceanic Data Conduits Converging on Pyongyang */}
      {HUBS.map((hub, idx) => (
        <g key={hub.name}>
          {/* Fiber Route Vector */}
          <line
            x1={hub.x}
            y1={hub.y}
            x2={pyongyang.x}
            y2={pyongyang.y}
            stroke="#EF4444"
            strokeWidth="2.5"
            strokeDasharray="10 8"
            strokeDashoffset={-frame * 5}
            opacity="0.85"
          />
          {/* Outflow Speed Vectors (Traveling Packets) */}
          {Array.from({ length: 3 }).map((_, p) => {
            const frac = ((p * 0.33 + frame * 0.025 + idx * 0.1) % 1.0);
            const px = hub.x + (pyongyang.x - hub.x) * frac;
            const py = hub.y + (pyongyang.y - hub.y) * frac;
            return <circle key={p} cx={px} cy={py} r="3.5" fill="#FEF08A" />;
          })}
        </g>
      ))}

      {/* Hub Badges at Real Geopolitical Nodes */}
      {HUBS.map((hub, idx) => {
        const pulse = Math.sin(frame * 0.25 + idx);
        return (
          <g key={hub.name} transform={`translate(${hub.x}, ${hub.y})`}>
            {/* Outer Cyan Ping */}
            <circle cx="0" cy="0" r={16 + pulse * 2} fill="#090D12" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="0" cy="0" r="6" fill="#38BDF8" />
            {/* Token Badge */}
            <rect x="20" y="-12" width="56" height="24" rx="4" fill="#0B1310" stroke="#162636" strokeWidth="1.5" />
            <text
              x="48"
              y="4"
              fill="#ECFDF5"
              fontFamily={montserrat.fontFamily}
              fontSize="12"
              fontWeight="900"
              textAnchor="middle"
            >
              {hub.name}
            </text>
          </g>
        );
      })}

      {/* Central Pyongyang Lazarus Cyber Target & Sinkhole */}
      <g transform={`translate(${pyongyang.x}, ${pyongyang.y})`}>
        {/* Sinkhole Volumetric Aura */}
        <circle cx="0" cy="0" r="90" fill="url(#pyongyangSinkAura)" />

        {/* Tactical Crosshair Reticle */}
        <circle cx="0" cy="0" r="48" fill="#090D12" stroke="#EF4444" strokeWidth="3" />
        <circle cx="0" cy="0" r="32" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="6 4" />
        <line x1="-65" y1="0" x2="65" y2="0" stroke="#EF4444" strokeWidth="2" />
        <line x1="0" y1="-65" x2="0" y2="65" stroke="#EF4444" strokeWidth="2" />

        {/* Spinning Radar Reconnaissance Beam */}
        <line
          x1="0"
          y1="0"
          x2={Math.cos((radarAngle * Math.PI) / 180) * 85}
          y2={Math.sin((radarAngle * Math.PI) / 180) * 85}
          stroke="#EF4444"
          strokeWidth="3"
          opacity="0.85"
        />

        {/* Center Critical Red Beacon */}
        <circle cx="0" cy="0" r="14" fill="#EF4444" opacity={pulseAlert} />
        <circle cx="0" cy="0" r="6" fill="#FFFFFF" />

        {/* Geographic Coordinate Placard */}
        <rect x="-110" y="55" width="220" height="26" rx="4" fill="#0B1310" stroke="#EF4444" strokeWidth="1.5" />
        <text
          x="0"
          y="72"
          fill="#ECFDF5"
          fontFamily={montserrat.fontFamily}
          fontSize="11"
          fontWeight="900"
          letterSpacing="0.08em"
          textAnchor="middle"
        >
          PYONGYANG SINKHOLE: 39°N 125°E
        </text>
      </g>
    </svg>
  );
};

// =========================================================================
// 10. SCENE 10: EMERGENCY_FREEZE_SHATTER (Structural Fracture)
// Dramatic Split: Cryogenic Frost Pipeline ($2B Frozen) vs Blown Breach ($4B Escape)
// =========================================================================
export const EmergencyFreezeShatter: React.FC = () => {
  const frame = useCurrentFrame();

  // Hit timing: Frame 29 (bass drop & "FOUR BILLION SLIPS AWAY" slam)
  const breachSlam = interpolate(frame, [26, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockR = interpolate(frame, [29, 68], [15, 340], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockAlpha = interpolate(frame, [29, 36, 68], [0.95, 0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const alarmStrobe = frame >= 28 && Math.sin(frame * 0.45) > 0;
  const pulseIce = 0.85 + 0.15 * Math.sin(frame * 0.2);

  // 12 Escaping currency tokens shooting out of the breach
  const ESCAPE_TOKENS = [
    { offset: 0, speed: 14, ySkew: -25, size: 26, type: '$' },
    { offset: 15, speed: 16, ySkew: 10, size: 22, type: 'HEX' },
    { offset: 32, speed: 13, ySkew: -45, size: 24, type: '₿' },
    { offset: 48, speed: 17, ySkew: 30, size: 20, type: '$' },
    { offset: 65, speed: 15, ySkew: -15, size: 28, type: 'HEX' },
    { offset: 80, speed: 18, ySkew: 40, size: 22, type: '₿' },
    { offset: 95, speed: 14, ySkew: -35, size: 25, type: '$' },
    { offset: 110, speed: 16, ySkew: 15, size: 21, type: 'HEX' },
  ];

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <defs>
        {/* Left Side: Sub-Zero Cryogenic Ice Aura */}
        <radialGradient id="freezeIceAura" cx="30%" cy="50%" r="45%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#0284C7" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>

        {/* Right Side: High-Velocity Escape Breach Explosion */}
        <radialGradient id="breachFireAura" cx="70%" cy="50%" r="45%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.65" />
          <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>

        {/* Cryogenic Glass Pipeline Gradient */}
        <linearGradient id="cryoPipeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="25%" stopColor="#E0F2FE" />
          <stop offset="70%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>

        {/* Molten Outflow Torrent Gradient */}
        <linearGradient id="moltenOutflowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="30%" stopColor="#F59E0B" />
          <stop offset="70%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>
      </defs>

      {/* Volumetric Split Ambient Auras */}
      <circle cx="340" cy="1180" r="380" fill="url(#freezeIceAura)" opacity={pulseIce} />
      <circle cx="740" cy="1180" r="380" fill="url(#breachFireAura)" />

      {/* ================================================================= */}
      {/* 1. TOP TACTICAL HUD TELEMETRY                                     */}
      {/* ================================================================= */}
      {/* Left HUD: $2.0B Intercepted & Frozen */}
      <g transform="translate(140, 910)">
        <rect x="0" y="0" width="380" height="44" rx="6" fill="#0B1310" stroke="#38BDF8" strokeWidth="2" />
        <circle cx="24" cy="22" r="6" fill="#38BDF8" />
        <text
          x="44"
          y="28"
          fill="#ECFDF5"
          fontFamily={montserrat.fontFamily}
          fontSize="15"
          fontWeight="900"
          letterSpacing="0.08em"
        >
          $2.0B CRYOGENICALLY FROZEN
        </text>
      </g>

      {/* Right HUD: $4.0B Escaped into Laundering Tunnels */}
      <g transform="translate(560, 910)">
        <rect x="0" y="0" width="380" height="44" rx="6" fill="#0B1310" stroke="#EF4444" strokeWidth="2" />
        <circle cx="24" cy="22" r="6" fill="#EF4444" opacity={alarmStrobe ? 1 : 0.4} />
        <text
          x="44"
          y="28"
          fill="#EF4444"
          fontFamily={montserrat.fontFamily}
          fontSize="15"
          fontWeight="900"
          letterSpacing="0.08em"
        >
          $4.0B ESCAPED IN TRANSIT
        </text>
      </g>

      {/* ================================================================= */}
      {/* 2. LEFT SIDE: SOLID FROZEN CRYOGENIC LIQUIDITY CONDUIT           */}
      {/* ================================================================= */}
      <g transform="translate(140, 1100)">
        {/* Reinforced Heavy Steel Vacuum Pipe Casing */}
        <rect
          x="0"
          y="0"
          width="380"
          height="140"
          rx="14"
          fill="#090D12"
          stroke="#162636"
          strokeWidth="6"
        />

        {/* Transparent Cryogenic Core Window */}
        <rect
          x="10"
          y="18"
          width="360"
          height="104"
          rx="8"
          fill="url(#cryoPipeGrad)"
          opacity="0.85"
        />

        {/* Trapped & Frozen Inanimate Coin Tokens (Held Motionless in Ice) */}
        {[70, 175, 280].map((cx, i) => (
          <g key={i} transform={`translate(${cx}, 70)`}>
            {/* Ice Cube Quarantine Block */}
            <rect
              x="-36"
              y="-36"
              width="72"
              height="72"
              rx="8"
              fill="#E0F2FE"
              opacity="0.5"
              stroke="#ECFDF5"
              strokeWidth="2.5"
            />
            {/* Frozen Coin Emblem */}
            <circle cx="0" cy="0" r="24" fill="#0F172A" stroke="#F59E0B" strokeWidth="2.5" />
            <text
              x="0"
              y="9"
              fill="#FEF08A"
              fontFamily={montserrat.fontFamily}
              fontSize="24"
              fontWeight="900"
              textAnchor="middle"
            >
              $
            </text>
            {/* Lock Glyphs */}
            <line x1="-30" y1="-30" x2="30" y2="30" stroke="#38BDF8" strokeWidth="2" opacity="0.8" />
          </g>
        ))}

        {/* Sharp Glacial Ice Crystals & Frost Stalactites */}
        {/* Top hanging icicles */}
        <polygon points="40,0 55,38 70,0" fill="#E0F2FE" />
        <polygon points="120,0 140,46 160,0" fill="#ECFDF5" />
        <polygon points="220,0 238,52 256,0" fill="#E0F2FE" />
        <polygon points="310,0 330,42 350,0" fill="#ECFDF5" />
        {/* Bottom ice spikes */}
        <polygon points="80,140 96,96 112,140" fill="#ECFDF5" />
        <polygon points="180,140 200,90 220,140" fill="#E0F2FE" />
        <polygon points="270,140 292,86 314,140" fill="#ECFDF5" />

        {/* Heavy Cryogenic Lock Collar */}
        <rect x="330" y="-12" width="46" height="164" rx="8" fill="#1E293B" stroke="#ECFDF5" strokeWidth="3" />
        <line x1="353" y1="0" x2="353" y2="140" stroke="#38BDF8" strokeWidth="3" />
      </g>

      {/* ================================================================= */}
      {/* 3. CENTRAL RUPTURE SEAM & EXPLOSIVE BREACH SHOCKWAVE             */}
      {/* ================================================================= */}
      {/* High-Impact Ground Shockwave Ring */}
      {frame >= 29 && (
        <>
          <circle
            cx="530"
            cy="1170"
            r={shockR}
            fill="none"
            stroke="#EF4444"
            strokeWidth="5"
            opacity={shockAlpha}
          />
          <circle
            cx="530"
            cy="1170"
            r={shockR * 0.72}
            fill="none"
            stroke="#FEF08A"
            strokeWidth="3"
            opacity={shockAlpha}
          />
        </>
      )}

      {/* Jagged Rupture Fissure Seam */}
      <path
        d="M 515 1080 L 535 1130 L 510 1180 L 545 1220 L 518 1270"
        fill="none"
        stroke="#EF4444"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Shattered Ice Shards Flying Away from Rupture */}
      {Array.from({ length: 8 }).map((_, idx) => {
        const shardDist = interpolate(frame, [25, 60], [0, 140 + idx * 25], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const shardAngle = 1.8 + idx * 0.35;
        const sx = 520 + Math.cos(shardAngle) * shardDist;
        const sy = 1170 + Math.sin(shardAngle) * shardDist;
        return (
          <polygon
            key={idx}
            points="0,-12 8,0 0,12 -8,0"
            fill="#E0F2FE"
            stroke="#38BDF8"
            strokeWidth="1.5"
            transform={`translate(${sx}, ${sy}) rotate(${frame * 4 + idx * 30})`}
            opacity={interpolate(frame, [25, 55], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          />
        );
      })}

      {/* ================================================================= */}
      {/* 4. RIGHT SIDE: HIGH-VELOCITY BLOWN BREACH & SURGING OUTFLOW       */}
      {/* ================================================================= */}
      <g transform="translate(520, 1100)">
        {/* Blown Rupture Edge Flanges */}
        <polygon points="0,0 60,-24 40,24 0,18" fill="#16221E" stroke="#EF4444" strokeWidth="3" />
        <polygon points="0,140 60,164 40,116 0,122" fill="#16221E" stroke="#EF4444" strokeWidth="3" />

        {/* Massive Molten Cryptocurrency Outflow Surge Torrent */}
        <path
          d="M 15 20 Q 180 -10 420 10 L 420 130 Q 180 150 15 120 Z"
          fill="url(#moltenOutflowGrad)"
          opacity="0.9"
        />

        {/* High-Speed Velocity Streaming Lines */}
        {[-30, 0, 30, 60].map((yOff, i) => (
          <line
            key={i}
            x1="20"
            y1={70 + yOff}
            x2="420"
            y2={70 + yOff + (i % 2 === 0 ? 10 : -10)}
            stroke="#FEF08A"
            strokeWidth="3.5"
            strokeDasharray="24 14"
            strokeDashoffset={-frame * 18}
            opacity="0.85"
          />
        ))}

        {/* Fast-Escaping Currency Tokens Tumbling Into Darkness */}
        {ESCAPE_TOKENS.map((tok, idx) => {
          const moveX = ((frame * tok.speed + tok.offset * 4) % 420);
          const alpha = interpolate(moveX, [0, 40, 340, 420], [0, 1, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <g
              key={idx}
              transform={`translate(${moveX}, ${70 + tok.ySkew}) rotate(${frame * 6 + idx * 45})`}
              opacity={alpha}
            >
              {tok.type === '$' && (
                <>
                  <circle cx="0" cy="0" r={tok.size / 2} fill="#EF4444" stroke="#FEF08A" strokeWidth="2" />
                  <text
                    x="0"
                    y={tok.size * 0.22}
                    fill="#FEF08A"
                    fontFamily={montserrat.fontFamily}
                    fontSize={tok.size * 0.65}
                    fontWeight="900"
                    textAnchor="middle"
                  >
                    $
                  </text>
                </>
              )}
              {tok.type === '₿' && (
                <>
                  <circle cx="0" cy="0" r={tok.size / 2} fill="#F59E0B" stroke="#ECFDF5" strokeWidth="2" />
                  <text
                    x="0"
                    y={tok.size * 0.22}
                    fill="#0B1310"
                    fontFamily={montserrat.fontFamily}
                    fontSize={tok.size * 0.65}
                    fontWeight="900"
                    textAnchor="middle"
                  >
                    ₿
                  </text>
                </>
              )}
              {tok.type === 'HEX' && (
                <polygon
                  points={`0,-${tok.size / 2} ${tok.size * 0.45},-${tok.size * 0.25} ${tok.size * 0.45},${tok.size * 0.25} 0,${tok.size / 2} -${tok.size * 0.45},${tok.size * 0.25} -${tok.size * 0.45},-${tok.size * 0.25}`}
                  fill="#EF4444"
                  stroke="#ECFDF5"
                  strokeWidth="2"
                />
              )}
            </g>
          );
        })}
      </g>

      {/* ================================================================= */}
      {/* 5. BOTTOM PROPORTIONAL LIQUIDITY METER                            */}
      {/* ================================================================= */}
      <g transform="translate(180, 1420)">
        <rect x="0" y="0" width="720" height="32" rx="4" fill="#090D12" stroke="#162636" strokeWidth="2" />
        {/* Left 33% (Frozen) */}
        <rect x="4" y="4" width="236" height="24" rx="2" fill="#38BDF8" opacity="0.9" />
        <text
          x="122"
          y="21"
          fill="#0B1310"
          fontFamily={montserrat.fontFamily}
          fontSize="13"
          fontWeight="900"
          textAnchor="middle"
        >
          $2.0B FROZEN (33%)
        </text>
        {/* Right 67% (Slipped Away) */}
        <rect x="244" y="4" width="472" height="24" rx="2" fill="#EF4444" opacity="0.9" />
        <text
          x="480"
          y="21"
          fill="#ECFDF5"
          fontFamily={montserrat.fontFamily}
          fontSize="13"
          fontWeight="900"
          textAnchor="middle"
        >
          $4.0B ESCAPED (67%)
        </text>
      </g>
    </svg>
  );
};

// =========================================================================
// 11. SCENE 11: UN_INTELLIGENCE_ROCKET_QUOTE (Quote Card)
// =========================================================================
export const UnIntelligenceRocketQuote: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <g transform="translate(160, 960)">
        <rect x="0" y="0" width="760" height="440" rx="8" fill="#0B1310" stroke="#16221E" strokeWidth="3" />
        {/* UN Laurel Wreath Stylized Vector */}
        <circle cx="380" cy="90" r="44" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="6 4" />
        <circle cx="380" cy="90" r="16" fill="#16221E" />

        {/* Declassified Intelligence Finding Text Metaphor */}
        <rect x="80" y="180" width="600" height="20" rx="3" fill="#16221E" />
        <rect
          x="80"
          y="180"
          width={interpolate(frame, [0, 40], [0, 480], { extrapolateRight: 'clamp' })}
          height="20"
          rx="3"
          fill="#EF4444"
          opacity="0.9"
        />
        <rect x="80" y="220" width="520" height="20" rx="3" fill="#16221E" />
        <rect
          x="80"
          y="220"
          width={interpolate(frame, [10, 50], [0, 420], { extrapolateRight: 'clamp' })}
          height="20"
          rx="3"
          fill="#ECFDF5"
          opacity="0.85"
        />
        <rect x="80" y="260" width="560" height="20" rx="3" fill="#16221E" />
        <rect
          x="80"
          y="260"
          width={interpolate(frame, [20, 60], [0, 360], { extrapolateRight: 'clamp' })}
          height="20"
          rx="3"
          fill="#38BDF8"
          opacity="0.8"
        />

        {/* Radar Telemetry Scan Micro-Motion */}
        <line
          x1="40"
          y1={320 + Math.sin(frame * 0.1) * 30}
          x2="720"
          y2={320 + Math.sin(frame * 0.1) * 30}
          stroke="#EF4444"
          strokeWidth="1.5"
          opacity="0.5"
        />
      </g>
    </svg>
  );
};

// =========================================================================
// 12. SCENE 12: HWASONG_ICBM_SNOW_TRANSIT (Vehicle in Transit)
// Fixed Contrast: High-Contrast Snowpack Tarmac & Arctic Backlight Rim
// =========================================================================
export const HwasongIcbmSnowTransit: React.FC = () => {
  const frame = useCurrentFrame();
  const transitX = interpolate(frame, [0, 154], [140, 20], { extrapolateRight: 'clamp' });
  const beaconPulse = 0.75 + 0.25 * Math.sin(frame * 0.4);

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <defs>
        {/* Arctic Polar Horizon Atmospheric Backlighting */}
        <radialGradient id="sunanArcticSky" cx="50%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.5" />
          <stop offset="45%" stopColor="#162636" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>
        {/* Volumetric Dual Headlight Beam Cone */}
        <linearGradient id="truckHeadlight" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Atmospheric Glacial Backlight behind the Elevated Missile */}
      <circle cx="540" cy="1120" r="420" fill="url(#sunanArcticSky)" />

      {/* High-Contrast Frozen Snowpack Tarmac (Stark White/Ice replaces dark black) */}
      <rect x="0" y="1310" width="1080" height="220" fill="#ECFDF5" />
      <path
        d="M 0 1310 Q 280 1295 540 1315 T 1080 1305 L 1080 1335 L 0 1335 Z"
        fill="#CADBE8"
      />
      {/* Dark Packed Ice Ruts from 16 Heavy Tires */}
      <line x1="0" y1="1335" x2="1080" y2="1335" stroke="#162636" strokeWidth="8" opacity="0.75" />
      <line x1="0" y1="1352" x2="1080" y2="1352" stroke="#162636" strokeWidth="6" opacity="0.65" />

      {/* Blowing Arctic Blizzard Particles */}
      {Array.from({ length: 24 }).map((_, i) => (
        <circle
          key={i}
          cx={(i * 55 + frame * 6) % 1080}
          cy={1290 + ((i * 19 + frame * 2) % 180)}
          r={2.5 + (i % 3)}
          fill="#FFFFFF"
          opacity={0.8}
        />
      ))}

      {/* 16-Wheel Heavy Transporter-Erector-Launcher (TEL) with Crisp Rim Contrast */}
      <g transform={`translate(${transitX}, 990)`}>
        {/* Massive Elevated Hwasong-17 ICBM Body (Checkered High-Contrast Livery) */}
        <g transform="rotate(-18, 520, 240)">
          {/* Main Missile Cylinder with Cyan Rim Outline */}
          <rect
            x="140"
            y="200"
            width="620"
            height="72"
            rx="12"
            fill="#090D12"
            stroke="#38BDF8"
            strokeWidth="3"
          />
          {/* Interspersed Stark White Checkered Telemetry Blocks */}
          <rect x="220" y="200" width="45" height="36" fill="#ECFDF5" />
          <rect x="265" y="236" width="45" height="36" fill="#ECFDF5" />
          <rect x="380" y="200" width="45" height="36" fill="#ECFDF5" />
          <rect x="425" y="236" width="45" height="36" fill="#ECFDF5" />
          <rect x="540" y="200" width="45" height="36" fill="#ECFDF5" />
          <rect x="585" y="236" width="45" height="36" fill="#ECFDF5" />

          {/* Alert Red Warhead Separation Band */}
          <rect x="680" y="200" width="24" height="72" fill="#EF4444" />
          {/* Aerodynamic Black Cone Tip with White Strobe Tip */}
          <polygon points="760,200 850,236 760,272" fill="#090D12" stroke="#38BDF8" strokeWidth="2.5" />
          <circle cx="844" cy="236" r="4" fill="#FFFFFF" />
        </g>

        {/* Heavy Hydraulic Erection Pistons with Chrome Finish */}
        <line x1="380" y1="300" x2="480" y2="230" stroke="#ECFDF5" strokeWidth="8" strokeLinecap="round" />
        <line x1="410" y1="300" x2="510" y2="230" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" />

        {/* Heavy Armored Vehicle Chassis with Razor Rim Stroke */}
        <rect
          x="200"
          y="265"
          width="620"
          height="65"
          rx="8"
          fill="#090D12"
          stroke="#38BDF8"
          strokeWidth="3"
        />

        {/* Armored Driver Cab & Radar Mast */}
        <rect
          x="760"
          y="235"
          width="100"
          height="95"
          rx="6"
          fill="#121820"
          stroke="#38BDF8"
          strokeWidth="3"
        />
        {/* Cab Windshield Glowing Amber/White */}
        <rect x="800" y="248" width="55" height="32" rx="4" fill="#F59E0B" opacity="0.85" />
        {/* Blinking Amber Hazard Beacon on Cab Roof */}
        <circle cx="810" cy="226" r="6" fill="#F59E0B" opacity={beaconPulse} />

        {/* Forward Volumetric Headlight Beams Cutting Through Blizzard */}
        <polygon points="860,290 1080,260 1080,360 860,310" fill="url(#truckHeadlight)" />

        {/* 8 Pairs of Heavy Dual Road Wheels Popping Against White Snow */}
        {Array.from({ length: 8 }).map((_, w) => {
          const wheelX = 235 + w * 72;
          return (
            <g key={w} transform={`translate(${wheelX}, 330)`}>
              {/* Outer High-Contrast White Tire Rim */}
              <circle cx="0" cy="0" r="26" fill="#090D12" stroke="#ECFDF5" strokeWidth="3" />
              {/* Heavy Inner Steel Hub */}
              <circle cx="0" cy="0" r="16" fill="#162636" stroke="#38BDF8" strokeWidth="2" />
              <circle cx="0" cy="0" r="7" fill="#EF4444" />
              {/* Wheel Spoke Micro-Rotation */}
              <line
                x1="-22"
                y1="0"
                x2="22"
                y2="0"
                stroke="#ECFDF5"
                strokeWidth="2.5"
                transform={`rotate(${frame * 4.5})`}
              />
              <line
                x1="0"
                y1="-22"
                x2="0"
                y2="22"
                stroke="#ECFDF5"
                strokeWidth="2.5"
                transform={`rotate(${frame * 4.5})`}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
};

// =========================================================================
// 13. SCENE 13: ROCKET_ENGINE_TEST_IGNITION (Structural Fracture)
// =========================================================================
export const RocketEngineTestIgnition: React.FC = () => {
  const frame = useCurrentFrame();

  const flameScale = 1.0 + 0.12 * Math.sin(frame * 0.45);
  const shockRingR = interpolate(frame, [0, 28], [30, 320], { extrapolateRight: 'clamp' });

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="engineFlameGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#F59E0B" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#EF4444" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Structural Test Stand Gantry Silhouette */}
      <g stroke="#090D12" strokeWidth="8">
        <line x1="280" y1="864" x2="280" y2="1498" />
        <line x1="800" y1="864" x2="800" y2="1498" />
        <line x1="280" y1="940" x2="800" y2="940" />
        <line x1="280" y1="1080" x2="800" y2="1080" />
      </g>

      {/* Rocket Engine Nozzle Silhouette */}
      <polygon points="500,940 580,940 610,1020 470,1020" fill="#090D12" />

      {/* 6-Layer Rocket Exhaust Jet & Shock Diamonds */}
      <g transform="translate(540, 1020)">
        {/* Layer 1: Volumetric Aura */}
        <circle cx="0" cy="180" r="300" fill="url(#engineFlameGlow)" />

        {/* Layer 2: Expanding Ground Shockwaves */}
        <circle
          cx="0"
          cy="260"
          r={shockRingR}
          fill="none"
          stroke="#EF4444"
          strokeWidth="3"
          opacity={interpolate(frame, [0, 28], [0.9, 0], { extrapolateRight: 'clamp' })}
        />

        {/* Layer 3: Vertical Shock Diamonds */}
        {Array.from({ length: 4 }).map((_, d) => (
          <polygon
            key={d}
            points={`0,${40 + d * 60} 18,${60 + d * 60} 0,${80 + d * 60} -18,${60 + d * 60}`}
            fill="#FFFFFF"
            opacity={0.9}
          />
        ))}

        {/* Layer 4: Billowing Scalloped Exhaust Plume */}
        <g transform={`scale(${flameScale})`}>
          <path
            d={createOrganicBlastLobe(140, 9, [1.1, 0.9, 1.2], frame * 0.2)}
            fill="#EF4444"
            opacity="0.85"
            transform="translate(0, 220)"
          />
          <path
            d={createOrganicBlastLobe(90, 7, [1.05, 1.15, 0.95], frame * 0.25)}
            fill="#F59E0B"
            opacity="0.9"
            transform="translate(0, 180)"
          />
        </g>
      </g>
    </svg>
  );
};

// =========================================================================
// 14. SCENE 14: BINANCE_LEADERSHIP_BAILOUT (Lone Leader)
// High-Contrast Press Conference: Luminous Architectural Backdrop & Rim-Lit Executive
// =========================================================================
export const BinanceLeadershipBailout: React.FC = () => {
  const frame = useCurrentFrame();

  // Dynamic press camera flash bursts in lower audience
  const flash1 = interpolate(frame % 37, [0, 2, 6], [0, 0.95, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const flash2 = interpolate((frame + 18) % 43, [0, 2, 7], [0, 0.9, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const flash3 = interpolate((frame + 29) % 31, [0, 2, 5], [0, 0.85, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const auraPulse = 0.88 + 0.12 * Math.sin(frame * 0.2);
  const chartScanX = interpolate(frame % 90, [0, 90], [240, 840], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <defs>
        {/* Layer 1: High-Contrast Warm Press Conference Spotlights */}
        <radialGradient id="pressStageSpotlight" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.55" />
          <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.32" />
          <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>

        {/* Podium Floor Spotlight Pool */}
        <radialGradient id="stageFloorPool" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#0B1310" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>

        {/* Executive Backlight Halo */}
        <radialGradient id="executiveBackHalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ECFDF5" stopOpacity="0.65" />
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>

        {/* Gold Emblem Gradient */}
        <linearGradient id="binanceGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* Layer 1: Massive Volumetric Press Backlight Aura */}
      <circle cx="540" cy="1160" r="420" fill="url(#pressStageSpotlight)" opacity={auraPulse} />

      {/* Layer 2: High-Contrast Stage Floor & Perspective Grid */}
      <ellipse cx="540" cy="1440" rx="420" ry="60" fill="url(#stageFloorPool)" />
      <line x1="120" y1="1460" x2="960" y2="1460" stroke="#38BDF8" strokeWidth="2.5" opacity="0.6" />
      <line x1="240" y1="1480" x2="840" y2="1480" stroke="#162636" strokeWidth="2" opacity="0.5" />

      {/* ================================================================= */}
      {/* 2. ILLUMINATED PANORAMIC HEADQUARTERS ARCHITECTURAL SCREEN       */}
      {/* ================================================================= */}
      <g transform="translate(180, 910)">
        {/* Main Terminal Bezel */}
        <rect
          x="0"
          y="0"
          width="720"
          height="280"
          rx="12"
          fill="#0D161F"
          stroke="#38BDF8"
          strokeWidth="3"
        />
        {/* Upper Screen Header Bar */}
        <rect x="0" y="0" width="720" height="34" rx="12" fill="#162636" />
        <circle cx="24" cy="17" r="5" fill="#EF4444" />
        <circle cx="42" cy="17" r="5" fill="#F59E0B" />
        <circle cx="60" cy="17" r="5" fill="#22C55E" />
        <text
          x="84"
          y="23"
          fill="#ECFDF5"
          fontFamily="Montserrat, sans-serif"
          fontSize="13"
          fontWeight="800"
          letterSpacing="0.1em"
        >
          BINANCE GLOBAL TREASURY · EMERGENCY SOLVENCY TELEMETRY
        </text>

        {/* Glowing Grid Background inside Screen */}
        {[60, 120, 180, 240].map((gy, i) => (
          <line
            key={i}
            x1="12"
            y1={gy}
            x2="708"
            y2={gy}
            stroke="#1E293B"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
        ))}

        {/* Central Luminous Binance Diamond Logo Emblem */}
        <g transform="translate(360, 150) scale(0.9)">
          <polygon
            points="0,-50 45,0 0,50 -45,0"
            fill="none"
            stroke="url(#binanceGoldGrad)"
            strokeWidth="4"
          />
          <polygon
            points="0,-24 22,0 0,24 -22,0"
            fill="url(#binanceGoldGrad)"
            opacity="0.9"
          />
          <polygon points="-36,-12 -24,-24 -12,-12 -24,0" fill="#FEF08A" />
          <polygon points="36,-12 24,-24 12,-12 24,0" fill="#FEF08A" />
          <polygon points="-36,12 -24,0 -12,12 -24,24" fill="#FEF08A" />
          <polygon points="36,12 24,0 12,12 24,24" fill="#FEF08A" />
        </g>

        {/* Treasury Solvency Chart Vector (Recovery Curve) */}
        <path
          d="M 20 220 L 140 220 L 220 250 L 320 250 L 400 190 L 520 120 L 620 90 L 700 85"
          fill="none"
          stroke="#22C55E"
          strokeWidth="3.5"
        />
        {/* Chart Scanning Line */}
        <line
          x1={chartScanX - 180}
          y1="40"
          x2={chartScanX - 180}
          y2="265"
          stroke="#ECFDF5"
          strokeWidth="2"
          opacity="0.75"
        />

        {/* Metric Badge: 100% USER COVERAGE */}
        <rect x="500" y="225" width="200" height="38" rx="6" fill="#162636" stroke="#22C55E" strokeWidth="2" />
        <text
          x="600"
          y="250"
          fill="#ECFDF5"
          fontFamily="Montserrat, sans-serif"
          fontSize="14"
          fontWeight="900"
          textAnchor="middle"
        >
          RESERVES: 100% BACKED
        </text>
      </g>

      {/* ================================================================= */}
      {/* 3. EXECUTIVE BACKLIGHT HALO (Intense Silhouette Separation)       */}
      {/* ================================================================= */}
      <circle cx="540" cy="1160" r="160" fill="url(#executiveBackHalo)" />

      {/* ================================================================= */}
      {/* 4. THE LONE LEADER SILHOUETTE WITH CRISP RIM LIGHTING             */}
      {/* ================================================================= */}
      <g transform="translate(540, 1160)">
        {/* Silhouette Body (Torso & Shoulders) */}
        <path
          d="M -110 160 L -95 65 L -45 10 L 0 15 L 45 10 L 95 65 L 110 160 Z"
          fill="#090D12"
          stroke="#ECFDF5"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Head Silhouette with Crisp Ivory Rim */}
        <ellipse
          cx="0"
          cy="-40"
          rx="34"
          ry="44"
          fill="#090D12"
          stroke="#ECFDF5"
          strokeWidth="3.5"
        />

        {/* Sharp High-Contrast White Collar */}
        <polygon points="-24,10 0,38 24,10 14,8 0,22 -14,8" fill="#ECFDF5" />

        {/* Binance Brand Gold Tie Accent */}
        <polygon
          points="-8,24 8,24 10,95 0,112 -10,95"
          fill="url(#binanceGoldGrad)"
          stroke="#FEF08A"
          strokeWidth="1.5"
        />

        {/* Suit Lapel Seams */}
        <line x1="-45" y1="12" x2="-14" y2="85" stroke="#38BDF8" strokeWidth="2" opacity="0.75" />
        <line x1="45" y1="12" x2="14" y2="85" stroke="#38BDF8" strokeWidth="2" opacity="0.75" />

        {/* Micro-Motion: Subtle Resolute Breathing Loop */}
        <g transform={`translate(0, ${Math.sin(frame * 0.12) * 2})`}>
          {/* Left Arm Resting on Podium */}
          <path
            d="M -90 80 L -130 160 L -90 160"
            fill="none"
            stroke="#090D12"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <path
            d="M -90 80 L -130 160 L -90 160"
            fill="none"
            stroke="#ECFDF5"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Right Arm in Resolute Hand Clench */}
          <path
            d="M 90 80 L 130 160 L 90 160"
            fill="none"
            stroke="#090D12"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <path
            d="M 90 80 L 130 160 L 90 160"
            fill="none"
            stroke="#ECFDF5"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* ================================================================= */}
      {/* 5. PRESS PODIUM WITH METALLIC BEVELS & DUAL BROADCAST MICS        */}
      {/* ================================================================= */}
      <g transform="translate(540, 1310)">
        {/* Heavy Podium Base Silhouette */}
        <polygon
          points="-140,0 140,0 165,150 -165,150"
          fill="#0F172A"
          stroke="#F59E0B"
          strokeWidth="3.5"
        />
        {/* Chrome Top Bevel Rail */}
        <rect x="-155" y="-14" width="310" height="16" rx="4" fill="#1E293B" stroke="#ECFDF5" strokeWidth="2" />

        {/* Prominent Gold Binance Medallion on Podium Front */}
        <circle cx="0" cy="65" r="32" fill="#090D12" stroke="#F59E0B" strokeWidth="3" />
        <polygon
          points="0,45 16,65 0,85 -16,65"
          fill="url(#binanceGoldGrad)"
        />

        {/* Dual Gooseneck Broadcast Microphones */}
        {/* Left Mic */}
        <path
          d="M -75 -10 Q -65 -45 -40 -60"
          fill="none"
          stroke="#ECFDF5"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <rect x="-46" y="-72" width="12" height="18" rx="4" fill="#090D12" stroke="#38BDF8" strokeWidth="2" />
        <circle cx="-40" cy="-76" r="3" fill="#EF4444" /> {/* On-Air Tally LED */}

        {/* Right Mic */}
        <path
          d="M 75 -10 Q 65 -45 40 -60"
          fill="none"
          stroke="#ECFDF5"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <rect x="34" y="-72" width="12" height="18" rx="4" fill="#090D12" stroke="#38BDF8" strokeWidth="2" />
        <circle cx="40" cy="-76" r="3" fill="#EF4444" /> {/* On-Air Tally LED */}
      </g>

      {/* ================================================================= */}
      {/* 6. DYNAMIC PRESS CAMERA FLASH BURSTS (High-Impact Audience Flares) */}
      {/* ================================================================= */}
      {flash1 > 0 && (
        <g transform="translate(260, 1450)" opacity={flash1}>
          <circle cx="0" cy="0" r="28" fill="#FFFFFF" />
          <line x1="-70" y1="0" x2="70" y2="0" stroke="#FFFFFF" strokeWidth="4" />
          <line x1="0" y1="-70" x2="0" y2="70" stroke="#FFFFFF" strokeWidth="4" />
          <line x1="-45" y1="-45" x2="45" y2="45" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="-45" y1="45" x2="45" y2="-45" stroke="#FFFFFF" strokeWidth="2" />
        </g>
      )}

      {flash2 > 0 && (
        <g transform="translate(820, 1440)" opacity={flash2}>
          <circle cx="0" cy="0" r="32" fill="#FFFFFF" />
          <line x1="-80" y1="0" x2="80" y2="0" stroke="#FFFFFF" strokeWidth="4" />
          <line x1="0" y1="-80" x2="0" y2="80" stroke="#FFFFFF" strokeWidth="4" />
          <line x1="-50" y1="-50" x2="50" y2="50" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="-50" y1="50" x2="50" y2="-50" stroke="#FFFFFF" strokeWidth="2" />
        </g>
      )}

      {flash3 > 0 && (
        <g transform="translate(540, 1470)" opacity={flash3}>
          <circle cx="0" cy="0" r="24" fill="#FFFFFF" />
          <line x1="-60" y1="0" x2="60" y2="0" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="0" y1="-60" x2="0" y2="60" stroke="#FFFFFF" strokeWidth="3" />
        </g>
      )}
    </svg>
  );
};

// =========================================================================
// 15. SCENE 15: VAULT_RESERVES_RESTORATION_SPLIT (Split Confrontation)
// High-Fidelity Split: Physical Gold Bullion Reserve Pallet vs Fortified User Accounts
// =========================================================================
export const VaultReservesRestorationSplit: React.FC = () => {
  const frame = useCurrentFrame();
  const splitX = 540;
  const transferPulse = (frame * 5) % 180;

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <defs>
        {/* Gold Bullion Ingot Gradient */}
        <linearGradient id="ingotGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="85%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
        {/* User Shield Emerald Gradient */}
        <linearGradient id="emeraldShieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
      </defs>

      {/* ================================================================= */}
      {/* LEFT: CORPORATE TREASURY REPLENISHMENT (Stacks of Fine Gold Bars) */}
      {/* ================================================================= */}
      <rect x="0" y="864" width={splitX} height="634" fill="#090D12" />
      <g transform="translate(80, 940)">
        {/* Vault Interior Steel Chamber */}
        <rect x="20" y="0" width="400" height="480" rx="12" fill="#0F172A" stroke="#F59E0B" strokeWidth="3" />
        <rect x="20" y="0" width="400" height="42" rx="12" fill="#1E293B" />
        <text x="40" y="28" fill="#FEF08A" fontFamily={montserrat.fontFamily} fontSize="14" fontWeight="900" letterSpacing="0.08em">
          CORPORATE TREASURY RESERVE · DEPLOYED
        </text>

        {/* 4 Tiers of Realistic 3D Stacked Gold Bullion Bars on Heavy Steel Pallet */}
        {/* Heavy Pallet Base */}
        <rect x="50" y="380" width="340" height="24" rx="4" fill="#16221E" stroke="#38BDF8" strokeWidth="2" />
        <rect x="70" y="404" width="40" height="20" fill="#090D12" />
        <rect x="200" y="404" width="40" height="20" fill="#090D12" />
        <rect x="330" y="404" width="40" height="20" fill="#090D12" />

        {/* Tier 1 (Bottom 3 Bars) */}
        {[60, 160, 260].map((bx, i) => (
          <g key={`t1-${i}`} transform={`translate(${bx}, 320)`}>
            <polygon points="0,0 80,0 95,-20 15,-20" fill="url(#ingotGoldGrad)" stroke="#FEF08A" strokeWidth="1" />
            <rect x="0" y="0" width="80" height="40" fill="url(#ingotGoldGrad)" stroke="#78350F" strokeWidth="1.5" />
            <polygon points="80,0 95,-20 95,20 80,40" fill="#B45309" stroke="#FEF08A" strokeWidth="1" />
            <text x="40" y="24" fill="#78350F" fontFamily={montserrat.fontFamily} fontSize="9" fontWeight="900" textAnchor="middle">999.9</text>
          </g>
        ))}

        {/* Tier 2 (Middle 3 Bars) */}
        {[75, 175, 275].map((bx, i) => (
          <g key={`t2-${i}`} transform={`translate(${bx}, 260)`}>
            <polygon points="0,0 80,0 95,-20 15,-20" fill="url(#ingotGoldGrad)" stroke="#FEF08A" strokeWidth="1" />
            <rect x="0" y="0" width="80" height="40" fill="url(#ingotGoldGrad)" stroke="#78350F" strokeWidth="1.5" />
            <polygon points="80,0 95,-20 95,20 80,40" fill="#B45309" stroke="#FEF08A" strokeWidth="1" />
            <text x="40" y="24" fill="#78350F" fontFamily={montserrat.fontFamily} fontSize="9" fontWeight="900" textAnchor="middle">FINE GOLD</text>
          </g>
        ))}

        {/* Tier 3 (Upper 2 Bars) */}
        {[115, 215].map((bx, i) => (
          <g key={`t3-${i}`} transform={`translate(${bx}, 200)`}>
            <polygon points="0,0 80,0 95,-20 15,-20" fill="url(#ingotGoldGrad)" stroke="#FEF08A" strokeWidth="1" />
            <rect x="0" y="0" width="80" height="40" fill="url(#ingotGoldGrad)" stroke="#78350F" strokeWidth="1.5" />
            <polygon points="80,0 95,-20 95,20 80,40" fill="#B45309" stroke="#FEF08A" strokeWidth="1" />
            <text x="40" y="24" fill="#78350F" fontFamily={montserrat.fontFamily} fontSize="9" fontWeight="900" textAnchor="middle">1 KILO</text>
          </g>
        ))}

        {/* Top Ingot */}
        <g transform="translate(165, 140)">
          <polygon points="0,0 80,0 95,-20 15,-20" fill="url(#ingotGoldGrad)" stroke="#FEF08A" strokeWidth="1" />
          <rect x="0" y="0" width="80" height="40" fill="url(#ingotGoldGrad)" stroke="#78350F" strokeWidth="1.5" />
          <polygon points="80,0 95,-20 95,20 80,40" fill="#B45309" stroke="#FEF08A" strokeWidth="1" />
          <text x="40" y="24" fill="#78350F" fontFamily={montserrat.fontFamily} fontSize="9" fontWeight="900" textAnchor="middle">GUARANTEE</text>
        </g>
      </g>

      {/* ================================================================= */}
      {/* RIGHT: EVERYDAY VICTIMS RESTORED & PROTECTED                      */}
      {/* ================================================================= */}
      <rect x={splitX} y="864" width={splitX} height="634" fill="#090D12" />
      <g transform="translate(580, 940)">
        {/* Secure User Ledger Wall */}
        <rect x="0" y="0" width="420" height="480" rx="12" fill="#0F172A" stroke="#22C55E" strokeWidth="3" />
        <rect x="0" y="0" width="420" height="42" rx="12" fill="#14532D" />
        <text x="20" y="28" fill="#ECFDF5" fontFamily={montserrat.fontFamily} fontSize="14" fontWeight="900" letterSpacing="0.08em">
          CONSUMER PROTECTION · 100% REIMBURSED
        </text>

        {/* 3 Real User Account Security Cards with Shield Glyphs */}
        {[
          { user: 'USER ID #892-A', bal: '+$42,850.00', status: 'RESTORED' },
          { user: 'USER ID #104-F', bal: '+$118,200.00', status: 'RESTORED' },
          { user: 'USER ID #772-X', bal: '+$8,450.00', status: 'RESTORED' },
        ].map((card, idx) => (
          <g key={idx} transform={`translate(20, ${70 + idx * 125})`}>
            {/* Card Background */}
            <rect x="0" y="0" width="380" height="105" rx="8" fill="#16221E" stroke="#22C55E" strokeWidth="2" />
            {/* Emerald Protection Shield */}
            <g transform="translate(40, 52)">
              <polygon points="0,-24 20,-10 20,12 0,26 -20,12 -20,-10" fill="url(#emeraldShieldGrad)" stroke="#ECFDF5" strokeWidth="2" />
              {/* Checkmark */}
              <polyline points="-8,-2 -2,6 8,-6" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            </g>
            {/* User Credentials */}
            <text x="80" y="38" fill="#ECFDF5" fontFamily={montserrat.fontFamily} fontSize="14" fontWeight="800">
              {card.user}
            </text>
            {/* Reimbursed Amount in Glowing Green */}
            <text x="80" y="70" fill="#22C55E" fontFamily={montserrat.fontFamily} fontSize="20" fontWeight="900">
              {card.bal}
            </text>
            {/* Status Ribbon */}
            <rect x="270" y="48" width="95" height="26" rx="4" fill="#15803D" />
            <text x="317" y="66" fill="#FFFFFF" fontFamily={montserrat.fontFamily} fontSize="12" fontWeight="900" textAnchor="middle">
              {card.status}
            </text>
          </g>
        ))}
      </g>

      {/* Center High-Voltage Transfer Axis */}
      <line x1={splitX} y1="864" x2={splitX} y2="1498" stroke="#F59E0B" strokeWidth="4" />
      {/* Active Gold Liquidity Transfer Beams across Divider */}
      {[1080, 1200, 1320].map((by, i) => (
        <circle key={i} cx={splitX - 60 + transferPulse} cy={by} r="8" fill="#FEF08A" />
      ))}
    </svg>
  );
};

// =========================================================================
// 16. SCENE 16: BORDER_WALLS_DEFEATED_MAP (Vector Map)
// Authentic Panmunjom DMZ Border: Concrete Dragon's Teeth, Razor Wire & Orbital Beam
// =========================================================================
export const BorderWallsDefeatedMap: React.FC = () => {
  const frame = useCurrentFrame();
  const searchlightRot = Math.sin(frame * 0.08) * 25;

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <defs>
        {/* Satellite Laser Data Beam Gradient */}
        <linearGradient id="orbitalBeamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#ECFDF5" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0.85" />
        </linearGradient>
        {/* Watchtower Searchlight Cone */}
        <linearGradient id="searchlightCone" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Heavy DMZ Barren Perimeter Ground (38th Parallel Earth) */}
      <rect x="0" y="864" width="1080" height="634" fill="#0B1310" />

      {/* ================================================================= */}
      {/* 1. PHYSICAL DMZ FORTIFICATIONS (Concrete Dragon's Teeth & Wire)   */}
      {/* ================================================================= */}
      {/* Concrete Anti-Tank Pyramids ("Dragon's Teeth") in Perspective */}
      <g transform="translate(80, 1340)">
        {Array.from({ length: 8 }).map((_, idx) => (
          <polygon
            key={idx}
            points={`${idx * 115},60 ${idx * 115 + 40},0 ${idx * 115 + 80},60`}
            fill="#1E293B"
            stroke="#ECFDF5"
            strokeWidth="2.5"
          />
        ))}
      </g>

      {/* High-Tension Concrete Border Fence Posts */}
      <g transform="translate(100, 1180)">
        {Array.from({ length: 9 }).map((_, idx) => (
          <g key={idx} transform={`translate(${idx * 105}, 0)`}>
            <line x1="0" y1="0" x2="0" y2="180" stroke="#334155" strokeWidth="6" />
            <line x1="-12" y1="-12" x2="12" y2="12" stroke="#38BDF8" strokeWidth="2.5" />
          </g>
        ))}
        {/* Strands of Razor Concertina Barbed Wire */}
        {[20, 60, 100, 140].map((wy, i) => (
          <path
            key={i}
            d="M 0 0 C 40 25 80 -25 120 0 C 160 25 200 -25 240 0 C 280 25 320 -25 360 0 C 400 25 440 -25 480 0 C 520 25 560 -25 600 0 C 640 25 680 -25 720 0 C 760 25 800 -25 840 0"
            fill="none"
            stroke="#ECFDF5"
            strokeWidth="2"
            transform={`translate(0, ${wy})`}
            opacity="0.8"
          />
        ))}
      </g>

      {/* High-Altitude DMZ Steel Watchtower (x = 160) */}
      <g transform="translate(160, 1060)">
        {/* Structural Steel Lattice Legs */}
        <line x1="0" y1="0" x2="-35" y2="300" stroke="#1E293B" strokeWidth="7" />
        <line x1="60" y1="0" x2="95" y2="300" stroke="#1E293B" strokeWidth="7" />
        <line x1="-15" y1="120" x2="75" y2="120" stroke="#38BDF8" strokeWidth="3" />
        <line x1="-25" y1="210" x2="85" y2="210" stroke="#38BDF8" strokeWidth="3" />
        {/* Watchtower Guard Cabin */}
        <rect x="-15" y="-55" width="90" height="55" rx="4" fill="#090D12" stroke="#ECFDF5" strokeWidth="3" />
        <rect x="-5" y="-45" width="70" height="24" rx="2" fill="#38BDF8" opacity="0.4" />
        {/* Armed Border Sentry Silhouette */}
        <circle cx="30" cy="-35" r="7" fill="#090D12" stroke="#ECFDF5" strokeWidth="1.5" />
        {/* Sweeping Military Searchlight */}
        <g transform={`translate(30, -5) rotate(${searchlightRot})`}>
          <polygon points="0,0 350,220 220,380" fill="url(#searchlightCone)" />
        </g>
      </g>

      {/* ================================================================= */}
      {/* 2. ORBITAL SATELLITE BEAM SOARING HUNDREDS OF METERS ABOVE WALL   */}
      {/* ================================================================= */}
      {/* Orbital Satellite Dish Transmitter in High Stratosphere */}
      <g transform="translate(820, 940)">
        <ellipse cx="0" cy="0" rx="45" ry="24" fill="#090D12" stroke="#38BDF8" strokeWidth="3" transform="rotate(-35)" />
        <line x1="0" y1="0" x2="-25" y2="18" stroke="#ECFDF5" strokeWidth="4" />
        <circle cx="-25" cy="18" r="5" fill="#EF4444" />
      </g>

      {/* Laser-Straight High-Bandwidth Cyber Beam Traversing the DMZ */}
      <line
        x1="80"
        y1="980"
        x2="1000"
        y2="980"
        stroke="url(#orbitalBeamGrad)"
        strokeWidth="6"
      />
      <line
        x1="80"
        y1="980"
        x2="1000"
        y2="980"
        stroke="#FFFFFF"
        strokeWidth="2"
      />

      {/* Billions in Digital Currency Packets Gliding Effortlessly Over the Wall */}
      {Array.from({ length: 6 }).map((_, p) => {
        const offset = ((p * 155 + frame * 8) % 920);
        return (
          <g key={p} transform={`translate(${80 + offset}, 980)`}>
            <circle cx="0" cy="0" r="14" fill="#EF4444" stroke="#FEF08A" strokeWidth="2" />
            <text x="0" y="5" fill="#FEF08A" fontFamily={montserrat.fontFamily} fontSize="12" fontWeight="900" textAnchor="middle">$</text>
          </g>
        );
      })}

      {/* Tactical Demarcation Tag */}
      <rect x="420" y="1430" width="240" height="34" rx="4" fill="#0B1310" stroke="#EF4444" strokeWidth="2" />
      <text
        x="540"
        y="1452"
        fill="#ECFDF5"
        fontFamily={montserrat.fontFamily}
        fontSize="13"
        fontWeight="900"
        letterSpacing="0.1em"
        textAnchor="middle"
      >
        38TH PARALLEL DMZ FORTRESS
      </text>
    </svg>
  );
};

// =========================================================================
// 17. SCENE 17: MEDALS_ON_CHILD_SOLDIERS_TALLY (Crowd Tally)
// Authentic North Korean Youth Military Cadets with Order of the Flag Medals
// =========================================================================
export const MedalsOnChildSoldiersTally: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <defs>
        {/* Ceremonial Backlight Aura */}
        <radialGradient id="ceremonialRedAura" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.45" />
          <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="540" cy="1160" r="400" fill="url(#ceremonialRedAura)" />

      {/* Five Authentic North Korean Youth Military Cadets in Formal Parade Review */}
      <g transform="translate(180, 1020)">
        {Array.from({ length: 5 }).map((_, idx) => {
          const breathe = Math.sin(frame * 0.12 + idx * 0.8) * 2;
          const cadetX = idx * 148;
          return (
            <g key={idx} transform={`translate(${cadetX}, ${breathe})`}>
              {/* Cadet Peaked Military Visor Cap */}
              <ellipse cx="60" cy="18" rx="26" ry="10" fill="#090D12" stroke="#ECFDF5" strokeWidth="2" />
              <polygon points="40,24 80,24 86,30 34,30" fill="#020617" stroke="#38BDF8" strokeWidth="1" /> {/* Visor */}
              {/* Red Star Cap Badge */}
              <polygon
                points="60,11 63,18 70,18 64,22 66,29 60,25 54,29 56,22 50,18 57,18"
                fill="#EF4444"
              />

              {/* Head & Neck Silhouette with Ivory Rim Stroke */}
              <ellipse cx="60" cy="48" rx="22" ry="26" fill="#090D12" stroke="#ECFDF5" strokeWidth="2.5" />

              {/* Red Young Pioneer / Military Neckerchief Knot */}
              <polygon points="54,72 66,72 68,95 60,110 52,95" fill="#EF4444" stroke="#FEF08A" strokeWidth="1" />

              {/* Formal Military Cadet Tunic (Torso & Shoulders) */}
              <path
                d="M 15 85 L 42 74 L 78 74 L 105 85 L 98 220 L 22 220 Z"
                fill="#090D12"
                stroke="#ECFDF5"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              {/* Brass Shoulder Rank Epaulets */}
              <polygon points="15,85 35,76 38,82 18,91" fill="#F59E0B" />
              <polygon points="105,85 85,76 82,82 102,91" fill="#F59E0B" />

              {/* Double Brass Buttons down Tunic Center */}
              <circle cx="60" cy="125" r="3.5" fill="#F59E0B" />
              <circle cx="60" cy="155" r="3.5" fill="#F59E0B" />
              <circle cx="60" cy="185" r="3.5" fill="#F59E0B" />

              {/* Authentic Order of the National Flag Medal Pinned to Left Chest */}
              <g transform="translate(36, 120)">
                {/* Ribbon Bar */}
                <rect x="-8" y="-12" width="16" height="10" fill="#EF4444" stroke="#F59E0B" strokeWidth="1" />
                {/* Five-Pointed Gold Star Medallion */}
                <polygon
                  points="0,-8 3,0 10,0 4,5 7,12 0,7 -7,12 -4,5 -10,0 -3,0"
                  fill="#F59E0B"
                  stroke="#FEF08A"
                  strokeWidth="1.5"
                />
                <circle cx="0" cy="2" r="3" fill="#EF4444" />
              </g>

              {/* Rigid Attention Arms */}
              <line x1="20" y1="90" x2="16" y2="220" stroke="#090D12" strokeWidth="18" strokeLinecap="round" />
              <line x1="20" y1="90" x2="16" y2="220" stroke="#ECFDF5" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="100" y1="90" x2="104" y2="220" stroke="#090D12" strokeWidth="18" strokeLinecap="round" />
              <line x1="100" y1="90" x2="104" y2="220" stroke="#ECFDF5" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          );
        })}
      </g>

      {/* Formal Ceremonial Review Rostrum Plinth */}
      <g transform="translate(140, 1370)">
        <rect x="0" y="0" width="800" height="70" fill="#090D12" stroke="#162636" strokeWidth="3" />
        <rect x="10" y="10" width="780" height="12" fill="#EF4444" opacity="0.8" />
        <text
          x="400"
          y="48"
          fill="#ECFDF5"
          fontFamily={montserrat.fontFamily}
          fontSize="14"
          fontWeight="900"
          letterSpacing="0.15em"
          textAnchor="middle"
        >
          UNIT 121 CYBER WARFARE CADETS · STATE CITATION 2026
        </text>
      </g>
    </svg>
  );
};

// =========================================================================
// 18. SCENE 18: ISOLATED_HACKER_DARK_CELL (Lone Leader)
// Fixed Contrast: Volumetric Moonlight Beam & Ivory Rim Separation
// =========================================================================
export const IsolatedHackerDarkCell: React.FC = () => {
  const frame = useCurrentFrame();
  const ledBlink = Math.sin(frame * 0.25) > 0 ? 1 : 0.3;

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <defs>
        {/* Volumetric Cold Glacial Moonlight Shaft */}
        <linearGradient id="cellMoonlight" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
          <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.35" />
          <stop offset="85%" stopColor="#162636" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </linearGradient>
        {/* Red Standby LED Terminal Glow */}
        <radialGradient id="terminalRedAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#EF4444" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Concrete Cell Interior with Visible Architectural Outlines */}
      <rect x="140" y="880" width="800" height="560" rx="8" fill="#090D12" stroke="#2D3748" strokeWidth="4" />
      <line x1="140" y1="1340" x2="940" y2="1340" stroke="#16221E" strokeWidth="3" />

      {/* Volumetric Moonlight Shaft Streaming from High Barred Window */}
      <polygon points="700,920 860,920 520,1440 220,1440" fill="url(#cellMoonlight)" />

      {/* High Barred Window with Radiant White Moonlight Backing */}
      <g transform="translate(700, 920)">
        <rect x="0" y="0" width="160" height="130" fill="#ECFDF5" stroke="#38BDF8" strokeWidth="4" />
        {/* Heavy Iron Bars */}
        <line x1="40" y1="0" x2="40" y2="130" stroke="#090D12" strokeWidth="8" />
        <line x1="80" y1="0" x2="80" y2="130" stroke="#090D12" strokeWidth="8" />
        <line x1="120" y1="0" x2="120" y2="130" stroke="#090D12" strokeWidth="8" />
        <line x1="0" y1="65" x2="160" y2="65" stroke="#090D12" strokeWidth="6" />
      </g>

      {/* Solitary Operative Sitting on Iron Cot in the Path of Moonlight */}
      <g transform="translate(260, 1110)">
        {/* Bed Cast Shadow on Floor */}
        <ellipse cx="200" cy="275" rx="190" ry="24" fill="#05070A" opacity="0.8" />

        {/* Iron Cot Frame with Crisp Cyan/Steel Outlines */}
        <rect x="20" y="180" width="360" height="28" rx="4" fill="#162636" stroke="#38BDF8" strokeWidth="2.5" />
        <rect x="40" y="166" width="320" height="16" rx="3" fill="#243342" />
        {/* Cot Legs */}
        <line x1="45" y1="208" x2="45" y2="270" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" />
        <line x1="355" y1="208" x2="355" y2="270" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" />

        {/* Slumped Operative Silhouette with Radiant Ivory Moonlight Rim */}
        <g transform="translate(40, 0)">
          {/* Head resting in hands */}
          <circle cx="160" cy="85" r="28" fill="#090D12" stroke="#ECFDF5" strokeWidth="3.5" />
          {/* Torso & curved spine */}
          <path
            d="M 120 125 Q 160 100 200 125 L 195 210 L 125 210 Z"
            fill="#090D12"
            stroke="#ECFDF5"
            strokeWidth="3.5"
          />
          {/* Legs hanging off cot edge */}
          <path
            d="M 195 190 Q 225 200 230 240 L 225 280 L 205 280 L 195 240 Z"
            fill="#090D12"
            stroke="#ECFDF5"
            strokeWidth="3"
          />
        </g>

        {/* Small Nightstand Table with Blinking Locked Terminal */}
        <g transform="translate(410, 150)">
          <rect x="0" y="30" width="75" height="90" fill="#16221E" stroke="#38BDF8" strokeWidth="2" />
          {/* Terminal Screen casting Red Emergency Light */}
          <rect x="10" y="0" width="55" height="42" rx="4" fill="#0B1310" stroke="#EF4444" strokeWidth="2" />
          <circle cx="37" cy="21" r="14" fill="url(#terminalRedAura)" opacity={ledBlink} />
          <circle cx="37" cy="21" r="4" fill="#EF4444" opacity={ledBlink} />
        </g>
      </g>
    </svg>
  );
};

// =========================================================================
// 19. SCENE 19: DIGITAL_FORTRESS_COLLAPSE (Structural Fracture)
// Monumental Classical Financial Citadel Shattering & Collapsing from Cyber Strike
// =========================================================================
export const DigitalFortressCollapse: React.FC = () => {
  const frame = useCurrentFrame();

  // Payoff slam occurs at frame 45 ("YET THE FORTRESS FELL" on impact shake)
  const collapseProgress = interpolate(frame, [45, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const shockRadius = interpolate(frame, [45, 85], [20, 460], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockAlpha = interpolate(frame, [45, 55, 85], [0.95, 0.85, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Structural displacement angles and sink distances
  const leftPedimentTilt = collapseProgress * -14;
  const leftPedimentDrop = collapseProgress * 65;
  const rightPedimentTilt = collapseProgress * 16;
  const rightPedimentDrop = collapseProgress * 80;

  const col2Tilt = collapseProgress * -10;
  const col3Tilt = collapseProgress * 12;

  const alarmStrobe = frame >= 44 && Math.sin(frame * 0.4) > 0;

  // 18 Masonry Rubble Blocks tumbling from the collapsing citadel roof
  const MASONRY_RUBBLE = [
    { xInit: 320, xDrift: -65, speed: 6.5, size: 28, rot: 120 },
    { xInit: 380, xDrift: -35, speed: 8.2, size: 24, rot: 190 },
    { xInit: 440, xDrift: -15, speed: 9.5, size: 32, rot: 80 },
    { xInit: 500, xDrift: -5,  speed: 10.5, size: 36, rot: 240 },
    { xInit: 540, xDrift: 15,  speed: 11.2, size: 30, rot: 160 },
    { xInit: 580, xDrift: 25,  speed: 9.8, size: 34, rot: 95 },
    { xInit: 640, xDrift: 45,  speed: 8.6, size: 26, rot: 290 },
    { xInit: 700, xDrift: 75,  speed: 7.2, size: 30, rot: 140 },
    { xInit: 360, xDrift: -50, speed: 7.8, size: 20, rot: 210 },
    { xInit: 480, xDrift: -20, speed: 9.2, size: 22, rot: 310 },
    { xInit: 560, xDrift: 30,  speed: 10.0, size: 24, rot: 45 },
    { xInit: 660, xDrift: 60,  speed: 8.0, size: 18, rot: 175 },
  ];

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <defs>
        {/* Layer 1: Catastrophic Detonation Aura */}
        <radialGradient id="fortressBlastAura" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity={frame >= 44 ? 0.65 : 0.25} />
          <stop offset="45%" stopColor="#F59E0B" stopOpacity={frame >= 44 ? 0.35 : 0.12} />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>

        {/* Classical Stone Block Gradient with High-Contrast Bevel */}
        <linearGradient id="citadelStoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="50%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        {/* Foundation Smoke Cloud Gradient */}
        <radialGradient id="dustPlumeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#334155" stopOpacity="0.7" />
          <stop offset="70%" stopColor="#1E293B" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Layer 1: Detonation Aura */}
      <circle cx="540" cy="1180" r="440" fill="url(#fortressBlastAura)" />

      {/* ================================================================= */}
      {/* 1. FLANKING ARTILLERY CANNON SILHOUETTES ("NO ARTILLERY WAS FIRED") */}
      {/* ================================================================= */}
      {/* Left Silent Siege Gun (x = 130, y = 1420) */}
      <g transform="translate(130, 1400)">
        {/* Ground Embankment */}
        <polygon points="-30,60 120,60 100,20 -20,20" fill="#090D12" stroke="#162636" strokeWidth="2" />
        {/* Carriage Wheels */}
        <circle cx="25" cy="30" r="22" fill="#090D12" stroke="#ECFDF5" strokeWidth="2.5" />
        <circle cx="25" cy="30" r="10" fill="#162636" />
        {/* Long Artillery Barrel Elevated at 45 deg - Cold, Silent */}
        <line x1="25" y1="30" x2="85" y2="-20" stroke="#ECFDF5" strokeWidth="8" strokeLinecap="round" />
        <line x1="25" y1="30" x2="85" y2="-20" stroke="#090D12" strokeWidth="4" strokeLinecap="round" />
        {/* Zero Shells Holographic Tag */}
        <rect x="-10" y="-35" width="95" height="22" rx="4" fill="#0B1310" stroke="#38BDF8" strokeWidth="1.5" />
        <text
          x="37"
          y="-20"
          fill="#38BDF8"
          fontFamily={montserrat.fontFamily}
          fontSize="11"
          fontWeight="900"
          textAnchor="middle"
        >
          SHELLS: 0
        </text>
      </g>

      {/* Right Silent Siege Gun (x = 870, y = 1420) */}
      <g transform="translate(870, 1400)">
        <polygon points="-20,60 130,60 110,20 -10,20" fill="#090D12" stroke="#162636" strokeWidth="2" />
        <circle cx="75" cy="30" r="22" fill="#090D12" stroke="#ECFDF5" strokeWidth="2.5" />
        <circle cx="75" cy="30" r="10" fill="#162636" />
        {/* Long Artillery Barrel Elevated Facing Inward */}
        <line x1="75" y1="30" x2="15" y2="-20" stroke="#ECFDF5" strokeWidth="8" strokeLinecap="round" />
        <line x1="75" y1="30" x2="15" y2="-20" stroke="#090D12" strokeWidth="4" strokeLinecap="round" />
        <rect x="15" y="-35" width="95" height="22" rx="4" fill="#0B1310" stroke="#38BDF8" strokeWidth="1.5" />
        <text
          x="62"
          y="-20"
          fill="#38BDF8"
          fontFamily={montserrat.fontFamily}
          fontSize="11"
          fontWeight="900"
          textAnchor="middle"
        >
          SHELLS: 0
        </text>
      </g>

      {/* ================================================================= */}
      {/* 2. FOUNDATION PLINTH & GROUND SHOCKWAVE                           */}
      {/* ================================================================= */}
      {frame >= 45 && (
        <>
          <circle
            cx="540"
            cy="1420"
            r={shockRadius}
            fill="none"
            stroke="#EF4444"
            strokeWidth="5"
            opacity={shockAlpha}
          />
          <circle
            cx="540"
            cy="1420"
            r={shockRadius * 0.65}
            fill="none"
            stroke="#FEF08A"
            strokeWidth="3"
            opacity={shockAlpha}
          />
        </>
      )}

      {/* Fortress Stone Foundation Steps */}
      <g transform="translate(180, 1370)">
        <rect x="0" y="40" width="720" height="40" fill="#090D12" stroke="#ECFDF5" strokeWidth="2.5" />
        <rect x="40" y="15" width="640" height="25" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
        <rect x="80" y="0" width="560" height="15" fill="#162636" stroke="#38BDF8" strokeWidth="2" />
      </g>

      {/* Central Fortress Blast Gate (Breached & Blazing Red from Within) */}
      <g transform="translate(480, 1200)">
        <rect x="0" y="0" width="120" height="170" rx="60 60 0 0" fill="#040608" stroke="#16221E" strokeWidth="4" />
        <rect
          x="10"
          y="10"
          width="100"
          height="160"
          rx="50 50 0 0"
          fill="#EF4444"
          opacity={frame >= 44 ? (alarmStrobe ? 0.75 : 0.35) : 0.15}
        />
        {/* Blown open iron gate grates */}
        <line x1="20" y1="40" x2="100" y2="40" stroke="#ECFDF5" strokeWidth="3" />
        <line x1="20" y1="80" x2="100" y2="80" stroke="#ECFDF5" strokeWidth="3" />
        <line x1="20" y1="120" x2="100" y2="120" stroke="#ECFDF5" strokeWidth="3" />
      </g>

      {/* ================================================================= */}
      {/* 3. FOUR GRAND CLASSICAL COLUMNS (Buckling & Collapsing)           */}
      {/* ================================================================= */}
      {/* Outer Left Column 1 (Fixed Plinth) */}
      <g transform="translate(260, 1020)">
        <rect x="0" y="0" width="60" height="350" fill="url(#citadelStoneGrad)" stroke="#ECFDF5" strokeWidth="2.5" />
        <line x1="15" y1="0" x2="15" y2="350" stroke="#38BDF8" strokeWidth="2" opacity="0.6" />
        <line x1="45" y1="0" x2="45" y2="350" stroke="#38BDF8" strokeWidth="2" opacity="0.6" />
      </g>

      {/* Inner Left Column 2 (Buckling inward at frame 45) */}
      <g transform={`translate(${410 - collapseProgress * 30}, ${1020 + collapseProgress * 25}) rotate(${col2Tilt} 30 175)`}>
        <rect x="0" y="0" width="60" height="350" fill="url(#citadelStoneGrad)" stroke={frame >= 45 ? '#EF4444' : '#ECFDF5'} strokeWidth="3" />
        <line x1="15" y1="0" x2="15" y2="350" stroke="#38BDF8" strokeWidth="2" opacity="0.6" />
        <line x1="45" y1="0" x2="45" y2="350" stroke="#38BDF8" strokeWidth="2" opacity="0.6" />
        {/* Diagonal Failure Fracture */}
        {frame >= 44 && (
          <line x1="0" y1="180" x2="60" y2="140" stroke="#EF4444" strokeWidth="5" />
        )}
      </g>

      {/* Inner Right Column 3 (Buckling outward at frame 45) */}
      <g transform={`translate(${610 + collapseProgress * 35}, ${1020 + collapseProgress * 30}) rotate(${col3Tilt} 30 175)`}>
        <rect x="0" y="0" width="60" height="350" fill="url(#citadelStoneGrad)" stroke={frame >= 45 ? '#EF4444' : '#ECFDF5'} strokeWidth="3" />
        <line x1="15" y1="0" x2="15" y2="350" stroke="#38BDF8" strokeWidth="2" opacity="0.6" />
        <line x1="45" y1="0" x2="45" y2="350" stroke="#38BDF8" strokeWidth="2" opacity="0.6" />
        {/* Diagonal Failure Fracture */}
        {frame >= 44 && (
          <line x1="0" y1="120" x2="60" y2="170" stroke="#EF4444" strokeWidth="5" />
        )}
      </g>

      {/* Outer Right Column 4 (Fixed Plinth) */}
      <g transform="translate(760, 1020)">
        <rect x="0" y="0" width="60" height="350" fill="url(#citadelStoneGrad)" stroke="#ECFDF5" strokeWidth="2.5" />
        <line x1="15" y1="0" x2="15" y2="350" stroke="#38BDF8" strokeWidth="2" opacity="0.6" />
        <line x1="45" y1="0" x2="45" y2="350" stroke="#38BDF8" strokeWidth="2" opacity="0.6" />
      </g>

      {/* ================================================================= */}
      {/* 4. GRAND CITADEL PEDIMENT (Splitting in Two & Dropping Down)      */}
      {/* ================================================================= */}
      {/* Left Pediment Half */}
      <g transform={`translate(${540 - collapseProgress * 40}, ${970 + leftPedimentDrop}) rotate(${leftPedimentTilt})`}>
        <polygon
          points="-330,50 -20,-60 -20,50"
          fill="url(#citadelStoneGrad)"
          stroke={frame >= 45 ? '#EF4444' : '#ECFDF5'}
          strokeWidth="3.5"
        />
        {/* Cornice Dentil Molding */}
        <line x1="-330" y1="46" x2="-20" y2="46" stroke="#38BDF8" strokeWidth="3" />
      </g>

      {/* Right Pediment Half */}
      <g transform={`translate(${540 + collapseProgress * 45}, ${970 + rightPedimentDrop}) rotate(${rightPedimentTilt})`}>
        <polygon
          points="20,-60 330,50 20,50"
          fill="url(#citadelStoneGrad)"
          stroke={frame >= 45 ? '#EF4444' : '#ECFDF5'}
          strokeWidth="3.5"
        />
        {/* Cornice Dentil Molding */}
        <line x1="20" y1="46" x2="330" y2="46" stroke="#38BDF8" strokeWidth="3" />
      </g>

      {/* Central Jagged Lightning Fissure tearing down the Citadel Center */}
      {frame >= 43 && (
        <path
          d="M 540 910 L 528 970 L 555 1040 L 530 1120 L 550 1210 L 540 1370"
          fill="none"
          stroke="#EF4444"
          strokeWidth="7"
          strokeLinecap="round"
        />
      )}

      {/* Central Bank Citadel Shield Medallion (Shattering at frame 45) */}
      <g transform={`translate(540, 970) scale(${frame >= 45 ? 1 + collapseProgress * 0.3 : 1})`}>
        <polygon
          points="0,-36 28,-14 28,18 0,36 -28,18 -28,-14"
          fill="#090D12"
          stroke="#F59E0B"
          strokeWidth="3"
        />
        <text
          x="0"
          y="10"
          fill="#FEF08A"
          fontFamily={montserrat.fontFamily}
          fontSize="22"
          fontWeight="900"
          textAnchor="middle"
        >
          $
        </text>
      </g>

      {/* ================================================================= */}
      {/* 5. CASCADING MASONRY RUBBLE & GRAVITY TUMBLING DEBRIS             */}
      {/* ================================================================= */}
      {frame >= 45 && (
        <g>
          {MASONRY_RUBBLE.map((rubble, idx) => {
            const timeSinceFall = frame - 45;
            const dropY = 1000 + Math.pow(timeSinceFall, 1.75) * (rubble.speed * 0.16);
            const dropX = rubble.xInit + (timeSinceFall / 50) * rubble.xDrift;
            const alpha = interpolate(dropY, [1000, 1380, 1500], [1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            if (dropY > 1520) return null;
            return (
              <rect
                key={idx}
                x={-rubble.size / 2}
                y={-rubble.size / 2}
                width={rubble.size}
                height={rubble.size}
                rx="3"
                fill="#1E293B"
                stroke="#ECFDF5"
                strokeWidth="2"
                transform={`translate(${dropX}, ${dropY}) rotate(${timeSinceFall * 9 + rubble.rot})`}
                opacity={alpha}
              />
            );
          })}
        </g>
      )}

      {/* ================================================================= */}
      {/* 6. IMPACT DUST BILLOWS RISING FROM COLLAPSED FOUNDATION           */}
      {/* ================================================================= */}
      {frame >= 46 && (
        <g opacity={interpolate(frame, [46, 60, 95], [0, 0.85, 0.3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}>
          <circle cx="440" cy="1380" r={collapseProgress * 80 + 30} fill="url(#dustPlumeGrad)" />
          <circle cx="640" cy="1380" r={collapseProgress * 95 + 35} fill="url(#dustPlumeGrad)" />
          <circle cx="540" cy="1360" r={collapseProgress * 110 + 40} fill="url(#dustPlumeGrad)" />
        </g>
      )}
    </svg>
  );
};

// =========================================================================
// 20. SCENE 20: CYBER_DOCTRINE_DOSSIER_QUOTE (Quote Card)
// =========================================================================
export const CyberDoctrineDossierQuote: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <g transform="translate(160, 960)">
        <rect x="0" y="0" width="760" height="420" rx="8" fill="#0B1310" stroke="#16221E" strokeWidth="3" />
        <rect x="40" y="40" width="220" height="32" rx="4" fill="#EF4444" />
        <text x="150" y="62" fill="#FFFFFF" textAnchor="middle" fontFamily={montserrat.fontFamily} fontSize="16" fontWeight="900">
          STRATEGIC DOCTRINE
        </text>

        {/* Oscilloscope Waveform */}
        <g transform="translate(40, 140)">
          {Array.from({ length: 28 }).map((_, idx) => {
            const h = 12 + Math.abs(Math.sin(frame / 6 + idx * 0.4)) * 52;
            return (
              <rect
                key={idx}
                x={idx * 24}
                y={-h / 2}
                width="12"
                height={h}
                rx="3"
                fill={idx % 4 === 0 ? '#EF4444' : '#38BDF8'}
              />
            );
          })}
        </g>
      </g>
    </svg>
  );
};

// =========================================================================
// 21. SCENE 21: SMARTPHONE_VS_SILO_SPLIT (Split Confrontation)
// High-Fidelity Contrast: Handheld Midnight Smartphone Drain vs Underground ICBM Silo
// =========================================================================
export const SmartphoneVsSiloSplit: React.FC = () => {
  const frame = useCurrentFrame();
  const splitX = 540;

  // Silo blast door hydraulic opening on frame
  const doorSlide = interpolate(frame, [0, 48], [0, 110], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const missileErect = interpolate(frame, [15, 60], [0, 75], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const redSiloAlarm = Math.sin(frame * 0.3) > 0;
  const screenScan = (frame * 4) % 180;

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <defs>
        {/* Smartphone Screen Glow onto Fingers */}
        <radialGradient id="screenHandGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.65" />
          <stop offset="60%" stopColor="#0B1310" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>
        {/* Underground Silo Emergency Floodlight */}
        <radialGradient id="siloEmergencyRed" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.75" />
          <stop offset="45%" stopColor="#B91C1C" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#05070A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ================================================================= */}
      {/* LEFT: EVERYDAY SMARTPHONE IN THE DARK ("A TAP ON A SCREEN")       */}
      {/* ================================================================= */}
      <rect x="0" y="864" width={splitX} height="634" fill="#090D12" />
      <circle cx="280" cy="1180" r="280" fill="url(#screenHandGlow)" />

      <g transform="translate(140, 940)">
        {/* Silhouetted Human Hand & Fingers Wrapping Phone */}
        {/* Palm & Wrist */}
        <path d="M 40 420 L 70 320 L 50 240 L 90 200 L 100 420 Z" fill="#05070A" stroke="#ECFDF5" strokeWidth="2" />
        {/* Curled Fingers on Left Bezel */}
        <rect x="65" y="140" width="45" height="26" rx="10" fill="#05070A" stroke="#ECFDF5" strokeWidth="2" />
        <rect x="60" y="180" width="50" height="26" rx="10" fill="#05070A" stroke="#ECFDF5" strokeWidth="2" />
        <rect x="62" y="220" width="48" height="26" rx="10" fill="#05070A" stroke="#ECFDF5" strokeWidth="2" />

        {/* Sleek Bezel-less Modern Smartphone Body */}
        <rect x="100" y="20" width="220" height="420" rx="30" fill="#0B1310" stroke="#38BDF8" strokeWidth="3.5" />
        {/* Glass Screen */}
        <rect x="110" y="32" width="200" height="396" rx="22" fill="#040608" />

        {/* Dynamic App Interface: Draining Crypto Balance */}
        <g transform="translate(120, 60)">
          {/* Top App Header */}
          <rect x="0" y="0" width="180" height="24" rx="4" fill="#162636" />
          <circle cx="14" cy="12" r="5" fill="#EF4444" />
          <text x="28" y="16" fill="#ECFDF5" fontFamily={montserrat.fontFamily} fontSize="10" fontWeight="900">
            TOTAL BALANCE
          </text>

          {/* Large Red Outflow Drain Metric */}
          <text x="90" y="65" fill="#EF4444" fontFamily={montserrat.fontFamily} fontSize="22" fontWeight="900" textAnchor="middle">
            -$250,000
          </text>

          {/* Draining Graph Curve */}
          <path d="M 10 110 L 50 110 L 90 145 L 140 170 L 170 175" fill="none" stroke="#EF4444" strokeWidth="3" />

          {/* Biometric Thumbprint Authorization Ring */}
          <g transform="translate(90, 240)">
            <circle cx="0" cy="0" r="32" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="6 4" />
            <circle cx="0" cy="0" r="22" fill="#090D12" stroke="#EF4444" strokeWidth="2" />
            <line x1="-14" y1={screenScan - 90} x2="14" y2={screenScan - 90} stroke="#EF4444" strokeWidth="2" />
            <text x="0" y="48" fill="#ECFDF5" fontFamily={montserrat.fontFamily} fontSize="10" fontWeight="900" textAnchor="middle">
              AUTHORIZED
            </text>
          </g>
        </g>
      </g>

      {/* ================================================================= */}
      {/* RIGHT: BRUTALIST UNDERGROUND NUCLEAR SILO ("FUNDS AN ATOMIC TEST") */}
      {/* ================================================================= */}
      <rect x={splitX} y="864" width={splitX} height="634" fill="#05070A" />
      <g transform="translate(540, 940)">
        {/* Deep Subterranean Silo Well with Emergency Red Floodlight */}
        <rect x="80" y="0" width="380" height="480" fill="url(#siloEmergencyRed)" />

        {/* Heavy Reinforced Concrete Silo Wall Ribs */}
        {[60, 140, 220, 300, 380, 460].map((ry, i) => (
          <line key={i} x1="80" y1={ry} x2="460" y2={ry} stroke="#1E293B" strokeWidth="3" />
        ))}

        {/* Massive Steel Blast Doors Sliding Apart Along Hydraulic Pistons */}
        {/* Left Blast Door Half */}
        <g transform={`translate(${-doorSlide}, 0)`}>
          <polygon points="120,40 270,40 270,160 120,160" fill="#0F172A" stroke="#EF4444" strokeWidth="3.5" />
          {/* Heavy Yellow/Black Hazard Warning Chevrons */}
          <line x1="140" y1="50" x2="170" y2="150" stroke="#F59E0B" strokeWidth="8" />
          <line x1="190" y1="50" x2="220" y2="150" stroke="#F59E0B" strokeWidth="8" />
          <line x1="240" y1="50" x2="270" y2="150" stroke="#F59E0B" strokeWidth="8" />
        </g>

        {/* Right Blast Door Half */}
        <g transform={`translate(${doorSlide}, 0)`}>
          <polygon points="270,40 420,40 420,160 270,160" fill="#0F172A" stroke="#EF4444" strokeWidth="3.5" />
          <line x1="290" y1="50" x2="320" y2="150" stroke="#F59E0B" strokeWidth="8" />
          <line x1="340" y1="50" x2="370" y2="150" stroke="#F59E0B" strokeWidth="8" />
          <line x1="390" y1="50" x2="420" y2="150" stroke="#F59E0B" strokeWidth="8" />
        </g>

        {/* Emerging Nuclear Ballistic Missile Warhead (Hwasong-17 Anatomy) */}
        <g transform={`translate(270, ${220 - missileErect})`}>
          {/* Cylindrical Rocket Booster Upper Stage */}
          <rect x="-42" y="80" width="84" height="180" fill="#090D12" stroke="#ECFDF5" strokeWidth="2.5" />
          {/* Black & White Grid Roll-Telemetry Markings */}
          <rect x="-42" y="100" width="42" height="30" fill="#ECFDF5" />
          <rect x="0" y="130" width="42" height="30" fill="#ECFDF5" />
          {/* Red Separation Band */}
          <rect x="-42" y="70" width="84" height="12" fill="#EF4444" />
          {/* Aerodynamic Nuclear Reentry Vehicle Cone */}
          <polygon points="-36,70 0,-30 36,70" fill="#0F172A" stroke="#ECFDF5" strokeWidth="3" />
          <circle cx="0" cy="-30" r="4" fill="#FFFFFF" />
          {/* Strobe Warning Beacon on Silo Rim */}
          <circle cx="80" cy="50" r="8" fill="#EF4444" opacity={redSiloAlarm ? 1 : 0.25} />
          <circle cx="460" cy="50" r="8" fill="#EF4444" opacity={redSiloAlarm ? 1 : 0.25} />
        </g>
      </g>

      {/* Center High-Voltage Dividing Axis */}
      <line x1={splitX} y1="864" x2={splitX} y2="1498" stroke="#EF4444" strokeWidth="4" />
    </svg>
  );
};

// =========================================================================
// 22. SCENE 22: OCEANIC_CABLES_GHOST_WEALTH (Vehicle in Transit)
// Authentic Deep Abyssal Seabed: Multi-Layered Armored Fiber Optic Cable
// =========================================================================
export const OceanicCablesGhostWealth: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <defs>
        {/* Abyssal Black Water Volumetric Aura */}
        <radialGradient id="abyssalDeepAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0C4A6E" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#082F49" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#020617" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Deep Ocean Trench Pitch-Black Floor */}
      <rect x="0" y="864" width="1080" height="634" fill="#020617" />
      <circle cx="540" cy="1180" r="420" fill="url(#abyssalDeepAura)" />

      {/* Jagged Volcanic Basalt Tectonic Rocks on Seabed */}
      <path
        d="M 0 1340 L 140 1280 L 280 1320 L 420 1260 L 580 1300 L 740 1240 L 890 1290 L 1080 1220 L 1080 1498 L 0 1498 Z"
        fill="#070C12"
        stroke="#162636"
        strokeWidth="3"
      />

      {/* Deterministic Marine Snow Particles Drifting in Abyssal Darkness */}
      {Array.from({ length: 24 }).map((_, i) => {
        const px = (i * 45 + frame * 0.8) % 1080;
        const py = 880 + ((i * 35 + frame * 1.2) % 580);
        return <circle key={i} cx={px} cy={py} r={1.5 + (i % 3)} fill="#ECFDF5" opacity="0.45" />;
      })}

      {/* Massive Multi-Layered Armored Subsea Telecommunications Cable */}
      {/* Outer Heavy Steel Armor Wire Casing */}
      <path
        d="M 0 1180 Q 280 1240 540 1140 T 1080 1200"
        fill="none"
        stroke="#0F172A"
        strokeWidth="28"
      />
      <path
        d="M 0 1180 Q 280 1240 540 1140 T 1080 1200"
        fill="none"
        stroke="#334155"
        strokeWidth="20"
      />
      {/* High-Density Polyethylene Insulation Jacket */}
      <path
        d="M 0 1180 Q 280 1240 540 1140 T 1080 1200"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="8"
      />
      {/* Internal High-Speed Optical Glass Core */}
      <path
        d="M 0 1180 Q 280 1240 540 1140 T 1080 1200"
        fill="none"
        stroke="#FEF08A"
        strokeWidth="3.5"
        strokeDasharray="20 12"
        strokeDashoffset={-frame * 14}
      />

      {/* High-Speed Ghost Wealth Light Pulses Traveling Through Ocean Floor */}
      {Array.from({ length: 5 }).map((_, idx) => {
        const offset = ((idx * 216 + frame * 9) % 1080);
        const yCoord = 1180 + Math.sin((offset / 1080) * Math.PI * 2) * 35;
        return (
          <g key={idx} transform={`translate(${offset}, ${yCoord})`}>
            {/* Glowing Fiber Optical Packet */}
            <circle cx="0" cy="0" r="14" fill="#EF4444" stroke="#FEF08A" strokeWidth="2.5" />
            <text x="0" y="5" fill="#FEF08A" fontFamily={montserrat.fontFamily} fontSize="11" fontWeight="900" textAnchor="middle">$</text>
          </g>
        );
      })}

      {/* Bathymetric Tactical HUD Telemetry Placard */}
      <g transform="translate(180, 920)">
        <rect x="0" y="0" width="720" height="42" rx="6" fill="#0B1310" stroke="#38BDF8" strokeWidth="2" />
        <circle cx="24" cy="21" r="6" fill="#38BDF8" />
        <text
          x="44"
          y="27"
          fill="#ECFDF5"
          fontFamily={montserrat.fontFamily}
          fontSize="14"
          fontWeight="900"
          letterSpacing="0.12em"
        >
          TRANS-PACIFIC SUBSEA CONDUIT · DEPTH: -5,200M (MARIANA TRENCH SECTOR)
        </text>
      </g>
    </svg>
  );
};

// =========================================================================
// 23. SCENE 23: TERMINAL_SHUTDOWN_SILENCE (Lone Leader)
// =========================================================================
export const TerminalShutdownSilence: React.FC = () => {
  const frame = useCurrentFrame();
  const collapseH = interpolate(frame, [0, 36], [220, 2], { extrapolateRight: 'clamp' });
  const fade = interpolate(frame, [30, 45], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      {/* CRT Screen Outer Bezel */}
      <g transform="translate(180, 960)">
        <rect x="0" y="0" width="720" height="420" rx="14" fill="#090D12" stroke="#16221E" strokeWidth="6" />
        <rect x="24" y="24" width="672" height="372" rx="8" fill="#05070A" />

        {/* Screen Collapsing to a Single Horizontal Phosphor Line */}
        <rect
          x="36"
          y={210 - collapseH / 2}
          width="648"
          height={collapseH}
          fill="#38BDF8"
          opacity={fade}
        />
      </g>
    </svg>
  );
};

// =========================================================================
// 24. SCENE 24: IN_YOUR_POCKET_FINAL_QUOTE (Quote Card / Loop)
// =========================================================================
export const InYourPocketFinalQuote: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="finalQuoteAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="540" cy="1180" r="380" fill="url(#finalQuoteAura)" />

      <g transform="translate(160, 960)">
        <rect x="0" y="0" width="760" height="420" rx="8" fill="#0B1310" stroke="#16221E" strokeWidth="3" />
        {/* Pulsing Intercept Emblem */}
        <circle cx="380" cy="80" r="32" fill="#16221E" stroke="#EF4444" strokeWidth="2" />
        <circle cx="380" cy="80" r="8" fill="#EF4444" opacity={0.7 + 0.3 * Math.sin(frame * 0.2)} />

        {/* Continuous Looping Waveform */}
        <g transform="translate(60, 200)">
          {Array.from({ length: 30 }).map((_, idx) => {
            const barH = 14 + Math.abs(Math.sin(frame / 6 + idx * 0.45)) * 64;
            return (
              <rect
                key={idx}
                x={idx * 21.5}
                y={-barH / 2}
                width="11"
                height={barH}
                rx="3"
                fill={idx % 4 === 0 ? '#EF4444' : '#38BDF8'}
              />
            );
          })}
        </g>
      </g>
    </svg>
  );
};
