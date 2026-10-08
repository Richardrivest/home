// Copies the built system into artifact/project/ — the file layout of the
// “Didáctica Universitaria” design-system artifact on claude.ai.
// Hand-written there: README.md, components/<Comp>/README.md + preview.html, Cover.
import { copyFileSync, mkdirSync } from 'node:fs';

const out = new URL('../artifact/project/', import.meta.url);
mkdirSync(new URL('components/', out), { recursive: true });
const copy = (from, to) => copyFileSync(new URL(`../${from}`, import.meta.url), new URL(to, out));
copy('tokens/tokens.json', 'tokens.json');
copy('dist/didactica.iife.js', 'components/bundle.js');
copy('dist/didactica.css', 'components/bundle.css');
copy('src/index.d.ts', 'components/index.d.ts');
console.log('artifact/project updated');
