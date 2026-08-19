import { useState } from 'react';
import { useLang } from '../core/LangContext';
import { User, Mail, Phone, Calendar, Clock, CheckCircle2, Sparkles, Send } from 'lucide-react';

interface FormData {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  fecha_checkin: string;
  fecha_checkout: string;
  num_adultos: number;
  num_ninos: number;
  num_bebes: number;
  tiene_mascota: boolean;
  vegetariano: boolean;
  ocasion: string;
  mensaje: string;
  acepta_lopd: boolean;
}

const INITIAL: FormData = {
  nombre: '',
  apellidos: '',
  email: '',
  telefono: '',
  fecha_checkin: '',
  fecha_checkout: '',
  num_adultos: 2,
  num_ninos: 0,
  num_bebes: 0,
  tiene_mascota: false,
  vegetariano: false,
  ocasion: '',
  mensaje: '',
  acepta_lopd: false,
};

export default function BookingForm() {
  const { lang } = useLang();
  const [form, setForm]           = useState<FormData>(INITIAL);
  const [status, setStatus]       = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  const copy = {
    title:        { es: 'Reserva tu experiencia', ca: 'Reserva la teva experiència',   fr: 'Réservez votre expérience' },
    subtitle:     { es: 'Plazas limitadas.',     ca: 'Places limitades.', fr: 'Places limitées.' },
    nombre:       { es: 'Nombres',                ca: 'Noms',                           fr: 'Prénoms' },
    apellidos:    { es: 'Apellidos',              ca: 'Cognoms',                        fr: 'Nom de famille' },
    email:        { es: 'Correo electrónico',     ca: 'Correu electrònic',              fr: 'Adresse e-mail' },
    telefono:     { es: 'Teléfono',     ca: 'Telèfon',             fr: 'Téléphone' },
    checkin:      { es: 'Check-in (Entrada)',          ca: 'Check-in (Entrada)',                 fr: 'Check-in (Arrivée)' },
    checkout:     { es: 'Check-out (Salida)',      ca: 'Check-out (Sortida)',             fr: 'Check-out (Départ)' },
    huespedes:    { es: 'Huéspedes',      ca: 'Hostes',                 fr: 'Invités' },
    mascota:      { es: '¿Viajas con mascota?',   ca: 'Viatges amb mascota?',           fr: 'Vous voyagez avec un animal?' },
    vegetariano:  { es: '¿Opción vegetariana?',   ca: 'Opció vegetariana?',            fr: 'Option végétarienne?' },
    ocasion:      { es: 'Ocasión especial (opcional)',  ca: 'Ocasió especial (opcional)', fr: 'Occasion spéciale (optionnel)' },
    mensaje:      { es: 'Mensaje adicional',      ca: 'Missatge addicional',            fr: 'Message supplémentaire' },
    lopd:         { es: 'Acepto la política de privacidad y el tratamiento de mis datos.', ca: 'Accepto la política de privacitat i el tractament de les meves dades.', fr: 'J\'accepte la politique de confidentialité et le traitement de mes données.' },
    lopdError:    { es: 'Debes aceptar la política de privacidad para continuar.', ca: 'Has d\'acceptar la política de privacitat per continuar.', fr: 'Vous devez accepter la politique de confidentialité pour continuer.' },
    submit:       { es: 'Enviar solicitud',       ca: 'Enviar sol·licitud',             fr: 'Envoyer la demande' },
    sending:      { es: 'Enviando…',             ca: 'Enviant…',                       fr: 'Envoi en cours…' },
    success:      { es: '¡Solicitud recibida! Te contactaremos pronto por WhatsApp.', ca: 'Sol·licitud rebuda! Et contactarem aviat per WhatsApp.', fr: 'Demande reçue! Nous vous contacterons bientôt via WhatsApp.' },
  };

  const c = (field: keyof typeof copy) => copy[field][lang];

  const calculateNights = () => {
    if (!form.fecha_checkin || !form.fecha_checkout) return 2;
    const start = new Date(form.fecha_checkin);
    const end = new Date(form.fecha_checkout);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };
  const nights = calculateNights();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    if (name === 'acepta_lopd' && (e.target as HTMLInputElement).checked) {
      setServerError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.acepta_lopd) {
      setServerError(c('lopdError'));
      setStatus('error');
      return;
    }
    if (form.fecha_checkin && form.fecha_checkout) {
      const checkInDate = new Date(form.fecha_checkin);
      const checkOutDate = new Date(form.fecha_checkout);
      if (checkOutDate <= checkInDate) {
        setServerError('La fecha de salida debe ser posterior a la fecha de entrada.');
        setStatus('error');
        return;
      }
    }

    setStatus('sending');
    setServerError('');

    const urlParams = new URLSearchParams(window.location.search);

    const totalPersons = form.num_adultos + form.num_ninos + form.num_bebes;
    const specialReqs = [
      form.ocasion ? `Ocasión especial: ${form.ocasion}` : '',
      form.vegetariano ? 'Opción vegetariana: Sí' : '',
      `Desglose: ${form.num_adultos} adultos, ${form.num_ninos} niños, ${form.num_bebes} bebés`,
      form.mensaje ? `Mensaje: ${form.mensaje}` : '',
    ]
      .filter(Boolean)
      .join(' | ');

    const leadData = {
      fullName: `${form.nombre} ${form.apellidos}`.trim(),
      email: form.email,
      phone: form.telefono,
      preferredRefuge: 'refugi-canigo',
      checkIn: form.fecha_checkin,
      checkOut: form.fecha_checkout,
      guests: totalPersons,
      travelStyle: form.ocasion || 'Experiencia Luna Llena',
      pets: form.tiene_mascota,
      notes: specialReqs,
      language: lang,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });

      if (res.ok) {
        setStatus('success');
        setForm(INITIAL);
      } else {
        const err = await res.json().catch(() => ({}));
        setServerError(err.error || 'Error al enviar. Intenta por WhatsApp.');
        setStatus('error');
      }
    } catch {
      setServerError('Error de conexión. Por favor, contáctanos por WhatsApp.');
      setStatus('error');
    }
  };

  const MAX_CAPACITY = 4;
  const totalGuests = form.num_adultos + form.num_ninos + form.num_bebes;

  const updateGuest = (field: 'num_adultos' | 'num_ninos' | 'num_bebes', delta: number) => {
    setForm(prev => {
      const val = prev[field] + delta;
      if (field === 'num_adultos' && val < 1) return prev;
      if (field !== 'num_adultos' && val < 0) return prev;
      if (delta > 0 && totalGuests >= MAX_CAPACITY) return prev;
      return { ...prev, [field]: val };
    });
  };

  const Stepper = ({ field, label, sublabel, min }: { field: 'num_adultos' | 'num_ninos' | 'num_bebes', label: string, sublabel: string, min: number }) => (
    <div className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
      <div>
        <div className="text-xs text-gray-300 font-medium">{label}</div>
        <div className="text-[10px] text-gray-500 uppercase">{sublabel}</div>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => updateGuest(field, -1)} disabled={form[field] <= min} className="w-6 h-6 rounded bg-white/5 text-white disabled:opacity-30 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] flex items-center justify-center transition-colors">
          -
        </button>
        <span className="w-4 text-center text-xs font-bold text-white">{form[field]}</span>
        <button type="button" onClick={() => updateGuest(field, 1)} disabled={totalGuests >= MAX_CAPACITY} className="w-6 h-6 rounded bg-white/5 text-white disabled:opacity-30 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] flex items-center justify-center transition-colors">
          +
        </button>
      </div>
    </div>
  );

  return (
    <section id="reservar" className="py-24 px-6 md:px-12 bg-[#0B130E] flex justify-center">
      <div className="bg-[#121a16] text-white rounded-3xl max-w-xl w-full border border-[#D4AF37]/40 shadow-2xl p-6 sm:p-8">
        
        {!status.includes('success') ? (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#E5A93C] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Atención Síncrona Concierge</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold">
                {c('title')}
              </h2>
              <p className="text-xs text-gray-300 font-light mt-1">
                {c('subtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Fechas */}
              <div className="p-4 rounded-2xl bg-[#1c2824]/80 border border-[#D4AF37]/30 space-y-3">
                <div className="flex items-center justify-between text-[#E5A93C] font-semibold text-[11px] uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#D4AF37]" />
                    Selección Síncrona de Fechas
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#E5A93C] text-[10px]">
                    ⚡ Sujeto a Disponibilidad
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-medium mb-1">
                      {c('checkin')}
                    </label>
                    <input
                      type="date"
                      name="fecha_checkin"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={form.fecha_checkin}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-xl bg-[#121a16] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-medium mb-1">
                      {c('checkout')}
                    </label>
                    <input
                      type="date"
                      name="fecha_checkout"
                      required
                      min={
                        form.fecha_checkin 
                          ? new Date(new Date(form.fecha_checkin).setDate(new Date(form.fecha_checkin).getDate() + 1)).toISOString().split('T')[0] 
                          : new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]
                      }
                      value={form.fecha_checkout}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-xl bg-[#121a16] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                  <span className="text-gray-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {nights} {nights === 1 ? 'noche' : 'noches'} seleccionadas
                  </span>
                </div>
              </div>

              {/* Nombres */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-1.5">
                    {c('nombre')} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="nombre"
                      required
                      autoComplete="given-name"
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="Ej. Sofía"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#1c2824] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1.5">
                    {c('apellidos')} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="apellidos"
                      required
                      autoComplete="family-name"
                      value={form.apellidos}
                      onChange={handleChange}
                      placeholder="Ej. Martínez"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#1c2824] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* Email / Telefono */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-1.5">
                    {c('email')} *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="sofia@ejemplo.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#1c2824] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 font-medium mb-1.5">
                    {c('telefono')} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="telefono"
                      required
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="+34 600 000 000"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#1c2824] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* Huespedes y Ocasión */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-1.5">
                    {c('huespedes')}
                  </label>
                  <div className="bg-[#1c2824] border border-white/10 rounded-xl px-4 py-2">
                    <Stepper field="num_adultos" label="Adultos" sublabel="13+ años" min={1} />
                    <Stepper field="num_ninos" label="Niños" sublabel="3-12 años" min={0} />
                    <Stepper field="num_bebes" label="Bebés" sublabel="0-2 años" min={0} />
                    <div className="pt-2 mt-2 border-t border-[#D4AF37]/20 text-center text-[10px] text-[#E5A93C] uppercase tracking-wider font-bold">
                      Total: {totalGuests} {totalGuests === 1 ? 'persona' : 'personas'} / {MAX_CAPACITY}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="block text-gray-300 font-medium mb-1.5">
                    {c('ocasion')}
                  </label>
                  <div className="relative">
                    <Sparkles className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="ocasion"
                      value={form.ocasion}
                      onChange={handleChange}
                      placeholder="Aniversario, sorpresa..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#1c2824] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* Pets & Vegetarian */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#1c2824] border border-white/10">
                  <span className="text-gray-300">{c('mascota')}</span>
                  <button
                    type="button"
                    onClick={() => setForm(p => ({ ...p, tiene_mascota: !p.tiene_mascota }))}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                      form.tiene_mascota ? 'bg-[#D4AF37] text-[#0B130E]' : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {form.tiene_mascota ? 'Sí, llevo mascota' : 'No'}
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#1c2824] border border-white/10">
                  <span className="text-gray-300">{c('vegetariano')}</span>
                  <button
                    type="button"
                    onClick={() => setForm(p => ({ ...p, vegetariano: !p.vegetariano }))}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                      form.vegetariano ? 'bg-[#D4AF37] text-[#0B130E]' : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {form.vegetariano ? 'Sí, por favor' : 'No'}
                  </button>
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <label className="block text-gray-300 font-medium mb-1.5">
                  {c('mensaje')}
                </label>
                <textarea
                  rows={2}
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  placeholder="Comentarios adicionales..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1c2824] border border-white/10 text-white focus:outline-none focus:border-[#D4AF37] resize-none"
                />
              </div>

              {/* LOPD Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      name="acepta_lopd"
                      required
                      checked={form.acepta_lopd}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 rounded border border-white/20 peer-checked:bg-[#D4AF37] peer-checked:border-[#D4AF37] transition-all flex items-center justify-center">
                      {form.acepta_lopd && (
                        <CheckCircle2 className="w-3 h-3 text-[#0B130E]" />
                      )}
                    </div>
                  </div>
                  <span className="text-gray-400 text-[10px] leading-relaxed">
                    {c('lopd')} <span className="text-[#D4AF37]">*</span>
                  </span>
                </label>
                {serverError && <p className="text-red-400 mt-2 text-xs">{serverError}</p>}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 rounded-xl font-bold uppercase tracking-wider text-[#0B130E] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2 disabled:opacity-70"
                style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #E5A93C 100%)' }}
              >
                <Send className="w-4 h-4" />
                <span>{status === 'sending' ? c('sending') : c('submit')}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-white">
              ¡Reserva Enviada!
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-light max-w-md mx-auto">
              {c('success')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
