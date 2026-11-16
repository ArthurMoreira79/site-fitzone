import contato from '../data/contato.json';
import { linkContato, linkInstagram } from '../utils/whatsapp.js';
import { IconeWhatsApp, IconeInstagram } from '../components/Icones.jsx';
import './secoes.css';

// Endereço fictício: o mapa mostra o bairro (Renascença, São Luís).
const MAPA = `https://www.google.com/maps?q=${encodeURIComponent(`${contato.bairro}, São Luís - MA`)}&z=15&output=embed`;

export default function Contato() {
  return (
    <section id="contato" className="secao fundo-claro-2" aria-labelledby="contato-titulo">
      <div className="container contato-grade">
        <div>
          <h2 id="contato-titulo" className="secao-titulo">
            Venha <span className="destaque">treinar</span>
          </h2>
          <dl className="contato-lista">
            <div>
              <dt>Endereço</dt>
              <dd>
                {contato.endereco}
                <br />
                {contato.bairro}, {contato.cidade}
              </dd>
            </div>
            <div>
              <dt>Horário</dt>
              <dd>{contato.horario}</dd>
            </div>
          </dl>
          <div className="contato-acoes">
            <a className="btn btn-primario" href={linkContato()} target="_blank" rel="noopener noreferrer">
              <IconeWhatsApp width="22" height="22" fill="currentColor" />
              Falar no WhatsApp
            </a>
            <a className="btn btn-fantasma" href={linkInstagram()} target="_blank" rel="noopener noreferrer">
              <IconeInstagram width="20" height="20" fill="currentColor" />@{contato.instagram}
            </a>
          </div>
        </div>
        <iframe
          className="contato-mapa"
          title={`Mapa do bairro ${contato.bairro}, em São Luís`}
          src={MAPA}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
