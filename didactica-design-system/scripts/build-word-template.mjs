// Builds the Word template from the design tokens:
//   templates/Didactica-Universitaria.dotx          — the template authors start from
//   templates/Didactica-Universitaria-muestra.docx  — the same content as a document, for preview
// Word styles mirror the type tokens (px × 0.75 = pt). The nine boxes are single-cell tables
// in their three family shapes (open: filled header band; text: heavy top rule; close: frame).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, Header, Footer,
  PageNumber, AlignmentType, BorderStyle, ShadingType, WidthType, LevelFormat, TableLayoutType,
  HeadingLevel, TableOfContents, PageBreak, VerticalAlign,
} from 'docx';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const T = JSON.parse(fs.readFileSync(path.join(root, 'tokens/tokens.json'), 'utf8'));
const BOXES = JSON.parse(fs.readFileSync(path.join(root, 'src/boxes.config.json'), 'utf8'));
const { BLOOM } = await import(path.join(root, 'src/bloom.js'));

const C = Object.fromEntries(T.color.tokens.map((t) => [t.name, (typeof t.value === 'string' ? t.value : t.value.light).replace('#', '').toUpperCase()]));
const SERIF = 'Cambria';
const SANS = 'Calibri';
const pt = (n) => Math.round(n * 2); // half-points
const W = 9360; // text block, 6.5in in DXA
const icon = (kind, white = false) => fs.readFileSync(path.join(root, `icons/png/${kind}${white ? '-white' : ''}.png`));

// ---------- inline markup: **bold**, _italic_, {accent:text} ----------
function runs(text, base = {}, accent) {
  const out = [];
  const re = /\*\*(.+?)\*\*|_(.+?)_|\{accent:(.+?)\}/g;
  let last = 0; let m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(new TextRun({ ...base, text: text.slice(last, m.index) }));
    if (m[1]) out.push(new TextRun({ ...base, text: m[1], bold: true }));
    if (m[2]) out.push(new TextRun({ ...base, text: m[2], italics: true }));
    if (m[3]) out.push(new TextRun({ ...base, text: m[3], bold: true, color: accent, font: SANS }));
    last = re.lastIndex;
  }
  if (last < text.length) out.push(new TextRun({ ...base, text: text.slice(last) }));
  return out;
}
const p = (text, style, opts = {}) => new Paragraph({ style, ...opts, children: runs(text, opts.run || {}, opts.accent) });

