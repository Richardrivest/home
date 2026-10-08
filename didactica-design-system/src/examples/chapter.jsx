// A complete unit built with the system, from Unidad 2 of the manual.
// Page numbers shown as “xx” are placeholders: the system's format is
// exact, but those pages have not been checked against the books.
import React from 'react';
import {
  ChapterOpener, Heading, Paragraph, Cite, Quote, KeyPoints, Objectives, Important, CommonMistake,
  Classroom, ThinkFurther, SelfCheck, Activities, ReferencesBox, Reference, DataTable, Figure,
  ConceptWeb, CycleDiagram, Pyramid, ProcessFlow, AlignmentTable,
  TreeDiagram, ConceptMap, MindMap, VennDiagram, QuadrantMatrix, Timeline, Fishbone, Spectrum, Funnel, Staircase, NestedCircles, Iceberg, BoxLegend, Numbering, FigRef, Term, Glossary, Bibliography,
} from '../index.js';

// Every work the examples cite, declared once. <Cite id> takes authors and year from here;
// <ReferencesBox auto> lists the works actually cited, in APA order.
const A = (family, given) => ({ family, given });
export const WORKS = [
  { id: 'ambrose2010', type: 'book', authors: [A('Ambrose', 'S. A.'), A('Bridges', 'M. W.'), A('DiPietro', 'M.'), A('Lovett', 'M. C.'), A('Norman', 'M. K.')], year: 2010, title: 'How learning works: Seven research-based principles for smart teaching', publisher: 'Jossey-Bass' },
  { id: 'ausubel1968', type: 'book', authors: [A('Ausubel', 'D. P.')], year: 1968, title: 'Educational psychology: A cognitive view', publisher: 'Holt, Rinehart & Winston' },
  { id: 'biggs2011', type: 'book', authors: [A('Biggs', 'J.'), A('Tang', 'C.')], year: 2011, title: 'Teaching for quality learning at university', edition: 4, publisher: 'Open University Press' },
  { id: 'miller1990', type: 'article', authors: [A('Miller', 'G. E.')], year: 1990, title: 'The assessment of clinical skills/competence/performance', journal: 'Academic Medicine', volume: 65, issue: '9 Suppl.', pages: 'S63-S67', doi: '10.1097/00001888-199009000-00045' },
  { id: 'sweller1988', type: 'article', authors: [A('Sweller', 'J.')], year: 1988, title: 'Cognitive load during problem solving: Effects on learning', journal: 'Cognitive Science', volume: 12, issue: 2, pages: '257-285' },
  { id: 'sweller2019', type: 'article', authors: [A('Sweller', 'J.'), A('van Merriënboer', 'J. J. G.'), A('Paas', 'F.')], year: 2019, title: 'Cognitive architecture and instructional design: 20 years later', journal: 'Educational Psychology Review', volume: 31, issue: 2, pages: '261-292', doi: '10.1007/s10648-019-09465-5' },
  { id: 'vygotsky1978', type: 'book', authors: [A('Vygotsky', 'L. S.')], year: 1978, title: 'Mind in society: The development of higher psychological processes', publisher: 'Harvard University Press' },
];

export const AMBROSE = { id: 'ambrose2010', page: 'xx' };
export const AUSUBEL = { id: 'ausubel1968', page: 'xx' };
export const BIGGS = { id: 'biggs2011', page: 'xx' };
export const SWELLER = { id: 'sweller1988', page: 'xx' };
export const VYGOTSKY = { id: 'vygotsky1978', page: 86 };
export const SWELLER2019 = { id: 'sweller2019', page: 'xx' };

export const BEFORE = ['¿Qué teoría del aprendizaje, aunque no la nombre, guía hoy sus clases?'];

export const OBJECTIVES = [
  { level: 'comprender', text: 'Explicar los supuestos de las perspectivas constructivista, sociocultural y cognitiva sobre el aprendizaje.' },
  { level: 'analizar', text: 'Comparar las implicancias didácticas de cada perspectiva para la enseñanza universitaria.' },
  { level: 'evaluar', text: 'Valorar críticamente afirmaciones pedagógicas de origen “neuro” según el estándar de evidencia disponible.' },
  { level: 'crear', text: 'Diseñar una actividad que gestione la carga cognitiva y active la autorregulación.' },
];

