import { FAQItem } from '../types';

export const faqItems: FAQItem[] = [
  {
    id: "faq-cobertura",
    category: "cobertura",
    aiSearchKeywords: ["cobertura móvil", "wifi", "desconexión digital", "internet", "teruel", "pirineos"],
    question: {
      es: "¿Hay cobertura de teléfono móvil y conexión WiFi en los refugios?",
      en: "Is there mobile signal and WiFi connection at the sanctuaries?",
      fr: "Y a-t-il une couverture mobile et le WiFi dans les refuges ?",
      cat: "Hi ha cobertura de telèfon mòbil i connexió WiFi als refugis?",
      pt: "Existe rede móvel e ligação WiFi nos refúgios?"
    },
    answer: {
      es: "Varía según la filosofía de cada santuario. En 'El Refugio de Obsidiana' (Teruel) practicamos una desconexión digital estricta: NO hay cobertura de telefonía móvil ni WiFi comercial (disponemos únicamente de un canal satelital de emergencia para tu tranquilidad). En 'Refugi del Canigó' y 'Falesia Atlántica' dispones de WiFi satelital Starlink de alta velocidad en áreas comunes y villas, con opción de desconexión bajo petición.",
      en: "It depends on the sanctuary's core philosophy. At 'The Obsidian Sanctuary' (Teruel), we enforce an intentional digital detox: zero cell service or commercial WiFi (satellite emergency communications are kept on standby). At 'Refugi del Canigó' and 'Falesia Atlántica', high-speed Starlink WiFi is available.",
      fr: "Chaque sanctuaire a sa propre philosophie. Au 'Refuge d'Obsidienne', nous pratiquons une déconnexion numérique stricte : zéro réseau mobile et zéro WiFi commercial. Au 'Refugi del Canigó' et à 'Falesia Atlántica', le WiFi Starlink à haut débit est disponible.",
      cat: "Varia segons la filosofia de cada santuari. A 'El Refugi d'Obsidiana' practiquem una desconnexió digital estricta: NO hi ha cobertura mòbil ni WiFi comercial. A 'Refugi del Canigó' i 'Falesia Atlántica' disposem de WiFi Starlink.",
      pt: "Varia segundo a filosofia de cada refúgio. No 'Refúgio de Obsidiana' praticamos uma desconexão digital estrita: NÃO há rede móvel nem WiFi comercial. No 'Refugi del Canigó' e 'Falesia Atlántica' dispõe de WiFi Starlink de alta velocidade."
    }
  },
  {
    id: "faq-acceso",
    category: "acceso",
    aiSearchKeywords: ["acceso en coche", "parking", "acceso a pie", "equipaje", "llegada"],
    question: {
      es: "¿Se puede llegar en coche hasta la puerta del alojamiento?",
      en: "Can I drive directly to the door of my accommodation?",
      fr: "Peut-on arriver en voiture jusqu'à la porte de l'hébergement ?",
      cat: "Es pot arribar en cotxe fins a la porta de l'allotjament?",
      pt: "É possível chegar de carro até à porta do alojamento?"
    },
    answer: {
      es: "No. Para preservar el aire puro, la acústica natural y evitar la huella de neumáticos en los senderos, todos los vehículos quedan aparcados en nuestro parking privado vigilado. El tramo final (entre 3 y 8 minutos a pie) se recorre por un sendero iluminado con luz solar indirecta. Nuestro servicio de asistencia transporta tu equipaje en vehículo eléctrico silencioso si lo deseas.",
      en: "No. To protect clean air, natural soundscapes, and ecosystem paths, all vehicles are parked in our private guarded lot. The final leg (3 to 8 minutes walk) is traversed along a gently lit nature trail. Our team handles your luggage via silent electric transport.",
      fr: "Non. Afin de préserver l'air pur et le silence, tous les véhicules restent garés sur notre parking privé sécurisé. Le dernier tronçon (3 à 8 min à pied) s'effectue sur un chemin éclairé à l'énergie solaire. Notre équipe achemine vos bagages en véhicule électrique silencieux.",
      cat: "No. Per preservar l'aire pur i l'acústica natural, tots els vehicles queden aparcats al nostre aparcament privat. L'últim tram (de 3 a 8 minuts a peu) es fa per un camí de natura. El nostre equip transporta l'equipatge.",
      pt: "Não. Para preservar o ar puro e o silêncio, os veículos ficam no nosso parque seguro. O troço final (3 a 8 minutos a pé) é percorrido por um trilho de natureza. A nossa equipa transporta a sua bagagem em veículo elétrico silencioso."
    }
  },
  {
    id: "faq-ninos",
    category: "ninos",
    aiSearchKeywords: ["niños", "familias", "solo adultos", "edad mínima", "retiro"],
    question: {
      es: "¿Es apto para acudir con niños y en familia?",
      en: "Are the sanctuaries suitable for children and families?",
      fr: "Les sanctuaires sont-ils adaptés aux enfants et aux familles ?",
      cat: "És apte per anar amb nens i en família?",
      pt: "É adequado para ir com crianças e em família?"
    },
    answer: {
      es: "Depende del destino. 'Refugi del Canigó' y 'Falesia Atlántica' son ideales para familias que buscan enseñar a sus hijos el respeto por la naturaleza, con actividades de senderismo y piscinas naturales. Por el contrario, 'El Refugio de Obsidiana' y 'El Nido del Estrecho' son espacios de silencio sagrado y descanso introspectivo diseñados exclusivamente para mayores de 18 años.",
      en: "It depends on the destination. 'Refugi del Canigó' and 'Falesia Atlántica' warmly welcome families seeking nature education. In contrast, 'El Refugio de Obsidiana' and 'El Nido del Estrecho' are adults-only (18+) retreats crafted for silence and deep rest.",
      fr: "'Refugi del Canigó' et 'Falesia Atlántica' sont parfaits pour les familles souhaitant faire découvrir la nature. En revanche, 'El Refugio de Obsidiana' et 'El Nido del Estrecho' sont réservés exclusivement aux adultes (18+).",
      cat: "'Refugi del Canigó' i 'Falesia Atlántica' són ideals per a famílies. En canvi, 'El Refugi d'Obsidiana' i 'El Nido del Estrecho' són espais de silenci exclusivament per a majors de 18 anys.",
      pt: "'Refugi del Canigó' e 'Falesia Atlántica' são ideais para famílias. Em contrapartida, 'El Refugio de Obsidiana' e 'El Nido del Estrecho' são refúgios de silêncio exclusivos para adultos (18+)."
    }
  },
  {
    id: "faq-mascotas",
    category: "mascotas",
    aiSearchKeywords: ["mascotas", "perros", "pet friendly", "normas mascotas"],
    question: {
      es: "¿Puedo viajar con mi perro o mascota?",
      en: "Can I bring my dog or pet?",
      fr: "Puis-je venir avec mon chien ou mon animal de compagnie ?",
      cat: "Puc viatjar amb el meu gos o mascota?",
      pt: "Posso viajar com o meu cão ou animal de estimação?"
    },
    answer: {
      es: "Sí, en dos de nuestros refugios. 'Refugi del Canigó' y 'Falesia Atlántica' cuentan con política Pet Friendly donde tu perro disfrutará de bosques privados y senderos marítimos (incluimos camita orgánica y comedores). En 'El Refugio de Obsidiana' y 'El Nido del Estrecho' no se admiten mascotas para preservar la tranquilidad silvestre y la fauna endémica protegida.",
      en: "Yes, at two of our sanctuaries. 'Refugi del Canigó' and 'Falesia Atlántica' are pet-friendly (we provide organic dog beds and bowls). At 'El Refugio de Obsidiana' and 'El Nido del Estrecho', pets are not permitted to protect sensitive local wildlife.",
      fr: "Oui, dans deux de nos sanctuaires : 'Refugi del Canigó' et 'Falesia Atlántica'. Au 'Refuge d'Obsidienne' et au 'Nido del Estrecho', les animaux ne sont pas admis afin de protéger la faune sauvage.",
      cat: "Sí, a dos dels nostres refugis: 'Refugi del Canigó' i 'Falesia Atlántica'. A 'El Refugi d'Obsidiana' i 'El Nido del Estrecho' no s'admeten mascotes.",
      pt: "Sim, em dois dos nossos refúgios: 'Refugi del Canigó' e 'Falesia Atlántica'. No 'Refúgio de Obsidiana' e 'El Nido del Estrecho' não são permitidos animais de estimação."
    }
  },
  {
    id: "faq-clima",
    category: "clima",
    aiSearchKeywords: ["lluvia", "clima", "tormenta", "calefacción", "invierno"],
    question: {
      es: "¿Qué pasa si llueve, nieva o hay mal tiempo durante mi estancia?",
      en: "What happens if it rains, snows, or there is bad weather during my stay?",
      fr: "Que se passe-t-il s'il pleut ou s'il neige pendant mon séjour ?",
      cat: "Què passa si plou o hi ha mal temps durant la meva estada?",
      pt: "O que acontece se chover ou houver mau tempo durante a estadia?"
    },
    answer: {
      es: "La lluvia y el clima adverso forman parte de la magia del refugio. Nuestras estructuras están equipadas con aislamiento térmico ecológico de alta eficiencia, estufas de pellets o chimeneas de leña natural, ventanales panorámicos de triple cristal y mantas de lana merino. Escuchar el repicar de la lluvia desde la calidez de tu lecho con una infusión artesanal es una de las experiencias más valoradas por nuestros huéspedes.",
      en: "Rain and storms are an essential part of the wilderness experience. All accommodations feature high-grade eco-insulation, wood stoves, triple-pane panoramic glass, and merino wool throws.",
      fr: "La pluie et le brouillard font partie intégrante de la magie. Nos hébergements disposent d'une isolation écologique de pointe, de poêles à bois et de grandes baies vitrées panoramiques.",
      cat: "La pluja i el mal temps formen part de la màgia del refugi. Estan equipats amb aïllament tèrmic ecològic, estufes de llenya i finestrals panoràmics.",
      pt: "A chuva e o mau tempo fazem parte da magia do refúgio. Estão equipados com isolamento térmico ecológico, lareiras a lenha e janelas panorâmicas."
    }
  },
  {
    id: "faq-sostenibilidad",
    category: "filosofia",
    aiSearchKeywords: ["greenwashing", "sostenibilidad real", "energía limpia", "hidroeléctrica", "huella de carbono"],
    question: {
      es: "¿Por qué Experiencias con Estilo es sostenibilidad real y no 'greenwashing'?",
      en: "Why is Experiencias con Estilo genuine sustainability rather than 'greenwashing'?",
      fr: "Pourquoi Experiencias con Estilo est-il réellement durable et non du 'greenwashing' ?",
      cat: "Per què Experiencias con Estilo és sostenibilitat real i no 'greenwashing'?",
      pt: "Por que Experiencias con Estilo é sustentabilidade real e não 'greenwashing'?"
    },
    answer: {
      es: "A diferencia de cadenas hoteleras que ponen un cartel de 'reutilice las toallas', nosotros invertimos en infraestructura regenerativa real: en Canigó generamos el 100% de la energía con microturbina hidroeléctrica propia de río; en Falesia usamos depuración biológica de aguas y piscinas climatizadas con solar; en Obsidiana limitamos las plazas a 2 personas para no alterar el suelo volcánico. Además, destinamos el 10% de la facturación directa a la conservación del bosque y guías locales.",
      en: "Unlike commercial hotels that merely display 'reuse your towel' signs, we invest in real regenerative infrastructure: our own private hydro plant at Canigó generating 100% clean power; biological wastewater treatment and solar seawater pools at Falesia; strict 2-guest limits at Obsidiana.",
      fr: "Contrairement aux hôtels industriels, nous investissons dans de véritables infrastructures régénératives : micro-centrale hydroélectrique au Canigó, traitement biologique des eaux à Falesia, et limitation stricte du nombre de visiteurs.",
      cat: "A diferència dels hotels convencionals, invertim en infraestructura regenerativa real: generació hidroelèctrica pròpia al Canigó, tractament biològic d'aigües a Falesia i cupos molt reduïts.",
      pt: "Ao contrário dos hotéis convencionais, investimos em infraestrutura regenerativa real: geração hídrica própria no Canigó, tratamento biológico de águas em Falesia e lotação muito reduzida."
    }
  }
];
