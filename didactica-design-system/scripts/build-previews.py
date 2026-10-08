# Writes README.md and preview.html for every component of the design-system page
# (artifact/project/components/<Name>/). Props and summaries come from
# src/components.meta.json; usage guidance, card height and the preview render live here.
# Run after `npm run export:artifact`:  npm run build:previews
import os, json
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT=ROOT+'/artifact/project/components'
meta={m['name']:m for m in json.load(open(ROOT+'/src/components.meta.json',encoding='utf-8'))}

V='const A={authors:["Ambrose","Bridges","DiPietro","Lovett","Norman"],year:2010,page:"xx"}, B={authors:["Biggs","Tang"],year:2011,page:"xx"}, VY={authors:["Vygotsky"],year:1978,page:86}, AU={authors:["Ausubel"],year:1968,page:"vi"};'

D = {}
def c(name, height, guide, render):
    D[name]=(height, guide, render)

c('Page',360,"""**Consumer provides:** `header` (the book's short title), `page`, and the content.

Wrap each screen page or print page in it. On screen it is a `paper` sheet with `shadow-page` on the `surface` backdrop. In print the shadow drops and margins come from the printer.

**Don't** put chapter titles in the running header, and don't use `running` for text that readers must read.""",
"""h(Page,{header:'Didáctica de la Educación Superior',page:12},h(Heading,{level:2},'2.2. La perspectiva sociocultural'),h(Paragraph,null,h(Cite,Object.assign({narrative:true},VY)),' desplazó el foco desde el individuo hacia la matriz social del aprendizaje.'))""")

c('TitlePage',470,"""**Consumer provides:** `title`, plus the optional `kicker`, `subtitle`, `lede`, `ribbon` and `meta` lines.

Keep it typographic, with no logo or images and one ribbon. Write metadata lines as “Clave: valor”.""",
"""h(TitlePage,{kicker:'Manual de formación docente',title:'Didáctica de la Educación Superior',subtitle:'Fundamentos, estrategias y evaluación para la docencia universitaria',lede:'Con desarrollos de didáctica general y de las didácticas específicas',ribbon:'Material de estudio para la formación del profesorado universitario',meta:['Nivel: graduados universitarios en formación pedagógica','Citación: APA 7.ª edición','Año 2026']})""")

c('TableOfContents',240,"""**Consumer provides:** `entries` `{ title, page, level? }` in reading order. Entry titles match the headings exactly, numbering included.""",
"""h(TableOfContents,{entries:[{title:'Unidad 1. La didáctica universitaria como campo',page:5},{title:'1.1. ¿Qué es la didáctica?',page:5,level:2},{title:'Unidad 2. Teorías del aprendizaje en la educación superior',page:12},{title:'2.1. Constructivismo y aprendizaje significativo',page:13,level:2}]})""")

c('ChapterOpener',230,"""**Consumer provides:** `number`, `title` (without “Unidad N.”) and a one- or two-sentence `lead`.

It opens every unit, and `KeyPoints` follows it directly. In print it starts a new page.""",
"""h(ChapterOpener,{number:2,title:'Teorías del aprendizaje en la educación superior',lead:'Toda decisión de enseñanza descansa, explícita o implícitamente, en una teoría acerca de cómo aprenden las personas.'})""")

c('Heading',200,"""Level 2 is for numbered sections (“2.1. …”) and level 3 for sub-sections. Level 1 is only for unnumbered unit-level sections such as Glosario or Galería; the unit title itself comes from `ChapterOpener`.

Use sentence case and never skip a level.""",
"""h('div',null,h(Heading,{level:1},'Glosario de términos clave'),h(Heading,{level:2},'2.1. Constructivismo y aprendizaje significativo'),h(Heading,{level:3},'Implicancias para la enseñanza'))""")

c('Paragraph',150,"""Body text is `body` in `ink`. It is left-aligned on screen and justified in print. Cite every claim with `Cite`, page included. Use “…” for quoted terms.""",
"""h(Paragraph,null,'La investigación distinguió un enfoque superficial, orientado a reproducir, de uno profundo, orientado a comprender y otorgar sentido ',h(Cite,B),'. El enfoque no es solo un rasgo del estudiante: lo induce, sobre todo, el modo en que se evalúa.')""")

c('BulletList',170,"""**Consumer provides:** `items` (strings, or `{ text, items }` for a nested level).

Use it in running text. Inside boxes, the box draws its own list.""",
"""h(BulletList,{items:['La práctica de recuperación consolida el aprendizaje más que la relectura.',{text:'La práctica distribuida produce retención más duradera.',items:['Espaciar el estudio en el tiempo.']}]})""")

