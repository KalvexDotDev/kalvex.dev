import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const siteRoot = resolve(root, 'output');
const port = Number(process.env.PORT || 4173);

const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

createServer((request, response) => {
  const requestUrl = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  const cleanPath = requestUrl.pathname === '/' ? 'index.html' : requestUrl.pathname.slice(1);
  const resolved = resolve(siteRoot, normalize(cleanPath));

  if (!resolved.startsWith(siteRoot) || !existsSync(resolved) || !statSync(resolved).isFile()) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  response.writeHead(200, {
    'content-type': mime[extname(resolved)] || 'application/octet-stream'
  });
  createReadStream(resolved).pipe(response);
}).listen(port, () => {
  if (!existsSync(siteRoot)) {
    console.warn('Missing output directory. Run `npm run build` before serving the site.');
  }
  console.log(`Kalvex static site running from output/ at http://localhost:${port}`);
});
