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

const REFUGE_IMAGES: Record<string, string> = {
  'refugi-canigo': 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&h=320&q=80',
  'el-nido-del-estrecho': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&h=320&q=80',
  'nido-estrecho': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&h=320&q=80',
  'refugio-obsidiana': 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&h=320&q=80',
  'falesia-atlantica': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&h=320&q=80',
};

async function sendConfirmationEmail(lead: any) {
  try {
    const lang = lead.language || 'es';
    const i18n = EMAIL_I18N[lang] || EMAIL_I18N.es;
    const refugeName = REFUGE_NAMES[lead.preferredRefuge] || lead.preferredRefuge;
    const refugeImage = REFUGE_IMAGES[lead.preferredRefuge] || REFUGE_IMAGES['refugi-canigo'];
    
    const guestEmail = (lead.email && lead.email.includes('@') && !lead.email.includes('ejemplo.com') && !lead.email.includes('d@d.co') && !lead.email.includes('a@a.c'))
      ? lead.email
      : OPERATOR_EMAIL;

    const bccList = (guestEmail.toLowerCase() !== OPERATOR_EMAIL.toLowerCase()) ? [OPERATOR_EMAIL] : [];

    const htmlContent = `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${i18n.subject(lead.fullName, refugeName)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0f0d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0a0f0d; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #131c17; border: 1px solid #c5a059; border-radius: 18px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.6);">
          
          <!-- Sanctuary Hero Photo Header -->
          <tr>
            <td style="padding: 0; line-height: 0; background-color: #0a0f0d; position: relative;">
              <img src="${refugeImage}" alt="${refugeName}" width="580" height="220" style="display: block; width: 100%; max-width: 580px; height: 220px; object-fit: cover; border-top-left-radius: 17px; border-top-right-radius: 17px;" />
            </td>
          </tr>

          <!-- Brand Header -->
          <tr>
            <td style="padding: 24px 24px 12px 24px; text-align: center;">
              <div style="display: inline-block; padding: 6px 16px; background-color: #231b0b; border: 1px solid #c5a059; border-radius: 9999px; margin-bottom: 12px;">
                <span style="color: #e5c07b; font-size: 10px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;">
                  ${i18n.badge}
                </span>
              </div>
              <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; margin: 4px 0 4px 0; font-family: 'Georgia', serif;">
                Experiencias con Estilo
              </h1>
              <p style="color: #c5a059; font-size: 12px; margin: 0; font-style: italic; letter-spacing: 0.02em;">
                ${i18n.tagline}
              </p>
            </td>
          </tr>

          <!-- Greeting Body -->
          <tr>
            <td style="padding: 12px 28px; color: #d1d5db; font-size: 13px; line-height: 1.65;">
              <p style="margin: 0 0 14px 0; font-size: 14px; color: #ffffff;">
                ${i18n.greeting(lead.fullName)}
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 13px; font-weight: 300;">
                ${i18n.intro}
              </p>
            </td>
          </tr>

          <!-- Luxury Voucher Box -->
          <tr>
            <td style="padding: 16px 28px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0b110e; border: 1px solid #233529; border-radius: 14px; padding: 18px 20px;">
                <tr>
                  <td colspan="2" style="padding-bottom: 12px; border-bottom: 1px solid #1c2b21;">
                    <span style="color: #e5c07b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">
                      ${i18n.summaryTitle}
                    </span>
                  </td>
                </tr>

                <!-- Sanctuary Item -->
                <tr>
                  <td colspan="2" style="padding: 12px 0 10px 0; border-bottom: 1px solid #152219;">
                    <span style="display: block; font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 3px;">
                      ${i18n.sanctuaryLabel}
                    </span>
                    <span style="display: block; font-size: 15px; font-weight: 700; color: #ffffff; font-family: 'Georgia', serif;">
                      🌿 ${refugeName}
                    </span>
                  </td>
                </tr>

                <!-- Dates Item -->
                <tr>
                  <td width="50%" style="padding: 10px 10px 10px 0; border-bottom: 1px solid #152219; vertical-align: top;">
                    <span style="display: block; font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 3px;">
                      ${i18n.datesLabel}
                    </span>
                    <span style="display: block; font-size: 13px; font-weight: 700; color: #e5c07b;">
                      📅 ${lead.checkIn || 'A convenir'} al ${lead.checkOut || '...'}
                    </span>
                  </td>
                  <td width="50%" style="padding: 10px 0 10px 10px; border-bottom: 1px solid #152219; vertical-align: top;">
                    <span style="display: block; font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 3px;">
                      ${i18n.guestsLabel}
                    </span>
                    <span style="display: block; font-size: 13px; font-weight: 700; color: #ffffff;">
                      👥 ${lead.guests} personas
                    </span>
                  </td>
                </tr>

                <!-- Contact & Preferences -->
                <tr>
                  <td width="50%" style="padding: 10px 10px 0 0; vertical-align: top;">
                    <span style="display: block; font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 3px;">
                      ${i18n.contactLabel}
                    </span>
                    <span style="display: block; font-size: 12px; font-weight: 500; color: #e5e7eb;">
                      📱 ${lead.phone || '-'}<br>✉️ ${lead.email || '-'}
                    </span>
                  </td>
                  <td width="50%" style="padding: 10px 0 0 10px; vertical-align: top;">
                    <span style="display: block; font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 3px;">
                      ${i18n.prefsLabel}
                    </span>
                    <span style="display: block; font-size: 12px; font-weight: 500; color: #d8f3dc;">
                      ${lead.pets ? i18n.petYes : i18n.petNo}<br>
                      ${lead.notes ? `📝 ${lead.notes}` : '✨ Estancia estándar'}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Concierge Commitment Alert -->
          <tr>
            <td style="padding: 6px 28px 20px 28px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #1e190d; border-left: 4px solid #c5a059; border-radius: 8px; padding: 12px 16px;">
                <tr>
                  <td style="color: #f3e8d2; font-size: 12px; line-height: 1.55;">
                    ${i18n.commitment}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Direct WhatsApp CTA Button -->
          <tr>
            <td style="padding: 0 28px 28px 28px; text-align: center;">
              <a href="https://wa.me/5493541664488?text=Hola%2C%20acabo%20de%20enviar%20mi%20solicitud%20para%20${encodeURIComponent(refugeName)}%20a%20nombre%20de%20${encodeURIComponent(lead.fullName)}" target="_blank" style="display: inline-block; padding: 14px 28px; background-color: #1b4332; color: #ffffff; border: 1px solid #2d6a4f; border-radius: 12px; font-weight: 700; font-size: 13px; text-decoration: none; letter-spacing: 0.02em; box-shadow: 0 4px 15px rgba(27,67,50,0.5);">
                ${i18n.whatsappBtn}
              </a>
            </td>
          </tr>

          <!-- CRM Link & Legal Transparency Footer -->
          <tr>
            <td style="padding: 16px 28px; background-color: #0b110e; border-top: 1px solid #1c2b21; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 11px; color: #9ca3af;">
                ${i18n.footerRights}
              </p>
              <a href="https://hotel-crm-five-gold.vercel.app/leads" style="font-size: 10px; color: #c5a059; text-decoration: underline;">
                ${i18n.crmLink}
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Experiencias con Estilo <reservas@experienciasconestilo.com>',
        to: [guestEmail],
        reply_to: 'reservas@experienciasconestilo.com',
        ...(bccList.length > 0 ? { bcc: bccList } : {}),
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
