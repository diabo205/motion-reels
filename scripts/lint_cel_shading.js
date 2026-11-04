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

  const regex = new RegExp(
    `(?:export\\s+)?(?:const|function)\\s+${componentName}\\b[^{]*\\{([\\s\\S]*?)(?=\\n(?:export\\s+)?(?:const|function)|$)`
  );
  const match = src.match(regex);
  return match ? match[1] : null;
}

/**
 * Find child component names rendered inside JSX
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

  // 2. Project modular scenes dir
  if (projectInfo.projectDir) {
    const projScenesDir = path.join(projectInfo.projectDir, 'scenes');
    if (fs.existsSync(projScenesDir)) {
      const files = fs.readdirSync(projScenesDir).filter((f) => f.endsWith('.tsx'));
      for (const f of files) candidateFiles.push(path.join(projScenesDir, f));
    }
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

    candidateFiles.push(path.join(compDir, 'GeneratedSilhouettes.tsx'));
    candidateFiles.push(path.join(compDir, 'TactilePropCards.tsx'));
    candidateFiles.push(path.join(compDir, 'CutoutPuppet.tsx'));
    candidateFiles.push(path.join(compDir, 'WavingFlagSvg.tsx'));
  }

  // 5. src/library/ and src/kit/
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
 * Normalize hex and color tokens to uppercase hex or token
 */
