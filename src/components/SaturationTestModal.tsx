import React, { useState } from 'react';
import { Activity, X, Check, ArrowRight } from 'lucide-react';
import { Language, Refuge } from '../types';
import { refugesData } from '../data/refuges';

interface SaturationTestModalProps {
  currentLang: Language;
  onClose: () => void;
  onSelectRefuge: (refuge: Refuge) => void;
}

interface Option {
  emoji: string;
  label: string;
  targetRefugeId?: string;
}

interface QuestionStep {
  stepNumber: number;
  question: string;
  options: Option[];
}

const diagnosticData: Record<Language, {
  headerStep: (step: number) => string;
  completedBadge: string;
  resultTitle: string;
  directRatePrefix: string;
  sustainableBadge: string;
  ctaButton: string;
  steps: QuestionStep[];
}> = {
  es: {
    headerStep: (step: number) => `DIAGNÓSTICO DE SATURACIÓN DIGITAL (PASO ${step} DE 3)`,
    completedBadge: "DIAGNÓSTICO DE REGENERACIÓN COMPLETADO",
    resultTitle: "Tu Refugio Recomendado:",
    directRatePrefix: "Tarifa Directa: Desde",
    sustainableBadge: "100% Sostenible",
    ctaButton: "VER MI SANTUARIO SELECCIONADO",
    steps: [
      {
        stepNumber: 1,
        question: "1. ¿Cuántas horas diarias pasas frente a pantallas (móvil, PC, TV)?",
        options: [
          { emoji: "🌱", label: "2 - 4 horas (Controlado, pero necesito pausa)" },
          { emoji: "⚡", label: "5 - 7 horas (Saturación laboral moderada)" },
          { emoji: "🔥", label: "8+ horas (Hiperconexión constante y estrés urbano)" },
        ],
      },
      {
        stepNumber: 2,
        question: "2. ¿Cómo calificarías la calidad de tu descanso al despertar?",
        options: [
          { emoji: "🌙", label: "Sueño fragmentado, me despierto con cansancio acumulado" },
          { emoji: "🧠", label: "Mente acelerada respondiendo notificaciones hasta noche" },
          { emoji: "🌲", label: "Duermo bien pero anhelo silencio absoluto de montaña/mar" },
        ],
      },
      {
        stepNumber: 3,
        question: "3. ¿Qué entorno natural calma instantáneamente tu mente?",
        options: [
          {
            emoji: "🏔️",
            label: "Bosque frondoso, ríos caudalosos y aire helado de montaña",
            targetRefugeId: "refugi-canigo",
          },
          {
            emoji: "✨",
            label: "Noches oscuras de cielo profundo y firmamento Starlight",
            targetRefugeId: "refugio-obsidiana",
          },
          {
            emoji: "🌊",
            label: "Acantilados oceánicos, brisa marina y bruma del Atlántico",
            targetRefugeId: "falesia-atlantica",
          },
          {
            emoji: "🌬️",
            label: "Horizonte de dos continentes, viento cálido y paso migratorio",
            targetRefugeId: "el-nido-del-estrecho",
          },
        ],
      },
    ],
  },
  en: {
    headerStep: (step: number) => `DIGITAL SATURATION DIAGNOSIS (STEP ${step} OF 3)`,
    completedBadge: "REGENERATION DIAGNOSIS COMPLETED",
    resultTitle: "Your Recommended Sanctuary:",
    directRatePrefix: "Direct Rate: From",
    sustainableBadge: "100% Sustainable",
    ctaButton: "VIEW MY SELECTED SANCTUARY",
    steps: [
      {
        stepNumber: 1,
        question: "1. How many hours daily do you spend in front of screens (mobile, PC, TV)?",
        options: [
          { emoji: "🌱", label: "2 - 4 hours (Controlled, but in need of a break)" },
          { emoji: "⚡", label: "5 - 7 hours (Moderate work-related saturation)" },
          { emoji: "🔥", label: "8+ hours (Constant hyperconnection and urban stress)" },
        ],
      },
      {
        stepNumber: 2,
        question: "2. How would you rate the quality of your rest upon waking?",
        options: [
          { emoji: "🌙", label: "Fragmented sleep, waking up with accumulated fatigue" },
          { emoji: "🧠", label: "Racing mind replying to notifications late at night" },
          { emoji: "🌲", label: "Sleeping well but longing for absolute mountain/ocean silence" },
        ],
      },
      {
        stepNumber: 3,
        question: "3. Which natural landscape instantly calms your mind?",
        options: [
          {
            emoji: "🏔️",
            label: "Lush forests, rushing mountain rivers, and crisp alpine air",
            targetRefugeId: "refugi-canigo",
          },
          {
            emoji: "✨",
            label: "Deep dark nights and certified Starlight skies",
            targetRefugeId: "refugio-obsidiana",
          },
          {
            emoji: "🌊",
            label: "Ocean cliffs, marine breeze, and Atlantic mist",
            targetRefugeId: "falesia-atlantica",
          },
          {
            emoji: "🌬️",
            label: "Two-continent horizon, warm winds and bird migration routes",
            targetRefugeId: "el-nido-del-estrecho",
          },
        ],
      },
    ],
  },
  fr: {
    headerStep: (step: number) => `DIAGNOSTIC DE SATURATION NUMÉRIQUE (ÉTAPE ${step} SUR 3)`,
    completedBadge: "DIAGNOSTIC DE RÉGÉNÉRATION TERMINÉ",
    resultTitle: "Votre Sanctuaire Recommandé :",
    directRatePrefix: "Tarif Direct : À partir de",
    sustainableBadge: "100% Durable",
    ctaButton: "VOIR MON SANCTUAIRE SÉLECTIONNÉ",
    steps: [
      {
        stepNumber: 1,
        question: "1. Combien d'heures par jour passez-vous devant des écrans (smartphone, PC, TV) ?",
        options: [
          { emoji: "🌱", label: "2 - 4 heures (Sous contrôle, mais besoin d'une pause)" },
          { emoji: "⚡", label: "5 - 7 heures (Saturation professionnelle modérée)" },
          { emoji: "🔥", label: "8+ heures (Hyperconnexion constante et stress urbain)" },
        ],
      },
      {
        stepNumber: 2,
        question: "2. Comment qualifieriez-vous la qualité de votre sommeil au réveil ?",
        options: [
          { emoji: "🌙", label: "Sommeil fragmenté, réveil avec fatigue accumulée" },
          { emoji: "🧠", label: "Esprit agité répondant aux notifications jusque tard dans la nuit" },
          { emoji: "🌲", label: "Bon sommeil mais désir ardent de silence pur montagne/océan" },
        ],
      },
      {
        stepNumber: 3,
        question: "3. Quel environnement naturel apaise instantanément votre esprit ?",
        options: [
          {
            emoji: "🏔️",
            label: "Forêt luxuriante, rivières vivifiantes et air pur de montagne",
            targetRefugeId: "refugi-canigo",
          },
          {
            emoji: "✨",
            label: "Nuits obscures profondes et ciel étoilé certifié Starlight",
            targetRefugeId: "refugio-obsidiana",
          },
          {
            emoji: "🌊",
            label: "Falaises océaniques, brise marine et brume de l'Atlantique",
            targetRefugeId: "falesia-atlantica",
          },
          {
            emoji: "🌬️",
            label: "Horizon de deux continents, vent chaud et migration des oiseaux",
            targetRefugeId: "el-nido-del-estrecho",
          },
        ],
      },
    ],
  },
  cat: {
    headerStep: (step: number) => `DIAGNÒSTIC DE SATURACIÓ DIGITAL (PAS ${step} DE 3)`,
    completedBadge: "DIAGNÒSTIC DE REGENERACIÓ COMPLETAT",
    resultTitle: "El teu Refugi Recomanat:",
    directRatePrefix: "Tarifa Directa: Des de",
    sustainableBadge: "100% Sostenible",
    ctaButton: "VEURE EL MEU SANTUARI SELECCIONAT",
    steps: [
      {
        stepNumber: 1,
        question: "1. Quantes hores diàries passes davant de pantalles (mòbil, PC, TV)?",
        options: [
          { emoji: "🌱", label: "2 - 4 hores (Controlat, però necessito pausa)" },
          { emoji: "⚡", label: "5 - 7 hores (Saturació laboral moderada)" },
          { emoji: "🔥", label: "8+ hores (Hiperconnexió constant i estrès urbà)" },
        ],
      },
      {
        stepNumber: 2,
        question: "2. Com qualificaries la qualitat del teu descans en despertar?",
        options: [
          { emoji: "🌙", label: "Son fragmentat, em desperto amb cansament acumulat" },
          { emoji: "🧠", label: "Ment accelerada responent notificacions fins tard" },
          { emoji: "🌲", label: "Dormo bé però anhelo silenci absolut de muntanya/mar" },
        ],
      },
      {
        stepNumber: 3,
        question: "3. Quin entorn natural calma instantàniament la teva ment?",
        options: [
          {
            emoji: "🏔️",
            label: "Bosc frondós, rius cabalosos i aire gelat de muntanya",
            targetRefugeId: "refugi-canigo",
          },
          {
            emoji: "✨",
            label: "Nits fosques de cel profund i firmament Starlight",
            targetRefugeId: "refugio-obsidiana",
          },
          {
            emoji: "🌊",
            label: "Penya-segats oceànics, brisa marina i baf de l'Atlàntic",
            targetRefugeId: "falesia-atlantica",
          },
          {
            emoji: "🌬️",
            label: "Horitzó de dos continents, vent càlid i ruta migratòria",
            targetRefugeId: "el-nido-del-estrecho",
          },
        ],
      },
    ],
  },
  pt: {
    headerStep: (step: number) => `DIAGNÓSTICO DE SATURAÇÃO DIGITAL (PASSO ${step} DE 3)`,
    completedBadge: "DIAGNÓSTICO DE REGENERAÇÃO CONCLUÍDO",
    resultTitle: "O seu Refúgio Recomendado:",
    directRatePrefix: "Tarifa Direta: A partir de",
    sustainableBadge: "100% Sustentável",
    ctaButton: "VER O MEU SANTUÁRIO SELECIONADO",
    steps: [
      {
        stepNumber: 1,
        question: "1. Quantas horas diárias passa em frente a ecrãs (telemóvel, PC, TV)?",
        options: [
          { emoji: "🌱", label: "2 - 4 horas (Controlado, mas preciso de uma pausa)" },
          { emoji: "⚡", label: "5 - 7 horas (Saturação laboral moderada)" },
          { emoji: "🔥", label: "8+ horas (Hiperconexão constante e stress urbano)" },
        ],
      },
      {
        stepNumber: 2,
        question: "2. Como qualificaria a qualidade do seu descanso ao acordar?",
        options: [
          { emoji: "🌙", label: "Sono fragmentado, acordo com cansaço acumulado" },
          { emoji: "🧠", label: "Mente acelerada a responder a notificações até tarde" },
          { emoji: "🌲", label: "Durmo bem mas anseio por silêncio absoluto de montanha/mar" },
        ],
      },
      {
        stepNumber: 3,
        question: "3. Que ambiente natural acalma instantaneamente a sua mente?",
        options: [
          {
            emoji: "🏔️",
            label: "Floresta luxuriante, rios caudalosos e ar puro de montanha",
            targetRefugeId: "refugi-canigo",
          },
          {
            emoji: "✨",
            label: "Noites escuras de céu profundo e firmamento Starlight",
            targetRefugeId: "refugio-obsidiana",
          },
          {
            emoji: "🌊",
            label: "Falésias oceânicas, brisa marítima e névoa do Atlântico",
            targetRefugeId: "falesia-atlantica",
          },
          {
            emoji: "🌬️",
            label: "Horizonte de dois continentes, vento quente e rota migratória",
            targetRefugeId: "el-nido-del-estrecho",
          },
        ],
      },
    ],
  },
};

