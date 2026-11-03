const fs = require('fs');
const path = require('path');
const constants = require('../config/pipeline_constants.json');

// Cache of read file contents to avoid re-reading files repeatedly
const fileCache = new Map();

function readFileCached(filePath) {
  const abs = path.resolve(filePath);
  if (fileCache.has(abs)) return fileCache.get(abs);
  if (!fs.existsSync(abs)) return null;
  const content = fs.readFileSync(abs, 'utf8');
  fileCache.set(abs, content);
  return content;
}

/**
 * Extract component body by searching for export const <Name> or function <Name>
 */
function extractComponentBody(src, componentName) {
  if (!src || !componentName) return null;

  // Match export const Name = ... or const Name: React.FC ... or function Name
  const regex = new RegExp(
    `(?:export\\s+)?(?:const|function)\\s+${componentName}\\b[^{]*\\{([\\s\\S]*?)(?=\\n(?:export\\s+)?(?:const|function)|$)`
  );
  const match = src.match(regex);
  return match ? match[1] : null;
}

/**
 * Find child component names rendered inside JSX (e.g. <BiplaneCrashScene /> -> BiplaneCrashScene)
 */
function findChildComponents(body) {
  if (!body) return [];
  const jsxTagRegex = /<([A-Z][A-Za-z0-9_]+)\b/g;
  const tags = new Set();
  let m;
  const ignored = new Set([
    'React',
    'Fragment',
    'AbsoluteFill',
    'Sequence',
    'Audio',
    'Img',
    'Video',
    'SafeZoneContainer',
    'AtmosphericBackground',
    'KineticTextStack',
    'ArchetypeScene',
  ]);
  while ((m = jsxTagRegex.exec(body)) !== null) {
    if (!ignored.has(m[1])) {
      tags.add(m[1]);
    }
  }
  return Array.from(tags);
}

/**
 * Scan candidate directories to find where a component is defined
 */
function locateComponentSource(componentName, projectInfo) {
  // Check if componentName is mapped through GeneratedSilhouettes.tsx switch statement
  let resolvedName = componentName;
  const genSil = readFileCached('src/components/GeneratedSilhouettes.tsx');
  if (genSil) {
    const mapRegex = new RegExp(`case\\s+['"]${componentName}['"]:\\s*(?:break;)?\\s*return\\s*<([A-Za-z0-9_]+)`);
    const mapMatch = genSil.match(mapRegex);
    if (mapMatch) {
      resolvedName = mapMatch[1];
    }
  }

  const candidateFiles = [];

  // 1. Project vectorFile
  if (projectInfo.vectorFile) {
    candidateFiles.push(projectInfo.vectorFile);
  }

  // 2. Project modular scenes dir (if exists)
  if (projectInfo.projectDir) {
    const projScenesDir = path.join(projectInfo.projectDir, 'scenes');
    if (fs.existsSync(projScenesDir)) {
      const files = fs.readdirSync(projScenesDir).filter((f) => f.endsWith('.tsx'));
      for (const f of files) candidateFiles.push(path.join(projScenesDir, f));
    }
    const tracedAssets = path.join(projectInfo.projectDir, 'plates', 'TracedPlateAssets.tsx');
    if (fs.existsSync(tracedAssets)) candidateFiles.push(tracedAssets);
  }

  // 3. src/scenes/<slug>/
  const srcSlugScenes = path.resolve('src/scenes', projectInfo.slug || '');
  if (fs.existsSync(srcSlugScenes)) {
    const files = fs.readdirSync(srcSlugScenes).filter((f) => f.endsWith('.tsx'));
    for (const f of files) candidateFiles.push(path.join(srcSlugScenes, f));
  }

  // 4. src/components/
  const compDir = path.resolve('src/components');
  if (fs.existsSync(compDir)) {
    const directComp = path.join(compDir, `${componentName}.tsx`);
    if (fs.existsSync(directComp)) candidateFiles.push(directComp);

    // Common vector files
    candidateFiles.push(path.join(compDir, 'GeneratedSilhouettes.tsx'));
    candidateFiles.push(path.join(compDir, 'TactilePropCards.tsx'));
    candidateFiles.push(path.join(compDir, 'CutoutPuppet.tsx'));
    candidateFiles.push(path.join(compDir, 'WavingFlagSvg.tsx'));
  }

  // 5. src/library/
  const libraryDirs = [
    'src/library/characters',
    'src/library/hardware',
    'src/library/tactical',
    'src/library/tactile',
    'src/library/atmospheric',
    'src/kit',
  ];
  for (const libDir of libraryDirs) {
    const absDir = path.resolve(libDir);
    if (fs.existsSync(absDir)) {
      const files = fs.readdirSync(absDir).filter((f) => f.endsWith('.tsx') || f.endsWith('.ts'));
      for (const f of files) candidateFiles.push(path.join(absDir, f));
    }
  }

  for (const f of candidateFiles) {
    const src = readFileCached(f);
    if (
      src &&
      (src.includes(`const ${resolvedName}`) ||
        src.includes(`function ${resolvedName}`) ||
        src.includes(`class ${resolvedName}`))
    ) {
      return { filePath: f, src, resolvedName };
    }
  }

  return null;
}

