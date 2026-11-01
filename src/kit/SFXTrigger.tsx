/**
 * L1 Shared Kit: SFXTrigger Audio Synchronization Primitive
 * Enforces:
 *   - Perceptual SFX Lead Bias: -2 frames (-33ms) audio-leading-video sync
 *   - Automatic BGM Ducking: -7.5 dB under impact slams
 *   - Somber Memorial Mode: Suppresses aggressive stamp slams on tragic mass casualty events
 */
import React from 'react';
import { Sequence, Audio, staticFile, interpolate } from 'remotion';
import { SFX_PERCEPTUAL_LEAD_FRAMES } from './tokens';

export interface SfxTriggerSpec {
  sfxFile: string;
  frameOffset: number;
  leadFrames?: number;
  volume?: number;
}

export interface SFXTriggerProps {
  trigger: SfxTriggerSpec;
  sceneStartFrame: number;
  sensitivity?: 'STANDARD' | 'SOMBER_MEMORIAL' | 'HIGH_SENSITIVITY';
}

export const SFXTrigger: React.FC<SFXTriggerProps> = ({
  trigger,
  sceneStartFrame,
  sensitivity = 'STANDARD',
}) => {
  // Suppress aggressive slams in somber memorial mode
  if (sensitivity === 'SOMBER_MEMORIAL' && trigger.sfxFile.includes('stamp_slam')) {
    return null;
  }

  const lead = trigger.leadFrames ?? SFX_PERCEPTUAL_LEAD_FRAMES;
  const triggerGlobalFrame = Math.max(0, sceneStartFrame + trigger.frameOffset - lead);
  const vol = trigger.volume ?? 0.44;

  return (
    <Sequence from={triggerGlobalFrame} durationInFrames={90}>
      <Audio src={staticFile(`audio/sfx/${trigger.sfxFile}`)} volume={vol} />
    </Sequence>
  );
};

export const SFXTriggerSequence: React.FC<{
  triggers?: SfxTriggerSpec[];
  sceneStartFrame: number;
  sensitivity?: 'STANDARD' | 'SOMBER_MEMORIAL' | 'HIGH_SENSITIVITY';
}> = ({ triggers, sceneStartFrame, sensitivity }) => {
  if (!triggers || triggers.length === 0) return null;

  return (
    <>
      {triggers.map((trigger, idx) => (
        <SFXTrigger
          key={`sfx_${sceneStartFrame}_${idx}`}
          trigger={trigger}
          sceneStartFrame={sceneStartFrame}
          sensitivity={sensitivity}
        />
      ))}
    </>
  );
};

/**
 * Computes ducked BGM volume with automatic -7.5 dB reduction (-42% amplitude) under impact slams
 */
export function computeDuckedBgmVolume(
  globalFrame: number,
  impactFrames: number[],
  baseVolume = 0.92
): number {
  let minDuckFactor = 1.0;

  for (const impFrame of impactFrames) {
    const dist = globalFrame - impFrame;
    if (dist >= -4 && dist <= 22) {
      let factor = 1.0;
      if (dist < 0) {
        factor = interpolate(dist, [-4, 0], [1.0, 0.42], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
      } else if (dist <= 6) {
        factor = 0.42;
      } else {
        factor = interpolate(dist, [6, 22], [0.42, 1.0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
      }
      if (factor < minDuckFactor) {
        minDuckFactor = factor;
      }
    }
  }

  return baseVolume * minDuckFactor;
}
