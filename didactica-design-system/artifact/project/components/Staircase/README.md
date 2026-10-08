# Staircase

Staircase: progressive levels that build on one another, lowest at the left (Bloom, rubric levels). Below 600px of width it shows the same structure as a list.

**Consumer provides:** 3–6 `steps` `{ title, text? }`, lowest first.

Use it for progressive levels that build on each other, such as Bloom's revised taxonomy or rubric levels; unlike `Pyramid`, it reads as a climb. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `steps` | `{ title; text? }[]` | yes | Steps, lowest first (3–6). |
| `label` | `string` | no | Accessible description. |