export const ACTIVITIES = [
  { type: 'pregunta', level: 'comprender', objectives: ['O1'], text: 'Explique con sus palabras qué significa que el aprendizaje “tira del desarrollo” en la perspectiva sociocultural.' },
  { type: 'tarea', level: 'analizar', objectives: ['O2'], text: 'Identifique tres ideas previas erróneas frecuentes en un tema de su disciplina y compare qué estrategia propondría cada perspectiva para trabajarlas.' },
  { type: 'caso', level: 'evaluar', objectives: ['O3'], text: 'Valore una afirmación “neuro” que haya circulado en su institución: ¿qué evidencia la respalda y qué evidencia exigiría usted?' },
  { type: 'tarea', level: 'crear', objectives: ['O2', 'O4'], text: 'Diseñe una consigna para su asignatura que reduzca la carga cognitiva extrínseca e incluya una instancia de autoevaluación guiada.' },
];

export function ChapterExample() {
  return (
    <Bibliography works={WORKS}>
    <Numbering figures={['perspectivas', 'autorregulacion']} tables={['teorias']}>
      <ChapterOpener
        number={2}
        title="Teorías del aprendizaje en la educación superior"
        lead="Toda decisión de enseñanza descansa, explícita o implícitamente, en una teoría acerca de cómo aprenden las personas. Hacer conscientes esos supuestos es condición para tomar decisiones fundamentadas."
      />
      <KeyPoints
        items={[
          'El conocimiento se construye a partir de lo que el estudiante ya sabe.',
          'El aprendizaje se produce en la interacción social, dentro de la zona de desarrollo próximo.',
          'La memoria de trabajo es limitada: enseñar bien supone gestionar la carga cognitiva.',
          'El enfoque profundo o superficial lo induce, sobre todo, la evaluación.',
        ]}
        before={BEFORE}
      />
      <Objectives items={OBJECTIVES} />

      <Heading level={2}>2.1. Constructivismo y aprendizaje significativo</Heading>
      <Paragraph>
        La premisa constructivista sostiene que el conocimiento no se transfiere de manera pasiva sino que es construido
        activamente por quien aprende a partir de sus conocimientos previos. <Cite narrative {...AUSUBEL} /> lo resumió en
        un principio: <Quote cite={{ id: 'ausubel1968', page: 'vi' }}>the most important single factor influencing learning is what the learner already knows. Ascertain this and teach him accordingly</Quote>.
      </Paragraph>
      <Paragraph>
        El aprendizaje significativo, por oposición al meramente memorístico, ocurre cuando el nuevo material se relaciona
        de modo sustantivo con la estructura cognitiva previa. Para el docente universitario, esto implica que los
        preconceptos de los estudiantes no son un obstáculo a ignorar sino el punto de partida de toda enseñanza: indagar
        las ideas previas, y a veces confrontarlas, es parte del trabajo didáctico.
      </Paragraph>

      <Heading level={2}>2.2. La perspectiva sociocultural</Heading>
      <Paragraph>
        <Cite narrative {...VYGOTSKY} /> desplazó el foco desde el individuo hacia la matriz social del aprendizaje. El
        aprendizaje, en esta óptica, tira del desarrollo y se produce en la interacción mediada por instrumentos
        culturales, entre ellos el lenguaje. De aquí derivan estrategias como el <Term to="andamiaje">andamiaje</Term>, el trabajo colaborativo y la
        enseñanza entre pares, de amplio uso en la universidad.
      </Paragraph>
      <Important term="Zona de desarrollo próximo (ZDP)">
        <p>
          Franja entre el nivel de desarrollo real (lo que el estudiante resuelve solo) y el potencial (lo que resuelve con
          ayuda). La buena enseñanza opera en la ZDP: propone tareas que el estudiante aún no puede afrontar de manera
          autónoma pero sí con andamiaje <Cite {...VYGOTSKY} />.
        </p>
      </Important>
      <Paragraph>
        Las perspectivas que recorre esta unidad no compiten entre sí: describen facetas distintas de un mismo proceso,
        como resume la <FigRef to="perspectivas" />.
      </Paragraph>
      <Figure id="perspectivas" title="Perspectivas complementarias sobre el aprendizaje" note={<>Elaboración propia a partir de <Cite narrative {...AUSUBEL} />, <Cite narrative {...VYGOTSKY} />, <Cite narrative {...SWELLER} />, <Cite narrative {...BIGGS} /> y <Cite narrative {...AMBROSE} />.</>}>
        <ConceptWeb center="Aprendizaje" nodes={[
          { label: 'Conocimiento previo', relation: 'parte de', detail: 'Ausubel' },
          { label: 'Mediación social', relation: 'se produce en', detail: 'Vygotsky' },
          { label: 'Carga cognitiva', relation: 'limitado por', detail: 'Sweller' },
          { label: 'Enfoque profundo', relation: 'inducido por la evaluación', detail: 'Biggs y Tang' },
          { label: 'Motivación', relation: 'sostenido por', detail: 'Ambrose et al.' },
        ]} />
      </Figure>

      <Heading level={2}>2.3. La ciencia cognitiva del aprendizaje</Heading>
      <Paragraph>
        La teoría de la <Term to="carga-cognitiva">carga cognitiva</Term> parte de que la memoria de trabajo es limitada: solo puede manipular unos pocos
        elementos simultáneamente <Cite {...SWELLER} />. Cuando el material o la tarea imponen una carga excesiva, por
        ejemplo instrucciones confusas o problemas resueltos sin apoyo, el aprendizaje se resiente. La enseñanza eficaz
        gestiona esa carga: secuencia la complejidad, ofrece ejemplos resueltos y evita la sobrecarga extrínseca.
      </Paragraph>
      <Classroom
        discipline="salud"
        situation="En una asignatura clínica, los estudiantes deben interpretar un electrocardiograma mientras leen la consigna en otra pantalla y toman notas."
        decision="La docente integra la consigna y el trazado en una sola imagen anotada, y presenta primero dos casos resueltos paso a paso antes del caso abierto."
        rationale={<>Integrar las fuentes y anteponer ejemplos resueltos reduce la carga extrínseca y libera memoria de trabajo para el razonamiento clínico <Cite {...SWELLER2019} />.</>}
      />

      <Heading level={2}>2.4. Enfoques profundos y superficiales</Heading>
      <Paragraph>
        La investigación sobre el aprendizaje universitario distinguió un enfoque superficial, orientado a reproducir y a
        cumplir con lo mínimo, de un enfoque profundo, orientado a comprender, a establecer relaciones y a otorgar
        sentido <Cite {...BIGGS} />. Un hallazgo decisivo es que el enfoque no es solo un rasgo del estudiante: lo induce,
        en gran medida, el modo en que se enseña y, sobre todo, el modo en que se evalúa. Evaluaciones que premian la
        reproducción memorística empujan a enfoques superficiales; tareas que exigen aplicar, justificar y transferir
        favorecen enfoques profundos. La <FigRef to="teorias" /> resume las implicancias de cada perspectiva.
      </Paragraph>
      <DataTable
        id="teorias"
        title="Teorías del aprendizaje e implicancias didácticas"
        rowHeader
        widths={['22%', '39%', '39%']}
        columns={['Perspectiva', 'Cómo concibe el aprendizaje', 'Implicancia para enseñar']}
        rows={[
          ['Conductista', 'Cambio de conducta por asociación y refuerzo', 'Objetivos claros, práctica y retroalimentación inmediata'],
          ['Cognitivista', 'Procesamiento de información; esquemas y memoria', 'Gestionar la carga cognitiva; organizar y secuenciar'],
          ['Constructivista', 'Construcción activa sobre ideas previas', 'Indagar preconceptos; proponer problemas significativos'],
          ['Sociocultural', 'Mediación social e instrumentos culturales', 'Andamiaje, trabajo colaborativo, enseñanza entre pares'],
        ]}
        note={<>Elaboración propia a partir de <Cite narrative {...AUSUBEL} />, <Cite narrative {...VYGOTSKY} />, <Cite narrative {...SWELLER} /> y <Cite narrative {...AMBROSE} />.</>}
      />

      <Heading level={2}>2.5. Neurociencia y neuromitos: una advertencia</Heading>
      <Paragraph>
        El prestigio de la neurociencia ha alimentado un mercado de afirmaciones pedagógicas de dudoso respaldo. El futuro
        profesor debe adoptar una actitud crítica frente a estos “neuromitos” y exigir, también en lo pedagógico, el
        estándar de evidencia que aplicaría en su propia disciplina.
      </Paragraph>
      <CommonMistake
        misconception={<>Cada estudiante aprende mejor en su “estilo de aprendizaje” (visual, auditivo, kinestésico) y la enseñanza debe ajustarse a él.</>}
        correction={<>No hay evidencia empírica que lo sustente; es un neuromito de amplia difusión <Cite {...AMBROSE} />.</>}
        explanation="Las preferencias existen, pero adaptar la modalidad a ellas no mejora el aprendizaje: lo que importa es ajustar la modalidad al contenido (un mapa se aprende viéndolo, una pronunciación, escuchándola). La idea persiste porque coincide con la experiencia personal de preferir un formato."
      />

      <Heading level={2}>2.6. Motivación y autorregulación</Heading>
      <Paragraph>
        Los aprendices eficaces planifican, monitorean y evalúan su propio aprendizaje, y ajustan sus estrategias en
        función de los resultados <Cite works={[AMBROSE, BIGGS]} />. Estas capacidades metacognitivas pueden y deben
        enseñarse de manera explícita en la universidad, como un ciclo que el estudiante recorre una y otra vez
        <FigRef to="autorregulacion" paren />.
      </Paragraph>
      <Figure id="autorregulacion" title="Ciclo de la autorregulación del aprendizaje" note={<>Elaboración propia a partir de <Cite narrative {...AMBROSE} />.</>}>
        <CycleDiagram center="Aprendiz autorregulado" steps={[
          { title: 'Planificar', text: 'anticipar dificultades' },
          { title: 'Monitorear', text: 'controlar el progreso' },
          { title: 'Evaluar', text: 'valorar el resultado' },
          { title: 'Ajustar', text: 'cambiar de estrategia' },
        ]} />
      </Figure>

      <ThinkFurther
        questions={[
          '¿Qué supuestos sobre el aprendizaje revelan las evaluaciones de su asignatura?',
          'Si el enfoque profundo lo induce la evaluación, ¿qué margen de responsabilidad le queda al estudiante?',
        ]}
        revisit={BEFORE}
      />
      <SelfCheck items={[
        { question: '¿Cuál es, según Ausubel, el factor que más influye en el aprendizaje?', answer: 'Lo que el estudiante ya sabe: sus conocimientos previos.' },
        { question: '¿Qué designa la zona de desarrollo próximo?', answer: 'La distancia entre lo que una persona resuelve sola y lo que resuelve con la guía de otro más capaz.' },
        { question: '¿Qué tipo de evaluación favorece un enfoque profundo?', answer: 'La que exige aplicar, justificar y transferir, no solo reproducir.' },
        { review: 'Unidad 1', question: '¿Qué dos condiciones reúne la “buena enseñanza”?', answer: 'Ser epistemológicamente válida y moralmente justificable.' },
      ]} />
      <Activities items={ACTIVITIES} />
      <AlignmentTable objectives={OBJECTIVES} activities={ACTIVITIES} />
      <ReferencesBox auto />
    </Numbering>
    </Bibliography>
  );
}

