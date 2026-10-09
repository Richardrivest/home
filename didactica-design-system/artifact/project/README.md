Didáctica Universitaria is the visual language of the *Manual de Didáctica Universitaria*. It is built for university teacher-education materials that people read on screen and in print. Reading text is serif and structure is sans-serif. The two brand inks are navy and azure. Nine boxes mark the didactic moves of every unit; each has an icon, a title word and a shape, so a box can be identified without colour. APA 7 governs every citation, table and figure.

## Anatomy of a unit

Every unit follows the same sequence. Never reorder it.

1. `ChapterOpener`: the “Unidad N” kicker, the title and a lead paragraph.
2. `KeyPoints` (“Puntos Clave”): 3–5 one-line key points, plus 1–3 “Antes de leer” questions.
3. `Objectives` (“Objetivos”): 3–5 objectives, numbered O1, O2…, each tagged with its Bloom level.
4. The body: numbered sections (`Heading` 2 and 3) and `Paragraph` with `Cite`. Add `Important`, `CommonMistake`, `Classroom`, `DataTable` and `Figure` as needed, within the density rules below.
5. `ThinkFurther` (“Para Seguir Pensando”): 2–4 open questions, not assessed, followed by the “Antes de leer” questions again (`revisit`).
6. `SelfCheck` (“Autoevaluación”): 3–5 recall questions with answers, including one review item from an earlier unit.
7. `Activities` (“Actividades”): assessable tasks, each tagged with its type, Bloom level and the objectives it practises.
8. `AlignmentTable`: which activities practise each objective, with any gaps flagged.
9. `ReferencesBox` (“Referencias”): the unit's APA 7 reference list, generated from the citations with `auto`.

Introduce the system once, in the manual's opening pages, with `BoxLegend` (“Cómo usar este manual”).

## The nine boxes

Boxes come in three families. The family sets the shape, so readers learn three patterns, and the shapes still work in a grayscale photocopy or for colour-blind readers.

- **Opening family** (`open`): a filled header band in the box accent, with the title and icon in `paper`, over a tinted body.
- **In-text family** (`text`): a heavy `stroke-accent` top rule in the accent, a tinted body and a thin frame. These are the only boxes meant to interrupt reading.
- **Closing family** (`close`): an untinted frame, with the title and icon in the accent and a hairline under the header.

| Box | Title | Icon | Family | Tokens | Where |
|---|---|---|---|---|---|
| `KeyPoints` | Puntos Clave | key | Opening | `keypoints-*` (navy) | Opens the unit |
| `Objectives` | Objetivos | target | Opening | `objectives-*` (teal) | Right after Puntos Clave |
| `Important` | Importante | star | In-text | `important-*` (amber) | Key concepts and definitions |
| `CommonMistake` | Error Frecuente | warning triangle | In-text | `mistake-*` (brick red) | Next to the idea it corrects |
| `Classroom` | En el Aula | school | In-text | `example-*` (magenta) | After the concept it applies |
| `ThinkFurther` | Para Seguir Pensando | question bubble | Closing | `thinking-*` (plum) | First in the closing sequence |
| `SelfCheck` | Autoevaluación | checklist | Closing | `selfcheck-*` (blue) | After Para Seguir Pensando |
| `Activities` | Actividades | pencil | Closing | `activities-*` (green) | After Autoevaluación |
| `ReferencesBox` | Referencias | open book | Closing | `references-*` (slate) | Closes the unit |

### Density rules

Signals help when they are selective. If many paragraphs sit inside boxes, nothing stands out and the argument breaks into fragments.

- Use at most one in-text box (`Important`, `CommonMistake` or `Classroom`) per 800 to 1,000 words of prose.
- Never place two boxes in a row, except in the fixed opening and closing sequences.
- Keep `KeyPoints` to 3–5 items of one line each.
- Never nest boxes. Never put a table or figure inside a box.

### What goes in each box

