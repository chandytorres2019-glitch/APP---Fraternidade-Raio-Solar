import React, { useState, useEffect } from 'react';
import { celestialAudio } from '../utils/audioEngine';
import { DayPrayer } from '../types';
import { useAppConfig } from '../context/AppContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  FileText, 
  Headphones, 
  ShieldCheck,
  Flame
} from 'lucide-react';

interface AudioPrayerPlayerProps {
  dayPrayer: DayPrayer;
  onSessionComplete?: () => void;
}

export const AudioPrayerPlayer: React.FC<AudioPrayerPlayerProps> = ({
  dayPrayer,
  onSessionComplete
}) => {
  const { t, language } = useAppConfig();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(465); // default ~7:45 min
  const [showTranscript, setShowTranscript] = useState(false);

  // Parse duration string "07:45" to seconds
  useEffect(() => {
    const parts = dayPrayer.prayerAudio.duration.split(':');
    if (parts.length === 2) {
      const sec = parseInt(parts[0]) * 60 + parseInt(parts[1]);
      setDuration(sec);
    }
    // Stop any ongoing playback on day change
    celestialAudio.stopSession();
    setIsPlaying(false);
    setCurrentTime(0);
  }, [dayPrayer.day]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      celestialAudio.stopSession();
    };
  }, []);

  const getIntroText = () => {
    if (language === 'es') {
      return [
        `Amados Buscadores de la Luz, les habla Martha Vieira de la Hermandad Rayo Solar.`,
        `Iniciamos ahora la oración canalizada del Día ${dayPrayer.day}: ${dayPrayer.title}.`,
        `Respira profundo, cierra los ojos y siente la presencia del Arcángel Miguel a tu lado.`
      ];
    }
    if (language === 'en') {
      return [
        `Beloved Seekers of Light, this is Martha Vieira from the Solar Ray Brotherhood.`,
        `We now begin the channeled prayer for Day ${dayPrayer.day}: ${dayPrayer.title}.`,
        `Take a deep breath, close your eyes, and feel Archangel Michael by your side.`
      ];
    }
    if (language === 'fr') {
      return [
        `Bien-aimés Chercheurs de Lumière, ici Martha Vieira de la Fraternité Rayon Solaire.`,
        `Nous commençons maintenant la prière canalisée du Jour ${dayPrayer.day}: ${dayPrayer.title}.`,
        `Respirez profondément, fermez les yeux et ressentez la présence de l'Archange Michaël à vos côtés.`
      ];
    }
    if (language === 'de') {
      return [
        `Geliebte Lichtsucher, hier ist Martha Vieira von der Sonnenstrahl-Bruderschaft.`,
        `Wir beginnen nun das gechannelte Gebet für Tag ${dayPrayer.day}: ${dayPrayer.title}.`,
        `Atmen Sie tief ein, schließen Sie die Augen und spüren Sie die Gegenwart von Erzengel Michael an Ihrer Seite.`
      ];
    }
    return [
      `Amados Buscadores da Luz, aqui é a Martha Vieira da Fraternidade Raio Solar.`,
      `Iniciamos agora a oração canalizada do Dia ${dayPrayer.day}: ${dayPrayer.title}.`,
      `Respire fundo, feche os olhos e sinta a presença de Arcanjo Miguel ao seu lado.`
    ];
  };

  const fullPrayerScript = [
    ...getIntroText(),
    ...dayPrayer.prayerDecrees
  ].join('. ');

  const togglePlay = () => {
    if (isPlaying) {
      celestialAudio.pauseSession();
      setIsPlaying(false);
    } else {
      if (currentTime > 0 && currentTime < duration) {
        celestialAudio.resumeSession();
      } else {
        celestialAudio.startFullSession(
          fullPrayerScript,
          undefined,
          duration,
          (curr, tot) => {
            setCurrentTime(curr);
            setDuration(tot);
          },
          () => {
            setIsPlaying(false);
            if (onSessionComplete) onSessionComplete();
          }
        );
      }
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    celestialAudio.stopSession();
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      id="audio-prayer-player-card"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-950 border border-blue-500/30 p-5 sm:p-6 shadow-xl shadow-blue-950/40"
    >
      {/* Background Subtle Wave Glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Info */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-blue-900/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-500 flex items-center justify-center text-amber-300 shadow-md shadow-blue-900/50 border border-blue-400/40">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {t.player.badgeOfficial}
              </span>
              <span className="text-xs text-amber-300 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Martha Vieira
              </span>
            </div>
            <h4 className="text-base font-bold text-white mt-0.5">
              {dayPrayer.prayerAudio.title}
            </h4>
          </div>
        </div>
      </div>

      {/* Dynamic Soundwave Visualizer Bars */}
      <div className="relative z-10 flex items-center justify-center gap-1 h-12 my-3 px-4 bg-slate-950/60 rounded-xl border border-blue-900/20">
        {Array.from({ length: 28 }).map((_, idx) => {
          const heightFactor = isPlaying 
            ? Math.sin(idx * 0.4 + currentTime) * 0.5 + 0.5
            : 0.15;
          const heightPx = Math.max(6, Math.floor(heightFactor * 36));
          return (
            <div
              key={idx}
              className={`w-1 rounded-full transition-all duration-200 ${
                isPlaying 
                  ? 'bg-gradient-to-t from-blue-500 to-amber-300 shadow-sm shadow-blue-400/30' 
                  : 'bg-slate-800'
              }`}
              style={{ height: `${heightPx}px` }}
            />
          );
        })}
      </div>

      {/* Progress Bar & Time */}
      <div className="relative z-10 space-y-1.5 mb-4">
        <div 
          className="w-full bg-slate-950/80 rounded-full h-2 overflow-hidden border border-blue-900/30 cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            const newSec = Math.floor(clickPos * duration);
            setCurrentTime(newSec);
          }}
        >
          <div 
            className="h-full bg-gradient-to-r from-amber-400 via-blue-500 to-purple-600 rounded-full relative transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-200 rounded-full shadow-md shadow-amber-400"></div>
          </div>
        </div>
        <div className="flex justify-between text-xs font-mono text-slate-400">
          <span>{formatTime(currentTime)}</span>
          <span className="text-purple-300 font-sans text-[11px]">
            {dayPrayer.prayerAudio.narrator}
          </span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Player Action Controls */}
      <div className="relative z-10 flex items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3">
          <button
            id="reset-audio-btn"
            onClick={handleReset}
            className="p-2.5 rounded-full bg-slate-950/70 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title={t.player.restartPrayer}
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            id="play-pause-prayer-btn"
            onClick={togglePlay}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all transform hover:scale-[1.03]"
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5 fill-slate-950" />
                <span>{t.player.pausePrayer}</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                <span>{t.player.listenWithMartha}</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle Transcript view */}
          <button
            id="toggle-transcript-btn"
            onClick={() => setShowTranscript(!showTranscript)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
              showTranscript
                ? 'bg-purple-900/40 border-purple-500/40 text-purple-200'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.player.viewText}</span>
          </button>
        </div>
      </div>

      {/* Expanded Decretos & Prayers Transcript */}
      {showTranscript && (
        <div 
          id="prayer-transcript-container"
          className="relative z-10 mt-5 pt-5 border-t border-blue-900/30 space-y-3 animate-fadeIn"
        >
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              {t.player.decreesTitle} {dayPrayer.day}
            </h5>
            <span className="text-[11px] text-purple-300/70">
              {t.player.viewText}
            </span>
          </div>

          <div className="space-y-2.5 bg-slate-950/80 p-4 rounded-xl border border-blue-900/40 text-slate-200 text-sm leading-relaxed font-['Plus_Jakarta_Sans']">
            {dayPrayer.prayerDecrees.map((decree, dIdx) => (
              <p 
                key={dIdx} 
                className="p-2 rounded-lg bg-blue-950/20 hover:bg-blue-900/30 border border-blue-900/20 transition-colors"
              >
                <strong className="text-amber-300 mr-2">✦</strong>
                {decree}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
