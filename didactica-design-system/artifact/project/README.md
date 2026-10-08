Didáctica Universitaria is the visual language of the *Manual de Didáctica Universitaria*. It is built for university teacher-education materials that people read on screen and in print. Reading text is serif and structure is sans-serif. The two brand inks are navy and azure. Seven colour-coded boxes, each with an icon, mark the didactic moves of every unit, and APA 7 governs every citation, table and figure.

## Anatomy of a unit

Every unit follows the same sequence. Never reorder it.

1. `ChapterOpener`: the “Unidad N” kicker, the title and a lead paragraph.
2. `KeyPoints` (“Puntos Clave”): 3–6 one-sentence key points.
3. `Objectives` (“Objetivos”): 3–5 objectives tagged with their Bloom level.
4. The body: numbered sections (`Heading` 2 and 3), `Paragraph` with `Cite`, and as needed `Important`, `CommonMistake`, `DataTable` and `Figure` with diagrams.
5. `ThinkFurther` (“Para Seguir Pensando”): 2–5 open questions.
6. `Activities` (“Actividades”): numbered questions and tasks, each tagged.
7. `ReferencesBox` (“Referencias”): the unit's APA 7 reference list.

## The seven boxes

Each box has a tinted surface, a frame and a header row with its icon and upper-case title in the box's `*-accent` colour. The title word and the icon carry the meaning, never colour alone.

| Box | Title | Icon | Tokens | Where |
|---|---|---|---|---|
| `KeyPoints` | Puntos Clave | key (`key-round`) | `keypoints-*` (navy) | Start of each unit |
| `Objectives` | Objetivos | target (`target`) | `objectives-*` (teal) | Right after Puntos Clave |
| `Important` | Importante | star (`star`) | `important-*` (amber) | In the text: key concepts and definitions |
| `CommonMistake` | Error Frecuente | warning triangle (`triangle-alert`) | `mistake-*` (brick red) | In the text: next to the idea it corrects |
| `ThinkFurther` | Para Seguir Pensando | question bubble (`message-circle-question`) | `thinking-*` (plum) | End of each unit |
| `Activities` | Actividades | pencil (`pencil-line`) | `activities-*` (green) | Right after Para Seguir Pensando |
| `ReferencesBox` | Referencias | open book (`book-open-text`) | `references-*` (slate) | Closes the unit |

Use at most one `Important` and one `CommonMistake` per section, so they keep their weight. Never nest boxes. Never put a table or figure inside a box.

## Content fundamentals

- **Language.** Spanish, formal academic register. Exposition uses the impersonal third person.
- **Address the reader as *usted*** in objectives, activities and instructions: “Analice…”, “Diseñe…”, “¿Qué supuestos…?”.
- **Quotation marks are English double quotes** “…”. Nested quotes take single quotes ‘…’. Never use Spanish angle quotes («…») or straight quotes ("…") in content. Em dashes set off asides —like this—.
- **Headings.** Units read “Unidad N” with a separate title. Sections are “N.N. Título” in sentence case.
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
- **References** use a French (hanging) indent of `indent-hang` and are sorted alphabetically. Book and journal titles are italic, and page ranges take an en dash. Use `Reference` inside `ReferencesBox`.
- **Tables and figures** put “Tabla N” / “Figura N” in bold, then the title in italic on the next line, both above the table or figure. The note goes below as “*Nota.* …”.

## Learning objectives: Bloom's revised taxonomy

Every `Objectives` box uses Anderson and Krathwohl's revised taxonomy (2001). Tag each objective with its level, and start it with a verb from that level.

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
- `azure` sets section headings and kickers.
- `ink` sets body copy on `paper`, and `ink-muted` sets notes and secondary text.
- `surface` is the screen backdrop behind the page sheet.
- `rule` is for decorative hairlines. `rule-strong` is for lines that carry meaning: diagram connectors and the top and bottom rules of tables.
- `link` sets links and DOIs, always underlined. `focus` draws a 2px focus ring.
- Each box owns an `*-accent` / `*-surface` / `*-border` triple.
- Diagrams use `diagram-node`, `diagram-node-border` and `diagram-node-strong`. Ordered levels use the `ramp-1`…`ramp-4` sequence.

**Themes.** `light` is the default. `dark` re-tints every role for screens. In dark, accents lighten and surfaces deepen, so every pair still passes contrast.

**Type.** There are two families. `serif` (Cambria, or the metric-matched Caladea) sets reading text: `body`, `lead`, `box-body`, `list-item`, `blockquote`, `glossary`, `reference`, `table-cell`, `table-title` and `note`. `sans` (Calibri, or Carlito) sets structure and labels: `h1`–`h3`, `chapter-kicker`, `box-title`, `tag`, `table-number`, `table-head`, `diagram-*` and `running`. The scale is 30 / 22 / 18 / 16, with body at 16px and 1.6 leading.

**Spacing.** The scale is `space-1` 4px through `space-8` 48px. Boxes, tables and figures take `space-5` above and below. Text width is `measure`, about 72 characters.

**Shape.** Tables and rules are square (`radius-none`), as in the print source. Boxes take `radius-box` and diagram nodes take `radius-node`. Tags are pills. The page sheet carries `shadow-page` on screen only.

**Diagrams.** Use them to show structure, not to decorate. `ConceptWeb` shows a concept and its relations. `CycleDiagram` shows recurring processes. `ProcessFlow` shows ordered steps. `Pyramid` shows hierarchical levels. `DataTable` with `rowHeader` builds conceptual tables. Every diagram goes inside a `Figure` with its number, title and source note. Labels are short noun phrases, and the meaning never depends on colour alone.

**Print.** Body text is justified, each unit starts on a new page, boxes and figures never split, and shadows drop.

## Iconography

Box icons come from Lucide (v0.460.0, ISC licence), copied from the official package. They are 24px line icons with a 2px stroke, drawn in `currentColor` so they take the box accent. The `Icons` asset group holds single-ink SVG copies, each in its box's light-theme accent, for use in `<img>`. Use icons only in box headers. Never use emoji or icon fonts. List bullets are ● ○ ■ by level, in `azure`.

## Audit (v2)

These are the changes from the print source, with the reason for each.

| Area | Source (v1) | Now (v2) | Why |
|---|---|---|---|
| Body text | 15.3px, leading 1.3, justified | 16px, leading 1.6, left-aligned on screen and justified in print | WCAG 1.4.12 asks for leading of at least 1.5. Justified text leaves rivers on narrow screens. |
| Heading scale | H1 20 / H2 16.7 / body 15.3 | H1 30 / H2 22 / H3 18 / body 16 | H2 was barely larger than body, so the hierarchy didn't read. |
| Small text | Tables 12.7px, captions 12px | Tables 14px, notes 14px | Below 14px, Cambria is hard to read on screen. |
| Running head | `#8090A8`, 3.2:1 | `running` `#5C6A82`, 5.6:1 | It failed the 4.5:1 minimum for text. |
| Ink | Pure black `#000` | `ink` `#1B1F27` | Less glare against white, still above 16:1. |
| Box colours | One pale-blue box for everything | Seven accent/surface pairs plus an icon and a title word | Each didactic move is recognisable at a glance and not by colour alone. All pairs pass 4.5:1 in both themes. |
| Tables | Full grid, caption below | APA 7: number and title above, horizontal rules only, note below | APA 7 format and less visual noise. |
| Quotes | «…» (angle quotes) | “…” | House rule. |
| Measure | 624px | 680px, about 72 characters | Within the comfortable reading range. |
