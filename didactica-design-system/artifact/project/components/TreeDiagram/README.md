# TreeDiagram

Hierarchy or classification: a root and up to three levels below. Top-down with up to 4 leaves, left to right with more. Below 600px of width it keeps its size and scrolls sideways; “Ver como texto” shows the same structure as a list.

**Consumer provides:** a `root` `{ label, detail?, children? }`, up to three levels below it.

Use it for classifications and structures (types of assessment, the parts of a curriculum). With up to 4 leaves it draws top-down; with more it turns left to right so labels keep their size. More than 8 leaves or 4 levels is flagged: split the tree. Below 600px of available width it keeps its full size and scrolls sideways, so labels never shrink under 12px; “Ver como texto” under it opens the same structure as a list.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `root` | `{ label; detail?; children? }` | yes | The root node; children nest the same shape. |
| `direction` | `'auto' | 'down' | 'right'` | no | Layout; 'auto' goes right when leaves would not fit across. |
| `label` | `string` | no | Accessible description. |
