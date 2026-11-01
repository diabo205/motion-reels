import React from 'react';
import { useCurrentFrame, interpolate, Img, staticFile } from 'remotion';
import { loadFont as loadCaveat } from '@remotion/google-fonts/Caveat';
import { loadFont as loadCourierPrime } from '@remotion/google-fonts/CourierPrime';

const caveat = loadCaveat();
const courier = loadCourierPrime();

export interface PaperCutoutCardProps {
  imagePath: string;
  caption?: string;
  subCaption?: string;
  top?: number;
  left?: string | number;
  width?: number;
  height?: number;
  rotateDeg?: number;
  framesPerBeat?: number;
  pulseIntensity?: number;
  tapeColor?: string;
}

/**
 * High-retention tactile Polaroid / archival photograph cutout card
 * Features off-white paper border, vertical torn masking tape tab, handwritten cursive caption, and beat-quantized pulse.
 */
export const PaperCutoutCard: React.FC<PaperCutoutCardProps> = ({
  imagePath,
  caption,
  subCaption,
  top = 920,
  left = '50%',
  width = 350,
  height = 410,
  rotateDeg = -3,
  framesPerBeat = 24, // 150 BPM at 60fps = 24 frames/beat
  pulseIntensity = 0.08,
  tapeColor = 'rgba(242, 236, 220, 0.82)',
}) => {
  const frame = useCurrentFrame();

  // Quantized beat pulse: punchy pop on beat 0, decaying quickly
  const beatFrame = frame % framesPerBeat;
  const pulse = interpolate(beatFrame, [0, 3, framesPerBeat], [1 + pulseIntensity, 1.0, 1.0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        transform: `translateX(-50%) scale(${pulse}) rotate(${rotateDeg}deg)`,
        transformOrigin: 'center center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 20,
      }}
    >
      {/* Tactile Polaroid Paper Container */}
      <div
        style={{
          backgroundColor: '#F4EFE6',
          padding: '16px 16px 26px 16px',
          borderRadius: 4,
          boxShadow: '0 22px 45px rgba(0, 0, 0, 0.82), 0 2px 6px rgba(0, 0, 0, 0.45)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          border: '1px solid rgba(20, 22, 25, 0.15)',
        }}
      >
        {/* Torn Vertical Masking Tape Tab on Top Edge (matching Reference 00:05 & 00:54) */}
        <div
          style={{
            position: 'absolute',
            top: -22,
            width: 38,
            height: 48,
            backgroundColor: tapeColor,
            boxShadow: '0 2px 5px rgba(0,0,0,0.28)',
            transform: 'rotate(-2deg)',
            clipPath:
              'polygon(4% 0%, 35% 4%, 68% 0%, 98% 3%, 100% 96%, 72% 100%, 34% 96%, 0% 100%)',
          }}
        />

        {/* Archival Photograph */}
        <Img
          src={staticFile(imagePath)}
          style={{
            width,
            height,
            objectFit: 'cover',
            borderRadius: 2,
            filter: 'contrast(1.12) brightness(1.03)',
            border: '1px solid rgba(0,0,0,0.18)',
          }}
        />

        {/* Handwritten Cursive Caption on Lower Paper Margin (matching "TechCrunch Disrupt, 2014") */}
        {caption && (
          <div
            style={{
              marginTop: 12,
              fontFamily: caveat.fontFamily,
              fontSize: 34,
              fontWeight: 700,
              color: '#181A1F',
              letterSpacing: '0.5px',
              lineHeight: 1.05,
            }}
          >
            {caption}
          </div>
        )}

        {subCaption && (
          <div
            style={{
              marginTop: 4,
              fontFamily: courier.fontFamily,
              fontSize: 18,
              fontWeight: 700,
              color: '#4A4E58',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
            }}
          >
            {subCaption}
          </div>
        )}
      </div>
    </div>
  );
};
