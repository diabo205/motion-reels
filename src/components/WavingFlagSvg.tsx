import React from 'react';
import { useCurrentFrame, staticFile } from 'remotion';

interface WavingFlagSvgProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  showPole?: boolean;
  showRadarRings?: boolean;
  flagImage?: string;
}

export const WavingFlagSvg: React.FC<WavingFlagSvgProps> = ({
  width = 720,
  height = 480,
  x = 200,
  y = 800,
  showPole = true,
  showRadarRings = true,
  flagImage = 'plates/pakistan_flag.png',
}) => {
  const frame = useCurrentFrame();

  // 120 vertical slices: each slice is only 6px wide for smooth rendering
  const SLICES = 120;
  const sliceW = width / SLICES;
  // Overlap by 1.0px to completely avoid subpixel gaps
  const renderSliceW = sliceW + 1.0;

  // Radar reticle spin
  const spin = (frame * 1.1) % 360;

  // Pole coordinates
  const poleX = x - 18;
  const poleTopY = y - 70;
  const poleBottomY = y + height + 180;

  // Wave mathematical constants
  const k1 = Math.PI * 4.2; // ~2.1 full wave crests across width
  const k2 = Math.PI * 7.5; // High-frequency flutter
  const speed1 = 0.15;
  const speed2 = 0.28;
  const gust = 1 + 0.12 * Math.sin(frame * 0.06);

  // Generate continuous slice data
  const slices = [];
  const topPoints: string[] = [];
  const bottomPoints: string[] = [];

  for (let i = 0; i < SLICES; i++) {
    const u = i / SLICES; // 0 (hoist) to 1 (fly)
    const wavePhase = u * k1 - frame * speed1;
    const flutterPhase = u * k2 - frame * speed2;

    // Amplitude grows with distance from the fixed flagpole
    const ampBase = Math.pow(u, 1.3) * 36;
    const flutterAmp = Math.pow(u, 2.3) * 10;

    const dy = (Math.sin(wavePhase) * ampBase + Math.sin(flutterPhase) * flutterAmp) * gust;

    // First derivative with respect to pixel x (slope for continuous skewY)
    const dPhase_dx = k1 / width;
    const dFlutter_dx = k2 / width;
    const dAmp_dx = (1.3 * Math.pow(u, 0.3) * 36) / width;
    const dy_dx = (Math.cos(wavePhase) * dPhase_dx * ampBase +
      Math.sin(wavePhase) * dAmp_dx +
      Math.cos(flutterPhase) * dFlutter_dx * flutterAmp) * gust;

    // Angle of inclination in degrees (clamped for safety)
    const angleRad = Math.atan(dy_dx);
    const angleDeg = Math.min(30, Math.max(-30, (angleRad * 180) / Math.PI));

    // Cloth horizontal foreshortening from 3D wave curvature
    const dx = -Math.pow(u, 1.15) * 18 * (1 - Math.cos(wavePhase));

    // Perspective vertical stretch/compression
    const scaleY = 1 - 0.04 * Math.abs(Math.sin(wavePhase)) * u;

    // Realistic cloth lighting: slope towards top-left light
    const slope = Math.cos(wavePhase);
    const highlight = Math.max(0, slope) * 0.35 * Math.pow(u, 0.55);
    const shadow = Math.max(0, -slope) * 0.42 * Math.pow(u, 0.55);

    const currX = x + i * sliceW + dx;
    const currY = y + dy;

    topPoints.push(`${currX.toFixed(1)},${currY.toFixed(1)}`);
    bottomPoints.push(`${currX.toFixed(1)},${(currY + height * scaleY).toFixed(1)}`);

    slices.push({
      i,
      u,
      sliceX: currX,
      sliceY: currY,
      sourceX: -(i * sliceW),
      angleDeg,
      scaleY,
      highlight,
      shadow,
    });
  }

  const topCurveD = `M ${topPoints.join(' L ')}`;
  const bottomCurveD = `M ${bottomPoints.join(' L ')}`;

  return (
    <svg
      viewBox="0 0 1080 1920"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <defs>
        {/* Flagpole Metallic Gradient */}
        <linearGradient id="flagpoleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E232A" />
          <stop offset="35%" stopColor="#8A939E" />
          <stop offset="70%" stopColor="#D5DBE1" />
          <stop offset="100%" stopColor="#15191E" />
        </linearGradient>

        {/* Gold Spearhead Finial Gradient */}
        <linearGradient id="finialGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2A3" />
          <stop offset="40%" stopColor="#F4B942" />
          <stop offset="80%" stopColor="#A46B10" />
          <stop offset="100%" stopColor="#4A2E00" />
        </linearGradient>

        {/* Flag Soft Drop Shadow Filter */}
        <filter id="flagShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="28" stdDeviation="32" floodColor="#000" floodOpacity="0.8" />
        </filter>

        {/* Individual slice clip paths */}
        {slices.map((s) => (
          <clipPath key={`clip-${s.i}`} id={`flag-slice-${s.i}`}>
            <rect x="0" y="0" width={renderSliceW} height={height} />
          </clipPath>
        ))}
      </defs>

      {/* Atmospheric Radar & Compass Rings Behind Flag */}
      {showRadarRings && (
        <g transform={`translate(${x + width * 0.44}, ${y + height * 0.5})`}>
          <circle r="360" fill="none" stroke="#F4B942" strokeWidth="2" strokeDasharray="16 14" transform={`rotate(${spin})`} opacity="0.4" />
          <circle r="270" fill="none" stroke="#5BC0BE" strokeWidth="2.5" strokeDasharray="8 8" opacity="0.55" />
          <circle r="180" fill="none" stroke="#F8F9FA" strokeWidth="2" opacity="0.45" />
          <line x1="-390" y1="0" x2="390" y2="0" stroke="#5BC0BE" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.3" />
          <line x1="0" y1="-390" x2="0" y2="390" stroke="#5BC0BE" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.3" />
        </g>
      )}

      {/* Flag Group with Dynamic Waving Slices */}
      <g filter="url(#flagShadow)">
        {slices.map((s) => (
          <g
            key={`slice-group-${s.i}`}
            transform={`translate(${s.sliceX}, ${s.sliceY}) skewY(${s.angleDeg}) scale(1, ${s.scaleY})`}
          >
            {/* Clipped image segment */}
            <g clipPath={`url(#flag-slice-${s.i})`}>
              <image
                href={staticFile(flagImage)}
                x={s.sourceX}
                y="0"
                width={width}
                height={height}
                preserveAspectRatio="none"
              />
            </g>

            {/* Specular Highlight Overlay (Wave Crest facing light) */}
            {s.highlight > 0.01 && (
              <rect
                x="0"
                y="0"
                width={renderSliceW}
                height={height}
                fill="#FFFFFF"
                opacity={s.highlight}
              />
            )}

            {/* Ambient Shadow Overlay (Wave Trough away from light) */}
            {s.shadow > 0.01 && (
              <rect
                x="0"
                y="0"
                width={renderSliceW}
                height={height}
                fill="#000000"
                opacity={s.shadow}
              />
            )}
          </g>
        ))}

        {/* Continuous Smooth Top Hem Line */}
        <path d={topCurveD} fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.4" />
        {/* Continuous Smooth Bottom Hem Line */}
        <path d={bottomCurveD} fill="none" stroke="#000000" strokeWidth="2.5" opacity="0.5" />
      </g>

      {/* Flagpole & Rigging */}
      {showPole && (
        <g>
          {/* Flagpole Shadow */}
          <rect
            x={poleX + 10}
            y={poleTopY + 10}
            width="14"
            height={poleBottomY - poleTopY}
            fill="#000000"
            opacity="0.4"
            filter="blur(4px)"
          />

          {/* Main Mast Pole */}
          <rect
            x={poleX}
            y={poleTopY}
            width="14"
            height={poleBottomY - poleTopY}
            fill="url(#flagpoleGrad)"
            rx="3"
          />

          {/* Halyard Rigging Cord / Rope */}
          <line
            x1={poleX + 20}
            y1={poleTopY + 20}
            x2={poleX + 20}
            y2={poleBottomY - 20}
            stroke="#E8DFCA"
            strokeWidth="2"
            opacity="0.75"
          />

          {/* Top Hoist Grommet & Carabiner Ring */}
          <circle cx={poleX + 16} cy={y + 10} r="6" fill="#D5DBE1" stroke="#333" strokeWidth="1.5" />
          <line x1={poleX + 14} y1={y + 10} x2={x} y2={y + 10} stroke="#D5DBE1" strokeWidth="2.5" />

          {/* Bottom Hoist Grommet & Carabiner Ring */}
          <circle cx={poleX + 16} cy={y + height - 10} r="6" fill="#D5DBE1" stroke="#333" strokeWidth="1.5" />
          <line x1={poleX + 14} y1={y + height - 10} x2={x} y2={y + height - 10} stroke="#D5DBE1" strokeWidth="2.5" />

          {/* Spearhead / Finial Assembly at Top of Pole */}
          <g transform={`translate(${poleX + 7}, ${poleTopY})`}>
            {/* Finial Collar */}
            <rect x="-10" y="-8" width="20" height="8" fill="url(#finialGold)" rx="2" />
            <circle cx="0" cy="-14" r="7" fill="url(#finialGold)" />

            {/* Nishan / Crescent & Star Spearhead */}
            <path
              d="M 0 -60 L 10 -24 L 3 -24 L 3 -14 L -3 -14 L -3 -24 L -10 -24 Z"
              fill="url(#finialGold)"
              stroke="#A46B10"
              strokeWidth="1.5"
            />
            {/* Small Crescent Ornament */}
            <path
              d="M 6 -38 A 6 6 0 1 0 6 -26 A 4.5 4.5 0 1 1 6 -38 Z"
              fill="#FFFFFF"
              opacity="0.9"
            />
          </g>

          {/* Base Pole Mount / Cleat */}
          <rect
            x={poleX - 8}
            y={poleBottomY - 30}
            width="30"
            height="14"
            fill="url(#flagpoleGrad)"
            rx="3"
          />
        </g>
      )}

      {/* Atmospheric Wind Streaks across the flag */}
      {[0, 1, 2].map((idx) => {
        const streakX = ((frame * 12 + idx * 360) % 1300) - 200;
        const streakY = y + 80 + idx * 130 + Math.sin(frame * 0.08 + idx) * 20;
        return (
          <line
            key={`wind-streak-${idx}`}
            x1={streakX}
            y1={streakY}
            x2={streakX + 120}
            y2={streakY - 8}
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeDasharray="40 20"
            opacity="0.18"
          />
        );
      })}
    </svg>
  );
};
