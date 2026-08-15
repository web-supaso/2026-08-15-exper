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
  };
  manifesto: {
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    p3: string;
    villainTitle: string;
    villainP: string;
    values: {
      title: string;
      desc: string;
      icon: string;
    }[];
  };
  refugesSection: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterPetFriendly: string;
    filterAdultsOnly: string;
    filterStarlight: string;
    filterWater: string;
    viewDetails: string;
    bookNow: string;
    perNight: string;
    from: string;
  };
  quizSection: {
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
  };
  pact: {
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
  };
  partnersSection: {
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
  bookingModal: {
    title: string;
    subtitle: string;
    fieldName: string;
    fieldEmail: string;
    fieldPhone: string;
    fieldRefuge: string;
    fieldDates: string;
    fieldGuests: string;
    fieldStyle: string;
    fieldPets: string;
    fieldNotes: string;
    submit: string;
    successTitle: string;
    successMessage: string;
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
    },
    manifesto: {
      title: "El Manifiesto del Lujo Consciente",
      subtitle: "El verdadero lujo no es acumular. Es poder escuchar el sonido del viento sin interferencias.",
      p1: "Vivimos sumergidos en un mundo saturado de prisa, pantallas y turismo industrial masificado. Lugares fotocopiados donde la experiencia original ha sido reemplazada por colas y consumo rápido.",
      p2: "En Experiencias con Estilo nos rebelamos contra el 'greenwashing' y el turismo de masas. Hemos seleccionado y protegido cuatro rincones sagrados de Europa para devolverles su propósito original.",
      p3: "No vendemos noches de hotel. Custodiamos santuarios donde la arquitectura dialoga con el bosque, el cielo nocturno y el océano.",
      villainTitle: "Nuestra Declaración contra el Turismo Masivo",
      villainP: "Luchamos contra la despersonalización del viaje. Rechazamos los complejos masificados, los alojamientos con sello 'eco' falso y la prisa urbana. Aquí el tiempo se mide en amaneceres y noches estrelladas.",
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
      title: "Nuestra Colección de 4 Refugios",
      subtitle: "Cada ubicación es única, pero todas comparten el alma de Experiencias con Estilo.",
      filterAll: "Todos los Refugios",
      filterPetFriendly: "🐾 Pet Friendly",
      filterAdultsOnly: "🧘 Solo Adultos",
      filterStarlight: "🔭 Cielos Starlight",
      filterWater: "💧 Cascada y Río",
      viewDetails: "Ver Refugio Completo",
      bookNow: "Consultar Disponibilidad",
      perNight: "noche",
      from: "Desde",
    },
    quizSection: {
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
    },
    pact: {
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
    },
    partnersSection: {
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
    bookingModal: {
      title: "Solicitud Directa a Concierge",
      subtitle: "Gestionamos tus fechas de forma personalizada a través de nuestro sistema de reservas exclusivo.",
      fieldName: "Nombre Completo",
      fieldEmail: "Correo Electrónico",
      fieldPhone: "Teléfono / WhatsApp",
      fieldRefuge: "Refugio Seleccionado",
      fieldDates: "Fechas Estimadas",
      fieldGuests: "Número de Huéspedes",
      fieldStyle: "Motivo del Viaje",
      fieldPets: "¿Viajas con mascota?",
      fieldNotes: "Peticiones especiales o comentarios",
      submit: "Enviar Solicitud a Concierge",
      successTitle: "¡Solicitud Registrada con Éxito!",
      successMessage: "Tu preferencia ha sido enviada a nuestro equipo de Concierge. Te responderemos en menos de 4 horas con disponibilidad exacta y detalles personalizados.",
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
    },
    manifesto: {
      title: "The Conscious Luxury Manifesto",
      subtitle: "True luxury is not about accumulation. It's hearing the wind without interference.",
      p1: "We live in a world saturated with rush, screens, and mass industrial tourism—photocopied destinations where genuine human connection is replaced by lines and instant consumption.",
      p2: "At Experiencias con Estilo, we rebel against greenwashing and mass tourism. We have selected and protected four sacred sanctuaries across Europe to restore their original spirit.",
      p3: "We do not sell hotel nights. We guard sanctuaries where architecture engages in quiet dialogue with the forest, the night sky, and the ocean.",
      villainTitle: "Our Stand Against Mass Tourism",
      villainP: "We fight against the depersonalization of travel. We reject crowded resorts, fake eco-labels, and urban haste. Here, time is measured in sunrises and starry nights.",
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
          desc: "Noble materials, volcanic stone, treated wood, and carbon-neutral footprint.",
          icon: "Home",
        },
      ],
    },
    refugesSection: {
      title: "Our Collection of 4 Sanctuaries",
      subtitle: "Each location is distinct, yet all share the soul of Experiencias con Estilo.",
      filterAll: "All Sanctuaries",
      filterPetFriendly: "🐾 Pet Friendly",
      filterAdultsOnly: "🧘 Adults Only",
      filterStarlight: "🔭 Starlight Sky",
      filterWater: "💧 Waterfalls & River",
      viewDetails: "View Full Sanctuary",
      bookNow: "Check Availability",
      perNight: "night",
      from: "From",
    },
    quizSection: {
      title: "Smart Experience Recommender",
      subtitle: "What state of mind or rest does your body crave today?",
      q1: "Select your core desire:",
      q1Options: [
        {
          id: "canigo",
          title: "Forest, Waterfalls & Hydroelectric Power",
          desc: "Waking up beside a river surrounded by mountain energy in the Pyrenees.",
          icon: "Trees",
          targetId: "refugi-canigo",
        },
        {
          id: "obsidiana",
          title: "Total Disconnection & Starlight Astronomy",
          desc: "Volcanic stone, absolute silence in Teruel and Starlight Reserve.",
          icon: "Sparkles",
          targetId: "refugio-obsidiana",
        },
        {
          id: "falesia",
          title: "Atlantic Cliffs & Farm-to-Table Gastronomy",
          desc: "Eco-luxury on the Vicentina Coast with heated seawater pools.",
          icon: "Waves",
          targetId: "falesia-atlantica",
        },
        {
          id: "estrecho",
          title: "Historic Suite with 360º Views of 2 Continents",
          desc: "On the Rock of Gibraltar, Upper Rock Reserve with panoramic vistas.",
          icon: "Compass",
          targetId: "nido-estrecho",
        },
      ],
      resultTitle: "Your Ideal Sanctuary:",
      resultCta: "Explore This Sanctuary",
    },
    pact: {
      title: "Our Pact of Respect and Harmony",
      subtitle: "Simple, non-negotiable rules to preserve serenity for all guests and wildlife.",
      items: [
        {
          title: "Foot Access Arrival",
          desc: "Vehicles remain in our secure parking. The final leg is walked on foot to gently transition your mind into nature.",
          icon: "Footprints",
        },
        {
          title: "Sacred Silence (10:00 PM)",
          desc: "From 10:00 PM onwards, nature sleeps. Low voices and quiet reverence are required across the grounds.",
          icon: "Volume2",
        },
        {
          title: "Responsible Disconnection & Zero Footprint",
          desc: "On-site waste sorting and zero single-use plastics. Energy at Canigó is 100% generated by our private hydro plant.",
          icon: "ShieldCheck",
        },
        {
          title: "Pet Policy",
          desc: "Refugi del Canigó and Falesia Atlántica welcome pets respectfully. Obsidiana and El Nido are sanctuary silence zones with no animals.",
          icon: "HeartHandshake",
        },
      ],
    },
    faqSection: {
      title: "Frequently Asked Questions (GEO / AI)",
      subtitle: "Direct answers for discerning travelers and AI search engines.",
      searchPlaceholder: "Search topic (e.g., coverage, pets, children, rain)...",
      aiBadge: "Optimized for Google SGE & Perplexity AI",
    },
    partnersSection: {
      title: "Our Km 0 Local Partnerships",
      subtitle: "True luxury is savoring fresh produce, supporting local artisans, and guarding ecosystems.",
      km0Badge: "Verified Sustainability",
    },
    seoModal: {
      title: "Technical SEO & AI Structured Data Inspector",
      subtitle: "Analyze how search engines and LLMs (ChatGPT, Perplexity, Gemini) index Experiencias con Estilo.",
      tabSchema: "Schema.org (JSON-LD)",
      tabMeta: "Multilingual Meta Tags",
      tabAiGeoseo: "GEO / AI Authority Score",
      copySchema: "Copy JSON-LD",
      copied: "Copied!",
    },
    bookingModal: {
      title: "Direct Concierge Reservation",
      subtitle: "We tailor your dates through our dedicated private concierge system.",
      fieldName: "Full Name",
      fieldEmail: "Email Address",
      fieldPhone: "Phone / WhatsApp",
      fieldRefuge: "Selected Sanctuary",
      fieldDates: "Estimated Dates",
      fieldGuests: "Number of Guests",
      fieldStyle: "Travel Purpose",
      fieldPets: "Traveling with pets?",
      fieldNotes: "Special requests or comments",
      submit: "Send Request to Concierge",
      successTitle: "Request Received Successfully!",
      successMessage: "Your request has been delivered to our concierge team. We will contact you within 4 hours with exact availability.",
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
      crmNote: "Integrated with Direct CRM System.",
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
      book: "Réservations / Concierge",
    },
    hero: {
      headline: "Vous ne venez pas pour dormir. Vous venez vivre une expérience.",
      subheadline: "Quatre sanctuaires exclusifs et durables en Europe. Une promesse unique : luxe discret, nature régénératrice et temps retrouvé.",
      ctaPrimary: "Découvrir les Sanctuaires",
      ctaSecondary: "Conseil Concierge",
      badge: "Édition Limitée • Réservation Directe Uniquement",
      stat1Label: "Hectares Privés",
      stat1Value: "60+",
      stat2Label: "Sanctuaires Uniques",
      stat2Value: "4",
      stat3Label: "Silence Garanti",
      stat3Value: "100%",
    },
    manifesto: {
      title: "Le Manifeste du Luxe Conscient",
      subtitle: "Le vrai luxe n'est pas d'accumuler. C'est entendre le chant du vent sans interférence.",
      p1: "Nous vivons dans un monde saturé de hâte, d'écrans et de tourisme de masse. Des lieux stéréotypés où la connexion authentique a laissé place aux files d'attente.",
      p2: "Chez Experiencias con Estilo, nous nous rebellons contre le greenwashing et le tourisme de masse. Nous avons préservé quatre lieux sacrés en Europe pour leur redonner leur sens véritable.",
      p3: "Nous ne vendons pas des nuées d'hôtel. Nous gardons des sanctuaires où l'architecture dialogue avec la forêt, la nuit étoilée et l'océan.",
      villainTitle: "Notre Engagement contre le Tourisme de Masse",
      villainP: "Nous luttons contre la dépersonnalisation du voyage. Nous refusons les complexes surpeuplés et la précipitation urbaine.",
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
      title: "Notre Collection de 4 Sanctuaires",
      subtitle: "Chaque lieu est unique, partageant l'âme d'Experiencias con Estilo.",
      filterAll: "Tous les Sanctuaires",
      filterPetFriendly: "🐾 Pet Friendly",
      filterAdultsOnly: "🧘 Réservé aux Adultes",
      filterStarlight: "🔭 Ciel Étoilé Starlight",
      filterWater: "💧 Cascades & Rivière",
      viewDetails: "Voir le Sanctuaire",
      bookNow: "Vérifier la Disponibilité",
      perNight: "nuit",
      from: "À partir de",
    },
    quizSection: {
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
    },
    pact: {
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
      searchPlaceholder: "Rechercher une question (réseau, animaux, enfants, pluie)...",
      aiBadge: "Optimisé pour Google SGE & Perplexity IA",
    },
    partnersSection: {
      title: "Notre Réseau d'Alliances Locales Km 0",
      subtitle: "Le vrai luxe est de déguster des produits frais et de soutenir l'artisanat local.",
      km0Badge: "Durabilité Vérifiée",
    },
    seoModal: {
      title: "Inspecteur SEO Technique & Données Structurées IA",
      subtitle: "Visualisez comment Google et les IA (ChatGPT, Perplexity, Gemini) analysent notre site.",
      tabSchema: "Schema.org (JSON-LD)",
      tabMeta: "Meta Tags Multilingues",
      tabAiGeoseo: "Score GEO / Autorité IA",
      copySchema: "Copier le JSON-LD",
      copied: "Copié !",
    },
    bookingModal: {
      title: "Demande Directe au Concierge",
      subtitle: "Nous personnalisons vos dates grâce à notre service de conciergerie privée.",
      fieldName: "Nom Complet",
      fieldEmail: "Adresse E-mail",
      fieldPhone: "Téléphone / WhatsApp",
      fieldRefuge: "Sanctuaire Sélectionné",
      fieldDates: "Dates Envisagées",
      fieldGuests: "Nombre d'Invités",
      fieldStyle: "Motif du Voyage",
      fieldPets: "Voyagez-vous avec un animal ?",
      fieldNotes: "Demandes particulières ou remarques",
      submit: "Envoyer au Concierge",
      successTitle: "Demande Enregistrée avec Succès !",
      successMessage: "Votre demande a été transmise à notre équipe concierge. Nous vous répondrons sous 4 heures avec les disponibilités exactes.",
    },
    footer: {
      tagline: "Vous ne venez pas pour dormir. Vous venez vivre une expérience.",
      umbrellaBrand: "Experiencias con Estilo",
      quickLinks: "Sanctuaires Exclusifs",
      languages: "Langues Disponibles",
      legal: "Mentions Légales",
      privacy: "Politique de Confidentialité",
      cookies: "Gestion des Cookies",
      terms: "Conditions Générales",
      copyright: "© 2026 Experiencias con Estilo. Tous droits réservés.",
      crmNote: "Intégré au Système de Réservation Directe.",
    },
  },
  cat: {
    brandName: "Experiencias con Estilo",
    brandTagline: "Viu l'extraordinari",
    nav: {
      philosophy: "Filosofia",
      refuges: "Els 4 Refugis",
      pact: "Pacte de Respecte",
      faq: "Preguntes Freqüents",
      partners: "Comunitat Local",
      seoAudit: "Auditoria SEO/IA",
      book: "Reservar / Concierge",
    },
    hero: {
      headline: "No véns a dormir. Véns a viure una experiència.",
      subheadline: "Quatre refugis sostenibles d'ultra-exclusivitat a Europa. Una mateixa promesa: luxe discret, natura regenerativa i el temps recuperat.",
      ctaPrimary: "Descobreix els Refugis",
      ctaSecondary: "Assessorament Concierge",
      badge: "Edició Limitada • Només Reserves Directes",
      stat1Label: "Hectàrees Privades",
      stat1Value: "60+",
      stat2Label: "Refugis Únics",
      stat2Value: "4",
      stat3Label: "Silenci Garantit",
      stat3Value: "100%",
    },
    manifesto: {
      title: "El Manifest del Luxe Conscient",
      subtitle: "El verdader luxe no és acumular. És poder escoltar el so del vent sense interferències.",
      p1: "Vivim immersos en un món saturat de presses, pantalles i turisme industrial massificat. Llocs fotocopiats on l'experiència autèntica ha estat reemplaçada per cues i consum ràpid.",
      p2: "A Experiencias con Estilo ens rebel·lem contra el 'greenwashing' i el turisme de masses. Hem seleccionat i protegit quatre racons sagrats d'Europa per retornar-los el seu propòsit original.",
      p3: "No venem nits d'hotel. Custodiem santuaris on l'arquitectura dialoga amb el bosc, el cel nocturn i l'oceà.",
      villainTitle: "La Nostra Declaració contra el Turisme de Masses",
      villainP: "Lluitem contra la despersonalització del viatge. Rebutgem els complexos massificats i la pressa urbana. Aquí el temps es mesura en matinades i nits estrellades.",
      values: [
        {
          title: "Turisme Regeneratiu",
          desc: "Cada estada finança la reforestació, conservació del riu i energia neta a la zona.",
          icon: "Leaf",
        },
        {
          title: "Silenci i Privacitat",
          desc: "Aforaments estrictes i cupos hiper-limitats per preservar la pau silvestre.",
          icon: "VolumeX",
        },
        {
          title: "Arquitectura Integrada",
          desc: "Materials nobles, pedra volcànica i petjada de carboni neutra.",
          icon: "Home",
        },
      ],
    },
    refugesSection: {
      title: "La Nostra Col·lecció de 4 Refugis",
      subtitle: "Cada ubicació és única, però totes comparteixen l'ànima d'Experiencias con Estilo.",
      filterAll: "Tots els Refugis",
      filterPetFriendly: "🐾 Pet Friendly",
      filterAdultsOnly: "🧘 Només Adults",
      filterStarlight: "🔭 Cels Starlight",
      filterWater: "💧 Cascades i Riu",
      viewDetails: "Veure Refugi Complet",
      bookNow: "Consultar Disponibilitat",
      perNight: "nit",
      from: "Des de",
    },
    quizSection: {
      title: "Cercador Intel·ligent d'Experiència",
      subtitle: "Quina energia o descans necessita el teu cos avui?",
      q1: "Selecciona el teu desig principal:",
      q1Options: [
        {
          id: "canigo",
          title: "Bosc, Cascades i Energia Hidroelèctrica",
          desc: "Despertar al costat del riu amb la força de la muntanya als Pirineus.",
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
          desc: "Eco-luxe a la Costa Vicentina amb piscines d'aigua de mar temperada.",
          icon: "Waves",
          targetId: "falesia-atlantica",
        },
        {
          id: "estrecho",
          title: "Suite Històrica amb Vistes a 2 Continents",
          desc: "Al Penyal de Gibraltar, Upper Rock Nature Reserve amb vistes 360º.",
          icon: "Compass",
          targetId: "nido-estrecho",
        },
      ],
      resultTitle: "El Teu Refugi Ideal:",
      resultCta: "Explorar Aquest Santuari",
    },
    pact: {
      title: "El Nostre Pacte de Convivència i Respecte",
      subtitle: "Normes simples i innegociables per protegir la serenitat de tots els hostes i de la fauna silvestre.",
      items: [
        {
          title: "Accés Final a Peu",
          desc: "El teu vehicle descansa al nostre aparcament segur. L'últim tram es fa a peu per fer la transició mental a la natura.",
          icon: "Footprints",
        },
        {
          title: "Sagrat Silenci (22:00 h)",
          desc: "A partir de les 22:00 h la natura descansa. S'exigeix baixar el to de veu i mantenir la pau sonora.",
          icon: "Volume2",
        },
        {
          title: "Desconnexió Responsable i Petjada Zero",
          desc: "Tractament de residus en origen i eliminació de plàstics d'un sol ús. L'energia a Canigó procedeix de font hidroelèctrica pròpia.",
          icon: "ShieldCheck",
        },
        {
          title: "Convivència amb Mascotes",
          desc: "Refugi del Canigó i Falesia Atlántica són Pet Friendly respectuosos. Obsidiana i El Nido són espais de silenci i no admeten animals.",
          icon: "HeartHandshake",
        },
      ],
    },
    faqSection: {
      title: "Preguntes Freqüents (GEO / IA)",
      subtitle: "Respostes clares per a viatgers exigents i cercadors d'IA.",
      searchPlaceholder: "Cercar dubte (cobertura, mascotes, nens, pluja)...",
      aiBadge: "Estructurat per a Google SGE i Perplexity AI",
    },
    partnersSection: {
      title: "Xarxa d'Aliances Locals Km 0",
      subtitle: "El verdader luxe és consumir productes de proximitat i protegir el territori.",
      km0Badge: "Sostenibilitat Verificada",
    },
    seoModal: {
      title: "Inspector de SEO Tècnic i Dades Estructurades IA",
      subtitle: "Comprova com Google i les IA (ChatGPT, Perplexity, Gemini) interpreten la nostra web.",
      tabSchema: "Schema.org (JSON-LD)",
      tabMeta: "Meta Tags Multilingües",
      tabAiGeoseo: "Mètriques GEO / Autoritat IA",
      copySchema: "Copiar JSON-LD",
      copied: "Copiat!",
    },
    bookingModal: {
      title: "Sol·licitud Directa al Concierge",
      subtitle: "Gestionem les teves dates de forma personalitzada mitjançant el nostre sistema de reserves privat.",
      fieldName: "Nom Complet",
      fieldEmail: "Correu Electrònic",
      fieldPhone: "Telèfon / WhatsApp",
      fieldRefuge: "Refugi Seleccionat",
      fieldDates: "Dates Estimades",
      fieldGuests: "Nombre d'Hostes",
      fieldStyle: "Motiu del Viatge",
      fieldPets: "Viatges amb mascota?",
      fieldNotes: "Peticions especials o comentaris",
      submit: "Enviar Sol·licitud al Concierge",
      successTitle: "Sol·licitud Registrada amb Èxit!",
      successMessage: "La teva petició s'ha enviat al nostre equip de Concierge. Et respondrem en menys de 4 hores amb disponibilitat exacta.",
    },
    footer: {
      tagline: "No véns a dormir. Véns a viure una experiència.",
      umbrellaBrand: "Experiencias con Estilo",
      quickLinks: "Refugis Exclusius",
      languages: "Idiomes Disponibles",
      legal: "Avís Legal",
      privacy: "Política de Privacitat",
      cookies: "Política de Cookies",
      terms: "Termes i Condicions",
      copyright: "© 2026 Experiencias con Estilo. Tots els drets reservats.",
      crmNote: "Integrat amb Sistema de Reserves i CRM Directe.",
    },
  },
  pt: {
    brandName: "Experiencias con Estilo",
    brandTagline: "Viva o extraordinário",
    nav: {
      philosophy: "Filosofia",
      refuges: "Os 4 Refúgios",
      pact: "Pacto de Respeito",
      faq: "FAQ",
      partners: "Comunidade Local",
      seoAudit: "Auditoria SEO/IA",
      book: "Reservar / Concierge",
    },
    hero: {
      headline: "Não vem para dormir. Vem para viver uma experiência.",
      subheadline: "Quatro refúgios sustentáveis de ultra-exclusividade na Europa. Uma mesma promessa: luxo discreto, natureza regenerativa e tempo recuperado.",
      ctaPrimary: "Descobrir os Refúgios",
      ctaSecondary: "Aconselhamento Concierge",
      badge: "Edição Limitada • Apenas Reservas Diretas",
      stat1Label: "Hectares Privados",
      stat1Value: "60+",
      stat2Label: "Refúgios Únicos",
      stat2Value: "4",
      stat3Label: "Silêncio Garantido",
      stat3Value: "100%",
    },
    manifesto: {
      title: "O Manifesto do Luxo Consciente",
      subtitle: "O verdadeiro luxo não é acumular. É ouvir o vento sem interferências.",
      p1: "Vivemos num mundo saturado de pressa, ecrãs e turismo industrial massificado. Lugares fotocopiados onde a experiência autêntica deu lugar a filas.",
      p2: "Em Experiencias con Estilo rebelamo-nos contra o greenwashing e o turismo de massas. Protegemos quatro santuários na Europa para devolver o seu propósito original.",
      p3: "Não vendemos noites de hotel. Guardamos santuários onde a arquitetura dialoga com a floresta, o céu estrelado e o oceano.",
      villainTitle: "A Nossa Declaração contra o Turismo Massificado",
      villainP: "Lutamos contra a despersonalização da viagem. Rejeitamos complexos massificados e a pressa urbana.",
      values: [
        {
          title: "Turismo Regenerativo",
          desc: "Cada estadia financia reflorestação local, preservação de rios e energia limpa.",
          icon: "Leaf",
        },
        {
          title: "Silêncio & Privacidade",
          desc: "Lotação estritamente limitada para preservar a paz selvagem.",
          icon: "VolumeX",
        },
        {
          title: "Arquitetura Integrada",
          desc: "Materiais nobres, pedra vulcânica e pegada de carbono neutra.",
          icon: "Home",
        },
      ],
    },
    refugesSection: {
      title: "A Nossa Coleção de 4 Refúgios",
      subtitle: "Cada localização é única, mas todas partilham a alma de Experiencias con Estilo.",
      filterAll: "Todos os Refúgios",
      filterPetFriendly: "🐾 Pet Friendly",
      filterAdultsOnly: "🧘 Apenas Adultos",
      filterStarlight: "🔭 Céu Estrelado Starlight",
      filterWater: "💧 Cascata e Rio",
      viewDetails: "Ver Refúgio Completo",
      bookNow: "Consultar Disponibilidade",
      perNight: "noite",
      from: "A partir de",
    },
    quizSection: {
      title: "Recomendador Inteligente de Experiência",
      subtitle: "Que estado de espírito ou descanso o seu corpo pede hoje?",
      q1: "Selecione o seu desejo principal:",
      q1Options: [
        {
          id: "canigo",
          title: "Floresta, Cascatas e Energia Hidrelétrica",
          desc: "Acordar ao lado do rio com a energia das montanhas nos Pirenéus.",
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
          title: "Suite Histórica com Vista para 2 Continentes",
          desc: "No Rochedo de Gibraltar, Reserva Natural Upper Rock com vistas 360º.",
          icon: "Compass",
          targetId: "nido-estrecho",
        },
      ],
      resultTitle: "O Seu Refúgio Ideal:",
      resultCta: "Explorar este Santuário",
    },
    pact: {
      title: "O Nosso Pacto de Respeito e Convivência",
      subtitle: "Regras simples e inegociáveis para proteger a serenidade de todos os hóspedes e da vida selvagem.",
      items: [
        {
          title: "Acesso Final a Pé",
          desc: "O seu veículo fica no nosso parque de estacionamento seguro. O troço final é feito a pé para iniciar a transição mental para a natureza.",
          icon: "Footprints",
        },
        {
          title: "Sagrado Silêncio (22:00 h)",
          desc: "A partir das 22h a natureza descansa. Pede-se tom de voz baixo e respeito no silêncio.",
          icon: "Volume2",
        },
        {
          title: "Desconexão Responsável & Pegada Zero",
          desc: "Gestão de resíduos na origem e eliminação de plásticos de uso único. A energia no Canigó é 100% hídrica.",
          icon: "ShieldCheck",
        },
        {
          title: "Política de Animais",
          desc: "Refugi del Canigó e Falesia Atlántica acolhem animais de estimação. Obsidiana e El Nido são santuários de silêncio estrito sem animais.",
          icon: "HeartHandshake",
        },
      ],
    },
    faqSection: {
      title: "Perguntas Frequentes (GEO / IA)",
      subtitle: "Respostas diretas para viajantes exigentes e motores de IA.",
      searchPlaceholder: "Pesquisar dúvida (cobertura, animais, crianças, chuva)...",
      aiBadge: "Estruturado para Google SGE & Perplexity AI",
    },
    partnersSection: {
      title: "A Nossa Rede de Parcerias Locais Km 0",
      subtitle: "O verdadeiro luxo é consumir produtos frescos locais e apoiar a comunidade.",
      km0Badge: "Sustentabilidade Verificada",
    },
    seoModal: {
      title: "Inspetor de SEO Técnico e Dados Estruturados IA",
      subtitle: "Examine como o Google e modelos IA (ChatGPT, Perplexity, Gemini) interpretam o nosso site.",
      tabSchema: "Schema.org (JSON-LD)",
      tabMeta: "Meta Tags Multilíngues",
      tabAiGeoseo: "Pontuação GEO / Autoridade IA",
      copySchema: "Copiar JSON-LD",
      copied: "Copiado!",
    },
    bookingModal: {
      title: "Pedido Direto ao Concierge",
      subtitle: "Personalizamos as suas datas através do nosso serviço privado de concierge.",
      fieldName: "Nome Completo",
      fieldEmail: "Endereço de E-mail",
      fieldPhone: "Telefone / WhatsApp",
      fieldRefuge: "Refúgio Selecionado",
      fieldDates: "Datas Estimadas",
      fieldGuests: "Número de Hóspedes",
      fieldStyle: "Motivo da Viagem",
      fieldPets: "Viaja com animal de estimação?",
      fieldNotes: "Pedidos especiais ou comentários",
      submit: "Enviar Pedido ao Concierge",
      successTitle: "Pedido Registado com Sucesso!",
      successMessage: "O seu pedido foi enviado para a nossa equipa de concierge. Responderemos em menos de 4 horas com disponibilidades exatas.",
    },
    footer: {
      tagline: "Não vem para dormir. Vem para viver uma experiência.",
      umbrellaBrand: "Experiencias con Estilo",
      quickLinks: "Refúgios Exclusivos",
      languages: "Idiomas Disponíveis",
      legal: "Aviso Legal",
      privacy: "Política de Privacidade",
      cookies: "Política de Cookies",
      terms: "Termos e Condições",
      copyright: "© 2026 Experiencias con Estilo. Todos os direitos reservados.",
      crmNote: "Integrado com Sistema de Reserva Direta.",
    },
  },
};
