# Timeline

Timeline: dated events along an axis, labels alternating above and below (up to 8). Below 600px of width it shows the same structure as a list.

**Consumer provides:** up to 8 `events` `{ date, title, text? }` in chronological order.

Use it for the history of a field or the calendar of a course. Labels alternate above and below the axis; more than 8 events is flagged. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `events` | `{ date; title; text? }[]` | yes | Events in chronological order. |
| `label` | `string` | no | Accessible description. |