c('Cite',190,"""**Consumer provides:** `authors` (surnames in source order), `year` and `page`. A range such as `"45-47"` becomes “pp. 45–47”. Use `locator` (“párr. 4”) when the source has no pages, `narrative` for the in-text form, and `works` for several works in one parenthesis.

- Parenthetical citations use “&”: (Biggs & Tang, 2011, p. xx).
- Narrative citations use “y”: Biggs y Tang (2011, p. xx).
- With three or more authors, only the first is named, followed by “et al.”.
- Several works are sorted alphabetically and separated with “;”.

Inside `Bibliography`, pass `id` (and `page`) instead of `authors` and `year`: the citation reads the record and registers the work for `ReferencesBox auto`. `formatCitation` and `formatCitations` give the same strings outside React.""",
"""h('div',null,h(Paragraph,null,'Parentética: ',h(Cite,B)),h(Paragraph,null,'Narrativa: ',h(Cite,Object.assign({narrative:true},B))),h(Paragraph,null,'Tres o más autores: ',h(Cite,A)),h(Paragraph,null,'Varias obras: ',h(Cite,{works:[VY,AU]})))""")

c('Quote',130,"""Use it for quotations under 40 words. The words go in English double quotes “…”, followed by the APA citation with its page. The quoted words are verbatim.""",
"""h(Paragraph,null,'Ausubel lo resumió así: ',h(Quote,{cite:AU},'the most important single factor influencing learning is what the learner already knows'),'.')""")

c('BlockQuote',190,"""Use it for quotations of 40 words or more; anything shorter is a `Quote`. It has no quotation marks, a left indent of `indent-hang`, and the citation after the final period. The preview cites a placeholder source (Apellido, año, p. xx).""",
"""h(BlockQuote,{cite:{authors:['Apellido'],year:'año',page:'xx'}},'Toda decisión de enseñanza descansa, explícita o implícitamente, en una teoría acerca de cómo aprenden las personas. Hacer conscientes esos supuestos es condición para tomar decisiones fundamentadas. Esta unidad recorre las grandes familias teóricas que orientan la didáctica del nivel superior y advierte sobre los usos abusivos del discurso “neuro”.')""")

c('KeyPoints',250,"""**Consumer provides:** 3–5 `items` of one line each, and optionally 1–3 `before` questions (“Antes de leer”).

It is the first box of every unit, right after `ChapterOpener`, in the opening family (filled header band). It works as an advance organiser and summarises the unit without introducing anything new. Write affirmative statements. The “Antes de leer” questions invite a prediction before reading; come back to them in `ThinkFurther`.""",
"""h(KeyPoints,{items:['El conocimiento se construye a partir de lo que el estudiante ya sabe.','La buena enseñanza opera en la zona de desarrollo próximo.','La memoria de trabajo es limitada: hay que gestionar la carga cognitiva.','El enfoque profundo lo induce, sobre todo, la evaluación.'],before:['¿Qué teoría del aprendizaje, aunque no la nombre, guía hoy sus clases?']})""")

c('Objectives',260,"""**Consumer provides:** `items`, each `{ level, text }`, where `level` is one of recordar, comprender, aplicar, analizar, evaluar or crear (Bloom revised, Anderson & Krathwohl, 2001).

It comes right after `KeyPoints`, in the opening family. Objectives are numbered O1, O2… (or give an `id`), so activities can point to them. Start each objective with a verb of its level, order them from low to high, and include at least one at level 4 or above. Pass the same array to `AlignmentTable`. The default intro reads “Al finalizar la unidad, usted será capaz de:”.""",
"""h(Objectives,{items:[{level:'comprender',text:'Explicar los supuestos de las perspectivas constructivista, sociocultural y cognitiva.'},{level:'analizar',text:'Comparar las implicancias didácticas de cada perspectiva.'},{level:'evaluar',text:'Valorar críticamente afirmaciones pedagógicas de origen “neuro”.'},{level:'crear',text:'Diseñar una actividad que gestione la carga cognitiva.'}]})""")

c('Important',200,"""**Consumer provides:** an optional `term` and the definition as children, with its citation.

Use it for key concepts and definitions anywhere in the text, at most one per section. Never nest it.""",
"""h(Important,{term:'Zona de desarrollo próximo (ZDP)'},h('p',null,'Franja entre el nivel de desarrollo real (lo que el estudiante resuelve solo) y el potencial (lo que resuelve con ayuda) ',h(Cite,VY),'.'))""")

