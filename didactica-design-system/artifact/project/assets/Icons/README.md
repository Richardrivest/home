# Icons

These are the seven box icons, from Lucide v0.460.0 (ISC licence). Each is a 24×24 line icon with a 2px round stroke. Every file is single-ink, drawn in its box's light-theme `*-accent`, because `<img>` cannot inherit a colour:

| File | Box | Ink |
|---|---|---|
| keypoints-key-round.svg | Puntos Clave | `keypoints-accent` #1f3864 |
| objectives-target.svg | Objetivos | `objectives-accent` #0d5c63 |
| important-star.svg | Importante | `important-accent` #8a4b00 |
| mistake-triangle-alert.svg | Error Frecuente | `mistake-accent` #a3271c |
| thinking-message-circle-question.svg | Para Seguir Pensando | `thinking-accent` #5a3486 |
| activities-pencil-line.svg | Actividades | `activities-accent` #2d6a2e |
| references-book-open-text.svg | Referencias | `references-accent` #3f4b5e |

In React, use `Icon` (or the boxes themselves). They draw in `currentColor`, so they follow the theme. Use these files only where `<img>` is the only option, and only on light grounds. Use them only in box headers, never as decoration.
