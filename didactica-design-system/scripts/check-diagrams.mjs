// Screenshots every SVG diagram of the demo (html/index.html) in the light and dark
// themes at 1100px and 390px, and reports text that overlaps other text or leaves the
// drawing. Exits with code 1 when it finds any. Run after `npm run build`:
//   npm run check:diagrams [-- <output folder>]      (default: screenshots/)
// Needs Playwright with Chromium: `npm i -D playwright && npx playwright install chromium`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.resolve(process.argv[2] || path.join(root, 'screenshots'));
const page = path.join(root, 'html', 'index.html');

let chromium;
try { ({ chromium } = await import('playwright')); } catch {
  console.error('Playwright is not installed. Run: npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}
if (!fs.existsSync(page)) { console.error('html/index.html is missing. Run: npm run build'); process.exit(2); }
fs.mkdirSync(out, { recursive: true });

// PLAYWRIGHT_CHROMIUM lets you point at an already installed Chromium.
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM } : {});
let problems = 0;
for (const theme of ['light', 'dark']) {
  for (const width of [1100, 390]) {
    const tab = await browser.newPage({ viewport: { width, height: 900 }, colorScheme: theme });
    await tab.goto('file://' + page);
    await tab.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
    let k = 0;
    for (const figure of await tab.$$('figure')) {
      if (!(await figure.$('svg.du-diagram, .du-diagram-list'))) continue;
      await figure.screenshot({ path: path.join(out, `${theme}-${width}-${String(++k).padStart(2, '0')}.png`) });
    }
    if (theme === 'light' && width === 1100) {
      const report = await tab.evaluate(() => [...document.querySelectorAll('svg.du-diagram')].map((svg) => {
        // Rotated labels (axis titles) are measured unrotated, so they are left out.
        const texts = [...svg.querySelectorAll('text')].filter((t) => !t.getAttribute('transform')).map((t) => ({ b: t.getBBox(), s: t.textContent }));
        const vb = svg.viewBox.baseVal; const bad = [];
        texts.forEach(({ b, s }, i) => {
          if (b.x < vb.x - 1 || b.y < vb.y - 1 || b.x + b.width > vb.x + vb.width + 1 || b.y + b.height > vb.y + vb.height + 1) bad.push(`outside the drawing: “${s}”`);
          for (const o of texts.slice(i + 1)) {
            const c = o.b;
            if (b.x < c.x + c.width - 1 && c.x < b.x + b.width - 1 && b.y < c.y + c.height - 2 && c.y < b.y + b.height - 2) bad.push(`“${s}” overlaps “${o.s}”`);
          }
        });
        return { label: svg.getAttribute('aria-label'), bad };
      }));
      for (const { label, bad } of report) {
        console.log(`${bad.length ? '✗' : '✓'} ${label}`);
        for (const b of bad) console.log(`    ${b}`);
        problems += bad.length;
      }
    }
    await tab.close();
  }
}
await browser.close();
console.log(`\n${problems} problem(s). Screenshots in ${path.relative(process.cwd(), out) || '.'}`);
process.exit(problems ? 1 : 0);
