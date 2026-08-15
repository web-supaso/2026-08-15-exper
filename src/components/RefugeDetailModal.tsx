import React, { useState } from 'react';
import { Language, Refuge } from '../types';
import { translations } from '../data/translations';
import { X, MapPin, Sparkles, Calendar, Users, ShieldCheck, Check, Dog, Zap, Droplets, Flame, Coffee, WifiOff, Moon, UserCheck, Compass, Waves, Utensils, Sun, Wind, Binoculars, Shield, Key } from 'lucide-react';

interface RefugeDetailModalProps {
  refuge: Refuge | null;
  currentLang: Language;
  onClose: () => void;
  onBookNow: (refugeId: string) => void;
}

export const RefugeDetailModal: React.FC<RefugeDetailModalProps> = ({
  refuge,
  currentLang,
  onClose,
  onBookNow,
}) => {
  if (!refuge) return null;

  const [activeImage, setActiveImage] = useState(refuge.heroImage);
  const t = translations[currentLang];

  const renderAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5 text-[#c5a059]" />;
      case 'Droplets': return <Droplets className="w-5 h-5 text-[#c5a059]" />;
      case 'Dog': return <Dog className="w-5 h-5 text-[#c5a059]" />;
      case 'Flame': return <Flame className="w-5 h-5 text-[#c5a059]" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-[#c5a059]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#c5a059]" />;
      case 'WifiOff': return <WifiOff className="w-5 h-5 text-[#c5a059]" />;
      case 'Moon': return <Moon className="w-5 h-5 text-[#c5a059]" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-[#c5a059]" />;
      case 'Compass': return <Compass className="w-5 h-5 text-[#c5a059]" />;
      case 'Waves': return <Waves className="w-5 h-5 text-[#c5a059]" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-[#c5a059]" />;
      case 'Sun': return <Sun className="w-5 h-5 text-[#c5a059]" />;
      case 'Wind': return <Wind className="w-5 h-5 text-[#c5a059]" />;
      case 'Binoculars': return <Binoculars className="w-5 h-5 text-[#c5a059]" />;
      case 'Shield': return <Shield className="w-5 h-5 text-[#c5a059]" />;
      case 'Key': return <Key className="w-5 h-5 text-[#c5a059]" />;
      default: return <Sparkles className="w-5 h-5 text-[#c5a059]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-white text-[#1c2a23] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-[#c5a059]/30">
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 z-20 ml-auto mr-4 p-2.5 bg-black/70 hover:bg-black text-white rounded-full transition-colors flex items-center justify-center"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Gallery Header */}
        <div className="relative -mt-12 h-80 sm:h-96 w-full bg-black">
          <img
            src={activeImage}
            alt={refuge.name}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          {/* Title and location inside image */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-xs font-bold uppercase tracking-widest text-[#e5c07b] block mb-1">
              {refuge.location} • {refuge.region}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold mb-2">
              {refuge.name}
            </h2>
            <p className="text-sm text-gray-200 font-light">
              {refuge.specialFeature[currentLang]}
            </p>
          </div>
        </div>

        {/* Thumbnail Selector */}
        <div className="flex gap-2 p-4 bg-[#121a16] overflow-x-auto border-b border-gray-800">
          {refuge.gallery.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(imgUrl)}
              className={`w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                activeImage === imgUrl ? 'border-[#c5a059] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Main Description */}
          <div>
            <h3 className="font-serif-luxury text-2xl font-bold mb-3 text-[#1c2a23]">
              {t.refugeModal.conceptTitle}
            </h3>
            <p className="text-gray-700 leading-relaxed font-light text-base sm:text-lg">
              {refuge.longDescription[currentLang]}
            </p>
          </div>

          {/* Key Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#faf8f5] p-5 rounded-2xl border border-gray-200 text-center">
            <div>
              <span className="text-[11px] text-gray-500 uppercase block font-medium">{t.refugeModal.maxGuestsLabel}</span>
              <span className="font-serif-luxury text-lg font-bold text-[#1c2a23]">
                {refuge.maxGuests} {t.refugeModal.guestsUnit}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-gray-500 uppercase block font-medium">{t.refugeModal.accessLabel}</span>
              <span className="font-serif-luxury text-lg font-bold text-[#1c2a23]">
                {refuge.footAccessOnly ? t.refugeModal.footAccess : t.refugeModal.carAccess}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-gray-500 uppercase block font-medium">{t.refugeModal.petsLabel}</span>
              <span className="font-serif-luxury text-lg font-bold text-[#1c2a23]">
                {refuge.petFriendly ? t.refugeModal.petsAllowed : t.refugeModal.petsNotAllowed}
              </span>
            </div>

            <div>
              <span className="text-[11px] text-gray-500 uppercase block font-medium">{t.refugeModal.nightRateLabel}</span>
              <span className="font-serif-luxury text-lg font-bold text-[#c5a059]">
                {t.refugesSection.from} {refuge.priceFromPerNight} {refuge.currency}
              </span>
            </div>
          </div>

          {/* Amenities Grid */}
          <div>
            <h4 className="font-serif-luxury text-xl font-bold mb-4 text-[#1c2a23]">
              {t.refugeModal.amenitiesTitle}
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              {refuge.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {renderAmenityIcon(amenity.icon)}
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {amenity.label[currentLang]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights List */}
          <div>
            <h4 className="font-serif-luxury text-xl font-bold mb-3 text-[#1c2a23]">
              {t.refugeModal.highlightsTitle}
            </h4>
            <div className="space-y-2">
              {refuge.highlights[currentLang].map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA Bar */}
          <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-gray-500 block font-medium uppercase">
                {t.refugesSection.from}
              </span>
              <span className="font-serif-luxury text-3xl font-extrabold text-[#1c2a23]">
                {refuge.priceFromPerNight} {refuge.currency}
              </span>
              <span className="text-xs text-gray-500"> / {t.refugesSection.perNight}</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookNow(refuge.id);
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase text-white gold-gradient-bg hover:opacity-90 shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.refugeModal.bookConciergeBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
