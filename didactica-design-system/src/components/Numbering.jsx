import React, { createContext, useContext } from 'react';

const NumberingContext = createContext({ figures: {}, tables: {} });

/**
 * Numbers figures and tables from their ids, in the order listed (APA: order of first
 * mention); firstFigure / firstTable continue a count from an earlier unit. <Figure id> / <DataTable id> take their number from it, and <FigRef to>
 * prints “Figura N” / “Tabla N”, so renumbering never breaks a cross-reference.
 */
export function Numbering({ figures = [], tables = [], firstFigure = 1, firstTable = 1, children }) {
  const index = (ids, first) => Object.fromEntries(ids.map((id, i) => [id, i + first]));
  return <NumberingContext.Provider value={{ figures: index(figures, firstFigure), tables: index(tables, firstTable) }}>{children}</NumberingContext.Provider>;
}

/** Number of a figure or table id, or undefined. */
export function useNumber(kind, id) {
  const ctx = useContext(NumberingContext);
  return id ? ctx[kind === 'table' ? 'tables' : 'figures'][id] : undefined;
}

/** Cross-reference: “Figura 2”, or with paren “(véase la Figura 2)”. Kind is found from the id. */
export function FigRef({ to, paren = false }) {
  const ctx = useContext(NumberingContext);
  const fig = ctx.figures[to];
  const tab = ctx.tables[to];
  const label = fig ? `Figura ${fig}` : tab ? `Tabla ${tab}` : `[referencia sin destino: ${to}]`;
  const text = paren ? `(véase la ${label})` : label;
  return <a className="du-figref" href={`#${fig ? 'fig' : 'tab'}-${to}`}>{text}</a>;
}
