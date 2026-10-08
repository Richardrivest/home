# ConceptWeb

Concept web: a central concept linked to up to 8 related concepts, with relation labels and short details.

**Consumer provides:** `center`, and 3–8 `nodes` with `{ label, relation?, detail? }`, placed clockwise from the top.

Use it to show how one concept relates to others. Keep relations to short verb phrases (“se produce en”) and details to an author or a few words. On narrow screens it scrolls sideways.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `center` | `string` | yes | Central concept. |
| `nodes` | `{ label; relation?; detail? }[]` | yes | Related concepts, clockwise from the top. |
| `label` | `string` | no | Accessible description. |
