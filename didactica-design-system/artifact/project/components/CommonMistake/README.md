# CommonMistake

“Error Frecuente”: a refutation in three moves — misconception, cited correction, and why the belief does not hold.

**Consumer provides:** `misconception` (the belief, stated plainly), `correction` (what the evidence shows, always with its citation) and `explanation` (why the belief does not hold, or why it is attractive).

It follows the structure of a refutation text: state the misconception, refute it explicitly, explain the alternative. Place it in the text next to the idea it corrects (in-text family: heavy top rule). Keep it respectful, so that it corrects the idea and not the reader.

| Prop | Type | Required | Notes |
|---|---|---|---|
| `misconception` | `ReactNode` | yes | The belief, stated plainly. |
| `correction` | `ReactNode` | yes | What the evidence shows, cited. |
| `explanation` | `ReactNode` | no | Why the belief is wrong or why it is attractive (“Por qué no se sostiene”). |
| `children` | `ReactNode` | no | Optional teaching note. |
| `title` | `string` | no | Overrides “Error Frecuente”. |
