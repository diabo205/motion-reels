const fs = require('fs');
const path = require('path');

const beatGrid = JSON.parse(fs.readFileSync('assets/audio/beat_grid_u2.json', 'utf8'));

const sceneDefs = [
  {
    sceneId: 'SCENE_01_SOVIET_RADAR_LOCK',
    archetype: 'SPLIT_CONFRONTATION',
    stageStyle: 'GRAPH_GRID',
    skyGradient: ['#061712', '#022C22', '#064E3B'],
    asset: 'SOVIET_RADAR_CLOSEUP_LOCK',
    plate: 'soviet_radar_p30.jpg',
    camera: { movement: 'IMPACT_SHAKE', durationFrames: 104, focalPoint: { x: 540, y: 1180 } },
    setup: 'THE CIA SWORE',
    payoff: 'THE PILOT WAS DEAD',
    contextTag: '1 MAY 1960 // 70,500 FT',
    durationFrames: 104,
    targetOffset: 38,
    sfx: 'radar_ping.wav',
  },
  {
    sceneId: 'SCENE_02_S75_DVINA_MISSILE_STREAK',
    archetype: 'VEHICLE_IN_TRANSIT',
    stageStyle: 'PAPER_EXTERIOR',
    skyGradient: ['#020617', '#0F172A', '#1E1B4B'],
    asset: 'S75_DVINA_MISSILE_STREAK',
    plate: 's75_dvina_missile.jpg',
    camera: { movement: 'SLOW_PUSH_IN', durationFrames: 110, focalPoint: { x: 540, y: 1180 } },
    setup: 'SOVIET S-75 MISSILE',
    payoff: 'RADAR LOCKED',
    durationFrames: 110,
    targetOffset: 40,
    sfx: 'missile_whoosh.wav',
  },
  {
    sceneId: 'SCENE_03_MISSILE_DETONATION_CABIN_LOSS',
    archetype: 'STRUCTURAL_FRACTURE',
    stageStyle: 'PAPER_EXTERIOR',
    skyGradient: ['#18181B', '#450A0A', '#7F1D1D'],
    asset: 'U2_MISSILE_DETONATION_SPIN',
    plate: 'u2_wreckage_sverdlovsk.jpg',
    camera: { movement: 'IMPACT_SHAKE', durationFrames: 110, focalPoint: { x: 540, y: 1180 } },
    setup: 'MISSILE DETONATION',
    payoff: 'TOTAL CABIN LOSS',
    durationFrames: 110,
    targetOffset: 40,
    sfx: 'sub_boom.wav',
  },
  {
    sceneId: 'SCENE_04_NASA_FABRICATED_FLIGHT_MAP',
    archetype: 'VECTOR_MAP',
    stageStyle: 'GRAPH_GRID',
    skyGradient: ['#0F172A', '#1E3A8A', '#0284C7'],
    asset: 'NASA_FABRICATED_FLIGHT_MAP',
    plate: 'nasa_flight_map_turkey.jpg',
    camera: { movement: 'PARALLAX_PAN_RIGHT', durationFrames: 110, focalPoint: { x: 540, y: 1180 } },
    setup: "WASHINGTON'S COVER STORY",
    payoff: 'LOST WEATHER PLANE',
    contextTag: 'WHITE HOUSE // 3 MAY 1960',
    durationFrames: 110,
    targetOffset: 40,
    sfx: 'typewriter_chatter.wav',
  },
  {
    sceneId: 'SCENE_05_OFFICIAL_STATEMENT_STAMP_SLAM',
    archetype: 'QUOTE_CARD',
    stageStyle: 'WOOD_PANEL',
    skyGradient: ['#334155', '#475569', '#64748B'],
    asset: 'OFFICIAL_STATEMENT_STAMP_CARD',
    plate: 'fake_nasa_u2_weather.jpg',
    camera: { movement: 'SLOW_PUSH_IN', durationFrames: 110, focalPoint: { x: 540, y: 1180 } },
    setup: 'NASA FABRICATED FLIGHT',
    payoff: 'OFFICIAL STATEMENT',
    durationFrames: 110,
    targetOffset: 40,
    sfx: 'stamp_slam.wav',
  },
  {
    sceneId: 'SCENE_06_EISENHOWER_DENIAL_CUTOUT',
    archetype: 'SPLIT_CONFRONTATION',
    stageStyle: 'WOOD_PANEL',
    skyGradient: ['#1C1917', '#451A03', '#78350F'],
    asset: 'EISENHOWER_PRESS_DENIAL_STAGE',
    plate: 'eisenhower_portrait.jpg',
    camera: { movement: 'SLOW_PUSH_IN', durationFrames: 110, focalPoint: { x: 540, y: 1180 } },
    setup: 'EISENHOWER PUBLICLY',
    payoff: 'DENIED ESPIONAGE',
    durationFrames: 110,
    targetOffset: 40,
    sfx: 'camera_shutter.wav',
  },
  {
    sceneId: 'SCENE_07_MOSCOW_FIVE_DAY_SILENCE',
    archetype: 'CROWD_TALLY',
    stageStyle: 'NIGHT_FELT',
    skyGradient: ['#0B0505', '#450A0A', '#7F1D1D'],
    asset: 'KREMLIN_FIVE_DAY_SILENCE_STAGE',
    plate: 'kremlin_moscow_red.jpg',
    camera: { movement: 'DUTCH_TILT', durationFrames: 110, focalPoint: { x: 540, y: 1180 } },
    setup: 'MOSCOW STAYED SILENT',
    payoff: 'FOR FIVE DAYS',
    contextTag: 'MOSCOW // 1-5 MAY 1960',
    durationFrames: 110,
    targetOffset: 40,
    sfx: 'pocket_watch_tick.wav',
  },
  {
    sceneId: 'SCENE_08_KHRUSHCHEV_STEPS_TO_PODIUM',
    archetype: 'LONE_LEADER',
    stageStyle: 'NIGHT_FELT',
    skyGradient: ['#0B0303', '#2A0808', '#7F1D1D'],
    asset: 'KHRUSHCHEV_SUPREME_SOVIET_STAGE',
    plate: 'khrushchev_portrait.jpg',
    camera: { movement: 'CRANE_SWEEP_UP', durationFrames: 110, focalPoint: { x: 540, y: 1180 } },
    setup: 'KHRUSHCHEV STEPS UP',
    payoff: 'SUPREME SOVIET',
    contextTag: 'SUPREME SOVIET // 7 MAY 1960',
    durationFrames: 110,
    targetOffset: 40,
    sfx: 'gavel_strike.wav',
  },
  {
    sceneId: 'SCENE_09_DOSSIER_SLAMS_THE_TRAP',
    archetype: 'STRUCTURAL_FRACTURE',
    stageStyle: 'WOOD_PANEL',
    skyGradient: ['#120A05', '#3B1D0E', '#542813'],
    asset: 'DOSSIER_SLAMS_SCATTERED_PHOTOS',
    plate: 'khrushchev_official_full.jpg',
    camera: { movement: 'IMPACT_SHAKE', durationFrames: 110, focalPoint: { x: 540, y: 1180 } },
    setup: 'KHRUSHCHEV SPRANG',
    payoff: 'THE TRAP',
    durationFrames: 110,
    targetOffset: 40,
    sfx: 'stamp_slam.wav',
  },
  {
    sceneId: 'SCENE_10_CHECKMATE_PILOT_ALIVE',
    archetype: 'SPLIT_CONFRONTATION',
    stageStyle: 'GRAPH_GRID',
    skyGradient: ['#020617', '#0F172A', '#1E293B'],
    asset: 'CHECKMATE_POWERS_CAPTURED_STAGE',
    plate: 'powers_portrait.jpg',
    camera: { movement: 'SLOW_PUSH_IN', durationFrames: 110, focalPoint: { x: 540, y: 1180 } },
    setup: 'CHECKMATE IN MOSCOW',
    payoff: 'THE PILOT ALIVE',
    durationFrames: 110,
    targetOffset: 40,
    sfx: 'camera_shutter.wav',
  },
  {
    sceneId: 'SCENE_11_CHECKMATE_PLANE_WRECKAGE',
    archetype: 'VEHICLE_IN_TRANSIT',
    stageStyle: 'PAPER_EXTERIOR',
    skyGradient: ['#020617', '#0F172A', '#38BDF8'],
    asset: 'U2_WRECKAGE_EXHIBITION_STAGE',
    plate: 'u2_wreckage_sverdlovsk.jpg',
    camera: { movement: 'SLOW_PUSH_IN', durationFrames: 110, focalPoint: { x: 540, y: 1180 } },
    setup: 'SOVIETS RECOVERED',
    payoff: 'THE INTACT PLANE',
    durationFrames: 110,
    targetOffset: 40,
    sfx: 'sub_boom.wav',
  },
  {
    sceneId: 'SCENE_12_CHECKMATE_INTACT_HYCON_FILM',
    archetype: 'STRUCTURAL_FRACTURE',
    stageStyle: 'GRAPH_GRID',
    skyGradient: ['#0A0E17', '#1E293B', '#0284C7'],
    asset: 'CHECKMATE_INTACT_HYCON_FILM_STAGE',
    plate: 'powers_soviet_trial.jpg',
    camera: { movement: 'SLOW_PUSH_IN', durationFrames: 110, focalPoint: { x: 540, y: 1180 } },
    setup: 'RECONNAISSANCE PROOF',
    payoff: 'THE FILM SPOOLS',
    durationFrames: 110,
    targetOffset: 40,
    sfx: 'camera_shutter.wav',
  },
  {
    sceneId: 'SCENE_13_CHECKMATE_POISON_PIN_UNUSED',
    archetype: 'SPLIT_CONFRONTATION',
    stageStyle: 'GRAPH_GRID',
    skyGradient: ['#0B132B', '#1E293B', '#10B981'],
    asset: 'CHECKMATE_POISON_PIN_ALIVE_STAGE',
    plate: 'powers_pressure_suit.jpg',
    camera: { movement: 'IMPACT_SHAKE', durationFrames: 110, focalPoint: { x: 540, y: 1180 } },
    setup: 'LETHAL SUICIDE PIN',
    payoff: 'FOUND UNUSED',
    durationFrames: 110,
    targetOffset: 40,
    sfx: 'radar_ping.wav',
  },
  {
    sceneId: 'SCENE_14_EPILOGUE_COLD_WAR_HUMILIATION',
    archetype: 'LONE_LEADER',
    stageStyle: 'WOOD_PANEL',
    skyGradient: ['#1C1917', '#451A03', '#92400E'],
    asset: 'U2_EPILOGUE_BRASS_PLAQUE_STAGE',
    plate: 'rudolf_abel.jpg',
    camera: { movement: 'SLOW_PUSH_IN', durationFrames: 136, focalPoint: { x: 540, y: 1180 } },
    setup: 'PEACE TALKS COLLAPSED',
    payoff: 'TOTAL HUMILIATION',
    contextTag: 'PARIS SUMMIT // 16 MAY 1960',
    durationFrames: 136,
    targetOffset: 40,
    sfx: 'sub_boom.wav',
  },
];

