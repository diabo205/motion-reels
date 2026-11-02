import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { loadFont as loadMontserrat } from '@remotion/google-fonts/Montserrat';
import {
  createGeoProjector,
  ALEUTIAN_THEATER_GEOJSON,
  ContestedTerritoryShading,
  TacticalMovementArrow,
  PulsatingBattleMarker,
  AnimatedFrontline,
} from '../library/tactical';

const montserrat = loadMontserrat('normal', { weights: ['800', '900'], subsets: ['latin'] });

// =========================================================================
// REUSABLE POLAR MARITIME BACKLIGHTING & ATMOSPHERIC PARTICLES
// Pinned strictly within Artwork Safe Zone: y = 864px to 1498px
// =========================================================================

export const PolarHorizonGlow: React.FC<{
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  color?: 'CYAN' | 'AURORA' | 'COMBAT_AMBER' | 'FLARE_RED';
  intensity?: number;
}> = ({
  cx = 540,
  cy = 1300,
  rx = 520,
  ry = 280,
  color = 'CYAN',
  intensity = 0.9,
}) => {
  const frame = useCurrentFrame();
  const breathe = 1 + Math.sin(frame * 0.08) * 0.05 + Math.cos(frame * 0.14) * 0.03;

  const getGradientColors = () => {
    switch (color) {
      case 'AURORA':
        return {
          c0: '#2DD4BF',
          c1: '#0284C7',
          c2: '#0F172A',
        };
      case 'COMBAT_AMBER':
        return {
          c0: '#F59E0B',
          c1: '#D97706',
          c2: '#18181B',
        };
      case 'FLARE_RED':
        return {
          c0: '#EF4444',
          c1: '#991B1B',
          c2: '#1C1917',
        };
      case 'CYAN':
      default:
        return {
          c0: '#38BDF8',
          c1: '#0369A1',
          c2: '#0A1118',
        };
    }
  };

  const { c0, c1, c2 } = getGradientColors();
  const gradId = `polarGlow_${color}_${Math.floor(cx)}_${Math.floor(cy)}`;

  return (
    <g>
      <defs>
        <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={c0} stopOpacity="0.85" />
          <stop offset="45%" stopColor={c1} stopOpacity="0.45" />
          <stop offset="85%" stopColor={c2} stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0A1118" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill={`url(#${gradId})`}
        opacity={intensity * breathe}
      />
    </g>
  );
};

/**
 * Reusable Anatomical WWII Infantry Silhouette (Parka + M1/Type90 Helmet + Pack)
 */
const AnatomicalSoldierSilhouette: React.FC<{
  x: number;
  y: number;
  scale?: number;
  flipX?: boolean;
  pose?: 'STANDING_RIFLE' | 'AIMING_RIFLE' | 'CROUCHING_AIM' | 'WADING' | 'SALUTING' | 'LOWERED_RIFLE';
  helmetType?: 'US_M1' | 'JP_TYPE90' | 'PARKA_HOOD';
  accentColor?: string;
  stridePhase?: number;
  bodyTilt?: number;
}> = ({
  x,
  y,
  scale = 1,
  flipX = false,
  pose = 'STANDING_RIFLE',
  helmetType = 'US_M1',
  accentColor,
  stridePhase = 0,
  bodyTilt = 0,
}) => {
  const sx = flipX ? -scale : scale;
  return (
    <g transform={`translate(${x}, ${y}) scale(${sx}, ${scale}) rotate(${bodyTilt})`}>
      {/* Head & Helmet Profile */}
      {helmetType === 'PARKA_HOOD' ? (
        <g>
          <path d="M -14 -72 C -16 -88 12 -90 16 -72 C 18 -62 12 -52 0 -52 L -12 -52 Z" fill="#070A0E" />
          <path d="M 4 -84 C 14 -82 18 -70 14 -58" stroke="#E2E8F0" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </g>
      ) : helmetType === 'JP_TYPE90' ? (
        <g>
          <path d="M -16 -68 C -16 -86 16 -86 18 -68 L 22 -64 L -18 -64 Z" fill="#070A0E" stroke="#1E293B" strokeWidth="1" />
          <circle cx="0" cy="-58" r="9" fill="#070A0E" />
          {accentColor && <circle cx="10" cy="-73" r="2.5" fill={accentColor} />}
        </g>
      ) : (
        <g>
          {/* US M1 Steel Pot Helmet */}
          <path d="M -17 -67 C -18 -87 17 -87 19 -67 L 23 -63 L -19 -64 Z" fill="#070A0E" stroke="#1E293B" strokeWidth="1" />
          <circle cx="1" cy="-58" r="9.5" fill="#070A0E" />
          {accentColor && <rect x="-6" y="-76" width="10" height="4" rx="1" fill={accentColor} />}
        </g>
      )}

      {/* Field Pack / Rucksack on Back */}
      <path d="M -24 -48 L -10 -50 L -8 -8 L -26 -12 Z" fill="#0B1017" stroke="#1E293B" strokeWidth="1.2" />

      {/* Heavy Arctic Parka Torso */}
      <path
        d={
          pose === 'CROUCHING_AIM'
            ? 'M -12 -52 L 14 -50 L 22 -8 L -16 -6 Z'
            : 'M -12 -52 L 15 -50 L 18 4 L -16 4 Z'
        }
        fill="#070A0E"
      />

      {/* Legs & Combat Boots */}
      {pose === 'CROUCHING_AIM' ? (
        <g>
          <path d="M -12 -8 L 8 -8 L 22 14 L 14 34 L 4 34 L 8 14 L -10 10 Z" fill="#070A0E" />
          <path d="M -14 -6 L -4 18 L -22 28 L -26 20 L -12 12 Z" fill="#070A0E" />
        </g>
      ) : pose === 'WADING' ? (
        <g>
          {/* Back leg swinging in cadence */}
          <path
            d={`M -12 2 L 0 2 L ${4 - stridePhase * 8} 28 L ${-10 - stridePhase * 8} 28 Z`}
            fill="#070A0E"
          />
          {/* Front leg driving through surf */}
          <path
            d={`M 2 2 L 15 2 L ${22 + stridePhase * 10} 28 L ${8 + stridePhase * 10} 28 Z`}
            fill="#070A0E"
          />
        </g>
      ) : (
        <g>
          <path d="M -13 2 L -1 2 L -2 48 L -14 48 Z" fill="#070A0E" />
          <path d="M 3 2 L 15 2 L 17 48 L 4 48 Z" fill="#070A0E" />
          {/* Boots */}
          <rect x="-14" y="44" width="16" height="7" rx="2" fill="#05070A" />
          <rect x="4" y="44" width="17" height="7" rx="2" fill="#05070A" />
        </g>
      )}

      {/* Arms & Weapon by Pose */}
      {pose === 'AIMING_RIFLE' || pose === 'CROUCHING_AIM' ? (
        <g>
          {/* Rifle Stock, Receiver & Barrel */}
          <path d="M 4 -38 L 68 -44 L 68 -40 L 4 -32 Z" fill="#475569" />
          <rect x="12" y="-41" width="26" height="6" rx="1" fill="#1E293B" />
          {/* Arms holding rifle */}
          <path d="M 6 -46 L 28 -36 L 10 -30 Z" fill="#070A0E" />
        </g>
      ) : pose === 'WADING' ? (
        <g transform={`rotate(${stridePhase * 3.5}, 14, -34)`}>
          {/* Rifle held diagonally high across chest above surf */}
          <line x1="-6" y1="-10" x2="42" y2="-56" stroke="#64748B" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="2" y1="-18" x2="28" y2="-42" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" />
          <path d="M 0 -44 L 24 -30 L 16 -22 L -4 -34 Z" fill="#070A0E" />
        </g>
      ) : pose === 'LOWERED_RIFLE' ? (
        <g>
          <path d="M 4 -44 L 18 -12 L 10 -8 L -2 -38 Z" fill="#070A0E" />
          <line x1="2" y1="-26" x2="36" y2="22" stroke="#64748B" strokeWidth="4.5" strokeLinecap="round" />
        </g>
      ) : pose === 'SALUTING' ? (
        <g>
          <path d="M 8 -46 L 26 -60 L 14 -68" stroke="#070A0E" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      ) : (
        <g>
          <line x1="8" y1="-48" x2="26" y2="-20" stroke="#070A0E" strokeWidth="8" strokeLinecap="round" />
          <line x1="16" y1="-64" x2="16" y2="24" stroke="#64748B" strokeWidth="4" />
        </g>
      )}
    </g>
  );
};

/**
 * Procedural Waving Imperial Japanese Battle Ensign (Pure SVG 40-slice mesh with strict per-slice clipPath)
 */
const WavingJapaneseEnsign: React.FC<{
  x: number;
  y: number;
  width?: number;
  height?: number;
}> = ({ x, y, width = 280, height = 175 }) => {
  const frame = useCurrentFrame();
  const slices = 40;
  const sliceW = width / slices;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <defs>
        {Array.from({ length: slices }).map((_, i) => (
          <clipPath key={`clip-jp-${i}`} id={`jp-ensign-slice-${i}`}>
            <rect x="0" y="0" width={sliceW + 0.9} height={height} />
          </clipPath>
        ))}
      </defs>

      {/* Metallic Flagpole & Finial */}
      <rect x="-10" y="-24" width="10" height={height + 210} fill="#475569" stroke="#1E293B" strokeWidth="1.5" rx="3" />
      <circle cx="-5" cy="-28" r="7" fill="#F59E0B" />

      {Array.from({ length: slices }).map((_, i) => {
        const u = i / slices;
        const wave = Math.sin(frame * 0.15 - u * 6.2) * (u * 16);
        const slope = Math.cos(frame * 0.15 - u * 6.2);
        const sx = i * sliceW;
        const sy = wave;
        const shade = Math.max(0, -slope) * 0.35;
        const light = Math.max(0, slope) * 0.25;

        return (
          <g key={i} transform={`translate(${sx}, ${sy})`}>
            <g clipPath={`url(#jp-ensign-slice-${i})`}>
              {/* White base field */}
              <rect x="0" y="0" width={sliceW + 0.9} height={height} fill="#F8FAFC" />

              {/* Rising Sun Disk & 16 Rays strictly clipped to slice */}
              <g transform={`translate(${-sx + width * 0.38}, ${height * 0.5})`}>
                {[...Array(16)].map((__, rIdx) => {
                  const angle = (rIdx * 22.5 * Math.PI) / 180;
                  const rLen = width * 1.1;
                  const p1x = Math.cos(angle - 0.095) * rLen;
                  const p1y = Math.sin(angle - 0.095) * rLen;
                  const p2x = Math.cos(angle + 0.095) * rLen;
                  const p2y = Math.sin(angle + 0.095) * rLen;
                  return (
                    <polygon
                      key={rIdx}
                      points={`0,0 ${p1x},${p1y} ${p2x},${p2y}`}
                      fill="#DC2626"
                    />
                  );
                })}
                <circle cx="0" cy="0" r={height * 0.28} fill="#DC2626" />
              </g>

              {/* 3D Cloth Shadow/Light Overlay */}
              {shade > 0.04 && (
                <rect x="0" y="0" width={sliceW + 0.9} height={height} fill="#090D12" opacity={shade} />
              )}
              {light > 0.04 && (
                <rect x="0" y="0" width={sliceW + 0.9} height={height} fill="#FFFFFF" opacity={light} />
              )}
            </g>
          </g>
        );
      })}
    </g>
  );
};

