# Didáctica Universitaria — design system

The visual language of the *Manual de Didáctica Universitaria* (.docx), extracted into tokens, a database, React components, Tailwind and plain HTML/CSS. Every value comes from the document's Word styles and direct formatting, converted at 96 dpi (1pt = 1.333px, 20 twips = 1pt).

Design-system page (brand book, tokens, live previews): https://claude.ai/artifact/WUriWVLzv8G4y2u9oMyFhX

## What was extracted

| Element | Source | Token / component |
|---|---|---|
| Navy `#1F3864` | Unit headings, cover title, «Concepto clave» labels, table header fill, glossary terms | `navy`, `table-head` |
| Azure `#2E5496` | Section and sub-section headings, cover kicker | `azure` |
| Pale blue `#EFF3FA` + `#9DB3D6` frame | «Concepto clave» boxes | `concept-surface`, `concept-border` → `ConceptBox` |
| `#F2F5FA` zebra, `#B8C4DC` hairline grid | Comparison tables | `band`, `rule` → `DataTable` |
| Greys `#555/#444/#666`, `#8090A8` | Captions, cover, running header and footer | `caption`, `subtitle`, `lede`, `running` |
| Cambria / Calibri | Reading text / structure | `serif` / `sans` families (Caladea and Carlito as open fallbacks) |
| 21 type styles | Cover, H1–H3, body, lists, glossary, references, tables, captions | `tokens.json → type.groups` |
| Twip spacing, 1in margins, 0.5in hanging indent | Paragraph spacing, cell margins, lists, references | `space-*`, `indent-*`, `page-margin`, `measure` |
| Border sizes 4/6/8 (eighths of a pt) | Table grid, concept frame, cover ribbon | `stroke-hair`, `stroke-box`, `stroke-ribbon` |

The source has one theme (print). `dark` is an added screen theme. Three source pairs miss WCAG contrast and are kept exact, each flagged in its token note: `running` at 3.2:1, and the decorative `concept-border` and `rule`.

## Layout

```
tokens/tokens.json          single source of truth (design-system list format)
tailwind/preset.cjs         Tailwind preset: colours/spacing/strokes → CSS variables, text-type-* sizes
src/components/*.jsx        React components (Page, TitlePage, TableOfContents, Heading, Paragraph,
                            ConceptBox, DataTable, BulletList, GlossaryEntry, Reference)
src/styles/didactica.css    component styles written with Tailwind @apply → dist/didactica.css
src/index.d.ts              prop types
db/schema.sql, db/seed.sql  SQLite database of tokens and components
server/index.mjs            Node.js read-only JSON API + static demo (no dependencies; node:sqlite)
html/index.html             plain HTML/CSS demo (no JS)
html/react.html             React demo (UMD React + dist/didactica.iife.js)
artifact/project/           files of the design-system artifact (README brand book, previews, cover)
dist/                       built tokens.css, didactica.css, index.mjs, didactica.iife.js
```

## Use

Requires Node ≥ 22.5 (for `node:sqlite`).

```bash
npm install
npm run build        # tokens.css, didactica.css, JS bundles, db/design-system.sqlite
npm run serve        # http://localhost:4173
```

API:

| Route | Returns |
|---|---|
| `GET /api/tokens` | Every family, in `tokens.json` shape |
| `GET /api/colors?theme=dark` | Colours resolved for one theme |
| `GET /api/type` | Font families and type styles |
| `GET /api/dimensions?family=spacing` | `spacing`, `radius` or `stroke` tokens |
| `GET /api/components` | The component catalogue with props |
| `GET /api/components/ConceptBox` | One component with its props |

**React:**

```jsx
import '@didactica/design-system/dist/tokens.css';
import '@didactica/design-system/dist/didactica.css';
import { ConceptBox } from '@didactica/design-system';

<ConceptBox term="Didáctica">Teoría de la enseñanza que describe… (Camilloni et al., 2007).</ConceptBox>
```

**Tailwind** (in your app): `presets: [require('@didactica/design-system/tailwind/preset.cjs')]`. This gives you `text-navy`, `bg-concept-surface`, `border-hair border-rule`, `mb-9pt`, `text-type-body` and so on. Load `dist/tokens.css` so the variables exist.

**Plain HTML:** load the two stylesheets and use the `du-*` classes together with the type-style classes. See `html/index.html`.

**Dark theme:** set `data-theme="dark"` on `<html>`. Without the attribute, `prefers-color-scheme` decides.

To update the design-system artifact, edit `tokens/tokens.json` or the components, then run `npm run build && npm run export:artifact` and republish `artifact/project/`.
