import { useState, useEffect } from 'react';
import { LangProvider } from './core/LangContext';
import HeroSection from './components/HeroSection';
import ExperienceGrid from './components/ExperienceGrid';
import GallerySection from './components/GallerySection';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import DigitalDetoxQuizModal from './components/DigitalDetoxQuizModal';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handlePath = () => {
      setIsAdmin(window.location.pathname.startsWith('/admin'));
    };
    handlePath();
    window.addEventListener('popstate', handlePath);
    return () => window.removeEventListener('popstate', handlePath);
  }, []);

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <LangProvider>
      {/* Botón flotante de WhatsApp (derecha) */}
      <WhatsAppButton />

      {/* Botón flotante de Diagnóstico de Desconexión (izquierda) */}
      <DigitalDetoxQuizModal />

      {/* Estructura semántica de la landing */}
      <div className="min-h-screen">
        <HeroSection />
        <ExperienceGrid />
        <GallerySection />
        <BookingForm />
        <Footer />
      </div>
    </LangProvider>
  );
}
