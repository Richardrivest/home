/**
 * generate_marginalia.js
 * Plantilla "Marginalia Ledger" (formato_marginalia) — docx-template-library
 * Para análisis epistemológicos, notas de fuente, informes de investigación y mapas
 * argumentativos. Sistema de diseño: estados epistémicos tipificados (siete tipos),
 * columna de margen con chip + ancla de página, tres capas separadas (Fuente dice /
 * Infiero / Crítica), escala de evidencia L1–L5.
 *
 * Uso:  node generate_marginalia.js [tipo] [salida.docx]
 *   tipo = guia | analisis | fuente | informe | mapa | todo   (por defecto: todo)
 *
 * Para contenido real: copiar este archivo, reemplazar los textos entre corchetes en
 * las funciones pagina*() y llamar a los helpers (encabezado, tablaEstados, fila,
 * grilla) las veces que haga falta. NO tocar la paleta, las fuentes ni los estilos:
 * son la identidad fija del formato.
 *
 * Estilos definidos (nombres visibles en Word):
 *  - Párrafo por tipo: ML Afirmación, ML Evidencia, ML Garantía, ML Supuesto,
 *    ML Refutación, ML Interpretación, ML Pregunta abierta (línea con tinte)
 *  - Carácter (chip): ML Chip <tipo>
 *  - Voces: ML Título, ML Meta (mono, versalitas), ML Cita de fuente (serif),
 *    ML Análisis (sans), ML Celda, ML Nota; Título 1–3
 */

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, AlignmentType, Footer, PageNumber, PageBreak,
} = require("docx");

// ---- Paleta (tema claro del sistema Marginalia Ledger) ----
const C = { sup0: "FBFBF9", sup2: "E8EBE6", tinta: "1C2320", apagado: "4A5651", regla: "C9CFC7",
  ev: ["CFE3E0", "9EC8C3", "62A39D", "2F7A75", "14514F"] };
// [color fuerte, tinte]
const T = {
  afirmacion: ["2A4D8F", "E1E8F5"], evidencia: ["21704F", "DCEFE6"], garantia: ["565F6B", "E6E8EB"],
  supuesto: ["94570A", "F6E8D2"], refutacion: ["A1383A", "F6DFDF"], interpretacion: ["6A479B", "EBE3F5"],
  pregunta: ["1A6A75", "D9EDF0"],
};
const NOMBRE = { afirmacion: "Afirmación", evidencia: "Evidencia", garantia: "Garantía", supuesto: "Supuesto",
  refutacion: "Refutación", interpretacion: "Interpretación", pregunta: "Pregunta abierta" };
const GLIFO = { afirmacion: "◆", evidencia: "●", garantia: "→", supuesto: "▲", refutacion: "×", interpretacion: "◇", pregunta: "?" };
const DESCRIPCION = {
  afirmacion: "lo que la fuente sostiene, en una oración",
  evidencia: "apoyo ofrecido, con su nivel en la escala",
  garantia: "por qué la evidencia cuenta a favor de la afirmación",
  supuesto: "premisa que queda implícita",
  refutacion: "límite o condición en que falla",
  interpretacion: "tu propia lectura, nunca la del autor",
  pregunta: "sin resolver: necesita una fuente o una decisión",
};
const SERIF = "Georgia", SANS = "Calibri", MONO = "Consolas";
const id = (k) => "ML" + k[0].toUpperCase() + k.slice(1);

