# formato_marginalia — Marginalia Ledger

Script: `scripts/generate_marginalia.js` · Uso: `node generate_marginalia.js [guia|analisis|fuente|informe|mapa|todo] [salida.docx]`

Formato para análisis epistemológicos, notas de fuente, informes de investigación y mapas argumentativos. Codifica el estatus epistémico de cada enunciado. Sin marco de página (a diferencia de bitácora y notas). Página Carta, márgenes de 1".

## Fuentes
Títulos y citas de fuente: Georgia. Análisis: Calibri. Metadatos y chips: Consolas (versalitas). Para igualar el sistema web, cambiar por Source Serif 4, IBM Plex Sans e IBM Plex Mono en las constantes `SERIF`, `SANS`, `MONO`.

## Paleta (tema claro)
Neutros: sup0 `FBFBF9` (capa de fuente), sup2 `E8EBE6` (columna de margen, cabeceras), tinta `1C2320`, apagado `4A5651`, regla `C9CFC7`.
Tipos [fuerte / tinte]: Afirmación `2A4D8F`/`E1E8F5` · Evidencia `21704F`/`DCEFE6` · Garantía `565F6B`/`E6E8EB` · Supuesto `94570A`/`F6E8D2` · Refutación `A1383A`/`F6DFDF` · Interpretación `6A479B`/`EBE3F5` · Pregunta abierta `1A6A75`/`D9EDF0`.
Escala de evidencia L1 a L5 (un solo matiz): `CFE3E0`, `9EC8C3`, `62A39D`, `2F7A75`, `14514F`.
El color nunca lleva el significado solo: cada tipo tiene glifo, rótulo y tinte.

## Tipos de enunciado (vocabulario cerrado)
◆ Afirmación · ● Evidencia (con nivel L1–L5) · → Garantía · ▲ Supuesto · × Refutación · ◇ Interpretación · ? Pregunta abierta.
Un enunciado, un tipo, un chip. La interpretación nunca va en la capa de fuente.

## Estilos de Word
- Párrafo: `ML Afirmación`, `ML Evidencia`, `ML Garantía`, `ML Supuesto`, `ML Refutación`, `ML Interpretación`, `ML Pregunta abierta` (línea con tinte del tipo).
- Carácter (chip): `ML Chip <tipo>`: mono, versalitas, tinte de fondo y borde fuerte.
- Voces: `ML Título`, `ML Meta`, `ML Cita de fuente`, `ML Análisis`, `ML Celda`, `ML Nota`; Título 1 a 3 (Título 3 es un rótulo mono).

## Estructura fija
1. **Encabezado epistémico** (tabla): Objeto, Pregunta, Postura, Estado, Confianza (●●●○○ + criterio en palabras).
2. **Fila de estado**: celda de margen (2520 DXA, `sup2`) con chip y ancla de página; celda de contenido (6840 DXA) con rótulo de capa: *La fuente dice* (serif, fondo `sup0`) / *Infiero* / *Crítica* / *Abierta*.
3. **Pie de linaje**: Deriva de, Discutido por, Aplicado en.
4. Pie de página: "Marginalia Ledger · n".

## Plantillas
- **guia**: estilos y escala de evidencia.
- **analisis**: encabezado, anatomía del argumento, auditoría de supuestos, ajuste paradigmático, límites, veredicto, linaje.
- **fuente**: referencia APA-7, enunciados, tres citas clave, linaje.
- **informe**: búsqueda, síntesis con nivel L1–L5 sombreado, contradicciones, certeza, vacíos, referencias.
- **mapa**: recuadro para diagrama exportado, leyenda de aristas (continua = apoya, punteada = presupone, de trazos = contradice), lectura.

## Notas
- Marcar con † cualquier número de página no verificado.
- Las citas del contenido real siguen APA-7 con autor, año y página.
- Los helpers `fila`, `tablaEstados`, `encabezado`, `grilla` se exportan; usarlos las veces que haga falta.
