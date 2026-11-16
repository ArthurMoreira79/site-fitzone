import servicos from '../data/servicos.json';
import { formatarMoeda } from '../utils/formato.js';
import './secoes.css';

const SUFIXO = { FIXO: '', POR_HORA: '/h', POR_UNIDADE: '/unidade' };

export default function Servicos() {
  return (
    <section id="servicos" className="secao" aria-labelledby="servicos-titulo">
      <div className="container">
        <h2 id="servicos-titulo" className="secao-titulo">
          Serviços <span className="destaque">adicionais</span>
        </h2>
        <p className="secao-sub">Contrate avulso ou some a uma reserva privada.</p>
        <ul className="servicos-grade">
          {servicos.map((s) => (
            <li key={s.codigo} className="servico">
              <h3>{s.nome}</h3>
              <p>{s.descricao}</p>
              <p className="servico-preco">
                {formatarMoeda(s.valor)}
                <small>{SUFIXO[s.cobranca]}</small>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
