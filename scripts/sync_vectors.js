const fs = require('fs');

const reelCode = fs.readFileSync('src/components/U2Reel26sVectors.tsx', 'utf8');
let inc = fs.readFileSync('src/components/U2IncidentVectors.tsx', 'utf8');

// Normalize line endings to \n
inc = inc.replace(/\r\n/g, '\n');

const marker = '// =========================================================================\n// SCENE 1: SOVIET RADAR CLOSEUP LOCK';
const idx = inc.indexOf(marker);
if (idx !== -1) {
  inc = inc.slice(0, idx);
}

const reelMarker = '// =========================================================================\n// SCENE 1: SOVIET RADAR CLOSEUP LOCK';
const reelStart = reelCode.indexOf(reelMarker);
const newContent = inc.trimEnd() + '\n\n' + reelCode.slice(reelStart);

fs.writeFileSync('src/components/U2IncidentVectors.tsx', newContent, 'utf8');
console.log('Successfully synced U2IncidentVectors.tsx!');
