const BASE = import.meta.env.BASE_URL;
const IG = 'https://www.instagram.com';

/** Trabajos destacados (fotos de public/carrusel, en su mayoría horizontales para no cortar los avisos) */
const SLIDES = [
  { file: '01', w: 800, h: 600, post: '/p/C6FUIGONDhR/', alt: 'Fachada con letras iluminadas para Maemi Oficial' },
  { file: '02', w: 800, h: 600, post: '/p/DLoG-D7x1el/', alt: 'Letras corpóreas de colores para +Vida' },
  { file: '03', w: 600, h: 600, post: '/p/DDsAHiKPX0A/', alt: 'Catrina en neón flex multicolor' },
  { file: '04', w: 800, h: 600, post: '/p/CTeugOyAexK/', alt: 'Aviso en acrílico para Bulldog Pet Shop' },
  { file: '05', w: 450, h: 600, post: '/p/De92UvWiSOf/', alt: 'Frase en neón flex cálido para cafetería' },
  { file: '06', w: 800, h: 600, post: '/p/Cf88loqurLl/', alt: 'Aviso luminoso para Best Movil' },
  { file: '07', w: 800, h: 600, post: '/p/DTygU0JATHU/', alt: 'Fachada corporativa para M&M Medical' },
  { file: '08', w: 800, h: 600, post: '/p/DIce-1xyseU/', alt: 'Aviso circular en acrílico para una birriería' },
  { file: '09', w: 800, h: 600, post: '/p/DIcfztSSa3G/', alt: 'Letras luminosas para Buffalos Parrilla' },
  { file: '10', w: 800, h: 600, post: '/p/DHdqhTBuZwJ/', alt: 'Letras doradas con luz para un spa de uñas' }
];

/** Cinta de fotos que avanza sola (igual que la de aliados, solo CSS). La lista va dos veces para que no tenga corte. */
export default function Featured() {
  return (
    <section id="destacados" className="featured" aria-label="Trabajos destacados de Kano Publicidad">
      <div className="featured__marquee">
        <div className="featured__track">
          {[...SLIDES, ...SLIDES].map((s, i) => {
            const copy = i >= SLIDES.length;
            return (
              <a
                key={`${s.file}-${i}`}
                className="featured__item"
                style={{ aspectRatio: `${s.w} / ${s.h}` }}
                href={`${IG}${s.post}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={copy || undefined}
                tabIndex={copy ? -1 : undefined}
              >
                <img
                  src={`${BASE}carrusel/trabajo-${s.file}.webp`}
                  alt={copy ? '' : `${s.alt}, hecho por Kano Publicidad en Bucaramanga`}
                  width={s.w}
                  height={s.h}
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
