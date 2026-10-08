import React from 'react';
import { DiagramFrame, NodeBox, boxSize } from './parts.jsx';

const SLOT = 150, LEVEL = 110;

const listOf = (n) => (
  <li key={n.label}><strong>{n.label}</strong>{n.detail ? <span className="du-diagram-list__detail"> · {n.detail}</span> : null}
    {n.children && n.children.length ? <ul>{n.children.map(listOf)}</ul> : null}</li>
);

/**
 * Hierarchy: a root with children up to three levels below (classifications, structures).
 * direction 'down' draws it top-down; 'right' draws it left to right, which fits more leaves.
 * 'auto' (default) goes right when the leaves would not fit across 680 units.
 */
export function TreeDiagram({ root, label, direction = 'auto' }) {
  // Lay out leaves left to right; a parent sits over the middle of its children.
  let leaf = 0; let maxDepth = 0;
  const place = (node, depth) => {
    maxDepth = Math.max(maxDepth, depth);
    const kids = (node.children || []).map((c) => place(c, depth + 1));
    const x = kids.length ? (kids[0].x + kids[kids.length - 1].x) / 2 : (leaf++ + 0.5) * SLOT;
    return { ...node, x, depth, kids, size: boxSize(node.label, node.detail, 14) };
  };
  const tree = place(root, 0);
  const across = direction === 'right' || (direction === 'auto' && leaf * SLOT > 680);
  if (across) return <TreeAcross tree={tree} leaves={leaf} depth={maxDepth} root={root} label={label} listOf={listOf} />;
  const W = Math.max(680, leaf * SLOT);
  const off = (W - leaf * SLOT) / 2;
  const H = (maxDepth + 1) * LEVEL + 10;
  const nodes = []; const edges = [];
  const walk = (n) => {
    const y = 50 + n.depth * LEVEL;
    nodes.push(<NodeBox key={nodes.length} x={n.x + off} y={y} title={n.label} text={n.detail} strong={n.depth === 0} chars={14} />);
    for (const k of n.kids) {
      const y2 = 50 + k.depth * LEVEL; const mid = (y + y2) / 2;
      edges.push(<path key={edges.length} className="du-dg-edge" d={`M ${n.x + off} ${y + n.size.h / 2} V ${mid} H ${k.x + off} V ${y2 - k.size.h / 2}`} />);
      walk(k);
    }
  };
  walk(tree);
  return (
    <DiagramFrame width={W} height={H} label={label || `Jerarquía: ${root.label}`} warn={maxDepth > 3 || leaf > 8 ? `label-long: árbol de ${leaf} hojas y ${maxDepth + 1} niveles; divídalo` : null}
      list={<ul className="du-diagram-list__tree">{listOf(root)}</ul>}>
      {edges}{nodes}
    </DiagramFrame>
  );
}

/** Left-to-right layout: one column per level, one row per leaf. */
function TreeAcross({ tree, depth, root, label }) {
  const W = 680; const col = W / (depth + 1); const chars = Math.max(10, Math.floor((col - 40) / 8.5));
  let y = 10; const nodes = []; const edges = [];
  const place = (n) => {
    const size = boxSize(n.label, n.detail, chars);
    const kids = (n.children || []).map(place);
    let cy;
    if (kids.length) cy = (kids[0].cy + kids[kids.length - 1].cy) / 2;
    else { cy = y + size.h / 2; y += size.h + 14; }
    return { ...n, size, kids, cy };
  };
  const t = place(tree);
  const H = y;
  const walk = (n, d) => {
    const cx = col * d + col / 2;
    nodes.push(<NodeBox key={nodes.length} x={cx} y={n.cy} title={n.label} text={n.detail} strong={d === 0} chars={chars} />);
    for (const k of n.kids) {
      const kx = col * (d + 1) + col / 2; const mid = (cx + n.size.w / 2 + kx - k.size.w / 2) / 2;
      edges.push(<path key={edges.length} className="du-dg-edge" d={`M ${cx + n.size.w / 2} ${n.cy} H ${mid} V ${k.cy} H ${kx - k.size.w / 2}`} />);
      walk(k, d + 1);
    }
  };
  walk(t, 0);
  return (
    <DiagramFrame width={W} height={H} label={label || `Jerarquía: ${root.label}`} warn={depth > 3 ? `label-long: árbol de ${depth + 1} niveles; divídalo` : null}
      list={<ul className="du-diagram-list__tree">{listOf(root)}</ul>}>
      {edges}{nodes}
    </DiagramFrame>
  );
}
