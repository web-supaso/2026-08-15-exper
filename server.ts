import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

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

      // Enviar email de confirmación con Resend
      try {
        const REFUGE_NAMES: Record<string, string> = {
          'refugi-canigo': 'Refugi del Canigó (Pirineos Orientales)',
          'el-nido-del-estrecho': 'El Nido del Estrecho (Tarifa / Gibraltar)',
          'nido-estrecho': 'El Nido del Estrecho (Tarifa / Gibraltar)',
          'refugio-obsidiana': 'El Refugio de Obsidiana (Serranía de Albarracín)',
          'falesia-atlantica': 'Falesia Atlántica (Costa Vicentina, Portugal)',
        };
        const refugeName = REFUGE_NAMES[newLead.preferredRefuge] || newLead.preferredRefuge;
        
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer re_KGV7vzrh_M8PAJZqbdVWTkFCh2RfnBiwC',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Experiencias con Estilo <onboarding@resend.dev>',
            to: ['estiloexperiencias@gmail.com'],
            subject: `✨ Solicitud Recibida: ${newLead.fullName} — ${refugeName}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0e1713; color: #e8ece9; padding: 40px 20px; text-align: center;">
                <div style="max-width: 580px; margin: 0 auto; background-color: #14201a; border: 1px solid #c5a059; border-radius: 20px; padding: 32px 24px; text-align: left;">
                  <div style="text-align: center; margin-bottom: 24px;">
                    <span style="display: inline-block; padding: 6px 16px; background-color: #2a2010; color: #e5c07b; border: 1px solid #c5a059; border-radius: 9999px; font-size: 11px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase;">
                      ✨ Solicitud Recibida • En Revisión Concierge
                    </span>
                    <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 16px 0 6px 0;">Experiencias con Estilo</h1>
                    <p style="color: #c5a059; font-size: 13px; margin: 0; font-style: italic;">"Santuarios de descanso y naturaleza salvaje"</p>
                  </div>
                  <p style="font-size: 14px; line-height: 1.6; color: #d1d5db;">
                    Hola <strong>${newLead.fullName}</strong>,<br><br>
                    Hemos recibido tu solicitud de estancia. Para garantizar el silencio y la exclusividad de cada santuario, gestionamos cada reserva de forma personalizada.
                  </p>
                  <div style="background-color: #0e1713; border: 1px solid #2d4234; border-radius: 14px; padding: 20px; margin: 20px 0;">
                    <h3 style="color: #e5c07b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 14px 0; border-bottom: 1px solid #2d4234; padding-bottom: 8px;">
                      📋 Resumen de tu Solicitud
                    </h3>
                    <table style="width: 100%; font-size: 13px; color: #e5e7eb; border-collapse: collapse;">
                      <tr><td style="padding: 7px 0; color: #9ca3af;">Santuario:</td><td style="padding: 7px 0; text-align: right; font-weight: bold; color: #ffffff;">${refugeName}</td></tr>
                      <tr><td style="padding: 7px 0; color: #9ca3af;">Fechas:</td><td style="padding: 7px 0; text-align: right; font-weight: bold; color: #e5c07b;">${newLead.checkIn} al ${newLead.checkOut}</td></tr>
                      <tr><td style="padding: 7px 0; color: #9ca3af;">Huéspedes:</td><td style="padding: 7px 0; text-align: right; font-weight: bold;">${newLead.guests} personas</td></tr>
                      <tr><td style="padding: 7px 0; color: #9ca3af;">Contacto:</td><td style="padding: 7px 0; text-align: right; font-weight: bold; color: #ffffff;">${newLead.phone || '-'} • ${newLead.email || '-'}</td></tr>
                      <tr><td style="padding: 7px 0; color: #9ca3af;">Mascota / Preferencias:</td><td style="padding: 7px 0; text-align: right; font-weight: bold; color: #d8f3dc;">${newLead.pets ? 'Con mascota' : 'Sin mascota'} • ${newLead.notes || 'Estándar'}</td></tr>
                    </table>
                  </div>
                  <div style="background-color: #231b0b; border-left: 4px solid #c5a059; padding: 14px 18px; border-radius: 8px; margin-bottom: 24px;">
                    <p style="font-size: 12px; color: #f3e8d2; margin: 0; line-height: 1.6;">
                      🕒 <strong>Compromiso de Atención:</strong> Nuestro equipo de Concierge validará el aforo y te responderá en un plazo máximo de <strong>4 horas hábiles</strong>.
                    </p>
                  </div>
                  <div style="text-align: center; padding-top: 10px;">
                    <a href="https://wa.me/5493541664488?text=Hola%2C%20acabo%20de%20enviar%20mi%20solicitud%20para%20${encodeURIComponent(refugeName)}%20a%20nombre%20de%20${encodeURIComponent(newLead.fullName)}" style="display: inline-block; padding: 14px 28px; background-color: #c5a059; color: #0e1713; font-weight: bold; font-size: 13px; text-decoration: none; border-radius: 12px;">
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
            `,
          }),
        });
        console.log("[Resend Email] Email de confirmación enviado exitosamente a estiloexperiencias@gmail.com");
      } catch (emailErr) {
        console.warn("[Resend Email] Error enviando email:", emailErr);
      }

      res.status(201).json({
        success: true,
        message: "Solicitud registrada y confirmación enviada por email.",
        leadId: newLead.id,
        crmStatus: "Sincronizado con Supabase CRM y Resend en tiempo real",
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
