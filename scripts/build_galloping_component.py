import json

with open('projects/operation-cowboy-1945/plates/gallop_poses_data.json', 'r') as f:
    poses = json.load(f)

# Read the previous static horse reference as well so we preserve backward compatibility
with open('projects/operation-cowboy-1945/plates/traced_silhouette.svg', 'r') as f:
    sil_static = f.read()
import re
sil_static_d = re.search(r'd="([^"]+)"', sil_static).group(1)

with open('projects/operation-cowboy-1945/plates/traced_horse.svg', 'r') as f:
    horse_static = f.read()
horse_static_d = re.search(r'd="([^"]+)"', horse_static).group(1)

target_x = 270.0
target_y = 255.0

# Calculated offsets for center-of-mass registration:
offsets = [
    (target_x - 287.7, target_y - 249.5), # Pose 1: -17.7, +5.5
    (target_x - 243.5, target_y - 267.9), # Pose 2: +26.5, -12.9
    (target_x - 315.3, target_y - 236.9), # Pose 3: -45.3, +18.1
    (target_x - 246.9, target_y - 249.3), # Pose 4: +23.1, +5.7
]

code = '''import React from 'react';
import { useCurrentFrame } from 'remotion';

/**
 * Authentic Lipizzaner Imperial Equine Vector Rig
 * Incorporates:
 * 1. The user's primary linocut vector reference (Static Baroque Trot / Hero Poise)
 * 2. The user's 4-pose gallop cycle reference (Dynamic Full-Speed Gallop Animation)
 */

export const STATIC_HORSE_SILHOUETTE_PATH = "''' + sil_static_d + '''";
export const STATIC_HORSE_DETAIL_PATH = "''' + horse_static_d + '''";

export interface GallopPoseData {
  silPath: string;
  darkPath: string;
  dx: number;
  dy: number;
  naturalBounce: number; // Vertical bob in px
  naturalTilt: number;   // Pitch angle in deg
}

export const GALLOP_POSES: GallopPoseData[] = [
'''

bounces = [2, -4, 6, -8]
tilts = [1, -2, -1, 3]

for idx, p in enumerate(poses):
    sil_d = p['silD']
    dark_d = p['darkD']
    dx, dy = offsets[idx]
    bnc = bounces[idx]
    tlt = tilts[idx]
    code += f'''  {{
    silPath: "{sil_d}",
    darkPath: "{dark_d}",
    dx: {dx:.2f},
    dy: {dy:.2f},
    naturalBounce: {bnc},
    naturalTilt: {tlt},
  }},\n'''

code += '''];

export interface LipizzanerHorseProps {
  width?: number | string;
  height?: number | string;
  bodyColor?: string;
  lineColor?: string;
  flipX?: boolean;
  filter?: string;
  opacity?: number;
  style?: React.CSSProperties;
  /** If true, cycles through the 4-frame gallop cycle */
  animated?: boolean;
  /** Duration of 1 full gallop stride in frames (default: 24 frames = ~2.5 strides/sec at 60fps) */
  strideDurationFrames?: number;
  /** Phase offset for staggered herds (default: 0) */
  frameOffset?: number;
  /** Optional manual pose override (1 to 4) */
  poseOverride?: number;
}

export const LipizzanerHorse: React.FC<LipizzanerHorseProps> = ({
  width = 554,
  height = 554,
  bodyColor = '#FFFFFF',
  lineColor = '#0F1012',
  flipX = false,
  filter,
  opacity = 1,
  style,
  animated = false,
  strideDurationFrames = 24,
  frameOffset = 0,
  poseOverride,
}) => {
  const currentFrame = useCurrentFrame();

  if (animated || poseOverride !== undefined) {
    // 4-Frame Gallop Cycle Animation
    let poseIndex = 0;
    if (poseOverride !== undefined) {
      poseIndex = Math.max(0, Math.min(3, poseOverride - 1));
    } else {
      const cycleFrame = (currentFrame + frameOffset) % strideDurationFrames;
      // Stride sequence: Pose 1 (Landing) -> Pose 2 (Gather) -> Pose 3 (Launch) -> Pose 4 (Extension)
      poseIndex = Math.floor((cycleFrame / strideDurationFrames) * 4) % 4;
    }

    const pose = GALLOP_POSES[poseIndex];

    return (
      <svg
        viewBox="0 0 512 417"
        width={width}
        height={height}
        style={{
          transform: `${flipX ? 'scaleX(-1)' : ''} translateY(${pose.naturalBounce}px) rotate(${pose.naturalTilt}deg)`,
          transformOrigin: 'center center',
          filter,
          opacity,
          ...style,
        }}
      >
        <defs>
          <linearGradient id={`gallopIvoryGrad_${poseIndex}`} x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
        </defs>

        <g transform={`translate(${pose.dx}, ${pose.dy})`}>
          {/* Layer 1: Solid Ivory Equine Body Silhouette */}
          <path
            d={pose.silPath}
            fill={bodyColor === '#FFFFFF' ? `url(#gallopIvoryGrad_${poseIndex})` : bodyColor}
            stroke="none"
          />

          {/* Layer 2: Graphic Linocut Shadows, Mane, Tail Strands, and Muscle Hatching */}
          <path
            d={pose.darkPath}
            fill={lineColor}
            fillRule="evenodd"
            stroke="none"
          />
        </g>
      </svg>
    );
  }

  // Default: Primary Static Linocut Hero Trotter (from previous reference)
  return (
    <svg
      viewBox="0 0 554 554"
      width={width}
      height={height}
      style={{
        transform: flipX ? 'scaleX(-1)' : undefined,
        transformOrigin: 'center center',
        filter,
        opacity,
        ...style,
      }}
    >
      <defs>
        <linearGradient id="horseIvoryGradientStatic" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>

      {/* Layer 1: Solid Equine Body Silhouette */}
      <path
        d={STATIC_HORSE_SILHOUETTE_PATH}
        fill={bodyColor === '#FFFFFF' ? 'url(#horseIvoryGradientStatic)' : bodyColor}
        stroke="none"
      />

      {/* Layer 2: Graphic Linocut Shadows, Mane, Tail Strands, and Muscle Hatching */}
      <path
        d={STATIC_HORSE_DETAIL_PATH}
        fill={lineColor}
        fillRule="evenodd"
        stroke="none"
      />
    </svg>
  );
};
'''

with open('src/components/LipizzanerHorseAsset.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print('Updated src/components/LipizzanerHorseAsset.tsx with 4 gallop poses + static trotter! Total size:', len(code))
