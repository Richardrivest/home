# VennDiagram

Venn diagram: what two or three concepts share and what is exclusive to each. Below 600px of width it shows the same structure as a list.

**Consumer provides:** two or three `sets` and `regions` `{ a, b, c, ab, ac, bc, abc }`, each a list of one- or two-word items.

Use it to compare perspectives or concepts: what they share and what is exclusive to each. Fills are light, translucent accents, so ink text keeps 4.5:1 in every region. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `sets` | `string[]` | yes | Two or three set names. |
| `regions` | `{ a?; b?; c?; ab?; ac?; bc?; abc?: string[] }` | yes | Short items for each region. |
| `label` | `string` | no | Accessible description. |
