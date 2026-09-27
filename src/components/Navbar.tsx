import React, { useState, useRef, useEffect } from 'react';
import { ASSETS } from '../assets/assetRegistry';
import { UserProfile } from '../types';
import { useAppConfig } from '../context/AppContext';
import { 
  Sparkles, 
  Flame, 
  Lock, 
  Compass, 
  Share2, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Crown,
  Sun,
  Moon,
  Globe,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  user: UserProfile | null;
  activeTab: 'dashboard' | 'journey' | 'locked' | 'plans' | 'integrations';
  setActiveTab: (tab: 'dashboard' | 'journey' | 'locked' | 'plans' | 'integrations') => void;
  onOpenAuth: () => void;
  onOpenPlans: () => void;
  onLogout: () => void;
  isAmbientPlaying?: boolean;
  onToggleAmbient?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  onOpenAuth,
  onOpenPlans,
  onLogout,
}) => {
  const { theme, toggleTheme, language, setLanguage, languages, t } = useAppConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangInfo = languages.find(l => l.code === language) || languages[0];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/85 border-b border-purple-900/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div 
            id="brand-header"
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 via-purple-600 to-blue-600 opacity-60 group-hover:opacity-100 blur transition-all duration-500"></div>
              <img 
                src={ASSETS.logo} 
                alt="Fraternidade Raio Solar Logo" 
                referrerPolicy="no-referrer"
                className="relative w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-md transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Cinzel'] tracking-wider text-lg font-bold bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400 bg-clip-text text-transparent">
                  RAIO SOLAR
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Martha Vieira
                </span>
              </div>
              <p className="text-[11px] text-purple-200/70 font-light tracking-wide">
                {t.nav.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/70 p-1.5 rounded-full border border-purple-900/30 shadow-inner">
            <button
              id="nav-dashboard-btn"
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-amber-500 to-purple-600 text-white shadow-md shadow-purple-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t.nav.home}</span>
            </button>

            <button
              id="nav-journey-btn"
              onClick={() => setActiveTab('journey')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                activeTab === 'journey'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>{t.nav.journey}</span>
            </button>

            <button
              id="nav-locked-btn"
              onClick={() => setActiveTab('locked')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                activeTab === 'locked'
                  ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.nav.portals}</span>
            </button>

            <button
              id="nav-plans-btn"
              onClick={() => setActiveTab('plans')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                activeTab === 'plans'
                  ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-amber-300 hover:text-amber-100 hover:bg-amber-950/40'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.nav.plans}</span>
            </button>

            <button
              id="nav-integrations-btn"
              onClick={() => setActiveTab('integrations')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                activeTab === 'integrations'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{t.nav.integrations}</span>
            </button>
          </nav>

          {/* Right Action Area: Language Switcher, Dark/Light Mode, Login/Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                id="language-selector-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-purple-900/40 text-xs font-medium text-slate-200 transition-all shadow-sm"
                title={t.nav.language}
                aria-label={t.nav.language}
              >
                <span className="text-sm leading-none">{currentLangInfo.flag}</span>
                <span className="uppercase font-semibold text-[11px] tracking-wider">{currentLangInfo.code}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div 
                  id="language-dropdown-menu"
                  className="absolute right-0 mt-2 w-44 rounded-2xl bg-slate-900 border border-purple-800/60 shadow-2xl py-1.5 z-50 backdrop-blur-xl animate-fadeIn"
                >
                  <div className="px-3 py-1 text-[10px] uppercase font-semibold text-slate-400 tracking-wider border-b border-slate-800">
                    {t.nav.language}
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      id={`lang-btn-${lang.code}`}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                        language === lang.code
                          ? 'bg-amber-500/20 text-amber-300 font-semibold'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base leading-none">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono uppercase">{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Mode Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-purple-900/40 text-slate-200 hover:text-amber-300 transition-all shadow-sm"
              title={theme === 'dark' ? t.nav.themeLight : t.nav.themeDark}
              aria-label={theme === 'dark' ? t.nav.themeLight : t.nav.themeDark}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600 hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Login / User Profile Area */}
            {user ? (
              <div className="flex items-center gap-2 bg-slate-900/80 border border-purple-900/40 pl-2.5 pr-2 py-1 rounded-full">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold pr-2 border-r border-slate-800">
                  <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                  <span>{user.streakDays}d</span>
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-semibold text-white leading-tight flex items-center gap-1">
                    {user.name.split(' ')[0]}
                    {user.subscriptionPlan !== 'free' && (
                      <Crown className="w-3 h-3 text-amber-400" />
                    )}
                  </div>
                  <div className="text-[10px] text-purple-300 font-light leading-none">
                    {user.title}
                  </div>
                </div>
                {/* Account / Login switch modal button */}
                <button
                  id="open-auth-btn"
                  onClick={onOpenAuth}
                  title="Trocar Conta / Login"
                  className="p-1.5 text-slate-300 hover:text-amber-300 rounded-full hover:bg-slate-800/80 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                </button>
                {/* Logout Button */}
                <button
                  id="logout-btn"
                  onClick={onLogout}
                  title={t.nav.logout}
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-full hover:bg-slate-800/80 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id="login-trigger-btn"
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/25 transition-all hover:scale-[1.02]"
              >
                <User className="w-3.5 h-3.5" />
                <span>{t.nav.login}</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-purple-900/50 px-4 pt-2 pb-6 space-y-2">
          <button
            onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-left font-medium text-slate-200 hover:bg-slate-900"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>{t.nav.home}</span>
          </button>
          <button
            onClick={() => { setActiveTab('journey'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-left font-medium text-slate-200 hover:bg-slate-900"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>{t.nav.journey}</span>
          </button>
          <button
            onClick={() => { setActiveTab('locked'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-left font-medium text-slate-200 hover:bg-slate-900"
          >
            <Lock className="w-4 h-4 text-amber-400" />
            <span>{t.nav.portals}</span>
          </button>
          <button
            onClick={() => { setActiveTab('plans'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-left font-medium text-amber-300 hover:bg-amber-950/30"
          >
            <Crown className="w-4 h-4 text-amber-400" />
            <span>{t.nav.plans}</span>
          </button>
          <button
            onClick={() => { setActiveTab('integrations'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-left font-medium text-slate-300 hover:bg-slate-900"
          >
            <Share2 className="w-4 h-4 text-purple-400" />
            <span>{t.nav.integrations}</span>
          </button>

          {/* Mobile Login / Account Button */}
          <div className="pt-2 border-t border-slate-800/80">
            <button
              onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow"
            >
              <User className="w-4 h-4" />
              <span>{user ? `Conta (${user.name.split(' ')[0]}) - ${t.nav.login}` : t.nav.login}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
