export type Lang = 'es' | 'ca' | 'fr';

/**
 * Extrae el texto en el idioma activo de cualquier campo multilingüe del config.
 */
export function t(
  field: Record<Lang, string>,
  lang: Lang
): string {
  return field[lang] ?? field['es'];
}

/**
 * Construye la URL de WhatsApp con mensaje prellenado según el idioma.
 */
export function buildWhatsAppUrl(phone: string, lang: Lang, customMsg?: string): string {
  const defaultMessages: Record<Lang, string> = {
    es: 'Hola, quiero consultar disponibilidad para Bosque Luna Glamping',
    ca: 'Hola, vull consultar disponibilitat per a Bosque Luna Glamping',
    fr: 'Bonjour, je souhaite consulter la disponibilité pour Bosque Luna Glamping',
  };

  const textToEncode = customMsg || defaultMessages[lang] || defaultMessages.es;
  const encodedMsg = encodeURIComponent(textToEncode);
  const cleanPhone  = phone.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
}
