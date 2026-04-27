import { Plugin, Notice, MarkdownView } from 'obsidian';
import type { APA7PluginSettings } from './types';
import { DEFAULT_SETTINGS } from './types';
import { CitationLibrary } from './CitationLibrary';
import { CitationModal } from './modals/CitationModal';
import { LibraryModal } from './modals/LibraryModal';
import { APA7SettingTab } from './settings';

export default class APA7Plugin extends Plugin {
  settings: APA7PluginSettings;
  library: CitationLibrary;

  async onload(): Promise<void> {
    await this.loadSettings();

    this.library = new CitationLibrary(this.app, this.settings.referencesFolder);

    this.addRibbonIcon('book-open', 'APA 7: Abrir biblioteca', async () => {
      const citations = await this.library.load();
      if (citations.length === 0) {
        this.openCitationModal();
      } else {
        new LibraryModal(this.app, this, this.library, citations, 'insert', ({ inText, referenceMd }) => {
          this.insertAtCursor(inText, referenceMd);
        }).open();
      }
    });

    this.addCommand({
      id: 'apa7-insert-citation',
      name: 'Insertar cita nueva',
      callback: () => {
        this.openCitationModal();
      },
    });

    this.addCommand({
      id: 'apa7-browse-library',
      name: 'Buscar en biblioteca',
      callback: async () => {
        const citations = await this.library.load();
        if (citations.length === 0) {
          new Notice('La biblioteca está vacía. Usa "Insertar cita nueva" para agregar referencias.');
          return;
        }
        new LibraryModal(this.app, this, this.library, citations, 'insert', ({ inText, referenceMd }) => {
          this.insertAtCursor(inText, referenceMd);
        }).open();
      },
    });

    this.addCommand({
      id: 'apa7-copy-citation',
      name: 'Copiar referencia al portapapeles',
      callback: async () => {
        const citations = await this.library.load();
        if (citations.length === 0) {
          new Notice('La biblioteca está vacía.');
          return;
        }
        new LibraryModal(this.app, this, this.library, citations, 'copy', () => {}).open();
      },
    });

    this.addCommand({
      id: 'apa7-insert-textual-quote',
      name: 'Insertar cita textual',
      callback: async () => {
        const citations = await this.library.load();
        if (citations.length === 0) {
          new Notice('La biblioteca está vacía. Usa "Insertar cita nueva" para agregar referencias.');
          return;
        }
        new LibraryModal(this.app, this, this.library, citations, 'quote-insert', ({ inText }) => {
          this.insertAtCursor(inText, inText);
        }).open();
      },
    });

    this.addCommand({
      id: 'apa7-delete-citation',
      name: 'Eliminar cita de biblioteca',
      callback: async () => {
        const citations = await this.library.load();
        if (citations.length === 0) {
          new Notice('La biblioteca está vacía.');
          return;
        }
        new LibraryModal(this.app, this, this.library, citations, 'delete', () => {}).open();
      },
    });

    this.addSettingTab(new APA7SettingTab(this.app, this));
  }

  onunload(): void {
    // Obsidian handles cleanup of commands, ribbon icons, and modals
  }

  async loadSettings(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }

  private openCitationModal(): void {
    new CitationModal(this.app, this, this.library, ({ inText, referenceMd }) => {
      this.insertAtCursor(inText, referenceMd);
    }).open();
  }

  insertAtCursor(inText: string, referenceMd: string): void {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view) {
      navigator.clipboard.writeText(inText);
      new Notice('No hay editor activo. La cita fue copiada al portapapeles.');
      return;
    }

    const editor = view.editor;
    const { insertMode } = this.settings;

    let textToInsert: string;
    if (insertMode === 'inText') {
      textToInsert = inText;
    } else if (insertMode === 'reference') {
      textToInsert = referenceMd;
    } else {
      textToInsert = `${inText}\n\n${referenceMd}`;
    }

    editor.replaceSelection(textToInsert);
  }
}
