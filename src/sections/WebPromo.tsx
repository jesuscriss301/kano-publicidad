import { Search01Icon, WhatsappIcon, SmartPhone01Icon, Image01Icon, ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { TECH_PARTNER } from '../config';
import { Icon } from '../components/ui';

const PERKS = [
  { icon: Search01Icon, text: 'Que te encuentren en Google' },
  { icon: WhatsappIcon, text: 'Clientes directo a tu WhatsApp' },
  { icon: SmartPhone01Icon, text: 'Se ve perfecta en el celular' },
  { icon: Image01Icon, text: 'Tus productos y trabajos en vitrina' }
];

/** Sección para promocionar EasyPro Digital: el aviso trae clientes en la calle, la web los trae de internet. */
export default function WebPromo() {
  return (
    <section id="tu-web" className="webpromo" aria-labelledby="webpromo-title">
      <div className="wrap">
        <div className="webpromo__card">
          <div className="webpromo__copy">
            <span className="tag">No te olvides de tu web</span>
            <h2 id="webpromo-title">
              Tu aviso atrae clientes en la calle. <span className="accent">Tu web, en internet.</span>
            </h2>
            <p>
              Ya tienes un negocio que brilla de noche; ahora haz que también brille cuando te buscan en Google. Esta
              web la hizo <strong>{TECH_PARTNER.name}</strong>, y puede hacer la tuya.
            </p>
            <ul className="webpromo__perks">
              {PERKS.map(p => (
                <li key={p.text}>
                  <span className="feature__icon"><Icon icon={p.icon} size={20} /></span>
                  {p.text}
                </li>
              ))}
            </ul>
            <div className="webpromo__ctas">
              <a className="btn btn--primary" href={TECH_PARTNER.url} target="_blank" rel="noopener">
                Conoce EasyPro Digital <Icon icon={ArrowUpRight01Icon} size={18} />
              </a>
              <a className="btn btn--ghost" href={TECH_PARTNER.whatsapp} target="_blank" rel="noopener">
                <Icon icon={WhatsappIcon} size={20} /> Quiero mi web
              </a>
            </div>
          </div>

          {/* mini maqueta de navegador (solo decoración) */}
          <div className="browser" aria-hidden="true">
            <div className="browser__bar">
              <i /><i /><i />
              <span>tunegocio.com</span>
            </div>
            <div className="browser__body">
              <div className="browser__hero" />
              <div className="browser__line browser__line--lg" />
              <div className="browser__line" />
              <div className="browser__grid"><span /><span /><span /></div>
              <div className="browser__btn">WhatsApp</div>
            </div>
            <span className="browser__badge">easyprodigital.com</span>
          </div>
        </div>
      </div>
    </section>
  );
}
