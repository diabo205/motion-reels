import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface RadarBlip {
  x: number;
  y: number;
  label?: string;
  isHostile?: boolean;
}

export interface TacticalRadarGridProps {
  radius?: number;
  sweepSpeed?: number;
  gridColor?: string;
  accentColor?: string;
  showSweep?: boolean;
  blips?: RadarBlip[];
}

export const TacticalRadarGrid: React.FC<TacticalRadarGridProps> = ({
  radius = 260,
  sweepSpeed = 1.0,
  gridColor = 'rgba(56, 189, 248, 0.22)',
  accentColor = '#38BDF8',
  showSweep = true,
  blips = [],
}) => {
  const frame = useCurrentFrame();
  const sweepAngle = (frame * 1.5 * sweepSpeed) % 360;

  return (
    <g>
      {/* Outer Compass Housing */}
      <circle cx="0" cy="0" r={radius} fill="none" stroke={gridColor} strokeWidth="2.5" />
      <circle cx="0" cy="0" r={radius * 0.72} fill="none" stroke={gridColor} strokeWidth="1.5" strokeDasharray="8 6" />
      <circle cx="0" cy="0" r={radius * 0.44} fill="none" stroke={gridColor} strokeWidth="1.5" strokeDasharray="6 4" />
      <circle cx="0" cy="0" r={radius * 0.18} fill="none" stroke={gridColor} strokeWidth="1.5" />

      {/* Axis Crosshairs */}
      <line x1={-radius - 20} y1="0" x2={radius + 20} y2="0" stroke={gridColor} strokeWidth="1.5" />
      <line x1="0" y1={-radius - 20} x2="0" y2={radius + 20} stroke={gridColor} strokeWidth="1.5" />

      {/* Degree Compass Ticks */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <g key={deg} transform={`rotate(${deg})`}>
          <line x1="0" y1={-radius} x2="0" y2={-radius + 12} stroke={accentColor} strokeWidth="2" />
        </g>
      ))}

      {/* Center Origin Dot */}
      <circle cx="0" cy="0" r="4" fill={accentColor} />

      {/* Rotating Sweep Beam */}
      {showSweep && (
        <g transform={`rotate(${sweepAngle})`}>
          <line x1="0" y1="0" x2="0" y2={-radius} stroke={accentColor} strokeWidth="2.5" />
          <path
            d={`M 0 0 L 0 ${-radius} A ${radius} ${radius} 0 0 0 ${-Math.sin((35 * Math.PI) / 180) * radius} ${
              -Math.cos((35 * Math.PI) / 180) * radius
            } Z`}
            fill={`url(#sweepGradient)`}
            opacity={0.35}
          />
        </g>
      )}

      {/* Radar Blips */}
      {blips.map((blip, idx) => {
        const pulse = 1 + 0.3 * Math.sin(frame * 0.2 + idx);
        const blipColor = blip.isHostile ? '#EF4444' : accentColor;

        return (
          <g key={idx} transform={`translate(${blip.x}, ${blip.y})`}>
            <circle cx="0" cy="0" r={5 * pulse} fill={blipColor} opacity={0.9} />
            <circle cx="0" cy="0" r={12 * pulse} fill="none" stroke={blipColor} strokeWidth="1" opacity={0.6} />
            {blip.label && (
              <text
                x="14"
                y="4"
                fill={blipColor}
                fontSize="12"
                fontFamily="Inter, Montserrat, sans-serif"
                fontWeight="700"
                letterSpacing="0.08em"
              >
                {blip.label}
              </text>
            )}
          </g>
        );
      })}

      <defs>
        <radialGradient id="sweepGradient" cx="0%" cy="0%" r="100%">
          <stop offset="0%" stopColor={accentColor} stopOpacity={0.4} />
          <stop offset="100%" stopColor={accentColor} stopOpacity={0} />
        </radialGradient>
      </defs>
    </g>
  );
};
