// Greedy word wrap for SVG labels (SVG text does not wrap by itself).
export function wrap(text, max) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if (!line) line = w;
    else if ((line + ' ' + w).length <= max) line += ' ' + w;
    else { lines.push(line); line = w; }
  }
  if (line) lines.push(line);
  return lines;
}
// Approximate rendered width of a line at 14px Calibri/Carlito (≈ 0.5em per glyph).
export const textWidth = (s, px = 14) => s.length * px * 0.5;
