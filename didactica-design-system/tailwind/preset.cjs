// Tailwind preset generated from tokens/tokens.json.
// Every colour, length and stroke resolves to the CSS custom property that
// dist/tokens.css declares, so switching data-theme re-skins utilities too.
const tokens = require('../tokens/tokens.json');

const v = (name) => `var(--${name})`;
const colors = Object.fromEntries(tokens.color.tokens.map((t) => [t.name, v(t.name)]));
const spacing = Object.fromEntries(
  tokens.spacing.tokens.map((t) => [t.name.replace(/^space-/, ''), v(t.name)])
);
const borderWidth = Object.fromEntries(
  tokens.stroke.tokens.map((t) => [t.name.replace(/^stroke-/, ''), v(t.name)])
);
const borderRadius = Object.fromEntries(
  tokens.radius.tokens.map((t) => [t.name.replace(/^radius-/, ''), v(t.name)])
);
const fontFamily = Object.fromEntries(
  Object.keys(tokens.type.families).map((k) => [k, v(`font-${k}`)])
);
const fontSize = {};
for (const group of tokens.type.groups) {
  for (const s of group.styles) {
    fontSize[`type-${s.name}`] = [s.fontSize, { lineHeight: String(s.lineHeight), fontWeight: String(s.fontWeight) }];
  }
}

module.exports = {
  theme: {
    extend: { colors, spacing, borderWidth, borderRadius, fontFamily, fontSize, maxWidth: { measure: v('measure') } },
  },
};
