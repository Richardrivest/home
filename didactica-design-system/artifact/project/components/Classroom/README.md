# Classroom

“En el Aula”: a worked classroom case — situation, didactic decision and its rationale.

**Consumer provides:** `situation` (a concrete classroom moment), `decision` (what the teacher does), `rationale` (why, with its citation) and an optional `discipline` tag: sociales, salud, general or any text.

It is a worked example: it shows a didactic decision being made, right after the concept it applies (in-text family). Keep the situation short and realistic, and make the rationale point back to the unit's concepts.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `discipline` | `'sociales'|'salud'|'general'|string` | no | Discipline tag in the header. |
| `situation` | `ReactNode` | yes | The classroom situation, concrete. |
| `decision` | `ReactNode` | yes | What the teacher does. |
| `rationale` | `ReactNode` | no | Why, with its citation. |
| `title` | `string` | no | Overrides “En el Aula”. |
