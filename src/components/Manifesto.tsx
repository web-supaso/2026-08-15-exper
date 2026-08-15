import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Leaf, VolumeX, Home, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface ManifestoProps {
  currentLang: Language;
}

export const Manifesto: React.FC<ManifestoProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section id="filosofia" className="py-24 bg-[#faf8f5] text-[#1c2a23] relative overflow-hidden">
      {/* Background Subtle Elements */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c2a23]/5 border border-[#1c2a23]/10 text-xs font-bold tracking-widest text-[#1c2a23] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Manifiesto de Marca</span>
          </div>
          <h2 className="font-serif-luxury text-3xl md:text-5xl font-extrabold text-[#1c2a23] leading-tight mb-6">
            {t.manifesto.title}
          </h2>
          <p className="font-display-accent text-xl md:text-2xl italic text-[#c5a059] font-medium max-w-2xl mx-auto">
            "{t.manifesto.subtitle}"
          </p>
        </div>

        {/* Narrative Columns */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl border border-[#c5a059]/20 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-3xl font-serif-luxury font-bold text-[#c5a059] block mb-4">01.</span>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              {t.manifesto.p1}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#c5a059]/20 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-3xl font-serif-luxury font-bold text-[#c5a059] block mb-4">02.</span>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              {t.manifesto.p2}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#c5a059]/20 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-3xl font-serif-luxury font-bold text-[#c5a059] block mb-4">03.</span>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              {t.manifesto.p3}
            </p>
          </div>
        </div>

        {/* The Anti-Villain Callout Box */}
        <div className="emerald-gradient-bg text-white rounded-3xl p-8 sm:p-12 mb-20 shadow-2xl relative overflow-hidden border border-[#c5a059]/30">
          <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <div className="flex items-center gap-3 text-[#e5c07b] text-xs font-bold uppercase tracking-widest mb-3">
                <ShieldAlert className="w-5 h-5 text-[#c5a059]" />
                <span>Nuestra Causa</span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-4xl font-bold mb-4 text-white">
                {t.manifesto.villainTitle}
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-light">
                {t.manifesto.villainP}
              </p>
            </div>
            <div className="md:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-md">
              <span className="block font-serif-luxury text-3xl font-bold text-[#e5c07b] mb-1">60+ Ha</span>
              <span className="text-xs text-gray-300 block mb-3">Protegidas de la masificación</span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a059]/20 text-[#e5c07b] text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Sostenible</span>
              </div>
            </div>
          </div>
        </div>

        {/* Value Pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center hover:border-[#c5a059] transition-all">
            <div className="w-14 h-14 rounded-full bg-[#1c2a23]/5 flex items-center justify-center text-[#1c2a23] mx-auto mb-6">
              <Leaf className="w-7 h-7 text-[#c5a059]" />
            </div>
            <h4 className="font-serif-luxury text-xl font-bold mb-3 text-[#1c2a23]">
              {t.manifesto.values[0].title}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t.manifesto.values[0].desc}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center hover:border-[#c5a059] transition-all">
            <div className="w-14 h-14 rounded-full bg-[#1c2a23]/5 flex items-center justify-center text-[#1c2a23] mx-auto mb-6">
              <VolumeX className="w-7 h-7 text-[#c5a059]" />
            </div>
            <h4 className="font-serif-luxury text-xl font-bold mb-3 text-[#1c2a23]">
              {t.manifesto.values[1].title}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t.manifesto.values[1].desc}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center hover:border-[#c5a059] transition-all">
            <div className="w-14 h-14 rounded-full bg-[#1c2a23]/5 flex items-center justify-center text-[#1c2a23] mx-auto mb-6">
              <Home className="w-7 h-7 text-[#c5a059]" />
            </div>
            <h4 className="font-serif-luxury text-xl font-bold mb-3 text-[#1c2a23]">
              {t.manifesto.values[2].title}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t.manifesto.values[2].desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