// =========================================================================
// 1. SCENE 01: ALEUTIAN_FORGOTTEN_INVASION_OPENING
// Split confrontation: U.S. coastal lookout vs Imperial Japanese Navy fleet
// Hydrodynamically seated vessels floating directly IN Arctic ocean swells
// =========================================================================
export const AleutianForgottenInvasionOpening: React.FC = () => {
  const frame = useCurrentFrame();
  const waveCycle = frame * 0.07;
  const seaRoll = Math.sin(waveCycle) * 10;
  
  // Hydrodynamic motion: vessels heave and pitch naturally with ocean wave cycles
  const shipHeave = Math.sin(waveCycle + 0.6) * 5.5;
  const shipPitchDeg = Math.sin(waveCycle - 0.2) * 1.6;
  
  // Distant carrier motion
  const carrierHeave = Math.sin(waveCycle + 1.2) * 2.5;
  const carrierPitchDeg = Math.sin(waveCycle + 0.5) * 0.8;
  
  // Dynamic bow spray bursts as waves strike the cruiser's raked stem
  const bowSprayBurst = Math.max(0, Math.sin(waveCycle + 0.6)) * 5;
  
  const lookoutBreath = Math.sin(frame * 0.12) * 2;
  const mistDrift = (frame * 1.5) % 360;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          <clipPath id="cruiserEnsignClip">
            <rect x="0" y="0" width="46" height="28" rx="1" />
          </clipPath>
          <linearGradient id="s1DistantSeaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#101C2B" />
            <stop offset="50%" stopColor="#0B131E" />
            <stop offset="100%" stopColor="#070B11" />
          </linearGradient>
          <linearGradient id="s1HullOcclusion" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#03060A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#03060A" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <PolarHorizonGlow cx={640} cy={1220} rx={480} ry={240} color="CYAN" intensity={0.85} />

        {/* Distant Jagged Volcanic Peaks behind Ocean Horizon */}
        <polygon points="60,1240 240,1110 430,1240" fill="#0E1622" opacity="0.75" />
        <polygon points="320,1240 520,1075 740,1240" fill="#111B2A" opacity="0.88" />
        <polygon points="215,1135 240,1110 265,1135 240,1128" fill="#CBD5E1" opacity="0.85" />
        <polygon points="485,1110 520,1075 555,1110 520,1100" fill="#F1F5F9" opacity="0.9" />

        {/* Continuous Distant Ocean Plane (No sky gap under fleet) */}
        <path
          d="M 220 1225 Q 600 1220 1080 1225 L 1080 1495 L 220 1495 Z"
          fill="url(#s1DistantSeaGrad)"
        />

        {/* Distant Carrier Silhouette (Ryūjō) Firmly Seated on Ocean Horizon */}
        <g
          transform={`translate(670, ${1222 + carrierHeave}) rotate(${carrierPitchDeg}, 100, 22)`}
          opacity="0.72"
          filter="drop-shadow(0 0 10px rgba(56, 189, 248, 0.25))"
        >
          {/* Submerged Hull Cavitation Shadow in Water */}
          <polygon points="12,24 182,24 175,30 18,30" fill="url(#s1HullOcclusion)" />
          {/* Flight Deck & Hull */}
          <path d="M 10 16 L 195 16 L 182 26 L 18 26 Z" fill="#070B10" />
          <rect x="45" y="10" width="135" height="6" fill="#070B10" />
          <rect x="120" y="2" width="20" height="9" fill="#070B10" />
          {/* Waterline Contact Streak */}
          <line x1="8" y1="24" x2="198" y2="24" stroke="#7DD3FC" strokeWidth="1.5" opacity="0.65" />
          {/* Subtle Stern Wake and Bow Wash */}
          <ellipse cx="192" cy="24" rx="14" ry="2" fill="#BAE6FD" opacity="0.5" />
          <ellipse cx="12" cy="24" rx="8" ry="1.8" fill="#E0F2FE" opacity="0.6" />
        </g>

        {/* Mid-Distance Swell Layer with Foam Crest */}
        <path
          d={`M 150 ${1272 + seaRoll * 0.4} Q 560 ${1262 - seaRoll * 0.4} 840 ${1270 + seaRoll * 0.3} T 1080 ${1268 + seaRoll * 0.3} L 1080 1495 L 150 1495 Z`}
          fill="#0A121C"
        />
        <path
          d={`M 150 ${1270 + seaRoll * 0.4} Q 560 ${1260 - seaRoll * 0.4} 840 ${1268 + seaRoll * 0.3} T 1080 ${1266 + seaRoll * 0.3}`}
          stroke="#38BDF8"
          strokeWidth="1.8"
          fill="none"
          opacity="0.45"
        />

        {/* RIGHT SIDE: Imperial Japanese Navy Heavy Cruiser (Takao / Maya class) Seated in Sea */}
        <g
          transform={`translate(470, ${1242 + shipHeave}) rotate(${shipPitchDeg}, 210, 68)`}
          filter="drop-shadow(0 0 16px rgba(56, 189, 248, 0.35))"
        >
          {/* Submerged Hull Cavitation Shadow in Water */}
          <polygon points="12,66 422,66 414,88 14,88" fill="url(#s1HullOcclusion)" />

          {/* Heavy Cruiser Main Hull with Submerged Keel (Waterline at y = 66, Keel down to y = 82) */}
          <path
            d="M 38 48 L 105 38 L 220 38 L 240 24 L 268 24 L 280 38 L 365 38 L 405 48 L 425 56 L 415 82 L 14 82 L 20 66 Z"
            fill="#070B10"
            stroke="#1E293B"
            strokeWidth="1.5"
          />

          {/* Pagoda Mast & Bridge Superstructure */}
          <polygon points="168,38 176,2 212,2 222,38" fill="#070B10" />
          <polygon points="172,12 194,-10 216,12" fill="#070B10" />
          <polygon points="236,38 246,8 266,8 262,38" fill="#070B10" />
          <line x1="194" y1="-10" x2="194" y2="-42" stroke="#070B10" strokeWidth="4" />

          {/* Twin Raked Cruiser Funnels */}
          <polygon points="186,38 192,16 206,16 202,38" fill="#070B10" />
          <polygon points="214,38 220,18 232,18 228,38" fill="#070B10" />

          {/* Forward & Aft 8-inch Main Gun Turrets */}
          <rect x="75" y="32" width="36" height="12" rx="2" fill="#070B10" />
          <line x1="38" y1="36" x2="75" y2="38" stroke="#475569" strokeWidth="3.5" />
          <rect x="120" y="24" width="36" height="12" rx="2" fill="#070B10" />
          <line x1="82" y1="28" x2="120" y2="30" stroke="#475569" strokeWidth="3.5" />
          <rect x="320" y="32" width="34" height="12" rx="2" fill="#070B10" />
          <line x1="354" y1="38" x2="390" y2="35" stroke="#475569" strokeWidth="3.5" />

          {/* Clipped Imperial Japanese Navy Battle Ensign from Mast */}
          <g transform="translate(198, -38)" clipPath="url(#cruiserEnsignClip)">
            <rect x="0" y="0" width="46" height="28" fill="#F8FAFC" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((ang) => (
              <line
                key={ang}
                x1="16"
                y1="14"
                x2={16 + Math.cos((ang * Math.PI) / 180) * 36}
                y2={14 + Math.sin((ang * Math.PI) / 180) * 36}
                stroke="#DC2626"
                strokeWidth="2.2"
              />
            ))}
            <circle cx="16" cy="14" r="7" fill="#DC2626" />
          </g>

          {/* Waterline Displacement Foam Crest along the Cruiser Hull */}
          <path
            d="M 16 66 Q 60 64 120 67 T 240 65 T 340 67 T 422 66"
            stroke="#BAE6FD"
            strokeWidth="2.8"
            fill="none"
            opacity="0.95"
          />
          <circle cx="50" cy="66" r="2.2" fill="#F8FAFC" opacity="0.9" />
          <circle cx="140" cy="67" r="1.8" fill="#BAE6FD" opacity="0.8" />
          <circle cx="270" cy="65" r="2" fill="#F8FAFC" opacity="0.9" />
          <circle cx="370" cy="66" r="1.8" fill="#BAE6FD" opacity="0.8" />

          {/* Dynamic Curling Bow Spray (V-Wake) */}
          <path d="M 24 65 Q 4 62 -22 69 Q -10 75 18 72 Z" fill="#E0F2FE" opacity="0.9" />
          <path d={`M 22 64 Q 0 ${56 - bowSprayBurst} -18 64`} stroke="#F8FAFC" strokeWidth="2.5" fill="none" />
          <circle cx="-12" cy={57 - bowSprayBurst * 0.7} r="2" fill="#BAE6FD" />
          <circle cx="-5" cy={54 - bowSprayBurst * 0.9} r="1.5" fill="#F8FAFC" />

          {/* Churning Propeller Wash at Stern */}
          <ellipse cx="430" cy="68" rx="24" ry="5.5" fill="#BAE6FD" opacity="0.8" />
          <ellipse cx="446" cy="69" rx="15" ry="3.8" fill="#F8FAFC" opacity="0.7" />
        </g>

        {/* Near-Foreground Sea Swell Lapping Against Cruiser Lower Hull (Physically Embeds Hull in Sea) */}
        <path
          d={`M 360 ${1310 + seaRoll * 0.5} Q 620 ${1300 - seaRoll * 0.3} 840 ${1308 + seaRoll * 0.4} T 1080 ${1306 + seaRoll * 0.3} L 1080 1495 L 360 1495 Z`}
          fill="#080F18"
        />
        <path
          d={`M 360 ${1308 + seaRoll * 0.5} Q 620 ${1298 - seaRoll * 0.3} 840 ${1306 + seaRoll * 0.4} T 1080 ${1304 + seaRoll * 0.3}`}
          stroke="#7DD3FC"
          strokeWidth="2.8"
          fill="none"
          opacity="0.75"
        />

        {/* Foreground Bering Sea Swell with Ice-Cyan Whitecap */}
        <path
          d={`M 0 ${1362 - seaRoll} Q 260 ${1382 + seaRoll} 540 ${1352 - seaRoll} T 1080 ${1368} L 1080 1495 L 0 1495 Z`}
          fill="#05080E"
        />
        <path
          d={`M 0 ${1360 - seaRoll} Q 260 ${1380 + seaRoll} 540 ${1350 - seaRoll} T 1080 ${1366}`}
          stroke="#38BDF8"
          strokeWidth="3.5"
          fill="none"
          opacity="0.8"
        />

        {/* LEFT SIDE: Rocky Alaskan Promontory with Coastal Survey Beacon & Lookout Silhouette */}
        <g transform="translate(70, 1020)">
          {/* Jagged Ice-Covered Bluff */}
          <path
            d="M -70 475 L 55 270 L 185 260 L 295 335 L 350 475 Z"
            fill="#0B121A"
            stroke="#1E293B"
            strokeWidth="3"
          />
          <path d="M 55 270 L 185 260 L 245 298 L 175 308 L 55 270 Z" fill="#E2E8F0" />

          {/* Snow-Crusted Coastal Survey Tripod Beacon (Zero Illustration Text) */}
          <g transform="translate(215, 185)">
            <line x1="15" y1="0" x2="-8" y2="95" stroke="#334155" strokeWidth="4" />
            <line x1="15" y1="0" x2="38" y2="95" stroke="#334155" strokeWidth="4" />
            <line x1="15" y1="-15" x2="15" y2="95" stroke="#475569" strokeWidth="4.5" />
            <polygon points="0,12 30,12 24,28 6,28" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="15" cy="-18" r="5" fill="#38BDF8" />
          </g>

          {/* Anatomical U.S. Coastal Lookout Silhouette with Binoculars */}
          <g transform={`translate(115, ${225 + lookoutBreath}) scale(1.25)`}>
            <AnatomicalSoldierSilhouette
              x={0}
              y={0}
              helmetType="PARKA_HOOD"
              pose="STANDING_RIFLE"
            />
            {/* Raised Binoculars */}
            <rect x="12" y="-70" width="24" height="10" rx="2" fill="#070A0E" stroke="#38BDF8" strokeWidth="1.5" />
          </g>
        </g>

        {/* Drifting Low Fog Veils */}
        <g opacity="0.35">
          <ellipse cx={280 + mistDrift * 0.4} cy="1380" rx="220" ry="24" fill="#64748B" />
          <ellipse cx={780 - mistDrift * 0.3} cy="1395" rx="260" ry="28" fill="#475569" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 2. SCENE 02: ALEUTIAN_ARCHIPELAGO_VECTOR_MAP
// Dynamic d3-geo Projected Tactical Map with Real GPS Coordinates,
// Contested Territory Hatching, Animated Frontlines & Troop Vectors
// =========================================================================
export const AleutianArchipelagoVectorMap: React.FC = () => {
  const frame = useCurrentFrame();
  const galeOffset = (frame * 6) % 120;
  const radarSweep = (frame * 1.2) % 360;

  // Initialize d3-geo projection engine for the Aleutian North Pacific theater
  const viewport = { x: 60, y: 880, width: 850, height: 590 };
  const projector = useMemo(() => {
    return createGeoProjector({
      projectionType: 'mercator',
      viewport,
      fitFeatures: ALEUTIAN_THEATER_GEOJSON,
    });
  }, []);

  // Project real GeoJSON landmass & graticule
  const projectedLandmass = useMemo(() => {
    return projector.projectPath(ALEUTIAN_THEATER_GEOJSON);
  }, [projector]);

  const graticulePath = useMemo(() => {
    return projector.getGraticulePath([10, 5]);
  }, [projector]);

  // Project strategic battle coordinates via d3-geo
  const attuPos = useMemo(() => projector.project([173.0, 52.9]), [projector]);
  const kiskaPos = useMemo(() => projector.project([177.5, 52.0]), [projector]);
  const dutchHarborPos = useMemo(() => projector.project([-166.5, 53.88]), [projector]);

  // Contested Japanese Occupation Zone (Western Aleutians)
  const contestedZonePath = useMemo(() => {
    const p1 = projector.project([171.5, 54.0]);
    const p2 = projector.project([179.5, 53.5]);
    const p3 = projector.project([179.0, 51.0]);
    const p4 = projector.project([171.0, 51.5]);
    return `M ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]} L ${p3[0]} ${p3[1]} L ${p4[0]} ${p4[1]} Z`;
  }, [projector]);

  // IJN Carrier Strike Force Raid Vector (Approach towards Dutch Harbor)
  const carrierRaidPath = useMemo(() => {
    const start = projector.project([-175.0, 48.5]);
    const mid = projector.project([-170.0, 51.0]);
    const end = dutchHarborPos;
    return `M ${start[0]} ${start[1]} Q ${mid[0]} ${mid[1]} ${end[0]} ${end[1]}`;
  }, [projector, dutchHarborPos]);

  // US Naval Patrol Frontline Dividing Pacific Theaters
  const patrolFrontlinePath = useMemo(() => {
    const pA = projector.project([-179.0, 55.5]);
    const pB = projector.project([-176.0, 53.0]);
    const pC = projector.project([-174.0, 50.0]);
    return `M ${pA[0]} ${pA[1]} Q ${pB[0]} ${pB[1]} ${pC[0]} ${pC[1]}`;
  }, [projector]);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <PolarHorizonGlow cx={540} cy={1180} rx={480} ry={280} color="CYAN" intensity={0.8} />

        {/* Map Tactical Border Box (Safe Zone: 864 - 1498) */}
        <rect
          x={viewport.x}
          y={viewport.y}
          width={viewport.width}
          height={viewport.height}
          rx="8"
          fill="#070D14"
          stroke="#1E293B"
          strokeWidth="3"
        />

        {/* Real d3-geo Projected Lat/Long Graticule Grid */}
        <path
          d={graticulePath}
          fill="none"
          stroke="#0E2338"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          opacity="0.8"
        />

        {/* Bathymetric Ocean Depth Contours */}
        <g fill="none" stroke="#0284C7" opacity="0.35" strokeWidth="1.8">
          <path d="M 80 1340 Q 300 1380 520 1310 T 890 1200" strokeDasharray="8 6" />
          <path d="M 80 1390 Q 320 1430 540 1350 T 890 1240" strokeWidth="1.5" />
          <path d="M 80 1440 Q 340 1480 560 1390 T 890 1280" strokeWidth="1" />
        </g>

        {/* Contested Japanese Occupation Zone Shading */}
        <ContestedTerritoryShading
          id="aleutian_contested_zone"
          path={contestedZonePath}
          faction="AXIS"
          patternStyle="DIAGONAL_STRIPES"
          stripeSpacing={18}
          stripeWidth={2.2}
          opacity={0.7}
          label="OCCUPIED ZONE"
          labelCenter={[(attuPos[0] + kiskaPos[0]) / 2, attuPos[1] - 40]}
          fontFamily={montserrat.fontFamily}
        />

        {/* Real Projected GeoJSON Landmasses (Attu, Kiska, Adak, Dutch Harbor, Alaska) */}
        <path
          d={projectedLandmass}
          fill="#0F172A"
          stroke="#38BDF8"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />

        {/* Animated Frontline Dividing Forces */}
        <AnimatedFrontline
          id="aleutian_patrol_line"
          path={patrolFrontlinePath}
          alliedColor="#38BDF8"
          hostileColor="#EF4444"
          lineWidth={3.5}
          style="DUAL_RIBBON"
          clashPoints={[
            {
              x: (attuPos[0] + kiskaPos[0]) / 2 + 10,
              y: (attuPos[1] + kiskaPos[1]) / 2,
              label: 'SKIRMISH',
              color: '#F59E0B',
            },
          ]}
          fontFamily={montserrat.fontFamily}
        />

        {/* Animated IJN Carrier Strike Raid Arrow */}
        <TacticalMovementArrow
          id="ijn_carrier_strike"
          path={carrierRaidPath}
          strokeColor="#EF4444"
          strokeWidth={4.5}
          arrowHead="CHEVRON"
          animationMode="FLOWING_DASHES"
          dashArray="26 14"
          flowSpeed={4.2}
          label="CARRIER RAID"
          fontFamily={montserrat.fontFamily}
        />

        {/* Animated Sweeping Williwaw Arctic Gale Vectors */}
        <g fill="none" stroke="#7DD3FC" strokeWidth="2.8" strokeLinecap="round">
          {[1060, 1140, 1220].map((wy, idx) => (
            <path
              key={wy}
              d={`M 100 ${wy} Q 360 ${wy - 60} 600 ${wy} T 880 ${wy - 40}`}
              strokeDasharray="40 80"
              strokeDashoffset={-galeOffset * (1.2 + idx * 0.4)}
              opacity={0.65 - idx * 0.15}
            />
          ))}
        </g>

        {/* Swirling Fog Front / Low Pressure System */}
        <g transform="translate(320, 1080)" opacity="0.55">
          <circle
            cx="0"
            cy="0"
            r="80"
            fill="none"
            stroke="#7DD3FC"
            strokeWidth="2"
            strokeDasharray="14 10"
            transform={`rotate(${radarSweep})`}
          />
          <circle
            cx="0"
            cy="0"
            r="130"
            fill="none"
            stroke="#0284C7"
            strokeWidth="1.5"
            strokeDasharray="20 15"
            transform={`rotate(${-radarSweep * 0.7})`}
          />
        </g>

        {/* Pulsating Battle Clash Markers at Real Projected Geo-Positions */}
        <PulsatingBattleMarker
          x={attuPos[0]}
          y={attuPos[1]}
          color="#EF4444"
          size={26}
          label="ATTU"
          sublabel="SEIZED"
          fontFamily={montserrat.fontFamily}
        />

        <PulsatingBattleMarker
          x={kiskaPos[0]}
          y={kiskaPos[1]}
          color="#EF4444"
          size={26}
          label="KISKA"
          sublabel="OCCUPIED"
          fontFamily={montserrat.fontFamily}
        />

        <PulsatingBattleMarker
          x={dutchHarborPos[0]}
          y={dutchHarborPos[1]}
          color="#38BDF8"
          size={28}
          label="DUTCH HARBOR"
          sublabel="STRUCK"
          impactFlash={true}
          impactFrame={30}
          fontFamily={montserrat.fontFamily}
        />
      </svg>
    </div>
  );
};

