/**
 * Outcome Telemetry & Retention Priors Loop (scripts/telemetry_priors.js)
 * Ingests per-second platform retention curves (YouTube Shorts / TikTok / IG Reels)
 * from `projects/<slug>/telemetry.json` and maps per-scene hold rates back to
 * archetype, durationFrames, and payoff beat offsets, updating `config/retention_priors.json`.
 */
const fs = require('fs');
const path = require('path');
const { resolveProject, PROJECT_MAP } = require('./project_resolver');

const PRIORS_PATH = path.resolve('config/retention_priors.json');

function analyzeProjectTelemetry(slug) {
  const proj = resolveProject(slug);
  const telemetryPath = path.join(proj.projectDir, 'telemetry.json');
  const fps = proj.timeline.meta?.fps || 60;

  let retentionBySecond = null;
  if (fs.existsSync(telemetryPath)) {
    const raw = JSON.parse(fs.readFileSync(telemetryPath, 'utf8'));
    retentionBySecond = raw.retentionBySecond;
  }

  const sceneStats = (proj.timeline.scenes || []).map((scene, idx) => {
    const startSec = Math.floor(scene.startFrame / fps);
    const endSec = Math.min(
      Math.ceil((scene.startFrame + scene.durationFrames) / fps),
      retentionBySecond ? retentionBySecond.length - 1 : startSec + 2
    );

    let holdRate = 0.88; // Baseline prior when live platform CSV/JSON is not yet uploaded
    if (
      Array.isArray(retentionBySecond) &&
      retentionBySecond[startSec] > 0 &&
      retentionBySecond[endSec] !== undefined
    ) {
      holdRate = Number((retentionBySecond[endSec] / retentionBySecond[startSec]).toFixed(4));
    }

    return {
      projectSlug: proj.slug,
      sceneIndex: idx + 1,
      sceneId: scene.sceneId,
      archetype: scene.archetype,
      durationFrames: scene.durationFrames,
      payoffOffset: scene.textLayers?.[1]?.triggerFrameOffset ?? 30,
      holdRate,
    };
  });

  return {
    projectSlug: proj.slug,
    openingArchetype: proj.timeline.scenes?.[0]?.archetype || 'SPLIT_CONFRONTATION',
    hasLiveTelemetry: Boolean(retentionBySecond),
    sceneStats,
  };
}

function updateRetentionPriors() {
  let currentPriors = {};
  if (fs.existsSync(PRIORS_PATH)) {
    currentPriors = JSON.parse(fs.readFileSync(PRIORS_PATH, 'utf8'));
  }

  const slugs = Object.keys(PROJECT_MAP);
  const allStats = [];
  const hookHistory = [];

  for (const slug of slugs) {
    try {
      const report = analyzeProjectTelemetry(slug);
      allStats.push(...report.sceneStats);
      hookHistory.push({
        projectSlug: slug,
        openingArchetype: report.openingArchetype,
      });
    } catch {}
  }

  // Group hold rates and optimal durations by archetype
  const byArchetype = {};
  for (const st of allStats) {
    if (!byArchetype[st.archetype]) {
      byArchetype[st.archetype] = [];
    }
    byArchetype[st.archetype].push(st);
  }

  const archetypePriors = { ...(currentPriors.archetypeRetentionPriors || {}) };
  for (const [arch, items] of Object.entries(byArchetype)) {
    const avgHold =
      items.reduce((sum, x) => sum + x.holdRate, 0) / Math.max(1, items.length);
    const sortedByHold = [...items].sort((a, b) => b.holdRate - a.holdRate);
    const topDurations = sortedByHold.slice(0, Math.max(2, Math.ceil(items.length / 2))).map((x) => x.durationFrames);
    const minOpt = Math.max(120, Math.min(...topDurations));
    const maxOpt = Math.min(168, Math.max(...topDurations));

    archetypePriors[arch] = {
      sampleScenes: items.length,
      avgHoldRate: Number(avgHold.toFixed(3)),
      recommendedForHook: ['SPLIT_CONFRONTATION', 'QUOTE_CARD', 'STRUCTURAL_FRACTURE', 'VEHICLE_IN_TRANSIT'].includes(arch),
      optimalDurationFrames: [minOpt, Math.max(minOpt + 16, maxOpt)],
    };
  }

  const updated = {
    updatedAt: new Date().toISOString(),
    sampleSizeReels: slugs.length,
    totalScenesAnalyzed: allStats.length,
    archetypeRetentionPriors: archetypePriors,
    recentHookArchetypeHistory: hookHistory,
    pacingPriors: {
      targetHookDurationFrames: 128,
      optimalPayoffBeatIndex: 1,
      sfxPerceptualLeadFrames: 2,
      maxConsecutiveSameArchetype: 2,
    },
  };

  fs.writeFileSync(PRIORS_PATH, JSON.stringify(updated, null, 2), 'utf8');
  return updated;
}

if (require.main === module) {
  const updated = updateRetentionPriors();
  console.log(
    `[TELEMETRY] Updated retention priors across ${updated.sampleSizeReels} reels (${updated.totalScenesAnalyzed} scenes) -> ${PRIORS_PATH}`
  );
}

module.exports = {
  analyzeProjectTelemetry,
  updateRetentionPriors,
};
