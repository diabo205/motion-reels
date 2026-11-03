/**
 * L1 Shared Kit: Design Tokens & Framework Constants
 * Immutable tokens defining the canvas, safe zones, typography floors, and palettes.
 */
import { Easing, interpolate } from 'remotion';
import pipelineConstants from '../../config/pipeline_constants.json';
import safeZonesConfig from '../../config/safe_zones.json';

export const PIPELINE_CONSTANTS = pipelineConstants;
export const SAFE_ZONES_CONFIG = safeZonesConfig;

// Dimensions & Framerate (Canonical 9:16 1080x1920 @ 60 FPS)
export const FPS = pipelineConstants.FPS || 60;
export const CANVAS_WIDTH = pipelineConstants.WIDTH || 1080;
export const CANVAS_HEIGHT = pipelineConstants.HEIGHT || 1920;

// Duration & Pacing Windows
export const MIN_FRAMES = pipelineConstants.MIN_FRAMES || 2700;
export const MAX_FRAMES = pipelineConstants.MAX_FRAMES || 3500;
export const MIN_SCENE_FRAMES = pipelineConstants.MIN_SCENE_FRAMES || 84;
export const TARGET_MAX_SCENE_FRAMES = pipelineConstants.TARGET_MAX_SCENE_FRAMES || 132;
export const MAX_SCENE_FRAMES = pipelineConstants.MAX_SCENE_FRAMES || 150;
export const PAYOFF_BEAT_WINDOW_FRAMES = pipelineConstants.PAYOFF_BEAT_WINDOW_FRAMES || [18, 45];

// Audio & Transient Sync
export const SFX_PERCEPTUAL_LEAD_FRAMES = pipelineConstants.SFX_PERCEPTUAL_LEAD_FRAMES || 2;
export const BGM_DUCK_DB = pipelineConstants.BGM_DUCK_DB || -7.5;
export const LOUDNESS_TARGET_LUFS = pipelineConstants.LOUDNESS_TARGET_LUFS || -14.0;
export const LOUDNESS_TRUE_PEAK_DBTP = pipelineConstants.LOUDNESS_TRUE_PEAK_DBTP || -1.0;

// Typography Constraints (Zero-Clutter)
export const ALL_CAPS_TRACKING_EM = pipelineConstants.ALL_CAPS_TRACKING_EM || 0.04;
export const MIN_SETUP_FONT_PX = pipelineConstants.MIN_SETUP_FONT_PX || 64;
export const MIN_PAYOFF_FONT_PX = pipelineConstants.MIN_PAYOFF_FONT_PX || 76;
export const MAX_LINES_PER_LAYER = pipelineConstants.MAX_LINES_PER_LAYER || 2;
export const MAX_LINE_CHARS = pipelineConstants.MAX_LINE_CHARS || 40;
export const WORD_BUDGET_MIN = pipelineConstants.WORD_BUDGET_MIN || 3;
export const WORD_BUDGET_MAX = pipelineConstants.WORD_BUDGET_MAX || 7;

// Canonical 7 Archetypes
export const CORE_ARCHETYPES = [
  'LONE_LEADER',
  'CROWD_TALLY',
  'VEHICLE_IN_TRANSIT',
  'STRUCTURAL_FRACTURE',
  'VECTOR_MAP',
  'SPLIT_CONFRONTATION',
  'QUOTE_CARD',
] as const;

export type ArchetypeType = (typeof CORE_ARCHETYPES)[number] | string;

// Camera Movements
export const ALLOWED_CAMERA_MOVEMENTS = [
  'STATIC',
  'SLOW_PUSH_IN',
  'PARALLAX_PAN_RIGHT',
  'CRANE_SWEEP_UP',
  'DUTCH_TILT',
  'IMPACT_SHAKE',
] as const;

export type CameraMovementType = (typeof ALLOWED_CAMERA_MOVEMENTS)[number];

// Locked Canvas Palettes
export const PALETTES = pipelineConstants.PALETTES;
export type PaletteTheme = keyof typeof pipelineConstants.PALETTES | 'LEGACY';

// Safe Zone Profiles
export type SafeZoneProfileName = keyof typeof safeZonesConfig.profiles;

export function getSafeZoneProfile(profileName?: string) {
  const key = (profileName && profileName in safeZonesConfig.profiles
    ? profileName
    : safeZonesConfig.defaultProfile) as SafeZoneProfileName;
  return safeZonesConfig.profiles[key];
}

// ---------------------------------------------------------------------------
// Motion Presets & Camera Helpers (rules/motion.md)
// ---------------------------------------------------------------------------

const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** Remotion `spring({ config })` values. */
export const SPRING_PRESETS = {
  IMPACT_HIT: { damping: 10, stiffness: 220, mass: 0.5 },
  SETTLE: { damping: 20, stiffness: 120, mass: 0.8 },
  STAGGER_IN: { damping: 18, stiffness: 140, mass: 0.7 },
} as const;

