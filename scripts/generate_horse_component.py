import re
import os

with open('projects/operation-cowboy-1945/plates/traced_silhouette.svg', 'r') as f:
    sil_content = f.read()
sil_d = re.search(r'd="([^"]+)"', sil_content).group(1)

with open('projects/operation-cowboy-1945/plates/traced_horse.svg', 'r') as f:
    horse_content = f.read()
horse_d = re.search(r'd="([^"]+)"', horse_content).group(1)

component_code = f'''import React from 'react';

/**
 * Authentic Lipizzaner Imperial Stallion Vector Asset
 * High-fidelity parametric linocut/woodcut silhouette re-engineered
 * from the user\\'s reference plate (554x554 viewBox).
 * 
 * Features:
 * - Layer 1: Pure White (#FFFFFF) body silhouette
 * - Layer 2: Graphic linocut shadow cuts, spiky flowing mane, muscle hatching, and hooves
 */

export const HORSE_SILHOUETTE_PATH = "{sil_d}";
export const HORSE_DETAIL_PATH = "{horse_d}";

interface LipizzanerHorseProps {{
  width?: number | string;
  height?: number | string;
  bodyColor?: string;
  lineColor?: string;
  flipX?: boolean;
  filter?: string;
  opacity?: number;
  style?: React.CSSProperties;
}}

export const LipizzanerHorse: React.FC<LipizzanerHorseProps> = ({{
  width = 554,
  height = 554,
  bodyColor = '#FFFFFF',
  lineColor = '#0F1012',
  flipX = false,
  filter,
  opacity = 1,
  style,
}}) => {{
  return (
    <svg
      viewBox="0 0 554 554"
      width={{width}}
      height={{height}}
      style={{{{
        transform: flipX ? 'scaleX(-1)' : undefined,
        transformOrigin: 'center center',
        filter,
        opacity,
        ...style,
      }}}}
    >
      <defs>
        {{/* Subtle Ivory coat gradient to emphasize muscular depth */}}
        <linearGradient id="horseIvoryGradient" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>

      {{/* Layer 1: Solid Equine Body Silhouette */}}
      <path
        d={{HORSE_SILHOUETTE_PATH}}
        fill={{bodyColor === '#FFFFFF' ? 'url(#horseIvoryGradient)' : bodyColor}}
        stroke="none"
      />

      {{/* Layer 2: Graphic Linocut Shadows, Mane, Tail Strands, and Muscle Hatching */}}
      <path
        d={{HORSE_DETAIL_PATH}}
        fill={{lineColor}}
        fillRule="evenodd"
        stroke="none"
      />
    </svg>
  );
}};
'''

with open('src/components/LipizzanerHorseAsset.tsx', 'w', encoding='utf-8') as f:
    f.write(component_code)

print('Generated src/components/LipizzanerHorseAsset.tsx! Total size:', len(component_code))