export function LegendExample() {
  return (
    <>
      <Heading level={1}>Cómo usar este manual</Heading>
      <Paragraph>
        Cada unidad sigue la misma secuencia. Los recuadros se reconocen por su ícono, su título y su forma: los de
        apertura llevan una franja de color, los que aparecen dentro del texto una línea gruesa superior, y los de cierre
        solo un marco.
      </Paragraph>
      <BoxLegend />
    </>
  );
}

export const GLOSSARY = [
  { id: 'zdp', term: 'Zona de desarrollo próximo', definition: <>Distancia entre lo que el estudiante resuelve solo y lo que resuelve con ayuda; ámbito privilegiado de la enseñanza <Cite {...VYGOTSKY} />.</> },
  { id: 'andamiaje', term: 'Andamiaje', definition: <>Apoyo temporal que ofrece el docente o un par más capaz para que el estudiante resuelva una tarea que aún no domina de manera autónoma, retirándolo progresivamente (derivado de Vygotsky, 1978, p. 86).</> },
  { id: 'carga-cognitiva', term: 'Carga cognitiva', definition: <>Demanda impuesta a la memoria de trabajo, de capacidad limitada; su gestión condiciona el aprendizaje <Cite {...SWELLER} />.</> },
];

export function GlossaryExample() {
  return (
    <Bibliography works={WORKS}>
      <Heading level={1}>Glosario de términos clave</Heading>
      <Glossary entries={GLOSSARY} />
    </Bibliography>
  );
}

