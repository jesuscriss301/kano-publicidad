import { lazy, Suspense, useEffect, useState } from 'react';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { COLORS } from '../config';
import { drawToDataUrl, fitFont } from '../lib/textImage';
import { useReducedMotion } from '../lib/useInView';
import { Icon, Logo, WhatsAppButton } from '../components/ui';

// El efecto WebGL se carga aparte para no frenar la primera pintura de la página
const ElectricLogo = lazy(() => import('../components/reactbits/ElectricLogo'));

/** Logo de Kano en neón cuando no hay WebGL o el usuario pidió reducir movimiento */
function StaticNeon() {
  return (
    <span className="neon-static" aria-hidden="true">
      <Logo className="neon-static__logo" />
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
    // ElectricLogo traza el contorno de una imagen con transparencia: dibujamos el logo de Kano
    const font = (sz: number) => `italic 900 ${sz}px "Montserrat Variable", "Arial Black", sans-serif`;
    drawToDataUrl(1200, 420, [font(150), font(56)], (ctx, w, h) => {
      ctx.fillStyle = '#fff';
      // la K (mismas formas del logo, escaladas)
      ctx.save();
      ctx.translate(70, 60);
      ctx.scale(5.4, 5.4);
      ctx.beginPath();
      ctx.moveTo(6, 52); ctx.lineTo(22, 8); ctx.lineTo(34, 8); ctx.lineTo(18, 52); ctx.closePath();
      ctx.moveTo(24, 30); ctx.lineTo(46, 8); ctx.lineTo(60, 8); ctx.lineTo(36, 32); ctx.lineTo(52, 52); ctx.lineTo(38, 52); ctx.closePath();
      ctx.fill();
      ctx.restore();
      // KANO / PUBLICIDAD
      ctx.textBaseline = 'alphabetic';
      ctx.font = font(170);
      ctx.fillText('KANO', 420, 236);
      const kanoW = ctx.measureText('KANO').width;
      ctx.letterSpacing = '14px';
      fitFont(ctx, 'PUBLICIDAD', font, kanoW, 64);
      ctx.fillText('PUBLICIDAD', 428, 322);
      void w; void h;
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
            Diseñamos, fabricamos e instalamos avisos luminosos, letras en acrílico y neón flex a la medida. Sede
            principal en Bucaramanga y su área metropolitana, con instalación y envíos a toda Colombia.
          </p>
          <div className="hero__ctas">
            <WhatsAppButton>Cotiza tu aviso</WhatsAppButton>
            <a className="btn btn--ghost" href="#galeria">
              Ver trabajos <Icon icon={ArrowRight01Icon} size={18} />
            </a>
          </div>
        </div>

        <div className="neon-board" role="img" aria-label="Logo de Kano Publicidad en neón amarillo">
          <div className="neon-board__frame" aria-hidden="true" />
          {showElectric ? (
            <Suspense fallback={<StaticNeon />}>
              <ElectricLogo
                src={neonSrc}
                color={COLORS.amberLight}
                glowColor={COLORS.amber}
                intensity={0.6}
                scale={0.65}
                arcs={0}
                flicker={0}
                crackle={0}
                bend={0}
                thickness={0.7}
                fill={0.3}
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
