import { DayPrayer } from '../../types';

export interface LocalizedDayContent {
  day: number;
  title: string;
  subtitle: string;
  primaryBenefit: string;
  affirmation: string;
  reflectionText: string;
  prayerAudio: {
    title: string;
    duration: string;
    narrator: string;
    ambientFrequency: '432Hz' | '528Hz' | '741Hz';
    description: string;
  };
  prayerDecrees: string[];
  dailyPractice: {
    title: string;
    durationMinutes: number;
    steps: string[];
    sacredAction: string;
  };
}
