/**
 * Datos estructurados (schema.org) para Google: ficha de negocio local + preguntas frecuentes.
 * `__SITE_URL__` lo reemplaza el servidor por el dominio real (variable SITE_URL o el dominio
 * desde el que se visita la web), así funciona aunque todavía no haya dominio.
 */
import { AREA, BRAND, FAQS, ALLIES } from './config';

const SITE = '__SITE_URL__';

const SERVICES = [
  'Avisos luminosos',
  'Letras corpóreas en acrílico',
  'Avisos de neón flex LED',
  'Cajas de luz',
  'Stickers y vinilos',
  'Corte láser',
  'Impresión digital gran formato',
  'Señalización',
  'Habladores QR',
  'Diseño gráfico',
  'Instalación de avisos'
];

export function buildJsonLd() {
  const business = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE}/#negocio`,
    name: BRAND.name,
    alternateName: 'Kano Publicidad Bucaramanga',
    description:
      'Fabricación e instalación de avisos luminosos, letras corpóreas en acrílico, neón flex, stickers, vinilos y señalización en Bucaramanga. Envíos a toda Colombia y al exterior.',
    url: `${SITE}/`,
    logo: `${SITE}/logo-kano.png`,
    image: [`${SITE}/og-image.jpg`],
    sameAs: [BRAND.instagramUrl],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bucaramanga',
      addressRegion: 'Santander',
      postalCode: '680001',
      addressCountry: 'CO'
    },
    areaServed: [
      ...AREA.installCities.map(name => ({ '@type': 'City', name })),
      { '@type': 'AdministrativeArea', name: 'Área Metropolitana de Bucaramanga' },
      { '@type': 'Country', name: 'Colombia' }
    ],
    knowsAbout: SERVICES,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de publicidad exterior',
      itemListElement: SERVICES.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s } }))
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'ventas',
      url: BRAND.whatsapp,
      areaServed: 'CO',
      availableLanguage: ['es']
    },
    brand: { '@type': 'Brand', name: BRAND.name }
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE}/#web`,
    url: `${SITE}/`,
    name: BRAND.name,
    inLanguage: 'es-CO',
    publisher: { '@id': `${SITE}/#negocio` }
  };

  const clients = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Empresas que confían en Kano Publicidad',
    itemListElement: ALLIES.map((a, i) => ({ '@type': 'ListItem', position: i + 1, name: a.name }))
  };

  return [business, website, faq, clients];
}
