const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { resolveProject } = require('./project_resolver');

const args = process.argv.slice(2);
const projIdx = args.indexOf('--project');
let explicitSlug;
const positional = [];

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--project') {
    explicitSlug = args[i + 1];
    i++;
  } else if (!args[i].startsWith('--')) {
    positional.push(args[i]);
  }
}

const sceneNum = parseInt(positional[0], 10);
if (isNaN(sceneNum)) {
  console.error('Usage: node scripts/render_scene_clip.js <sceneNumber> [--project <slug>]');
  process.exit(1);
}

const proj = resolveProject(explicitSlug);
const { slug, compositionId, timeline, projectDir } = proj;

if (sceneNum < 1 || sceneNum > timeline.scenes.length) {
  console.error(`Invalid scene number. Must be between 1 and ${timeline.scenes.length}.`);
  process.exit(1);
}

const scene = timeline.scenes[sceneNum - 1];
const start = scene.startFrame;
const end = start + scene.durationFrames - 1;

if (!fs.existsSync(projectDir)) fs.mkdirSync(projectDir, { recursive: true });
const outName = `scene_${String(sceneNum).padStart(2, '0')}.mp4`;
const outPath = path.join(projectDir, outName);

console.log(`🎬 Rendering Scene ${sceneNum} [${scene.sceneId}] (Project: ${slug})`);
console.log(`⏱  Frames: ${start} to ${end} (${scene.durationFrames} frames, ${(scene.durationFrames / 60).toFixed(2)}s)`);
console.log(`📁 Output: ${outPath}`);

const comp = compositionId || 'HistoricalReel';
const cmd = `npx remotion render src/index.ts ${comp} "${outPath}" --frames=${start}-${end} --codec=h264 --crf=18 --concurrency=80% --timeout=90000`;
execSync(cmd, { stdio: 'inherit' });
console.log(`✅ Scene ${sceneNum} rendered successfully to ${outPath}`);
