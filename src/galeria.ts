/**
 * Fotos de respaldo para la galería: trabajos reales de @kano.publicidad.
 * Se muestran mientras no esté configurado el token de Instagram (o si Instagram falla).
 * Las imágenes están en public/galeria/.
 */
const BASE = import.meta.env.BASE_URL;
const IG = 'https://www.instagram.com/kano.publicidad';

export const GALERIA: { id: string; img: string; url: string; title: string }[] = [
  ['kano-00', '/p/Cf88loqurLl/', 'Aviso luminoso Best Movil'],
  ['kano-01', '/reel/C6FSHOoNzrp/', 'Neón para vitrina Maemi'],
  ['kano-02', '/reel/Cn5rbZNDm0I/', 'Letras doradas con luz trasera'],
  ['kano-03', '/reel/De92UvWiSOf/', 'Frase en neón flex para cafetería'],
  ['kano-04', '/p/De92M9Oi-97/', 'Aviso Nativa Coffee'],
  ['kano-05', '/p/DeFpwm7Cubl/', 'Habladores tri stand impresos'],
  ['kano-06', '/p/DeFpj1nizXO/', 'Fachada Landa Shoes'],
  ['kano-07', '/p/DbeqQmoiDbq/', 'Letras corpóreas con efecto halo'],
  ['kano-08', '/p/DbepvdJCWZG/', 'Aviso luminoso El Parche del Perro'],
  ['kano-09', '/p/DbepTbgivoN/', 'Letras en acrílico Emma Boutique'],
  ['kano-10', '/p/DZFhTW6uzFH/', 'Hablador QR de redes sociales'],
  ['kano-11', '/p/DZFhGVIOcSQ/', 'Hablador QR de medios de pago']
].map(([id, path, title]) => ({ id, img: `${BASE}galeria/${id}.webp`, url: `${IG}${path}`, title }));
