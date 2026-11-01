import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface MarchingInfantryRankProps {
  soldierCount?: number;
  spacing?: number;
  scale?: number;
  silhouetteColor?: string;
  bayonetAccentColor?: string;
  facing?: 'LEFT' | 'RIGHT';
}

export const MarchingInfantryRank: React.FC<MarchingInfantryRankProps> = ({
  soldierCount = 7,
  spacing = 90,
  scale = 1.0,
  silhouetteColor = '#090D12',
  bayonetAccentColor = '#CBD5E1',
  facing = 'RIGHT',
}) => {
  const frame = useCurrentFrame();
  const flip = facing === 'LEFT' ? 'scaleX(-1)' : '';

  return (
    <g transform={`${flip} scale(${scale})`}>
      {Array.from({ length: soldierCount }).map((_, i) => {
        // Individualized stride phase offsets
        const stridePhase = frame * 0.18 + i * 0.7;
        const bobY = Math.abs(Math.sin(stridePhase)) * 8;
        const rifleSway = Math.sin(stridePhase) * 3;
        const xOffset = (i - (soldierCount - 1) / 2) * spacing;

        return (
          <g key={i} transform={`translate(${xOffset}, ${bobY})`}>
            {/* Slanted Rifle with Bayonet */}
            <g transform={`rotate(${15 + rifleSway}, 12, 10)`}>
              <line x1="8" y1="20" x2="22" y2="-90" stroke="#1E293B" strokeWidth="3" />
              <line x1="22" y1="-90" x2="25" y2="-125" stroke={bayonetAccentColor} strokeWidth="2" />
            </g>

            {/* Helmet & Head */}
            <ellipse cx="0" cy="-60" rx="16" ry="14" fill={silhouetteColor} />
            <path d="M -22 -62 C -18 -78 18 -78 22 -62 Z" fill="#151A22" />

            {/* Torso & Greatcoat */}
            <path
              d="M -18 -46 L 18 -46 L 24 35 L -24 35 Z"
              fill={silhouetteColor}
            />

            {/* Backpack / Webbing Field Gear */}
            <rect x="-26" y="-42" width="12" height="28" rx="3" fill="#151A22" />

            {/* Marching Legs with Phase Strides */}
            <line
              x1="-10"
              y1="35"
              x2={`calc(-10 + ${Math.sin(stridePhase) * 16})`}
              y2="90"
              stroke={silhouetteColor}
              strokeWidth="9"
              strokeLinecap="round"
            />
            <line
              x1="10"
              y1="35"
              x2={`calc(10 - ${Math.sin(stridePhase) * 16})`}
              y2="90"
              stroke={silhouetteColor}
              strokeWidth="9"
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </g>
  );
};
