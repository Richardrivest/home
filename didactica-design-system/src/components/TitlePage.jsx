import React from 'react';

/** The manual's cover: kicker, title, italic subtitle, lede, ribbon and metadata lines, all centred. */
export function TitlePage({ kicker, title, subtitle, lede, ribbon, meta = [] }) {
  return (
    <header className="du-title-page">
      {kicker ? <p className="du-title-page__kicker cover-kicker">{kicker}</p> : null}
      <h1 className="du-title-page__title cover-title">{title}</h1>
      {subtitle ? <p className="du-title-page__subtitle cover-subtitle">{subtitle}</p> : null}
      {lede ? <p className="du-title-page__lede cover-lede">{lede}</p> : null}
      {ribbon ? <p className="du-ribbon ribbon">{ribbon}</p> : null}
      {meta.map((line, i) => (
        <p key={i} className="du-title-page__meta cover-meta">{line}</p>
      ))}
    </header>
  );
}
