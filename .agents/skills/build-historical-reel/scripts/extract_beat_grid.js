#!/usr/bin/env node
/**
 * Extracts BPM, bar downbeats, and transient hit frames (at 60 FPS).
 * Node.js fallback implementation for extract_beat_grid.
 */
const fs = require('fs');
const path = require('path');

const FPS = 60;

function generateFallbackGrid(bpm = 140.0, durationSec = 58.0) {
  const beatIntervalSec = 60.0 / bpm;
  const barIntervalSec = beatIntervalSec * 4;
  const beats = [];
  const bars = [];
  let t = 0.0;
  let beatIdx = 0;

  while (t < durationSec) {
    const frame = Math.round(t * FPS);
    beats.push({ beat: beatIdx, timeSec: Number(t.toFixed(3)), frame });
    if (beatIdx % 4 === 0) {
      bars.push({ bar: Math.floor(beatIdx / 4), timeSec: Number(t.toFixed(3)), frame });
    }
    t += beatIntervalSec;
    beatIdx += 1;
  }
  return { bpm, fps: FPS, durationSec, bars, beats };
}

function main() {
  const audioPath = process.argv[2] || 'assets/audio/bgm.mp3';
  const outPath = process.argv[3] || 'assets/audio/beat_grid.json';

  console.log(`[INFO] ${audioPath} not loaded (node fallback); generating default 140 BPM beat grid (58s).`);
  const grid = generateFallbackGrid();

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(grid, null, 2), 'utf8');
  console.log(`[OK] Beat grid written to ${outPath} (${grid.bars.length} bars, ${grid.beats.length} beats @ ${grid.bpm} BPM).`);
}

main();