c('CommonMistake',230,"""**Consumer provides:** `misconception` (the belief, stated plainly), `correction` (what the evidence shows, always with its citation) and `explanation` (why the belief does not hold, or why it is attractive).

It follows the structure of a refutation text: state the misconception, refute it explicitly, explain the alternative. Place it in the text next to the idea it corrects (in-text family: heavy top rule). Keep it respectful, so that it corrects the idea and not the reader.""",
"""h(CommonMistake,{misconception:'Cada estudiante aprende mejor en su “estilo de aprendizaje” y la enseñanza debe ajustarse a él.',correction:h(React.Fragment,null,'No hay evidencia empírica que lo sustente; es un neuromito de amplia difusión ',h(Cite,A),'.'),explanation:'Las preferencias existen, pero adaptar la modalidad a ellas no mejora el aprendizaje: conviene ajustar la modalidad al contenido.'})""")

c('ThinkFurther',330,"""**Consumer provides:** 2–5 open `questions`.

It opens the closing sequence (closing family: plain frame), before `SelfCheck` and `Activities`. The questions have no single answer and are not assessed: they connect the unit to practice, to tensions and to open debates. Pass the “Antes de leer” questions as `revisit`: they come back under “Vuelva a las preguntas del comienzo”, so readers compare their first answer with what they think now.""",
"""h(ThinkFurther,{questions:['¿Qué supuestos sobre el aprendizaje revelan las evaluaciones de su asignatura?','Si el enfoque profundo lo induce la evaluación, ¿qué responsabilidad le queda al estudiante?'],revisit:['¿Qué teoría del aprendizaje, aunque no la nombre, guía hoy sus clases?']})""")

c('Activities',280,"""**Consumer provides:** `items`, as strings or `{ type, level, objectives, text }`: type is pregunta, tarea, caso or debate; `level` is the Bloom level the activity demands; `objectives` lists the objectives it practises (`['O2']`), shown as links.

It comes after `SelfCheck`, followed by `AlignmentTable`. Activities are assessable, unlike `ThinkFurther`. Every objective needs at least one activity at its level or above. Write each item as a *usted* imperative or a direct question.""",
"""h(Activities,{items:[{type:'pregunta',level:'comprender',objectives:['O1'],text:'Explique qué significa que el aprendizaje “tira del desarrollo”.'},{type:'tarea',level:'analizar',objectives:['O2'],text:'Compare qué estrategia propondría cada perspectiva para trabajar una idea previa errónea de su disciplina.'},{type:'tarea',level:'crear',objectives:['O2','O4'],text:'Diseñe una consigna que reduzca la carga cognitiva extrínseca.'}]})""")

c('ReferencesBox',250,"""**Consumer provides:** `Reference` children, sorted alphabetically, or `auto` inside `Bibliography` to generate the list from the works cited above.

It closes the unit and lists every work the unit cites, and only those, in APA 7 with a French (hanging) indent. With `auto` that holds by construction; with hand-written entries, the content checker compares the list with the citations.""",
"""h(ReferencesBox,null,h(Reference,null,'Ausubel, D. P. (1968). ',h('i',null,'Educational psychology: A cognitive view'),'. Holt, Rinehart & Winston.'),h(Reference,null,'Biggs, J., & Tang, C. (2011). ',h('i',null,'Teaching for quality learning at university'),' (4.ª ed.). Open University Press.'),h(Reference,null,'Vygotsky, L. S. (1978). ',h('i',null,'Mind in society: The development of higher psychological processes'),'. Harvard University Press.'))""")

c('Box',760,"""The shared frame behind all nine boxes. Prefer the named components; use `Box` with `kind` only for a custom body. The kind sets the colours, the icon, the default title and the family, which sets the shape: opening boxes have a filled header band, in-text boxes a heavy top rule, closing boxes a plain frame. The shape keeps boxes apart in grayscale print and for colour-blind readers.""",
"""h('div',null,['keypoints','objectives','important','mistake','example','thinking','selfcheck','activities','references'].map(function(k){return h(Box,{key:k,kind:k},h('p',{style:{margin:0}},'Contenido del recuadro.'))}))""")

c('Icon',80,"""Lucide line icons (v0.460.0, ISC licence), drawn in `currentColor`. Only the nine box icons are bundled. They are decorative inside box headers; give them a `label` only when they stand alone.""",
"""h('div',{style:{display:'flex',gap:'16px',color:'var(--navy)'}},['key-round','target','star','triangle-alert','school','message-circle-question','list-checks','pencil-line','book-open-text'].map(function(n){return h(Icon,{key:n,name:n,size:24,label:n})}))""")