// ---------- styles ----------
const ps = (id, name, run, paragraph = {}, extra = {}) => ({ id, name, basedOn: 'Normal', next: 'Normal', quickFormat: true, run, paragraph, ...extra });
const paragraphStyles = [
  { id: 'Normal', name: 'Normal', quickFormat: true, run: { font: SERIF, size: pt(12), color: C.ink }, paragraph: { spacing: { after: 180, line: 384 }, alignment: AlignmentType.JUSTIFIED } },
  ps('Heading1', 'Heading 1', { font: SANS, size: pt(21), bold: true, color: C.navy }, { spacing: { before: 480, after: 240, line: 276 }, keepNext: true, keepLines: true, outlineLevel: 0, alignment: AlignmentType.LEFT }),
  ps('Heading2', 'Heading 2', { font: SANS, size: pt(17), bold: true, color: C.azure }, { spacing: { before: 480, after: 180, line: 300 }, keepNext: true, keepLines: true, outlineLevel: 1, alignment: AlignmentType.LEFT }),
  ps('Heading3', 'Heading 3', { font: SANS, size: pt(14), bold: true, color: C.ink }, { spacing: { before: 360, after: 120, line: 312 }, keepNext: true, keepLines: true, outlineLevel: 2, alignment: AlignmentType.LEFT }),
  ps('Unidad', 'Unidad (antetítulo)', { font: SANS, size: pt(10.5), bold: true, color: C.azure, allCaps: true, characterSpacing: 17 }, { spacing: { before: 0, after: 120 }, keepNext: true, alignment: AlignmentType.LEFT }),
  ps('Entradilla', 'Entradilla', { font: SERIF, size: pt(14), color: C.ink }, { spacing: { after: 360, line: 372 }, alignment: AlignmentType.LEFT }),
  ps('PortadaAntetitulo', 'Portada – antetítulo', { font: SANS, size: pt(10.5), bold: true, color: C.azure, allCaps: true, characterSpacing: 17 }, { alignment: AlignmentType.CENTER, spacing: { before: 2400, after: 240 } }),
  ps('PortadaTitulo', 'Portada – título', { font: SANS, size: pt(30), bold: true, color: C.navy }, { alignment: AlignmentType.CENTER, spacing: { after: 240, line: 264 } }),
  ps('PortadaSubtitulo', 'Portada – subtítulo', { font: SERIF, size: pt(14), italics: true, color: C.ink }, { alignment: AlignmentType.CENTER, spacing: { after: 120 } }),
  ps('PortadaLema', 'Portada – descripción', { font: SERIF, size: pt(12), color: C['ink-muted'] }, { alignment: AlignmentType.CENTER, spacing: { after: 600 } }),
  ps('Cinta', 'Portada – cinta', { font: SANS, size: pt(10.5), color: C.navy }, { alignment: AlignmentType.CENTER, spacing: { before: 0, after: 600, line: 276 }, border: { top: { style: BorderStyle.SINGLE, size: 8, color: C.navy, space: 6 }, bottom: { style: BorderStyle.SINGLE, size: 8, color: C.navy, space: 6 } } }),
  ps('PortadaDatos', 'Portada – datos', { font: SERIF, size: pt(10.5), color: C['ink-muted'] }, { alignment: AlignmentType.CENTER, spacing: { after: 60 } }),
  ps('TablaNumero', 'Tabla o figura – número', { font: SANS, size: pt(12), bold: true, color: C.ink }, { spacing: { before: 360, after: 0 }, keepNext: true, alignment: AlignmentType.LEFT }),
  ps('TablaTitulo', 'Tabla o figura – título', { font: SERIF, size: pt(12), italics: true, color: C.ink }, { spacing: { after: 120 }, keepNext: true, alignment: AlignmentType.LEFT }),
  ps('Nota', 'Nota de tabla o figura', { font: SERIF, size: pt(10.5), color: C['ink-muted'] }, { spacing: { before: 120, after: 360, line: 300 }, alignment: AlignmentType.LEFT }),
  ps('CeldaTabla', 'Tabla – celda', { font: SERIF, size: pt(10.5), color: C.ink }, { spacing: { before: 0, after: 0, line: 290 }, alignment: AlignmentType.LEFT }),
  ps('CeldaEncabezado', 'Tabla – encabezado', { font: SANS, size: pt(10.5), bold: true, color: C.navy }, { spacing: { before: 0, after: 0 }, alignment: AlignmentType.LEFT }),
  ps('CitaBloque', 'Cita en bloque (40+ palabras)', { font: SERIF, size: pt(12), color: C.ink }, { indent: { left: 720 }, spacing: { before: 120, after: 240, line: 384 } }),
  ps('Referencia', 'Referencia (sangría francesa)', { font: SERIF, size: pt(10.5), color: C.ink }, { indent: { left: 720, hanging: 720 }, spacing: { after: 120, line: 372 }, alignment: AlignmentType.LEFT }),
  ps('Glosario', 'Glosario – entrada', { font: SERIF, size: pt(12), color: C.ink }, { spacing: { after: 180, line: 372 } }),
  ps('RecuadroTitulo', 'Recuadro – título', { font: SANS, size: pt(10.5), bold: true, allCaps: true, characterSpacing: 12 }, { spacing: { before: 0, after: 0 }, alignment: AlignmentType.LEFT }),
  ps('RecuadroTexto', 'Recuadro – texto', { font: SERIF, size: pt(12), color: C.ink }, { spacing: { before: 0, after: 120, line: 372 }, alignment: AlignmentType.LEFT }),
  ps('Lista', 'Lista con viñetas', { font: SERIF, size: pt(12), color: C.ink }, { spacing: { after: 120, line: 372 } }),
  ps('Encabezado', 'Encabezado de página', { font: SANS, size: pt(9), color: C.running }, { alignment: AlignmentType.RIGHT, spacing: { after: 0 }, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.rule, space: 4 } } }),
  ps('Pie', 'Pie de página', { font: SANS, size: pt(9), color: C.running }, { alignment: AlignmentType.CENTER, spacing: { after: 0 } }),
  ps('Marcador', 'Marcador de posición (diagrama)', { font: SANS, size: pt(10.5), color: C['ink-muted'] }, { alignment: AlignmentType.CENTER, spacing: { before: 120, after: 120 }, border: { top: { style: BorderStyle.DASHED, size: 6, color: C['rule-strong'], space: 12 }, bottom: { style: BorderStyle.DASHED, size: 6, color: C['rule-strong'], space: 12 }, left: { style: BorderStyle.DASHED, size: 6, color: C['rule-strong'], space: 12 }, right: { style: BorderStyle.DASHED, size: 6, color: C['rule-strong'], space: 12 } } }),
];

