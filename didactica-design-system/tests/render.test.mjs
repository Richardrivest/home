// Renders components server-side (bundled with esbuild) to check behaviour in the markup.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { lintHtml } from '../lint/html.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

async function render(jsx) {
  const out = path.join(root, 'dist', `.test-${process.pid}-${Math.random().toString(36).slice(2)}.mjs`);
  await build({
    stdin: { contents: `import React from 'react'; import { renderToStaticMarkup } from 'react-dom/server'; import * as D from './src/index.js'; const h = React.createElement; export default renderToStaticMarkup(${jsx});`, resolveDir: root, loader: 'jsx' },
    bundle: true, platform: 'node', format: 'esm', jsx: 'transform', loader: { '.jsx': 'jsx' }, packages: 'external', outfile: out, logLevel: 'error',
  });
  try { return (await import(pathToFileURL(out).href)).default; } finally { fs.rmSync(out, { force: true }); }
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

test('cover: mosaic by default with the nine box colours; variants; “[…]” lines as placeholders', async () => {
  const html = await render(`h(D.TitlePage, { title: 'T', credits: ['[Autoría]', 'Ana Pérez'], meta: ['Año 2026'] })`);
  assert.match(html, /du-title-page--mosaic/);
  assert.equal((html.match(/du-cover-mosaic__cell/g) || []).length, 9);
  assert.match(html, /var\(--keypoints-accent\)[\s\S]*var\(--references-accent\)/);
  assert.equal((html.match(/du-placeholder/g) || []).length, 1);
  for (const v of ['band', 'motif', 'editorial']) {
    const out = await render(`h(D.TitlePage, { title: 'T', variant: '${v}', volume: 2, bleed: true })`);
    assert.match(out, new RegExp(`du-title-page--${v} du-title-page--bleed`));
    assert.doesNotMatch(out, /du-cover-mosaic/);
  }
  assert.match(await render(`h(D.TitlePage, { title: 'T', variant: 'editorial', volume: 2 })`), />02</);
  assert.match(await render(`h(D.TitlePage, { title: 'T', variant: 'nope' })`), /du-title-page--mosaic/);
});

test('diagrams keep the drawing in a scroll frame and the list under “Ver como texto”', async () => {
  const html = await render(`h('div', null,
    h(D.ConceptWeb, { center: 'Aprendizaje', nodes: [{ label: 'Mediación social', relation: 'se produce en' }, { label: 'Carga cognitiva' }, { label: 'Motivación' }] }),
    h(D.CycleDiagram, { steps: [{ title: 'Planificar' }, { title: 'Evaluar' }, { title: 'Ajustar' }] }),
    h(D.Pyramid, { levels: [{ title: 'Hace' }, { title: 'Sabe' }] }))`);
  assert.equal((html.match(/class="du-diagram-list[" ]/g) || []).length, 3);
  assert.equal((html.match(/<div class="du-diagram-scroll"[^>]*><svg class="du-diagram"/g) || []).length, 3);
  assert.equal((html.match(/<details class="du-diagram-text"><summary[^>]*>Ver como texto<\/summary>/g) || []).length, 3);
  assert.match(html, /se produce en/);
  assert.match(html, /el ciclo vuelve al paso 1/);
});

test('the twelve v3.3 diagrams each render the drawing and a text version with their content', async () => {
  const html = await render(`h('div', null,
    h(D.TreeDiagram, { root: { label: 'Evaluación', children: [{ label: 'Formativa' }, { label: 'Sumativa' }] } }),
    h(D.TreeDiagram, { direction: 'right', root: { label: 'Raíz', children: [{ label: 'Hoja' }] } }),
    h(D.ConceptMap, { nodes: [{ id: 'a', label: 'Aprendizaje', level: 0 }, { id: 'b', label: 'Ideas previas', level: 1 }], links: [{ from: 'a', to: 'b', label: 'parte de' }] }),
    h(D.MindMap, { center: 'Clase', branches: [{ label: 'Objetivos', items: ['Verbo'] }, { label: 'Recursos' }] }),
    h(D.VennDiagram, { sets: ['A', 'B'], regions: { a: ['solo a'], ab: ['común'] } }),
    h(D.QuadrantMatrix, { xAxis: { label: 'X', low: 'bajo', high: 'alto' }, yAxis: { label: 'Y', low: 'baja', high: 'alta' }, quadrants: [{ title: 'Q1' }, { title: 'ZDP' }, { title: 'Q3' }, { title: 'Q4' }] }),
    h(D.Timeline, { events: [{ date: '1968', title: 'Ausubel' }, { date: '1978', title: 'Vygotsky' }] }),
    h(D.Fishbone, { effect: 'Bajo rendimiento', causes: [{ category: 'Estudiante', items: ['Estudio memorístico'] }] }),
    h(D.Spectrum, { left: 'Docente', right: 'Estudiante', points: [{ label: 'Seminario', position: 0.8 }] }),
    h(D.Funnel, { stages: [{ title: 'Perfil' }, { title: 'Clase' }] }),
    h(D.Staircase, { steps: [{ title: 'Recordar' }, { title: 'Crear' }] }),
    h(D.NestedCircles, { layers: [{ title: 'Aula' }, { title: 'Carrera' }] }),
    h(D.Iceberg, { visible: ['Plan de estudios'], hidden: ['Expectativas tácitas'] }))`);
  assert.equal((html.match(/<div class="du-diagram-list">/g) || []).length, 13);
  assert.equal((html.match(/<svg class="du-diagram"/g) || []).length, 13);
  assert.equal((html.match(/<div class="du-diagram-scroll"[^>]*><svg class="du-diagram"/g) || []).length, 13);
  assert.equal((html.match(/>Ver como texto<\/summary>/g) || []).length, 13);
  for (const s of ['parte de', 'Verbo', 'común', 'ZDP', '1978', 'Estudio memorístico', 'más cerca de Estudiante', 'Expectativas tácitas']) assert.ok(html.includes(s), s);
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
