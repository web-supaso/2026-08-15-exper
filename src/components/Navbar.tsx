import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Calendar, Menu, X, Globe } from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: (refugeId?: string) => void;
  onOpenSeoInspector: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenBooking,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = translations[currentLang];

  const languages: { code: Language; label: string; shortLabel: string; flag: string }[] = [
    { code: 'es', label: 'Español', shortLabel: 'ES', flag: 'https://flagcdn.com/es.svg' },
    { code: 'en', label: 'English', shortLabel: 'EN', flag: 'https://flagcdn.com/gb.svg' },
    { code: 'fr', label: 'Français', shortLabel: 'FR', flag: 'https://flagcdn.com/fr.svg' },
    { code: 'cat', label: 'Català', shortLabel: 'CAT', flag: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Catalonia.svg' },
    { code: 'pt', label: 'Português', shortLabel: 'PT', flag: 'https://flagcdn.com/pt.svg' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentLangObj = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#121a16]/95 backdrop-blur-md border-b border-[#c5a059]/20 shadow-2xl py-3'
          : 'bg-gradient-to-b from-black/90 via-black/70 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* LINEA SUPERIOR: Logo + Título a la Izquierda / Botones a la Derecha */}
        <div className="flex items-center justify-between pb-3">
          {/* Izquierda: Logo png + Nombre de Marca */}
          <a href="#" className="group flex items-center gap-3 text-white">
            <img
              src="/logo002-1.png"
              alt="Experiencias con Estilo Logo"
              className="w-10 h-10 object-contain rounded-full border border-[#c5a059]/40 group-hover:scale-105 transition-transform bg-[#faf8f5]/10"
            />
            <div>
              <span className="font-serif-luxury text-xl md:text-2xl font-bold tracking-tight text-white block leading-tight">
                {t.brandName}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#c5a059] block font-light">
                experienciasconestilo.com
              </span>
            </div>
          </a>

          {/* Derecha: Idiomas + Reservar */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Selector de Idiomas */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all tracking-wider"
              >
                <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
                <img src={currentLangObj.flag} alt={currentLangObj.shortLabel} className="w-4 h-3 object-cover rounded-[2px] opacity-90" />
                <span className="font-semibold text-xs text-white uppercase">{currentLangObj.shortLabel}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-[#121a16] border border-[#c5a059]/30 rounded-xl shadow-2xl py-2 z-50 backdrop-blur-lg">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-[#1c2a23] transition-colors ${
                        currentLang === lang.code
                          ? 'text-[#c5a059] font-bold bg-[#1c2a23]/50'
                          : 'text-gray-300'
                      }`}
                    >
                      <span className="text-xs flex items-center gap-2">
                        <img src={lang.flag} alt={lang.shortLabel} className="w-4 h-3 object-cover rounded-[2px] opacity-90" />
                        <span>{lang.label}</span>
                      </span>
                      <span className="text-xs font-semibold text-gray-400">
                        {lang.shortLabel}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Botón de Reservar */}
            <button
              onClick={() => onOpenBooking()}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-white gold-gradient-bg hover:opacity-90 shadow-lg shadow-[#c5a059]/20 transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.nav.book}</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => onLanguageChange(currentLang === 'es' ? 'en' : 'es')}
              className="px-2.5 py-1 text-xs rounded-full bg-white/10 text-white border border-white/20 uppercase"
            >
              {currentLangObj.shortLabel}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#c5a059] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* LINEA INFERIOR: Menú de navegación en una sola línea bien distribuida */}
        <nav className="hidden md:flex items-center justify-center space-x-8 pt-2 border-t border-white/10 text-xs font-medium text-gray-200 uppercase tracking-widest">
          <a href="#filosofia" className="hover:text-[#c5a059] transition-colors py-1">
            {t.nav.philosophy}
          </a>
          <a href="#refugios" className="hover:text-[#c5a059] transition-colors py-1">
            {t.nav.refuges}
          </a>
          <a href="#pacto" className="hover:text-[#c5a059] transition-colors py-1">
            {t.nav.pact}
          </a>
          <a href="#faq" className="hover:text-[#c5a059] transition-colors py-1">
            {t.nav.faq}
          </a>
          <a href="#comunidad" className="hover:text-[#c5a059] transition-colors py-1">
            {t.nav.partners}
          </a>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121a16] border-b border-[#c5a059]/30 px-6 py-6 space-y-4 text-white">
          <nav className="flex flex-col space-y-3 font-medium text-sm">
            <a
              href="#filosofia"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c5a059]"
            >
              {t.nav.philosophy}
            </a>
            <a
              href="#refugios"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c5a059]"
            >
              {t.nav.refuges}
            </a>
            <a
              href="#pacto"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c5a059]"
            >
              {t.nav.pact}
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c5a059]"
            >
              {t.nav.faq}
            </a>
            <a
              href="#comunidad"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c5a059]"
            >
              {t.nav.partners}
            </a>
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Seleccionar Idioma:</span>
              <div className="flex gap-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onLanguageChange(l.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2 py-1 text-xs rounded ${
                      currentLang === l.code ? 'bg-[#c5a059] text-white font-bold' : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {l.shortLabel}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-center py-3 font-semibold text-xs uppercase tracking-wider text-white gold-gradient-bg rounded-lg shadow-md"
            >
              {t.nav.book}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
