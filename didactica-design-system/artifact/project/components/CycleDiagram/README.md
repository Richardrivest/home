# CycleDiagram

Cycle: 3–8 steps around a circle joined by arrows, with an optional centre label.

**Consumer provides:** 3–8 `steps` `{ title, text? }`, clockwise from the top, and an optional `center` label.

Use it for processes that loop, such as self-regulation, reflective practice or action research.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `steps` | `{ title; text? }[]` | yes | Steps clockwise from the top. |
| `center` | `string` | no | Centre label. |
| `label` | `string` | no | Accessible description. |
