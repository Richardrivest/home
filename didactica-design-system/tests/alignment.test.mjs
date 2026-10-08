import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkAlignment } from '../src/alignment.js';

const OBJ = [{ level: 'comprender', text: 'Explicar' }, { level: 'analizar', text: 'Comparar' }, { level: 'crear', text: 'Diseñar' }];

test('aligned unit has no issues', () => {
  const { issues } = checkAlignment(OBJ, [
    { level: 'comprender', objectives: ['O1'] }, { level: 'analizar', objectives: ['O2'] }, { level: 'crear', objectives: ['O3'] },
  ]);
  assert.deepEqual(issues, []);
});

test('flags an objective without activity, a level below, and an unknown objective', () => {
  const { issues } = checkAlignment(OBJ, [{ level: 'comprender', objectives: ['O1'] }, { level: 'aplicar', objectives: ['O3', 'O9'] }]);
  assert.equal(issues.length, 3);
  assert.match(issues.join(' '), /O2 no tiene ninguna actividad/);
  assert.match(issues.join(' '), /por debajo del nivel de O3/);
  assert.match(issues.join(' '), /O9 no existe/);
});
