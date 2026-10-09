# Pyramid

Pyramid of levels, top (most advanced) first, e.g. Miller's pyramid; descriptions to the right. Below 600px of width it keeps its size and scrolls sideways; “Ver como texto” shows the same structure as a list.

**Consumer provides:** 2–6 `levels` `{ title, text? }`, from the apex to the base.

Use it for hierarchies where higher levels build on lower ones, such as Miller's pyramid or Bloom's levels. The fill darkens toward the apex. Keep the apex title to one short word. Below 600px of available width it keeps its full size and scrolls sideways, so labels never shrink under 12px; “Ver como texto” under it opens the same structure as a stack of bars in the same ramp colours.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `levels` | `{ title; text? }[]` | yes | Levels from apex to base (2–6). |
| `label` | `string` | no | Accessible description. |
