import React from 'react';

const TAGS = { 1: 'h1', 2: 'h2', 3: 'h3' };

/** Unit (1), section (2) and sub-section (3) headings in Calibri bold, navy then azure. */
export function Heading({ level = 1, children, id }) {
  const Tag = TAGS[level] || 'h1';
  const l = TAGS[level] ? level : 1;
  return <Tag id={id} className={`du-h${l} h${l}`}>{children}</Tag>;
}
