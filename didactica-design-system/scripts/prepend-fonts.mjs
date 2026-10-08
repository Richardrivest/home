// Puts the web-font import first in dist/didactica.css. Cambria and Calibri are
// Microsoft faces; Caladea and Carlito are their metric-compatible open
// substitutes on Google Fonts, used wherever the originals are not installed.
import { readFileSync, writeFileSync } from 'node:fs';

const FONTS =
  '@import url("https://fonts.googleapis.com/css2?family=Caladea:ital,wght@0,400;0,700;1,400;1,700&family=Carlito:ital,wght@0,400;0,700;1,400;1,700&display=swap");';
const file = new URL('../dist/didactica.css', import.meta.url);
const css = readFileSync(file, 'utf8');
if (!css.startsWith('@import')) writeFileSync(file, `${FONTS}\n${css}`);
console.log('font import ensured in dist/didactica.css');
