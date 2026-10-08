// Checks a rendered unit (HTML from the React components or the static demo).
import { parse } from 'node-html-parser';
import { quoteRules, citationRules, bloomRule, boxOrderRules, densityRule, countWords, citationKeys, referenceKey, referenceRules } from './text-rules.mjs';
import BOXES from '../src/boxes.config.json' with { type: 'json' };

const FAMILY = Object.fromEntries(BOXES.map((b) => [b.kind, b.family]));
const kindOf = (el) => (el.classList.value.find((c) => /^du-box--[a-z]+$/.test(c) && !c.includes('family')) || '').replace('du-box--', '');
const decode = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const text = (el) => decode(el.textContent || '');

export function lintHtml(html, { unit = 'unit' } = {}) {
  const root = parse(html);
  const issues = [];
  const add = (list, where) => list.forEach((i) => issues.push({ ...i, where }));

  // Text rules on every block of reading text, except reference-list entries.
  const blocks = root.querySelectorAll('p, li, td, th, blockquote, figcaption, h1, h2, h3, dfn');
  for (const b of blocks) {
    if (b.querySelector('p, li')) continue; // only innermost blocks
    const t = text(b);
    add(quoteRules(t), unit);
    if (!b.closest('.du-reference') && !b.classList.contains('du-reference')) add(citationRules(t), unit);
  }

  // Objectives: verb of the tagged level.
  for (const li of root.querySelectorAll('.du-box__list--objectives > li')) {
    const tag = li.querySelector('.du-tag');
    const body = li.querySelector('.du-box__otext');
    if (tag && body) add(bloomRule(text(tag).split('·').pop().trim(), text(body)), unit);
  }

  // Each unit: from a ChapterOpener to the next one (or the whole document).
  const pages = root.querySelectorAll('.du-chapter').length ? splitUnits(root) : [root];
  pages.forEach((page, n) => {
    const where = pages.length > 1 ? `${unit} · unidad ${n + 1}` : unit;
    const boxes = page.querySelectorAll('aside.du-box');
    const kinds = boxes.map(kindOf);
    add(boxOrderRules(kinds, FAMILY), where);
    const prose = page.querySelectorAll('.du-body').filter((p) => !p.closest('.du-box'));
    const words = prose.reduce((a, p) => a + countWords(text(p)), 0);
    add(densityRule(words, kinds.filter((k) => FAMILY[k] === 'text').length), where);
    // Two boxes in a row outside the fixed sequences.
    for (const bx of boxes) {
      const next = bx.nextElementSibling;
      if (next && next.classList.contains('du-box') && FAMILY[kindOf(bx)] === 'text' && FAMILY[kindOf(next)] === 'text') {
        issues.push({ rule: 'box-adjacent', severity: 'warning', message: 'Dos recuadros seguidos dentro del texto: separe con texto.', excerpt: text(bx.querySelector('.du-box__title')), where });
      }
    }
    const kp = page.querySelector('aside.du-box--keypoints .du-box__list');
    if (kp) {
      const n = kp.childNodes.filter((c) => c.tagName === 'LI').length;
      if (n < 3 || n > 5) issues.push({ rule: 'keypoints-count', severity: 'warning', message: `“Puntos Clave” tiene ${n} ítems; use de 3 a 5.`, excerpt: '', where });
    }
    // “Antes de leer” questions at the start, revisited at the close.
    if (page.querySelector('aside.du-box--keypoints')) {
      const hasBefore = !!page.querySelector('aside.du-box--keypoints .du-box__before');
      const revisits = !!page.querySelector('aside.du-box--thinking .du-box__revisit');
      if (!hasBefore) issues.push({ rule: 'before-missing', severity: 'warning', message: 'Sin preguntas “Antes de leer” en “Puntos Clave”: agregue 1 a 3 para anticipar el contenido.', excerpt: '', where });
      else if (!revisits) issues.push({ rule: 'before-revisit', severity: 'warning', message: 'Las preguntas “Antes de leer” no se retoman en “Para Seguir Pensando” (prop revisit).', excerpt: '', where });
    }
    // Diagrams whose labels are too long for their shape.
    for (const d of page.querySelectorAll('.du-diagram[data-warn]')) issues.push({ rule: 'diagram-label', severity: 'warning', message: `Rótulo demasiado largo para el diagrama: ${d.getAttribute('data-warn').replace('label-long: ', '')}. Acórtelo a una frase nominal breve.`, excerpt: '', where });
    // Figures and tables mentioned in the text before they appear.
    const seen = [];
    walk(page, (el) => {
      if (el.classList?.contains('du-body') || el.classList?.contains('du-chapter__lead')) seen.push(text(el));
      if (el.classList?.contains('du-figure__number') || el.classList?.contains('du-table-figure__number')) {
        const label = text(el).trim();
        if (!seen.some((s) => s.includes(label))) issues.push({ rule: 'figure-mention', severity: 'warning', message: `“${label}” aparece sin haber sido mencionada antes en el texto.`, excerpt: label, where });
      }
    });
    // Citations ↔ reference list, within the unit.
    const refBox = page.querySelector('aside.du-box--references');
    if (refBox) {
      const listed = refBox.querySelectorAll('.du-reference').map((r) => referenceKey(text(r)));
      const cited = [];
      for (const b of page.querySelectorAll('p, li, td, th, blockquote, figcaption')) {
        if (b.closest('.du-box--references') || b.querySelector('p, li')) continue;
        cited.push(...citationKeys(text(b)));
      }
      issues.push(...referenceRules(cited, listed).map((i) => ({ ...i, where })));
    }
    for (const bad of page.querySelectorAll('.du-alignment__bad')) issues.push({ rule: 'alignment', severity: 'error', message: text(bad), excerpt: '', where });
    for (const ref of page.querySelectorAll('.du-figref')) if (/sin destino/.test(text(ref))) issues.push({ rule: 'figref-target', severity: 'error', message: `Referencia cruzada sin destino: ${text(ref)}`, excerpt: '', where });
  });

  // Glossary links resolve within the document.
  const ids = new Set(root.querySelectorAll('[id]').map((e) => e.getAttribute('id')));
  for (const t of root.querySelectorAll('.du-term')) {
    const target = (t.getAttribute('href') || '').slice(1);
    if (!ids.has(target)) issues.push({ rule: 'term-target', severity: 'warning', message: `El término “${text(t)}” enlaza a “${target}”, que no está en este documento (¿glosario en otro archivo?).`, excerpt: '', where: unit });
  }
  return issues;
}

function walk(el, fn) { fn(el); for (const c of el.childNodes || []) if (c.nodeType === 1) walk(c, fn); }

/** Each unit is the page (or container) that holds its chapter opener. */
function splitUnits(root) {
  return root.querySelectorAll('.du-chapter').map((ch) => ch.closest('.du-page') || ch.parentNode);
}
