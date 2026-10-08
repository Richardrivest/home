# Didáctica Universitaria — design system (v3)

A design system for university teacher-education materials. It started as an extraction of the *Manual de Didáctica Universitaria* (.docx) and was then revised by a typography, colour and contrast audit. It ships tokens, React components, Tailwind, plain HTML/CSS, a SQLite database and a Node.js API.

The design-system page has the brand book, the tokens, live previews and the icons: https://claude.ai/artifact/WUriWVLzv8G4y2u9oMyFhX

## Authoring tools (v3.1, audit phase 3)

- **Word template:** `templates/Didactica-Universitaria.dotx`, with a preview copy in `templates/Didactica-Universitaria-muestra.docx`. It contains:
  - styles that mirror the tokens: headings, “Entradilla”, APA table and figure lines, notes, block quote, reference with hanging indent, box text;
  - a guide page with the Bloom verb table;
  - a catalogue of the nine boxes as copyable tables in their family shapes;
  - a model unit.

  Rebuild it with `npm run build:word`.
- **Content checker:** `npm run lint:content -- <unidad.jsx | pagina.html | manuscrito.docx | texto.md> [--json]`. It exits with code 1 on errors.
  - **Errors:** angle or straight quotes; “and” or “&” in a narrative citation; “y” inside a parenthetical citation; three or more authors without “et al.”; an objective verb from the wrong Bloom level; boxes out of order; alignment problems; cross-references with no target.
  - **Warnings:** citations without a page; box density; adjacent in-text boxes; Puntos Clave outside 3–5 items; figures or tables not mentioned before they appear; glossary links to another file.
- **Figure and table numbering:** `Numbering` + `FigRef`. Figures and tables are numbered by id in order of first mention, and references print “Figura N” or “(véase la Figura N)”.
- **Glossary links:** `Term` links the first use of a term to its entry in `Glossary`, which sorts the entries with Spanish collation.
- **Tests:** `npm test` (node:test) covers the citation formatter, the alignment check, every checker rule, and checks that the Word template has no errors.

The example unit deliberately shows every box type in a short text, so the checker gives it a density warning. That warning is the rule working as intended.

## What's in v3

