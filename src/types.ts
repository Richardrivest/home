export type SourceType = 'journalArticle' | 'book' | 'bookChapter' | 'website';

export interface Author {
  lastName: string;
  firstName: string;
}

export interface CitationBase {
  id: string;
  sourceType: SourceType;
  authors: Author[];
  year: string;
  title: string;
  doi?: string;
  url?: string;
  dateAdded: string;
  notePath?: string;
}

export interface JournalArticleCitation extends CitationBase {
  sourceType: 'journalArticle';
  journal: string;
  volume?: string;
  issue?: string;
  pages?: string;
}

export interface BookCitation extends CitationBase {
  sourceType: 'book';
  publisher: string;
  edition?: string;
}

export interface BookChapterCitation extends CitationBase {
  sourceType: 'bookChapter';
  bookTitle: string;
  editors?: Author[];
  pages?: string;
  publisher: string;
}

export interface WebsiteCitation extends CitationBase {
  sourceType: 'website';
  siteName?: string;
  publishDate?: string;
  accessDate?: string;
}

export type Citation =
  | JournalArticleCitation
  | BookCitation
  | BookChapterCitation
  | WebsiteCitation;

export interface FormattedCitation {
  inText: string;
  reference: string;
  referenceMd: string;
}

export interface InTextOptions {
  style: 'parenthetical' | 'narrative';
  pageNumber?: string;
}

export interface APA7PluginSettings {
  referencesFolder: string;
  inTextStyle: 'parenthetical' | 'narrative';
  insertMode: 'inText' | 'reference' | 'both';
  copyToClipboard: boolean;
  defaultSourceType: SourceType;
}

export const DEFAULT_SETTINGS: APA7PluginSettings = {
  referencesFolder: 'Referencias',
  inTextStyle: 'parenthetical',
  insertMode: 'inText',
  copyToClipboard: false,
  defaultSourceType: 'journalArticle',
};
