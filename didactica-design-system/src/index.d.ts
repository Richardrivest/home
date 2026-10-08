import type { ReactNode, ReactElement } from 'react';

/** A manual page: paper ground, 1in margins, running header and «Página N» footer. */
export interface PageProps {
  /** Running-header text, right-aligned over a `rule` hairline. */
  header?: string;
  /** Page number for the centred footer («Página N»). */
  page?: number;
  children: ReactNode;
  className?: string;
}
export declare function Page(props: PageProps): ReactElement;

/** The manual's cover: kicker, title, italic subtitle, lede, ribbon and metadata lines, all centred. */
export interface TitlePageProps {
  /** Upper-case series line in `azure` (e.g. «Manual de formación docente»). */
  kicker?: string;
  /** Book title in `navy`. */
  title: string;
  /** Italic subtitle in `subtitle`. */
  subtitle?: string;
  /** One-line scope description in `lede`. */
  lede?: string;
  /** Text set between the two 1pt `navy` rules. */
  ribbon?: string;
  /** Centred metadata lines in `caption` (level, citation style, year). */
  meta?: string[];
}
export declare function TitlePage(props: TitlePageProps): ReactElement;

export interface TocEntry {
  title: string;
  page: number | string;
  /** 1 = unit, 2 = section, 3 = sub-section. Defaults to 1. */
  level?: 1 | 2 | 3;
}
/** «Índice»: Word TOC levels 1–3 with dotted leaders to the page number. */
export interface TableOfContentsProps {
  /** Defaults to «Índice». */
  title?: string;
  entries: TocEntry[];
}
export declare function TableOfContents(props: TableOfContentsProps): ReactElement;

/** Unit (1), section (2) and sub-section (3) headings in Calibri bold, navy then azure. */
export interface HeadingProps {
  /** Defaults to 1. */
  level?: 1 | 2 | 3;
  /** Anchor id for the TOC. */
  id?: string;
  /** Heading text, numbered as in the manual («1.1. …»). */
  children: ReactNode;
}
export declare function Heading(props: HeadingProps): ReactElement;

/** Body paragraph: 11.5pt Cambria, justified, 9pt after. */
export interface ParagraphProps {
  children: ReactNode;
}
export declare function Paragraph(props: ParagraphProps): ReactElement;

/** «Concepto clave»: a framed pale-blue box holding one definition to retain. */
export interface ConceptBoxProps {
  /** The concept being defined. */
  term: string;
  /** Prefix, rendered in capitals. Defaults to «Concepto clave». */
  label?: string;
  /** The definition: one paragraph, with its APA citation. */
  children: ReactNode;
}
export declare function ConceptBox(props: ConceptBoxProps): ReactElement;

/** Comparison table: navy header row, hairline grid, zebra body rows and an italic «Tabla N.» caption. */
export interface DataTableProps {
  columns: string[];
  /** Body rows; even rows get the `band` fill. */
  rows: ReactNode[][];
  /** Column widths, e.g. ['22%', '39%', '39%']. */
  widths?: string[];
  /** Table number, rendered as «Tabla N.». */
  number?: number;
  /** Caption ending with its source («Elaboración propia a partir de …»). */
  caption?: string;
}
export declare function DataTable(props: DataTableProps): ReactElement;

export type BulletItem = string | { text: string; items?: BulletItem[] };
/** Justified bullet list (● ○ ■ by level). */
export interface BulletListProps {
  items: BulletItem[];
}
export declare function BulletList(props: BulletListProps): ReactElement;

/** Glossary entry: the term in bold navy, a colon, then the definition. */
export interface GlossaryEntryProps {
  /** Term, without the colon. */
  term: string;
  children: ReactNode;
}
export declare function GlossaryEntry(props: GlossaryEntryProps): ReactElement;

/** One APA 7 reference with a 0.5in hanging indent; pass the title in <i>. */
export interface ReferenceProps {
  children: ReactNode;
}
export declare function Reference(props: ReferenceProps): ReactElement;