These are phases 1 and 2 of the 8 October 2026 audit (https://claude.ai/artifact/FAkByz1msBDLkPL4QsdFn3).

- **Line length.** Running text is capped at `measure-text` (496px). The measured result is 67 characters per line, down from 82. Boxes, tables and figures keep the full 680px.
- **Box families.** The boxes come in three families with different shapes, so they stay distinct in grayscale print and for colour-blind readers:
  - opening boxes have a filled header band;
  - in-text boxes have a heavy top rule;
  - closing boxes have an untinted frame.

  Print frames use the accent colour.
- **Type scale.** Seven steps (12, 14, 16, 19, 23, 28, 40px), and H3 is now in `ink`.
- **Tables.** A lighter APA header (navy text on `band` over a 2px rule). The solid bar is now the opt-in `filled` variant.
- **Fonts.** Caladea and Carlito are bundled as woff2 files (SIL Open Font License) with `@font-face` in `tokens.css`.
- **Density rules** for boxes are in the style guide.
- **Constructive alignment.** Objectives are numbered O1, O2… Activities carry their Bloom level and the objectives they practise. `AlignmentTable` and `checkAlignment()` flag gaps and level mismatches.
- **New boxes:**
  - `Classroom` (“En el Aula”): worked classroom cases with a discipline tag.
  - `SelfCheck` (“Autoevaluación”): recall questions whose answers open on screen and print as a key, with a review item from an earlier unit.
- **Error Frecuente** gains a third part, “Por qué no se sostiene”, completing the refutation-text structure.
- **`BoxLegend`** renders a “Cómo usar este manual” legend.
- **Antes de leer.** `KeyPoints` accepts optional questions to ask before reading.

## What came in v2

- **Seven didactic boxes, each with an icon and its own colour pair.** Every unit follows the same order:
  - **Puntos Clave** (key icon) opens the unit.
  - **Objetivos** (target icon) comes next.
  - **Importante** (star) and **Error Frecuente** (warning triangle) appear in the text where needed.
  - **Para Seguir Pensando** (question bubble), **Actividades** (pencil) and **Referencias** (open book) close the unit.
- **APA 7 citations with pages.** `Cite` produces "(Biggs & Tang, 2011, p. xx)" in parentheses and "Biggs y Tang (2011, p. xx)" in running text. It also handles "et al.", page ranges ("pp."), several works in one parenthesis, `Quote` (under 40 words, in “…”) and `BlockQuote` (40 words or more).
- **APA 7 tables and figures.** "Tabla N" / "Figura N" goes in bold with an italic title above, and "*Nota.*" below. Tables use horizontal rules only.
- **Diagrams:** `ConceptWeb` (concept webs), `CycleDiagram`, `Pyramid` and `ProcessFlow`, plus conceptual tables via `DataTable rowHeader`.
- **Objectives on Bloom's revised taxonomy** (Anderson & Krathwohl, 2001). Each objective is tagged "4 · ANALIZAR" and so on.
- **English quotation marks “…”** throughout.
- **The audit:**
  - body text goes to 16px with 1.6 leading;
  - headings go to a 30/22/18 scale;
  - the running header now passes contrast;
  - every text pair passes 4.5:1 in both the light and dark themes.

  The README in `artifact/project/` has the full before-and-after table.
- **Nice-to-haves:**
  - a `ChapterOpener` for each unit;
  - a print stylesheet that justifies text, starts each unit on a new page and keeps boxes and figures whole;
  - focus rings on links;
  - sideways scrolling for diagrams on phones;
  - a static HTML demo generated from the same React code;
  - `/api/boxes`, `/api/icons/:kind.svg` and `/api/bloom` endpoints.

## Layout

```
tokens/tokens.json          single source of truth
tailwind/preset.cjs         Tailwind preset (colours/spacing/radii/strokes → CSS variables; text-type-* sizes)
src/components/             React components (27)
src/boxes.config.json       the nine box types: family, title, icon, component, placement
src/alignment.js            constructive-alignment check (objectives × activities)
fonts/                      Caladea and Carlito woff2 (SIL OFL 1.1) + licences
src/cite.js, src/bloom.js   APA 7 formatter, Bloom taxonomy
src/styles/didactica.css    component CSS written with Tailwind @apply → dist/didactica.css
src/examples/chapter.jsx    a full example unit (Unidad 2)
icons/                      Lucide icons (ISC), single-ink copies in each box's accent; png/ for Word
lint/                       content-checker rules (text, HTML, DOCX)
templates/                  Word template (.dotx) and a preview copy (.docx)
tests/                      node:test suites
scripts/build-word-template.mjs, scripts/lint-content.mjs
db/schema.sql, db/seed.sql  SQLite: tokens, type, components + props, box types + icons, Bloom levels
server/index.mjs            read-only JSON API + demos (node:sqlite, no runtime dependencies)
html/index.html             plain HTML/CSS demo (generated, no JavaScript)
html/react.html             React demo (UMD React + dist/didactica.iife.js)
artifact/project/           files of the design-system page
```

## Use

You need Node ≥ 22.5.

```bash
npm install
npm run build      # tokens.css, icons, didactica.css, JS bundles, SQLite db, html/index.html
npm run serve      # http://localhost:4173
```

| Route | Returns |
|---|---|
| `GET /api/tokens` | Every token family |
| `GET /api/colors?theme=dark` | Colours for one theme |
| `GET /api/type` | Families and type styles |
| `GET /api/dimensions?family=spacing` | Spacing, radius, stroke or shadow |
| `GET /api/components[/Name]` | Components with their props |
| `GET /api/boxes[/kind]` | The box types with their family |
| `GET /api/icons/:kind.svg` | A box icon |
| `GET /api/bloom` | Bloom levels with their verbs |

```jsx
import '@didactica/design-system/dist/tokens.css';
import '@didactica/design-system/dist/didactica.css';
import { KeyPoints, Objectives, Important, Cite } from '@didactica/design-system';

<Important term="Zona de desarrollo próximo">
  <p>Franja entre el desarrollo real y el potencial <Cite authors={['Vygotsky']} year={1978} page={86} />.</p>
</Important>
```

**Tailwind:** use `presets: [require('@didactica/design-system/tailwind/preset.cjs')]` and load `dist/tokens.css`.

**Plain HTML:** load the two stylesheets and copy the markup from `html/index.html`.

**Dark theme:** set `data-theme="dark"`, or let `prefers-color-scheme` decide.

**Page numbers:** in the examples, "p. xx" marks a page that hasn't been checked against the book. Only Vygotsky (1978, p. 86), Ausubel's epigraph (1968, p. vi), Sweller's article range and Miller (1990, p. S63) are real pages.

To update the design-system page, run `npm run build && npm run export:artifact`, then republish `artifact/project/`.
