# Figure

APA 7 figure: “Figura N” and the italic title above a diagram or image; “Nota.” below.

**Consumer provides:** `number`, `title`, a diagram or image as children, and a `note` naming the source.

Every diagram goes inside a `Figure`. Number figures in order of appearance within the manual.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `number` | `number` | no | Figure number. |
| `title` | `string` | no | Italic title. |
| `note` | `ReactNode` | no | Note text. |
| `children` | `ReactNode` | yes | A diagram or image. |
