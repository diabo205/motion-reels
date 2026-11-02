/**
 * L1 Shared Kit: Design Tokens & Framework Constants
 * Immutable tokens defining the canvas, safe zones, typography floors, and palettes.
 */
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
