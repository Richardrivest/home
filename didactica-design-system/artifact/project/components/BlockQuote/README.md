# BlockQuote

APA 7 block quotation (40 words or more): indented, no quotation marks, citation after the final period.

Use it for quotations of 40 words or more; anything shorter is a `Quote`. It has no quotation marks, a left indent of `indent-hang`, and the citation after the final period. The preview cites a placeholder source (Apellido, año, p. xx).

| Prop | Type | Required | Notes |
|---|---|---|---|
| `children` | `ReactNode` | yes | Quoted passage ending with its period. |
| `cite` | `{ authors; year; page }` | yes | Source with page. |
