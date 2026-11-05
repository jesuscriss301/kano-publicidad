import { useEffect, useState } from 'react';
import { Menu01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { Icon, Logo, WhatsAppButton } from '../components/ui';

const LINKS = [
  { href: '#galeria', label: 'Galería' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#aliados', label: 'Aliados' },
  { href: '#preguntas', label: 'Preguntas' },
  { href: '#contacto', label: 'Contacto' }
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled || open ? 'nav--solid' : ''}`}>
      <nav className="wrap nav__bar" aria-label="Principal">
        <a href="#destacados" className="nav__logo" aria-label="Kano Publicidad, ir al inicio">
          <Logo />
        </a>
        <ul id="menu" className={`nav__links ${open ? 'is-open' : ''}`}>
          {LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <WhatsAppButton className="nav__cta">Cotizar</WhatsAppButton>
        <button
          className="nav__burger"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen(o => !o)}
        >
          <Icon icon={open ? Cancel01Icon : Menu01Icon} size={26} />
        </button>
      </nav>
    </header>
  );
}
