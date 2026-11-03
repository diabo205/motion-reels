#!/usr/bin/env node
/**
 * Automated Reference Plate Vector Extraction Tool (scripts/trace_plate_contours.js)
 * Converts authentic photographic reference plates into high-entropy, production-ready
 * SVG vector paths and React Remotion components via Potrace contour tracing.
 *
 * Usage:
 *   node scripts/trace_plate_contours.js --project <slug> --all
 *   node scripts/trace_plate_contours.js --project <slug> --plate <filename> --name <assetName> [--threshold 128] [--posterize 3]
 */

const fs = require('fs');
const path = require('path');
const potrace = require('potrace');
const { resolveProject } = require('./project_resolver');

function tracePlate(inputPath, options = {}) {
  return new Promise((resolve, reject) => {
    const isPosterize = Boolean(options.posterize && options.posterize > 1);
    const traceFn = isPosterize ? potrace.posterize : potrace.trace;
    const config = {
      threshold: options.threshold !== undefined ? options.threshold : 128,
      steps: options.posterize || 3,
      turdSize: options.turdSize !== undefined ? options.turdSize : 4,
      optCurve: true,
      alphaMax: 1.0,
      optTolerance: 0.3,
      ...options,
    };

    traceFn(inputPath, config, (err, svg) => {
      if (err) return reject(err);

      // Extract viewBox
      const vbMatch = svg.match(/viewBox="([^"]+)"/);
      const viewBox = vbMatch ? vbMatch[1] : '0 0 1080 1920';

      // Extract path elements with fills
      const pathRegex = /<path\s+([^>]+)>/g;
      const paths = [];
      let match;
      while ((match = pathRegex.exec(svg)) !== null) {
        const attrStr = match[1];
        const dMatch = attrStr.match(/d="([^"]+)"/);
        const fillMatch = attrStr.match(/fill="([^"]+)"/);
        if (dMatch) {
          paths.push({
            d: dMatch[1],
            fill: fillMatch ? fillMatch[1] : 'currentColor',
            length: dMatch[1].length,
          });
        }
      }

      // Sort by length (most complex path first)
      paths.sort((a, b) => b.length - a.length);

      resolve({ viewBox, paths, rawSvg: svg });
    });
  });
}

function sanitizeIdentifier(str) {
  return str
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/^[0-9]/, 'Asset_$&');
}

function toPascalCase(str) {
  return str
    .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
    .replace(/^(\w)/, (_, c) => c.toUpperCase());
}

