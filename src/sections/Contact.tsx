import { InstagramIcon, Location01Icon, WhatsappIcon, DeliveryTruck01Icon } from '@hugeicons/core-free-icons';
import { AREA, BRAND, TECH_PARTNER } from '../config';
import { Icon, Logo, WhatsAppButton } from '../components/ui';

export function Contact() {
  return (
    <section id="contacto" className="contact">
      <div className="wrap">
        <div className="cta-band">
          <h2>
            ¿Listo para que tu negocio <span className="glow">se vea de lejos</span>?
          </h2>
          <p>Envíanos tu idea y te ayudamos a escoger el aviso perfecto para tu espacio y tu presupuesto.</p>
          <WhatsAppButton>Escríbenos por WhatsApp</WhatsAppButton>
          <ul className="contact__info">
            <li><Icon icon={Location01Icon} size={20} /> Sede en {AREA.hq} y área metropolitana</li>
            <li><Icon icon={DeliveryTruck01Icon} size={20} /> {AREA.coverage}</li>
            <li>
              <Icon icon={InstagramIcon} size={20} />
              <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer">@{BRAND.instagramUser}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <Logo className="footer__logo" />
        <div className="footer__text">
          <p>© {new Date().getFullYear()} {BRAND.name} · Avisos luminosos en Bucaramanga</p>
          <p className="footer__legal">
            <a href="/politica-de-privacidad/">Política de privacidad</a>
            <a href="/politica-de-cookies/">Política de cookies</a>
          </p>
          <p className="footer__credit">
            Web hecha por{' '}
            <a href={TECH_PARTNER.url} target="_blank" rel="noopener">{TECH_PARTNER.name}</a>
          </p>
        </div>
        <div className="footer__social">
          <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Kano Publicidad">
            <Icon icon={InstagramIcon} size={20} />
          </a>
          <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de Kano Publicidad">
            <Icon icon={WhatsappIcon} size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a className="wa-float" href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp">
      <Icon icon={WhatsappIcon} size={30} />
    </a>
  );
}