// ---- Estilos ----
const estilosParrafo = [
  { id: "Normal", name: "Normal", run: { font: SANS, size: 22, color: C.tinta }, paragraph: { spacing: { line: 300, after: 120 } } },
  { id: "Heading1", name: "heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
    run: { font: SERIF, size: 32, bold: true, color: C.tinta }, paragraph: { spacing: { before: 360, after: 160 }, outlineLevel: 0, keepNext: true } },
  { id: "Heading2", name: "heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
    run: { font: SERIF, size: 26, bold: true, color: C.tinta }, paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 1, keepNext: true } },
  { id: "Heading3", name: "heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
    run: { font: MONO, size: 18, bold: true, color: C.apagado, allCaps: true, characterSpacing: 12 }, paragraph: { spacing: { before: 240, after: 80 }, outlineLevel: 2, keepNext: true } },
  { id: "MLTitulo", name: "ML Título", basedOn: "Normal", next: "Normal", quickFormat: true,
    run: { font: SERIF, size: 44, bold: true, color: C.tinta }, paragraph: { spacing: { before: 0, after: 120 } } },
  { id: "MLMeta", name: "ML Meta", basedOn: "Normal", quickFormat: true,
    run: { font: MONO, size: 17, color: C.apagado, allCaps: true, characterSpacing: 12 }, paragraph: { spacing: { line: 240, after: 40 } } },
  { id: "MLCita", name: "ML Cita de fuente", basedOn: "Normal", quickFormat: true,
    run: { font: SERIF, size: 23, color: C.tinta }, paragraph: { spacing: { line: 320, after: 80 } } },
  { id: "MLAnalisis", name: "ML Análisis", basedOn: "Normal", quickFormat: true,
    run: { font: SANS, size: 22, color: C.tinta }, paragraph: { spacing: { line: 300, after: 80 } } },
  { id: "MLCelda", name: "ML Celda", basedOn: "Normal", quickFormat: true,
    run: { font: SANS, size: 20, color: C.tinta }, paragraph: { spacing: { line: 260, after: 40 } } },
  { id: "MLNota", name: "ML Nota", basedOn: "Normal", quickFormat: true,
    run: { font: SANS, size: 18, italics: true, color: C.apagado }, paragraph: { spacing: { after: 80 } } },
];
for (const k of Object.keys(T)) {
  estilosParrafo.push({ id: id(k), name: "ML " + NOMBRE[k], basedOn: "MLAnalisis", quickFormat: true,
    paragraph: { shading: { type: ShadingType.CLEAR, fill: T[k][1], color: "auto" }, spacing: { line: 300, before: 40, after: 40 }, indent: { left: 80, right: 80 } } });
}
const estilosCaracter = Object.keys(T).map((k) => ({ id: "MLChip" + id(k).slice(2), name: "ML Chip " + NOMBRE[k], quickFormat: true,
  run: { font: MONO, size: 16, bold: true, allCaps: true, characterSpacing: 10, color: C.tinta,
    shading: { type: ShadingType.CLEAR, fill: T[k][1], color: "auto" },
    border: { style: BorderStyle.SINGLE, size: 4, color: T[k][0], space: 1 } } }));

// ---- Helpers ----
const ANCHO = 9360, ANCHO_MARGEN = 2520, ANCHO_CUERPO = 6840;
const hair = { style: BorderStyle.SINGLE, size: 4, color: C.regla };
const bordes = { top: hair, bottom: hair, left: hair, right: hair };
const P = (texto, estilo = "MLAnalisis", extra = {}) => new Paragraph({ style: estilo, ...extra, children: [new TextRun(texto)] });
const meta = (texto) => new Paragraph({ style: "MLMeta", children: [new TextRun(texto)] });
const h = (nivel, texto) => new Paragraph({ style: "Heading" + nivel, children: [new TextRun(texto)] });
const chip = (k) => new TextRun({ text: ` ${GLIFO[k]} ${NOMBRE[k]} `, style: "MLChip" + id(k).slice(2) });
const celda = (ancho, hijos, relleno) => new TableCell({ width: { size: ancho, type: WidthType.DXA }, borders: bordes,
  shading: relleno ? { type: ShadingType.CLEAR, fill: relleno, color: "auto" } : undefined,
  margins: { top: 100, bottom: 100, left: 140, right: 140 }, children: hijos });
const saltoPagina = () => new Paragraph({ children: [new PageBreak()] });

// Fila de estado: celda de margen (chip + ancla) | celda de contenido con rótulo de capa.
// capa: "fuente" (serif, fondo elevado) | "infiero" | "critica" (tinte del tipo)
function fila(tipo, ancla, rotulo, texto, capa = "infiero") {
  const estilo = capa === "fuente" ? "MLCita" : id(tipo);
  return new TableRow({ cantSplit: true, children: [
    celda(ANCHO_MARGEN, [new Paragraph({ style: "MLMeta", children: [chip(tipo)] }), ...(ancla ? [meta(ancla)] : [])], C.sup2),
    celda(ANCHO_CUERPO, [meta(rotulo), P(texto, estilo)], capa === "fuente" ? C.sup0 : undefined),
  ] });
}
const tablaEstados = (filas) => new Table({ width: { size: ANCHO, type: WidthType.DXA }, columnWidths: [ANCHO_MARGEN, ANCHO_CUERPO], rows: filas });

