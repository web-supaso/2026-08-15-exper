import { Refuge } from '../types';

export const refugesData: Refuge[] = [
  {
    id: "refugi-canigo",
    slug: "refugi-del-canigo",
    name: "Refugi del Canigó",
    tagline: {
      es: "60+ Hectáreas Privadas de Bosque, Cascadas y Río de Montaña",
      en: "60+ Hectares of Private Forest, Cascades & Mountain River",
      fr: "60+ Hectares de Forêt Privée, Cascades et Rivière de Montagne",
      cat: "60+ Hectàrees Privades de Bosc, Cascades i Riu de Muntanya",
      pt: "60+ Hectares de Floresta Privada, Cascatas e Rio de Montanha"
    },
    location: {
      es: "Vernet-les-Bains, Pirineos Orientales",
      en: "Vernet-les-Bains, Eastern Pyrenees",
      fr: "Vernet-les-Bains, Pyrénées-Orientales",
      cat: "Vernet-les-Bains, Pirineus Orientals",
      pt: "Vernet-les-Bains, Pirenéus Orientais"
    },
    region: {
      es: "Pirineos Catalanes / Franceses",
      en: "French / Catalan Pyrenees",
      fr: "Pyrénées Catalanes / Françaises",
      cat: "Pirineus Catalans / Francesos",
      pt: "Pirenéus Catalães / Franceses"
    },
    country: {
      es: "Francia / España",
      en: "France / Spain",
      fr: "France / Espagne",
      cat: "França / Espanya",
      pt: "França / Espanha"
    },
    coordinates: {
      lat: 42.5489,
      lng: 2.3962,
    },
    heroImage: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80"
    ],
    description: {
      es: "Un refugio rodeado por más de 60 hectáreas de bosque privado virgen en las faldas del mítico Macizo del Canigó. Cascadas naturales, río de montaña y glamping premium alimentado por energía hidroeléctrica propia.",
      en: "A secluded sanctuary surrounded by over 60 hectares of virgin private forest on the slopes of Mount Canigó. Natural waterfalls, mountain streams, and premium glamping powered by its own hydro plant.",
      fr: "Un sanctuaire niché au cœur de plus de 60 hectares de forêt privée vierge au pied du massif du Canigó. Cascades naturelles, rivière de montagne et glamping haut de gamme alimenté par sa propre centrale hydroélectrique.",
      cat: "Un refugi rodejat per més de 60 hectàrees de bosc privat verge a les faldilles del mític Massís del Canigó. Cascades naturals, riu de muntanya i glamping prèmium alimentat per energia hidroelèctrica pròpia.",
      pt: "Um refúgio rodeado por mais de 60 hectares de floresta privada virgem nas encostas do mítico Monte Canigó. Cascatas naturais, rio de montanha e glamping premium alimentado por energia hídrica própria."
    },
    longDescription: {
      es: "No vienes a dormir. Vienes a habitar un dominio de 600.000 metros cuadrados de naturaleza privada reservado a un puñado de invitados. Aquí las cabañas de madera noble tratada y los domos geodésicos se funden entre hayas milenarias. Con turbina hidroeléctrica propia, el refugio produce el 100% de su energía renovable sin emitir ruido ni gases. Senderos privados te llevan directamente a piscinas naturales de agua helada y cascadas vírgenes.",
      en: "You do not come to sleep. You come to inhabit 60 hectares of private mountain wilderness reserved for a handful of guests. Sustainable timber lodges and geodesic domes melt seamlessly into ancient beech forests. Powered by a silent private hydro turbine, energy is 100% clean and renewable. Private trails lead straight to crystal waterfalls and pristine mountain pools.",
      fr: "Vous ne venez pas pour dormir. Vous venez habiter un domaine de 60 hectares de nature sauvage réservé à un nombre très restreint d'invités. Les éco-lodges en bois noble et les dômes géodésiques s'intègrent parmi les hêtres centenaires. Grâce à sa turbine hydroélectrique, le refuge produit 100 % d'énergie propre sans bruit.",
      cat: "No véns a dormir. Véns a habitar un domini de 60 hectàrees de natura privada reservat a un grapat d'hostes. Les cabanes de fusta noble i doms geodèsics es fonen entre fagedes mil·lenàries. Amb turbina hidroelèctrica pròpia, produeix el 100% d'energia neta sense soroll.",
      pt: "Não vem para dormir. Vem habitar um domínio de 60 hectares de natureza privada reservado a pouquíssimos hóspedes. Lodges de madeira nobre e domos geodésicos fundem-se com a floresta secular. Com turbina hídrica própria, gera 100% de energia limpa sem ruído."
    },
    highlights: {
      es: [
        "60+ Hectáreas de Dominio Privado Exclusivo",
        "Cascada y Río Privado de Agua Cristalina",
        "Energía 100% Hidroeléctrica Propia",
        "Alojamiento Pet Friendly Bienvenido",
        "Atención Multilingüe (ES / CAT / FR / EN)"
      ],
      en: [
        "60+ Hectares of Private Wilderness",
        "Private Waterfall and Mountain River",
        "100% Self-Generated Hydroelectric Energy",
        "Warmly Pet Friendly Environment",
        "Multilingual Hospitality (EN / ES / FR / CAT)"
      ],
      fr: [
        "60+ Hectares de Domaine Privé Exclusif",
        "Cascade et Rivière Privées",
        "100% Énergie Hydroélectrique Propre",
        "Établissement Pet Friendly",
        "Accueil Multilingue (FR / ES / CAT / EN)"
      ],
      cat: [
        "60+ Hectàrees de Domini Privat Exclusiu",
        "Cascada i Riu Privat d'Aigua Cristal·lina",
        "Energia 100% Hidroelèctrica Pròpia",
        "Allotjament Pet Friendly Benvingut",
        "Atenció Multilingüe (CAT / ES / FR / EN)"
      ],
      pt: [
        "60+ Hectares de Domínio Privado Exclusivo",
        "Cascata e Rio Privado de Água Cristalina",
        "100% Energia Hídrica Própria",
        "Acomodação Pet Friendly",
        "Atendimento Multilíngue (ES / EN / FR / CAT / PT)"
      ]
    },
    amenities: [
      { icon: "Zap", label: { es: "Energía Hidroeléctrica", en: "Hydroelectric Energy", fr: "Énergie Hydroélectrique", cat: "Energia Hidroelèctrica", pt: "Energia Hidrelétrica" } },
      { icon: "Droplets", label: { es: "Cascadas y Piscinas Naturales", en: "Waterfalls & Natural Pools", fr: "Cascades & Piscines Naturelles", cat: "Cascades i Piscines Naturals", pt: "Cascatas e Piscinas Naturais" } },
      { icon: "Dog", label: { es: "Pet Friendly Consciente", en: "Pet Friendly", fr: "Pet Friendly", cat: "Pet Friendly", pt: "Pet Friendly" } },
      { icon: "Flame", label: { es: "Estufa de Pellets & Sauna", en: "Wood Stove & Nordic Sauna", fr: "Poêle à Bois & Sauna Nordique", cat: "Estufa de Llenya i Sauna", pt: "Lareira e Sauna Nórdica" } },
      { icon: "Coffee", label: { es: "Desayuno Artesanal Km 0", en: "Organic Km 0 Breakfast", fr: "Petit-Déjeuner Bio Km 0", cat: "Esmorzar Artesanal Km 0", pt: "Pequeno-almoço Km 0" } }
    ],
    category: "mountain",
    petFriendly: true,
    adultsOnly: false,
    footAccessOnly: true,
    maxGuests: 4,
    priceFromPerNight: 280,
    currency: "EUR",
    areaHa: 62,
    specialFeature: {
      es: "Cascada privada a 3 minutos a pie y microcentral hidráulica autosuficiente.",
      en: "Private waterfall 3 min walk and self-sufficient hydro micro-station.",
      fr: "Cascade privée à 3 min de marche et micro-centrale hydroélectrique.",
      cat: "Cascada privada a 3 minuts a peu i microcentral hidràulica pròpia.",
      pt: "Cascata privada a 3 minutos a pé e microcentral hídrica autossuficiente."
    },
    weatherPreview: {
      temp: "19°C",
      condition: {
        es: "Fresco de Montaña • Agua de Río 14°C",
        en: "Mountain Crisp • River Water 14°C",
        fr: "Fraîcheur de Montagne • Eau de Rivière 14°C",
        cat: "Frescor de Muntanya • Aigua de Riu 14°C",
        pt: "Frescor de Montanha • Água de Rio 14°C"
      }
    }
  },
  {
    id: "refugio-obsidiana",
    slug: "refugio-de-obsidiana",
    name: "El Refugio de Obsidiana",
    tagline: {
      es: "Reserva Starlight, Piedra Volcánica y Desconexión Digital Intencionada",
      en: "Certified Starlight Reserve, Volcanic Stone & Mindful Digital Detox",
      fr: "Réserve Starlight, Pierre Volcanique et Déconnexion Numérique Volontaire",
      cat: "Reserva Starlight, Pedra Volcànica i Desconnexió Digital Intencionada",
      pt: "Reserva Starlight, Pedra Vulcânica e Desconexão Digital Intencional"
    },
    location: {
      es: "Sierra de Gúdar / Albarracín",
      en: "Sierra de Gúdar / Albarracín Range",
      fr: "Sierra de Gúdar / Albarracín",
      cat: "Serra de Gúdar / Albarrasí",
      pt: "Serra de Gúdar / Albarracín"
    },
    region: {
      es: "Teruel, Aragón",
      en: "Teruel, Aragon",
      fr: "Teruel, Aragon",
      cat: "Terol, Aragó",
      pt: "Teruel, Aragão"
    },
    country: {
      es: "España",
      en: "Spain",
      fr: "Espagne",
      cat: "Espanya",
      pt: "Espanha"
    },
    coordinates: {
      lat: 40.3456,
      lng: -1.1345,
    },
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1200&q=80"
    ],
    description: {
      es: "Un santuario de piedra de obsidiana y basalto erigido bajo uno de los cielos nocturnos más limpios de la Tierra. Cero cobertura móvil, telescopio de astrofotografía y silencio sagrado.",
      en: "A sanctuary of volcanic stone built under one of the clearest night skies on Earth. Intentionally zero cell signal, astronomical telescope, and profound silence.",
      fr: "Un sanctuaire de pierre volcanique érigé sous l'un des ciels nocturnes les plus purs de la planète. Zéro couverture mobile, télescope d'astrophotographie et silence profond.",
      cat: "Un santuari de pedra volcànica erigit sota un dels cels nocturns més nets de la Terra. Zero cobertura mòbil, telescopi d'astrofotografia i silenci sagrat.",
      pt: "Um santuário de pedra vulcânica sob um dos céus noturnos mais limpos do planeta. Zero rede móvel, telescópio de astrofotografia e silêncio profundo."
    },
    longDescription: {
      es: "Construido artesanalmente con piedra volcánica oscura y cristal térmico de baja reflectancia, El Refugio de Obsidiana nace como un ayuno del ruido digital. Ubicado en una zona certificada Starlight con cero contaminación lumínica en decenas de kilómetros a la redonda. Dispone de observatorio privado con telescopio robótico Schmidt-Cassegrain y estufa de fuego directo.",
      en: "Hand-crafted from dark volcanic stone and low-reflectance thermal glass, The Obsidian Sanctuary was created as a digital detox sanctuary. Set in a certified Starlight zone with zero light pollution for miles. Features a private telescope observatory and direct wood fire.",
      fr: "Construit à la main avec de la pierre volcanique sombre, Le Refuge d'Obsidienne est conçu comme un jeûne numérique. Situé dans une zone certifiée Starlight sans aucune pollution lumineuse.",
      cat: "Construït artesanalment amb pedra volcànica fosca, Neix com un dejuni del soroll digital. Ubicat en una zona certificada Starlight amb zero contaminació lumínica.",
      pt: "Construído artesanalmente em pedra vulcânica, nasce como um jejum do ruído digital. Localizado numa zona certificada Starlight sem poluição luminosa."
    },
    highlights: {
      es: [
        "Reserva Astronómica Starlight Certificada",
        "Desconexión Digital Intencionada (Sin WiFi ni Cobertura)",
        "Telescopio Profesional de Astrofotografía",
        "Zona Exclusiva Solo Adultos (Silencio Sagrado)",
        "Arquitectura de Piedra y Fuego Directo"
      ],
      en: [
        "Certified Starlight Astronomical Reserve",
        "Intentional Digital Detox (No WiFi / Cell)",
        "Professional Astrophotography Telescope",
        "Exclusive Adults-Only Environment",
        "Volcanic Stone Architecture & Fireplace"
      ],
      fr: [
        "Réserve Astronomique Starlight Certifiée",
        "Déconnexion Numérique Volontaire",
        "Télescope Astronomique Professionnel",
        "Zone Exclusive Réservée aux Adultes",
        "Architecture en Pierre & Feu Ouvert"
      ],
      cat: [
        "Reserva Astronòmica Starlight Certificada",
        "Desconnexió Digital Intencionada",
        "Telescopi Professional d'Astrofotografia",
        "Entorn Exclusiu Només Adults",
        "Arquitectura de Pedra i Foc Directe"
      ],
      pt: [
        "Reserva Astronómica Starlight Certificada",
        "Desconexão Digital Intencional",
        "Telescópio Profissional de Astrofotografia",
        "Ambiente Exclusivo Apenas para Adultos",
        "Arquitetura de Pedra Vulcânica"
      ]
    },
    amenities: [
      { icon: "Sparkles", label: { es: "Observatorio Starlight", en: "Starlight Observatory", fr: "Observatoire Starlight", cat: "Observatori Starlight", pt: "Observatório Starlight" } },
      { icon: "WifiOff", label: { es: "Desconexión Total", en: "Digital Detox Zone", fr: "Déconnexion Totale", cat: "Desconnexió Total", pt: "Desconexão Digital" } },
      { icon: "Moon", label: { es: "Cero Contaminación Lumínica", en: "Zero Light Pollution", fr: "Pollution Lumineuse Zéro", cat: "Zero Contaminació Lumínica", pt: "Zero Poluição Luminosa" } },
      { icon: "UserCheck", label: { es: "Solo Adultos", en: "Adults Only", fr: "Réservé aux Adultes", cat: "Només Adults", pt: "Apenas Adultos" } },
      { icon: "Compass", label: { es: "Rutas Nocturnas Guiadas", en: "Guided Night Walks", fr: "Randonnées Nocturnes", cat: "Rutes Nocturnes", pt: "Rotas Noturnas" } }
    ],
    category: "starlight",
    petFriendly: false,
    adultsOnly: true,
    footAccessOnly: true,
    maxGuests: 2,
    priceFromPerNight: 340,
    currency: "EUR",
    specialFeature: {
      es: "Índice de visión estelar Bortle 1 y biblioteca de filosofía y astronomía.",
      en: "Bortle 1 dark sky rating and curation of philosophy & astronomy books.",
      fr: "Ciel obscur Bortle 1 et bibliothèque d'astronomie.",
      cat: "Índex de visió estel·lar Bortle 1 i biblioteca d'astronomia.",
      pt: "Céu noturno Bortle 1 e biblioteca de astronomia."
    },
    weatherPreview: {
      temp: "15°C",
      condition: {
        es: "Cielo Despejado • Visibilidad Estelar 99%",
        en: "Clear Sky • 99% Starlight Visibility",
        fr: "Ciel Dégagé • Visibilité Stellaire 99%",
        cat: "Cel Clar • Visibilitat Estel·lar 99%",
        pt: "Céu Limpo • Visibilidade Estelar 99%"
      },
      starlightScore: "Bortle Class 1"
    }
  },
  {
    id: "falesia-atlantica",
    slug: "falesia-atlantica",
    name: "Falesia Atlántica",
    tagline: {
      es: "Eco-Lujo sobre Acantilados, Pools Marinas y Foraging Salvaje",
      en: "Cliff-Edge Eco-Luxury, Seawater Pools & Wild Ocean Foraging",
      fr: "Éco-Luxe sur Falaises, Piscines d'Eau de Mer et Cueillette Sauvage",
      cat: "Eco-Luxe sobre Penya-segats, Piscines Marines i Recol·lecció Salvatge",
      pt: "Eco-Luxo sobre Falésias, Piscinas Marinhas e Foraging Selvagem"
    },
    location: {
      es: "Sines / Zambujeira do Mar",
      en: "Sines / Zambujeira do Mar",
      fr: "Sines / Zambujeira do Mar",
      cat: "Sines / Zambujeira do Mar",
      pt: "Sines / Zambujeira do Mar"
    },
    region: {
      es: "Costa Vicentina, Alentejo",
      en: "Vicentina Coast, Alentejo",
      fr: "Côte Vicentine, Alentejo",
      cat: "Costa Vicentina, Alentejo",
      pt: "Costa Vicentina, Alentejo"
    },
    country: {
      es: "Portugal",
      en: "Portugal",
      fr: "Portugal",
      cat: "Portugal",
      pt: "Portugal"
    },
    coordinates: {
      lat: 37.8542,
      lng: -8.7912,
    },
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80"
    ],
    description: {
      es: "Villas de diseño eco-sostenible suspendidas sobre acantilados vírgenes de la Costa Vicentina. Piscinas privadas de agua marina temperada por energía solar y cocina marinera de foraging.",
      en: "Eco-luxury villas perched above wild Atlantic cliffs along Portugal's Vicentina Coast. Private solar-warmed seawater pools and wild ocean foraging gastronomy.",
      fr: "Villas éco-conçues suspendues au-dessus des falaises sauvages de la côte Vicentine. Piscines privées d'eau de mer chauffées à l'énergie solaire et cuisine sauvage du littoral.",
      cat: "Viles de disseny eco-sostenible suspeses sobre penya-segats verges de la Costa Vicentina. Piscines privades d'aigua marina temperada i cuina marinera de recol·lecció.",
      pt: "Villas de design eco-sustentável suspensas sobre falésias virgens da Costa Vicentina. Piscinas privadas de água do mar aquecida por energia solar e gastronomia de foraging marinho."
    },
    longDescription: {
      es: "En el Parque Natural del Sudoeste Alentejano, Falesia Atlántica redefine la costa portuguesa. Las edificaciones están construidas con paja compactada, cal natural y maderas recicladas de navíos. Piscinas individuales llenas directamente de agua del Atlántico y atemperadas con paneles termosolares. Un chef botánico local prepara menús diarios con productos recolectados en la orilla.",
      en: "Set inside the Southwest Alentejo Natural Park, Atlantic Cliff redefines coastlines. Eco-villas constructed from straw bales, natural lime, and reclaimed boat timber. Solar-warmed seawater plunge pools over the ocean edge.",
      fr: "Niché dans le parc naturel du Sud-Ouest Alentejan, Falesia Atlántica réinvente la côte portugaise. Villas bioclimatiques en paille, chaux naturelle et bois marin recyclé. Piscines individuelles d'eau de mer.",
      cat: "Al Parc Natural del Sud-oest Alentejà, Falesia Atlántica redefineix la costa portuguesa. Viles bioclimàtiques construïdes amb materials ecològics. Piscines d'aigua maridatges km 0.",
      pt: "No Parque Natural do Sudoeste Alentejano, Falesia Atlántica redefine a costa portuguesa. Edificações em palha compactada, cal natural e madeiras marinhas recicladas."
    },
    highlights: {
      es: [
        "Ubicación en Acantilado con Vista Directa al Océano",
        "Piscinas Privadas de Agua de Mar Temperada",
        "Menú Botánico y Gastronomía Foraging Km 0",
        "Alojamiento Pet Friendly Bienvenido",
        "Paseos Directos a Playas Secretas sin Huella"
      ],
      en: [
        "Cliffside Position with Direct Atlantic Ocean Panorama",
        "Private Solar-Warmed Seawater Pools",
        "Ocean Foraging & Botanical Km 0 Dining",
        "Pet Friendly Welcome Policy",
        "Private Access Footpaths to Secret Beaches"
      ],
      fr: [
        "Vue Panoramique Directe sur l'Océan Atlantique",
        "Piscines Privées d'Eau de Mer Chauffées",
        "Gastronomie de Foraging Littoral Km 0",
        "Accueil Chaleureux des Animaux de Compagnie",
        "Accès Direct à des Criques Sauvages"
      ],
      cat: [
        "Ubicació en Penya-segat amb Vista Directa a l'Oceà",
        "Piscines Privades d'Aigua de Mar Temperada",
        "Menú Botànic i Gastronomia de Proximitat",
        "Allotjament Pet Friendly Benvingut",
        "Accés Privat a Cales Secretes"
      ],
      pt: [
        "Localização sobre Falésias com Vista para o Atlântico",
        "Piscinas Privadas de Água do Mar Aquecida",
        "Menu Botânico e Gastronomia Foraging Km 0",
        "Acomodação Pet Friendly",
        "Acesso Pedonal Directo a Praias Secretas"
      ]
    },
    amenities: [
      { icon: "Waves", label: { es: "Pool Marítima Privada", en: "Private Ocean Pool", fr: "Piscine d'Eau de Mer", cat: "Piscina Marina Privada", pt: "Piscina Marítima Privada" } },
      { icon: "Utensils", label: { es: "Gastronomía Foraging", en: "Wild Foraging Dining", fr: "Cuisine Sauvage", cat: "Gastronomia de Recol·lecció", pt: "Gastronomia Foraging" } },
      { icon: "Dog", label: { es: "Pet Friendly", en: "Pet Friendly", fr: "Pet Friendly", cat: "Pet Friendly", pt: "Pet Friendly" } },
      { icon: "Sun", label: { es: "Energía Solar Climatizada", en: "Solar Climate Tech", fr: "Énergie Solaire Climatique", cat: "Energia Solar Climatitzada", pt: "Energia Solar Climatizada" } },
      { icon: "Wind", label: { es: "Brisa Atlántica Curativa", en: "Ocean Breeze Wellness", fr: "Air Marin Régénérant", cat: "Brisa Marina Curativa", pt: "Brisa Atlântica Curativa" } }
    ],
    category: "ocean",
    petFriendly: true,
    adultsOnly: false,
    footAccessOnly: true,
    maxGuests: 4,
    priceFromPerNight: 390,
    currency: "EUR",
    specialFeature: {
      es: "Plunge pool sobre el acantilado y senderos de pescadores protegidos.",
      en: "Cliffside plunge pool and protected coastal fishermen trails.",
      fr: "Piscine suspendue et sentiers côtiers préservés.",
      cat: "Piscina suspensa i camins de pescadors protegits.",
      pt: "Piscina sobre a falésia e trilhos de pescadores protegidos."
    },
    weatherPreview: {
      temp: "22°C",
      condition: {
        es: "Soleado • Brisa Atlántica Fresca",
        en: "Sunny • Fresh Atlantic Breeze",
        fr: "Ensoleillé • Brise Atlantique Fraîche",
        cat: "Assolellat • Brisa Atlàntica Fresca",
        pt: "Ensolarado • Brisa Atlântica Fresca"
      }
    }
  },
  {
    id: "nido-estrecho",
    slug: "el-nido-del-estrecho",
    name: "El Nido del Estrecho",
    tagline: {
      es: "Suite Histórica en Acantilado con Vistas 360º a Europa y África",
      en: "Historic Cliffside Suite with 360º Views Over Europe & Africa",
      fr: "Suite Historique sur Falaise avec Vues à 360º sur l'Europe et l'Afrique",
      cat: "Suite Històrica en Penya-segat amb Vistes 360º a Europa i Àfrica",
      pt: "Suite Histórica sobre Falésia com Vistas 360º para Europa e África"
    },
    location: {
      es: "Upper Rock Nature Reserve",
      en: "Upper Rock Nature Reserve",
      fr: "Réserve Naturelle d'Upper Rock",
      cat: "Reserva Natural d'Upper Rock",
      pt: "Reserva Natural Upper Rock"
    },
    region: {
      es: "Gibraltar & Estrecho",
      en: "Gibraltar & The Strait",
      fr: "Gibraltar & Le Détroit",
      cat: "Gibraltar i l'Estret",
      pt: "Gibraltar & O Estreito"
    },
    country: {
      es: "Gibraltar (RU) / España",
      en: "Gibraltar (UK) / Spain",
      fr: "Gibraltar (RU) / Espagne",
      cat: "Gibraltar (RU) / Espanya",
      pt: "Gibraltar (RU) / Espanha"
    },
    coordinates: {
      lat: 36.1408,
      lng: -5.3536,
    },
    heroImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
    ],
    description: {
      es: "Una suite histórica restaurada en la cumbre protegida del Peñón. Domina el Estrecho de Gibraltar con vistas panorámicas sin igual a dos mares (Mediterráneo y Atlántico) y dos continentes.",
      en: "A restored historic cliffside suite atop the protected Rock. Overlooking the Strait of Gibraltar with unparalleled 360º views of two seas and two continents.",
      fr: "Une suite historique restaurée au sommet du Rocher. Vues à 360º sur le détroit de Gibraltar, reliant deux mers et deux continents.",
      cat: "Una suite històrica restaurada al cim protegit del Penyal. Domina l'Estret de Gibraltar amb vistes panoràmiques a dos mars i dos continents.",
      pt: "Uma suite histórica restaurada no topo do Rochedo. Vista de 360º sobre o Estreito de Gibraltar, unindo dois mares e dois continentes."
    },
    longDescription: {
      es: "Emplazado en una antigua atalaya de piedra victoriada restaurada bajo estrictos criterios de conservación patrimonial dentro de la Upper Rock Nature Reserve. Desde tu terraza acristalada observas el paso migratorio de miles de aves rapaces y el cruce de delfines y orcas entre el Mediterráneo y el Atlántico. Exclusividad absoluta para una sola pareja a la vez.",
      en: "Set inside a restored historic stone lookout tower within the Upper Rock Nature Reserve. From your private glass lounge, observe migratory raptors and dolphins passing through the Strait. Absolute privacy for just one couple at a time.",
      fr: "Niché dans un ancien poste de guet en pierre restauré dans la réserve naturelle d'Upper Rock. Observez le passage des rapaces migrateurs et des dauphins entre Méditerranée et Atlantique.",
      cat: "Ubicat en una antiga talaia de pedra restaurada dins la Reserva Natural. Des de la terrassa contemples el pas de rapinyaires i cetacis.",
      pt: "Instalado numa atalaia de pedra histórica restaurada na Reserva Natural Upper Rock. Da sua varanda envidraçada contemple aves migratórias e golfinhos."
    },
    highlights: {
      es: [
        "Vistas Panorámicas 360º a Europa y África",
        "Ubicación Privilegiada en Upper Rock Nature Reserve",
        "Observación Privada de Cetáceos y Aves Migratorias",
        "Entorno de Lujo Histórico Exclusivo Solo Adultos",
        "Servicio de Mayordomía y Traslado Eléctrico Privado"
      ],
      en: [
        "360º Panoramic Views of Europe and Africa",
        "Prime Location in Upper Rock Nature Reserve",
        "Private Marine & Raptor Wildlife Migration Spotting",
        "Exclusive Historic Adults-Only Suite",
        "Private Electric Transfer & Dedicated Butler"
      ],
      fr: [
        "Vues Panoramiques à 360º sur l'Europe et l'Afrique",
        "Réserve Naturelle Protégée d'Upper Rock",
        "Observation Privée des Cetacés et Rapaces",
        "Suite Historique Réservée aux Adultes",
        "Transfert Électrique Privé et Concierge"
      ],
      cat: [
        "Vistes Panoràmiques 360º a Europa i Àfrica",
        "Ubicació Privilegiada a la Reserva Natural",
        "Observació Privada de Fauna Marina i Rapinyaires",
        "Suite Històrica Exclusiva Només Adults",
        "Atenció Personalitzada i Trasllat Elèctric"
      ],
      pt: [
        "Vistas Panorâmicas 360º para Europa e África",
        "Localização Privilegiada na Reserva Natural Upper Rock",
        "Observação Privada de Cetáceos e Aves Migratórias",
        "Suite Histórica Exclusiva Apenas para Adultos",
        "Atendimento Privado e Traslado Elétrico"
      ]
    },
    amenities: [
      { icon: "Compass", label: { es: "Vista 360º a 2 Continentes", en: "360º View of 2 Continents", fr: "Vue 360º sur 2 Continents", cat: "Vista 360º a 2 Continents", pt: "Vista 360º para 2 Continentes" } },
      { icon: "Binoculars", label: { es: "Avistamiento de Cetáceos", en: "Whale & Raptor Spotting", fr: "Observation des Cétacés", cat: "Avistament de Cetacis", pt: "Observação de Cetáceos" } },
      { icon: "UserCheck", label: { es: "Solo Adultos", en: "Adults Only", fr: "Réservé aux Adultes", cat: "Només Adults", pt: "Apenas Adultos" } },
      { icon: "Shield", label: { es: "Patrimonio Histórico", en: "Historic Heritage Site", fr: "Patrimoine Historique", cat: "Patrimoni Històric", pt: "Património Histórico" } },
      { icon: "Key", label: { es: "Concierge Privado 24h", en: "Private Butler Service", fr: "Conciergerie Dédiée 24h", cat: "Concierge Privat 24h", pt: "Atendimento Privado 24h" } }
    ],
    category: "historic",
    petFriendly: false,
    adultsOnly: true,
    footAccessOnly: true,
    maxGuests: 2,
    priceFromPerNight: 480,
    currency: "EUR",
    specialFeature: {
      es: "Terraza vidriada a 400m sobre el mar contemplando Marruecos y España.",
      en: "Glass sky lounge 400m above the ocean looking out over Morocco & Spain.",
      fr: "Salon de verre suspendu à 400m au-dessus de la mer.",
      cat: "Terrassa de vidre a 400m sobre el mar vers el Marroc i Espanya.",
      pt: "Varanda de vidro a 400m sobre o mar com vista para Marrocos e Espanha."
    },
    weatherPreview: {
      temp: "24°C",
      condition: {
        es: "Cielo Diáfano • Brisa del Estrecho",
        en: "Clear Sky • Strait Breeze",
        fr: "Ciel Limpide • Brise du Détroit",
        cat: "Cel Diàfan • Brisa de l'Estret",
        pt: "Céu Diáfano • Brisa do Estreito"
      }
    }
  }
];
