# Timeline

Timeline: dated events along an axis, labels alternating above and below (up to 8). Below 600px of width it keeps its size and scrolls sideways; “Ver como texto” shows the same structure as a list.

**Consumer provides:** up to 8 `events` `{ date, title, text? }` in chronological order.

Use it for the history of a field or the calendar of a course. Labels alternate above and below the axis; more than 8 events is flagged. Below 600px of available width it keeps its full size and scrolls sideways, so labels never shrink under 12px; “Ver como texto” under it opens the same structure as a list.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `events` | `{ date; title; text? }[]` | yes | Events in chronological order. |
| `label` | `string` | no | Accessible description. |
