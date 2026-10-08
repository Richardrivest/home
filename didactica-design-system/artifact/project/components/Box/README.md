# Box

The shared frame of the didactic boxes; its family sets the shape (open: filled header, text: top rule, close: plain frame).

The shared frame behind all nine boxes. Prefer the named components; use `Box` with `kind` only for a custom body. The kind sets the colours, the icon, the default title and the family, which sets the shape: opening boxes have a filled header band, in-text boxes a heavy top rule, closing boxes a plain frame. The shape keeps boxes apart in grayscale print and for colour-blind readers.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `kind` | `'keypoints'|'objectives'|'important'|'mistake'|'example'|'thinking'|'selfcheck'|'activities'|'references'` | yes | Box type. |
| `title` | `string` | no | Overrides the type's title. |
| `children` | `ReactNode` | yes | Body. |
