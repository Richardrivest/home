import { App, normalizePath, TFile, TFolder } from 'obsidian';
import type { Citation, Author, Quote, SourceType } from './types';

export class CitationLibrary {
  private app: App;
  private folderPath: string;

  constructor(app: App, folderPath: string) {
    this.app = app;
    this.folderPath = normalizePath(folderPath);
  }

  setFolder(folderPath: string): void {
    this.folderPath = normalizePath(folderPath);
  }

  async load(): Promise<Citation[]> {
    await this.ensureFolder();
    const folder = this.app.vault.getFolderByPath(this.folderPath);
    if (!folder) return [];

    const citations: Citation[] = [];
    for (const child of folder.children) {
      if (!(child instanceof TFile) || child.extension !== 'md') continue;
      const cache = this.app.metadataCache.getFileCache(child);
      if (!cache?.frontmatter) continue;
      const citation = this.parseFrontmatter(cache.frontmatter, child.path);
      if (citation) citations.push(citation);
    }

    return citations;
  }

  async save(citation: Citation): Promise<TFile> {
    await this.ensureFolder();
    const fileName = this.generateFileName(citation);
    const filePath = normalizePath(`${this.folderPath}/${fileName}.md`);
    const content = this.citationToNote(citation);

    const existing = this.app.vault.getFileByPath(filePath);
    if (existing) {
      await this.app.vault.modify(existing, content);
      return existing;
    }
    return await this.app.vault.create(filePath, content);
  }

  async delete(citation: Citation): Promise<void> {
    const path = citation.notePath;
    if (!path) return;
    const file = this.app.vault.getFileByPath(path);
    if (file) await this.app.vault.trash(file, true);
  }

  search(query: string, citations: Citation[]): Citation[] {
    if (!query.trim()) return citations;
    const q = query.toLowerCase();
    return citations.filter(c => {
      const authorMatch = c.authors.some(a => a.lastName.toLowerCase().includes(q));
      const yearMatch = c.year.includes(q);
      const titleMatch = c.title.toLowerCase().includes(q);
      return authorMatch || yearMatch || titleMatch;
    });
  }

  private async ensureFolder(): Promise<void> {
    if (!this.app.vault.getFolderByPath(this.folderPath)) {
      await this.app.vault.createFolder(this.folderPath);
    }
  }

