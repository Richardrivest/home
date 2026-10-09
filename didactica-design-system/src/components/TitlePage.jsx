import React from 'react';
import { Icon } from './Icon.jsx';
import BOXES from '../boxes.config.json';

const VARIANTS = ['mosaic', 'band', 'motif', 'editorial'];

/** Text written as “[…]” is a placeholder to replace: it is drawn with a dashed frame. */
function Slot({ text, className }) {
  const placeholder = /^\[.*\]$/.test(String(text).trim());
  return <p className={`${className}${placeholder ? ' du-placeholder' : ''}`}>{text}</p>;
}

/** Mosaic: the nine box colours and icons, in their order of appearance in a unit. */
function Mosaic() {
  return (
    <div className="du-cover-mosaic" aria-hidden="true">
      {BOXES.map((b) => (
        <span key={b.kind} className="du-cover-mosaic__cell" style={{ background: `var(--${b.kind}-accent)` }}>
          <Icon name={b.icon} size={28} />
        </span>
      ))}
    </div>
  );
}

/** Motif: nested circles in the diagram ramp, bleeding off the bottom-right corner. */
function Motif() {
  return (
    <svg className="du-cover-motif" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      {[200, 155, 110, 65].map((r, i) => <circle key={r} cx="400" cy="400" r={r * 2} className={`du-dg-ramp--${4 - i}`} />)}
    </svg>
  );
}

/**
 * The manual's cover. One A4 page: title block at the top, credits and details at the bottom.
 * variant: 'mosaic' (default; the nine box colours), 'band' (navy band), 'motif' (nested
 * circles) or 'editorial' (left rule and a large volume number). bleed: in print, colour
 * runs to the edge of the paper. Write unknown details as “[…]” to mark them as placeholders.
 */
export function TitlePage({ variant = 'mosaic', bleed = false, volume, kicker, title, subtitle, lede, ribbon, credits = [], meta = [] }) {
  const v = VARIANTS.includes(variant) ? variant : 'mosaic';
  const head = (
    <>
      {v === 'editorial' && volume != null ? <p className="du-cover-volume" aria-hidden="true">{String(volume).padStart(2, '0')}</p> : null}
      {kicker ? <p className="du-title-page__kicker cover-kicker">{kicker}</p> : null}
      <h1 className="du-title-page__title cover-title">{title}</h1>
      {v !== 'band' ? <span className="du-cover-rule" aria-hidden="true" /> : null}
    </>
  );
  return (
    <header className={`du-title-page du-title-page--${v}${bleed ? ' du-title-page--bleed' : ''}`}>
      {v === 'mosaic' ? <Mosaic /> : null}
      {v === 'motif' ? <Motif /> : null}
      <div className="du-title-page__top">
        {v === 'band' ? <div className="du-cover-band">{head}</div> : head}
        {subtitle ? <p className="du-title-page__subtitle cover-subtitle">{subtitle}</p> : null}
        {lede ? <p className="du-title-page__lede cover-lede">{lede}</p> : null}
      </div>
      <div className="du-title-page__bottom">
        {ribbon ? <p className="du-ribbon ribbon">{ribbon}</p> : null}
        {credits.length ? (
          <div className="du-title-page__credits">
            {credits.map((line, i) => <Slot key={i} text={line} className="cover-credit" />)}
          </div>
        ) : null}
        {meta.length ? (
          <div className="du-title-page__meta">
            {meta.map((line, i) => <Slot key={i} text={line} className="cover-meta" />)}
          </div>
        ) : null}
      </div>
    </header>
  );
}
