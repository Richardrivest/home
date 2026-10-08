import React from 'react';
import { DiagramFrame, NodeBox, Lines, boxSize, wrap, LH } from './parts.jsx';

const W = 680, CX = 340;

/** Mind map: a central topic, branches to both sides, short ideas hanging from each branch. */
export function MindMap({ center, branches, label }) {
  const right = branches.slice(0, Math.ceil(branches.length / 2));
  const left = branches.slice(Math.ceil(branches.length / 2));
  const blockH = (b) => Math.max(boxSize(b.label, null, 14).h, (b.items || []).flatMap((it) => wrap(it, 15)).length * LH + (b.items || []).length * 4) + 24;
  const H = Math.max(260, Math.max(right.reduce((a, b) => a + blockH(b), 0), left.reduce((a, b) => a + blockH(b), 0)) + 20);
  const CY = H / 2;
  const side = (list, dir) => {
    const total = list.reduce((a, b) => a + blockH(b), 0);
    let y = CY - total / 2;
    return list.map((b, i) => {
      const h = blockH(b); const by = y + h / 2; y += h;
      const bx = CX + dir * 132; const bw = boxSize(b.label, null, 14, 96).w;
      const lines = (b.items || []).map((it) => wrap(it, 15));
      const count = lines.flat().length + (lines.length - 1) * 0.25;
      let ty = by - (count * LH) / 2 + 13;
      const tx = CX + dir * (132 + bw / 2 + 22);
      return (
        <g key={`${dir}${i}`}>
          <path className="du-dg-edge" d={`M ${CX + dir * 60} ${CY} C ${CX + dir * 90} ${CY}, ${bx - dir * (bw / 2 + 30)} ${by}, ${bx - dir * bw / 2} ${by}`} />
          {lines.length ? <line className="du-dg-leader" x1={bx + dir * bw / 2} y1={by} x2={tx - dir * 8} y2={by} /> : null}
          <NodeBox x={bx} y={by} title={b.label} chars={14} minW={96} />
          {lines.map((ls, j) => { const el = <Lines key={j} x={tx} y={ty} lines={ls.map((l, k) => (k === 0 ? `• ${l}` : `  ${l}`))} anchor={dir > 0 ? 'start' : 'end'} />; ty += ls.length * LH + 4; return el; })}
        </g>
      );
    });
  };
  return (
    <DiagramFrame width={W} height={H} label={label || `Mapa mental: ${center}`}
      list={<><p className="du-diagram-list__center diagram-title">{center}</p><ul>{branches.map((b, i) => <li key={i}><strong>{b.label}</strong>{b.items && b.items.length ? <ul>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul> : null}</li>)}</ul></>}>
      {side(right, 1)}{side(left, -1)}
      <NodeBox x={CX} y={CY} title={center} strong chars={12} minW={110} />
    </DiagramFrame>
  );
}
