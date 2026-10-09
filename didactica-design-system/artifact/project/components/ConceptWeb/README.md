# ConceptWeb

Concept web: a central concept linked to up to 8 related concepts, with relation labels and short details. Below 600px of width it keeps its size and scrolls sideways; “Ver como texto” shows the same structure as a list.

**Consumer provides:** `center`, and 3–8 `nodes` with `{ label, relation?, detail? }`, placed clockwise from the top.

Use it to show how one concept relates to others. Keep relations to short verb phrases (“se produce en”) and details to an author or a few words; labels that wrap past three lines are flagged by the content checker. Below 600px of available width it keeps its full size and scrolls sideways, so labels never shrink under 12px; “Ver como texto” under it opens the same structure as a list.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `center` | `string` | yes | Central concept. |
| `nodes` | `{ label; relation?; detail? }[]` | yes | Related concepts, clockwise from the top. |
| `label` | `string` | no | Accessible description. |
