// APA 7 reference entries from structured works, plus ordering and year suffixes.
// A work: { id, type: 'book' | 'article' | 'chapter' | 'web', authors: [{ family, given, suffix? } | { literal }],
//   year, title, edition, publisher, journal, volume, issue, pages, doi, url,
//   editors (chapter), container (book title, chapter), site (web), date (web, e.g. '12 de marzo') }
// Titles are written in sentence case by the author; the formatter adds italics and punctuation.

const initials = (given = '') =>
  given.trim().split(/\s+/).filter(Boolean).map((part) =>
    part.split('-').map((p) => (/^[A-ZÁÉÍÓÚÑÜ]\.?$/u.test(p) ? p.replace(/\.?$/, '.') : `${p[0].toUpperCase()}.`)).join('-')
  ).join(' ');

/** “Biggs, J.” — or a group author as written. */
export const nameInverted = (a) => (a.literal ? a.literal : `${a.family}, ${initials(a.given)}`.replace(/, $/, '') + (a.suffix ? `, ${a.suffix}` : ''));
/** “J. Biggs” — editors in a chapter entry. */
const nameDirect = (a) => (a.literal ? a.literal : `${initials(a.given)} ${a.family}`.trim());
/** Surname used in in-text citations. */
export const surname = (a) => a.literal || a.family;

/** APA 7 author list: 1–20 names, “&” before the last; 21+: first 19, “…”, last. */
export function authorList(authors) {
  const names = authors.map(nameInverted);
  if (names.length === 1) return names[0];
  if (names.length <= 20) return `${names.slice(0, -1).join(', ')}, & ${names[names.length - 1]}`;
  return `${names.slice(0, 19).join(', ')}, . . . ${names[names.length - 1]}`;
}

const end = (s) => (/[.?!]$/.test(s) ? s : `${s}.`);
const dash = (p) => String(p).replace(/\s*[-–]\s*/, '–');
const doiUrl = (w) => (w.doi ? `https://doi.org/${w.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, '')}` : w.url || '');

/**
 * Reference as segments [{ text, italic? }], so React and plain-text callers can both
 * render it. yearLabel carries the a/b suffix when needed.
 */
export function referenceSegments(w, yearLabel = w.year ?? 's. f.') {
  const seg = [];
  const t = (text, italic = false) => text && seg.push({ text, italic });
  const authors = w.authors && w.authors.length ? authorList(w.authors) : null;
  const date = w.type === 'web' && w.date ? `${yearLabel}, ${w.date}` : yearLabel;
  if (authors) t(`${end(authors)} (${date}). `);
  const ed = w.edition ? ` (${w.edition}.ª ed.)` : '';
  switch (w.type) {
    case 'article': {
      if (!authors) t(`${end(w.title)} (${date}). `); else t(`${end(w.title)} `);
      t(`${w.journal}${w.volume ? `, ${w.volume}` : ''}`, true);
      t(`${w.issue ? `(${w.issue})` : ''}${w.pages ? `, ${dash(w.pages)}` : ''}${w.articleNumber ? `, Artículo ${w.articleNumber}` : ''}.`);
      break;
    }
    case 'chapter': {
      if (!authors) t(`${end(w.title)} (${date}). `); else t(`${end(w.title)} `);
      const eds = (w.editors || []).map(nameDirect);
      const edList = eds.length > 1 ? `${eds.slice(0, -1).join(', ')} & ${eds[eds.length - 1]}` : eds[0];
      t(edList ? `En ${edList} (${eds.length > 1 ? 'Eds.' : 'Ed.'}), ` : 'En ');
      t(w.container, true);
      t(` (${[w.edition ? `${w.edition}.ª ed.` : '', w.pages ? `pp. ${dash(w.pages)}` : ''].filter(Boolean).join(', ')}). ${end(w.publisher || '')}`.replace(' (). ', '. '));
      break;
    }
    case 'web': {
      if (!authors) { t(w.title, true); t(`. (${date}). `); } else { t(w.title, true); t('. '); }
      if (w.site) t(`${end(w.site)} `);
      break;
    }
    default: { // book
      if (!authors) { t(w.title, true); t(`${ed}. (${date}). `); } else { t(w.title, true); t(`${ed}. `); }
      if (w.publisher) t(`${end(w.publisher)} `);
    }
  }
  const link = doiUrl(w);
  if (link) t(seg.length && !seg[seg.length - 1].text.endsWith(' ') ? ` ${link}` : link);
  // Tidy trailing space.
  const last = seg[seg.length - 1];
  if (last) last.text = last.text.replace(/\s+$/, '');
  return seg;
}

export const referenceText = (w, yearLabel) => referenceSegments(w, yearLabel).map((s) => s.text).join('');

const normal = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const sortKey = (w) => normal((w.authors && w.authors.length ? w.authors.map(nameInverted).join(' ') : w.title) || '');

/** APA order: by author string, then year; same authors and year get a, b… by title. */
export function orderWorks(works) {
  return [...works].sort((a, b) => sortKey(a).localeCompare(sortKey(b), 'es') || String(a.year ?? '').localeCompare(String(b.year ?? '')) || normal(a.title).localeCompare(normal(b.title), 'es'));
}

/** Year labels with a/b suffixes for works that share all authors and year. */
export function yearLabels(works) {
  const groups = new Map();
  for (const w of orderWorks(works)) {
    const k = `${sortKey(w)}|${w.year ?? 's. f.'}`;
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(w);
  }
  const labels = {};
  for (const list of groups.values()) {
    list.forEach((w, i) => { labels[w.id] = `${w.year ?? 's. f.'}${list.length > 1 ? (w.year ? '' : '-') + String.fromCharCode(97 + i) : ''}`; });
  }
  return labels;
}
