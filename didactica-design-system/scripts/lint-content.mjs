#!/usr/bin/env node
// Content checker for Didáctica Universitaria units.
//   npm run lint:content -- <files…>
// Accepts .jsx/.js units (every exported component is rendered and checked),
// .html (rendered pages), .docx/.dotx (Word manuscripts from the template) and .md/.txt (text rules only).
// Exit code 1 when any error is found; warnings never fail.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { lintHtml } from '../lint/html.mjs';
import { lintDocx } from '../lint/docx.mjs';
import { quoteRules, citationRules } from '../lint/text-rules.mjs';

const files = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const json = process.argv.includes('--json');
if (!files.length) {
  console.error('Uso: npm run lint:content -- <unidad.jsx | pagina.html | manuscrito.docx | texto.md> [--json]');
  process.exit(2);
}

async function renderJsx(file) {
  const abs = path.resolve(file);
  const tmp = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist', `.lint-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `import React from 'react'; import { renderToStaticMarkup } from 'react-dom/server'; import * as M from ${JSON.stringify(abs)};
        export const pages = Object.entries(M).filter(([k, v]) => typeof v === 'function' && /^[A-Z]/.test(k)).map(([k, C]) => [k, renderToStaticMarkup(React.createElement(C))]);`,
      resolveDir: path.dirname(abs), loader: 'jsx',
    },
    bundle: true, platform: 'node', format: 'esm', jsx: 'transform', loader: { '.jsx': 'jsx' }, packages: 'external', outfile: tmp, logLevel: 'error',
  });
  try { return (await import(`${pathToFileURL(tmp).href}?t=${Date.now()}`)).pages; } finally { fs.rmSync(tmp, { force: true }); }
}

const all = [];
for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  const name = path.basename(file);
  let issues = [];
  if (ext === '.jsx' || ext === '.js') {
    for (const [component, html] of await renderJsx(file)) issues.push(...lintHtml(html, { unit: `${name} › ${component}` }));
  } else if (ext === '.html' || ext === '.htm') {
    issues = lintHtml(fs.readFileSync(file, 'utf8'), { unit: name });
  } else if (ext === '.docx' || ext === '.dotx') {
    issues = lintDocx(fs.readFileSync(file), { unit: name });
  } else {
    const text = fs.readFileSync(file, 'utf8');
    issues = [...quoteRules(text), ...citationRules(text)].map((i) => ({ ...i, where: name }));
  }
  all.push(...issues.map((i) => ({ file, ...i })));
}

if (json) {
  console.log(JSON.stringify(all, null, 2));
} else {
  for (const i of all) console.log(`${i.severity === 'error' ? '✖ error  ' : '▲ aviso  '} ${i.where}  [${i.rule}]  ${i.message}${i.excerpt ? `\n           ${i.excerpt}` : ''}`);
  const e = all.filter((i) => i.severity === 'error').length;
  const w = all.length - e;
  console.log(`\n${e} errores, ${w} avisos en ${files.length} archivo(s).`);
}
process.exit(all.some((i) => i.severity === 'error') ? 1 : 0);
