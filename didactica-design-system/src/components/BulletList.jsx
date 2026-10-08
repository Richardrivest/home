import React from 'react';

/** Justified bullet list (● ○ ■ by level). An item is a string or { text, items } for a nested level. */
export function BulletList({ items }) {
  return (
    <ul className="du-list">
      {items.map((item, i) => {
        const text = typeof item === 'string' ? item : item.text;
        const sub = typeof item === 'string' ? null : item.items;
        return (
          <li key={i} className="du-list__item list-item">
            {text}
            {sub && sub.length ? <BulletList items={sub} /> : null}
          </li>
        );
      })}
    </ul>
  );
}
