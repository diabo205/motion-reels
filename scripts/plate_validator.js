const fs = require('fs');
const path = require('path');

/**
 * Validates raw file buffer against known image magic bytes.
 * Rejects text/HTML error responses (e.g. Wikimedia 400/404 error HTML pages).
 *
 * @param {Buffer} buffer - File buffer to inspect
 * @param {string} filename - Filename for error context
 * @returns {{ valid: boolean, format?: string, size: number, error?: string }}
 */
function validateImageBuffer(buffer, filename = 'image') {
  if (!buffer || !Buffer.isBuffer(buffer)) {
    return { valid: false, size: 0, error: 'Empty or non-buffer data' };
  }

  const size = buffer.length;

  // Minimum size threshold: genuine visual reference plates must be >= 10 KB
  // Reject small stubs and Wikimedia 400/404 HTML error pages (typically ~1.9KB - 2.1KB)
  if (size < 10000) {
    // Check if it's an HTML error page
    const head = buffer.slice(0, 500).toString('utf8');
    if (head.includes('<!DOCTYPE html') || head.includes('<html') || head.includes('Wikimedia Error')) {
      return {
        valid: false,
        size,
        error: `File is an HTML error page (${size} bytes), not an image. Check download URL and headers.`
      };
    }
    return {
      valid: false,
      size,
      error: `File size too small (${size} bytes). Minimum required reference plate size is 10,000 bytes.`
    };
  }

  // Check for HTML error contents regardless of size
  const headStr = buffer.slice(0, 300).toString('utf8').trim().toLowerCase();
  if (headStr.startsWith('<!doctype html') || headStr.startsWith('<html') || headStr.includes('<title>error')) {
    return {
      valid: false,
      size,
      error: 'File contents contain HTML markup instead of binary image data.'
    };
  }

  // 1. JPEG Magic Bytes: 0xFF, 0xD8, 0xFF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { valid: true, format: 'JPEG', size };
  }

  // 2. PNG Magic Bytes: 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { valid: true, format: 'PNG', size };
  }

  // 3. WebP Magic Bytes: 'RIFF' .... 'WEBP'
  if (
    buffer.slice(0, 4).toString('ascii') === 'RIFF' &&
    buffer.slice(8, 12).toString('ascii') === 'WEBP'
  ) {
    return { valid: true, format: 'WEBP', size };
  }

  // 4. GeoJSON / JSON structured vector boundary plates (e.g. korea_boundaries.json)
  if (filename.endsWith('.json')) {
    try {
      JSON.parse(buffer.toString('utf8'));
      return { valid: true, format: 'GEOJSON', size };
    } catch {
      return { valid: false, size, error: 'Invalid JSON/GeoJSON structure' };
    }
  }

  // 5. Raw SVG Vector plates
  if (filename.endsWith('.svg')) {
    const text = buffer.toString('utf8');
    if (text.includes('<svg') && text.includes('</svg>')) {
      return { valid: true, format: 'SVG', size };
    }
    return { valid: false, size, error: 'Malformed SVG: missing <svg> tags' };
  }

  return {
    valid: false,
    size,
    error: `Unknown binary header (${buffer.slice(0, 8).toString('hex')}). Expected JPEG, PNG, WebP, or SVG.`
  };
}

/**
 * Validates a single image file on disk.
 */
function validateImageFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return { valid: false, size: 0, error: `File not found on disk: ${filePath}` };
  }
  try {
    const buffer = fs.readFileSync(filePath);
    return validateImageBuffer(buffer, path.basename(filePath));
  } catch (err) {
    return { valid: false, size: 0, error: `Read error: ${err.message}` };
  }
}

/**
 * Validates all reference plates for a given project.
 * Enforces MANDATORY_REFERENCE_PLATE_LINT:
 * 1. Project plates directory must exist.
 * 2. Manifest (manifest.json) must exist and map scenes to reference plates.
 * 3. Every referenced plate must exist on disk and pass binary magic-byte verification.
 * 4. Every scene in the project's timeline must have a verified reference plate.
 *
 * @param {string} projectSlug - Slug of the project
 * @param {object} timeline - Optional pre-loaded timeline object
 * @returns {{ passed: boolean, totalScenes: number, verifiedCount: number, errors: Array<{ sceneId: string, rule: string, severity: string, expected: string, actual: string }> }}
 */
