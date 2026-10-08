// Constructive alignment (Biggs & Tang, 2011): every objective is practised by at
// least one activity, and no activity aims below the level of the objective it serves.
import { bloomLevel } from './bloom.js';

/** Objective ids default to O1, O2, … in order. */
export const objectiveId = (o, i) => o.id || `O${i + 1}`;

/**
 * Returns { rows, issues }. rows: one per objective with the activities that practise it.
 * issues: human-readable problems (objective without activity, activity below level,
 * activity pointing to an unknown objective).
 */
export function checkAlignment(objectives, activities) {
  const ids = objectives.map(objectiveId);
  const rows = objectives.map((o, i) => ({ id: ids[i], level: bloomLevel(o.level), text: o.text, activities: [], problems: [] }));
  const issues = [];
  activities.forEach((a, n) => {
    const num = n + 1;
    for (const ref of a.objectives || []) {
      const row = rows.find((r) => r.id === ref);
      if (!row) { issues.push(`Actividad ${num}: el objetivo ${ref} no existe.`); continue; }
      row.activities.push(num);
      const al = bloomLevel(a.level);
      if (al && row.level && al.level < row.level.level) {
        const msg = `Actividad ${num} (${al.name}) está por debajo del nivel de ${ref} (${row.level.name}).`;
        row.problems.push(msg); issues.push(msg);
      }
    }
  });
  for (const r of rows) if (!r.activities.length) { const msg = `${r.id} no tiene ninguna actividad.`; r.problems.push(msg); issues.push(msg); }
  return { rows, issues };
}
