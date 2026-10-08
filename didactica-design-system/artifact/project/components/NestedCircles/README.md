# NestedCircles

Nested circles: contexts or categories that contain one another, with a legend. Below 600px of width it keeps its size and scrolls sideways; “Ver como texto” shows the same structure as a list.

**Consumer provides:** 2–5 `layers` `{ title, text? }`, innermost first.

Use it for contexts that contain one another (classroom, course, programme, institution, system). Titles sit in their ring; descriptions go in a legend at the right, outermost first. Below 600px of available width it keeps its full size and scrolls sideways, so labels never shrink under 12px; “Ver como texto” under it opens the same structure as a list.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `layers` | `{ title; text? }[]` | yes | Layers, innermost first (2–5). |
| `label` | `string` | no | Accessible description. |
