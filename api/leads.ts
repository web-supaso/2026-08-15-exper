import type { VercelRequest, VercelResponse } from '@vercel/node';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const OPERATOR_EMAIL = 'estiloexperiencias@gmail.com';
const OPERATOR_PHONE = '+5493541664488';

const TELEGRAM_BOT_TOKEN = '8952234866:AAFw4WIwrbzBO6GVq7GXtN55dOdXrP18AhE';
const TELEGRAM_OPERATOR_CHAT_ID = '5005671664';

const SUPABASE_CRM_URL = 'https://rzwqpxkehhpmekksninp.supabase.co';
const SUPABASE_CRM_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6d3FweGtlaGhwbWVra3NuaW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1NTMyMzksImV4cCI6MjEwMjEyOTIzOX0.uZnwk8DYYyi8LSzP96iZoqf9kuJa4gV3KF6dWak-M8c';
const CRM_ORG_ID = '22222222-0000-0000-0000-000000000002';

const CRM_PROPERTY_MAP: Record<string, string> = {
  'refugi-canigo': 'bbbb0001-0000-0000-0000-000000000001',
  'el-nido-del-estrecho': 'bbbb0002-0000-0000-0000-000000000002',
  'nido-estrecho': 'bbbb0002-0000-0000-0000-000000000002',
  'refugio-obsidiana': 'bbbb0003-0000-0000-0000-000000000003',
  'falesia-atlantica': 'bbbb0004-0000-0000-0000-000000000004',
};

const REFUGE_NAMES: Record<string, string> = {
  'refugi-canigo': 'Refugi del Canigó (Pirineos Orientales)',
  'el-nido-del-estrecho': 'El Nido del Estrecho (Tarifa / Gibraltar)',
  'nido-estrecho': 'El Nido del Estrecho (Tarifa / Gibraltar)',
  'refugio-obsidiana': 'El Refugio de Obsidiana (Serranía de Albarracín)',
  'falesia-atlantica': 'Falesia Atlántica (Costa Vicentina, Portugal)',
};

