import type { ReactNode, ReactElement } from 'react';

/* ---------- Layout ---------- */

/** A manual page: paper sheet, margins, running header and “Página N” footer. */
export interface PageProps { header?: string; page?: number; children: ReactNode; className?: string }
export declare function Page(props: PageProps): ReactElement;

/** The manual's cover: kicker, title, italic subtitle, lede, ribbon and metadata lines, all centred. */
export interface TitlePageProps {
  /** 'mosaic' (default): the nine box colours as plain squares; 'band': navy band; 'motif': nested circles; 'editorial': left rule and volume number. */
  variant?: 'mosaic' | 'band' | 'motif' | 'editorial';
  /** In print, colour runs to the edge of the paper (no page margin on the cover). */
  bleed?: boolean;
  /** Volume or unit number, shown large by the 'editorial' variant. */
  volume?: number | string;
  kicker?: string; title: string; subtitle?: string; lede?: string; ribbon?: string;
  /** Authors, institution: first line bold. Write unknown details as “[…]” to mark them as placeholders. */
  credits?: string[];
  meta?: string[];
}
export declare function TitlePage(props: TitlePageProps): ReactElement;

export interface TocEntry { title: string; page: number | string; level?: 1 | 2 | 3 }
/** “Índice”: levels 1–3 with dotted leaders to the page number. */
export interface TableOfContentsProps { title?: string; entries: TocEntry[] }
export declare function TableOfContents(props: TableOfContentsProps): ReactElement;

/** Unit opener: “Unidad N” kicker, unit title (h1) and a lead paragraph. */
export interface ChapterOpenerProps {
  number?: number;
  /** Unit title without “Unidad N.”. */
  title: string;
  lead?: ReactNode;
  id?: string;
}
export declare function ChapterOpener(props: ChapterOpenerProps): ReactElement;

/* ---------- Text ---------- */

/** Headings: 1 for unnumbered unit-level sections (Glosario, Referencias), 2 sections, 3 sub-sections. */
export interface HeadingProps { level?: 1 | 2 | 3; id?: string; children: ReactNode }
export declare function Heading(props: HeadingProps): ReactElement;

/** Body paragraph: 16px Cambria, 1.6 leading; left-aligned on screen, justified in print. */
export interface ParagraphProps { children: ReactNode }
export declare function Paragraph(props: ParagraphProps): ReactElement;

export type BulletItem = string | { text: string; items?: BulletItem[] };
/** Bullet list (● ○ ■ by level). */
export interface BulletListProps { items: BulletItem[] }
export declare function BulletList(props: BulletListProps): ReactElement;

/* ---------- Citations (APA 7) ---------- */

export interface Work {
  /** Surnames in source order; 3 or more become “Primero et al.”. */
  authors: string[];
  /** Year, or “s. f.”. */
  year: number | string;
  /** Page or range: 45 → “p. 45”; "45-47" → “pp. 45–47”. */
  page?: number | string;
  /** Replaces the page when the source has none: “párr. 4”, “cap. 3”. */
  locator?: string;
}
/** APA 7 in-text citation with page: (Biggs & Tang, 2011, p. 45) or, narrative, Biggs y Tang (2011, p. 45). */
export interface CiteProps extends Partial<Work> {
  /** Work id declared in <Bibliography>: replaces authors and year, and registers the work as cited. */
  id?: string;
  /** Narrative form: authors in the sentence, joined with “y”. */
  narrative?: boolean;
  /** Several works in one parenthesis, ordered alphabetically and joined with “;”. */
  works?: Work[];
}
export declare function Cite(props: CiteProps): ReactElement;

/** Short quotation (under 40 words) in English double quotes “…”, followed by its APA citation. */
export interface QuoteProps { children: ReactNode; /** Inline work, or { id, page } inside <Bibliography>. */ cite: Work | { id: string; page?: number | string; locator?: string } }
export declare function Quote(props: QuoteProps): ReactElement;

/** APA 7 block quotation (40 words or more): indented, no quotation marks, citation after the final period. */
export interface BlockQuoteProps { children: ReactNode; cite: Work | { id: string; page?: number | string; locator?: string } }
export declare function BlockQuote(props: BlockQuoteProps): ReactElement;

export declare function formatCitation(work: Work, options?: { narrative?: boolean }): string;
export declare function formatCitations(works: Work[]): string;
export declare function formatLocator(work: Pick<Work, 'page' | 'locator'>): string;