// =========================================================================
// 3. SCENE 03: ALEUTIAN_DUTCH_HARBOR_BOMBING
// June 3, 1942: Fuel tanks fracturing in fiery explosions, billowing oil smoke,
// lead Val dive bomber dropping payload, and follow-up Zero strafing run
// =========================================================================
export const AleutianDutchHarborBombing: React.FC = () => {
  const frame = useCurrentFrame();
  const flamePulse = 1 + Math.sin(frame * 0.3) * 0.12;
  const smokeRise = (frame * 2.2) % 180;
  const tracerOffset = (frame * 18) % 300;

  // 1. Lead Japanese Aichi D3A "Val" Dive Bomber: single non-looping dive & pull-up (frames 0..65)
  const valDiveX = interpolate(frame, [0, 35, 65], [840, 520, 160], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const valDiveY = interpolate(frame, [0, 35, 65], [890, 1140, 1020], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const valAngle = interpolate(frame, [0, 32, 45, 65], [42, 38, -6, -14], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const valOpacity = interpolate(frame, [50, 65], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // 2. 250kg Aerial Bomb Release: drops from Val at frame 16, strikes tank at frame 25
  const bombProgress = interpolate(frame, [16, 25], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const bombX = interpolate(bombProgress, [0, 1], [640, 375], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const bombY = interpolate(bombProgress, [0, 1], [1020, 1315], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const bombAngle = interpolate(bombProgress, [0, 1], [38, 70], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // 3. Detonation Shockwave & Fireball Expansion (detonates on bomb impact at frame 25)
  const blastScale =
    frame < 25
      ? 0.35
      : interpolate(frame, [25, 32, 128], [0.4, 1.35, 1.1], {
          extrapolateRight: 'clamp',
          extrapolateLeft: 'clamp',
        });
  const shockwaveR = interpolate(frame, [25, 48], [15, 190], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const shockwaveOpacity = interpolate(frame, [25, 48], [0.85, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // 4. Follow-up Mitsubishi A6M2 Zero Escort: distinct high-speed strafing run (frames 48..118)
  const zeroProgress = interpolate(frame, [48, 115], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const zeroX = interpolate(zeroProgress, [0, 1], [940, 60], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const zeroY = interpolate(zeroProgress, [0, 1], [950, 1160], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const zeroAngle = interpolate(zeroProgress, [0, 0.7, 1], [20, 14, -8], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const zeroOpacity = interpolate(frame, [46, 50, 105, 118], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const zeroGunsFiring = frame >= 65 && frame <= 88 && frame % 4 < 2;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <PolarHorizonGlow cx={500} cy={1280} rx={500} ry={280} color="COMBAT_AMBER" intensity={0.95} />

        {/* Dutch Harbor Dark Coastal Slopes */}
        <polygon points="40,1460 220,1300 450,1350 700,1280 920,1460" fill="#0A0E14" stroke="#1E293B" strokeWidth="2" />
        <path d="M 40 1420 L 920 1420 L 920 1495 L 40 1495 Z" fill="#070A0E" />

        {/* Fort Mears Coastal Barracks & Fuel Tanks */}
        <g transform="translate(140, 1320)">
          <rect x="30" y="40" width="90" height="60" rx="6" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
          <ellipse cx="75" cy="40" rx="45" ry="12" fill="#334155" />

          {/* Storage Tank 2 (Ruptured & Engulfed in Flames) */}
          <g transform="translate(180, 20)">
            <rect x="0" y="20" width="110" height="65" rx="6" fill="#1C1917" stroke="#DC2626" strokeWidth="2.5" />
            <ellipse cx="55" cy="20" rx="55" ry="14" fill="#374151" />
            <path d="M 30 20 L 45 45 L 35 70 L 60 85" stroke="#F59E0B" strokeWidth="4" fill="none" />
          </g>

          {/* Wooden Barracks Silhouettes */}
          <polygon points="350,60 410,32 470,60" fill="#18181B" />
          <rect x="360" y="60" width="100" height="40" fill="#18181B" />
          <polygon points="490,65 540,42 590,65" fill="#18181B" />
          <rect x="498" y="65" width="84" height="35" fill="#18181B" />
        </g>

        {/* Bomb Detonation Shockwave Ring */}
        {frame >= 25 && frame <= 48 && (
          <circle
            cx="375"
            cy="1310"
            r={shockwaveR}
            fill="none"
            stroke="#FEF08A"
            strokeWidth="3.5"
            opacity={shockwaveOpacity}
          />
        )}

        {/* Fiery Explosions & Molten Blast Cones */}
        <g transform="translate(375, 1310)">
          <circle cx="0" cy="0" r={88 * blastScale * flamePulse} fill="#DC2626" opacity={frame >= 25 ? 0.9 : 0.4} />
          <circle cx="0" cy="0" r={60 * blastScale * flamePulse} fill="#F59E0B" opacity={frame >= 25 ? 0.95 : 0.45} />
          <circle cx="0" cy="0" r={34 * blastScale * flamePulse} fill="#FEF08A" opacity={frame >= 25 ? 1 : 0.5} />
        </g>

        {/* Billowing Black Oil Smoke Plumes */}
        {[
          { x: 330, y: 1240, scale: 1.0, speed: 1.2 },
          { x: 390, y: 1200, scale: 1.3, speed: 1.4 },
          { x: 440, y: 1160, scale: 1.6, speed: 1.1 },
        ].map((puff, pIdx) => (
          <ellipse
            key={pIdx}
            cx={puff.x + Math.sin(frame * 0.05 + pIdx) * 16}
            cy={puff.y - (smokeRise * puff.speed) % 180}
            rx={45 * puff.scale}
            ry={38 * puff.scale}
            fill="#121011"
            opacity={0.88}
          />
        ))}

        {/* Falling 250kg Aerial Bomb (Frames 16..25) */}
        {frame >= 16 && frame <= 25 && (
          <g transform={`translate(${bombX}, ${bombY}) rotate(${bombAngle})`}>
            {/* Bomb Body */}
            <path d="M 0 -14 C 4 -14 6 -6 6 6 L 6 12 L -6 12 L -6 6 C -6 -6 -4 -14 0 -14 Z" fill="#0A0F16" />
            {/* Stabilizer Fins */}
            <polygon points="-8,10 -4,16 -6,16" fill="#0A0F16" />
            <polygon points="8,10 4,16 6,16" fill="#0A0F16" />
            <line x1="0" y1="12" x2="0" y2="16" stroke="#0A0F16" strokeWidth="2" />
          </g>
        )}

        {/* U.S. Navy Anti-Aircraft Tracer Streaks */}
        <g strokeLinecap="round">
          <line
            x1="620"
            y1="1400"
            x2={380 - tracerOffset * 0.8}
            y2={950 - tracerOffset * 1.5}
            stroke="#FEF08A"
            strokeWidth="4"
          />
          <line
            x1="220"
            y1="1410"
            x2={460 + tracerOffset * 0.7}
            y2={960 - tracerOffset * 1.4}
            stroke="#F59E0B"
            strokeWidth="3.5"
          />
        </g>

        {/* 1. Lead Japanese Aichi D3A Val Dive Bomber (Single motivated run, frames 0..65) */}
        {valOpacity > 0 && (
          <g
            transform={`translate(${valDiveX}, ${valDiveY}) rotate(${valAngle})`}
            opacity={valOpacity}
            filter="drop-shadow(0 0 10px rgba(0,0,0,0.85))"
          >
            {/* Fuselage & Spatted Fixed Landing Gear */}
            <polygon points="0,-38 9,16 0,42 -9,16" fill="#090D12" />
            <path d="M -80 5 Q 0 -12 80 5 Q 0 22 -80 5 Z" fill="#090D12" />
            {/* Spatted Gear Pods */}
            <polygon points="-24,12 -20,32 -28,32" fill="#090D12" />
            <polygon points="24,12 28,32 20,32" fill="#090D12" />
            {/* Hinomaru Roundels */}
            <circle cx="-50" cy="6" r="6.5" fill="#DC2626" />
            <circle cx="50" cy="6" r="6.5" fill="#DC2626" />
          </g>
        )}

        {/* 2. Follow-up Mitsubishi A6M2 Zero Escort (Strafing pass, frames 48..118) */}
        {zeroOpacity > 0 && (
          <g
            transform={`translate(${zeroX}, ${zeroY}) rotate(${zeroAngle})`}
            opacity={zeroOpacity}
            filter="drop-shadow(0 0 10px rgba(0,0,0,0.85))"
          >
            {/* Zero Fuselage */}
            <polygon points="0,-32 7,10 0,36 -7,10" fill="#080C11" />
            {/* Sleek Tapered Zero Wings */}
            <path d="M -72 2 Q 0 -10 72 2 Q 0 15 -72 2 Z" fill="#080C11" />
            {/* Horizontal Stabilizer */}
            <polygon points="-22,26 0,22 22,26 0,32" fill="#080C11" />
            {/* Red Hinomaru Insignia */}
            <circle cx="-46" cy="3" r="6" fill="#DC2626" />
            <circle cx="46" cy="3" r="6" fill="#DC2626" />

            {/* Twin 20mm Wing Cannon Muzzle Tracers when Strafing */}
            {zeroGunsFiring && (
              <g strokeLinecap="round">
                <line x1="-30" y1="4" x2="-80" y2="95" stroke="#FEF08A" strokeWidth="2.5" />
                <line x1="30" y1="4" x2="-20" y2="95" stroke="#FEF08A" strokeWidth="2.5" />
                <circle cx="-30" cy="4" r="3" fill="#F59E0B" />
                <circle cx="30" cy="4" r="3" fill="#F59E0B" />
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};

// =========================================================================
// 4. SCENE 04: ALEUTIAN_ATTU_KISKA_OCCUPATION_FLAG
// Snow-swept volcanic peak: SNLF silhouettes planting Clipped Imperial Japanese Flag
// =========================================================================
export const AleutianAttuKiskaOccupationFlag: React.FC = () => {
  const frame = useCurrentFrame();
  const snowFlurry = (frame * 4) % 240;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <PolarHorizonGlow cx={500} cy={1220} rx={480} ry={280} color="AURORA" intensity={0.88} />

        {/* Distant Secondary Peaks */}
        <polygon points="40,1485 240,1290 430,1485" fill="#070C12" opacity="0.8" />
        <polygon points="580,1485 780,1270 930,1485" fill="#070C12" opacity="0.8" />

        {/* Snow-Swept Basalt Mountain Ridge */}
        <polygon
          points="60,1490 330,1250 510,1205 790,1295 920,1490"
          fill="#0B1118"
          stroke="#1E293B"
          strokeWidth="3"
        />
        {/* Snow Cornices on Ridge Crest */}
        <polygon points="330,1250 510,1205 600,1235 480,1250 330,1250" fill="#E2E8F0" />

        {/* Strictly Clipped Waving Imperial Japanese Naval Battle Ensign */}
        <WavingJapaneseEnsign x={450} y={1000} width={280} height={175} />

        {/* Anatomical Japanese SNLF Silhouettes Securing Flagpole */}
        <g filter="drop-shadow(0 0 12px rgba(2, 132, 199, 0.35))">
          <AnatomicalSoldierSilhouette
            x={405}
            y={1210}
            scale={1.15}
            helmetType="JP_TYPE90"
            pose="STANDING_RIFLE"
            accentColor="#F8FAFC"
          />
          <AnatomicalSoldierSilhouette
            x={515}
            y={1230}
            scale={1.1}
            flipX={true}
            helmetType="JP_TYPE90"
            pose="CROUCHING_AIM"
          />
        </g>

        {/* Falling Snow and Wind Streaks */}
        <g stroke="#F8FAFC" strokeWidth="2" opacity="0.7" strokeLinecap="round">
          {[120, 260, 410, 580, 720, 840].map((sx, idx) => (
            <line
              key={idx}
              x1={sx}
              y1={960 + ((snowFlurry * (1.2 + idx * 0.3)) % 450)}
              x2={sx - 18}
              y2={960 + ((snowFlurry * (1.2 + idx * 0.3)) % 450) + 12}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 5. SCENE 05: ALEUTIAN_AKUTAN_ZERO_BOG_CRASH
// Tadayoshi Koga's A6M2 Zero resting inverted in Akutan Island bog
// =========================================================================
export const AleutianAkutanZeroBogCrash: React.FC = () => {
  const frame = useCurrentFrame();
  const waterRipple = (frame * 1.5) % 80;
  const smokeDrift = (frame * 1.0) % 120;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          <radialGradient id="akutanPoolLuminescence" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#0284C7" stopOpacity="0.3" />
            <stop offset="85%" stopColor="#0E1D2D" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0A1118" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="akutanTundraGround" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1C2D42" />
            <stop offset="25%" stopColor="#152435" />
            <stop offset="65%" stopColor="#101B27" />
            <stop offset="100%" stopColor="#0B131D" />
          </linearGradient>
          <linearGradient id="akutanFuselageGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#1E2B3A" />
            <stop offset="50%" stopColor="#2D3F54" />
            <stop offset="100%" stopColor="#3B526D" />
          </linearGradient>
          <linearGradient id="akutanWingGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#223347" />
            <stop offset="100%" stopColor="#344A62" />
          </linearGradient>
        </defs>

        <PolarHorizonGlow cx={480} cy={1270} rx={520} ry={300} color="CYAN" intensity={1.0} />

        {/* Distant Cold Tundra Ridges with Snow Cornices */}
        <polygon
          points="50,1370 230,1250 510,1280 810,1235 920,1370"
          fill="#13202E"
          stroke="#334155"
          strokeWidth="1.5"
        />
        <polygon points="230,1250 350,1268 320,1276 210,1262" fill="#CBD5E1" opacity="0.85" />
        <polygon points="510,1280 620,1292 590,1300 490,1288" fill="#CBD5E1" opacity="0.85" />

        {/* Midground Gloomy Akutan Tundra Marsh Hummocks */}
        <polygon
          points="50,1460 260,1320 540,1345 840,1305 920,1460"
          fill="url(#akutanTundraGround)"
          stroke="#38BDF8"
          strokeWidth="2"
        />
        {/* Frost / Snow Crust Ledges on Tundra Hummocks */}
        <path
          d="M 230 1324 Q 260 1318 310 1326 Q 340 1332 370 1338"
          stroke="#E2E8F0"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 790 1312 Q 840 1304 880 1322"
          stroke="#E2E8F0"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Foreground Peat Bog & Permafrost Layer Cross-Section */}
        <rect x="50" y="1375" width="870" height="115" fill="#111B27" stroke="#1E293B" strokeWidth="1.5" />
        {/* Glowing Permafrost Ice Vein Band */}
        <line x1="50" y1="1378" x2="920" y2="1378" stroke="#38BDF8" strokeWidth="2.5" opacity="0.75" />
        <line x1="60" y1="1405" x2="910" y2="1405" stroke="#1E3A5F" strokeWidth="2" strokeDasharray="30 15" opacity="0.6" />

        {/* Waterlogged Tundra Pool with Vivid Sky Luminescence */}
        <ellipse cx="490" cy="1395" rx="360" ry="62" fill="#12202E" stroke="#38BDF8" strokeWidth="2" />
        <ellipse cx="490" cy="1395" rx="330" ry="52" fill="#0C1A29" />
        <ellipse cx="490" cy="1395" rx="280" ry="40" fill="url(#akutanPoolLuminescence)" />

        {/* Dynamic Expanding Ripples in Peat Water */}
        <ellipse
          cx="490"
          cy="1395"
          rx={60 + waterRipple * 3.2}
          ry={10 + waterRipple * 0.55}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="2.2"
          opacity={Math.max(0, 0.85 - waterRipple / 80)}
        />
        <ellipse
          cx="490"
          cy="1395"
          rx={20 + ((waterRipple + 40) % 80) * 3.2}
          ry={4 + ((waterRipple + 40) % 80) * 0.55}
          fill="none"
          stroke="#7DD3FC"
          strokeWidth="1.8"
          opacity={Math.max(0, 0.7 - ((waterRipple + 40) % 80) / 80)}
        />

        {/* Parametric Inverted Mitsubishi A6M2 Zero Fighter (Crisp Contrast & Cyan Rim Back-Glow) */}
        <g
          transform="translate(480, 1340) rotate(-14)"
          filter="drop-shadow(0 0 18px rgba(56, 189, 248, 0.6)) drop-shadow(0 0 3px rgba(255, 255, 255, 0.4))"
        >
          {/* Bent 3-Blade Propeller Stuck Inverted in Bog Peat */}
          <g transform="translate(-160, 45)">
            <ellipse cx="0" cy="0" rx="14" ry="12" fill="#243343" stroke="#94A3B8" strokeWidth="2" />
            {/* Bent Blade 1 into Mud */}
            <path d="M 0 0 Q -25 25 -42 46" stroke="#94A3B8" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M -34 38 Q -38 42 -42 46" stroke="#F59E0B" strokeWidth="7" fill="none" strokeLinecap="round" />
            {/* Bent Blade 2 */}
            <line x1="0" y1="0" x2="-22" y2="-45" stroke="#94A3B8" strokeWidth="6.5" strokeLinecap="round" />
            <line x1="-16" y1="-34" x2="-22" y2="-45" stroke="#F59E0B" strokeWidth="6.5" strokeLinecap="round" />
            {/* Bent Blade 3 */}
            <line x1="0" y1="0" x2="32" y2="-36" stroke="#94A3B8" strokeWidth="6.5" strokeLinecap="round" />
            <line x1="22" y1="-26" x2="32" y2="-36" stroke="#F59E0B" strokeWidth="6.5" strokeLinecap="round" />
          </g>

          {/* Engine Cowling (Sakae 12 Radial) */}
          <rect x="-155" y="8" width="62" height="42" rx="4" fill="#1A2533" stroke="#475569" strokeWidth="2.5" />
          <line x1="-125" y1="8" x2="-125" y2="50" stroke="#334155" strokeWidth="1.5" />
          <line x1="-105" y1="8" x2="-105" y2="50" stroke="#334155" strokeWidth="1.5" />

          {/* Inverted Greenhouse Cockpit Canopy with Glowing Cyan Translucent Glass */}
          <polygon
            points="-75,40 -15,40 -32,60 -80,54"
            fill="rgba(56, 189, 248, 0.4)"
            stroke="#38BDF8"
            strokeWidth="2"
          />
          <line x1="-55" y1="40" x2="-58" y2="56" stroke="#CBD5E1" strokeWidth="1.8" />
          <line x1="-35" y1="40" x2="-44" y2="58" stroke="#CBD5E1" strokeWidth="1.8" />
          <line x1="-70" y1="44" x2="-25" y2="44" stroke="#F8FAFC" strokeWidth="1.5" opacity="0.8" />

          {/* Main Fuselage Profile */}
          <polygon
            points="-155,8 165,-6 175,-25 -155,-6"
            fill="url(#akutanFuselageGrad)"
            stroke="#64748B"
            strokeWidth="2.5"
          />
          {/* Fuselage Panel Seams */}
          <line x1="-80" y1="8" x2="-80" y2="-6" stroke="#475569" strokeWidth="1.5" />
          <line x1="-10" y1="5" x2="-10" y2="-10" stroke="#475569" strokeWidth="1.5" />
          <line x1="60" y1="1" x2="60" y2="-15" stroke="#475569" strokeWidth="1.5" />
          <line x1="120" y1="-3" x2="120" y2="-20" stroke="#475569" strokeWidth="1.5" />

          {/* Main Monoplane Wing */}
          <path
            d="M -92 6 L -10 -44 L 98 -44 L 42 6 Z"
            fill="url(#akutanWingGrad)"
            stroke="#38BDF8"
            strokeWidth="2.2"
          />
          <line x1="-10" y1="-44" x2="25" y2="-44" stroke="#94A3B8" strokeWidth="3" />

          {/* Imperial Japanese Naval Hinomaru (Red Sun with Stark White Rim) */}
          <circle cx="12" cy="-21" r="19" fill="#DC2626" stroke="#F8FAFC" strokeWidth="2.5" />

          {/* Inverted Tail Assembly (Vertical Stabilizer & Tail Wheel) */}
          <line x1="150" y1="-14" x2="168" y2="-40" stroke="#94A3B8" strokeWidth="4.5" />
          <circle cx="170" cy="-44" r="5.5" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
          <polygon
            points="120,-8 158,-30 172,-13"
            fill="#2D3F54"
            stroke="#64748B"
            strokeWidth="2"
          />
          <line x1="135" y1="-12" x2="155" y2="-22" stroke="#38BDF8" strokeWidth="1.5" />
        </g>

        {/* Leaking Oil Steam & Radiator Vapor Wisps */}
        <g opacity="0.65">
          <circle cx={320 - smokeDrift * 0.3} cy={1330 - smokeDrift * 0.6} r={12 + smokeDrift * 0.15} fill="#CBD5E1" />
          <circle cx={300 - smokeDrift * 0.5} cy={1300 - smokeDrift * 0.8} r={18 + smokeDrift * 0.2} fill="#94A3B8" />
          <circle cx={340 - smokeDrift * 0.2} cy={1340 - smokeDrift * 0.4} r={8 + smokeDrift * 0.1} fill="#F8FAFC" opacity="0.5" />
        </g>

        {/* Tundra Reeds & Frost Grass Tufts Framing the Bog Pool */}
        <g stroke="#38BDF8" strokeWidth="2.8" strokeLinecap="round" opacity="0.75">
          {[110, 200, 680, 770, 840].map((tx) => (
            <g key={tx} transform={`translate(${tx}, 1415)`}>
              <line x1="0" y1="0" x2="-8" y2="-24" />
              <line x1="4" y1="0" x2="2" y2="-28" stroke="#E2E8F0" />
              <line x1="8" y1="0" x2="14" y2="-22" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 6. SCENE 06: ALEUTIAN_AKUTAN_ZERO_SCHEMATIC
// Technical orthographic blueprint cutaway over cyan grid with callout rings
// =========================================================================
export const AleutianAkutanZeroSchematic: React.FC = () => {
  const frame = useCurrentFrame();
  const reticlePulse = 1 + Math.sin(frame * 0.14) * 0.15;
  const scanSweep = (frame * 4) % 580;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <PolarHorizonGlow cx={480} cy={1180} rx={480} ry={280} color="CYAN" intensity={0.7} />

        {/* Blueprint Framing Container */}
        <rect x="60" y="880" width="850" height="590" rx="8" fill="#050B12" stroke="#0284C7" strokeWidth="2.5" />

        {/* Blueprint Engineering Grid */}
        <g stroke="#0A1D2E" strokeWidth="1.5">
          {[930, 990, 1050, 1110, 1170, 1230, 1290, 1350, 1410].map((gy) => (
            <line key={gy} x1="60" y1={gy} x2="910" y2={gy} />
          ))}
          {[120, 200, 280, 360, 440, 520, 600, 680, 760, 840].map((gx) => (
            <line key={gx} x1={gx} y1="880" x2={gx} y2="1470" />
          ))}
        </g>

        {/* Laser Scanning Line Sweep */}
        <line x1="60" y1={880 + scanSweep} x2="910" y2={880 + scanSweep} stroke="#38BDF8" strokeWidth="2" opacity="0.6" strokeDasharray="12 6" />

        {/* Top-Down Orthographic Blueprint Silhouette: Mitsubishi A6M2 Zero */}
        <g transform="translate(480, 1175)" stroke="#38BDF8" strokeWidth="2.2" fill="#081523">
          <polygon points="0,-165 24,-80 19,125 5,165 -5,165 -19,125 -24,-80" />
          <ellipse cx="0" cy="-165" rx="28" ry="14" fill="#0C2136" stroke="#7DD3FC" strokeWidth="2.5" />
          <line x1="-75" y1="-170" x2="75" y2="-170" stroke="#7DD3FC" strokeWidth="3" />
          <rect x="-14" y="-60" width="28" height="68" rx="4" fill="#0A1929" />
          <line x1="-14" y1="-30" x2="14" y2="-30" />
          <line x1="-14" y1="0" x2="14" y2="0" />

          {/* Swept Monoplane Wings */}
          <polygon points="-24,-50 -265,20 -258,48 -19,28 19,28 258,48 265,20 24,-50" />
          {[-200, -140, -80, 80, 140, 200].map((rx) => (
            <line key={rx} x1={rx} y1={rx < 0 ? -10 - rx * 0.15 : -10 + rx * 0.15} x2={rx} y2={rx < 0 ? 36 + rx * 0.05 : 36 - rx * 0.05} stroke="#0284C7" strokeWidth="1.5" />
          ))}

          {/* Wing Roundels */}
          <circle cx="-175" cy="14" r="22" fill="none" stroke="#EF4444" strokeWidth="2" />
          <circle cx="175" cy="14" r="22" fill="none" stroke="#EF4444" strokeWidth="2" />

          {/* Horizontal Stabilizers */}
          <polygon points="-12,130 -90,155 -85,172 -4,158 4,158 85,172 90,155 12,130" />
        </g>

        {/* CALLOUT 1: Aileron Roll-Lock Indicator at Left Wingtip */}
        <g transform="translate(230, 1190)">
          <circle cx="0" cy="0" r={30 * reticlePulse} fill="none" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="6 4" />
          <circle cx="0" cy="0" r={15 * reticlePulse} fill="none" stroke="#EF4444" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="5" fill="#EF4444" />
          <line x1="0" y1="0" x2="-50" y2="-70" stroke="#EF4444" strokeWidth="2.5" />
          <path d="M -65 -85 L -35 -85 L -50 -65 Z" fill="#EF4444" />
        </g>

        {/* CALLOUT 2: Float Carburetor Engine Cutout at Cowl */}
        <g transform="translate(480, 1010)">
          <circle cx="0" cy="0" r={28 * reticlePulse} fill="none" stroke="#F59E0B" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="5" fill="#F59E0B" />
          <line x1="0" y1="0" x2="75" y2="-45" stroke="#F59E0B" strokeWidth="2.5" />
          <circle cx="75" cy="-45" r="8" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
        </g>

        {/* 1-Word Blueprint Model Tag */}
        <text x="90" y="925" fill="#7DD3FC" fontSize="16" fontFamily={montserrat.fontFamily} fontWeight="900" letterSpacing="2">A6M2</text>
      </svg>
    </div>
  );
};

// =========================================================================
// 7. SCENE 07: ALEUTIAN_B24_FOG_MOUNTAIN_HAZARD
// Eleventh Air Force B-24 Liberators banking through fog toward jagged peak
// =========================================================================
export const AleutianB24FogMountainHazard: React.FC = () => {
  const frame = useCurrentFrame();
  const bankAngle = Math.sin(frame * 0.08) * 8;
  const fogScroll = (frame * 3) % 400;
  const propSpin = (frame * 40) % 360;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <PolarHorizonGlow cx={540} cy={1220} rx={480} ry={280} color="CYAN" intensity={0.75} />

        {/* Razor-Sharp Ice-Covered Volcanic Peak Looming Out of Mist */}
        <polygon points="480,1485 720,990 915,1485" fill="#090E14" stroke="#1E293B" strokeWidth="3" />
        <polygon points="682,1100 720,990 760,1100 720,1075" fill="#F8FAFC" />
        <path d="M 720 1075 L 740 1280 L 705 1360" stroke="#7DD3FC" strokeWidth="2.5" fill="none" opacity="0.6" />

        {/* Background Fog Banks */}
        <g opacity="0.5">
          <ellipse cx={220 + fogScroll * 0.6} cy="1200" rx="320" ry="60" fill="#334155" />
          <ellipse cx={780 - fogScroll * 0.5} cy="1160" rx="360" ry="70" fill="#1E293B" />
        </g>

        {/* Lead B-24 Liberator Silhouette Banking Perilously Away from Peak */}
        <g
          transform={`translate(350, 1180) rotate(${-18 + bankAngle})`}
          filter="drop-shadow(0 0 16px rgba(0,0,0,0.9))"
        >
          <ellipse cx="-135" cy="-35" rx="8" ry="24" fill="#070A0E" stroke="#334155" strokeWidth="1.5" />
          <ellipse cx="-135" cy="35" rx="8" ry="24" fill="#070A0E" stroke="#334155" strokeWidth="1.5" />
          <rect x="-140" y="-35" width="10" height="70" fill="#070A0E" />

          <polygon points="-140,-13 120,-13 148,-4 142,14 -140,14" fill="#070A0E" stroke="#1E293B" strokeWidth="1.5" />
          <polygon points="-20,-165 12,-165 26,165 -6,165" fill="#090E14" stroke="#334155" strokeWidth="1.5" />

          {[-112, -56, 56, 112].map((py, idx) => (
            <g key={idx} transform={`translate(25, ${py})`}>
              <rect x="0" y="-8" width="22" height="16" rx="3" fill="#070A0E" />
              <ellipse
                cx="22"
                cy="0"
                rx="4"
                ry="18"
                fill="none"
                stroke="#7DD3FC"
                strokeWidth="2"
                opacity="0.75"
                transform={`rotate(${propSpin})`}
              />
            </g>
          ))}

          <circle cx="2" cy="-95" r="11" fill="#1E293B" stroke="#F8FAFC" strokeWidth="1.8" />
        </g>

        {/* Trail / Wingman B-24 Silhouette Emerging Deeper in Fog */}
        <g
          transform={`translate(185, 1295) rotate(${-15 + bankAngle * 0.8}) scale(0.65)`}
          opacity="0.65"
        >
          <ellipse cx="-135" cy="-35" rx="8" ry="24" fill="#0A0F16" />
          <ellipse cx="-135" cy="35" rx="8" ry="24" fill="#0A0F16" />
          <polygon points="-140,-12 120,-12 145,-4 140,14 -140,14" fill="#0A0F16" />
          <polygon points="-20,-160 10,-160 25,160 -5,160" fill="#0A0F16" />
        </g>

        {/* Foreground Heavy Fog Bank */}
        <g opacity="0.65">
          <ellipse cx={460 + fogScroll * 0.7} cy="1385" rx="350" ry="52" fill="#1E293B" />
          <ellipse cx={840 - fogScroll * 0.6} cy="1345" rx="280" ry="44" fill="#334155" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 8. SCENE 08: ALEUTIAN_KOMANDORSKI_CRUISER_DUEL
// Battle of the Komandorski Islands: USS Salt Lake City firing broadsides & laying smoke
// =========================================================================
export const AleutianKomandorskiCruiserDuel: React.FC = () => {
  const frame = useCurrentFrame();
  const seaPitch = Math.sin(frame * 0.1) * 3.5;
  const muzzleFlash = frame % 30 < 8;
  const smokePuff = (frame * 2.5) % 300;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <PolarHorizonGlow cx={480} cy={1260} rx={480} ry={280} color="COMBAT_AMBER" intensity={0.9} />

        {/* Distant Japanese Cruiser Silhouettes (Nachi / Maya) on Horizon */}
        <g transform="translate(650, 1215)" opacity="0.7">
          <path d="M 0 38 L 32 24 L 160 24 L 195 38 Z" fill="#070B10" stroke="#1E293B" strokeWidth="1.5" />
          <rect x="65" y="6" width="22" height="20" fill="#070B10" />
          <line x1="76" y1="6" x2="76" y2="-16" stroke="#070B10" strokeWidth="3" />
          <circle cx="24" cy="28" r="9" fill="#F59E0B" />
        </g>

        {/* Near-Miss Water Geyser Erupting from Bering Sea */}
        <g transform="translate(605, 1270)">
          <path d="M -18 32 Q 0 -95 18 32 Z" fill="#F8FAFC" opacity="0.8" />
          <ellipse cx="0" cy="28" rx="34" ry="9" fill="#7DD3FC" opacity="0.65" />
        </g>

        {/* Heavy Scrolling Smokescreen Poured from Stern Smoke Generators */}
        <g opacity="0.85">
          {[0, 80, 160, 240].map((so, idx) => (
            <ellipse
              key={idx}
              cx={210 - ((smokePuff + so) % 260)}
              cy={1270 - idx * 10}
              rx={55 + idx * 8}
              ry={40 + idx * 5}
              fill="#18181B"
            />
          ))}
        </g>

        {/* Foreground Bering Sea Swell */}
        <path
          d="M 50 1330 Q 300 1290 540 1320 T 915 1310 L 915 1495 L 50 1495 Z"
          fill="#080E16"
        />

        {/* Heavy Cruiser USS Salt Lake City (CA-25) Pitching on Swells */}
        <g transform={`translate(240, ${1235 + seaPitch})`} filter="drop-shadow(0 0 16px rgba(0,0,0,0.85))">
          <path d="M 0 58 L 48 40 L 330 40 L 375 58 L 350 80 L 22 80 Z" fill="#070A0E" stroke="#334155" strokeWidth="2" />
          <rect x="140" y="10" width="48" height="32" fill="#070A0E" />
          <line x1="164" y1="10" x2="164" y2="-30" stroke="#334155" strokeWidth="4" />
          <rect x="215" y="18" width="32" height="24" fill="#070A0E" />

          {/* Forward & Aft 8-inch Main Gun Turrets */}
          <rect x="65" y="28" width="38" height="14" rx="2" fill="#0A0F16" stroke="#334155" strokeWidth="1.5" />
          <line x1="103" y1="34" x2="170" y2="22" stroke="#64748B" strokeWidth="4.5" />
          <rect x="270" y="28" width="38" height="14" rx="2" fill="#0A0F16" stroke="#334155" strokeWidth="1.5" />
          <line x1="308" y1="34" x2="375" y2="22" stroke="#64748B" strokeWidth="4.5" />

          {/* Muzzle Flash Shockwaves and Glowing 8-inch Shell Tracers */}
          {muzzleFlash && (
            <g transform="translate(170, 22)">
              <polygon points="0,0 65,-24 65,18" fill="#F59E0B" />
              <polygon points="0,0 38,-14 38,8" fill="#FEF08A" />
              <line x1="65" y1="-4" x2="295" y2="-68" stroke="#FEF08A" strokeWidth="4.5" strokeLinecap="round" />
            </g>
          )}
        </g>

        <path d="M 50 1375 Q 320 1415 580 1365 T 915 1390" stroke="#38BDF8" strokeWidth="2.5" fill="none" opacity="0.65" />
      </svg>
    </div>
  );
};

// =========================================================================
// 9. SCENE 09: ALEUTIAN_ATTU_AMPHIBIOUS_LANDING
// Operation Landcrab: Higgins boat bow ramp down, 7th Infantry wading ashore & 11,000 counter
// Soldiers bounce and advance in beat-synced cadence to the 113 BPM soundtrack
// =========================================================================
export const AleutianAttuAmphibiousLanding: React.FC = () => {
  const frame = useCurrentFrame();
  const surfRoll = Math.sin(frame * 0.12) * 8;
  const troopCount = Math.round(interpolate(frame, [0, 66], [0, 11000], { extrapolateRight: 'clamp' }));

  // 113.0 BPM Zero-Drift Beat Sync:
  // Beat 34 is at relative frame 29; beat interval is 31.8584 frames.
  const beatOffset = 29;
  const framesPerBeat = 31.8584;

  // Normalized phase along the continuous beat cycle:
  // 0.0 is the downbeat impact transient, 0.5 is the upbeat knee-lift.
  const beatCycle = ((frame - beatOffset) % framesPerBeat + framesPerBeat) % framesPerBeat;
  const beatNorm = beatCycle / framesPerBeat;

  // Higgins craft rocking in the surging surf
  const boatHeave = Math.sin(frame * 0.1) * 3;
  const boatPitch = Math.sin(frame * 0.08) * 1.5;

  // Assault squad wading off the Higgins craft ramp and advancing across Massacre Bay beach
  const squad = [
    { id: 'lead', baseX: 690, baseY: 1358, s: 1.12, cadenceOffset: 0.0 },
    { id: 'scout', baseX: 585, baseY: 1350, s: 1.08, cadenceOffset: 0.5 },
    { id: 'bar', baseX: 480, baseY: 1354, s: 1.10, cadenceOffset: 0.0 },
    { id: 'rifle', baseX: 375, baseY: 1346, s: 1.06, cadenceOffset: 0.5 },
    { id: 'ramp', baseX: 270, baseY: 1342, s: 1.02, cadenceOffset: 0.0 },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <PolarHorizonGlow cx={480} cy={1240} rx={480} ry={280} color="CYAN" intensity={0.85} />

        {/* Fog-Shrouded Massacre Bay Mountains */}
        <polygon points="50,1460 250,1220 510,1300 790,1210 915,1460" fill="#0C141C" stroke="#1E293B" strokeWidth="2.5" />
        <polygon points="220,1255 250,1220 285,1260 250,1248" fill="#E2E8F0" opacity="0.8" />
        <polygon points="755,1250 790,1210 825,1255 790,1240" fill="#E2E8F0" opacity="0.8" />

        {/* Distant Transport Ships on Massacre Bay Horizon */}
        <g transform="translate(470, 1175)" opacity="0.75">
          <path d="M 0 38 L 28 22 L 175 22 L 200 38 Z" fill="#070B10" />
          <rect x="65" y="4" width="38" height="18" fill="#070B10" />
          <line x1="84" y1="4" x2="84" y2="-20" stroke="#070B10" strokeWidth="3" />
          <path d="M 230 38 L 252 26 L 355 26 L 375 38 Z" fill="#070B10" />
          <rect x="285" y="12" width="28" height="14" fill="#070B10" />
        </g>

        {/* Freezing Churning Surf & Black Volcanic Sand Beach */}
        <rect x="50" y="1370" width="865" height="125" fill="#070C12" />
        <path
          d={`M 50 ${1365 + surfRoll} Q 320 ${1390 - surfRoll} 560 ${1360 + surfRoll} T 915 ${1375}`}
          stroke="#7DD3FC"
          strokeWidth="4"
          fill="none"
          opacity="0.85"
        />

        {/* Higgins LCVP Landing Craft with Bow Ramp Dropped */}
        <g
          transform={`translate(115, ${1265 + boatHeave}) rotate(${boatPitch}, 100, 45)`}
          filter="drop-shadow(0 8px 16px rgba(0,0,0,0.8))"
        >
          <polygon points="0,15 200,15 225,75 18,75" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
          <rect x="12" y="25" width="175" height="16" fill="#0F172A" />
          {/* Dropped Front Bow Ramp extending into surf */}
          <polygon points="200,15 280,82 268,90 192,28" fill="#334155" stroke="#7DD3FC" strokeWidth="2" />
          <rect x="18" y="-12" width="42" height="27" rx="2" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
        </g>

        {/* Anatomical U.S. 7th Infantry Division Silhouettes Bouncing & Wading to the Beat */}
        {squad.map((trp) => {
          const soldierPhase = (beatNorm + trp.cadenceOffset) % 1.0;
          // Steady forward wading progression (~90px across scene) + beat surge
          const steadyForward = (frame / 136) * 90;
          const strideSurge = Math.sin((soldierPhase - 0.25) * Math.PI * 2) * 5;
          const posX = trp.baseX + steadyForward + strideSurge;

          // Vertical bounce locked to the 113 BPM downbeat transient
          const bounceY = Math.cos(soldierPhase * Math.PI * 2) * 6.5;
          const posY = trp.baseY + bounceY;

          // Body lean and scissoring leg stride
          const bodyLean = Math.sin(soldierPhase * Math.PI * 2) * 3.2;
          const stridePhase = Math.sin(soldierPhase * Math.PI * 2);

          // Dynamic foam splash flaring on beat impact
          const beatImpact = Math.max(0, 1 - Math.abs(soldierPhase - (soldierPhase > 0.5 ? 1 : 0)) * 4.5);
          const splashWidth = 22 + beatImpact * 16;
          const splashAlpha = 0.55 + beatImpact * 0.45;

          return (
            <g key={trp.id}>
              {/* Bow-wave wake trail behind soldier in surf */}
              <ellipse
                cx={posX - 18}
                cy={posY + 30}
                rx={splashWidth * 0.9}
                ry={5}
                fill="#38BDF8"
                opacity={splashAlpha * 0.35}
              />

              {/* Anatomical soldier silhouette */}
              <AnatomicalSoldierSilhouette
                x={posX}
                y={posY}
                scale={trp.s}
                helmetType="US_M1"
                pose="WADING"
                accentColor="#F8FAFC"
                stridePhase={stridePhase}
                bodyTilt={bodyLean}
              />

              {/* Dynamic surf splash & frothing foam around knees */}
              <path
                d={`M ${posX - splashWidth} ${posY + 27} Q ${posX} ${posY + 21 - beatImpact * 7} ${posX + splashWidth} ${posY + 27}`}
                stroke="#7DD3FC"
                strokeWidth={2.8 + beatImpact * 1.5}
                fill="none"
                opacity={splashAlpha}
              />

              {/* Ejected water spray droplets on beat foot-strike */}
              {beatImpact > 0.3 && (
                <g opacity={splashAlpha}>
                  <circle cx={posX + 16} cy={posY + 16 - beatImpact * 8} r={2.2} fill="#F8FAFC" />
                  <circle cx={posX - 12} cy={posY + 18 - beatImpact * 6} r={1.8} fill="#7DD3FC" />
                </g>
              )}
            </g>
          );
        })}

        {/* Rolling Integer Counter (Single-Source Metric in Montserrat) */}
        <g transform="translate(480, 965)">
          <rect
            x="-150"
            y="-44"
            width="300"
            height="84"
            rx="8"
            fill="#090E16"
            stroke="#38BDF8"
            strokeWidth="3"
            filter="drop-shadow(0 0 18px rgba(56, 189, 248, 0.45))"
          />
          <text
            x="0"
            y="16"
            fill="#F4F7FA"
            fontSize="48"
            fontFamily={montserrat.fontFamily}
            fontWeight="900"
            textAnchor="middle"
            letterSpacing="3"
          >
            {troopCount.toLocaleString()}
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 10. SCENE 10: ALEUTIAN_HIGH_RIDGE_MIST_FIRE
// Japanese machine-gun bunker on high snow ridge firing downward through fog at pinned GI silhouettes
// =========================================================================
export const AleutianHighRidgeMistFire: React.FC = () => {
  const frame = useCurrentFrame();
  const mgFlash = frame % 12 < 6;
  const fogDrift = (frame * 2.2) % 360;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="ridgeMountainGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E2E42" />
            <stop offset="35%" stopColor="#162434" />
            <stop offset="70%" stopColor="#121B27" />
            <stop offset="100%" stopColor="#0B131C" />
          </linearGradient>
          <linearGradient id="snowCouloirGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="50%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
          <radialGradient id="highCrestFlare" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#DC2626" stopOpacity="0.5" />
            <stop offset="75%" stopColor="#1E293B" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0A1118" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="mistRibbonGrad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94A3B8" stopOpacity="0" />
            <stop offset="25%" stopColor="#CBD5E1" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#F1F5F9" stopOpacity="0.45" />
            <stop offset="75%" stopColor="#CBD5E1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#94A3B8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="boulderFaceGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#253548" />
            <stop offset="60%" stopColor="#1A2736" />
            <stop offset="100%" stopColor="#121C26" />
          </linearGradient>
        </defs>

        {/* Dynamic Flare & Polar Backlighting behind Mountain Ridge */}
        <PolarHorizonGlow cx={520} cy={1180} rx={500} ry={290} color="FLARE_RED" intensity={0.9} />
        <ellipse cx="600" cy="980" rx="360" ry="160" fill="url(#highCrestFlare)" />

        {/* Distant Craggy Volcanic Peaks with Snow Flurries */}
        <polygon
          points="50,1260 220,1030 450,1110 720,970 920,1160"
          fill="#131E2A"
          stroke="#334155"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <polygon points="220,1030 260,1065 190,1060" fill="#CBD5E1" opacity="0.8" />
        <polygon points="720,970 760,1005 690,1000" fill="#F8FAFC" opacity="0.85" />

        {/* Full-Width Craggy Mountain Slope & High Ridge with Stratified Rock Facets */}
        <polygon
          points="50,1490 360,930 890,970 915,1490"
          fill="url(#ridgeMountainGrad)"
          stroke="#38BDF8"
          strokeWidth="2.2"
        />

        {/* Snow Cornices & Ice Caps Clinging to High Ridge Crest */}
        <polygon points="360,930 890,970 850,1015 410,965" fill="url(#snowCouloirGrad)" />
        <path
          d="M 360 930 L 410 965 L 530 960 L 680 972 L 850 1015"
          stroke="#F8FAFC"
          strokeWidth="3.5"
          fill="none"
        />

        {/* Diagonal Snow Couloirs / Chutes Breaking up the Mountain Rock Face */}
        <polygon points="450,965 425,1160 442,1165 470,967" fill="#CBD5E1" opacity="0.75" />
        <polygon points="710,970 660,1230 682,1235 735,972" fill="#E2E8F0" opacity="0.75" />
        <polygon points="570,962 535,1085 550,1087 585,963" fill="#94A3B8" opacity="0.65" />
        <line x1="425" y1="1160" x2="400" y2="1350" stroke="#CBD5E1" strokeWidth="2.5" opacity="0.6" strokeDasharray="16 8" />

        {/* UPPER SECTOR: Japanese Type 92 Heavy Machine Gun Emplacement on High Ridge */}
        <g transform="translate(560, 995)">
          {/* Weathered Sandbags & Basalt Revetment Wall */}
          <path
            d="M -50 32 L -28 6 L 105 10 L 125 36 Z"
            fill="#2A384A"
            stroke="#475569"
            strokeWidth="2"
          />
          {/* Snow Dusting on Sandbag Tops */}
          <polygon points="-28,6 105,10 95,16 -20,12" fill="#F8FAFC" opacity="0.9" />

          {/* Tripod Mount & Finned Steel Heavy Barrel */}
          <line x1="20" y1="8" x2="-32" y2="40" stroke="#94A3B8" strokeWidth="4.5" />
          <line x1="20" y1="8" x2="68" y2="40" stroke="#94A3B8" strokeWidth="4.5" />
          <line x1="26" y1="4" x2="-72" y2="30" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
          <line x1="-30" y1="20" x2="-72" y2="30" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />

          {/* Anatomical Japanese Gunner & Spotter with Crimson Rim Backlighting */}
          <g filter="drop-shadow(0 0 16px rgba(239, 68, 68, 0.75)) drop-shadow(0 0 3px rgba(255, 255, 255, 0.4))">
            <AnatomicalSoldierSilhouette
              x={55}
              y={5}
              scale={0.95}
              flipX={true}
              helmetType="JP_TYPE90"
              pose="CROUCHING_AIM"
              accentColor="#EF4444"
            />
          </g>

          {/* Crimson & Amber Muzzle Flash + Heavy Tracers Firing Steeply Downward */}
          {mgFlash && (
            <g>
              <polygon points="-72,30 -125,20 -105,56" fill="#F59E0B" />
              <circle cx="-75" cy="31" r="14" fill="#FEF08A" />
              <line x1="-76" y1="31" x2="-390" y2="300" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
              <line x1="-76" y1="35" x2="-330" y2="335" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" />
            </g>
          )}
        </g>

        {/* MID SECTOR: Luminous Drifting Aleutian Williwaw Mist Ribbons */}
        <g opacity="0.85">
          <rect
            x={100 - (fogDrift * 0.8) % 200}
            y="1140"
            width="680"
            height="55"
            rx="25"
            fill="url(#mistRibbonGrad1)"
          />
          <rect
            x={480 - (fogDrift * 1.1) % 260}
            y="1185"
            width="550"
            height="48"
            rx="22"
            fill="url(#mistRibbonGrad1)"
          />
          <ellipse
            cx={360 + fogDrift * 0.6}
            cy="1165"
            rx="300"
            ry="40"
            fill="#CBD5E1"
            opacity="0.32"
          />
          <ellipse
            cx={750 - fogDrift * 0.5}
            cy="1205"
            rx="280"
            ry="36"
            fill="#E2E8F0"
            opacity="0.28"
          />
        </g>

        {/* LOWER SECTOR: Pinned U.S. Infantry Taking Cover Behind Volcanic Boulders */}
        <g transform="translate(110, 1290)">
          {/* Multi-Faceted Basalt Tundra Boulders */}
          <polygon
            points="0,165 45,72 180,58 285,102 325,165"
            fill="url(#boulderFaceGrad)"
            stroke="#475569"
            strokeWidth="3"
          />
          {/* Thick Snow Cap on Boulder Crest */}
          <polygon points="45,72 180,58 230,86 75,94" fill="#F8FAFC" opacity="0.95" />
          <line x1="45" y1="72" x2="180" y2="58" stroke="#38BDF8" strokeWidth="2.5" />

          {/* Pinned Riflemen with Vivid Cyan Rim Backlighting & Snow on Shoulders */}
          <g filter="drop-shadow(0 0 18px rgba(56, 189, 248, 0.75)) drop-shadow(0 0 3px rgba(255, 255, 255, 0.45))">
            <AnatomicalSoldierSilhouette
              x={95}
              y={115}
              scale={1.15}
              helmetType="US_M1"
              pose="CROUCHING_AIM"
              accentColor="#F8FAFC"
            />
          </g>

          <g
            transform="translate(215, 110) rotate(-25)"
            filter="drop-shadow(0 0 18px rgba(56, 189, 248, 0.75)) drop-shadow(0 0 3px rgba(255, 255, 255, 0.45))"
          >
            <AnatomicalSoldierSilhouette
              x={0}
              y={0}
              scale={1.15}
              helmetType="US_M1"
              pose="AIMING_RIFLE"
              accentColor="#F8FAFC"
            />
            {/* Returning Fire Tracers Aimed High toward the Ridge */}
            <line
              x1="70"
              y1="-42"
              x2="250"
              y2="-138"
              stroke="#F59E0B"
              strokeWidth="4"
              strokeDasharray="24 16"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 11. SCENE 11: ALEUTIAN_TUNDRA_FROSTBITE_TOLL
// Shivering soldiers in ice foxhole, freezing thermometer gauge & 2,100 exposure tally
// =========================================================================
export const AleutianTundraFrostbiteToll: React.FC = () => {
  const frame = useCurrentFrame();
  const shiver = Math.sin(frame * 0.45) * 2;
  const frostCount = Math.round(interpolate(frame, [0, 66], [0, 2100], { extrapolateRight: 'clamp' }));
  const tempDrop = interpolate(frame, [0, 66], [32, -10], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          <radialGradient id="trenchInteriorGlow" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#1E3A5F" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#13273D" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#0E1B2B" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#08101A" stopOpacity="0.8" />
          </radialGradient>
          <linearGradient id="trenchPeatStrata" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#253548" />
            <stop offset="30%" stopColor="#1C2938" />
            <stop offset="70%" stopColor="#141E2A" />
            <stop offset="100%" stopColor="#0D151F" />
          </linearGradient>
          <linearGradient id="freezingWaterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.75" />
            <stop offset="25%" stopColor="#0284C7" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#07273E" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="gaugeHousingGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E2E40" />
            <stop offset="50%" stopColor="#142130" />
            <stop offset="100%" stopColor="#0D1622" />
          </linearGradient>
        </defs>

        <PolarHorizonGlow cx={500} cy={1220} rx={500} ry={300} color="CYAN" intensity={0.95} />

        {/* LEFT: Technical Arctic Freezing Thermometer Gauge (Zero Illustration Text) */}
        <g transform="translate(115, 980)">
          {/* Beveled Instrument Backplate */}
          <rect
            x="0"
            y="0"
            width="78"
            height="430"
            rx="12"
            fill="url(#gaugeHousingGrad)"
            stroke="#38BDF8"
            strokeWidth="2.5"
            filter="drop-shadow(0 0 16px rgba(2, 132, 199, 0.45))"
          />
          {/* Hex Mounting Screws */}
          <circle cx="12" cy="14" r="3.5" fill="#64748B" stroke="#334155" strokeWidth="1" />
          <circle cx="66" cy="14" r="3.5" fill="#64748B" stroke="#334155" strokeWidth="1" />
          <circle cx="12" cy="416" r="3.5" fill="#64748B" stroke="#334155" strokeWidth="1" />
          <circle cx="66" cy="416" r="3.5" fill="#64748B" stroke="#334155" strokeWidth="1" />

          {/* Scale Graduation Ticks */}
          {[50, 90, 130, 170, 210, 250, 290, 330].map((ty, idx) => (
            <line
              key={ty}
              x1={idx % 2 === 0 ? 10 : 16}
              y1={ty}
              x2="24"
              y2={ty}
              stroke="#7DD3FC"
              strokeWidth={idx % 2 === 0 ? 3 : 1.8}
            />
          ))}

          {/* Glass Thermometer Tube Core */}
          <rect x="28" y="30" width="22" height="335" rx="8" fill="#06101B" stroke="#38BDF8" strokeWidth="2" />
          <circle cx="39" cy="375" r="25" fill="#0284C7" stroke="#38BDF8" strokeWidth="2.5" />
          <circle cx="39" cy="375" r="18" fill="#38BDF8" />
          {/* Liquid Mercury Column */}
          <rect
            x="32"
            y={interpolate(tempDrop, [-10, 32], [315, 110], { extrapolateRight: 'clamp' })}
            width="14"
            height={375 - interpolate(tempDrop, [-10, 32], [315, 110], { extrapolateRight: 'clamp' })}
            fill="#38BDF8"
            rx="4"
          />
          {/* Sub-Zero Warning Indicator Tick */}
          <line x1="28" y1="210" x2="50" y2="210" stroke="#EF4444" strokeWidth="2.5" />
        </g>

        {/* Flooded Tundra Foxhole Cutaway (Center-Right) */}
        <g transform={`translate(250, ${1165 + shiver})`}>
          {/* Frozen Peat & Permafrost Earthen Trench Bank */}
          <path
            d="M 0 110 L 65 30 L 520 30 L 590 110 L 590 295 L 0 295 Z"
            fill="url(#trenchPeatStrata)"
            stroke="#38BDF8"
            strokeWidth="3"
          />
          {/* Visible Permafrost Ice Vein Running Through Soil */}
          <path
            d="M 5 180 Q 40 160 65 190 T 520 185 Q 560 170 585 195"
            stroke="#7DD3FC"
            strokeWidth="3.5"
            strokeDasharray="16 8"
            fill="none"
            opacity="0.8"
          />

          {/* Heavy Snow Cornice & Hanging Icicles Over Trench Lip */}
          <polygon points="50,30 185,30 160,52 140,38 115,58 90,38" fill="#F8FAFC" />
          <polygon points="375,30 530,30 500,56 470,38 440,60 415,38" fill="#F8FAFC" />
          {/* Hanging Glacial Icicles */}
          <polygon points="110,58 115,82 120,58" fill="#BAE6FD" />
          <polygon points="160,52 164,74 168,52" fill="#BAE6FD" />
          <polygon points="440,60 445,86 450,60" fill="#BAE6FD" />
          <polygon points="500,56 504,78 508,56" fill="#BAE6FD" />

          {/* Shoring Timber Bracing Logs on Trench Walls */}
          <rect x="58" y="45" width="14" height="225" rx="3" fill="#2E231C" stroke="#45352A" strokeWidth="1.5" />
          <rect x="514" y="45" width="14" height="225" rx="3" fill="#2E231C" stroke="#45352A" strokeWidth="1.5" />

          {/* Interior Trench Recess (Cold Blue-Slate Luminescence) */}
          <rect
            x="65"
            y="45"
            width="460"
            height="225"
            rx="6"
            fill="url(#trenchInteriorGlow)"
            stroke="#38BDF8"
            strokeWidth="2"
            strokeOpacity="0.5"
          />

          {/* Anatomical Shivering Soldiers Huddled in Freezing Water (High-Contrast Silhouettes) */}
          <g filter="drop-shadow(0 0 16px rgba(56, 189, 248, 0.7)) drop-shadow(0 0 3px rgba(255, 255, 255, 0.4))">
            <AnatomicalSoldierSilhouette
              x={185}
              y={205}
              scale={1.35}
              helmetType="US_M1"
              pose="CROUCHING_AIM"
              accentColor="#38BDF8"
            />
          </g>

          <g filter="drop-shadow(0 0 16px rgba(56, 189, 248, 0.7)) drop-shadow(0 0 3px rgba(255, 255, 255, 0.4))">
            <AnatomicalSoldierSilhouette
              x={395}
              y={205}
              scale={1.35}
              flipX={true}
              helmetType="PARKA_HOOD"
              pose="CROUCHING_AIM"
              accentColor="#CBD5E1"
            />
          </g>

          {/* Frost & Snow Accumulation on Shoulders and Helmets */}
          <path d="M 175 142 Q 185 138 200 144" stroke="#F8FAFC" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 380 142 Q 395 138 405 144" stroke="#F8FAFC" strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Dynamic Cold Frozen Breath Vapor Puffs Expanding in Sub-Zero Air */}
          <circle cx="235" cy={118 + Math.sin(frame * 0.2) * 5} r="14" fill="#F8FAFC" opacity="0.5" />
          <circle cx="250" cy={106 + Math.sin(frame * 0.2) * 6} r="20" fill="#E2E8F0" opacity="0.35" />
          <circle cx="345" cy={122 + Math.sin(frame * 0.2 + 1) * 5} r="12" fill="#F8FAFC" opacity="0.45" />
          <circle cx="330" cy={110 + Math.sin(frame * 0.2 + 1) * 6} r="18" fill="#E2E8F0" opacity="0.32" />

          {/* Freezing Muddy Water Submerging Boots at Foxhole Floor with Floating Ice */}
          <rect x="65" y="215" width="460" height="55" fill="url(#freezingWaterGrad)" />
          <line x1="65" y1="215" x2="525" y2="215" stroke="#E0F2FE" strokeWidth="3" />
          {/* Floating Ice Shards in Foxhole Pool */}
          <polygon points="120,222 150,220 160,228 135,230" fill="#F8FAFC" opacity="0.85" />
          <polygon points="270,224 310,221 325,227 285,231" fill="#F8FAFC" opacity="0.85" />
          <polygon points="420,222 455,220 465,228 435,230" fill="#F8FAFC" opacity="0.85" />
        </g>

        {/* Rolling Integer Counter (Montserrat 900, Single-Source Metric) */}
        <g transform="translate(545, 980)">
          <rect
            x="-145"
            y="-44"
            width="290"
            height="84"
            rx="8"
            fill="#0F1724"
            stroke="#EF4444"
            strokeWidth="3"
            filter="drop-shadow(0 0 18px rgba(239, 68, 68, 0.55))"
          />
          <text
            x="0"
            y="16"
            fill="#EF4444"
            fontSize="48"
            fontFamily={montserrat.fontFamily}
            fontWeight="900"
            textAnchor="middle"
            letterSpacing="3"
          >
            {frostCount.toLocaleString()}
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 12. SCENE 12: ALEUTIAN_CASTNERS_CUTTHROATS_CLIMB
// Elite Alaska Scouts ascending near-vertical ice cliff against Aurora Borealis
// =========================================================================
export const AleutianCastnersCutthroatsClimb: React.FC = () => {
  const frame = useCurrentFrame();
  const auroraWaver = Math.sin(frame * 0.06) * 18;
  const leadPull = Math.sin(frame * 0.1) * 4;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="auroraSkyGlowGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.5" />
            <stop offset="45%" stopColor="#0284C7" stopOpacity="0.35" />
            <stop offset="80%" stopColor="#0F172A" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0A1118" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="basaltCliffFaceGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0E1620" />
            <stop offset="65%" stopColor="#182738" />
            <stop offset="100%" stopColor="#253950" />
          </linearGradient>
          <linearGradient id="glacierCascadeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F0FDFA" />
            <stop offset="35%" stopColor="#5EEAD4" />
            <stop offset="70%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>

        <PolarHorizonGlow cx={480} cy={1180} rx={500} ry={300} color="AURORA" intensity={1.0} />

        {/* Ethereal Aurora Borealis Ribbons Pulsating Across the Polar Night */}
        <g opacity="0.85" filter="drop-shadow(0 0 24px #2DD4BF)">
          <path
            d={`M 50 910 Q 320 ${870 + auroraWaver} 560 910 T 930 ${880 - auroraWaver}`}
            stroke="#2DD4BF"
            strokeWidth="32"
            fill="none"
            opacity="0.9"
          />
          <path
            d={`M 50 945 Q 340 ${910 - auroraWaver} 580 950 T 930 ${920 + auroraWaver}`}
            stroke="#38BDF8"
            strokeWidth="20"
            fill="none"
            opacity="0.8"
          />
          <path
            d={`M 50 975 Q 330 ${940 + auroraWaver * 0.7} 570 980 T 930 ${950 - auroraWaver * 0.7}`}
            stroke="#818CF8"
            strokeWidth="12"
            fill="none"
            opacity="0.6"
          />
        </g>

        {/* Ambient Aurora Glow Behind Cliff Rim */}
        <ellipse cx="460" cy="1180" rx="360" ry="240" fill="url(#auroraSkyGlowGrad)" />

        {/* Sheer Near-Vertical Jagged Basalt & Ice Cliff with Stratified Rock Facets */}
        <polygon
          points="50,1490 440,1490 535,1160 490,1025 280,1005 50,1005"
          fill="url(#basaltCliffFaceGrad)"
          stroke="#38BDF8"
          strokeWidth="2.5"
        />

        {/* Lit Rock Buttresses & Vertical Crags on Cliff Face */}
        <polygon points="120,1005 280,1005 260,1180 90,1220" fill="#142130" opacity="0.85" />
        <polygon points="260,1180 440,1170 410,1380 220,1390" fill="#1B2B3E" opacity="0.9" />
        <line x1="280" y1="1005" x2="260" y2="1180" stroke="#475569" strokeWidth="2" />
        <line x1="440" y1="1170" x2="410" y2="1380" stroke="#475569" strokeWidth="2" />

        {/* Deep Snow Cornices Clinging to Cliff Summit */}
        <polygon points="280,1005 490,1025 460,1055 260,1030" fill="#F8FAFC" />
        <line x1="280" y1="1005" x2="490" y2="1025" stroke="#E2E8F0" strokeWidth="3" />

        {/* Hanging Glacier & Frozen Waterfall Cascading Down Cliff Couloir */}
        <polygon
          points="490,1025 450,1180 484,1360 498,1356 468,1182 494,1025"
          fill="url(#glacierCascadeGrad)"
          opacity="0.9"
        />
        <path
          d="M 490 1025 L 450 1180 L 484 1360"
          stroke="#BAE6FD"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Knotted Fixed Mountain Climbing Rope Dropping Down Cliff Face */}
        <line
          x1="500"
          y1="1025"
          x2="430"
          y2="1485"
          stroke="#F8FAFC"
          strokeWidth="4"
          filter="drop-shadow(0 0 8px rgba(56, 189, 248, 0.7))"
        />
        {/* Climbing Knots Along Rope */}
        {[1070, 1120, 1170, 1220, 1270, 1320, 1370, 1420].map((ky) => (
          <circle
            key={ky}
            cx={interpolate(ky, [1025, 1485], [500, 430], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
            cy={ky}
            r="4.5"
            fill="#F8FAFC"
            stroke="#0284C7"
            strokeWidth="1.5"
          />
        ))}

        {/* Scout 2 (Mid-Climb on Rope with Trapper Nelson Packboard - High-Contrast Silhouette) */}
        <g
          transform="translate(435, 1260) rotate(-16)"
          filter="drop-shadow(0 0 16px rgba(45, 212, 191, 0.75)) drop-shadow(0 0 3px rgba(255, 255, 255, 0.45))"
        >
          <AnatomicalSoldierSilhouette
            x={0}
            y={0}
            scale={1.2}
            flipX={true}
            helmetType="PARKA_HOOD"
            pose="WADING"
            accentColor="#CBD5E1"
          />
          {/* Wooden Trapper Nelson Packboard with Strapped Arctic Gear */}
          <rect x="-18" y="-48" width="12" height="38" rx="2" fill="#78350F" stroke="#F59E0B" strokeWidth="1.5" />
          <line x1="-16" y1="-38" x2="-6" y2="-38" stroke="#F59E0B" strokeWidth="1.5" />
          <line x1="-16" y1="-24" x2="-6" y2="-24" stroke="#F59E0B" strokeWidth="1.5" />
          {/* Hands Grasping Rope */}
          <circle cx="14" cy="-30" r="5" fill="#E2E8F0" />
          <circle cx="20" cy="-42" r="5" fill="#E2E8F0" />
        </g>

        {/* Lead Alaska Scout Cresting the Ice Ridge Against Aurora */}
        <g
          transform={`translate(495, ${1020 + leadPull})`}
          filter="drop-shadow(0 0 18px rgba(45, 212, 191, 0.8)) drop-shadow(0 0 4px rgba(255, 255, 255, 0.45))"
        >
          <AnatomicalSoldierSilhouette
            x={0}
            y={0}
            scale={1.28}
            helmetType="PARKA_HOOD"
            pose="STANDING_RIFLE"
            accentColor="#F8FAFC"
          />
          {/* Raised Ice Axe Glinting Stark White in Northern Lights */}
          <line x1="22" y1="-55" x2="65" y2="-78" stroke="#F8FAFC" strokeWidth="5" strokeLinecap="round" />
          <polygon points="62,-84 72,-75 64,-72" fill="#F8FAFC" />
          <circle cx="65" cy="-78" r="5" fill="#2DD4BF" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 13. SCENE 13: ALEUTIAN_ENGINEER_HILL_BANZAI
// May 29, 1943: Close-quarters clash at Engineer Hill, katanas, bayonets & grenade bursts
// =========================================================================
export const AleutianEngineerHillBanzai: React.FC = () => {
  const frame = useCurrentFrame();
  const blastFlash = frame % 24 < 8;
  const meleeJolt = Math.sin(frame * 0.3) * 4;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <PolarHorizonGlow cx={500} cy={1220} rx={480} ry={280} color="FLARE_RED" intensity={0.95} />

        {/* Engineer Hill Snow Crest & Piled Sandbags */}
        <polygon points="50,1485 360,1255 750,1235 915,1485" fill="#080C12" stroke="#1E293B" strokeWidth="3" />
        <polygon points="360,1255 750,1235 775,1275 340,1295" fill="#E2E8F0" />

        {/* Torn Command Tent Silhouettes in Background */}
        <g transform="translate(700, 1155)" opacity="0.65">
          <polygon points="10,85 85,10 160,85" fill="#1C1917" stroke="#334155" strokeWidth="2" />
          <polygon points="65,45 85,85 105,45" fill="#070A0E" />
        </g>

        {/* Center Grenade Detonation Fireball */}
        {blastFlash && (
          <g transform="translate(465, 1185)">
            <circle cx="0" cy="0" r="65" fill="#EF4444" opacity="0.85" />
            <circle cx="0" cy="0" r="40" fill="#F59E0B" opacity="0.9" />
            <circle cx="0" cy="0" r="18" fill="#FEF08A" />
          </g>
        )}

        {/* LEFT: Charging Japanese Officer & Bayonet Infantry */}
        <g transform={`translate(285, ${1215 + meleeJolt})`} filter="drop-shadow(0 0 14px rgba(239, 68, 68, 0.45))">
          {/* Col. Yamasaki with Raised Katana Gunto */}
          <AnatomicalSoldierSilhouette
            x={65}
            y={0}
            scale={1.25}
            helmetType="JP_TYPE90"
            pose="SALUTING"
            accentColor="#EF4444"
          />
          {/* gleaming Katana blade */}
          <path d="M 92 -75 Q 125 -115 155 -135" stroke="#F8FAFC" strokeWidth="4.5" fill="none" strokeLinecap="round" />

          {/* Charging Bayonet Rifleman */}
          <AnatomicalSoldierSilhouette
            x={-55}
            y={25}
            scale={1.2}
            helmetType="JP_TYPE90"
            pose="AIMING_RIFLE"
          />
          {/* Long Arisaka Bayonet Blade */}
          <line x1="25" y1="-24" x2="72" y2="-28" stroke="#F8FAFC" strokeWidth="3.5" strokeLinecap="round" />
        </g>

        {/* RIGHT: U.S. Combat Engineers Defending Behind Sandbag Revetment */}
        <g transform="translate(590, 1210)">
          <path d="M -45 35 L -25 5 L 145 5 L 165 35 Z" fill="#18181B" stroke="#334155" strokeWidth="2.5" />
          <AnatomicalSoldierSilhouette
            x={35}
            y={-5}
            scale={1.25}
            flipX={true}
            helmetType="US_M1"
            pose="AIMING_RIFLE"
            accentColor="#F8FAFC"
          />
          <circle cx="-55" cy="-55" r="11" fill="#FEF08A" />
          <AnatomicalSoldierSilhouette
            x={125}
            y={10}
            scale={1.2}
            flipX={true}
            helmetType="US_M1"
            pose="CROUCHING_AIM"
          />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 14. SCENE 14: ALEUTIAN_ATTU_SURVIVOR_TALLY
// Somber Chichagof Valley battlefield: Fallen Garrison (2,351) vs Survivors (28)
// =========================================================================
export const AleutianAttuSurvivorTally: React.FC = () => {
  const frame = useCurrentFrame();
  const fallenCount = Math.round(interpolate(frame, [0, 66], [0, 2351], { extrapolateRight: 'clamp' }));
  const survivorCount = Math.round(interpolate(frame, [0, 66], [0, 28], { extrapolateRight: 'clamp' }));

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <PolarHorizonGlow cx={480} cy={1240} rx={480} ry={280} color="CYAN" intensity={0.75} />

        {/* Somber Snow-Covered Chichagof Valley & Mountain Backdrop */}
        <polygon points="50,1485 260,1260 540,1330 820,1240 915,1485" fill="#091019" stroke="#1E293B" strokeWidth="2" />
        <polygon points="50,1485 340,1375 620,1385 915,1355 915,1495 50,1495" fill="#090E16" />
        <rect x="50" y="1420" width="865" height="75" fill="#06090E" />

        {/* Upright Bayoneted Rifles Planted in Snowdrifts with Helmets (Battlefield Graves) */}
        {[130, 235, 340, 445, 555, 665, 780].map((rx, idx) => (
          <g key={idx} transform={`translate(${rx}, ${1325 + (idx % 3) * 14})`}>
            <ellipse cx="18" cy="78" rx="38" ry="12" fill="#E2E8F0" opacity="0.88" />
            {/* Rifle barrel & stock */}
            <line x1="18" y1="8" x2="18" y2="80" stroke="#64748B" strokeWidth="4.5" />
            <rect x="14" y="8" width="8" height="22" rx="2" fill="#1E293B" />
            {/* Steel Helmet resting atop rifle buttstock */}
            <path d="M 0 10 C 0 -8 36 -8 36 10 L 40 14 L -4 14 Z" fill="#070A0E" stroke="#334155" strokeWidth="1.8" />
            <circle cx="22" cy="28" r="3" fill="#F8FAFC" />
          </g>
        ))}

        {/* COMPARATIVE TALLY PRESENTATION (Montserrat 900, Single-Source Metric): 2,351 vs 28 */}
        <g transform="translate(150, 975)">
          <rect
            x="0"
            y="0"
            width="290"
            height="110"
            rx="8"
            fill="#120A0C"
            stroke="#DC2626"
            strokeWidth="3"
            filter="drop-shadow(0 0 18px rgba(220, 38, 38, 0.45))"
          />
          <text
            x="145"
            y="74"
            fill="#DC2626"
            fontSize="54"
            fontFamily={montserrat.fontFamily}
            fontWeight="900"
            textAnchor="middle"
            letterSpacing="2"
          >
            {fallenCount.toLocaleString()}
          </text>
        </g>

        <g transform="translate(520, 975)">
          <rect
            x="0"
            y="0"
            width="290"
            height="110"
            rx="8"
            fill="#081018"
            stroke="#38BDF8"
            strokeWidth="3"
            filter="drop-shadow(0 0 18px rgba(56, 189, 248, 0.4))"
          />
          <text
            x="145"
            y="74"
            fill="#38BDF8"
            fontSize="54"
            fontFamily={montserrat.fontFamily}
            fontWeight="900"
            textAnchor="middle"
            letterSpacing="2"
          >
            {survivorCount.toLocaleString()}
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 15. SCENE 15: ALEUTIAN_KISKA_FORTRESS_MAP
// Tactical radar & contour map of Kiska Fortress with defensive rings & naval sweep
// =========================================================================
export const AleutianKiskaFortressMap: React.FC = () => {
  const frame = useCurrentFrame();
  const sweepAngle = (frame * 2.0) % 360;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <PolarHorizonGlow cx={480} cy={1180} rx={480} ry={280} color="CYAN" intensity={0.75} />

        {/* Map Framing Box */}
        <rect x="60" y="880" width="850" height="590" rx="8" fill="#060C14" stroke="#0284C7" strokeWidth="2.5" />

        {/* Radar Circular Range Rings */}
        <g transform="translate(480, 1170)" stroke="#0E2A42" strokeWidth="1.8" fill="none">
          <circle r="90" />
          <circle r="170" />
          <circle r="250" />
          <line x1="-260" y1="0" x2="260" y2="0" strokeDasharray="4 4" />
          <line x1="0" y1="-260" x2="0" y2="260" strokeDasharray="4 4" />

          {/* Rotating Allied Naval Blockade Sweep Beam */}
          <line
            x1="0"
            y1="0"
            x2={Math.cos((sweepAngle * Math.PI) / 180) * 250}
            y2={Math.sin((sweepAngle * Math.PI) / 180) * 250}
            stroke="#38BDF8"
            strokeWidth="3.5"
            opacity="0.85"
          />
        </g>

        {/* Stylized Kiska Island Vector Contour */}
        <g fill="#0B1622" stroke="#38BDF8" strokeWidth="2.5">
          <path d="M 440 980 Q 490 950 540 990 Q 570 1060 520 1140 Q 480 1180 530 1260 Q 550 1340 480 1380 Q 430 1350 440 1280 Q 470 1200 420 1120 Q 390 1040 440 980 Z" />
        </g>

        {/* Mount Kiska Volcano Cone with Elevation Rings */}
        <g transform="translate(490, 1020)" fill="none" stroke="#7DD3FC" strokeWidth="1.5" opacity="0.65">
          <ellipse rx="35" ry="24" />
          <ellipse rx="20" ry="14" />
          <circle r="4.5" fill="#EF4444" />
        </g>

        {/* Fortified Japanese Coastal Defense Arcs */}
        <g transform="translate(520, 1140)" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="6 4">
          <path d="M 0 0 L 60 -20 A 70 70 0 0 1 50 40 Z" fill="#EF4444" fillOpacity="0.25" />
        </g>
        <g transform="translate(480, 1340)" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="6 4">
          <path d="M 0 0 L 50 -10 A 60 60 0 0 1 30 50 Z" fill="#EF4444" fillOpacity="0.25" />
        </g>

        {/* 1-Word Map Waypoint Label Container */}
        <g transform="translate(415, 915)">
          <rect x="0" y="0" width="140" height="30" rx="4" fill="#0A131F" stroke="#38BDF8" strokeWidth="2" />
          <text x="70" y="20" fill="#7DD3FC" fontSize="13" fontFamily={montserrat.fontFamily} fontWeight="900" textAnchor="middle" letterSpacing="1">KISKA</text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 16. SCENE 16: ALEUTIAN_KIMURA_FOG_ESCAPE
// July 28, 1943: Adm. Kimura's 8 cruiser/destroyer column gliding through fog with 55-min stopwatch
// =========================================================================
export const AleutianKimuraFogEscape: React.FC = () => {
  const frame = useCurrentFrame();
  const fogScroll = (frame * 2.5) % 400;
  const stopwatchAngle = interpolate(frame, [0, 75], [0, 330], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <PolarHorizonGlow cx={480} cy={1220} rx={500} ry={290} color="CYAN" intensity={0.9} />

        {/* Distant Kiska Volcanic Shadow Evacuated in Rear */}
        <polygon points="60,1260 210,1080 390,1260" fill="#070C12" opacity="0.7" />

        {/* Bering Sea Surface */}
        <rect x="50" y="1250" width="865" height="240" fill="#060B12" opacity="0.9" />

        {/* Column of Sleek Japanese Cruisers & Destroyers Gliding Silently Out of Kiska Harbor */}
        {[
          { x: 520, y: 1200, s: 0.9 },
          { x: 340, y: 1265, s: 1.15 },
          { x: 140, y: 1340, s: 1.38 },
        ].map((ship, idx) => (
          <g
            key={idx}
            transform={`translate(${ship.x}, ${ship.y}) scale(${ship.s})`}
            filter="drop-shadow(0 0 12px rgba(56, 189, 248, 0.35))"
          >
            {/* Destroyer Hull Silhouette (Abukuma / Shimakaze) */}
            <path
              d="M 0 38 L 38 22 L 220 22 L 255 38 L 235 48 L 15 48 Z"
              fill="#070A0E"
              stroke="#38BDF8"
              strokeWidth="1.5"
            />
            <rect x="65" y="4" width="28" height="20" fill="#070A0E" stroke="#334155" strokeWidth="1" />
            <line x1="79" y1="4" x2="79" y2="-18" stroke="#64748B" strokeWidth="3" />
            {/* Raked Funnels */}
            <polygon points="112,22 118,4 130,4 126,22" fill="#070A0E" stroke="#334155" strokeWidth="1" />
            <polygon points="150,22 156,6 166,6 162,22" fill="#070A0E" stroke="#334155" strokeWidth="1" />
            {/* Gun Turrets */}
            <rect x="32" y="14" width="20" height="8" rx="1" fill="#0F172A" />
            <rect x="185" y="14" width="20" height="8" rx="1" fill="#0F172A" />
            {/* Glowing Cyan Bow Wave & Wake Trail */}
            <path d="M -45 44 L 255 44 Q 275 40 290 46" stroke="#7DD3FC" strokeWidth="2.5" fill="none" opacity="0.8" />
          </g>
        ))}

        {/* Multi-Plane Drifting Fog Bands Veiling the Squadron */}
        <g opacity="0.58">
          <ellipse cx={260 + fogScroll * 0.5} cy="1235" rx="280" ry="38" fill="#334155" />
          <ellipse cx={680 - fogScroll * 0.5} cy="1310" rx="340" ry="44" fill="#1E293B" />
        </g>

        {/* Animated 55-Minute Evacuation Stopwatch HUD */}
        <g transform="translate(745, 1060)">
          <circle
            cx="0"
            cy="0"
            r="68"
            fill="#090E16"
            stroke="#38BDF8"
            strokeWidth="3.5"
            filter="drop-shadow(0 0 18px rgba(56, 189, 248, 0.5))"
          />
          {/* 12 Dial Ticks */}
          {[...Array(12)].map((_, tIdx) => {
            const a = (tIdx * 30 * Math.PI) / 180;
            return (
              <line
                key={tIdx}
                x1={Math.cos(a) * 52}
                y1={Math.sin(a) * 52}
                x2={Math.cos(a) * 60}
                y2={Math.sin(a) * 60}
                stroke="#7DD3FC"
                strokeWidth="2.5"
              />
            );
          })}
          {/* Swept 55-Minute Sector Arc */}
          <path
            d="M 0 -48 A 48 48 0 1 1 -24 -41 L 0 0 Z"
            fill="#EF4444"
            opacity="0.35"
          />
          <circle cx="0" cy="0" r="6" fill="#38BDF8" />
          <line
            x1="0"
            y1="0"
            x2={Math.cos(((stopwatchAngle - 90) * Math.PI) / 180) * 50}
            y2={Math.sin(((stopwatchAngle - 90) * Math.PI) / 180) * 50}
            stroke="#FEF08A"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 17. SCENE 17: ALEUTIAN_EMPTY_ISLAND_BOMBARDMENT
// Massive Allied naval shells exploding on deserted Kiska volcanic slopes & empty bunkers
// =========================================================================
export const AleutianEmptyIslandBombardment: React.FC = () => {
  const frame = useCurrentFrame();
  const rockPlume = (frame * 4) % 180;
  const pulse = 1 + Math.sin(frame * 0.25) * 0.14;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <PolarHorizonGlow cx={480} cy={1220} rx={500} ry={290} color="COMBAT_AMBER" intensity={0.95} />

        {/* Multi-Ridge Kiska Volcanic Massif */}
        <polygon points="50,1485 260,1120 490,1190 710,1110 915,1485" fill="#090F16" stroke="#1E293B" strokeWidth="3" />
        <polygon points="225,1180 260,1120 305,1175 260,1160" fill="#E2E8F0" opacity="0.8" />
        <polygon points="670,1175 710,1110 755,1180 710,1160" fill="#E2E8F0" opacity="0.8" />

        {/* Incoming Naval Shell Streaks Arching Down from Above */}
        <g strokeLinecap="round">
          <line x1="180" y1="885" x2="330" y2="1175" stroke="#FEF08A" strokeWidth="4.5" strokeDasharray="36 16" />
          <line x1="480" y1="875" x2="540" y2="1195" stroke="#F59E0B" strokeWidth="4.5" strokeDasharray="36 16" />
          <line x1="780" y1="890" x2="670" y2="1165" stroke="#FEF08A" strokeWidth="4" strokeDasharray="36 16" />
        </g>

        {/* Continuous Fiery Detonations on Empty Volcanic Slopes */}
        <g transform={`translate(330, 1175) scale(${pulse})`}>
          <circle cx="0" cy="0" r="65" fill="#DC2626" opacity="0.85" />
          <circle cx="0" cy="0" r="40" fill="#F59E0B" opacity="0.9" />
          <circle cx="0" cy="0" r="18" fill="#FEF08A" />
        </g>
        <g transform={`translate(670, 1165) scale(${2 - pulse})`}>
          <circle cx="0" cy="0" r="55" fill="#DC2626" opacity="0.8" />
          <circle cx="0" cy="0" r="32" fill="#F59E0B" opacity="0.9" />
          <circle cx="0" cy="0" r="14" fill="#FEF08A" />
        </g>

        {/* Flying Pulverized Basalt Debris */}
        {[
          { x: 310, y: 1135 },
          { x: 360, y: 1115 },
          { x: 640, y: 1125 },
          { x: 700, y: 1110 },
        ].map((rk, idx) => (
          <polygon
            key={idx}
            points={`${rk.x},${rk.y - (rockPlume % 90)} ${rk.x + 10},${rk.y - 6 - (rockPlume % 90)} ${rk.x + 5},${rk.y + 8 - (rockPlume % 90)}`}
            fill="#18181B"
            stroke="#F59E0B"
            strokeWidth="1"
          />
        ))}

        {/* Deserted Underground Concrete Bunker Cutaway (Completely Empty Inside) */}
        <g transform="translate(310, 1255)">
          <rect x="0" y="0" width="340" height="175" rx="6" fill="#04070B" stroke="#475569" strokeWidth="3.5" />
          {/* Heavy Reinforced Timber Ceiling Beams */}
          <rect x="14" y="12" width="312" height="16" fill="#1C1917" stroke="#334155" strokeWidth="1.5" />
          <rect x="24" y="28" width="16" height="135" fill="#1C1917" />
          <rect x="300" y="28" width="16" height="135" fill="#1C1917" />
          {/* Empty Gun Embrasure Slit */}
          <rect x="110" y="55" width="120" height="28" rx="3" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
          {/* Unoccupied Ammunition Crate & Empty Table */}
          <rect x="65" y="125" width="55" height="35" fill="#18181B" stroke="#334155" strokeWidth="1.5" />
          <line x1="190" y1="125" x2="265" y2="125" stroke="#475569" strokeWidth="5" />
          <line x1="200" y1="125" x2="200" y2="160" stroke="#475569" strokeWidth="4" />
          <line x1="255" y1="125" x2="255" y2="160" stroke="#475569" strokeWidth="4" />
          {/* Dust Falling from Shaking Ceiling */}
          {[70, 120, 170, 220, 270].map((dx, idx) => (
            <circle key={idx} cx={dx} cy={35 + ((frame * 2.5 + idx * 14) % 110)} r="3" fill="#94A3B8" opacity="0.65" />
          ))}
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 18. SCENE 18: ALEUTIAN_OPERATION_COTTAGE_EMPTY_BEACH
// Aug 15, 1943: Allied soldier before abandoned coastal gun with friendly stray dog on empty beach
// =========================================================================
export const AleutianOperationCottageEmptyBeach: React.FC = () => {
  const frame = useCurrentFrame();
  const dogTailWag = Math.sin(frame * 0.4) * 14;
  const seaLap = Math.sin(frame * 0.09) * 6;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="kiskaHeadlandGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E2E42" />
            <stop offset="45%" stopColor="#152435" />
            <stop offset="100%" stopColor="#0E1722" />
          </linearGradient>
          <linearGradient id="kiskaWetBeachGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#172738" />
            <stop offset="30%" stopColor="#1C3550" />
            <stop offset="65%" stopColor="#132335" />
            <stop offset="100%" stopColor="#0D1620" />
          </linearGradient>
          <linearGradient id="kiskaBunkerConcreteGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="55%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <radialGradient id="wetSandSheen" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#0284C7" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0E1824" stopOpacity="0" />
          </radialGradient>
        </defs>

        <PolarHorizonGlow cx={480} cy={1220} rx={520} ry={300} color="CYAN" intensity={1.0} />

        {/* Distant Volcanic Peaks of Kiska Island */}
        <polygon
          points="50,1320 220,1130 520,1210 780,1110 920,1320"
          fill="#132030"
          stroke="#334155"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <polygon points="220,1130 270,1168 180,1165" fill="#CBD5E1" opacity="0.8" />
        <polygon points="780,1110 820,1145 740,1142" fill="#E2E8F0" opacity="0.85" />

        {/* Midground Coastal Headlands with Snow Couloirs */}
        <polygon
          points="50,1380 280,1180 560,1260 840,1160 920,1380"
          fill="url(#kiskaHeadlandGrad)"
          stroke="#38BDF8"
          strokeWidth="2.2"
        />
        <polygon points="280,1180 340,1205 310,1215 250,1195" fill="#F8FAFC" opacity="0.9" />
        <polygon points="840,1160 890,1185 860,1195 810,1175" fill="#F8FAFC" opacity="0.9" />

        {/* Volcanic Black-Sand Beach with Specular Surf Reflection */}
        <polygon
          points="50,1360 920,1360 920,1490 50,1490"
          fill="url(#kiskaWetBeachGrad)"
          stroke="#38BDF8"
          strokeWidth="1.8"
        />
        <ellipse cx="480" cy="1380" rx="420" ry="24" fill="url(#wetSandSheen)" />

        {/* Foaming Cold Arctic Ocean Waves Lapping Empty Kiska Shoreline */}
        <path
          d={`M 50 ${1362 + seaLap} Q 320 ${1385 - seaLap} 540 ${1358 + seaLap} T 920 ${1366}`}
          stroke="#E0F2FE"
          strokeWidth="3.5"
          fill="none"
          opacity="0.95"
          strokeLinecap="round"
        />
        <path
          d={`M 50 ${1372 - seaLap * 0.7} Q 310 ${1395 + seaLap * 0.7} 530 ${1368 - seaLap * 0.7} T 920 ${1376}`}
          stroke="#7DD3FC"
          strokeWidth="2"
          fill="none"
          opacity="0.75"
        />

        {/* Abandoned Snow-Drifted Japanese Coastal Gun Emplacement */}
        <g transform="translate(540, 1250)">
          {/* Concrete Casemate / Earth-Reinforced Bunker */}
          <polygon
            points="-25,95 8,32 210,32 242,95"
            fill="url(#kiskaBunkerConcreteGrad)"
            stroke="#475569"
            strokeWidth="2.5"
          />
          {/* Snow Drift on Casemate Roof */}
          <polygon points="8,32 210,32 190,18 25,18" fill="#F8FAFC" />
          <line x1="8" y1="32" x2="210" y2="32" stroke="#CBD5E1" strokeWidth="2" />

          {/* Heavy Coastal Defense Cannon Barrel Aimed Up at Empty Sky */}
          <polygon points="45,26 195,-40 204,-26 54,38" fill="#334155" stroke="#64748B" strokeWidth="2" />
          <line x1="48" y1="28" x2="198" y2="-36" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="200" cy="-33" r="6" fill="#0A0F16" stroke="#F59E0B" strokeWidth="1.5" />

          {/* Armored Gun Shield & Recoil Breech Housing */}
          <rect x="30" y="14" width="40" height="28" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="2" />
          <circle cx="50" cy="28" r="11" fill="#243345" stroke="#38BDF8" strokeWidth="1.5" />

          {/* Reinforced Cave / Tunnel Portal Shored with Timber */}
          <path
            d="M 255 95 C 255 36 330 36 330 95 Z"
            fill="#081018"
            stroke="#38BDF8"
            strokeWidth="2"
          />
          {/* Wooden Shoring Lintel */}
          <rect x="250" y="38" width="85" height="10" rx="2" fill="#3D2E24" stroke="#5C4537" strokeWidth="1.5" />
          <line x1="262" y1="48" x2="262" y2="95" stroke="#3D2E24" strokeWidth="5" />
          <line x1="323" y1="48" x2="323" y2="95" stroke="#3D2E24" strokeWidth="5" />
        </g>

        {/* Anatomical Allied Soldier Silhouette (Disbelief: Lowered Garand Rifle) */}
        <g filter="drop-shadow(0 0 16px rgba(56, 189, 248, 0.7)) drop-shadow(0 0 3px rgba(255, 255, 255, 0.45))">
          <AnatomicalSoldierSilhouette
            x={280}
            y={1305}
            scale={1.38}
            helmetType="US_M1"
            pose="LOWERED_RIFLE"
            accentColor="#F8FAFC"
          />
        </g>

        {/* Wet Sand Footprints Trailing Behind Soldier from Surf */}
        {[200, 225, 250].map((fx, idx) => (
          <ellipse
            key={fx}
            cx={fx}
            cy={1368 + idx * 2}
            rx={9}
            ry={4}
            fill="#09111A"
            stroke="#38BDF8"
            strokeWidth="1"
            opacity={0.65}
          />
        ))}

        {/* Friendly Stray Dog Left Behind on Kiska Beach (High-Contrast Silhouette + Accent Collar) */}
        <g
          transform="translate(420, 1315)"
          filter="drop-shadow(0 0 16px rgba(56, 189, 248, 0.75)) drop-shadow(0 0 3px rgba(255, 255, 255, 0.45))"
        >
          {/* Hindquarters & Seated Torso in Solid Dark Silhouette with Crisp Highlight */}
          <path
            d="M 0 38 C -4 16 18 8 36 12 L 42 42 L 4 42 Z"
            fill="#080C12"
            stroke="#38BDF8"
            strokeWidth="1.5"
          />

          {/* Front Legs Firmly Planted on Beach */}
          <line x1="34" y1="26" x2="38" y2="44" stroke="#080C12" strokeWidth="5.5" strokeLinecap="round" />
          <line x1="34" y1="26" x2="38" y2="44" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
          <line x1="26" y1="28" x2="28" y2="44" stroke="#080C12" strokeWidth="5.5" strokeLinecap="round" />
          <line x1="26" y1="28" x2="28" y2="44" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />

          {/* Stray Dog Head, Alert Pointed Ears & Snout */}
          <circle cx="40" cy="8" r="12" fill="#080C12" stroke="#38BDF8" strokeWidth="1.2" />
          <polygon points="46,4 58,8 48,14" fill="#080C12" />
          <polygon points="36,-2 40,-14 45,0" fill="#080C12" />
          <polygon points="30,0 33,-12 37,0" fill="#080C12" />
          {/* Inner Ear Highlights */}
          <polygon points="38,-1 40,-10 43,0" fill="#EF4444" opacity="0.75" />

          {/* Colored Accent Collar / Mascot Band (Signal Red) */}
          <rect x="33" y="14" width="14" height="4.5" rx="1.5" fill="#EF4444" stroke="#F8FAFC" strokeWidth="1" />

          {/* Animated Wagging Tail in Active Micro-Motion */}
          <path
            d={`M 2 32 Q -16 ${18 + dogTailWag} -22 ${6 + dogTailWag}`}
            stroke="#080C12"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M 2 32 Q -16 ${18 + dogTailWag} -22 ${6 + dogTailWag}`}
            stroke="#7DD3FC"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx={-22} cy={6 + dogTailWag} r="3.5" fill="#F8FAFC" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 19. SCENE 19: ALEUTIAN_FRIENDLY_FIRE_FOG_PHANTOMS
// Allied troops firing in dense fog at phantom shadows & USS Abner Read sea-mine blast
// =========================================================================
export const AleutianFriendlyFireFogPhantoms: React.FC = () => {
  const frame = useCurrentFrame();
  const panicMuzzle1 = frame % 16 < 6;
  const panicMuzzle2 = (frame + 8) % 16 < 6;
  const minePulse = 1 + Math.sin(frame * 0.25) * 0.15;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <PolarHorizonGlow cx={480} cy={1220} rx={480} ry={280} color="FLARE_RED" intensity={0.88} />

        {/* Background Harbor: Destroyer USS Abner Read (DD-526) Striking Japanese Sea-Mine */}
        <g transform="translate(380, 1110)">
          <path
            d="M 0 42 L 32 24 L 225 24 L 260 42 Z"
            fill="#070A0E"
            stroke="#334155"
            strokeWidth="1.5"
          />
          <rect x="65" y="6" width="26" height="18" fill="#070A0E" />
          <line x1="78" y1="6" x2="78" y2="-16" stroke="#475569" strokeWidth="3" />
          <polygon points="115,24 120,8 130,8 126,24" fill="#070A0E" />

          {/* Glowing Crimson Stern Sea-Mine Detonation */}
          <g transform={`translate(220, 26) scale(${minePulse})`}>
            <circle cx="0" cy="0" r="38" fill="#DC2626" opacity="0.85" />
            <circle cx="0" cy="0" r="22" fill="#F59E0B" opacity="0.9" />
            <circle cx="0" cy="0" r="10" fill="#FEF08A" />
            <polygon points="-12,0 0,-65 12,0" fill="#F8FAFC" opacity="0.8" />
          </g>
        </g>

        {/* Left & Right Rocky Crags */}
        <polygon points="50,1485 50,1280 280,1320 360,1485" fill="#080D14" stroke="#1E293B" strokeWidth="2.5" />
        <polygon points="620,1485 700,1320 915,1280 915,1485" fill="#080D14" stroke="#1E293B" strokeWidth="2.5" />

        {/* Dense Swirling Fog Partition Between Friendly Forces */}
        <g opacity="0.72">
          <ellipse cx="485" cy="1265" rx="230" ry="65" fill="#334155" />
          <ellipse cx="485" cy="1335" rx="310" ry="58" fill="#1E293B" />
        </g>

        {/* LEFT SECTOR: Pinned Allied Squad Firing into Fog */}
        <g transform="translate(185, 1310)">
          <AnatomicalSoldierSilhouette
            x={0}
            y={0}
            scale={1.3}
            helmetType="US_M1"
            pose="CROUCHING_AIM"
            accentColor="#F8FAFC"
          />
          {panicMuzzle1 && (
            <g>
              <circle cx="95" cy="-54" r="12" fill="#FEF08A" />
              <line x1="100" y1="-54" x2="290" y2="-48" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
            </g>
          )}
        </g>

        {/* RIGHT SECTOR: Opposing Allied Squad Firing Back in Confusion */}
        <g transform="translate(780, 1310)">
          <AnatomicalSoldierSilhouette
            x={0}
            y={0}
            scale={1.3}
            flipX={true}
            helmetType="US_M1"
            pose="CROUCHING_AIM"
            accentColor="#F8FAFC"
          />
          {panicMuzzle2 && (
            <g>
              <circle cx="-95" cy="-54" r="12" fill="#FEF08A" />
              <line x1="-100" y1="-54" x2="-290" y2="-48" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 20. SCENE 20: ALEUTIAN_KISKA_GHOST_TOLL_COUNTER
// Stretcher-bearers in mist past rusted Japanese helmet & tripwire; 313 casualty counter
// =========================================================================
export const AleutianKiskaGhostTollCounter: React.FC = () => {
  const frame = useCurrentFrame();
  const ghostCount = Math.round(interpolate(frame, [0, 66], [0, 313], { extrapolateRight: 'clamp' }));
  const mistRoll = (frame * 1.6) % 360;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <PolarHorizonGlow cx={480} cy={1220} rx={480} ry={280} color="CYAN" intensity={0.78} />

        {/* Kiska Bog & Rocky Ground */}
        <polygon points="50,1485 280,1360 660,1370 915,1340 915,1495 50,1495" fill="#080D14" stroke="#1E293B" strokeWidth="2" />

        {/* Foreground Left: Rusted Japanese Helmet on Stake with Booby-Trap Tripwire */}
        <g transform="translate(145, 1300)">
          <line x1="30" y1="8" x2="30" y2="115" stroke="#475569" strokeWidth="5.5" />
          <path d="M 10 12 C 10 -6 50 -6 50 12 L 54 16 L 6 16 Z" fill="#1C1917" stroke="#EF4444" strokeWidth="2" />
          <line x1="30" y1="65" x2="225" y2="85" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="6 4" />
          <circle cx="225" cy="85" r="5" fill="#EF4444" />
        </g>

        {/* Anatomical Allied Stretcher-Bearers Carrying Wounded Comrade Through Mist */}
        <g transform="translate(430, 1320)">
          {/* Rear Bearer */}
          <AnatomicalSoldierSilhouette
            x={0}
            y={0}
            scale={1.25}
            helmetType="US_M1"
            pose="STANDING_RIFLE"
            accentColor="#EF4444"
          />
          {/* Stretcher Handles & Wounded Soldier Silhouette on Litter */}
          <line x1="12" y1="-15" x2="235" y2="-15" stroke="#64748B" strokeWidth="6" strokeLinecap="round" />
          <path d="M 55 -15 C 65 -36 165 -36 185 -15 Z" fill="#0B1118" stroke="#334155" strokeWidth="2" />
          <circle cx="72" cy="-26" r="10" fill="#070A0E" />

          {/* Front Bearer */}
          <AnatomicalSoldierSilhouette
            x={225}
            y={0}
            scale={1.25}
            helmetType="US_M1"
            pose="STANDING_RIFLE"
            accentColor="#EF4444"
          />
        </g>

        {/* Drifting Arctic Mist Layers */}
        <g opacity="0.55">
          <ellipse cx={280 + mistRoll * 0.4} cy="1385" rx="280" ry="36" fill="#334155" />
          <ellipse cx={740 - mistRoll * 0.4} cy="1405" rx="320" ry="42" fill="#1E293B" />
        </g>

        {/* Rolling Casualty Counter (Montserrat 900, Single-Source Metric) */}
        <g transform="translate(480, 975)">
          <rect
            x="-140"
            y="-44"
            width="280"
            height="84"
            rx="8"
            fill="#090E16"
            stroke="#EF4444"
            strokeWidth="3"
            filter="drop-shadow(0 0 18px rgba(239, 68, 68, 0.45))"
          />
          <text
            x="0"
            y="16"
            fill="#EF4444"
            fontSize="48"
            fontFamily={montserrat.fontFamily}
            fontWeight="900"
            textAnchor="middle"
            letterSpacing="3"
          >
            {ghostCount.toLocaleString()}
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 21. SCENE 21: ALEUTIAN_EPILOGUE_MEMORIAL_STAGE
// Symmetric resolution: Waving US & Canadian banners atop volcanic peak under Aurora
// =========================================================================
export const AleutianEpilogueMemorialStage: React.FC = () => {
  const frame = useCurrentFrame();
  const auroraShift = Math.sin(frame * 0.05) * 20;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <PolarHorizonGlow cx={480} cy={1180} rx={480} ry={280} color="AURORA" intensity={0.9} />

        {/* Radiant Aurora Borealis Ribboning Across the High Arctic Sky */}
        <g opacity="0.75" filter="drop-shadow(0 0 24px #2DD4BF)">
          <path
            d={`M 60 915 Q 320 ${865 + auroraShift} 560 915 T 910 ${875 - auroraShift}`}
            stroke="#2DD4BF"
            strokeWidth="28"
            fill="none"
            opacity="0.85"
          />
          <path
            d={`M 60 955 Q 340 ${905 - auroraShift} 580 955 T 910 ${915 + auroraShift}`}
            stroke="#818CF8"
            strokeWidth="18"
            fill="none"
            opacity="0.75"
          />
        </g>

        {/* Snow-Swept Aleutian Volcanic Peak Overlooking Bering Sea */}
        <polygon points="50,1485 330,1250 510,1200 750,1275 915,1485" fill="#0B121A" stroke="#1E293B" strokeWidth="3" />
        <polygon points="330,1250 510,1200 585,1235 460,1250 330,1250" fill="#E2E8F0" />

        {/* Weathered Granite Memorial Plinth */}
        <g transform="translate(420, 1180)">
          <rect x="0" y="20" width="130" height="95" rx="4" fill="#18181B" stroke="#334155" strokeWidth="2.5" />
          <polygon points="-6,20 65,0 136,20" fill="#27272A" stroke="#475569" strokeWidth="1.5" />
          <rect x="20" y="36" width="90" height="44" rx="2" fill="#78350F" stroke="#F59E0B" strokeWidth="2" />
        </g>

        {/* Lone Allied Honor Guard Silhouette Saluting Memorial */}
        <AnatomicalSoldierSilhouette
          x={260}
          y={1245}
          scale={1.25}
          helmetType="US_M1"
          pose="SALUTING"
          accentColor="#F8FAFC"
        />

        {/* Waving United States 48-Star Flag (Left Mast) */}
        <g transform="translate(325, 1005)">
          <line x1="0" y1="-10" x2="0" y2="250" stroke="#64748B" strokeWidth="6" />
          <circle cx="0" cy="-12" r="6" fill="#F59E0B" />
          {[...Array(24)].map((_, idx) => {
            const u = idx / 24;
            const wave = Math.sin(frame * 0.16 - u * 5) * (u * 12);
            return (
              <g key={idx} transform={`translate(${idx * 6.5}, ${wave})`}>
                {[0, 9, 18, 27, 36, 45, 54].map((sy, sIdx) => (
                  <rect
                    key={sIdx}
                    x="0"
                    y={sy}
                    width="7.2"
                    height="9"
                    fill={sIdx % 2 === 0 ? '#DC2626' : '#F8FAFC'}
                  />
                ))}
                {idx < 10 && <rect x="0" y="0" width="7.2" height="32" fill="#1D4ED8" />}
              </g>
            );
          })}
        </g>

        {/* Waving Canadian Banner (Right Mast) */}
        <g transform="translate(565, 1005)">
          <line x1="0" y1="-10" x2="0" y2="250" stroke="#64748B" strokeWidth="6" />
          <circle cx="0" cy="-12" r="6" fill="#F59E0B" />
          {[...Array(24)].map((_, idx) => {
            const u = idx / 24;
            const wave = Math.sin(frame * 0.16 - u * 5 + 0.8) * (u * 12);
            return (
              <g key={idx} transform={`translate(${idx * 6.5}, ${wave})`}>
                <rect x="0" y="0" width="7.2" height="63" fill="#DC2626" />
                {idx < 9 && <rect x="0" y="0" width="7.2" height="32" fill="#1E3A8A" />}
                {idx > 12 && idx < 18 && <circle cx="3.5" cy="40" r="5" fill="#F8FAFC" />}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
