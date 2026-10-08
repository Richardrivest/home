import React from 'react';
import { ICONS } from '../icons.generated.js';

/** A Lucide line icon drawn in currentColor. Decorative unless given a label. */
export function Icon({ name, size = 20, label, className = '' }) {
  const parts = ICONS[name];
  if (!parts) return null;
  return (
    <svg
      className={`du-icon ${className}`.trim()}
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : 'true'} focusable="false"
    >
      {parts.map(([tag, attrs], i) => React.createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}
