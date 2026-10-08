# Iceberg

Iceberg: what is visible above the waterline and what lies beneath it (explicit and hidden curriculum). Below 600px of width it shows the same structure as a list.

**Consumer provides:** `visible` and `hidden` item lists, with optional `visibleTitle` and `hiddenTitle`.

Use it to show what sustains the visible, such as the explicit and the hidden curriculum. Put more items below the line than above. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `visible` | `string[]` | yes | Items above the waterline. |
| `hidden` | `string[]` | yes | Items below the waterline. |
| `visibleTitle` | `string` | no | Default “Lo visible”. |
| `hiddenTitle` | `string` | no | Default “Lo que no se ve”. |
| `label` | `string` | no | Accessible description. |
