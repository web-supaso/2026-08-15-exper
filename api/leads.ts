import type { VercelRequest, VercelResponse } from '@vercel/node';

const RESEND_API_KEY = 're_KGV7vzrh_M8PAJZqbdVWTkFCh2RfnBiwC';
const OPERATOR_EMAIL = 'estiloexperiencias@gmail.com';
const OPERATOR_PHONE = '+5493541664488';

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

const leads: any[] = [];

async function sendConfirmationEmail(lead: any) {
  try {
    const refugeName = REFUGE_NAMES[lead.preferredRefuge] || lead.preferredRefuge;
    
    // In Resend onboarding mode, emails go to the verified account (estiloexperiencias@gmail.com)
    const recipients = [OPERATOR_EMAIL];

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0e1713; color: #e8ece9; padding: 40px 20px; text-align: center;">
        <div style="max-width: 580px; margin: 0 auto; background-color: #14201a; border: 1px solid #c5a059; border-radius: 20px; padding: 32px 24px; text-align: left; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
          
          <div style="text-align: center; margin-bottom: 24px;">
            <span style="display: inline-block; padding: 6px 16px; background-color: #2a2010; color: #e5c07b; border: 1px solid #c5a059; border-radius: 9999px; font-size: 11px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase;">
              ✨ Solicitud de Reserva • En Revisión Concierge
            </span>
            <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 16px 0 6px 0;">Experiencias con Estilo</h1>
            <p style="color: #c5a059; font-size: 13px; margin: 0; font-style: italic;">"Santuarios de descanso y naturaleza salvaje"</p>
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;">
            Hola <strong>${lead.fullName}</strong>,<br><br>
            Hemos recibido tu solicitud de estancia. Para garantizar el silencio y la exclusividad de cada santuario, gestionamos cada reserva de forma personalizada.
          </p>

          <div style="background-color: #0e1713; border: 1px solid #2d4234; border-radius: 14px; padding: 20px; margin: 20px 0;">
            <h3 style="color: #e5c07b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 16px 0; border-bottom: 1px solid #2d4234; padding-bottom: 8px;">
              📋 Resumen de tu Solicitud
            </h3>
            
            <div style="margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid #1f2d24;">
              <span style="display: block; font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Santuario Seleccionado</span>
              <span style="display: block; font-size: 15px; font-weight: bold; color: #ffffff;">${refugeName}</span>
            </div>

            <div style="margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid #1f2d24;">
              <span style="display: block; font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Fechas de Estancia</span>
              <span style="display: block; font-size: 14px; font-weight: bold; color: #e5c07b;">${lead.checkIn} al ${lead.checkOut}</span>
            </div>

            <div style="margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid #1f2d24;">
              <span style="display: block; font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Huéspedes</span>
              <span style="display: block; font-size: 14px; font-weight: bold; color: #ffffff;">${lead.guests} personas</span>
            </div>

            <div style="margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid #1f2d24;">
              <span style="display: block; font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Datos de Contacto</span>
              <span style="display: block; font-size: 13px; font-weight: bold; color: #ffffff;">${lead.phone || '-'} • ${lead.email || '-'}</span>
            </div>

            <div>
              <span style="display: block; font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Preferencias & Ocasión</span>
              <span style="display: block; font-size: 13px; font-weight: 500; color: #d8f3dc;">${lead.pets ? '🐾 Con mascota' : 'Sin mascota'} • ${lead.notes || 'Estándar'}</span>
            </div>
          </div>

          <div style="background-color: #231b0b; border-left: 4px solid #c5a059; padding: 14px 18px; border-radius: 8px; margin-bottom: 24px;">
            <p style="font-size: 12px; color: #f3e8d2; margin: 0; line-height: 1.6;">
              🕒 <strong>Compromiso de Atención:</strong> Nuestro equipo de Concierge validará el aforo y te responderá en un plazo máximo de <strong>4 horas hábiles</strong> con la propuesta y confirmación de tu estancia.
            </p>
          </div>

          <div style="text-align: center; padding-top: 10px;">
            <a href="https://wa.me/5493541664488?text=Hola%2C%20acabo%20de%20enviar%20mi%20solicitud%20para%20${encodeURIComponent(refugeName)}%20a%20nombre%20de%20${encodeURIComponent(lead.fullName)}" style="display: inline-block; padding: 14px 28px; background-color: #c5a059; color: #0e1713; font-weight: bold; font-size: 13px; text-decoration: none; border-radius: 12px; box-shadow: 0 4px 12px rgba(197,160,89,0.3);">
              💬 Contactar con Concierge por WhatsApp
            </a>
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #2d4234; text-align: center;">
            <a href="https://hotel-crm-five-gold.vercel.app/leads" style="font-size: 11px; color: #9ca3af; text-decoration: underline;">
              Acceso a Intranet CRM
            </a>
          </div>
        </div>

        <p style="font-size: 11px; color: #6b7280; margin-top: 24px;">
          © ${new Date().getFullYear()} Experiencias con Estilo • Diseñado con pasión por Marketing Amable
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
        from: 'Experiencias con Estilo <onboarding@resend.dev>',
        to: recipients,
        subject: `✨ Solicitud Recibida: ${lead.fullName} — ${refugeName}`,
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

    // 2. Send luxury confirmation email via Resend
    await sendConfirmationEmail(newLead);

    return res.status(201).json({
      success: true,
      message: 'Solicitud registrada y confirmación enviada por email.',
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
