// A complete unit built with the system, from Unidad 2 of the manual.
// Page numbers shown as “xx” are placeholders: the system's format is
// exact, but those pages have not been checked against the books.
import React from 'react';
import {
  ChapterOpener, Heading, Paragraph, Cite, Quote, KeyPoints, Objectives, Important, CommonMistake,
  Classroom, ThinkFurther, SelfCheck, Activities, ReferencesBox, Reference, DataTable, Figure,
  ConceptWeb, CycleDiagram, Pyramid, ProcessFlow, AlignmentTable, BoxLegend, Numbering, FigRef, Term, Glossary,
} from '../index.js';

export const AMBROSE = { authors: ['Ambrose', 'Bridges', 'DiPietro', 'Lovett', 'Norman'], year: 2010, page: 'xx' };
export const AUSUBEL = { authors: ['Ausubel'], year: 1968, page: 'xx' };
export const BIGGS = { authors: ['Biggs', 'Tang'], year: 2011, page: 'xx' };
export const SWELLER = { authors: ['Sweller'], year: 1988, page: 'xx' };
export const VYGOTSKY = { authors: ['Vygotsky'], year: 1978, page: 86 };
export const SWELLER2019 = { authors: ['Sweller', 'van Merriënboer', 'Paas'], year: 2019, page: 'xx' };

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
        before={['¿Qué teoría del aprendizaje, aunque no la nombre, guía hoy sus clases?']}
      />
      <Objectives items={OBJECTIVES} />

      <Heading level={2}>2.1. Constructivismo y aprendizaje significativo</Heading>
      <Paragraph>
        La premisa constructivista sostiene que el conocimiento no se transfiere de manera pasiva sino que es construido
        activamente por quien aprende a partir de sus conocimientos previos. <Cite narrative {...AUSUBEL} /> lo resumió en
        un principio: <Quote cite={{ authors: ['Ausubel'], year: 1968, page: 'vi' }}>the most important single factor influencing learning is what the learner already knows. Ascertain this and teach him accordingly</Quote>.
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

      <ThinkFurther questions={[
        '¿Qué supuestos sobre el aprendizaje revelan las evaluaciones de su asignatura?',
        'Si el enfoque profundo lo induce la evaluación, ¿qué margen de responsabilidad le queda al estudiante?',
      ]} />
      <SelfCheck items={[
        { question: '¿Cuál es, según Ausubel, el factor que más influye en el aprendizaje?', answer: 'Lo que el estudiante ya sabe: sus conocimientos previos.' },
        { question: '¿Qué designa la zona de desarrollo próximo?', answer: 'La distancia entre lo que una persona resuelve sola y lo que resuelve con la guía de otro más capaz.' },
        { question: '¿Qué tipo de evaluación favorece un enfoque profundo?', answer: 'La que exige aplicar, justificar y transferir, no solo reproducir.' },
        { review: 'Unidad 1', question: '¿Qué dos condiciones reúne la “buena enseñanza”?', answer: 'Ser epistemológicamente válida y moralmente justificable.' },
      ]} />
      <Activities items={ACTIVITIES} />
      <AlignmentTable objectives={OBJECTIVES} activities={ACTIVITIES} />
      <ReferencesBox>
        <Reference>Ambrose, S. A., Bridges, M. W., DiPietro, M., Lovett, M. C., &amp; Norman, M. K. (2010). <i>How learning works: Seven research-based principles for smart teaching</i>. Jossey-Bass.</Reference>
        <Reference>Ausubel, D. P. (1968). <i>Educational psychology: A cognitive view</i>. Holt, Rinehart &amp; Winston.</Reference>
        <Reference>Biggs, J., &amp; Tang, C. (2011). <i>Teaching for quality learning at university</i> (4.ª ed.). Open University Press.</Reference>
        <Reference>Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. <i>Cognitive Science, 12</i>(2), 257–285.</Reference>
        <Reference>Sweller, J., van Merriënboer, J. J. G., &amp; Paas, F. (2019). Cognitive architecture and instructional design: 20 years later. <i>Educational Psychology Review, 31</i>(2), 261–292. https://doi.org/10.1007/s10648-019-09465-5</Reference>
        <Reference>Vygotsky, L. S. (1978). <i>Mind in society: The development of higher psychological processes</i>. Harvard University Press.</Reference>
      </ReferencesBox>
    </Numbering>
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
    <>
      <Heading level={1}>Glosario de términos clave</Heading>
      <Glossary entries={GLOSSARY} />
    </>
  );
}

export function DiagramsExample() {
  return (
    <Numbering figures={['alineamiento', 'miller']} firstFigure={3}>
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
      <Figure id="miller" title="Pirámide de Miller para la evaluación de la competencia clínica" note={<>Adaptado de <Cite narrative authors={['Miller']} year={1990} page="S63" />.</>}>
        <Pyramid levels={[
          { title: 'Hace', text: 'Desempeño en la práctica real' },
          { title: 'Muestra cómo', text: 'Desempeño en entorno controlado (OSCE)' },
          { title: 'Sabe cómo', text: 'Aplicación del conocimiento a casos' },
          { title: 'Sabe', text: 'Conocimiento factual' },
        ]} />
      </Figure>
    </Numbering>
  );
}
