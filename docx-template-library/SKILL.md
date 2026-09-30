---
name: docx-template-library
description: "Repertorio personal de formatos .docx de Ricardo Cabaña: (1) formato_apa7 — documento genérico APA-7 con 4 niveles de encabezado, Times New Roman 12pt, doble espacio, sin portada ni header; (2) formato_bitacora — Bitácora de Progreso en paleta terracota-beige-naranja con secciones fijas (Concepciones Previas, Desarrollo, Obstáculos/Dificultades, Resumen, Próximos Pasos, Interrogantes Abiertas) y marco de página; (3) formato_notas — Notas de Clase/Personales en paleta coral, Cornell híbrido (Claves/Notas, chip de categoría, boceto opcional, Términos Clave, Síntesis, Conexiones) y marco de página; (4) formato_marginalia — Marginalia Ledger: análisis epistemológicos, notas de fuente, informes de investigación y mapas argumentativos con siete tipos de enunciado (afirmación, evidencia, garantía, supuesto, refutación, interpretación, pregunta abierta), columna de margen y escala de evidencia L1–L5, sin marco. USAR SIEMPRE ante pedidos de un documento en 'formato APA-7', una 'bitácora de progreso/aprendizaje', 'notas de clase/personales/Cornell', o un 'análisis epistemológico / nota de fuente / informe de investigación / mapa argumentativo' — aunque no se mencione '.docx'. También ante 'mi plantilla de siempre' o pedidos de sumar un nuevo formato al repertorio."
license: Personal use — Ricardo Cabaña
---

# Repertorio de plantillas .docx

Cuatro formatos fijos, reutilizables para cualquier contenido. Cada uno es un
script `docx-js` parametrizable (no un archivo `.dotx` estático), porque el
contenido cambia en cada documento pero el formato debe mantenerse idéntico.

Esta skill define el formato. Para la mecánica de creación/edición/verificación
de `.docx` (gotchas de `docx-js`, cómo renderizar y revisar visualmente el
resultado, cómo editar un `.docx` existente), combinar siempre con la skill
pública **docx** — leerla también cuando se use esta.

| Formato | Cuándo usarlo | Script base | Spec completa |
|---|---|---|---|
| **formato_apa7** | Cualquier documento académico en normas APA-7 (informes, capítulos, trabajos) | `scripts/generate_apa7.js` | `references/apa7-format.md` |
| **formato_bitacora** | Bitácora de progreso / aprendizaje / práctica docente | `scripts/generate_bitacora.js` | `references/bitacora-format.md` |
| **formato_notas** | Notas de clase, notas personales, notas de lectura | `scripts/generate_notas.js` | `references/notas-format.md` |
| **formato_marginalia** | Análisis epistemológicos, notas de fuente, informes de investigación y mapas argumentativos con enunciados tipificados | `scripts/generate_marginalia.js` | `references/marginalia-format.md` |

## Flujo de trabajo

1. Identificar qué formato pidió el usuario (o inferirlo del contexto: un
   informe/capítulo con normas de citación → `formato_apa7`; un registro de
   avance de un proyecto o práctica → `formato_bitacora`; apuntes de una clase
   o lectura → `formato_notas`; un análisis epistemológico, nota de fuente, informe
   o mapa argumentativo con enunciados tipificados → `formato_marginalia`).
2. Leer el archivo de referencia correspondiente en `references/` para repasar
   la especificación exacta (colores en hex, tamaños, estructura fija).
3. Copiar el script de `scripts/` a un archivo de trabajo nuevo y reemplazar
   el contenido de ejemplo por el contenido real que pidió el usuario, **sin
   tocar** las constantes de color/fuente/márgenes ni las funciones de
   formato — esas son la identidad fija de cada plantilla.
   - En `formato_bitacora` y `formato_notas`, si hace falta más de una
     "sección doble" (tabla 2x2) o más de un bloque de notas Cornell, llamar
     a los helpers (`seccionDoble`, filas de `cuerpoCornell`) las veces que
     hagan falta — no está limitado a los ejemplos fijos del script base.
4. Ejecutar con `node <archivo>.js`.
5. Verificar el resultado igual que indica la skill **docx**: convertir a PDF
   con `soffice.py` y renderizar a JPEG con `pdftoppm`, mirar la imagen antes
   de entregarlo.

## Notas de diseño (por qué está hecho así)

- **APA-7**: la correspondencia de niveles fue definida explícitamente por
  Ricardo y difiere del uso más común de APA-7 (el "Título" del documento
  ocupa el lugar del nivel 1 centrado; los encabezados 1–4 del usuario
  corresponden a los niveles 2–5 de APA). No "corregir" esto asumiendo el
  esquema estándar. Sin portada ni encabezado de página (header) — decisión
  explícita.
- **Bitácora y Notas**: llevan variedad tonal dentro de su paleta (varias
  secciones/elementos con distintos tonos del mismo grupo cromático, no un
  solo color repetido) y un marco de línea continua alrededor del margen de
  toda la hoja. Esto NO aplica al formato APA-7, que debe mantenerse dentro
  de las normas (sin colores, sin marco).
- **Notas (formato_notas)**: combina deliberadamente tres variantes del
  método Cornell — código de color por categoría (chip CLASE/REPASO/PERSONAL),
  conexiones estilo Zettelkasten, y un espacio opcional de sketchnoting —
  para favorecer tanto el escaneo visual como la reutilización de las notas
  en trabajos posteriores (tesis, cátedra). El chip de categoría cambia de
  tono: `CORAL_OSCURO` = Clase, `CORAL_MEDIO` = Repaso, `CORAL_SUAVE` = Personal.

- **Marginalia (formato_marginalia)**: paleta neutra verde-grisácea con siete colores de función (uno por tipo de enunciado), columna de margen con chip y ancla de página, tres capas separadas (la fuente dice / infiero / crítica). Sin marco de página. El script acepta un tipo (`guia`, `analisis`, `fuente`, `informe`, `mapa`, `todo`) y exporta helpers para armar documentos con contenido real. Los números de página no verificados se marcan con †.

## Extender el repertorio

Para sumar un nuevo formato: crear `scripts/generate_<nombre>.js` siguiendo el
mismo patrón (constantes de estilo arriba, funciones helper de párrafo/tabla,
contenido de ejemplo reemplazable al final) y `references/<nombre>-format.md`
con la spec en prosa; agregar la fila correspondiente a la tabla de arriba.
