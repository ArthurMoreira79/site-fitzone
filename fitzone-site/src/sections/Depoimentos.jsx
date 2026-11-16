import depoimentos from '../data/depoimentos.json';
import './secoes.css';

const iniciais = (nome) =>
  nome
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="secao fundo-escuro" aria-labelledby="depoimentos-titulo">
      <div className="container">
        <h2 id="depoimentos-titulo" className="secao-titulo">
          Quem treina <span className="destaque">aprova</span>
        </h2>
        <ul className="depoimentos-grade">
          {depoimentos.map((d) => (
            <li key={d.nome}>
              <figure className="depoimento">
                <blockquote>
                  <p>“{d.texto}”</p>
                </blockquote>
                <figcaption>
                  <span className="depoimento-avatar" aria-hidden="true">
                    {iniciais(d.nome)}
                  </span>
                  <span>
                    <strong>{d.nome}</strong>
                    <br />
                    {d.contexto}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
