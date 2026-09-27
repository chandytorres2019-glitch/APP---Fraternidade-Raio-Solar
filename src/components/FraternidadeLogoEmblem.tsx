import React, { useState } from 'react';
import { ASSETS } from '../assets/assetRegistry';

interface FraternidadeLogoEmblemProps {
  className?: string;
  size?: number;
  showRays?: boolean;
}

export const FraternidadeLogoEmblem: React.FC<FraternidadeLogoEmblemProps> = ({
  className = '',
  size = 80,
  showRays = true,
}) => {
  const [imageError, setImageError] = useState(false);

  // If the user's registered logo image loads successfully, render it inside the sacred circular frame
  if (!imageError && ASSETS.logo) {
    return (
      <div 
        className={`relative rounded-full flex items-center justify-center overflow-hidden ${className}`}
        style={{ width: size, height: size }}
      >
        <img 
          src={ASSETS.logo}
          alt="Fraternidade Raio Solar"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center rounded-full"
        />
      </div>
    );
  }

  // High-fidelity vector SVG reproduction of the uploaded official emblem
  // Features: Violet circular disc, golden double borders, golden radiant sun rays, 3D golden pyramid, and typography
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`rounded-full drop-shadow-lg select-none ${className}`}
    >
      <defs>
        {/* Purple / Violet Radial Background Gradient */}
        <radialGradient id="frat-bg-grad" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#4c1d95" />
          <stop offset="65%" stopColor="#2e1065" />
          <stop offset="100%" stopColor="#1e0538" />
        </radialGradient>

        {/* Gold Metallic Border Gradient */}
        <linearGradient id="frat-gold-rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="25%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="75%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#fef08a" />
        </linearGradient>

        {/* Pyramid Left Face Gradient (Shadowed) */}
        <linearGradient id="pyr-left-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>

        {/* Pyramid Right Face Gradient (Luminous) */}
        <linearGradient id="pyr-right-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="40%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>

        {/* Sun Central Glow */}
        <radialGradient id="sun-burst-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#fef08a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer Disc Background */}
      <circle cx="100" cy="100" r="98" fill="url(#frat-bg-grad)" />

      {/* Double Golden Border Rings */}
      <circle cx="100" cy="100" r="95" fill="none" stroke="url(#frat-gold-rim)" strokeWidth="3" />
      <circle cx="100" cy="100" r="89" fill="none" stroke="url(#frat-gold-rim)" strokeWidth="1" opacity="0.85" />

      {/* Radiant Sun Behind Pyramid */}
      {showRays && (
        <g id="solar-rays" className="animate-flame-core origin-center">
          {/* Central sun corona glow */}
          <circle cx="100" cy="85" r="28" fill="url(#sun-burst-grad)" />

          {/* 13 Radiant Flame-like Solar Petals */}
          {[
            -75, -62.5, -50, -37.5, -25, -12.5, 0, 12.5, 25, 37.5, 50, 62.5, 75
          ].map((angleDeg, idx) => (
            <path
              key={idx}
              d="M 98 85 Q 95 48, 100 38 Q 105 48, 102 85 Z"
              fill="url(#frat-gold-rim)"
              transform={`rotate(${angleDeg} 100 85)`}
              className="drop-shadow-sm"
            />
          ))}
        </g>
      )}

      {/* Sacred 3D Pyramid */}
      <g id="sacred-pyramid" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.6))">
        {/* Left facet */}
        <polygon 
          points="100,58 70,118 100,118" 
          fill="url(#pyr-left-grad)" 
        />
        {/* Right facet */}
        <polygon 
          points="100,58 100,118 130,118" 
          fill="url(#pyr-right-grad)" 
        />
        {/* Apex Highlight */}
        <polygon 
          points="100,58 97,64 103,64" 
          fill="#ffffff" 
          opacity="0.9" 
        />
        {/* Base Ridge Shadow */}
        <line x1="70" y1="118" x2="130" y2="118" stroke="#78350f" strokeWidth="1.5" />
        {/* Center Vertical Ridge */}
        <line x1="100" y1="58" x2="100" y2="118" stroke="#fef08a" strokeWidth="1" opacity="0.8" />
      </g>

      {/* Official Typography: "FRATERNIDADE RAIO SOLAR" in 2 Lines */}
      <text
        x="100"
        y="142"
        textAnchor="middle"
        fill="#fef08a"
        fontSize="10.5"
        fontWeight="bold"
        fontFamily="Cinzel, Playfair Display, serif"
        letterSpacing="1.2"
        className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
      >
        FRATERNIDADE
      </text>

      <text
        x="100"
        y="158"
        textAnchor="middle"
        fill="#fef08a"
        fontSize="11.5"
        fontWeight="800"
        fontFamily="Cinzel, Playfair Display, serif"
        letterSpacing="1.6"
        className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
      >
        RAIO SOLAR
      </text>
    </svg>
  );
};
