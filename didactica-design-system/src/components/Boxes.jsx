import React, { useId } from 'react';
import { Icon } from './Icon.jsx';
import { bloomLevel } from '../bloom.js';
import { objectiveId, checkAlignment } from '../alignment.js';
import BOXES from '../boxes.config.json';

const CONFIG = Object.fromEntries(BOXES.map((b) => [b.kind, b]));

/**
 * The shared frame of the didactic boxes. Its family sets the shape, so boxes stay
 * distinct without colour: open = filled header band, text = heavy top rule,
 * close = untinted frame.
 */
export function Box({ kind, title, children, extraHeader }) {
  const id = useId();
  const cfg = CONFIG[kind] || CONFIG.important;
  return (
    <aside className={`du-box du-box--${cfg.kind} du-box--family-${cfg.family}`} aria-labelledby={id}>
      <div className="du-box__header">
        <Icon name={cfg.icon} className="du-box__icon" />
        <p id={id} className="du-box__title box-title">{title || cfg.title}</p>
        {extraHeader}
      </div>
      <div className="du-box__body box-body">{children}</div>
    </aside>
  );
}

/** “Puntos Clave”: the unit summary, first box of every unit (3–5 one-line items). */
export function KeyPoints({ items, before, title }) {
  return (
    <Box kind="keypoints" title={title}>
      <ul className="du-box__list">
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
      {before && before.length ? (
        <div className="du-box__before">
          <p className="du-box__label">Antes de leer:</p>
          <ul className="du-box__list du-box__list--questions">
            {before.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        </div>
      ) : null}
    </Box>
  );
}

const LevelTag = ({ level }) => {
  const lvl = bloomLevel(level);
  return (
    <span className="du-tag tag" title={lvl ? `Nivel ${lvl.level} de Bloom` : undefined}>
      {lvl ? `${lvl.level} · ${lvl.name}` : level}
    </span>
  );
};

/** “Objetivos”: numbered learning objectives (O1, O2…), each tagged with its Bloom (revised) level. */
export function Objectives({ items, intro = 'Al finalizar la unidad, usted será capaz de:', title }) {
  return (
    <Box kind="objectives" title={title}>
      {intro ? <p className="du-box__intro">{intro}</p> : null}
      <ol className="du-box__list du-box__list--objectives">
        {items.map((it, i) => (
          <li key={i} id={`obj-${objectiveId(it, i)}`}>
            <span className="du-box__oid">{objectiveId(it, i)}</span>
            <LevelTag level={it.level} />
            <span className="du-box__otext">{it.text}</span>
          </li>
        ))}
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

/**
 * “Error Frecuente”: a refutation in three moves — the misconception, the explicit
 * correction (with its citation) and the explanation of why the belief does not hold.
 */
export function CommonMistake({ misconception, correction, explanation, children, title }) {
  return (
    <Box kind="mistake" title={title}>
      <p className="du-box__pair"><span className="du-box__label">Creencia frecuente:</span> {misconception}</p>
      <p className="du-box__pair"><span className="du-box__label">Lo que muestra la evidencia:</span> {correction}</p>
      {explanation ? <p className="du-box__pair"><span className="du-box__label">Por qué no se sostiene:</span> {explanation}</p> : null}
      {children ? <div className="du-box__text">{children}</div> : null}
    </Box>
  );
}

const DISCIPLINES = { sociales: 'Ciencias Sociales', salud: 'Ciencias de la Salud', general: 'Didáctica general' };

/** “En el Aula”: a worked classroom case — situation, didactic decision and its rationale. */
export function Classroom({ discipline, situation, decision, rationale, title }) {
  const tag = discipline ? <span className="du-tag tag du-box__discipline">{DISCIPLINES[discipline] || discipline}</span> : null;
  return (
    <Box kind="example" title={title} extraHeader={tag}>
      <p className="du-box__pair"><span className="du-box__label">Situación:</span> {situation}</p>
      <p className="du-box__pair"><span className="du-box__label">Decisión didáctica:</span> {decision}</p>
      {rationale ? <p className="du-box__pair"><span className="du-box__label">Fundamento:</span> {rationale}</p> : null}
    </Box>
  );
}

/** “Para Seguir Pensando”: open questions with no single answer; not assessed. */
export function ThinkFurther({ questions, title }) {
  return (
    <Box kind="thinking" title={title}>
      <ol className="du-box__list du-box__list--numbered">
        {questions.map((q, i) => <li key={i}>{q}</li>)}
      </ol>
    </Box>
  );
}

/**
 * “Autoevaluación”: retrieval practice with feedback. On screen each answer opens on
 * demand; in print the answers are collected in a key at the end of the box.
 * Item: { question, answer, review? } — review names an earlier unit (spaced review).
 */
export function SelfCheck({ items, title }) {
  return (
    <Box kind="selfcheck" title={title}>
      <ol className="du-box__list du-box__list--numbered">
        {items.map((it, i) => (
          <li key={i}>
            <div className="du-box__q">
              {it.review ? <span className="du-tag tag">Repaso · {it.review}</span> : null}
              <span>{it.question}</span>
              <details className="du-box__answer">
                <summary>Ver respuesta</summary>
                <p>{it.answer}</p>
              </details>
            </div>
          </li>
        ))}
      </ol>
      <div className="du-box__key" aria-hidden="true">
        <p className="du-box__label">Clave de respuestas</p>
        <ol>{items.map((it, i) => <li key={i}>{it.answer}</li>)}</ol>
      </div>
    </Box>
  );
}

const ACTIVITY_TYPES = { pregunta: 'Pregunta', tarea: 'Tarea', caso: 'Caso', debate: 'Debate' };

/**
 * “Actividades”: assessable questions and tasks. Item: string or
 * { type, text, level, objectives: ['O1'] } — level and objectives make the alignment visible.
 */
export function Activities({ items, title }) {
  return (
    <Box kind="activities" title={title}>
      <ol className="du-box__list du-box__list--numbered">
        {items.map((it, i) => {
          const obj = typeof it === 'string' ? { text: it } : it;
          return (
            <li key={i}>
              <div className="du-box__q">
                <span className="du-box__tags">
                  {obj.type ? <span className="du-tag tag">{ACTIVITY_TYPES[obj.type] || obj.type}</span> : null}
                  {obj.level ? <LevelTag level={obj.level} /> : null}
                  {(obj.objectives || []).map((o) => <a key={o} className="du-tag du-tag--link tag" href={`#obj-${o}`}>{o}</a>)}
                </span>
                <span>{obj.text}</span>
              </div>
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

/**
 * Alignment table: which activities practise each objective. Problems (an objective
 * without activity, an activity below the objective's level) are shown in the table.
 */
export function AlignmentTable({ objectives, activities, title = 'Alineamiento de la unidad' }) {
  const { rows } = checkAlignment(objectives, activities);
  return (
    <figure className="du-table-figure du-alignment">
      <p className="du-table-figure__title table-title">{title}</p>
      <div className="du-table-scroll">
        <table className="du-table du-table--concept">
          <thead><tr><th scope="col" className="table-head">Objetivo</th><th scope="col" className="table-head">Nivel</th><th scope="col" className="table-head">Actividades</th><th scope="col" className="table-head">Estado</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <th scope="row" className="table-cell">{r.id}</th>
                <td className="table-cell">{r.level ? r.level.name : '—'}</td>
                <td className="table-cell">{r.activities.length ? r.activities.join(', ') : '—'}</td>
                <td className={`table-cell ${r.problems.length ? 'du-alignment__bad' : 'du-alignment__ok'}`}>
                  {r.problems.length ? r.problems.join(' ') : 'Alineado'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

/** “Cómo usar este manual”: the legend of box types, grouped by family. */
export function BoxLegend() {
  const families = [['open', 'Al abrir la unidad'], ['text', 'Dentro del texto'], ['close', 'Al cerrar la unidad']];
  return (
    <div className="du-legend">
      {families.map(([f, label]) => (
        <section key={f} className="du-legend__family">
          <p className="du-legend__label chapter-kicker">{label}</p>
          <ul className="du-legend__list">
            {BOXES.filter((b) => b.family === f).map((b) => (
              <li key={b.kind} className={`du-legend__item du-box--${b.kind} du-box--family-${b.family}`}>
                <span className="du-legend__swatch"><Icon name={b.icon} size={18} /></span>
                <span className="du-legend__name box-title">{b.title}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
