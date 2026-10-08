# QuadrantMatrix

2 × 2 matrix: two axes (low → high) and four quadrants; the high–high quadrant is emphasised. Below 600px of width it keeps its size and scrolls sideways; “Ver como texto” shows the same structure as a list.

**Consumer provides:** `xAxis` and `yAxis` `{ label, low, high }` and four `quadrants` `{ title, text? }`: top-left, top-right, bottom-left, bottom-right.

Use it to cross two dimensions (demand × support, depth × autonomy). The high–high quadrant gets the header tint and a heavy frame. Below 600px of available width it keeps its full size and scrolls sideways, so labels never shrink under 12px; “Ver como texto” under it opens the same structure as a list.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `xAxis` | `{ label; low; high }` | yes | Horizontal axis. |
| `yAxis` | `{ label; low; high }` | yes | Vertical axis. |
| `quadrants` | `{ title; text? }[4]` | yes | Top-left, top-right, bottom-left, bottom-right. |
| `label` | `string` | no | Accessible description. |
