import React from 'react';
import { Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FloatingTestButtonProps {
  currentLang: Language;
  onOpenTest: () => void;
}

export const FloatingTestButton: React.FC<FloatingTestButtonProps> = ({ currentLang, onOpenTest }) => {
  const t = translations[currentLang];

  return (
    <button
      onClick={onOpenTest}
      className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#121a16] border border-[#c5a059]/40 hover:border-[#c5a059] hover:bg-[#1c2a23] transition-all shadow-lg hover:shadow-[#c5a059]/20 group cursor-pointer"
      aria-label={t.quizSection.floatingBtn}
    >
      <Sparkles className="w-4 h-4 text-[#c5a059] group-hover:animate-pulse" />
      <span className="text-xs font-bold uppercase tracking-wider text-[#e5c07b]">
        {t.quizSection.floatingBtn}
      </span>
    </button>
  );
};
