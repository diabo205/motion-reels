const fs = require('fs');

const files = [
  'src/timelines/taiping_1850.json',
  'src/timelines/current_reel.json',
  'projects/taiping-rebellion-1850/timeline.json',
];

files.forEach((filePath) => {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Scene 5 (index 4)
  data.scenes[4].sfxTriggers = [
    { sfxFile: 'paper_rip.wav', frameOffset: 0 },
    { sfxFile: 'blade_slash.wav', frameOffset: 48 },
    { sfxFile: 'counter_roll.wav', frameOffset: 68 },
    { sfxFile: 'war_drum.wav', frameOffset: 102 },
  ];

  console.log(`Updated Scene 5 in ${filePath}`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
});
