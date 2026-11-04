import React, { useEffect, useState } from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
  delayRender,
  continueRender,
} from 'remotion';
import { KineticTextStack, TextLayerSpec } from './components/KineticTextStack';
import { PersistentHudBadge } from './components/PersistentHudBadge';
import { SceneVectorAsset } from './components/GeneratedSilhouettes';
import { AtmosphericBackground, PaperStageStyle, SFX_PERCEPTUAL_LEAD_FRAMES, SafeZoneContainer } from './kit';
import { ArchetypeScene } from './scenes';
import { loadFont as loadMontserrat } from '@remotion/google-fonts/Montserrat';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';

// Preload approved heavy geometric sans-serif fonts (pinned to 800/900 weights & latin subset)
const montserrat = loadMontserrat('normal', { weights: ['800', '900'], subsets: ['latin'] });
const inter = loadInter('normal', { weights: ['800', '900'], subsets: ['latin'] });

export interface SfxTriggerSpec {
  sfxFile: string;
  frameOffset: number;
  leadFrames?: number;
}

export interface ClaimCitationSpec {
  text: string;
  source: string;
  url?: string;
  verified?: boolean;
}

export interface ReelScene {
  sceneId: string;
  startFrame: number;
  durationFrames: number;
  archetype: string;
  hudVisible: boolean;
  headerContext?: string;
  sensitivity?: 'STANDARD' | 'SOMBER_MEMORIAL' | 'HIGH_SENSITIVITY';
  claim?: ClaimCitationSpec;
  camera: {
    movement:
      | 'STATIC'
      | 'SLOW_PUSH_IN'
      | 'PARALLAX_PAN_RIGHT'
      | 'CRANE_SWEEP_UP'
      | 'DUTCH_TILT'
      | 'IMPACT_SHAKE';
    intensity: number;
  };
  textLayers: TextLayerSpec[];
  visualPayload: {
    skyGradient?: string[];
    stageStyle?: PaperStageStyle;
    svgForegroundAsset: string;
    archetypeVariant?: string;
    quoteAttribution?: string;
    atmosphericPlatePrompt?: string;
    counterConfig?: {
      label: string;
      startValue: number;
      endValue: number;
    };
  };
  sfxTriggers?: SfxTriggerSpec[];
}

export interface ReelTimeline {
  meta: {
    title: string;
    flagEmoji: string;
    fps: number;
    width: number;
    height: number;
    bpm: number;
    bgmFile?: string;
    bgmStartFrom?: number;
    bgmLicense?: {
      source: string;
      licenseType: string;
      clearanceId: string;
      attribution?: string;
    };
    palette?: 'POLAR_MARITIME' | 'CONFLICT_CRISIS' | 'ESPIONAGE_DOSSIER';
    particleEmitter?: 'SNOW' | 'ASH' | 'RAIN' | 'DUST' | 'NONE';
    fontFamily?: 'Montserrat' | 'Inter';
    styleMode?: 'DOCUMENTARY_SANS' | 'TACTILE_TORN_PAPER';
    safeZoneProfile?: 'CONSERVATIVE_UNION' | 'YOUTUBE_SHORTS' | 'TIKTOK' | 'INSTAGRAM_REELS';
    sensitivity?: 'STANDARD' | 'SOMBER_MEMORIAL' | 'HIGH_SENSITIVITY';
    loopSeamless?: boolean;
    ctaConfig?: {
      text: string;
      subtext?: string;
    };
  };
  scenes: ReelScene[];
}

const resolveStageStyle = (scene: ReelScene): PaperStageStyle => {
  if (scene.visualPayload.stageStyle) {
    return scene.visualPayload.stageStyle;
  }
  switch (scene.archetype) {
    case 'FLAG_BANNER':
    case 'SPOTLIGHT_EMBLEM':
      return 'SUNBURST_HERO';
    case 'BLUEPRINT_DIAGRAM':
    case 'TACTICAL_MAP':
    case 'VECTOR_MAP':
      return 'GRAPH_GRID';
    case 'DOCUMENT_CARD':
    case 'QUOTE_CARD':
      return 'WOOD_PANEL';
    case 'TELEMETRY_COUNTER':
    case 'CROWD_TALLY':
      return 'NIGHT_FELT';
    case 'SILHOUETTE_ACTION':
    default:
      return 'PAPER_EXTERIOR';
  }
};

function computeDuckedBgmVolume(globalFrame: number, scenes: ReelScene[], baseVolume = 0.92): number {
  let minDuckFactor = 1.0;

  for (const scene of scenes) {
    const impactFrames: number[] = [];
    if (scene.textLayers && scene.textLayers[1]) {
      impactFrames.push(scene.startFrame + scene.textLayers[1].triggerFrameOffset);
    }
    if (scene.sfxTriggers) {
      for (const trig of scene.sfxTriggers) {
        if (
          trig.sfxFile.includes('boom') ||
          trig.sfxFile.includes('slam') ||
          trig.sfxFile.includes('shell') ||
          trig.sfxFile.includes('crack')
        ) {
          impactFrames.push(scene.startFrame + trig.frameOffset);
        }
      }
    }

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
  }

  return baseVolume * minDuckFactor;
}

