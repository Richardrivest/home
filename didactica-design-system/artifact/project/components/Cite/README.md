# Cite

APA 7 in-text citation with page: (Biggs & Tang, 2011, p. 45) or Biggs y Tang (2011, p. 45). Inside <Bibliography>, cite by id.

**Consumer provides:** `authors` (surnames in source order), `year` and `page`. A range such as `"45-47"` becomes “pp. 45–47”. Use `locator` (“párr. 4”) when the source has no pages, `narrative` for the in-text form, and `works` for several works in one parenthesis.

- Parenthetical citations use “&”: (Biggs & Tang, 2011, p. xx).
- Narrative citations use “y”: Biggs y Tang (2011, p. xx).
- With three or more authors, only the first is named, followed by “et al.”.
- Several works are sorted alphabetically and separated with “;”.

Inside `Bibliography`, pass `id` (and `page`) instead of `authors` and `year`: the citation reads the record and registers the work for `ReferencesBox auto`. `formatCitation` and `formatCitations` give the same strings outside React.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `id` | `string` | no | Work id declared in <Bibliography>; replaces authors and year and registers the work as cited. |
| `authors` | `string[]` | yes | Surnames in source order; 3+ become “et al.”. |
| `year` | `number | string` | yes | Year, or “s. f.”. |
| `page` | `number | string` | yes | Page or range (“45–47” → pp.). |
| `locator` | `string` | no | Overrides page: “párr. 4”, “cap. 3”. |
| `narrative` | `boolean` | no | Narrative form with “y”. |
| `works` | `Work[]` | no | Several works in one parenthesis, alphabetical. |
