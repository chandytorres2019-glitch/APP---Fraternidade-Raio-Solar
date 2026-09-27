import React, { useState, useEffect } from 'react';
import { ASSETS } from '../assets/assetRegistry';
import { useAppConfig } from '../context/AppContext';
import { getLocalized7Rays } from '../i18n/localizedSpiritualData';
import { FraternidadeLogoEmblem } from './FraternidadeLogoEmblem';
import { 
  Sun, 
  Flame, 
  Sparkles, 
  Crown, 
  Check, 
  Info,
  Shield,
  Volume2
} from 'lucide-react';

export type MandalaModelType = 'flames' | 'masters';

interface MasterInfo {
  name: string;
  chohanTitle: string;
  image: string;
  primaryArchangel: string;
  flameColors: {
    outer: string;
    inner: string;
    core: string;
    glow: string;
    accent: string;
    text: string;
  };
}

const MASTERS_CONFIG: MasterInfo[] = [
  {
    name: 'Mestre El Morya',
    chohanTitle: 'Chohan do 1º Raio Azul • Vontade de Deus',
    image: ASSETS.masters.elMorya,
    primaryArchangel: 'Arcanjo Miguel & Fé',
    flameColors: {
      outer: '#1d4ed8',
      inner: '#3b82f6',
      core: '#93c5fd',
      glow: 'rgba(59, 130, 246, 0.65)',
      accent: '#60a5fa',
      text: '#ffffff',
    }
  },
  {
    name: 'Mestre Lanto',
    chohanTitle: 'Chohan do 2º Raio Dourado • Sabedoria Divina',
    image: ASSETS.masters.lanto,
    primaryArchangel: 'Arcanjo Jofiel & Constância',
    flameColors: {
      outer: '#b45309',
      inner: '#f59e0b',
      core: '#fef08a',
      glow: 'rgba(245, 158, 11, 0.65)',
      accent: '#fbbf24',
      text: '#1e293b',
    }
  },
  {
    name: 'Mestra Rowena',
    chohanTitle: 'Chohan do 3º Raio Rosa • Amor Divino',
    image: ASSETS.masters.rowena,
    primaryArchangel: 'Arcanjo Chamuel & Caridade',
    flameColors: {
      outer: '#be185d',
      inner: '#ec4899',
      core: '#fbcfe8',
      glow: 'rgba(236, 72, 153, 0.65)',
      accent: '#f472b6',
      text: '#ffffff',
    }
  },
  {
    name: 'Mestre Serapis Bey',
    chohanTitle: 'Chohan do 4º Raio Branco • Ascensão e Pureza',
    image: ASSETS.masters.serapisBey,
    primaryArchangel: 'Arcanjo Gabriel & Esperança',
    flameColors: {
      outer: '#64748b',
      inner: '#e2e8f0',
      core: '#ffffff',
      glow: 'rgba(255, 255, 255, 0.75)',
      accent: '#cbd5e1',
      text: '#0f172a',
    }
  },
  {
    name: 'Mestre Hilarión',
    chohanTitle: 'Chohan do 5º Raio Verde • Verdade e Cura',
    image: ASSETS.masters.hilarion,
    primaryArchangel: 'Arcanjo Rafael & Mãe Maria',
    flameColors: {
      outer: '#047857',
      inner: '#10b981',
      core: '#a7f3d0',
      glow: 'rgba(16, 185, 129, 0.65)',
      accent: '#34d399',
      text: '#ffffff',
    }
  },
  {
    name: 'Mestra Nada',
    chohanTitle: 'Chohan do 6º Raio Rubi-Dourado • Paz e Devoção',
    image: ASSETS.masters.nada,
    primaryArchangel: 'Arcanjo Uriel & Graça',
    flameColors: {
      outer: '#881337',
      inner: '#e11d48',
      core: '#fed7aa',
      glow: 'rgba(225, 29, 72, 0.65)',
      accent: '#fb7185',
      text: '#ffffff',
    }
  },
  {
    name: 'Mestre Saint Germain',
    chohanTitle: 'Chohan do 7º Raio Violeta • Transmutação e Liberdade',
    image: ASSETS.masters.saintGermain,
    primaryArchangel: 'Arcanjo Zadquiel & Santa Ametista',
    flameColors: {
      outer: '#581c87',
      inner: '#9333ea',
      core: '#e9d5ff',
      glow: 'rgba(147, 51, 234, 0.7)',
      accent: '#c084fc',
      text: '#ffffff',
    }
  },
];

interface SevenRaysMandalaProps {
  onRaySelect?: (rayIndex: number) => void;
}

