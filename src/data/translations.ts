import { Language } from '../types';

export interface TranslationDictionary {
  brandName: string;
  brandTagline: string;
  nav: {
    philosophy: string;
    refuges: string;
    pact: string;
    faq: string;
    partners: string;
    seoAudit: string;
    book: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badge: string;
    stat1Label: string;
    stat1Value: string;
    stat2Label: string;
    stat2Value: string;
    stat3Label: string;
    stat3Value: string;
    bookingBar: {
      sanctuaryLabel: string;
      entryLabel: string;
      exitLabel: string;
      checkBtn: string;
      guaranteeText: string;
      sanctuaryCanigo: string;
      sanctuaryObsidiana: string;
      sanctuaryFalesia: string;
      sanctuaryEstrecho: string;
    };
  };
  manifesto: {
    badge: string;
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    p3: string;
    causeBadge: string;
    villainTitle: string;
    villainP: string;
    protectedHaText: string;
    sustainableBadge: string;
    values: {
      title: string;
      desc: string;
      icon: string;
    }[];
  };
  refugesSection: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterPetFriendly: string;
    filterAdultsOnly: string;
    filterStarlight: string;
    filterWater: string;
    petBadge: string;
    adultsBadge: string;
    viewDetails: string;
    bookNow: string;
    perNight: string;
    from: string;
  };
  quizSection: {
    badge: string;
    title: string;
    subtitle: string;
    q1: string;
    q1Options: {
      id: string;
      title: string;
      desc: string;
      icon: string;
      targetId: string;
    }[];
    resultTitle: string;
    resultCta: string;
    findRefugeBtn: string;
    floatingBtn: string;
  };
  pact: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      title: string;
      desc: string;
      icon: string;
    }[];
  };
  faqSection: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    aiBadge: string;
    keywordsLabel: string;
  };
  partnersSection: {
    badge: string;
    title: string;
    subtitle: string;
    km0Badge: string;
  };
  seoModal: {
    title: string;
    subtitle: string;
    tabSchema: string;
    tabMeta: string;
    tabAiGeoseo: string;
    copySchema: string;
    copied: string;
  };
  refugeModal: {
    conceptTitle: string;
    maxGuestsLabel: string;
    guestsUnit: string;
    accessLabel: string;
    footAccess: string;
    carAccess: string;
    petsLabel: string;
    petsAllowed: string;
    petsNotAllowed: string;
    nightRateLabel: string;
    amenitiesTitle: string;
    highlightsTitle: string;
    bookConciergeBtn: string;
  };
  bookingModal: {
    conciergeBadge: string;
    title: string;
    subtitle: string;
    fieldName: string;
    fieldEmail: string;
    fieldPhone: string;
    fieldRefuge: string;
    fieldDates: string;
    entryDateLabel: string;
    exitDateLabel: string;
    fieldGuests: string;
    guestOptions: {
      val: number;
      label: string;
    }[];
    fieldStyle: string;
    fieldPets: string;
    petOptionYes: string;
    petOptionNo: string;
    fieldNotes: string;
    notesPlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    backBtn: string;
  };
  cookieBanner: {
    title: string;
    description: string;
    acceptAll: string;
    onlyEssential: string;
  };
  footer: {
    tagline: string;
    umbrellaBrand: string;
    quickLinks: string;
    languages: string;
    legal: string;
    privacy: string;
    cookies: string;
    terms: string;
    copyright: string;
    crmNote: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  es: {
    brandName: "Experiencias con Estilo",
    brandTagline: "Viví lo extraordinario",
    nav: {
      philosophy: "Filosofía",
      refuges: "Los 4 Refugios",
      pact: "Pacto de Convivencia",
      faq: "Preguntas Frecuentes",
      partners: "Comunidad Local",
      seoAudit: "Auditoría SEO/IA",
      book: "Reservar / Concierge",
    },
    hero: {
      headline: "No vienes a dormir. Vienes a vivir una experiencia.",
      subheadline: "Cuatro refugios sostenibles y de ultra-exclusividad en Europa. Una misma promesa: lujo discreto, naturaleza regenerativa y el tiempo recuperado.",
      ctaPrimary: "Descubre tus Refugios",
      ctaSecondary: "Asesoramiento Concierge",
      badge: "Edición Limitada • Solo Reservas Directas",
      stat1Label: "Hectáreas Privadas",
      stat1Value: "60+",
      stat2Label: "Refugios Únicos",
      stat2Value: "4",
      stat3Label: "Silencio Garantizado",
      stat3Value: "100%",
      bookingBar: {
        sanctuaryLabel: "Santuario",
        entryLabel: "Entrada (Viernes)",
        exitLabel: "Salida (Domingo)",
        checkBtn: "Comprobar Disponibilidad",
        guaranteeText: "✓ Garantía de Precio Directo • Sin Comisiones Ocultas • Cancelación Flexible",
        sanctuaryCanigo: "Refugi del Canigó (280€/noche)",
        sanctuaryObsidiana: "Refugio de Obsidiana (350€/noche)",
        sanctuaryFalesia: "Falesia Atlántica (420€/noche)",
        sanctuaryEstrecho: "El Nido del Estrecho (480€/noche)",
      },
    },
    manifesto: {
      badge: "Manifiesto de Marca",
      title: "El Manifiesto del Lujo Consciente",
      subtitle: "El verdadero lujo no es acumular. Es poder escuchar el sonido del viento sin interferencias.",
      p1: "Vivimos sumergidos en un mundo saturado de prisa, pantallas y turismo industrial masificado. Lugares fotocopiados donde la experiencia original ha sido reemplazada por colas y consumo rápido.",
      p2: "En Experiencias con Estilo nos rebelamos contra el 'greenwashing' y el turismo de masas. Hemos seleccionado y protegido cuatro rincones sagrados de Europa para devolverles su propósito original.",
      p3: "No vendemos noches de hotel. Custodiamos santuarios donde la arquitectura dialoga con el bosque, el cielo nocturno y el océano.",
      causeBadge: "Nuestra Causa",
      villainTitle: "Nuestra Declaración contra el Turismo Masivo",
      villainP: "Luchamos contra la despersonalización del viaje. Rechazamos los complejos masificados, los alojamientos con sello 'eco' falso y la prisa urbana. Aquí el tiempo se mide en amaneceres y noches estrelladas.",
      protectedHaText: "Protegidas de la masificación",
      sustainableBadge: "100% Sostenible",
      values: [
        {
          title: "Turismo Regenerativo",
          desc: "Cada estancia financia la reforestación, conservación del río y energía limpia en la zona.",
          icon: "Leaf",
        },
        {
          title: "Silencio & Privacidad",
          desc: "Aforos estrictos y cupos hiper-limitados para preservar la paz silvestre.",
          icon: "VolumeX",
        },
        {
          title: "Arquitectura Integrada",
          desc: "Materiales nobles, piedra volcánica, madera tratada y huella de carbono neutra.",
          icon: "Home",
        },
      ],
    },
    refugesSection: {
      badge: "Experiencias con Estilo Collection",
      title: "Nuestra Colección de 4 Refugios",
      subtitle: "Cada ubicación es única, pero todas comparten el alma de Experiencias con Estilo.",
      filterAll: "Todos los Refugios",
      filterPetFriendly: "🐾 Pet Friendly",
      filterAdultsOnly: "🧘 Solo Adultos",
      filterStarlight: "🔭 Cielos Starlight",
      filterWater: "💧 Cascada y Río",
      petBadge: "🐾 Pet Friendly",
      adultsBadge: "🧘 Solo Adultos",
      viewDetails: "Ver Refugio Completo",
      bookNow: "Consultar Disponibilidad",
      perNight: "noche",
      from: "Desde",
    },
    quizSection: {
      badge: "Recomendador Concierge",
      title: "Buscador Inteligente de Experiencia",
      subtitle: "¿Qué estado de ánimo o descanso necesita tu cuerpo hoy?",
      q1: "Selecciona tu anhelo principal:",
      q1Options: [
        {
          id: "canigo",
          title: "Bosque, Cascadas y Energía Hidroeléctrica",
          desc: "Despertar junto al río con el rumor de la montaña en los Pirineos.",
          icon: "Trees",
          targetId: "refugi-canigo",
        },
        {
          id: "obsidiana",
          title: "Desconexión Total y Observación de Estrellas",
          desc: "Piedra volcánica, silencio absoluto en Teruel y Reserva Starlight.",
          icon: "Sparkles",
          targetId: "refugio-obsidiana",
        },
        {
          id: "falesia",
          title: "Acantilados Atlánticos y Gastronomía Km 0",
          desc: "Eco-lujo en la Costa Vicentina con pools de agua de mar temperada.",
          icon: "Waves",
          targetId: "falesia-atlantica",
        },
        {
          id: "estrecho",
          title: "Suite Histórica con Vistas a 2 Continentes",
          desc: "En el Peñón de Gibraltar, Upper Rock Nature Reserve con vistas 360º.",
          icon: "Compass",
          targetId: "nido-estrecho",
        },
      ],
      resultTitle: "Tu Refugio Ideal:",
      resultCta: "Explorar este Santuario",
      findRefugeBtn: "Encontrar este Refugio",
      floatingBtn: "Test de Saturación Digital",
    },
    pact: {
      badge: "Pacto de Convivencia",
      title: "Nuestro Pacto de Convivencia y Respeto",
      subtitle: "Normas simples e innegociables para proteger la serenidad de todos los huéspedes y de la fauna silvestre.",
      items: [
        {
          title: "Acceso Final a Pie",
          desc: "Tu vehículo descansa en nuestro parking seguro. El tramo final se recorre a pie para realizar la transición mental a la naturaleza.",
          icon: "Footprints",
        },
        {
          title: "Sagrado Silencio (22:00 h)",
          desc: "A partir de las 10 pm la naturaleza descansa. Se exige bajar el tono de voz y mantener la paz sonora en todo el dominio.",
          icon: "Volume2",
        },
        {
          title: "Desconexión Responsable & Huella Cero",
          desc: "Tratamiento de residuos en origen y prohibición de plásticos de un solo uso. La energía en Canigó procede de fuente hidroeléctrica propia.",
          icon: "ShieldCheck",
        },
        {
          title: "Convivencia con Mascotas",
          desc: "Refugi del Canigó y Falesia Atlántica son Pet Friendly respetuosos. Obsidiana y El Nido son espacios de máxima calma y no admiten animales.",
          icon: "HeartHandshake",
        },
      ],
    },
    faqSection: {
      title: "Preguntas Frecuentes y Respuestas Directas (GEO/AI)",
      subtitle: "Respuestas claras para viajeros exigentes y motores de búsqueda con IA.",
      searchPlaceholder: "Buscar duda (ej: cobertura, mascotas, niños, lluvia)...",
      aiBadge: "Estructurado para Google SGE & Perplexity AI",
      keywordsLabel: "Palabras clave IA:",
    },
    partnersSection: {
      badge: "Desarrollo Local & Sostenibilidad",
      title: "Nuestra Red de Alianzas Locales Km 0",
      subtitle: "El verdadero lujo es consumir lo fresco, apoyar al productor local y proteger el entorno.",
      km0Badge: "Sostenibilidad Verificada",
    },
    seoModal: {
      title: "Inspector de SEO Técnico & Datos Estructurados IA",
      subtitle: "Comprueba cómo Google y modelos de lenguaje (ChatGPT, Perplexity, Gemini) interpretan Experiencias con Estilo.",
      tabSchema: "Schema.org (JSON-LD)",
      tabMeta: "Meta Tags Multilingües",
      tabAiGeoseo: "Métricas GEO / AI Authority",
      copySchema: "Copiar JSON-LD",
      copied: "¡Copiado!",
    },
    refugeModal: {
      conceptTitle: "El Concepto y la Experiencia",
      maxGuestsLabel: "Aforo Máximo",
      guestsUnit: "Personas",
      accessLabel: "Acceso",
      footAccess: "👣 A Pie (Parking 300m)",
      carAccess: "Coche hasta puerta",
      petsLabel: "Mascotas",
      petsAllowed: "🐾 Permitidas",
      petsNotAllowed: "🚫 No admitidas",
      nightRateLabel: "Tarifa Noche",
      amenitiesTitle: "Equipamiento & Detalles Únicos",
      highlightsTitle: "Puntos Destacados",
      bookConciergeBtn: "Solicitar Disponibilidad Concierge",
    },
    bookingModal: {
      conciergeBadge: "Atención Exclusiva Concierge",
      title: "Solicitud Directa a Concierge",
      subtitle: "Gestionamos tus fechas de forma personalizada a través de nuestro sistema de reservas exclusivo.",
      fieldName: "Nombre Completo",
      fieldEmail: "Correo Electrónico",
      fieldPhone: "Teléfono / WhatsApp",
      fieldRefuge: "Refugio Seleccionado",
      fieldDates: "Fechas Estimadas",
      entryDateLabel: "Entrada Estimada",
      exitDateLabel: "Salida Estimada",
      fieldGuests: "Número de Huéspedes",
      guestOptions: [
        { val: 1, label: "1 Persona (Retiro Solo)" },
        { val: 2, label: "2 Personas (Pareja / Pareja + Bebé)" },
        { val: 3, label: "3 Personas" },
        { val: 4, label: "4 Personas (Familia)" },
      ],
      fieldStyle: "Motivo del Viaje",
      fieldPets: "¿Viajas con mascota?",
      petOptionYes: "Sí, llevo mascota",
      petOptionNo: "No",
      fieldNotes: "Peticiones especiales o comentarios",
      notesPlaceholder: "Comentarios sobre alergias, sorpresas de aniversario o preferencias especiales...",
      submit: "Enviar Solicitud a Concierge",
      submitting: "Procesando solicitud...",
      successTitle: "¡Solicitud Registrada con Éxito!",
      successMessage: "Tu preferencia ha sido enviada a nuestro equipo de Concierge. Te responderemos en menos de 4 horas con disponibilidad exacta y detalles personalizados.",
      backBtn: "Volver a la Web",
    },
    cookieBanner: {
      title: "Privacidad y Experiencia Consciente",
      description: "Utilizamos cookies estrictamente esenciales y telemetría anónima de primera parte para garantizar la fluidez en tus reservas sin comercializar tus datos.",
      acceptAll: "Aceptar Experiencia Completa",
      onlyEssential: "Solo Esenciales",
    },
    footer: {
      tagline: "No vienes a dormir. Vienes a vivir una experiencia.",
      umbrellaBrand: "Experiencias con Estilo",
      quickLinks: "Refugios Exclusivos",
      languages: "Idiomas Disponibles",
      legal: "Aviso Legal",
      privacy: "Política de Privacidad",
      cookies: "Política de Cookies",
      terms: "Términos y Condiciones",
      copyright: "© 2026 Experiencias con Estilo. Todos los derechos reservados.",
      crmNote: "Integrado con Sistema de Reservas & CRM Directo.",
    },
  },
  en: {
    brandName: "Experiencias con Estilo",
    brandTagline: "Live the extraordinary",
    nav: {
      philosophy: "Philosophy",
      refuges: "The 4 Sanctuaries",
      pact: "Pact of Respect",
      faq: "FAQ",
      partners: "Local Community",
      seoAudit: "SEO/AI Audit",
      book: "Reserve / Concierge",
    },
    hero: {
      headline: "You don't come to sleep. You come to live an experience.",
      subheadline: "Four sustainable, ultra-exclusive sanctuaries across Europe. One singular promise: understated luxury, regenerative nature, and time restored.",
      ctaPrimary: "Explore Sanctuaries",
      ctaSecondary: "Concierge Guidance",
      badge: "Limited Edition • Direct Booking Only",
      stat1Label: "Private Hectares",
      stat1Value: "60+",
      stat2Label: "Unique Sanctuaries",
      stat2Value: "4",
      stat3Label: "Guaranteed Silence",
      stat3Value: "100%",
      bookingBar: {
        sanctuaryLabel: "Sanctuary",
        entryLabel: "Check-in (Friday)",
        exitLabel: "Check-out (Sunday)",
        checkBtn: "Check Availability",
        guaranteeText: "✓ Direct Price Guarantee • No Hidden Fees • Flexible Cancellation",
        sanctuaryCanigo: "Refugi del Canigó (280€/night)",
        sanctuaryObsidiana: "Refugio de Obsidiana (350€/night)",
        sanctuaryFalesia: "Falesia Atlántica (420€/night)",
        sanctuaryEstrecho: "El Nido del Estrecho (480€/night)",
      },
    },
    manifesto: {
      badge: "Brand Manifesto",
      title: "The Conscious Luxury Manifesto",
      subtitle: "True luxury is not about accumulation. It's hearing the wind without interference.",
      p1: "We live in a world saturated with rush, screens, and mass industrial tourism—photocopied destinations where genuine human connection is replaced by lines and instant consumption.",
      p2: "At Experiencias con Estilo, we rebel against greenwashing and mass tourism. We have selected and protected four sacred sanctuaries across Europe to restore their original spirit.",
      p3: "We do not sell hotel nights. We guard sanctuaries where architecture engages in quiet dialogue with the forest, the night sky, and the ocean.",
      causeBadge: "Our Cause",
      villainTitle: "Our Stand Against Mass Tourism",
      villainP: "We fight against the depersonalization of travel. We reject crowded resorts, fake eco-labels, and urban haste. Here, time is measured in sunrises and starry nights.",
      protectedHaText: "Protected from mass tourism",
      sustainableBadge: "100% Sustainable",
      values: [
        {
          title: "Regenerative Tourism",
          desc: "Every stay funds local reforestation, river preservation, and clean energy.",
          icon: "Leaf",
        },
        {
          title: "Silence & Privacy",
          desc: "Strict capacity caps to preserve wilderness peace.",
          icon: "VolumeX",
        },
        {
          title: "Integrated Architecture",
          desc: "Noble natural materials, volcanic stone, treated timber, and zero-carbon impact.",
          icon: "Home",
        },
      ],
    },
    refugesSection: {
      badge: "Experiencias con Estilo Collection",
      title: "Our Collection of 4 Sanctuaries",
      subtitle: "Each sanctuary is unique, yet all share the pure soul of Experiencias con Estilo.",
      filterAll: "All Sanctuaries",
      filterPetFriendly: "🐾 Pet Friendly",
      filterAdultsOnly: "🧘 Adults Only",
      filterStarlight: "🔭 Starlight Skies",
      filterWater: "💧 Waterfalls & Ocean",
      petBadge: "🐾 Pet Friendly",
      adultsBadge: "🧘 Adults Only",
      viewDetails: "View Sanctuary Details",
      bookNow: "Check Availability",
      perNight: "night",
      from: "From",
    },
    quizSection: {
      badge: "Concierge Matchmaker",
      title: "Intelligent Experience Matcher",
      subtitle: "What state of mind or restorative rhythm does your body crave today?",
      q1: "Select your primary yearning:",
      q1Options: [
        {
          id: "canigo",
          title: "Forest, Cascades & Hydroelectric Power",
          desc: "Wake up by the river with mountain echoes in the French Pyrenees.",
          icon: "Trees",
          targetId: "refugi-canigo",
        },
        {
          id: "obsidiana",
          title: "Total Disconnection & Starlight Skywatching",
          desc: "Volcanic stone and absolute silence in Teruel Starlight Reserve.",
          icon: "Sparkles",
          targetId: "refugio-obsidiana",
        },
        {
          id: "falesia",
          title: "Atlantic Cliffs & Km 0 Gastronomy",
          desc: "Eco-luxury on the Vicentina Coast with heated seawater pools.",
          icon: "Waves",
          targetId: "falesia-atlantica",
        },
        {
          id: "estrecho",
          title: "Historic Suite with Views Over 2 Continents",
          desc: "On the Rock of Gibraltar, Upper Rock Nature Reserve with 360º views.",
          icon: "Compass",
          targetId: "nido-estrecho",
        },
      ],
      resultTitle: "Your Ideal Sanctuary:",
      resultCta: "Explore this Sanctuary",
      findRefugeBtn: "Find this Sanctuary",
      floatingBtn: "Digital Saturation Test",
    },
    pact: {
      badge: "Pact of Respect",
      title: "Our Pact of Mutual Respect & Serenity",
      subtitle: "Simple, non-negotiable standards to protect wildlife peace and guest serenity.",
      items: [
        {
          title: "Foot Access Only",
          desc: "Your vehicle rests in our secure lower parking. The final ascent is on foot to ease mental transition into the wild.",
          icon: "Footprints",
        },
        {
          title: "Sacred Silence (10:00 PM)",
          desc: "From 10 PM, nature takes over. Voices soften to maintain ambient stillness.",
          icon: "Volume2",
        },
        {
          title: "Zero Waste & Clean Energy",
          desc: "On-site composting, zero single-use plastics. 100% self-generated hydro energy at Canigó.",
          icon: "ShieldCheck",
        },
        {
          title: "Pet Hospitality",
          desc: "Refugi del Canigó and Falesia Atlántica warmly welcome well-behaved pets. Obsidiana and El Nido are peaceful adult sanctuaries.",
          icon: "HeartHandshake",
        },
      ],
    },
    faqSection: {
      title: "Frequently Asked Questions (GEO / AI Direct)",
      subtitle: "Clear, factual answers for discerning travelers and AI search engines.",
      searchPlaceholder: "Search topic (e.g. mobile signal, pets, children, weather)...",
      aiBadge: "Structured for Google SGE & Perplexity AI",
      keywordsLabel: "AI Keywords:",
    },
    partnersSection: {
      badge: "Local Community & Sustainability",
      title: "Our Km 0 Local Producer Network",
      subtitle: "True luxury is savoring fresh harvests, supporting artisans, and protecting land.",
      km0Badge: "Verified Sustainability",
    },
    seoModal: {
      title: "Technical SEO & AI Structured Data Inspector",
      subtitle: "Inspect how Google and AI search engines read Experiencias con Estilo.",
      tabSchema: "Schema.org (JSON-LD)",
      tabMeta: "Multilingual Meta Tags",
      tabAiGeoseo: "GEO / AI Authority Metrics",
      copySchema: "Copy JSON-LD",
      copied: "Copied!",
    },
    refugeModal: {
      conceptTitle: "The Concept & Experience",
      maxGuestsLabel: "Max Capacity",
      guestsUnit: "Guests",
      accessLabel: "Access",
      footAccess: "👣 Footpath (Parking 300m)",
      carAccess: "Driveway to Door",
      petsLabel: "Pets",
      petsAllowed: "🐾 Allowed",
      petsNotAllowed: "🚫 Not Allowed",
      nightRateLabel: "Nightly Rate",
      amenitiesTitle: "Amenities & Unique Highlights",
      highlightsTitle: "Distinctive Features",
      bookConciergeBtn: "Request Concierge Booking",
    },
    bookingModal: {
      conciergeBadge: "Exclusive Concierge Service",
      title: "Direct Concierge Inquiry",
      subtitle: "We curate your stay dates personally through our direct private booking service.",
      fieldName: "Full Name",
      fieldEmail: "Email Address",
      fieldPhone: "Phone / WhatsApp",
      fieldRefuge: "Selected Sanctuary",
      fieldDates: "Estimated Dates",
      entryDateLabel: "Estimated Check-in",
      exitDateLabel: "Estimated Check-out",
      fieldGuests: "Number of Guests",
      guestOptions: [
        { val: 1, label: "1 Guest (Solo Retreat)" },
        { val: 2, label: "2 Guests (Couple / Couple + Baby)" },
        { val: 3, label: "3 Guests" },
        { val: 4, label: "4 Guests (Family)" },
      ],
      fieldStyle: "Travel Purpose",
      fieldPets: "Traveling with a pet?",
      petOptionYes: "Yes, bringing a pet",
      petOptionNo: "No",
      fieldNotes: "Special requests or comments",
      notesPlaceholder: "Notes on dietary preferences, anniversary surprises, or special requirements...",
      submit: "Submit Inquiry to Concierge",
      submitting: "Submitting inquiry...",
      successTitle: "Inquiry Received Successfully!",
      successMessage: "Your reservation request has been delivered to our Concierge. We will reply within 4 hours with bespoke options.",
      backBtn: "Return to Website",
    },
    cookieBanner: {
      title: "Privacy & Conscious Experience",
      description: "We use strictly essential cookies and anonymous first-party telemetry to ensure fluid reservations without monetizing your data.",
      acceptAll: "Accept Full Experience",
      onlyEssential: "Only Essentials",
    },
    footer: {
      tagline: "You don't come to sleep. You come to live an experience.",
      umbrellaBrand: "Experiencias con Estilo",
      quickLinks: "Exclusive Sanctuaries",
      languages: "Available Languages",
      legal: "Legal Notice",
      privacy: "Privacy Policy",
      cookies: "Cookie Policy",
      terms: "Terms & Conditions",
      copyright: "© 2026 Experiencias con Estilo. All rights reserved.",
      crmNote: "Integrated with Direct Booking & CRM Engine.",
    },
  },
  fr: {
    brandName: "Experiencias con Estilo",
    brandTagline: "Vivez l'extraordinaire",
    nav: {
      philosophy: "Philosophie",
      refuges: "Les 4 Sanctuaires",
      pact: "Pacte de Respect",
      faq: "FAQ",
      partners: "Communauté Locale",
      seoAudit: "Audit SEO/IA",
      book: "Réserver / Concierge",
    },
    hero: {
      headline: "Vous ne venez pas pour dormir. Vous venez vivre une expérience.",
      subheadline: "Quatre sanctuaires durables et ultra-exclusifs en Europe. Une promesse unique : luxe discret, nature régénératrice et temps retrouvé.",
      ctaPrimary: "Découvrir les Sanctuaires",
      ctaSecondary: "Conseil Concierge",
      badge: "Édition Limitée • Réservations Directes",
      stat1Label: "Hectares Privés",
      stat1Value: "60+",
      stat2Label: "Sanctuaires Uniques",
      stat2Value: "4",
      stat3Label: "Silence Garanti",
      stat3Value: "100%",
      bookingBar: {
        sanctuaryLabel: "Sanctuaire",
        entryLabel: "Arrivée (Vendredi)",
        exitLabel: "Départ (Dimanche)",
        checkBtn: "Vérifier la Disponibilité",
        guaranteeText: "✓ Garantie Prix Direct • Sans Frais Cachés • Annulation Flexible",
        sanctuaryCanigo: "Refugi del Canigó (280€/nuit)",
        sanctuaryObsidiana: "Refugio de Obsidiana (350€/nuit)",
        sanctuaryFalesia: "Falesia Atlántica (420€/nuit)",
        sanctuaryEstrecho: "El Nido del Estrecho (480€/nuit)",
      },
    },
    manifesto: {
      badge: "Manifeste de Marque",
      title: "Le Manifeste du Luxe Conscient",
      subtitle: "Le vrai luxe n'est pas d'accumuler. C'est entendre le chant du vent sans interférence.",
      p1: "Nous vivons dans un monde saturé de hâte, d'écrans et de tourisme de masse. Des lieux stéréotypés où la connexion authentique a laissé place aux files d'attente.",
      p2: "Chez Experiencias con Estilo, nous nous rebellons contre le greenwashing et le tourisme de masse. Nous avons préservé quatre lieux sacrés en Europe pour leur redonner leur sens véritable.",
      p3: "Nous ne vendons pas des nuées d'hôtel. Nous gardons des sanctuaires où l'architecture dialogue avec la forêt, la nuit étoilée et l'océan.",
      causeBadge: "Notre Cause",
      villainTitle: "Notre Engagement contre le Tourisme de Masse",
      villainP: "Nous luttons contre la dépersonnalisation du voyage. Nous refusons les complexes surpeuplés et la précipitation urbaine.",
      protectedHaText: "Protégés du tourisme de masse",
      sustainableBadge: "100% Durable",
      values: [
        {
          title: "Tourisme Régénératif",
          desc: "Chaque séjour finance la reforestation, la protection des rivières et l'énergie propre.",
          icon: "Leaf",
        },
        {
          title: "Silence & Intimité",
          desc: "Capacités strictement limitées pour préserver la paix sauvage.",
          icon: "VolumeX",
        },
        {
          title: "Architecture Intégrée",
          desc: "Matériaux nobles, pierre volcanique et empreinte carbone neutre.",
          icon: "Home",
        },
      ],
    },
    refugesSection: {
      badge: "Experiencias con Estilo Collection",
      title: "Notre Collection de 4 Sanctuaires",
      subtitle: "Chaque lieu est unique, partageant l'âme d'Experiencias con Estilo.",
      filterAll: "Tous les Sanctuaires",
      filterPetFriendly: "🐾 Pet Friendly",
      filterAdultsOnly: "🧘 Réservé aux Adultes",
      filterStarlight: "🔭 Ciel Étoilé Starlight",
      filterWater: "💧 Cascades & Rivière",
      petBadge: "🐾 Pet Friendly",
      adultsBadge: "🧘 Réservé aux Adultes",
      viewDetails: "Voir le Sanctuaire",
      bookNow: "Vérifier la Disponibilité",
      perNight: "nuit",
      from: "À partir de",
    },
    quizSection: {
      badge: "Conseiller Concierge",
      title: "Recommandeur d'Expérience Intelligent",
      subtitle: "Quel état d'esprit votre corps réclame-t-il aujourd'hui ?",
      q1: "Sélectionnez votre envie principale :",
      q1Options: [
        {
          id: "canigo",
          title: "Forêt, Cascades et Énergie Hydroélectrique",
          desc: "Se réveiller près de la rivière dans les Pyrénées françaises.",
          icon: "Trees",
          targetId: "refugi-canigo",
        },
        {
          id: "obsidiana",
          title: "Déconnexion Totale et Ciel Étoilé Starlight",
          desc: "Pierre volcanique, silence absolu à Teruel et Réserve Starlight.",
          icon: "Sparkles",
          targetId: "refugio-obsidiana",
        },
        {
          id: "falesia",
          title: "Falaises Atlantiques et Gastronomie Km 0",
          desc: "Éco-luxe sur la Côte Vicentine avec piscines d'eau de mer chauffée.",
          icon: "Waves",
          targetId: "falesia-atlantica",
        },
        {
          id: "estrecho",
          title: "Suite Historique avec Vue sur 2 Continents",
          desc: "Sur le Rocher de Gibraltar, Réserve Naturelle avec panorama à 360º.",
          icon: "Compass",
          targetId: "nido-estrecho",
        },
      ],
      resultTitle: "Votre Sanctuaire Idéal :",
      resultCta: "Explorer ce Sanctuaire",
      findRefugeBtn: "Trouver ce Sanctuaire",
      floatingBtn: "Test de Saturation Numérique",
    },
    pact: {
      badge: "Pacte de Respect",
      title: "Notre Pacte de Respect et de Sérénité",
      subtitle: "Des règles simples et indispensables pour préserver la paix de chacun et de la faune sauvage.",
      items: [
        {
          title: "Accès Final à Pied",
          desc: "Votre véhicule reste sur notre parking sécurisé. Le dernier tronçon se fait à pied pour entrer en harmonie avec la nature.",
          icon: "Footprints",
        },
        {
          title: "Silence Sacré (22:00)",
          desc: "Dès 22h, la nature s'apaise. Le calme est exigé dans tout le domaine.",
          icon: "Volume2",
        },
        {
          title: "Déconnexion Responsable & Empreinte Zéro",
          desc: "Tri sélectif à la source et zéro plastique jetable. L'énergie au Canigó est 100% hydroélectrique.",
          icon: "ShieldCheck",
        },
        {
          title: "Politique d'Animaux",
          desc: "Refugi del Canigó et Falesia Atlántica accueillent les animaux avec soin. Obsidiana et El Nido sont strictement réservés au silence sans animaux.",
          icon: "HeartHandshake",
        },
      ],
    },
    faqSection: {
      title: "Foire Aux Questions (GEO / IA)",
      subtitle: "Réponses claires pour voyageurs exigeants et moteurs IA.",
      searchPlaceholder: "Rechercher (ex : réseau, animaux, enfants, météo)...",
      aiBadge: "Optimisé Google SGE & Perplexity AI",
      keywordsLabel: "Mots-clés IA :",
    },
    partnersSection: {
      badge: "Développement Local & Écologie",
      title: "Notre Réseau d'Artisans Locaux Km 0",
      subtitle: "Le luxe véritable consiste à soutenir les artisans locaux et protéger le terroir.",
      km0Badge: "Éco-responsabilité Vérifiée",
    },
    seoModal: {
      title: "Inspecteur SEO & Données Structurées IA",
      subtitle: "Vérifiez comment les moteurs IA et Google analysent Experiencias con Estilo.",
      tabSchema: "Schema.org (JSON-LD)",
      tabMeta: "Balises Méta",
      tabAiGeoseo: "Autorité GEO / IA",
      copySchema: "Copier JSON-LD",
      copied: "Copié !",
    },
    refugeModal: {
      conceptTitle: "Le Concept & l'Expérience",
      maxGuestsLabel: "Capacité Maximale",
      guestsUnit: "Personnes",
      accessLabel: "Accès",
      footAccess: "👣 À pied (Parking à 300m)",
      carAccess: "Accès direct en voiture",
      petsLabel: "Animaux",
      petsAllowed: "🐾 Bienvenus",
      petsNotAllowed: "🚫 Non admis",
      nightRateLabel: "Tarif par Nuit",
      amenitiesTitle: "Équipements & Détails Exclusifs",
      highlightsTitle: "Points Forts",
      bookConciergeBtn: "Demander au Concierge",
    },
    bookingModal: {
      conciergeBadge: "Service Concierge Exclusif",
      title: "Demande Directe au Concierge",
      subtitle: "Nous organisons votre séjour sur mesure via notre service privé direct.",
      fieldName: "Nom et Prénom",
      fieldEmail: "Adresse E-mail",
      fieldPhone: "Téléphone / WhatsApp",
      fieldRefuge: "Sanctuaire Sélectionné",
      fieldDates: "Dates Souhaitées",
      entryDateLabel: "Date d'arrivée",
      exitDateLabel: "Date de départ",
      fieldGuests: "Nombre d'Invités",
      guestOptions: [
        { val: 1, label: "1 Personne (Séjour Solo)" },
        { val: 2, label: "2 Personnes (Couple / Couple + Bébé)" },
        { val: 3, label: "3 Personnes" },
        { val: 4, label: "4 Personnes (Famille)" },
      ],
      fieldStyle: "Style de Voyage",
      fieldPets: "Voyagez-vous avec un animal ?",
      petOptionYes: "Oui, avec animal",
      petOptionNo: "Non",
      fieldNotes: "Demandes particulières",
      notesPlaceholder: "Précisions sur vos envies, régimes alimentaires, surprises...",
      submit: "Envoyer la Demande au Concierge",
      submitting: "Traitement en cours...",
      successTitle: "Demande Envoyée avec Succès !",
      successMessage: "Votre demande a été transmise à notre Concierge. Nous vous répondrons sous 4 heures avec des propositions personnalisées.",
      backBtn: "Retour au Site",
    },
    cookieBanner: {
      title: "Confidentialité & Expérience Consciente",
      description: "Nous utilisons des cookies essentiels et une télémétrie anonyme pour faciliter vos réservations sans commercialiser vos données.",
      acceptAll: "Accepter l'Expérience Complète",
      onlyEssential: "Uniquement Essentiels",
    },
    footer: {
      tagline: "Vous ne venez pas pour dormir. Vous venez vivre une expérience.",
      umbrellaBrand: "Experiencias con Estilo",
      quickLinks: "Sanctuaires Exclusifs",
      languages: "Langues Disponibles",
      legal: "Mentions Légales",
      privacy: "Politique de Confidentialité",
      cookies: "Politique de Cookies",
      terms: "Conditions Générales",
      copyright: "© 2026 Experiencias con Estilo. Tous droits réservés.",
      crmNote: "Intégré au Système de Réservation Directe & CRM.",
    },
  },
  cat: {
    brandName: "Experiencias con Estilo",
    brandTagline: "Viu l'extraordinari",
    nav: {
      philosophy: "Filosofia",
      refuges: "Els 4 Refugis",
      pact: "Pacte de Convivència",
      faq: "Preguntes Freqüents",
      partners: "Comunitat Local",
      seoAudit: "Auditoria SEO/IA",
      book: "Reservar / Concierge",
    },
    hero: {
      headline: "No véns a dormir. Véns a viure una experiència.",
      subheadline: "Quatre refugis sostenibles i d'ultra-exclusivitat a Europa. Una sola promesa: luxe discret, natura regenerativa i el temps recuperat.",
      ctaPrimary: "Descobreix els Refugis",
      ctaSecondary: "Assessorament Concierge",
      badge: "Edició Limitada • Només Reserves Directes",
      stat1Label: "Hectàrees Privades",
      stat1Value: "60+",
      stat2Label: "Refugis Únics",
      stat2Value: "4",
      stat3Label: "Silenci Garantit",
      stat3Value: "100%",
      bookingBar: {
        sanctuaryLabel: "Santuari",
        entryLabel: "Entrada (Divendres)",
        exitLabel: "Sortida (Diumenge)",
        checkBtn: "Comprovar Disponibilitat",
        guaranteeText: "✓ Garantia de Preu Directe • Sense Comissions Ocultes • Cancel·lació Flexible",
        sanctuaryCanigo: "Refugi del Canigó (280€/nit)",
        sanctuaryObsidiana: "Refugio de Obsidiana (350€/nit)",
        sanctuaryFalesia: "Falesia Atlántica (420€/nit)",
        sanctuaryEstrecho: "El Nido del Estrecho (480€/nit)",
      },
    },
    manifesto: {
      badge: "Manifest de Marca",
      title: "El Manifest del Luxe Conscient",
      subtitle: "El veritable luxe no és acumular. És poder escoltar el vent sense interferències.",
      p1: "Vivim submergits en un món saturat de presses, pantalles i turisme de masses. Llocs fotocopiats on l'experiència genuïna s'ha canviat per cues i consum ràpid.",
      p2: "A Experiencias con Estilo ens rebelem contra el greenwashing i el turisme massificat. Hem triat i protegit quatre racons sagrats d'Europa.",
      p3: "No venem nits d'hotel. Custodiem santuaris on l'arquitectura dialoga amb el bosc, el cel estrellat i l'oceà.",
      causeBadge: "La Nostra Causa",
      villainTitle: "La Nostra Declaració contra el Turisme Massiu",
      villainP: "Lluitem contra la despersonalització del viatge. Rebutgem els complexos massificats i la pressa urbana.",
      protectedHaText: "Protegides de la massificació",
      sustainableBadge: "100% Sostenible",
      values: [
        {
          title: "Turisme Regeneratiu",
          desc: "Cada estada finança la reforestació, la cura del riu i l'energia neta.",
          icon: "Leaf",
        },
        {
          title: "Silenci & Privadesa",
          desc: "Aforaments estrictes i places molt limitades per mantenir la pau silvestre.",
          icon: "VolumeX",
        },
        {
          title: "Arquitectura Integrada",
          desc: "Fusta noble, pedra volcànica i petjada de carboni neutra.",
          icon: "Home",
        },
      ],
    },
    refugesSection: {
      badge: "Col·lecció Experiencias con Estilo",
      title: "La Nostra Col·lecció de 4 Refugis",
      subtitle: "Cada ubicació és única, però totes comparteixen l'ànima d'Experiencias con Estilo.",
      filterAll: "Tots els Refugis",
      filterPetFriendly: "🐾 Pet Friendly",
      filterAdultsOnly: "🧘 Només Adults",
      filterStarlight: "🔭 Cels Starlight",
      filterWater: "💧 Cascada i Riu",
      petBadge: "🐾 Pet Friendly",
      adultsBadge: "🧘 Només Adults",
      viewDetails: "Veure Refugi Complet",
      bookNow: "Consultar Disponibilitat",
      perNight: "nit",
      from: "Des de",
    },
    quizSection: {
      badge: "Recomanador Concierge",
      title: "Cercador Intel·ligent d'Experiència",
      subtitle: "Quin estat d'ànim o descans necessita el teu cos avui?",
      q1: "Selecciona el teu desig principal:",
      q1Options: [
        {
          id: "canigo",
          title: "Bosc, Cascades i Energia Hidroelèctrica",
          desc: "Despertar vora el riu amb la remor de la muntanya als Pirineus.",
          icon: "Trees",
          targetId: "refugi-canigo",
        },
        {
          id: "obsidiana",
          title: "Desconnexió Total i Observació d'Estels",
          desc: "Pedra volcànica, silenci absolut a Terol i Reserva Starlight.",
          icon: "Sparkles",
          targetId: "refugio-obsidiana",
        },
        {
          id: "falesia",
          title: "Penya-segats Atlàntics i Gastronomia Km 0",
          desc: "Eco-luxe a la Costa Vicentina amb piscines d'aigua de mar.",
          icon: "Waves",
          targetId: "falesia-atlantica",
        },
        {
          id: "estrecho",
          title: "Suite Històrica amb Vistes a 2 Continents",
          desc: "Al Penyal de Gibraltar, Reserva Natural amb vistes 360º.",
          icon: "Compass",
          targetId: "nido-estrecho",
        },
      ],
      resultTitle: "El Teu Refugi Ideal:",
      resultCta: "Explorar aquest Santuari",
      findRefugeBtn: "Trobar aquest Refugi",
      floatingBtn: "Test de Saturació Digital",
    },
    pact: {
      badge: "Pacte de Convivència",
      title: "El Nostre Pacte de Convivència i Respecte",
      subtitle: "Normes senzilles i clares per protegir la pau de tots els hostes i de la fauna silvestre.",
      items: [
        {
          title: "Accés Final a Peu",
          desc: "El vehicle queda al nostre pàrquing segur. El tram final es fa a peu per fer la transició a la natura.",
          icon: "Footprints",
        },
        {
          title: "Silenci Sagrat (22:00 h)",
          desc: "A partir de les 10 del vespre la natura reposa. Cal moderar la veu i mantenir la pau sonora.",
          icon: "Volume2",
        },
        {
          title: "Desconnexió Responsable & Residu Zero",
          desc: "Separació de residus en origen i prohibició de plàstics d'un sol ús. L'energia al Canigó és hidroelèctrica pròpia.",
          icon: "ShieldCheck",
        },
        {
          title: "Convivència amb Mascotes",
          desc: "Refugi del Canigó i Falesia Atlántica són Pet Friendly respectuosos. Obsidiana i El Nido són espais de calma sense animals.",
          icon: "HeartHandshake",
        },
      ],
    },
    faqSection: {
      title: "Preguntes Freqüents i Respostes Directes (GEO/IA)",
      subtitle: "Respostes clares per a viatgers exigents i motors de cerca amb IA.",
      searchPlaceholder: "Cercar dubte (ex: cobertura, mascotes, nens, pluja)...",
      aiBadge: "Estructurat per a Google SGE & Perplexity AI",
      keywordsLabel: "Paraules clau IA:",
    },
    partnersSection: {
      badge: "Desenvolupament Local & Sostenibilitat",
      title: "La Nostra Xarxa d'Aliances Locals Km 0",
      subtitle: "El veritable luxe és consumir producte fresc, donar suport als artesans i protegir el territori.",
      km0Badge: "Sostenibilitat Verificada",
    },
    seoModal: {
      title: "Inspector de SEO Tècnic & Dades Estructurades IA",
      subtitle: "Comprova com Google i la IA interpreten Experiencias con Estilo.",
      tabSchema: "Schema.org (JSON-LD)",
      tabMeta: "Etiquetes Meta",
      tabAiGeoseo: "Mètriques GEO / IA",
      copySchema: "Copiar JSON-LD",
      copied: "Copiat!",
    },
    refugeModal: {
      conceptTitle: "El Concepte i l'Experiència",
      maxGuestsLabel: "Aforament Màxim",
      guestsUnit: "Persones",
      accessLabel: "Accés",
      footAccess: "👣 A Peu (Pàrquing a 300m)",
      carAccess: "Cotxe fins a la porta",
      petsLabel: "Mascotes",
      petsAllowed: "🐾 Permeses",
      petsNotAllowed: "🚫 No admeses",
      nightRateLabel: "Tarifa per Nit",
      amenitiesTitle: "Equipament & Detalls Únics",
      highlightsTitle: "Punts Destacats",
      bookConciergeBtn: "Demanar Disponibilitat Concierge",
    },
    bookingModal: {
      conciergeBadge: "Atenció Exclusiva Concierge",
      title: "Sol·licitud Directa a Concierge",
      subtitle: "Gestionem les teves dates de manera personalitzada a través del nostre servei privat.",
      fieldName: "Nom Complet",
      fieldEmail: "Correu Electrònic",
      fieldPhone: "Telèfon / WhatsApp",
      fieldRefuge: "Refugi Seleccionat",
      fieldDates: "Dates Estimades",
      entryDateLabel: "Entrada Estimada",
      exitDateLabel: "Sortida Estimada",
      fieldGuests: "Nombre d'Hostes",
      guestOptions: [
        { val: 1, label: "1 Persona (Retir Sol)" },
        { val: 2, label: "2 Persones (Parella / Parella + Bebè)" },
        { val: 3, label: "3 Persones" },
        { val: 4, label: "4 Persones (Família)" },
      ],
      fieldStyle: "Motiu del Viatge",
      fieldPets: "Viatges amb mascota?",
      petOptionYes: "Sí, porto mascota",
      petOptionNo: "No",
      fieldNotes: "Peticions especials o comentaris",
      notesPlaceholder: "Comentaris sobre al·lèrgies, sorpreses d'aniversari o preferències especials...",
      submit: "Enviar Sol·licitud a Concierge",
      submitting: "Processant sol·licitud...",
      successTitle: "Sol·licitud Registrada amb Èxit!",
      successMessage: "La teva preferència s'ha enviat al nostre equip de Concierge. Et respondrem en menys de 4 hores amb disponibilitat exacta i detalls personalitzats.",
      backBtn: "Tornar al Web",
    },
    cookieBanner: {
      title: "Privadesa i Experiència Conscient",
      description: "Utilitzem galetes estrictament essencials i telemetria anònima de primera part per garantir la fluïdesa en les teves reserves sense comercialitzar les teves dades.",
      acceptAll: "Acceptar Experiència Completa",
      onlyEssential: "Només Essencials",
    },
    footer: {
      tagline: "No véns a dormir. Véns a viure una experiència.",
      umbrellaBrand: "Experiencias con Estilo",
      quickLinks: "Refugis Exclusius",
      languages: "Idiomes Disponibles",
      legal: "Avís Legal",
      privacy: "Política de Privadesa",
      cookies: "Política de Galetes",
      terms: "Termes i Condicions",
      copyright: "© 2026 Experiencias con Estilo. Tots els drets reservats.",
      crmNote: "Integrat amb Sistema de Reserves & CRM Directe.",
    },
  },
  pt: {
    brandName: "Experiencias con Estilo",
    brandTagline: "Viva o extraordinário",
    nav: {
      philosophy: "Filosofia",
      refuges: "Os 4 Refúgios",
      pact: "Pacto de Convivência",
      faq: "Perguntas Frequentes",
      partners: "Comunidade Local",
      seoAudit: "Auditoria SEO/IA",
      book: "Reservar / Concierge",
    },
    hero: {
      headline: "Você não vem para dormir. Você vem para viver uma experiência.",
      subheadline: "Quatro refúgios sustentáveis e de ultra-exclusividade na Europa. Uma só promessa: luxo discreto, natureza regenerativa e tempo recuperado.",
      ctaPrimary: "Descubra os Refúgios",
      ctaSecondary: "Aconselhamento Concierge",
      badge: "Edição Limitada • Apenas Reservas Diretas",
      stat1Label: "Hectares Privados",
      stat1Value: "60+",
      stat2Label: "Refúgios Únicos",
      stat2Value: "4",
      stat3Label: "Silêncio Garantido",
      stat3Value: "100%",
      bookingBar: {
        sanctuaryLabel: "Santuário",
        entryLabel: "Entrada (Sexta-feira)",
        exitLabel: "Saída (Domingo)",
        checkBtn: "Verificar Disponibilidade",
        guaranteeText: "✓ Garantia de Preço Direto • Sem Taxas Ocultas • Cancelamento Flexível",
        sanctuaryCanigo: "Refugi del Canigó (280€/noite)",
        sanctuaryObsidiana: "Refugio de Obsidiana (350€/noite)",
        sanctuaryFalesia: "Falesia Atlántica (420€/noite)",
        sanctuaryEstrecho: "El Nido del Estrecho (480€/noite)",
      },
    },
    manifesto: {
      badge: "Manifesto de Marca",
      title: "O Manifesto do Luxo Consciente",
      subtitle: "O verdadeiro luxo não é acumular. É ouvir o vento sem interferências.",
      p1: "Vivemos submersos num mundo saturado de pressa, ecrãs e turismo massificado. Lugares estandardizados onde a experiência genuína foi substituída por filas e consumo rápido.",
      p2: "Em Experiencias con Estilo rebelamo-nos contra o greenwashing e o turismo em massa. Selecionámos e protegemos quatro recantos sagrados na Europa.",
      p3: "Não vendemos noites de hotel. Guardamos santuários onde a arquitetura dialoga com a floresta, a noite estrelada e o oceano.",
      causeBadge: "A Nossa Causa",
      villainTitle: "A Nossa Declaração contra o Turismo Massivo",
      villainP: "Lutamos contra a despersonalização da viagem. Rejeitamos complexos massificados e a pressa urbana.",
      protectedHaText: "Protegidos da massificação",
      sustainableBadge: "100% Sustentável",
      values: [
        {
          title: "Turismo Regenerativo",
          desc: "Cada estadia financia a reflorestação, preservação do rio e energia limpa.",
          icon: "Leaf",
        },
        {
          title: "Silêncio & Privacidade",
          desc: "Lotações estritas e vagas hiper-limitadas para preservar a paz silvestre.",
          icon: "VolumeX",
        },
        {
          title: "Arquitetura Integrada",
          desc: "Madeira nobre, pedra vulcânica e pegada de carbono neutra.",
          icon: "Home",
        },
      ],
    },
    refugesSection: {
      badge: "Coleção Experiencias con Estilo",
      title: "A Nossa Coleção de 4 Refúgios",
      subtitle: "Cada localização é única, mas todas partilham a alma de Experiencias con Estilo.",
      filterAll: "Todos os Refúgios",
      filterPetFriendly: "🐾 Pet Friendly",
      filterAdultsOnly: "🧘 Apenas Adultos",
      filterStarlight: "🔭 Céus Starlight",
      filterWater: "💧 Cascatas e Rio",
      petBadge: "🐾 Pet Friendly",
      adultsBadge: "🧘 Apenas Adultos",
      viewDetails: "Ver Refúgio Completo",
      bookNow: "Consultar Disponibilidade",
      perNight: "noite",
      from: "A partir de",
    },
    quizSection: {
      badge: "Recomendador Concierge",
      title: "Buscador Inteligente de Experiência",
      subtitle: "Que estado de espírito ou descanso o seu corpo precisa hoje?",
      q1: "Selecione o seu desejo principal:",
      q1Options: [
        {
          id: "canigo",
          title: "Floresta, Cascatas e Energia Hídrica",
          desc: "Despertar junto ao rio com os sons da montanha nos Pirenéus.",
          icon: "Trees",
          targetId: "refugi-canigo",
        },
        {
          id: "obsidiana",
          title: "Desconexão Total e Observação de Estrelas",
          desc: "Pedra vulcânica, silêncio absoluto em Teruel e Reserva Starlight.",
          icon: "Sparkles",
          targetId: "refugio-obsidiana",
        },
        {
          id: "falesia",
          title: "Falésias Atlânticas e Gastronomia Km 0",
          desc: "Eco-luxo na Costa Vicentina com piscinas de água do mar aquecida.",
          icon: "Waves",
          targetId: "falesia-atlantica",
        },
        {
          id: "estrecho",
          title: "Suite Histórica com Vistas para 2 Continentes",
          desc: "No Rochedo de Gibraltar, Reserva Natural com vista panorâmica a 360º.",
          icon: "Compass",
          targetId: "nido-estrecho",
        },
      ],
      resultTitle: "O Seu Refúgio Ideal:",
      resultCta: "Explorar este Santuário",
      findRefugeBtn: "Encontrar este Refúgio",
      floatingBtn: "Teste de Saturação Digital",
    },
    pact: {
      badge: "Pacto de Convivência",
      title: "O Nosso Pacto de Convivência e Respeito",
      subtitle: "Normas simples e inegociáveis para proteger a serenidade de todos os hóspedes e da fauna selvagem.",
      items: [
        {
          title: "Acesso Final a Pé",
          desc: "O seu veículo fica no nosso estacionamento seguro. O percurso final é feito a pé para a transição para a natureza.",
          icon: "Footprints",
        },
        {
          title: "Silêncio Sagrado (22:00 h)",
          desc: "A partir das 22h a natureza descansa. É necessário baixar o tom de voz e manter a tranquilidade em todo o domínio.",
          icon: "Volume2",
        },
        {
          title: "Desconexão Responsável & Desperdício Zero",
          desc: "Tratamento de resíduos na origem e proibição de plásticos descartáveis. A energia no Canigó provém de fonte hídrica própria.",
          icon: "ShieldCheck",
        },
        {
          title: "Convivência com Animais",
          desc: "Refugi del Canigó e Falesia Atlántica são Pet Friendly atenciosos. Obsidiana e El Nido são espaços de tranquilidade exclusiva sem animais.",
          icon: "HeartHandshake",
        },
      ],
    },
    faqSection: {
      title: "Perguntas Frequentes e Respostas Diretas (GEO/IA)",
      subtitle: "Respostas claras para viajantes exigentes e motores de busca com IA.",
      searchPlaceholder: "Pesquisar dúvida (ex: rede móvel, animais, crianças, clima)...",
      aiBadge: "Otimizado para Google SGE & Perplexity AI",
      keywordsLabel: "Palavras-chave IA:",
    },
    partnersSection: {
      badge: "Desenvolvimento Local & Sustentabilidade",
      title: "A Nossa Rede de Produtores Locais Km 0",
      subtitle: "O verdadeiro luxo é consumir produtos frescos, apoiar o produtor local e proteger o ecossistema.",
      km0Badge: "Sustentabilidade Verificada",
    },
    seoModal: {
      title: "Inspetor de SEO Técnico & Dados Estruturados IA",
      subtitle: "Verifique como o Google e a IA analisam Experiencias con Estilo.",
      tabSchema: "Schema.org (JSON-LD)",
      tabMeta: "Meta Tags Multilíngues",
      tabAiGeoseo: "Métricas GEO / IA",
      copySchema: "Copiar JSON-LD",
      copied: "Copiado!",
    },
    refugeModal: {
      conceptTitle: "O Conceito e a Experiência",
      maxGuestsLabel: "Lotação Máxima",
      guestsUnit: "Pessoas",
      accessLabel: "Acesso",
      footAccess: "👣 A Pé (Estacionamento a 300m)",
      carAccess: "Carro até à porta",
      petsLabel: "Animais",
      petsAllowed: "🐾 Permitidos",
      petsNotAllowed: "🚫 Não permitidos",
      nightRateLabel: "Tarifa por Noite",
      amenitiesTitle: "Equipamentos & Detalhes Únicos",
      highlightsTitle: "Pontos de Destaque",
      bookConciergeBtn: "Solicitar Disponibilidade Concierge",
    },
    bookingModal: {
      conciergeBadge: "Atendimento Exclusivo Concierge",
      title: "Solicitação Direta ao Concierge",
      subtitle: "Gerimos as suas datas de forma personalizada através do nosso serviço de reservas exclusivo.",
      fieldName: "Nome Completo",
      fieldEmail: "Correio Eletrónico",
      fieldPhone: "Telefone / WhatsApp",
      fieldRefuge: "Refúgio Selecionado",
      fieldDates: "Datas Estimadas",
      entryDateLabel: "Entrada Estimada",
      exitDateLabel: "Saída Estimada",
      fieldGuests: "Número de Hóspedes",
      guestOptions: [
        { val: 1, label: "1 Pessoa (Retiro Individual)" },
        { val: 2, label: "2 Pessoas (Casal / Casal + Bebé)" },
        { val: 3, label: "3 Pessoas" },
        { val: 4, label: "4 Pessoas (Família)" },
      ],
      fieldStyle: "Motivo da Viagem",
      fieldPets: "Viaja com animal de estimação?",
      petOptionYes: "Sim, levo animal",
      petOptionNo: "Não",
      fieldNotes: "Pedidos especiais ou comentários",
      notesPlaceholder: "Comentários sobre alergias, surpresas de aniversário ou preferências especiais...",
      submit: "Enviar Solicitação ao Concierge",
      submitting: "A processar solicitação...",
      successTitle: "Solicitação Registada com Sucesso!",
      successMessage: "A sua preferência foi enviada à nossa equipa de Concierge. Responderemos em menos de 4 horas com disponibilidade exata e detalhes personalizados.",
      backBtn: "Voltar ao Site",
    },
    cookieBanner: {
      title: "Privacidade e Experiência Consciente",
      description: "Utilizamos cookies estritamente essenciais e telemetria anónima para garantir a fluidez nas suas reservas sem comercializar os seus dados.",
      acceptAll: "Aceitar Experiência Completa",
      onlyEssential: "Apenas Essenciais",
    },
    footer: {
      tagline: "Você não vem para dormir. Você vem para viver uma experiência.",
      umbrellaBrand: "Experiencias con Estilo",
      quickLinks: "Refúgios Exclusivos",
      languages: "Idiomas Disponíveis",
      legal: "Aviso Legal",
      privacy: "Política de Privacidade",
      cookies: "Política de Cookies",
      terms: "Termos e Condições",
      copyright: "© 2026 Experiencias con Estilo. Todos os direitos reservados.",
      crmNote: "Integrado com Sistema de Reservas & CRM Direto.",
    },
  },
};
