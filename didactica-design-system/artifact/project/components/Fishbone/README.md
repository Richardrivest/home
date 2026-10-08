# Fishbone

Cause-and-effect (Ishikawa) diagram: categories of causes along a spine that leads to an effect. Below 600px of width it keeps its size and scrolls sideways; “Ver como texto” shows the same structure as a list.

**Consumer provides:** an `effect` and up to 6 `causes` `{ category, items }` with up to 3 causes each.

Use it (Ishikawa) to analyse a teaching problem by categories before choosing a remedy. Categories alternate above and below the spine. Below 600px of available width it keeps its full size and scrolls sideways, so labels never shrink under 12px; “Ver como texto” under it opens the same structure as a list.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `effect` | `string` | yes | The problem or effect. |
| `causes` | `{ category; items }[]` | yes | Up to 6 categories with up to 3 causes each. |
| `label` | `string` | no | Accessible description. |
