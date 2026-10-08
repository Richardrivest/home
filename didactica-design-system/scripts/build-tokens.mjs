// tokens/tokens.json → dist/tokens.css (same layout the design-system page compiles).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const root = new URL('..', import.meta.url);
const t = JSON.parse(readFileSync(new URL('tokens/tokens.json', root), 'utf8'));
const [first, ...others] = t.color.themes.map((th) => th.id);
const val = (v, th) => (typeof v === 'string' ? (th === first ? v : null) : v[th] ?? null);
// Themed tokens: every colour, plus any other token whose value is per theme (shadow).
const themed = [
  ...t.color.tokens,
  ...Object.entries(t)
    .filter(([k, f]) => k !== 'color' && k !== 'type' && f?.tokens)
    .flatMap(([, f]) => f.tokens.filter((tok) => typeof tok.value === 'object')),
];
const colorDecls = (th) =>
  themed
    .map((c) => [c.name, val(c.value, th)])
    .filter(([, v]) => v != null)
    .map(([n, v]) => `  --${n}: ${v.replace(/^\{(.+)\}$/, 'var(--$1)')};`)
    .join('\n');

const lines = [`/* ${t.name} — generated from tokens.json */`];
lines.push(`:root, [data-theme="${first}"] {\n${colorDecls(first)}\n}`);
for (const th of others) {
  lines.push(`[data-theme="${th}"] {\n${colorDecls(th)}\n}`);
  lines.push(`@media (prefers-color-scheme: ${th}) {\n  :root:not([data-theme]) {\n${colorDecls(th).replace(/^/gm, '  ')}\n  }\n}`);
}
const dims = [];
for (const [key, fam] of Object.entries(t)) {
  if (['name', 'version', 'meta', 'color', 'type'].includes(key) || !fam?.tokens) continue;
  for (const tok of fam.tokens) if (typeof tok.value !== 'object') dims.push(`  --${tok.name}: ${tok.value};`);
}
for (const [k, stack] of Object.entries(t.type.families)) dims.push(`  --font-${k}: ${stack};`);
lines.push(`:root {\n${dims.join('\n')}\n}`);
for (const g of t.type.groups) {
  for (const s of g.styles) {
    const fam = s.family || g.family;
    const d = [`font-family: var(--font-${fam})`, `font-size: ${s.fontSize}`];
    if (s.lineHeight != null) d.push(`line-height: ${s.lineHeight}`);
    if (s.fontWeight != null) d.push(`font-weight: ${s.fontWeight}`);
    if (s.fontStyle) d.push(`font-style: ${s.fontStyle}`);
    if (s.letterSpacing) d.push(`letter-spacing: ${s.letterSpacing}`);
    lines.push(`.${s.name} { ${d.join('; ')}; }`);
  }
}
// @font-face per bundled font (paths relative to dist/tokens.css).
for (const f of t.type.fonts || []) {
  const file = f.file.includes('/') ? f.file : `fonts/${f.file}`;
  lines.push(`@font-face { font-family: "${f.family}"; src: url("../${file}") format("woff2"); font-weight: ${f.weight || 400}; font-style: ${f.style || 'normal'}; font-display: swap; }`);
}
mkdirSync(new URL('dist/', root), { recursive: true });
writeFileSync(new URL('dist/tokens.css', root), lines.join('\n') + '\n');
console.log('dist/tokens.css written');
