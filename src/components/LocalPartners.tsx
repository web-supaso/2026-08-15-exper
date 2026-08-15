import React from 'react';
import { Language } from '../types';
import { localPartners } from '../data/partners';
import { translations } from '../data/translations';
import { MapPin, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface LocalPartnersProps {
  currentLang: Language;
}

export const LocalPartners: React.FC<LocalPartnersProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section id="comunidad" className="py-24 bg-[#faf8f5] text-[#1c2a23]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#c5a059] block mb-2">
            Desarrollo Local & Sostenibilidad
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-[#1c2a23] mb-4">
            {t.partnersSection.title}
          </h2>
          <p className="text-gray-600 font-light text-base sm:text-lg">
            {t.partnersSection.subtitle}
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {localPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#1c2a23]/80 backdrop-blur-md text-[#e5c07b] text-[10px] font-bold uppercase tracking-wider rounded-full border border-[#c5a059]/30">
                    {partner.type}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-[#c5a059] font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{partner.location}</span>
                  </div>

                  <h3 className="font-serif-luxury text-lg font-bold text-[#1c2a23] mb-3">
                    {partner.name}
                  </h3>

                  <p className="text-xs text-gray-600 font-light leading-relaxed mb-4">
                    {partner.description[currentLang]}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>{partner.impactBadge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
