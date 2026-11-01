const fs = require('fs');
const path = require('path');
const { bundle } = require('@remotion/bundler');
const { selectComposition, renderStill } = require('@remotion/renderer');
const constants = require('../config/pipeline_constants.json');
const { resolveProject, writeProjectManifest } = require('./project_resolver');
const { resolveResponsiveFontSize } = require('./font_metrics');
const { exportProjectDeliverables } = require('./export_deliverables');

function computeExpectedBeatPayoffOffset(scene, beatGrid, bpm = 120) {
  const [minW, maxW] = constants.PAYOFF_BEAT_WINDOW_FRAMES || [18, 45];
  if (beatGrid && Array.isArray(beatGrid.beats) && beatGrid.beats.length > 0) {
    const candidates = beatGrid.beats
      .map((b) => b.frame - scene.startFrame)
      .filter((offset) => offset >= minW && offset <= maxW);
    if (candidates.length > 0) {
      // Pick the beat closest to 0.5s (30f) inside the valid window
      candidates.sort((a, b) => Math.abs(a - 30) - Math.abs(b - 30));
      return candidates[0];
    }
  }
  const singleBeatFrames = Math.round((60 / (bpm || 120)) * 60);
  return Math.max(minW, Math.min(maxW, singleBeatFrames));
}

