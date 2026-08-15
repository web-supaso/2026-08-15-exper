import React, { useState } from 'react';
import { Language, Refuge } from '../types';
import { refugesData } from '../data/refuges';
import { translations } from '../data/translations';
import { Trees, Sparkles, Waves, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ExperienceQuizProps {
  currentLang: Language;
  onSelectRefuge: (refuge: Refuge) => void;
}

export const ExperienceQuiz: React.FC<ExperienceQuizProps> = ({ currentLang, onSelectRefuge }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const t = translations[currentLang];

  const options = t.quizSection.q1Options;

  const handleSelect = (optionId: string, targetId: string) => {
    setSelectedOptionId(optionId);
    const targetRefuge = refugesData.find((r) => r.id === targetId || r.slug === targetId);
    if (targetRefuge) {
      setTimeout(() => {
        onSelectRefuge(targetRefuge);
      }, 300);
    }
  };

  const getOptionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trees': return <Trees className="w-8 h-8 text-[#c5a059]" />;
      case 'Sparkles': return <Sparkles className="w-8 h-8 text-[#c5a059]" />;
      case 'Waves': return <Waves className="w-8 h-8 text-[#c5a059]" />;
      case 'Compass': return <Compass className="w-8 h-8 text-[#c5a059]" />;
      default: return <Sparkles className="w-8 h-8 text-[#c5a059]" />;
    }
  };

  return (
    <section className="py-20 bg-[#121a16] text-white relative overflow-hidden border-y border-[#c5a059]/20">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#e5c07b] block mb-2">
            Recomendador Concierge
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-white mb-4">
            {t.quizSection.title}
          </h2>
          <p className="text-gray-300 font-light text-base sm:text-lg">
            {t.quizSection.subtitle}
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id, opt.targetId)}
                className={`text-left p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                  isSelected
                    ? 'bg-[#1c2a23] border-[#c5a059] shadow-xl shadow-[#c5a059]/20 scale-105'
                    : 'bg-[#1c2a23]/50 border-white/10 hover:border-[#c5a059]/60 hover:bg-[#1c2a23]/80'
                }`}
              >
                <div>
                  <div className="mb-4 p-3 rounded-xl bg-black/40 border border-white/10 inline-block group-hover:scale-110 transition-transform">
                    {getOptionIcon(opt.icon)}
                  </div>

                  <h3 className="font-serif-luxury text-lg font-bold text-white mb-2 group-hover:text-[#e5c07b] transition-colors">
                    {opt.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed font-light mb-6">
                    {opt.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-[#e5c07b] pt-4 border-t border-white/10">
                  <span>Encontrar este Refugio</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
