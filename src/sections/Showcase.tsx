import { lazy, Suspense, useEffect, useState } from 'react';
import { TextFontIcon, StickerIcon, FlashIcon } from '@hugeicons/core-free-icons';
import DepthText from '../components/reactbits/DepthText';
import { COLORS } from '../config';
import { drawToDataUrl, roundRect } from '../lib/textImage';
import { useInView, useReducedMotion } from '../lib/useInView';
import { Icon, SectionHead } from '../components/ui';

const StickerPeel = lazy(() => import('../components/reactbits/StickerPeel'));

/** Dibuja el sticker de Kano (troquelado con borde blanco, como un vinilo real). */
function useKanoSticker() {
  const [src, setSrc] = useState('');
  useEffect(() => {
    const big = (s: number) => `italic 900 ${s}px "Montserrat Variable", "Arial Black", sans-serif`;
    drawToDataUrl(640, 400, [big(120), big(40)], (ctx, w, h) => {
      // borde blanco troquelado
      ctx.fillStyle = '#fff';
      roundRect(ctx, 0, 0, w, h, 90);
      ctx.fill();
      // fondo azul de la marca
      ctx.fillStyle = COLORS.navy;
      roundRect(ctx, 18, 18, w - 36, h - 36, 74);
      ctx.fill();
      // la K del logo
      ctx.save();
      ctx.translate(70, 92);
      ctx.scale(3.4, 3.4);
      ctx.fillStyle = COLORS.amber;
      ctx.beginPath();
      ctx.moveTo(6, 52); ctx.lineTo(22, 8); ctx.lineTo(34, 8); ctx.lineTo(18, 52); ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.moveTo(24, 30); ctx.lineTo(46, 8); ctx.lineTo(60, 8); ctx.lineTo(36, 32); ctx.lineTo(52, 52); ctx.lineTo(38, 52); ctx.closePath();
      ctx.fill();
      ctx.restore();
      // texto
      ctx.fillStyle = '#fff';
      ctx.font = big(112);
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('KANO', 280, 228);
      ctx.fillStyle = COLORS.amber;
      ctx.font = big(37);
      ctx.fillText('P U B L I C I D A D', 284, 284);
    }).then(setSrc);
  }, []);
  return src;
}

function StickerStage() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const src = useKanoSticker();
  const [width, setWidth] = useState(260);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(Math.min(300, Math.max(180, el.clientWidth * 0.55))));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  const staticSticker = src ? <img className="sticker-static" src={src} alt="" width={width} /> : null;

  return (
    <div ref={ref} className="sticker-stage">
      <span className="sticker-stage__hint">Despégalo y arrástralo</span>
      {inView && src && !reduced ? (
        <Suspense fallback={staticSticker}>
          <StickerPeel
            imageSrc={src}
            width={width}
            rotate={-6}
            finish="gloss"
            peelBackHoverPct={30}
            peelBackActivePct={45}
            followPointer={false}
            backColor="#ffffff"
            lightingIntensity={0.81}
          />
        </Suspense>
      ) : (
        staticSticker
      )}
    </div>
  );
}

export default function Showcase() {
  return (
    <section id="servicios" className="showcase">
      <div className="wrap">
        <SectionHead
          tag="Lo que hacemos"
          title="Avisos que se ven"
          accent="de lejos"
          text="Pasa el mouse o el dedo sobre cada ejemplo: así se sienten nuestros trabajos en la vida real."
        />

        <div className="showcase__grid">
          <article className="feature feature--letters">
            <div className="feature__demo letters-demo">
              <DepthText
                text="Tu Marca"
                faceColor={COLORS.amber}
                depthColor="#ffffff"
                tilt={7}
                autoOrbit={false}
                fontWeight={800}
                perspective={1500}
                depth={2.9}
                layers={26}
                fontSize="clamp(3.2rem, 15cqi, 8.5rem)"
              />
            </div>
            <div className="feature__body">
              <span className="feature__icon"><Icon icon={TextFontIcon} /></span>
              <h3>Letras corpóreas individuales</h3>
              <p>
                Letras en acrílico, PVC o acero con volumen real. Con luz frontal, luz trasera (efecto halo) o sin luz
                para fachadas e interiores.
              </p>
            </div>
          </article>

          <article className="feature feature--stickers">
            <div className="feature__demo">
              <StickerStage />
            </div>
            <div className="feature__body">
              <span className="feature__icon"><Icon icon={StickerIcon} /></span>
              <h3>Stickers y vinilado</h3>
              <p>
                Stickers troquelados, vinilo para vitrinas, carros y paredes. Impresos con tintas que aguantan sol y
                lluvia.
              </p>
            </div>
          </article>

          <article className="feature feature--neon">
            <div className="feature__body">
              <span className="feature__icon"><Icon icon={FlashIcon} /></span>
              <h3>Avisos de neón flex</h3>
              <p>
                Frases, logos y decoración en neón LED. Consume poco, no se calienta y dura años. Lo viste arriba: así
                brilla tu marca de noche.
              </p>
              <a className="link-arrow" href="#inicio">Ver el neón ↑</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
