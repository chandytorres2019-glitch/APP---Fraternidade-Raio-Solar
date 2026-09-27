import { DayPrayer } from '../../types';
import { SupportedLanguage } from '../types';
import { PT_DAYS } from './ptDays';
import { ES_DAYS } from './esDays';
import { EN_DAYS } from './enDays';
import { FR_DAYS } from './frDays';
import { DE_DAYS } from './deDays';

const DAYS_BY_LANG: Record<SupportedLanguage, Record<number, DayPrayer>> = {
  pt: PT_DAYS as Record<number, DayPrayer>,
  es: ES_DAYS as Record<number, DayPrayer>,
  en: EN_DAYS as Record<number, DayPrayer>,
  fr: FR_DAYS as Record<number, DayPrayer>,
  de: DE_DAYS as Record<number, DayPrayer>,
};

export function getLocalizedDayPrayer(dayNum: number, lang: SupportedLanguage): DayPrayer {
  const langMap = DAYS_BY_LANG[lang] || DAYS_BY_LANG.pt;
  if (langMap[dayNum]) {
    return langMap[dayNum];
  }
  // Fallbacks: ES -> EN -> PT
  if (DAYS_BY_LANG.es[dayNum]) return DAYS_BY_LANG.es[dayNum];
  if (DAYS_BY_LANG.en[dayNum]) return DAYS_BY_LANG.en[dayNum];
  return DAYS_BY_LANG.pt[dayNum] || DAYS_BY_LANG.pt[1];
}

export function getAllLocalizedDays(lang: SupportedLanguage): DayPrayer[] {
  const list: DayPrayer[] = [];
  for (let i = 1; i <= 21; i++) {
    list.push(getLocalizedDayPrayer(i, lang));
  }
  return list;
}
