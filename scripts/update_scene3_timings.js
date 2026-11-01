const fs = require('fs');

const files = [
  'src/timelines/taiping_1850.json',
  'src/timelines/current_reel.json',
  'projects/taiping-rebellion-1850/timeline.json',
];

files.forEach((filePath) => {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Scene 3 (index 2)
  data.scenes[2].textLayers = [
    {
      text: 'HEAVENLY BLADE DESTROYS THE BANNER',
      triggerFrameOffset: 0,
      tier: 'PRIMARY_STATEMENT',
      colorToken: 'PURE_WHITE',
      animation: 'BLUR_TO_SHARP',
    },
    {
      text: 'YANGTZE VALLEY IGNITES IN WAR',
      triggerFrameOffset: 30,
      tier: 'SECONDARY_ACCENT',
      colorToken: 'ALERT_RED',
      animation: 'SCALE_SLAM',
    },
  ];

  data.scenes[2].sfxTriggers = [
    { sfxFile: 'blade_slash.wav', frameOffset: 0 },
    { sfxFile: 'sub_boom.wav', frameOffset: 45 },
    { sfxFile: 'counter_roll.wav', frameOffset: 70 },
    { sfxFile: 'stamp_slam.wav', frameOffset: 114 },
  ];

  console.log(`Updated Scene 3 in ${filePath}`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
});