async function main() {
  const args = process.argv.slice(2);
  const projIdx = args.indexOf('--project');
  const explicitSlug = projIdx !== -1 ? args[projIdx + 1] : undefined;
  const plateIdx = args.indexOf('--plate');
  const targetPlate = plateIdx !== -1 ? args[plateIdx + 1] : undefined;
  const nameIdx = args.indexOf('--name');
  const customName = nameIdx !== -1 ? args[nameIdx + 1] : undefined;
  const threshIdx = args.indexOf('--threshold');
  const threshold = threshIdx !== -1 ? parseInt(args[threshIdx + 1], 10) : 128;
  const postIdx = args.indexOf('--posterize');
  const posterizeSteps = postIdx !== -1 ? parseInt(args[postIdx + 1], 10) : null;
  const traceAll = args.includes('--all');

  const proj = resolveProject(explicitSlug);
  const { slug, projectDir } = proj;
  const platesDir = path.join(projectDir, 'plates');

  if (!fs.existsSync(platesDir)) {
    console.error(`Plates directory does not exist: ${platesDir}`);
    process.exit(1);
  }

  const platesToProcess = [];

  if (targetPlate) {
    const fullPlatePath = path.isAbsolute(targetPlate)
      ? targetPlate
      : path.join(platesDir, targetPlate);
    if (!fs.existsSync(fullPlatePath)) {
      console.error(`Plate not found: ${fullPlatePath}`);
      process.exit(1);
    }
    const assetName = customName || path.basename(targetPlate, path.extname(targetPlate));
    platesToProcess.push({ name: assetName, file: fullPlatePath });
  } else if (traceAll) {
    // Read scene_specs.json if available
    const specsPath = path.join(projectDir, 'scene_specs.json');
    if (fs.existsSync(specsPath)) {
      try {
        const specs = JSON.parse(fs.readFileSync(specsPath, 'utf8'));
        for (const s of specs) {
          if (s.plate) {
            const pFile = path.join(platesDir, s.plate);
            if (fs.existsSync(pFile)) {
              const baseName = `Scene_${String(s.scene).padStart(2, '0')}_${s.archetype || 'Trace'}`;
              platesToProcess.push({ name: baseName, file: pFile, scene: s.scene });
            }
          }
        }
      } catch (err) {
        console.warn(`Could not parse scene_specs.json: ${err.message}`);
      }
    }

    // If no specs or specs had no plates, scan plates directory
    if (platesToProcess.length === 0) {
      const allFiles = fs.readdirSync(platesDir);
      for (const f of allFiles) {
        if (/\.(jpe?g|png|webp)$/i.test(f)) {
          const pFile = path.join(platesDir, f);
          const baseName = path.basename(f, path.extname(f));
          platesToProcess.push({ name: baseName, file: pFile });
        }
      }
    }
  } else {
    console.log('Usage:');
    console.log('  node scripts/trace_plate_contours.js --project <slug> --all');
    console.log('  node scripts/trace_plate_contours.js --project <slug> --plate <filename> --name <assetName>');
    process.exit(0);
  }

  console.log(`\n=== TRACING REFERENCE PLATES FOR [${slug}] ===`);
  console.log(`Found ${platesToProcess.length} plate(s) to process.`);

  const tracedDict = {};
  const tsxComponents = [];

  for (const item of platesToProcess) {
    process.stdout.write(`  -> Tracing [${item.name}] from ${path.basename(item.file)}... `);
    try {
      const result = await tracePlate(item.file, {
        threshold,
        posterize: posterizeSteps,
      });

      const compName = toPascalCase(sanitizeIdentifier(item.name));
      tracedDict[compName] = {
        name: compName,
        sourcePlate: path.basename(item.file),
        viewBox: result.viewBox,
        pathCount: result.paths.length,
        paths: result.paths.slice(0, 8), // Store top 8 detail paths
      };

      // Generate a standalone React Remotion SVG component
      const pathsJsx = result.paths
        .slice(0, 8)
        .map((p, idx) => {
          return `      <path\n        key={${idx}}\n        d="${p.d}"\n        fill={color || "${p.fill}"}\n        opacity={opacity}\n      />`;
        })
        .join('\n');

      const compJsx = `
/**
 * Traced from authentic archival reference plate: ${path.basename(item.file)}
 */
export const ${compName}Silhouette: React.FC<{
  color?: string;
  opacity?: number;
  scale?: number;
  x?: number;
  y?: number;
  className?: string;
}> = ({ color, opacity = 1, scale = 1, x = 0, y = 0, className = '' }) => {
  return (
    <g transform={\`translate(\${x}, \${y}) scale(\${scale})\`} className={className}>
${pathsJsx}
    </g>
  );
};`;
      tsxComponents.push(compJsx);
      console.log(`DONE (${result.paths.length} paths extracted)`);
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
    }
  }

  // Write JSON dictionary
  const jsonOut = path.join(platesDir, 'traced_plate_assets.json');
  fs.writeFileSync(jsonOut, JSON.stringify(tracedDict, null, 2), 'utf8');
  console.log(`\n✅ Saved traced path dictionary to: ${jsonOut}`);

  // Write React TSX library
  const tsxHeader = `import React from 'react';\n// Auto-generated photographic silhouette vectors from project reference plates\n// Generated by scripts/trace_plate_contours.js\n`;
  const tsxOut = path.join(platesDir, 'TracedPlateAssets.tsx');
  fs.writeFileSync(tsxOut, tsxHeader + tsxComponents.join('\n\n'), 'utf8');
  console.log(`✅ Saved React TSX components to: ${tsxOut}\n`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error(`Fatal error in trace_plate_contours: ${err.stack || err.message}`);
    process.exit(1);
  });
}

module.exports = { tracePlate };