function validateProjectPlates(projectSlug, timeline = null) {
  const errors = [];
  const projectDir = path.resolve(`projects/${projectSlug}`);
  const platesDir = path.join(projectDir, 'plates');
  const manifestPath = path.join(platesDir, 'manifest.json');

  if (!fs.existsSync(platesDir)) {
    errors.push({
      sceneId: 'GLOBAL_PLATES',
      rule: 'MANDATORY_REFERENCE_PLATE_LINT',
      severity: 'ERROR',
      expected: `Plates directory must exist at projects/${projectSlug}/plates/`,
      actual: 'Directory missing',
    });
    return { passed: false, totalScenes: 0, verifiedCount: 0, errors };
  }

  // Load timeline if not passed
  if (!timeline) {
    const timelineCandidates = [
      path.join(projectDir, 'timeline.json'),
      path.resolve(`src/timelines/${projectSlug.replace(/-/g, '_')}.json`),
      path.resolve('src/timelines/current_reel.json'),
    ];
    for (const cand of timelineCandidates) {
      if (fs.existsSync(cand)) {
        try {
          timeline = JSON.parse(fs.readFileSync(cand, 'utf8'));
          break;
        } catch {}
      }
    }
  }

  const scenes = timeline?.scenes || [];
  if (scenes.length === 0) {
    errors.push({
      sceneId: 'GLOBAL_PLATES',
      rule: 'MANDATORY_REFERENCE_PLATE_LINT',
      severity: 'ERROR',
      expected: 'Timeline must contain at least one scene to validate reference plates against',
      actual: 'No scenes found',
    });
    return { passed: false, totalScenes: 0, verifiedCount: 0, errors };
  }

  // Load manifest.json
  let manifest = { plates: {}, scenePlateMap: {} };
  if (fs.existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch (e) {
      errors.push({
        sceneId: 'GLOBAL_PLATES',
        rule: 'MANDATORY_REFERENCE_PLATE_LINT',
        severity: 'ERROR',
        expected: 'Valid JSON in plates/manifest.json',
        actual: `Failed to parse manifest: ${e.message}`,
      });
    }
  } else {
    errors.push({
      sceneId: 'GLOBAL_PLATES',
      rule: 'MANDATORY_REFERENCE_PLATE_LINT',
      severity: 'ERROR',
      expected: `Reference manifest must exist at projects/${projectSlug}/plates/manifest.json`,
      actual: 'Missing manifest.json',
    });
  }

  const scenePlateMap = manifest.scenePlateMap || {};
  let verifiedCount = 0;

  for (let idx = 0; idx < scenes.length; idx++) {
    const scene = scenes[idx];
    const sceneNum = idx + 1;
    const sceneId = scene.sceneId || `SCENE_${String(sceneNum).padStart(2, '0')}`;

    // Plate can be defined in:
    // 1. scene.visualPayload.referencePlate
    // 2. scenePlateMap[sceneId]
    // 3. scenePlateMap[String(sceneNum)]
    const plateFilename =
      scene.visualPayload?.referencePlate ||
      scenePlateMap[sceneId] ||
      scenePlateMap[String(sceneNum)];

    if (!plateFilename) {
      errors.push({
        sceneId,
        rule: 'MANDATORY_REFERENCE_PLATE_LINT',
        severity: 'ERROR',
        expected: `Verified reference plate specified in visualPayload.referencePlate or plates/manifest.json`,
        actual: 'No reference plate mapped to this scene. Drawing SVG without reference is strictly prohibited.',
      });
      continue;
    }

    const platePath = path.isAbsolute(plateFilename)
      ? plateFilename
      : path.join(platesDir, path.basename(plateFilename));

    const check = validateImageFile(platePath);
    if (!check.valid) {
      errors.push({
        sceneId,
        rule: 'MANDATORY_REFERENCE_PLATE_LINT',
        severity: 'ERROR',
        expected: `Valid binary image plate on disk (${path.basename(plateFilename)})`,
        actual: `Plate validation failed: ${check.error} (path: ${platePath})`,
      });
    } else {
      verifiedCount++;
    }
  }

  const passed = errors.length === 0 && verifiedCount === scenes.length;
  return {
    passed,
    totalScenes: scenes.length,
    verifiedCount,
    errors,
  };
}

module.exports = {
  validateImageBuffer,
  validateImageFile,
  validateProjectPlates,
};
