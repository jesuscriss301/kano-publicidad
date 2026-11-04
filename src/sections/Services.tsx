import { Scissor01Icon, PrinterIcon, PenTool01Icon, ToolsIcon } from '@hugeicons/core-free-icons';
import { Icon } from '../components/ui';

const SERVICES = [
  { icon: Scissor01Icon, title: 'Corte láser', text: 'Corte y grabado en acrílico, MDF y otros materiales con acabado preciso.' },
  { icon: PrinterIcon, title: 'Impresión digital', text: 'Pendones, carteleras y gran formato con colores que no se destiñen.' },
  { icon: PenTool01Icon, title: 'Diseño gráfico', text: 'Creamos o mejoramos tu logo para que se vea increíble en tu aviso.' },
  { icon: ToolsIcon, title: 'Instalación', text: 'Instalamos tu aviso de forma segura en fachada, vitrina o interior.' }
];

const EXTRAS = ['Habladores QR', 'Carteleras', 'Vinilos', 'Señalización', 'Trofeos', 'Buzones'];

export default function Services() {
  return (
    <section className="services" aria-label="Más servicios">
      <div className="wrap">
        <div className="services__grid">
          {SERVICES.map(s => (
            <article key={s.title} className="card">
              <span className="feature__icon"><Icon icon={s.icon} /></span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
        <ul className="chips" aria-label="También hacemos">
          {EXTRAS.map(e => (
            <li key={e} className="chip">{e}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
