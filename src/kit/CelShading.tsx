import React from 'react';

/**
 * L1 Kit: Historical Cel-Shading & Multi-Tone Material Hierarchy
 * 
 * Eliminates flat monochrome voids and crude shapes by decomposing subjects
 * into four distinct physical value tiers:
 *   1. SHADOW: Deep ambient occlusion / shadowed under-facet
 *   2. MIDTONE: True material local color (wool, aircraft skin, masonry)
 *   3. HIGHLIGHT: Lightward facing facet or specular top plane
 *   4. RIM: High-contrast edge rim light separating subject from dark backdrop
 */

export interface CelMaterialTiers {
  shadow: string;
  midtone: string;
  highlight: string;
  rim: string;
  accent?: string;
}

export type HistoricalMaterialKey =
  | 'MILITARY_KHAKI'
  | 'RAF_SLATE_GREY'
  | 'SOVIET_OLIVE'
  | 'WARM_TERRACOTTA'
  | 'BLUED_STEEL'
  | 'BRASS_POLISHED'
  | 'CRIMSON_LEADERSHIP'
  | 'TACTICAL_NAVY'
  | 'WEATHERED_PINE'
  | 'AIRCRAFT_WHITE'
  | 'LEATHER_BROWN';

export const HISTORICAL_CEL_PALETTES: Record<HistoricalMaterialKey, CelMaterialTiers> = {
  MILITARY_KHAKI: {
    shadow: '#29251D',
    midtone: '#443E30',
    highlight: '#635B47',
    rim: '#A89F88',
    accent: '#F59E0B',
  },
  RAF_SLATE_GREY: {
    shadow: '#1E293B',
    midtone: '#334155',
    highlight: '#64748B',
    rim: '#94A3B8',
    accent: '#EF4444',
  },
  SOVIET_OLIVE: {
    shadow: '#142218',
    midtone: '#253B2B',
    highlight: '#3D5A44',
    rim: '#86EFAC',
    accent: '#DC2626',
  },
  WARM_TERRACOTTA: {
    shadow: '#431407',
    midtone: '#9A3412',
    highlight: '#EA580C',
    rim: '#FDBA74',
    accent: '#FDE047',
  },
  BLUED_STEEL: {
    shadow: '#090D14',
    midtone: '#1E2530',
    highlight: '#3B485A',
    rim: '#93C5FD',
    accent: '#38BDF8',
  },
  BRASS_POLISHED: {
    shadow: '#78350F',
    midtone: '#D97706',
    highlight: '#FBBF24',
    rim: '#FEF08A',
    accent: '#FFFFFF',
  },
  CRIMSON_LEADERSHIP: {
    shadow: '#450A0A',
    midtone: '#991B1B',
    highlight: '#DC2626',
    rim: '#FCA5A5',
    accent: '#FBBF24',
  },
  TACTICAL_NAVY: {
    shadow: '#020617',
    midtone: '#0F172A',
    highlight: '#1E293B',
    rim: '#38BDF8',
    accent: '#06B6D4',
  },
  WEATHERED_PINE: {
    shadow: '#271B12',
    midtone: '#4D3624',
    highlight: '#78553A',
    rim: '#C4A482',
    accent: '#E5D0BA',
  },
  AIRCRAFT_WHITE: {
    shadow: '#475569',
    midtone: '#94A3B8',
    highlight: '#E2E8F0',
    rim: '#FFFFFF',
    accent: '#EF4444',
  },
  LEATHER_BROWN: {
    shadow: '#1C1008',
    midtone: '#3D2314',
    highlight: '#663B22',
    rim: '#B8865C',
    accent: '#D4A373',
  },
};

/**
 * CelShadedFacet: Renders a faceted plane with explicit shading tier
 */
export const CelShadedFacet: React.FC<{
  d: string;
  material: HistoricalMaterialKey | CelMaterialTiers;
  tier: 'shadow' | 'midtone' | 'highlight' | 'rim';
  opacity?: number;
  stroke?: string;
  strokeWidth?: number;
}> = ({ d, material, tier, opacity = 1, stroke, strokeWidth = 0 }) => {
  const tiers = typeof material === 'string' ? HISTORICAL_CEL_PALETTES[material] : material;
  const fillColor = tiers ? tiers[tier] : '#334155';

  return (
    <path
      d={d}
      fill={fillColor}
      opacity={opacity}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
  );
};

/**
 * CelShadedBody: Groups an SVG subject into 3+ discrete tonal depth layers
 */
export interface CelShadedBodyProps {
  id?: string;
  material: HistoricalMaterialKey | CelMaterialTiers;
  shadowPaths: React.ReactNode;
  midtonePaths: React.ReactNode;
  highlightPaths: React.ReactNode;
  rimPaths?: React.ReactNode;
  accentPaths?: React.ReactNode;
  transform?: string;
  opacity?: number;
}

export const CelShadedBody: React.FC<CelShadedBodyProps> = ({
  id,
  material,
  shadowPaths,
  midtonePaths,
  highlightPaths,
  rimPaths,
  accentPaths,
  transform,
  opacity = 1,
}) => {
  const tiers = typeof material === 'string' ? HISTORICAL_CEL_PALETTES[material] : material;

  return (
    <g id={id} transform={transform} opacity={opacity}>
      {/* 1. Base Shadow Underlayer */}
      <g fill={tiers.shadow} className="cel-shadow">
        {shadowPaths}
      </g>

      {/* 2. Midtone Material Body */}
      <g fill={tiers.midtone} className="cel-midtone">
        {midtonePaths}
      </g>

      {/* 3. Lightward Highlights */}
      <g fill={tiers.highlight} className="cel-highlight">
        {highlightPaths}
      </g>

      {/* 4. High-Contrast Rim Highlights */}
      {rimPaths && (
        <g fill="none" stroke={tiers.rim} strokeWidth={2} strokeLinecap="round" className="cel-rim">
          {rimPaths}
        </g>
      )}

      {/* 5. Fine Accents & Markings */}
      {accentPaths && (
        <g fill={tiers.accent || '#F59E0B'} className="cel-accent">
          {accentPaths}
        </g>
      )}
    </g>
  );
};

/**
 * Directional Rim Light Filter / Defs
 */
export const CelRimFilter: React.FC<{ id?: string; color?: string; blur?: number }> = ({
  id = 'celRimGlow',
  color = '#38BDF8',
  blur = 6,
}) => {
  return (
    <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation={blur} floodColor={color} floodOpacity="0.6" />
    </filter>
  );
};