export function DiagramsExample() {
  return (
    <Bibliography works={WORKS}>
    <Numbering figures={['alineamiento', 'miller', ...MORE_FIGURES]} firstFigure={3}>
      <Heading level={1}>Galería de diagramas</Heading>
      <Paragraph>
        Dos esquemas más completan el repertorio: el flujo del alineamiento constructivo (<FigRef to="alineamiento" />) y
        la pirámide de Miller para evaluar la competencia clínica (<FigRef to="miller" />).
      </Paragraph>
      <Figure id="alineamiento" title="Alineamiento constructivo" note={<>Elaboración propia a partir de <Cite narrative {...BIGGS} />.</>}>
        <ProcessFlow label="Alineamiento constructivo" steps={[
          { title: 'Resultados de aprendizaje', text: 'qué deberá poder hacer el estudiante' },
          { title: 'Actividades', text: 'que ponen en práctica ese desempeño' },
          { title: 'Evaluación', text: 'que verifica ese mismo desempeño' },
        ]} />
      </Figure>
      <Figure id="miller" title="Pirámide de Miller para la evaluación de la competencia clínica" note={<>Adaptado de <Cite narrative id="miller1990" page="S63" />.</>}>
        <Pyramid levels={[
          { title: 'Hace', text: 'Desempeño en la práctica real' },
          { title: 'Muestra cómo', text: 'Desempeño en entorno controlado (OSCE)' },
          { title: 'Sabe cómo', text: 'Aplicación del conocimiento a casos' },
          { title: 'Sabe', text: 'Conocimiento factual' },
        ]} />
      </Figure>
      <MoreDiagrams />
    </Numbering>
    </Bibliography>
  );
}

