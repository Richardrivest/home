import React, { useId } from 'react';
import { wrap, textWidth } from '../diagram-utils.js';
import { DiagramScroll, DiagramText } from './diagrams/parts.jsx';

const W = 680, H = 420, LH = 18;

/** Cycle: 3–8 steps around a circle joined by arrows, with an optional centre label. */
export function CycleDiagram({ steps, center, label }) {
  const id = useId().replace(/:/g, '');
  const n = steps.length;
  const cx = W / 2, cy = H / 2, R = 155;
  const ang = (i) => -Math.PI / 2 + (2 * Math.PI * i) / n;
  const gap = Math.min(0.42, Math.PI / n * 0.7);
  const arc = (i) => {
    const a1 = ang(i) + gap, a2 = ang(i + 1) - gap;
    const p = (a) => [cx + R * Math.cos(a), cy + R * Math.sin(a)];
    const [x1, y1] = p(a1), [x2, y2] = p(a2);
    return `M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`;
  };
  const aria = label || `Ciclo: ${steps.map((s) => s.title).join(', ')}`;
  return (
    <div className="du-diagram-wrap">
    <DiagramScroll label={aria}>
    <svg className="du-diagram" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={aria}>
      <defs>
        <marker id={`a${id}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path className="du-dg-arrowhead" d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      {steps.map((_, i) => <path key={i} className="du-dg-edge du-dg-edge--arc" d={arc(i)} markerEnd={`url(#a${id})`} />)}
      {center ? wrap(center, 16).map((l, i, arr) => (
        <text key={i} className="du-dg-text du-dg-text--muted diagram-title" x={cx} y={cy + (i - (arr.length - 1) / 2) * LH + 5} textAnchor="middle">{l}</text>
      )) : null}
      {steps.map((s, i) => {
        const x = cx + R * Math.cos(ang(i)), y = cy + R * Math.sin(ang(i));
        const t = wrap(s.title, 16), d = s.text ? wrap(s.text, 20) : [];
        const w = Math.max(...t.map((l) => textWidth(l, 16)), ...d.map((l) => textWidth(l, 14)), 80) + 24;
        const h = (t.length + d.length) * LH + 16, top = y - h / 2;
        return (
          <g key={i}>
            <rect className="du-dg-node" x={x - w / 2} y={top} width={w} height={h} />
            {t.map((l, j) => <text key={j} className="du-dg-text diagram-title" x={x} y={top + 8 + LH * (j + 0.75)} textAnchor="middle">{l}</text>)}
            {d.map((l, j) => <text key={`d${j}`} className="du-dg-text diagram-label" x={x} y={top + 8 + LH * (t.length + j + 0.75)} textAnchor="middle">{l}</text>)}
          </g>
        );
      })}
    </svg>
    </DiagramScroll>
    <DiagramText>
    <div className="du-diagram-list">
      {center ? <p className="du-diagram-list__center diagram-title">{center}</p> : null}
      <ol className="du-diagram-list__cycle">
        {steps.map((s, i) => (
          <li key={i} className="diagram-label"><strong>{s.title}</strong>{s.text ? <span className="du-diagram-list__detail"> · {s.text}</span> : null}</li>
        ))}
      </ol>
      <p className="du-diagram-list__note diagram-label">↻ Después del paso {steps.length}, el ciclo vuelve al paso 1.</p>
    </div>
    </DiagramText>
    </div>
  );
}
