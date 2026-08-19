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

const modalI18n: Record<Language, {
  badge: string;
  title: string;
  subtitle: string;
  dateSelection: string;
  subjectAvailability: string;
  checkIn: string;
  checkOut: string;
  nightsCount: (n: number) => string;
  selectDates: string;
  sanctuaryLabel: string;
  fromPerNight: (price: number) => string;
  firstName: string;
  firstNamePlaceholder: string;
  lastName: string;
  lastNamePlaceholder: string;
  email: string;
  phone: string;
  guests: string;
  adults: string;
  adultsAge: string;
  children: string;
  childrenAge: string;
  babies: string;
  babiesAge: string;
  totalGuests: (total: number, max: number) => string;
  specialOccasion: string;
  specialOccasionPlaceholder: string;
  pets: string;
  vegetarian: string;
  yes: string;
  no: string;
  notes: string;
  notesPlaceholder: string;
  privacy: string;
  privacyError: string;
  submit: string;
  submitting: string;
  successBadge: string;
  successTitle: string;
  successDesc: (name: string, sanctuary: string) => string;
  step1Title: string;
  step1Desc: (inDate: string, outDate: string, nights: number) => string;
  step2Title: string;
  step2Desc: (guests: number) => string;
  step3Title: string;
  step3Desc: string;
  whatsappBtn: string;
  backBtn: string;
}> = {
  es: {
    badge: "ATENCIÓN SÍNCRONA CONCIERGE",
    title: "Reserva tu experiencia",
    subtitle: "Plazas limitadas por santuario.",
    dateSelection: "SELECCIÓN SÍNCRONA DE FECHAS",
    subjectAvailability: "SUJETO A DISPONIBILIDAD",
    checkIn: "Check-in (Entrada)",
    checkOut: "Check-out (Salida)",
    nightsCount: (n) => `${n} ${n === 1 ? 'noche seleccionada' : 'noches seleccionadas'}`,
    selectDates: "Selecciona fechas válidas",
    sanctuaryLabel: "Santuario / Refugio *",
    fromPerNight: (price) => `Desde ${price}€/noche`,
    firstName: "Nombre *",
    firstNamePlaceholder: "Ej. Sofía",
    lastName: "Apellidos *",
    lastNamePlaceholder: "Ej. Martínez",
    email: "Correo electrónico *",
    phone: "Teléfono / WhatsApp *",
    guests: "Huéspedes",
    adults: "Adultos",
    adultsAge: "13+ AÑOS",
    children: "Niños",
    childrenAge: "3-12 AÑOS",
    babies: "Bebés",
    babiesAge: "0-2 AÑOS",
    totalGuests: (t, m) => `TOTAL: ${t} ${t === 1 ? 'PERSONA' : 'PERSONAS'} / ${m} MÁX`,
    specialOccasion: "Ocasión especial (opcional)",
    specialOccasionPlaceholder: "Aniversario, sorpresa, retiro...",
    pets: "¿Viajas con mascota?",
    vegetarian: "¿Opción vegetariana?",
    yes: "Sí",
    no: "No",
    notes: "Peticiones especiales o comentarios",
    notesPlaceholder: "Comentarios sobre alergias, preferencias especiales...",
    privacy: "Acepto la política de privacidad y el tratamiento de mis datos. *",
    privacyError: "⚠️ Por favor, marca esta casilla para enviar tu solicitud Concierge.",
    submit: "ENVIAR SOLICITUD",
    submitting: "PROCESANDO SOLICITUD...",
    successBadge: "SOLICITUD EN ATENCIÓN DIRECTA",
    successTitle: "¡Solicitud Recibida con Éxito!",
    successDesc: (name, s) => `Gracias, ${name}. Tu solicitud para ${s} está en manos de nuestro equipo de Concierge.`,
    step1Title: "1. Acuse de recibo y ficha enviada",
    step1Desc: (inD, outD, n) => `Estancia registrada del ${inD} al ${outD} (${n} ${n === 1 ? 'noche' : 'noches'}).`,
    step2Title: "2. Verificación de aforo y privacidad",
    step2Desc: (g) => `Comprobamos la disponibilidad para ${g} ${g === 1 ? 'persona' : 'personas'} y tus preferencias de estancia.`,
    step3Title: "3. Contacto prioritario garantizado",
    step3Desc: "Te responderemos en un plazo máximo de 4 horas hábiles con la confirmación final.",
    whatsappBtn: "¿Deseas atención prioritaria? Chatear por WhatsApp",
    backBtn: "Volver y continuar explorando",
  },
  en: {
    badge: "CONCIERGE SYNCHRONOUS DESK",
    title: "Reserve your experience",
    subtitle: "Strictly limited capacity per sanctuary.",
    dateSelection: "SYNCHRONOUS DATE SELECTION",
    subjectAvailability: "SUBJECT TO AVAILABILITY",
    checkIn: "Check-in Date",
    checkOut: "Check-out Date",
    nightsCount: (n) => `${n} ${n === 1 ? 'night selected' : 'nights selected'}`,
    selectDates: "Please select valid dates",
    sanctuaryLabel: "Sanctuary / Refuge *",
    fromPerNight: (price) => `From ${price}€/night`,
    firstName: "First Name *",
    firstNamePlaceholder: "e.g. Sophia",
    lastName: "Last Name *",
    lastNamePlaceholder: "e.g. Miller",
    email: "Email Address *",
    phone: "Phone / WhatsApp *",
    guests: "Guests",
    adults: "Adults",
    adultsAge: "13+ YEARS",
    children: "Children",
    childrenAge: "3-12 YEARS",
    babies: "Babies",
    babiesAge: "0-2 YEARS",
    totalGuests: (t, m) => `TOTAL: ${t} ${t === 1 ? 'GUEST' : 'GUESTS'} / ${m} MAX`,
    specialOccasion: "Special occasion (optional)",
    specialOccasionPlaceholder: "Anniversary, surprise, retreat...",
    pets: "Traveling with a pet?",
    vegetarian: "Vegetarian dining?",
    yes: "Yes",
    no: "No",
    notes: "Special requests or notes",
    notesPlaceholder: "Allergies, anniversary surprises, preferences...",
    privacy: "I accept the privacy policy and the processing of my personal data. *",
    privacyError: "⚠️ Please check this box to submit your Concierge inquiry.",
    submit: "SUBMIT INQUIRY",
    submitting: "PROCESSING INQUIRY...",
    successBadge: "DIRECT CONCIERGE ASSIGNMENT",
    successTitle: "Inquiry Received Successfully!",
    successDesc: (name, s) => `Thank you, ${name}. Your request for ${s} is now with our Concierge team.`,
    step1Title: "1. Confirmation & dossier sent",
    step1Desc: (inD, outD, n) => `Stay registered from ${inD} to ${outD} (${n} ${n === 1 ? 'night' : 'nights'}).`,
    step2Title: "2. Privacy & capacity verification",
    step2Desc: (g) => `Checking availability for ${g} ${g === 1 ? 'guest' : 'guests'} and custom requirements.`,
    step3Title: "3. Guaranteed priority reply",
    step3Desc: "We will contact you within 4 business hours with exact bespoke options.",
    whatsappBtn: "Need immediate attention? Chat on WhatsApp",
    backBtn: "Return to explore website",
  },
  fr: {
    badge: "SERVICE CONCIERGE DÉDIÉ",
    title: "Réservez votre séjour",
    subtitle: "Nombre de places strictement limité.",
    dateSelection: "SÉLECTION DE DATES SYNCHRONE",
    subjectAvailability: "SOUS RÉSERVE DE DISPONIBILITÉ",
    checkIn: "Arrivée (Check-in)",
    checkOut: "Départ (Check-out)",
    nightsCount: (n) => `${n} ${n === 1 ? 'nuit sélectionnée' : 'nuits sélectionnées'}`,
    selectDates: "Sélectionnez des dates valides",
    sanctuaryLabel: "Sanctuaire / Refuge *",
    fromPerNight: (price) => `Dès ${price}€/nuit`,
    firstName: "Prénom *",
    firstNamePlaceholder: "Ex. Sophie",
    lastName: "Nom de famille *",
    lastNamePlaceholder: "Ex. Dupont",
    email: "Adresse email *",
    phone: "Téléphone / WhatsApp *",
    guests: "Invités",
    adults: "Adultes",
    adultsAge: "13+ ANS",
    children: "Enfants",
    childrenAge: "3-12 ANS",
    babies: "Bébés",
    babiesAge: "0-2 ANS",
    totalGuests: (t, m) => `TOTAL : ${t} ${t === 1 ? 'PERSONNE' : 'PERSONNES'} / ${m} MAX`,
    specialOccasion: "Occasion spéciale (optionnel)",
    specialOccasionPlaceholder: "Anniversaire, surprise, retraite...",
    pets: "Voyagez-vous avec un animal ?",
    vegetarian: "Menu végétarien ?",
    yes: "Oui",
    no: "Non",
    notes: "Demandes particulières",
    notesPlaceholder: "Allergies, régimes particuliers, surprises...",
    privacy: "J'accepte la politique de confidentialité et le traitement de mes données. *",
    privacyError: "⚠️ Veuillez cocher cette case pour envoyer votre demande Concierge.",
    submit: "ENVOYER LA DEMANDE",
    submitting: "TRAITEMENT EN COURS...",
    successBadge: "DEMANDE PRISE EN CHARGE",
    successTitle: "Demande Envoyée avec Succès !",
    successDesc: (name, s) => `Merci, ${name}. Votre demande pour ${s} est entre les mains de notre Concierge.`,
    step1Title: "1. Récapitulatif et dossier envoyés",
    step1Desc: (inD, outD, n) => `Séjour enregistré du ${inD} au ${outD} (${n} ${n === 1 ? 'nuit' : 'nuits'}).`,
    step2Title: "2. Vérification de capacité et sérénité",
    step2Desc: (g) => `Vérification pour ${g} ${g === 1 ? 'personne' : 'personnes'} et vos préférences.`,
    step3Title: "3. Contact prioritaire garanti",
    step3Desc: "Nous vous répondrons sous 4 heures ouvrables avec votre confirmation.",
    whatsappBtn: "Besoin d'une réponse immédiate ? WhatsApp Concierge",
    backBtn: "Retourner et explorer le site",
  },
  cat: {
    badge: "ATENCIÓ SÍNCRONA CONCIERGE",
    title: "Reserva la teva experiència",
    subtitle: "Places estrictament limitades per santuari.",
    dateSelection: "SELECCIÓ SÍNCRONA DE DATES",
    subjectAvailability: "SUBJECTE A DISPONIBILITAT",
    checkIn: "Entrada (Check-in)",
    checkOut: "Sortida (Check-out)",
    nightsCount: (n) => `${n} ${n === 1 ? 'nit seleccionada' : 'nits seleccionades'}`,
    selectDates: "Selecciona dates vàlides",
    sanctuaryLabel: "Santuari / Refugi *",
    fromPerNight: (price) => `Des de ${price}€/nit`,
    firstName: "Nom *",
    firstNamePlaceholder: "Ex. Sofia",
    lastName: "Cognoms *",
    lastNamePlaceholder: "Ex. Puig",
    email: "Correu electrònic *",
    phone: "Telèfon / WhatsApp *",
    guests: "Hostes",
    adults: "Adults",
    adultsAge: "13+ ANYS",
    children: "Nens",
    childrenAge: "3-12 ANYS",
    babies: "Nadons",
    babiesAge: "0-2 ANYS",
    totalGuests: (t, m) => `TOTAL: ${t} ${t === 1 ? 'PERSONA' : 'PERSONES'} / ${m} MÀX`,
    specialOccasion: "Ocasió especial (opcional)",
    specialOccasionPlaceholder: "Aniversari, sorpresa, retir...",
    pets: "Viatges amb mascota?",
    vegetarian: "Opció vegetariana?",
    yes: "Sí",
    no: "No",
    notes: "Peticions especials o comentaris",
    notesPlaceholder: "Al·lèrgies, sorpreses d'aniversari, preferències...",
    privacy: "Accepto la política de privacitat i el tractament de les meves dades. *",
    privacyError: "⚠️ Si us plau, marca aquesta casella per enviar la sol·licitud Concierge.",
    submit: "ENVIAR SOL·LICITUD",
    submitting: "PROCESSANT SOL·LICITUD...",
    successBadge: "SOL·LICITUD EN ATENCIÓ DIRECTA",
    successTitle: "Sol·licitud Rebuda amb Èxit!",
    successDesc: (name, s) => `Gràcies, ${name}. La teva sol·licitud per a ${s} està en mans del nostre Concierge.`,
    step1Title: "1. Acusament de recepció i fitxa enviada",
    step1Desc: (inD, outD, n) => `Estada registrada del ${inD} al ${outD} (${n} ${n === 1 ? 'nit' : 'nits'}).`,
    step2Title: "2. Verificació d'aforament i privadesa",
    step2Desc: (g) => `Comprovem disponibilitat per a ${g} ${g === 1 ? 'persona' : 'persones'} i detalls.`,
    step3Title: "3. Contacte prioritari garantit",
    step3Desc: "Et respondrem en un termini màxim de 4 hores hàbils amb opcions a mida.",
    whatsappBtn: "Vols atenció immediata? Xatejar per WhatsApp",
    backBtn: "Tornar i continuar explorant",
  },
  pt: {
    badge: "ATENDIMENTO SÍNCRONO CONCIERGE",
    title: "Reserve a sua experiência",
    subtitle: "Lotação estritamente limitada.",
    dateSelection: "SELEÇÃO SÍNCRONA DE DATAS",
    subjectAvailability: "SUJEITO A DISPONIBILIDADE",
    checkIn: "Entrada (Check-in)",
    checkOut: "Saída (Check-out)",
    nightsCount: (n) => `${n} ${n === 1 ? 'noite selecionada' : 'noites selecionadas'}`,
    selectDates: "Selecione datas válidas",
    sanctuaryLabel: "Santuário / Refúgio *",
    fromPerNight: (price) => `A partir de ${price}€/noite`,
    firstName: "Primeiro Nome *",
    firstNamePlaceholder: "Ex. Sofia",
    lastName: "Apelidos *",
    lastNamePlaceholder: "Ex. Santos",
    email: "Correio eletrónico *",
    phone: "Telefone / WhatsApp *",
    guests: "Hóspedes",
    adults: "Adultos",
    adultsAge: "13+ ANOS",
    children: "Crianças",
    childrenAge: "3-12 ANOS",
    babies: "Bebés",
    babiesAge: "0-2 ANOS",
    totalGuests: (t, m) => `TOTAL: ${t} ${t === 1 ? 'PESSOA' : 'PESSOAS'} / ${m} MÁX`,
    specialOccasion: "Ocasião especial (opcional)",
    specialOccasionPlaceholder: "Aniversário, surpresa, retiro...",
    pets: "Viaja com animal de estimação?",
    vegetarian: "Opção vegetariana?",
    yes: "Sim",
    no: "Não",
    notes: "Pedidos especiais ou notas",
    notesPlaceholder: "Alergias, surpresas de aniversário, preferências...",
    privacy: "Aceito a política de privacidade e o tratamento dos meus dados. *",
    privacyError: "⚠️ Por favor, marque esta caixa para enviar o seu pedido Concierge.",
    submit: "ENVIAR PEDIDO",
    submitting: "PROCESSANDO PEDIDO...",
    successBadge: "PEDIDO EM ATENDIMENTO DIRETO",
    successTitle: "Pedido Recebido com Sucesso!",
    successDesc: (name, s) => `Obrigado, ${name}. O seu pedido para ${s} está a ser tratado pelo Concierge.`,
    step1Title: "1. Confirmação e dossier enviado",
    step1Desc: (inD, outD, n) => `Estadia registada de ${inD} a ${outD} (${n} ${n === 1 ? 'noite' : 'noites'}).`,
    step2Title: "2. Verificação de lotação e privacidade",
    step2Desc: (g) => `A verificar disponibilidade para ${g} ${g === 1 ? 'pessoa' : 'pessoas'} e preferências.`,
    step3Title: "3. Resposta prioritária garantida",
    step3Desc: "Responderemos num prazo máximo de 4 horas úteis com a confirmação final.",
    whatsappBtn: "Deseja atendimento imediato? Falar por WhatsApp",
    backBtn: "Voltar e continuar a explorar",
  },
};

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
  const L = modalI18n[currentLang] || modalI18n.es;

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
  const [privacyError, setPrivacyError] = useState(false);

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
    if (!privacyAccepted) {
      setPrivacyError(true);
      return;
    }
    setPrivacyError(false);

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

    // 1. Guardar backup en localStorage
    try {
      const savedLeads = JSON.parse(localStorage.getItem('experiencias_leads') || '[]');
      savedLeads.unshift(leadData);
      localStorage.setItem('experiencias_leads', JSON.stringify(savedLeads));
    } catch (localErr) {
      console.warn('[LocalStorage] Error guardando copia local:', localErr);
    }

    // 2. Envío único y atómico al backend (Supabase CRM + Resend Email + Telegram Alert)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
      console.log('[API Leads] Solicitud enviada exitosamente al servidor.');
    } catch (apiErr) {
      console.warn('[API Leads] Error en envío al servidor:', apiErr);
    }

    setSubmitting(false);
    setSubmitted(true);
  };

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

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto cursor-pointer"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0e1713] text-[#e8ece9] rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-[#c5a059]/40 shadow-2xl relative p-5 sm:p-8 scrollbar-thin cursor-default"
      >
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
                <span>{L.badge}</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {L.title}
              </h2>
              <p className="text-xs text-gray-400 font-light mt-0.5">
                {L.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Box: Selección Síncrona de Fechas */}
              <div className="p-4 rounded-2xl bg-[#14201a] border border-[#2d4234] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#d8a84e] font-bold text-[11px] uppercase tracking-wider">
                    <Calendar className="w-4 h-4 text-[#d8a84e]" />
                    <span>{L.dateSelection}</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#3d2f14] text-[#e5b355] text-[10px] font-bold tracking-wider uppercase">
                    <Zap className="w-3 h-3 text-[#e5b355] fill-[#e5b355]" />
                    <span>{L.subjectAvailability}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-300 mb-1">
                      {L.checkIn}
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
                      {L.checkOut}
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
                      ? L.nightsCount(nightsCount)
                      : L.selectDates}
                  </span>
                </div>
              </div>

              {/* Refuge Selector (Dropdown) */}
              <div>
                <label className="block text-gray-300 font-medium mb-1">
                  {L.sanctuaryLabel}
                </label>
                <select
                  value={selectedRefugeId}
                  onChange={(e) => setSelectedRefugeId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14201a] border border-[#2d4234] text-white focus:outline-none focus:border-[#d8a84e] text-xs cursor-pointer"
                >
                  {refugesData.map((r) => (
                    <option key={r.id} value={r.id} className="bg-[#0e1713] text-white">
                      {r.name} ({r.region[currentLang]}) — {L.fromPerNight(r.priceFromPerNight)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Names (2 cols) */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    {L.firstName}
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder={L.firstNamePlaceholder}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#14201a] border border-[#2d4234] text-white placeholder-gray-500 focus:outline-none focus:border-[#d8a84e]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    {L.lastName}
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder={L.lastNamePlaceholder}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#14201a] border border-[#2d4234] text-white placeholder-gray-500 focus:outline-none focus:border-[#d8a84e]"
                    />
                  </div>
                </div>
              </div>

              {/* Email & Phone (2 cols) */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    {L.email}
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@ejemplo.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#14201a] border border-[#2d4234] text-white placeholder-gray-500 focus:outline-none focus:border-[#d8a84e]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    {L.phone}
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
                    {L.guests}
                  </label>
                  <div className="p-3.5 rounded-xl bg-[#14201a] border border-[#2d4234] space-y-2.5">
                    {/* Adultos */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white text-xs">{L.adults}</div>
                        <div className="text-[10px] text-gray-400">{L.adultsAge}</div>
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
                        <div className="font-semibold text-white text-xs">{L.children}</div>
                        <div className="text-[10px] text-gray-400">{L.childrenAge}</div>
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
                        <div className="font-semibold text-white text-xs">{L.babies}</div>
                        <div className="text-[10px] text-gray-400">{L.babiesAge}</div>
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
                      {L.totalGuests(totalPersons, maxCapacity)}
                    </div>
                  </div>
                </div>

                {/* Ocasión Especial */}
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    {L.specialOccasion}
                  </label>
                  <div className="relative">
                    <Sparkles className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-3" />
                    <textarea
                      rows={4}
                      value={specialOccasion}
                      onChange={(e) => setSpecialOccasion(e.target.value)}
                      placeholder={L.specialOccasionPlaceholder}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#14201a] border border-[#2d4234] text-white placeholder-gray-500 focus:outline-none focus:border-[#d8a84e] text-xs resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Toggles: Mascota & Vegetariano (2 cols) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#14201a] border border-[#2d4234]">
                  <span className="text-gray-300 text-[11px] font-medium">{L.pets}</span>
                  <button
                    type="button"
                    onClick={() => setPets(!pets)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      pets ? 'bg-[#d8a84e] text-black shadow-md' : 'bg-[#243328] text-gray-300'
                    }`}
                  >
                    {pets ? L.yes : L.no}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#14201a] border border-[#2d4234]">
                  <span className="text-gray-300 text-[11px] font-medium">{L.vegetarian}</span>
                  <button
                    type="button"
                    onClick={() => setVegetarian(!vegetarian)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      vegetarian ? 'bg-[#d8a84e] text-black shadow-md' : 'bg-[#243328] text-gray-300'
                    }`}
                  >
                    {vegetarian ? L.yes : L.no}
                  </button>
                </div>
              </div>

              {/* Mensaje adicional */}
              <div>
                <label className="block text-gray-300 font-medium mb-1">
                  {L.notes}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={L.notesPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#14201a] border border-[#2d4234] text-white placeholder-gray-500 focus:outline-none focus:border-[#d8a84e] text-xs resize-none"
                />
              </div>

              {/* Checkbox Privacidad con advertencia visual suave */}
              <div
                className={`p-3 rounded-xl transition-all duration-300 ${
                  privacyError
                    ? 'bg-red-500/10 border border-red-500/50 shadow-md shadow-red-500/10'
                    : 'border border-transparent'
                }`}
              >
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={(e) => {
                      setPrivacyAccepted(e.target.checked);
                      if (e.target.checked) setPrivacyError(false);
                    }}
                    className="mt-0.5 w-4 h-4 rounded border-[#2d4234] bg-[#14201a] text-[#d8a84e] focus:ring-0 cursor-pointer accent-[#d8a84e]"
                  />
                  <span className="text-[11px] text-gray-300 leading-snug">
                    {L.privacy}
                  </span>
                </label>
                {privacyError && (
                  <p className="text-[10px] text-red-400 font-semibold mt-1.5 pl-6">
                    {L.privacyError}
                  </p>
                )}
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl font-bold uppercase tracking-wider text-black bg-[#e5a93c] hover:bg-[#f0b952] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#e5a93c]/20 mt-2 text-xs disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? L.submitting : L.submit}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-5 sm:py-7 space-y-4 animate-fadeIn">
            {/* Top Golden Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#3d2f14] border border-[#d8a84e]/60 text-[#e5b355] text-[10px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#e5b355]" />
              <span>{L.successBadge}</span>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-[#d8a84e]/15 text-[#d8a84e] flex items-center justify-center mx-auto border border-[#d8a84e]/50 shadow-xl shadow-[#d8a84e]/10">
              <CheckCircle2 className="w-8 h-8 text-[#d8a84e]" />
            </div>

            <div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1.5">
                {L.successTitle}
              </h3>
              <p className="text-xs text-gray-300 font-light max-w-md mx-auto leading-relaxed">
                {L.successDesc(firstName || 'Huésped', currentRefuge?.name || '')}
              </p>
            </div>

            {/* 3-Step Timeline Cards */}
            <div className="text-left bg-[#14201a] border border-[#2d4234] rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#1b4332] text-[#d8f3dc] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border border-[#d8f3dc]/30">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{L.step1Title}</h4>
                  <p className="text-[11px] text-gray-400 font-light">
                    {L.step1Desc(checkIn, checkOut, nightsCount)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#3d2f14] text-[#e5b355] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border border-[#d8a84e]/40">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{L.step2Title}</h4>
                  <p className="text-[11px] text-gray-400 font-light">
                    {L.step2Desc(totalPersons)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#243328] text-gray-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border border-white/10">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{L.step3Title}</h4>
                  <p className="text-[11px] text-gray-400 font-light">
                    {L.step3Desc}
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
                <span>{L.whatsappBtn}</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl font-medium text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              >
                {L.backBtn}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