const MORE_FIGURES = ['arbol', 'mapa', 'mental', 'venn', 'matriz', 'ishikawa', 'cronologia', 'continuo', 'embudo', 'escalera', 'niveles', 'iceberg'];
const OWN = 'Elaboración propia.';

// Twelve more diagram types, each with content from the manual.
function MoreDiagrams() {
  return (
    <>
      <Heading level={2}>Jerarquías y clasificaciones</Heading>
      <Paragraph>
        El árbol ordena una clasificación de lo general a lo particular (<FigRef to="arbol" />); el mapa conceptual
        nombra en cada flecha la relación entre dos conceptos (<FigRef to="mapa" />), y el mapa mental reúne en torno
        a un tema central las decisiones que dependen de él (<FigRef to="mental" />).
      </Paragraph>
      <Figure id="arbol" title="Tipos de evaluación del aprendizaje" note={OWN}>
        <TreeDiagram root={{ label: 'Evaluación del aprendizaje', children: [
          { label: 'Según su función', children: [
            { label: 'Diagnóstica', detail: 'antes de enseñar' },
            { label: 'Formativa', detail: 'durante el proceso' },
            { label: 'Sumativa', detail: 'al cierre' },
          ] },
          { label: 'Según el agente', children: [
            { label: 'Autoevaluación' },
            { label: 'Coevaluación' },
            { label: 'Heteroevaluación' },
          ] },
        ] }} />
      </Figure>
      <Figure id="mapa" title="Mapa conceptual del aprendizaje significativo" note={<>Elaboración propia a partir de <Cite narrative {...AUSUBEL} />.</>}>
        <ConceptMap
          nodes={[
            { id: 'as', label: 'Aprendizaje significativo', level: 0 },
            { id: 'cp', label: 'Conocimientos previos', level: 1 },
            { id: 'mn', label: 'Material nuevo', detail: 'potencialmente significativo', level: 1 },
            { id: 'di', label: 'Disposición', detail: 'del estudiante', level: 1 },
            { id: 'ec', label: 'Estructura cognitiva', detail: 'más rica y organizada', level: 2 },
          ]}
          links={[
            { from: 'as', to: 'cp', label: 'parte de' },
            { from: 'as', to: 'mn', label: 'requiere' },
            { from: 'as', to: 'di', label: 'exige' },
            { from: 'mn', to: 'ec', label: 'se ancla en' },
          ]}
        />
      </Figure>
      <Figure id="mental" title="Decisiones al planificar una clase" note={OWN}>
        <MindMap center="Planificar una clase" branches={[
          { label: 'Objetivos', items: ['Verbo de Bloom', 'Uno por desempeño'] },
          { label: 'Contenidos', items: ['Conceptos clave', 'Ideas previas'] },
          { label: 'Actividades', items: ['Apertura', 'Desarrollo', 'Cierre'] },
          { label: 'Recursos', items: ['Casos', 'Materiales'] },
          { label: 'Evaluación', items: ['Criterios', 'Retroalimentación'] },
        ]} />
      </Figure>

      <Heading level={2}>Comparaciones y relaciones</Heading>
      <Paragraph>
        El diagrama de Venn muestra qué comparten y en qué difieren tres perspectivas (<FigRef to="venn" />). La matriz
        cruza dos dimensiones para ubicar cuatro situaciones (<FigRef to="matriz" />), y el diagrama de Ishikawa ordena
        por categorías las causas posibles de un problema (<FigRef to="ishikawa" />).
      </Paragraph>
      <Figure id="venn" title="Tres perspectivas sobre el aprendizaje" note={OWN}>
        <VennDiagram sets={['Constructivista', 'Sociocultural', 'Cognitiva']} regions={{
          a: ['Ideas previas'],
          b: ['Mediación', 'ZDP'],
          c: ['Memoria de trabajo'],
          ab: ['Rol activo'],
          ac: ['Esquemas'],
          bc: ['Andamiaje'],
          abc: ['Aprender es construir'],
        }} />
      </Figure>
      <Figure id="matriz" title="Exigencia de la tarea y apoyo del docente" note={<>Elaboración propia a partir de <Cite narrative {...VYGOTSKY} />.</>}>
        <QuadrantMatrix
          xAxis={{ label: 'Apoyo del docente', low: 'bajo', high: 'alto' }}
          yAxis={{ label: 'Exigencia', low: 'baja', high: 'alta' }}
          quadrants={[
            { title: 'Frustración', text: 'la tarea supera lo que puede hacer solo' },
            { title: 'Zona de desarrollo próximo', text: 'logra con ayuda lo que aún no logra solo' },
            { title: 'Rutina', text: 'repite lo que ya domina' },
            { title: 'Dependencia', text: 'la ayuda sobra y lo vuelve pasivo' },
          ]}
        />
      </Figure>
      <Figure id="ishikawa" title="Causas posibles de un bajo rendimiento en el primer parcial" note={OWN}>
        <Fishbone effect="Bajo rendimiento en el primer parcial" causes={[
          { category: 'Estudiante', items: ['Ideas previas erróneas', 'Estudio memorístico'] },
          { category: 'Enseñanza', items: ['Exceso de contenido', 'Poca práctica guiada'] },
          { category: 'Evaluación', items: ['Desalineada con objetivos', 'Sin instancias formativas'] },
          { category: 'Contexto', items: ['Cursadas superpuestas', 'Trabajo de los estudiantes'] },
        ]} />
      </Figure>

      <Heading level={2}>Secuencias, continuos y niveles</Heading>
      <Paragraph>
        La línea de tiempo sitúa hitos en orden (<FigRef to="cronologia" />); el continuo ubica estrategias entre dos
        polos (<FigRef to="continuo" />); el embudo muestra cómo se concreta el currículo hasta llegar al aula
        (<FigRef to="embudo" />), y la escalera, niveles que se apoyan unos en otros (<FigRef to="escalera" />).
      </Paragraph>
      <Figure id="cronologia" title="Algunos hitos de las teorías del aprendizaje" note={OWN}>
        <Timeline events={[
          { date: '1913', title: 'Conductismo', text: 'manifiesto de Watson' },
          { date: '1956', title: 'Taxonomía de Bloom', text: 'objetivos por niveles' },
          { date: '1968', title: 'Ausubel', text: 'aprendizaje significativo' },
          { date: '1978', title: 'Vygotsky en inglés', text: 'Mind in Society' },
          { date: '1988', title: 'Carga cognitiva', text: 'Sweller' },
          { date: '1996', title: 'Alineamiento', text: 'Biggs' },
          { date: '2001', title: 'Bloom revisada', text: 'dos dimensiones' },
        ]} />
      </Figure>
      <Figure id="continuo" title="Estrategias entre la enseñanza centrada en el docente y en el estudiante" note={OWN}>
        <Spectrum left="Centrada en el docente" right="Centrada en el estudiante" points={[
          { label: 'Clase magistral', position: 0.08 },
          { label: 'Exposición dialogada', position: 0.32, text: 'preguntas durante la clase' },
          { label: 'Seminario', position: 0.58 },
          { label: 'Aprendizaje basado en problemas', position: 0.8 },
          { label: 'Proyecto autónomo', position: 0.95 },
        ]} />
      </Figure>
      <Figure id="embudo" title="Del perfil de egreso a la actividad de clase" note={<>Elaboración propia a partir de <Cite narrative {...BIGGS} />.</>}>
        <Funnel stages={[
          { title: 'Perfil de egreso', text: 'lo que define a la titulación' },
          { title: 'Competencias de la carrera' },
          { title: 'Resultados de la asignatura' },
          { title: 'Objetivos de la unidad' },
          { title: 'Actividad de clase' },
        ]} />
      </Figure>
      <Figure id="escalera" title="Niveles de la taxonomía de Bloom revisada" note={OWN}>
        <Staircase steps={[
          { title: 'Recordar', text: 'reconocer, evocar' },
          { title: 'Comprender', text: 'explicar, resumir' },
          { title: 'Aplicar', text: 'ejecutar, usar' },
          { title: 'Analizar', text: 'comparar, organizar' },
          { title: 'Evaluar', text: 'juzgar, criticar' },
          { title: 'Crear', text: 'diseñar, producir' },
        ]} />
      </Figure>

      <Heading level={2}>Contextos y capas</Heading>
      <Paragraph>
        Los círculos anidados muestran contextos que se contienen unos a otros (<FigRef to="niveles" />). El iceberg
        separa lo que se ve de lo que lo sostiene sin verse (<FigRef to="iceberg" />).
      </Paragraph>
      <Figure id="niveles" title="Niveles de decisión que enmarcan una clase" note={OWN}>
        <NestedCircles layers={[
          { title: 'Aula', text: 'consignas, interacción, clima' },
          { title: 'Asignatura', text: 'programa, cronograma, evaluación' },
          { title: 'Carrera', text: 'plan de estudios y perfil' },
          { title: 'Institución', text: 'reglamentos y recursos' },
          { title: 'Sistema', text: 'normativa y acreditación' },
        ]} />
      </Figure>
      <Figure id="iceberg" title="Currículo explícito y currículo oculto" note={OWN}>
        <Iceberg visibleTitle="Currículo explícito" hiddenTitle="Currículo oculto"
          visible={['Plan de estudios y programas', 'Horarios y correlatividades', 'Evaluaciones formales']}
          hidden={['Expectativas que nadie enuncia', 'Normas de participación en clase', 'Lo que la evaluación premia de hecho', 'Creencias del docente sobre quién puede aprender']} />
      </Figure>
    </>
  );
}
