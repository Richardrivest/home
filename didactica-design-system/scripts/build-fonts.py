"""Re-encode the open metric-compatible substitutes for Cambria (Caladea) and
Calibri (Carlito) as WOFF2. A straight format conversion: no subsetting or
renaming (Carlito carries a Reserved Font Name under the SIL OFL 1.1).
Usage: python3 scripts/build-fonts.py /usr/share/fonts/truetype/crosextra
"""
import sys, pathlib
from fontTools.ttLib import TTFont

SRC = pathlib.Path(sys.argv[1])
OUT = pathlib.Path(__file__).resolve().parent.parent / "fonts"
FACES = ["Caladea-Regular", "Caladea-Bold", "Caladea-Italic", "Caladea-BoldItalic",
         "Carlito-Regular", "Carlito-Bold", "Carlito-Italic"]
OUT.mkdir(exist_ok=True)
for name in FACES:
    font = TTFont(SRC / f"{name}.ttf")
    font.flavor = "woff2"
    font.save(OUT / f"{name}.woff2")
    print(name, (OUT / f"{name}.woff2").stat().st_size)