/* ---------- The seven didactic boxes ---------- */

export type BoxKind = 'keypoints' | 'objectives' | 'important' | 'mistake' | 'example' | 'thinking' | 'selfcheck' | 'activities' | 'references';
export type BoxFamily = 'open' | 'text' | 'close';

/** The shared frame of the didactic boxes; the family sets the shape (open: filled header, text: top rule, close: plain frame). */
export interface BoxProps { kind: BoxKind; title?: string; children: ReactNode }
export declare function Box(props: BoxProps): ReactElement;

/** “Puntos Clave”: the unit summary, first box of every unit. */
export interface KeyPointsProps {
  /** 3–5 one-line key points. */
  items: ReactNode[];
  /** 1–3 “Antes de leer” questions, revisited in ThinkFurther. */
  before?: ReactNode[];
  title?: string;
}
export declare function KeyPoints(props: KeyPointsProps): ReactElement;

export type BloomId = 'recordar' | 'comprender' | 'aplicar' | 'analizar' | 'evaluar' | 'crear';
export interface Objective { id?: string; level: BloomId; text: ReactNode }
/** “Objetivos”: learning objectives, each tagged with its Bloom (revised) level. */
export interface ObjectivesProps {
  /** Each objective starts with a verb of its level (see BLOOM); ids default to O1, O2… */
  items: Objective[];
  /** Defaults to “Al finalizar la unidad, usted será capaz de:”. */
  intro?: string;
  title?: string;
}
export declare function Objectives(props: ObjectivesProps): ReactElement;

/** “Importante”: a key concept or definition the reader should retain. */
export interface ImportantProps { term?: string; children: ReactNode; title?: string }
export declare function Important(props: ImportantProps): ReactElement;

/** “Error Frecuente”: a common misconception and what the evidence shows instead. */
export interface CommonMistakeProps {
  misconception: ReactNode;
  /** What the evidence shows, with its citation. */
  correction: ReactNode;
  /** Why the belief does not hold, or why it is attractive (“Por qué no se sostiene”). */
  explanation?: ReactNode;
  children?: ReactNode;
  title?: string;
}
export declare function CommonMistake(props: CommonMistakeProps): ReactElement;

/** “En el Aula”: a worked classroom case — situation, didactic decision and its rationale. */
export interface ClassroomProps {
  /** 'sociales' | 'salud' | 'general' or any label. */
  discipline?: string;
  situation: ReactNode;
  decision: ReactNode;
  /** Why, with its citation. */
  rationale?: ReactNode;
  title?: string;
}
export declare function Classroom(props: ClassroomProps): ReactElement;

/** “Para Seguir Pensando”: open, critical questions that close the unit. */
export interface ThinkFurtherProps {
  questions: ReactNode[];
  /** The “Antes de leer” questions from KeyPoints, brought back at the close. */
  revisit?: ReactNode[];
  title?: string;
}
export declare function ThinkFurther(props: ThinkFurtherProps): ReactElement;

export interface Activity {
  type?: 'pregunta' | 'tarea' | 'caso' | 'debate';
  /** Bloom level the activity demands. */
  level?: BloomId;
  /** Objectives it practises, e.g. ['O2']. */
  objectives?: string[];
  text: ReactNode;
}
export type ActivityItem = string | Activity;
/** “Actividades”: questions and tasks to work the unit's concepts. */
export interface ActivitiesProps { items: ActivityItem[]; title?: string }
export declare function Activities(props: ActivitiesProps): ReactElement;

/** “Referencias”: the unit's APA 7 reference list, French (hanging) indent. */
export interface ReferencesBoxProps {
  children?: ReactNode;
  /** Inside <Bibliography>: the works cited above, formatted and in APA order. */
  auto?: boolean;
  /** Every declared work (manual-wide bibliography). */
  all?: boolean;
  title?: string;
}
export declare function ReferencesBox(props: ReferencesBoxProps): ReactElement;

/** “Autoevaluación”: retrieval practice; answers open on screen and print as a key. */
export interface SelfCheckProps {
  /** review names an earlier unit, e.g. 'Unidad 1'. */
  items: { question: ReactNode; answer: ReactNode; review?: string }[];
  title?: string;
}
export declare function SelfCheck(props: SelfCheckProps): ReactElement;

