const fs = require('fs');
const path = require('path');

const timelinePath = path.resolve('src/timelines/carton_de_wiart_1916.json');
let content = fs.readFileSync(timelinePath, 'utf8').replace(/^\uFEFF/, '');
const timeline = JSON.parse(content);

// 1. Update meta to TACTILE_TORN_PAPER styleMode
timeline.meta.styleMode = 'TACTILE_TORN_PAPER';

// 2. Define scene-by-scene staging & warm sky gradients
const STAGING_MAP = {
  SCENE_01_UNKILLABLE_HOOK_LEADER: {
    stageStyle: 'SUNBURST_HERO',
    skyGradient: ['#78350F', '#2A1408'],
  },
  SCENE_02_BOER_WAR_RIVER_WOUNDS: {
    stageStyle: 'PAPER_EXTERIOR',
    skyGradient: ['#B45309', '#451A03'],
  },
  SCENE_03_INDIA_HORSE_CHARGE: {
    stageStyle: 'PAPER_EXTERIOR',
    skyGradient: ['#D97706', '#451A03'],
  },
  SCENE_04_SOMALILAND_FORTRESS_MAP: {
    stageStyle: 'GRAPH_GRID',
    skyGradient: ['#1E3A5F', '#0F172A'],
  },
  SCENE_05_THREE_BULLETS_EYE_SHATTER: {
    stageStyle: 'PAPER_EXTERIOR',
    skyGradient: ['#B91C1C', '#2A0A0A'],
  },
  SCENE_06_WESTERN_FRONT_EYEPATCH_LEADER: {
    stageStyle: 'PAPER_EXTERIOR',
    skyGradient: ['#334155', '#0F172A'],
  },
  SCENE_07_YPRES_ARTILLERY_SPLIT: {
    stageStyle: 'PAPER_EXTERIOR',
    skyGradient: ['#991B1B', '#1C1917'],
  },
  SCENE_08_AMPUTATION_BITTEN_FINGERS: {
    stageStyle: 'GRAPH_GRID',
    skyGradient: ['#475569', '#1E293B'],
  },
  SCENE_09_SOMME_LA_BOISSELLE_TALLY: {
    stageStyle: 'SUNBURST_HERO',
    skyGradient: ['#B45309', '#291508'],
  },
  SCENE_10_BULLET_SKULL_SURVIVAL_LEADER: {
    stageStyle: 'PAPER_EXTERIOR',
    skyGradient: ['#57534E', '#1C1917'],
  },
  SCENE_11_VICTORIA_CROSS_QUOTE: {
    stageStyle: 'SUNBURST_HERO',
    skyGradient: ['#78350F', '#291508'],
  },
  SCENE_12_POLISH_SOVIET_WAR_MAP: {
    stageStyle: 'GRAPH_GRID',
    skyGradient: ['#1E3A5F', '#0F172A'],
  },
  SCENE_13_AIRCRAFT_CRASH_WRECK: {
    stageStyle: 'PAPER_EXTERIOR',
    skyGradient: ['#92400E', '#2A1408'],
  },
  SCENE_14_COSSACK_TRAIN_GUNFIGHT_SPLIT: {
    stageStyle: 'PAPER_EXTERIOR',
    skyGradient: ['#7F1D1D', '#1C1917'],
  },
  SCENE_15_SPEEDING_TRAIN_LEAP: {
    stageStyle: 'PAPER_EXTERIOR',
    skyGradient: ['#475569', '#1E1E24'],
  },
  SCENE_16_WORLD_WAR_TWO_RECALL_LEADER: {
    stageStyle: 'NIGHT_FELT',
    skyGradient: ['#1E293B', '#0F172A'],
  },
  SCENE_17_SUNDERLAND_FLYING_BOAT_TRANSIT: {
    stageStyle: 'PAPER_EXTERIOR',
    skyGradient: ['#0369A1', '#082F49'],
  },
  SCENE_18_SEA_BOMBER_CRASH_SHATTER: {
    stageStyle: 'PAPER_EXTERIOR',
    skyGradient: ['#0284C7', '#0C4A6E'],
  },
  SCENE_19_VINCIGLIATA_PRISON_FORTRESS_SPLIT: {
    stageStyle: 'WOOD_PANEL',
    skyGradient: ['#451A03', '#2A0E02'],
  },
  SCENE_20_ONE_HANDED_TUNNEL_ESCAPE: {
    stageStyle: 'GRAPH_GRID',
    skyGradient: ['#57534E', '#1C1917'],
  },
  SCENE_21_DISGUISED_PEASANT_LEADER: {
    stageStyle: 'SUNBURST_HERO',
    skyGradient: ['#D97706', '#451A03'],
  },
  SCENE_22_CHURCHILL_MAO_ENVOY_SPLIT: {
    stageStyle: 'WOOD_PANEL',
    skyGradient: ['#5C240E', '#2E1106'],
  },
  SCENE_23_ELEVEN_WOUNDS_TALLY: {
    stageStyle: 'GRAPH_GRID',
    skyGradient: ['#78350F', '#2A1408'],
  },
  SCENE_24_HAPPY_ODYSSEY_MEMOIR_QUOTE: {
    stageStyle: 'WOOD_PANEL',
    skyGradient: ['#4C0519', '#1C0309'],
  },
  SCENE_25_THE_UNKILLABLE_FINAL_LOOP: {
    stageStyle: 'SUNBURST_HERO',
    skyGradient: ['#B45309', '#2A1408'],
  },
};

timeline.scenes.forEach((scene) => {
  const cfg = STAGING_MAP[scene.sceneId];
  if (cfg) {
    scene.visualPayload.stageStyle = cfg.stageStyle;
    scene.visualPayload.skyGradient = cfg.skyGradient;
  }
});

const outPath1 = path.resolve('src/timelines/carton_de_wiart_1916.json');
const outPath2 = path.resolve('src/timelines/current_reel.json');
const outPath3 = path.resolve('projects/carton-de-wiart-1916/timeline.json');

fs.writeFileSync(outPath1, JSON.stringify(timeline, null, 2), 'utf8');
fs.writeFileSync(outPath2, JSON.stringify(timeline, null, 2), 'utf8');
fs.writeFileSync(outPath3, JSON.stringify(timeline, null, 2), 'utf8');

console.log('[OK] Updated staging and sky gradients across 25 scenes!');
