"""Finish the Word files written by build-word-template.mjs:
1. Reorder paragraph-border children into the schema order (top, left, bottom, right,
   between, bar). docx 9.7.1 writes them as top, bottom, left, right, which Word's
   schema rejects when a style has left/right borders. The .docx is fixed in place.
2. Copy it as a .dotx: same package, main part declared as a Word template.
Usage: python3 scripts/docx-to-dotx.py in.docx out.dotx
"""
import re, sys, zipfile, shutil, os, tempfile

DOC = "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"
TPL = "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml"
ORDER = ["top", "left", "bottom", "right", "between", "bar"]

def reorder_borders(xml: str) -> str:
    def fix(m):
        children = re.findall(r"<w:(\w+)\b[^>]*/>", m.group(1))
        parts = dict(zip(children, re.findall(r"<w:\w+\b[^>]*/>", m.group(1))))
        return "<w:pBdr>" + "".join(parts[k] for k in ORDER if k in parts) + "</w:pBdr>"
    return re.sub(r"<w:pBdr>(.*?)</w:pBdr>", fix, xml, flags=re.S)

def rewrite(src, dst, template=False):
    with zipfile.ZipFile(src) as zin, zipfile.ZipFile(dst, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)
            if item.filename in ("word/styles.xml", "word/document.xml"):
                data = reorder_borders(data.decode("utf-8")).encode("utf-8")
            if template and item.filename == "[Content_Types].xml":
                assert DOC.encode() in data, "main document content type not found"
                data = data.replace(DOC.encode(), TPL.encode())
            zout.writestr(item, data)

src, dst = sys.argv[1], sys.argv[2]
fd, tmp = tempfile.mkstemp(suffix=".docx"); os.close(fd)
rewrite(src, tmp)
shutil.move(tmp, src)
rewrite(src, dst, template=True)
print("docx fixed and dotx written:", dst)
