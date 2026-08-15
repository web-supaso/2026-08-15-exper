import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Sparkles, Globe, Mail, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSeoInspector: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onLanguageChange,
  onOpenSeoInspector,
}) => {
  const t = translations[currentLang];

  return (
    <footer className="bg-[#0b110e] text-white py-16 border-t border-gray-800/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-[#c5a059]/40 bg-[#1c2a23] flex items-center justify-center text-[#c5a059]">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-serif-luxury text-xl font-bold tracking-tight text-white">
                {t.brandName}
              </span>
            </div>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="text-[11px] text-[#c5a059] font-mono">
              http://experienciasconestilo.com
            </div>
          </div>

          {/* Refuges Links */}
          <div>
            <h4 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-light">
              <li>
                <a href="#refugios" className="hover:text-[#c5a059] transition-colors">
                  Refugi del Canigó (Pirineos)
                </a>
              </li>
              <li>
                <a href="#refugios" className="hover:text-[#c5a059] transition-colors">
                  El Refugio de Obsidiana (Teruel)
                </a>
              </li>
              <li>
                <a href="#refugios" className="hover:text-[#c5a059] transition-colors">
                  Falesia Atlántica (Portugal)
                </a>
              </li>
              <li>
                <a href="#refugios" className="hover:text-[#c5a059] transition-colors">
                  El Nido del Estrecho (Gibraltar)
                </a>
              </li>
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h4 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t.footer.languages}
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => onLanguageChange('es')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  currentLang === 'es' ? 'bg-[#c5a059] border-[#c5a059] text-white font-bold' : 'border-gray-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                🇪🇸 ES
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  currentLang === 'en' ? 'bg-[#c5a059] border-[#c5a059] text-white font-bold' : 'border-gray-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                🇬🇧 EN
              </button>
              <button
                onClick={() => onLanguageChange('fr')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  currentLang === 'fr' ? 'bg-[#c5a059] border-[#c5a059] text-white font-bold' : 'border-gray-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                🇫🇷 FR
              </button>
              <button
                onClick={() => onLanguageChange('cat')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  currentLang === 'cat' ? 'bg-[#c5a059] border-[#c5a059] text-white font-bold' : 'border-gray-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                🏴 CAT
              </button>
              <button
                onClick={() => onLanguageChange('pt')}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  currentLang === 'pt' ? 'bg-[#c5a059] border-[#c5a059] text-white font-bold' : 'border-gray-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                🇵🇹 PT
              </button>
            </div>
          </div>

          {/* Contact & CRM */}
          <div>
            <h4 className="font-serif-luxury text-sm font-bold text-white uppercase tracking-wider mb-4">
              Atención & Concierge
            </h4>
            <div className="space-y-2 text-xs text-gray-400 font-light">
              <a href="mailto:hola@experienciasconestilo.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>hola@experienciasconestilo.com</span>
              </a>
              <p className="text-[11px] text-gray-500 pt-2">
                {t.footer.crmNote}
              </p>
              <button
                onClick={onOpenSeoInspector}
                className="mt-2 text-[11px] text-[#c5a059] underline hover:text-[#e5c07b] transition-colors block"
              >
                Inspeccionar Datos Estructurados JSON-LD / SEO
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-light">
          <p>
            © {new Date().getFullYear()} Experiencias con Estilo. Todos los derechos reservados. • Diseñado por{' '}
            <a
              href="https://marketingamable.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c5a059] hover:underline font-medium transition-colors"
            >
              marketingamable.com
            </a>
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300 transition-colors">{t.footer.legal}</a>
            <a href="#" className="hover:text-gray-300 transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-gray-300 transition-colors">{t.footer.cookies}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
