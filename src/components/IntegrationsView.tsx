import React, { useState } from 'react';
import { getLocalizedYouTube } from '../i18n/localizedSpiritualData';
import { UserProfile } from '../types';
import { useAppConfig } from '../context/AppContext';
import { 
  Share2, 
  Bot, 
  Youtube, 
  ExternalLink, 
  RefreshCw, 
  Send, 
  HardDrive
} from 'lucide-react';

interface IntegrationsViewProps {
  user: UserProfile | null;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onShowToast: (msg: string) => void;
}

export const IntegrationsView: React.FC<IntegrationsViewProps> = ({
  user,
  onUpdateUser,
  onShowToast,
}) => {
  const { t, language } = useAppConfig();
  const youtubeData = getLocalizedYouTube(language);
  const [driveConnected, setDriveConnected] = useState(user?.driveSyncEnabled ?? true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('07:15');

  const [n8nActive, setN8nActive] = useState(user?.n8nAutomationEnabled ?? true);
  const [notificationHour, setNotificationHour] = useState(user?.notificationTime || '06:00');
  const [webhookUrl, setWebhookUrl] = useState('https://automacao.fraternidaderaiosolar.com/webhook/oracao-diaria');
  const [channelType, setChannelType] = useState<'whatsapp' | 'telegram' | 'email'>('whatsapp');
  const [testingWebhook, setTestingWebhook] = useState(false);

  const handleSyncDriveNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const nowStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      setLastSyncTime(nowStr);
      onShowToast(t.integrations.driveConnected);
    }, 1200);
  };

  const handleTestWebhook = () => {
    setTestingWebhook(true);
    setTimeout(() => {
      setTestingWebhook(false);
      onShowToast(`${channelType}: OK!`);
    }, 1000);
  };

  const handleSaveAutomation = () => {
    onUpdateUser({
      driveSyncEnabled: driveConnected,
      n8nAutomationEnabled: n8nActive,
      notificationTime: notificationHour
    });
    onShowToast(t.integrations.toastSaved);
  };

  return (
    <div id="integrations-view-container" className="space-y-8 pb-16">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-950 border border-purple-800/40 p-6 sm:p-8">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30">
            <Share2 className="w-3.5 h-3.5 text-purple-400" />
            <span>{t.integrations.badge}</span>
          </div>

          <h2 className="font-['Cinzel'] text-2xl sm:text-3xl font-extrabold text-white">
            {t.integrations.title}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            {t.integrations.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GOOGLE DRIVE */}
        <div className="rounded-3xl bg-slate-900/70 border border-blue-900/40 p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 shadow-md">
                  <HardDrive className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {t.integrations.driveTitle}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t.integrations.driveConnected}
                  </p>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                driveConnected
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {driveConnected ? `${t.common.active} ✓` : 'Off'}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {t.integrations.driveDesc}
            </p>

            <div className="bg-slate-950 p-4 rounded-2xl border border-blue-900/30 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Folder:</span>
                <span className="font-mono text-amber-300">/Fraternidade_Raio_Solar</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Files:</span>
                <span className="text-white font-semibold">21 Decretos PDF</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Sync:</span>
                <span className="text-purple-300">{lastSyncTime}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
            <button
              id="sync-drive-btn"
              type="button"
              disabled={isSyncing || !driveConnected}
              onClick={handleSyncDriveNow}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? t.integrations.driveSyncing : t.integrations.driveSyncBtn}</span>
            </button>

            <button
              id="toggle-drive-btn"
              type="button"
              onClick={() => {
                setDriveConnected(!driveConnected);
                onShowToast(driveConnected ? "Drive Off" : "Drive OK");
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              {driveConnected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        </div>

        {/* N8N AUTOMATION */}
        <div className="rounded-3xl bg-slate-900/70 border border-purple-900/40 p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 shadow-md">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {t.integrations.n8nTitle}
                  </h3>
                  <p className="text-xs text-slate-400">
                    WhatsApp & Telegram
                  </p>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                n8nActive
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {n8nActive ? `${t.common.active} 24/7` : 'Pause'}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {t.integrations.n8nDesc}
            </p>

            <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-purple-900/30 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Channel:
                  </label>
                  <select
                    id="n8n-channel-select"
                    value={channelType}
                    onChange={(e: any) => setChannelType(e.target.value)}
                    className="w-full bg-slate-900 border border-purple-900/40 rounded-xl px-2.5 py-1.5 text-xs text-white"
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="telegram">Telegram</option>
                    <option value="email">Email</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    {t.integrations.notificationTime}:
                  </label>
                  <input
                    id="n8n-time-input"
                    type="time"
                    value={notificationHour}
                    onChange={(e) => setNotificationHour(e.target.value)}
                    className="w-full bg-slate-900 border border-purple-900/40 rounded-xl px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  {t.integrations.webhookUrl}:
                </label>
                <input
                  id="n8n-webhook-url-input"
                  type="text"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full bg-slate-900 border border-purple-900/40 rounded-xl px-2.5 py-1.5 text-[11px] font-mono text-purple-200"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
            <button
              id="test-webhook-btn"
              type="button"
              disabled={testingWebhook}
              onClick={handleTestWebhook}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-600 text-white shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Send className={`w-3.5 h-3.5 ${testingWebhook ? 'animate-bounce' : ''}`} />
              <span>{testingWebhook ? '...' : t.integrations.testWebhook}</span>
            </button>

            <button
              id="save-n8n-btn"
              type="button"
              onClick={handleSaveAutomation}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              {t.integrations.saveConfig}
            </button>
          </div>
        </div>
      </div>

      {/* YOUTUBE COMMUNITY FEED */}
      <div className="rounded-3xl bg-slate-900/70 border border-purple-900/40 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-900/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shadow-md">
              <Youtube className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  {t.integrations.youtubeTitle}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30">
                  {youtubeData.subscribers}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {t.integrations.youtubeDesc}
              </p>
            </div>
          </div>

          <a
            href={youtubeData.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-2 self-start sm:self-center transition-colors shadow-md"
          >
            <span>{t.integrations.youtubeBtn}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Playlists Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {youtubeData.featuredPlaylists.map((pl, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 px-3.5 py-2 rounded-xl bg-slate-950 border border-purple-900/30 text-xs flex items-center gap-2"
            >
              <span className="text-amber-400">✦</span>
              <span className="font-semibold text-slate-200">{pl.name}</span>
              <span className="text-[10px] text-purple-300">({pl.count})</span>
            </div>
          ))}
        </div>

        {/* Recent Videos & Shorts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {youtubeData.recentVideos.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-rose-500/40 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2 text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-300 font-medium">
                    {item.tag}
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    {item.views}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-rose-400 font-semibold">
                <span>YouTube</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
