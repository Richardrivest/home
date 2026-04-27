import { App, FuzzySuggestModal, FuzzyMatch, Notice } from 'obsidian';
import type { Citation } from '../types';
import { formatCitation } from '../formatters/apa7';
import type { CitationLibrary } from '../CitationLibrary';
import type APA7Plugin from '../main';

export type LibraryAction = 'insert' | 'copy' | 'delete';

type InsertCallback = (formatted: { inText: string; referenceMd: string }) => void;

export class LibraryModal extends FuzzySuggestModal<Citation> {
  private citations: Citation[];
  private plugin: APA7Plugin;
  private library: CitationLibrary;
  private action: LibraryAction;
  private onInsert: InsertCallback;

  constructor(
    app: App,
    plugin: APA7Plugin,
    library: CitationLibrary,
    citations: Citation[],
    action: LibraryAction,
    onInsert: InsertCallback
  ) {
    super(app);
    this.plugin = plugin;
    this.library = library;
    this.citations = citations;
    this.action = action;
    this.onInsert = onInsert;

    const placeholders: Record<LibraryAction, string> = {
      insert: 'Buscar y insertar cita...',
      copy: 'Buscar y copiar referencia...',
      delete: 'Buscar y eliminar cita...',
    };

    this.setPlaceholder(placeholders[action]);
    this.setInstructions([
      { command: '↑↓', purpose: 'navegar' },
      { command: '↵', purpose: action === 'delete' ? 'eliminar' : 'seleccionar' },
      { command: 'esc', purpose: 'cerrar' },
    ]);
  }

  getItems(): Citation[] {
    return this.citations;
  }

  getItemText(citation: Citation): string {
    const firstAuthor = citation.authors[0];
    const authorText = firstAuthor
      ? `${firstAuthor.lastName} ${firstAuthor.firstName}`
      : 'Autor desconocido';
    return `${authorText} ${citation.year} ${citation.title}`;
  }

  renderSuggestion(match: FuzzyMatch<Citation>, el: HTMLElement): void {
    const { item: citation } = match;
    const firstAuthor = citation.authors[0];
    const authorYear = firstAuthor
      ? `${firstAuthor.lastName}, ${citation.year}`
      : citation.year;

    const sourceLabels: Record<string, string> = {
      journalArticle: 'Artículo de revista',
      book: 'Libro',
      bookChapter: 'Capítulo de libro',
      website: 'Sitio web',
    };

    el.createDiv({ cls: 'apa7-lib-primary', text: `${authorYear} — ${citation.title}` });
    el.createDiv({ cls: 'apa7-lib-secondary', text: sourceLabels[citation.sourceType] ?? citation.sourceType });
  }

  async onChooseItem(citation: Citation, _evt: MouseEvent | KeyboardEvent): Promise<void> {
    if (this.action === 'delete') {
      await this.library.delete(citation);
      new Notice(`Cita eliminada: ${citation.title}`);
      return;
    }

    const formatted = formatCitation(citation, {
      style: this.plugin.settings.inTextStyle,
    });

    if (this.action === 'copy') {
      await navigator.clipboard.writeText(formatted.referenceMd);
      new Notice('Referencia copiada al portapapeles.');
      return;
    }

    // action === 'insert'
    if (this.plugin.settings.copyToClipboard) {
      await navigator.clipboard.writeText(formatted.inText);
    }
    this.onInsert(formatted);
  }
}
