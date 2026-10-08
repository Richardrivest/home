# Objectives

“Objetivos”: learning objectives, each tagged with its Bloom (revised) level.

**Consumer provides:** `items`, each `{ level, text }`, where `level` is one of recordar, comprender, aplicar, analizar, evaluar or crear (Bloom revised, Anderson & Krathwohl, 2001).

It comes right after `KeyPoints`. Start each objective with a verb of its level, order them from low to high, and include at least one at level 4 or above. The default intro reads “Al finalizar la unidad, usted será capaz de:”.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `items` | `{ level: BloomId; text }[]` | yes | Objectives starting with a verb of their level. |
| `intro` | `string` | no | Lead-in line. |
| `title` | `string` | no | Overrides “Objetivos”. |
