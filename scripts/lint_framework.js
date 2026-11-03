const fs = require('fs');
const path = require('path');
const ts = require('typescript');

/**
 * FRAMEWORK-LEVEL LINT HOOKS FOR REMOTION / REACT (.tsx / .ts)
 * Enforces runtime determinism, frame safety, and the Three-Layer Component Architecture:
 *  L0: Official Toolchain (Remotion, React)
 *  L1: Shared Kit (src/kit/) - Immutable engine primitives, base shots, design tokens
 *  L2: Template & Composition (src/scenes/ & projects/<id>/) - Pure assembly and props.json
 *
 * Rules enforced:
 *  1. Math.random()                     -> Flag (use seeded PRNG instead)
 *  2. interpolate() without clamp       -> Flag (require { clamp: true } or extrapolate Right/Left)
 *  3. @keyframes or transition: in CSS  -> Flag (CSS transitions break frame-by-frame rendering)
 *  4. Date.now() or performance.now()   -> Flag (wall-clock timers break determinism)
 *  5. Import boundaries:
 *     - projects/<id>/ and project vectors may NOT import from other projects/
 *     - scenes/ may ONLY import from kit/ (no project vector imports, no business logic)
 *     - kit/ may NEVER import from scenes/ or projects/ (L1 is immutable)
 */

const FRAMEWORK_RULES = {
  MATH_RANDOM: 'FRAMEWORK_NO_MATH_RANDOM',
  INTERPOLATE_CLAMP: 'FRAMEWORK_INTERPOLATE_CLAMP',
  CSS_ANIMATIONS: 'FRAMEWORK_NO_CSS_ANIMATIONS',
  WALL_CLOCK_TIME: 'FRAMEWORK_NO_WALL_CLOCK_TIME',
  IMPORT_CROSS_PROJECT: 'FRAMEWORK_IMPORT_CROSS_PROJECT',
  SCENE_IMPORT_BOUNDARY: 'FRAMEWORK_SCENE_IMPORT_BOUNDARY',
  SCENE_NO_BUSINESS_LOGIC: 'FRAMEWORK_SCENE_NO_BUSINESS_LOGIC',
  KIT_IMMUTABILITY_BOUNDARY: 'FRAMEWORK_KIT_IMMUTABILITY_BOUNDARY',
};

const PROJECT_VECTOR_MAP = {
  'AleutianVectors': 'aleutian-campaign-1942',
  'CowboyVectors': 'operation-cowboy-1945',
  'PeshawarVectors': 'peshawar-2009',
  'RashidMinhasVectors': 'rashid-minhas-1971',
  'TaipingVectors': 'taiping-rebellion-1850',
  'U2IncidentVectors': 'u2-incident-1960',
};

/**
 * Recursively get all .tsx and .ts files in a directory (excluding node_modules, dist, out, .git)
 */
function getSourceFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    if (['node_modules', '.git', 'out', 'dist', 'build', '.cache'].includes(item)) continue;
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getSourceFiles(fullPath));
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Checks if an interpolate CallExpression node has clamp options specified.
 */
