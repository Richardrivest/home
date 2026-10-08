import React from 'react';
import { DiagramFrame, Lines, wrap, LH } from './parts.jsx';

const W = 680, H = 440, SEA = 150;

/** Iceberg: what is visible above the waterline and what lies beneath it. */
export function Iceberg({ visible, hidden, visibleTitle = 'Lo visible', hiddenTitle = 'Lo que no se ve', label }) {
  const vis = visible.flatMap((v) => wrap(`• ${v}`, 34));
  const hid = hidden.flatMap((v) => wrap(`• ${v}`, 34));
  return (
    <DiagramFrame width={W} height={H} label={label || `Iceberg: ${visibleTitle} y ${hiddenTitle}`}
      list={<><p className="du-diagram-list__note diagram-title">{visibleTitle}</p><ul>{visible.map((v, i) => <li key={i}>{v}</li>)}</ul><p className="du-diagram-list__note diagram-title">{hiddenTitle}</p><ul>{hidden.map((v, i) => <li key={i}>{v}</li>)}</ul></>}>
      <rect className="du-dg-water" x={0} y={SEA} width={W} height={H - SEA} />
      <polygon className="du-dg-ice" points={`150,30 205,85 235,${SEA} 300,${SEA + 60} 285,330 205,${H - 20} 110,370 60,260 85,${SEA} 110,80`} />
      <line className="du-dg-sea" x1={0} y1={SEA} x2={W} y2={SEA} />
      <Lines x={340} y={44} lines={[visibleTitle]} title />
      <Lines x={340} y={44 + LH + 4} lines={vis} />
      <Lines x={340} y={SEA + 40} lines={[hiddenTitle]} title />
      <Lines x={340} y={SEA + 40 + LH + 4} lines={hid} />
    </DiagramFrame>
  );
}
