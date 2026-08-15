import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Compass, Sparkles, ChevronDown, ShieldCheck, MapPin } from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  onExploreClick: () => void;
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onExploreClick, onBookClick }) => {
  const t = translations[currentLang];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 bg-[#121a16]">
      {/* Background High Resolution Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80"
          alt="Refugio exclusivo en la naturaleza de Europa"
          className="w-full h-full object-cover object-center scale-100 filter brightness-90 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121a16] via-black/30 to-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(18,26,22,0.6)_100%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white mt-8">
        {/* Top Luxury Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5a059]/40 bg-[#1c2a23]/70 backdrop-blur-md mb-8 text-xs font-semibold tracking-widest text-[#e5c07b] uppercase shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Core Headline */}
        {(() => {
          const parts = t.hero.headline.split('. ');
          const part1 = parts[0] + (parts.length > 1 ? '.' : '');
          const part2 = parts.slice(1).join('. ');
          return (
            <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 text-white drop-shadow-md">
              <span className="block text-white">{part1}</span>
              {part2 && <span className="gold-gradient-text italic font-normal">{part2}</span>}
            </h1>
          );
        })()}

        {/* Subheadline */}
        <p className="text-lg sm:text-2xl font-light text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow">
          {t.hero.subheadline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#refugios"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase text-white gold-gradient-bg hover:shadow-xl hover:shadow-[#c5a059]/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>{t.hero.ctaPrimary}</span>
          </a>

          <button
            onClick={onBookClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
            <span>{t.hero.ctaSecondary}</span>
          </button>
        </div>

        {/* Key Metrics Bar */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto pt-8 border-t border-white/15 text-center">
          <div className="p-3">
            <span className="block font-serif-luxury text-2xl sm:text-4xl font-bold text-[#e5c07b]">
              {t.hero.stat1Value}
            </span>
            <span className="text-xs sm:text-sm font-light text-gray-300">
              {t.hero.stat1Label}
            </span>
          </div>

          <div className="p-3 border-x border-white/15">
            <span className="block font-serif-luxury text-2xl sm:text-4xl font-bold text-[#e5c07b]">
              {t.hero.stat2Value}
            </span>
            <span className="text-xs sm:text-sm font-light text-gray-300">
              {t.hero.stat2Label}
            </span>
          </div>

          <div className="p-3">
            <span className="block font-serif-luxury text-2xl sm:text-4xl font-bold text-[#e5c07b]">
              {t.hero.stat3Value}
            </span>
            <span className="text-xs sm:text-sm font-light text-gray-300">
              {t.hero.stat3Label}
            </span>
          </div>
        </div>

        {/* Horizontal Booking Bar */}
        <div className="mt-12 hidden lg:block">
          <div className="bg-[#121a16] border border-[#c5a059]/40 rounded-2xl p-2 flex items-center justify-between shadow-2xl backdrop-blur-md">
            <div className="flex-1 px-4 py-2 border-r border-white/10 text-left">
              <label className="block text-[10px] font-bold text-[#e5c07b] uppercase tracking-widest mb-1">Santuario</label>
              <select className="bg-transparent text-white text-sm w-full outline-none appearance-none cursor-pointer font-light">
                <option className="bg-[#121a16]">Refugi del Canigó (280€/noche)</option>
                <option className="bg-[#121a16]">Refugio de Obsidiana (350€/noche)</option>
                <option className="bg-[#121a16]">Falesia Atlántica (420€/noche)</option>
                <option className="bg-[#121a16]">El Nido del Estrecho (480€/noche)</option>
              </select>
            </div>
            <div className="flex-1 px-4 py-2 border-r border-white/10 text-left">
              <label className="block text-[10px] font-bold text-[#e5c07b] uppercase tracking-widest mb-1">Entrada (Viernes)</label>
              <input type="date" className="bg-transparent text-white text-sm w-full outline-none cursor-pointer font-light [color-scheme:dark]" defaultValue="2026-08-21" />
            </div>
            <div className="flex-1 px-4 py-2 text-left">
              <label className="block text-[10px] font-bold text-[#e5c07b] uppercase tracking-widest mb-1">Salida (Domingo)</label>
              <input type="date" className="bg-transparent text-white text-sm w-full outline-none cursor-pointer font-light [color-scheme:dark]" defaultValue="2026-08-23" />
            </div>
            <button
              onClick={onBookClick}
              className="px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#c5a059] hover:bg-[#e5c07b] transition-colors flex items-center justify-center gap-2 ml-2 whitespace-nowrap shadow-md shadow-[#c5a059]/20 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              Comprobar Disponibilidad
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-[11px] text-gray-300 font-light tracking-wide">
              ✓ Garantía de Precio Directo • Sin Comisiones Ocultas • Cancelación Flexible
            </p>
          </div>
        </div>
      </div>

      {/* Down Arrow Scroll Indicator */}
      <a
        href="#filosofia"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/60 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll to philosophy"
      >
        <ChevronDown className="w-8 h-8 text-[#c5a059]" />
      </a>
    </section>
  );
};
