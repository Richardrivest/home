# FigRef

Cross-reference to a figure or table by id: “Figura 2”, or with paren “(véase la Figura 2)”.

**Consumer provides:** `to`, the id of a figure or table registered in `Numbering`; `paren` for “(véase la Figura N)”.

Mention every figure and table in the text before it appears; the content checker flags any that is not. An id missing from `Numbering` renders “[referencia sin destino: id]”, which the checker reports as an error.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `to` | `string` | yes | Figure or table id. |
| `paren` | `boolean` | no | Parenthetical form “(véase la …)”. |
