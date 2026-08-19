import { useLang } from '../core/LangContext';
import { t } from '../core/i18n';
import { config } from '../../../businesses/glamping-bosque-luna/config';
import LanguageSelector from './LanguageSelector';
import ForestSoundToggle from './ForestSoundToggle';

/**
 * Hero Section — Bosque Luna Glamping
 *
 * Decisión UX/UI: Patrón Z — el ojo entra por el logo (arriba-izquierda),
 * cruza al selector de idioma y sonido (arriba-derecha), baja al titular dramático
 * (centro), y finaliza en el CTA de reserva (abajo-centro).
 * Fondo: gradiente noche de bosque + overlay de partículas de estrellas CSS.
 */
export default function HeroSection() {
  const { lang } = useLang();

  const ctaLabel = {
    es: 'Reservar experiencia',
    ca: 'Reservar experiència',
    fr: 'Réserver l\'expérience',
  };

  const tagLine = {
    es: 'Plazas limitadas — Reserva anticipada recomendada',
    ca: 'Places limitades — Reserva anticipada recomanada',
    fr: 'Places limitées — Réservation à l\'avance recommandée',
  };

  return (
    <section
      id="hero"
      aria-label="Hero Bosque Luna Glamping"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#0B130E' }}
    >
      {/* ── Background Video de la Fogata y Carpa ── */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/assets/tienda.png"
          className="w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105"
        >
          <source src="/assets/tienda_con_fuego.mp4" type="video/mp4" />
        </video>
        {/* Overlay Gradiente Noche */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B130E]/70 via-[#0B130E]/50 to-[#0B130E]" />
      </div>
      {/* ── Estrellas puramente CSS (0ms JavaScript bloat, 100% r performance) ── */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none opacity-60 animate-pulse"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 15% 15%, #ffffff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 25% 45%, #f4efe6, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 35% 75%, #ffffff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 45% 20%, #e5c07b, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 60% 65%, #ffffff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 70% 30%, #f4efe6, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 85% 80%, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 90% 15%, #e5c07b, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 50% 90%, #ffffff, rgba(0,0,0,0))
          `,
          backgroundSize: '350px 350px',
        }}
      />

      {/* ── Luna decorativa — entra desde la izquierda y se detiene en el centro ── */}
      <div
        aria-hidden="true"
        className="absolute w-24 h-24 rounded-full"
        style={{
          top: '12%',
          left: '-80px',
          background: 'radial-gradient(circle at 35% 35%, #F4EFE6 0%, #e8d9a8 40%, #c8b98a 100%)',
          boxShadow: '0 0 40px rgba(212,175,55,0.35), 0 0 80px rgba(212,175,55,0.15), inset -8px -4px 16px rgba(0,0,0,0.25)',
          animation: 'lunarOrbit 12s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1 forwards',
        }}
      />

      {/* ── Navbar ── */}
      <header className="relative z-20 flex flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-12">
        {/* Logo + Isotipo */}
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0.2)] bg-white p-0.5 shrink-0">
            <img
              src="/logo002-1.png"
              alt="Experiencias con Estilo Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div>
            <p className="font-serif font-bold text-[#F4EFE6] text-lg md:text-2xl leading-tight tracking-tight">
              Experiencias con Estilo
            </p>
            <p className="text-[#D4AF37] text-[10px] md:text-xs tracking-[0.25em] font-semibold uppercase opacity-90">
              EXPERIENCIASCONESTILO.COM
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-[#F4EFE6] border border-white/15 transition-all"
          >
            ← Santuarios
          </a>
          <ForestSoundToggle />
          <LanguageSelector />
        </div>
      </header>

      {/* ── Contenido central ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-16">

        {/* Etiqueta superior */}
        <p className="text-[#D4AF37] text-xs tracking-[0.3em] font-medium uppercase mb-4 opacity-80">
          {lang === 'es' && 'Experiencia'}
          {lang === 'ca' && 'Experiència'}
          {lang === 'fr' && 'Expérience'}
        </p>

        {/* Titular principal — h1 único de la página */}
        <h1
          className="font-black uppercase tracking-tight leading-none mb-6"
          style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
        >
          <span
            className="block text-[#F4EFE6]"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 8rem)', textShadow: '0 2px 40px rgba(212,175,55,0.2)' }}
          >
            LUNA
          </span>
          <span
            className="block"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 8rem)',
              background: 'linear-gradient(135deg, #D4AF37 0%, #E5A93C 50%, #c8963a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            LLENA
          </span>
        </h1>

        {/* Slogan */}
        <p
          className="text-[#F4EFE6]/75 max-w-lg text-base md:text-lg leading-relaxed mb-2 font-light italic"
        >
          {t(config.slogan, lang)}
        </p>
        <p className="text-[#D4AF37]/70 text-sm tracking-widest uppercase font-medium mb-12">
          {t(config.subSlogan, lang)}
        </p>

        {/* CTA Principal */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="#reservar"
            id="cta-hero-reserva"
            className="
              relative overflow-hidden
              px-8 py-4 rounded-full
              font-bold text-[#0B130E] text-sm tracking-wide uppercase
              transition-all duration-300
              hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]
              focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]
            "
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #E5A93C 100%)',
              boxShadow: '0 4px 24px rgba(212,175,55,0.35)',
            }}
          >
            {ctaLabel[lang]}
          </a>

          <p className="text-[#F4EFE6]/40 text-xs tracking-wider">
            {tagLine[lang]}
          </p>
        </div>
      </main>

      {/* ── Flecha scroll ── */}
      <div className="relative z-10 flex justify-center pb-8" aria-hidden="true">
        <div className="animate-bounce text-[#D4AF37]/50">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Keyframes CSS */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50%       { opacity: 0.9; transform: scale(1.4); }
        }

        /*
          lunarOrbit: recorre el ancho de la pantalla de izquierda a derecha
          con una leve subida en el punto medio para simular el arco orbital.
          translateX va de -80px (fuera izq) a calc(100vw + 80px) (fuera der).
          El translateY oscila: baja un poco al inicio, sube en el centro (punto
          más alto de la órbita), y vuelve a bajar al final.
        */
        @keyframes lunarOrbit {
          0%   { transform: translateX(0px)    translateY(30px);  opacity: 0;    }
          8%   { transform: translateX(8vw)    translateY(10px);  opacity: 0.8;  }
          100% { transform: translateX(62vw)   translateY(-30px); opacity: 1;    }
        }
      `}</style>
    </section>
  );
}