function encabezado(clase, titulo) {
  const campos = [["Objeto", "[Texto, teoría, estudio o corpus, con cita completa]"], ["Pregunta", "[La única pregunta que este archivo le hace al objeto]"],
    ["Postura", "[Paradigma o lente aplicado]"], ["Estado", "[Borrador / En disputa / Consolidado]"], ["Confianza", "[●●●○○  criterio en palabras]"]];
  return [meta(clase), new Paragraph({ style: "MLTitulo", children: [new TextRun(titulo)] }),
    new Table({ width: { size: ANCHO, type: WidthType.DXA }, columnWidths: [2000, ANCHO - 2000],
      rows: campos.map(([a, b]) => new TableRow({ cantSplit: true, children: [celda(2000, [meta(a)], C.sup2), celda(ANCHO - 2000, [P(b, "MLCelda")])] })) })];
}
// Grilla genérica. rellenos[i] = (texto) => color | undefined
function grilla(anchos, cabecera, filas, rellenos = []) {
  const total = anchos.reduce((a, b) => a + b, 0);
  return new Table({ width: { size: total, type: WidthType.DXA }, columnWidths: anchos, rows: [
    new TableRow({ tableHeader: true, children: cabecera.map((t, i) => celda(anchos[i], [meta(t)], C.sup2)) }),
    ...filas.map((f) => new TableRow({ cantSplit: true, children: f.map((t, i) => celda(anchos[i], [P(t, "MLCelda")], rellenos[i] ? rellenos[i](t) : undefined)) })),
  ] });
}
const linaje = () => [h(3, "Linaje"), P("Deriva de: [ ]", "MLCelda"), P("Discutido por: [ ]", "MLCelda"), P("Aplicado en: [ ]", "MLCelda")];
const nivelRelleno = (t) => { const m = /L([1-5])/.exec(t); return m ? C.ev[m[1] - 1] : undefined; };

