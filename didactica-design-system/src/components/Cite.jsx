import React from 'react';
import { formatCitation, formatCitations } from '../cite.js';

/**
 * APA 7 in-text citation with page. Parenthetical by default: (Biggs & Tang, 2011, p. 45).
 * narrative → Biggs y Tang (2011, p. 45). works=[…] → several works in one parenthesis.
 */
export function Cite({ authors, year, page, locator, narrative = false, works }) {
  const text = works ? formatCitations(works) : formatCitation({ authors, year, page, locator }, { narrative });
  return <cite className="du-cite">{text}</cite>;
}
