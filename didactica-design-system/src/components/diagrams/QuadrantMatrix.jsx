import React from 'react';
import { DiagramFrame, Lines, wrap, LH } from './parts.jsx';

const W = 680, H = 460, X0 = 110, X1 = 660, Y0 = 20, Y1 = 400;

/**
 * 2 × 2 matrix: two axes (low → high) and four quadrants, ordered
 * [top-left, top-right, bottom-left, bottom-right].
 */
export function QuadrantMatrix({ xAxis, yAxis, quadrants, label }) {
  const mx = (X0 + X1) / 2, my = (Y0 + Y1) / 2;
  const cells = [[X0, Y0], [mx, Y0], [X0, my], [mx, my]];
  const names = [`${yAxis.high} · ${xAxis.low}`, `${yAxis.high} · ${xAxis.high}`, `${yAxis.low} · ${xAxis.low}`, `${yAxis.low} · ${xAxis.high}`];
  return (
    <DiagramFrame width={W} height={H} label={label || `Matriz: ${yAxis.label} por ${xAxis.label}`}
      list={<ul>{quadrants.map((q, i) => <li key={i}><span className="du-diagram-list__rel">{names[i]}:</span> <strong>{q.title}</strong>{q.text ? <span className="du-diagram-list__detail"> · {q.text}</span> : null}</li>)}</ul>}>
      {cells.map(([x, y], i) => {
        const q = quadrants[i] || {}; const t = wrap(q.title || '', 22); const d = q.text ? wrap(q.text, 30) : [];
        return (
          <g key={i}>
            <rect className={`du-dg-quad du-dg-quad--${i === 1 ? 'strong' : 'plain'}`} x={x + 3} y={y + 3} width={(X1 - X0) / 2 - 6} height={(Y1 - Y0) / 2 - 6} />
            <Lines x={x + (X1 - X0) / 4} y={y + (Y1 - Y0) / 4 - ((t.length + d.length - 1) * LH) / 2 + 5} lines={t} anchor="middle" title />
            <Lines x={x + (X1 - X0) / 4} y={y + (Y1 - Y0) / 4 - ((t.length + d.length - 1) * LH) / 2 + 5 + t.length * LH} lines={d} anchor="middle" muted />
          </g>
        );
      })}
      <line className="du-dg-axis" x1={X0} y1={Y1} x2={X1} y2={Y1} />
      <line className="du-dg-axis" x1={X0} y1={Y1} x2={X0} y2={Y0} />
      <Lines x={X0} y={Y1 + 22} lines={[xAxis.low]} anchor="start" muted />
      <Lines x={X1} y={Y1 + 22} lines={[xAxis.high]} anchor="end" muted />
      <Lines x={mx} y={Y1 + 46} lines={[`${xAxis.label} →`]} anchor="middle" title />
      <Lines x={X0 - 10} y={Y1 - 4} lines={[yAxis.low]} anchor="end" muted />
      <Lines x={X0 - 10} y={Y0 + 14} lines={[yAxis.high]} anchor="end" muted />
      <text className="du-dg-text diagram-title" x={30} y={my} textAnchor="middle" transform={`rotate(-90 30 ${my})`}>{`${yAxis.label} →`}</text>
    </DiagramFrame>
  );
}