- **`CommonMistake`** follows the structure of a refutation text: state the belief (“Creencia frecuente”), refute it with a citation (“Lo que muestra la evidencia”), then explain why it doesn't hold or why it is attractive (“Por qué no se sostiene”).
- **`Classroom`** is a worked example. It gives a concrete situation, the didactic decision taken and its rationale with a citation, tagged Ciencias Sociales, Ciencias de la Salud or Didáctica general.
- **Antes de leer.** `KeyPoints` opens with 1–3 questions that ask for a prediction before reading. `ThinkFurther` brings them back (`revisit`) under “Vuelva a las preguntas del comienzo”, so readers compare their first answer with what they think now.
- **`ThinkFurther`** holds open questions with no single answer, and is never assessed. **`Activities`** holds assessable tasks tied to the objectives.
- **`SelfCheck`** asks for recall, not opinion. On screen each answer opens on demand; in print the answers are collected in a key at the end of the box.

## Constructive alignment

Objectives, activities and assessment must aim at the same performances. The system makes this visible:

- Objectives are numbered O1, O2… in order, or you can pass an `id`.
- Each activity names the objectives it practises (`objectives: ['O2']`) and the Bloom level it demands (`level`).
- `AlignmentTable` lists, for each objective, its level, its activities and its status. It flags an objective without an activity, and an activity pitched below its objective's level.
- `checkAlignment(objectives, activities)` returns the same problems as data, for authoring checks.

Pass the same two arrays to `Objectives`, `Activities` and `AlignmentTable`.

## Figures, tables and glossary terms

- **Numbering.** Wrap each unit in `Numbering` with the figure and table ids in order of first mention. `Figure` and `DataTable` with an `id` take their number from it, and `FigRef` prints “Figura N”, “Tabla N” or “(véase la Figura N)”. Reordering a unit means reordering one list.
- **Mention before showing.** Announce every figure and table in the text before it appears, and place it right after that first mention.
- **Glossary links.** Mark the first use of a glossary term in each unit with `Term`. It reads as normal text with a dotted azure underline and links to the entry. Build the glossary with `Glossary`, which sorts the entries alphabetically with Spanish collation.

## Authoring tools

- **Word template** (`templates/Didactica-Universitaria.dotx` in the repository). Authors write in Word with the same system. It contains:
  - styles mirroring the tokens: headings, “Entradilla”, APA table and figure lines, “Nota”, “Cita en bloque”, “Referencia (sangría francesa)” and box text;
  - a guide page and a catalogue of the nine boxes, drawn as copyable tables in their family shapes;
  - a model unit to start from.
- **Content checker** (`npm run lint:content -- <files>`). It checks React units, rendered HTML and Word manuscripts written with the template. Errors fail the check; warnings don't.
  - **Errors:** angle or straight quotes; “and” or “&” in a narrative citation; “y” inside a parenthetical citation; three or more authors without “et al.”; an objective verb from the wrong Bloom level; boxes out of order; alignment problems; cross-references with no target; a work cited but missing from “Referencias”.
  - **Warnings:** citations without a page; references never cited; box density above one per 800 words; two in-text boxes in a row; Puntos Clave outside 3–5 items; no “Antes de leer” questions, or questions never revisited; figures or tables not mentioned before they appear; diagram labels too long for their shape; glossary links whose entry is in another file.

## Content fundamentals

- **Language.** Spanish, formal academic register. Exposition uses the impersonal third person.
- **Address the reader as *usted*** in objectives, activities and instructions: “Analice…”, “Diseñe…”, “¿Qué supuestos…?”.
- **Quotation marks are English double quotes** “…”. Nested quotes take single quotes ‘…’. Never use Spanish angle quotes («…») or straight quotes ("…") in content. Em dashes set off asides —like this—.
- **Headings.** Units read “Unidad N” with a separate title. Sections are “N.N. Título” in sentence case.
- **Figures** are announced in the text before they appear (“como resume la Figura 1”) and placed right after that mention.
- **No emoji, no exclamation marks, no marketing tone.**

## Citations: APA 7

Every citation names the author(s), the year and the page. Where an example shows “p. xx”, the page has not been checked against the source; the format is what matters.

| Case | Parenthetical | Narrative (in the sentence) |
|---|---|---|
| One author | (Vygotsky, 1978, p. 86) | Vygotsky (1978, p. 86) |
| Two authors | (Biggs **&** Tang, 2011, p. xx) | Biggs **y** Tang (2011, p. xx) |
| Three or more | (Ambrose et al., 2010, p. xx) | Ambrose et al. (2010, p. xx) |
| Page range | (Sweller, 1988, pp. 257–285) | Sweller (1988, pp. 257–285) |
| No pages | (Autor, 2020, párr. 4) | Autor (2020, párr. 4) |
| Several works | (Ausubel, 1968, p. vi; Vygotsky, 1978, p. 86) | Order them alphabetically and separate them with “;” |

