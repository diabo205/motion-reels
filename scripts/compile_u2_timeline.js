const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const specsPath = path.resolve('projects/u2-incident-1960/scene_specs.json');
const schemaPath = path.resolve('.agents/skills/build-historical-reel/schemas/timeline.schema.json');

const specs = JSON.parse(fs.readFileSync(specsPath, 'utf8'));
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

const sceneAssetMap = {
  1: {
    id: 'SCENE_01_SOVIET_RADAR_LOCK',
    asset: 'SOVIET_RADAR_CLOSEUP_LOCK',
    sky: ['#061712', '#0A241C'],
    prompt: '3-tier atmospheric depth hierarchy: (1) Backdrop: Cathode phosphor emerald grid (#061712 to #0A241C) with concentric range rings. (2) Midground: Rotating tactical radar sweep with coordinate crosshairs and blinking U-2 blip. (3) Foreground: Pulsating red target acquisition reticle with ALT: 70,500 FT telemetry readout under violent proximity alert camera shake.'
  },
  2: {
    id: 'SCENE_02_S75_DVINA_MISSILE_STREAK',
    asset: 'S75_DVINA_MISSILE_STREAK',
    sky: ['#0B192C', '#1E3E62'],
    prompt: '3-tier atmospheric depth hierarchy: (1) Backdrop: Stratospheric twilight indigo canvas (#0B192C to #1E3E62). (2) Midground: Expanding supersonic Mach shockwave rings and climbing altitude grid. (3) Foreground: Soviet S-75 Dvina high-altitude missile streaking upward with solid booster fire plume rimmed by intense cyan ionization light.'
  },
  3: {
    id: 'SCENE_03_MISSILE_DETONATION_CABIN_LOSS',
    asset: 'U2_MISSILE_DETONATION_SPIN',
    sky: ['#7F1D1D', '#1A090B'],
    counter: { label: 'ALTITUDE (FT)', startValue: 70500, endValue: 22000 },
    prompt: '3-tier atmospheric depth hierarchy: (1) Backdrop: Deep crimson blast furnace void (#7F1D1D to #1A090B). (2) Midground: Multi-tier proximity explosion shockwave erupting behind the U-2 tail spar with flying aluminum shrapnel. (3) Foreground: Shattered U-2 airframe tumbling in negative-G flat spin as altimeter rolls rapidly backward.'
  },
  4: {
    id: 'SCENE_04_NASA_FABRICATED_FLIGHT_MAP',
    asset: 'NASA_FABRICATED_FLIGHT_MAP',
    sky: ['#0F172A', '#1E3A8A'],
    prompt: '3-tier atmospheric depth hierarchy: (1) Backdrop: Quadrille drafting paper blueprint (#0F172A to #1E3A8A). (2) Midground: Topographic map of Turkey, Adana Incirlik base, and Lake Van corridor. (3) Foreground: Fabricated civilian weather reconnaissance route illuminating across Mediterranean and Black Sea borders.'
  },
  5: {
    id: 'SCENE_05_OFFICIAL_STATEMENT_STAMP_SLAM',
    asset: 'OFFICIAL_STATEMENT_STAMP_CARD',
    sky: ['#78350F', '#1C1917'],
    prompt: '3-tier atmospheric depth hierarchy: (1) Backdrop: Executive walnut briefing table wood grain (#78350F to #1C1917). (2) Midground: Official typewritten press dossier card detailing pilot oxygen failure. (3) Foreground: Massive diagonal weathered red rubber stamp reading OFFICIAL STATEMENT slamming down across text.'
  },
  6: {
    id: 'SCENE_06_EISENHOWER_DENIAL_CUTOUT',
    asset: 'EISENHOWER_PRESS_DENIAL_STAGE',
    sky: ['#78350F', '#1C1917'],
    prompt: '3-tier atmospheric depth hierarchy: (1) Backdrop: Neoclassical White House press briefing room paneling (#78350F to #1C1917). (2) Midground: Array of chrome press microphones with network call signs. (3) Foreground: Die-cut CutoutPuppet of President Dwight D. Eisenhower with authentic portrait head firmly denying espionage.'
  },
  7: {
    id: 'SCENE_07_MOSCOW_FIVE_DAY_SILENCE',
    asset: 'KREMLIN_FIVE_DAY_SILENCE_STAGE',
    sky: ['#7F1D1D', '#0B1310'],
    counter: { label: 'KREMLIN SILENCE (DAYS)', startValue: 1, endValue: 5 },
    prompt: '3-tier atmospheric depth hierarchy: (1) Backdrop: Foreboding crimson-black night felt canvas (#7F1D1D to #0B1310). (2) Midground: Silhouette of Moscow Kremlin fortress walls and Spasskaya Tower bathed in red floodlights. (3) Foreground: Tactile digital day counter board rapidly rolling DAY 1 to DAY 5 as Moscow waits in deadly silence.'
  },
  8: {
    id: 'SCENE_08_KHRUSHCHEV_STEPS_TO_PODIUM',
    asset: 'KHRUSHCHEV_SUPREME_SOVIET_STAGE',
    sky: ['#991B1B', '#1C1917'],
    prompt: '3-tier atmospheric depth hierarchy: (1) Backdrop: Grand Kremlin Palace monumental hall with radiant gold sunburst rays (#991B1B to #1C1917). (2) Midground: Polished light-oak rostrum flanked by gilded hammer and sickle emblem. (3) Foreground: Articulated CutoutPuppet of Nikita Khrushchev raising his fist in triumph before Supreme Soviet delegates.'
  },
  9: {
    id: 'SCENE_09_DOSSIER_SLAMS_THE_TRAP',
    asset: 'DOSSIER_SLAMS_SCATTERED_PHOTOS',
    sky: ['#78350F', '#1C1917'],
    prompt: '3-tier atmospheric depth hierarchy: (1) Backdrop: Dark Soviet briefing desk surface (#78350F to #1C1917) fracturing under impact. (2) Midground: Red-star KGB dossier folder bursting open with kinetic shockwaves. (3) Foreground: Recovered high-resolution U-2 aerial photographs of Soviet plutonium plants scattering across the rostrum.'
  },
  10: {
    id: 'SCENE_10_CHECKMATE_PLANE_CAPTURED',
    asset: 'CHECKMATE_POWERS_CAPTURED_STAGE',
    sky: ['#1E293B', '#0F172A'],
    prompt: '3-tier atmospheric depth hierarchy: (1) Backdrop: Cold KGB Lubyanka ledger slate (#1E293B to #0F172A). (2) Midground: Recovered U-2 airframe wreckage and biometric coordinate reticle. (3) Foreground: Flash cut of Francis Gary Powers authentic declassified Soviet arrest mugshot: they had the plane.'
  },
  11: {
    id: 'SCENE_11_CHECKMATE_INTACT_HYCON_FILM',
    asset: 'CHECKMATE_INTACT_HYCON_FILM_STAGE',
    sky: ['#0F172A', '#1E3A8A'],
    prompt: '3-tier atmospheric depth hierarchy: (1) Backdrop: Technical optical blueprint graph paper (#0F172A to #1E3A8A). (2) Midground: Recovered 36-inch Hycon Type B reconnaissance camera assembly with brass prism housing. (3) Foreground: Flash cut of intact continuous rolls of 9.5-inch reconnaissance film exposing Soviet airbases.'
  },
  12: {
    id: 'SCENE_12_CHECKMATE_POISON_PIN_PILOT_ALIVE',
    asset: 'CHECKMATE_POISON_PIN_ALIVE_STAGE',
    sky: ['#0B1310', '#16221E'],
    prompt: '3-tier atmospheric depth hierarchy: (1) Backdrop: Deep obsidian felt void (#0B1310 to #16221E). (2) Midground: Francis Gary Powers seated alive in the Soviet military tribunal dock. (3) Foreground: Flash cut of hollow silver dollar concealment coin split open to expose the unused lethal curare suicide pin: the pilot alive.'
  },
  13: {
    id: 'SCENE_13_EPILOGUE_COLD_WAR_HUMILIATION',
    asset: 'U2_EPILOGUE_BRASS_PLAQUE_STAGE',
    sky: ['#78350F', '#1C1917'],
    prompt: '3-tier atmospheric depth hierarchy: (1) Backdrop: Weathered walnut plaque substrate (#78350F to #1C1917). (2) Midground: Iron truss silhouette of Glienicke Bridge in freezing Berlin fog where Powers was exchanged for spy Rudolf Abel. (3) Foreground: Engraved bronze memorial plaque detailing the collapse of the Paris Peace Summit and the historic crisis.'
  }
};

