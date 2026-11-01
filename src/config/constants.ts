import pipelineConstants from '../../config/pipeline_constants.json';
import safeZonesConfig from '../../config/safe_zones.json';

export const PIPELINE_CONSTANTS = pipelineConstants;
export const SAFE_ZONES_CONFIG = safeZonesConfig;

export const FPS = pipelineConstants.FPS;
export const CANVAS_WIDTH = pipelineConstants.WIDTH;
export const CANVAS_HEIGHT = pipelineConstants.HEIGHT;
export const MIN_FRAMES = pipelineConstants.MIN_FRAMES;
export const MAX_FRAMES = pipelineConstants.MAX_FRAMES;
export const MIN_SCENE_FRAMES = pipelineConstants.MIN_SCENE_FRAMES;
export const TARGET_MAX_SCENE_FRAMES = pipelineConstants.TARGET_MAX_SCENE_FRAMES;
export const MAX_SCENE_FRAMES = pipelineConstants.MAX_SCENE_FRAMES;
export const SFX_PERCEPTUAL_LEAD_FRAMES = pipelineConstants.SFX_PERCEPTUAL_LEAD_FRAMES;
export const BGM_DUCK_DB = pipelineConstants.BGM_DUCK_DB;
export const ALL_CAPS_TRACKING_EM = pipelineConstants.ALL_CAPS_TRACKING_EM;
export const MIN_SETUP_FONT_PX = pipelineConstants.MIN_SETUP_FONT_PX;
export const MIN_PAYOFF_FONT_PX = pipelineConstants.MIN_PAYOFF_FONT_PX;
export const MAX_LINES_PER_LAYER = pipelineConstants.MAX_LINES_PER_LAYER;

export type SafeZoneProfileName = keyof typeof safeZonesConfig.profiles;

export function getSafeZoneProfile(profileName?: string) {
  const key = (profileName && profileName in safeZonesConfig.profiles
    ? profileName
    : safeZonesConfig.defaultProfile) as SafeZoneProfileName;
  return safeZonesConfig.profiles[key];
}
