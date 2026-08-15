import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface CookieBannerProps {
  currentLang: Language;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ currentLang }) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = translations[currentLang];

  useEffect(() => {
    // Show banner after 1 second if not accepted
    const accepted = localStorage.getItem('cookiesAccepted');
    if (!accepted) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  const handleAcceptAll = () => {
    localStorage.setItem('cookiesAccepted', 'all');
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('cookiesAccepted', 'essential');
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-[340px] bg-[#121a16] border border-[#c5a059]/40 rounded-xl shadow-2xl p-5 backdrop-blur-lg">
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
        <h3 className="font-bold text-[11px] uppercase tracking-widest text-[#e5c07b]">
          {t.cookieBanner.title}
        </h3>
      </div>
      <p className="text-xs text-gray-300 mb-5 leading-relaxed font-light">
        {t.cookieBanner.description}
      </p>
      <div className="flex gap-3">
        <button
          onClick={handleAcceptAll}
          className="flex-[1.2] py-2 px-3 rounded-lg text-[11px] font-bold uppercase tracking-wider text-black bg-[#c5a059] hover:bg-[#e5c07b] transition-colors flex items-center justify-center gap-1 shadow-md shadow-[#c5a059]/20 cursor-pointer"
        >
          <span>✓</span> {t.cookieBanner.acceptAll}
        </button>
        <button
          onClick={handleAcceptEssential}
          className="flex-[0.8] py-2 px-3 rounded-lg text-[11px] font-semibold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
        >
          {t.cookieBanner.onlyEssential}
        </button>
      </div>
    </div>
  );
};
