import { App, FuzzySuggestModal, FuzzyMatch } from 'obsidian';
import type { Citation, Quote } from '../types';
import { formatTextualQuote } from '../formatters/apa7';

type QuoteCallback = (text: string) => void;

export class QuoteModal extends FuzzySuggestModal<Quote> {
  private citation: Citation;
  private onChoose: QuoteCallback;

  constructor(app: App, citation: Citation, onChoose: QuoteCallback) {
    super(app);
    this.citation = citation;
    this.onChoose = onChoose;

    this.setPlaceholder('Selecciona la cita textual a insertar...');
    this.setInstructions([
      { command: '↑↓', purpose: 'navegar' },
      { command: '↵', purpose: 'insertar' },
      { command: 'esc', purpose: 'cerrar' },
    ]);
  }

  getItems(): Quote[] {
    return this.citation.quotes ?? [];
  }

  getItemText(quote: Quote): string {
    return quote.text;
  }

  renderSuggestion(match: FuzzyMatch<Quote>, el: HTMLElement): void {
    const { item: quote } = match;
    const truncated = quote.text.length > 120 ? quote.text.slice(0, 120) + '…' : quote.text;
    el.createDiv({ cls: 'apa7-lib-primary', text: `"${truncated}"` });
    if (quote.page) {
      el.createDiv({ cls: 'apa7-lib-secondary', text: `p. ${quote.page}` });
    }
  }

  onChooseItem(quote: Quote, _evt: MouseEvent | KeyboardEvent): void {
    const formatted = formatTextualQuote(quote, this.citation);
    this.onChoose(formatted);
  }
}
