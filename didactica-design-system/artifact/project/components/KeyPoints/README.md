# KeyPoints

“Puntos Clave”: the unit summary, first box of every unit (3–5 one-line items), with optional “Antes de leer” questions.

**Consumer provides:** 3–5 `items` of one line each, and optionally 1–3 `before` questions (“Antes de leer”).

It is the first box of every unit, right after `ChapterOpener`, in the opening family (filled header band). It works as an advance organiser and summarises the unit without introducing anything new. Write affirmative statements. The “Antes de leer” questions invite a prediction before reading; come back to them in `ThinkFurther`.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `items` | `ReactNode[]` | yes | 3–6 key points, one sentence each. |
| `before` | `ReactNode[]` | no | 1–3 “Antes de leer” questions, revisited in “Para Seguir Pensando”. |
| `title` | `string` | no | Overrides “Puntos Clave”. |
