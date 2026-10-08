import React, { createContext, useContext, useRef } from 'react';
import { yearLabels, surname } from '../references.js';

const BibliographyContext = createContext(null);

/**
 * Declares the works a unit (or the whole manual) can cite. <Cite id> takes authors and
 * year from here and registers the work as cited; <ReferencesBox auto> then lists exactly
 * the cited works in APA order. References must come after the citations they collect,
 * as they do at the end of a unit.
 */
export function Bibliography({ works, children }) {
  const cited = useRef(new Set());
  cited.current = new Set(); // a fresh registry on every render of the unit
  const byId = Object.fromEntries(works.map((w) => [w.id, w]));
  const labels = yearLabels(works);
  return <BibliographyContext.Provider value={{ byId, labels, cited: cited.current, works }}>{children}</BibliographyContext.Provider>;
}

export const useBibliography = () => useContext(BibliographyContext);

/** Resolves { id, page, locator } to { authors, year, page, locator } and registers the id. */
export function resolveWork(bib, ref) {
  if (!ref || !ref.id) return ref;
  const w = bib && bib.byId[ref.id];
  if (!w) return { authors: [`[obra sin registrar: ${ref.id}]`], year: '', page: ref.page, locator: ref.locator };
  bib.cited.add(ref.id);
  return { authors: (w.authors || []).map(surname), year: bib.labels[w.id], page: ref.page, locator: ref.locator };
}
