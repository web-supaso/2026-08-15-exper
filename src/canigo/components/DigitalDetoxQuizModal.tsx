import { useState, useEffect } from 'react';
import { useLang } from '../core/LangContext';
import { buildWhatsAppUrl } from '../core/i18n';
import { config } from '../../../businesses/glamping-bosque-luna/config';

interface QuizStrings {
  triggerBtn: string;
  badge: string;
  stepOf: string;
  q1: string;
  q1Opts: string[];
  q2: string;
  q2Opts: string[];
  q3: string;
  q3Opts: string[];
  q4: string;
  q4Opts: string[];
  resultBadge: string;
  resultTitle: string;
  resultDesc: string;
  includedList: string[];
  whatsappCta: string;
  whatsappMsg: string;
  resetBtn: string;
}

const quizTranslations: Record<'es' | 'ca' | 'fr', QuizStrings> = {
  es: {
    triggerBtn: '✨ Diagnóstico de Desconexión',
    badge: 'Diagnóstico de Saturación Digital',
    stepOf: 'Paso {step} de 4',
    q1: '1. ¿Cuántas horas al día estás expuesto a notificaciones, correos y pantallas?',
    q1Opts: [
      '🌱 2 - 4 horas (Controlado, pero necesito una pausa)',
      '⚡ 5 - 8+ horas (Saturación laboral y tensión urbana)'
    ],
    q2: '2. ¿Cómo calificarías la calidad de tu descanso al despertar por la mañana?',
    q2Opts: [
      '🌙 Sueño fragmentado, me despierto con mente acelerada',
      '🌲 Dormiría bien, pero anhelo silencio absoluto sin ruidos de ciudad'
    ],
    q3: '3. ¿Qué escenario natural calma instantáneamente tus pensamientos?',
    q3Opts: [
      '🌕 El crujido de la fogata en el bosque bajo el cielo estrellado y la luna',
      '🍃 El murmullo del viento entre las copas de los árboles'
    ],
    q4: '4. ¿Qué detalle sensorial completaría tu noche de reconexión?',
    q4Opts: [
      '🧺 Un Panier Gourmand artesanal Km 0 con copa de vino local',
      '☕ Desayuno orgánico servido al amanecer frente al bosque'
    ],
    resultBadge: 'Certificado de Regeneración Guardado',
    resultTitle: 'Experiencia Recomendada: Luna Llena en el Bosque',
    resultDesc: 'Tu nivel de saturación digital requiere una inmersión completa de 1 noche en el bosque del Canigó. Fogata privada bajo las estrellas, tienda Bell Tent VIP y desintoxicación total.',
    includedList: [
      'Tienda Bell Tent VIP vestida con ropa de cama de lujo',
      'Panier Gourmand con productos locales Km 0 y vino',
      'Fogata privada bajo las estrellas y luna llena',
      'Silencio absoluto y energía 100% hidroeléctrica propia'
    ],
    whatsappCta: 'Reservar mi Noche de Luna Llena',
    whatsappMsg: 'Hola, he completado el diagnóstico en la web y quiero consultar disponibilidad para la Experiencia Luna Llena.',
    resetBtn: 'Repetir Diagnóstico'
  },
  ca: {
    triggerBtn: '✨ Diagnòstic de Desconnexió',
    badge: 'Diagnòstic de Saturació Digital',
    stepOf: 'Pas {step} de 4',
    q1: '1. Quantes hores al dia estàs exposat a notificacions, correus i pantalles?',
    q1Opts: [
      '🌱 2 - 4 hores (Controlat, però necessito una pausa)',
      '⚡ 5 - 8+ hores (Saturació laboral i tensió urbana)'
    ],
    q2: '2. Com qualificaries la qualitat del teu descans en despertar al matí?',
    q2Opts: [
      '🌙 Son fragmentada, em desperto amb ment accelerada',
      '🌲 Dormiria bé, però anhelo silenci absolut sense sorolls de ciutat'
    ],
    q3: '3. Quin escenari natural calma instantàniament els teus pensaments?',
    q3Opts: [
      '🌕 El crepitar de la foguera al bosc sota el cel estrellat i la lluna',
      '🍃 El murmullo del vent entre les capçades dels arbres'
    ],
    q4: '4. Quin detall sensorial completaria la teva nit de reconnexió?',
    q4Opts: [
      '🧺 Un Panier Gourmand artesanal Km 0 amb copa de vi local',
      '☕ Esmorzar orgànic servit a l’alba davant del bosc'
    ],
    resultBadge: 'Certificat de Regeneració Desat',
    resultTitle: 'Experiència Recomanada: Lluna Plena al Bosc',
    resultDesc: 'El teu nivell de saturació digital requereix una immersió completa de 1 nit al bosc del Canigó. Foguera privada sota les estrelles, tenda Bell Tent VIP i desintoxicació total.',
    includedList: [
      'Tenda Bell Tent VIP vestida amb roba de llit de luxe',
      'Panier Gourmand amb productes locals Km 0 i vi',
      'Foguera privada sota les estrelles i lluna plena',
      'Silenci absolut i energia 100% hidroelèctrica pròpia'
    ],
    whatsappCta: 'Reservar la meva Nit de Lluna Plena',
    whatsappMsg: 'Hola, he completat el diagnòstic a la web i vull consultar disponibilitat per a l’Experiència Lluna Plena.',
    resetBtn: 'Repetir Diagnòstic'
  },
  fr: {
    triggerBtn: '✨ Diagnostic de Déconnexion',
    badge: 'Diagnostic de Saturation Numérique',
    stepOf: 'Étape {step} sur 4',
    q1: '1. Combien d\'heures par jour êtes-vous exposé aux notifications et écrans ?',
    q1Opts: [
      '🌱 2 - 4 heures (Contrôlé, mais besoin d\'une pause)',
      '⚡ 5 - 8+ heures (Saturation professionnelle et stress urbain)'
    ],
    q2: '2. Comment évalueriez-vous la qualité de votre sommeil au réveil ?',
    q2Opts: [
      '🌙 Sommeil fragmenté, réveil avec l\'esprit agité',
      '🌲 Je dormirais bien, mais j\'aspire au silence absolu sans bruits de ville'
    ],
    q3: '3. Quel cadre naturel apaise instantanément vos pensées ?',
    q3Opts: [
      '🌕 Le crépitement du feu dans la forêt sous le ciel étoilé et la lune',
      '🍃 Le murmure du vent à travers la frondaison des arbres'
    ],
    q4: '4. Quel détail sensoriel complèterait votre nuit de ressourcement ?',
    q4Opts: [
      '🧺 Un Panier Gourmand artisanal Km 0 avec un verre de vin local',
      '☕ Petit-déjeuner biologique servi à l\'aube face à la forêt'
    ],
    resultBadge: 'Certificat de Régénération Enregistré',
    resultTitle: 'Expérience Recommandée : Pleine Lune dans la Forêt',
    resultDesc: 'Votre niveau de saturation numérique nécessite une immersion complète d\'une nuit dans la forêt du Canigou. Feu de camp privé, tente Bell Tent VIP et déconnexion absolue.',
    includedList: [
      'Tente Bell Tent VIP équipée de literie de grand luxe',
      'Panier Gourmand avec produits locaux Km 0 et vin',
      'Feu de camp privé sous les étoiles et la pleine lune',
      'Silence absolu et énergie 100% hydroélectrique propre'
    ],
    whatsappCta: 'Réserver ma Nuit de Pleine Lune',
    whatsappMsg: 'Bonjour, j\'ai complété le diagnostic sur le site et souhaite consulter la disponibilité pour l\'Expérience Pleine Lune.',
    resetBtn: 'Refaire le Diagnostic'
  }
};

