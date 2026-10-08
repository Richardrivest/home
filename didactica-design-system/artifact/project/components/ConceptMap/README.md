# ConceptMap

Concept map (Novak): concepts in levels joined by labelled arrows, so each link reads as a proposition. Below 600px of width it shows the same structure as a list.

**Consumer provides:** `nodes` `{ id, label, detail?, level }` (level 0 is the most general) and `links` `{ from, to, label }`.

Use it when the relations matter as much as the concepts: each arrow carries linking words, so “concept → linking words → concept” reads as a proposition, as in Novak's concept maps. Keep 2–4 concepts per level. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `nodes` | `{ id; label; detail?; level }[]` | yes | Concepts; level 0 is the most general, at the top. |
| `links` | `{ from; to; label }[]` | yes | Arrows with the linking words. |
| `label` | `string` | no | Accessible description. |
