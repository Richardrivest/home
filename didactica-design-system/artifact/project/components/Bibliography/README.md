# Bibliography

Declares the works a unit can cite; <Cite id> and <ReferencesBox auto> read from it, so citations and references can’t disagree.

**Consumer provides:** `works`, each `{ id, type, authors, year, title, … }`. Types are book, article, chapter (with `editors`, `container`, `pages`) and web (with `site`, `date`, `url`). Authors are `{ family, given, suffix? }` or `{ literal }` for a group author. Titles go in sentence case.

Declare a unit's works once, around the unit. Inside it, `<Cite id="…" page={…} />` takes authors and year from the record, and `<ReferencesBox auto />` lists exactly the works cited above it, formatted in APA 7 and ordered by author and year. Works with the same authors and year get a/b suffixes in both places. A citation that points to an undeclared id renders “[obra sin registrar: id]”.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `works` | `Work[]` | yes | Structured works: { id, type: 'book'|'article'|'chapter'|'web', authors: [{ family, given, suffix? } | { literal }], year, title, … }. |
| `children` | `ReactNode` | yes | The unit. |
