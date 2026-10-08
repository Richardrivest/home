import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { quoteRules, citationRules, bloomRule, boxOrderRules, densityRule } from '../lint/text-rules.mjs';
import { lintHtml } from '../lint/html.mjs';
import { lintDocx } from '../lint/docx.mjs';

const rules = (list) => list.map((i) => i.rule);
const FAMILY = { keypoints: 'open', objectives: 'open', important: 'text', mistake: 'text', example: 'text', thinking: 'close', selfcheck: 'close', activities: 'close', references: 'close' };

test('quotes: angle and straight quotes are errors, English quotes pass', () => {
  assert.deepEqual(rules(quoteRules('los «neuromitos» y los "estilos"')), ['quotes-angle', 'quotes-angle', 'quotes-straight', 'quotes-straight']);
  assert.deepEqual(quoteRules('los “neuromitos” y ‘otros’'), []);
});

test('citations: correct forms pass', () => {
  assert.deepEqual(citationRules('(Biggs & Tang, 2011, p. 45) y Biggs y Tang (2011, p. 45); (Ambrose et al., 2010, pp. 3–5; Vygotsky, 1978, p. 86)'), []);
});

test('citations: “and”/“&” in narrative, “y” in parentheses, missing et al., missing page', () => {
  assert.deepEqual(rules(citationRules('Biggs and Tang (2011, p. 4)')), ['cite-and']);
  assert.deepEqual(rules(citationRules('Biggs & Tang (2011, p. 4)')), ['cite-amp-narrative']);
  assert.deepEqual(rules(citationRules('(Biggs y Tang, 2011, p. 4)')), ['cite-y-paren']);
  assert.deepEqual(rules(citationRules('(Ambrose, Bridges, & Norman, 2010, p. 4)')), ['cite-etal']);
  assert.deepEqual(rules(citationRules('(Sweller, 1988)')), ['cite-page']);
  assert.deepEqual(rules(citationRules('Vygotsky (1978) sostuvo')), ['cite-page']);
});

test('bloom: verb must belong to the tagged level', () => {
  assert.deepEqual(bloomRule('Analizar', 'Comparar las perspectivas'), []);
  assert.equal(bloomRule('Crear', 'Explicar las perspectivas')[0].severity, 'error');
  assert.equal(bloomRule('Crear', 'Pensar las perspectivas')[0].severity, 'warning');
});

test('box order and density', () => {
  assert.deepEqual(boxOrderRules(['keypoints', 'objectives', 'important', 'thinking', 'selfcheck', 'activities', 'references'], FAMILY), []);
  assert.ok(rules(boxOrderRules(['objectives', 'keypoints', 'references', 'activities'], FAMILY)).includes('box-order'));
  assert.ok(rules(boxOrderRules(['keypoints', 'objectives', 'thinking', 'important', 'references'], FAMILY)).includes('box-order'));
  assert.deepEqual(densityRule(1700, 3), []);
  assert.deepEqual(rules(densityRule(500, 2)), ['box-density']);
});

test('html: figure mentioned after it appears, alignment problems, objective verbs', () => {
  const html = `<div class="du-page"><header class="du-chapter"><p class="du-chapter__lead">Lead.</p></header>
    <aside class="du-box du-box--keypoints du-box--family-open"><div class="du-box__body"><ul class="du-box__list"><li>a</li><li>b</li><li>c</li></ul></div></aside>
    <aside class="du-box du-box--objectives du-box--family-open"><ol class="du-box__list du-box__list--objectives"><li><span class="du-tag">6 · Crear</span><span class="du-box__otext">Explicar algo.</span></li></ol></aside>
    <figure class="du-figure"><p class="du-figure__number">Figura 1</p></figure>
    <p class="du-body">Como muestra la Figura 1.</p>
    <table><tr><td class="du-alignment__bad">O2 no tiene ninguna actividad.</td></tr></table>
    <aside class="du-box du-box--references du-box--family-close"></aside></div>`;
  const r = rules(lintHtml(html));
  assert.ok(r.includes('figure-mention'));
  assert.ok(r.includes('alignment'));
  assert.ok(r.includes('bloom-verb'));
});

test('docx: the Word template passes without errors', () => {
  const issues = lintDocx(fs.readFileSync(new URL('../templates/Didactica-Universitaria.dotx', import.meta.url)));
  assert.deepEqual(issues.filter((i) => i.severity === 'error'), []);
});
