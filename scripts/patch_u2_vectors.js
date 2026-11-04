const fs = require('fs');

// 1. Read U2Reel26sVectors.tsx and clamp all interpolate calls
let reel26s = fs.readFileSync('src/components/U2Reel26sVectors.tsx', 'utf8');
reel26s = reel26s.replace(
  "interpolate(frame, [0, 116], [0, 180])",
  "interpolate(frame, [0, 116], [0, 180], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })"
);
reel26s = reel26s.replace(
  "interpolate(frame, [0, 120], [0, 240])",
  "interpolate(frame, [0, 120], [0, 240], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })"
);
reel26s = reel26s.replace(
  "interpolate(frame, [0, 35, 120], [0.4, 1.35, 1.8])",
  "interpolate(frame, [0, 35, 120], [0.4, 1.35, 1.8], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })"
);
reel26s = reel26s.replace(
  "interpolate(frame, [0, 35, 90, 120], [0.8, 1.0, 0.6, 0.2])",
  "interpolate(frame, [0, 35, 90, 120], [0.8, 1.0, 0.6, 0.2], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })"
);
reel26s = reel26s.replace(
  "interpolate(frame, [0, 120], [0, -60])",
  "interpolate(frame, [0, 120], [0, -60], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })"
);
reel26s = reel26s.replace(
  "interpolate(frame, [0, 90], [1, 5.9])",
  "interpolate(frame, [0, 90], [1, 5.9], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })"
);
fs.writeFileSync('src/components/U2Reel26sVectors.tsx', reel26s, 'utf8');

// 2. Add traced imports to U2IncidentVectors.tsx if missing
let inc = fs.readFileSync('src/components/U2IncidentVectors.tsx', 'utf8');
inc = inc.replace(/export \* from '\.\/U2Reel26sVectors';\r?\n?/g, '');

const tracedImport = `import {
  SovietRadarP30Silhouette,
  S75DvinaMissileSilhouette,
  U2WreckageSverdlovskSilhouette,
  NasaFlightMapTurkeySilhouette,
  FakeNasaU2WeatherSilhouette,
  EisenhowerPortraitSilhouette,
  KremlinMoscowRedSilhouette,
  KhrushchevOfficialFullSilhouette,
  KhrushchevPortraitSilhouette,
  PowersPortraitSilhouette,
  PowersPressureSuitSilhouette,
  PowersSovietTrialSilhouette,
  RudolfAbelSilhouette,
} from '../../projects/u2-incident-1960/plates/TracedPlateAssets';\n`;

if (!inc.includes('SovietRadarP30Silhouette')) {
  inc = tracedImport + inc;
}

// Extract component definitions from U2Reel26sVectors.tsx (skip imports)
const bodyStart = reel26s.indexOf('// =========================================================================\n// SCENE 1: SOVIET RADAR CLOSEUP LOCK');
const componentsBody = reel26s.slice(bodyStart);

if (!inc.includes('export const SovietRadarCloseupLock')) {
  inc = inc + '\n\n' + componentsBody;
}

fs.writeFileSync('src/components/U2IncidentVectors.tsx', inc, 'utf8');
console.log('Updated U2IncidentVectors.tsx and U2Reel26sVectors.tsx cleanly!');
