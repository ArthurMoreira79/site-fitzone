import faq from '../data/faq.json';
import './secoes.css';

export default function Faq() {
  return (
    <section id="faq" className="secao" aria-labelledby="faq-titulo">
      <div className="container container-estreito">
        <h2 id="faq-titulo" className="secao-titulo">
          Perguntas <span className="destaque">frequentes</span>
        </h2>
        <div className="faq">
          {faq.map((item) => (
            <details key={item.pergunta}>
              <summary>{item.pergunta}</summary>
              <p>{item.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