- **"&" inside parentheses, "y" in running text.** `Cite` applies this rule for you: `<Cite authors={['Biggs','Tang']} year={2011} page="xx" />`, and add `narrative` for the in-text form.
- **Short quotations** (under 40 words) go in “…” followed by the citation. Use `Quote`.
- **Block quotations** (40 words or more) have no quotation marks and are indented by `indent-hang`. The citation goes after the final period. Use `BlockQuote`.
- **References** use a French (hanging) indent of `indent-hang` and are sorted alphabetically. Book and journal titles are italic, and page ranges take an en dash.
- **Declare works once.** Wrap each unit in `Bibliography` with its works as data: book, article, chapter or web, with authors, year and title in sentence case. Cite them by id (`<Cite id="biggs2011" page="xx" />`) and close the unit with `<ReferencesBox auto />`. The list then holds exactly the works cited, formatted in APA 7, ordered by author and year, with a/b suffixes for the same authors in the same year. Hand-written `Reference` entries still work; the content checker compares them with the citations.
- **Tables and figures** put “Tabla N” / “Figura N” in bold, then the title in italic on the next line, both above the table or figure. The note goes below as “*Nota.* …”.

## Learning objectives: Bloom's revised taxonomy

Every `Objectives` box uses Anderson and Krathwohl's revised taxonomy (2001). Tag each objective with its level, and start it with a verb from that level. Tag each activity with the level it demands.

| Level | Name | Verbs |
|---|---|---|
| 1 | Recordar | definir, enumerar, identificar, nombrar, reconocer, recuperar |
| 2 | Comprender | explicar, describir, clasificar, resumir, ejemplificar, interpretar |
| 3 | Aplicar | aplicar, utilizar, resolver, implementar, ejecutar, demostrar |
| 4 | Analizar | analizar, comparar, distinguir, organizar, diferenciar, relacionar |
| 5 | Evaluar | evaluar, juzgar, fundamentar, valorar, argumentar, criticar |
| 6 | Crear | diseñar, elaborar, planificar, producir, construir, formular |

Order objectives from the lowest level to the highest, and include at least one at level 4 or above.

## Visual foundations

**Colour.**
- `navy` sets unit titles and glossary terms.
- `azure` sets section headings (h2) and kickers. Sub-sections (h3) are in `ink`, so the two heading levels differ by more than size.
- `ink` sets body copy on `paper`, and `ink-muted` sets notes and secondary text.
- `surface` is the screen backdrop behind the page sheet.
- `rule` is for decorative hairlines. `rule-strong` is for lines that carry meaning: diagram connectors, the table header rule and the table's top and bottom rules.
- `link` sets links and DOIs, always underlined. `focus` draws a 2px focus ring.
- Each box owns an `*-accent` / `*-surface` / `*-border` triple. Closing-family surfaces equal `paper`.
- Diagrams use `diagram-node`, `diagram-node-border` and `diagram-node-strong`. Ordered levels use the `ramp-1`…`ramp-4` sequence.

**Themes.** `light` is the default. `dark` re-tints every role for screens. Every text pair passes 4.5:1 in both themes.

**Type.** There are two families. `serif` (Cambria, or the metric-matched Caladea) sets reading text: `body`, `lead`, `box-body`, `list-item`, `blockquote`, `glossary`, `reference`, `table-cell`, `table-title` and `note`. `sans` (Calibri, or the metric-matched Carlito) sets structure and labels: `h1`–`h3`, `chapter-kicker`, `box-title`, `tag`, `table-number`, `table-head`, `diagram-*` and `running`.

The scale has seven steps, about 1.2 apart: 12, 14, 16, 19, 23, 28 and 40px. Body text is 16px with 1.6 leading. Caladea and Carlito ship as woff2 files under `fonts/` (SIL Open Font License), so the layout holds where Cambria and Calibri are not installed.

**Measure.** Running text (paragraphs, lists, headings) is at most `measure-text` wide: 496px, about 66 characters. Boxes, tables and figures use the full `measure` (680px), so they read as wide elements beside the text column.

**Spacing.** The scale runs from `space-1` (4px) to `space-8` (48px). Boxes, tables and figures take `space-5` above and below.

