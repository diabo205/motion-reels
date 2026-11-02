const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { validateImageBuffer } = require('./plate_validator');

const UA = 'MotionGraphicsEngine/1.0 (https://github.com/motionreels; user@motionreels.org)';

/**
 * Searches Wikipedia API for images matching a query, filtering out PDFs and scanned documents.
 * Always requests standard 960px step thumbnails via iiurlwidth=960.
 */
function searchWikimediaImages(query, limit = 10) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
    query
  )}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|size|mime|dimensions&iiurlwidth=960&format=json`;

  const res = spawnSync('curl.exe', ['-s', '-L', '-A', UA, url], { encoding: 'utf8', timeout: 15000 });
  if (res.status !== 0 || !res.stdout) {
    return [];
  }

  try {
    const data = JSON.parse(res.stdout);
    const pages = data.query?.pages || {};
    const results = [];
    for (const pid of Object.keys(pages)) {
      const page = pages[pid];
      const info = page.imageinfo?.[0];
      if (info) {
        const rawUrl = info.url || '';
        const lowerUrl = rawUrl.toLowerCase();
        // Skip PDF / DJVU document scans
        if (lowerUrl.includes('.pdf') || lowerUrl.includes('.djvu')) continue;

        // Prefer thumburl (standard 960px step), fallback to url
        let targetUrl = (info.thumburl || info.url || '').split('?')[0];

        // If targetUrl is an original commons image and not already a thumbnail, construct standard 960px thumbnail
        if (targetUrl.includes('upload.wikimedia.org/wikipedia/commons/') && !targetUrl.includes('/thumb/')) {
          const match = targetUrl.match(/wikipedia\/commons\/([a-f0-9]\/[a-f0-9]{2}\/(.+))$/);
          if (match) {
            const relPath = match[1];
            const fname = match[2];
            targetUrl = `https://thumb.wikimedia.org/wikipedia/commons/thumb/${relPath}/960px-${fname}`;
            if (fname.toLowerCase().endsWith('.svg')) {
              targetUrl += '.png';
            }
          }
        }

        if (targetUrl) {
          results.push({
            title: page.title,
            url: targetUrl,
            width: info.thumbwidth || info.width,
            height: info.thumbheight || info.height,
            mime: info.mime,
            size: info.size,
          });
        }
      }
    }
    return results;
  } catch {
    return [];
  }
}

/**
 * Directly queries a specific Wikipedia File: title with standard 960px thumbnail.
 */
function fetchFileTitleInfo(fileTitle) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
    fileTitle
  )}&prop=imageinfo&iiprop=url|size|mime|dimensions&iiurlwidth=960&format=json`;

  const res = spawnSync('curl.exe', ['-s', '-L', '-A', UA, url], { encoding: 'utf8', timeout: 15000 });
  if (res.status !== 0 || !res.stdout) return null;

  try {
    const data = JSON.parse(res.stdout);
    const pages = data.query?.pages || {};
    const pid = Object.keys(pages)[0];
    const info = pages[pid]?.imageinfo?.[0];
    if (info) {
      let targetUrl = (info.thumburl || info.url || '').split('?')[0];
      if (targetUrl.includes('upload.wikimedia.org/wikipedia/commons/') && !targetUrl.includes('/thumb/')) {
        const match = targetUrl.match(/wikipedia\/commons\/([a-f0-9]\/[a-f0-9]{2}\/(.+))$/);
        if (match) {
          const relPath = match[1];
          const fname = match[2];
          targetUrl = `https://thumb.wikimedia.org/wikipedia/commons/thumb/${relPath}/960px-${fname}`;
          if (fname.toLowerCase().endsWith('.svg')) {
            targetUrl += '.png';
          }
        }
      }
      return {
        title: pages[pid].title,
        url: targetUrl,
        width: info.thumbwidth || info.width,
        height: info.thumbheight || info.height,
        mime: info.mime,
        size: info.size,
      };
    }
  } catch {}
  return null;
}

/**
 * Downloads an image file and strictly validates its binary magic bytes.
 * If corrupt, HTML error, or size < 10KB, deletes immediately and returns false.
 */