const EMAIL_I18N: Record<string, {
  subject: (name: string, refuge: string) => string;
  badge: string;
  tagline: string;
  greeting: (name: string) => string;
  intro: string;
  summaryTitle: string;
  sanctuaryLabel: string;
  datesLabel: string;
  guestsLabel: string;
  contactLabel: string;
  prefsLabel: string;
  petYes: string;
  petNo: string;
  commitment: string;
  whatsappBtn: string;
  crmLink: string;
  footerRights: string;
}> = {
  es: {
    subject: (name, refuge) => `✨ Solicitud Recibida: ${name} — ${refuge}`,
    badge: '✨ Solicitud de Reserva • En Revisión Concierge',
    tagline: '"Santuarios de descanso y naturaleza salvaje"',
    greeting: (name) => `Hola <strong>${name}</strong>,`,
    intro: 'Hemos recibido tu solicitud de estancia. Para garantizar el silencio y la exclusividad de cada santuario, gestionamos cada reserva de forma personalizada.',
    summaryTitle: '📋 Resumen de tu Solicitud',
    sanctuaryLabel: 'Santuario Seleccionado',
    datesLabel: 'Fechas de Estancia',
    guestsLabel: 'Huéspedes',
    contactLabel: 'Datos de Contacto',
    prefsLabel: 'Preferencias & Ocasión',
    petYes: '🐾 Con mascota',
    petNo: 'Sin mascota',
    commitment: '🕒 <strong>Compromiso de Atención:</strong> Nuestro equipo de Concierge validará el aforo y te responderá en un plazo máximo de <strong>4 horas hábiles</strong>.',
    whatsappBtn: '💬 Contactar con Concierge por WhatsApp',
    crmLink: 'Acceso a Intranet CRM',
    footerRights: 'Experiencias con Estilo • Diseñado con pasión por Marketing Amable',
  },
  en: {
    subject: (name, refuge) => `✨ Booking Request Received: ${name} — ${refuge}`,
    badge: '✨ Booking Request • Under Concierge Review',
    tagline: '"Sanctuaries of rest and wild nature"',
    greeting: (name) => `Hello <strong>${name}</strong>,`,
    intro: 'We have received your stay request. To guarantee absolute silence and exclusivity in each sanctuary, we manage every reservation personally.',
    summaryTitle: '📋 Your Booking Summary',
    sanctuaryLabel: 'Selected Sanctuary',
    datesLabel: 'Stay Dates',
    guestsLabel: 'Guests',
    contactLabel: 'Contact Information',
    prefsLabel: 'Preferences & Occasion',
    petYes: '🐾 Traveling with pet',
    petNo: 'No pets',
    commitment: '🕒 <strong>Concierge Commitment:</strong> Our team will verify availability and reply within a maximum of <strong>4 business hours</strong> with your confirmation.',
    whatsappBtn: '💬 Chat with Concierge on WhatsApp',
    crmLink: 'CRM Intranet Access',
    footerRights: 'Experiencias con Estilo • Designed with passion by Marketing Amable',
  },
  fr: {
    subject: (name, refuge) => `✨ Demande Reçue : ${name} — ${refuge}`,
    badge: '✨ Demande de Réservation • En Cours d\'Examen Concierge',
    tagline: '"Sanctuaires de repos et de nature sauvage"',
    greeting: (name) => `Bonjour <strong>${name}</strong>,`,
    intro: 'Nous avons bien reçu votre demande de séjour. Afin de préserver le silence et l\'exclusivité de chaque sanctuaire, nous gérons chaque réservation sur mesure.',
    summaryTitle: '📋 Récapitulatif de votre Demande',
    sanctuaryLabel: 'Sanctuaire Sélectionné',
    datesLabel: 'Dates du Séjour',
    guestsLabel: 'Voyageurs',
    contactLabel: 'Coordonnées de Contact',
    prefsLabel: 'Préférences & Occasion',
    petYes: '🐾 Avec animal de compagnie',
    petNo: 'Sans animal',
    commitment: '🕒 <strong>Engagement Concierge :</strong> Notre équipe vérifiera la disponibilité et vous répondra sous un délai maximal de <strong>4 heures ouvrées</strong>.',
    whatsappBtn: '💬 Contacter le Concierge sur WhatsApp',
    crmLink: 'Accès Intranet CRM',
    footerRights: 'Experiencias con Estilo • Conçu avec passion par Marketing Amable',
  },
  cat: {
    subject: (name, refuge) => `✨ Sol·licitud Rebuda: ${name} — ${refuge}`,
    badge: '✨ Sol·licitud de Reserva • En Revisió Concierge',
    tagline: '"Santuaris de descans i natura salvatge"',
    greeting: (name) => `Hola <strong>${name}</strong>,`,
    intro: 'Hem rebut la teva sol·licitud d\'estada. Per preservar el silenci i l\'exclusivitat de cada santuari, gestionem cada reserva de forma personalitzada.',
    summaryTitle: '📋 Resum de la teva Sol·licitud',
    sanctuaryLabel: 'Santuari Seleccionat',
    datesLabel: 'Dates d\'Estada',
    guestsLabel: 'Hostes',
    contactLabel: 'Dades de Contacte',
    prefsLabel: 'Preferències i Ocasió',
    petYes: '🐾 Amb mascota',
    petNo: 'Sense mascota',
    commitment: '🕒 <strong>Compromís d\'Atenció:</strong> El nostre equip de Concierge validarà l\'aforament i et respondrà en un termini màxim de <strong>4 hores hàbils</strong>.',
    whatsappBtn: '💬 Contactar amb Concierge per WhatsApp',
    crmLink: 'Accés a Intranet CRM',
    footerRights: 'Experiencias con Estilo • Dissenyat amb passió per Marketing Amable',
  },
  pt: {
    subject: (name, refuge) => `✨ Solicitação Recebida: ${name} — ${refuge}`,
    badge: '✨ Solicitação de Reserva • Em Revisão Concierge',
    tagline: '"Santuários de descanso e natureza selvagem"',
    greeting: (name) => `Olá <strong>${name}</strong>,`,
    intro: 'Recebemos sua solicitação de estadia. Para garantir o silêncio e a exclusividade de cada santuário, gerenciamos cada reserva de forma personalizada.',
    summaryTitle: '📋 Resumo da sua Solicitação',
    sanctuaryLabel: 'Santuário Selecionado',
    datesLabel: 'Datas da Estadia',
    guestsLabel: 'Hóspedes',
    contactLabel: 'Dados de Contato',
    prefsLabel: 'Preferências & Ocasião',
    petYes: '🐾 Com animal de estimação',
    petNo: 'Sem animais',
    commitment: '🕒 <strong>Compromisso de Atendimento:</strong> Nossa equipe de Concierge validará a disponibilidade e responderá em até <strong>4 horas úteis</strong>.',
    whatsappBtn: '💬 Falar com o Concierge no WhatsApp',
    crmLink: 'Acesso à Intranet CRM',
    footerRights: 'Experiencias con Estilo • Desenvolvido com paixão por Marketing Amable',
  },
};

const leads: any[] = [];

