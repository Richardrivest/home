import React from 'react';
import { DiagramFrame, Lines, wrap, LH } from './parts.jsx';

const W = 680, INSET = 82;

/** Timeline: dated events along an axis, labels alternating above and below. */
export function Timeline({ events, label }) {
  const n = events.length;
    const x = (i) => (n === 1 ? W / 2 : INSET + (i * (W - 2 * INSET)) / (n - 1));
  const chars = Math.min(18, Math.max(12, Math.floor(((W - 2 * INSET) / Math.max(1, n - 1)) * 1.7 / 7.5)));
  const lines = (e) => wrap(e.title, chars).length + (e.text ? wrap(e.text, chars + 2).length : 0);
  const most = (k) => Math.max(1, ...events.filter((_, i) => i % 2 === k).map(lines));
  const AXIS = 34 + most(0) * LH + 34;
  const H = AXIS + 56 + most(1) * LH;
  return (
    <DiagramFrame width={W} height={H} label={label || 'Línea de tiempo'} warn={n > 8 ? 'label-long: más de 8 hitos; divida la línea de tiempo' : null}
      list={<ol className="du-diagram-list__timeline">{events.map((e, i) => <li key={i}><strong>{e.date}</strong> · {e.title}{e.text ? <span className="du-diagram-list__detail"> — {e.text}</span> : null}</li>)}</ol>}>
      <line className="du-dg-edge" x1={20} y1={AXIS} x2={W - 20} y2={AXIS} />
      {events.map((e, i) => {
        const up = i % 2 === 0; const t = wrap(e.title, chars); const d = e.text ? wrap(e.text, chars + 2) : [];
        const block = [...t, ...d].length;
        const y0 = up ? AXIS - 34 - (block - 1) * LH : AXIS + 56;
        return (
          <g key={i}>
            <line className="du-dg-leader" x1={x(i)} y1={AXIS} x2={x(i)} y2={up ? AXIS - 28 : AXIS + 28} />
            <circle className="du-dg-dot" cx={x(i)} cy={AXIS} r={7} />
            <text className="du-dg-text diagram-title du-dg-date" x={x(i)} y={up ? AXIS + 26 : AXIS - 16} textAnchor="middle">{e.date}</text>
            <Lines x={x(i)} y={y0} lines={t} anchor="middle" title />
            <Lines x={x(i)} y={y0 + t.length * LH} lines={d} anchor="middle" muted />
          </g>
        );
      })}
    </DiagramFrame>
  );
}
