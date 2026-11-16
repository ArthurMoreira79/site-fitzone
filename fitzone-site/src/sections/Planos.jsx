import planos from '../data/planos.json';
import { formatarMoeda } from '../utils/formato.js';
import { linkPlano } from '../utils/whatsapp.js';
import './Planos.css';

function CardPlano({ plano }) {
  const destaque = plano.selo === 'Mais escolhido';
  const promo = plano.selo === 'Promoção';
  return (
    <article className={`card-plano ${destaque ? 'card-plano-destaque' : ''} ${promo ? 'card-plano-promo' : ''}`}>
      {plano.selo && <p className="card-plano-selo">{plano.selo}</p>}
      <h3>{plano.nome}</h3>
      <p className="card-plano-preco">
        <span className="card-plano-valor">{formatarMoeda(plano.preco)}</span>
        <span className="card-plano-periodo">{plano.periodo}</span>
      </p>
      <ul>
        {plano.inclui.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <a
        className={`btn ${destaque || promo ? 'btn-primario' : 'btn-fantasma'}`}
        href={linkPlano(plano)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Quero o plano ${plano.nome} (abre o WhatsApp)`}
      >
        Quero esse plano
      </a>
    </article>
  );
}

export default function Planos() {
  return (
    <section id="planos" className="secao fundo-claro-2" aria-labelledby="planos-titulo">
      <div className="container">
        <h2 id="planos-titulo" className="secao-titulo">
          Escolha seu <span className="destaque">plano</span>
        </h2>
        <p className="secao-sub">
          Sem matrícula e sem fidelidade. Escolha o plano, toque em “Quero esse plano” e fale com a recepção pelo WhatsApp.
        </p>
        <div className="planos-grade">
          {planos.map((p) => (
            <CardPlano key={p.id} plano={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
