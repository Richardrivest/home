import React from 'react';
import { DiagramFrame, Lines, wrap, LH, useArrow } from './parts.jsx';

const W = 680, H = 440, SPINE = 220, EFFECT_X = 540;

/** Fishbone (Ishikawa): categories of causes along a spine that leads to an effect. */
export function Fishbone({ effect, causes, label }) {
  const [defs, arrow] = useArrow();
  const cols = Math.ceil(causes.length / 2);
  const step = (EFFECT_X - 40) / cols;
  const eff = wrap(effect, 14);
  return (
    <DiagramFrame width={W} height={H} label={label || `Diagrama de causas: ${effect}`}
      list={<><p className="du-diagram-list__center diagram-title">Efecto: {effect}</p><ul>{causes.map((c, i) => <li key={i}><strong>{c.category}</strong>{c.items && c.items.length ? <ul>{c.items.map((it, j) => <li key={j}>{it}</li>)}</ul> : null}</li>)}</ul></>}>
      {defs}
      <line className="du-dg-edge" x1={20} y1={SPINE} x2={EFFECT_X - 4} y2={SPINE} markerEnd={arrow} />
      <rect className="du-dg-node du-dg-node--strong" x={EFFECT_X} y={SPINE - (eff.length * LH + 16) / 2} width={W - EFFECT_X - 6} height={eff.length * LH + 16} />
      <Lines x={(EFFECT_X + W - 6) / 2} y={SPINE - ((eff.length - 1) * LH) / 2 + 5} lines={eff} anchor="middle" title className="diagram-title du-dg-text--on-strong" />
      {causes.map((c, i) => {
        const up = i % 2 === 0; const col = Math.floor(i / 2);
        const bx = 40 + col * step + step * 0.55;
        const ey = up ? 40 : H - 40; const ex = bx - 70;
        const items = (c.items || []).slice(0, 3);
        return (
          <g key={i}>
            <line className="du-dg-edge" x1={ex} y1={ey} x2={bx} y2={SPINE} />
            <Lines x={ex} y={up ? ey - 12 : ey + 24} lines={wrap(c.category, 18)} anchor="middle" title />
            {items.map((it, j) => {
              const f = (j + 1) / (items.length + 1);
              const px = ex + (bx - ex) * f, py = ey + (SPINE - ey) * f;
              return (
                <g key={j}>
                  <line className="du-dg-leader" x1={px} y1={py} x2={px - 14} y2={py} />
                  <Lines x={px - 18} y={py + 5} lines={wrap(it, 16).slice(0, 2)} anchor="end" />
                </g>
              );
            })}
          </g>
        );
      })}
    </DiagramFrame>
  );
}
