const BASE = import.meta.env.BASE_URL;
const IG = 'https://www.instagram.com';

/** Trabajos destacados (fotos de public/carrusel, recortadas a 4:5) */
const SLIDES = [
  { file: '01', post: '/p/C6FUIGONDhR/', alt: 'Fachada con letras iluminadas para Maemi Oficial' },
  { file: '02', post: '/p/DLoG-D7x1el/', alt: 'Letras corpóreas de colores para +Vida' },
  { file: '03', post: '/p/DDsAHiKPX0A/', alt: 'Catrina en neón flex multicolor' },
  { file: '04', post: '/p/CTeugOyAexK/', alt: 'Aviso en acrílico para Bulldog Pet Shop' },
  { file: '05', post: '/p/De92UvWiSOf/', alt: 'Frase en neón flex cálido para cafetería' },
  { file: '06', post: '/p/Cf88loqurLl/', alt: 'Aviso luminoso para Best Movil' },
  { file: '07', post: '/p/DTygU0JATHU/', alt: 'Fachada corporativa para M&M Medical' },
  { file: '08', post: '/p/DIce-1xyseU/', alt: 'Aviso circular en acrílico para una birriería' },
  { file: '09', post: '/p/DIcfztSSa3G/', alt: 'Letras luminosas para Buffalos Parrilla' },
  { file: '10', post: '/p/DHdqhTBuZwJ/', alt: 'Letras doradas con luz para un spa de uñas' }
];

/** Cinta de fotos que avanza sola (igual que la de aliados, solo CSS). La lista va dos veces para que no tenga corte. */
export default function Featured() {
  return (
    <section id="destacados" className="featured" aria-label="Trabajos destacados de Kano Publicidad">
      <div className="wrap featured__head">
        <span className="tag">Trabajos destacados</span>
        <p className="featured__title">
          Avisos que ya <span className="accent">iluminan</span> Santander
        </p>
      </div>

      <div className="featured__marquee">
        <div className="featured__track">
          {[...SLIDES, ...SLIDES].map((s, i) => {
            const copy = i >= SLIDES.length;
            return (
              <a
                key={`${s.file}-${i}`}
                className="featured__item"
                href={`${IG}${s.post}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={copy || undefined}
                tabIndex={copy ? -1 : undefined}
              >
                <img
                  src={`${BASE}carrusel/trabajo-${s.file}.webp`}
                  alt={copy ? '' : `${s.alt}, hecho por Kano Publicidad en Bucaramanga`}
                  width={640}
                  height={800}
                  loading={i < 5 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