function normalizeColor(c) {
  if (!c) return null;
  const trimmed = c.trim().toUpperCase();
  if (trimmed === 'NONE' || trimmed === 'TRANSPARENT') return null;
  if (trimmed.startsWith('#')) {
    if (trimmed.length === 4) {
      return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`;
    }
    return trimmed.slice(0, 7);
  }
  return trimmed;
}

/**
 * Inspect component tree for cel-shading depth, color tiers, and lighting separation
 */
function analyzeCelShading(componentName, projectInfo, visited = new Set()) {
  if (visited.has(componentName) || visited.size > 8) {
    return {
      colors: new Set(),
      hasCutoutPuppet: false,
      hasCelShadedBody: false,
      hasAtmosphericAura: false,
      totalElements: 0,
      monochromeVoidElements: 0,
    };
  }
  visited.add(componentName);

  const loc = locateComponentSource(componentName, projectInfo);
  if (!loc) {
    return {
      colors: new Set(),
      hasCutoutPuppet: false,
      hasCelShadedBody: false,
      hasAtmosphericAura: false,
      totalElements: 0,
      monochromeVoidElements: 0,
    };
  }

  const body = extractComponentBody(loc.src, loc.resolvedName || componentName) || loc.src;

  const hasCutoutPuppet = /<CutoutPuppet\b/.test(body);
  const hasCelShadedBody = /<(?:CelShadedBody|CelShadedFacet)\b/.test(body) || /HISTORICAL_CEL_PALETTES/.test(body);
  const hasAtmosphericAura =
    /<(?:radialGradient|linearGradient)\b/.test(body) ||
    /Aura\b|Glow\b|Backlight\b|RimFilter\b|cel-rim\b|filter=/.test(body);

  const colors = new Set();
  let totalElements = 0;
  let monochromeVoidElements = 0;

  // Extract fills and strokes: fill="#...", fill={'#...'}, stroke="#..."
  const colorRegex = /(?:fill|stroke)=(?:["']([^"']+)["']|\{["']([^"']+)["']\})/g;
  let match;
  const darkMonochromes = new Set(['#000000', '#090D12', '#12151B', '#0F1012', '#0B1310']);

  while ((match = colorRegex.exec(body)) !== null) {
    const raw = match[1] || match[2];
    const norm = normalizeColor(raw);
    if (norm) {
      colors.add(norm);
      totalElements++;
      if (darkMonochromes.has(norm)) {
        monochromeVoidElements++;
      }
    }
  }

  // Also check for CSS classes / tokens
  if (/cel-shadow/.test(body)) colors.add('CEL_TIER_SHADOW');
  if (/cel-midtone/.test(body)) colors.add('CEL_TIER_MIDTONE');
  if (/cel-highlight/.test(body)) colors.add('CEL_TIER_HIGHLIGHT');
  if (/cel-rim/.test(body)) colors.add('CEL_TIER_RIM');
  if (/cel-accent/.test(body)) colors.add('CEL_TIER_ACCENT');

  const stats = {
    colors,
    hasCutoutPuppet,
    hasCelShadedBody,
    hasAtmosphericAura,
    totalElements,
    monochromeVoidElements,
  };

  // Inspect child components recursively
  const children = findChildComponents(body);
  for (const child of children) {
    if (child !== componentName && !child.includes('Gradient')) {
      const childStats = analyzeCelShading(child, projectInfo, visited);
      childStats.colors.forEach((c) => stats.colors.add(c));
      stats.hasCutoutPuppet = stats.hasCutoutPuppet || childStats.hasCutoutPuppet;
      stats.hasCelShadedBody = stats.hasCelShadedBody || childStats.hasCelShadedBody;
      stats.hasAtmosphericAura = stats.hasAtmosphericAura || childStats.hasAtmosphericAura;
      stats.totalElements += childStats.totalElements;
      stats.monochromeVoidElements += childStats.monochromeVoidElements;
    }
  }

  return stats;
}

/**
 * Lint scenes for Cel-Shading, Multi-Tone Value Hierarchy & Material Depth
 * Replaces crude path-complexity node counting with aesthetic material verification.
 */
function lintCelShading(projectInfo, timeline) {
  const violations = [];
  const scenes = timeline.scenes || [];
  const cfg = constants.CEL_SHADING || {
    MIN_TONE_TIERS: 3,
    MAX_MONOCHROME_FILL_RATIO: 0.85,
    REQUIRE_RIM_OR_ATMOSPHERIC_AURA: true,
  };

  const EXEMPT_ARCHETYPES = new Set(['QUOTE_CARD', 'DOCUMENT_CARD']);

  for (const scene of scenes) {
    const sceneId = scene.sceneId;
    const archetype = scene.archetype;
    const assetName = scene.visualPayload?.svgForegroundAsset;

    if (EXEMPT_ARCHETYPES.has(archetype)) continue;

    if (!assetName) {
      violations.push({
        sceneId,
        rule: 'CEL_SHADING_LINT',
        severity: 'WARNING',
        expected: 'Each scene must specify visualPayload.svgForegroundAsset',
        actual: 'Missing svgForegroundAsset in visualPayload',
        fix: `CEL_SHADING_LINT: Scene ${sceneId} missing svgForegroundAsset. Fix: Define visualPayload.svgForegroundAsset.`,
        autoFixed: false,
      });
      continue;
    }

    const stats = analyzeCelShading(assetName, projectInfo);

    // If using CutoutPuppet or CelShadedBody kit primitives, automatic pass for tone tiers
    if (stats.hasCutoutPuppet || stats.hasCelShadedBody) {
      continue;
    }

    const uniqueTonesCount = stats.colors.size;
    const minTones = cfg.MIN_TONE_TIERS || 3;

    // 1. Minimum Tonal Diversity Check (Requires at least 3 distinct tones: Shadow, Midtone, Highlight/Rim)
    if (uniqueTonesCount < minTones) {
      violations.push({
        sceneId,
        rule: 'CEL_SHADING_LINT',
        severity: 'ERROR',
        expected: `Minimum ${minTones} distinct cel-shaded color tones (Shadow, Midtone, Highlight/Rim)`,
        actual: `Component '${assetName}' has only ${uniqueTonesCount} color tone(s) [${Array.from(stats.colors).join(', ')}]`,
        fix: `CEL_SHADING_LINT: Scene ${sceneId} [${assetName}] is a flat silhouette / crude shape with only ${uniqueTonesCount} tone(s). Fix: Deconstruct subject into authentic cel-shading tiers (Shadow underlayer, Midtone body, and Highlight/Rim facet) via src/kit/CelShading.tsx.`,
        autoFixed: false,
      });
      continue;
    }

    // 2. Flat Monochrome Void Rejection
    const monochromeRatio = stats.totalElements > 0 ? stats.monochromeVoidElements / stats.totalElements : 0;
    const maxMonochromeRatio = cfg.MAX_MONOCHROME_FILL_RATIO || 0.85;

    if (stats.totalElements >= 5 && monochromeRatio > maxMonochromeRatio) {
      violations.push({
        sceneId,
        rule: 'CEL_SHADING_LINT',
        severity: 'ERROR',
        expected: `Focal artwork must not exceed ${Math.round(maxMonochromeRatio * 100)}% flat dark monochrome fills`,
        actual: `Component '${assetName}' is ${Math.round(monochromeRatio * 100)}% flat dark fills without cel-shaded facets`,
        fix: `CEL_SHADING_LINT: Scene ${sceneId} [${assetName}] is dominated by flat black/dark blobs. Fix: Add material midtones, top-lit highlights, or use <CutoutPuppet /> for human figures.`,
        autoFixed: false,
      });
    }

    // 3. Volumetric Depth & Rim Lighting Aura Check
    if (cfg.REQUIRE_RIM_OR_ATMOSPHERIC_AURA && !stats.hasAtmosphericAura) {
      violations.push({
        sceneId,
        rule: 'CEL_SHADING_LINT',
        severity: 'WARNING',
        expected: 'Atmospheric backlighting, radial glow aura, or rim light filter for depth separation',
        actual: `Component '${assetName}' lacks background rim lighting or atmospheric aura`,
        fix: `CEL_SHADING_LINT: Scene ${sceneId} [${assetName}] lacks depth separation. Fix: Add a radial atmospheric backlight aura or rim light stroke.`,
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

  console.log(`\n=== CEL SHADING & MULTI-TONE MATERIAL AUDIT [${proj.slug}] ===`);
  const violations = lintCelShading(proj, proj.timeline);

  if (violations.length === 0) {
    console.log(`✅ All scenes passed CEL_SHADING_LINT with multi-tone material depth!`);
    process.exit(0);
  } else {
    console.log(`❌ Found ${violations.length} cel-shading violation(s):`);
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
  lintCelShading,
  analyzeCelShading,
};
