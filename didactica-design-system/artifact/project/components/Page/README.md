# Page

A manual page: paper sheet, margins, running header and “Página N” footer.

**Consumer provides:** `header` (the book's short title), `page`, and the content.

Wrap each screen page or print page in it. On screen it is a `paper` sheet with `shadow-page` on the `surface` backdrop. In print the shadow drops and margins come from the printer.

**Don't** put chapter titles in the running header, and don't use `running` for text that readers must read.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `header` | `string` | no | Running-header text. |
| `page` | `number` | no | Footer page number. |
| `children` | `ReactNode` | yes | Page content. |