// ---------- numbering ----------
const bulletLevels = ['●', '○', '■'].map((ch, i) => ({
  level: i, format: LevelFormat.BULLET, text: ch, alignment: AlignmentType.LEFT,
  style: { paragraph: { indent: { left: 720 * (i + 1), hanging: 360 } }, run: { color: C.azure, size: pt(8) } },
}));
const numbering = [{ reference: 'du-bullets', levels: bulletLevels }];
for (const b of BOXES) {
  const accent = C[`${b.kind}-accent`];
  numbering.push({ reference: `box-${b.kind}`, levels: [{ level: 0, format: LevelFormat.BULLET, text: '◆', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 360 } }, run: { color: accent, size: pt(8) } } }] });
  numbering.push({ reference: `num-${b.kind}`, levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 360 } }, run: { color: accent, bold: true, font: SANS } } }] });
}

// ---------- boxes ----------
const NONE = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const line = (color, size = 6) => ({ style: BorderStyle.SINGLE, size, color });
let instance = 0;

/** A box as a two-row single-column table: header (icon + title) and body. */
function box(kind, body, { extraTitle } = {}) {
  const b = BOXES.find((x) => x.kind === kind);
  const accent = C[`${kind}-accent`]; const surface = C[`${kind}-surface`]; const border = C[`${kind}-border`];
  const open = b.family === 'open'; const text = b.family === 'text';
  const titleColor = open ? 'FFFFFF' : accent;
  const header = new TableCell({
    width: { size: W, type: WidthType.DXA },
    shading: open ? { fill: accent, type: ShadingType.CLEAR, color: 'auto' } : (text ? { fill: surface, type: ShadingType.CLEAR, color: 'auto' } : undefined),
    margins: { top: 140, bottom: 140, left: 240, right: 240 },
    verticalAlign: VerticalAlign.CENTER,
    borders: { top: text ? line(accent, 24) : line(open ? accent : border), left: line(open ? accent : border), right: line(open ? accent : border), bottom: line(open ? accent : border, 4) },
    children: [new Paragraph({
      style: 'RecuadroTitulo',
      keepNext: true, // the header row never ends a page
      children: [
        new ImageRun({ type: 'png', data: icon(kind, open), transformation: { width: 18, height: 18 } }),
        new TextRun({ text: `  ${b.title}`, color: titleColor }),
        ...(extraTitle ? [new TextRun({ text: `   ·   ${extraTitle}`, color: titleColor })] : []),
      ],
    })],
  });
  instance += 1;
  const inst = instance;
  // Body lines keep with the next, so a short box moves to the next page whole
  // (the empty spacer paragraph after the table ends the chain).
  const bodyChildren = body.map((item) => {
    if (typeof item === 'string') return p(item, 'RecuadroTexto', { accent, keepNext: true });
    if (item.bullet) return new Paragraph({ style: 'RecuadroTexto', keepNext: true, numbering: { reference: `box-${kind}`, level: 0, instance: inst }, children: runs(item.bullet, {}, accent) });
    if (item.num) return new Paragraph({ style: 'RecuadroTexto', keepNext: true, numbering: { reference: `num-${kind}`, level: 0, instance: inst }, children: runs(item.num, {}, accent) });
    if (item.ref) return p(item.ref, 'Referencia', { keepNext: true });
    if (item.label) return new Paragraph({ style: 'RecuadroTexto', keepNext: true, spacing: { before: 120 }, children: [new TextRun({ text: item.label, bold: true, color: accent, font: SANS })] });
    return item;
  });
  const bodyCell = new TableCell({
    width: { size: W, type: WidthType.DXA },
    shading: b.family === 'close' ? undefined : { fill: surface, type: ShadingType.CLEAR, color: 'auto' },
    margins: { top: 200, bottom: 120, left: 240, right: 240 },
    borders: { top: NONE, left: line(open ? accent : border), right: line(open ? accent : border), bottom: line(open ? accent : border) },
    children: bodyChildren,
  });
  return [
    new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [W], layout: TableLayoutType.FIXED, rows: [new TableRow({ children: [header], cantSplit: true, tableHeader: false }), new TableRow({ children: [bodyCell] })] }),
    new Paragraph({ spacing: { after: 120 }, children: [] }),
  ];
}

