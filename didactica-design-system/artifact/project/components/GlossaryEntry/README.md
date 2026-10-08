# GlossaryEntry

Glossary entry: the term in bold navy, a colon, then the definition.

**Consumer provides:** `term` (without the colon), the definition ending with its citation, and an `id` when `Term` links to it. Prefer `Glossary`, which sorts the entries for you.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `term` | `string` | yes | Term, without the colon. |
| `id` | `string` | no | Link target for <Term to>. |
| `children` | `ReactNode` | yes | Definition. |
