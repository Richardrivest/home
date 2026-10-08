import type { ReactNode, ReactElement } from 'react';

/* ---------- Layout ---------- */

/** A manual page: paper sheet, margins, running header and “Página N” footer. */
export interface PageProps { header?: string; page?: number; children: ReactNode; className?: string }
export declare function Page(props: PageProps): ReactElement;

/** The manual's cover: kicker, title, italic subtitle, lede, ribbon and metadata lines, all centred. */
export interface TitlePageProps { kicker?: string; title: string; subtitle?: string; lede?: string; ribbon?: string; meta?: string[] }
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
  /** Narrative form: authors in the sentence, joined with “y”. */
  narrative?: boolean;
  /** Several works in one parenthesis, ordered alphabetically and joined with “;”. */
  works?: Work[];
}
export declare function Cite(props: CiteProps): ReactElement;

/** Short quotation (under 40 words) in English double quotes “…”, followed by its APA citation. */
export interface QuoteProps { children: ReactNode; cite: Work }
export declare function Quote(props: QuoteProps): ReactElement;

/** APA 7 block quotation (40 words or more): indented, no quotation marks, citation after the final period. */
export interface BlockQuoteProps { children: ReactNode; cite: Work }
export declare function BlockQuote(props: BlockQuoteProps): ReactElement;

export declare function formatCitation(work: Work, options?: { narrative?: boolean }): string;
export declare function formatCitations(works: Work[]): string;
export declare function formatLocator(work: Pick<Work, 'page' | 'locator'>): string;

/* ---------- The seven didactic boxes ---------- */

export type BoxKind = 'keypoints' | 'objectives' | 'important' | 'mistake' | 'thinking' | 'activities' | 'references';

/** The shared frame of the seven didactic boxes: tinted surface, icon + title header, body. */
export interface BoxProps { kind: BoxKind; title?: string; children: ReactNode }
export declare function Box(props: BoxProps): ReactElement;

/** “Puntos Clave”: the unit summary, first box of every unit. */
export interface KeyPointsProps { items: ReactNode[]; title?: string }
export declare function KeyPoints(props: KeyPointsProps): ReactElement;

export type BloomId = 'recordar' | 'comprender' | 'aplicar' | 'analizar' | 'evaluar' | 'crear';
/** “Objetivos”: learning objectives, each tagged with its Bloom (revised) level. */
export interface ObjectivesProps {
  /** Each objective starts with a verb of its level (see BLOOM). */
  items: { level: BloomId; text: ReactNode }[];
  /** Defaults to “Al finalizar la unidad, usted será capaz de:”. */
  intro?: string;
  title?: string;
}
export declare function Objectives(props: ObjectivesProps): ReactElement;

/** “Importante”: a key concept or definition the reader should retain. */
export interface ImportantProps { term?: string; children: ReactNode; title?: string }
export declare function Important(props: ImportantProps): ReactElement;

/** “Error Frecuente”: a common misconception and what the evidence shows instead. */
export interface CommonMistakeProps { misconception: ReactNode; correction: ReactNode; children?: ReactNode; title?: string }
export declare function CommonMistake(props: CommonMistakeProps): ReactElement;

/** “Para Seguir Pensando”: open, critical questions that close the unit. */
export interface ThinkFurtherProps { questions: ReactNode[]; title?: string }
export declare function ThinkFurther(props: ThinkFurtherProps): ReactElement;

export type ActivityItem = string | { type?: 'pregunta' | 'tarea' | 'caso' | 'debate'; text: ReactNode };
/** “Actividades”: questions and tasks to work the unit's concepts. */
export interface ActivitiesProps { items: ActivityItem[]; title?: string }
export declare function Activities(props: ActivitiesProps): ReactElement;

/** “Referencias”: the unit's APA 7 reference list, French (hanging) indent. */
export interface ReferencesBoxProps { children: ReactNode; title?: string }
export declare function ReferencesBox(props: ReferencesBoxProps): ReactElement;

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
  title?: string;
  note?: ReactNode;
  /** First column as row headers: conceptual (comparison) tables. */
  rowHeader?: boolean;
}
export declare function DataTable(props: DataTableProps): ReactElement;

/** APA 7 figure: “Figura N” and the italic title above a diagram or image; “Nota.” below. */
export interface FigureProps { number?: number; title?: string; note?: ReactNode; children: ReactNode }
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

/* ---------- Reference matter ---------- */

/** Glossary entry: the term in bold navy, a colon, then the definition. */
export interface GlossaryEntryProps { term: string; children: ReactNode }
export declare function GlossaryEntry(props: GlossaryEntryProps): ReactElement;

/** One APA 7 reference with a French (hanging) indent; pass the title in <i>. */
export interface ReferenceProps { children: ReactNode }
export declare function Reference(props: ReferenceProps): ReactElement;

export declare const BLOOM: { id: BloomId; level: number; name: string; verbs: string[] }[];
export declare function bloomLevel(id: string): (typeof BLOOM)[number] | null;
