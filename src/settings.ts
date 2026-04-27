import { App, PluginSettingTab, Setting } from 'obsidian';
import type APA7Plugin from './main';
import type { APA7PluginSettings } from './types';

export class APA7SettingTab extends PluginSettingTab {
  plugin: APA7Plugin;

  constructor(app: App, plugin: APA7Plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl).setName('APA 7 Citations').setHeading();

    new Setting(containerEl)
      .setName('Carpeta de referencias')
      .setDesc('Carpeta del vault donde se guardarán las notas de referencia.')
      .addText(text =>
        text
          .setPlaceholder('Referencias')
          .setValue(this.plugin.settings.referencesFolder)
          .onChange(async value => {
            this.plugin.settings.referencesFolder = value || 'Referencias';
            this.plugin.library.setFolder(this.plugin.settings.referencesFolder);
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName('Tipo de fuente por defecto')
      .setDesc('Tipo de fuente preseleccionado al abrir el formulario de cita.')
      .addDropdown(drop =>
        drop
          .addOption('journalArticle', 'Artículo de revista')
          .addOption('book', 'Libro')
          .addOption('bookChapter', 'Capítulo de libro')
          .addOption('website', 'Sitio web')
          .setValue(this.plugin.settings.defaultSourceType)
          .onChange(async value => {
            this.plugin.settings.defaultSourceType = value as APA7PluginSettings['defaultSourceType'];
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName('Estilo de cita en el texto')
      .setDesc('Formato predeterminado para citas en el texto.')
      .addDropdown(drop =>
        drop
          .addOption('parenthetical', 'Parentética: (Autor, Año)')
          .addOption('narrative', 'Narrativa: Autor (Año)')
          .setValue(this.plugin.settings.inTextStyle)
          .onChange(async value => {
            this.plugin.settings.inTextStyle = value as 'parenthetical' | 'narrative';
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName('Modo de inserción')
      .setDesc('Qué se inserta en el cursor al seleccionar una cita.')
      .addDropdown(drop =>
        drop
          .addOption('inText', 'Solo cita en el texto')
          .addOption('reference', 'Solo referencia completa')
          .addOption('both', 'Ambas')
          .setValue(this.plugin.settings.insertMode)
          .onChange(async value => {
            this.plugin.settings.insertMode = value as APA7PluginSettings['insertMode'];
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName('Copiar al portapapeles al insertar')
      .setDesc('Además de insertar en el cursor, copia la cita al portapapeles.')
      .addToggle(toggle =>
        toggle
          .setValue(this.plugin.settings.copyToClipboard)
          .onChange(async value => {
            this.plugin.settings.copyToClipboard = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