export const SaturationTestModal: React.FC<SaturationTestModalProps & { onBookNow?: (refugeId: string) => void }> = ({
  currentLang,
  onClose,
  onSelectRefuge,
  onBookNow,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedTargetId, setSelectedTargetId] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const t = diagnosticData[currentLang] || diagnosticData.es;
  const currentStep = t.steps[currentStepIndex];
  const totalSteps = t.steps.length;

  const handleSelectOption = (option: Option) => {
    if (option.targetRefugeId) {
      setSelectedTargetId(option.targetRefugeId);
    }

    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const recommendedRefuge =
    (selectedTargetId ? refugesData.find((r) => r.id === selectedTargetId || r.slug === selectedTargetId) : null) ||
    refugesData.find((r) => r.id === 'falesia-atlantica') ||
    refugesData[0];

  const handleViewSanctuary = () => {
    onClose();
    if (recommendedRefuge) {
      onSelectRefuge(recommendedRefuge);
    }
  };

  const handleBookNow = () => {
    onClose();
    if (recommendedRefuge && onBookNow) {
      onBookNow(recommendedRefuge.id);
    } else if (recommendedRefuge) {
      onSelectRefuge(recommendedRefuge);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl bg-[#0f1713] border border-[#c5a059]/30 rounded-3xl p-6 sm:p-9 shadow-2xl text-white animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button Circle Top Right */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer z-10"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <div>
            {/* Step Header */}
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-[#c5a059]" />
              <span className="text-[11px] sm:text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                {t.headerStep(currentStep.stepNumber)}
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="flex gap-1.5 mb-6">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full flex-1 transition-all duration-500 ${
                    i <= currentStepIndex ? 'bg-[#c5a059]' : 'bg-white/15'
                  }`}
                />
              ))}
            </div>

            {/* Question Title */}
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-extrabold text-white mb-6 leading-snug">
              {currentStep.question}
            </h2>

            {/* Options List */}
            <div className="space-y-3">
              {currentStep.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className="w-full p-3.5 sm:p-4 rounded-2xl bg-[#16221c]/90 hover:bg-[#1f3027] border border-[#c5a059]/25 hover:border-[#c5a059]/70 transition-all duration-200 flex items-center gap-3 text-left cursor-pointer group shadow-sm hover:shadow-md hover:shadow-[#c5a059]/10"
                >
                  <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">
                    {opt.emoji}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed group-hover:text-white transition-colors">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Completed Badge */}
            <div className="flex justify-center mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c2a23] border border-[#c5a059]/40 text-[#e5c07b] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                <Check className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>{t.completedBadge}</span>
              </div>
            </div>

            {/* Result Title */}
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-extrabold text-white text-center mb-6">
              {t.resultTitle}
            </h2>

            {/* Recommended Refuge Card */}
            <div className="p-6 rounded-2xl bg-[#141f19] border border-[#c5a059]/30 mb-6 shadow-inner">
              <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-widest block mb-1">
                {recommendedRefuge.region.toUpperCase()} • {recommendedRefuge.country.toUpperCase()}
              </span>

              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mb-3">
                {recommendedRefuge.name}
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-6">
                {recommendedRefuge.description[currentLang]}
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-medium text-[#e5c07b]">
                <span>
                  {t.directRatePrefix} {recommendedRefuge.priceFromPerNight}€/noche
                </span>
                <span className="text-emerald-400 font-semibold">{t.sustainableBadge}</span>
              </div>
            </div>

            {/* CTA Buttons - Ver Detalle + Reservar Directo */}
            <div className="space-y-2.5">
              <button
                onClick={handleBookNow}
                className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-wider text-black bg-[#c5a059] hover:bg-[#d8b467] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#c5a059]/20 cursor-pointer group"
              >
                <span>{t.ctaButton}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleViewSanctuary}
                className="w-full py-2.5 px-6 rounded-2xl font-medium text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              >
                {currentLang === 'en' ? 'View full details first' :
                 currentLang === 'fr' ? 'Voir tous les détails' :
                 currentLang === 'cat' ? 'Veure tots els detalls' :
                 currentLang === 'pt' ? 'Ver todos os detalhes' :
                 'Ver todos los detalles primero'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
