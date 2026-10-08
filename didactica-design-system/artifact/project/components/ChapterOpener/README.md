# ChapterOpener

Unit opener: “Unidad N” kicker, unit title (h1) and a lead paragraph.

**Consumer provides:** `number`, `title` (without “Unidad N.”) and a one- or two-sentence `lead`.

It opens every unit, and `KeyPoints` follows it directly. In print it starts a new page.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `number` | `number` | no | Unit number. |
| `title` | `string` | yes | Unit title, without “Unidad N.”. |
| `lead` | `ReactNode` | no | Opening paragraph. |
| `id` | `string` | no | Anchor id. |
