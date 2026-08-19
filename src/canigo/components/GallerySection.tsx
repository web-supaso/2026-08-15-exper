import { useLang } from '../core/LangContext';

/**
 * GallerySection — Muestra la galería de fotografías reales del glamping (.webp).
 */
export default function GallerySection() {
  const { lang } = useLang();

  const title = {
    es: 'Tu santuario en el bosque',
    ca: 'El teu santuari al bosc',
    fr: 'Votre sanctuaire dans la forêt',
  };

  const subtitle = {
    es: 'Un espacio íntimo donde la magia de la luna se combina con el máximo confort.',
    ca: 'Un espai íntim on la màgia de la lluna es combina amb el màxim confort.',
    fr: 'Un espace intime où la magie de la lune se mêle au confort absolu.',
  };

  return (
    <section
      id="galeria"
      aria-label="Galería Bosque Luna Glamping"
      className="relative py-20 px-6 md:px-12 bg-[#0B130E] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <p className="text-[#D4AF37]/70 text-xs tracking-[0.3em] uppercase font-medium mb-3">
            {lang === 'es' && 'Entorno Exclusivo'}
            {lang === 'ca' && 'Entorn Exclusiu'}
            {lang === 'fr' && 'Cadre Exclusif'}
          </p>
          <h2
            className="text-[#F4EFE6] font-bold mb-3"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontFamily: '"Georgia", serif' }}
          >
            {title[lang]}
          </h2>
          <p className="text-[#F4EFE6]/60 text-sm max-w-lg mx-auto">
            {subtitle[lang]}
          </p>
        </div>

        {/* Marco de Imagen Principal (tienda.webp) */}
        <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/20 shadow-[0_16px_60px_rgba(0,0,0,0.8)] group mb-6">
            <img
              src="/assets/tienda.webp"
              alt="Carpa Bell Tent en el bosque iluminada por la luna y la fogata"
              className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#0B130E] via-transparent to-transparent opacity-80"
            aria-hidden="true"
          />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0B130E]/85 backdrop-blur-md border border-[#F4EFE6]/10">
            <div>
              <p className="text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-1">
                Bell Tent VIP Edition
              </p>
              <p className="text-[#F4EFE6] text-sm font-serif italic">
                {lang === 'es' && '"Luces cálidas, fogata bajo las estrellas y cama de lujo en medio de la naturaleza."'}
                {lang === 'ca' && '"Llums càlids, foguera sota les estrelles i llit de luxe enmig de la natura."'}
                {lang === 'fr' && '"Lumières chaleureuses, feu de camp sous les étoiles et lit de luxe en pleine nature."'}
              </p>
            </div>
            <a
              href="#reservar"
              className="px-6 py-2.5 bg-[#D4AF37] text-[#0B130E] text-xs font-bold uppercase rounded-full tracking-wider hover:bg-[#E5A93C] transition-colors whitespace-nowrap"
            >
              {lang === 'es' && 'Reservar'}
              {lang === 'ca' && 'Reservar'}
              {lang === 'fr' && 'Réserver'}
            </a>
          </div>
        </div>

        {/* Grilla Secundaria de Fotos Reales (glamping_002.webp y glamping_003.webp) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-2xl overflow-hidden border border-[#F4EFE6]/10 shadow-lg group h-64 md:h-80">
            <img
              src="/assets/glamping_002.webp"
              alt="Carpa Bell Tent en el frondoso bosque"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 text-xs text-[#F4EFE6]/80 font-medium tracking-wide">
              {lang === 'es' && 'Instalación privada en plena naturaleza'}
              {lang === 'ca' && 'Instal·lació privada en plena natura'}
              {lang === 'fr' && 'Installation privée en pleine nature'}
            </span>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-[#F4EFE6]/10 shadow-lg group h-64 md:h-80">
            <img
              src="/assets/glamping_003.webp"
              alt="Entorno silvestre y luz natural del glamping"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 text-xs text-[#F4EFE6]/80 font-medium tracking-wide">
              {lang === 'es' && 'Apertura y luz entre los árboles'}
              {lang === 'ca' && 'Obertura i llum entre els arbres'}
              {lang === 'fr' && 'Lumière naturelle à travers les arbres'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
