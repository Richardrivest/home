import React, { useId } from 'react';
import { wrap, textWidth } from '../../diagram-utils.js';

export const LH = 18; // line height in diagram units
export { wrap, textWidth };

/**
 * Every diagram: the SVG drawing plus the same structure as a list. The drawing always
 * shows; below 600px of container width it keeps a 600px width and scrolls sideways, so
 * labels never shrink under 12px. The list sits under it behind “Ver como texto”.
 */
export function DiagramFrame({ width, height, label, warn, list, children }) {
  return (
    <div className="du-diagram-wrap">
      <DiagramScroll label={label}>
        <svg className="du-diagram" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label} data-warn={warn || undefined}>
          {children}
        </svg>
      </DiagramScroll>
      <DiagramText><div className="du-diagram-list">{list}</div></DiagramText>
    </div>
  );
}

/** Scroll frame for the drawing; focusable so keyboard users can scroll it when narrow. */
export function DiagramScroll({ label, children }) {
  return (
    <>
      <div className="du-diagram-scroll" tabIndex={0} role="group" aria-label={label}>{children}</div>
      <p className="du-diagram-hint" aria-hidden="true">Deslizá para ver el diagrama completo →</p>
    </>
  );
}

/** The text version of a diagram, collapsed under the drawing. */
export function DiagramText({ children }) {
  return (
    <details className="du-diagram-text">
      <summary className="diagram-label">Ver como texto</summary>
      {children}
    </details>
  );
}

/** Arrowhead marker; returns [defs, markerUrl]. */
export function useArrow() {
  const id = `ar${useId().replace(/:/g, '')}`;
  const defs = (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path className="du-dg-arrowhead" d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
    </defs>
  );
  return [defs, `url(#${id})`];
}

/** Box size for a title (16px) and optional text (14px). */
export function boxSize(title, text, chars = 16, minW = 90) {
  const t = wrap(title, chars);
  const d = text ? wrap(text, chars + 4) : [];
  const w = Math.max(minW, ...t.map((l) => textWidth(l, 16)), ...d.map((l) => textWidth(l, 14))) + 24;
  return { t, d, w, h: (t.length + d.length) * LH + 16 };
}

/** A centred node box with a bold title and an optional muted detail. */
export function NodeBox({ x, y, title, text, strong = false, chars = 16, minW, className = '' }) {
  const { t, d, w, h } = boxSize(title, text, chars, minW);
  const top = y - h / 2;
  return (
    <g className={className}>
      <rect className={strong ? 'du-dg-node du-dg-node--strong' : 'du-dg-node'} x={x - w / 2} y={top} width={w} height={h} />
      {t.map((l, i) => <text key={i} className={`du-dg-text diagram-title${strong ? ' du-dg-text--on-strong' : ''}`} x={x} y={top + 8 + LH * (i + 0.75)} textAnchor="middle">{l}</text>)}
      {d.map((l, i) => <text key={`d${i}`} className={`du-dg-text diagram-label${strong ? ' du-dg-text--on-strong' : ''}`} x={x} y={top + 8 + LH * (t.length + i + 0.75)} textAnchor="middle">{l}</text>)}
    </g>
  );
}

/** Multi-line text block (14px), anchored start | middle | end. */
export function Lines({ x, y, lines, anchor = 'start', className = 'diagram-label', muted = false, title = false }) {
  const cls = title && !className.includes('diagram-title') ? `diagram-title ${className.replace('diagram-label', '')}`.trim() : className;
  return lines.map((l, i) => (
    <text key={i} className={`du-dg-text ${cls}${muted ? ' du-dg-text--muted' : ''}`} x={x} y={y + i * LH} textAnchor={anchor}>{l}</text>
  ));
}

/** Label with a paper background, for text that sits on lines. */
export function EdgeLabel({ x, y, text }) {
  const w = textWidth(text, 14) + 10;
  return (
    <g>
      <rect className="du-dg-relation-bg" x={x - w / 2} y={y - 11} width={w} height={20} />
      <text className="du-dg-relation" x={x} y={y + 4} textAnchor="middle">{text}</text>
    </g>
  );
}

/** Ramp step (1 darkest … 4 lightest) for item i of n, light at one end. */
export const rampFor = (i, n, darkFirst = true) => {
  const k = n <= 1 ? 1 : Math.round((darkFirst ? i : n - 1 - i) * 3 / (n - 1)) + 1;
  return Math.min(4, Math.max(1, k));
};
