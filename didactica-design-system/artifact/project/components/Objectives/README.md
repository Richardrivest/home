# Objectives

“Objetivos”: numbered learning objectives (O1, O2…), each written for one Bloom (revised) level; the level is kept as data, not shown.

**Consumer provides:** `items`, each `{ level, text }`, where `level` is one of recordar, comprender, aplicar, analizar, evaluar or crear (Bloom revised, Anderson & Krathwohl, 2001).

It comes right after `KeyPoints`, in the opening family. Objectives are numbered O1, O2… (or give an `id`), so activities can point to them. The level is not shown on the page: it stays in the markup (`data-level`) for `AlignmentTable` and the content checker. Start each objective with a verb of its level, order them from low to high, and include at least one at level 4 or above. Pass the same array to `AlignmentTable`. The default intro reads “Al finalizar la unidad, usted será capaz de:”.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `items` | `{ id?: string; level: BloomId; text }[]` | yes | Objectives starting with a verb of their level; ids default to O1, O2… |
| `intro` | `string` | no | Lead-in line. |
| `title` | `string` | no | Overrides “Objetivos”. |
