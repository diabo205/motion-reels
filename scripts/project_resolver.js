const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PROJECT_MAP = {
  'aleutian-campaign-1942': {
    slug: 'aleutian-campaign-1942',
    timelineFile: 'src/timelines/aleutian_campaign_1942.json',
    compositionId: 'AleutianCampaign1942',
    vectorFile: 'src/components/AleutianVectors.tsx',
    bgmFile: 'assets/audio/bgm_aleutian.mp3',
    beatGridFile: 'assets/audio/beat_grid.json',
  },
  'binance-heist-2026': {
    slug: 'binance-heist-2026',
    timelineFile: 'src/timelines/binance_heist_2026.json',
    compositionId: 'BinanceHeist2026',
    vectorFile: 'src/components/BinanceHeistVectors.tsx',
    bgmFile: 'assets/audio/bgm_binance.mp3',
    beatGridFile: 'assets/audio/beat_grid_binance.json',
  },
  'operation-cowboy-1945': {
    slug: 'operation-cowboy-1945',
    timelineFile: 'src/timelines/operation_cowboy_1945.json',
    compositionId: 'OperationCowboy1945',
    vectorFile: 'src/components/CowboyVectors.tsx',
    bgmFile: 'assets/audio/bgm_cowboy.mp3',
    beatGridFile: 'assets/audio/beat_grid_cowboy.json',
  },
  'u2-incident-1960': {
    slug: 'u2-incident-1960',
    timelineFile: 'src/timelines/u2_incident_1960.json',
    compositionId: 'U2Incident1960',
    vectorFile: 'src/components/U2IncidentVectors.tsx',
    bgmFile: 'assets/audio/bgm_u2.mp3',
    beatGridFile: 'assets/audio/beat_grid_u2.json',
  },
  'taiping-rebellion-1850': {
    slug: 'taiping-rebellion-1850',
    timelineFile: 'src/timelines/taiping_1850.json',
    compositionId: 'TaipingRebellion1850',
    vectorFile: 'src/components/TaipingVectors.tsx',
    bgmFile: 'assets/audio/bgm_taiping.mp3',
    beatGridFile: 'assets/audio/beat_grid_taiping.json',
  },
  'peshawar-2009': {
    slug: 'peshawar-2009',
    timelineFile: 'src/timelines/peshawar_2009.json',
    compositionId: 'Peshawar2009',
    vectorFile: 'src/components/PeshawarVectors.tsx',
    bgmFile: 'assets/audio/bgm_peshawar.mp3',
    beatGridFile: 'assets/audio/beat_grid.json',
  },
  'carton-de-wiart-1916': {
    slug: 'carton-de-wiart-1916',
    timelineFile: 'src/timelines/carton_de_wiart_1916.json',
    compositionId: 'CartonDeWiart1916',
    vectorFile: 'src/components/CartonDeWiartVectors.tsx',
    bgmFile: 'assets/audio/bgm_carton.mp3',
    beatGridFile: 'assets/audio/beat_grid_carton.json',
  },
  'florida-plane-crash-2026': {
    slug: 'florida-plane-crash-2026',
    timelineFile: 'src/timelines/florida_plane_crash_2026.json',
    compositionId: 'FloridaPlaneCrash2026',
    vectorFile: 'src/components/FloridaCrashVectors.tsx',
    bgmFile: 'assets/audio/bgm_florida_crash.mp3',
    beatGridFile: 'assets/audio/beat_grid_florida_crash.json',
  },
  'postage-fraud-2026': {
    slug: 'postage-fraud-2026',
    timelineFile: 'src/timelines/postage_fraud_2026.json',
    compositionId: 'PostageFraud2026',
    vectorFile: 'src/components/PostageFraudVectors.tsx',
    bgmFile: 'assets/audio/bgm_postage_fraud.mp3',
    beatGridFile: 'assets/audio/beat_grid_postage_fraud.json',
  },
};

function sha256File(filePath) {
  try {
    const abs = path.resolve(filePath);
    if (!fs.existsSync(abs)) return null;
    const buf = fs.readFileSync(abs);
    return crypto.createHash('sha256').update(buf).digest('hex');
  } catch {
    return null;
  }
}

function inferSlugFromTitle(title = '') {
  const upper = String(title).toUpperCase();
  if (upper.includes('BINANCE') || upper.includes('LAZARUS')) return 'binance-heist-2026';
  if (upper.includes('ALEUTIAN')) return 'aleutian-campaign-1942';
  if (upper.includes('COWBOY')) return 'operation-cowboy-1945';
  if (upper.includes('U-2') || upper.includes('U2')) return 'u2-incident-1960';
  if (upper.includes('TAIPING')) return 'taiping-rebellion-1850';
  if (upper.includes('PESHAWAR')) return 'peshawar-2009';
  if (upper.includes('CARTON') || upper.includes('WIART') || upper.includes('UNKILLABLE')) return 'carton-de-wiart-1916';
  if (upper.includes('FLORIDA') || upper.includes('LEARJET') || upper.includes('N722BD')) return 'florida-plane-crash-2026';
  if (upper.includes('POSTAGE') || upper.includes('FAHEEM') || upper.includes('LABELSBANK') || upper.includes('126M')) return 'postage-fraud-2026';
  return (
    upper
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'default-reel'
  );
}

