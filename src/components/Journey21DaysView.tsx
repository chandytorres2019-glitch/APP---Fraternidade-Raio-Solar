import React, { useState } from 'react';
import { ASSETS } from '../assets/assetRegistry';
import { getLocalizedDayPrayer, getAllLocalizedDays } from '../i18n/days';
import { getLocalizedArchangelInfo, getLocalized7Rays } from '../i18n/localizedSpiritualData';
import { UserProfile, DayPrayer } from '../types';
import { AudioPrayerPlayer } from './AudioPrayerPlayer';
import { useAppConfig } from '../context/AppContext';
import { LOCALIZED_BENEFITS } from '../i18n/translations';
import { 
  Shield, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Clock, 
  BookOpen, 
  Heart, 
  Flame, 
  ChevronRight, 
  Zap, 
  Calendar,
  MessageSquareQuote,
  Star,
  Check,
  Award
} from 'lucide-react';

interface Journey21DaysViewProps {
  user: UserProfile | null;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  selectedDay?: number;
  onCompleteAllDays: () => void;
}

export const Journey21DaysView: React.FC<Journey21DaysViewProps> = ({
  user,
  onUpdateUser,
  selectedDay = 1,
  onCompleteAllDays,
}) => {
  const { t, language } = useAppConfig();
  const [selectedDayNum, setSelectedDayNum] = useState<number>(selectedDay);
  const [activeTab, setActiveTab] = useState<'day_content' | 'about_michael' | 'benefits_9' | 'all_days_grid'>('day_content');
  const [journalInput, setJournalInput] = useState<string>('');
  const [journalSaved, setJournalSaved] = useState<boolean>(false);

  const activeDay: DayPrayer = getLocalizedDayPrayer(selectedDayNum, language);
  const localizedToday = {
    title: activeDay.title,
    theme: activeDay.subtitle,
    focus: activeDay.primaryBenefit,
    affirmation: activeDay.affirmation,
  };
  const archangelInfo = getLocalizedArchangelInfo(language);
  const sevenRays = getLocalized7Rays(language);
  const allDays = getAllLocalizedDays(language);

  const isCompleted = user?.completedDays.includes(selectedDayNum) || false;
  const isFavorite = user?.favoriteDays.includes(selectedDayNum) || false;

  // Load saved journal note if exists
  React.useEffect(() => {
    if (user?.journalNotes && user.journalNotes[selectedDayNum]) {
      setJournalInput(user.journalNotes[selectedDayNum]);
    } else {
      setJournalInput('');
    }
  }, [selectedDayNum, user]);

  const handleToggleCompleted = () => {
    if (!user) return;
    const currentList = user.completedDays || [];
    let updatedList: number[];
    let newStreak = user.streakDays;

    if (currentList.includes(selectedDayNum)) {
      updatedList = currentList.filter(d => d !== selectedDayNum);
    } else {
      updatedList = [...currentList, selectedDayNum].sort((a, b) => a - b);
      newStreak = (user.streakDays || 0) + 1;
    }

    onUpdateUser({
      completedDays: updatedList,
      streakDays: newStreak,
      currentDay: selectedDayNum < 21 && !currentList.includes(selectedDayNum) ? selectedDayNum + 1 : user.currentDay,
    });
  };

  const handleToggleFavorite = () => {
    if (!user) return;
    const currentFavs = user.favoriteDays || [];
    let updatedFavs: number[];

    if (currentFavs.includes(selectedDayNum)) {
      updatedFavs = currentFavs.filter(d => d !== selectedDayNum);
    } else {
      updatedFavs = [...currentFavs, selectedDayNum];
    }

    onUpdateUser({ favoriteDays: updatedFavs });
  };

  const handleSaveJournal = () => {
    if (!user) return;
    const updatedNotes = { ...(user.journalNotes || {}), [selectedDayNum]: journalInput };
    onUpdateUser({ journalNotes: updatedNotes });
    setJournalSaved(true);
    setTimeout(() => setJournalSaved(false), 2500);
  };

  const totalCompleted = user?.completedDays.length || 0;
  const progressPercent = Math.round((totalCompleted / 21) * 100);

  const benefitsList = LOCALIZED_BENEFITS[language] || LOCALIZED_BENEFITS.pt;

  return (
    <div id="journey-view-container" className="space-y-8 pb-16">
      {/* Top Hero Banner - 21 Days of Archangel Michael */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 border border-blue-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-full sm:w-1/2 h-full opacity-30 sm:opacity-40 pointer-events-none mix-blend-screen">
          <img 
            src={ASSETS.arcanjoMiguel3d} 
            alt="Arcanjo Miguel 3D" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter saturate-150"
          />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.footer.michaelDay}</span>
          </div>

          <h1 className="font-['Cinzel'] text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-blue-200 leading-tight">
            {t.journey.title}
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            {t.journey.subtitle}
          </p>

          {/* Progress Bar & Quick Stats */}
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-blue-900/40 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                {t.journey.progress}:
              </span>
              <span className="text-amber-300 font-bold font-mono">
                {totalCompleted} / 21 {t.journey.completed} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-amber-400 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, progressPercent)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-purple-900/30 pb-4">
        <button
          id="tab-day-content-btn"
          onClick={() => setActiveTab('day_content')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'day_content'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-900/30'
              : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-300" />
          <span>{t.journey.tabToday} ({selectedDayNum} / 21)</span>
        </button>

        <button
          id="tab-about-michael-btn"
          onClick={() => setActiveTab('about_michael')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'about_michael'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-900/30'
              : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Shield className="w-4 h-4 text-blue-300" />
          <span>{t.journey.tabWhoIsMichael}</span>
        </button>

        <button
          id="tab-benefits-9-btn"
          onClick={() => setActiveTab('benefits_9')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'benefits_9'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-900/30'
              : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{t.journey.tab9Benefits}</span>
        </button>

        <button
          id="tab-all-days-grid-btn"
          onClick={() => setActiveTab('all_days_grid')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'all_days_grid'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-900/30'
              : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4 text-purple-300" />
          <span>{t.journey.tabAllDays}</span>
        </button>
      </div>

      {/* TAB 1: DAY CONTENT */}
      {activeTab === 'day_content' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Day Selector Ribbon (Scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {allDays.map((d) => {
              const isDCompleted = user?.completedDays.includes(d.day);
              const isCurrent = d.day === selectedDayNum;
              return (
                <button
                  key={d.day}
                  id={`select-day-${d.day}-btn`}
                  onClick={() => setSelectedDayNum(d.day)}
                  className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 scale-105'
                      : isDCompleted
                      ? 'bg-blue-950/60 text-blue-200 border border-blue-600/40'
                      : 'bg-slate-900/70 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {isDCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-slate-600" />
                  )}
                  <span>{t.journey.dayPrefix} {d.day}</span>
                </button>
              );
            })}
          </div>

          {/* Active Day Header */}
          <div className="bg-slate-900/70 border border-purple-900/40 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {t.journey.dayPrefix} {activeDay.day} / 21
                </span>
                <span className="text-xs text-purple-300 flex items-center gap-1 font-medium">
                  ✦ {localizedToday.focus}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-['Playfair_Display']">
                {localizedToday.title}
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                {localizedToday.theme}
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-start sm:self-center">
              <button
                id="toggle-favorite-btn"
                onClick={handleToggleFavorite}
                className={`p-2.5 rounded-full border transition-colors ${
                  isFavorite
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
                title={isFavorite ? t.journey.favorited : t.journey.favorite}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-400' : ''}`} />
              </button>

              <button
                id="mark-day-completed-btn"
                onClick={handleToggleCompleted}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isCompleted
                    ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md'
                }`}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{t.journey.dayCompleted} ✓</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4" />
                    <span>{t.journey.markCompleted}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sacred Affirmation Pill */}
          <div className="bg-gradient-to-r from-blue-950/40 via-purple-950/40 to-slate-950 border-l-4 border-amber-400 p-4 rounded-r-xl shadow-inner">
            <div className="text-[11px] uppercase tracking-wider text-amber-400 font-bold mb-0.5">
              {t.journey.affirmationLabel} • {localizedToday.focus}
            </div>
            <div className="text-base sm:text-lg font-['Playfair_Display'] italic text-amber-100 font-medium">
              "{localizedToday.affirmation}"
            </div>
          </div>

          {/* PILLAR 1: Reflection Message in text */}
          <div id="pillar-reflection-section" className="bg-slate-900/60 border border-purple-900/30 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <MessageSquareQuote className="w-5 h-5 text-amber-400" />
              <span>1. {t.journey.reflectionLabel}: {localizedToday.title}</span>
              <span className="text-[11px] text-purple-300 font-normal ml-auto">
                Martha Vieira
              </span>
            </div>

            <div className="text-slate-200 text-sm sm:text-base leading-relaxed space-y-3 font-['Plus_Jakarta_Sans'] font-light">
              {activeDay.reflectionText.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* PILLAR 2: Prayer & Decrees Audio */}
          <div id="pillar-audio-section" className="space-y-3">
            <div className="flex items-center gap-2 text-blue-300 font-bold text-sm">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span>2. {t.journey.sacredDecrees}</span>
            </div>

            <AudioPrayerPlayer 
              dayPrayer={activeDay} 
              onSessionComplete={() => {
                if (!isCompleted) handleToggleCompleted();
              }}
            />
          </div>

          {/* PILLAR 3: Daily Practice */}
          <div id="pillar-practice-section" className="bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/40 border border-indigo-900/40 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <Zap className="w-5 h-5 text-emerald-400" />
                <span>3. {t.journey.dailyPracticeLabel}: {activeDay.dailyPractice.title}</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                {activeDay.dailyPractice.durationMinutes} min
              </span>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                {activeDay.dailyPractice.steps.map((step, sIdx) => (
                  <div 
                    key={sIdx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-purple-900/20 text-xs sm:text-sm text-slate-200"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-500/40">
                      {sIdx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-200 flex items-start gap-2.5">
              <Star className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong>{t.journey.sacredActionLabel} </strong>
                {activeDay.dailyPractice.sacredAction}
              </div>
            </div>
          </div>

          {/* Personal Journal & Insights for the Day */}
          <div className="bg-slate-900/70 border border-purple-900/30 rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                {t.journey.journalTitle} • {t.journey.dayPrefix} {activeDay.day}
              </h4>
              {journalSaved && (
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium animate-fadeIn">
                  <Check className="w-3.5 h-3.5" /> {t.journey.journalSaved}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              {t.journey.journalSubtitle}
            </p>
            <textarea
              id="journal-note-input"
              rows={3}
              value={journalInput}
              onChange={(e) => setJournalInput(e.target.value)}
              placeholder={t.journey.journalPlaceholder}
              className="w-full bg-slate-950 border border-purple-900/40 rounded-xl p-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
            />
            <div className="flex justify-end">
              <button
                id="save-journal-btn"
                onClick={handleSaveJournal}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-purple-900/60 hover:bg-purple-900 text-purple-200 border border-purple-700/50 transition-colors"
              >
                {t.journey.journalSave}
              </button>
            </div>
          </div>

          {/* Quick Nav: Next and Previous Day */}
          <div className="flex items-center justify-between pt-4">
            <button
              disabled={selectedDayNum <= 1}
              onClick={() => setSelectedDayNum(prev => Math.max(1, prev - 1))}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← {t.journey.dayPrefix} {Math.max(1, selectedDayNum - 1)}
            </button>

            <button
              id="test-complete-21-days-btn"
              onClick={onCompleteAllDays}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 transition-all flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.journey.demoCompleteAll}</span>
            </button>

            <button
              disabled={selectedDayNum >= 21}
              onClick={() => setSelectedDayNum(prev => Math.min(21, prev + 1))}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {t.journey.dayPrefix} {Math.min(21, selectedDayNum + 1)} →
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: QUEM É ARCANJO MIGUEL */}
      {activeTab === 'about_michael' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900/70 border border-blue-900/40 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-2xl flex-shrink-0">
                <img 
                  src={ASSETS.arcanjoMiguel3d} 
                  alt="Arcanjo Miguel 3D" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2 text-center md:text-left">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  {archangelInfo.ray}
                </span>
                <h3 className="font-['Cinzel'] text-2xl sm:text-3xl font-bold text-amber-200">
                  {archangelInfo.name}
                </h3>
                <p className="text-sm text-purple-300">
                  {archangelInfo.title}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
                  {archangelInfo.virtues.map((v, i) => (
                    <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      ✦ {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-slate-200 text-sm sm:text-base leading-relaxed space-y-4 font-light">
              <p>{archangelInfo.description}</p>
              <p>
                {t.dashboard.liberationKeyDesc}
              </p>
            </div>

            {/* Sacred Call */}
            <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-blue-200 text-sm font-['Playfair_Display'] italic leading-relaxed">
              {archangelInfo.callOfPresence}
            </div>

            {/* 7 Rays Cosmic Grid */}
            <div className="space-y-3 pt-4 border-t border-purple-900/30">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                {t.dashboard.sevenRaysTitle}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {sevenRays.map((r, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${r.color}`} />
                      <span className="text-xs font-bold text-white">{r.ray}: {r.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      <strong>{t.dashboard.virtuesLabel}</strong> {r.virtues}
                    </p>
                    <p className="text-[10px] text-purple-300">
                      <strong>{t.dashboard.mastersLabel}</strong> {r.masters}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: THE 9 BENEFITS */}
      {activeTab === 'benefits_9' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-['Cinzel'] text-xl sm:text-3xl font-bold text-amber-200">
              {t.journey.tab9Benefits}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {t.dashboard.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefitsList.map((benefit, bIdx) => (
              <div
                key={benefit.number}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-purple-900/30 p-5 hover:border-amber-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/50 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {bIdx + 1}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {benefit.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ALL 21 DAYS GRID */}
      {activeTab === 'all_days_grid' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allDays.map((d) => {
              const isDCompleted = user?.completedDays.includes(d.day);
              const isCurrent = d.day === selectedDayNum;

              return (
                <div
                  key={d.day}
                  onClick={() => {
                    setSelectedDayNum(d.day);
                    setActiveTab('day_content');
                  }}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative ${
                    isCurrent
                      ? 'bg-gradient-to-b from-blue-950/80 to-purple-950/80 border-amber-400 shadow-xl shadow-blue-950/50'
                      : isDCompleted
                      ? 'bg-slate-900/80 border-emerald-500/40'
                      : 'bg-slate-950/80 border-purple-900/20 hover:border-purple-600/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      {t.journey.dayPrefix} {d.day}
                    </span>
                    {isDCompleted ? (
                      <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {t.common.active}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {d.prayerAudio.duration}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-white line-clamp-1">
                    {d.title}
                  </h4>
                  <p className="text-xs text-purple-300 line-clamp-1 mt-0.5">
                    {d.subtitle}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span>{d.primaryBenefit}</span>
                    <ChevronRight className="w-4 h-4 text-amber-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
