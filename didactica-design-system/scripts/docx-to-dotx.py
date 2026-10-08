"""Copy a .docx into a .dotx: same package, main part declared as a Word template."""
import sys, zipfile

DOC = "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"
TPL = "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml"
src, dst = sys.argv[1], sys.argv[2]
with zipfile.ZipFile(src) as zin, zipfile.ZipFile(dst, "w", zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        data = zin.read(item.filename)
        if item.filename == "[Content_Types].xml":
            assert DOC.encode() in data, "main document content type not found"
            data = data.replace(DOC.encode(), TPL.encode())
        zout.writestr(item, data)
print("dotx written:", dst)
