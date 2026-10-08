# ReferencesBox

“Referencias”: the unit’s APA 7 list, French indent — hand-written <Reference> items, or `auto`: the works cited in the unit, formatted and ordered.

**Consumer provides:** `Reference` children, sorted alphabetically, or `auto` inside `Bibliography` to generate the list from the works cited above.

It closes the unit and lists every work the unit cites, and only those, in APA 7 with a French (hanging) indent. With `auto` that holds by construction; with hand-written entries, the content checker compares the list with the citations.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `children` | `ReactNode` | no | <Reference> items (omit with auto). |
| `auto` | `boolean` | no | Inside <Bibliography>: list the works cited above, in APA order. |
| `all` | `boolean` | no | List every declared work (a manual-wide bibliography). |
| `title` | `string` | no | Overrides “Referencias”. |