const transientTypes = [
  'ENERGY_PEAK', 'BASS_DROP', 'BASS_DROP', 'ENERGY_PEAK', 'CYMBAL_CRASH',
  'CYMBAL_CRASH', 'BASS_DROP', 'BASS_DROP', 'CYMBAL_CRASH', 'BASS_DROP',
  'CYMBAL_CRASH', 'BASS_DROP', 'BASS_DROP'
];

const totalFrames = specs.reduce((acc, s) => acc + s.durationFrames, 0);

const timeline = {
  $schema: './timeline.schema.json',
  meta: {
    title: '1960 U-2 INCIDENT',
    flagEmoji: '🇺🇸 ✈️ ☭',
    fps: 60,
    width: 1080,
    height: 1920,
    bpm: 103.36,
    bgmFile: 'audio/bgm_u2.mp3',
    bgmStartFrom: 0,
    minFrames: totalFrames,
    maxFramesCeiling: totalFrames,
    bgmLicense: {
      source: 'Project Audio Library',
      licenseType: 'ROYALTY_FREE',
      clearanceId: 'CLR-U2-INCIDENT-1960',
      attribution: '1960 U-2 Cold War Orchestral Tension'
    },
    palette: 'ESPIONAGE_DOSSIER',
    particleEmitter: 'NONE',
    fontFamily: 'Montserrat',
    styleMode: 'DOCUMENTARY_SANS',
    safeZoneProfile: 'CONSERVATIVE_UNION',
    sensitivity: 'STANDARD',
    loopSeamless: false,
    ctaConfig: {
      text: 'FOLLOW FOR COLD WAR ESPIONAGE HISTORY',
      subtext: 'THE SPY FLIGHT THAT CHANGED THE WORLD'
    }
  },
  scenes: specs.map((spec, idx) => {
    const meta = sceneAssetMap[spec.scene];
    const sfxOffset = spec.phase2.payoffFrameOffset;
    const sceneObj = {
      sceneId: meta.id,
      startFrame: spec.startFrame,
      durationFrames: spec.durationFrames,
      archetype: spec.archetype,
      hudVisible: Boolean(spec.text.tag),
      camera: {
        movement: spec.camera,
        intensity: spec.archetype === 'STRUCTURAL_FRACTURE' || spec.camera === 'IMPACT_SHAKE' ? 0.95 : 0.65
      },
      transientType: transientTypes[idx] || 'BASS_DROP',
      transientHitFrame: spec.startFrame + spec.phase2.payoffFrameOffset,
      textLayers: [
        {
          text: spec.text.setup,
          triggerFrameOffset: 0,
          tier: 'PRIMARY_STATEMENT',
          colorToken: 'PURE_WHITE',
          animation: idx === 0 ? 'HARD_POP' : 'BLUR_TO_SHARP'
        },
        {
          text: spec.text.payoff,
          triggerFrameOffset: spec.phase2.payoffFrameOffset,
          tier: 'SECONDARY_ACCENT',
          colorToken: 'ALERT_RED',
          animation: 'SCALE_SLAM',
          rollingCounter: /\d/.test(spec.text.payoff)
        }
      ],
      visualPayload: {
        stageStyle: spec.staging,
        skyGradient: meta.sky,
        svgForegroundAsset: meta.asset,
        referencePlate: spec.plate,
        atmosphericPlatePrompt: meta.prompt
      },
      sfxTriggers: [
        {
          sfxFile: spec.sfx.file,
          frameOffset: sfxOffset,
          leadFrames: 2
        }
      ]
    };

    if (spec.text.tag) {
      sceneObj.headerContext = spec.text.tag;
    }

    if (spec.sensitivity) {
      sceneObj.sensitivity = spec.sensitivity;
    }

    if (spec.claim) {
      sceneObj.claim = spec.claim;
    }

    if (spec.archetype === 'QUOTE_CARD') {
      sceneObj.visualPayload.quoteAttribution = 'WHITE HOUSE PRESS RELEASE (MAY 1960)';
    }

    if (meta.counter) {
      sceneObj.visualPayload.counterConfig = meta.counter;
    }

    if (spec.archetype === 'STRUCTURAL_FRACTURE') {
      sceneObj.structuralFractureHitFrame = spec.startFrame + spec.phase2.payoffFrameOffset;
    }

    return sceneObj;
  })
};

