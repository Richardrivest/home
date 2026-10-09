// Text rules shared by every input format. Each rule returns issues
// { rule, severity: 'error' | 'warning', message, excerpt }.
import { BLOOM } from '../src/bloom.js';

const PARTICLE = '(?:van|von|de|del|der|den|da|di|du|la|le|ter|ten)';
const NAME = `[A-ZÁÉÍÓÚÑÜ][\\p{L}'’-]+(?: ${PARTICLE} [A-ZÁÉÍÓÚÑÜ][\\p{L}'’-]+)?`; // Apellido, also “Ruiz de Gauna”
const YEAR = '(?:\\d{4}[a-z]?|s\\. f\\.)';
const LOCATOR = /\b(?:p|pp|párr|cap|sec|secc)\.\s*\S/;

const excerpt = (text, index, len = 50) => {
  const a = Math.max(0, index - 25);
  return (a > 0 ? '…' : '') + text.slice(a, index + len).replace(/\s+/g, ' ').trim() + (index + len < text.length ? '…' : '');
};
const issue = (rule, severity, message, text, index) => ({ rule, severity, message, excerpt: text == null ? '' : excerpt(text, index) });

/** Quotation marks: English “…” and ‘…’ only. */
export function quoteRules(text) {
  const out = [];
  for (const m of text.matchAll(/[«»]/g)) out.push(issue('quotes-angle', 'error', 'Comillas angulares: use comillas inglesas “…”.', text, m.index));
  for (const m of text.matchAll(/"/g)) out.push(issue('quotes-straight', 'error', 'Comillas rectas: use comillas inglesas “…”.', text, m.index));
  return out;
}

/** APA 7 in-text citations: “&” in parentheses, “y” in narrative, et al., page. */
export function citationRules(text) {
  const out = [];
  // Narrative with “and” or “&”: Biggs and Tang (2011 / Biggs & Tang (2011
  for (const m of text.matchAll(new RegExp(`(${NAME}),? (and|&) (${NAME}) \\(${YEAR}`, 'gu'))) {
    out.push(issue(m[2] === '&' ? 'cite-amp-narrative' : 'cite-and', 'error', `Cita narrativa: escriba “${m[1]} y ${m[3]}”, no “${m[2]}”.`, text, m.index));
  }
  // Parenthetical citations: split each (…) group into works.
  for (const m of text.matchAll(/\(([^()]*?\b(?:\d{4}[a-z]?|s\. f\.)[^()]*)\)/gu)) {
    const inside = m[1];
    if (!new RegExp(`${NAME}`, 'u').test(inside)) continue; // e.g. “(2011, p. 3)” after a narrative name
    const startsWithYear = new RegExp(`^${YEAR}`, 'u').test(inside.trim());
    for (const work of inside.split(/;\s*/)) {
      const w = work.trim();
      if (!new RegExp(`${YEAR}`, 'u').test(w)) continue;
      if (/^(?:véase|ver|cf\.|derivado de)\b/i.test(w) && !new RegExp(`${NAME},? ${YEAR}`, 'u').test(w)) continue;
      if (/\b(?:and|y) [A-ZÁÉÍÓÚÑÜ]/u.test(w.split(/,\s*\d{4}/)[0]) && !startsWithYear) {
        out.push(issue('cite-y-paren', 'error', 'Cita entre paréntesis: use “&” entre los dos últimos autores.', text, m.index));
      }
      const authorsPart = w.split(new RegExp(`,?\\s*${YEAR}`, 'u'))[0];
      const commas = (authorsPart.match(/,/g) || []).length;
      if (!/et al\./.test(authorsPart) && commas >= 2) {
        out.push(issue('cite-etal', 'error', 'Con tres o más autores, escriba solo el primero seguido de “et al.”.', text, m.index));
      }
      if (!LOCATOR.test(w)) out.push(issue('cite-page', 'warning', 'Cita sin página: agregue “p.”, “pp.” o “párr.”.', text, m.index));
    }
  }
  // Narrative citations without page: Vygotsky (1978)
  for (const m of text.matchAll(new RegExp(`(${NAME}(?: et al\\.)?(?: y ${NAME})?) \\((${YEAR})\\)`, 'gu'))) {
    out.push(issue('cite-page', 'warning', `Cita narrativa sin página: “${m[1]} (${m[2]}, p. x)”.`, text, m.index));
  }
  return out;
}

const VERB_LEVEL = new Map(BLOOM.flatMap((b) => b.verbs.map((v) => [v, b])));

/** An objective must start with a verb of its own Bloom level. */
export function bloomRule(levelName, objectiveText) {
  const level = BLOOM.find((b) => b.name.toLowerCase() === String(levelName).toLowerCase() || b.id === String(levelName).toLowerCase());
  const verb = objectiveText.trim().split(/\s+/)[0].toLowerCase().replace(/[^\p{L}]/gu, '');
  if (!level) return [issue('bloom-level', 'error', `Nivel de Bloom desconocido: “${levelName}”.`, objectiveText, 0)];
  if (level.verbs.includes(verb)) return [];
  const other = VERB_LEVEL.get(verb);
  if (other) return [issue('bloom-verb', 'error', `“${verb}” es un verbo de ${other.name} (nivel ${other.level}), no de ${level.name}.`, objectiveText, 0)];
  return [issue('bloom-verb', 'warning', `“${verb}” no está en la lista de verbos de ${level.name}: ${level.verbs.join(', ')}.`, objectiveText, 0)];
}

/** An objective with no level shown (Word): its first word must be a verb of some Bloom level. */
export function bloomVerbRule(objectiveText) {
  const verb = objectiveText.trim().split(/\s+/)[0].toLowerCase().replace(/[^\p{L}]/gu, '');
  if (VERB_LEVEL.has(verb)) return [];
  return [issue('bloom-verb', 'warning', `“${verb}” no es un verbo de la taxonomía de Bloom revisada: empiece el objetivo con uno.`, objectiveText, 0)];
}

export const BOX_ORDER = {
  open: ['keypoints', 'objectives'],
  close: ['thinking', 'selfcheck', 'activities', 'references'],
};

/** Box sequence: opening boxes first, in order; closing boxes last, in order; in-text boxes in between. */
export function boxOrderRules(kinds, family) {
  const out = [];
  const seq = kinds.map((k) => ({ k, f: family[k] }));
  const firstOpen = seq.filter((x) => x.f === 'open').map((x) => x.k);
  if (seq.length && seq[0].f !== 'open') out.push(issue('box-order', 'error', 'La unidad debe abrir con “Puntos Clave” y “Objetivos”.', null));
  if (firstOpen.join() !== BOX_ORDER.open.filter((k) => firstOpen.includes(k)).join()) out.push(issue('box-order', 'error', '“Puntos Clave” va antes que “Objetivos”.', null));
  const closeIdx = seq.findIndex((x) => x.f === 'close');
  if (closeIdx >= 0) {
    const tail = seq.slice(closeIdx);
    if (tail.some((x) => x.f !== 'close')) out.push(issue('box-order', 'error', 'Después del primer recuadro de cierre solo van recuadros de cierre.', null));
    const closes = tail.filter((x) => x.f === 'close').map((x) => x.k);
    const expected = BOX_ORDER.close.filter((k) => closes.includes(k));
    if (closes.join() !== expected.join()) out.push(issue('box-order', 'error', `Orden de cierre: ${BOX_ORDER.close.join(' → ')}; encontrado: ${closes.join(' → ')}.`, null));
  }
  for (const k of BOX_ORDER.open) if (!kinds.includes(k) && kinds.length) out.push(issue('box-missing', 'warning', `Falta el recuadro “${k}”.`, null));
  if (kinds.length && !kinds.includes('references')) out.push(issue('box-missing', 'warning', 'Falta el recuadro “Referencias”.', null));
  return out;
}

/** At most one in-text box per ~800 words of prose. */
export function densityRule(proseWords, inTextBoxes) {
  const allowed = Math.max(1, Math.ceil(proseWords / 800));
  if (inTextBoxes <= allowed) return [];
  return [issue('box-density', 'warning', `${inTextBoxes} recuadros dentro del texto para ${proseWords} palabras de texto corrido; el máximo sugerido es ${allowed} (uno cada 800–1.000 palabras).`, null)];
}

export const countWords = (s) => (s.match(/[\p{L}\d]+/gu) || []).length;

const norm = (x) => String(x).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
// Key names drop leading particles, so “van Gog” in the list matches “van Gog (2014)” in the text.
const keyName = (x) => norm(x).replace(new RegExp(`^(?:${PARTICLE} )+`), '');

/** Author–year keys of every in-text citation in a text: “vygotsky|1978”. */
export function citationKeys(text) {
  const keys = [];
  for (const m of text.matchAll(/\(([^()]*?\b(?:\d{4}[a-z]?|s\. f\.)[^()]*)\)/gu)) {
    for (const work of m[1].split(/;\s*/)) {
      const name = work.match(new RegExp(NAME, 'u'));
      const year = work.match(new RegExp(`\\b${YEAR}`, 'u'));
      if (name && year && work.indexOf(name[0]) < work.indexOf(year[0])) keys.push(`${keyName(name[0])}|${year[0]}`);
    }
  }
  for (const m of text.matchAll(new RegExp(`(${NAME})(?: et al\\.)?(?: y ${NAME})? \\((${YEAR})`, 'gu'))) keys.push(`${keyName(m[1])}|${m[2]}`);
  return [...new Set(keys)];
}

/** Key of a reference-list entry: first author's surname (or group author) and year. */
export function referenceKey(text) {
  const year = text.match(new RegExp(`\\((${YEAR})`, 'u'));
  const first = text.split(/,|\. \(/)[0];
  return year ? `${keyName(first)}|${year[1]}` : null;
}

/** Every citation needs its reference, and every reference a citation (APA 7). */
export function referenceRules(cited, listed) {
  const out = [];
  const L = new Set(listed.filter(Boolean));
  const C = new Set(cited);
  for (const k of C) if (!L.has(k)) out.push({ rule: 'ref-missing', severity: 'error', message: `Se cita ${k.replace('|', ', ')} pero no figura en “Referencias”.`, excerpt: '' });
  for (const k of L) if (!C.has(k)) out.push({ rule: 'ref-uncited', severity: 'warning', message: `“Referencias” incluye ${k.replace('|', ', ')}, que no se cita en la unidad.`, excerpt: '' });
  return out;
}
