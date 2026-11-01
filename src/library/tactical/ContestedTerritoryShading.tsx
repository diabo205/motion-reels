import React from 'react';
import { useCurrentFrame } from 'remotion';

export type TerritoryFaction =
  | 'ALLIED'
  | 'AXIS'
  | 'SOVIET'
  | 'IMPERIAL'
  | 'INSURGENT'
  | 'CONTESTED';

export type TerritoryPatternStyle =
  | 'DIAGONAL_STRIPES'
  | 'CROSS_HATCH'
  | 'SOLID_TINT'
  | 'RADIAL_GLOW';

export interface ContestedTerritoryShadingProps {
  id?: string;
  path: string; // SVG path 'd' string
  faction?: TerritoryFaction;
  customColor?: string;
  patternStyle?: TerritoryPatternStyle;
  stripeSpacing?: number;
  stripeWidth?: number;
  stripeAngle?: number;
  opacity?: number;
  animated?: boolean;
  borderStrokeWidth?: number;
  borderDashArray?: string;
  label?: string;
  labelCenter?: [number, number];
  fontFamily?: string;
}

const FACTION_COLORS: Record<TerritoryFaction, { primary: string; secondary: string; tint: string }> = {
  ALLIED: {
    primary: '#38BDF8',
    secondary: '#0284C7',
    tint: 'rgba(56, 189, 248, 0.22)',
  },
  AXIS: {
    primary: '#EF4444',
    secondary: '#B91C1C',
    tint: 'rgba(239, 68, 68, 0.22)',
  },
  SOVIET: {
    primary: '#E11D48',
    secondary: '#9F1239',
    tint: 'rgba(225, 29, 72, 0.22)',
  },
  IMPERIAL: {
    primary: '#F59E0B',
    secondary: '#D97706',
    tint: 'rgba(245, 158, 11, 0.22)',
  },
  INSURGENT: {
    primary: '#10B981',
    secondary: '#047857',
    tint: 'rgba(16, 185, 129, 0.22)',
  },
  CONTESTED: {
    primary: '#F59E0B',
    secondary: '#EF4444',
    tint: 'rgba(245, 158, 11, 0.25)',
  },
};

export const ContestedTerritoryShading: React.FC<ContestedTerritoryShadingProps> = ({
  id = 'territory',
  path,
  faction = 'CONTESTED',
  customColor,
  patternStyle = 'DIAGONAL_STRIPES',
  stripeSpacing = 16,
  stripeWidth = 2.5,
  stripeAngle = 45,
  opacity = 0.85,
  animated = true,
  borderStrokeWidth = 2.2,
  borderDashArray = '8 6',
  label,
  labelCenter,
  fontFamily = 'Montserrat, Inter, sans-serif',
}) => {
  const frame = useCurrentFrame();
  const patternId = `pat_${id}`;
  const factionConfig = FACTION_COLORS[faction] || FACTION_COLORS.CONTESTED;
  const primaryColor = customColor || factionConfig.primary;

  // Continuous subtle micro-motion: shift stripes slowly over time
  const animOffset = animated ? (frame * 0.4) % stripeSpacing : 0;
  const borderOffset = animated ? (frame * 0.8) % 60 : 0;

  return (
    <g opacity={opacity}>
      <defs>
        {/* 1. Diagonal Stripes Hatch Pattern */}
        {patternStyle === 'DIAGONAL_STRIPES' && (
          <pattern
            id={patternId}
            width={stripeSpacing}
            height={stripeSpacing}
            patternTransform={`rotate(${stripeAngle})`}
            patternUnits="userSpaceOnUse"
          >
            <rect width={stripeSpacing} height={stripeSpacing} fill={factionConfig.tint} />
            <line
              x1={animOffset}
              y1="0"
              x2={animOffset}
              y2={stripeSpacing}
              stroke={primaryColor}
              strokeWidth={stripeWidth}
              opacity="0.85"
            />
          </pattern>
        )}

        {/* 2. Cross Hatch Pattern for Contested Frontline Zones */}
        {patternStyle === 'CROSS_HATCH' && (
          <pattern
            id={patternId}
            width={stripeSpacing}
            height={stripeSpacing}
            patternTransform={`rotate(${stripeAngle})`}
            patternUnits="userSpaceOnUse"
          >
            <rect width={stripeSpacing} height={stripeSpacing} fill={factionConfig.tint} />
            <line
              x1={animOffset}
              y1="0"
              x2={animOffset}
              y2={stripeSpacing}
              stroke={primaryColor}
              strokeWidth={stripeWidth}
              opacity="0.75"
            />
            <line
              x1="0"
              y1={animOffset}
              x2={stripeSpacing}
              y2={animOffset}
              stroke={factionConfig.secondary}
              strokeWidth={stripeWidth * 0.9}
              opacity="0.6"
            />
          </pattern>
        )}
      </defs>

      {/* Shaded Territory Fill */}
      {patternStyle === 'SOLID_TINT' ? (
        <path d={path} fill={primaryColor} fillOpacity="0.22" />
      ) : (
        <path d={path} fill={`url(#${patternId})`} />
      )}

      {/* Tactical Boundary Contour */}
      {borderStrokeWidth > 0 && (
        <path
          d={path}
          fill="none"
          stroke={primaryColor}
          strokeWidth={borderStrokeWidth}
          strokeDasharray={borderDashArray}
          strokeDashoffset={-borderOffset}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}

      {/* Optional Territory Placard Tag */}
      {label && labelCenter && (
        <g transform={`translate(${labelCenter[0]}, ${labelCenter[1]})`}>
          <rect
            x={-(label.length * 5 + 16)}
            y="-13"
            width={label.length * 10 + 32}
            height="26"
            rx="3"
            fill="rgba(10, 17, 24, 0.92)"
            stroke={primaryColor}
            strokeWidth="1.4"
          />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fill="#F4F7FA"
            fontFamily={fontFamily}
            fontSize="11"
            fontWeight="800"
            letterSpacing="0.06em"
          >
            {label.toUpperCase()}
          </text>
        </g>
      )}
    </g>
  );
};
