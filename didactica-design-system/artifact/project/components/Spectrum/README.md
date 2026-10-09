# Spectrum

Continuum between two poles, with items placed by position (0 = left pole, 1 = right pole). Below 600px of width it keeps its size and scrolls sideways; “Ver como texto” shows the same structure as a list.

**Consumer provides:** the `left` and `right` poles and `points` `{ label, position, text? }`, with position from 0 (left pole) to 1 (right pole).

Use it when options differ by degree, not kind (teacher- to student-centred, guided to autonomous). The bar runs the diagram ramp from light to dark. Below 600px of available width it keeps its full size and scrolls sideways, so labels never shrink under 12px; “Ver como texto” under it opens the same structure as a list.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `left` | `string` | yes | Left pole. |
| `right` | `string` | yes | Right pole. |
| `points` | `{ label; position; text? }[]` | yes | Items on the continuum. |
| `label` | `string` | no | Accessible description. |
