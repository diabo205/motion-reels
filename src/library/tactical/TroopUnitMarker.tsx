import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export type UnitBranch =
  | 'INFANTRY'
  | 'ARMOR'
  | 'CAVALRY'
  | 'ARTILLERY'
  | 'HEADQUARTERS'
  | 'AIRBORNE';

export type UnitEchelon =
  | 'CORPS' // XXX
  | 'DIVISION' // XX
  | 'BRIGADE' // X
  | 'REGIMENT' // III
  | 'BATTALION'; // II

export interface TroopUnitMarkerProps {
  x: number;
  y: number;
  branch?: UnitBranch;
  echelon?: UnitEchelon;
  designation?: string;
  factionColor?: string;
  scale?: number;
  animated?: boolean;
  marchSpeed?: number;
  fontFamily?: string;
}

const ECHELON_LABELS: Record<UnitEchelon, string> = {
  CORPS: 'XXX',
  DIVISION: 'XX',
  BRIGADE: 'X',
  REGIMENT: 'III',
  BATTALION: 'II',
};

export const TroopUnitMarker: React.FC<TroopUnitMarkerProps> = ({
  x,
  y,
  branch = 'INFANTRY',
  echelon = 'DIVISION',
  designation = '7th INF',
  factionColor = '#38BDF8',
  scale = 1.0,
  animated = true,
  marchSpeed = 1.0,
  fontFamily = 'Montserrat, Inter, sans-serif',
}) => {
  const frame = useCurrentFrame();

  // Subtle tactical bobbing/march cadence
  const marchBob = animated ? Math.sin(frame * 0.18 * marchSpeed) * 3 : 0;
  const currentY = y + marchBob;

  const w = 46 * scale;
  const h = 30 * scale;

  return (
    <g transform={`translate(${x}, ${currentY})`}>
      {/* Echelon Size Indicator (XX, X, etc.) */}
      <text
        x="0"
        y={-h / 2 - 4}
        textAnchor="middle"
        fill="#F4F7FA"
        fontFamily={fontFamily}
        fontSize={10 * scale}
        fontWeight="800"
        letterSpacing="0.1em"
      >
        {ECHELON_LABELS[echelon]}
      </text>

      {/* Outer Tactical Unit Box */}
      <rect
        x={-w / 2}
        y={-h / 2}
        width={w}
        height={h}
        rx={2 * scale}
        fill="rgba(10, 17, 24, 0.94)"
        stroke={factionColor}
        strokeWidth={2 * scale}
      />

      {/* NATO Branch Symbol Insignia Inside Unit Box */}
      {branch === 'INFANTRY' && (
        // Crossed Saltire (X)
        <g stroke={factionColor} strokeWidth={1.8 * scale} strokeLinecap="round">
          <line x1={-w / 2 + 6} y1={-h / 2 + 5} x2={w / 2 - 6} y2={h / 2 - 5} />
          <line x1={w / 2 - 6} y1={-h / 2 + 5} x2={-w / 2 + 6} y2={h / 2 - 5} />
        </g>
      )}

      {branch === 'ARMOR' && (
        // Track Oval / Pill
        <rect
          x={-w / 2 + 8}
          y={-h / 2 + 7}
          width={w - 16}
          height={h - 14}
          rx={6 * scale}
          fill="none"
          stroke={factionColor}
          strokeWidth={1.8 * scale}
        />
      )}

      {branch === 'CAVALRY' && (
        // Diagonal Slash (/)
        <g stroke={factionColor} strokeWidth={2.2 * scale} strokeLinecap="round">
          <line x1={-w / 2 + 6} y1={h / 2 - 5} x2={w / 2 - 6} y2={-h / 2 + 5} />
        </g>
      )}

      {branch === 'ARTILLERY' && (
        // Solid Cannonball Round
        <circle cx="0" cy="0" r={4.5 * scale} fill={factionColor} />
      )}

      {branch === 'HEADQUARTERS' && (
        // HQ Staff pennant flag
        <g stroke={factionColor} strokeWidth={1.8 * scale} fill={factionColor}>
          <line x1={-w / 2 + 8} y1={-h / 2 + 4} x2={-w / 2 + 8} y2={h / 2 + 8} strokeWidth={2} />
          <polygon points={`${-w / 2 + 8},${-h / 2 + 4} 0,${-h / 2 + 10} ${-w / 2 + 8},${-h / 2 + 16}`} />
        </g>
      )}

      {branch === 'AIRBORNE' && (
        // Airborne Wings
        <g fill="none" stroke={factionColor} strokeWidth={1.8 * scale}>
          <path d={`M ${-w / 2 + 8} ${h / 2 - 8} Q 0 ${-h / 2 + 6} ${w / 2 - 8} ${h / 2 - 8}`} />
          <circle cx="0" cy="0" r={3 * scale} fill={factionColor} />
        </g>
      )}

      {/* Designation Placard Below Unit Box */}
      {designation && (
        <text
          x="0"
          y={h / 2 + 14 * scale}
          textAnchor="middle"
          fill="#F4F7FA"
          fontFamily={fontFamily}
          fontSize={10 * scale}
          fontWeight="800"
          letterSpacing="0.05em"
        >
          {designation.toUpperCase()}
        </text>
      )}
    </g>
  );
};
