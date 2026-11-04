import { FAQS } from '../config';
import { SectionHead } from '../components/ui';

export default function Faq() {
  return (
    <section id="preguntas" className="faq" aria-labelledby="faq-title">
      <div className="wrap faq__wrap">
        <SectionHead tag="Preguntas frecuentes" title="Lo que más nos" accent="preguntan" id="faq-title" />
        <div className="faq__list">
          {FAQS.map((f, i) => (
            <details key={f.q} className="faq__item" open={i === 0}>
              <summary>
                <h3>{f.q}</h3>
                <span className="faq__icon" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