/**
 * Recursively inspect an SVG component and its children to compute cumulative geometry stats
 */
function analyzeComponentTree(componentName, projectInfo, visited = new Set()) {
  if (visited.has(componentName) || visited.size > 8) {
    return {
      paths: 0,
      primitives: 0,
      totalSvgNodes: 0,
      pathCommands: 0,
      gradients: 0,
    };
  }
  visited.add(componentName);

  const loc = locateComponentSource(componentName, projectInfo);
  if (!loc) {
    return {
      paths: 0,
      primitives: 0,
      totalSvgNodes: 0,
      pathCommands: 0,
      gradients: 0,
    };
  }

  const body = extractComponentBody(loc.src, loc.resolvedName || componentName) || loc.src;

  const paths = (body.match(/<path\b/g) || []).length;
  const rects = (body.match(/<rect\b/g) || []).length;
  const circles = (body.match(/<circle\b/g) || []).length;
  const ellipses = (body.match(/<ellipse\b/g) || []).length;
  const polygons = (body.match(/<polygon\b/g) || []).length;
  const polylines = (body.match(/<polyline\b/g) || []).length;
  const lines = (body.match(/<line\b/g) || []).length;
  const primitives = rects + circles + ellipses + polygons + polylines + lines;

  const gTags = (body.match(/<g\b/g) || []).length;
  const svgTags = (body.match(/<svg\b/g) || []).length;
  const totalSvgNodes = paths + primitives + gTags + svgTags;

  const dMatches = body.match(/d=(?:["']([^"']+)["']|\{?`([^`]+)`\}?|\{["']([^"']+)["']\})/g) || [];
  let pathCommands = 0;
  for (const d of dMatches) {
    pathCommands += (d.match(/[MLCSQTAZmlcsqtaz]/g) || []).length;
  }

  // Also count algorithmic geometry helpers (e.g. createArcScallopedCloud, create8PointedStarPath)
  if (body.includes('createArcScallopedCloud')) pathCommands += 40;
  if (body.includes('create8PointedStarPath')) pathCommands += 16;
  if (body.includes('d3.geoPath')) pathCommands += 60;

  const gradients = (
    body.match(/<(radialGradient|linearGradient)\b|url\(#|Aura\b|Glow\b/g) || []
  ).length;

  const stats = {
    paths,
    primitives,
    totalSvgNodes,
    pathCommands,
    gradients,
  };

  // Inspect child components
  const children = findChildComponents(body);
  for (const child of children) {
    if (child !== componentName && !child.includes('Gradient')) {
      const childStats = analyzeComponentTree(child, projectInfo, visited);
      stats.paths += childStats.paths;
      stats.primitives += childStats.primitives;
      stats.totalSvgNodes += childStats.totalSvgNodes;
      stats.pathCommands += childStats.pathCommands;
      stats.gradients += childStats.gradients;
    }
  }

  return stats;
}

/**
 * Lint all scenes in a timeline for path complexity and visual density
 */
function lintPathComplexity(projectInfo, timeline) {
  const violations = [];
  const scenes = timeline.scenes || [];
  const cfg = constants.PATH_COMPLEXITY || {
    MIN_SVG_NODES: 35,
    MIN_SVG_NODES_HERO: 50,
    MIN_PATH_ELEMENTS: 5,
    MIN_PATH_COMMANDS: 35,
    MAX_PRIMITIVE_RATIO: 0.7,
    MIN_GRADIENT_TIERS: 1,
  };

  const HERO_ARCHETYPES = new Set([
    'STRUCTURAL_FRACTURE',
    'VEHICLE_IN_TRANSIT',
    'SPLIT_CONFRONTATION',
  ]);

  for (const scene of scenes) {
    const sceneId = scene.sceneId;
    const archetype = scene.archetype;
    const assetName = scene.visualPayload?.svgForegroundAsset;

    // Quote cards or pure tactical maps have specialized visual rules
    if (archetype === 'QUOTE_CARD') continue;

    if (!assetName) {
      violations.push({
        sceneId,
        rule: 'PATH_COMPLEXITY_LINT',
        severity: 'WARNING',
        expected: 'Each scene must specify visualPayload.svgForegroundAsset',
        actual: 'Missing svgForegroundAsset in visualPayload',
        fix: `PATH_COMPLEXITY_LINT: Scene ${sceneId} missing svgForegroundAsset. Fix: Define visualPayload.svgForegroundAsset in timeline.`,
        autoFixed: false,
      });
      continue;
    }

    const isHero = HERO_ARCHETYPES.has(archetype);
    const targetMinNodes = isHero ? cfg.MIN_SVG_NODES_HERO : cfg.MIN_SVG_NODES;
    const targetMinPaths = cfg.MIN_PATH_ELEMENTS;
    const targetMinCommands = cfg.MIN_PATH_COMMANDS;
    const targetMaxPrimitiveRatio = cfg.MAX_PRIMITIVE_RATIO;

    const stats = analyzeComponentTree(assetName, projectInfo);
    const totalDrawn = stats.paths + stats.primitives;
    const primitiveRatio = totalDrawn > 0 ? stats.primitives / totalDrawn : 0;

    // 1. Node, Path & Command Floor Check
    if (
      stats.totalSvgNodes < targetMinNodes ||
      stats.paths < targetMinPaths ||
      stats.pathCommands < targetMinCommands
    ) {
      violations.push({
        sceneId,
        rule: 'PATH_COMPLEXITY_LINT',
        severity: 'ERROR',
        expected: `Minimum ${targetMinNodes} SVG nodes, ${targetMinPaths} <path> elements, and ${targetMinCommands} path command vertices`,
        actual: `Component '${assetName}' has ${stats.totalSvgNodes} nodes, ${stats.paths} paths, and ${stats.pathCommands} path command vertices`,
        fix: `PATH_COMPLEXITY_LINT: Scene ${sceneId} [${assetName}] is overly simplified / clip-art (${stats.totalSvgNodes} nodes, ${stats.paths} paths, ${stats.pathCommands} commands). Fix: Deconstruct subject into authentic architectural materials, multi-stop lighting auras, or use traced contours from scripts/trace_plate_contours.js.`,
        autoFixed: false,
      });
      continue;
    }

    // 2. Basic Primitive Ratio Ceiling Check (flags scenes built from unadorned rects/circles)
    if (stats.paths < targetMinPaths * 2 && primitiveRatio > targetMaxPrimitiveRatio) {
      violations.push({
        sceneId,
        rule: 'PATH_COMPLEXITY_LINT',
        severity: 'ERROR',
        expected: `Primitive shapes (<rect>, <circle>, <polygon>) must not exceed ${Math.round(
          targetMaxPrimitiveRatio * 100
        )}% of visual geometry without detailing paths`,
        actual: `Component '${assetName}' is ${Math.round(
          primitiveRatio * 100
        )}% basic primitives with only ${stats.paths} path(s)`,
        fix: `PATH_COMPLEXITY_LINT: Scene ${sceneId} [${assetName}] relies on crude geometric placeholders. Fix: Replace raw rectangles/circles with bespoke vector paths or traced contours.`,
        autoFixed: false,
      });
    }

    // 3. Volumetric Lighting & Atmospheric Aura Check
    if (stats.gradients < (cfg.MIN_GRADIENT_TIERS || 1)) {
      violations.push({
        sceneId,
        rule: 'PATH_COMPLEXITY_LINT',
        severity: 'WARNING',
        expected: 'At least one multi-stop lighting gradient or atmospheric aura for volumetric depth separation',
        actual: `Component '${assetName}' has zero gradient defs or aura references`,
        fix: `PATH_COMPLEXITY_LINT: Scene ${sceneId} [${assetName}] lacks volumetric lighting separation. Fix: Add an atmospheric radial or linear gradient aura.`,
        autoFixed: false,
      });
    }
  }

  return violations;
}

// CLI runner if invoked directly
if (require.main === module) {
  const { resolveProject } = require('./project_resolver');
  const args = process.argv.slice(2);
  const projIdx = args.indexOf('--project');
  const explicitSlug = projIdx !== -1 ? args[projIdx + 1] : undefined;
  const proj = resolveProject(explicitSlug);

  console.log(`\n=== PATH COMPLEXITY & VISUAL ENTROPY AUDIT [${proj.slug}] ===`);
  const violations = lintPathComplexity(proj, proj.timeline);

  if (violations.length === 0) {
    console.log(`✅ All scenes passed PATH_COMPLEXITY_LINT with high visual entropy!`);
    process.exit(0);
  } else {
    console.log(`❌ Found ${violations.length} complexity violation(s):`);
    for (const v of violations) {
      const icon = v.severity === 'ERROR' ? '🚨' : '⚠️';
      console.log(`  ${icon} [${v.severity}] ${v.sceneId}: ${v.actual}`);
      console.log(`     Fix: ${v.fix}\n`);
    }
    const hasErrors = violations.some((v) => v.severity === 'ERROR');
    process.exit(hasErrors ? 1 : 0);
  }
}

module.exports = {
  lintPathComplexity,
  analyzeComponentTree,
};
