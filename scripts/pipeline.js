#!/usr/bin/env node
/**
 * Cross-Platform Node Pipeline Orchestrator (scripts/pipeline.js)
 * Replaces OS-locked PowerShell logic so the pipeline runs identically on Windows, macOS,
 * Linux CI runners, and Remotion Lambda.
 *
 * Usage:
 *   node scripts/pipeline.js [--preview | --audit-stills | --render | --smoke | --deliverables]
 *                            [--project <slug>] [--auto-fix] [--skip-stills] [--check-motion] [--concat-scenes]
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { resolveProject, writeProjectManifest, PROJECT_MAP } = require('./project_resolver');
const { runAudit } = require('./audit_and_validate');
const { lintFramework } = require('./lint_framework');
const { exportProjectDeliverables } = require('./export_deliverables');
const { updateRetentionPriors } = require('./telemetry_priors');

function resolvePythonBin() {
  const candidates = [
    'C:\\Users\\Syed Obaid\\AppData\\Local\\Programs\\Mu Editor\\Python\\python.exe',
    'python3',
    'python',
  ];
  for (const cmd of candidates) {
    try {
      if (cmd.includes('\\') || cmd.includes('/')) {
        if (fs.existsSync(cmd)) return `"${cmd}"`;
      } else {
        execSync(`${cmd} --version`, { stdio: 'ignore' });
        return cmd;
      }
    } catch {}
  }
  return null;
}

function masterAudioLoudness(inputMp4, outputMp4) {
  console.log(`\n🔊 [MASTERING] Applying EBU R128 / Platform Loudness Normalization (-14 LUFS, -1.0 dBTP)...`);
  try {
    execSync(
      `ffmpeg -y -i "${inputMp4}" -c:v copy -af "loudnorm=I=-14:TP=-1.0:LRA=11" -ar 48000 "${outputMp4}" -loglevel error`,
      { stdio: 'inherit' }
    );
    console.log(`✅ [MASTERING] Mastered MP4 written to ${outputMp4}`);
    return true;
  } catch (err) {
    console.warn(`⚠️  [MASTERING] FFmpeg loudnorm fallback (copying raw render): ${err.message}`);
    fs.copyFileSync(inputMp4, outputMp4);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const projIdx = args.indexOf('--project');
  let explicitSlug = projIdx !== -1 ? args[projIdx + 1] : undefined;
  if (!explicitSlug) {
    const projEq = args.find((a) => a.startsWith('--project='));
    if (projEq) explicitSlug = projEq.split('=')[1];
  }
  if (!explicitSlug) {
    for (const a of args) {
      if (!a.startsWith('-') && PROJECT_MAP[a]) {
        explicitSlug = a;
        break;
      }
    }
  }

  const sceneIdx = args.indexOf('--scene');
  const targetScene = sceneIdx !== -1 ? parseInt(args[sceneIdx + 1], 10) : undefined;

  let mode = '--preview';
  if (args.some((a) => ['--audit-stills', '-audit-stills', 'audit-stills', 'audit'].includes(a))) {
    mode = '--audit-stills';
  } else if (args.some((a) => ['--lint-framework', 'lint-framework', '--lint'].includes(a))) {
    mode = '--lint-framework';
  } else if (args.some((a) => ['--render', '-render', 'render'].includes(a))) {
    mode = '--render';
  } else if (args.some((a) => ['--smoke', 'smoke'].includes(a))) {
    mode = '--smoke';
  } else if (args.some((a) => ['--deliverables', 'deliverables'].includes(a))) {
    mode = '--deliverables';
  } else if (args.some((a) => ['--trace-plates', 'trace-plates', '--trace'].includes(a))) {
    mode = '--trace-plates';
  } else if (args.some((a) => ['--telemetry', 'telemetry'].includes(a))) {
    mode = '--telemetry';
  }

  const autoFix = args.includes('--auto-fix');
  const skipStills = args.includes('--skip-stills');
  const checkMotion = args.includes('--check-motion');
  const concatScenes = args.includes('--concat-scenes');

  const proj = resolveProject(explicitSlug);
  const py = resolvePythonBin();

  // 1. Run Beat Grid Extraction & Procedural Foley Synthesis
  if (py && mode !== '--deliverables' && mode !== '--lint-framework' && mode !== '--telemetry') {
    try {
      const bgmInput = fs.existsSync(path.resolve(proj.bgmFile))
        ? proj.bgmFile
        : 'assets/audio/bgm.mp3';
      const gridOutput = proj.beatGridFile || 'assets/audio/beat_grid.json';
      execSync(
        `${py} .agents/skills/build-historical-reel/scripts/extract_beat_grid.py "${bgmInput}" "${gridOutput}"`,
        { stdio: 'inherit' }
      );
      execSync(`${py} .agents/skills/build-historical-reel/scripts/generate_sfx.py`, {
        stdio: 'inherit',
      });
    } catch (e) {
      console.warn(`[WARN] Python audio pre-step skipped: ${e.message}`);
    }
  }

  // 2. Mode Dispatch
  if (mode === '--smoke') {
    console.log('\n=== [CI SMOKE TEST] VALIDATING TIMELINE & LINTERS ===');
    const targetSlugs = explicitSlug ? [explicitSlug] : [proj.slug];
    for (const slug of targetSlugs) {
      await runAudit({ projectSlug: slug, autoFix, skipStills: true, checkMotion: false });
    }
    updateRetentionPriors();

    if (! args.includes('--no-render')) {
      console.log('\n=== [CI SMOKE RENDER] 540x960 @ 10 frames Smoke Export ===');
      const outSmoke = path.resolve('out/smoke_test.mp4');
      fs.mkdirSync(path.dirname(outSmoke), { recursive: true });
      execSync(
        `npx remotion render src/index.ts ${proj.compositionId || 'HistoricalReel'} "${outSmoke}" --frames=0-9 --scale=0.5 --codec=h264 --crf=24 --concurrency=50%`,
        { stdio: 'inherit' }
      );
      console.log(`✅ [CI SMOKE RENDER] Passed: ${outSmoke}`);
    }
    return;
  }

  if (mode === '--deliverables') {
    writeProjectManifest(proj);
    const deliv = exportProjectDeliverables(proj.slug);
    updateRetentionPriors();
    console.log(`✅ [DELIVERABLES] Completed for ${proj.slug} -> ${deliv.delivDir}`);
    return;
  }

  if (mode === '--telemetry') {
    const ingestIdx = args.indexOf('--ingest');
    const ingestFile = ingestIdx !== -1 ? args[ingestIdx + 1] : null;
    const platIdx = args.indexOf('--platform');
    const platform = platIdx !== -1 ? args[platIdx + 1] : null;

    const { printTelemetryReport } = require('./telemetry_priors');
    const updated = updateRetentionPriors({
      ingestFile,
      projectSlug: explicitSlug,
      platform,
    });
    printTelemetryReport(updated);
    return;
  }

  if (mode === '--lint-framework') {
    const { runFrameworkLint } = require('./lint_framework');
    runFrameworkLint();
    return;
  }

  if (mode === '--lint-shading') {
    const { lintCelShading } = require('./lint_cel_shading');
    lintCelShading(proj, proj.timeline);
    return;
  }

  if (mode === '--audit-stills') {
    await runAudit({
      projectSlug: explicitSlug,
      autoFix,
      skipStills,
      checkMotion,
      targetScene,
    });
    updateRetentionPriors();
    return;
  }

  if (mode === '--render') {
    // Always run static & lint audit before full render
    await runAudit({
      projectSlug: explicitSlug,
      autoFix,
      skipStills: true,
      checkMotion: false,
    });

    const outDir = path.resolve('out');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const rawRenderPath = path.join(outDir, `reel_${proj.slug}_raw.mp4`);
    const finalOutPath = path.join(outDir, 'reel_final.mp4');
    const projMasterPath = path.join(proj.projectDir, `${proj.slug.replace(/-/g, '_')}_reel.mp4`);

    if (concatScenes) {
      // Check if per-scene clips exist in projects/<slug>/scene_XX.mp4
      const sceneFiles = proj.timeline.scenes.map((_, i) =>
        path.join(proj.projectDir, `scene_${String(i + 1).padStart(2, '0')}.mp4`)
      );
      const missing = sceneFiles.filter((f) => !fs.existsSync(f));
      if (missing.length === 0) {
        console.log(`[RENDER] Concatenating ${sceneFiles.length} QA'd scene clips via FFmpeg...`);
        const listFile = path.join(outDir, `concat_${proj.slug}.txt`);
        fs.writeFileSync(
          listFile,
          sceneFiles.map((f) => `file '${f.replace(/\\/g, '/')}'`).join('\n'),
          'utf8'
        );
        execSync(`ffmpeg -y -f concat -safe 0 -i "${listFile}" -c copy "${rawRenderPath}" -loglevel error`);
      } else {
        console.log(
          `[RENDER] Rendering full composition ${proj.compositionId} (1080x1920 @ 60fps)...`
        );
        execSync(
          `npx remotion render src/index.ts ${proj.compositionId || 'HistoricalReel'} "${rawRenderPath}" --codec=h264 --crf=18 --concurrency=80%`,
          { stdio: 'inherit' }
        );
      }
    } else {
      console.log(
        `[RENDER] Rendering full composition ${proj.compositionId} (1080x1920 @ 60fps)...`
      );
      execSync(
        `npx remotion render src/index.ts ${proj.compositionId || 'HistoricalReel'} "${rawRenderPath}" --codec=h264 --crf=18 --concurrency=80%`,
        { stdio: 'inherit' }
      );
    }

    // Apply -14 LUFS loudness mastering
    masterAudioLoudness(rawRenderPath, finalOutPath);
    fs.copyFileSync(finalOutPath, projMasterPath);
    exportProjectDeliverables(proj.slug);
    console.log(`✅ [RENDER] Master production export archived to ${projMasterPath}`);
    return;
  }

  // Default: --preview
  console.log('[PREVIEW] Launching live Remotion Studio preview...');
  execSync('npx remotion studio src/index.ts', { stdio: 'inherit' });
}

main().catch((err) => {
  console.error('Pipeline error:', err);
  process.exit(1);
});
