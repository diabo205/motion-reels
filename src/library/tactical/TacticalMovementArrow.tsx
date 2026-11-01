import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export interface TacticalMovementArrowProps {
  id?: string;
  path: string; // SVG path 'd' string
  strokeColor?: string;
  strokeWidth?: number;
  arrowHead?: 'CHEVRON' | 'SPEARHEAD' | 'PINCER' | 'DOT' | 'NONE';
  arrowSize?: number;
  animationMode?: 'FLOWING_DASHES' | 'PROGRESSIVE_DRAW' | 'PULSING_SOLID';
  dashArray?: string;
  flowSpeed?: number;
  pathLength?: number; // Estimated path length for progressive draw
  startFrame?: number;
  drawDuration?: number;
  opacity?: number;
  glow?: boolean;
  label?: string;
  labelPosition?: 'START' | 'MIDDLE' | 'END';
  unitSymbol?: string;
  fontFamily?: string;
}

export const TacticalMovementArrow: React.FC<TacticalMovementArrowProps> = ({
  id = 'tactical_arrow',
  path,
  strokeColor = '#38BDF8',
  strokeWidth = 4,
  arrowHead = 'CHEVRON',
  arrowSize = 16,
  animationMode = 'FLOWING_DASHES',
  dashArray = '24 14',
  flowSpeed = 4.0,
  pathLength = 600,
  startFrame = 0,
  drawDuration = 45,
  opacity = 0.95,
  glow = true,
  label,
  fontFamily = 'Montserrat, Inter, sans-serif',
}) => {
  const frame = useCurrentFrame();
  const markerId = `marker_${id}_${arrowHead}`;
  const filterId = `glow_${id}`;

  // 1. Animation Calculations
  let strokeDasharray = dashArray;
  let strokeDashoffset = 0;
  let currentOpacity = opacity;

  if (animationMode === 'FLOWING_DASHES') {
    // Continuous flowing marching dashes
    strokeDasharray = dashArray;
    strokeDashoffset = -frame * flowSpeed;
  } else if (animationMode === 'PROGRESSIVE_DRAW') {
    // Arrow draws itself on from start to end over drawDuration
    const progress = interpolate(frame, [startFrame, startFrame + drawDuration], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    strokeDasharray = `${pathLength} ${pathLength}`;
    strokeDashoffset = pathLength * (1 - progress);
    currentOpacity = progress > 0 ? opacity : 0;
  } else if (animationMode === 'PULSING_SOLID') {
    strokeDasharray = 'none';
    strokeDashoffset = 0;
    const pulse = Math.sin(frame * 0.12) * 0.2 + 0.8;
    currentOpacity = opacity * pulse;
  }

  return (
    <g opacity={currentOpacity}>
      <defs>
        {/* Glow Filter */}
        {glow && (
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={strokeColor} floodOpacity="0.6" />
          </filter>
        )}

        {/* Tactical Arrowhead Markers */}
        {arrowHead === 'CHEVRON' && (
          <marker
            id={markerId}
            viewBox="0 0 16 16"
            refX="12"
            refY="8"
            markerWidth={arrowSize}
            markerHeight={arrowSize}
            orient="auto"
          >
            <path
              d="M 2 2 L 12 8 L 2 14 L 6 8 Z"
              fill={strokeColor}
              stroke="none"
            />
          </marker>
        )}

        {arrowHead === 'SPEARHEAD' && (
          <marker
            id={markerId}
            viewBox="0 0 16 16"
            refX="14"
            refY="8"
            markerWidth={arrowSize}
            markerHeight={arrowSize}
            orient="auto"
          >
            <polygon
              points="0,2 14,8 0,14 4,8"
              fill={strokeColor}
            />
          </marker>
        )}

        {arrowHead === 'PINCER' && (
          <marker
            id={markerId}
            viewBox="0 0 20 16"
            refX="16"
            refY="8"
            markerWidth={arrowSize * 1.3}
            markerHeight={arrowSize}
            orient="auto"
          >
            {/* Double chevron pincer attack head */}
            <path d="M 0 2 L 10 8 L 0 14 L 4 8 Z" fill={strokeColor} />
            <path d="M 8 2 L 18 8 L 8 14 L 12 8 Z" fill={strokeColor} />
          </marker>
        )}

        {arrowHead === 'DOT' && (
          <marker
            id={markerId}
            viewBox="0 0 16 16"
            refX="8"
            refY="8"
            markerWidth={arrowSize * 0.8}
            markerHeight={arrowSize * 0.8}
            orient="auto"
          >
            <circle cx="8" cy="8" r="6" fill={strokeColor} stroke="#FFFFFF" strokeWidth="1.5" />
          </marker>
        )}
      </defs>

      {/* Background Shadow / Track Path */}
      <path
        d={path}
        fill="none"
        stroke="rgba(10, 17, 24, 0.75)"
        strokeWidth={strokeWidth + 3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Main Animated Tactical Path */}
      <path
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={glow ? `url(#${filterId})` : undefined}
        markerEnd={arrowHead !== 'NONE' ? `url(#${markerId})` : undefined}
      />

      {/* Tactical Unit Text Annotation */}
      {label && (
        <text
          fill="#F4F7FA"
          fontFamily={fontFamily}
          fontSize="11"
          fontWeight="800"
          letterSpacing="0.08em"
          opacity="0.9"
        >
          <textPath href={`#path_${id}`} startOffset="50%">
            {label}
          </textPath>
        </text>
      )}
    </g>
  );
};
