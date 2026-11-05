const BASE = import.meta.env.BASE_URL;
const IG = 'https://www.instagram.com';

/** Trabajos destacados (fotos de public/carrusel, en formato horizontal para no cortar los avisos) */
const SLIDES = [
  { file: '01', w: 800, h: 600, post: '/p/C6FUIGONDhR/', title: 'Maemi Oficial', kind: 'Fachada con letras iluminadas' },
  { file: '02', w: 800, h: 600, post: '/p/DLoG-D7x1el/', title: '+Vida', kind: 'Letras corpóreas de colores' },
  { file: '03', w: 600, h: 600, post: '/p/DDsAHiKPX0A/', title: 'Catrina en neón', kind: 'Neón flex multicolor' },
  { file: '04', w: 800, h: 600, post: '/p/CTeugOyAexK/', title: 'Bulldog Pet Shop', kind: 'Aviso en acrílico' },
  { file: '05', w: 450, h: 600, post: '/p/De92UvWiSOf/', title: 'Frase para cafetería', kind: 'Neón flex cálido' },
  { file: '06', w: 800, h: 600, post: '/p/Cf88loqurLl/', title: 'Best Movil', kind: 'Aviso luminoso' },
  { file: '07', w: 800, h: 600, post: '/p/DTygU0JATHU/', title: 'M&M Medical', kind: 'Fachada corporativa' },
  { file: '08', w: 800, h: 600, post: '/p/DIce-1xyseU/', title: 'Birria', kind: 'Aviso circular en acrílico' },
  { file: '09', w: 800, h: 600, post: '/p/DIcfztSSa3G/', title: 'Buffalos Parrilla', kind: 'Letras luminosas' },
  { file: '10', w: 800, h: 600, post: '/p/DHdqhTBuZwJ/', title: 'Nails & Spa', kind: 'Letras doradas con luz' }
];

/** Carrusel de tarjetas en movimiento continuo (solo CSS, como la cinta de aliados).
 *  La lista va dos veces para que el bucle no tenga corte; se detiene al pasar el mouse. */
export default function Featured() {
  return (
    <section id="destacados" className="featured" aria-label="Trabajos destacados de Kano Publicidad">
      <div className="wrap featured__head">
        <div>
          <span className="tag">Trabajos destacados</span>
          <p className="featured__title">
            Avisos que ya <span className="accent">iluminan</span> Santander
          </p>
        </div>
      </div>

      <div className="featured__marquee">
        <div className="featured__track">
          {[...SLIDES, ...SLIDES].map((s, i) => {
            const copy = i >= SLIDES.length;
            return (
              <a
                key={`${s.file}-${i}`}
                className="featured__card"
                style={{ aspectRatio: `${s.w} / ${s.h}` }}
                href={`${IG}${s.post}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={copy || undefined}
                tabIndex={copy ? -1 : undefined}
                aria-label={copy ? undefined : `${s.title}: ${s.kind}. Ver en Instagram`}
              >
                <img
                  src={`${BASE}carrusel/trabajo-${s.file}.webp`}
                  alt={copy ? '' : `${s.kind} para ${s.title}, hecho por Kano Publicidad en Bucaramanga`}
                  width={s.w}
                  height={s.h}
                  loading={i < 5 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <span className="featured__caption">
                  <strong>{s.title}</strong>
                  <span>{s.kind}</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
