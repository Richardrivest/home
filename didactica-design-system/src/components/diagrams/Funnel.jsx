import React from 'react';
import { DiagramFrame, Lines, wrap, LH, rampFor } from './parts.jsx';

const W = 680, LEVEL = 70, FW = 380, CX = 200;

/** Funnel: successive stages that narrow toward a result (filters, selection, synthesis). */
export function Funnel({ stages, label }) {
  const n = stages.length; const H = n * LEVEL + 10;
  const half = (y) => (FW / 2) * (1 - 0.6 * (y / (n * LEVEL)));
  return (
    <DiagramFrame width={W} height={H} label={label || `Embudo: ${stages.map((s) => s.title).join(', ')}`}
      list={<ol className="du-diagram-list du-diagram-list--pyramid">{stages.map((s, i) => { const r = rampFor(i, n, false); return <li key={i} className={`du-diagram-list__level du-dg-bar--${r}`}><strong className={`diagram-title du-dg-on-bar--${r}`}>{s.title}</strong>{s.text ? <span className="diagram-label">{s.text}</span> : null}</li>; })}</ol>}>
      {stages.map((s, i) => {
        const y1 = i * LEVEL + 4, y2 = (i + 1) * LEVEL;
        const r = rampFor(i, n, false); const mid = (y1 + y2) / 2;
        const t = wrap(s.title, 22); const d = s.text ? wrap(s.text, 30) : [];
        return (
          <g key={i}>
            <polygon className={`du-dg-ramp du-dg-ramp--${r}`} points={`${CX - half(y1)},${y1} ${CX + half(y1)},${y1} ${CX + half(y2)},${y2} ${CX - half(y2)},${y2}`} />
            <Lines x={CX} y={mid - ((t.length - 1) * LH) / 2 + 5} lines={t} anchor="middle" title className={`diagram-title du-dg-on-ramp--${r}`} />
            {d.length ? <line className="du-dg-leader" x1={CX + half(mid) + 8} y1={mid} x2={CX + FW / 2 + 24} y2={mid} /> : null}
            <Lines x={CX + FW / 2 + 32} y={mid - ((d.length - 1) * LH) / 2 + 5} lines={d} />
          </g>
        );
      })}
    </DiagramFrame>
  );
}