c('DataTable',330,"""**Consumer provides:** `columns`, `rows`, and optionally `number`, `title`, `note`, `widths` and `rowHeader`.

The layout follows APA 7: “Tabla N” in bold, the title in italic, then the table, then “*Nota.* …”. The header is navy text on `band` over a 2px rule; pass `filled` for a solid navy bar on slides or posters. Use `rowHeader` for conceptual tables that compare concepts across dimensions. Keep cells to short phrases and don't colour individual cells.""",
"""h(DataTable,{number:1,title:'Teorías del aprendizaje e implicancias didácticas',rowHeader:true,widths:['22%','39%','39%'],columns:['Perspectiva','Cómo concibe el aprendizaje','Implicancia para enseñar'],rows:[['Conductista','Cambio de conducta por asociación y refuerzo','Objetivos claros, práctica y retroalimentación'],['Cognitivista','Procesamiento de información; esquemas y memoria','Gestionar la carga cognitiva'],['Constructivista','Construcción activa sobre ideas previas','Indagar preconceptos']],note:h(React.Fragment,null,'Elaboración propia a partir de ',h(Cite,Object.assign({narrative:true},A)),'.')})""")

c('Figure',300,"""**Consumer provides:** `number`, `title`, a diagram or image as children, and a `note` naming the source.

Every diagram goes inside a `Figure`. Give it an `id` and list the ids in `Numbering`: the number then follows the order of first mention, and `FigRef` points to it. Announce each figure in the text before it appears.""",
"""h(Figure,{number:3,title:'Alineamiento constructivo',note:h(React.Fragment,null,'Elaboración propia a partir de ',h(Cite,Object.assign({narrative:true},B)),'.')},h(ProcessFlow,{steps:[{title:'Resultados de aprendizaje',text:'qué deberá poder hacer'},{title:'Actividades',text:'que ejercitan ese desempeño'},{title:'Evaluación',text:'que verifica ese desempeño'}]}))""")

c('ConceptWeb',420,"""**Consumer provides:** `center`, and 3–8 `nodes` with `{ label, relation?, detail? }`, placed clockwise from the top.

Use it to show how one concept relates to others. Keep relations to short verb phrases (“se produce en”) and details to an author or a few words; labels that wrap past three lines are flagged by the content checker. Below 600px of available width the web is replaced by the same structure as a list, so labels never shrink under 12px.""",
"""h(ConceptWeb,{center:'Aprendizaje',nodes:[{label:'Conocimiento previo',relation:'parte de',detail:'Ausubel'},{label:'Mediación social',relation:'se produce en',detail:'Vygotsky'},{label:'Carga cognitiva',relation:'limitado por',detail:'Sweller'},{label:'Enfoque profundo',relation:'inducido por la evaluación',detail:'Biggs y Tang'},{label:'Motivación',relation:'sostenido por',detail:'Ambrose et al.'}]})""")

c('CycleDiagram',440,"""**Consumer provides:** 3–8 `steps` `{ title, text? }`, clockwise from the top, and an optional `center` label.

Use it for processes that loop, such as self-regulation, reflective practice or action research. Below 600px of available width it becomes a numbered list ending “↻ Después del paso N, el ciclo vuelve al paso 1”.""",
"""h(CycleDiagram,{center:'Aprendiz autorregulado',steps:[{title:'Planificar',text:'anticipar dificultades'},{title:'Monitorear',text:'controlar el progreso'},{title:'Evaluar',text:'valorar el resultado'},{title:'Ajustar',text:'cambiar de estrategia'}]})""")

c('Pyramid',320,"""**Consumer provides:** 2–6 `levels` `{ title, text? }`, from the apex to the base.

Use it for hierarchies where higher levels build on lower ones, such as Miller's pyramid or Bloom's levels. The fill darkens toward the apex. Keep the apex title to one short word. Below 600px of available width it becomes a stack of bars in the same ramp colours.""",
"""h(Pyramid,{levels:[{title:'Hace',text:'Desempeño en la práctica real'},{title:'Muestra cómo',text:'Desempeño en entorno controlado (OSCE)'},{title:'Sabe cómo',text:'Aplicación del conocimiento a casos'},{title:'Sabe',text:'Conocimiento factual'}]})""")

c('ProcessFlow',190,"""**Consumer provides:** 2–5 `steps` `{ title, text? }` in order.

Use it for linear sequences, such as constructive alignment or the phases of a class. Steps sit side by side from 640px wide and stack below that.""",
"""h(ProcessFlow,{label:'Alineamiento constructivo',steps:[{title:'Resultados de aprendizaje',text:'qué deberá poder hacer el estudiante'},{title:'Actividades',text:'que ponen en práctica ese desempeño'},{title:'Evaluación',text:'que verifica ese mismo desempeño'}]})""")