export const MOTION = {
  /** IMPACT_HIT drives scale from `scaleFrom` to `scaleTo` with visible overshoot. */
  impactHit: { scaleFrom: 1.0, scaleTo: 1.08 },
  /** STAGGER_IN: frames between elements (4-6), entry offset in px (24-40). */
  staggerIn: { framesBetweenElements: 5, entryOffsetPx: 32 },
  /** DRIFT: amplitude in px (6-14), period in frames (120-240). */
  drift: { amplitudePx: 10, periodFrames: 180 },
  /** Pullback before a hit: frames (3-6), percent (3-5). */
  anticipation: { frames: 4, pullbackPct: 4 },
  /** A secondary layer must move at least this far between 25% and 75% of a scene. */
  minSecondaryDisplacementPx: 4,
} as const;

export const CAMERA_PRESETS = {
  STATIC: {},
  SLOW_PUSH_IN: { scaleFrom: 1.0, scaleTo: 1.06 },
  /** Travel in px (80-160). Layer factors scale the travel per depth layer. */
  PARALLAX_PAN_RIGHT: { travelPx: 120, layerFactors: { far: 0.2, mid: 0.5, near: 1.0 } },
  /** translateY in px (120-240). */
  CRANE_SWEEP_UP: { translateYPx: 180, scaleFrom: 1.0, scaleTo: 1.03 },
  /** Final rotation in degrees (2-3). */
  DUTCH_TILT: { rotateDegTo: 2.5 },
  /** Position only. Decays exponentially over `decayFrames`. */
  IMPACT_SHAKE: { amplitudePx: 14, decayFrames: 18 },
} as const;

export type ParallaxLayer = keyof typeof CAMERA_PRESETS.PARALLAX_PAN_RIGHT.layerFactors;

/** DRIFT: continuous sine offset. Use a different `layerIndex` per layer so layers do not move in sync. */
export const driftOffsetPx = (
  frame: number,
  layerIndex: number,
  cfg: { amplitudePx: number; periodFrames: number } = MOTION.drift,
): number => Math.sin((frame / cfg.periodFrames) * 2 * Math.PI + layerIndex * 1.7) * cfg.amplitudePx;

/** SLOW_PUSH_IN scale across a scene. */
export const pushInScale = (frame: number, sceneDurationFrames: number): number =>
  interpolate(
    frame,
    [0, sceneDurationFrames],
    [CAMERA_PRESETS.SLOW_PUSH_IN.scaleFrom, CAMERA_PRESETS.SLOW_PUSH_IN.scaleTo],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) },
  );

/** PARALLAX_PAN_RIGHT: horizontal offset (px) for one depth layer. Negative values move the layer left. */
export const parallaxOffsetPx = (frame: number, sceneDurationFrames: number, layer: ParallaxLayer): number => {
  const { travelPx, layerFactors } = CAMERA_PRESETS.PARALLAX_PAN_RIGHT;
  return interpolate(frame, [0, sceneDurationFrames], [0, -travelPx * layerFactors[layer]], CLAMP);
};

/** CRANE_SWEEP_UP: vertical offset (px, negative is up) and scale. */
export const craneSweep = (frame: number, sceneDurationFrames: number): { y: number; scale: number } => {
  const { translateYPx, scaleFrom, scaleTo } = CAMERA_PRESETS.CRANE_SWEEP_UP;
  const clampOpts = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) } as const;
  return {
    y: interpolate(frame, [0, sceneDurationFrames], [0, -translateYPx], clampOpts),
    scale: interpolate(frame, [0, sceneDurationFrames], [scaleFrom, scaleTo], clampOpts),
  };
};

/** DUTCH_TILT: rotation in degrees across a scene. */
export const dutchTiltDeg = (frame: number, sceneDurationFrames: number): number =>
  interpolate(frame, [0, sceneDurationFrames], [0, CAMERA_PRESETS.DUTCH_TILT.rotateDegTo], CLAMP);

/**
 * IMPACT_SHAKE: position offset in px at `frame` for a hit at `hitFrame`.
 *
 * `noise` must return a value in [0, 1) for an integer seed. Pass the repo's
 * Mulberry32 PRNG keyed to the global frame. Do not use Math.random
 * (FRAMEWORK_NO_MATH_RANDOM).
 */
export const shakeOffsetPx = (
  frame: number,
  hitFrame: number,
  noise: (seed: number) => number,
): { x: number; y: number } => {
  const { amplitudePx, decayFrames } = CAMERA_PRESETS.IMPACT_SHAKE;
  const t = frame - hitFrame;
  if (t < 0 || t >= decayFrames) return { x: 0, y: 0 };
  const envelope = amplitudePx * Math.exp((-4 * t) / decayFrames);
  return {
    x: (noise(frame * 2) * 2 - 1) * envelope,
    y: (noise(frame * 2 + 1) * 2 - 1) * envelope,
  };
};