const SceneItem: React.FC<{
  scene: ReelScene;
  meta: ReelTimeline['meta'];
  isFinalScene: boolean;
  renderLayer: 'FULL' | 'BASE_ONLY' | 'OVERLAY_ONLY';
}> = ({ scene, meta, isFinalScene, renderLayer }) => {
  const frame = useCurrentFrame();
  const globalFrame = scene.startFrame + frame;
  const effectiveSensitivity = scene.sensitivity || meta.sensitivity || 'STANDARD';

  let transform = '';
  const movement = scene.camera?.movement || 'STATIC';
  const intensity = typeof scene.camera?.intensity === 'number' && !isNaN(scene.camera.intensity) ? scene.camera.intensity : 1.0;

  // Mid-scene payoff hit impulse & dead-hold prevention
  const hitOffset = scene.textLayers?.[1]?.triggerFrameOffset ?? 30;
  const isPostPayoff = frame >= hitOffset;
  const payoffImpulse =
    hitOffset > 0 && frame >= hitOffset && frame - hitOffset <= 12
      ? interpolate(frame - hitOffset, [0, 12], [1.035, 1.0], { extrapolateRight: 'clamp' })
      : 1.0;
  const latePacing =
    isPostPayoff && frame > hitOffset + 45
      ? interpolate(frame, [hitOffset + 45, scene.durationFrames], [1.0, 1.25], { extrapolateRight: 'clamp' })
      : 1.0;

  const loopEase =
    isFinalScene && meta.loopSeamless !== false
      ? interpolate(
          frame,
          [Math.max(0, scene.durationFrames - 12), scene.durationFrames],
          [1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
      : 1;

  if (movement === 'IMPACT_SHAKE' && effectiveSensitivity === 'STANDARD') {
    // Motivated Transient Impact Shake:
    // If the scene has a payoff slam or fracture hit offset > 0 (e.g. STRUCTURAL_FRACTURE hits),
    // build pre-rumble tension leading up to the hit, then peak with explosive decay on the transient frame
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
    transform = `translate(${shakeX}px, ${shakeY}px) scale(${payoffImpulse})`;
  } else if (movement === 'PARALLAX_PAN_RIGHT') {
    const panX = interpolate(frame, [0, scene.durationFrames], [-28, 28], { extrapolateRight: 'clamp' }) * intensity * loopEase * latePacing;
    transform = `translateX(${panX}px) scale(${payoffImpulse})`;
  } else if (movement === 'CRANE_SWEEP_UP') {
    const panY = interpolate(frame, [0, scene.durationFrames], [24, -24], { extrapolateRight: 'clamp' }) * intensity * loopEase * latePacing;
    transform = `translateY(${panY}px) scale(${payoffImpulse})`;
  } else if (movement === 'DUTCH_TILT') {
    const deg = interpolate(frame, [0, scene.durationFrames], [-1.2, 1.2], { extrapolateRight: 'clamp' }) * intensity * loopEase;
    const scale = (1 + 0.03 * intensity * loopEase) * payoffImpulse;
    transform = `scale(${scale}) rotate(${deg}deg)`;
  } else if (movement === 'SLOW_PUSH_IN') {
    const scale =
      (1 +
      interpolate(frame, [0, scene.durationFrames], [0, 0.06 * intensity], { extrapolateRight: 'clamp' }) * loopEase * latePacing) * payoffImpulse;
    transform = `scale(${scale})`;
  } else {
    transform = `scale(${payoffImpulse})`;
  }

  const stageStyle = resolveStageStyle(scene);
  const isMapOrBlueprint =
    scene.archetype === 'TACTICAL_MAP' ||
    scene.archetype === 'VECTOR_MAP' ||
    scene.archetype === 'BLUEPRINT_DIAGRAM' ||
    scene.archetype === 'TELEMETRY_COUNTER' ||
    scene.archetype === 'DOCUMENT_CARD' ||
    scene.archetype === 'QUOTE_CARD';

  const resolvedStyleMode = meta.styleMode || (meta.palette ? 'DOCUMENTARY_SANS' : 'TACTILE_TORN_PAPER');
  const activeFontFamily =
    meta.fontFamily === 'Inter' ? inter.fontFamily : montserrat.fontFamily;

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* 1. Atmospheric Staging & Global-Frame Seeded Persistent Particle Emitter */}
      <AtmosphericBackground
        skyGradient={scene.visualPayload.skyGradient}
        theme={meta.palette as any}
        stageStyle={scene.visualPayload.stageStyle || stageStyle}
        particleEmitter={
          renderLayer === 'BASE_ONLY' ? 'NONE' : meta.particleEmitter
        }
        showDunes={
          scene.visualPayload.stageStyle === 'PAPER_EXTERIOR' ||
          (!isMapOrBlueprint && stageStyle === 'PAPER_EXTERIOR')
        }
        showSmoke={!isMapOrBlueprint && renderLayer !== 'OVERLAY_ONLY'}
        globalFrame={globalFrame}
      />

      {/* 2. Camera-Transformed Scene Visuals */}
      {renderLayer !== 'OVERLAY_ONLY' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform,
            transformOrigin: 'center center',
            zIndex: 10,
          }}
        >
          <SceneVectorAsset
            assetId={scene.visualPayload.svgForegroundAsset}
            durationFrames={scene.durationFrames}
          />
        </div>
      )}

      {/* 3. Selective Context Tag */}
      {renderLayer !== 'OVERLAY_ONLY' && scene.hudVisible && (
        <PersistentHudBadge
          flagEmoji={meta.flagEmoji}
          title={meta.title}
          headerContext={scene.headerContext}
          styleMode={resolvedStyleMode}
          fontFamily={meta.fontFamily}
        />
      )}

      {/* 4. Beat-Quantized Typography Stack */}
      {renderLayer !== 'OVERLAY_ONLY' && (
        <KineticTextStack
          layers={scene.textLayers}
          fontFamily={meta.fontFamily}
          styleMode={resolvedStyleMode}
          sceneStartFrame={scene.startFrame}
          palette={meta.palette}
          sensitivity={effectiveSensitivity}
          safeZoneProfile={meta.safeZoneProfile}
          archetype={scene.archetype}
          quoteAttribution={scene.visualPayload.quoteAttribution}
        />
      )}

      {/* 5. Optional Safe-Zone End-Card / Loop CTA on Final Scene */}
      {renderLayer !== 'OVERLAY_ONLY' &&
        isFinalScene &&
        !scene.visualPayload?.quoteAttribution &&
        meta.ctaConfig?.text &&
        frame >= Math.max(0, scene.durationFrames - 75) && (
          <div
            style={{
              position: 'absolute',
              top: 748,
              left: 64,
              right: 162,
              display: 'flex',
              justifyContent: 'center',
              zIndex: 30,
              opacity: interpolate(
                frame,
                [Math.max(0, scene.durationFrames - 75), Math.max(1, scene.durationFrames - 60)],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              ),
            }}
          >
            <div
              style={{
                padding: '8px 36px',
                backgroundColor: 'rgba(10, 17, 24, 0.92)',
                border: '1px solid rgba(244, 247, 250, 0.35)',
                borderRadius: 4,
                fontFamily: activeFontFamily,
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: '0.05em',
                color: '#F4F7FA',
                textTransform: 'uppercase',
              }}
            >
              {meta.ctaConfig.text}
            </div>
          </div>
        )}
    </AbsoluteFill>
  );
};