function resolveProject(explicitSlug) {
  if (explicitSlug && PROJECT_MAP[explicitSlug]) {
    const entry = PROJECT_MAP[explicitSlug];
    const timelinePath = path.resolve(entry.timelineFile);
    const timeline = JSON.parse(fs.readFileSync(timelinePath, 'utf8'));
    const projectDir = path.resolve(`projects/${entry.slug}`);
    const scenesDir = fs.existsSync(path.resolve(`src/scenes/${entry.slug}`))
      ? path.resolve(`src/scenes/${entry.slug}`)
      : fs.existsSync(path.join(projectDir, 'scenes'))
      ? path.join(projectDir, 'scenes')
      : null;
    return {
      ...entry,
      timelinePath,
      timeline,
      projectDir,
      scenesDir,
    };
  }

  // Fallback to src/timelines/current_reel.json and infer project slug
  const currentPath = path.resolve('src/timelines/current_reel.json');
  const timeline = JSON.parse(fs.readFileSync(currentPath, 'utf8'));
  const slug = explicitSlug || inferSlugFromTitle(timeline.meta?.title);
  const mapped = PROJECT_MAP[slug] || {
    slug,
    timelineFile: 'src/timelines/current_reel.json',
    compositionId: 'HistoricalReel',
    vectorFile: null,
    bgmFile: timeline.meta?.bgmFile ? `assets/${timeline.meta.bgmFile}` : 'assets/audio/bgm.mp3',
    beatGridFile: 'assets/audio/beat_grid.json',
  };

  const projectDir = path.resolve(`projects/${slug}`);
  const scenesDir = fs.existsSync(path.resolve(`src/scenes/${slug}`))
    ? path.resolve(`src/scenes/${slug}`)
    : fs.existsSync(path.join(projectDir, 'scenes'))
    ? path.join(projectDir, 'scenes')
    : null;

  return {
    ...mapped,
    timelinePath: currentPath,
    timeline,
    projectDir,
    scenesDir,
  };
}

function writeProjectManifest(projectInfo) {
  const { slug, timelinePath, timeline, bgmFile, projectDir } = projectInfo;
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  let pkg = {};
  try {
    pkg = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf8'));
  } catch {}

  let fontManifest = {};
  try {
    fontManifest = JSON.parse(
      fs.readFileSync(path.resolve('assets/fonts/font_manifest.json'), 'utf8')
    );
  } catch {}

  const totalFrames = (timeline.scenes || []).reduce(
    (max, s) => Math.max(max, s.startFrame + s.durationFrames),
    0
  );

  const manifest = {
    projectSlug: slug,
    title: timeline.meta?.title,
    updatedAt: new Date().toISOString(),
    engine: {
      remotionVersion: pkg.dependencies?.remotion || '^4.0.218',
      fps: timeline.meta?.fps || 60,
      width: timeline.meta?.width || 1080,
      height: timeline.meta?.height || 1920,
      maxFramesCeiling: 3500,
    },
    timeline: {
      file: path.relative(process.cwd(), timelinePath).replace(/\\/g, '/'),
      sha256: sha256File(timelinePath),
      sceneCount: (timeline.scenes || []).length,
      totalFrames,
      durationSec: Number((totalFrames / (timeline.meta?.fps || 60)).toFixed(2)),
    },
    audio: {
      bgmFile: timeline.meta?.bgmFile || bgmFile,
      sha256: sha256File(bgmFile),
      bpm: timeline.meta?.bpm,
      bgmLicense: timeline.meta?.bgmLicense || {
        source: 'Project Audio Library',
        licenseType: 'ROYALTY_FREE',
        clearanceId: `CLR-${slug.toUpperCase()}`,
      },
      loudnessSpec: {
        targetIntegratedLufs: -14.0,
        targetTruePeakDbtp: -1.0,
        impactDuckingDb: -7.5,
      },
    },
    typographyAndVisuals: {
      fontFamily: timeline.meta?.fontFamily || 'Montserrat',
      vendoredFonts: fontManifest.fonts || {},
      palette: timeline.meta?.palette || 'POLAR_MARITIME',
      particleEmitter: timeline.meta?.particleEmitter || 'NONE',
      safeZoneProfile: timeline.meta?.safeZoneProfile || 'CONSERVATIVE_UNION',
      sensitivityMode: timeline.meta?.sensitivity || 'STANDARD',
    },
  };

  const manifestPath = path.join(projectDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  return { manifest, manifestPath };
}

module.exports = {
  PROJECT_MAP,
  resolveProject,
  writeProjectManifest,
  sha256File,
};
