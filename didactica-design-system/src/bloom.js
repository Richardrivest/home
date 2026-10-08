// Bloom's revised taxonomy (Anderson & Krathwohl, 2001): the uniform scale for
// every “Objetivos” box. Each objective starts with one of its level's verbs.
export const BLOOM = [
  { id: 'recordar', level: 1, name: 'Recordar', verbs: ['definir', 'enumerar', 'identificar', 'nombrar', 'reconocer', 'recuperar'] },
  { id: 'comprender', level: 2, name: 'Comprender', verbs: ['explicar', 'describir', 'clasificar', 'resumir', 'ejemplificar', 'interpretar'] },
  { id: 'aplicar', level: 3, name: 'Aplicar', verbs: ['aplicar', 'utilizar', 'resolver', 'implementar', 'ejecutar', 'demostrar'] },
  { id: 'analizar', level: 4, name: 'Analizar', verbs: ['analizar', 'comparar', 'distinguir', 'organizar', 'diferenciar', 'relacionar'] },
  { id: 'evaluar', level: 5, name: 'Evaluar', verbs: ['evaluar', 'juzgar', 'fundamentar', 'valorar', 'argumentar', 'criticar'] },
  { id: 'crear', level: 6, name: 'Crear', verbs: ['diseñar', 'elaborar', 'planificar', 'producir', 'construir', 'formular'] },
];
export const bloomLevel = (id) => BLOOM.find((b) => b.id === String(id).toLowerCase()) || null;
