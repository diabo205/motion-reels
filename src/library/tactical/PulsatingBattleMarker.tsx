import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export interface PulsatingBattleMarkerProps {
  x: number;
  y: number;
  color?: string;
  size?: number;
  label?: string;
  sublabel?: string;
  pulseSpeed?: number;
  ringCount?: number;
  showCrosshairs?: boolean;
  impactFlash?: boolean;
  impactFrame?: number;
  fontFamily?: string;
}

export const PulsatingBattleMarker: React.FC<PulsatingBattleMarkerProps> = ({
  x,
  y,
  color = '#EF4444',
  size = 28,
  label,
  sublabel,
  pulseSpeed = 1.0,
  ringCount = 3,
  showCrosshairs = true,
  impactFlash = false,
  impactFrame = 30,
  fontFamily = 'Montserrat, Inter, sans-serif',
}) => {
  const frame = useCurrentFrame();
  const radius = size / 2;

  // Expanding shockwave rings (offset phases)
  const rings = Array.from({ length: ringCount }).map((_, idx) => {
    const phaseOffset = (idx / ringCount) * 40;
    const ringCycle = ((frame * pulseSpeed + phaseOffset) % 40) / 40;
    const ringRadius = interpolate(ringCycle, [0, 1], [radius, radius * 3.2], { extrapolateRight: 'clamp' });
    const ringAlpha = interpolate(ringCycle, [0, 0.7, 1], [0.85, 0.35, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return { radius: ringRadius, alpha: ringAlpha, key: idx };
  });

  // Sharp detonation flash if impactFlash is enabled
  const flashAlpha =
    impactFlash && frame >= impactFrame && frame <= impactFrame + 14
      ? interpolate(frame, [impactFrame, impactFrame + 14], [1.0, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Expanding Radar Shockwave Rings */}
      {rings.map((r) => (
        <circle
          key={r.key}
          cx="0"
          cy="0"
          r={r.radius}
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          opacity={r.alpha}
        />
      ))}

      {/* Target Reticle Crosshairs */}
      {showCrosshairs && (
        <g stroke={color} strokeWidth="1.6" opacity="0.75">
          <line x1={-radius - 10} y1="0" x2={-radius + 2} y2="0" />
          <line x1={radius - 2} y1="0" x2={radius + 10} y2="0" />
          <line x1="0" y1={-radius - 10} x2="0" y2={-radius + 2} />
          <line x1="0" y1={radius - 2} x2="0" y2={radius + 10} />
        </g>
      )}

      {/* Outer Tactical Octagon / Diamond Housing */}
      <polygon
        points={`0,${-radius - 3} ${radius + 3},0 0,${radius + 3} ${-radius - 3},0`}
        fill="rgba(10, 17, 24, 0.88)"
        stroke={color}
        strokeWidth="2.2"
      />

      {/* Core Glowing Detonation Center */}
      <circle cx="0" cy="0" r={radius * 0.55} fill={color} />
      <circle cx="0" cy="0" r={radius * 0.25} fill="#FFFFFF" />

      {/* Impact Detonation Shock Flash */}
      {flashAlpha > 0 && (
        <circle
          cx="0"
          cy="0"
          r={radius * (2 + (1 - flashAlpha) * 4)}
          fill={color}
          opacity={flashAlpha * 0.65}
        />
      )}

      {/* High-Legibility Tactical Label Placard */}
      {label && (
        <g transform={`translate(${radius + 14}, 4)`}>
          {/* Backdrop Pill */}
          <rect
            x="-4"
            y="-18"
            width={label.length * 9.5 + 24}
            height={sublabel ? 36 : 24}
            rx="3"
            fill="rgba(7, 13, 20, 0.92)"
            stroke="rgba(244, 247, 250, 0.25)"
            strokeWidth="1.2"
          />
          {/* Label Pin Line */}
          <line x1="-14" y1="-6" x2="-4" y2="-6" stroke={color} strokeWidth="1.5" />

          {/* Primary Label */}
          <text
            x="6"
            y="-2"
            fill="#F4F7FA"
            fontFamily={fontFamily}
            fontSize="12"
            fontWeight="800"
            letterSpacing="0.06em"
          >
            {label.toUpperCase()}
          </text>

          {/* Optional Sublabel (Metric or Date) */}
          {sublabel && (
            <text
              x="6"
              y="12"
              fill={color}
              fontFamily={fontFamily}
              fontSize="10"
              fontWeight="700"
              letterSpacing="0.04em"
            >
              {sublabel}
            </text>
          )}
        </g>
      )}
    </g>
  );
};