async function sendTelegramAlert(lead: any) {
  try {
    const refugeName = REFUGE_NAMES[lead.preferredRefuge] || lead.preferredRefuge;
    const text = `🛎️ *NUEVA SOLICITUD DE RESERVA CONCIERGE*

👤 *Huésped:* ${lead.fullName}
📍 *Santuario:* ${refugeName}
📅 *Fechas:* ${lead.checkIn} al ${lead.checkOut}
👥 *Huéspedes:* ${lead.guests} personas
🌐 *Idioma Web:* ${(lead.language || 'es').toUpperCase()}
📱 *Teléfono:* ${lead.phone || 'No especificado'}
✉️ *Email:* ${lead.email || 'No especificado'}
🐾 *Preferencias:* ${lead.pets ? 'Con mascota' : 'Sin mascota'} • ${lead.notes || 'Estándar'}

⚡ *Compromiso Concierge:* Responder en menos de 4 horas.`;

    const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
    const waGreeting =
      lead.language === 'en'
        ? `Hello ${encodeURIComponent(lead.fullName)}, I am writing from the Concierge team of Experiencias con Estilo regarding your booking for ${encodeURIComponent(refugeName)}...`
        : lead.language === 'fr'
        ? `Bonjour ${encodeURIComponent(lead.fullName)}, je vous écris de la part de l'équipe Concierge d'Experiencias con Estilo concernant votre séjour pour ${encodeURIComponent(refugeName)}...`
        : `Hola ${encodeURIComponent(lead.fullName)}, te escribo del equipo de Concierge de Experiencias con Estilo respecto a tu solicitud para el ${encodeURIComponent(refugeName)}...`;

    const waUrl = cleanPhone
      ? `https://wa.me/${cleanPhone}?text=${waGreeting}`
      : 'https://hotel-crm-five-gold.vercel.app/leads';

    const replyMarkup = {
      inline_keyboard: [
        [
          {
            text: '💬 Abrir WhatsApp del Huésped',
            url: waUrl,
          },
        ],
        [
          {
            text: '📊 Ver en el CRM de Hoteles',
            url: 'https://hotel-crm-five-gold.vercel.app/leads',
          },
        ],
      ],
    };

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_OPERATOR_CHAT_ID,
        text,
        parse_mode: 'Markdown',
        reply_markup: replyMarkup,
      }),
    });
    console.log('[Telegram Alert Sync] Alerta push enviada al operador con éxito.');
  } catch (err) {
    console.error('[Telegram Alert Sync] Error enviando alerta de Telegram:', err);
  }
}

