# Funnel

Funnel: stages that narrow from the general to the specific (curriculum levels, selection processes). Below 600px of width it keeps its size and scrolls sideways; “Ver como texto” shows the same structure as a list.

**Consumer provides:** 3–6 `stages` `{ title, text? }`, widest first.

Use it for levels of curricular specification or any process that narrows (from graduate profile to classroom activity). The fill darkens as it narrows. Below 600px of available width it keeps its full size and scrolls sideways, so labels never shrink under 12px; “Ver como texto” under it opens the same structure as a list.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `stages` | `{ title; text? }[]` | yes | Stages, widest first (3–6). |
| `label` | `string` | no | Accessible description. |
