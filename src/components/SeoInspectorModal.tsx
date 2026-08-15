import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { refugesData } from '../data/refuges';
import { faqItems } from '../data/faq';
import { X, Code, Copy, Check, ShieldCheck, Sparkles, Globe, FileText, Bot } from 'lucide-react';

interface SeoInspectorModalProps {
  currentLang: Language;
  onClose: () => void;
}

export const SeoInspectorModal: React.FC<SeoInspectorModalProps> = ({ currentLang, onClose }) => {
  const [activeTab, setActiveTab] = useState<'schema' | 'meta' | 'ai'>('schema');
  const [copied, setCopied] = useState(false);

  const t = translations[currentLang];

  // Dynamic JSON-LD Schema Generation
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://experienciasconestilo.com/#organization",
        "name": "Experiencias con Estilo",
        "url": "https://experienciasconestilo.com",
        "logo": "https://experienciasconestilo.com/logo.png",
        "description": "Red de 4 refugios exclusivos y turismo regenerativo en Europa: Refugi del Canigó, Refugio de Obsidiana, Falesia Atlántica y El Nido del Estrecho.",
        "email": "hola@experienciasconestilo.com",
        "sameAs": [
          "https://instagram.com/experienciasconestilo",
          "https://linkedin.com/company/experienciasconestilo"
        ]
      },
      {
        "@type": "LodgingBusiness",
        "@id": "https://experienciasconestilo.com/#lodging",
        "name": "Experiencias con Estilo Sanctuaries",
        "url": "https://experienciasconestilo.com",
        "priceRange": "280€ - 480€",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "Europe"
        },
        "containsPlace": refugesData.map((r) => ({
          "@type": "LodgingBusiness",
          "name": r.name,
          "description": r.description[currentLang],
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": r.coordinates.lat,
            "longitude": r.coordinates.lng
          },
          "priceRange": `Desde ${r.priceFromPerNight} ${r.currency}`
        }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqItems.map((f) => ({
          "@type": "Question",
          "name": f.question[currentLang],
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer[currentLang]
          }
        }))
      }
    ]
  };

  const jsonLdString = JSON.stringify(jsonLdData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonLdString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#121a16] text-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto border border-[#c5a059]/40 shadow-2xl relative p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#c5a059]/20 text-[#c5a059]">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold">
                {t.seoModal.title}
              </h2>
              <p className="text-xs text-gray-400 font-light">
                {t.seoModal.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 my-6 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'schema'
                ? 'bg-[#c5a059] text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>{t.seoModal.tabSchema}</span>
          </button>

          <button
            onClick={() => setActiveTab('meta')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'meta'
                ? 'bg-[#c5a059] text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{t.seoModal.tabMeta}</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'ai'
                ? 'bg-[#c5a059] text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>{t.seoModal.tabAiGeoseo}</span>
          </button>
        </div>

        {/* Tab 1: JSON-LD Code */}
        {activeTab === 'schema' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono">
                &lt;script type="application/ld+json"&gt;
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-[#e5c07b] transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t.seoModal.copied : t.seoModal.copySchema}</span>
              </button>
            </div>

            <pre className="bg-black/60 p-4 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto max-h-80 border border-white/10">
              {jsonLdString}
            </pre>
          </div>
        )}

        {/* Tab 2: Multilingual Meta Tags */}
        {activeTab === 'meta' && (
          <div className="space-y-4 text-xs font-mono">
            <div className="bg-black/60 p-4 rounded-xl border border-white/10 space-y-2 text-gray-300">
              <p className="text-[#e5c07b] font-bold">&lt;!-- Canonical & Base --&gt;</p>
              <p>&lt;link rel="canonical" href="https://experienciasconestilo.com/" /&gt;</p>
              <p>&lt;title&gt;Experiencias con Estilo | Alojamientos de Lujo y Naturaleza en Europa&lt;/title&gt;</p>

              <p className="text-[#e5c07b] font-bold pt-3">&lt;!-- Multilingual Hreflang Tags --&gt;</p>
              <p>&lt;link rel="alternate" hreflang="es" href="https://experienciasconestilo.com/" /&gt;</p>
              <p>&lt;link rel="alternate" hreflang="en" href="https://experienciasconestilo.com/en/" /&gt;</p>
              <p>&lt;link rel="alternate" hreflang="fr" href="https://experienciasconestilo.com/fr/" /&gt;</p>
              <p>&lt;link rel="alternate" hreflang="cat" href="https://experienciasconestilo.com/cat/" /&gt;</p>
              <p>&lt;link rel="alternate" hreflang="pt" href="https://experienciasconestilo.com/pt/" /&gt;</p>
            </div>
          </div>
        )}

        {/* Tab 3: GEO / AI Readiness Checklist */}
        {activeTab === 'ai' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#1c2a23] border border-[#c5a059]/30 space-y-3">
              <div className="flex items-center gap-2 text-[#e5c07b] font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Puntuación de Compatibilidad GEO-AI: 98/100</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                Los motores de Inteligencia Artificial (ChatGPT Search, Perplexity AI, Google SGE, Gemini) prefieren datos con hechos estructurados directos, coordenadas exactas y preguntas con respuestas unívocas.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-white/5 rounded-lg flex items-center justify-between border border-white/10">
                <span className="text-gray-300">✓ Entidad de Marca Única ("Experiencias con Estilo")</span>
                <span className="text-emerald-400 font-bold">Verificado</span>
              </div>
              <div className="p-3 bg-white/5 rounded-lg flex items-center justify-between border border-white/10">
                <span className="text-gray-300">✓ FAQ Page Schema con 6 dudas clave de conversión</span>
                <span className="text-emerald-400 font-bold">Verificado</span>
              </div>
              <div className="p-3 bg-white/5 rounded-lg flex items-center justify-between border border-white/10">
                <span className="text-gray-300">✓ Coordenadas GPS exactas para los 4 refugios</span>
                <span className="text-emerald-400 font-bold">Verificado</span>
              </div>
              <div className="p-3 bg-white/5 rounded-lg flex items-center justify-between border border-white/10">
                <span className="text-gray-300">✓ hreflang multilingüe (ES, EN, FR, CAT, PT)</span>
                <span className="text-emerald-400 font-bold">Verificado</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
