import type { ComponentProps, ReactNode } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { WhatsappIcon } from '@hugeicons/core-free-icons';
import { BRAND } from '../config';

type IconData = ComponentProps<typeof HugeiconsIcon>['icon'];

export function Icon({ icon, size = 22, className }: { icon: IconData; size?: number; className?: string }) {
  return <HugeiconsIcon icon={icon} size={size} strokeWidth={1.8} className={className} aria-hidden="true" />;
}

/** Logo de Kano recreado en SVG (reemplazar por el archivo original cuando lo tengan). */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 230 60" role="img" aria-label="Kano Publicidad">
      <polygon points="6,52 22,8 34,8 18,52" fill="var(--amber)" />
      <polygon points="24,30 46,8 60,8 36,32 52,52 38,52" fill="#fff" />
      <text x="62" y="36" fontFamily="var(--font)" fontWeight="900" fontStyle="italic" fontSize="34" fill="#fff" letterSpacing="1">
        KANO
      </text>
      <text x="64" y="54" fontFamily="var(--font)" fontWeight="800" fontStyle="italic" fontSize="12.5" fill="var(--amber)" letterSpacing="2.4">
        PUBLICIDAD
      </text>
    </svg>
  );
}

export function WhatsAppButton({ children, variant = 'primary', className = '' }: { children: ReactNode; variant?: 'primary' | 'ghost'; className?: string }) {
  return (
    <a className={`btn btn--${variant} ${className}`} href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer">
      <Icon icon={WhatsappIcon} size={20} />
      {children}
    </a>
  );
}

export function SectionHead({ tag, title, accent, text, id }: { tag: string; title: string; accent?: string; text?: string; id?: string }) {
  return (
    <header className="section-head">
      <span className="tag">{tag}</span>
      <h2 id={id}>
        {title} {accent && <span className="accent">{accent}</span>}
      </h2>
      {text && <p>{text}</p>}
    </header>
  );
}
