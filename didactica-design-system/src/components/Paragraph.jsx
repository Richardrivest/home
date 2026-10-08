import React from 'react';

/** Body paragraph: 16px Cambria, 1.6 leading; left-aligned on screen, justified in print. */
export function Paragraph({ children }) {
  return <p className="du-body body">{children}</p>;
}