  private generateFileName(citation: Citation): string {
    const firstAuthor = citation.authors[0]?.lastName ?? 'Autor';
    const year = citation.year;
    const titleSlug = citation.title
      .slice(0, 40)
      .replace(/[\\/:*?"<>|]/g, '')
      .trim();
    return `${firstAuthor} ${year} - ${titleSlug}`;
  }

  private citationToNote(citation: Citation): string {
    const lines: string[] = ['---'];

    lines.push(`citation-id: "${citation.id}"`);
    lines.push(`citation-type: ${sourceTypeToYaml(citation.sourceType)}`);

    lines.push('authors:');
    for (const author of citation.authors) {
      lines.push(`  - lastName: "${escapYaml(author.lastName)}"`);
      lines.push(`    firstName: "${escapYaml(author.firstName)}"`);
    }

    lines.push(`year: "${escapYaml(citation.year)}"`);
    lines.push(`title: "${escapYaml(citation.title)}"`);

    if (citation.doi) lines.push(`doi: "${escapYaml(citation.doi)}"`);
    if (citation.url) lines.push(`url: "${escapYaml(citation.url)}"`);
    lines.push(`date-added: "${citation.dateAdded}"`);

    if (citation.quotes && citation.quotes.length > 0) {
      lines.push('quotes:');
      for (const q of citation.quotes) {
        lines.push(`  - text: "${escapYaml(q.text)}"`);
        if (q.page) lines.push(`    page: "${escapYaml(q.page)}"`);
      }
    }

    switch (citation.sourceType) {
      case 'journalArticle':
        lines.push(`journal: "${escapYaml(citation.journal)}"`);
        if (citation.volume) lines.push(`volume: "${escapYaml(citation.volume)}"`);
        if (citation.issue) lines.push(`issue: "${escapYaml(citation.issue)}"`);
        if (citation.pages) lines.push(`pages: "${escapYaml(citation.pages)}"`);
        break;
      case 'book':
        lines.push(`publisher: "${escapYaml(citation.publisher)}"`);
        if (citation.edition) lines.push(`edition: "${escapYaml(citation.edition)}"`);
        break;
      case 'bookChapter':
        lines.push(`book-title: "${escapYaml(citation.bookTitle)}"`);
        lines.push(`publisher: "${escapYaml(citation.publisher)}"`);
        if (citation.pages) lines.push(`pages: "${escapYaml(citation.pages)}"`);
        if (citation.editors && citation.editors.length > 0) {
          lines.push('editors:');
          for (const ed of citation.editors) {
            lines.push(`  - lastName: "${escapYaml(ed.lastName)}"`);
            lines.push(`    firstName: "${escapYaml(ed.firstName)}"`);
          }
        }
        break;
      case 'website':
        if (citation.siteName) lines.push(`site-name: "${escapYaml(citation.siteName)}"`);
        if (citation.publishDate) lines.push(`publish-date: "${escapYaml(citation.publishDate)}"`);
        if (citation.accessDate) lines.push(`access-date: "${escapYaml(citation.accessDate)}"`);
        break;
    }

    lines.push('---');
    lines.push('');
    lines.push(`# ${citation.title}`);

    if (citation.quotes && citation.quotes.length > 0) {
      lines.push('');
      lines.push('## Citas textuales');
      for (const q of citation.quotes) {
        lines.push('');
        lines.push(`> "${q.text}"`);
        if (q.page) lines.push(`> — p. ${q.page}`);
      }
    }

    return lines.join('\n');
  }

  private parseFrontmatter(fm: Record<string, unknown>, notePath: string): Citation | null {
    try {
      const sourceType = yamlToSourceType(String(fm['citation-type'] ?? ''));
      if (!sourceType) return null;

      const authors = parseAuthors(fm['authors']);
      const year = String(fm['year'] ?? '');
      const title = String(fm['title'] ?? '');
      const id = String(fm['citation-id'] ?? crypto.randomUUID());

      if (!year || !title) return null;

      const base = {
        id,
        authors,
        year,
        title,
        doi: fm['doi'] ? String(fm['doi']) : undefined,
        url: fm['url'] ? String(fm['url']) : undefined,
        dateAdded: String(fm['date-added'] ?? new Date().toISOString()),
        notePath,
        quotes: parseQuotes(fm['quotes']),
      };

      switch (sourceType) {
        case 'journalArticle':
          return {
            ...base,
            sourceType,
            journal: String(fm['journal'] ?? ''),
            volume: fm['volume'] ? String(fm['volume']) : undefined,
            issue: fm['issue'] ? String(fm['issue']) : undefined,
            pages: fm['pages'] ? String(fm['pages']) : undefined,
          };
        case 'book':
          return {
            ...base,
            sourceType,
            publisher: String(fm['publisher'] ?? ''),
            edition: fm['edition'] ? String(fm['edition']) : undefined,
          };
        case 'bookChapter':
          return {
            ...base,
            sourceType,
            bookTitle: String(fm['book-title'] ?? ''),
            publisher: String(fm['publisher'] ?? ''),
            pages: fm['pages'] ? String(fm['pages']) : undefined,
            editors: parseAuthors(fm['editors']),
          };
        case 'website':
          return {
            ...base,
            sourceType,
            siteName: fm['site-name'] ? String(fm['site-name']) : undefined,
            publishDate: fm['publish-date'] ? String(fm['publish-date']) : undefined,
            accessDate: fm['access-date'] ? String(fm['access-date']) : undefined,
          };
      }
    } catch {
      return null;
    }
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function escapYaml(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, ' ');
}

function parseQuotes(raw: unknown): Quote[] {
  if (!Array.isArray(raw)) return [];
  const result: Quote[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const obj = item as Record<string, unknown>;
    const text = String(obj['text'] ?? '').trim();
    if (!text) continue;
    const q: Quote = { text };
    if (obj['page']) q.page = String(obj['page']);
    result.push(q);
  }
  return result;
}

function sourceTypeToYaml(sourceType: SourceType): string {
  const map: Record<SourceType, string> = {
    journalArticle: 'journal-article',
    book: 'book',
    bookChapter: 'book-chapter',
    website: 'website',
  };
  return map[sourceType];
}

function yamlToSourceType(value: string): SourceType | null {
  const map: Record<string, SourceType> = {
    'journal-article': 'journalArticle',
    book: 'book',
    'book-chapter': 'bookChapter',
    website: 'website',
  };
  return map[value] ?? null;
}

function parseAuthors(raw: unknown): Author[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(item => item && typeof item === 'object')
    .map(item => {
      const obj = item as Record<string, unknown>;
      return {
        lastName: String(obj['lastName'] ?? ''),
        firstName: String(obj['firstName'] ?? ''),
      };
    })
    .filter(a => a.lastName.trim().length > 0);
}
