const fs = require('fs');

const files = [
  'src/timelines/taiping_1850.json',
  'src/timelines/current_reel.json',
  'projects/taiping-rebellion-1850/timeline.json',
];

files.forEach((filePath) => {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Scene 2 is 180 frames (3.0s)
  data.scenes[1].startFrame = 150;
  data.scenes[1].durationFrames = 180;
  data.scenes[1].sfxTriggers = [
    { sfxFile: 'paper_rip.wav', frameOffset: 0 },
    { sfxFile: 'stamp_slam.wav', frameOffset: 48 },
    { sfxFile: 'counter_roll.wav', frameOffset: 110 },
    { sfxFile: 'sub_boom.wav', frameOffset: 142 },
  ];

  // Recalculate startFrames for scenes 3 through 11
  for (let i = 2; i <= 10; i++) {
    data.scenes[i].startFrame = data.scenes[i - 1].startFrame + data.scenes[i - 1].durationFrames;
  }

  // Scene 12 reduced to 120 frames so Scene 13 hits exactly frame 1800
  data.scenes[11].startFrame = data.scenes[10].startFrame + data.scenes[10].durationFrames;
  data.scenes[11].durationFrames = 120;

  const totalFrames = data.scenes.reduce(
    (max, s) => Math.max(max, s.startFrame + s.durationFrames),
    0
  );

  console.log(`${filePath} -> Scene 13 startFrame: ${data.scenes[12].startFrame}, Total Frames: ${totalFrames}`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
});
