import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, Settings } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface CookieBannerProps {
  currentLang: Language;
}

// RGPD / GDPR compliant cookie banner
// - All choices equally prominent (no dark patterns)
// - Reject is as easy as accept
// - Links to privacy and cookie policies
// - Granular preferences panel option
export const CookieBanner: React.FC<CookieBannerProps> = ({ currentLang }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const t = translations[currentLang];

  useEffect(() => {
    const consent = localStorage.getItem('gdpr_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  const applyConsent = (type: 'all' | 'essential' | 'reject' | 'custom') => {
    const consentData = {
      timestamp: new Date().toISOString(),
      essential: true,
      analytics: type === 'all' || (type === 'custom' && analyticsEnabled),
      marketing: type === 'all' || (type === 'custom' && marketingEnabled),
      version: '1.0',
    };
    localStorage.setItem('gdpr_consent', JSON.stringify(consentData));
    setIsVisible(false);
  };

  // RGPD labels per language
  const gdprLabels: Record<Language, {
    title: string;
    desc: string;
    rejectAll: string;
    onlyEssential: string;
    acceptAll: string;
    customize: string;
    essential: string;
    essentialDesc: string;
    analytics: string;
    analyticsDesc: string;
    marketing: string;
    marketingDesc: string;
    save: string;
    privacyLink: string;
    cookieLink: string;
    alwaysOn: string;
  }> = {
    es: {
      title: "Privacidad y Experiencia Consciente",
      desc: "Utilizamos cookies esenciales para garantizar la funcionalidad del sitio. Con tu consentimiento, también podemos usar cookies analíticas para mejorar la experiencia.",
      rejectAll: "Rechazar Todo",
      onlyEssential: "Solo Esenciales",
      acceptAll: "Aceptar Todo",
      customize: "Personalizar",
      essential: "Esenciales (Obligatorias)",
      essentialDesc: "Necesarias para el funcionamiento del sitio. No pueden desactivarse.",
      analytics: "Analítica Anónima",
      analyticsDesc: "Datos anónimos de primera parte para mejorar la experiencia. Sin rastreo entre sitios.",
      marketing: "Comunicación Personalizada",
      marketingDesc: "Para enviar comunicaciones relevantes por correo electrónico.",
      save: "Guardar preferencias",
      privacyLink: "Política de Privacidad",
      cookieLink: "Política de Cookies",
      alwaysOn: "Siempre activas",
    },
    en: {
      title: "Privacy & Conscious Experience",
      desc: "We use strictly essential cookies to ensure site functionality. With your consent, we may also use anonymous analytics to improve your experience.",
      rejectAll: "Reject All",
      onlyEssential: "Essentials Only",
      acceptAll: "Accept All",
      customize: "Customize",
      essential: "Essential (Required)",
      essentialDesc: "Required for basic site functionality. Cannot be disabled.",
      analytics: "Anonymous Analytics",
      analyticsDesc: "First-party anonymous data to improve experience. No cross-site tracking.",
      marketing: "Personalised Communication",
      marketingDesc: "To send relevant communications by email.",
      save: "Save preferences",
      privacyLink: "Privacy Policy",
      cookieLink: "Cookie Policy",
      alwaysOn: "Always on",
    },
    fr: {
      title: "Confidentialité & Expérience Consciente",
      desc: "Nous utilisons des cookies strictement essentiels pour assurer le fonctionnement du site. Avec votre consentement, nous pouvons aussi utiliser des données analytiques anonymes.",
      rejectAll: "Tout refuser",
      onlyEssential: "Essentiels seulement",
      acceptAll: "Tout accepter",
      customize: "Personnaliser",
      essential: "Essentiels (Obligatoires)",
      essentialDesc: "Nécessaires au fonctionnement du site. Ils ne peuvent pas être désactivés.",
      analytics: "Analytique Anonyme",
      analyticsDesc: "Données anonymes de première partie pour améliorer l'expérience.",
      marketing: "Communication personnalisée",
      marketingDesc: "Pour envoyer des communications pertinentes par e-mail.",
      save: "Enregistrer les préférences",
      privacyLink: "Politique de confidentialité",
      cookieLink: "Politique de cookies",
      alwaysOn: "Toujours actifs",
    },
    cat: {
      title: "Privacitat i Experiència Conscient",
      desc: "Fem servir galetes estrictament essencials per garantir el funcionament del lloc. Amb el teu consentiment, podem usar dades analítiques anònimes per millorar l'experiència.",
      rejectAll: "Rebutjar-ho tot",
      onlyEssential: "Només essencials",
      acceptAll: "Acceptar-ho tot",
      customize: "Personalitzar",
      essential: "Essencials (Obligatòries)",
      essentialDesc: "Necessàries per al funcionament bàsic del lloc. No es poden desactivar.",
      analytics: "Analítica Anònima",
      analyticsDesc: "Dades anònimes de primera part per millorar l'experiència.",
      marketing: "Comunicació personalitzada",
      marketingDesc: "Per enviar comunicacions rellevants per correu electrònic.",
      save: "Desar preferències",
      privacyLink: "Política de Privacitat",
      cookieLink: "Política de Galetes",
      alwaysOn: "Sempre actives",
    },
    pt: {
      title: "Privacidade e Experiência Consciente",
      desc: "Utilizamos cookies estritamente essenciais para garantir a funcionalidade do site. Com o seu consentimento, podemos usar dados analíticos anónimos para melhorar a experiência.",
      rejectAll: "Rejeitar Tudo",
      onlyEssential: "Apenas Essenciais",
      acceptAll: "Aceitar Tudo",
      customize: "Personalizar",
      essential: "Essenciais (Obrigatórias)",
      essentialDesc: "Necessárias para o funcionamento do site. Não podem ser desativadas.",
      analytics: "Analítica Anónima",
      analyticsDesc: "Dados anónimos de primeira parte para melhorar a experiência.",
      marketing: "Comunicação Personalizada",
      marketingDesc: "Para enviar comunicações relevantes por e-mail.",
      save: "Guardar preferências",
      privacyLink: "Política de Privacidade",
      cookieLink: "Política de Cookies",
      alwaysOn: "Sempre ativas",
    },
  };

  const L = gdprLabels[currentLang];

  if (showPreferences) {
    return (
      <div className="fixed bottom-6 left-6 z-50 max-w-[380px] bg-[#121a16] border border-[#c5a059]/40 rounded-2xl shadow-2xl p-5 backdrop-blur-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#c5a059]" />
            <h3 className="font-bold text-[11px] uppercase tracking-widest text-[#e5c07b]">
              {L.customize}
            </h3>
          </div>
          <button
            onClick={() => setShowPreferences(false)}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Back"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category: Essential */}
        <div className="mb-3 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-white">{L.essential}</span>
            <span className="text-[10px] text-[#c5a059] font-semibold">{L.alwaysOn}</span>
          </div>
          <p className="text-[10px] text-gray-400 leading-relaxed">{L.essentialDesc}</p>
        </div>

        {/* Category: Analytics */}
        <div className="mb-3 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-white">{L.analytics}</span>
            <button
              onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
              className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${analyticsEnabled ? 'bg-[#c5a059]' : 'bg-gray-600'}`}
              aria-checked={analyticsEnabled}
              role="switch"
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${analyticsEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          <p className="text-[10px] text-gray-400 leading-relaxed">{L.analyticsDesc}</p>
        </div>

        {/* Category: Marketing */}
        <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-white">{L.marketing}</span>
            <button
              onClick={() => setMarketingEnabled(!marketingEnabled)}
              className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${marketingEnabled ? 'bg-[#c5a059]' : 'bg-gray-600'}`}
              aria-checked={marketingEnabled}
              role="switch"
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${marketingEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          <p className="text-[10px] text-gray-400 leading-relaxed">{L.marketingDesc}</p>
        </div>

        <button
          onClick={() => applyConsent('custom')}
          className="w-full py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider text-black bg-[#c5a059] hover:bg-[#e5c07b] transition-colors cursor-pointer"
        >
          {L.save}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-[360px] bg-[#121a16] border border-[#c5a059]/40 rounded-2xl shadow-2xl p-5 backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
        <h3 className="font-bold text-[11px] uppercase tracking-widest text-[#e5c07b]">
          {L.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-[11px] text-gray-300 mb-3 leading-relaxed font-light">
        {L.desc}
      </p>

      {/* Policy Links */}
      <div className="flex gap-3 mb-4 text-[10px]">
        <a
          href="/privacidad"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#c5a059] hover:text-[#e5c07b] underline underline-offset-2 transition-colors"
        >
          {L.privacyLink}
        </a>
        <a
          href="/cookies"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#c5a059] hover:text-[#e5c07b] underline underline-offset-2 transition-colors"
        >
          {L.cookieLink}
        </a>
      </div>

      {/* GDPR-compliant buttons — equally prominent, reject as easy as accept */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        {/* Reject All — equal prominence, GDPR requirement */}
        <button
          onClick={() => applyConsent('reject')}
          className="py-2 px-2 rounded-lg text-[10px] font-semibold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/15 transition-colors cursor-pointer"
        >
          {L.rejectAll}
        </button>

        {/* Essentials Only */}
        <button
          onClick={() => applyConsent('essential')}
          className="py-2 px-2 rounded-lg text-[10px] font-semibold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/15 transition-colors cursor-pointer"
        >
          {L.onlyEssential}
        </button>

        {/* Accept All */}
        <button
          onClick={() => applyConsent('all')}
          className="py-2 px-2 rounded-lg text-[10px] font-bold text-black bg-[#c5a059] hover:bg-[#e5c07b] transition-colors cursor-pointer"
        >
          {L.acceptAll}
        </button>
      </div>

      {/* Customize link */}
      <button
        onClick={() => setShowPreferences(true)}
        className="w-full text-center text-[10px] text-gray-400 hover:text-[#e5c07b] transition-colors underline underline-offset-2 cursor-pointer mt-1"
      >
        {L.customize} →
      </button>
    </div>
  );
};
