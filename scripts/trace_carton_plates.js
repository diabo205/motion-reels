const fs = require('fs');
const path = require('path');
const potrace = require('potrace');

function traceImage(inputPath, options = {}) {
  return new Promise((resolve, reject) => {
    potrace.trace(inputPath, {
      threshold: options.threshold || 128,
      turdSize: options.turdSize || 4,
      optCurve: true,
      alphaMax: 1.0,
      optTolerance: 0.2,
      ...options
    }, (err, svg) => {
      if (err) reject(err);
      else resolve(svg);
    });
  });
}

function extractMainPath(svgString) {
  const matches = svgString.match(/d="([^"]+)"/g);
  if (!matches || matches.length === 0) return '';
  // Sort paths by length to find the most detailed geometry
  const paths = matches.map(m => m.replace(/^d="/, '').replace(/"$/, ''));
  paths.sort((a, b) => b.length - a.length);
  return paths[0];
}

async function main() {
  const tasks = [
    {
      name: 'sunderland_flying_boat',
      file: 'projects/carton-de-wiart-1916/plates/short_sunderland_boat.jpg',
      options: { threshold: 120, turdSize: 5 }
    },
    {
      name: 'polish_armoured_train',
      file: 'projects/carton-de-wiart-1916/plates/polish_armoured_train_1.jpg',
      options: { threshold: 110, turdSize: 5 }
    },
    {
      name: 'biplane_crash',
      file: 'projects/carton-de-wiart-1916/plates/biplane_crash_wreck.jpg',
      options: { threshold: 125, turdSize: 4 }
    },
    {
      name: 'vincigliata_fortress',
      file: 'projects/carton-de-wiart-1916/plates/italian_medieval_fortress.jpg',
      options: { threshold: 130, turdSize: 6 }
    },
    {
      name: 'victoria_cross',
      file: 'projects/carton-de-wiart-1916/plates/victoria_cross_medal.jpg',
      options: { threshold: 135, turdSize: 3 }
    },
    {
      name: 'tuscany_cypresses',
      file: 'projects/carton-de-wiart-1916/plates/italian_countryside_peasant.jpg',
      options: { threshold: 115, turdSize: 5 }
    }
  ];

  const results = {};

  for (const t of tasks) {
    console.log(`Tracing ${t.name}...`);
    const svg = await traceImage(t.file, t.options);
    const mainPath = extractMainPath(svg);
    const outSvg = path.resolve(`projects/carton-de-wiart-1916/plates/${t.name}.svg`);
    fs.writeFileSync(outSvg, svg, 'utf8');
    console.log(`  -> Saved ${t.name}.svg (${svg.length} bytes, main path: ${mainPath.length} chars)`);
    results[t.name] = {
      path: mainPath,
      viewBox: (svg.match(/viewBox="([^"]+)"/) || [])[1] || '0 0 1000 1000'
    };
  }

  const outJson = path.resolve('projects/carton-de-wiart-1916/plates/traced_assets.json');
  fs.writeFileSync(outJson, JSON.stringify(results, null, 2), 'utf8');
  console.log(`[ALL DONE] Saved traced_assets.json (${Object.keys(results).length} assets)`);
}

main().catch(console.error);