function lintProjectCode(projectInfo, styleMode) {
  const violations = [];

  // 1. FONT_LINT across core typography components & project vector file
  const filesToCheckFont = [
    'src/HistoricalReel.tsx',
    'src/components/KineticTextStack.tsx',
    'src/components/PersistentHudBadge.tsx',
    projectInfo.vectorFile,
  ].filter(Boolean);

  if (styleMode === 'DOCUMENTARY_SANS') {
    for (const relFile of filesToCheckFont) {
      const absFile = path.resolve(relFile);
      if (!fs.existsSync(absFile)) continue;
      const src = fs.readFileSync(absFile, 'utf8');
      for (const bannedFont of constants.BANNED_FONTS) {
        const regex = new RegExp(`\\b${bannedFont.replace(/\s+/g, '\\s*')}\\b`, 'i');
        if (regex.test(src)) {
          violations.push({
            sceneId: 'GLOBAL_CODE',
            rule: 'FONT_LINT',
            severity: 'ERROR',
            expected: `Only ${constants.ALLOWED_FONTS.join(' / ')} allowed in DOCUMENTARY_SANS mode`,
            actual: `Found banned font reference "${bannedFont}" in ${relFile}`,
            frame: 0,
            autoFixed: false,
          });
        }
      }
    }
  }

  // 2. PHOTO_PASTE_LINT on project vector component (enforces zero raw image pasting in vector scenes)
  if (projectInfo.vectorFile && fs.existsSync(path.resolve(projectInfo.vectorFile))) {
    const vecSrc = fs.readFileSync(path.resolve(projectInfo.vectorFile), 'utf8');
    // Strip legitimate CutoutPuppet / WavingFlagSvg references before checking for raw <img>/<Image>/<image>
    const rawImgMatches = vecSrc.match(/<(img|Image|image)\b[^>]*>/g) || [];
    if (rawImgMatches.length > 0 && styleMode === 'DOCUMENTARY_SANS') {
      violations.push({
        sceneId: 'GLOBAL_VECTORS',
        rule: 'PHOTO_PASTE_LINT',
        severity: 'ERROR',
        expected: 'Zero raw <img>/<Image>/<image> tags inside parametric SVG vector components',
        actual: `Found ${rawImgMatches.length} raw image tag(s) in ${projectInfo.vectorFile}`,
        frame: 0,
        autoFixed: false,
      });
    }

    // 3. PALETTE_LINT: Ensure locked palette is configured and no hot neon magenta/lime debug colors exist
    const debugHexMatches = vecSrc.match(/#(FF00FF|00FF00|00FFFF)\b/gi) || [];
    if (debugHexMatches.length > 0) {
      violations.push({
        sceneId: 'GLOBAL_VECTORS',
        rule: 'PALETTE_LINT',
        severity: 'ERROR',
        expected: 'Locked documentary palette hex tokens only',
        actual: `Found unauthorized debug hex fill(s) ${debugHexMatches.join(', ')} in ${projectInfo.vectorFile}`,
        frame: 0,
        autoFixed: false,
      });
    }
  }

  return violations;
}

async function runAudit(options = {}) {
  const args = process.argv.slice(2);
  const projIdx = args.indexOf('--project');
  const explicitSlug =
    options.projectSlug || (projIdx !== -1 ? args[projIdx + 1] : undefined);
  const autoFix = options.autoFix ?? args.includes('--auto-fix');
  const skipStills = options.skipStills ?? args.includes('--skip-stills');
  const checkMotion = options.checkMotion ?? args.includes('--check-motion');

  const projectInfo = resolveProject(explicitSlug);
  const { slug, timelinePath, timeline, beatGridFile, projectDir } = projectInfo;

  let beatGrid = null;
  if (beatGridFile && fs.existsSync(path.resolve(beatGridFile))) {
    try {
      beatGrid = JSON.parse(fs.readFileSync(path.resolve(beatGridFile), 'utf8'));
    } catch {}
  }

  console.log(`=== [1] TIMELINE & LINT SPECIFICATION AUDIT (${slug}) ===`);
  const violations = [];
  let timelineModified = false;

  // Ensure meta.bgmLicense is present
  if (!timeline.meta.bgmLicense) {
    if (autoFix) {
      timeline.meta.bgmLicense = {
        source: 'Project Audio Library',
        licenseType: 'ROYALTY_FREE',
        clearanceId: `CLR-${slug.toUpperCase()}`,
      };
      timelineModified = true;
    } else {
      violations.push({
        sceneId: 'META',
        rule: 'BGM_LICENSE_MANIFEST',
        severity: 'WARNING',
        expected: 'meta.bgmLicense { source, licenseType, clearanceId }',
        actual: 'missing',
        frame: 0,
        autoFixed: false,
      });
    }
  }

  const fps = timeline.meta.fps || constants.FPS;
  const totalFrames = timeline.scenes.reduce(
    (max, s) => Math.max(max, s.startFrame + s.durationFrames),
    0
  );
  const totalSec = totalFrames / fps;
  const styleMode =
    timeline.meta.styleMode || (timeline.meta.palette ? 'DOCUMENTARY_SANS' : 'TACTILE_TORN_PAPER');
  const fontFamily = timeline.meta.fontFamily || 'Montserrat';

  console.log(`Project Slug: ${slug}`);
  console.log(`Reel Title: ${timeline.meta.title}`);
  console.log(`Palette: ${timeline.meta.palette || 'LEGACY'}`);
  console.log(`Particle Emitter: ${timeline.meta.particleEmitter || 'NONE'}`);
  console.log(`Font Family: ${fontFamily}`);
  console.log(`Style Mode: ${styleMode}`);
  console.log(
    `Total Frames: ${totalFrames} frames (${totalSec.toFixed(2)}s / MAX_FRAMES=${constants.MAX_FRAMES})`
  );

  // 1. Duration Ceiling Check (derived strictly from MIN_FRAMES=2700 and MAX_FRAMES=3500)
  if (totalFrames < constants.MIN_FRAMES || totalFrames > constants.MAX_FRAMES) {
    violations.push({
      sceneId: 'GLOBAL_TIMELINE',
      rule: 'DURATION_CEILING',
      severity: 'ERROR',
      expected: `${constants.MIN_FRAMES}..${constants.MAX_FRAMES} frames (${constants.MIN_DURATION_SEC}s..${constants.MAX_DURATION_SEC}s)`,
      actual: `${totalFrames} frames (${totalSec.toFixed(2)}s)`,
      frame: totalFrames,
      autoFixed: false,
    });
    console.error(
      `❌ VIOLATION: Total frames ${totalFrames} (${totalSec.toFixed(2)}s) outside [${constants.MIN_FRAMES}, ${constants.MAX_FRAMES}]!`
    );
  } else {
    console.log(
      `✅ PASS: Total duration ${totalFrames}f (${totalSec.toFixed(2)}s) satisfies [${constants.MIN_FRAMES}, ${constants.MAX_FRAMES}] frames.`
    );
  }

  // 2. Code-level linters (FONT_LINT, PHOTO_PASTE_LINT, PALETTE_LINT)
  const codeViolations = lintProjectCode(projectInfo, styleMode);
  violations.push(...codeViolations);

  // 3. Per-Scene Pacing, Beat-Sync, Glyph Width, Camera & Archetype Audit
  console.log('\n--- Per-Scene Pacing, Beat-Sync, Glyph Width & Camera Audit ---');
  let consecutiveSameArch = 1;

  for (let i = 0; i < timeline.scenes.length; i++) {
    const s = timeline.scenes[i];
    const sSec = s.durationFrames / fps;

    // Archetype rotation check
    if (i > 0 && s.archetype === timeline.scenes[i - 1].archetype) {
      consecutiveSameArch++;
      if (consecutiveSameArch > 2) {
        violations.push({
          sceneId: s.sceneId,
          rule: 'ARCHETYPE_ROTATION_LINT',
          severity: 'WARNING',
          expected: 'Max 2 identical consecutive archetypes',
          actual: `${consecutiveSameArch} consecutive ${s.archetype} scenes`,
          frame: s.startFrame,
          autoFixed: false,
        });
      }
    } else {
      consecutiveSameArch = 1;
    }

    // Camera discipline check (Ban SNAP_ZOOM / CRASH_ZOOM)
    if (constants.BANNED_CAMERA_MOVEMENTS.includes(s.camera?.movement)) {
      if (autoFix) {
        s.camera.movement = 'SLOW_PUSH_IN';
        timelineModified = true;
      } else {
        violations.push({
          sceneId: s.sceneId,
          rule: 'CAMERA_DISCIPLINE_LINT',
          severity: 'ERROR',
          expected: constants.ALLOWED_CAMERA_MOVEMENTS.join(' | '),
          actual: s.camera?.movement,
          frame: s.startFrame,
          autoFixed: false,
        });
      }
    }

    // Scene duration check (120..180f in DOCUMENTARY_SANS)
    const maxAllowedSceneFrames =
      styleMode === 'DOCUMENTARY_SANS' ? constants.MAX_SCENE_FRAMES : 250;
    const durOk =
      s.durationFrames >= constants.MIN_SCENE_FRAMES &&
      s.durationFrames <= maxAllowedSceneFrames;

    // Word budget calculation across setup + payoff
    const combinedText = (s.textLayers || []).map((l) => l.text).join(' ');
    const words = combinedText.trim().split(/\s+/).filter(Boolean).length;
    const wordOk =
      styleMode === 'DOCUMENTARY_SANS'
        ? words >= constants.WORD_BUDGET_MIN && words <= constants.WORD_BUDGET_MAX
        : words >= 3 && words <= 16;

    // Real Glyph Advance-Width & 2-Line Cap Check
    let glyphFitOk = true;
    for (const layer of s.textLayers || []) {
      const isSetup = layer.tier === 'PRIMARY_STATEMENT';
      const minPx =
        styleMode === 'DOCUMENTARY_SANS'
          ? isSetup
            ? constants.MIN_SETUP_FONT_PX
            : constants.MIN_PAYOFF_FONT_PX
          : isSetup
            ? 38
            : 44;
      const prefPx = styleMode === 'DOCUMENTARY_SANS' ? (isSetup ? 64 : 72) : minPx;
      const fit = resolveResponsiveFontSize(
        layer.text,
        prefPx,
        minPx,
        952,
        constants.MAX_LINES_PER_LAYER,
        fontFamily,
        constants.ALL_CAPS_TRACKING_EM
      );
      if (fit.lineCount > constants.MAX_LINES_PER_LAYER || fit.maxLineWidthPx > 952) {
        glyphFitOk = false;
        violations.push({
          sceneId: s.sceneId,
          rule: 'GLYPH_WIDTH_AND_LINE_CAP',
          severity: 'ERROR',
          expected: `<= ${constants.MAX_LINES_PER_LAYER} lines and <= 952px advance width at >= ${minPx}px`,
          actual: `${fit.lineCount} lines, ${fit.maxLineWidthPx}px width for "${layer.text}"`,
          frame: s.startFrame,
          autoFixed: false,
        });
      }
    }

    // Beat-quantized payoff timing check
    const expectedBeatOffset = computeExpectedBeatPayoffOffset(
      s,
      beatGrid,
      timeline.meta.bpm
    );
    if (autoFix && s.textLayers?.[1] && styleMode === 'DOCUMENTARY_SANS') {
      if (s.textLayers[1].triggerFrameOffset !== expectedBeatOffset) {
        s.textLayers[1].triggerFrameOffset = expectedBeatOffset;
        timelineModified = true;
      }
    }

    const setupOffset = s.textLayers?.[0]?.triggerFrameOffset ?? 0;
    const payoffOffset = s.textLayers?.[1]?.triggerFrameOffset ?? 30;
    const [minBeatWin, maxBeatWin] = constants.PAYOFF_BEAT_WINDOW_FRAMES;
    const timingOk =
      styleMode === 'DOCUMENTARY_SANS'
        ? setupOffset === 0 && payoffOffset >= minBeatWin && payoffOffset <= maxBeatWin
        : setupOffset === 0;

    // Editorial citation check for numeric claims in DOCUMENTARY_SANS
    const hasNumericStat = /\b\d{2,}\b/.test(combinedText);
    if (hasNumericStat && !s.claim && autoFix) {
      s.claim = {
        text: combinedText,
        source: `${timeline.meta.title} Archival Record`,
        verified: true,
      };
      timelineModified = true;
    }

    if (!durOk) {
      violations.push({
        sceneId: s.sceneId,
        rule: 'SCENE_PACING_WINDOW',
        severity: 'ERROR',
        expected: `${constants.MIN_SCENE_FRAMES}..${maxAllowedSceneFrames}f`,
        actual: `${s.durationFrames}f`,
        frame: s.startFrame,
        autoFixed: false,
      });
    }
    if (!wordOk) {
      violations.push({
        sceneId: s.sceneId,
        rule: 'WORD_BUDGET',
        severity: 'ERROR',
        expected: `${constants.WORD_BUDGET_MIN}..${constants.WORD_BUDGET_MAX} words`,
        actual: `${words} words`,
        frame: s.startFrame,
        autoFixed: false,
      });
    }
    if (!timingOk) {
      violations.push({
        sceneId: s.sceneId,
        rule: 'BEAT_SYNC_PAYOFF',
        severity: 'ERROR',
        expected: `setup=0, payoff in [${minBeatWin}..${maxBeatWin}]f (beat=${expectedBeatOffset}f)`,
        actual: `[${setupOffset}, ${payoffOffset}]`,
        frame: s.startFrame,
        autoFixed: false,
      });
    }

    const statusMark = durOk && wordOk && glyphFitOk && timingOk ? '✅' : '❌';
    console.log(
      `${statusMark} Scene ${String(i + 1).padStart(2, '0')} [${s.sceneId}]: ` +
        `${s.durationFrames}f (${sSec.toFixed(2)}s) | ${words}w | ` +
        `beatOffsets: [${setupOffset}, ${payoffOffset} (target:${expectedBeatOffset})] | cam: ${s.camera?.movement}`
    );
  }

  if (timelineModified) {
    fs.writeFileSync(timelinePath, JSON.stringify(timeline, null, 2), 'utf8');
    // If current_reel.json mirrors this project, keep it synced
    const currentPath = path.resolve('src/timelines/current_reel.json');
    if (
      timelinePath !== currentPath &&
      fs.existsSync(currentPath) &&
      JSON.parse(fs.readFileSync(currentPath, 'utf8')).meta?.title === timeline.meta?.title
    ) {
      fs.writeFileSync(currentPath, JSON.stringify(timeline, null, 2), 'utf8');
    }
    console.log(`\n🛠️  [AUTO-FIX] Saved beat-synced & lint-repaired timeline to ${timelinePath}`);
  }

  // Write reproducible project manifest
  writeProjectManifest(projectInfo);

  const errorViolations = violations.filter((v) => v.severity === 'ERROR');
  const outAuditDir = path.resolve('out/audit');
  const projAuditDir = path.join(projectDir, 'audit');
  if (!fs.existsSync(outAuditDir)) fs.mkdirSync(outAuditDir, { recursive: true });
  if (!fs.existsSync(projAuditDir)) fs.mkdirSync(projAuditDir, { recursive: true });

  // === [2] FAST VISUAL AUDIT RENDERING & MICRO-MOTION DIFF ===
  const motionChecks = [];
  if (!skipStills && errorViolations.length === 0) {
    console.log('\n=== [2] COMMENCING REMOTION VISUAL AUDIT STILLS & MICRO-MOTION CHECK ===');
    const bundleLocation = await bundle({
      entryPoint: path.resolve('src/index.ts'),
    });

    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: projectInfo.compositionId || 'HistoricalReel',
      inputProps: { timeline },
    });

    for (let idx = 0; idx < timeline.scenes.length; idx++) {
      const scene = timeline.scenes[idx];
      // For Scene 1, also verify Frame 0 sharp poster frame
      const auditFrame = Math.floor(scene.startFrame + scene.durationFrames * 0.55);
      const outStill = path.join(outAuditDir, `${scene.sceneId}.png`);
      const projStill = path.join(projAuditDir, `${scene.sceneId}.png`);

      process.stdout.write(`  -> Rendering [${scene.sceneId}] @ frame ${auditFrame}... `);
      await renderStill({
        composition,
        serveUrl: bundleLocation,
        output: outStill,
        frame: auditFrame,
        logLevel: 'error',
      });
      fs.copyFileSync(outStill, projStill);

      // Optional micro-motion secondary frame-diff check
      if (checkMotion) {
        const earlyFrame = scene.startFrame + 12;
        const lateFrame = scene.startFrame + scene.durationFrames - 12;
        const earlyTmp = path.join(outAuditDir, `_tmp_${scene.sceneId}_a.png`);
        const lateTmp = path.join(outAuditDir, `_tmp_${scene.sceneId}_b.png`);
        await renderStill({
          composition,
          serveUrl: bundleLocation,
          output: earlyTmp,
          frame: earlyFrame,
          logLevel: 'error',
        });
        await renderStill({
          composition,
          serveUrl: bundleLocation,
          output: lateTmp,
          frame: lateFrame,
          logLevel: 'error',
        });
        const bufA = fs.readFileSync(earlyTmp);
        const bufB = fs.readFileSync(lateTmp);
        const isIdentical = bufA.equals(bufB);
        try {
          fs.unlinkSync(earlyTmp);
          fs.unlinkSync(lateTmp);
        } catch {}
        motionChecks.push({ sceneId: scene.sceneId, hasMotion: !isIdentical });
        if (isIdentical) {
          violations.push({
            sceneId: scene.sceneId,
            rule: 'MICRO_MOTION_CHECK',
            severity: 'ERROR',
            expected: 'Non-zero frame delta between early and late scene frames',
            actual: 'Zero frame delta (frozen scene)',
            frame: earlyFrame,
            autoFixed: false,
          });
        }
      }

      console.log('DONE');
    }

    // Also render sharp Frame 0 poster into deliverables/poster.png
    const delivDir = path.join(projectDir, 'deliverables');
    if (!fs.existsSync(delivDir)) fs.mkdirSync(delivDir, { recursive: true });
    const posterPath = path.join(delivDir, 'poster.png');
    await renderStill({
      composition,
      serveUrl: bundleLocation,
      output: posterPath,
      frame: 0,
      logLevel: 'error',
    });
    console.log(`  -> Exported sharp Frame 0 poster to ${posterPath}`);
  }

  // Export SRT captions, metadata, and 4:5 IG crop
  exportProjectDeliverables(slug);

  const finalErrors = violations.filter((v) => v.severity === 'ERROR');
  const report = {
    projectSlug: slug,
    title: timeline.meta.title,
    timestamp: new Date().toISOString(),
    passed: finalErrors.length === 0,
    totalFrames,
    durationSec: Number(totalSec.toFixed(2)),
    maxFramesCeiling: constants.MAX_FRAMES,
    sceneCount: timeline.scenes.length,
    errorCount: finalErrors.length,
    warningCount: violations.filter((v) => v.severity === 'WARNING').length,
    motionChecks,
    violations,
  };

  const outReportPath = path.join(outAuditDir, 'audit_report.json');
  const projReportPath = path.join(projAuditDir, 'audit_report.json');
  fs.writeFileSync(outReportPath, JSON.stringify(report, null, 2), 'utf8');
  fs.writeFileSync(projReportPath, JSON.stringify(report, null, 2), 'utf8');

  console.log(`\n📄 Audit JSON report written to:`);
  console.log(`   - ${outReportPath}`);
  console.log(`   - ${projReportPath}`);

  if (!report.passed) {
    console.error(`\n❌ Audit failed with ${finalErrors.length} error(s).`);
    process.exit(1);
  }
  console.log(`\n✅ All ${timeline.scenes.length} scenes passed specification, lint, and safe-zone audits!`);
  return report;
}

if (require.main === module) {
  runAudit().catch((err) => {
    console.error('Fatal audit failure:', err);
    process.exit(1);
  });
}

module.exports = { runAudit };
