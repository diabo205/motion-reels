/**
 * L2 Composition Layer: ArchetypeScene
 * Pure template assembly that ONLY imports from L1 Kit (src/kit) and Remotion.
 * Contains ZERO project-specific facts, casualty counts, or business logic.
 */
import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import {
  AtmosphericBackground,
  GlyphLayer,
  SafeZoneContainer,
  SFXTriggerSequence,
  SfxTriggerSpec,
  PaletteTheme,
  CameraMovementType,
} from '../kit';

export interface SceneTextLayerProps {
  text: string;
  triggerFrameOffset: number;
  tier: 'DISPLAY_HERO' | 'PRIMARY_STATEMENT' | 'SECONDARY_ACCENT' | 'SUB_CAPTION';
  colorToken?: 'PURE_WHITE' | 'ALERT_RED' | 'MEDAL_GOLD' | 'TACTICAL_CYAN' | 'MUTED_CREAM' | 'STARK_WHITE';
  animation?: 'HARD_POP' | 'SCALE_SLAM' | 'TYPEWRITER' | 'STAMP_THUD' | 'BLUR_TO_SHARP' | 'SLOW_REVEAL';
  rollingCounter?: boolean;
}

export interface ArchetypeSceneProps {
  sceneId: string;
  startFrame: number;
  durationFrames: number;
  archetype: string;
  camera: {
    movement: CameraMovementType;
    intensity: number;
  };
  textLayers: SceneTextLayerProps[];
  hudVisible?: boolean;
  headerContext?: string;
  flagEmoji?: string;
  title?: string;
  palette?: PaletteTheme;
  particleEmitter?: 'SNOW' | 'ASH' | 'RAIN' | 'DUST' | 'NONE';
  fontFamily?: 'Montserrat' | 'Inter';
  sensitivity?: 'STANDARD' | 'SOMBER_MEMORIAL' | 'HIGH_SENSITIVITY';
  quoteAttribution?: string;
  sfxTriggers?: SfxTriggerSpec[];
  isFinalScene?: boolean;
  ctaText?: string;
  children?: React.ReactNode;
}

export const ArchetypeScene: React.FC<ArchetypeSceneProps> = ({
  startFrame,
  durationFrames,
  archetype,
  camera,
  textLayers,
  hudVisible = true,
  headerContext,
  flagEmoji,
  title,
  palette = 'POLAR_MARITIME',
  particleEmitter = 'NONE',
  fontFamily = 'Montserrat',
  sensitivity = 'STANDARD',
  quoteAttribution,
  sfxTriggers,
  isFinalScene = false,
  ctaText,
  children,
}) => {
  const frame = useCurrentFrame();
  const globalFrame = startFrame + frame;

  // 1. Camera Movement Calculations
  let transform = '';
  const { movement, intensity } = camera;
  const loopEase = isFinalScene
    ? interpolate(
        frame,
        [Math.max(0, durationFrames - 12), durationFrames],
        [1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      )
    : 1;

  if (movement === 'IMPACT_SHAKE' && sensitivity === 'STANDARD') {
    const hitOffset = textLayers?.[1]?.triggerFrameOffset ?? 0;
    let decay = 0;
    if (hitOffset > 0) {
      const distFromHit = frame - hitOffset;
      if (distFromHit < 0) {
        decay = interpolate(frame, [0, hitOffset], [0.12, 0.35], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
      } else {
        decay = interpolate(distFromHit, [0, 36], [1.0, 0], {
          extrapolateRight: 'clamp',
        });
      }
    } else {
      decay = interpolate(frame, [0, 36], [1, 0], { extrapolateRight: 'clamp' });
    }
    const shakeX = Math.sin(frame * 2.1) * 18 * intensity * decay * loopEase;
    const shakeY = Math.cos(frame * 2.7) * 14 * intensity * decay * loopEase;
    transform = `translate(${shakeX}px, ${shakeY}px)`;
  } else if (movement === 'PARALLAX_PAN_RIGHT') {
    const panX = interpolate(frame, [0, durationFrames], [-28, 28], { extrapolateRight: 'clamp' }) * intensity * loopEase;
    transform = `translateX(${panX}px)`;
  } else if (movement === 'CRANE_SWEEP_UP') {
    const panY = interpolate(frame, [0, durationFrames], [24, -24], { extrapolateRight: 'clamp' }) * intensity * loopEase;
    transform = `translateY(${panY}px)`;
  } else if (movement === 'DUTCH_TILT') {
    const deg = interpolate(frame, [0, durationFrames], [-1.2, 1.2], { extrapolateRight: 'clamp' }) * intensity * loopEase;
    const scale = 1 + 0.03 * intensity * loopEase;
    transform = `scale(${scale}) rotate(${deg}deg)`;
  } else if (movement === 'SLOW_PUSH_IN') {
    const scale =
      1 +
      interpolate(frame, [0, durationFrames], [0, 0.06 * intensity], { extrapolateRight: 'clamp' }) * loopEase;
    transform = `scale(${scale})`;
  }

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* L1 Primitives: Locked Canvas Palette & Persistent Particle Emitter */}
      <AtmosphericBackground
        theme={palette as any}
        stageStyle="LOCKED_CANVAS"
        particleEmitter={particleEmitter}
        globalFrame={globalFrame}
      />

      {/* L1 Primitives: Enforce 9:16 Mobile Platform Safe Zone Container */}
      <SafeZoneContainer profile="CONSERVATIVE_UNION">
        {/* Artwork Zone (y: 864..1498px) with Camera Transform */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform,
            transformOrigin: 'center center',
            zIndex: 10,
          }}
        >
          {children}
        </div>

        {/* Text Zone (y: 346..806px) via GlyphLayer */}
        <GlyphLayer
          layers={textLayers}
          fontFamily={fontFamily}
          palette={palette}
          sensitivity={sensitivity}
          quoteAttribution={quoteAttribution}
          contextTag={
            hudVisible && headerContext
              ? {
                  flagEmoji,
                  title,
                  headerContext,
                }
              : undefined
          }
        />

        {/* Final CTA Slot if present */}
        {isFinalScene && ctaText && frame >= Math.max(0, durationFrames - 75) && (
          <SafeZoneContainer.CtaSlot>
            <div
              style={{
                padding: '8px 36px',
                backgroundColor: 'rgba(10, 17, 24, 0.92)',
                border: '1px solid rgba(244, 247, 250, 0.35)',
                borderRadius: 4,
                fontFamily: fontFamily === 'Inter' ? 'Inter' : 'Montserrat',
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: '0.05em',
                color: '#F4F7FA',
                textTransform: 'uppercase',
                opacity: interpolate(
                  frame,
                  [Math.max(0, durationFrames - 75), Math.max(1, durationFrames - 60)],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                ),
              }}
            >
              {ctaText}
            </div>
          </SafeZoneContainer.CtaSlot>
        )}
      </SafeZoneContainer>

      {/* L1 Primitives: SFX Foley Audio Sequence */}
      <SFXTriggerSequence
        triggers={sfxTriggers}
        sceneStartFrame={startFrame}
        sensitivity={sensitivity}
      />
    </AbsoluteFill>
  );
};