c('TreeDiagram',360,"""**Consumer provides:** a `root` `{ label, detail?, children? }`, up to three levels below it.

Use it for classifications and structures (types of assessment, the parts of a curriculum). With up to 4 leaves it draws top-down; with more it turns left to right so labels keep their size. More than 8 leaves or 4 levels is flagged: split the tree. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.""",
"""h(TreeDiagram,{root:{label:'Evaluación del aprendizaje',children:[{label:'Según su función',children:[{label:'Diagnóstica',detail:'antes de enseñar'},{label:'Formativa',detail:'durante el proceso'},{label:'Sumativa',detail:'al cierre'}]},{label:'Según el agente',children:[{label:'Autoevaluación'},{label:'Coevaluación'},{label:'Heteroevaluación'}]}]}})""")

c('ConceptMap',420,"""**Consumer provides:** `nodes` `{ id, label, detail?, level }` (level 0 is the most general) and `links` `{ from, to, label }`.

Use it when the relations matter as much as the concepts: each arrow carries linking words, so “concept → linking words → concept” reads as a proposition, as in Novak's concept maps. Keep 2–4 concepts per level. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.""",
"""h(ConceptMap,{nodes:[{id:'as',label:'Aprendizaje significativo',level:0},{id:'cp',label:'Conocimientos previos',level:1},{id:'mn',label:'Material nuevo',detail:'potencialmente significativo',level:1},{id:'di',label:'Disposición',detail:'del estudiante',level:1},{id:'ec',label:'Estructura cognitiva',detail:'más rica y organizada',level:2}],links:[{from:'as',to:'cp',label:'parte de'},{from:'as',to:'mn',label:'requiere'},{from:'as',to:'di',label:'exige'},{from:'mn',to:'ec',label:'se ancla en'}]})""")

c('MindMap',320,"""**Consumer provides:** a `center` topic and up to 6 `branches` `{ label, items? }` with up to 3 short ideas each.

Use it for brainstorming and planning: decisions that depend on one topic, without ranking them. Branches alternate right then left. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.""",
"""h(MindMap,{center:'Planificar una clase',branches:[{label:'Objetivos',items:['Verbo de Bloom','Uno por desempeño']},{label:'Contenidos',items:['Conceptos clave','Ideas previas']},{label:'Actividades',items:['Apertura','Desarrollo','Cierre']},{label:'Recursos',items:['Casos','Materiales']},{label:'Evaluación',items:['Criterios','Retroalimentación']}]})""")

c('VennDiagram',480,"""**Consumer provides:** two or three `sets` and `regions` `{ a, b, c, ab, ac, bc, abc }`, each a list of one- or two-word items.

Use it to compare perspectives or concepts: what they share and what is exclusive to each. Fills are light, translucent accents, so ink text keeps 4.5:1 in every region. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.""",
"""h(VennDiagram,{sets:['Constructivista','Sociocultural','Cognitiva'],regions:{a:['Ideas previas'],b:['Mediación','ZDP'],c:['Memoria de trabajo'],ab:['Rol activo'],ac:['Esquemas'],bc:['Andamiaje'],abc:['Aprender es construir']}})""")

c('QuadrantMatrix',480,"""**Consumer provides:** `xAxis` and `yAxis` `{ label, low, high }` and four `quadrants` `{ title, text? }`: top-left, top-right, bottom-left, bottom-right.

Use it to cross two dimensions (demand × support, depth × autonomy). The high–high quadrant gets the header tint and a heavy frame. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.""",
"""h(QuadrantMatrix,{xAxis:{label:'Apoyo del docente',low:'bajo',high:'alto'},yAxis:{label:'Exigencia',low:'baja',high:'alta'},quadrants:[{title:'Frustración',text:'la tarea supera lo que puede hacer solo'},{title:'Zona de desarrollo próximo',text:'logra con ayuda lo que aún no logra solo'},{title:'Rutina',text:'repite lo que ya domina'},{title:'Dependencia',text:'la ayuda sobra y lo vuelve pasivo'}]})""")

c('Timeline',300,"""**Consumer provides:** up to 8 `events` `{ date, title, text? }` in chronological order.

Use it for the history of a field or the calendar of a course. Labels alternate above and below the axis; more than 8 events is flagged. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.""",
"""h(Timeline,{events:[{date:'1913',title:'Conductismo',text:'manifiesto de Watson'},{date:'1956',title:'Taxonomía de Bloom',text:'objetivos por niveles'},{date:'1968',title:'Ausubel',text:'aprendizaje significativo'},{date:'1978',title:'Vygotsky en inglés',text:'Mind in Society'},{date:'1988',title:'Carga cognitiva',text:'Sweller'},{date:'1996',title:'Alineamiento',text:'Biggs'},{date:'2001',title:'Bloom revisada',text:'dos dimensiones'}]})""")

