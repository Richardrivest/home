# CycleDiagram

Cycle: 3–8 steps around a circle joined by arrows, with an optional centre label. Below 600px of width it shows the same structure as a list.

**Consumer provides:** 3–8 `steps` `{ title, text? }`, clockwise from the top, and an optional `center` label.

Use it for processes that loop, such as self-regulation, reflective practice or action research. Below 600px of available width it becomes a numbered list ending “↻ Después del paso N, el ciclo vuelve al paso 1”.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `steps` | `{ title; text? }[]` | yes | Steps clockwise from the top. |
| `center` | `string` | no | Centre label. |
| `label` | `string` | no | Accessible description. |
