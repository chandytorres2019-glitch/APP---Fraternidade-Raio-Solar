import { DAYS_PRAYERS_DATA } from '../../data/daysData';
import { LocalizedDayContent } from './daysTypes';

export const PT_DAYS: Record<number, LocalizedDayContent> = {};

DAYS_PRAYERS_DATA.forEach(d => {
  PT_DAYS[d.day] = d as LocalizedDayContent;
});
