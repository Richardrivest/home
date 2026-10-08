# Funnel

Funnel: stages that narrow from the general to the specific (curriculum levels, selection processes). Below 600px of width it shows the same structure as a list.

**Consumer provides:** 3–6 `stages` `{ title, text? }`, widest first.

Use it for levels of curricular specification or any process that narrows (from graduate profile to classroom activity). The fill darkens as it narrows. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `stages` | `{ title; text? }[]` | yes | Stages, widest first (3–6). |
| `label` | `string` | no | Accessible description. |
