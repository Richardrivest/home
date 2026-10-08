// Checks a Word manuscript (.docx/.dotx) written with the template: text rules on every
// paragraph, box order and density from the box titles, objectives' verbs, figure mentions.
import { inflateRawSync } from 'node:zlib';
import { quoteRules, citationRules, bloomRule, boxOrderRules, densityRule, countWords } from './text-rules.mjs';
import BOXES from '../src/boxes.config.json' with { type: 'json' };

const FAMILY = Object.fromEntries(BOXES.map((b) => [b.kind, b.family]));
const BY_TITLE = Object.fromEntries(BOXES.map((b) => [b.title.toUpperCase(), b.kind]));

/** Minimal ZIP reader: returns the named entry as a string. */
export function readZipEntry(buf, name) {
  let eocd = buf.length - 22;
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) throw new Error('No es un archivo ZIP/DOCX válido.');
  let off = buf.readUInt32LE(eocd + 16);
  const count = buf.readUInt16LE(eocd + 10);
  for (let i = 0; i < count; i++) {
    const method = buf.readUInt16LE(off + 10);
    const size = buf.readUInt32LE(off + 20);
    const nameLen = buf.readUInt16LE(off + 28);
    const extraLen = buf.readUInt16LE(off + 30);
    const commentLen = buf.readUInt16LE(off + 32);
    const local = buf.readUInt32LE(off + 42);
    const entry = buf.toString('utf8', off + 46, off + 46 + nameLen);
    if (entry === name) {
      const lNameLen = buf.readUInt16LE(local + 26);
      const lExtraLen = buf.readUInt16LE(local + 28);
      const data = buf.subarray(local + 30 + lNameLen + lExtraLen, local + 30 + lNameLen + lExtraLen + size);
      return (method === 0 ? data : inflateRawSync(data)).toString('utf8');
    }
    off += 46 + nameLen + extraLen + commentLen;
  }
  throw new Error(`Falta ${name} en el archivo.`);
}

const unescape = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');

/** Paragraphs in order: { text, style, inTable }. */
export function paragraphs(xml) {
  const body = xml.slice(xml.indexOf('<w:body'));
  const out = [];
  let depth = 0;
  for (const m of body.matchAll(/<w:tbl>|<\/w:tbl>|<w:p[ >][\s\S]*?<\/w:p>/g)) {
    if (m[0] === '<w:tbl>') { depth++; continue; }
    if (m[0] === '</w:tbl>') { depth--; continue; }
    const style = (m[0].match(/<w:pStyle w:val="([^"]+)"/) || [])[1] || 'Normal';
    const text = unescape([...m[0].matchAll(/<w:t(?: [^>]*)?>([^<]*)<\/w:t>/g)].map((t) => t[1]).join(''));
    out.push({ text, style, inTable: depth > 0 });
  }
  return out;
}

const PROSE_STYLES = new Set(['Normal', 'Lista', 'ListParagraph', 'Entradilla']);

export function lintDocx(buf, { unit = 'documento' } = {}) {
  const paras = paragraphs(readZipEntry(buf, 'word/document.xml'));
  const issues = [];
  // Text rules everywhere (reference entries excepted from citation rules).
  for (const p of paras) {
    issues.push(...quoteRules(p.text).map((i) => ({ ...i, where: unit })));
    if (p.style !== 'Referencia') issues.push(...citationRules(p.text).map((i) => ({ ...i, where: unit })));
  }
  // Structure rules per unit: a unit starts at each “Unidad (antetítulo)” paragraph.
  const starts = paras.map((p, i) => (p.style === 'Unidad' ? i : -1)).filter((i) => i >= 0);
  const units = starts.length ? starts.map((s, n) => [paras[s].text.trim() || `unidad ${n + 1}`, paras.slice(s, starts[n + 1] ?? paras.length)]) : [[unit, paras]];
  for (const [name, list] of units) issues.push(...lintUnitParagraphs(list).map((i) => ({ ...i, where: `${unit} · ${name}` })));
  return issues;
}

function lintUnitParagraphs(paras) {
  const issues = [];
  const kinds = [];
  let words = 0;
  let inObjectives = false;
  const seen = [];
  for (const p of paras) {
    const title = p.text.replace(/\s+·\s+.*$/, '').trim().toUpperCase();
    if (p.inTable && p.style === 'RecuadroTitulo' && BY_TITLE[title]) { kinds.push(BY_TITLE[title]); inObjectives = BY_TITLE[title] === 'objectives'; continue; }
    if (!p.inTable) inObjectives = false;
    if (inObjectives) {
      const m = p.text.match(/^O\d+\s+\d\s*·\s*(\p{L}+)\s+(.+)$/u);
      if (m) issues.push(...bloomRule(m[1], m[2]));
    }
    if (!p.inTable && PROSE_STYLES.has(p.style)) { words += countWords(p.text); seen.push(p.text); }
    if (p.style === 'TablaNumero') {
      const label = p.text.trim();
      if (!seen.some((s) => s.includes(label))) issues.push({ rule: 'figure-mention', severity: 'warning', message: `“${label}” aparece sin haber sido mencionada antes en el texto.`, excerpt: label });
    }
  }
  issues.push(...boxOrderRules(kinds, FAMILY));
  issues.push(...densityRule(words, kinds.filter((k) => FAMILY[k] === 'text').length));
  return issues;
}
