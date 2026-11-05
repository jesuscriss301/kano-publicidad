/** Ruta donde vive la web (ej. /kano-publicidad/). La define BASE_PATH al compilar. */
const BASE = import.meta.env.BASE_URL;

/** Datos de la marca. Todo lo que el cliente pueda querer cambiar está aquí. */
export const BRAND = {
  name: 'Kano Publicidad',
  city: 'Bucaramanga, Santander',
  whatsapp: 'https://wa.me/message/RQTACTPZ67ZUP1',
  instagramUser: 'kano.publicidad',
  get instagramUrl() {
    return `https://www.instagram.com/${this.instagramUser}/`;
  },
  /** Endpoint del mini servidor que entrega las fotos de Instagram.
   *  En producción va en el mismo dominio (/api/instagram). En desarrollo se puede
   *  apuntar a otro con la variable VITE_IG_FEED_URL. */
  feedUrl: (import.meta.env.VITE_IG_FEED_URL as string | undefined) ?? `${BASE}api/instagram`,
  /** Cuántas fotos mostrar en la galería */
  galleryLimit: 18
};

/** Zona de servicio (se usa en los textos y en la ficha de negocio para Google) */
export const AREA = {
  /** Sede principal: Bucaramanga y su área metropolitana (foco del SEO) */
  hq: 'Bucaramanga',
  metroCities: ['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta'],
  coverage: 'Instalación y envíos a toda Colombia'
};

/** Aliado tecnológico (aparece destacado en la sección de aliados y en el pie de página) */
export const TECH_PARTNER = {
  name: 'EasyPro Digital',
  role: 'Aliado tecnológico',
  url: 'https://easyprodigital.com',
  /** WhatsApp de EasyPro para la sección "No te olvides de tu web" */
  whatsapp: 'https://wa.me/573238816434?text=' + encodeURIComponent('Hola EasyPro, vi la web de Kano Publicidad y quiero una web para mi negocio')
};

/** Empresas a las que Kano les ha hecho avisos. La imagen es una foto del aviso que Kano les fabricó
 *  (public/aliados/). Para quitar o agregar una, edita esta lista. */
export const ALLIES: { name: string; logo: string }[] = [
  { name: 'Droguerías Granados', logo: `${BASE}aliados/granados.webp` },
  { name: 'Maemi', logo: `${BASE}aliados/maemi.webp` },
  { name: 'Go Dentist', logo: `${BASE}aliados/go-dentist.webp` },
  { name: 'Piccoteo Market', logo: `${BASE}aliados/piccoteo.webp` },
  { name: 'Supermercado Las Marías', logo: `${BASE}aliados/las-marias.webp` },
  { name: 'Mordiscos Empanadas', logo: `${BASE}aliados/mordiscos.webp` },
  { name: 'Hospital Veterinario San Jorge', logo: `${BASE}aliados/san-jorge.webp` },
  { name: 'Clinioral', logo: `${BASE}aliados/clinioral.webp` },
  { name: 'Corazón Dental', logo: `${BASE}aliados/corazon-dental.webp` },
  { name: 'ACET', logo: `${BASE}aliados/acet.webp` },
  { name: 'Liceo Moderno', logo: `${BASE}aliados/liceo-moderno.webp` },
  { name: 'Nativa Coffee', logo: `${BASE}aliados/nativa.webp` },
  { name: 'Best Movil', logo: `${BASE}aliados/best-movil.webp` },
  { name: 'Skala Store', logo: `${BASE}aliados/skala.webp` },
  { name: 'DieselLab', logo: `${BASE}aliados/diesellab.webp` },
  { name: 'La Premiere Hamburguesería', logo: `${BASE}aliados/la-premiere.webp` },
  { name: 'Otsu Sushi', logo: `${BASE}aliados/otsu.webp` },
  { name: "Talen's", logo: `${BASE}aliados/talens.webp` },
  { name: 'Geotek', logo: `${BASE}aliados/geotek.webp` }
];

/** Preguntas frecuentes (se muestran en la web y Google las puede leer) */
export const FAQS = [
  {
    q: '¿Dónde queda Kano Publicidad?',
    a: 'Nuestra sede principal y taller están en Bucaramanga, Santander. Atendemos todo el área metropolitana: Bucaramanga, Floridablanca, Girón y Piedecuesta.'
  },
  {
    q: '¿Instalan y envían avisos fuera de Bucaramanga?',
    a: 'Sí. Fabricamos en Bucaramanga e instalamos y enviamos avisos a toda Colombia, bien empacados y listos para instalar.'
  },
  {
    q: '¿Qué tipos de avisos hacen?',
    a: 'Avisos luminosos, letras corpóreas en acrílico, neón flex LED, cajas de luz, señalización, vinilos, stickers, habladores QR, carteleras, trofeos y buzones en acrílico.'
  },
  {
    q: '¿Me ayudan con el diseño si no tengo logo?',
    a: 'Sí. Diseñamos o mejoramos tu logo y te mostramos una simulación de cómo se verá el aviso antes de fabricarlo.'
  },
  {
    q: '¿Cuánto cuesta un aviso luminoso?',
    a: 'Depende del tamaño, el material y el tipo de luz. Escríbenos por WhatsApp con tu logo y las medidas y te enviamos la cotización.'
  },
  {
    q: '¿Cuánto se demora mi aviso?',
    a: 'Depende del trabajo. Al cotizar te damos la fecha de entrega o de instalación.'
  }
];

/** Colores sacados del logo de Kano */
export const COLORS = {
  navy: '#020157',
  amber: '#F7BB13',
  amberLight: '#FFE39A',
  white: '#FFFFFF'
};
