import React from 'react';
import { wrap, textWidth } from '../diagram-utils.js';

const W = 680;
const LH = 18;

function Node({ x, y, lines, strong, detail = [] }) {
  const all = [...lines, ...detail];
  const w = Math.max(96, ...lines.map((l) => textWidth(l, 16)), ...detail.map((l) => textWidth(l, 14))) + 24;
  const h = all.length * LH + 16;
  const top = y - h / 2;
  return (
    <g>
      <rect className={strong ? 'du-dg-node du-dg-node--strong' : 'du-dg-node'} x={x - w / 2} y={top} width={w} height={h} />
      {lines.map((l, i) => (
        <text key={i} className={`du-dg-text diagram-title${strong ? ' du-dg-text--on-strong' : ''}`} x={x} y={top + 8 + LH * (i + 0.75)} textAnchor="middle">{l}</text>
      ))}
      {detail.map((l, i) => (
        <text key={`d${i}`} className="du-dg-text diagram-label" x={x} y={top + 8 + LH * (lines.length + i + 0.75)} textAnchor="middle">{l}</text>
      ))}
    </g>
  );
}

/**
 * Concept web: a central concept linked to up to 8 related concepts, with optional
 * relation labels on the links and a short detail under each concept.
 */
export function ConceptWeb({ center, nodes, label }) {
  // Labels that wrap past 3 lines crowd the web; the content checker reports them.
  const long = nodes.filter((nd) => wrap(nd.label, 18).length > 3).map((nd) => nd.label);
  const n = nodes.length;
  const rows = nodes.map((nd) => wrap(nd.label, 18).length + (nd.detail ? wrap(nd.detail, 22).length : 0));
  const H = Math.max(360, 260 + Math.max(...rows, 1) * LH * 2);
  const cx = W / 2, cy = H / 2, rx = 250, ry = H / 2 - 30 - Math.max(...rows, 1) * LH / 2;
  const pos = nodes.map((_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
  });
  return (
    <div className="du-diagram-wrap">
    <svg className="du-diagram" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label || `Red conceptual: ${center}`} data-warn={long.length ? `label-long: ${long.join(' | ')}` : undefined}>
      {pos.map(([x, y], i) => <line key={i} className="du-dg-edge" x1={cx} y1={cy} x2={x} y2={y} />)}
      <Node x={cx} y={cy} lines={wrap(center, 16)} strong />
      {nodes.map((nd, i) => (
        <Node key={i} x={pos[i][0]} y={pos[i][1]} lines={wrap(nd.label, 18)} detail={nd.detail ? wrap(nd.detail, 22) : []} />
      ))}
      {/* relation labels last, so they sit on top of the links */}
      {nodes.map((nd, i) => nd.relation ? (
        <g key={`r${i}`}>
          <rect className="du-dg-relation-bg" x={(cx + pos[i][0]) / 2 - textWidth(nd.relation, 14) / 2 - 4} y={(cy + pos[i][1]) / 2 - 10} width={textWidth(nd.relation, 14) + 8} height={18} />
          <text className="du-dg-relation" x={(cx + pos[i][0]) / 2} y={(cy + pos[i][1]) / 2 + 3} textAnchor="middle">{nd.relation}</text>
        </g>
      ) : null)}
    </svg>
    {/* Narrow containers: the same structure as a list. */}
    <div className="du-diagram-list">
      <p className="du-diagram-list__center diagram-title">{center}</p>
      <ul>
        {nodes.map((nd, i) => (
          <li key={i} className="diagram-label">
            {nd.relation ? <span className="du-diagram-list__rel">{nd.relation} </span> : null}
            <strong>{nd.label}</strong>{nd.detail ? <span className="du-diagram-list__detail"> · {nd.detail}</span> : null}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}
