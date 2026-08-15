import React, { useState } from 'react';
import { Language } from '../types';
import { faqItems } from '../data/faq';
import { translations } from '../data/translations';
import { Search, ChevronDown, Sparkles, HelpCircle, Bot } from 'lucide-react';

interface FaqSectionProps {
  currentLang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ currentLang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(faqItems[0].id);

  const t = translations[currentLang];

  const filteredFaqs = faqItems.filter((item) => {
    const q = item.question[currentLang].toLowerCase();
    const a = item.answer[currentLang].toLowerCase();
    const kw = item.aiSearchKeywords.join(' ').toLowerCase();
    const query = searchQuery.toLowerCase();
    return q.includes(query) || a.includes(query) || kw.includes(query);
  });

  return (
    <section id="faq" className="py-24 bg-white text-[#1c2a23] border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c2a23]/5 border border-[#1c2a23]/10 text-xs font-bold tracking-widest text-[#1c2a23] uppercase mb-3">
            <Bot className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{t.faqSection.aiBadge}</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-extrabold text-[#1c2a23] mb-4">
            {t.faqSection.title}
          </h2>
          <p className="text-gray-600 font-light text-base">
            {t.faqSection.subtitle}
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative mb-10">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.faqSection.searchPlaceholder}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#faf8f5] border border-gray-300 focus:border-[#c5a059] focus:outline-none text-sm text-[#1c2a23] transition-colors"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-[#faf8f5] rounded-2xl border border-gray-200/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#c5a059] shrink-0" />
                    <span className="font-serif-luxury text-lg font-bold text-[#1c2a23]">
                      {faq.question[currentLang]}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#c5a059]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-gray-700 leading-relaxed font-light border-t border-gray-200/50">
                    <p className="mb-3">{faq.answer[currentLang]}</p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mr-1">
                        {t.faqSection.keywordsLabel}
                      </span>
                      {faq.aiSearchKeywords.slice(0, 4).map((kw, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-gray-200/70 text-[10px] text-gray-600">
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-sm">
              No hemos encontrado coincidencias con tu búsqueda. ¿Tienes otra duda? Escribe a nuestro concierge.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