function hasClampingOption(callNode, sourceFile) {
  if (callNode.arguments.length < 4) {
    return false;
  }
  const optionsArg = callNode.arguments[3];
  if (!optionsArg) return false;

  if (ts.isObjectLiteralExpression(optionsArg)) {
    for (const prop of optionsArg.properties) {
      const propText = prop.getText(sourceFile);
      if (
        /\bclamp\s*:\s*true\b/i.test(propText) ||
        /\bextrapolate(Right|Left)?\s*:\s*['"]clamp['"]/i.test(propText) ||
        /\bextrapolate\s*:\s*['"]clamp['"]/i.test(propText)
      ) {
        return true;
      }
    }
    return false;
  }

  const text = optionsArg.getText(sourceFile);
  if (/clamp/i.test(text)) {
    return true;
  }

  return false;
}

/**
 * Identifies the project slug for a given file path
 */
function identifyFileProject(relPath) {
  const pMatch = relPath.match(/^projects\/([^/]+)/);
  if (pMatch) return pMatch[1];

  for (const [vecName, projSlug] of Object.entries(PROJECT_VECTOR_MAP)) {
    if (relPath.includes(vecName)) return projSlug;
  }
  return null;
}

/**
 * Lints a single source file (.tsx or .ts) using TypeScript AST
 */
function lintTsxFile(filePath, options = {}) {
  const autoFix = options.autoFix || false;
  const absPath = path.resolve(filePath);
  const relPath = path.relative(process.cwd(), absPath).replace(/\\/g, '/');
  const violations = [];

  if (!fs.existsSync(absPath)) return violations;
  let code = fs.readFileSync(absPath, 'utf8');
  let sf = ts.createSourceFile(absPath, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let fileModified = false;

  const unclampedInterpolateNodes = [];
  const mathRandomNodes = [];
  const wallClockNodes = [];
  const cssTransitionNodes = [];
  const cssKeyframesNodes = [];
  const importBoundaryNodes = [];
  const sceneBusinessLogicNodes = [];

  const isKitFile = relPath.startsWith('src/kit/');
  const isSceneFile = relPath.startsWith('src/scenes/');
  const currentProjectSlug = identifyFileProject(relPath);

  function visit(node) {
    // 1. Math.random()
    if (ts.isCallExpression(node)) {
      const expr = node.expression;
      if (ts.isPropertyAccessExpression(expr)) {
        if (expr.expression.getText(sf) === 'Math' && expr.name.getText(sf) === 'random') {
          const { line, character } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
          mathRandomNodes.push({ node, line: line + 1, char: character });
        }
      }
    } else if (ts.isPropertyAccessExpression(node)) {
      if (
        node.expression.getText(sf) === 'Math' &&
        node.name.getText(sf) === 'random' &&
        !ts.isCallExpression(node.parent)
      ) {
        const { line, character } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
        mathRandomNodes.push({ node, line: line + 1, char: character });
      }
    }

    // 2. Date.now() or performance.now()
    if (ts.isCallExpression(node)) {
      const expr = node.expression;
      if (ts.isPropertyAccessExpression(expr)) {
        const obj = expr.expression.getText(sf);
        const prop = expr.name.getText(sf);
        if ((obj === 'Date' && prop === 'now') || (obj === 'performance' && prop === 'now')) {
          const { line, character } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
          wallClockNodes.push({ node, line: line + 1, char: character, target: `${obj}.${prop}()` });
        }
      }
    } else if (ts.isPropertyAccessExpression(node)) {
      const obj = node.expression.getText(sf);
      const prop = node.name.getText(sf);
      if (
        ((obj === 'Date' && prop === 'now') || (obj === 'performance' && prop === 'now')) &&
        !ts.isCallExpression(node.parent)
      ) {
        const { line, character } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
        wallClockNodes.push({ node, line: line + 1, char: character, target: `${obj}.${prop}` });
      }
    }

    // 3. interpolate( without { clamp: true } / clamp options
    if (ts.isCallExpression(node)) {
      const exprText = node.expression.getText(sf);
      if (exprText === 'interpolate' || exprText.endsWith('.interpolate')) {
        if (!hasClampingOption(node, sf)) {
          const { line, character } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
          unclampedInterpolateNodes.push({ node, line: line + 1, char: character });
        }
      }
    }

    // 4. CSS animations and transitions:
    if (ts.isPropertyAssignment(node)) {
      const propName = node.name.getText(sf).replace(/['"]/g, '');
      if (propName === 'transition' || propName === 'animation') {
        const { line, character } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
        cssTransitionNodes.push({ node, line: line + 1, char: character, name: propName });
      }
    }

    if (
      ts.isStringLiteral(node) ||
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isTemplateHead(node) ||
      ts.isTemplateMiddle(node) ||
      ts.isTemplateTail(node)
    ) {
      const text = node.text || node.getText(sf);
      if (/@keyframes\b/i.test(text)) {
        const { line, character } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
        cssKeyframesNodes.push({ node, line: line + 1, char: character, type: '@keyframes' });
      }
      if (/\btransition\s*:/i.test(text) && !ts.isPropertyAssignment(node.parent)) {
        const { line, character } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
        cssTransitionNodes.push({ node, line: line + 1, char: character, name: 'transition (CSS string)' });
      }
    }

    // 5. Architectural Import Boundaries
    if (ts.isImportDeclaration(node) && node.moduleSpecifier) {
      const spec = node.moduleSpecifier.text;
      const { line } = sf.getLineAndCharacterOfPosition(node.getStart(sf));

      // Rule 5a: L1 Kit Immutability (Kit may never import from scenes or projects)
      if (isKitFile) {
        if (spec.includes('scenes') || spec.includes('projects') || /Vectors\b/.test(spec)) {
          importBoundaryNodes.push({
            rule: FRAMEWORK_RULES.KIT_IMMUTABILITY_BOUNDARY,
            line: line + 1,
            expected: 'src/kit/ is immutable and independent; cannot import from scenes or projects.',
            actual: `Kit primitive "${relPath}" imports higher-layer dependency "${spec}" at line ${line + 1}`,
          });
        }
      }

      // Rule 5b: L2 Scene Import Boundary (scenes/ may only import from kit/)
      if (isSceneFile) {
        if (spec.includes('projects') || /Vectors\b/.test(spec) || /timelines\b/.test(spec)) {
          importBoundaryNodes.push({
            rule: FRAMEWORK_RULES.SCENE_IMPORT_BOUNDARY,
            line: line + 1,
            expected: 'src/scenes/ templates may only import from src/kit; cannot import project-specific vectors or timelines.',
            actual: `Scene template "${relPath}" imports project-specific dependency "${spec}" at line ${line + 1}`,
          });
        }
      }

      // Rule 5c: Cross-Project Imports (projects may not import from other projects)
      if (currentProjectSlug) {
        for (const [otherVec, otherSlug] of Object.entries(PROJECT_VECTOR_MAP)) {
          if (otherSlug !== currentProjectSlug) {
            if (spec.includes(otherVec) || spec.includes(`projects/${otherSlug}`)) {
              importBoundaryNodes.push({
                rule: FRAMEWORK_RULES.IMPORT_CROSS_PROJECT,
                line: line + 1,
                expected: `Project "${currentProjectSlug}" may not import from other projects ("${otherSlug}"). Move shared assets to src/kit/.`,
                actual: `Cross-project import "${spec}" detected in ${relPath}:${line + 1}`,
              });
            }
          }
        }
      }
    }

    // Rule 5d: scenes/ may not contain hardcoded project business logic
    if (isSceneFile && ts.isArrayLiteralExpression(node)) {
      const parentName = node.parent?.name?.getText?.(sf) || '';
      if (/scenes|timeline/i.test(parentName) && node.elements.length > 3) {
        const { line } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
        sceneBusinessLogicNodes.push({
          line: line + 1,
          desc: `Hardcoded scene timeline array "${parentName}" in scene template. Scenes must be prop-driven.`,
        });
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sf);

  // Auto-Fix implementation
  if (autoFix && (unclampedInterpolateNodes.length > 0 || cssTransitionNodes.length > 0)) {
    const sortedInterpolates = [...unclampedInterpolateNodes].sort((a, b) => b.node.getEnd() - a.node.getEnd());
    for (const item of sortedInterpolates) {
      const call = item.node;
      const args = call.arguments;
      if (args.length === 3) {
        const lastArg = args[2];
        const insertPos = lastArg.getEnd();
        code = code.slice(0, insertPos) + ", { extrapolateRight: 'clamp' }" + code.slice(insertPos);
        fileModified = true;
      } else if (args.length === 4 && ts.isObjectLiteralExpression(args[3])) {
        const obj = args[3];
        const openBrace = obj.getStart(sf) + 1;
        code = code.slice(0, openBrace) + " extrapolateRight: 'clamp', " + code.slice(openBrace);
        fileModified = true;
      }
    }

    if (cssTransitionNodes.length > 0) {
      const lines = code.split('\n');
      let linesModified = false;
      const newLines = lines.filter((line) => {
        if (/^\s*transition\s*:\s*['"].*['"]\s*,?\s*$/.test(line)) {
          linesModified = true;
          return false;
        }
        return true;
      });
      if (linesModified) {
        code = newLines.join('\n');
        fileModified = true;
      }
    }

    if (fileModified) {
      fs.writeFileSync(absPath, code, 'utf8');
      sf = ts.createSourceFile(absPath, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    }
  }

  // Record Violations
  for (const item of mathRandomNodes) {
    violations.push({
      sceneId: 'FRAMEWORK_LINT',
      file: relPath,
      line: item.line,
      rule: FRAMEWORK_RULES.MATH_RANDOM,
      severity: 'ERROR',
      expected: 'Seeded PRNG or deterministic (emitterId, globalFrame) seed instead of Math.random()',
      actual: `Math.random() call found in ${relPath}:${item.line}`,
      fix: `${FRAMEWORK_RULES.MATH_RANDOM}: Math.random() found in ${relPath}:${item.line}. Fix: Use deterministic PRNG seeded by global frame.`,
      frame: 0,
      autoFixed: false,
    });
  }

  for (const item of wallClockNodes) {
    violations.push({
      sceneId: 'FRAMEWORK_LINT',
      file: relPath,
      line: item.line,
      rule: FRAMEWORK_RULES.WALL_CLOCK_TIME,
      severity: 'ERROR',
      expected: 'Frame-driven timeline state via useCurrentFrame() or timeline metadata instead of wall-clock time',
      actual: `Wall-clock timer ${item.target} found in ${relPath}:${item.line}`,
      fix: `${FRAMEWORK_RULES.WALL_CLOCK_TIME}: Wall-clock timer ${item.target} found in ${relPath}:${item.line}. Fix: Replace wall-clock timer with Remotion useCurrentFrame().`,
      frame: 0,
      autoFixed: false,
    });
  }

  const remainingInterpolates = autoFix && fileModified ? [] : unclampedInterpolateNodes;
  for (const item of remainingInterpolates) {
    const snippet = item.node.getText(sf).slice(0, 70).replace(/\s+/g, ' ');
    violations.push({
      sceneId: 'FRAMEWORK_LINT',
      file: relPath,
      line: item.line,
      rule: FRAMEWORK_RULES.INTERPOLATE_CLAMP,
      severity: 'ERROR',
      expected: 'interpolate(input, range, output, { clamp: true }) or { extrapolateRight: "clamp" } to prevent unbounded extrapolation',
      actual: `Unclamped interpolate call "${snippet}" in ${relPath}:${item.line}`,
      fix: `${FRAMEWORK_RULES.INTERPOLATE_CLAMP}: Unclamped interpolate call in ${relPath}:${item.line}. Fix: Add { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } to interpolate().`,
      frame: 0,
      autoFixed: autoFix && fileModified,
    });
  }

  const remainingTransitions = autoFix && fileModified ? [] : cssTransitionNodes;
  for (const item of remainingTransitions) {
    violations.push({
      sceneId: 'FRAMEWORK_LINT',
      file: relPath,
      line: item.line,
      rule: FRAMEWORK_RULES.CSS_ANIMATIONS,
      severity: 'ERROR',
      expected: 'Zero CSS animations/transitions; drive all motion via Remotion useCurrentFrame() / interpolate / spring',
      actual: `CSS transition property "${item.name}" found in ${relPath}:${item.line}`,
      fix: `${FRAMEWORK_RULES.CSS_ANIMATIONS}: CSS property "${item.name}" found in ${relPath}:${item.line}. Fix: Drive motion frame-by-frame via useCurrentFrame() and spring/interpolate tokens.`,
      frame: 0,
      autoFixed: autoFix && fileModified,
    });
  }

  for (const item of cssKeyframesNodes) {
    violations.push({
      sceneId: 'FRAMEWORK_LINT',
      file: relPath,
      line: item.line,
      rule: FRAMEWORK_RULES.CSS_ANIMATIONS,
      severity: 'ERROR',
      expected: 'Zero @keyframes in CSS; drive all motion via Remotion useCurrentFrame() / interpolate / spring',
      actual: `@keyframes CSS animation declaration found in ${relPath}:${item.line}`,
      fix: `${FRAMEWORK_RULES.CSS_ANIMATIONS}: @keyframes CSS animation declaration found in ${relPath}:${item.line}. Fix: Replace CSS keyframes with frame-based interpolation in Remotion.`,
      frame: 0,
      autoFixed: false,
    });
  }

  // Import Boundary Violations
  for (const item of importBoundaryNodes) {
    violations.push({
      sceneId: 'FRAMEWORK_ARCHITECTURE',
      file: relPath,
      line: item.line,
      rule: item.rule,
      severity: 'ERROR',
      expected: item.expected,
      actual: item.actual,
      fix: `${item.rule}: Import boundary violation in ${relPath}:${item.line}. Fix: ${item.expected}`,
      frame: 0,
      autoFixed: false,
    });
  }

  for (const item of sceneBusinessLogicNodes) {
    violations.push({
      sceneId: 'FRAMEWORK_ARCHITECTURE',
      file: relPath,
      line: item.line,
      rule: FRAMEWORK_RULES.SCENE_NO_BUSINESS_LOGIC,
      severity: 'ERROR',
      expected: 'src/scenes/ templates must be pure presentation shells driven by props without business logic.',
      actual: item.desc,
      fix: `${FRAMEWORK_RULES.SCENE_NO_BUSINESS_LOGIC}: Scene template has hardcoded business logic at line ${item.line}. Fix: Refactor scene to be a pure presentation shell driven by props.`,
      frame: 0,
      autoFixed: false,
    });
  }

  return violations;
}

/**
 * Main framework lint runner
 */
function lintFramework(options = {}) {
  const srcDir = options.srcDir || 'src';
  let targetFiles = [];

  if (Array.isArray(options.files) && options.files.length > 0) {
    targetFiles = options.files;
  } else if (options.projectInfo) {
    targetFiles = getSourceFiles(srcDir);
  } else {
    targetFiles = getSourceFiles(srcDir);
  }

  const allViolations = [];
  for (const file of targetFiles) {
    const fileViolations = lintTsxFile(file, options);
    allViolations.push(...fileViolations);
  }

  return allViolations;
}

/**
 * CLI runner for scripts/lint_framework.js
 */
function runFrameworkLint() {
  const args = process.argv.slice(2);
  const autoFix = args.includes('--auto-fix') || args.includes('--fix');
  const projIdx = args.indexOf('--project');
  const projectSlug = projIdx !== -1 ? args[projIdx + 1] : null;

  console.log('=== [FRAMEWORK LINT] SCANNING SOURCE FILES FOR REMOTION ANTI-PATTERNS & ARCHITECTURE ===');
  console.log('Rules enforced:');
  console.log('  1. Math.random()                     -> Flag (use seeded PRNG instead)');
  console.log('  2. interpolate() without clamp       -> Flag (require { clamp: true } or extrapolate Right/Left)');
  console.log('  3. @keyframes or transition: in CSS  -> Flag (CSS transitions break frame-by-frame rendering)');
  console.log('  4. Date.now() or performance.now()   -> Flag (wall-clock timers break determinism)');
  console.log('  5. Three-Layer Boundaries            -> projects/ may not import other projects; scenes/ pure kit\n');

  let projectInfo = null;
  if (projectSlug) {
    try {
      const { resolveProject } = require('./project_resolver');
      projectInfo = resolveProject(projectSlug);
      console.log(`Scoped to project: ${projectInfo.slug}`);
    } catch {}
  }

  const violations = lintFramework({ autoFix, projectInfo });
  const errorViolations = violations.filter((v) => v.severity === 'ERROR');

  if (violations.length === 0) {
    console.log('✅ PASS: All files passed framework lint & architectural boundary checks with 0 violations!\n');
    process.exit(0);
  }

  console.log(`Found ${violations.length} framework violation(s) (${errorViolations.length} errors):\n`);
  for (const v of violations) {
    const icon = v.severity === 'ERROR' ? '❌' : '⚠️';
    console.log(`${icon} [${v.rule}] ${v.file}:${v.line}`);
    console.log(`   Expected: ${v.expected}`);
    console.log(`   Actual:   ${v.actual}\n`);
  }

  if (errorViolations.length > 0) {
    console.error(`❌ Framework lint failed with ${errorViolations.length} error(s).`);
    process.exit(1);
  }
}

if (require.main === module) {
  runFrameworkLint();
}

module.exports = {
  FRAMEWORK_RULES,
  lintFramework,
  lintTsxFile,
  runFrameworkLint,
};