const STORAGE_KEY = 'bosque_luna_quiz_completed';

export default function DigitalDetoxQuizModal() {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  const t = quizTranslations[lang] || quizTranslations.es;
  const whatsappUrl = buildWhatsAppUrl(config.contact.whatsapp, lang, t.whatsappMsg);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'true') {
      setStep(5); // Show result directly
    }
  }, []);

  const handleAnswer = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      localStorage.setItem(STORAGE_KEY, 'true');
      setStep(5); // Completed & saved
    }
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setStep(1);
  };

  return (
    <>
      {/* Botón flotante inferior izquierdo */}
      <button
        onClick={() => setIsOpen(true)}
        className="
          fixed bottom-6 left-6 z-40
          flex items-center gap-2
          bg-[#0B130E]/95 text-[#F4EFE6]
          border border-[#D4AF37]/80
          px-4 py-3 rounded-full
          shadow-[0_4px_24px_rgba(212,175,55,0.25)]
          hover:shadow-[0_4px_32px_rgba(212,175,55,0.5)]
          hover:scale-105
          transition-all duration-300
          font-semibold text-xs tracking-wider uppercase
          backdrop-blur-md cursor-pointer
        "
        aria-label="Abrir Diagnóstico de Desconexión"
      >
        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
        <span>{t.triggerBtn}</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0B130E] text-[#F4EFE6] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#D4AF37]/40 shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
            >
              ✕
            </button>

            {step <= 4 ? (
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-2">
                  <span>{t.badge} ({t.stepOf.replace('{step}', String(step))})</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold mb-6 text-[#F4EFE6]">
                  {step === 1 && t.q1}
                  {step === 2 && t.q2}
                  {step === 3 && t.q3}
                  {step === 4 && t.q4}
                </h3>

                <div className="space-y-3 mt-6">
                  {(step === 1 ? t.q1Opts : step === 2 ? t.q2Opts : step === 3 ? t.q3Opts : t.q4Opts).map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={handleAnswer}
                      className="w-full text-left p-4 rounded-xl bg-[#121c15] hover:border-[#D4AF37] border border-white/10 transition-all text-xs sm:text-sm font-medium cursor-pointer text-[#F4EFE6]"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 py-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase">
                  <span>✓ {t.resultBadge}</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#F4EFE6]">
                  {t.resultTitle}
                </h3>

                <p className="text-xs text-[#F4EFE6]/70 leading-relaxed max-w-md mx-auto">
                  {t.resultDesc}
                </p>

                <div className="bg-[#121c15] p-5 rounded-2xl border border-[#D4AF37]/40 text-left space-y-2">
                  <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                    Tu experiencia incluye:
                  </p>
                  {t.includedList.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#F4EFE6]/90">
                      <span className="text-[#D4AF37] font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 space-y-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-full font-bold uppercase tracking-wider text-[#0B130E] bg-gradient-to-r from-[#D4AF37] to-[#E5A93C] hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg text-xs"
                  >
                    <span>{t.whatsappCta}</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="text-[11px] text-[#D4AF37]/70 underline hover:text-[#D4AF37] transition-colors block mx-auto cursor-pointer"
                  >
                    {t.resetBtn}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
