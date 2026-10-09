# ConceptMap

Concept map (Novak): concepts in levels joined by labelled arrows, so each link reads as a proposition. Below 600px of width it keeps its size and scrolls sideways; “Ver como texto” shows the same structure as a list.

**Consumer provides:** `nodes` `{ id, label, detail?, level }` (level 0 is the most general) and `links` `{ from, to, label }`.

Use it when the relations matter as much as the concepts: each arrow carries linking words, so “concept → linking words → concept” reads as a proposition, as in Novak's concept maps. Keep 2–4 concepts per level. Below 600px of available width it keeps its full size and scrolls sideways, so labels never shrink under 12px; “Ver como texto” under it opens the same structure as a list.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `nodes` | `{ id; label; detail?; level }[]` | yes | Concepts; level 0 is the most general, at the top. |
| `links` | `{ from; to; label }[]` | yes | Arrows with the linking words. |
| `label` | `string` | no | Accessible description. |
