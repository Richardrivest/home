import React, { useId } from 'react';
import { DiagramFrame, Lines, wrap, LH } from './parts.jsx';

const W = 680, X0 = 60, X1 = 620, BAR = 170;

/** Spectrum: a continuum between two poles, with positions (0 = left pole, 1 = right pole). */
export function Spectrum({ left, right, points = [], label }) {
  const id = `sp${useId().replace(/:/g, '')}`;
  const sorted = [...points].sort((a, b) => a.position - b.position);
  const H = 290;
  return (
    <DiagramFrame width={W} height={H} label={label || `Continuo entre ${left} y ${right}`}
      list={<><p className="du-diagram-list__note diagram-label">De <strong>{left}</strong> a <strong>{right}</strong>:</p><ol>{sorted.map((p, i) => <li key={i}><strong>{p.label}</strong>{p.text ? <span className="du-diagram-list__detail"> · {p.text}</span> : null} <span className="du-diagram-list__rel">({p.position < 0.4 ? `más cerca de ${left}` : p.position > 0.6 ? `más cerca de ${right}` : 'en el centro'})</span></li>)}</ol></>}>
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" className="du-dg-stop--a" />
          <stop offset="100%" className="du-dg-stop--b" />
        </linearGradient>
      </defs>
      <rect x={X0} y={BAR - 12} width={X1 - X0} height={24} rx={12} fill={`url(#${id})`} className="du-dg-spectrum" />
      <Lines x={X0} y={28} lines={[`← ${left}`]} anchor="start" title />
      <Lines x={X1} y={28} lines={[`${right} →`]} anchor="end" title />
      {sorted.map((p, i) => {
        const x = X0 + p.position * (X1 - X0); const up = i % 2 === 0;
        const t = wrap(p.label, 16); const d = p.text ? wrap(p.text, 20) : [];
        const y0 = up ? BAR - 40 - (t.length + d.length - 1) * LH : BAR + 56;
        return (
          <g key={i}>
            <line className="du-dg-leader" x1={x} y1={up ? BAR - 14 : BAR + 14} x2={x} y2={up ? BAR - 32 : BAR + 38} />
            <circle className="du-dg-dot" cx={x} cy={BAR} r={8} />
            <Lines x={x} y={y0} lines={t} anchor="middle" title />
            <Lines x={x} y={y0 + t.length * LH} lines={d} anchor="middle" muted />
          </g>
        );
      })}
    </DiagramFrame>
  );
}