**Shape.** Tables and rules are square (`radius-none`), as in the print source. Boxes take `radius-box` and diagram nodes take `radius-node`. Tags are pills. The page sheet carries `shadow-page` on screen only.

**Tables.** The whole header row is navy text on `table-head-surface` over a 2px `rule-strong` line. Body rows alternate one colour per row: odd rows on `paper`, even rows on `band`. Row headers (`rowHeader`, conceptual tables) take their row's colour and are set apart by bold navy sans text, never by a third fill, so the header row, the first column and the stripes never mix. `table-head-surface` sits 1.4:1 from `band`, so the header still reads as a header next to a striped row. The Word template uses the same three fills. Use the `filled` variant (a solid navy bar) only for slides or posters.

**Diagrams.** Use them to show structure, not to decorate. Pick the type by what the information is:

| The information is… | Use |
|---|---|
| A classification or hierarchy | `TreeDiagram` (top-down up to 4 leaves, left to right beyond) |
| Concepts joined by named relations | `ConceptMap` (several levels) or `ConceptWeb` (one centre) |
| Ideas around one topic, unranked | `MindMap` |
| What two or three things share | `VennDiagram` |
| Two dimensions crossed | `QuadrantMatrix` |
| Dated events | `Timeline` |
| Causes of a problem, by category | `Fishbone` |
| Options that differ by degree | `Spectrum` |
| Stages that narrow, general to specific | `Funnel` |
| Levels that build on each other | `Staircase` (a climb) or `Pyramid` (a base and an apex) |
| Contexts that contain one another | `NestedCircles` |
| The visible and what sustains it | `Iceberg` |
| A loop | `CycleDiagram` |
| Ordered steps | `ProcessFlow` |
| Comparisons by criteria | `DataTable` with `rowHeader` |

Every SVG diagram draws in the same vocabulary: `diagram-node` boxes with `diagram-node-border`, one `diagram-node-strong` focus, `rule-strong` connectors, `ramp-1`…`ramp-4` for ordered levels, and light translucent accents (Venn) or `water`/`ice` (Iceberg) where regions overlap text, so ink labels keep 4.5:1. The drawing always shows. Below 600px of available width it keeps a 600px width inside a frame that scrolls sideways, under a “Deslizá para ver el diagrama completo →” hint, so labels never shrink under 12px. “Ver como texto” under every drawing opens the same structure as a list, for phones and screen readers. Print shows the drawing without the text version. Every diagram goes inside a `Figure` with its number, title and source note. Labels are short noun phrases, and the meaning never depends on colour alone.

**Print.** Body text is justified, and each unit starts on a new page. Boxes and figures never split. Box frames print 1.5px in the accent, with the header band kept. Self-check answers print as a key, and shadows drop.

## Iconography

Box icons come from Lucide (v0.460.0, ISC licence), copied from the official package. They are 24px line icons with a 2px stroke, drawn in `currentColor` so they take the box accent (or `paper` on an opening-family band). The `Icons` asset group holds single-ink SVG copies, each in its box's light-theme accent, for use in `<img>`. Use icons only in box headers and the legend. Never use emoji or icon fonts. List bullets are ● ○ ■ by level, in `azure`.

## Audit

### v3 (from the 8 October 2026 audit)

| Area | v2 | v3 | Why |
|---|---|---|---|
| Measure | Text at 680px, measured 82 characters per line | Text at `measure-text` 496px, measured 67 characters; wide elements stay at 680px | 45–75 characters is the comfortable range, with 66 as the ideal. |
| Box identity | Seven colours of equal weight; all surfaces at L* 94–96 (identical in grayscale); Error Frecuente and Actividades identical under deuteranopia | Three families with different shapes; closing boxes untinted; print frames in the accent | The box type survives photocopies and colour-vision deficiency. |
| Type scale | 11 sizes, three within 2px (14/15/16); H2 and H3 both azure | Seven steps (12–40); H3 in `ink` | Fewer, clearer steps; the heading levels differ by colour as well as size. |
| Tables | Solid navy header bar | Navy text on `band` over a 2px rule; `filled` is opt-in | The header no longer outweighs the text and boxes. |
| Fonts | Depended on installed fonts or a Google import | Caladea and Carlito bundled as woff2 | Line counts and page breaks hold everywhere. |
| Boxes per unit | No limit | Density rules | Signals stay selective. |
| Alignment | Objectives and activities unlinked | Numbered objectives, tagged activities, `AlignmentTable` | Constructive alignment is visible and checkable. |
| Misconceptions | Belief and correction | Belief, cited correction and explanation | The refutation-text structure. |
| Practice | Open tasks only | `SelfCheck` with answers and a review item | Retrieval practice with feedback. |
| Application | None | `Classroom` (“En el Aula”) worked cases | Worked examples for novices. |

