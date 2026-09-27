import React, { useState } from 'react';
import { ASSETS } from '../assets/assetRegistry';
import { getLocalizedDayPrayer } from '../i18n/days';
import { getLocalized7Rays } from '../i18n/localizedSpiritualData';
import { UserProfile } from '../types';
import { useAppConfig } from '../context/AppContext';
import { LOCALIZED_ORACLES } from '../i18n/translations';
import { SevenRaysMandala } from './SevenRaysMandala';
import { 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Play, 
  Lock, 
  ArrowRight, 
  Sun, 
  Compass, 
  Calendar
} from 'lucide-react';

interface DashboardViewProps {
  user: UserProfile | null;
  onGoToJourney: () => void;
  onGoToLocked: () => void;
  onGoToPlans: () => void;
  onSelectDay: (dayNum: number) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  onGoToJourney,
  onGoToLocked,
  onGoToPlans,
  onSelectDay,
}) => {
  const { t, language } = useAppConfig();
  const currentDayNum = user ? user.currentDay : 1;
  const currentDayData = getLocalizedDayPrayer(currentDayNum, language);
  const localizedToday = {
    title: currentDayData.title,
    theme: currentDayData.subtitle,
    focus: currentDayData.primaryBenefit,
    affirmation: currentDayData.affirmation
  };
  const sevenRays = getLocalized7Rays(language);

  const completedCount = user?.completedDays.length || 0;
  const progressPercent = Math.round((completedCount / 21) * 100);

  // Interactive Daily Oracle decree
  const blessings = LOCALIZED_ORACLES[language] || LOCALIZED_ORACLES.pt;
  const [oracleIndex, setOracleIndex] = useState(0);
  const dailyBlessing = blessings[oracleIndex % blessings.length];

  const handleDrawOracle = () => {
    setOracleIndex(prev => (prev + 1) % blessings.length);
  };

  return (
    <div id="dashboard-main-view" className="space-y-8 pb-16">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-purple-950/90 to-blue-950 border border-purple-800/40 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Column: Greeting & Call to Light */}
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.dashboard.officialChannel}</span>
            </div>

            <h1 className="font-['Cinzel'] text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-yellow-300 leading-tight">
              {t.dashboard.welcome}, {user ? user.name.split(' ')[0] : t.nav.seeker}
            </h1>

            <p className="text-sm text-purple-200/90 leading-relaxed font-light">
              {t.dashboard.subtitle} • <strong>Martha Vieira</strong>
            </p>

            {/* Quick Action Button to Today's Prayer */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                id="hero-play-today-prayer-btn"
                onClick={() => {
                  onSelectDay(currentDayNum);
                  onGoToJourney();
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all transform hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>{t.dashboard.startDay}: {t.dashboard.day} {currentDayNum}</span>
              </button>

              <button
                id="hero-view-benefits-btn"
                onClick={onGoToJourney}
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-purple-900/50 text-xs font-semibold transition-colors"
              >
                <Compass className="w-4 h-4 text-blue-400" />
                <span>{t.dashboard.viewBenefits}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Martha Vieira Portrait Card */}
          <div className="relative w-full max-w-sm flex-shrink-0">
            <div className="relative overflow-hidden rounded-3xl border-2 border-amber-400/60 shadow-2xl shadow-purple-950/80 group">
              <img 
                src={ASSETS.marthaBanner} 
                alt="Martha Vieira - Fraternidade Raio Solar" 
                referrerPolicy="no-referrer"
                className="w-full h-56 sm:h-64 object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    Martha Vieira
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white font-['Playfair_Display']">
                  {t.dashboard.marthaCardTitle}
                </h4>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  "{t.dashboard.marthaQuote}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-slate-900/80 border border-purple-900/30 p-4 shadow-lg hover:border-amber-400/40 transition-colors">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>{t.dashboard.statsCompleted}</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">
            {completedCount} <span className="text-xs text-purple-300 font-sans">/ 21</span>
          </div>
          <div className="mt-1 text-[11px] text-amber-300">
            {progressPercent}% {t.dashboard.journeyProgress}
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/80 border border-purple-900/30 p-4 shadow-lg hover:border-amber-400/40 transition-colors">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>{t.dashboard.statsStreak}</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">
            {user?.streakDays || 1} <span className="text-xs text-orange-300 font-sans">{t.dashboard.daysStreak}</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            {t.dashboard.freqAnchored}
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/80 border border-purple-900/30 p-4 shadow-lg hover:border-amber-400/40 transition-colors">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>{t.dashboard.protectionShield}</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-400 font-mono">
            {t.common.active}
          </div>
          <div className="mt-1 text-[11px] text-blue-300">
            {t.dashboard.consecrated}
          </div>
        </div>

        <div 
          onClick={onGoToLocked}
          className="cursor-pointer rounded-2xl bg-slate-900/80 border border-purple-900/30 p-4 shadow-lg hover:border-amber-400/40 transition-colors group"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Lock className="w-4 h-4 text-amber-400 group-hover:animate-pulse" />
            <span>{t.nav.portals}</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-300 font-mono">
            6 <span className="text-xs text-slate-400 font-sans">({t.locked.lockedTag})</span>
          </div>
          <div className="mt-1 text-[11px] text-purple-300 group-hover:text-amber-300 flex items-center gap-1">
            <span>{t.locked.unlockWithPlan}</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Main Section: Today's Highlight & Interactive 3D Mandala of the 7 Rays */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Today's Active Prayer Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl bg-slate-900/70 border border-blue-900/40 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  {t.journey.tabToday} • {t.dashboard.day} {currentDayData.day}
                </span>
                <span className="text-xs text-purple-300">
                  {localizedToday.focus}
                </span>
              </div>
              <span className="text-xs text-slate-400">
                {currentDayData.prayerAudio.duration}
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-['Playfair_Display']">
                {localizedToday.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {localizedToday.theme}
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-light line-clamp-3">
              {currentDayData.reflectionText}
            </p>

            {/* Sacred Affirmation */}
            <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs sm:text-sm text-blue-200 font-['Playfair_Display'] italic">
              "{localizedToday.affirmation}"
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                id="open-day-prayer-btn"
                onClick={() => {
                  onSelectDay(currentDayData.day);
                  onGoToJourney();
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md flex items-center gap-2 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{t.dashboard.startDay} ({t.dashboard.day} {currentDayData.day})</span>
              </button>

              <button
                onClick={onGoToJourney}
                className="text-xs text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1"
              >
                <span>{t.journey.tabAllDays}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Oracle */}
          <div className="rounded-3xl bg-gradient-to-br from-purple-950/60 via-slate-900 to-slate-950 border border-purple-800/40 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  {t.dashboard.oracleTitle}
                </h4>
              </div>
              <button
                id="draw-oracle-btn"
                onClick={handleDrawOracle}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-900/60 hover:bg-purple-900 text-purple-200 border border-purple-700/40 transition-colors"
              >
                {t.dashboard.oracleButton}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-900/30 text-center space-y-2">
              <p className="text-xs text-purple-300/80 font-medium">
                {t.dashboard.oracleDrawnTitle}
              </p>
              <div className="text-base sm:text-lg font-['Playfair_Display'] italic text-amber-200 font-medium leading-relaxed">
                "{dailyBlessing}"
              </div>
              <p className="text-[11px] text-slate-400">
                {t.dashboard.oracleInstruction}
              </p>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive 3D Mandala of the 7 Rays */}
        <div className="space-y-6">
          <SevenRaysMandala />

          {/* Locked Portals Teaser Box */}
          <div 
            onClick={onGoToLocked}
            className="cursor-pointer rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950 border border-amber-500/30 p-5 space-y-3 hover:border-amber-400 transition-all shadow-xl group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>{t.locked.badge}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-400/30">
                {t.locked.lockedTag}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {t.locked.description}
            </p>

            <div className="flex items-center justify-between text-xs text-amber-300 font-bold group-hover:translate-x-1 transition-transform">
              <span>{t.locked.title}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
