const fs = require('fs');
const { dprk, rok } = JSON.parse(fs.readFileSync('projects/binance-heist-2026/plates/korea_paths.json', 'utf8'));

const dmzLine = 'M 605.1 1144.7 Q 540.0 1152.0 478.0 1165.0';

const code = `/**
 * Real Geographic Projection Data for Korean Peninsula
 * Extracted from Natural Earth 1:50m / d3-geo Mercator Projection
 * Calibrated for 1080x1920 9:16 Canvas Viewport (y = 864px to 1498px)
 */

export const DPRK_BORDER_PATH = ${JSON.stringify(dprk)};

export const ROK_BORDER_PATH = ${JSON.stringify(rok)};

export const DMZ_BORDER_LINE = ${JSON.stringify(dmzLine)};

export const KOREA_CITIES = {
  PYONGYANG: [435.3, 1113.6] as [number, number],
  SEOUL: [508.8, 1229.4] as [number, number],
  BUSAN: [637.2, 1412.3] as [number, number],
  INCHEON: [491.5, 1237.9] as [number, number],
  WONSAN: [539.0, 1104.1] as [number, number],
  SINUIJU: [351.4, 1028.0] as [number, number],
  HAMHUNG: [552.0, 1070.0] as [number, number],
  KAESONG: [482.0, 1160.0] as [number, number],
  DAEJEON: [535.0, 1300.0] as [number, number],
  DAEGU: [595.0, 1345.0] as [number, number],
  GWANGJU: [490.0, 1390.0] as [number, number],
};
`;

fs.writeFileSync('src/components/KoreaGeoData.ts', code, 'utf8');
console.log('Successfully wrote src/components/KoreaGeoData.ts');
