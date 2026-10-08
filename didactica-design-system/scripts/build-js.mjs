// src/index.js → dist/index.mjs (ESM, react external) and
// dist/didactica.iife.js (classic script: reads window.React, sets window.Didactica).
import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';

const meta = JSON.parse(readFileSync(new URL('../src/components.meta.json', import.meta.url), 'utf8'));
const common = { entryPoints: ['src/index.js'], bundle: true, jsx: 'transform', loader: { '.jsx': 'jsx' }, logLevel: 'info' };

await build({ ...common, format: 'esm', outfile: 'dist/index.mjs', external: ['react'] });

const globalReact = {
  name: 'global-react',
  setup(b) {
    b.onResolve({ filter: /^react$/ }, () => ({ path: 'react', namespace: 'global' }));
    b.onLoad({ filter: /.*/, namespace: 'global' }, () => ({ contents: 'module.exports = window.React;', loader: 'js' }));
  },
};
await build({ ...common, format: 'iife', globalName: 'Didactica', outfile: 'dist/didactica.iife.js', plugins: [globalReact], minify: false });

// Header the design-system page reads: namespace + component order.
const header = `/* @ds-bundle: ${JSON.stringify({ format: 4, namespace: 'Didactica', components: meta.map((m) => ({ name: m.name })) })} */\n`;
let js = readFileSync('dist/didactica.iife.js', 'utf8');
js = js.replace(/^var Didactica =/m, 'window.Didactica =');
if (/<\/script|<!--/i.test(js)) throw new Error('bundle contains </script or <!-- ');
writeFileSync('dist/didactica.iife.js', header + js);
console.log('dist/didactica.iife.js written');
