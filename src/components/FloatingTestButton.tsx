import React from 'react';
import { Sparkles } from 'lucide-react';

export const FloatingTestButton: React.FC = () => {
  const handleScrollToQuiz = () => {
    const element = document.getElementById('quiz');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleScrollToQuiz}
      className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#121a16] border border-[#c5a059]/40 hover:border-[#c5a059] hover:bg-[#1c2a23] transition-all shadow-lg hover:shadow-[#c5a059]/20 group cursor-pointer"
      aria-label="Test de Saturación Digital"
    >
      <Sparkles className="w-4 h-4 text-[#c5a059] group-hover:animate-pulse" />
      <span className="text-xs font-bold uppercase tracking-wider text-[#e5c07b]">
        Test de Saturación Digital
      </span>
    </button>
  );
};
