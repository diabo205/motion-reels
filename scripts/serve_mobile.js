const http = require('http');
const fs = require('fs');
const path = require('path');
const { resolveProject } = require('./project_resolver');

// Parse CLI flags (--project <slug>, --port <num>)
const args = process.argv.slice(2);
let projectSlug = 'carton-de-wiart-1916';
let PORT = 8080;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--project' && args[i + 1]) {
    projectSlug = args[i + 1];
    i++;
  } else if (args[i] === '--port' && args[i + 1]) {
    PORT = parseInt(args[i + 1], 10);
    i++;
  }
}

const projectInfo = resolveProject(projectSlug);
const BASE_DIR = path.resolve(projectInfo.projectDir);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.json': 'application/json',
  '.srt': 'text/plain; charset=utf-8',
};

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const filePath = path.join(BASE_DIR, reqPath);

  // Security: prevent path traversal
  if (!filePath.startsWith(BASE_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`File Not Found: ${reqPath}`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Support HTTP Range Requests (crucial for iOS Safari / Mobile MP4 scrubbing & streaming)
    const range = req.headers.range;
    if (range && ext === '.mp4') {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunksize = end - start + 1;

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
      });

      const stream = fs.createReadStream(filePath, { start, end });
      stream.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': stats.size,
        'Accept-Ranges': 'bytes',
        'Content-Type': contentType,
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[MOBILE PREVIEW SERVER] Serving project: ${projectSlug}`);
  console.log(`[BASE DIR] ${BASE_DIR}`);
  console.log(`[LOCAL PREVIEW] http://localhost:${PORT}`);
  console.log(`[LOCAL IP] http://127.0.0.1:${PORT}`);
});
