# TableOfContents

TableOfContents renders the «Índice». It shows a `toc-title` heading, then one line per entry: the title, a dotted `caption` leader and the page number. Level 2 is indented by `indent-bullet` and level 3 by `indent-hang`, as in Word's TOC field (levels 1–3).

**Consumer provides:** `entries`, each `{ title, page, level? }`, in reading order. `title` defaults to «Índice».

**Do** keep entry titles exactly as the headings read, numbering included. **Don't** list levels deeper than 3.
