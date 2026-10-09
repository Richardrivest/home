// Renders each box icon (icons/<kind>-<icon>.svg) to PNG for the Word template:
// icons/png/<kind>.png in the box accent, and <kind>-white.png for opening-family
// header bands and the cover mosaic (all nine). Needs Playwright (a dev dependency): node scripts/build-icon-png.cjs
const { chromium } = require(process.env.PLAYWRIGHT || 'playwright');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const boxes = JSON.parse(fs.readFileSync(path.join(root, 'src/boxes.config.json'), 'utf8'));
const out = path.join(root, 'icons/png');
fs.mkdirSync(out, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 96, height: 96 } });
  for (const b of boxes) {
    const svg = fs.readFileSync(path.join(root, `icons/${b.kind}-${b.icon}.svg`), 'utf8').replace(/<!--[\s\S]*?-->/, '');
    const variants = [[`${b.kind}.png`, null]];
    variants.push([`${b.kind}-white.png`, '#ffffff']);
    for (const [file, ink] of variants) {
      const s = (ink ? svg.replace(/stroke="#[0-9a-f]{6}"/i, `stroke="${ink}"`) : svg).replace(/width="24"\s+height="24"/, 'width="96" height="96"');
      await page.setContent(`<html><body style="margin:0;background:transparent">${s}</body></html>`);
      await page.locator('svg').screenshot({ path: path.join(out, file), omitBackground: true });
    }
  }
  await browser.close();
  console.log('icons/png written');
})();