/** Which activities practise each objective; flags gaps and level mismatches. */
export interface AlignmentTableProps { objectives: Objective[]; activities: Activity[]; title?: string }
export declare function AlignmentTable(props: AlignmentTableProps): ReactElement;
export declare function checkAlignment(objectives: Objective[], activities: Activity[]): {
  rows: { id: string; level: (typeof BLOOM)[number] | null; text: ReactNode; activities: number[]; problems: string[] }[];
  issues: string[];
};
export declare function objectiveId(objective: Objective, index: number): string;

/** “Cómo usar este manual”: the legend of box types, grouped by family. */
export declare function BoxLegend(): ReactElement;

/** A Lucide line icon drawn in currentColor. Decorative unless given a label. */
export interface IconProps { name: string; size?: number; label?: string; className?: string }
export declare function Icon(props: IconProps): ReactElement | null;

/* ---------- Tables and figures (APA 7) ---------- */

/** APA 7 table: “Tabla N” and italic title above, horizontal rules, navy header, optional row headers, “Nota.” below. */
export interface DataTableProps {
  columns: string[];
  rows: ReactNode[][];
  widths?: string[];
  number?: number;
  /** Registry id inside <Numbering> (automatic number, cross-reference target). */
  id?: string;
  title?: string;
  note?: ReactNode;
  /** First column as row headers: conceptual (comparison) tables. */
  rowHeader?: boolean;
  /** Solid navy header bar (slides, posters); default is navy text over a rule. */
  filled?: boolean;
}
export declare function DataTable(props: DataTableProps): ReactElement;

/** APA 7 figure: “Figura N” and the italic title above a diagram or image; “Nota.” below. */
export interface FigureProps {
  number?: number;
  /** Registry id inside <Numbering>: the number comes from it and <FigRef> can point to it. */
  id?: string;
  title?: string;
  note?: ReactNode;
  children: ReactNode;
}
export declare function Figure(props: FigureProps): ReactElement;

/* ---------- Diagrams ---------- */

/** Concept web: a central concept linked to up to 8 related concepts, with relation labels and short details. */
export interface ConceptWebProps { center: string; nodes: { label: string; relation?: string; detail?: string }[]; label?: string }
export declare function ConceptWeb(props: ConceptWebProps): ReactElement;

export interface Step { title: string; text?: string }
/** Cycle: 3–8 steps around a circle joined by arrows, with an optional centre label. */
export interface CycleDiagramProps { steps: Step[]; center?: string; label?: string }
export declare function CycleDiagram(props: CycleDiagramProps): ReactElement;

/** Pyramid of levels, top (most advanced) first, e.g. Miller's pyramid; descriptions to the right. */
export interface PyramidProps { levels: Step[]; label?: string }
export declare function Pyramid(props: PyramidProps): ReactElement;

/** Process flow: numbered steps joined by arrows; horizontal on wide screens, vertical on narrow ones. */
export interface ProcessFlowProps { steps: Step[]; label?: string }
export declare function ProcessFlow(props: ProcessFlowProps): ReactElement;

/** Hierarchy or classification; top-down with up to 4 leaves, left to right with more. */
export interface TreeNode { label: string; detail?: string; children?: TreeNode[] }
export interface TreeDiagramProps { root: TreeNode; direction?: 'auto' | 'down' | 'right'; label?: string }
export declare function TreeDiagram(props: TreeDiagramProps): ReactElement;

/** Concept map: concepts in levels joined by labelled arrows (propositions). */
export interface ConceptMapProps { nodes: { id: string; label: string; detail?: string; level: number }[]; links: { from: string; to: string; label: string }[]; label?: string }
export declare function ConceptMap(props: ConceptMapProps): ReactElement;

/** Mind map: a central topic with branches to both sides. */
export interface MindMapProps { center: string; branches: { label: string; items?: string[] }[]; label?: string }
export declare function MindMap(props: MindMapProps): ReactElement;

/** Venn diagram of two or three sets. */
export interface VennDiagramProps { sets: [string, string] | [string, string, string]; regions: Partial<Record<'a' | 'b' | 'c' | 'ab' | 'ac' | 'bc' | 'abc', string[]>>; label?: string }
export declare function VennDiagram(props: VennDiagramProps): ReactElement;

/** 2 × 2 matrix; quadrants are top-left, top-right, bottom-left, bottom-right. */
export interface Axis { label: string; low: string; high: string }
export interface QuadrantMatrixProps { xAxis: Axis; yAxis: Axis; quadrants: [Step, Step, Step, Step]; label?: string }
export declare function QuadrantMatrix(props: QuadrantMatrixProps): ReactElement;