// ---------- APA table ----------
function apaTable(number, title, columns, rows, widths, note, { rowHeader = false } = {}) {
  const wd = widths.map((f) => Math.round(W * f));
  wd[wd.length - 1] = W - wd.slice(0, -1).reduce((a, b) => a + b, 0);
  const strong = line(C['rule-strong'], 12);
  const hair = line(C.rule, 4);
  const head = new TableRow({
    tableHeader: true,
    children: columns.map((c, i) => new TableCell({
      width: { size: wd[i], type: WidthType.DXA }, shading: { fill: C.band, type: ShadingType.CLEAR, color: 'auto' },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      borders: { top: strong, bottom: strong, left: NONE, right: NONE },
      children: [p(c, 'CeldaEncabezado')],
    })),
  });
  const body = rows.map((r, ri) => new TableRow({
    cantSplit: true,
    children: r.map((cell, ci) => new TableCell({
      width: { size: wd[ci], type: WidthType.DXA },
      shading: (ri % 2 === 1 || (rowHeader && ci === 0)) ? { fill: C.band, type: ShadingType.CLEAR, color: 'auto' } : undefined,
      margins: { top: 60, bottom: 60, left: 120, right: 120 },
      borders: { top: NONE, left: NONE, right: NONE, bottom: ri === rows.length - 1 ? strong : hair },
      children: [rowHeader && ci === 0 ? p(cell, 'CeldaEncabezado') : p(cell, 'CeldaTabla')],
    })),
  }));
  return [
    p(`Tabla ${number}`, 'TablaNumero'),
    p(title, 'TablaTitulo'),
    new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: wd, layout: TableLayoutType.FIXED, rows: [head, ...body] }),
    p(`_Nota._ ${note}`, 'Nota'),
  ];
}

const figure = (number, title, placeholder, note) => [
  p(`Figura ${number}`, 'TablaNumero'),
  p(title, 'TablaTitulo'),
  p(placeholder, 'Marcador'),
  p(`_Nota._ ${note}`, 'Nota'),
];
const bullet = (t, level = 0) => new Paragraph({ style: 'Lista', numbering: { reference: 'du-bullets', level }, children: runs(t) });
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

// ---------- content ----------
const cover = [
  p('Manual de formación docente', 'PortadaAntetitulo'),
  p('[Título del manual]', 'PortadaTitulo'),
  p('[Subtítulo: alcance del manual]', 'PortadaSubtitulo'),
  p('[Descripción en una línea: disciplinas y destinatarios]', 'PortadaLema'),
  p('[Cinta: tipo de material]', 'Cinta'),
  p('Nivel: [destinatarios]', 'PortadaDatos'),
  p('Citación: APA 7.ª edición', 'PortadaDatos'),
  p('Año [aaaa]', 'PortadaDatos'),
  pageBreak(),
];

const toc = [
  new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('Índice')] }),
  new TableOfContents('Índice', { hyperlink: true, headingStyleRange: '1-3' }),
  p('_Haga clic derecho sobre el índice y elija “Actualizar campos” después de escribir._', 'Nota'),
  pageBreak(),
];

