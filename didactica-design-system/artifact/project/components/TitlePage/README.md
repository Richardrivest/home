# TitlePage

The manual's cover, one A4 page: title block at the top, ribbon, credits and details at the foot. Four variants (mosaic by default, band, motif, editorial); “[…]” lines show as placeholders.

**Consumer provides:** `title`, plus the optional `variant`, `bleed`, `volume`, `kicker`, `subtitle`, `lede`, `ribbon`, `credits` and `meta` lines.

One A4 page: the title block sits at the top; the ribbon, credits and details sit at the foot. On screen it keeps the A4 proportion; in print it fills the page and ends it. `variant` picks the design: `mosaic` (default; the nine box colours and icons in their order in a unit), `band` (navy band, title reversed out), `motif` (nested circles from the diagram ramp) or `editorial` (left rule and a large `volume` number). `bleed` runs the colour to the paper edge in print. Write unknown details as “[…]”: they show in a dashed frame until replaced. Keep one ribbon and write metadata lines as “Clave: valor”. The Word template's cover is the `mosaic` variant.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `variant` | `'mosaic' | 'band' | 'motif' | 'editorial'` | no | Cover design. Default 'mosaic': the nine box colours and icons as a strip. |
| `bleed` | `boolean` | no | In print, colour runs to the paper edge. |
| `volume` | `number | string` | no | Volume or unit number, shown large by 'editorial'. |
| `kicker` | `string` | no | Series line, upper case. |
| `title` | `string` | yes | Book title. |
| `subtitle` | `string` | no | Italic subtitle. |
| `lede` | `string` | no | Scope line. |
| `ribbon` | `string` | no | Text between the two navy rules. |
| `credits` | `string[]` | no | Authors and institution; the first line is bold. “[…]” marks a placeholder. |
| `meta` | `string[]` | no | Metadata lines. |
