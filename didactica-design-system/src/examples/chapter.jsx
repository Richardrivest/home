// A complete unit built with the system, from Unidad 2 of the manual.
// Page numbers shown as “xx” are placeholders: the system's format is
// exact, but those pages have not been checked against the books.
import React from 'react';
import {
  ChapterOpener, Heading, Paragraph, Cite, Quote, KeyPoints, Objectives, Important, CommonMistake,
  ThinkFurther, Activities, ReferencesBox, Reference, DataTable, Figure, ConceptWeb, CycleDiagram,
  Pyramid, ProcessFlow,
} from '../index.js';

export const AMBROSE = { authors: ['Ambrose', 'Bridges', 'DiPietro', 'Lovett', 'Norman'], year: 2010, page: 'xx' };
export const AUSUBEL = { authors: ['Ausubel'], year: 1968, page: 'xx' };
export const BIGGS = { authors: ['Biggs', 'Tang'], year: 2011, page: 'xx' };
export const SWELLER = { authors: ['Sweller'], year: 1988, page: 'xx' };
export const VYGOTSKY = { authors: ['Vygotsky'], year: 1978, page: 'xx' };

export function ChapterExample() {
  return (
    <>
      <ChapterOpener
        number={2}
        title="Teorías del aprendizaje en la educación superior"
        lead="Toda decisión de enseñanza descansa, explícita o implícitamente, en una teoría acerca de cómo aprenden las personas. Hacer conscientes esos supuestos es condición para tomar decisiones fundamentadas."
      />
      <KeyPoints items={[
        'El conocimiento se construye a partir de lo que el estudiante ya sabe; indagar las ideas previas es parte del trabajo didáctico.',
        'El aprendizaje se produce en la interacción social: la buena enseñanza opera en la zona de desarrollo próximo.',
        'La memoria de trabajo es limitada: enseñar bien supone gestionar la carga cognitiva.',
        'El enfoque profundo o superficial lo induce, sobre todo, el modo en que se evalúa.',
        'Los “estilos de aprendizaje” carecen de respaldo empírico: son un neuromito.',
      ]} />
      <Objectives items={[
        { level: 'comprender', text: 'Explicar los supuestos de las perspectivas constructivista, sociocultural y cognitiva sobre el aprendizaje.' },
        { level: 'analizar', text: 'Comparar las implicancias didácticas de cada perspectiva para la enseñanza universitaria.' },
        { level: 'evaluar', text: 'Valorar críticamente afirmaciones pedagógicas de origen “neuro” según el estándar de evidencia disponible.' },
        { level: 'crear', text: 'Diseñar una actividad que gestione la carga cognitiva y active la autorregulación.' },
      ]} />

      <Heading level={2}>2.1. Constructivismo y aprendizaje significativo</Heading>
      <Paragraph>
        La premisa constructivista sostiene que el conocimiento no se transfiere de manera pasiva sino que es construido
        activamente por quien aprende. <Cite narrative {...AUSUBEL} /> lo resumió en un principio: <Quote cite={{ authors: ['Ausubel'], year: 1968, page: 'vi' }}>the most important single factor influencing learning is what the learner already knows. Ascertain this and teach him accordingly</Quote>.
      </Paragraph>

      <Heading level={2}>2.2. La perspectiva sociocultural</Heading>
      <Paragraph>
        <Cite narrative {...VYGOTSKY} /> desplazó el foco desde el individuo hacia la matriz social del aprendizaje: este
        tira del desarrollo y se produce en la interacción mediada por instrumentos culturales, entre ellos el lenguaje.
      </Paragraph>
      <Important term="Zona de desarrollo próximo (ZDP)">
        <p>
          Franja entre el nivel de desarrollo real (lo que el estudiante resuelve solo) y el potencial (lo que resuelve con
          ayuda). La buena enseñanza opera en la ZDP: propone tareas que el estudiante aún no puede afrontar de manera
          autónoma pero sí con andamiaje <Cite {...VYGOTSKY} />.
        </p>
      </Important>

      <Figure number={1} title="Perspectivas complementarias sobre el aprendizaje" note={<>Elaboración propia a partir de <Cite narrative {...AUSUBEL} />, <Cite narrative {...VYGOTSKY} />, <Cite narrative {...SWELLER} />, <Cite narrative {...BIGGS} /> y <Cite narrative {...AMBROSE} />.</>}>
        <ConceptWeb center="Aprendizaje" nodes={[
          { label: 'Conocimiento previo', relation: 'parte de', detail: 'Ausubel' },
          { label: 'Mediación social', relation: 'se produce en', detail: 'Vygotsky' },
          { label: 'Carga cognitiva', relation: 'limitado por', detail: 'Sweller' },
          { label: 'Enfoque profundo', relation: 'inducido por la evaluación', detail: 'Biggs y Tang' },
          { label: 'Motivación', relation: 'sostenido por', detail: 'Ambrose et al.' },
        ]} />
      </Figure>

      <Heading level={2}>2.3. Enfoques profundos y superficiales</Heading>
      <Paragraph>
        La investigación distinguió un enfoque superficial, orientado a reproducir, de uno profundo, orientado a
        comprender y otorgar sentido <Cite {...BIGGS} />. El enfoque no es solo un rasgo del estudiante: lo induce,
        sobre todo, el modo en que se evalúa.
      </Paragraph>
      <CommonMistake
        misconception={<>Cada estudiante aprende mejor en su “estilo de aprendizaje” (visual, auditivo, kinestésico) y la enseñanza debe ajustarse a él.</>}
        correction={<>No hay evidencia empírica que lo sustente; es un neuromito de amplia difusión. Conviene ajustar la modalidad al contenido, no a un supuesto estilo <Cite {...AMBROSE} />.</>}
      />

      <DataTable
        number={1}
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

      <Heading level={2}>2.4. Motivación y autorregulación</Heading>
      <Paragraph>
        Los aprendices eficaces planifican, monitorean y evalúan su propio aprendizaje, y ajustan sus estrategias en
        función de los resultados <Cite works={[AMBROSE, BIGGS]} />.
      </Paragraph>
      <Figure number={2} title="Ciclo de la autorregulación del aprendizaje" note={<>Elaboración propia a partir de <Cite narrative {...AMBROSE} />.</>}>
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
        '¿Por qué los neuromitos resisten a la evidencia en la formación docente?',
      ]} />
      <Activities items={[
        { type: 'tarea', text: 'Identifique tres ideas previas erróneas frecuentes en un tema de su disciplina y proponga una estrategia para confrontarlas.' },
        { type: 'tarea', text: 'Diseñe una rutina de práctica de recuperación espaciada para un contenido central de su asignatura.' },
        { type: 'pregunta', text: 'Analice una actividad de su campo en términos de carga cognitiva: ¿qué elementos podrían sobrecargar la memoria de trabajo?' },
        { type: 'caso', text: 'Diseñe una consigna que active la metacognición de sus estudiantes, por ejemplo una autoevaluación guiada.' },
      ]} />
      <ReferencesBox>
        <Reference>Ambrose, S. A., Bridges, M. W., DiPietro, M., Lovett, M. C., &amp; Norman, M. K. (2010). <i>How learning works: Seven research-based principles for smart teaching</i>. Jossey-Bass.</Reference>
        <Reference>Ausubel, D. P. (1968). <i>Educational psychology: A cognitive view</i>. Holt, Rinehart &amp; Winston.</Reference>
        <Reference>Biggs, J., &amp; Tang, C. (2011). <i>Teaching for quality learning at university</i> (4.ª ed.). Open University Press.</Reference>
        <Reference>Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. <i>Cognitive Science, 12</i>(2), 257–285.</Reference>
        <Reference>Vygotsky, L. S. (1978). <i>Mind in society: The development of higher psychological processes</i>. Harvard University Press.</Reference>
      </ReferencesBox>
    </>
  );
}

export function DiagramsExample() {
  return (
    <>
      <Heading level={1}>Galería de diagramas</Heading>
      <Figure number={3} title="Alineamiento constructivo" note={<>Elaboración propia a partir de <Cite narrative {...BIGGS} />.</>}>
        <ProcessFlow label="Alineamiento constructivo" steps={[
          { title: 'Resultados de aprendizaje', text: 'qué deberá poder hacer el estudiante' },
          { title: 'Actividades', text: 'que ponen en práctica ese desempeño' },
          { title: 'Evaluación', text: 'que verifica ese mismo desempeño' },
        ]} />
      </Figure>
      <Figure number={4} title="Pirámide de Miller para la evaluación de la competencia clínica" note={<>Adaptado de <Cite narrative authors={['Miller']} year={1990} page="S63" />.</>}>
        <Pyramid levels={[
          { title: 'Hace', text: 'Desempeño en la práctica real' },
          { title: 'Muestra cómo', text: 'Desempeño en entorno controlado (OSCE)' },
          { title: 'Sabe cómo', text: 'Aplicación del conocimiento a casos' },
          { title: 'Sabe', text: 'Conocimiento factual' },
        ]} />
      </Figure>
    </>
  );
}
