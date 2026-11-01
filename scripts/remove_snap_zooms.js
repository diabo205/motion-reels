const fs = require('fs');

const files = [
  'src/timelines/taiping_1850.json',
  'src/timelines/current_reel.json',
  'projects/taiping-rebellion-1850/timeline.json',
];

files.forEach((filePath) => {
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Scene 2 (index 1)
  data.scenes[1].camera = {
    movement: 'SLOW_PUSH_IN',
    intensity: 0.4,
  };

  // Scene 3 (index 2) - change SNAP_ZOOM to SLOW_PUSH_IN
  data.scenes[2].camera = {
    movement: 'SLOW_PUSH_IN',
    intensity: 0.4,
  };

  // Scene 5 (index 4)
  data.scenes[4].camera = {
    movement: 'SLOW_PUSH_IN',
    intensity: 0.4,
  };

  console.log(`Updated camera in ${filePath}`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
});