// Validate against schema
const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);
const valid = validate(timeline);

if (!valid) {
  console.error('❌ Timeline validation failed:');
  console.error(validate.errors);
  process.exit(1);
}

// Write src/timelines/u2_incident_1960.json
fs.writeFileSync('src/timelines/u2_incident_1960.json', JSON.stringify(timeline, null, 2), 'utf8');
console.log('✅ src/timelines/u2_incident_1960.json written successfully');

// Write projects/u2-incident-1960/timeline.json
fs.writeFileSync('projects/u2-incident-1960/timeline.json', JSON.stringify(timeline, null, 2), 'utf8');
console.log('✅ projects/u2-incident-1960/timeline.json written successfully');

// Update plates/manifest.json scenePlateMap
const platesManifestPath = 'projects/u2-incident-1960/plates/manifest.json';
if (fs.existsSync(platesManifestPath)) {
  const pm = JSON.parse(fs.readFileSync(platesManifestPath, 'utf8'));
  pm.scenePlateMap = pm.scenePlateMap || {};
  specs.forEach(def => {
    const meta = sceneAssetMap[def.scene];
    pm.scenePlateMap[meta.id] = def.plate;
  });
  fs.writeFileSync(platesManifestPath, JSON.stringify(pm, null, 2), 'utf8');
  console.log('✅ plates/manifest.json scenePlateMap updated');
}

