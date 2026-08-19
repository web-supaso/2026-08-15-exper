import { useLang } from '../core/LangContext';
import type { Lang } from '../core/i18n';

// Códigos de flag-icons (misma librería que Tramuntana Vintage)
// fi-es-ct = Senyera catalana (región de España)
const LANGUAGES: { code: Lang; label: string; flagUrl: string }[] = [
  { code: 'es', label: 'ES', flagUrl: 'https://flagcdn.com/es.svg' },
  { code: 'ca', label: 'CA', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Catalonia.svg' },
  { code: 'fr', label: 'FR', flagUrl: 'https://flagcdn.com/fr.svg' },
];

export default function LanguageSelector() {
  const { lang, setLang } = useLang();

  return (
    <div
      className="flex items-center gap-1.5"
      role="group"
      aria-label="Selector de idioma"
    >
      {LANGUAGES.map(({ code, label, flagUrl }) => {
        const isActive = lang === code;
        return (
          <button
            key={code}
            onClick={() => setLang(code)}
            aria-pressed={isActive}
            aria-label={`Cambiar idioma a ${label}`}
            className={`
              flex items-center gap-1.5
              px-2.5 py-1 text-xs font-semibold rounded-full border
              transition-all duration-200 select-none whitespace-nowrap cursor-pointer
              ${isActive
                ? 'bg-[#D4AF37] text-[#0B130E] border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.45)]'
                : 'bg-black/30 backdrop-blur-sm text-[#F4EFE6] border-[#F4EFE6]/25 hover:border-[#D4AF37]/70 hover:text-[#D4AF37]'
              }
            `}
          >
            <img src={flagUrl} alt={label} className="w-4 h-3 object-cover rounded-[2px]" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
