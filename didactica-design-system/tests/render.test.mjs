// Renders components server-side (bundled with esbuild) to check behaviour in the markup.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { lintHtml } from '../lint/html.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

async function render(jsx) {
  const out = path.join(root, 'dist', `.test-${process.pid}-${Math.random().toString(36).slice(2)}.mjs`);
  await build({
    stdin: { contents: `import React from 'react'; import { renderToStaticMarkup } from 'react-dom/server'; import * as D from './src/index.js'; const h = React.createElement; export default renderToStaticMarkup(${jsx});`, resolveDir: root, loader: 'jsx' },
    bundle: true, platform: 'node', format: 'esm', jsx: 'transform', loader: { '.jsx': 'jsx' }, packages: 'external', outfile: out, logLevel: 'error',
  });
  try { return (await import(out)).default; } finally { fs.rmSync(out, { force: true }); }
}

const WORKS = `[
  { id: 'v', type: 'book', authors: [{ family: 'Vygotsky', given: 'L. S.' }], year: 1978, title: 'Mind in society', publisher: 'Harvard University Press' },
  { id: 'a', type: 'book', authors: [{ family: 'Ausubel', given: 'D. P.' }], year: 1968, title: 'Educational psychology', publisher: 'Holt' },
  { id: 'x', type: 'book', authors: [{ family: 'Nadie', given: 'N.' }], year: 2000, title: 'No citado', publisher: 'X' },
]`;

test('Bibliography: Cite by id, auto references list only cited works, in APA order', async () => {
  const html = await render(`h(D.Bibliography, { works: ${WORKS} },
    h('p', null, h(D.Cite, { id: 'v', page: 86 }), ' ', h(D.Cite, { id: 'a', page: 'vi', narrative: true })),
    h(D.ReferencesBox, { auto: true }))`);
  assert.match(html, /\(Vygotsky, 1978, p\. 86\)/);
  assert.match(html, /Ausubel \(1968, p\. vi\)/);
  const refs = [...html.matchAll(/class="du-reference reference">(.*?)<\/p>/g)].map((m) => m[1].replace(/<[^>]+>/g, ''));
  assert.deepEqual(refs, ['Ausubel, D. P. (1968). Educational psychology. Holt.', 'Vygotsky, L. S. (1978). Mind in society. Harvard University Press.']);
});

test('Cite with an unknown id says so', async () => {
  const html = await render(`h(D.Bibliography, { works: [] }, h(D.Cite, { id: 'zz', page: 1 }))`);
  assert.match(html, /obra sin registrar: zz/);
});

test('diagrams render a list fallback for narrow containers', async () => {
  const html = await render(`h('div', null,
    h(D.ConceptWeb, { center: 'Aprendizaje', nodes: [{ label: 'Mediación social', relation: 'se produce en' }, { label: 'Carga cognitiva' }, { label: 'Motivación' }] }),
    h(D.CycleDiagram, { steps: [{ title: 'Planificar' }, { title: 'Evaluar' }, { title: 'Ajustar' }] }),
    h(D.Pyramid, { levels: [{ title: 'Hace' }, { title: 'Sabe' }] }))`);
  assert.equal((html.match(/class="du-diagram-list[" ]/g) || []).length, 3);
  assert.match(html, /se produce en/);
  assert.match(html, /el ciclo vuelve al paso 1/);
});

test('checker: Antes de leer missing, then present but not revisited', async () => {
  const box = (before, revisit) => render(`h('div', { className: 'du-page' }, h(D.ChapterOpener, { title: 'T' }),
    h(D.KeyPoints, { items: ['a', 'b', 'c'], before: ${before} }), h(D.ThinkFurther, { questions: ['q'], revisit: ${revisit} }), h(D.ReferencesBox, null))`);
  const rules = (html) => lintHtml(html).map((i) => i.rule);
  assert.ok(rules(await box('undefined', 'undefined')).includes('before-missing'));
  assert.ok(rules(await box("['¿Qué?']", 'undefined')).includes('before-revisit'));
  const ok = rules(await box("['¿Qué?']", "['¿Qué?']"));
  assert.ok(!ok.includes('before-missing') && !ok.includes('before-revisit'));
});
