import type {
  Citation,
  Author,
  FormattedCitation,
  InTextOptions,
  JournalArticleCitation,
  BookCitation,
  BookChapterCitation,
  WebsiteCitation,
} from '../types';

// ── Author helpers ────────────────────────────────────────────────────────────

function getInitials(firstName: string): string {
  const parts = firstName.trim().split(/\s+/);
  return parts
    .filter(p => p.length > 0)
    .map(p => p[0].toUpperCase() + '.')
    .join(' ');
}

function formatAuthorReference(author: Author): string {
  const initials = getInitials(author.firstName);
  return initials ? `${author.lastName}, ${initials}` : author.lastName;
}

function formatAuthorsReference(authors: Author[]): string {
  if (authors.length === 0) return '';
  if (authors.length === 1) return formatAuthorReference(authors[0]);
  if (authors.length === 2) {
    return `${formatAuthorReference(authors[0])}, & ${formatAuthorReference(authors[1])}`;
  }
  if (authors.length <= 20) {
    const allButLast = authors.slice(0, -1).map(formatAuthorReference).join(', ');
    return `${allButLast}, & ${formatAuthorReference(authors[authors.length - 1])}`;
  }
  // 21+ authors
  const first19 = authors.slice(0, 19).map(formatAuthorReference).join(', ');
  return `${first19}, . . . ${formatAuthorReference(authors[authors.length - 1])}`;
}

function formatAuthorsInText(authors: Author[], style: 'parenthetical' | 'narrative'): string {
  if (authors.length === 0) return 'Autor desconocido';
  if (authors.length === 1) return authors[0].lastName;
  if (authors.length === 2) {
    const joiner = style === 'narrative' ? ' y ' : ' & ';
    return `${authors[0].lastName}${joiner}${authors[1].lastName}`;
  }
  return `${authors[0].lastName} et al.`;
}

function formatEditors(editors: Author[]): string {
  if (editors.length === 0) return '';
  const names = editors
    .map(e => `${getInitials(e.firstName)} ${e.lastName}`)
    .join(', ');
  const suffix = editors.length === 1 ? ' (Ed.)' : ' (Eds.)';
  return names + suffix;
}

// ── DOI helper ────────────────────────────────────────────────────────────────

function doiSuffix(doi?: string): string {
  if (!doi || !doi.trim()) return '';
  const normalized = doi.trim().replace(/^https?:\/\/doi\.org\//i, '');
  return ` https://doi.org/${normalized}`;
}

// ── In-text citation ──────────────────────────────────────────────────────────

export function formatInText(citation: Citation, options: InTextOptions): string {
  const { style, pageNumber } = options;
  const authorPart = formatAuthorsInText(citation.authors, style);
  const yearPart = citation.year;
  const pagePart = pageNumber && pageNumber.trim() ? `, p. ${pageNumber.trim()}` : '';

  if (style === 'narrative') {
    return `${authorPart} (${yearPart}${pagePart})`;
  }
  return `(${authorPart}, ${yearPart}${pagePart})`;
}

// ── Reference formatters by type ──────────────────────────────────────────────

function formatJournalArticle(c: JournalArticleCitation): { plain: string; md: string } {
  const authors = formatAuthorsReference(c.authors);
  const doi = doiSuffix(c.doi) || (c.url ? ` ${c.url}` : '');

  const volumePart = c.volume ? c.volume : '';
  const issuePart = c.issue ? `(${c.issue})` : '';
  const pagesPart = c.pages ? `, ${c.pages}` : '';

  const plain = `${authors} (${c.year}). ${c.title}. ${c.journal}, ${volumePart}${issuePart}${pagesPart}.${doi}`;
  const md = `${authors} (${c.year}). ${c.title}. *${c.journal}*, *${volumePart}*${issuePart}${pagesPart}.${doi}`;

  return { plain, md };
}

function formatBook(c: BookCitation): { plain: string; md: string } {
  const authors = formatAuthorsReference(c.authors);
  const edition = c.edition ? ` (${c.edition} ed.)` : '';
  const doi = doiSuffix(c.doi) || (c.url ? ` ${c.url}` : '');

  const plain = `${authors} (${c.year}). ${c.title}${edition}. ${c.publisher}.${doi}`;
  const md = `${authors} (${c.year}). *${c.title}*${edition}. ${c.publisher}.${doi}`;

  return { plain, md };
}

function formatBookChapter(c: BookChapterCitation): { plain: string; md: string } {
  const authors = formatAuthorsReference(c.authors);
  const editorsPart =
    c.editors && c.editors.length > 0 ? ` In ${formatEditors(c.editors)},` : ' In';
  const pagesPart = c.pages ? ` (pp. ${c.pages})` : '';
  const doi = doiSuffix(c.doi) || (c.url ? ` ${c.url}` : '');

  const plain = `${authors} (${c.year}). ${c.title}.${editorsPart} ${c.bookTitle}${pagesPart}. ${c.publisher}.${doi}`;
  const md = `${authors} (${c.year}). ${c.title}.${editorsPart} *${c.bookTitle}*${pagesPart}. ${c.publisher}.${doi}`;

  return { plain, md };
}

function formatWebsite(c: WebsiteCitation): { plain: string; md: string } {
  const authors = formatAuthorsReference(c.authors);
  const dateStr = c.publishDate || c.year;
  const siteNamePart = c.siteName ? ` *${c.siteName}*.` : '';
  const urlPart = c.url ? ` ${c.url}` : '';

  const plain = `${authors} (${dateStr}). ${c.title}.${c.siteName ? ` ${c.siteName}.` : ''}${urlPart}`;
  const md = `${authors} (${dateStr}). ${c.title}.${siteNamePart}${urlPart}`;

  return { plain, md };
}

// ── Public entry point ────────────────────────────────────────────────────────

export function formatCitation(citation: Citation, options?: Partial<InTextOptions>): FormattedCitation {
  const inTextOpts: InTextOptions = {
    style: options?.style ?? 'parenthetical',
    pageNumber: options?.pageNumber,
  };

  const inText = formatInText(citation, inTextOpts);

  let plain = '';
  let md = '';

  switch (citation.sourceType) {
    case 'journalArticle': {
      const r = formatJournalArticle(citation);
      plain = r.plain;
      md = r.md;
      break;
    }
    case 'book': {
      const r = formatBook(citation);
      plain = r.plain;
      md = r.md;
      break;
    }
    case 'bookChapter': {
      const r = formatBookChapter(citation);
      plain = r.plain;
      md = r.md;
      break;
    }
    case 'website': {
      const r = formatWebsite(citation);
      plain = r.plain;
      md = r.md;
      break;
    }
  }

  return { inText, reference: plain, referenceMd: md };
}

export function sortCitationsAPA(citations: Citation[]): Citation[] {
  return [...citations].sort((a, b) => {
    const surnameA = (a.authors[0]?.lastName ?? '').toLowerCase();
    const surnameB = (b.authors[0]?.lastName ?? '').toLowerCase();
    if (surnameA < surnameB) return -1;
    if (surnameA > surnameB) return 1;
    return a.year.localeCompare(b.year);
  });
}
