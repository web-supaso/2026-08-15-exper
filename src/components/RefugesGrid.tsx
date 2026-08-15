import React, { useState } from 'react';
import { Language, Refuge } from '../types';
import { refugesData } from '../data/refuges';
import { translations } from '../data/translations';
import { MapPin, Users, Dog, Sparkles, ArrowRight, Eye, Calendar, ShieldCheck, Thermometer } from 'lucide-react';

interface RefugesGridProps {
  currentLang: Language;
  onSelectRefuge: (refuge: Refuge) => void;
  onBookRefuge: (refugeId: string) => void;
}

export const RefugesGrid: React.FC<RefugesGridProps> = ({
  currentLang,
  onSelectRefuge,
  onBookRefuge,
}) => {
  const [filter, setFilter] = useState<'all' | 'pet' | 'adults' | 'starlight' | 'water'>('all');
  const t = translations[currentLang];

  const filteredRefuges = refugesData.filter((r) => {
    if (filter === 'pet') return r.petFriendly;
    if (filter === 'adults') return r.adultsOnly;
    if (filter === 'starlight') return r.category === 'starlight';
    if (filter === 'water') return r.category === 'mountain' || r.category === 'ocean';
    return true;
  });

  return (
    <section id="refugios" className="py-24 bg-white text-[#1c2a23]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#c5a059] block mb-2">
            Experiencias con Estilo Collection
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-[#1c2a23] mb-4">
            {t.refugesSection.title}
          </h2>
          <p className="text-gray-600 font-light text-base sm:text-lg">
            {t.refugesSection.subtitle}
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
              filter === 'all'
                ? 'bg-[#1c2a23] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.refugesSection.filterAll}
          </button>
          <button
            onClick={() => setFilter('pet')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
              filter === 'pet'
                ? 'bg-[#1c2a23] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.refugesSection.filterPetFriendly}
          </button>
          <button
            onClick={() => setFilter('adults')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
              filter === 'adults'
                ? 'bg-[#1c2a23] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.refugesSection.filterAdultsOnly}
          </button>
          <button
            onClick={() => setFilter('starlight')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
              filter === 'starlight'
                ? 'bg-[#1c2a23] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.refugesSection.filterStarlight}
          </button>
          <button
            onClick={() => setFilter('water')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
              filter === 'water'
                ? 'bg-[#1c2a23] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.refugesSection.filterWater}
          </button>
        </div>

        {/* Refuges Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-10">
          {filteredRefuges.map((refuge) => (
            <div
              key={refuge.id}
              id={refuge.slug}
              className="group bg-[#faf8f5] rounded-3xl overflow-hidden border border-gray-200/80 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <img
                  src={refuge.heroImage}
                  alt={refuge.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badges on Image */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#1c2a23]/90 text-white backdrop-blur-md border border-[#c5a059]/40">
                    {refuge.region}
                  </span>
                  {refuge.petFriendly && (
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/90 text-white backdrop-blur-md">
                      🐾 Pet Friendly
                    </span>
                  )}
                  {refuge.adultsOnly && (
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-purple-900/90 text-white backdrop-blur-md">
                      🧘 Solo Adultos
                    </span>
                  )}
                </div>

                {/* Weather / Starlight Live Badge */}
                {refuge.weatherPreview && (
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90 text-xs bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Thermometer className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>{refuge.weatherPreview.temp}</span>
                      <span className="opacity-75">• {refuge.weatherPreview.condition}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Content Body */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1c2a23]">
                      {refuge.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>{refuge.country}</span>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-[#c5a059] uppercase tracking-wider mb-4">
                    {refuge.tagline}
                  </p>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 font-light">
                    {refuge.description[currentLang]}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2 mb-8">
                    {refuge.highlights[currentLang].slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                        <Sparkles className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="pt-6 border-t border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-gray-500 block uppercase font-medium">
                      {t.refugesSection.from}
                    </span>
                    <span className="font-serif-luxury text-2xl font-extrabold text-[#1c2a23]">
                      {refuge.priceFromPerNight} {refuge.currency}
                    </span>
                    <span className="text-xs text-gray-500"> / {t.refugesSection.perNight}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectRefuge(refuge)}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-full text-xs font-semibold text-[#1c2a23] bg-white border border-gray-300 hover:border-[#1c2a23] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>{t.refugesSection.viewDetails}</span>
                    </button>

                    <button
                      onClick={() => onBookRefuge(refuge.id)}
                      className="flex-1 sm:flex-none px-5 py-2.5 rounded-full text-xs font-semibold text-white gold-gradient-bg hover:opacity-90 shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{t.refugesSection.bookNow}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
