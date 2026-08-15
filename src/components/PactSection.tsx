import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Footprints, Volume2, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

interface PactSectionProps {
  currentLang: Language;
}

export const PactSection: React.FC<PactSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const getPactIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints': return <Footprints className="w-8 h-8 text-[#c5a059]" />;
      case 'Volume2': return <Volume2 className="w-8 h-8 text-[#c5a059]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-[#c5a059]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-8 h-8 text-[#c5a059]" />;
      default: return <Sparkles className="w-8 h-8 text-[#c5a059]" />;
    }
  };

  return (
    <section id="pacto" className="py-24 bg-[#faf8f5] text-[#1c2a23]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059] block mb-2">
            Pacto de Convivencia
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-[#1c2a23] mb-4">
            {t.pact.title}
          </h2>
          <p className="text-gray-600 font-light text-base sm:text-lg">
            {t.pact.subtitle}
          </p>
        </div>

        {/* Pact Items Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {t.pact.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-[#c5a059]/20 shadow-sm hover:shadow-lg transition-all flex items-start gap-6"
            >
              <div className="p-4 bg-[#1c2a23]/5 rounded-2xl shrink-0">
                {getPactIcon(item.icon)}
              </div>
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#1c2a23] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
