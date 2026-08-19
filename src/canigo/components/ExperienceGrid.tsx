import React from 'react';
import { useLang } from '../core/LangContext';
import { t } from '../core/i18n';
import { config } from '../../../businesses/glamping-bosque-luna/config';

/**
 * Iconos para cada servicio del glamping (SVG inline accesibles).
 * Mapeados al campo `id` del servicio en config.ts.
 */
const SERVICE_ICONS: Record<string, React.JSX.Element> = {
  'noche-luna': (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
      <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  ),
  'alojamiento-premium': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  'fogata': (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
      <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
    </svg>
  ),
  'canasta-gourmet': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  ),
  'bienestar': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
  'observacion-estelar': (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
  ),
};

/**
 * ExperienceGrid — Grilla de servicios/experiencias del glamping.
 *
 * Decisión UX/UI: Grid de 2 columnas en móvil y 3 en desktop para mantener
 * ritmo visual equilibrado. Las tarjetas usan glassmorphism oscuro con acento
 * dorado al hover para coherencia con la estética "dark forest luxury".
 */
export default function ExperienceGrid() {
  const { lang } = useLang();

  const sectionTitle = {
    es: 'Tus experiencias',
    ca: 'Les teves experiències',
    fr: 'Vos expériences',
  };

  const sectionSubtitle = {
    es: 'Cada momento diseñado para reconectar con lo esencial',
    ca: 'Cada moment dissenyat per a reconnectar amb l\'essencial',
    fr: 'Chaque moment conçu pour vous reconnecter à l\'essentiel',
  };

  return (
    <section
      id="experiencias"
      aria-labelledby="experiences-title"
      className="py-24 px-6 md:px-12"
      style={{ background: 'linear-gradient(180deg, #0B130E 0%, #0f1a10 100%)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header de sección */}
        <header className="text-center mb-16">
          <p className="text-[#D4AF37]/70 text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Bosque Luna Glamping
          </p>
          <h2
            id="experiences-title"
            className="text-[#F4EFE6] font-bold mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontFamily: '"Georgia", serif' }}
          >
            {sectionTitle[lang]}
          </h2>
          <p className="text-[#F4EFE6]/50 text-base max-w-xl mx-auto">
            {sectionSubtitle[lang]}
          </p>
          {/* Separador dorado */}
          <div className="mt-6 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" aria-hidden="true" />
        </header>

        {/* Grid de tarjetas */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
        >
          {config.services.map((service) => (
            <li
              key={service.id}
              className="
                group relative rounded-2xl p-6 cursor-default
                border border-[#F4EFE6]/5
                transition-all duration-300
                hover:border-[#D4AF37]/30
                hover:shadow-[0_4px_32px_rgba(212,175,55,0.12)]
                hover:-translate-y-1
              "
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Icono */}
              <div
                className="
                  w-14 h-14 rounded-xl flex items-center justify-center mb-5
                  text-[#D4AF37]
                  transition-all duration-300
                  group-hover:bg-[#D4AF37]/15
                "
                style={{ background: 'rgba(212,175,55,0.08)' }}
                aria-hidden="true"
              >
                {SERVICE_ICONS[service.id] ?? (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                )}
              </div>

              {/* Contenido */}
              <h3
                className="text-[#F4EFE6] font-semibold mb-2 text-base group-hover:text-[#D4AF37] transition-colors duration-200"
              >
                {t(service.title, lang)}
              </h3>
              <p className="text-[#F4EFE6]/50 text-sm leading-relaxed">
                {t(service.description, lang)}
              </p>

              {/* Línea decorativa al hover */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }}
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
