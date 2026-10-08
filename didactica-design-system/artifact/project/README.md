Didáctica Universitaria is the visual language of the *Manual de Didáctica Universitaria*: a print-first academic manual for university teacher education. It reads like a well-made textbook: serif reading text, sans-serif structure, one navy and one azure, pale-blue boxes for definitions and square hairline tables. There is no decoration beyond that.

## Content fundamentals

- **Language.** Spanish, formal academic register. Exposition is impersonal third person: «La didáctica es la disciplina teórica que se ocupa de la enseñanza…».
- **Address the reader as *usted*** in activities and instructions, with imperatives: «Reconstruya una clase memorable…», «Analice el programa…», «Elabore, en un párrafo, su propia definición…».
- **Citations are APA 7, always.** In-text as (Autor, año) or Autor (año): «(Camilloni et al., 2007)», «Barr y Tagg (1995)». Use «y», never «&». Write ordinals as «7.ª edición» and «4.ª ed.».
- **Typographic quotes are guillemets** «…», and asides use em dashes —like this—. Never use straight quotes for terms.
- **Numbering carries the structure.** Units are «Unidad N. Título», sections «N.N. Título», annexes «Anexo B. …», sub-sections «B.1. …». Headings are sentence case.
- **Label patterns are fixed.** Callouts read «CONCEPTO CLAVE — Término», and the idea-fuerza box at the end of a unit reads «CONCEPTO CLAVE — Idea-fuerza de la Unidad N». Captions read «Tabla N. Descripción. Elaboración propia a partir de Autor (año).» Glossary entries read «Término: definición».
- **No emoji, no exclamation marks, no marketing tone.**

## Visual foundations

**Color.** Two brand inks carry the structure. Use `navy` for the strongest level: unit headings, the cover title, «Concepto clave» labels, glossary terms and the cover ribbon. Use `azure` for the next level: section headings, sub-section headings and the cover kicker. Set body copy in `ink` on `paper`. Everything else is a quiet tint:

- `concept-surface` with a `concept-border` frame for definition boxes.
- `table-head` with `on-table-head` text for table header rows.
- `band` for zebra rows.
- `rule` for hairlines.
- `caption`, `subtitle` and `lede` greys for secondary text.
- `running` for the running header and footer only. It is 3.2:1 on `paper`, so never use it for reading text.
- `link` for DOIs and URLs.

`word-heading` and `word-heading-deep` are the stock Word heading colors that the manual overrides. Keep them for documents that use plain Word styles.

**Themes.** `light` is the print source. `dark` is an added screen theme that keeps every role: navy and azure lighten to stay readable, and `table-head` deepens so white header text still holds 8.7:1.

**Type.** There are two families and no others. `serif` (Cambria, metric-matched by Caladea) sets reading text: `body`, `list-item`, `concept-body`, `glossary`, `reference`, `table-cell` and `note`. `sans` (Calibri, metric-matched by Carlito) sets structure and labels: `h1`, `h2`, `h3`, `toc-title`, `concept-label`, `table-head`, `caption`, `running` and the cover styles. Headings are bold; captions and notes are italic. Justify body paragraphs, list items, glossary entries and concept text. Left-align table cells, headings and references.

**Spacing.** All spacing comes from the manual's point values. Paragraphs take `space-9pt` after. H1 takes `space-16pt` before and `space-8pt` after. H2 takes `space-12pt` before and `space-6pt` after. H3 takes `space-9pt` before and `space-5pt` after. Table cells use `space-3pt` × `space-5pt`. Concept boxes use `space-6pt` × `space-8pt`. Pages have `page-margin` on all sides and a `measure` text block. Lists and references hang by `indent-hang`.

**Borders, radii and shadows.** Everything is square (`radius-none`). There are no shadows. Separation comes from three strokes:

- `stroke-hair` in `rule` for table grids and the header underline.
- `stroke-box` in `concept-border` for concept boxes.
- `stroke-ribbon` in `navy` above and below the cover ribbon.

**Layout.** The page is a single column at `measure`. Tables span the full measure, and the caption sits *under* the table. The page has a right-aligned running header over a hairline and a centred «Página N» footer.

**Motion and imagery.** None. The manual has no images, illustrations or animation. Do not add them.

## Iconography

There are no icons and no logo. The manual sets its name in plain type. The only glyphs are the list bullets: ● for level 1, ○ for level 2 and ■ for level 3. Never substitute icon fonts or emoji.

## Components

- `Page`: the page frame, with running header and footer.
- `TitlePage`: the cover.
- `TableOfContents`: the «Índice».
- `Heading`: levels 1–3.
- `Paragraph`: body text.
- `ConceptBox`: the «Concepto clave» box.
- `DataTable`: a table with its «Tabla N.» caption.
- `BulletList`: lists with ●○■ bullets.
- `GlossaryEntry`: one glossary term and its definition.
- `Reference`: one APA 7 reference.

Each component renders `du-*` classes from `components/bundle.css` together with the token type-style classes (`.body`, `.h2`, `.concept-label` …). Plain HTML can use the same class names without React.
