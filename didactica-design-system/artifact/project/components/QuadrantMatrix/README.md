# QuadrantMatrix

2 × 2 matrix: two axes (low → high) and four quadrants; the high–high quadrant is emphasised. Below 600px of width it shows the same structure as a list.

**Consumer provides:** `xAxis` and `yAxis` `{ label, low, high }` and four `quadrants` `{ title, text? }`: top-left, top-right, bottom-left, bottom-right.

Use it to cross two dimensions (demand × support, depth × autonomy). The high–high quadrant gets the header tint and a heavy frame. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `xAxis` | `{ label; low; high }` | yes | Horizontal axis. |
| `yAxis` | `{ label; low; high }` | yes | Vertical axis. |
| `quadrants` | `{ title; text? }[4]` | yes | Top-left, top-right, bottom-left, bottom-right. |
| `label` | `string` | no | Accessible description. |
