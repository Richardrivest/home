# Page

Page is the frame for one page of the manual: a `paper` ground, `page-margin` padding, a right-aligned running header over a `stroke-hair` `rule`, and a centred «Página N» footer, both in `running`.

**Consumer provides:** `header` (the book's short title), `page` (a number), and the page content as children.

**Use** it to wrap every on-screen page or print view. Put headings, paragraphs, boxes and tables inside it.

**Do** keep one column at `measure`. **Don't** put chapter titles in the running header (the manual repeats the book title on every page), and don't use `running` for anything else readers must read.
