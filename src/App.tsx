import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { Journey21DaysView } from './components/Journey21DaysView';
import { LockedModulesGrid } from './components/LockedModulesGrid';
import { CheckoutView } from './components/CheckoutView';
import { IntegrationsView } from './components/IntegrationsView';
import { AuthModal } from './components/AuthModal';
import { CompletionCelebrationModal } from './components/CompletionCelebrationModal';
import { useAppConfig } from './context/AppContext';
import { ASSETS } from './assets/assetRegistry';
import { Sparkles, Youtube } from 'lucide-react';

const INITIAL_USER: UserProfile = {
  id: 'usr_default_light',
  name: 'Buscador da Luz',
  email: 'buscador@fraternidaderaiosolar.com',
  title: 'Filho(a) da Luz',
  subscriptionPlan: 'raio_solar',
  currentDay: 1,
  completedDays: [1],
  streakDays: 3,
  favoriteDays: [1],
  journalNotes: {
    1: "Senti a proteção do Arcanjo Miguel e a luz azul cobalto envolvendo minha casa."
  },
  hasCompleted21Days: false,
  driveSyncEnabled: true,
  n8nAutomationEnabled: true,
  notificationTime: '06:00'
};

export default function App() {
  const { theme, t } = useAppConfig();
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('raio_solar_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_USER;
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'journey' | 'locked' | 'plans' | 'integrations'>('dashboard');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Persist user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('raio_solar_user', JSON.stringify(user));
    }
  }, [user]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 3500);
  };

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser(prev => prev ? { ...prev, ...updated } : null);
  };

  const handleLogout = () => {
    localStorage.removeItem('raio_solar_user');
    setUser(null);
    showToast(t.nav.logout);
  };

  const handleCompleteAllDays = () => {
    handleUpdateUser({
      completedDays: Array.from({ length: 21 }, (_, i) => i + 1),
      hasCompleted21Days: true
    });
    setIsCelebrationOpen(true);
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-slate-50 text-slate-900 theme-light' : 'bg-slate-950 text-slate-100 theme-dark'} flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-amber-500/30 selection:text-amber-200 transition-colors duration-200`}>
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 border border-amber-400/40 text-amber-200 text-xs shadow-2xl shadow-purple-950/80 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Navigation with Theme toggle, Language Switcher, and Login/Account */}
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenPlans={() => setActiveTab('plans')}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            user={user}
            onGoToJourney={() => setActiveTab('journey')}
            onGoToLocked={() => setActiveTab('locked')}
            onGoToPlans={() => setActiveTab('plans')}
            onSelectDay={(dayNum) => {
              if (user) {
                handleUpdateUser({ currentDay: dayNum });
              }
            }}
          />
        )}

        {activeTab === 'journey' && (
          <Journey21DaysView
            user={user}
            onUpdateUser={handleUpdateUser}
            onCompleteAllDays={handleCompleteAllDays}
          />
        )}

        {activeTab === 'locked' && (
          <LockedModulesGrid
            user={user}
            onOpenPlans={() => setActiveTab('plans')}
            onGoToJourney={() => setActiveTab('journey')}
          />
        )}

        {activeTab === 'plans' && (
          <CheckoutView
            user={user}
            onUpgradePlan={(plan) => {
              handleUpdateUser({ subscriptionPlan: plan });
            }}
            onSuccessNotice={(msg) => showToast(msg)}
          />
        )}

        {activeTab === 'integrations' && (
          <IntegrationsView
            user={user}
            onUpdateUser={handleUpdateUser}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          showToast(t.auth.loginSuccess.replace('{name}', loggedUser.name));
        }}
      />

      <CompletionCelebrationModal
        isOpen={isCelebrationOpen}
        onClose={() => setIsCelebrationOpen(false)}
        user={user}
        onGoToLocked={() => setActiveTab('locked')}
      />

      {/* Footer */}
      <footer className="border-t border-purple-900/30 bg-slate-950/90 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img 
              src={ASSETS.logo} 
              alt="Fraternidade Raio Solar Logo" 
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border border-amber-400"
            />
            <div>
              <div className="font-['Cinzel'] font-bold text-sm text-amber-200">
                FRATERNIDADE RAIO SOLAR
              </div>
              <p className="text-xs text-purple-300/70">
                {t.footer.officialCommunity}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <button 
              onClick={() => setActiveTab('journey')} 
              className="hover:text-amber-300 transition-colors"
            >
              {t.nav.journey}
            </button>
            <button 
              onClick={() => setActiveTab('locked')} 
              className="hover:text-amber-300 transition-colors"
            >
              {t.nav.portals}
            </button>
            <button 
              onClick={() => setActiveTab('plans')} 
              className="hover:text-amber-300 transition-colors"
            >
              {t.nav.plans}
            </button>
            <a 
              href="https://www.youtube.com/@FraternidadeRaioSolar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-rose-400 flex items-center gap-1 transition-colors"
            >
              <Youtube className="w-3.5 h-3.5 text-rose-500" />
              <span>{t.footer.channelLink}</span>
            </a>
          </div>

          <div className="text-xs text-purple-300/60 text-center md:text-right">
            <span>{t.footer.michaelDay}</span>
            <div className="text-[11px] text-slate-500 mt-0.5">
              "{t.footer.quote}"
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
