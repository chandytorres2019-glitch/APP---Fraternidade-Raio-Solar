import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, TRANSLATIONS, LANGUAGES, LanguageInfo, TranslationSchema } from '../i18n/translations';

export type AppTheme = 'dark' | 'light';

interface AppContextType {
  theme: AppTheme;
  toggleTheme: () => void;
  setTheme: (theme: AppTheme) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  languages: LanguageInfo[];
  t: TranslationSchema;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AppTheme>(() => {
    const saved = localStorage.getItem('raio_solar_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('raio_solar_lang');
    if (saved && ['pt', 'en', 'es', 'fr', 'de'].includes(saved)) {
      return saved as SupportedLanguage;
    }
    return 'pt';
  });

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('raio_solar_theme', newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('raio_solar_lang', lang);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  }, [theme]);

  const currentTranslations = TRANSLATIONS[language] || TRANSLATIONS.pt;

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        language,
        setLanguage,
        languages: LANGUAGES,
        t: currentTranslations,
      }}
    >
      <div className={theme === 'light' ? 'theme-light' : 'theme-dark'}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useAppConfig = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppConfig must be used within an AppProvider');
  }
  return context;
};
