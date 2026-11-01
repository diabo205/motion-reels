import React from 'react';
import { useCurrentFrame } from 'remotion';

export type PaperStageStyle =
  | 'PAPER_EXTERIOR'
  | 'GRAPH_GRID'
  | 'SUNBURST_HERO'
  | 'NIGHT_FELT'
  | 'WOOD_PANEL'
  | 'LOCKED_CANVAS';

export type ParticleType = 'SNOW' | 'ASH' | 'RAIN' | 'DUST' | 'NONE';

interface AtmosphericBackgroundProps {
  skyGradient?: string[];
  theme?:
    | 'DESERT_TWILIGHT'
    | 'ALERT_RED'
    | 'TACTICAL_DARK'
    | 'EMERALD_HONOR'
    | 'NIGHT_RADAR'
    | 'POLAR_MARITIME'
    | 'CONFLICT_CRISIS'
    | 'ESPIONAGE_DOSSIER';
  stageStyle?: PaperStageStyle;
  showDunes?: boolean;
  showSmoke?: boolean;
  particleEmitter?: ParticleType;
  globalFrame?: number;
}

const THEME_GRADIENTS: Record<string, [string, string]> = {
  // Revised Prestige Documentary Palettes (High Mobile Contrast, Locked to config/pipeline_constants.json)
  POLAR_MARITIME: ['#0A1118', '#162636'], // Deep Navy to Slate
  CONFLICT_CRISIS: ['#0F1012', '#1C1917'], // Obsidian to Warm Charcoal
  ESPIONAGE_DOSSIER: ['#0B1310', '#16221E'], // Bunker Black to Dark Slate
  // Legacy Themes
  DESERT_TWILIGHT: ['#2A1D2E', '#C47247'],
  ALERT_RED: ['#3B0D11', '#B8292F'],
  TACTICAL_DARK: ['#141923', '#232D3B'],
  EMERALD_HONOR: ['#04391B', '#0B2415'],
  NIGHT_RADAR: ['#111520', '#1C2636'],
};

