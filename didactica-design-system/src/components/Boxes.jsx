import React, { useId } from 'react';
import { Icon } from './Icon.jsx';
import { bloomLevel } from '../bloom.js';
import BOXES from '../boxes.config.json';

const CONFIG = Object.fromEntries(BOXES.map((b) => [b.kind, b]));

/** The shared frame of the seven didactic boxes: tinted surface, icon + title header, body. */
export function Box({ kind, title, children }) {
  const id = useId();
  const cfg = CONFIG[kind] || CONFIG.important;
  return (
    <aside className={`du-box du-box--${cfg.kind}`} aria-labelledby={id}>
      <div className="du-box__header">
        <Icon name={cfg.icon} className="du-box__icon" />
        <p id={id} className="du-box__title box-title">{title || cfg.title}</p>
      </div>
      <div className="du-box__body box-body">{children}</div>
    </aside>
  );
}

/** “Puntos Clave”: the unit summary, first box of every unit. */
export function KeyPoints({ items, title }) {
  return (
    <Box kind="keypoints" title={title}>
      <ul className="du-box__list">
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </Box>
  );
}

/** “Objetivos”: learning objectives, each tagged with its Bloom (revised) level. */
export function Objectives({ items, intro = 'Al finalizar la unidad, usted será capaz de:', title }) {
  return (
    <Box kind="objectives" title={title}>
      {intro ? <p className="du-box__intro">{intro}</p> : null}
      <ol className="du-box__list du-box__list--objectives">
        {items.map((it, i) => {
          const lvl = bloomLevel(it.level);
          return (
            <li key={i}>
              <span className="du-tag tag" title={lvl ? `Nivel ${lvl.level} de Bloom` : undefined}>
                {lvl ? `${lvl.level} · ${lvl.name}` : it.level}
              </span>
              <span>{it.text}</span>
            </li>
          );
        })}
      </ol>
    </Box>
  );
}

/** “Importante”: a key concept or definition the reader should retain. */
export function Important({ term, children, title }) {
  return (
    <Box kind="important" title={title}>
      {term ? <p className="du-box__term">{term}</p> : null}
      <div className="du-box__text">{children}</div>
    </Box>
  );
}

/** “Error Frecuente”: a common misconception and what the evidence shows instead. */
export function CommonMistake({ misconception, correction, children, title }) {
  return (
    <Box kind="mistake" title={title}>
      <p className="du-box__pair"><span className="du-box__label">Creencia frecuente:</span> {misconception}</p>
      <p className="du-box__pair"><span className="du-box__label">Lo que muestra la evidencia:</span> {correction}</p>
      {children ? <div className="du-box__text">{children}</div> : null}
    </Box>
  );
}

/** “Para Seguir Pensando”: open, critical questions that close the unit. */
export function ThinkFurther({ questions, title }) {
  return (
    <Box kind="thinking" title={title}>
      <ol className="du-box__list du-box__list--numbered">
        {questions.map((q, i) => <li key={i}>{q}</li>)}
      </ol>
    </Box>
  );
}

const ACTIVITY_TYPES = { pregunta: 'Pregunta', tarea: 'Tarea', caso: 'Caso', debate: 'Debate' };

/** “Actividades”: questions and tasks to work the unit's concepts. Item: string or { type, text }. */
export function Activities({ items, title }) {
  return (
    <Box kind="activities" title={title}>
      <ol className="du-box__list du-box__list--numbered">
        {items.map((it, i) => {
          const obj = typeof it === 'string' ? { text: it } : it;
          return (
            <li key={i}>
              {obj.type ? <span className="du-tag tag">{ACTIVITY_TYPES[obj.type] || obj.type}</span> : null}
              <span>{obj.text}</span>
            </li>
          );
        })}
      </ol>
    </Box>
  );
}

/** “Referencias”: the unit's APA 7 reference list, French (hanging) indent. Children: <Reference> items. */
export function ReferencesBox({ children, title }) {
  return (
    <Box kind="references" title={title}>
      <div className="du-box__refs">{children}</div>
    </Box>
  );
}
