// APA 7 in-text citations, Spanish edition conventions:
//   parenthetical  (Biggs & Tang, 2011, p. 45)      — "&" between the last two authors
//   narrative      Biggs y Tang (2011, p. 45)        — "y" in running text
//   3+ authors     (Ambrose et al., 2010, pp. 12–14)
//   several works  (Ausubel, 1968, p. 37; Vygotsky, 1978, p. 86) — alphabetical, ";"
const authorList = (authors, joiner) => {
  const a = [].concat(authors);
  if (a.length >= 3) return `${a[0]} et al.`;
  if (a.length === 2) return `${a[0]} ${joiner} ${a[1]}`;
  return a[0] ?? '';
};

export const formatLocator = ({ page, locator }) => {
  if (locator) return locator; // e.g. "párr. 4", "cap. 3"
  if (page == null || page === '') return '';
  const p = String(page).trim().replace(/\s*[-–]\s*/, '–');
  return `${p.includes('–') ? 'pp.' : 'p.'} ${p}`;
};

const tail = (w) => [w.year, formatLocator(w)].filter(Boolean).join(', ');

/** One work → "Biggs y Tang (2011, p. 45)" (narrative) or "(Biggs & Tang, 2011, p. 45)". */
export function formatCitation(work, { narrative = false } = {}) {
  if (narrative) return `${authorList(work.authors, 'y')} (${tail(work)})`;
  return `(${authorList(work.authors, '&')}, ${tail(work)})`;
}

/** Several works in one parenthesis, alphabetical by first author. */
export function formatCitations(works) {
  const sorted = [...works].sort((x, y) => String([].concat(x.authors)[0]).localeCompare(String([].concat(y.authors)[0]), 'es'));
  return `(${sorted.map((w) => `${authorList(w.authors, '&')}, ${tail(w)}`).join('; ')})`;
}
