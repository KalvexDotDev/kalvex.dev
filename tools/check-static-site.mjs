import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const siteRoot = resolve(root, 'output');
const errors = [];

if (!existsSync(siteRoot)) {
  console.error('Missing output directory. Run `npm run build` before `npm run check`.');
  process.exit(1);
}

const htmlFiles = readdirSync(siteRoot).filter((file) => file.endsWith('.html'));

for (const file of htmlFiles) {
  const fullPath = join(siteRoot, file);
  const html = readFileSync(fullPath, 'utf8');
  const attributes = [...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/gi)].map((match) => match[1]);

  if (html.includes('href="#"')) {
    errors.push(`${file}: contains placeholder href="#"`);
  }

  for (const value of attributes) {
    if (isExternal(value)) continue;

    const [targetPath, hash] = value.split('#');
    if (!targetPath && hash) {
      if (!hasId(html, hash)) errors.push(`${file}: missing local anchor #${hash}`);
      continue;
    }

    const cleanTarget = targetPath || file;
    const resolved = resolve(dirname(fullPath), normalize(cleanTarget));

    if (!resolved.startsWith(siteRoot)) {
      errors.push(`${file}: link escapes output directory: ${value}`);
      continue;
    }

    if (!existsSync(resolved)) {
      errors.push(`${file}: missing linked file ${value}`);
      continue;
    }

    if (hash && extname(resolved) === '.html') {
      const targetHtml = readFileSync(resolved, 'utf8');
      if (!hasId(targetHtml, hash)) errors.push(`${file}: missing anchor ${value}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files. All internal links and assets resolve.`);

function isExternal(value) {
  return /^(https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(value);
}

function hasId(html, id) {
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\sid=["']${escaped}["']`, 'i').test(html);
}
