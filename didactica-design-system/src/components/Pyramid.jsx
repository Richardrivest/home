import React from 'react';
import { wrap } from '../diagram-utils.js';

const W = 680, LH = 18, LEVEL_H = 72, PW = 330;

/** Pyramid of levels, top (most advanced) first, e.g. Miller's pyramid; descriptions to the right. */
export function Pyramid({ levels, label }) {
  const n = levels.length;
  const H = n * LEVEL_H + 8;
  const cx = PW / 2 + 4;
  const halfAt = (y) => (PW / 2) * (y / (n * LEVEL_H));
  return (
    <svg className="du-diagram" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label || `Pirámide: ${levels.map((l) => l.title).join(', ')}`}>
      {levels.map((lv, i) => {
        const y1 = i * LEVEL_H, y2 = (i + 1) * LEVEL_H - 4;
        const pts = [[cx - halfAt(y1), y1 + 4], [cx + halfAt(y1), y1 + 4], [cx + halfAt(y2 + 4), y2 + 4], [cx - halfAt(y2 + 4), y2 + 4]];
        const ramp = Math.min(i + 1 + Math.max(0, 4 - n), 4);
        const t = wrap(lv.title, i === 0 ? 10 : 18);
        const d = lv.text ? wrap(lv.text, 40) : [];
        const mid = (y1 + y2) / 2 + 4;
        return (
          <g key={i}>
            <polygon className={`du-dg-ramp du-dg-ramp--${ramp}`} points={pts.map((p) => p.join(',')).join(' ')} />
            {t.map((l, j) => (
              <text key={j} className={`du-dg-text diagram-title du-dg-on-ramp--${ramp}`} x={cx} y={mid + (j - (t.length - 1) / 2) * LH + 5} textAnchor="middle">{l}</text>
            ))}
            <line className="du-dg-leader" x1={cx + halfAt(mid) + 8} y1={mid} x2={PW + 24} y2={mid} />
            {d.map((l, j) => (
              <text key={`d${j}`} className="du-dg-text diagram-label" x={PW + 32} y={mid + (j - (d.length - 1) / 2) * LH + 5}>{l}</text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