// Update projects/u2-incident-1960/manifest.json
const manifestPath = 'projects/u2-incident-1960/manifest.json';
let manifest = {};
if (fs.existsSync(manifestPath)) {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
}

manifest.projectSlug = 'u2-incident-1960';
manifest.title = '1960 U-2 INCIDENT';
manifest.updatedAt = new Date().toISOString();
manifest.engine = {
  remotionVersion: '^4.0.218',
  fps: 60,
  width: 1080,
  height: 1920,
  maxFramesCeiling: totalFrames
};
manifest.timeline = {
  file: 'src/timelines/u2_incident_1960.json',
  sceneCount: specs.length,
  totalFrames: totalFrames,
  durationSec: Number((totalFrames / 60).toFixed(2))
};
manifest.audio = manifest.audio || {
  bgmFile: 'audio/bgm_u2.mp3',
  bpm: 103.36,
  bgmLicense: timeline.meta.bgmLicense,
  loudnessSpec: {
    targetIntegratedLufs: -14.0,
    targetTruePeakDbtp: -1.0,
    impactDuckingDb: -7.5
  }
};
manifest.typographyAndVisuals = {
  fontFamily: 'Montserrat',
  palette: 'ESPIONAGE_DOSSIER',
  particleEmitter: 'NONE',
  safeZoneProfile: 'CONSERVATIVE_UNION',
  sensitivityMode: 'STANDARD'
};

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log('✅ projects/u2-incident-1960/manifest.json written successfully');