function downloadAndValidateImage(imgUrl, destPath) {
  const tempDest = `${destPath}.tmp`;
  let fullUrl = imgUrl.startsWith('//') ? `https:${imgUrl}` : imgUrl;

  const res = spawnSync(
    'curl.exe',
    ['-f', '-s', '-L', '-A', UA, fullUrl, '-o', tempDest],
    { timeout: 30000 }
  );

  if (res.status !== 0 || !fs.existsSync(tempDest)) {
    if (fs.existsSync(tempDest)) fs.unlinkSync(tempDest);
    return { success: false, error: `HTTP transfer failed (curl status ${res.status})` };
  }

  const buf = fs.readFileSync(tempDest);
  const check = validateImageBuffer(buf, path.basename(destPath));

  if (!check.valid) {
    fs.unlinkSync(tempDest);
    return { success: false, error: check.error };
  }

  // Atomically rename validated file to final destination
  if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
  fs.renameSync(tempDest, destPath);
  return { success: true, format: check.format, size: check.size };
}

/**
 * Automated batch ingestion for a project's required reference blueprint plates.
 */
async function ingestProjectPlates(projectSlug, targets) {
  const projectDir = path.resolve(`projects/${projectSlug}`);
  const platesDir = path.join(projectDir, 'plates');
  if (!fs.existsSync(platesDir)) fs.mkdirSync(platesDir, { recursive: true });

  const manifestPath = path.join(platesDir, 'manifest.json');
  let manifest = {
    projectSlug,
    lastUpdated: new Date().toISOString(),
    plates: {},
    scenePlateMap: {},
  };

  if (fs.existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      manifest.lastUpdated = new Date().toISOString();
    } catch {}
  }

  console.log(`\n======================================================`);
  console.log(`📸 INGESTING MANDATORY REFERENCE PLATES (${projectSlug})`);
  console.log(`======================================================`);

  for (const target of targets) {
    const { filename, fileTitle, query, sceneIds, description } = target;
    const dest = path.join(platesDir, filename);

    // Check if valid plate already exists
    if (fs.existsSync(dest)) {
      const check = validateImageBuffer(fs.readFileSync(dest), filename);
      if (check.valid) {
        console.log(`✅ [VALIDATED ON DISK] ${filename} (${check.format}, ${(check.size / 1024).toFixed(1)} KB)`);
        manifest.plates[filename] = {
          filename,
          format: check.format,
          sizeBytes: check.size,
          description: description || target.query || fileTitle,
          verified: true,
        };
        for (const sId of sceneIds || []) {
          manifest.scenePlateMap[sId] = filename;
        }
        continue;
      } else {
        console.warn(`⚠️ [REPLACING CORRUPT] ${filename}: ${check.error}`);
        fs.unlinkSync(dest);
      }
    }

    console.log(`\n🔍 Searching reference for: "${filename}"...`);
    let candidates = [];

    // 1. Try exact fileTitle first if provided
    if (fileTitle) {
      const exact = fetchFileTitleInfo(fileTitle);
      if (exact) candidates.push(exact);
    }

    // 2. Try search query
    if (candidates.length === 0 && query) {
      candidates = searchWikimediaImages(query, 8);
    }

    if (candidates.length === 0) {
      console.error(`❌ [NOT FOUND] Could not find any image candidates for query: ${query || fileTitle}`);
      continue;
    }

    let downloaded = false;
    for (const cand of candidates) {
      console.log(`  -> Trying: ${cand.title} (${cand.url})`);
      const result = downloadAndValidateImage(cand.url, dest);
      if (result.success) {
        console.log(`  ✅ Successfully downloaded & verified: ${filename} (${result.format}, ${(result.size / 1024).toFixed(1)} KB)`);
        manifest.plates[filename] = {
          filename,
          title: cand.title,
          sourceUrl: cand.url,
          format: result.format,
          sizeBytes: result.size,
          description: description || cand.title,
          verified: true,
        };
        for (const sId of sceneIds || []) {
          manifest.scenePlateMap[sId] = filename;
        }
        downloaded = true;
        break;
      } else {
        console.warn(`  ⚠️ Attempt failed (${result.error})`);
      }
    }

    if (!downloaded) {
      console.error(`❌ [FAILED TO INGEST] ${filename}: All candidate URLs failed or were corrupt.`);
    }

    spawnSync('powershell.exe', ['-Command', 'Start-Sleep -Milliseconds 300']);
  }

  // Save updated manifest
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`\n📄 Manifest updated: ${manifestPath}`);
  console.log(`======================================================\n`);
  return manifest;
}

module.exports = {
  searchWikimediaImages,
  fetchFileTitleInfo,
  downloadAndValidateImage,
  ingestProjectPlates,
};
