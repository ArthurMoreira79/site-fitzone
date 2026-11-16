import { Link } from 'react-router-dom';
import espacos from '../data/espacos.json';
import Anilha from '../components/Anilha.jsx';
import FormReserva from '../reserva/FormReserva.jsx';
import { fotoPaisagem } from '../utils/asset.js';
import { formatarMoeda } from '../utils/formato.js';
import { useTitulo } from '../hooks/useTitulo.js';
import './Reservas.css';

const ALT = {
  MUSCULACAO: 'Sala privada de musculação com rack, banco, halteres e polia, separada do salão por uma porta de vidro',
  YOGA: 'Sala de yoga com piso de madeira, tapetes e janela grande com cortinas',
  CROSSFIT: 'Sala de crossfit com rig de barras, remos, bikes e kettlebells',
  PISCINA: 'Piscina coberta com quatro raias e blocos de saída',
};

export default function Reservas() {
  useTitulo(
    'Reservas privadas — FitZone',
    'Reserve a Sala de Musculação, a Sala de Yoga, a Sala de Crossfit ou a Piscina da FitZone por hora, para treino, aula particular, turma fechada ou evento.'
  );

  return (
    <>
      <section className="reservas-hero fundo-escuro">
        <div className="container">
          <p className="reservas-hero-sobre">Reservas privadas</p>
          <h1 className="secao-titulo">
            O espaço inteiro, <span className="destaque">só seu</span>
          </h1>
          <p className="secao-sub">
            Alugue uma sala ou a piscina por hora para treino reservado, aula particular, turma fechada ou evento. Monte o pedido, veja a prévia do valor e envie pelo WhatsApp.
          </p>
          <a href="#reservar" className="btn btn-primario">
            Montar meu pedido
          </a>
        </div>
      </section>

      <section className="secao" aria-labelledby="espacos-titulo">
        <div className="container">
          <h2 id="espacos-titulo" className="secao-titulo">
            Os <span className="destaque">espaços</span>
          </h2>
          <div className="espacos-lista">
            {espacos.map((e) => (
              <article key={e.codigo} className="espaco" data-espaco={e.codigo}>
                <img {...fotoPaisagem(e.foto)} sizes="(max-width: 860px) 100vw, 50vw" alt={ALT[e.codigo]} loading="lazy" decoding="async" />
                <div className="espaco-texto">
                  <div className="espaco-topo">
                    <Anilha espaco={e.codigo} nome={e.nome} gravado={`${formatarMoeda(e.valorHora)}/h`} tamanho={84} legenda={false} />
                    <div>
                      <h3>{e.nome}</h3>
                      <p className="espaco-preco">
                        {formatarMoeda(e.valorHora)}/hora · até {e.capacidade} pessoas
                      </p>
                    </div>
                  </div>
                  <p>{e.descricao}</p>
                  <ul className="espaco-usos" aria-label="Exemplos de uso">
                    {e.usos.map((u) => (
                      <li key={u}>{u}</li>
                    ))}
                  </ul>
                  <Link to={`/reservas?espaco=${e.codigo}#reservar`} className="btn btn-fantasma">
                    Reservar este espaço
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="reservar" className="secao fundo-claro-2" aria-labelledby="reservar-titulo">
        <div className="container container-form">
          <h2 id="reservar-titulo" className="secao-titulo">
            Monte seu <span className="destaque">pedido</span>
          </h2>
          <p className="secao-sub">Preencha as etapas: a barra carrega uma anilha a cada uma concluída.</p>
          <FormReserva />
        </div>
      </section>
    </>
  );
}
