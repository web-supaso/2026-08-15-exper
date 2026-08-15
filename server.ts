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
  app.post("/api/leads", (req, res) => {
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

      res.status(201).json({
        success: true,
        message: "Solicitud registrada con éxito en el sistema Concierge & CRM",
        leadId: newLead.id,
        crmStatus: "Google Sheets Sync Simulated (Live)",
      });
    } catch (err: any) {
      console.error("Error saving lead:", err);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });

  // API Endpoint to fetch leads list for concierge testing
  app.get("/api/leads", (req, res) => {
    res.json({ count: leadsCRM.length, leads: leadsCRM });
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
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Experiencias con Estilo] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
