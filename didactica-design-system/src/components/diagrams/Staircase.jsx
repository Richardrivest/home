import React from 'react';
import { DiagramFrame, Lines, wrap, LH, rampFor } from './parts.jsx';

const W = 680;

/** Staircase: progressive levels that build on one another, lowest at the left. */
export function Staircase({ steps, label }) {
  const n = steps.length; const sw = (W - 20) / n; const rise = 46; const base = 110;
  const H = base + (n - 1) * rise + 20;
  return (
    <DiagramFrame width={W} height={H} label={label || `Escalera: ${steps.map((s) => s.title).join(', ')}`}
      list={<ol className="du-diagram-list du-diagram-list--pyramid">{[...steps].reverse().map((s, k) => { const i = n - 1 - k; const r = rampFor(i, n, false); return <li key={i} className={`du-diagram-list__level du-dg-bar--${r}`}><strong className={`diagram-title du-dg-on-bar--${r}`}>{i + 1}. {s.title}</strong>{s.text ? <span className="diagram-label">{s.text}</span> : null}</li>; })}</ol>}>
      {steps.map((s, i) => {
        const h = base + i * rise; const x = 10 + i * sw; const y = H - 10 - h;
        const r = rampFor(i, n, false); const chars = Math.max(9, Math.floor(sw / 9));
        const t = wrap(s.title, chars); const d = s.text ? wrap(s.text, chars + 2) : [];
        return (
          <g key={i}>
            <rect className={`du-dg-ramp du-dg-ramp--${r}`} x={x + 2} y={y} width={sw - 4} height={h} />
            <Lines x={x + sw / 2} y={y + 22} lines={t} anchor="middle" title className={`diagram-title du-dg-on-ramp--${r}`} />
            <Lines x={x + sw / 2} y={y + 24 + t.length * LH} lines={d} anchor="middle" className={`diagram-label du-dg-on-ramp--${r}`} />
          </g>
        );
      })}
    </DiagramFrame>
  );
}