export const SevenRaysMandala: React.FC<SevenRaysMandalaProps> = ({ onRaySelect }) => {
  const { language, t } = useAppConfig();
  const sevenRays = getLocalized7Rays(language);

  // Preferred model saved in localStorage so the user can choose and keep their preference
  const [modelType, setModelType] = useState<MandalaModelType>(() => {
    const saved = localStorage.getItem('raio_solar_mandala_model');
    return (saved === 'flames' || saved === 'masters') ? saved : 'flames';
  });

  const [activeRayIdx, setActiveRayIdx] = useState<number>(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [showDecreeModal, setShowDecreeModal] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('raio_solar_mandala_model', modelType);
  }, [modelType]);

  const handleSelectRay = (idx: number) => {
    setActiveRayIdx(idx);
    if (onRaySelect) {
      onRaySelect(idx);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({ x: -(y / 25), y: x / 25 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const activeRay = sevenRays[activeRayIdx] || sevenRays[0];
  const activeMaster = MASTERS_CONFIG[activeRayIdx] || MASTERS_CONFIG[0];

  return (
    <div className="space-y-4">
      {/* Interactive 3D Card Container */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
        className="rounded-3xl bg-gradient-to-b from-slate-900 via-purple-950/40 to-slate-950 border border-purple-800/50 p-5 sm:p-6 shadow-2xl relative overflow-hidden"
      >
        {/* Background glow matching active ray */}
        <div 
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-25"
          style={{ backgroundColor: activeMaster.flameColors.inner }}
        />

        {/* Top Header with Model Chooser Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-purple-900/30">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
              {t.dashboard.sevenRaysTitle}
            </h3>
          </div>

          {/* Model Switcher: Chamas Vivas vs Mestres Ascensionados */}
          <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-purple-800/40 self-stretch sm:self-auto justify-center">
            <button
              id="model-flames-btn"
              onClick={() => setModelType('flames')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                modelType === 'flames'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Modelo 1: Chamas Sagradas em movimento com o número no centro"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Chamas Vivas</span>
              {modelType === 'flames' && <Check className="w-3 h-3 ml-0.5" />}
            </button>

            <button
              id="model-masters-btn"
              onClick={() => setModelType('masters')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                modelType === 'masters'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Modelo 2: Mestres Ascensionados envoltos por sua chama sagrada"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Mestres</span>
              {modelType === 'masters' && <Check className="w-3 h-3 ml-0.5" />}
            </button>
          </div>
        </div>

        {/* Model Indicator Subtitle */}
        <div className="text-center pt-1">
          <span className="text-[10px] text-purple-300/80 uppercase tracking-wider font-medium">
            {modelType === 'flames' 
              ? '✨ Modelo 1: Chamas Vivas em Movimento • Toque na chama'
              : '👑 Modelo 2: Mestres Ascensionados Envoltos em Chamas • Toque no Mestre'}
          </span>
        </div>

        {/* Visual Mandala Circular Stage */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto flex items-center justify-center my-3 select-none">
          {/* Outer rotating astral boundary ring */}
          <div className="absolute inset-2 rounded-full border border-purple-800/30 border-dashed animate-[spin_100s_linear_infinite]" />
          <div className="absolute inset-8 rounded-full border border-amber-500/20 animate-[spin_60s_linear_infinite_reverse]" />

          {/* Center Sacred Logo / Fraternidade Raio Solar */}
          <div 
            id="mandala-center-logo"
            onClick={() => handleSelectRay(activeRayIdx)}
            className="w-18 h-18 sm:w-22 sm:h-22 rounded-full p-1 bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 flex items-center justify-center shadow-2xl shadow-amber-500/50 z-10 cursor-pointer hover:scale-108 transition-all duration-300 group"
            title="Fraternidade Raio Solar • Centro da Mandala"
          >
            {/* Pulsing solar aura around logo */}
            <div className="absolute -inset-1 rounded-full bg-amber-400/30 blur-sm animate-pulse pointer-events-none" />
            
            {/* Official Logo Emblem */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-amber-300/90 shadow-inner bg-slate-950 flex items-center justify-center">
              <FraternidadeLogoEmblem size={80} className="w-full h-full" />
            </div>
          </div>

          {/* 7 Circular Nodes Positioned via Trigonometry */}
          {sevenRays.map((ray, rIdx) => {
            const master = MASTERS_CONFIG[rIdx];
            const angle = (rIdx / 7) * 2 * Math.PI - Math.PI / 2;
            const radius = 96; // Radius from center in pixels
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isSelected = activeRayIdx === rIdx;

            return (
              <div
                key={rIdx}
                id={`ray-node-${rIdx}`}
                onClick={() => handleSelectRay(rIdx)}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                className="absolute z-20 cursor-pointer group"
                title={`${rIdx + 1}º Raio • ${master.name} • ${ray.name}`}
              >
                {/* MODEL 1: SACRED MOVING FLAME WITH NUMBER IN THE CENTER */}
                {modelType === 'flames' ? (
                  <div className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
                    isSelected ? 'scale-130 z-30' : 'hover:scale-115 opacity-90 hover:opacity-100'
                  }`}>
                    {/* Pulsing Light Aura behind flame */}
                    <div 
                      className={`absolute inset-0 rounded-full blur-md transition-opacity duration-300 ${
                        isSelected ? 'opacity-90 scale-150 animate-pulse' : 'opacity-40 group-hover:opacity-80'
                      }`}
                      style={{ backgroundColor: master.flameColors.inner }}
                    />

                    {/* Animated Sacred Flame Graphic */}
                    <div 
                      className="relative w-12 h-14 flex items-center justify-center animate-flame-sway"
                      style={{ animationDelay: `${rIdx * 0.35}s` }}
                    >
                      <svg 
                        viewBox="0 0 100 130" 
                        className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
                      >
                        <defs>
                          {/* Radial / Linear Flame Gradients */}
                          <linearGradient id={`flame-outer-grad-${rIdx}`} x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor={master.flameColors.outer} stopOpacity="0.95" />
                            <stop offset="60%" stopColor={master.flameColors.inner} stopOpacity="1" />
                            <stop offset="100%" stopColor={master.flameColors.core} stopOpacity="0.85" />
                          </linearGradient>

                          <radialGradient id={`flame-core-grad-${rIdx}`} cx="50%" cy="65%" r="45%">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                            <stop offset="45%" stopColor={master.flameColors.core} stopOpacity="0.9" />
                            <stop offset="100%" stopColor={master.flameColors.inner} stopOpacity="0" />
                          </radialGradient>
                        </defs>

                        {/* Outer Dancing Flame Body */}
                        <path 
                          d="M 50 2 
                             C 65 30, 85 55, 82 85 
                             C 80 108, 65 125, 50 126 
                             C 35 125, 20 108, 18 85 
                             C 15 55, 35 30, 50 2 Z" 
                          fill={`url(#flame-outer-grad-${rIdx})`}
                          className="transition-all duration-300"
                        />

                        {/* Secondary Fluttering Flame Tongue */}
                        <path 
                          d="M 50 18 
                             C 60 40, 74 65, 70 90 
                             C 67 110, 55 120, 50 120 
                             C 45 120, 33 110, 30 90 
                             C 26 65, 40 40, 50 18 Z" 
                          fill={master.flameColors.accent}
                          opacity="0.85"
                          className="animate-flame-core"
                          style={{ animationDelay: `${rIdx * 0.2}s` }}
                        />

                        {/* Brilliant Core */}
                        <ellipse 
                          cx="50" 
                          cy="88" 
                          rx="20" 
                          ry="24" 
                          fill={`url(#flame-core-grad-${rIdx})`}
                        />

                        {/* Divine Spark particle near tip */}
                        <circle 
                          cx="50" 
                          cy="10" 
                          r="2.5" 
                          fill="#ffffff" 
                          className="animate-flame-sparkle" 
                        />
                      </svg>

                      {/* Number Centered inside the Flame with Crisp Readability */}
                      <div className="absolute inset-0 flex items-center justify-center pt-3 pointer-events-none">
                        <span 
                          className="font-mono font-extrabold text-xs sm:text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                          style={{ color: '#ffffff' }}
                        >
                          {rIdx + 1}
                        </span>
                      </div>
                    </div>

                    {/* Ring indicator when selected */}
                    {isSelected && (
                      <div 
                        className="absolute -bottom-1 w-6 h-1.5 rounded-full blur-xs animate-pulse"
                        style={{ backgroundColor: master.flameColors.accent }}
                      />
                    )}
                  </div>
                ) : (
                  /* MODEL 2: ASCENDED MASTER WITH SACRED FLAME AURA ENVELOPING THEM */
                  <div className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110 opacity-85 hover:opacity-100'
                  }`}>
                    {/* Swirling Living Flame Halo Wrapping around Master */}
                    <div 
                      className={`absolute -inset-1.5 rounded-full blur-[2px] animate-sacred-aura transition-all ${
                        isSelected ? 'opacity-100 scale-110' : 'opacity-70 group-hover:opacity-100'
                      }`}
                      style={{
                        background: `conic-gradient(from 0deg, ${master.flameColors.outer}, ${master.flameColors.inner}, #ffffff, ${master.flameColors.accent}, ${master.flameColors.outer})`
                      }}
                    />

                    {/* Secondary Reverse Swirling Flame Aura */}
                    <div 
                      className="absolute -inset-2.5 rounded-full blur-md opacity-50 animate-sacred-aura-reverse pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${master.flameColors.inner} 30%, transparent 70%)`
                      }}
                    />

                    {/* Master Portrait Orb */}
                    <div className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 bg-slate-950 shadow-lg ${
                      isSelected 
                        ? 'border-amber-300 ring-2 ring-amber-300/80' 
                        : 'border-white/70 group-hover:border-amber-200'
                    }`}>
                      <img 
                        src={master.image} 
                        alt={master.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                      />

                      {/* Subtle color wash overlay */}
                      <div 
                        className="absolute inset-0 opacity-15 pointer-events-none"
                        style={{ backgroundColor: master.flameColors.inner }}
                      />
                    </div>

                    {/* Ray Number Badge on Lower Edge */}
                    <div 
                      className="absolute -bottom-1.5 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold font-mono border shadow-md flex items-center justify-center"
                      style={{
                        backgroundColor: master.flameColors.inner,
                        color: '#ffffff',
                        borderColor: '#ffffff',
                      }}
                    >
                      {rIdx + 1}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Active Ray & Master Presentation Card */}
        <div className="mt-2 p-4 rounded-2xl bg-slate-950/90 border border-purple-900/40 relative overflow-hidden space-y-3">
          {/* Header with Ray Name, Color Chip & Master */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              {/* Flame color icon dot */}
              <div 
                className="w-3.5 h-3.5 rounded-full shadow-md animate-pulse"
                style={{ backgroundColor: activeMaster.flameColors.inner }}
              />
              <div>
                <span className="text-xs font-extrabold text-white font-['Playfair_Display']">
                  {activeRay.ray}: {activeRay.name}
                </span>
                <p className="text-[11px] text-amber-300 font-semibold">
                  👑 {activeMaster.name}
                </p>
              </div>
            </div>

            {/* Chohan / Ray Master Avatar Thumbnail */}
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-amber-400/50 shrink-0 shadow-md">
              <img 
                src={activeMaster.image} 
                alt={activeMaster.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Virtues */}
          <div className="text-[11px] text-slate-300 leading-snug">
            <strong className="text-slate-200">{t.dashboard.virtuesLabel}</strong>{' '}
            {activeRay.virtues}
          </div>

          {/* Master & Archangels */}
          <div className="flex items-center justify-between text-[10px] text-purple-300 pt-1 border-t border-purple-900/30">
            <span>
              <strong>{t.dashboard.mastersLabel}</strong> {activeMaster.primaryArchangel}
            </span>

            <button
              id="open-ray-decree-btn"
              onClick={() => setShowDecreeModal(true)}
              className="px-2 py-1 rounded-md text-[10px] font-bold bg-purple-900/60 hover:bg-purple-800 text-amber-300 border border-purple-700/50 flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Decreto da Chama</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal / Dialog with Sacred Decree for the Active Ray & Master */}
      {showDecreeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="max-w-md w-full rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-purple-950 border border-amber-500/40 p-6 shadow-2xl space-y-4 text-center relative">
            <div className="mx-auto w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400 shadow-lg relative">
              <img 
                src={activeMaster.image} 
                alt={activeMaster.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundColor: activeMaster.flameColors.inner }}
              />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {activeRay.ray} • {activeRay.name}
              </span>
              <h4 className="text-lg font-bold text-white mt-2 font-['Playfair_Display']">
                {activeMaster.name}
              </h4>
              <p className="text-xs text-purple-300">
                {activeMaster.chohanTitle}
              </p>
            </div>

            <div 
              className="p-4 rounded-2xl border text-xs italic font-['Playfair_Display'] leading-relaxed"
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                borderColor: activeMaster.flameColors.inner,
                color: activeMaster.flameColors.core
              }}
            >
              "EU SOU a Presença Divina que ancora a chama viva do {activeRay.name} em todo o meu ser. Sob a bênção de {activeMaster.name} e das Legiões Celestiais da Fraternidade Branca, eu manifesto {activeRay.virtues}. Que a Luz reine e transmute tudo em perfeição. Amém!"
            </div>

            <button
              onClick={() => setShowDecreeModal(false)}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-lg transition-all"
            >
              Selar Decreto na Luz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
