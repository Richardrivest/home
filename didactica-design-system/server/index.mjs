// Read-only JSON API over db/design-system.sqlite, plus the built CSS/JS and the HTML demo.
//   GET /api/system                 name, version, source
//   GET /api/tokens                 every family, reassembled in tokens.json shape
//   GET /api/colors?theme=dark      colour tokens resolved for one theme
//   GET /api/type                   families + type styles
//   GET /api/dimensions?family=…    spacing | radius | stroke
//   GET /api/components[/:name]     component catalogue with props
//   GET /tokens.css                 CSS custom properties (dist/tokens.css)
//   GET /                           → /html/index.html (plain HTML demo); /html/react.html (React demo)
import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DB_PATH = join(ROOT, 'db/design-system.sqlite');
if (!existsSync(DB_PATH)) {
  console.error('db/design-system.sqlite not found — run `npm run build:db` first.');
  process.exit(1);
}
const db = new DatabaseSync(DB_PATH, { readOnly: true });
const all = (sql, ...p) => db.prepare(sql).all(...p);
const one = (sql, ...p) => db.prepare(sql).get(...p);

const api = {
  system: () => Object.fromEntries(all('SELECT key, value FROM system').map((r) => [r.key, r.value])),
  colors: (theme) => {
    const themes = all('SELECT id, name FROM theme ORDER BY position');
    if (theme) {
      if (!themes.some((t) => t.id === theme)) return null;
      return all(
        `SELECT ct.name, cv.value, ct.usage FROM color_token ct
         JOIN color_value cv ON cv.token = ct.name AND cv.theme = ? ORDER BY ct.position`, theme);
    }
    const tokens = all('SELECT name, usage FROM color_token ORDER BY position').map((t) => ({
      name: t.name,
      value: Object.fromEntries(all('SELECT theme, value FROM color_value WHERE token = ?', t.name).map((r) => [r.theme, r.value])),
      usage: t.usage,
    }));
    return { themes, tokens };
  },
  type: () => {
    const families = Object.fromEntries(all('SELECT key, stack FROM font_family').map((r) => [r.key, r.stack]));
    const groups = [];
    for (const s of all('SELECT * FROM type_style ORDER BY position')) {
      let g = groups.find((x) => x.name === s.type_group);
      if (!g) groups.push((g = { name: s.type_group, styles: [] }));
      g.styles.push({
        name: s.name, family: s.family, fontSize: s.font_size,
        lineHeight: s.line_height == null ? undefined : Number(s.line_height),
        fontWeight: s.font_weight ?? undefined, fontStyle: s.font_style ?? undefined,
        sample: s.sample ?? undefined, usage: s.usage ?? undefined,
      });
    }
    return { families, groups };
  },
  dimensions: (family) =>
    family
      ? all('SELECT name, value, usage FROM dimension_token WHERE family = ? ORDER BY position', family)
      : all('SELECT family, name, value, usage FROM dimension_token ORDER BY position'),
  components: (name) => {
    const withProps = (c) => ({
      name: c.name, group: c.comp_group, summary: c.summary,
      props: all('SELECT name, type, required, description FROM component_prop WHERE component = ?', c.name)
        .map((p) => ({ ...p, required: !!p.required })),
    });
    if (name) {
      const c = one('SELECT * FROM component WHERE name = ?', name);
      return c ? withProps(c) : null;
    }
    return all('SELECT * FROM component ORDER BY position').map(withProps);
  },
};

const tokensDoc = () => {
  const sys = api.system();
  const doc = { name: sys.name, version: Number(sys.version), color: api.colors(), type: api.type() };
  for (const { family } of all('SELECT DISTINCT family FROM dimension_token'))
    doc[family] = { tokens: api.dimensions(family) };
  return doc;
};

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json' };
const send = (res, status, body, type = 'application/json; charset=utf-8') => {
  res.writeHead(status, { 'content-type': type, 'access-control-allow-origin': '*' });
  res.end(typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body, null, 2));
};
const STATIC = { '/tokens.css': 'dist/tokens.css', '/didactica.css': 'dist/didactica.css', '/didactica.iife.js': 'dist/didactica.iife.js' };

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const parts = url.pathname.split('/').filter(Boolean);
  try {
    if (req.method !== 'GET') return send(res, 405, { error: 'read-only API' });
    if (parts[0] === 'api') {
      let out;
      switch (parts[1]) {
        case 'system': out = api.system(); break;
        case 'tokens': out = tokensDoc(); break;
        case 'colors': out = api.colors(url.searchParams.get('theme')); break;
        case 'type': out = api.type(); break;
        case 'dimensions': out = api.dimensions(url.searchParams.get('family')); break;
        case 'components': out = api.components(parts[2] && decodeURIComponent(parts[2])); break;
        default: out = null;
      }
      return out == null ? send(res, 404, { error: 'not found' }) : send(res, 200, out);
    }
    if (url.pathname === '/') {
      res.writeHead(302, { location: '/html/index.html' });
      return res.end();
    }
    const rel = STATIC[url.pathname] ?? (/^\/(html|dist|tokens)\//.test(url.pathname) ? normalize(decodeURIComponent(url.pathname.slice(1))) : null);
    if (rel && !rel.startsWith('..')) {
      const file = join(ROOT, rel);
      if (existsSync(file)) return send(res, 200, await readFile(file), TYPES[extname(file)] ?? 'application/octet-stream');
    }
    send(res, 404, { error: 'not found' });
  } catch (err) {
    send(res, 500, { error: String(err.message || err) });
  }
}).listen(process.env.PORT || 4173, () => console.log(`Didáctica design-system API on http://localhost:${process.env.PORT || 4173}`));
