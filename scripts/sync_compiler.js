const fs = require('fs');
const path = require('path');

const tl = JSON.parse(fs.readFileSync('src/timelines/carton_de_wiart_1916.json', 'utf8'));
const scriptContent = `const fs = require('fs');
const path = require('path');

const timeline = ${JSON.stringify(tl, null, 2)};

const outPath1 = path.resolve('src/timelines/carton_de_wiart_1916.json');
const outPath2 = path.resolve('src/timelines/current_reel.json');
const outPath3 = path.resolve('projects/carton-de-wiart-1916/timeline.json');

fs.writeFileSync(outPath1, JSON.stringify(timeline, null, 2), 'utf8');
fs.writeFileSync(outPath2, JSON.stringify(timeline, null, 2), 'utf8');
fs.writeFileSync(outPath3, JSON.stringify(timeline, null, 2), 'utf8');

console.log('[OK] Timeline written successfully.');
`;

fs.writeFileSync('scripts/compile_carton_timeline.js', scriptContent, 'utf8');
console.log('Successfully synced compile_carton_timeline.js');
