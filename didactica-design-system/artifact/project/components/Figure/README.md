# Figure

APA 7 figure: “Figura N” and the italic title above a diagram or image; “Nota.” below. Numbered automatically by id inside <Numbering>.

**Consumer provides:** `number`, `title`, a diagram or image as children, and a `note` naming the source.

Every diagram goes inside a `Figure`. Give it an `id` and list the ids in `Numbering`: the number then follows the order of first mention, and `FigRef` points to it. Announce each figure in the text before it appears.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `number` | `number` | no | Figure number. |
| `id` | `string` | no | Registry id inside <Numbering>: the number comes from it and <FigRef> can point to it. |
| `title` | `string` | no | Italic title. |
| `note` | `ReactNode` | no | Note text. |
| `children` | `ReactNode` | yes | A diagram or image. |
