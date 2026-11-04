import { lazy, Suspense, useEffect, useState } from 'react';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { COLORS } from '../config';
import { drawToDataUrl, fitFont } from '../lib/textImage';
import { useReducedMotion } from '../lib/useInView';
import { Icon, WhatsAppButton } from '../components/ui';

// El efecto WebGL se carga aparte para no frenar la primera pintura de la página
const ElectricLogo = lazy(() => import('../components/reactbits/ElectricLogo'));

const NEON_WORD = 'Neon';
/** Letra cursiva de trazo fino: el efecto ilumina el contorno, como un tubo de neón doblado */
const NEON_FONT = (s: number) => `400 ${s}px "Sacramento", cursive`;

function StaticNeon() {
  return (
    <span className="neon-static" aria-hidden="true">
      {NEON_WORD}
    </span>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const [neonSrc, setNeonSrc] = useState('');
  const [webgl2, setWebgl2] = useState(false);

  useEffect(() => {
    try {
      setWebgl2(!!document.createElement('canvas').getContext('webgl2'));
    } catch {
      setWebgl2(false);
    }
  }, []);

  useEffect(() => {
    // ElectricLogo traza el contorno de una imagen con transparencia: dibujamos la palabra
    const font = NEON_FONT;
    drawToDataUrl(1200, 520, [font(200)], (ctx, w, h) => {
      fitFont(ctx, NEON_WORD, font, w * 0.9, 380);
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(NEON_WORD, w / 2, h / 2 + 8);
    }).then(setNeonSrc);
  }, []);

  const showElectric = webgl2 && !reduced && neonSrc;

  return (
    <section id="inicio" className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <span className="tag">Avisos luminosos · Neón · Acrílico</span>
          <h1>
            <span className="sr-only">Avisos luminosos en Bucaramanga: </span>
            Hacemos que tu negocio <span className="glow">brille</span> de día y de noche.
          </h1>
          <p className="lead">
            Diseñamos, fabricamos e instalamos avisos luminosos, letras en acrílico y neón flex a la medida. Instalamos
            en Bucaramanga y toda el área metropolitana, y enviamos a toda Colombia y al exterior.
          </p>
          <div className="hero__ctas">
            <WhatsAppButton>Cotiza tu aviso</WhatsAppButton>
            <a className="btn btn--ghost" href="#galeria">
              Ver trabajos <Icon icon={ArrowRight01Icon} size={18} />
            </a>
          </div>
        </div>

        <div className="neon-board" role="img" aria-label="Aviso de neón amarillo que dice NEON">
          <div className="neon-board__frame" aria-hidden="true" />
          {showElectric ? (
            <Suspense fallback={<StaticNeon />}>
              <ElectricLogo
                src={neonSrc}
                color={COLORS.amberLight}
                glowColor={COLORS.amber}
                intensity={1.15}
                scale={0.65}
                arcs={0}
                flicker={0}
                crackle={0}
                bend={0}
                thickness={1.5}
                fill={0}
                glow={1.45}
                speed={2.25}
                className="neon-board__canvas"
              />
            </Suspense>
          ) : (
            <StaticNeon />
          )}
          <span className="neon-board__caption">Neón flex · Bajo consumo</span>
        </div>
      </div>
    </section>
  );
}
