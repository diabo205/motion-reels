import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { PulsatingBattleMarker } from './PulsatingBattleMarker';

export interface ClashPoint {
  x: number;
  y: number;
  label?: string;
  sublabel?: string;
  color?: string;
  impactFrame?: number;
}

export interface AnimatedFrontlineProps {
  id?: string;
  path: string; // SVG path 'd' string
  alliedColor?: string;
  hostileColor?: string;
  lineWidth?: number;
  style?: 'DUAL_RIBBON' | 'JAGGED_TEETH' | 'HAZARD_STRIPES' | 'GLOWING_LINE';
  animated?: boolean;
  clashPoints?: ClashPoint[];
  frontlineLabel?: string;
  fontFamily?: string;
}

export const AnimatedFrontline: React.FC<AnimatedFrontlineProps> = ({
  id = 'frontline',
  path,
  alliedColor = '#38BDF8',
  hostileColor = '#EF4444',
  lineWidth = 4,
  style = 'DUAL_RIBBON',
  animated = true,
  clashPoints = [],
  frontlineLabel,
  fontFamily = 'Montserrat, Inter, sans-serif',
}) => {
  const frame = useCurrentFrame();
  const filterId = `frontline_glow_${id}`;
  const hazardPatternId = `hazard_${id}`;

  const dashOffset = animated ? (frame * 1.5) % 40 : 0;
  const pulse = Math.sin(frame * 0.15) * 0.25 + 0.75;

  return (
    <g>
      <defs>
        {/* Glowing frontline filter */}
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#F59E0B" floodOpacity="0.7" />
        </filter>

        {/* Hazard Stripes Pattern */}
        <pattern
          id={hazardPatternId}
          width="16"
          height="16"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <rect width="8" height="16" fill={alliedColor} />
          <rect x="8" width="8" height="16" fill={hostileColor} />
        </pattern>
      </defs>

      {/* Dark background shielding track */}
      <path
        d={path}
        fill="none"
        stroke="#070A0E"
        strokeWidth={lineWidth + 6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 1. DUAL_RIBBON: Parallel opposing faction strokes */}
      {style === 'DUAL_RIBBON' && (
        <g>
          {/* Allied Side Ribbon */}
          <path
            d={path}
            fill="none"
            stroke={alliedColor}
            strokeWidth={lineWidth}
            strokeDasharray="16 10"
            strokeDashoffset={-dashOffset}
            strokeLinecap="round"
            transform="translate(-2, -2)"
            opacity="0.9"
          />
          {/* Hostile Side Ribbon */}
          <path
            d={path}
            fill="none"
            stroke={hostileColor}
            strokeWidth={lineWidth}
            strokeDasharray="16 10"
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform="translate(2, 2)"
            opacity="0.9"
          />
          {/* High-tension center wire */}
          <path
            d={path}
            fill="none"
            stroke="#F59E0B"
            strokeWidth={lineWidth * 0.4}
            strokeDasharray="4 4"
            opacity={pulse}
          />
        </g>
      )}

      {/* 2. JAGGED_TEETH: Fortified frontline style */}
      {style === 'JAGGED_TEETH' && (
        <g>
          <path
            d={path}
            fill="none"
            stroke="#F59E0B"
            strokeWidth={lineWidth}
            strokeDasharray="18 6"
            strokeDashoffset={-dashOffset}
            filter={`url(#${filterId})`}
          />
          <path
            d={path}
            fill="none"
            stroke={hostileColor}
            strokeWidth={lineWidth * 0.75}
            strokeDasharray="6 18"
            strokeDashoffset={dashOffset}
          />
        </g>
      )}

      {/* 3. HAZARD_STRIPES: Striped contested no-man's land */}
      {style === 'HAZARD_STRIPES' && (
        <path
          d={path}
          fill="none"
          stroke={`url(#${hazardPatternId})`}
          strokeWidth={lineWidth * 1.6}
          strokeLinecap="round"
          filter={`url(#${filterId})`}
        />
      )}

      {/* 4. GLOWING_LINE: Minimal high-tech laser frontline */}
      {style === 'GLOWING_LINE' && (
        <g>
          <path
            d={path}
            fill="none"
            stroke="#F59E0B"
            strokeWidth={lineWidth}
            filter={`url(#${filterId})`}
            opacity={pulse}
          />
          <path
            d={path}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={lineWidth * 0.4}
            strokeDasharray="12 12"
            strokeDashoffset={-dashOffset * 2}
          />
        </g>
      )}

      {/* Skirmish Clash Battle Markers along the Frontline */}
      {clashPoints.map((cp, idx) => (
        <PulsatingBattleMarker
          key={idx}
          x={cp.x}
          y={cp.y}
          color={cp.color || '#F59E0B'}
          size={24}
          label={cp.label}
          sublabel={cp.sublabel}
          pulseSpeed={1.2 + idx * 0.2}
          showCrosshairs={true}
          impactFlash={true}
          impactFrame={cp.impactFrame || 28 + idx * 4}
          fontFamily={fontFamily}
        />
      ))}
    </g>
  );
};
