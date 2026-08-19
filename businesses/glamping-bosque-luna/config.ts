export interface Service {
  id: string;
  title: Record<'es' | 'ca' | 'fr', string>;
  description: Record<'es' | 'ca' | 'fr', string>;
}

export interface BusinessConfig {
  id: string;
  name: string;
  slogan: Record<'es' | 'ca' | 'fr', string>;
  subSlogan: Record<'es' | 'ca' | 'fr', string>;
  services: Service[];
  pillars: Record<'es' | 'ca' | 'fr', string>[];
  theme: {
    primaryBackground: string;
    secondaryBackground: string;
    primaryAccent: string;
    secondaryAccent: string;
  };
  contact: {
    whatsapp: string;
    instagram: string;
  };
}

export const config: BusinessConfig = {
  id: 'glamping-bosque-luna',
  name: 'Bosque Luna Glamping',
  slogan: {
    es: 'Experiencia LUNA LLENA - Sumérgete en la paz del bosque bajo la luz de la luna.',
    ca: 'Experiència LUNA LLENA - Submergeix-te en la pau del bosc sota la llum de la lluna.',
    fr: 'Expérience LUNA LLENA - Plongez dans la paix de la forêt sous la lumière de la lune.',
  },
  subSlogan: {
    es: 'Desconecta para reconectar mejor.',
    ca: 'Desconnecta per a reconnectar millor.',
    fr: 'Déconnectez pour mieux vous reconnecter.',
  },
  services: [
    {
      id: 'noche-luna',
      title: {
        es: 'Noche de Luna Completa',
        ca: 'Nit de Lluna Completa',
        fr: 'Nuit de Lune Complète',
      },
      description: {
        es: 'Conexión profunda con la naturaleza y contigo mismo bajo las estrellas.',
        ca: 'Connexió profunda amb la natura i amb tu mateix sota les estrelles.',
        fr: 'Connexion profonde avec la nature et soi-même sous les étoiles.',
      },
    },
    {
      id: 'alojamiento-premium',
      title: {
        es: 'Alojamiento Premium',
        ca: 'Allotjament Premium',
        fr: 'Hébergement Premium',
      },
      description: {
        es: 'Carpas espaciosas y confortables estilo Bell Tent VIP con todo lo necesario.',
        ca: 'Tendes espaioses i confortables estil Bell Tent VIP amb tot el necessari.',
        fr: 'Tentes spacieuses et confortables style Bell Tent VIP avec tout le nécessaire.',
      },
    },
    {
      id: 'fogata',
      title: {
        es: 'Fogata',
        ca: 'Foguera',
        fr: 'Feu de Camp',
      },
      description: {
        es: 'Instantes cálidos alrededor del fuego bajo las estrellas.',
        ca: 'Instants càlids al voltant del foc sota les estrelles.',
        fr: 'Instants chaleureux autour du feu sous les étoiles.',
      },
    },
    {
      id: 'canasta-gourmet',
      title: {
        es: 'Canasta Gourmet',
        ca: 'Cistella Gourmet',
        fr: 'Panier Gourmand',
      },
      description: {
        es: 'Productos locales y de estación para una cena inolvidable.',
        ca: 'Productes locals i de temporada per a un sopar inoblidable.',
        fr: 'Produits locaux et de saison pour un dîner inoubliable.',
      },
    },
    {
      id: 'bienestar',
      title: {
        es: 'Momentos de Bienestar',
        ca: 'Moments de Benestar',
        fr: 'Moments de Bien-être',
      },
      description: {
        es: 'Meditación, respiración y reconexión profunda.',
        ca: 'Meditació, respiració i reconnexió profunda.',
        fr: 'Méditation, respiration et reconnexion profonde.',
      },
    },
    {
      id: 'observacion-estelar',
      title: {
        es: 'Cielo Estrellado',
        ca: 'Cel Estrel·lat',
        fr: 'Ciel Étoilé',
      },
      description: {
        es: 'Observación de constelaciones bajo un cielo nocturno puro y sin contaminación.',
        ca: 'Observació de constel·lacions sota un cel nocturn pur i sense contaminació.',
        fr: 'Observation des constellations sous un ciel nocturne pur et préservé.',
      },
    },
  ],
  pillars: [
    {
      es: 'Para parejas, amigos o grupos privados',
      ca: 'Per a parelles, amics o grups privats',
      fr: 'Pour couples, amis ou groupes privés',
    },
    {
      es: 'Respeto por la naturaleza y turismo responsable',
      ca: 'Respecte per la natura i turisme responsable',
      fr: 'Respect de la nature et tourisme responsable',
    },
    {
      es: 'Entorno natural excepcional y privado',
      ca: 'Entorn natural excepcional i privat',
      fr: 'Cadre naturel exceptionnel et privé',
    },
    {
      es: 'Experiencia auténtica e inolvidable',
      ca: 'Experiència autèntica i inoblidable',
      fr: 'Expérience authentique et inoubliable',
    },
  ],
  theme: {
    primaryBackground: '#0B130E', // Negro noche / Verde bosque profundo
    secondaryBackground: '#F4EFE6', // Beige / Crema suave
    primaryAccent: '#D4AF37', // Dorado cálido de fuego
    secondaryAccent: '#E5A93C', // Dorado secundario
  },
  contact: {
    whatsapp: '34651343400',
    instagram: 'bosquelunaglamping',
  },
};
