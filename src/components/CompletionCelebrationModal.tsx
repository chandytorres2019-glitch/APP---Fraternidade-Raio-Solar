import React from 'react';
import { ASSETS } from '../assets/assetRegistry';
import { UserProfile } from '../types';
import { useAppConfig } from '../context/AppContext';
import { Flame, X } from 'lucide-react';

interface CompletionCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onGoToLocked: () => void;
}

export const CompletionCelebrationModal: React.FC<CompletionCelebrationModalProps> = ({
  isOpen,
  onClose,
  user,
  onGoToLocked,
}) => {
  const { t } = useAppConfig();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div 
        id="completion-certificate-modal"
        className="relative w-full max-w-xl bg-gradient-to-b from-slate-900 via-purple-950 to-slate-950 border-2 border-amber-400 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-purple-950/90 text-center space-y-6"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Sacred Insignia */}
        <div className="relative inline-block">
          <div className="absolute -inset-3 bg-gradient-to-r from-amber-400 via-purple-500 to-blue-500 rounded-full blur-lg opacity-80 animate-pulse"></div>
          <img 
            src={ASSETS.logo} 
            alt="Fraternidade Raio Solar" 
            referrerPolicy="no-referrer"
            className="relative w-20 h-20 rounded-full object-cover border-2 border-amber-300 mx-auto"
          />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-400/40">
            {t.celebration.badge}
          </span>
          <h2 className="font-['Cinzel'] text-2xl sm:text-3xl font-extrabold text-white mt-2">
            {t.celebration.title}
          </h2>
          <p className="text-xs text-purple-300 mt-1">
            {t.celebration.subtitle}
          </p>
        </div>

        {/* Certificate Card */}
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-amber-500/40 space-y-4 text-left font-['Plus_Jakarta_Sans']">
          <p className="text-xs text-slate-300 leading-relaxed text-center italic">
            {t.celebration.certText}
          </p>

          <div className="text-center pt-2">
            <div className="text-xs text-purple-300 uppercase tracking-wider">
              {t.celebration.certifiedTo}
            </div>
            <div className="text-lg font-bold text-amber-300 font-['Playfair_Display']">
              {user ? user.name : t.nav.seeker}
            </div>
            <div className="text-xs text-purple-200">
              {t.dashboard.consecrated}
            </div>
          </div>

          <div className="flex justify-between items-end pt-4 border-t border-purple-900/40 text-[11px] text-slate-400">
            <div>
              <div className="text-amber-300 font-bold font-['Playfair_Display']">
                Martha Vieira
              </div>
              <div>{t.dashboard.marthaRole}</div>
            </div>
            <div className="text-right">
              <div className="text-blue-300 font-bold">{t.footer.michaelDay}</div>
            </div>
          </div>
        </div>

        {/* Unlocked Reward Notice */}
        <div className="p-4 rounded-xl bg-purple-950/50 border border-purple-600/40 text-xs text-purple-200 flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-purple-600/30 flex items-center justify-center text-amber-300 flex-shrink-0">
            <Flame className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <strong className="text-white block">{t.locked.accessGranted}!</strong>
            <span>{t.locked.description}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onGoToLocked();
            }}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20"
          >
            {t.celebration.portalsBtn}
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white"
          >
            {t.celebration.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
