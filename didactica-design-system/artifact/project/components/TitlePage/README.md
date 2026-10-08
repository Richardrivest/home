# TitlePage

The manual's cover: kicker, title, italic subtitle, lede, ribbon and metadata lines, all centred.

**Consumer provides:** `title`, plus the optional `kicker`, `subtitle`, `lede`, `ribbon` and `meta` lines.

Keep it typographic, with no logo or images and one ribbon. Write metadata lines as “Clave: valor”.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `kicker` | `string` | no | Series line, upper case. |
| `title` | `string` | yes | Book title. |
| `subtitle` | `string` | no | Italic subtitle. |
| `lede` | `string` | no | Scope line. |
| `ribbon` | `string` | no | Text between the two navy rules. |
| `meta` | `string[]` | no | Metadata lines. |