async function sendConfirmationEmail(lead: any) {
  try {
    const lang = lead.language || 'es';
    const i18n = EMAIL_I18N[lang] || EMAIL_I18N.es;
    const refugeName = REFUGE_NAMES[lead.preferredRefuge] || lead.preferredRefuge;
    const recipients: string[] = [];
    if (lead.email && lead.email.includes('@') && !lead.email.includes('ejemplo.com') && !lead.email.includes('d@d.co') && !lead.email.includes('a@a.c')) {
      recipients.push(lead.email);
    }
    recipients.push('reservas@experienciasconestilo.com');
    recipients.push(OPERATOR_EMAIL);

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0e1713; color: #e8ece9; padding: 24px 12px; text-align: center;">
        <div style="max-width: 540px; margin: 0 auto; background-color: #14201a; border: 1px solid #c5a059; border-radius: 18px; padding: 24px 18px; text-align: left; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          
          <div style="text-align: center; margin-bottom: 20px;">
            <span style="display: inline-block; padding: 5px 14px; background-color: #2a2010; color: #e5c07b; border: 1px solid #c5a059; border-radius: 9999px; font-size: 10px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase;">
              ${i18n.badge}
            </span>
            <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 14px 0 4px 0;">Experiencias con Estilo</h1>
            <p style="color: #c5a059; font-size: 12px; margin: 0; font-style: italic;">${i18n.tagline}</p>
          </div>

          <p style="font-size: 13px; line-height: 1.6; color: #d1d5db;">
            ${i18n.greeting(lead.fullName)}<br><br>
            ${i18n.intro}
          </p>

          <div style="background-color: #0e1713; border: 1px solid #2d4234; border-radius: 12px; padding: 16px; margin: 18px 0;">
            <h3 style="color: #e5c07b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 14px 0; border-bottom: 1px solid #2d4234; padding-bottom: 6px;">
              ${i18n.summaryTitle}
            </h3>
            
            <div style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #1f2d24;">
              <span style="display: block; font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">${i18n.sanctuaryLabel}</span>
              <span style="display: block; font-size: 14px; font-weight: bold; color: #ffffff;">${refugeName}</span>
            </div>

            <div style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #1f2d24;">
              <span style="display: block; font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">${i18n.datesLabel}</span>
              <span style="display: block; font-size: 14px; font-weight: bold; color: #e5c07b;">${lead.checkIn} al ${lead.checkOut}</span>
            </div>

            <div style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #1f2d24;">
              <span style="display: block; font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">${i18n.guestsLabel}</span>
              <span style="display: block; font-size: 14px; font-weight: bold; color: #ffffff;">${lead.guests} personas</span>
            </div>

            <div style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #1f2d24;">
              <span style="display: block; font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">${i18n.contactLabel}</span>
              <span style="display: block; font-size: 13px; font-weight: bold; color: #ffffff;">${lead.phone || '-'} • ${lead.email || '-'}</span>
            </div>

            <div>
              <span style="display: block; font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">${i18n.prefsLabel}</span>
              <span style="display: block; font-size: 13px; font-weight: 500; color: #d8f3dc;">${lead.pets ? i18n.petYes : i18n.petNo} • ${lead.notes || 'Estándar'}</span>
            </div>
          </div>

          <div style="background-color: #231b0b; border-left: 3px solid #c5a059; padding: 12px 14px; border-radius: 8px; margin-bottom: 20px;">
            <p style="font-size: 12px; color: #f3e8d2; margin: 0; line-height: 1.5;">
              ${i18n.commitment}
            </p>
          </div>

          <div style="text-align: center; padding-top: 6px;">
            <a href="https://wa.me/5493541664488?text=Hola%2C%20acabo%20de%20enviar%20mi%20solicitud%20para%20${encodeURIComponent(refugeName)}%20a%20nombre%20de%20${encodeURIComponent(lead.fullName)}" style="display: inline-block; padding: 12px 24px; background-color: #c5a059; color: #0e1713; font-weight: bold; font-size: 13px; text-decoration: none; border-radius: 10px;">
              ${i18n.whatsappBtn}
            </a>
          </div>

          <div style="margin-top: 20px; padding-top: 14px; border-top: 1px solid #2d4234; text-align: center;">
            <a href="https://hotel-crm-five-gold.vercel.app/leads" style="font-size: 11px; color: #9ca3af; text-decoration: underline;">
              ${i18n.crmLink}
            </a>
          </div>
        </div>

        <p style="font-size: 10px; color: #6b7280; margin-top: 20px;">
          © ${new Date().getFullYear()} ${i18n.footerRights}
        </p>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Experiencias con Estilo <reservas@experienciasconestilo.com>',
        to: recipients,
        subject: i18n.subject(lead.fullName, refugeName),
        html: htmlContent,
      }),
    });

    const resData = await res.json();
    console.log('[Resend Email Sync] Email enviado exitosamente:', resData);
  } catch (err) {
    console.error('[Resend Email Sync] Error enviando email:', err);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { fullName, email, phone, preferredRefuge, checkIn, checkOut, guests, travelStyle, pets, notes, language } = req.body || {};

    const newLead = {
      id: `lead_${Date.now()}`,
      fullName: fullName || 'Anónimo',
      email: email || 'sin-email@ejemplo.com',
      phone: phone || '',
      preferredRefuge: preferredRefuge || 'refugi-canigo',
      checkIn: checkIn || '',
      checkOut: checkOut || '',
      guests: guests || 2,
      travelStyle: travelStyle || 'Desconexión',
      pets: !!pets,
      notes: notes || '',
      language: language || 'es',
      createdAt: new Date().toISOString(),
    };

    leads.unshift(newLead);

    // 1. Forward to Supabase CRM database
    try {
      const propertyId = CRM_PROPERTY_MAP[preferredRefuge] || 'bbbb0001-0000-0000-0000-000000000001';
      await fetch(`${SUPABASE_CRM_URL}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_CRM_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_CRM_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          organization_id: CRM_ORG_ID,
          property_id: propertyId,
          guest_name: fullName || 'Anónimo',
          guest_email: email || null,
          guest_phone: phone || '',
          requested_check_in: checkIn || null,
          requested_check_out: checkOut || null,
          guests_count: guests || 2,
          pets_count: pets ? 1 : 0,
          dietary_notes: notes?.includes('vegetariana') ? 'Opción vegetariana' : 'Dieta estándar',
          special_requests: notes || '',
          status: 'nuevo',
          source: 'web_form',
        }),
      });
      console.log('[Vercel Serverless CRM] Lead persistido en Supabase CRM');
    } catch (err) {
      console.error('[Vercel Serverless CRM] Error al persistir en Supabase:', err);
    }

    // 2. Send luxury confirmation email via Resend (with full i18n)
    await sendConfirmationEmail(newLead);

    // 3. Send instant Telegram push alert to Operator with direct WhatsApp action button
    await sendTelegramAlert(newLead);

    return res.status(201).json({
      success: true,
      message: 'Solicitud registrada, email enviado y alerta enviada al operador.',
      lead: newLead,
    });
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      count: leads.length,
      leads,
    });
  }

  res.status(405).json({ error: 'Method Not Allowed' });
}
