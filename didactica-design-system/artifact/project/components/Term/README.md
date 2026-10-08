# Term

A term in running text linked to its glossary entry (dotted azure underline).

**Consumer provides:** `to`, the glossary id, and the term as it reads in the sentence.

Mark the first use of a glossary term in each unit, not every use. It reads as normal text with a dotted azure underline and links to the glossary entry.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `to` | `string` | yes | Glossary entry id. |
| `children` | `ReactNode` | yes | The term as it appears in the sentence. |
