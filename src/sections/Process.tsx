import { SectionHead } from '../components/ui';

const STEPS = [
  { title: 'Cuéntanos tu idea', text: 'Escríbenos por WhatsApp con tu logo, las medidas y una foto del lugar.' },
  { title: 'Diseño y cotización', text: 'Te enviamos una simulación de cómo se verá tu aviso y el precio.' },
  { title: 'Fabricación', text: 'Cortamos, armamos e iluminamos tu aviso en nuestro taller.' },
  { title: 'Instalación', text: 'Lo instalamos y lo dejamos funcionando. ¡A brillar!' }
];

export default function Process() {
  return (
    <section id="proceso" className="process">
      <div className="wrap">
        <SectionHead tag="Cómo trabajamos" title="De la idea a tu fachada en" accent="4 pasos" />
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step__num" aria-hidden="true">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
