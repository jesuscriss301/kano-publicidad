import { useEffect, useState } from 'react';
import { InstagramIcon } from '@hugeicons/core-free-icons';
import Masonry, { type MasonryItem } from '../components/reactbits/Masonry';
import { BRAND } from '../config';
import { GALERIA } from '../galeria';
import { useInView } from '../lib/useInView';
import { Icon, SectionHead } from '../components/ui';

type FeedPost = { id: string; img: string; url: string; caption?: string; type?: string };
type State = { status: 'loading' } | { status: 'ready'; items: MasonryItem[] } | { status: 'error' };

// Fotos fijas de respaldo: se usan si Instagram aún no está conectado o no responde
const FALLBACK: MasonryItem[] = GALERIA.map(g => ({
  id: g.id,
  img: g.img,
  url: g.url,
  width: 388,
  height: 388,
  title: g.title,
  alt: `${g.title} — Kano Publicidad, Bucaramanga`
}));

const shortCaption = (c = '') => {
  const clean = c.replace(/#[\p{L}\p{N}_]+/gu, '').replace(/\s+/g, ' ').trim();
  return clean.length > 80 ? `${clean.slice(0, 77)}…` : clean;
};

export default function Gallery() {
  const { ref, inView } = useInView<HTMLDivElement>('400px');
  const [state, setState] = useState<State>({ status: 'loading' });
  // en celular, 2 columnas de fotos
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    if (!inView) return;
    const ctrl = new AbortController();
    fetch(`${BRAND.feedUrl}?limit=${BRAND.galleryLimit}`, { signal: ctrl.signal })
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: { posts: FeedPost[] }) => {
        const items: MasonryItem[] = data.posts.map(p => {
          const title = shortCaption(p.caption);
          return {
            id: p.id,
            img: p.img,
            url: p.url,
            title: title || undefined,
            alt: title ? `${title} — Kano Publicidad, Bucaramanga` : 'Aviso hecho por Kano Publicidad en Bucaramanga'
          };
        });
        setState({ status: 'ready', items: items.length ? items : FALLBACK });
      })
      .catch(err => {
        if (err?.name !== 'AbortError') setState({ status: 'ready', items: FALLBACK });
      });
    return () => ctrl.abort();
  }, [inView]);

  return (
    <section id="galeria" className="gallery">
      <div className="wrap" ref={ref}>
        <SectionHead tag="Galería" title="Nuestros trabajos" accent="en vivo" />
        <p className="gallery__handle">
          Lo último que publicamos en{' '}
          <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer">
            <Icon icon={InstagramIcon} size={20} /> @{BRAND.instagramUser}
          </a>
        </p>

        {state.status === 'loading' && (
          <div className="gallery__skeleton" aria-busy="true" aria-label="Cargando fotos">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} style={{ aspectRatio: i % 3 === 0 ? '3 / 4' : i % 3 === 1 ? '1 / 1' : '4 / 5' }} />
            ))}
          </div>
        )}

        {state.status === 'ready' && (
          <Masonry
            items={state.items}
            columns={mobile ? 2 : 'auto'}
            columnWidth={280}
            gap={mobile ? 10 : 14}
            radius={16}
            animateFrom="bottom"
            hoverEffect="zoom"
            captions="hover"
            revealOnScroll
            lightbox
          />
        )}

        {state.status === 'error' && (
          <div className="gallery__empty">
            <p>Mira todos nuestros trabajos directamente en Instagram.</p>
          </div>
        )}

        <div className="gallery__cta">
          <a className="btn btn--primary" href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer">
            <Icon icon={InstagramIcon} size={20} /> Ver más en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
