# Box

The shared frame of the seven didactic boxes: tinted surface, icon + title header, body.

The shared frame behind all seven boxes. Prefer the named components; use `Box` with `kind` only for a custom body. The kind sets the colours, the icon and the default title.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `kind` | `'keypoints'|'objectives'|'important'|'mistake'|'thinking'|'activities'|'references'` | yes | Box type. |
| `title` | `string` | no | Overrides the type's title. |
| `children` | `ReactNode` | yes | Body. |
