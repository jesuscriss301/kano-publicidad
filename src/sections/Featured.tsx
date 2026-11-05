import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { Icon } from '../components/ui';
import { useReducedMotion } from '../lib/useInView';

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

const AUTOPLAY_MS = 3800;
const N = SLIDES.length;
// 3 copias seguidas para que el carrusel sea infinito y siempre tenga fotos a ambos lados
const LOOP = [...SLIDES, ...SLIDES, ...SLIDES];

export default function Featured() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  const [active, setActiveLoop] = useState(N); // posición dentro de LOOP (empieza en la copia del medio)
  const goTo = useCallback((i: number, smooth = true) => {
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2, behavior: smooth ? 'smooth' : 'auto' });
  }, []);

  // al cargar, se ubica en la copia del medio sin animación
  useEffect(() => {
    goTo(N, false);
  }, [goTo]);

  // cuál tarjeta está en el centro
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    let settle = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let dist = Infinity;
        [...track.children].forEach((c, i) => {
          const el = c as HTMLElement;
          const d = Math.abs(el.offsetLeft + el.clientWidth / 2 - mid);
          if (d < dist) {
            dist = d;
            best = i;
          }
        });
        setActiveLoop(best);
        // si se salió de la copia del medio, salta en silencio a la foto equivalente
        window.clearTimeout(settle);
        settle = window.setTimeout(() => {
          if (best < N || best >= 2 * N) {
            const target = N + (best % N);
            goTo(target, false);
            setActiveLoop(target);
          }
        }, 160);
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
    };
  }, [goTo]);

  // avance automático (se pausa al tocar, al pasar el mouse o si la pestaña no está visible)
  useEffect(() => {
    if (paused || reduced) return;
    const t = window.setInterval(() => {
      if (document.visibilityState === 'visible') goTo(active + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [active, paused, reduced, goTo]);

  return (
    <section
      id="destacados"
      className="featured"
      aria-roledescription="carrusel"
      aria-label="Trabajos destacados de Kano Publicidad"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="wrap featured__head">
        <div>
          <span className="tag">Trabajos destacados</span>
          <p className="featured__title">
            Avisos que ya <span className="accent">iluminan</span> Santander
          </p>
        </div>
        <div className="featured__arrows">
          <button className="featured__arrow" onClick={() => goTo(active - 1)} aria-label="Trabajo anterior">
            <Icon icon={ArrowLeft01Icon} />
          </button>
          <button className="featured__arrow" onClick={() => goTo(active + 1)} aria-label="Trabajo siguiente">
            <Icon icon={ArrowRight01Icon} />
          </button>
        </div>
      </div>

      <div className="featured__track" ref={trackRef}>
        {LOOP.map((s, i) => (
          <a
            key={`${s.file}-${i}`}
            className={`featured__card ${i === active ? 'is-active' : ''}`}
            style={{ aspectRatio: `${s.w} / ${s.h}` }}
            href={`${IG}${s.post}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.title}: ${s.kind}. Ver en Instagram`}
            aria-current={i === active ? 'true' : undefined}
            aria-hidden={i < N || i >= 2 * N ? true : undefined}
            tabIndex={i < N || i >= 2 * N ? -1 : undefined}
          >
            <img
              src={`${BASE}carrusel/trabajo-${s.file}.webp`}
              alt={`${s.kind} para ${s.title}, hecho por Kano Publicidad en Bucaramanga`}
              width={s.w}
              height={s.h}
              loading={i >= N - 2 && i <= N + 2 ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={i === N ? 'high' : undefined}
            />
            <span className="featured__caption">
              <strong>{s.title}</strong>
              <span>{s.kind}</span>
            </span>
          </a>
        ))}
      </div>

      <div className="featured__dots" role="tablist" aria-label="Elegir trabajo">
        {SLIDES.map((s, i) => (
          <button
            key={s.file}
            role="tab"
            aria-selected={i === active % N}
            aria-label={`Ver ${s.title}`}
            className={i === active % N ? 'is-active' : ''}
            onClick={() => goTo(N + i)}
          />
        ))}
      </div>
    </section>
  );
}
