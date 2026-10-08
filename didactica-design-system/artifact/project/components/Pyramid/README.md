# Pyramid

Pyramid of levels, top (most advanced) first, e.g. Miller's pyramid; descriptions to the right.

**Consumer provides:** 2–6 `levels` `{ title, text? }`, from the apex to the base.

Use it for hierarchies where higher levels build on lower ones, such as Miller's pyramid or Bloom's levels. The fill darkens toward the apex.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `levels` | `{ title; text? }[]` | yes | Levels from apex to base (2–6). |
| `label` | `string` | no | Accessible description. |
