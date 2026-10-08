import React from 'react';
import { DiagramFrame, NodeBox, EdgeLabel, boxSize, useArrow } from './parts.jsx';

const W = 680, ROW = 130;

/**
 * Concept map (Novak): concepts in rows by generality, joined by labelled links that read
 * as propositions (“aprendizaje — requiere → conocimiento previo”).
 */
export function ConceptMap({ nodes, links, label }) {
  const [defs, arrow] = useArrow();
  const levels = [...new Set(nodes.map((n) => n.level ?? 0))].sort((a, b) => a - b);
  const pos = {};
  levels.forEach((lv, r) => {
    const row = nodes.filter((n) => (n.level ?? 0) === lv);
    row.forEach((n, i) => { pos[n.id] = { x: (W * (i + 1)) / (row.length + 1), y: 50 + r * ROW, ...boxSize(n.label, n.detail, 14), n }; });
  });
  const H = 50 + (levels.length - 1) * ROW + 60;
  const crowded = levels.some((lv) => nodes.filter((n) => (n.level ?? 0) === lv).length > 4);
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <DiagramFrame width={W} height={H} label={label || 'Mapa conceptual'} warn={crowded ? 'label-long: más de 4 conceptos en un nivel' : null}
      list={<ul>{links.map((l, i) => <li key={i}><strong>{byId[l.from]?.label}</strong> <span className="du-diagram-list__rel">— {l.label} →</span> <strong>{byId[l.to]?.label}</strong></li>)}</ul>}>
      {defs}
      {links.map((l, i) => {
        const a = pos[l.from], b = pos[l.to];
        if (!a || !b) return null;
        const same = a.y === b.y;
        const x1 = same ? a.x + Math.sign(b.x - a.x) * a.w / 2 : a.x, y1 = same ? a.y : a.y + Math.sign(b.y - a.y) * a.h / 2;
        const x2 = same ? b.x - Math.sign(b.x - a.x) * b.w / 2 : b.x, y2 = same ? b.y : b.y - Math.sign(b.y - a.y) * b.h / 2;
        return <line key={i} className="du-dg-edge" x1={x1} y1={y1} x2={x2} y2={y2} markerEnd={arrow} />;
      })}
      {nodes.map((n) => <NodeBox key={n.id} x={pos[n.id].x} y={pos[n.id].y} title={n.label} text={n.detail} strong={(n.level ?? 0) === levels[0]} chars={14} />)}
      {links.map((l, i) => {
        const a = pos[l.from], b = pos[l.to];
        return a && b && l.label ? <EdgeLabel key={`l${i}`} x={(a.x + b.x) / 2} y={(a.y + b.y) / 2} text={l.label} /> : null;
      })}
    </DiagramFrame>
  );
}