/** Timeline of dated events (up to 8). */
export interface TimelineProps { events: { date: string; title: string; text?: string }[]; label?: string }
export declare function Timeline(props: TimelineProps): ReactElement;

/** Cause-and-effect (Ishikawa) diagram. */
export interface FishboneProps { effect: string; causes: { category: string; items: string[] }[]; label?: string }
export declare function Fishbone(props: FishboneProps): ReactElement;

/** Continuum between two poles; position runs from 0 (left) to 1 (right). */
export interface SpectrumProps { left: string; right: string; points: { label: string; position: number; text?: string }[]; label?: string }
export declare function Spectrum(props: SpectrumProps): ReactElement;

/** Funnel of stages, widest first. */
export interface FunnelProps { stages: Step[]; label?: string }
export declare function Funnel(props: FunnelProps): ReactElement;

/** Staircase of progressive levels, lowest first. */
export interface StaircaseProps { steps: Step[]; label?: string }
export declare function Staircase(props: StaircaseProps): ReactElement;

/** Nested circles, innermost first. */
export interface NestedCirclesProps { layers: Step[]; label?: string }
export declare function NestedCircles(props: NestedCirclesProps): ReactElement;

/** Iceberg: visible above the waterline, hidden below. */
export interface IcebergProps { visible: string[]; hidden: string[]; visibleTitle?: string; hiddenTitle?: string; label?: string }
export declare function Iceberg(props: IcebergProps): ReactElement;

/* ---------- Reference matter ---------- */

/** Glossary entry: the term in bold navy, a colon, then the definition. */
export interface GlossaryEntryProps { term: string; /** Link target for <Term to>. */ id?: string; children: ReactNode }
export declare function GlossaryEntry(props: GlossaryEntryProps): ReactElement;

/** One APA 7 reference with a French (hanging) indent; pass the title in <i>. */
export interface ReferenceProps { children: ReactNode }
export declare function Reference(props: ReferenceProps): ReactElement;

export declare const BLOOM: { id: BloomId; level: number; name: string; verbs: string[] }[];
export declare function bloomLevel(id: string): (typeof BLOOM)[number] | null;

/* ---------- Numbering, cross-references and glossary links ---------- */

/** Numbers figures and tables from their ids, in order of first mention. */
export interface NumberingProps { figures?: string[]; tables?: string[]; firstFigure?: number; firstTable?: number; children: ReactNode }
export declare function Numbering(props: NumberingProps): ReactElement;

/** Cross-reference: “Figura 2”, or with paren “(véase la Figura 2)”. */
export interface FigRefProps { to: string; paren?: boolean }
export declare function FigRef(props: FigRefProps): ReactElement;

/** A term in running text linked to its glossary entry. */
export interface TermProps { to: string; children: ReactNode }
export declare function Term(props: TermProps): ReactElement;

/** Glossary sorted alphabetically (Spanish collation). */
export interface GlossaryProps { entries: { id: string; term: string; definition: ReactNode }[] }
export declare function Glossary(props: GlossaryProps): ReactElement;

/* ---------- Bibliography (structured works, APA 7 references) ---------- */

export interface Person { family: string; given?: string; suffix?: string }
export interface StructuredWork {
  id: string;
  type?: 'book' | 'article' | 'chapter' | 'web';
  authors?: (Person | { literal: string })[];
  year?: number | string;
  /** Sentence case, as APA requires. */
  title: string;
  edition?: number;
  publisher?: string;
  journal?: string;
  volume?: number | string;
  issue?: number | string;
  pages?: string;
  articleNumber?: string;
  doi?: string;
  url?: string;
  /** Chapter: the book's editors and title. */
  editors?: Person[];
  container?: string;
  /** Web: site name and full date. */
  site?: string;
  date?: string;
}
/** Declares the works a unit can cite; <Cite id> and <ReferencesBox auto> read from it. */
export interface BibliographyProps { works: StructuredWork[]; children: ReactNode }
export declare function Bibliography(props: BibliographyProps): ReactElement;
export declare function referenceSegments(work: StructuredWork, yearLabel?: string): { text: string; italic?: boolean }[];
export declare function referenceText(work: StructuredWork, yearLabel?: string): string;
export declare function orderWorks(works: StructuredWork[]): StructuredWork[];
export declare function yearLabels(works: StructuredWork[]): Record<string, string>;
export declare function authorList(authors: (Person | { literal: string })[]): string;