const howTo = [
  new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('Cómo usar esta plantilla')] }),
  p('Esta plantilla aplica el sistema de diseño Didáctica Universitaria. Escriba con los estilos de la galería de Word, no con formato directo: así el documento conserva la tipografía, los colores y los espaciados del sistema, y puede pasarse a la web sin pérdidas.'),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('Secuencia de cada unidad')] }),
  ...[
    '**Unidad (antetítulo)**, título con **Título 1** y **Entradilla**.',
    'Recuadro **Puntos Clave** (3 a 5 ideas de una línea) y, si lo desea, preguntas “Antes de leer”.',
    'Recuadro **Objetivos**, numerados O1, O2…, cada uno con su nivel de Bloom.',
    'Secciones numeradas (**Título 2** y **Título 3**) con texto, tablas, figuras y, cuando corresponda, los recuadros **Importante**, **Error Frecuente** y **En el Aula**.',
    'Cierre: **Para Seguir Pensando**, **Autoevaluación**, **Actividades**, tabla de alineamiento y **Referencias**.',
  ].map((t) => bullet(t)),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('Reglas de los recuadros')] }),
  ...[
    'Copie el recuadro que necesite desde el **Catálogo de recuadros** y reemplace el texto entre corchetes.',
    'Use como máximo un recuadro dentro del texto (Importante, Error Frecuente o En el Aula) cada 800 a 1.000 palabras.',
    'No coloque dos recuadros seguidos, salvo en las secuencias fijas de apertura y cierre. No anide recuadros ni ponga tablas o figuras dentro de ellos.',
  ].map((t) => bullet(t)),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('Citas y comillas (APA 7)')] }),
  ...[
    'Toda cita lleva autor, año y página: (Vygotsky, 1978, p. 86) o Vygotsky (1978, p. 86).',
    'Use “&” dentro del paréntesis y “y” en la cita narrativa: (Biggs & Tang, 2011, p. xx); Biggs y Tang (2011, p. xx).',
    'Con tres o más autores, escriba solo el primero seguido de “et al.”.',
    'Use comillas inglesas “…” y, dentro de ellas, ‘…’. No use comillas angulares ni comillas rectas.',
    'Las citas de 40 palabras o más van en párrafo aparte con el estilo **Cita en bloque**, sin comillas.',
    'Las referencias usan el estilo **Referencia (sangría francesa)**, en orden alfabético.',
  ].map((t) => bullet(t)),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('Verbos para los objetivos (taxonomía de Bloom revisada)')] }),
  p('Comience cada objetivo con un verbo de su nivel, según la Tabla 1, y ordénelos del nivel más bajo al más alto.'),
  ...apaTable(1, 'Niveles y verbos de la taxonomía de Bloom revisada', ['Nivel', 'Nombre', 'Verbos'],
    BLOOM.map((b) => [String(b.level), b.name, b.verbs.join(', ')]), [0.1, 0.2, 0.7],
    'Elaboración propia a partir de Anderson y Krathwohl (2001, p. xx).'),
  pageBreak(),
];

const catalogue = [
  new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('Catálogo de recuadros')] }),
  p('Copie el recuadro completo (seleccione la tabla) y péguelo donde corresponda. La forma indica la familia: franja de color al abrir la unidad, línea gruesa superior dentro del texto y solo marco al cerrar.'),
  ...box('keypoints', [{ bullet: '[Punto clave en una sola línea.]' }, { bullet: '[Punto clave en una sola línea.]' }, { bullet: '[Punto clave en una sola línea.]' }, { label: 'Antes de leer:' }, '[¿Pregunta para anticipar el contenido?]']),
  ...box('objectives', ['Al finalizar la unidad, usted será capaz de:', '{accent:O1}   {accent:2 · COMPRENDER}   [Explicar …]', '{accent:O2}   {accent:4 · ANALIZAR}   [Comparar …]', '{accent:O3}   {accent:6 · CREAR}   [Diseñar …]']),
  ...box('important', ['{accent:[Término]}', '[Definición del concepto clave] (Autor, año, p. x).']),
  ...box('mistake', ['{accent:Creencia frecuente:} [La creencia, enunciada con claridad.]', '{accent:Lo que muestra la evidencia:} [La refutación explícita] (Autor, año, p. x).', '{accent:Por qué no se sostiene:} [La explicación alternativa, o por qué la creencia resulta atractiva.]']),
  ...box('example', ['{accent:Situación:} [Un momento concreto de una clase.]', '{accent:Decisión didáctica:} [Lo que hace el docente.]', '{accent:Fundamento:} [Por qué, con su cita] (Autor, año, p. x).'], { extraTitle: '[Ciencias Sociales | Ciencias de la Salud]' }),
  ...box('thinking', [{ num: '[Pregunta abierta, sin respuesta única.]' }, { num: '[Pregunta abierta que conecte la unidad con la práctica.]' }]),
  ...box('selfcheck', [{ num: '[Pregunta de recuperación sobre una idea central.]' }, { num: '[Pregunta de recuperación.]' }, { num: '[REPASO · Unidad N] [Pregunta sobre una unidad anterior.]' }, { label: 'Clave de respuestas' }, '1. [Respuesta.]  2. [Respuesta.]  3. [Respuesta.]']),
  ...box('activities', [{ num: '{accent:TAREA · 4 · ANALIZAR · O2}  [Consigna en modo imperativo de usted.]' }, { num: '{accent:PREGUNTA · 2 · COMPRENDER · O1}  [Pregunta.]' }]),
  ...box('references', [{ ref: '[Apellido, A. A.] ([año]). _[Título del libro en cursiva]_. [Editorial].' }, { ref: '[Apellido, A. A., & Apellido, B. B.] ([año]). [Título del artículo]. _[Revista, volumen]_([número]), [pp.–pp.]. https://doi.org/[…]' }]),
  pageBreak(),
];