c('Fishbone',470,"""**Consumer provides:** an `effect` and up to 6 `causes` `{ category, items }` with up to 3 causes each.

Use it (Ishikawa) to analyse a teaching problem by categories before choosing a remedy. Categories alternate above and below the spine. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.""",
"""h(Fishbone,{effect:'Bajo rendimiento en el primer parcial',causes:[{category:'Estudiante',items:['Ideas previas erróneas','Estudio memorístico']},{category:'Enseñanza',items:['Exceso de contenido','Poca práctica guiada']},{category:'Evaluación',items:['Desalineada con objetivos','Sin instancias formativas']},{category:'Contexto',items:['Cursadas superpuestas','Trabajo de los estudiantes']}]})""")

c('Spectrum',300,"""**Consumer provides:** the `left` and `right` poles and `points` `{ label, position, text? }`, with position from 0 (left pole) to 1 (right pole).

Use it when options differ by degree, not kind (teacher- to student-centred, guided to autonomous). The bar runs the diagram ramp from light to dark. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.""",
"""h(Spectrum,{left:'Centrada en el docente',right:'Centrada en el estudiante',points:[{label:'Clase magistral',position:0.08},{label:'Exposición dialogada',position:0.32,text:'preguntas durante la clase'},{label:'Seminario',position:0.58},{label:'Aprendizaje basado en problemas',position:0.8},{label:'Proyecto autónomo',position:0.95}]})""")

c('Funnel',400,"""**Consumer provides:** 3–6 `stages` `{ title, text? }`, widest first.

Use it for levels of curricular specification or any process that narrows (from graduate profile to classroom activity). The fill darkens as it narrows. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.""",
"""h(Funnel,{stages:[{title:'Perfil de egreso',text:'lo que define a la titulación'},{title:'Competencias de la carrera'},{title:'Resultados de la asignatura'},{title:'Objetivos de la unidad'},{title:'Actividad de clase'}]})""")

c('Staircase',360,"""**Consumer provides:** 3–6 `steps` `{ title, text? }`, lowest first.

Use it for progressive levels that build on each other, such as Bloom's revised taxonomy or rubric levels; unlike `Pyramid`, it reads as a climb. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.""",
"""h(Staircase,{steps:[{title:'Recordar',text:'reconocer, evocar'},{title:'Comprender',text:'explicar, resumir'},{title:'Aplicar',text:'ejecutar, usar'},{title:'Analizar',text:'comparar, organizar'},{title:'Evaluar',text:'juzgar, criticar'},{title:'Crear',text:'diseñar, producir'}]})""")

c('NestedCircles',460,"""**Consumer provides:** 2–5 `layers` `{ title, text? }`, innermost first.

Use it for contexts that contain one another (classroom, course, programme, institution, system). Titles sit in their ring; descriptions go in a legend at the right, outermost first. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.""",
"""h(NestedCircles,{layers:[{title:'Aula',text:'consignas, interacción, clima'},{title:'Asignatura',text:'programa, cronograma, evaluación'},{title:'Carrera',text:'plan de estudios y perfil'},{title:'Institución',text:'reglamentos y recursos'},{title:'Sistema',text:'normativa y acreditación'}]})""")

c('Iceberg',460,"""**Consumer provides:** `visible` and `hidden` item lists, with optional `visibleTitle` and `hiddenTitle`.

Use it to show what sustains the visible, such as the explicit and the hidden curriculum. Put more items below the line than above. Below 600px of available width it becomes the same structure as a list, which is also what screen readers read.""",
"""h(Iceberg,{visibleTitle:'Currículo explícito',hiddenTitle:'Currículo oculto',visible:['Plan de estudios y programas','Horarios y correlatividades','Evaluaciones formales'],hidden:['Expectativas que nadie enuncia','Normas de participación en clase','Lo que la evaluación premia de hecho','Creencias del docente sobre quién puede aprender']})""")

c('GlossaryEntry',140,"""**Consumer provides:** `term` (without the colon), the definition ending with its citation, and an `id` when `Term` links to it. Prefer `Glossary`, which sorts the entries for you.""",
"""h('div',null,h(GlossaryEntry,{term:'Andamiaje'},'Apoyo temporal que ofrece el docente o un par más capaz, retirado progresivamente (derivado de Vygotsky, 1978, p. 86).'))""")