// ---- Páginas ----
function paginaGuia() {
  const k = Object.keys(T);
  const niveles = [[5, "Revisión sistemática, metaanálisis", "Búsqueda agrupada, valorada y reproducible"], [4, "Diseño controlado o robusto", "Ensayo, cuasi-experimento sólido, diseño mixto riguroso"],
    [3, "Observacional, cualitativo, caso", "Cohorte, casos y controles, etnografía, caso documentado"], [2, "Consenso de expertos, teoría", "Guía sin revisión completa, argumento conceptual"],
    [1, "Anécdota, opinión", "Informe único, editorial, afirmación sin documentar"]];
  return [
    meta("Marginalia Ledger · Estilos de Word"),
    new Paragraph({ style: "MLTitulo", children: [new TextRun("Plantillas para análisis epistemológicos y archivos de investigación")] }),
    P("Cada enunciado analítico toma exactamente un tipo. Fuente, interpretación y crítica se mantienen en capas separadas."),
    h(2, "Estilos de enunciado"),
    new Table({ width: { size: ANCHO, type: WidthType.DXA }, columnWidths: [ANCHO_MARGEN, ANCHO_CUERPO], rows: k.map((t) => new TableRow({ cantSplit: true, children: [
      celda(ANCHO_MARGEN, [new Paragraph({ style: "MLMeta", children: [chip(t)] })], C.sup2),
      celda(ANCHO_CUERPO, [new Paragraph({ style: id(t), children: [new TextRun(`ML ${NOMBRE[t]}: `), new TextRun({ text: DESCRIPCION[t], italics: true })] })]) ] })) }),
    h(2, "Estilos de voz"),
    grilla([ANCHO_MARGEN, ANCHO_CUERPO], ["Estilo", "Uso"], [["ML Título", "Título del archivo (serif)"], ["Título 1 a 3", "Secciones; Título 3 es un rótulo mono"],
      ["ML Cita de fuente", "Cita o paráfrasis cercana, con página (serif)"], ["ML Análisis", "Tu análisis (sans)"], ["ML Meta", "Chips, rótulos, anclas de página (mono, versalitas)"],
      ["ML Celda", "Texto de tablas"], ["ML Nota", "Salvedades y notas con daga (†)"]]),
    P("Fuentes: Georgia, Calibri y Consolas, para que el archivo se vea igual en cualquier equipo.", "MLNota", { spacing: { before: 120 } }),
    h(2, "Escala de evidencia"),
    new Table({ width: { size: ANCHO, type: WidthType.DXA }, columnWidths: [900, 3000, 5460], rows: niveles.map(([n, a, b]) => new TableRow({ cantSplit: true, children: [
      celda(900, [meta("L" + n)], C.ev[n - 1]), celda(3000, [P(a, "MLCelda")]), celda(5460, [P(b, "MLCelda")])] })) }),
    P("La escala describe el tipo de apoyo. La certeza de un cuerpo de evidencia se valora aparte con los dominios GRADE (Guyatt et al., 2008, p. 924†).", "MLNota", { spacing: { before: 120 } }),
  ];
}
function paginaAnalisis() {
  return [
    ...encabezado("Plantilla A · Análisis epistemológico", "[Título del análisis]"),
    h(1, "Anatomía del argumento"),
    tablaEstados([
      fila("afirmacion", "[p. ]", "La fuente dice", "[La afirmación de la fuente en una oración]", "fuente"),
      fila("evidencia", "[p. ]  ·  L[ ]", "La fuente dice", "[Evidencia ofrecida, con página]", "fuente"),
      fila("garantia", "[p. ]", "La fuente dice", "[El puente entre evidencia y afirmación]", "fuente"),
      fila("interpretacion", "", "Infiero", "[Tu lectura, marcada como tuya]"),
      fila("refutacion", "", "Crítica", "[Límite o condición en que falla]"),
      fila("pregunta", "", "Abierta", "[Qué fuente o decisión la resolvería]"),
    ]),
    h(1, "Auditoría de supuestos"),
    grilla([2700, 1500, 900, 3060, 1200], ["Supuesto", "Tipo", "Explícito", "Si es falso", "Conf. 1–5"],
      [["[ ]", "[Ontológico / epistemológico / metodológico]", "[Sí/No]", "[Consecuencia]", "[ ]"], ["[ ]", "[ ]", "[ ]", "[ ]", "[ ]"], ["[ ]", "[ ]", "[ ]", "[ ]", "[ ]"]],
      [null, () => T.supuesto[1]]),
    h(1, "Ajuste paradigmático"), P("[Comparar con programas o paradigmas nombrados. Declarar la lente usada.]"),
    h(1, "Límites"), P("[ ]"),
    h(1, "Veredicto"), P("[Un párrafo. Declarar la confianza y su criterio.]"),
    ...linaje(),
  ];
}
function paginaFuente() {
  return [
    ...encabezado("Plantilla B · Nota de fuente", "[Título breve de la fuente]"),
    h(3, "Referencia (APA-7)"), P("[Autor, A. A. (Año). Título. Editorial.]  Nivel de evidencia: L[ ]"),
    h(3, "Enunciados"),
    tablaEstados([
      fila("afirmacion", "[p. ]", "La fuente dice", "[Tesis]", "fuente"),
      fila("evidencia", "[p. ]  ·  L[ ]", "La fuente dice", "[Método y evidencia principal]", "fuente"),
      fila("interpretacion", "", "Infiero", "[Qué significa para mi pregunta]"),
      fila("refutacion", "", "Crítica", "[Puntos débiles]"),
    ]),
    h(3, "Citas clave"),
    P("1. «[Cita]» ([Autor], [Año], p. [ ])", "MLCita"), P("2. «[Cita]» ([Autor], [Año], p. [ ])", "MLCita"), P("3. «[Cita]» ([Autor], [Año], p. [ ])", "MLCita"),
    ...linaje(),
  ];
}
function paginaInforme() {
  return [
    ...encabezado("Plantilla C · Informe de investigación", "[Título del informe]"),
    h(1, "Estrategia de búsqueda"), P("[Bases, fechas, términos, criterios de inclusión y exclusión]"),
    h(1, "Síntesis de la evidencia"),
    grilla([2400, 1900, 1000, 2560, 1500], ["Fuente (Autor, Año)", "Diseño", "Nivel", "Hallazgo principal", "Riesgo de sesgo"],
      [["[ ]", "[ ]", "[L1–L5]", "[ ]", "[ ]"], ["[ ]", "[ ]", "[ ]", "[ ]", "[ ]"], ["[ ]", "[ ]", "[ ]", "[ ]", "[ ]"]], [null, null, nivelRelleno]),
    h(1, "Contradicciones"),
    tablaEstados([fila("afirmacion", "", "Posición A", "[ ]"), fila("refutacion", "", "Posición B", "[ ]"), fila("interpretacion", "", "Infiero", "[Por qué difieren]")]),
    h(1, "Certeza"),
    grilla([3000, 1800, 4560], ["Desenlace o afirmación", "Certeza", "Razón"], [["[ ]", "[Alta / Moderada / Baja / Muy baja]", "[ ]"], ["[ ]", "[ ]", "[ ]"]]),
    h(1, "Vacíos"), tablaEstados([fila("pregunta", "", "Abierta", "[ ]"), fila("pregunta", "", "Abierta", "[ ]")]),
    h(1, "Referencias"), P("[Lista APA-7 con sangría francesa]"),
  ];
}
function paginaMapa() {
  return [
    ...encabezado("Plantilla D · Mapa argumentativo", "[Título del mapa]"),
    h(3, "Mapa"),
    new Table({ width: { size: ANCHO, type: WidthType.DXA }, columnWidths: [ANCHO], rows: [new TableRow({ height: { value: 4200, rule: "atLeast" },
      children: [celda(ANCHO, [P("[Insertar aquí el diagrama exportado de Whimsical, Lucid o tldraw]", "MLNota")], C.sup0)] })] }),
    h(3, "Leyenda"),
    grilla([ANCHO_MARGEN, ANCHO_CUERPO], ["Arista", "Significado"], [["Línea continua", "apoya"], ["Línea punteada", "presupone (supuesto → paso que sostiene)"],
      ["Línea de trazos", "contradice (refutación → afirmación o supuesto)"], ["Grosor del borde", "fuerza de la evidencia: más grueso, más fuerte"]]),
    h(3, "Lectura"), tablaEstados([fila("interpretacion", "", "Infiero", "[Un párrafo que nombre el eslabón más débil]")]),
    ...linaje(),
  ];
}
const PAGINAS = { guia: paginaGuia, analisis: paginaAnalisis, fuente: paginaFuente, informe: paginaInforme, mapa: paginaMapa };

