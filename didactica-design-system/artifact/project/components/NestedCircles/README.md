# NestedCircles

Nested circles: contexts or categories that contain one another, with a legend. Below 600px of width it shows the same structure as a list.

**Consumer provides:** 2–5 `layers` `{ title, text? }`, innermost first.

Use it for contexts that contain one another (classroom, course, programme, institution, system). Titles sit in their ring; descriptions go in a legend at the right, outermost first. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `layers` | `{ title; text? }[]` | yes | Layers, innermost first (2–5). |
| `label` | `string` | no | Accessible description. |
