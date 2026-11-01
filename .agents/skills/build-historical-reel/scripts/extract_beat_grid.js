#!/usr/bin/env node
/**
 * Extracts BPM, bar downbeats, and transient hit frames (at 60 FPS).
 * Node.js fallback implementation for extract_beat_grid.
 */
const fs = require('fs');
const path = require('path');

const FPS = 60;
const MAX_FRAMES = 3500;
const MIN_SCENE_FRAMES = 120;
const TARGET_MAX_SCENE_FRAMES = 168;
const PAYOFF_WINDOW = [18, 45];
const SFX_LEAD_FRAMES = 2;

function generateFallbackGrid(bpm = 120.0, durationSec = 58.0) {
  const beatIntervalSec = 60.0 / bpm;
  const beats = [];
  const bars = [];
  const transients = [];
  const bassDrops = [];
  const cymbalCrashes = [];
  const energyPeaks = [];
  let t = 0.0;
  let beatIdx = 0;

  while (t < durationSec) {
    const frame = Math.round(t * FPS);
    const beatObj = { beat: beatIdx, timeSec: Number(t.toFixed(4)), frame };
    beats.push(beatObj);

    // Synthesize structured transient markers for downbeats and energy peaks
    if (beatIdx % 4 === 0) {
      bars.push({ bar: Math.floor(beatIdx / 4), timeSec: Number(t.toFixed(4)), frame });
      const dropObj = {
        frame,
        timeSec: Number(t.toFixed(4)),
        type: beatIdx % 8 === 0 ? 'BASS_DROP' : 'ENERGY_PEAK',
        strength: beatIdx % 8 === 0 ? 0.85 : 0.65,
        bassEnergy: beatIdx % 8 === 0 ? 0.9 : 0.5,
        highEnergy: 0.4,
        rms: 0.7,
      };
      transients.push(dropObj);
      if (dropObj.type === 'BASS_DROP') bassDrops.push(dropObj);
      else energyPeaks.push(dropObj);
    } else if (beatIdx % 2 === 1 && beatIdx % 4 === 3) {
      const crashObj = {
        frame,
        timeSec: Number(t.toFixed(4)),
        type: 'CYMBAL_CRASH',
        strength: 0.6,
        bassEnergy: 0.2,
        highEnergy: 0.85,
        rms: 0.5,
      };
      transients.push(crashObj);
      cymbalCrashes.push(crashObj);
    } else {
      transients.push({
        frame,
        timeSec: Number(t.toFixed(4)),
        type: 'BEAT_ONSET',
        strength: 0.4,
        bassEnergy: 0.3,
        highEnergy: 0.3,
        rms: 0.4,
      });
    }

    t += beatIntervalSec;
    beatIdx += 1;
  }

  // Generate recommended scene cuts and structural fracture anchors
  const maxTotalFrames = Math.min(MAX_FRAMES, Math.round(durationSec * FPS));
  const cuts = [];
  const structuralFractureRecs = [];
  let curStart = 0;
  let sceneIdx = 1;

  while (curStart + MIN_SCENE_FRAMES <= maxTotalFrames) {
    const winMin = curStart + MIN_SCENE_FRAMES;
    const winMax = Math.min(maxTotalFrames, curStart + TARGET_MAX_SCENE_FRAMES);

    const wTransients = transients.filter((tr) => tr.frame >= winMin && tr.frame <= winMax);
    let nextCut = null;
    let cutTriggerType = 'TEMPO_GRID';

    const wDrops = wTransients.filter((tr) => tr.type === 'BASS_DROP');
    if (wDrops.length > 0) {
      nextCut = wDrops[0].frame;
      cutTriggerType = 'BASS_DROP';
    } else if (wTransients.length > 0) {
      nextCut = wTransients[0].frame;
      cutTriggerType = wTransients[0].type;
    } else {
      nextCut = Math.min(curStart + 136, maxTotalFrames);
    }

    const dur = nextCut - curStart;
    if (dur < MIN_SCENE_FRAMES) break;

    const payoffCandidates = transients.filter(
      (tr) => tr.frame >= curStart + PAYOFF_WINDOW[0] && tr.frame <= curStart + PAYOFF_WINDOW[1]
    );
    let payoffOffset = 30;
    let payoffType = 'BEAT_CENTER';
    if (payoffCandidates.length > 0) {
      payoffOffset = payoffCandidates[0].frame - curStart;
      payoffType = payoffCandidates[0].type;
    }

    const hasDrop = transients.some(
      (tr) => tr.frame >= curStart && tr.frame < nextCut && (tr.type === 'BASS_DROP' || tr.type === 'ENERGY_PEAK')
    );

    if (hasDrop) {
      structuralFractureRecs.push({
        sceneIndex: sceneIdx,
        startFrame: curStart,
        hitFrame: curStart + payoffOffset,
        hitOffset: payoffOffset,
        transientType: payoffType,
        strength: 0.75,
        suggestedSfx: 'artillery_shell.wav',
        sfxOffset: Math.max(0, payoffOffset - SFX_LEAD_FRAMES),
        suggestedCamera: 'IMPACT_SHAKE',
      });
    }

    cuts.push({
      sceneIndex: sceneIdx,
      startFrame: curStart,
      durationFrames: dur,
      cutTriggerType,
      payoffBeatOffset: payoffOffset,
      payoffTransientType: payoffType,
      sfxLeadOffset: Math.max(0, payoffOffset - SFX_LEAD_FRAMES),
      structuralFractureRecommended: hasDrop && sceneIdx > 1,
    });

    curStart = nextCut;
    sceneIdx += 1;
  }

  return {
    bpm: Number(bpm.toFixed(2)),
    fps: FPS,
    maxFramesCeiling: MAX_FRAMES,
    driftPolicy: 'NODE_TRANSIENT_FALLBACK',
    analysisEngine: 'node_fallback',
    sfxPerceptualLeadFrames: SFX_LEAD_FRAMES,
    durationSec,
    transientStats: {
      totalTransients: transients.length,
      bassDropCount: bassDrops.length,
      cymbalCrashCount: cymbalCrashes.length,
      energyPeakCount: energyPeaks.length,
      onsetCount: transients.length - bassDrops.length - cymbalCrashes.length - energyPeaks.length,
    },
    bars,
    beats,
    transients,
    bassDrops,
    cymbalCrashes,
    energyPeaks,
    recommendedSceneCuts: cuts,
    structuralFractureRecommendations: structuralFractureRecs,
  };
}

function main() {
  const audioPath = process.argv[2] || 'assets/audio/bgm.mp3';
  const outPath = process.argv[3] || 'assets/audio/beat_grid.json';

  console.log(`[INFO] Generating transient beat grid fallback for ${audioPath}.`);
  const grid = generateFallbackGrid(120.0, 58.0);

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(grid, null, 2), 'utf8');
  console.log(
    `[OK] Beat grid written to ${outPath} (${grid.bars.length} bars, ${grid.transients.length} transients @ ${grid.bpm} BPM).`
  );
}

main();
