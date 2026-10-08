# Numbering

Numbers figures and tables from their ids, in order of first mention, so cross-references never break.

**Consumer provides:** `figures` and `tables`, the ids in order of first mention, around the unit. `firstFigure` / `firstTable` continue a count from an earlier unit.

Inside it, `Figure` and `DataTable` with an `id` take their number automatically, and `FigRef` prints “Figura N” / “Tabla N”. Reordering a unit means reordering one list; no reference has to be renumbered by hand.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `figures` | `string[]` | no | Figure ids in order of first mention. |
| `tables` | `string[]` | no | Table ids in order of first mention. |
| `firstFigure` | `number` | no | Start of the figure count (continue from an earlier unit). |
| `firstTable` | `number` | no | Start of the table count. |
| `children` | `ReactNode` | yes | The unit. |