// ---- Ensamblado ----
function crearDocumento(tipo = "todo") {
  const claves = tipo === "todo" ? Object.keys(PAGINAS) : [tipo];
  if (!claves.every((k) => PAGINAS[k])) throw new Error("tipo inválido: guia | analisis | fuente | informe | mapa | todo");
  const hijos = [];
  claves.forEach((k, i) => { if (i) hijos.push(saltoPagina()); hijos.push(...PAGINAS[k]()); });
  hijos.push(P("† Números de página marcados con daga: verificar contra la fuente antes de usar en un texto formal.", "MLNota", { spacing: { before: 240 } }));
  return new Document({
    creator: "Marginalia Ledger", title: "Marginalia Ledger",
    styles: { default: { document: { run: { font: SANS, size: 22 } } }, paragraphStyles: estilosParrafo, characterStyles: estilosCaracter },
    sections: [{ properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
      footers: { default: new Footer({ children: [new Paragraph({ style: "MLMeta", alignment: AlignmentType.RIGHT,
        children: [new TextRun("Marginalia Ledger · "), new TextRun({ children: [PageNumber.CURRENT] })] })] }) },
      children: hijos }],
  });
}

module.exports = { crearDocumento, fila, tablaEstados, encabezado, grilla, chip, PAGINAS };

if (require.main === module) {
  const tipo = process.argv[2] || "todo";
  const salida = process.argv[3] || `marginalia_${tipo}.docx`;
  Packer.toBuffer(crearDocumento(tipo)).then((b) => { fs.writeFileSync(salida, b); console.log("ok:", salida); });
}
