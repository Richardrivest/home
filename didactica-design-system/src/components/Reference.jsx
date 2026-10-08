import React from 'react';

/** One APA 7 reference with a 0.5in hanging indent; pass the title in <i>. */
export function Reference({ children }) {
  return <p className="du-reference reference">{children}</p>;
}
