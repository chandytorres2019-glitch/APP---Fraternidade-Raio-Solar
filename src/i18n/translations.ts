import { SupportedLanguage, LanguageInfo, TranslationSchema } from './types';
import { pt } from './locales/pt';
import { en } from './locales/en';
import { es } from './locales/es';
import { fr } from './locales/fr';
import { de } from './locales/de';

export * from './types';
export * from './localizedContent';

export const LANGUAGES: LanguageInfo[] = [
  { code: 'pt', name: 'Português', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'Inglês', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Espanhol', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Francês', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Alemão', nativeName: 'Deutsch', flag: '🇩🇪' },
];

export const TRANSLATIONS: Record<SupportedLanguage, TranslationSchema> = {
  pt,
  en,
  es,
  fr,
  de,
};
