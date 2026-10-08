# BulletList

BulletList renders the manual's bulleted lists: learning objectives, unit activities and checklists. Items are set in `list-item` and justified, with `space-5pt` between them. The bullets are ● for level 1, ○ for level 2 and ■ for level 3, set at `indent-bullet`. Text starts at `indent-hang`, and each level adds another `indent-hang`.

**Consumer provides:** `items`, as strings or `{ text, items }` for a nested level.

**Do** start activities with a *usted* imperative («Analice…», «Elabore…») or a direct question. **Don't** use numbered lists for activities; the manual bullets them.
