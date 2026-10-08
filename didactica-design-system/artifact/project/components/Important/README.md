# Important

“Importante”: a key concept or definition the reader should retain.

**Consumer provides:** an optional `term` and the definition as children, with its citation.

Use it for key concepts and definitions anywhere in the text, at most one per section. Never nest it.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `term` | `string` | no | The concept defined. |
| `children` | `ReactNode` | yes | Definition with its citation. |
| `title` | `string` | no | Overrides “Importante”. |
