# ProcessFlow

Process flow: numbered steps joined by arrows; horizontal on wide screens, vertical on narrow ones.

**Consumer provides:** 2–5 `steps` `{ title, text? }` in order.

Use it for linear sequences, such as constructive alignment or the phases of a class. Steps sit side by side from 640px wide and stack below that.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `steps` | `{ title; text? }[]` | yes | 2–5 steps in order. |
| `label` | `string` | no | Accessible name of the list. |
