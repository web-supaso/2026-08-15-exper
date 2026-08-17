import React, { useState, useMemo } from 'react';
import { Language, BookingLead } from '../types';
import { refugesData } from '../data/refuges';
import { translations } from '../data/translations';
import {
  X,
  Sparkles,
  Calendar,
  Zap,
  Clock,
  User,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  Minus,
  Plus,
  MessageSquare,
} from 'lucide-react';

interface BookingModalProps {
  initialRefugeId?: string;
  currentLang: Language;
  onClose: () => void;
}

// Date formatting helpers
const formatDateToISO = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getTodayString = () => formatDateToISO(new Date());

const getNextDayString = (dateStr?: string) => {
  const base = dateStr ? new Date(dateStr + 'T00:00:00') : new Date();
  base.setDate(base.getDate() + 1);
  return formatDateToISO(base);
};

export const BookingModal: React.FC<BookingModalProps> = ({
  initialRefugeId,
  currentLang,
  onClose,
}) => {
  const t = translations?.[currentLang] || translations?.es;

  // Dynamic Today and Tomorrow
  const todayStr = useMemo(() => getTodayString(), []);
  const tomorrowStr = useMemo(() => getNextDayString(), []);

  // Selected refuge
  const [selectedRefugeId, setSelectedRefugeId] = useState<string>(() => {
    if (initialRefugeId) return initialRefugeId;
    if (Array.isArray(refugesData) && refugesData.length > 0) {
      return refugesData[0]?.id || 'refugi-canigo';
    }
    return 'refugi-canigo';
  });

  const currentRefuge = useMemo(() => {
    return refugesData.find((r) => r.id === selectedRefugeId) || refugesData[0];
  }, [selectedRefugeId]);

  // Form states with dynamic today/tomorrow
  const [checkIn, setCheckIn] = useState(() => todayStr);
  const [checkOut, setCheckOut] = useState(() => tomorrowStr);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleCheckInChange = (newCheckIn: string) => {
    setCheckIn(newCheckIn);
    // If checkout is before or equal to the new check-in, push it to check-in + 1 day
    if (!checkOut || checkOut <= newCheckIn) {
      setCheckOut(getNextDayString(newCheckIn));
    }
  };

  // Guest counters
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [babies, setBabies] = useState(0);

  // Additional options
  const [specialOccasion, setSpecialOccasion] = useState('');
  const [pets, setPets] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const [notes, setNotes] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  // Submit states
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Calculate nights
  const nightsCount = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }, [checkIn, checkOut]);

  const totalPersons = adults + childrenCount;
  const maxCapacity = currentRefuge?.maxGuests || 4;

  const handleAdultsChange = (delta: number) => {
    const next = adults + delta;
    if (next >= 1 && next + childrenCount <= maxCapacity) {
      setAdults(next);
    }
  };

  const handleChildrenChange = (delta: number) => {
    const next = childrenCount + delta;
    if (next >= 0 && adults + next <= maxCapacity) {
      setChildrenCount(next);
    }
  };

  const handleBabiesChange = (delta: number) => {
    const next = babies + delta;
    if (next >= 0 && next <= 2) {
      setBabies(next);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAccepted) return;

    setSubmitting(true);

    const guestName = `${firstName} ${lastName}`.trim() || 'Huésped Interesado';
    const crmPropertyId =
      selectedRefugeId === 'refugio-obsidiana'
        ? 'bbbb0003-0000-0000-0000-000000000003'
        : selectedRefugeId === 'falesia-atlantica'
        ? 'bbbb0004-0000-0000-0000-000000000004'
        : selectedRefugeId === 'nido-estrecho' || selectedRefugeId === 'el-nido-del-estrecho'
        ? 'bbbb0002-0000-0000-0000-000000000002'
        : 'bbbb0001-0000-0000-0000-000000000001';

    const specialReqs = [
      specialOccasion ? `Ocasión especial: ${specialOccasion}` : '',
      vegetarian ? 'Opción vegetariana: Sí' : '',
      `Desglose: ${adults} adultos, ${childrenCount} niños, ${babies} bebés`,
      notes ? `Mensaje: ${notes}` : '',
    ]
      .filter(Boolean)
      .join(' | ');

    const leadData: BookingLead = {
      fullName: guestName,
      email,
      phone,
      preferredRefuge: selectedRefugeId,
      checkIn,
      checkOut,
      guests: totalPersons,
      travelStyle: specialOccasion || 'Desconexión & Silencio',
      pets,
      notes: specialReqs,
      language: currentLang,
      createdAt: new Date().toISOString(),
    };

    // 1. Direct Supabase CRM Sync (populates https://hotel-crm-five-gold.vercel.app/leads)
    try {
      await fetch('https://rzwqpxkehhpmekksninp.supabase.co/rest/v1/leads', {
        method: 'POST',
        headers: {
          apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6d3FweGtlaGhwbWVra3NuaW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1NTMyMzksImV4cCI6MjEwMjEyOTIzOX0.uZnwk8DYYyi8LSzP96iZoqf9kuJa4gV3KF6dWak-M8c',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6d3FweGtlaGhwbWVra3NuaW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1NTMyMzksImV4cCI6MjEwMjEyOTIzOX0.uZnwk8DYYyi8LSzP96iZoqf9kuJa4gV3KF6dWak-M8c',
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          organization_id: '22222222-0000-0000-0000-000000000002',
          property_id: crmPropertyId,
          guest_name: guestName,
          guest_email: email,
          guest_phone: phone,
          requested_check_in: checkIn,
          requested_check_out: checkOut,
          guests_count: totalPersons,
          pets_count: pets ? 1 : 0,
          dietary_notes: vegetarian ? 'Opción vegetariana: Sí' : 'Dieta estándar',
          special_requests: specialReqs,
          status: 'nuevo',
          source: 'web_form',
        }),
      });
      console.log('[CRM] Lead sincronizado exitosamente con el CRM.');
    } catch (crmErr) {
      console.warn('[CRM] Warning en sincronización directa:', crmErr);
    }

    // 2. Backup Local y API local
    try {
      const savedLeads = JSON.parse(localStorage.getItem('experiencias_leads') || '[]');
      savedLeads.unshift(leadData);
      localStorage.setItem('experiencias_leads', JSON.stringify(savedLeads));

      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
    } catch {
      // Local backup complete
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#0e1713] text-[#e8ece9] rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-[#c5a059]/40 shadow-2xl relative p-5 sm:p-8 scrollbar-thin">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white rounded-full transition-colors cursor-pointer z-10"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#d8a84e] mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#d8a84e]" />
                <span>ATENCIÓN SÍNCRONA CONCIERGE</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Reserva tu experiencia
              </h2>
              <p className="text-xs text-gray-400 font-light mt-0.5">
                Plazas limitadas.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Box: Selección Síncrona de Fechas */}
              <div className="p-4 rounded-2xl bg-[#14201a] border border-[#2d4234] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#d8a84e] font-bold text-[11px] uppercase tracking-wider">
                    <Calendar className="w-4 h-4 text-[#d8a84e]" />
                    <span>SELECCIÓN SÍNCRONA DE FECHAS</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#3d2f14] text-[#e5b355] text-[10px] font-bold tracking-wider uppercase">
                    <Zap className="w-3 h-3 text-[#e5b355] fill-[#e5b355]" />
                    <span>SUJETO A DISPONIBILIDAD</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-300 mb-1">
                      Check-in (Entrada)
                    </label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={checkIn}
                      onChange={(e) => handleCheckInChange(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#0e1713] border border-[#2d4234] text-white focus:outline-none focus:border-[#d8a84e] text-xs [color-scheme:dark] cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-300 mb-1">
                      Check-out (Salida)
                    </label>
                    <input
                      type="date"
                      required
                      min={checkIn ? getNextDayString(checkIn) : tomorrowStr}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#0e1713] border border-[#2d4234] text-white focus:outline-none focus:border-[#d8a84e] text-xs [color-scheme:dark] cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-[#d8a84e] font-medium pt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {nightsCount > 0
                      ? `${nightsCount} ${nightsCount === 1 ? 'noche seleccionada' : 'noches seleccionadas'}`
                      : 'Selecciona fechas válidas'}
                  </span>
                </div>
              </div>

              {/* Refuge Selector (Dropdown) */}
              <div>
                <label className="block text-gray-300 font-medium mb-1">
                  Santuario / Refugio *
                </label>
                <select
                  value={selectedRefugeId}
                  onChange={(e) => setSelectedRefugeId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14201a] border border-[#2d4234] text-white focus:outline-none focus:border-[#d8a84e] text-xs cursor-pointer"
                >
                  {refugesData.map((r) => (
                    <option key={r.id} value={r.id} className="bg-[#0e1713] text-white">
                      {r.name} ({r.region}) — Desde {r.priceFromPerNight}€/noche
                    </option>
                  ))}
                </select>
              </div>

              {/* Names (2 cols) */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Nombres *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Ej. Sofía"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#14201a] border border-[#2d4234] text-white placeholder-gray-500 focus:outline-none focus:border-[#d8a84e]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Apellidos *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Ej. Martínez"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#14201a] border border-[#2d4234] text-white placeholder-gray-500 focus:outline-none focus:border-[#d8a84e]"
                    />
                  </div>
                </div>
              </div>

              {/* Email & Phone (2 cols) */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Correo electrónico *
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sofia@ejemplo.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#14201a] border border-[#2d4234] text-white placeholder-gray-500 focus:outline-none focus:border-[#d8a84e]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Teléfono *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+34 600 000 000"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#14201a] border border-[#2d4234] text-white placeholder-gray-500 focus:outline-none focus:border-[#d8a84e]"
                    />
                  </div>
                </div>
              </div>

              {/* Guests Card + Special Occasion (2 cols) */}
              <div className="grid sm:grid-cols-2 gap-3 items-start">
                {/* Huéspedes */}
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Huéspedes
                  </label>
                  <div className="p-3.5 rounded-xl bg-[#14201a] border border-[#2d4234] space-y-2.5">
                    {/* Adultos */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white text-xs">Adultos</div>
                        <div className="text-[10px] text-gray-400">13+ AÑOS</div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleAdultsChange(-1)}
                          disabled={adults <= 1}
                          className="w-7 h-7 rounded-lg bg-[#243328] hover:bg-[#2d4234] disabled:opacity-30 text-white flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-4 text-center font-bold text-white text-sm">
                          {adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAdultsChange(1)}
                          disabled={totalPersons >= maxCapacity}
                          className="w-7 h-7 rounded-lg bg-[#243328] hover:bg-[#2d4234] disabled:opacity-30 text-white flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Niños */}
                    <div className="flex items-center justify-between pt-1 border-t border-white/5">
                      <div>
                        <div className="font-semibold text-white text-xs">Niños</div>
                        <div className="text-[10px] text-gray-400">3-12 AÑOS</div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleChildrenChange(-1)}
                          disabled={childrenCount <= 0}
                          className="w-7 h-7 rounded-lg bg-[#243328] hover:bg-[#2d4234] disabled:opacity-30 text-white flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-4 text-center font-bold text-white text-sm">
                          {childrenCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleChildrenChange(1)}
                          disabled={totalPersons >= maxCapacity}
                          className="w-7 h-7 rounded-lg bg-[#243328] hover:bg-[#2d4234] disabled:opacity-30 text-white flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Bebés */}
                    <div className="flex items-center justify-between pt-1 border-t border-white/5">
                      <div>
                        <div className="font-semibold text-white text-xs">Bebés</div>
                        <div className="text-[10px] text-gray-400">0-2 AÑOS</div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleBabiesChange(-1)}
                          disabled={babies <= 0}
                          className="w-7 h-7 rounded-lg bg-[#243328] hover:bg-[#2d4234] disabled:opacity-30 text-white flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-4 text-center font-bold text-white text-sm">
                          {babies}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleBabiesChange(1)}
                          disabled={babies >= 2}
                          className="w-7 h-7 rounded-lg bg-[#243328] hover:bg-[#2d4234] disabled:opacity-30 text-white flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 text-center font-bold text-[10px] text-[#d8a84e] tracking-wider uppercase">
                      TOTAL: {totalPersons} {totalPersons === 1 ? 'PERSONA' : 'PERSONAS'} / {maxCapacity}
                    </div>
                  </div>
                </div>

                {/* Ocasión Especial */}
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Ocasión especial (opcional)
                  </label>
                  <div className="relative">
                    <Sparkles className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-3" />
                    <textarea
                      rows={4}
                      value={specialOccasion}
                      onChange={(e) => setSpecialOccasion(e.target.value)}
                      placeholder="Aniversario, sorpresa..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#14201a] border border-[#2d4234] text-white placeholder-gray-500 focus:outline-none focus:border-[#d8a84e] text-xs resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Toggles: Mascota & Vegetariano (2 cols) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#14201a] border border-[#2d4234]">
                  <span className="text-gray-300 text-[11px] font-medium">¿Viajas con mascota?</span>
                  <button
                    type="button"
                    onClick={() => setPets(!pets)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      pets ? 'bg-[#d8a84e] text-black shadow-md' : 'bg-[#243328] text-gray-300'
                    }`}
                  >
                    {pets ? 'Sí' : 'No'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#14201a] border border-[#2d4234]">
                  <span className="text-gray-300 text-[11px] font-medium">¿Opción vegetariana?</span>
                  <button
                    type="button"
                    onClick={() => setVegetarian(!vegetarian)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      vegetarian ? 'bg-[#d8a84e] text-black shadow-md' : 'bg-[#243328] text-gray-300'
                    }`}
                  >
                    {vegetarian ? 'Sí' : 'No'}
                  </button>
                </div>
              </div>

              {/* Mensaje adicional */}
              <div>
                <label className="block text-gray-300 font-medium mb-1">
                  Mensaje adicional
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Comentarios adicionales..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14201a] border border-[#2d4234] text-white placeholder-gray-500 focus:outline-none focus:border-[#d8a84e] text-xs resize-none"
                />
              </div>

              {/* Checkbox Privacidad */}
              <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  required
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-[#2d4234] bg-[#14201a] text-[#d8a84e] focus:ring-0 cursor-pointer accent-[#d8a84e]"
                />
                <span className="text-[11px] text-gray-400 leading-snug">
                  Acepto la política de privacidad y el tratamiento de mis datos. *
                </span>
              </label>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={submitting || !privacyAccepted}
                className="w-full py-4 rounded-xl font-bold uppercase tracking-wider text-black bg-[#e5a93c] hover:bg-[#f0b952] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#e5a93c]/20 mt-3 text-xs disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'PROCESANDO SOLICITUD...' : 'ENVIAR SOLICITUD'}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-5 sm:py-7 space-y-4 animate-fadeIn">
            {/* Top Golden Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#3d2f14] border border-[#d8a84e]/60 text-[#e5b355] text-[10px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#e5b355]" />
              <span>SOLICITUD EN ATENCIÓN DIRECTA</span>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-[#d8a84e]/15 text-[#d8a84e] flex items-center justify-center mx-auto border border-[#d8a84e]/50 shadow-xl shadow-[#d8a84e]/10">
              <CheckCircle2 className="w-8 h-8 text-[#d8a84e]" />
            </div>

            <div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1.5">
                ¡Solicitud Recibida con Éxito!
              </h3>
              <p className="text-xs text-gray-300 font-light max-w-md mx-auto leading-relaxed">
                Gracias, <strong className="text-white font-semibold">{firstName || 'Huésped'}</strong>. Tu solicitud para <strong className="text-[#e5c07b] font-semibold">{currentRefuge?.name}</strong> está en manos de nuestro equipo de Concierge.
              </p>
            </div>

            {/* 3-Step Timeline Cards */}
            <div className="text-left bg-[#14201a] border border-[#2d4234] rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#1b4332] text-[#d8f3dc] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border border-[#d8f3dc]/30">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">1. Acuse de recibo y ficha enviada</h4>
                  <p className="text-[11px] text-gray-400 font-light">
                    Estancia registrada del <span className="text-[#e5c07b] font-medium">{checkIn} al {checkOut}</span> ({nightsCount} {nightsCount === 1 ? 'noche' : 'noches'}).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#3d2f14] text-[#e5b355] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border border-[#d8a84e]/40">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">2. Verificación de aforo y privacidad</h4>
                  <p className="text-[11px] text-gray-400 font-light">
                    Comprobamos la disponibilidad para {totalPersons} personas y tus preferencias especiales de estancia.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#243328] text-gray-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border border-white/10">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">3. Contacto prioritario garantizado</h4>
                  <p className="text-[11px] text-gray-400 font-light">
                    Te responderemos en un plazo máximo de <strong className="text-white">4 horas hábiles</strong> con la confirmación final.
                  </p>
                </div>
              </div>
            </div>

            {/* Immediate Attention Callout & Buttons */}
            <div className="pt-2 space-y-2.5">
              <a
                href={`https://wa.me/5493541664488?text=${encodeURIComponent(
                  `Hola, acabo de enviar mi solicitud para ${currentRefuge?.name} a nombre de ${firstName} ${lastName} (${checkIn} al ${checkOut}). Me gustaría coordinar los detalles con el Concierge.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl font-bold uppercase tracking-wider text-black bg-[#25D366] hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#25D366]/20 text-xs"
              >
                <MessageSquare className="w-4 h-4 fill-black text-black" />
                <span>¿Deseas atención prioritaria? Chatear por WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl font-medium text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              >
                Volver y continuar explorando
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
