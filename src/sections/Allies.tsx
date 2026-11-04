import { ALLIES } from '../config';
import { SectionHead } from '../components/ui';

/** Cinta de aliados que se mueve sola (solo CSS, sin librerías).
 *  Cada tarjeta muestra la foto del aviso que Kano le hizo a esa empresa.
 *  La lista se repite dos veces para que el bucle no tenga corte. */
export default function Allies() {
  const half = Math.ceil(ALLIES.length / 2);
  const rows = [ALLIES.slice(0, half), ALLIES.slice(half)];

  return (
    <section id="aliados" className="allies" aria-labelledby="aliados-title">
      <div className="wrap">
        <SectionHead
          tag="Aliados"
          title="Negocios que ya"
          accent="brillan con Kano"
          text="Algunas de las empresas de Santander a las que les hemos fabricado e instalado sus avisos."
          id="aliados-title"
        />
      </div>

      {/* lista accesible y legible por Google */}
      <ul className="sr-only">
        {ALLIES.map(a => (
          <li key={a.name}>{a.name}</li>
        ))}
      </ul>

      <div className="marquee" aria-hidden="true">
        {rows.map((row, i) => (
          <div key={i} className={`marquee__track ${i % 2 ? 'marquee__track--reverse' : ''}`}>
            {[...row, ...row].map((ally, j) => (
              <figure key={`${ally.name}-${j}`} className="ally">
                <img
                  src={ally.logo}
                  alt={`Aviso de ${ally.name} hecho por Kano Publicidad`}
                  width={300}
                  height={300}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{ally.name}</figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