export const HistoricalReel: React.FC<{
  timeline: ReelTimeline;
  renderLayer?: 'FULL' | 'BASE_ONLY' | 'OVERLAY_ONLY';
}> = ({ timeline, renderLayer = 'FULL' }) => {
  const [handle] = useState(() => delayRender());

  useEffect(() => {
    document.fonts.ready.then(() => {
      continueRender(handle);
    });
  }, [handle]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#090D12' }}>
      {/* Master Soundtrack with Automatic Impact Ducking (-7.5 dB under payoff slams) */}
      <Audio
        src={staticFile(timeline.meta.bgmFile || 'audio/bgm.mp3')}
        startFrom={timeline.meta.bgmStartFrom ?? 47}
        volume={(f) => computeDuckedBgmVolume(f, timeline.scenes, 0.92)}
      />

      {/* Synchronized Foley & Cinematic Sound Effects with Perceptual Lead Bias (-2 frames) */}
      {timeline.scenes.map((scene) => {
        const effectiveSensitivity =
          scene.sensitivity || timeline.meta.sensitivity || 'STANDARD';
        return scene.sfxTriggers?.map((trigger, sIdx) => {
          if (
            effectiveSensitivity === 'SOMBER_MEMORIAL' &&
            trigger.sfxFile.includes('stamp_slam')
          ) {
            return null;
          }
          const lead = trigger.leadFrames ?? SFX_PERCEPTUAL_LEAD_FRAMES;
          const triggerGlobalFrame = Math.max(
            0,
            scene.startFrame + trigger.frameOffset - lead
          );
          return (
            <Sequence
              key={`${scene.sceneId}_sfx_${sIdx}`}
              from={triggerGlobalFrame}
              durationInFrames={90}
            >
              <Audio src={staticFile(`audio/sfx/${trigger.sfxFile}`)} volume={0.44} />
            </Sequence>
          );
        });
      })}

      {/* Beat-Quantized Scene Sequences */}
      {timeline.scenes.map((scene, idx) => (
        <Sequence
          key={scene.sceneId}
          from={scene.startFrame}
          durationInFrames={scene.durationFrames}
        >
          <SceneItem
            scene={scene}
            meta={timeline.meta}
            isFinalScene={idx === timeline.scenes.length - 1}
            renderLayer={renderLayer}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
