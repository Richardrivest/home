# ConceptWeb

Concept web: a central concept linked to up to 8 related concepts, with relation labels and short details. Below 600px of width it shows the same structure as a list.

**Consumer provides:** `center`, and 3–8 `nodes` with `{ label, relation?, detail? }`, placed clockwise from the top.

Use it to show how one concept relates to others. Keep relations to short verb phrases (“se produce en”) and details to an author or a few words; labels that wrap past three lines are flagged by the content checker. Below 600px of available width the web is replaced by the same structure as a list, so labels never shrink under 12px.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `center` | `string` | yes | Central concept. |
| `nodes` | `{ label; relation?; detail? }[]` | yes | Related concepts, clockwise from the top. |
| `label` | `string` | no | Accessible description. |
