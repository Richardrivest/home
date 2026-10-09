# Activities

“Actividades”: assessable questions and tasks, tagged with their type; the objectives they practise and the Bloom level are kept as data for the alignment table, not shown.

**Consumer provides:** `items`, as strings or `{ type, level, objectives, text }`: type is pregunta, tarea, caso or debate; `level` is the Bloom level the activity demands; `objectives` lists the objectives it practises (`['O2']`), used by `AlignmentTable` and not shown.

It comes after `SelfCheck`, followed by `AlignmentTable`. Only the type is shown as a tag; the objectives and the level are not shown, but stay in the markup (`data-objectives`, `data-level`) and feed `AlignmentTable`. Activities are assessable, unlike `ThinkFurther`. Every objective needs at least one activity at its level or above. Write each item as a *usted* imperative or a direct question.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `items` | `(string | { type?; level?: BloomId; objectives?: string[]; text })[]` | yes | Numbered activities; objectives (O1, O2…) are kept as data for AlignmentTable, not shown. |
| `title` | `string` | no | Overrides “Actividades”. |
