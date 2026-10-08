# Activities

“Actividades”: questions and tasks to work the unit's concepts. Item: string or { type, text }.

**Consumer provides:** `items`, as strings or `{ type, text }` with type pregunta, tarea, caso or debate.

It comes right after `ThinkFurther`. Write each item as a *usted* imperative or a direct question that works the unit's concepts.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `items` | `(string | { type?: 'pregunta'|'tarea'|'caso'|'debate'; text })[]` | yes | Numbered activities. |
| `title` | `string` | no | Overrides “Actividades”. |