let currentStart = 0;
const sceneSpecs = [];
const timelineScenes = [];

for (let i = 0; i < sceneDefs.length; i++) {
  const def = sceneDefs[i];
  const start = currentStart;
  const duration = def.durationFrames;
  const end = start + duration;
  currentStart = end;

  // Find nearest transient between [38, 44]
  const windowTrans = (beatGrid.transients || [])
    .filter((t) => t.frame >= start + 38 && t.frame <= start + 44)
    .sort((a, b) => (b.strength || 0) - (a.strength || 0));

  let payoffOffset = def.targetOffset;
  if (windowTrans.length > 0) {
    payoffOffset = windowTrans[0].frame - start;
  }
  if (duration - payoffOffset > 72) {
    payoffOffset = duration - 70;
  }

  const payoffFrame = start + payoffOffset;

  // Scene specs array item
  sceneSpecs.push({
    sceneId: def.sceneId,
    archetype: def.archetype,
    staging: {
      style: def.stageStyle,
      skyGradient: def.skyGradient,
      cameraMotion: def.camera.movement,
    },
    beat: {
      phase1Setup: def.setup,
      phase2Payoff: def.payoff,
      narrativeRole: i === 0 ? 'Inciting trigger' : i < 6 ? 'Escalating crucible' : i < 10 ? 'Crisis explosion' : 'Resolution',
    },
    timing: {
      startFrame: start,
      endFrame: end,
      durationFrames: duration,
      setupFrame: start,
      payoffFrame: payoffFrame,
    },
    camera: def.camera,
    text: {
      setup: def.setup,
      payoff: def.payoff,
      contextTag: def.contextTag || undefined,
    },
    motionPresets: {
      visualTransition: 'CUT',
      shakeProfile: def.camera.movement === 'IMPACT_SHAKE' ? 'HEAVY_IMPACT' : 'SUBTLE_DRIFT',
    },
    libraryComponents: [def.asset],
    referencePlate: def.plate,
  });

  // Timeline scene text layers: EXACTLY 2 layers (PRIMARY_STATEMENT and SECONDARY_PAYOFF)
  const textLayers = [
    {
      tier: 'PRIMARY_STATEMENT',
      text: def.setup,
      fontSizePx: 64,
      fontColor: '#FFFFFF',
      trackingEm: 0.04,
      triggerFrameOffset: 0,
    },
    {
      tier: 'SECONDARY_PAYOFF',
      text: def.payoff,
      fontSizePx: 76,
      fontColor: '#EF4444',
      trackingEm: 0.04,
      triggerFrameOffset: payoffOffset,
    },
  ];

  timelineScenes.push({
    sceneId: def.sceneId,
    archetype: def.archetype,
    startFrame: start,
    durationFrames: duration,
    contextTag: def.contextTag || undefined,
    textTimeline: {
      setupFrame: start,
      payoffFrame: payoffFrame,
    },
    textLayers: textLayers,
    visualPayload: {
      stageStyle: def.stageStyle,
      skyGradient: def.skyGradient,
      svgForegroundAsset: def.asset,
      referencePlate: def.plate,
      contextTag: def.contextTag || undefined,
    },
    camera: def.camera,
    audioSync: {
      sfxHit: def.sfx,
      duckBgm: true,
      duckDb: -7.5,
      impactFrame: payoffFrame,
    },
  });
}

