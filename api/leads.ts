import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory / serverless storage for leads
const leads: any[] = [];

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
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
    console.log('[Vercel Serverless CRM] Nuevo lead recibido:', newLead);

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
