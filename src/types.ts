export type Language = 'es' | 'en' | 'fr' | 'cat' | 'pt';

export interface Refuge {
  id: string;
  slug: string;
  name: string;
  tagline: Record<Language, string>;
  location: Record<Language, string>;
  region: Record<Language, string>;
  country: Record<Language, string>;
  coordinates: {
    lat: number;
    lng: number;
  };
  heroImage: string;
  gallery: string[];
  description: Record<Language, string>;
  longDescription: Record<Language, string>;
  highlights: Record<Language, string[]>;
  amenities: {
    icon: string;
    label: Record<Language, string>;
  }[];
  category: 'mountain' | 'starlight' | 'ocean' | 'historic';
  petFriendly: boolean;
  adultsOnly: boolean;
  footAccessOnly: boolean;
  maxGuests: number;
  priceFromPerNight: number;
  currency: string;
  areaHa?: number;
  specialFeature: Record<Language, string>;
  weatherPreview?: {
    temp: string;
    condition: Record<Language, string>;
    starlightScore?: string;
  };
}

export interface FAQItem {
  id: string;
  question: Record<Language, string>;
  answer: Record<Language, string>;
  category: 'cobertura' | 'ninos' | 'mascotas' | 'clima' | 'acceso' | 'filosofia';
  aiSearchKeywords: string[];
}

export interface LocalPartner {
  id: string;
  name: string;
  type: Record<Language, string>;
  location: Record<Language, string>;
  description: Record<Language, string>;
  impactBadge: Record<Language, string>;
  image: string;
}

export interface BookingLead {
  fullName: string;
  email: string;
  phone: string;
  preferredRefuge: string;
  checkIn?: string;
  checkOut?: string;
  guests: number;
  travelStyle: string;
  pets: boolean;
  notes: string;
  language: Language;
  createdAt: string;
}