c('Reference',140,"""**Consumer provides:** the reference, with italics marked by `<i>`.

Follow APA 7: “&” before the last author, the title in sentence case, italics for books and journals, en-dash page ranges and the DOI as a URL. A list of them goes inside `ReferencesBox`.""",
"""h('div',null,h(Reference,null,'Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. ',h('i',null,'Cognitive Science, 12'),'(2), 257–285.'))""")

c('Classroom',250,"""**Consumer provides:** `situation` (a concrete classroom moment), `decision` (what the teacher does), `rationale` (why, with its citation) and an optional `discipline` tag: sociales, salud, general or any text.

It is a worked example: it shows a didactic decision being made, right after the concept it applies (in-text family). Keep the situation short and realistic, and make the rationale point back to the unit's concepts.""",
"""h(Classroom,{discipline:'salud',situation:'Los estudiantes deben interpretar un electrocardiograma mientras leen la consigna en otra pantalla.',decision:'La docente integra consigna y trazado en una sola imagen anotada y presenta antes dos casos resueltos.',rationale:h(React.Fragment,null,'Integrar las fuentes y anteponer ejemplos resueltos reduce la carga extrínseca ',h(Cite,{authors:['Sweller','van Merriënboer','Paas'],year:2019,page:'xx'}),'.')})""")

c('SelfCheck',300,"""**Consumer provides:** 3–5 `items` `{ question, answer, review? }`. `review` names an earlier unit (“Unidad 1”) for spaced review.

It is retrieval practice with feedback, placed after `ThinkFurther` in the closing sequence. On screen each answer opens on demand (“Ver respuesta”); in print the answers disappear and a key is printed at the end of the box. Ask for recall of the unit's key ideas, not for opinions. Include one review item from an earlier unit.""",
"""h(SelfCheck,{items:[{question:'¿Qué designa la zona de desarrollo próximo?',answer:'La distancia entre lo que una persona resuelve sola y lo que resuelve con la guía de otro más capaz.'},{question:'¿Qué tipo de evaluación favorece un enfoque profundo?',answer:'La que exige aplicar, justificar y transferir.'},{review:'Unidad 1',question:'¿Qué dos condiciones reúne la “buena enseñanza”?',answer:'Ser epistemológicamente válida y moralmente justificable.'}]})""")

c('AlignmentTable',230,"""**Consumer provides:** the same `objectives` and `activities` arrays passed to `Objectives` and `Activities`.

It goes right after `Activities` and makes constructive alignment visible: for each objective, its level, the activities that practise it, and its status. It flags an objective without activities and an activity pitched below its objective's level. `checkAlignment()` returns the same problems as data, for authoring checks.""",
"""(function(){var O=[{level:'comprender',text:'Explicar…'},{level:'analizar',text:'Comparar…'},{level:'crear',text:'Diseñar…'}];var Ac=[{level:'comprender',objectives:['O1'],text:'…'},{level:'aplicar',objectives:['O3'],text:'…'}];return h(AlignmentTable,{objectives:O,activities:Ac})})()""")

c('BoxLegend',220,"""It renders the “Cómo usar este manual” legend: every box type with its icon and title, grouped into the three families (opening, in the text, closing).

Place it once, in the manual's introduction, after a sentence that explains the families.""",
"""h(BoxLegend)""")

c('Numbering',300,"""**Consumer provides:** `figures` and `tables`, the ids in order of first mention, around the unit. `firstFigure` / `firstTable` continue a count from an earlier unit.

Inside it, `Figure` and `DataTable` with an `id` take their number automatically, and `FigRef` prints “Figura N” / “Tabla N”. Reordering a unit means reordering one list; no reference has to be renumbered by hand.""",
"""h(Numbering,{figures:['ciclo']},h(Paragraph,null,'La autorregulación es un ciclo que el estudiante recorre una y otra vez ',h(FigRef,{to:'ciclo',paren:true}),'.'),h(Figure,{id:'ciclo',title:'Ciclo de la autorregulación',note:'Elaboración propia.'},h(CycleDiagram,{steps:[{title:'Planificar'},{title:'Monitorear'},{title:'Evaluar'},{title:'Ajustar'}]})))""")

c('FigRef',110,"""**Consumer provides:** `to`, the id of a figure or table registered in `Numbering`; `paren` for “(véase la Figura N)”.

Mention every figure and table in the text before it appears; the content checker flags any that is not. An id missing from `Numbering` renders “[referencia sin destino: id]”, which the checker reports as an error.""",
"""h(Numbering,{figures:['red'],tables:['teorias']},h(Paragraph,null,'Como resume la ',h(FigRef,{to:'red'}),', las perspectivas se complementan; la ',h(FigRef,{to:'teorias'}),' compara sus implicancias ',h(FigRef,{to:'red',paren:true}),'.'))""")

