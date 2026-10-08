import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatCitation, formatCitations, formatLocator } from '../src/cite.js';

test('parenthetical uses &, narrative uses y', () => {
  const w = { authors: ['Biggs', 'Tang'], year: 2011, page: 45 };
  assert.equal(formatCitation(w), '(Biggs & Tang, 2011, p. 45)');
  assert.equal(formatCitation(w, { narrative: true }), 'Biggs y Tang (2011, p. 45)');
});

test('three or more authors become et al.', () => {
  assert.equal(formatCitation({ authors: ['Ambrose', 'Bridges', 'DiPietro'], year: 2010, page: 4 }), '(Ambrose et al., 2010, p. 4)');
});

test('page ranges take pp. and an en dash; locator replaces page', () => {
  assert.equal(formatLocator({ page: '257-285' }), 'pp. 257–285');
  assert.equal(formatLocator({ page: 12, locator: 'párr. 4' }), 'párr. 4');
});

test('several works are alphabetical and separated by ;', () => {
  const s = formatCitations([{ authors: ['Vygotsky'], year: 1978, page: 86 }, { authors: ['Ausubel'], year: 1968, page: 'vi' }]);
  assert.equal(s, '(Ausubel, 1968, p. vi; Vygotsky, 1978, p. 86)');
});
