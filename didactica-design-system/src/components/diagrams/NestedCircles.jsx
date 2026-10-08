import React from 'react';
import { DiagramFrame, Lines, wrap, LH, rampFor } from './parts.jsx';

const W = 680, H = 440, CX = 210, CY = 220, RMAX = 200;

/** Nested circles: contexts or categories that contain one another, innermost first. */
export function NestedCircles({ layers, label }) {
  const n = layers.length;
  const r = (i) => (RMAX * (i + 1)) / n;
  const legendH = layers.reduce((a, l) => a + (1 + (l.text ? wrap(l.text, 26).length : 0)) * LH + 12, 0);
  const textY = (i) => CY - (r(i) + (i ? r(i - 1) : 0)) / 2;
  return (
    <DiagramFrame width={W} height={H} label={label || `Niveles anidados: ${layers.map((l) => l.title).join(' dentro de ')}`}
      list={<ul className="du-diagram-list__nested">{[...layers].reverse().map((l, k) => <li key={k} style={{ marginLeft: `${k * 12}px` }}><strong>{l.title}</strong>{l.text ? <span className="du-diagram-list__detail"> · {l.text}</span> : null}</li>)}</ul>}>
      {[...layers].map((_, k) => n - 1 - k).map((i) => {
        const ramp = rampFor(i, n, true);
        return <circle key={i} className={`du-dg-ramp du-dg-ramp--${ramp} du-dg-ring`} cx={CX} cy={CY} r={r(i)} />;
      })}
      {layers.map((l, i) => {
        const ramp = rampFor(i, n, true); const y = i === 0 ? CY + 5 : textY(i) + 5;
        return <text key={i} className={`du-dg-text diagram-title du-dg-on-ramp--${ramp}`} x={CX} y={y} textAnchor="middle">{l.title}</text>;
      })}
      {/* Legend, outermost first, in the same order a reader meets the rings from the top. */}
      {(() => {
        let ly = CY - legendH / 2 + 14;
        return [...layers].map((l, i) => ({ l, i })).reverse().map(({ l, i }) => {
          const d = l.text ? wrap(l.text, 26) : []; const ramp = rampFor(i, n, true); const y = ly; ly += (1 + d.length) * LH + 12;
          return (
            <g key={`k${i}`}>
              <rect className={`du-dg-ramp du-dg-ramp--${ramp}`} x={440} y={y - 12} width={14} height={14} rx={2} />
              <text className="du-dg-text diagram-title" x={462} y={y}>{l.title}</text>
              <Lines x={462} y={y + LH} lines={d} muted />
            </g>
          );
        });
      })()}
    </DiagramFrame>
  );
}
