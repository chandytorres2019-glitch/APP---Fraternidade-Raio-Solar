import React, { useState } from 'react';
import { ASSETS } from '../assets/assetRegistry';
import { UserProfile } from '../types';
import { useAppConfig } from '../context/AppContext';
import { X, Mail, Lock, User, CheckCircle2, Shield, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const { t } = useAppConfig();
  const [mode, setMode] = useState<'login' | 'register' | 'recovery'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg(t.auth.fillAll);
      return;
    }
    setLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setLoading(false);
      const loggedUser: UserProfile = {
        id: 'usr_' + Date.now(),
        name: name || (email.split('@')[0] || 'Buscador da Luz'),
        email: email,
        title: 'Buscador(a) da Luz',
        subscriptionPlan: 'raio_solar',
        currentDay: 3,
        completedDays: [1, 2],
        streakDays: 3,
        favoriteDays: [1],
        journalNotes: {
          1: "Senti uma profunda paz no coração e um calor suave nos ombros ao invocar o Arcanjo Miguel.",
          2: "Cortei laços com ressentimentos antigos. Sinto-me mais leve!"
        },
        hasCompleted21Days: false,
        driveSyncEnabled: true,
        n8nAutomationEnabled: true,
        notificationTime: '06:00'
      };
      onLoginSuccess(loggedUser);
      onClose();
    }, 600);
  };

  const handleQuickDemo = () => {
    const demoUser: UserProfile = {
      id: 'demo_user_1',
      name: 'Filho da Luz (Visitante)',
      email: 'buscador@fraternidaderaiosolar.com',
      title: 'Filho(a) da Luz',
      subscriptionPlan: 'raio_solar',
      currentDay: 4,
      completedDays: [1, 2, 3],
      streakDays: 4,
      favoriteDays: [1, 3],
      journalNotes: {
        1: "Paz imensa ancorada no primeiro dia.",
        2: "Laços cortados com sucesso pela Espada Azul.",
        3: "Escudo Solar ativado ao sair para o dia."
      },
      hasCompleted21Days: false,
      driveSyncEnabled: true,
      n8nAutomationEnabled: true,
      notificationTime: '06:30'
    };
    onLoginSuccess(demoUser);
    onClose();
  };

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg(t.auth.fillAll);
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      setLoading(false);
      setRecoverySent(true);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        id="auth-modal-card"
        className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-purple-950/40 to-slate-950 border border-purple-800/50 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-purple-950/80"
      >
        {/* Close Button */}
        <button
          id="close-auth-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/60 transition-colors"
          aria-label={t.common.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-3">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-purple-500 to-blue-500 rounded-full blur opacity-75 animate-pulse"></div>
            <img 
              src={ASSETS.logo} 
              alt="Fraternidade Raio Solar" 
              referrerPolicy="no-referrer"
              className="relative w-16 h-16 rounded-full object-cover border-2 border-amber-300"
            />
          </div>
          <h3 className="font-['Cinzel'] text-xl font-bold text-amber-200">
            {t.auth.titleLogin}
          </h3>
          <p className="text-xs text-purple-300 mt-1">
            {t.auth.subtitleLogin}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex p-1 mb-6 bg-slate-950/80 rounded-xl border border-purple-900/40">
          <button
            id="tab-login-btn"
            onClick={() => { setMode('login'); setRecoverySent(false); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.auth.tabLogin}
          </button>
          <button
            id="tab-register-btn"
            onClick={() => { setMode('register'); setRecoverySent(false); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.auth.tabRegister}
          </button>
          <button
            id="tab-recovery-btn"
            onClick={() => { setMode('recovery'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'recovery'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.auth.tabRecovery}
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-rose-950/50 border border-rose-500/50 text-rose-200 text-xs">
            {errorMsg}
          </div>
        )}

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.auth.emailLabel}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-purple-400" />
                <input
                  id="login-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.auth.emailPlaceholder}
                  className="w-full bg-slate-950/90 border border-purple-900/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-medium text-slate-300">
                  {t.auth.passwordLabel}
                </label>
                <button
                  type="button"
                  onClick={() => setMode('recovery')}
                  className="text-xs text-amber-400/90 hover:text-amber-300 hover:underline"
                >
                  {t.auth.forgotPassword}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-purple-400" />
                <input
                  id="login-password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.auth.passwordPlaceholder}
                  className="w-full bg-slate-950/90 border border-purple-900/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              id="submit-login-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all transform hover:scale-[1.01]"
            >
              {loading ? '...' : t.auth.submitLogin}
            </button>

            {/* Quick Demo Access */}
            <div className="pt-2">
              <button
                type="button"
                id="demo-login-btn"
                onClick={handleQuickDemo}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium bg-purple-900/30 hover:bg-purple-900/50 text-purple-200 border border-purple-700/40 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{t.auth.quickDemo}</span>
              </button>
            </div>
          </form>
        )}

        {/* REGISTER FORM */}
        {mode === 'register' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.auth.nameLabel}
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-purple-400" />
                <input
                  id="register-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.auth.namePlaceholder}
                  className="w-full bg-slate-950/90 border border-purple-900/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.auth.emailLabel}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-purple-400" />
                <input
                  id="register-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.auth.emailPlaceholder}
                  className="w-full bg-slate-950/90 border border-purple-900/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.auth.passwordLabel}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-purple-400" />
                <input
                  id="register-password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.auth.passwordPlaceholder}
                  className="w-full bg-slate-950/90 border border-purple-900/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              id="submit-register-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all"
            >
              {loading ? '...' : t.auth.submitRegister}
            </button>
          </form>
        )}

        {/* PASSWORD RECOVERY */}
        {mode === 'recovery' && (
          <div>
            {recoverySent ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-semibold text-white">
                  {t.auth.recoverySent}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-amber-300">{email}</strong>
                </p>
                <button
                  id="back-to-login-btn"
                  onClick={() => { setMode('login'); setRecoverySent(false); }}
                  className="mt-4 px-6 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700"
                >
                  {t.auth.backToLogin}
                </button>
              </div>
            ) : (
              <form onSubmit={handleRecovery} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {t.auth.emailLabel}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-purple-400" />
                    <input
                      id="recovery-email-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.auth.emailPlaceholder}
                      className="w-full bg-slate-950/90 border border-purple-900/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <button
                  id="submit-recovery-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md transition-all"
                >
                  {loading ? '...' : t.auth.submitRecovery}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Footer Security */}
        <div className="mt-6 pt-4 border-t border-purple-900/30 flex items-center justify-center gap-1.5 text-[11px] text-purple-300/70">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>Ambiente Seguro • Fraternidade Raio Solar</span>
        </div>
      </div>
    </div>
  );
};