/**
 * Deterministic Mulberry32 PRNG keyed by (emitterType, particleId) so any render window
 * (isolated scene clip or full master render) reproduces the exact same continuous field
 * when evaluated at `globalFrame`.
 */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashEmitterSeed(emitter: string, id: number): number {
  let h = 2166136261;
  const str = `${emitter}_${id}`;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function getSeededParticles(emitter: ParticleType) {
  return Array.from({ length: 45 }, (_, i) => {
    const rng = mulberry32(hashEmitterSeed(emitter, i));
    return {
      id: i,
      x: rng() * 1080,
      ySeed: rng() * 1920,
      speed: 1.2 + rng() * 2.5,
      size: 2.5 + rng() * 4.5,
      driftX: (rng() - 0.5) * 2.4,
      opacity: 0.25 + rng() * 0.55,
    };
  });
}

const EMITTER_PARTICLE_MAP: Record<ParticleType, ReturnType<typeof getSeededParticles>> = {
  SNOW: getSeededParticles('SNOW'),
  ASH: getSeededParticles('ASH'),
  RAIN: getSeededParticles('RAIN'),
  DUST: getSeededParticles('DUST'),
  NONE: [],
};

export const AtmosphericBackground: React.FC<AtmosphericBackgroundProps> = ({
  skyGradient,
  theme = 'TACTICAL_DARK',
  stageStyle = 'PAPER_EXTERIOR',
  showDunes = true,
  showSmoke = true,
  particleEmitter = 'NONE',
  globalFrame,
}) => {
  const localFrame = useCurrentFrame();
  const frame = globalFrame !== undefined ? globalFrame : localFrame;

  const [topCol, botCol] =
    skyGradient && skyGradient.length >= 2
      ? [skyGradient[0], skyGradient[1]]
      : THEME_GRADIENTS[theme] || THEME_GRADIENTS.TACTICAL_DARK;

  // Quantized stop-motion frame step (15fps tactile feel for subtle background drift)
  const steppedFrame = Math.floor(frame / 4) * 4;
  const smokeDriftY = (steppedFrame * 1.4) % 600;
  const burstRot = (steppedFrame * 0.15) % 360;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1 }}>
      {/* 1. Base Cardstock Substrate */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            stageStyle === 'GRAPH_GRID'
              ? `linear-gradient(180deg, ${topCol} 0%, ${botCol} 100%)`
              : stageStyle === 'WOOD_PANEL'
                ? `linear-gradient(180deg, ${topCol || '#5C3A24'} 0%, ${botCol || '#3D2516'} 100%)`
                : `linear-gradient(180deg, ${topCol} 0%, ${botCol} 100%)`,
        }}
      />

      {/* 2. Stage-Specific Paper Collage Layers */}
      <svg
        viewBox="0 0 1080 1920"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}
      >
        <defs>
          <filter id="paperDropShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#000000" floodOpacity="0.55" />
          </filter>
          <filter id="paperGrainFilter" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.075 0"
            />
          </filter>
          <pattern id="quadrilleGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            {/* Minor 15px sub-grid lines */}
            <path
              d="M 15 0 L 15 60 M 30 0 L 30 60 M 45 0 L 45 60 M 0 15 L 60 15 M 0 30 L 60 30 M 0 45 L 60 45"
              fill="none"
              stroke="rgba(180, 210, 220, 0.07)"
              strokeWidth="1"
            />
            {/* Major 60px engineering grid lines */}
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(180, 210, 220, 0.16)"
              strokeWidth="1.8"
            />
          </pattern>
        </defs>

        {/* MODE A: SUNBURST_HERO or WOOD_PANEL Radial Paper Rays */}
        {(stageStyle === 'SUNBURST_HERO' || stageStyle === 'WOOD_PANEL' || stageStyle === 'NIGHT_FELT') && (
          <g
            transform={`translate(540, 780) rotate(${stageStyle === 'SUNBURST_HERO' ? burstRot : 0})`}
            opacity={stageStyle === 'NIGHT_FELT' ? 0.08 : 0.16}
          >
            {Array.from({ length: 24 }).map((_, i) => {
              const a1 = ((i * 15 - 3.8) * Math.PI) / 180;
              const a2 = ((i * 15 + 3.8) * Math.PI) / 180;
              const r = 1600;
              return (
                <polygon
                  key={i}
                  points={`0,0 ${r * Math.cos(a1)},${r * Math.sin(a1)} ${r * Math.cos(a2)},${r * Math.sin(a2)}`}
                  fill="#000000"
                />
              );
            })}
          </g>
        )}

        {/* MODE B: GRAPH_GRID Engineering Quadrille Paper + Wooden Shelf */}
        {stageStyle === 'GRAPH_GRID' && (
          <g>
            <rect width="1080" height="1920" fill="url(#quadrilleGrid)" />
            {/* Tactile Wooden Shelf / Horizon Divider Bar */}
            <g filter="url(#paperDropShadow)">
              <rect x="0" y="700" width="1080" height="16" fill="#6E4E37" />
              <line x1="0" y1="702" x2="1080" y2="702" stroke="#8C674B" strokeWidth="2" />
            </g>
          </g>
        )}

        {/* MODE C: NIGHT_FELT Speckled Paper Stars */}
        {stageStyle === 'NIGHT_FELT' && (
          <g opacity="0.75">
            {[
              [95, 110, 2.5], [220, 180, 2.0], [340, 95, 3.0], [480, 160, 2.2],
              [650, 115, 2.8], [790, 195, 2.2], [920, 130, 3.0], [1010, 240, 2.0],
              [140, 290, 2.6], [310, 260, 1.8], [580, 275, 2.4], [850, 310, 2.8],
              [75, 440, 2.2], [960, 420, 2.5], [190, 520, 2.0], [890, 560, 2.4],
              [110, 660, 2.6], [420, 610, 2.0], [740, 640, 2.8], [990, 690, 2.2],
            ].map(([sx, sy, sr], idx) => (
              <circle
                key={idx}
                cx={sx}
                cy={sy}
                r={sr}
                fill="#EAE3D2"
                opacity={0.55 + 0.35 * Math.sin(steppedFrame / 10 + idx)}
              />
            ))}
          </g>
        )}

        {/* MODE D: PAPER_EXTERIOR Layered Construction-Paper Sky + Kraft Midground Cut */}
        {stageStyle === 'PAPER_EXTERIOR' && (
          <g>
            {/* Upper Construction Paper Sky Sheet with Torn Angled Lower Edge */}
            <path
              d="M 0 0 L 1080 0 L 1080 650 L 920 662 L 740 672 L 540 688 L 320 702 L 140 714 L 0 726 Z"
              fill={topCol}
              filter="url(#paperDropShadow)"
            />
            {/* Torn Paper White Deckle Edge Highlight */}
            <path
              d="M 0 726 L 140 714 L 320 702 L 540 688 L 740 672 L 920 662 L 1080 650"
              fill="none"
              stroke="rgba(234, 227, 210, 0.25)"
              strokeWidth="3"
            />
          </g>
        )}

        {/* MODE E: WOOD_PANEL Command Room Timber Wainscoting & Plank Seams */}
        {stageStyle === 'WOOD_PANEL' && (
          <g>
            {[180, 360, 540, 720, 900].map((px) => (
              <g key={px} opacity="0.22">
                <line x1={px} y1="0" x2={px} y2="1920" stroke="#1E1108" strokeWidth="3" />
                <line x1={px + 2} y1="0" x2={px + 2} y2="1920" stroke="#8C6244" strokeWidth="1" />
              </g>
            ))}
            <g filter="url(#paperDropShadow)">
              <rect x="0" y="710" width="1080" height="18" fill="#4A2D1B" />
              <line x1="0" y1="712" x2="1080" y2="712" stroke="#8C6244" strokeWidth="2" />
            </g>
          </g>
        )}
      </svg>

      {/* 3. Volumetric Atmospheric Smoke / Paper Cloud Cutouts */}
      {showSmoke && (
        <svg
          viewBox="0 0 1080 1920"
          style={{ position: 'absolute', inset: 0, opacity: 0.32, pointerEvents: 'none', zIndex: 2 }}
        >
          <g>
            <circle
              cx={240 + Math.sin(steppedFrame / 40) * 30}
              cy={1500 - smokeDriftY}
              r={90 + smokeDriftY * 0.15}
              fill="#181512"
              opacity={0.35 - smokeDriftY / 2000}
            />
            <circle
              cx={320 + Math.cos(steppedFrame / 35) * 25}
              cy={1650 - smokeDriftY * 1.2}
              r={120 + smokeDriftY * 0.2}
              fill="#1F1A16"
              opacity={0.4 - smokeDriftY / 1800}
            />
            <circle
              cx={800 + Math.sin(steppedFrame / 50) * 40}
              cy={1450 - smokeDriftY * 0.8}
              r={110 + smokeDriftY * 0.18}
              fill="#181512"
              opacity={0.3 - smokeDriftY / 2200}
            />
          </g>
        </svg>
      )}

      {/* 4. Layered Paper-Cut Dunes / Horizon Contours (Strictly y > 1350) */}
      {showDunes && (
        <svg
          viewBox="0 0 1080 1920"
          style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}
        >
          {/* Distant Paper Hill (y > 1460) */}
          <path
            d="M 0 1490 Q 280 1445 580 1485 T 1080 1470 L 1080 1920 L 0 1920 Z"
            fill="#2B2118"
            opacity="0.72"
            filter="url(#paperDropShadow)"
          />
          {/* Midground Kraft Paper Ridge (y > 1550) */}
          <path
            d="M 0 1565 Q 240 1525 540 1560 T 1080 1545 L 1080 1920 L 0 1920 Z"
            fill="#1D1712"
            opacity="0.9"
            filter="url(#paperDropShadow)"
          />
          {/* Foreground Dark Cardstock Ground (y > 1635) */}
          <path
            d="M 0 1645 Q 380 1615 720 1640 T 1080 1625 L 1080 1920 L 0 1920 Z"
            fill="#100D0A"
          />
        </svg>
      )}

      {/* 5. Tactile Paper Fiber Grain + Signature Vertical Center Fold Crease Line */}
      <svg
        viewBox="0 0 1080 1920"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}
      >
        {/* Global Paper Fiber Noise Overlay */}
        <rect width="1080" height="1920" filter="url(#paperGrainFilter)" />

        {/* Signature Vertical Poster Fold Crease (x = 622, matching reference video) */}
        <line
          x1="621"
          y1="0"
          x2="621"
          y2="1920"
          stroke="rgba(0, 0, 0, 0.28)"
          strokeWidth="2"
        />
        <line
          x1="623"
          y1="0"
          x2="623"
          y2="1920"
          stroke="rgba(255, 255, 255, 0.11)"
          strokeWidth="1.5"
        />

        {/* Subtle Horizontal Center Fold Crease (y = 960) */}
        <line
          x1="0"
          y1="960"
          x2="1080"
          y2="960"
          stroke="rgba(0, 0, 0, 0.14)"
          strokeWidth="1.5"
        />
      </svg>

      {/* 6. Story-Applicable Persistent Particle Emitter Layer (Seeded by Emitter + Global Frame) */}
      {particleEmitter !== 'NONE' && (
        <svg
          viewBox="0 0 1080 1920"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 6 }}
        >
          {(EMITTER_PARTICLE_MAP[particleEmitter] || []).map((p) => {
            if (particleEmitter === 'SNOW') {
              const curY = (p.ySeed + frame * p.speed * 2.2) % 1920;
              const curX = (p.x + Math.sin((frame + p.id * 10) / 25) * 18 + 1080) % 1080;
              return (
                <circle
                  key={p.id}
                  cx={curX}
                  cy={curY}
                  r={p.size * 0.7}
                  fill="#F4F7FA"
                  opacity={p.opacity * 0.75}
                  filter="blur(0.5px)"
                />
              );
            } else if (particleEmitter === 'ASH') {
              const curY = (1920 + p.ySeed - (frame * p.speed * 1.8) % 1920) % 1920;
              const curX = (p.x + Math.sin((frame + p.id * 15) / 20) * 24 + 1080) % 1080;
              const isEmber = p.id % 3 === 0;
              return (
                <circle
                  key={p.id}
                  cx={curX}
                  cy={curY}
                  r={isEmber ? p.size * 0.6 : p.size * 0.8}
                  fill={isEmber ? '#F59E0B' : '#1C1917'}
                  opacity={p.opacity * (isEmber ? 0.9 : 0.45)}
                />
              );
            } else if (particleEmitter === 'RAIN') {
              const curY = (p.ySeed + frame * p.speed * 7.5) % 1920;
              const curX = (p.x + frame * 1.2 + 1080) % 1080;
              return (
                <line
                  key={p.id}
                  x1={curX}
                  y1={curY}
                  x2={curX + 6}
                  y2={curY + 28}
                  stroke="#93C5FD"
                  strokeWidth={p.size * 0.3}
                  opacity={p.opacity * 0.55}
                />
              );
            } else if (particleEmitter === 'DUST') {
              const curY = (p.ySeed + Math.sin((frame + p.id * 8) / 30) * 15 + 1920) % 1920;
              const curX = (p.x + frame * p.speed * 0.9 + 1080) % 1080;
              return (
                <circle
                  key={p.id}
                  cx={curX}
                  cy={curY}
                  r={p.size * 0.5}
                  fill="#D97706"
                  opacity={p.opacity * 0.4}
                />
              );
            }
            return null;
          })}
        </svg>
      )}

      {/* 7. Radial Vignette Framing */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 52%, rgba(0,0,0,0) 48%, rgba(4,6,8,0.68) 100%)',
          pointerEvents: 'none',
          zIndex: 7,
        }}
      />
    </div>
  );
};
