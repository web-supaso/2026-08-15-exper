import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

// Auto-load .env.local and .env in development
function loadEnv() {
  const envFiles = [".env.local", ".env"];
  for (const file of envFiles) {
    const fullPath = path.resolve(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      const lines = fs.readFileSync(fullPath, "utf-8").split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  }
}
loadEnv();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory CRM Lead storage
  const leadsCRM: Array<{
    id: string;
    fullName: string;
    email: string;
    phone: string;
    preferredRefuge: string;
    checkIn?: string;
    checkOut?: string;
    guests: number;
    travelStyle: string;
    pets: boolean;
    notes?: string;
    language: string;
    createdAt: string;
  }> = [];

  // API Health Check Endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Experiencias con Estilo API", timestamp: new Date().toISOString() });
  });

  // API Leads CRM Endpoint (Simulating Google Sheets CRM Sync)
  app.post("/api/leads", async (req, res) => {
    try {
      const { fullName, email, phone, preferredRefuge, checkIn, checkOut, guests, travelStyle, pets, notes, language } = req.body;
      
      const newLead = {
        id: `lead_${Date.now()}`,
        fullName: fullName || "Anónimo",
        email: email || "no-email@domain.com",
        phone: phone || "",
        preferredRefuge: preferredRefuge || "refugi-canigo",
        checkIn,
        checkOut,
        guests: guests || 2,
        travelStyle: travelStyle || "General",
        pets: !!pets,
        notes: notes || "",
        language: language || "es",
        createdAt: new Date().toISOString(),
      };

      leadsCRM.push(newLead);
      console.log("[CRM Leads] New lead registered successfully:", newLead);

      // Forward directly to Supabase CRM
      try {
        const CRM_PROPERTY_MAP: Record<string, string> = {
          'refugi-canigo': 'bbbb0001-0000-0000-0000-000000000001',
          'el-nido-del-estrecho': 'bbbb0002-0000-0000-0000-000000000002',
          'nido-estrecho': 'bbbb0002-0000-0000-0000-000000000002',
          'refugio-obsidiana': 'bbbb0003-0000-0000-0000-000000000003',
          'falesia-atlantica': 'bbbb0004-0000-0000-0000-000000000004',
        };
        const propertyId = CRM_PROPERTY_MAP[preferredRefuge] || 'bbbb0001-0000-0000-0000-000000000001';
        
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
        console.log("[CRM Leads] Sincronizado exitosamente con Supabase CRM.");
      } catch (crmErr) {
        console.warn("[CRM Leads] Warning enviando a Supabase:", crmErr);
      }

      // Enviar email de confirmación con Resend (con soporte Multiidioma)
      try {
        const REFUGE_NAMES: Record<string, string> = {
          'refugi-canigo': 'Refugi del Canigó (Pirineos Orientales)',
          'el-nido-del-estrecho': 'El Nido del Estrecho (Tarifa / Gibraltar)',
          'nido-estrecho': 'El Nido del Estrecho (Tarifa / Gibraltar)',
          'refugio-obsidiana': 'El Refugio de Obsidiana (Serranía de Albarracín)',
          'falesia-atlantica': 'Falesia Atlántica (Costa Vicentina, Portugal)',
        };

        const EMAIL_I18N: Record<string, any> = {
          es: {
            subject: (name: string, refuge: string) => `✨ Solicitud Recibida: ${name} — ${refuge}`,
            badge: '✨ Solicitud de Reserva • En Revisión Concierge',
            tagline: '"Santuarios de descanso y naturaleza salvaje"',
            greeting: (name: string) => `Hola <strong>${name}</strong>,`,
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
            subject: (name: string, refuge: string) => `✨ Booking Request Received: ${name} — ${refuge}`,
            badge: '✨ Booking Request • Under Concierge Review',
            tagline: '"Sanctuaries of rest and wild nature"',
            greeting: (name: string) => `Hello <strong>${name}</strong>,`,
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
            subject: (name: string, refuge: string) => `✨ Demande Reçue : ${name} — ${refuge}`,
            badge: '✨ Demande de Réservation • En Cours d\'Examen Concierge',
            tagline: '"Sanctuaires de repos et de nature sauvage"',
            greeting: (name: string) => `Bonjour <strong>${name}</strong>,`,
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
            subject: (name: string, refuge: string) => `✨ Sol·licitud Rebuda: ${name} — ${refuge}`,
            badge: '✨ Sol·licitud de Reserva • En Revisió Concierge',
            tagline: '"Santuaris de descans i natura salvatge"',
            greeting: (name: string) => `Hola <strong>${name}</strong>,`,
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
            subject: (name: string, refuge: string) => `✨ Solicitação Recebida: ${name} — ${refuge}`,
            badge: '✨ Solicitação de Reserva • Em Revisão Concierge',
            tagline: '"Santuários de descanso e natureza selvagem"',
            greeting: (name: string) => `Olá <strong>${name}</strong>,`,
            intro: 'Recebemos sua solicitação de estadia. Para garantir o silêncio e a exclusividade de cada santuário, gerenciamos cada reserva de forma personalizada.',
            summaryTitle: '📋 Resumo da sua Solicitação',
            sanctuaryLabel: 'Santuário Seleccionado',
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

        const lang = newLead.language || 'es';
        const i18n = EMAIL_I18N[lang] || EMAIL_I18N.es;
        const refugeName = REFUGE_NAMES[newLead.preferredRefuge] || newLead.preferredRefuge;
        
        const recipients: string[] = [];
        if (newLead.email && newLead.email.includes('@') && !newLead.email.includes('ejemplo.com') && !newLead.email.includes('d@d.co') && !newLead.email.includes('a@a.c')) {
          recipients.push(newLead.email);
        }
        recipients.push('reservas@experienciasconestilo.com');
        recipients.push('estiloexperiencias@gmail.com');

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY || ''}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Experiencias con Estilo <reservas@experienciasconestilo.com>',
            to: recipients,
            subject: i18n.subject(newLead.fullName, refugeName),
            html: `
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
                    ${i18n.greeting(newLead.fullName)}<br><br>
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
                      <span style="display: block; font-size: 14px; font-weight: bold; color: #e5c07b;">${newLead.checkIn} al ${newLead.checkOut}</span>
                    </div>

                    <div style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #1f2d24;">
                      <span style="display: block; font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">${i18n.guestsLabel}</span>
                      <span style="display: block; font-size: 14px; font-weight: bold; color: #ffffff;">${newLead.guests} personas</span>
                    </div>

                    <div style="margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #1f2d24;">
                      <span style="display: block; font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">${i18n.contactLabel}</span>
                      <span style="display: block; font-size: 13px; font-weight: bold; color: #ffffff;">${newLead.phone || '-'} • ${newLead.email || '-'}</span>
                    </div>

                    <div>
                      <span style="display: block; font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">${i18n.prefsLabel}</span>
                      <span style="display: block; font-size: 13px; font-weight: 500; color: #d8f3dc;">${newLead.pets ? i18n.petYes : i18n.petNo} • ${newLead.notes || 'Estándar'}</span>
                    </div>
                  </div>
                  <div style="background-color: #231b0b; border-left: 3px solid #c5a059; padding: 12px 14px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="font-size: 12px; color: #f3e8d2; margin: 0; line-height: 1.5;">
                      ${i18n.commitment}
                    </p>
                  </div>
                  <div style="text-align: center; padding-top: 6px;">
                    <a href="https://wa.me/5493541664488?text=Hola%2C%20acabo%20de%20enviar%20mi%20solicitud%20para%20${encodeURIComponent(refugeName)}%20a%20nombre%20de%20${encodeURIComponent(newLead.fullName)}" style="display: inline-block; padding: 12px 24px; background-color: #c5a059; color: #0e1713; font-weight: bold; font-size: 13px; text-decoration: none; border-radius: 10px;">
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
            `,
          }),
        });
        console.log("[Resend Email] Email de confirmación i18n enviado exitosamente a estiloexperiencias@gmail.com");
      } catch (emailErr) {
        console.warn("[Resend Email] Error enviando email:", emailErr);
      }

      // Enviar alerta instantánea por Telegram al Operador
      try {
        const REFUGE_NAMES: Record<string, string> = {
          'refugi-canigo': 'Refugi del Canigó (Pirineos Orientales)',
          'el-nido-del-estrecho': 'El Nido del Estrecho (Tarifa / Gibraltar)',
          'nido-estrecho': 'El Nido del Estrecho (Tarifa / Gibraltar)',
          'refugio-obsidiana': 'El Refugio de Obsidiana (Serranía de Albarracín)',
          'falesia-atlantica': 'Falesia Atlántica (Costa Vicentina, Portugal)',
        };
        const refugeName = REFUGE_NAMES[newLead.preferredRefuge] || newLead.preferredRefuge;
        const text = `🛎️ *NUEVA SOLICITUD DE RESERVA CONCIERGE*

👤 *Huésped:* ${newLead.fullName}
📍 *Santuario:* ${refugeName}
📅 *Fechas:* ${newLead.checkIn} al ${newLead.checkOut}
👥 *Huéspedes:* ${newLead.guests} personas
📱 *Teléfono:* ${newLead.phone || 'No especificado'}
✉️ *Email:* ${newLead.email || 'No especificado'}
🐾 *Preferencias:* ${newLead.pets ? 'Con mascota' : 'Sin mascota'} • ${newLead.notes || 'Estándar'}

⚡ *Compromiso Concierge:* Responder en menos de 4 horas.`;

        const cleanPhone = (newLead.phone || '').replace(/[^0-9]/g, '');
        const waUrl = cleanPhone
          ? `https://wa.me/${cleanPhone}?text=Hola%20${encodeURIComponent(newLead.fullName)}%2C%20te%20escribo%20del%20equipo%20de%20Concierge%20de%20Experiencias%20con%20Estilo%20respecto%20a%20tu%20solicitud%20para%20el%20${encodeURIComponent(refugeName)}...`
          : 'https://hotel-crm-five-gold.vercel.app/leads';

        await fetch('https://api.telegram.org/bot8952234866:AAFw4WIwrbzBO6GVq7GXtN55dOdXrP18AhE/sendMessage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: '5005671664',
            text,
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [{ text: '💬 Abrir WhatsApp del Huésped', url: waUrl }],
                [{ text: '📊 Ver en el CRM de Hoteles', url: 'https://hotel-crm-five-gold.vercel.app/leads' }],
              ],
            },
          }),
        });
        console.log("[Telegram Alert] Alerta enviada al bot del operador con éxito.");
      } catch (tgErr) {
        console.warn("[Telegram Alert] Error enviando alerta:", tgErr);
      }

      res.status(201).json({
        success: true,
        message: "Solicitud registrada, email enviado y alerta push enviada a Telegram.",
        leadId: newLead.id,
        crmStatus: "Sincronizado con Supabase CRM, Resend y Telegram en tiempo real",
      });
    } catch (err: any) {
      console.error("Error saving lead:", err);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });

  // In-memory Error Telemetry tracking
  const errorLogs: Array<{
    id: string;
    message: string;
    stack?: string;
    url?: string;
    userAgent?: string;
    timestamp: string;
  }> = [];

  // API Endpoint to fetch leads list for concierge testing
  app.get("/api/leads", (req, res) => {
    res.json({ count: leadsCRM.length, leads: leadsCRM });
  });

  // API Telemetry Endpoint to receive runtime error reports from production clients
  app.post("/api/telemetry/errors", (req, res) => {
    try {
      const { message, stack, url, userAgent } = req.body || {};
      const newErrorLog = {
        id: `err_${Date.now()}`,
        message: message || "Unknown error",
        stack: stack || "",
        url: url || "",
        userAgent: userAgent || req.headers["user-agent"] || "",
        timestamp: new Date().toISOString(),
      };
      errorLogs.unshift(newErrorLog);
      if (errorLogs.length > 100) errorLogs.pop(); // keep last 100
      console.warn("[Telemetry Error Logged]:", newErrorLog);
      res.json({ status: "received", id: newErrorLog.id });
    } catch {
      res.status(500).json({ status: "error" });
    }
  });

  // API Endpoint to inspect telemetry error logs
  app.get("/api/telemetry/errors", (req, res) => {
    res.json({ count: errorLogs.length, errors: errorLogs });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(
      express.static(distPath, {
        setHeaders: (res, filePath) => {
          if (filePath.endsWith(".html")) {
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            res.setHeader("Pragma", "no-cache");
            res.setHeader("Expires", "0");
          } else if (filePath.includes("assets")) {
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          }
        },
      })
    );
    app.get("*", (req, res) => {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Experiencias con Estilo] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