const unit = [
  p('Unidad [N]', 'Unidad'),
  new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('[Título de la unidad]')] }),
  p('[Entradilla: una o dos oraciones que presentan la unidad.]', 'Entradilla'),
  ...box('keypoints', [{ bullet: '[Punto clave.]' }, { bullet: '[Punto clave.]' }, { bullet: '[Punto clave.]' }]),
  ...box('objectives', ['Al finalizar la unidad, usted será capaz de:', '{accent:O1}   {accent:2 · COMPRENDER}   [Explicar …]', '{accent:O2}   {accent:4 · ANALIZAR}   [Comparar …]']),
  new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('[N.1. Título de la sección]')] }),
  p('[Texto. Cite siempre con autor, año y página: Autor (año, p. x) o (Autor, año, p. x). Anuncie las figuras y tablas antes de que aparezcan, como en la Figura 1.]'),
  ...figure(1, '[Título de la figura en cursiva]', '[Inserte aquí el diagrama: red conceptual, ciclo, pirámide o flujo]', 'Elaboración propia a partir de Autor (año, p. x).'),
  new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun('[Subsección]')] }),
  p('[Texto que anuncia la tabla: como sintetiza la Tabla 2, …]'),
  ...apaTable(2, '[Título de la tabla en cursiva]', ['[Dimensión]', '[Concepto A]', '[Concepto B]'], [['[Fila]', '[…]', '[…]'], ['[Fila]', '[…]', '[…]'], ['[Fila]', '[…]', '[…]']], [0.22, 0.39, 0.39], 'Elaboración propia a partir de Autor (año, p. x).', { rowHeader: true }),
  p('[Texto.]'),
  p('[Cita textual de 40 palabras o más, sin comillas, con la cita después del punto final.] (Autor, año, p. x)', 'CitaBloque'),
  ...box('thinking', [{ num: '[Pregunta abierta.]' }]),
  ...box('selfcheck', [{ num: '[Pregunta.]' }, { label: 'Clave de respuestas' }, '1. [Respuesta.]']),
  ...box('activities', [{ num: '{accent:TAREA · 4 · ANALIZAR · O2}  [Consigna.]' }]),
  p('La Tabla 3 muestra qué actividades trabajan cada objetivo.'),
  ...apaTable(3, 'Alineamiento de la unidad', ['Objetivo', 'Nivel', 'Actividades', 'Estado'], [['O1', 'Comprender', '[n.º]', '[Alineado]'], ['O2', 'Analizar', '[n.º]', '[Alineado]']], [0.14, 0.22, 0.24, 0.4], 'Cada objetivo necesita al menos una actividad de su mismo nivel o superior.', { rowHeader: true }),
  ...box('references', [{ ref: '[Referencias de la unidad en APA 7, en orden alfabético.]' }]),
];

const doc = new Document({
  creator: 'Didáctica Universitaria',
  title: 'Plantilla Didáctica Universitaria',
  description: 'Plantilla de Word del sistema de diseño Didáctica Universitaria',
  features: { updateFields: true },
  styles: { default: { document: { run: { font: SERIF, size: pt(12) } } }, paragraphStyles },
  numbering: { config: numbering },
  sections: [{
    properties: { titlePage: true, page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440, header: 708, footer: 708 } } },
    headers: { default: new Header({ children: [p('[Título breve del manual]', 'Encabezado')] }), first: new Header({ children: [] }) },
    footers: { default: new Footer({ children: [new Paragraph({ style: 'Pie', children: [new TextRun({ children: ['Página ', PageNumber.CURRENT] })] })] }), first: new Footer({ children: [] }) },
    children: [...cover, ...toc, ...howTo, ...catalogue, ...unit],
  }],
});

const outDir = path.join(root, 'templates');
fs.mkdirSync(outDir, { recursive: true });
const docx = path.join(outDir, 'Didactica-Universitaria-muestra.docx');
fs.writeFileSync(docx, await Packer.toBuffer(doc));
// The template is the same package with the main part declared as a template.
execFileSync('python3', ['-I', path.join(root, 'scripts/docx-to-dotx.py'), docx, path.join(outDir, 'Didactica-Universitaria.dotx')], { stdio: 'inherit' });
console.log('templates/ written');