### v3.4 (diagrams on narrow screens)

| Area | Before | Now |
|---|---|---|
| Diagrams below 600px | Replaced by a bulleted list, so phones, narrow columns and the cards on this page showed text instead of a picture | The drawing stays at 600px in a frame that scrolls sideways, with a “Deslizá para ver el diagrama completo →” hint; labels stay at 12px or larger |
| Text version | Shown only below 600px | Under every drawing at every width, collapsed behind “Ver como texto”; sans face throughout; left out of print |
| Print on A4 / Letter | Screen sheets ran into one another across paper pages; “Página N” footers landed mid-page | Any portrait paper with 2.54cm margins; each sheet starts a new page; pages numbered in the margin, cover excepted; diagrams at full text width |
| Cover | Centred text in the top half of the page | One A4 page; `mosaic` variant by default (the nine box colours as plain squares), plus `band`, `motif` and `editorial`; full page in print, optional `bleed`; `credits`; “[…]” placeholders in a dashed frame; the Word cover matches |
| Word template page | Letter; boxes and tables 6.5in, wider than an A4 text block | A4 portrait; boxes and tables 6.27in, inside the margins on A4 and Letter |

### v3.3 (tables and diagrams)

| Area | Before | Now |
|---|---|---|
| Table header | Header row on `band`; row headers also on `band`, so they merged with the even stripes | Header row on its own `table-head-surface` (navy 7.8:1 light, 7.5:1 dark); one colour per body row; row headers bold navy on their row's colour; Word template matches |
| Diagram types | 5 (`ConceptWeb`, `CycleDiagram`, `Pyramid`, `ProcessFlow`, conceptual table) | 17: adds `TreeDiagram`, `ConceptMap`, `MindMap`, `VennDiagram`, `QuadrantMatrix`, `Timeline`, `Fishbone`, `Spectrum`, `Funnel`, `Staircase`, `NestedCircles`, `Iceberg`, all with the list fallback |

### v3.2 (remaining audit items)

| Area | Before | Now |
|---|---|---|
| Diagrams on phones | Scrolled sideways; labels shrank to about 11.5px | Below 600px they switch to the same structure as a list; labels stay at 12px or larger; the checker flags labels too long for their shape |
| Antes de leer | Optional and never revisited | Expected in every unit and brought back in “Para Seguir Pensando”; the checker warns when either is missing |
| Reference list | Typed by hand | `Bibliography` + `Cite id` + `ReferencesBox auto` generate it from the citations; the checker cross-checks hand-written lists, Word included |

### v3.1 (audit phase 3)

| Area | Before | Now |
|---|---|---|
| Rule enforcement | Rules lived only in this guide | `lint:content` checks quotes, citations, Bloom verbs, box order and density, figure mentions and alignment in React, HTML and Word files |
| Word authoring | No template | `.dotx` with styles mirroring the tokens, the nine boxes and a model unit |
| Figure numbers | Typed by hand | `Numbering` and `FigRef`: numbers follow order of first mention, references can't drift |
| Glossary | Static list | `Term` links the first use to `Glossary`, which sorts entries itself |

### v2 (from the print source)

| Area | Source (v1) | v2 | Why |
|---|---|---|---|
| Body text | 15.3px, leading 1.3, justified | 16px, leading 1.6, left-aligned on screen and justified in print | WCAG 1.4.12 asks for leading of at least 1.5. Justified text leaves rivers on narrow screens. |
| Small text | Tables 12.7px, captions 12px | Tables 14px, notes 14px | Below 14px, Cambria is hard to read on screen. |
| Running head | `#8090A8`, 3.2:1 | `running` `#5C6A82`, 5.6:1 | It failed the 4.5:1 minimum for text. |
| Ink | Pure black `#000` | `ink` `#1B1F27` | Less glare against white, still above 16:1. |
| Quotes | «…» (angle quotes) | “…” | House rule. |
