import React, { useState } from 'react';
import { Language, BookingLead } from '../types';
import { refugesData } from '../data/refuges';
import { translations } from '../data/translations';
import { X, Calendar, CheckCircle2, ShieldCheck, Send, Sparkles, User, Mail, Phone, Heart } from 'lucide-react';

interface BookingModalProps {
  initialRefugeId?: string;
  currentLang: Language;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  initialRefugeId,
  currentLang,
  onClose,
}) => {
  const [selectedRefuge, setSelectedRefuge] = useState(
    initialRefugeId || refugesData[0].id
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [travelStyle, setTravelStyle] = useState('Desconexión & Silencio');
  const [pets, setPets] = useState(false);
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const t = translations[currentLang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const leadData: BookingLead = {
      fullName,
      email,
      phone,
      preferredRefuge: selectedRefuge,
      checkIn,
      checkOut,
      guests,
      travelStyle,
      pets,
      notes,
      language: currentLang,
      createdAt: new Date().toISOString(),
    };

    try {
      // Post lead data to Express backend endpoint for Google Sheets CRM sync simulation
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
    } catch (err) {
      console.log('Backend sync simulation completed');
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#121a16] text-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-[#c5a059]/40 shadow-2xl relative p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#e5c07b] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.bookingModal.conciergeBadge}</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold">
                {t.bookingModal.title}
              </h2>
              <p className="text-xs text-gray-300 font-light mt-1">
                {t.bookingModal.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Refuge Selector */}
              <div>
                <label className="block text-gray-300 font-medium mb-1.5">
                  {t.bookingModal.fieldRefuge}
                </label>
                <select
                  value={selectedRefuge}
                  onChange={(e) => setSelectedRefuge(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#1c2a23] border border-[#c5a059]/30 text-white focus:outline-none focus:border-[#c5a059]"
                >
                  {refugesData.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.region}) — {t.refugesSection.from} {r.priceFromPerNight}€/{t.refugesSection.perNight}
                    </option>
                  ))}
                </select>
              </div>

              {/* Personal Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-1.5">
                    {t.bookingModal.fieldName} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Sofia Martínez"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#1c2a23] border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1.5">
                    {t.bookingModal.fieldEmail} *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sofia@ejemplo.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#1c2a23] border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-1.5">
                    {t.bookingModal.fieldPhone} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+34 600 000 000"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#1c2a23] border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1.5">
                    {t.bookingModal.fieldGuests}
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1c2a23] border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  >
                    {t.bookingModal.guestOptions.map((opt) => (
                      <option key={opt.val} value={opt.val}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dates */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-1.5">
                    {t.bookingModal.entryDateLabel}
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#1c2a23] border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1.5">
                    {t.bookingModal.exitDateLabel}
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#1c2a23] border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              {/* Pets & Travel Style */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#1c2a23] border border-white/10">
                <span className="text-gray-300">{t.bookingModal.fieldPets}</span>
                <button
                  type="button"
                  onClick={() => setPets(!pets)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    pets ? 'bg-[#c5a059] text-white' : 'bg-white/10 text-gray-400'
                  }`}
                >
                  {pets ? t.bookingModal.petOptionYes : t.bookingModal.petOptionNo}
                </button>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-gray-300 font-medium mb-1.5">
                  {t.bookingModal.fieldNotes}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.bookingModal.notesPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1c2a23] border border-white/10 text-white focus:outline-none focus:border-[#c5a059]"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl font-bold uppercase tracking-wider text-white gold-gradient-bg hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? t.bookingModal.submitting : t.bookingModal.submit}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-white">
              {t.bookingModal.successTitle}
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-light max-w-md mx-auto">
              {t.bookingModal.successMessage}
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              {t.bookingModal.backBtn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
