import React, { useState } from 'react';
import { getLocalizedLockedFeatures } from '../i18n/localizedSpiritualData';
import { LockedFeature, UserProfile } from '../types';
import { useAppConfig } from '../context/AppContext';
import { 
  Lock, 
  Unlock, 
  AlertCircle, 
  Check, 
  X,
  Crown
} from 'lucide-react';

interface LockedModulesGridProps {
  user: UserProfile | null;
  onOpenPlans: () => void;
  onGoToJourney: () => void;
}

export const LockedModulesGrid: React.FC<LockedModulesGridProps> = ({
  user,
  onOpenPlans,
  onGoToJourney,
}) => {
  const { t, language } = useAppConfig();
  const [selectedFeature, setSelectedFeature] = useState<LockedFeature | null>(null);

  const completedDaysCount = user?.completedDays.length || 0;
  const is21DaysCompleted = completedDaysCount >= 21;
  const isVipPlan = user?.subscriptionPlan === 'ascensionado';
  const lockedFeatures = getLocalizedLockedFeatures(language);

  return (
    <div id="locked-modules-container" className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950 via-slate-950 to-indigo-950 border border-purple-800/40 p-6 sm:p-8">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.locked.badge}</span>
          </div>

          <h2 className="font-['Cinzel'] text-2xl sm:text-3xl font-extrabold text-white">
            {t.locked.title}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            {t.locked.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-purple-900/40 text-xs text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>{t.locked.progressLabel} <strong>{completedDaysCount}/21</strong></span>
            </div>

            <button
              onClick={onOpenPlans}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md flex items-center gap-1.5 transition-all"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>{t.locked.unlockWithPlan}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Locked Cards with 3D Aesthetics & Padlocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lockedFeatures.map((feature, idx) => {
          const isUnlocked = isVipPlan || (is21DaysCompleted && idx === 0);

          return (
            <div
              key={feature.id}
              onClick={() => setSelectedFeature(feature)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-purple-950/20 border border-purple-900/30 hover:border-amber-400/50 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-950/60 hover:-translate-y-1.5"
            >
              {/* Top Row: Category & Closed Padlock Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-800/40">
                  {feature.badge}
                </span>

                <div 
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-inner transition-all ${
                    isUnlocked 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/10'
                  }`}
                >
                  {isUnlocked ? (
                    <>
                      <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t.locked.accessGranted}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                      <span>{t.locked.lockedTag}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors font-['Playfair_Display']">
                {feature.title}
              </h3>
              <p className="text-xs text-purple-300/80 mt-1 font-medium">
                {feature.category}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed mt-3 line-clamp-3">
                {feature.description}
              </p>

              {/* Feature Highlights Preview */}
              <div className="mt-4 pt-4 border-t border-purple-900/30 space-y-1.5">
                {feature.details.slice(0, 2).map((item, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="text-amber-400">✦</span>
                    <span className="line-clamp-1">{item}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Condition Banner */}
              <div className="mt-5 p-2.5 rounded-xl bg-slate-950 border border-purple-900/30 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  {feature.estimatedRelease}
                </span>
                <span className="text-amber-300 font-semibold flex items-center gap-1 text-[11px] group-hover:translate-x-1 transition-transform">
                  {t.locked.unlockNowBtn} →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal on Card Click */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-purple-950/60 to-slate-950 border border-purple-700/50 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-lg">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  {selectedFeature.category}
                </span>
                <h3 className="text-xl font-bold text-white font-['Playfair_Display']">
                  {selectedFeature.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">
              {selectedFeature.description}
            </p>

            {/* What you will find inside */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-purple-900/40 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                {t.locked.modalTitle}
              </h5>
              <div className="space-y-1.5">
                {selectedFeature.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Unlock Condition Banner */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <AlertCircle className="w-4 h-4" />
                <span>{selectedFeature.unlockCondition}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedFeature(null);
                  onGoToJourney();
                }}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center justify-center gap-1.5"
              >
                <span>{t.dashboard.startDay} ({completedDaysCount}/21)</span>
              </button>

              <button
                onClick={() => {
                  setSelectedFeature(null);
                  onOpenPlans();
                }}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md flex items-center justify-center gap-1.5"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>{t.locked.unlockNowBtn}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
