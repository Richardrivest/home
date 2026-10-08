import React from 'react';
import { wrap } from '../diagram-utils.js';
import { DiagramScroll, DiagramText } from './diagrams/parts.jsx';

const W = 680, LH = 18, LEVEL_H = 72, PW = 330;

/** Pyramid of levels, top (most advanced) first, e.g. Miller's pyramid; descriptions to the right. */
export function Pyramid({ levels, label }) {
  const n = levels.length;
  const H = n * LEVEL_H + 8;
  const cx = PW / 2 + 4;
  const halfAt = (y) => (PW / 2) * (y / (n * LEVEL_H));
  const longApex = levels[0] && wrap(levels[0].title, 10).length > 1;
  const aria = label || `Pirámide: ${levels.map((l) => l.title).join(', ')}`;
  return (
    <div className="du-diagram-wrap">
    <DiagramScroll label={aria}>
    <svg className="du-diagram" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={aria} data-warn={longApex ? `label-long: ${levels[0].title}` : undefined}>
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
    </DiagramScroll>
    <DiagramText>
    <ol className="du-diagram-list du-diagram-list--pyramid">
      {levels.map((lv, i) => {
        const ramp = Math.min(i + 1 + Math.max(0, 4 - n), 4);
        return (
          <li key={i} className={`du-diagram-list__level du-dg-bar--${ramp}`}>
            <strong className={`diagram-title du-dg-on-bar--${ramp}`}>{lv.title}</strong>
            {lv.text ? <span className="diagram-label">{lv.text}</span> : null}
          </li>
        );
      })}
    </ol>
    </DiagramText>
    </div>
  );
}
