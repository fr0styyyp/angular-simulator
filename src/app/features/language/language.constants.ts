import { Language } from './Language';

export const AVAILABLE_LANGUAGES: readonly Language[] = [Language.EN, Language.KK, Language.RU];
export const DEFAULT_LANGUAGE: Language = Language.EN;
export const LANGUAGE_LABELS: Record<Language, string> = {
  [Language.EN]: 'English',
  [Language.RU]: 'Русский',
  [Language.KK]: 'Қазақша',
};