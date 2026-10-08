# DataTable

APA 7 table: “Tabla N” and italic title above, horizontal rules, light header (or `filled`), optional row headers, “Nota.” below.

**Consumer provides:** `columns`, `rows`, and optionally `number`, `title`, `note`, `widths` and `rowHeader`.

The layout follows APA 7: “Tabla N” in bold, the title in italic, then the table, then “*Nota.* …”. The header is navy text on `band` over a 2px rule; pass `filled` for a solid navy bar on slides or posters. Use `rowHeader` for conceptual tables that compare concepts across dimensions. Keep cells to short phrases and don't colour individual cells.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `columns` | `string[]` | yes | Header labels. |
| `rows` | `ReactNode[][]` | yes | Body rows. |
| `widths` | `string[]` | no | Column widths. |
| `number` | `number` | no | Table number. |
| `id` | `string` | no | Registry id inside <Numbering> (automatic number, cross-reference target). |
| `title` | `string` | no | Italic title. |
| `note` | `ReactNode` | no | Note text after “Nota.”. |
| `rowHeader` | `boolean` | no | First column as row headers (conceptual tables). |
| `filled` | `boolean` | no | Solid navy header bar (slides, posters). |
