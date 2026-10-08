import React from 'react';

const TAGS = { 1: 'h1', 2: 'h2', 3: 'h3' };

/** Headings: 1 for unnumbered unit-level sections (Glosario, Referencias), 2 sections, 3 sub-sections. */
export function Heading({ level = 2, children, id }) {
  const l = TAGS[level] ? level : 2;
  const Tag = TAGS[l];
  return <Tag id={id} className={`du-h${l} h${l}`}>{children}</Tag>;
}
