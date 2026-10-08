# Heading

Headings: 1 for unnumbered unit-level sections (Glosario, Referencias), 2 sections, 3 sub-sections.

Level 2 is for numbered sections (“2.1. …”) and level 3 for sub-sections. Level 1 is only for unnumbered unit-level sections such as Glosario or Galería; the unit title itself comes from `ChapterOpener`.

Use sentence case and never skip a level.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `level` | `1 | 2 | 3` | no | Defaults to 2. |
| `id` | `string` | no | Anchor id. |
| `children` | `ReactNode` | yes | Heading text, numbered “2.1. …”. |
