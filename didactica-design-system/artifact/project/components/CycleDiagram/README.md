# CycleDiagram

Cycle: 3–8 steps around a circle joined by arrows, with an optional centre label. Below 600px of width it keeps its size and scrolls sideways; “Ver como texto” shows the same structure as a list.

**Consumer provides:** 3–8 `steps` `{ title, text? }`, clockwise from the top, and an optional `center` label.

Use it for processes that loop, such as self-regulation, reflective practice or action research. Below 600px of available width it keeps its full size and scrolls sideways, so labels never shrink under 12px; “Ver como texto” under it opens the same structure as a numbered list ending “↻ Después del paso N, el ciclo vuelve al paso 1”.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `steps` | `{ title; text? }[]` | yes | Steps clockwise from the top. |
| `center` | `string` | no | Centre label. |
| `label` | `string` | no | Accessible description. |
