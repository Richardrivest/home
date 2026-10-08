# AlignmentTable

Alignment table: which activities practise each objective, flagging gaps and level mismatches.

**Consumer provides:** the same `objectives` and `activities` arrays passed to `Objectives` and `Activities`.

It goes right after `Activities` and makes constructive alignment visible: for each objective, its level, the activities that practise it, and its status. It flags an objective without activities and an activity pitched below its objective's level. `checkAlignment()` returns the same problems as data, for authoring checks.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `objectives` | `Objective[]` | yes | The same array passed to Objectives. |
| `activities` | `Activity[]` | yes | The same array passed to Activities. |
| `title` | `string` | no | Defaults to “Alineamiento de la unidad”. |
