# SelfCheck

“Autoevaluación”: retrieval practice with feedback; answers open on screen and print as a key.

**Consumer provides:** 3–5 `items` `{ question, answer, review? }`. `review` names an earlier unit (“Unidad 1”) for spaced review.

It is retrieval practice with feedback, placed after `ThinkFurther` in the closing sequence. On screen each answer opens on demand (“Ver respuesta”); in print the answers disappear and a key is printed at the end of the box. Ask for recall of the unit's key ideas, not for opinions. Include one review item from an earlier unit.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `items` | `{ question; answer; review?: string }[]` | yes | 3–5 short recall questions; review names an earlier unit. |
| `title` | `string` | no | Overrides “Autoevaluación”. |
