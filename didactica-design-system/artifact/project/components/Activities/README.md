# Activities

“Actividades”: assessable questions and tasks, tagged with type, Bloom level and the objectives they practise.

**Consumer provides:** `items`, as strings or `{ type, level, objectives, text }`: type is pregunta, tarea, caso or debate; `level` is the Bloom level the activity demands; `objectives` lists the objectives it practises (`['O2']`), shown as links.

It comes after `SelfCheck`, followed by `AlignmentTable`. Activities are assessable, unlike `ThinkFurther`. Every objective needs at least one activity at its level or above. Write each item as a *usted* imperative or a direct question.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `items` | `(string | { type?; level?: BloomId; objectives?: string[]; text })[]` | yes | Numbered activities; objectives link to O1, O2… |
| `title` | `string` | no | Overrides “Actividades”. |