c('Term',110,"""**Consumer provides:** `to`, the glossary id, and the term as it reads in the sentence.

Mark the first use of a glossary term in each unit, not every use. It reads as normal text with a dotted azure underline and links to the glossary entry.""",
"""h(Paragraph,null,'De aquí derivan estrategias como el ',h(Term,{to:'andamiaje'},'andamiaje'),', el trabajo colaborativo y la enseñanza entre pares.')""")

c('Glossary',220,"""**Consumer provides:** `entries`, each `{ id, term, definition }`, in any order.

It sorts entries alphabetically with Spanish collation and gives each an anchor for `Term`. Keep definitions to one or two sentences ending with their citation.""",
"""h(Glossary,{entries:[{id:'zdp',term:'Zona de desarrollo próximo',definition:h(React.Fragment,null,'Distancia entre lo que el estudiante resuelve solo y lo que resuelve con ayuda ',h(Cite,VY),'.')},{id:'andamiaje',term:'Andamiaje',definition:h(React.Fragment,null,'Apoyo temporal que ofrece el docente o un par más capaz, retirado progresivamente (derivado de Vygotsky, 1978, p. 86).')}]})""")

c('Bibliography',300,"""**Consumer provides:** `works`, each `{ id, type, authors, year, title, … }`. Types are book, article, chapter (with `editors`, `container`, `pages`) and web (with `site`, `date`, `url`). Authors are `{ family, given, suffix? }` or `{ literal }` for a group author. Titles go in sentence case.

Declare a unit's works once, around the unit. Inside it, `<Cite id="…" page={…} />` takes authors and year from the record, and `<ReferencesBox auto />` lists exactly the works cited above it, formatted in APA 7 and ordered by author and year. Works with the same authors and year get a/b suffixes in both places. A citation that points to an undeclared id renders “[obra sin registrar: id]”.""",
"""h(Bibliography,{works:[{id:'v',type:'book',authors:[{family:'Vygotsky',given:'L. S.'}],year:1978,title:'Mind in society: The development of higher psychological processes',publisher:'Harvard University Press'},{id:'s',type:'article',authors:[{family:'Sweller',given:'J.'},{family:'van Merriënboer',given:'J. J. G.'},{family:'Paas',given:'F.'}],year:2019,title:'Cognitive architecture and instructional design: 20 years later',journal:'Educational Psychology Review',volume:31,issue:2,pages:'261-292',doi:'10.1007/s10648-019-09465-5'}]},h(Paragraph,null,h(Cite,{id:'v',page:86,narrative:true}),' situó el aprendizaje en la interacción social; la carga cognitiva limita lo que puede procesarse a la vez ',h(Cite,{id:'s',page:'xx'}),'.'),h(ReferencesBox,{auto:true}))""")

names='Page TitlePage TableOfContents ChapterOpener BoxLegend Heading Paragraph BulletList Bibliography Cite Quote BlockQuote KeyPoints Objectives Important CommonMistake Classroom ThinkFurther SelfCheck Activities AlignmentTable ReferencesBox Box Icon DataTable Figure Numbering FigRef ConceptWeb CycleDiagram Pyramid ProcessFlow TreeDiagram ConceptMap MindMap VennDiagram QuadrantMatrix Timeline Fishbone Spectrum Funnel Staircase NestedCircles Iceberg GlossaryEntry Glossary Term Reference'.split()
assert set(names)==set(meta)==set(D), (set(meta)^set(D))
for n in names:
    m=meta[n]; height,guide,render=D[n]
    d=os.path.join(OUT,n); os.makedirs(d,exist_ok=True)
    props='\n'.join(f"| `{p[0]}` | `{p[1]}` | {'yes' if p[2] else 'no'} | {p[3]} |" for p in m['props'])
    open(d+'/README.md','w',encoding='utf-8',newline='\n').write(f"# {n}\n\n{m['summary']}\n\n{guide}\n\n| Prop | Type | Required | Notes |\n|---|---|---|---|\n{props}\n")
    open(d+'/preview.html','w',encoding='utf-8',newline='\n').write(f"""<!-- @dsCard group="{m['group']}" height={height} -->
<div id="root" style="padding:16px;background:var(--paper)"></div>
<script>
  const h = React.createElement;
  const D = window.Didactica;
  const {{ {', '.join(names)} }} = D;
  {V}
  ReactDOM.createRoot(document.getElementById('root')).render(
    {render}
  );
</script>
""")
print(len(names),'components written')
