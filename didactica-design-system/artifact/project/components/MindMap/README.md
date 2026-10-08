# MindMap

Mind map: a central topic with branches to both sides and short ideas hanging from each. Below 600px of width it shows the same structure as a list.

**Consumer provides:** a `center` topic and up to 6 `branches` `{ label, items? }` with up to 3 short ideas each.

Use it for brainstorming and planning: decisions that depend on one topic, without ranking them. Branches alternate right then left. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `center` | `string` | yes | Central topic. |
| `branches` | `{ label; items? }[]` | yes | Branches (up to 6), each with up to 3 short ideas. |
| `label` | `string` | no | Accessible description. |
