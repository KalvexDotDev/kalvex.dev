import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const resultsDir = resolve(root, 'lhci-results');
const manifestPath = resolve(resultsDir, 'manifest.json');
const summaryPath = resolve(resultsDir, 'summary.md');

if (!existsSync(manifestPath)) {
  mkdirSync(resultsDir, { recursive: true });
  writeFileSync(summaryPath, '### Lighthouse CI\n\nNo Lighthouse manifest was found.\n', 'utf8');
  process.exit(0);
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const representativeRuns = manifest.filter((entry) => entry.isRepresentativeRun);
const reportRuns = representativeRuns.length ? representativeRuns : manifest;
const rows = reportRuns.map((entry) => {
  const summary = entry.summary || {};
  const reportLink = entry.htmlPath ? `[report](${entry.htmlPath})` : '';

  return [
    entry.url,
    score(summary.performance),
    score(summary.accessibility),
    score(summary['best-practices']),
    score(summary.seo),
    reportLink
  ];
});

const markdown = [
  '### Lighthouse CI',
  '',
  '| URL | Performance | Accessibility | Best Practices | SEO | Report |',
  '| --- | ---: | ---: | ---: | ---: | --- |',
  ...rows.map((row) => `| ${row.join(' | ')} |`),
  ''
].join('\n');

mkdirSync(resultsDir, { recursive: true });
writeFileSync(summaryPath, markdown, 'utf8');
console.log(markdown);

function score(value) {
  if (typeof value !== 'number') return 'n/a';
  return Math.round(value * 100).toString();
}
