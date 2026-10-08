# BulletList

Bullet list (● ○ ■ by level). An item is a string or { text, items } for a nested level.

**Consumer provides:** `items` (strings, or `{ text, items }` for a nested level).

Use it in running text. Inside boxes, the box draws its own list.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `items` | `(string | { text; items? })[]` | yes | List items. |
