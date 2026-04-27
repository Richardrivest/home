import { App, Modal, Setting, Notice } from 'obsidian';
import type { Citation, SourceType, Author } from '../types';
import { formatCitation } from '../formatters/apa7';
import type { CitationLibrary } from '../CitationLibrary';
import type APA7Plugin from '../main';

type InsertCallback = (formatted: { inText: string; referenceMd: string }) => void;

export class CitationModal extends Modal {
  private plugin: APA7Plugin;
  private library: CitationLibrary;
  private onInsert: InsertCallback;

  private sourceType: SourceType;
  private formData: Record<string, string> = {};
  private authors: Author[] = [{ lastName: '', firstName: '' }];
  private editors: Author[] = [];

  constructor(app: App, plugin: APA7Plugin, library: CitationLibrary, onInsert: InsertCallback) {
    super(app);
    this.plugin = plugin;
    this.library = library;
    this.onInsert = onInsert;
    this.sourceType = plugin.settings.defaultSourceType;
  }

  onOpen(): void {
    this.setTitle('APA 7: Insertar cita');
    this.render();
  }

  onClose(): void {
    this.contentEl.empty();
  }

  private render(): void {
    const { contentEl } = this;
    contentEl.empty();

    // Source type selector
    new Setting(contentEl)
      .setName('Tipo de fuente')
      .addDropdown(drop =>
        drop
          .addOption('journalArticle', 'Artículo de revista')
          .addOption('book', 'Libro')
          .addOption('bookChapter', 'Capítulo de libro')
          .addOption('website', 'Sitio web')
          .setValue(this.sourceType)
          .onChange(val => {
            this.sourceType = val as SourceType;
            this.render();
          })
      );

    // Authors
    new Setting(contentEl).setName('Autores').setHeading();
    this.authors.forEach((author, idx) => this.renderPersonRow(contentEl, author, idx, 'author'));
    new Setting(contentEl).addButton(btn =>
      btn.setButtonText('+ Agregar autor').onClick(() => {
        this.authors.push({ lastName: '', firstName: '' });
        this.render();
      })
    );

    // Shared fields
    this.renderTextField(contentEl, 'Año', 'year', '2023 o n.d.');
    this.renderTextField(contentEl, 'Título', 'title', 'Título en minúsculas (sentence case)');

    // Source-type-specific fields
    switch (this.sourceType) {
      case 'journalArticle':
        this.renderTextField(contentEl, 'Nombre del journal', 'journal', 'Journal of Example Research');
        this.renderTextField(contentEl, 'Volumen', 'volume', '12');
        this.renderTextField(contentEl, 'Número', 'issue', '3');
        this.renderTextField(contentEl, 'Páginas', 'pages', '45–67');
        this.renderTextField(contentEl, 'DOI', 'doi', '10.1000/xyz123');
        break;

      case 'book':
        this.renderTextField(contentEl, 'Editorial', 'publisher', 'Nombre de la editorial');
        this.renderTextField(contentEl, 'Edición', 'edition', '3ra');
        this.renderTextField(contentEl, 'DOI o URL', 'doi', '');
        break;

      case 'bookChapter':
        this.renderTextField(contentEl, 'Título del libro', 'bookTitle', 'Título completo del libro');
        new Setting(contentEl).setName('Editores del libro').setHeading();
        this.editors.forEach((ed, idx) => this.renderPersonRow(contentEl, ed, idx, 'editor'));
        new Setting(contentEl).addButton(btn =>
          btn.setButtonText('+ Agregar editor').onClick(() => {
            this.editors.push({ lastName: '', firstName: '' });
            this.render();
          })
        );
        this.renderTextField(contentEl, 'Páginas del capítulo', 'pages', '45–67');
        this.renderTextField(contentEl, 'Editorial', 'publisher', 'Nombre de la editorial');
        this.renderTextField(contentEl, 'DOI', 'doi', '');
        break;

      case 'website':
        this.renderTextField(contentEl, 'Nombre del sitio', 'siteName', 'Nombre del sitio web');
        this.renderTextField(contentEl, 'Fecha de publicación', 'publishDate', '2023, 15 de junio');
        this.renderTextField(contentEl, 'URL', 'url', 'https://ejemplo.com/pagina');
        this.renderTextField(contentEl, 'Fecha de acceso', 'accessDate', '2024-01-15');
        break;
    }

    // In-text style
    new Setting(contentEl).setName('Opciones de la cita').setHeading();
    new Setting(contentEl)
      .setName('Estilo')
      .addDropdown(d =>
        d
          .addOption('parenthetical', 'Parentética: (Autor, Año)')
          .addOption('narrative', 'Narrativa: Autor (Año)')
          .setValue(this.formData['inTextStyle'] ?? this.plugin.settings.inTextStyle)
          .onChange(v => {
            this.formData['inTextStyle'] = v;
            this.updatePreview(previewEl);
          })
      );
    this.renderTextField(contentEl, 'Número de página (opcional)', 'pageNumber', '45');

    // Preview
    const previewEl = contentEl.createDiv({ cls: 'apa7-preview' });
    this.updatePreview(previewEl);

    // Buttons
    new Setting(contentEl)
      .addButton(btn =>
        btn
          .setButtonText('Insertar')
          .setCta()
          .onClick(async () => {
            await this.handleInsert(false);
          })
      )
      .addButton(btn =>
        btn.setButtonText('Guardar e Insertar').onClick(async () => {
          await this.handleInsert(true);
        })
      )
      .addButton(btn =>
        btn.setButtonText('Cancelar').onClick(() => this.close())
      );
  }

