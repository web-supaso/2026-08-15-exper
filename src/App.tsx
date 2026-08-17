import React, { useState, useEffect } from 'react';
import { Language, Refuge } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { RefugesGrid } from './components/RefugesGrid';
import { RefugeDetailModal } from './components/RefugeDetailModal';
import { ExperienceQuiz } from './components/ExperienceQuiz';
import { PactSection } from './components/PactSection';
import { FaqSection } from './components/FaqSection';
import { LocalPartners } from './components/LocalPartners';
import { SeoInspectorModal } from './components/SeoInspectorModal';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { FloatingTestButton } from './components/FloatingTestButton';
import { SaturationTestModal } from './components/SaturationTestModal';
import { ModalErrorBoundary } from './components/ModalErrorBoundary';
import { refugesData } from './data/refuges';
import { faqItems } from './data/faq';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('es');
  const [selectedRefugeModal, setSelectedRefugeModal] = useState<Refuge | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingRefugeId, setBookingRefugeId] = useState<string | undefined>(undefined);
  const [seoInspectorOpen, setSeoInspectorOpen] = useState(false);
  const [saturationTestOpen, setSaturationTestOpen] = useState(false);

  // Dynamically inject Schema.org JSON-LD structured data into the document head for live SEO
  useEffect(() => {
    const existingScript = document.getElementById('json-ld-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';

    const schemaGraph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://experienciasconestilo.com/#organization",
          "name": "Experiencias con Estilo",
          "url": "https://experienciasconestilo.com",
          "description": "Alojamientos de lujo y naturaleza en Europa. Refugi del Canigó, Refugio de Obsidiana, Falesia Atlántica y El Nido del Estrecho.",
          "email": "hola@experienciasconestilo.com"
        },
        {
          "@type": "LodgingBusiness",
          "name": "Experiencias con Estilo Sanctuaries",
          "url": "https://experienciasconestilo.com",
          "priceRange": "280€ - 480€"
        },
        {
          "@type": "FAQPage",
          "mainEntity": (faqItems || []).map((f) => ({
            "@type": "Question",
            "name": f?.question?.[currentLang] || f?.question?.es || "",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f?.answer?.[currentLang] || f?.answer?.es || ""
            }
          }))
        }
      ]
    };

    script.text = JSON.stringify(schemaGraph);
    document.head.appendChild(script);

    // Update html lang attribute
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // Listen for hash or path in URL on load / change to open refuge modal or scroll
  useEffect(() => {
    const syncHashWithState = () => {
      const rawHash = window.location.hash.replace('#', '').toLowerCase();
      const rawPath = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
      const target = rawHash || rawPath;

      if (target) {
        const found = refugesData.find(
          (r) =>
            r.slug.toLowerCase() === target ||
            r.id.toLowerCase() === target ||
            target.includes(r.id.replace('refugi-', '').replace('refugio-', '')) ||
            target.includes('canigo') && r.id === 'refugi-canigo'
        );
        if (found) {
          setSelectedRefugeModal(found);
        }
      }
    };

    syncHashWithState();
    window.addEventListener('hashchange', syncHashWithState);
    return () => window.removeEventListener('hashchange', syncHashWithState);
  }, []);

  const handleOpenBooking = (refugeId?: string) => {
    if (refugeId) {
      const found = refugesData.find((r) => r.id === refugeId);
      if (found) {
        window.history.pushState(null, '', `#${found.slug}`);
      }
    }
    setBookingRefugeId(refugeId);
    setBookingModalOpen(true);
  };

  const handleSelectRefuge = (refuge: Refuge) => {
    window.history.pushState(null, '', `#${refuge.slug}`);
    setSelectedRefugeModal(refuge);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c2a23] font-sans antialiased selection:bg-[#c5a059] selection:text-white">
      {/* Navigation Header */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenBooking={handleOpenBooking}
        onOpenSeoInspector={() => setSeoInspectorOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          currentLang={currentLang}
          onExploreClick={() => {
            const element = document.getElementById('refugios');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
          onBookClick={() => handleOpenBooking()}
        />

        {/* Brand Manifesto & Anti-Mass Tourism */}
        <Manifesto currentLang={currentLang} />

        {/* Interactive Experience Recommender Quiz */}
        <div id="quiz">
          <ExperienceQuiz
            currentLang={currentLang}
            onSelectRefuge={(refuge) => handleSelectRefuge(refuge)}
          />
        </div>

        {/* 4 Refuges Collection Grid */}
        <RefugesGrid
          currentLang={currentLang}
          onSelectRefuge={(refuge) => handleSelectRefuge(refuge)}
          onBookRefuge={(refugeId) => handleOpenBooking(refugeId)}
        />

        {/* Pact of Respect & Rules */}
        <PactSection currentLang={currentLang} />

        {/* FAQ Section for AI Search Engine Citation */}
        <FaqSection currentLang={currentLang} />

        {/* Local Alliances & Km 0 Producers */}
        <LocalPartners currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenSeoInspector={() => setSeoInspectorOpen(true)}
      />

      {/* Global Floating Components */}
      <CookieBanner currentLang={currentLang} />
      <FloatingTestButton currentLang={currentLang} onOpenTest={() => setSaturationTestOpen(true)} />

      {/* Digital Saturation Test Modal */}
      {saturationTestOpen && (
        <ModalErrorBoundary onClose={() => setSaturationTestOpen(false)} title="Diagnóstico de Saturación Digital">
          <SaturationTestModal
            currentLang={currentLang}
            onClose={() => setSaturationTestOpen(false)}
            onSelectRefuge={(refuge) => handleSelectRefuge(refuge)}
            onBookNow={(refugeId) => {
              setSaturationTestOpen(false);
              handleOpenBooking(refugeId);
            }}
          />
        </ModalErrorBoundary>
      )}

      {/* Refuge Detail Drawer Modal */}
      {selectedRefugeModal && (
        <ModalErrorBoundary
          onClose={() => {
            setSelectedRefugeModal(null);
            window.history.pushState(null, '', window.location.pathname);
          }}
          title={selectedRefugeModal?.name}
        >
          <RefugeDetailModal
            refuge={selectedRefugeModal}
            currentLang={currentLang}
            onClose={() => {
              setSelectedRefugeModal(null);
              window.history.pushState(null, '', window.location.pathname);
            }}
            onBookNow={(refugeId) => handleOpenBooking(refugeId)}
          />
        </ModalErrorBoundary>
      )}

      {/* Concierge Booking Lead Modal */}
      {bookingModalOpen && (
        <ModalErrorBoundary onClose={() => setBookingModalOpen(false)} title="Solicitud Directa a Concierge">
          <BookingModal
            initialRefugeId={bookingRefugeId}
            currentLang={currentLang}
            onClose={() => setBookingModalOpen(false)}
          />
        </ModalErrorBoundary>
      )}

      {/* SEO & AI Technical Inspector Modal */}
      {seoInspectorOpen && (
        <ModalErrorBoundary onClose={() => setSeoInspectorOpen(false)} title="Inspector de SEO & Datos Estructurados">
          <SeoInspectorModal
            currentLang={currentLang}
            onClose={() => setSeoInspectorOpen(false)}
          />
        </ModalErrorBoundary>
      )}
    </div>
  );
}
