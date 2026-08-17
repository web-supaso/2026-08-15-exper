import type { VercelRequest, VercelResponse } from '@vercel/node';

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

// In-memory serverless storage for quick debug
const leads: any[] = [];

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

    // Forward to Supabase CRM database
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

    return res.status(201).json({
      success: true,
      message: 'Solicitud registrada con éxito en el sistema Concierge & CRM',
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
