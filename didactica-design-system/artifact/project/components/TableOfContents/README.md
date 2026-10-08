# TableOfContents

“Índice”: levels 1–3 with dotted leaders to the page number.

**Consumer provides:** `entries` `{ title, page, level? }` in reading order. Entry titles match the headings exactly, numbering included.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `title` | `string` | no | Defaults to “Índice”. |
| `entries` | `{ title; page; level? }[]` | yes | TOC lines in reading order. |
