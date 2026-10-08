import { test } from 'node:test';
import assert from 'node:assert/strict';
import { referenceText, authorList, orderWorks, yearLabels } from '../src/references.js';
import { citationKeys, referenceKey, referenceRules } from '../lint/text-rules.mjs';

const A = (family, given) => ({ family, given });

test('book with edition, two authors', () => {
  assert.equal(
    referenceText({ type: 'book', authors: [A('Biggs', 'John'), A('Tang', 'Catherine')], year: 2011, title: 'Teaching for quality learning at university', edition: 4, publisher: 'Open University Press' }),
    'Biggs, J., & Tang, C. (2011). Teaching for quality learning at university (4.ª ed.). Open University Press.'
  );
});

test('journal article with DOI; page range with en dash', () => {
  assert.equal(
    referenceText({ type: 'article', authors: [{ family: 'Roediger', given: 'H. L.', suffix: 'III' }, A('Karpicke', 'J. D.')], year: 2006, title: 'Test-enhanced learning: Taking memory tests improves long-term retention', journal: 'Psychological Science', volume: 17, issue: 3, pages: '249-255', doi: '10.1111/j.1467-9280.2006.01693.x' }),
    'Roediger, H. L., III, & Karpicke, J. D. (2006). Test-enhanced learning: Taking memory tests improves long-term retention. Psychological Science, 17(3), 249–255. https://doi.org/10.1111/j.1467-9280.2006.01693.x'
  );
});

test('book chapter with editor and pages', () => {
  assert.equal(
    referenceText({ type: 'chapter', authors: [A('van Gog', 'Tamara')], year: 2014, title: 'The signaling (or cueing) principle in multimedia learning', editors: [A('Mayer', 'Richard E.')], container: 'The Cambridge handbook of multimedia learning', edition: 2, pages: '263-278', publisher: 'Cambridge University Press' }),
    'van Gog, T. (2014). The signaling (or cueing) principle in multimedia learning. En R. E. Mayer (Ed.), The Cambridge handbook of multimedia learning (2.ª ed., pp. 263–278). Cambridge University Press.'
  );
});

test('group author and web page', () => {
  assert.equal(
    referenceText({ type: 'web', authors: [{ literal: 'World Wide Web Consortium' }], year: 2023, title: 'Web Content Accessibility Guidelines (WCAG) 2.2', url: 'https://www.w3.org/TR/WCAG22/' }),
    'World Wide Web Consortium. (2023). Web Content Accessibility Guidelines (WCAG) 2.2. https://www.w3.org/TR/WCAG22/'
  );
});

test('author lists: up to 20 names, then first 19 … last', () => {
  assert.equal(authorList([A('Uno', 'A.')]), 'Uno, A.');
  const many = Array.from({ length: 22 }, (_, i) => A(`Autor${i + 1}`, 'X.'));
  const s = authorList(many);
  assert.match(s, /Autor19, X\., \. \. \. Autor22, X\.$/);
  assert.doesNotMatch(s, /Autor20/);
});

test('APA order and a/b suffixes for same author and year', () => {
  const works = [
    { id: 'b', authors: [A('Sweller', 'J.')], year: 1988, title: 'Zeta' },
    { id: 'a', authors: [A('Ausubel', 'D. P.')], year: 1968, title: 'X' },
    { id: 'c', authors: [A('Sweller', 'J.')], year: 1988, title: 'Alfa' },
  ];
  assert.deepEqual(orderWorks(works).map((w) => w.id), ['a', 'c', 'b']);
  assert.deepEqual(yearLabels(works), { a: '1968', c: '1988a', b: '1988b' });
});

test('citations ↔ references: missing is an error, uncited a warning, particles ignored', () => {
  const cited = citationKeys('Biggs y Tang (2011, p. 4) y (van Gog, 2014, p. 263)');
  const listed = [referenceKey('Biggs, J., & Tang, C. (2011). Teaching…'), referenceKey('Ausubel, D. P. (1968). Educational…')];
  const r = referenceRules(cited, listed);
  assert.deepEqual(r.map((i) => [i.rule, i.severity]), [['ref-missing', 'error'], ['ref-uncited', 'warning']]);
  assert.match(r[0].message, /gog, 2014/);
});
