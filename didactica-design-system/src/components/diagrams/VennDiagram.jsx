import React from 'react';
import { DiagramFrame, Lines, wrap, LH } from './parts.jsx';

const SETS2 = { W: 680, H: 380, c: [[265, 200], [415, 200]], r: 150, at: { a: [185, 200], b: [495, 200], ab: [340, 200] }, labels: [[200, 34], [480, 34]] };
const SETS3 = { W: 680, H: 470, c: [[280, 190], [400, 190], [340, 295]], r: 130, at: { a: [225, 160], b: [455, 160], c: [340, 360], ab: [340, 138], ac: [256, 270], bc: [424, 270], abc: [340, 222] }, labels: [[175, 44], [505, 44], [340, 456]] };
const NAMES = { a: 0, b: 1, c: 2 };

/**
 * Venn diagram: what two or three concepts have in common and what is exclusive to each.
 * regions: { a, b, c, ab, ac, bc, abc } — short items for each region.
 */
export function VennDiagram({ sets, regions = {}, label }) {
  const L = sets.length === 3 ? SETS3 : SETS2;
  const chars = sets.length === 3 ? 12 : 16;
  const regionName = (k) => (k.length === 1 ? `Solo ${sets[NAMES[k]]}` : k.split('').map((c) => sets[NAMES[c]]).join(' y '));
  return (
    <DiagramFrame width={L.W} height={L.H} label={label || `Diagrama de Venn: ${sets.join(', ')}`}
      list={<ul>{Object.keys(L.at).filter((k) => regions[k] && regions[k].length).map((k) => <li key={k}><strong>{regionName(k)}:</strong> {regions[k].join('; ')}</li>)}</ul>}>
      {L.c.slice(0, sets.length).map(([x, y], i) => <circle key={i} className={`du-dg-venn du-dg-venn--${i + 1}`} cx={x} cy={y} r={L.r} />)}
      {sets.map((s, i) => <Lines key={i} x={L.labels[i][0]} y={L.labels[i][1]} lines={wrap(s, 22)} anchor="middle" title />)}
      {Object.entries(L.at).map(([k, [x, y]]) => {
        const items = (regions[k] || []).flatMap((it) => wrap(it, chars));
        return items.length ? <Lines key={k} x={x} y={y - ((items.length - 1) * LH) / 2 + 5} lines={items} anchor="middle" /> : null;
      })}
    </DiagramFrame>
  );
}