console.log(`Total Compiled Frames: ${currentStart} (target: 1560)`);

// Write scene_specs.json directly as an array (per schema)
fs.writeFileSync('projects/u2-incident-1960/scene_specs.json', JSON.stringify(sceneSpecs, null, 2), 'utf8');

// Write timeline.json
const timelinePayload = {
  meta: {
    title: '1960 U-2 INCIDENT',
    durationFrames: currentStart,
    fps: 60,
    width: 1080,
    height: 1920,
    palette: 'ESPIONAGE_DOSSIER',
    fontFamily: 'Montserrat',
    styleMode: 'DOCUMENTARY_SANS',
    particleEmitter: 'NONE',
    minFrames: 1560,
    maxFramesCeiling: 1560,
  },
  scenes: timelineScenes,
};

fs.writeFileSync('src/timelines/u2_incident_1960.json', JSON.stringify(timelinePayload, null, 2), 'utf8');
fs.writeFileSync('projects/u2-incident-1960/timeline.json', JSON.stringify(timelinePayload, null, 2), 'utf8');

// Update plates manifest scenePlateMap
const platesManifest = JSON.parse(fs.readFileSync('projects/u2-incident-1960/plates/manifest.json', 'utf8'));
platesManifest.scenePlateMap = {};
for (const def of sceneDefs) {
  platesManifest.scenePlateMap[def.sceneId] = def.plate;
}
fs.writeFileSync('projects/u2-incident-1960/plates/manifest.json', JSON.stringify(platesManifest, null, 2), 'utf8');

// Update project manifest.json
const projectManifest = JSON.parse(fs.readFileSync('projects/u2-incident-1960/manifest.json', 'utf8'));
projectManifest.timeline.sceneCount = 14;
projectManifest.timeline.totalFrames = currentStart;
fs.writeFileSync('projects/u2-incident-1960/manifest.json', JSON.stringify(projectManifest, null, 2), 'utf8');

console.log('Successfully recompiled 14 scenes with clean plates and text layers!');
