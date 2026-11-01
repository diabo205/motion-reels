const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { resolveProject } = require('./project_resolver');

function framesToSrtTimestamp(frame, fps = 60) {
  const totalMs = Math.round((frame / fps) * 1000);
  const hours = Math.floor(totalMs / 3600000);
  const minutes = Math.floor((totalMs % 3600000) / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  const ms = totalMs % 1000;
  return (
    String(hours).padStart(2, '0') +
    ':' +
    String(minutes).padStart(2, '0') +
    ':' +
    String(seconds).padStart(2, '0') +
    ',' +
    String(ms).padStart(3, '0')
  );
}

function generateSrt(timeline) {
  const fps = timeline.meta?.fps || 60;
  const blocks = [];
  let cueIndex = 1;

  for (const scene of timeline.scenes || []) {
    const startFrame = scene.startFrame;
    const endFrame = scene.startFrame + scene.durationFrames;
    const setupText = scene.textLayers?.[0]?.text || '';
    const payoffText = scene.textLayers?.[1]?.text || '';
    const payoffOffset = scene.textLayers?.[1]?.triggerFrameOffset || 30;
    const splitFrame = Math.min(endFrame - 6, startFrame + payoffOffset);

    if (setupText && payoffText && splitFrame > startFrame) {
      // Cue 1: Setup line
      blocks.push(
        `${cueIndex++}\n${framesToSrtTimestamp(startFrame, fps)} --> ${framesToSrtTimestamp(
          splitFrame,
          fps
        )}\n${setupText}\n`
      );
      // Cue 2: Setup + Payoff line
      blocks.push(
        `${cueIndex++}\n${framesToSrtTimestamp(splitFrame, fps)} --> ${framesToSrtTimestamp(
          endFrame,
          fps
        )}\n${setupText}\n${payoffText}\n`
      );
    } else if (setupText) {
      blocks.push(
        `${cueIndex++}\n${framesToSrtTimestamp(startFrame, fps)} --> ${framesToSrtTimestamp(
          endFrame,
          fps
        )}\n${setupText}\n`
      );
    }
  }

  return blocks.join('\n');
}

function exportProjectDeliverables(explicitSlug) {
  const proj = resolveProject(explicitSlug);
  const { slug, timeline, projectDir } = proj;
  const delivDir = path.join(projectDir, 'deliverables');
  if (!fs.existsSync(delivDir)) {
    fs.mkdirSync(delivDir, { recursive: true });
  }

  // 1. Export Frame-Accurate SRT Captions
  const srtContent = generateSrt(timeline);
  const srtPath = path.join(delivDir, 'captions.srt');
  fs.writeFileSync(srtPath, srtContent, 'utf8');

  // 2. Compile Platform Metadata, Hashtags, Citations & Alt-Text
  const hookSetup = timeline.scenes?.[0]?.textLayers?.[0]?.text || '';
  const hookPayoff = timeline.scenes?.[0]?.textLayers?.[1]?.text || '';
  const rawTitle = `${timeline.meta?.title}: ${hookSetup} ${hookPayoff}`
    .replace(/\s+/g, ' ')
    .trim();
  const title = rawTitle.length <= 100 ? rawTitle : rawTitle.slice(0, 97) + '...';

  const claims = (timeline.scenes || [])
    .filter((s) => s.claim)
    .map((s) => ({
      sceneId: s.sceneId,
      ...s.claim,
    }));

  const altTextScenes = (timeline.scenes || []).map((s, idx) => ({
    sceneNumber: idx + 1,
    sceneId: s.sceneId,
    archetype: s.archetype,
    headerContext: s.headerContext || null,
    caption: (s.textLayers || []).map((l) => l.text).join(' — '),
    visualAsset: s.visualPayload?.svgForegroundAsset,
  }));

  const slugWords = slug.split('-').filter((w) => w.length > 2);
  const hashtags = [
    '#History',
    '#Documentary',
    '#MilitaryHistory',
    '#MotionGraphics',
    '#Shorts',
    ...slugWords.map((w) => `#${w.charAt(0).toUpperCase() + w.slice(1)}`),
  ];

  const descriptionLines = [
    `${timeline.meta?.title} (${timeline.meta?.flagEmoji || ''})`,
    '',
    `${hookSetup} ${hookPayoff}`,
    '',
    ...(claims.length > 0
      ? [
          'Historical Sources & Fact-Check Citations:',
          ...claims.map((c) => `• ${c.text} — Source: ${c.source}${c.url ? ` (${c.url})` : ''}`),
          '',
        ]
      : []),
    hashtags.join(' '),
  ];

  const metadata = {
    projectSlug: slug,
    generatedAt: new Date().toISOString(),
    title,
    description: descriptionLines.join('\n'),
    hashtags,
    srtFile: 'captions.srt',
    poster9x16: 'poster.png',
    poster4x5: 'poster_4x5.png',
    bgmLicense: timeline.meta?.bgmLicense || null,
    claims,
    accessibilityAltText: altTextScenes,
  };

  const metadataPath = path.join(delivDir, 'metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');

  const postCopyPath = path.join(delivDir, 'post_copy.md');
  fs.writeFileSync(
    postCopyPath,
    `# ${title}\n\n## Description\n\n${metadata.description}\n\n## SRT Captions\nSaved to \`captions.srt\` (${
      (timeline.scenes || []).length * 2
    } beat-synced subtitle cues).\n`,
    'utf8'
  );

  // 3. Poster / Cover Export (9:16 + 4:5 Instagram Feed Grid Crop)
  const firstSceneId = timeline.scenes?.[0]?.sceneId;
  const auditStillCandidates = [
    path.join(projectDir, 'audit', `${firstSceneId}.png`),
    path.resolve('out/audit', `${firstSceneId}.png`),
  ];
  const existingStill = auditStillCandidates.find((p) => fs.existsSync(p));
  const poster9x16Path = path.join(delivDir, 'poster.png');
  const poster4x5Path = path.join(delivDir, 'poster_4x5.png');

  if (existingStill) {
    fs.copyFileSync(existingStill, poster9x16Path);
    try {
      // Crop center 1080x1350 (y = 285..1635) for Instagram 4:5 profile grid
      execSync(
        `ffmpeg -y -i "${poster9x16Path}" -vf "crop=1080:1350:0:285" "${poster4x5Path}" -loglevel error`
      );
    } catch {}
  }

  return {
    delivDir,
    srtPath,
    metadataPath,
    postCopyPath,
    poster9x16Path: fs.existsSync(poster9x16Path) ? poster9x16Path : null,
    poster4x5Path: fs.existsSync(poster4x5Path) ? poster4x5Path : null,
  };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const projIdx = args.indexOf('--project');
  const slug = projIdx !== -1 ? args[projIdx + 1] : args[0];
  const res = exportProjectDeliverables(slug);
  console.log(`[DELIVERABLES] Exported SRT, metadata, and posters to ${res.delivDir}`);
}

module.exports = {
  generateSrt,
  exportProjectDeliverables,
};