  private renderTextField(container: HTMLElement, label: string, key: string, placeholder: string): void {
    new Setting(container)
      .setName(label)
      .addText(text =>
        text
          .setPlaceholder(placeholder)
          .setValue(this.formData[key] ?? '')
          .onChange(v => {
            this.formData[key] = v;
          })
      );
  }

  private renderPersonRow(container: HTMLElement, person: Author, idx: number, role: 'author' | 'editor'): void {
    const list = role === 'author' ? this.authors : this.editors;
    const label = role === 'author' ? `Autor ${idx + 1}` : `Editor ${idx + 1}`;

    new Setting(container)
      .setName(label)
      .addText(t =>
        t
          .setPlaceholder('Apellido')
          .setValue(person.lastName)
          .onChange(v => {
            list[idx].lastName = v;
          })
      )
      .addText(t =>
        t
          .setPlaceholder('Nombre(s)')
          .setValue(person.firstName)
          .onChange(v => {
            list[idx].firstName = v;
          })
      )
      .addExtraButton(btn =>
        btn
          .setIcon('trash')
          .setTooltip('Eliminar')
          .onClick(() => {
            list.splice(idx, 1);
            this.render();
          })
      );
  }

  private buildCitation(): Citation | null {
    const year = this.formData['year']?.trim();
    const title = this.formData['title']?.trim();
    const validAuthors = this.authors.filter(a => a.lastName.trim().length > 0);

    if (!year || !title || validAuthors.length === 0) return null;

    const base = {
      id: crypto.randomUUID(),
      authors: validAuthors,
      year,
      title,
      doi: this.formData['doi']?.trim() || undefined,
      url: this.formData['url']?.trim() || undefined,
      dateAdded: new Date().toISOString(),
    };

    switch (this.sourceType) {
      case 'journalArticle':
        return {
          ...base,
          sourceType: 'journalArticle',
          journal: this.formData['journal']?.trim() ?? '',
          volume: this.formData['volume']?.trim() || undefined,
          issue: this.formData['issue']?.trim() || undefined,
          pages: this.formData['pages']?.trim() || undefined,
        };
      case 'book':
        return {
          ...base,
          sourceType: 'book',
          publisher: this.formData['publisher']?.trim() ?? '',
          edition: this.formData['edition']?.trim() || undefined,
        };
      case 'bookChapter':
        return {
          ...base,
          sourceType: 'bookChapter',
          bookTitle: this.formData['bookTitle']?.trim() ?? '',
          publisher: this.formData['publisher']?.trim() ?? '',
          pages: this.formData['pages']?.trim() || undefined,
          editors: this.editors.filter(e => e.lastName.trim().length > 0),
        };
      case 'website':
        return {
          ...base,
          sourceType: 'website',
          siteName: this.formData['siteName']?.trim() || undefined,
          publishDate: this.formData['publishDate']?.trim() || undefined,
          accessDate: this.formData['accessDate']?.trim() || undefined,
        };
    }
  }

  private updatePreview(previewEl: HTMLElement): void {
    previewEl.empty();
    const citation = this.buildCitation();
    if (!citation) {
      previewEl.createEl('em', { text: 'Completa los campos requeridos para ver la vista previa.' });
      return;
    }

    const style = (this.formData['inTextStyle'] ?? this.plugin.settings.inTextStyle) as 'parenthetical' | 'narrative';
    const formatted = formatCitation(citation, {
      style,
      pageNumber: this.formData['pageNumber']?.trim() || undefined,
    });

    previewEl.createDiv({ cls: 'apa7-preview-label', text: 'En el texto:' });
    previewEl.createDiv({ cls: 'apa7-preview-value', text: formatted.inText });
    previewEl.createDiv({ cls: 'apa7-preview-label', text: 'Referencia completa:' });
    previewEl.createDiv({ cls: 'apa7-preview-value', text: formatted.reference });
  }

  private async handleInsert(saveToLibrary: boolean): Promise<void> {
    const citation = this.buildCitation();
    if (!citation) {
      new Notice('Por favor completa los campos requeridos: autores, año y título.');
      return;
    }

    const style = (this.formData['inTextStyle'] ?? this.plugin.settings.inTextStyle) as 'parenthetical' | 'narrative';
    const formatted = formatCitation(citation, {
      style,
      pageNumber: this.formData['pageNumber']?.trim() || undefined,
    });

    if (saveToLibrary) {
      try {
        await this.library.save(citation);
        new Notice('Cita guardada en la biblioteca.');
      } catch (e) {
        new Notice('Error al guardar la cita.');
        console.error(e);
      }
    }

    if (this.plugin.settings.copyToClipboard) {
      await navigator.clipboard.writeText(formatted.inText);
    }

    this.onInsert(formatted);
    this.close();
  }
}
