import contato from '../data/contato.json';
import { asset } from '../utils/asset.js';
import { linkContato, linkInstagram } from '../utils/whatsapp.js';
import { IconeWhatsApp, IconeInstagram } from './Icones.jsx';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer fundo-escuro">
      <div className="container footer-grade">
        <div className="footer-marca">
          <img src={asset('img/logo/logo-fitzone-fundo-escuro.svg')} alt="FitZone" width="160" height="35" loading="lazy" />
          <p>Musculação, cardio, aulas coletivas e salas para reservar só para você ou seu grupo.</p>
        </div>

        <div>
          <h2 className="footer-titulo">Endereço</h2>
          <p>
            {contato.endereco}
            <br />
            {contato.bairro}, {contato.cidade}
          </p>
        </div>

        <div>
          <h2 className="footer-titulo">Horário</h2>
          <p>{contato.horario}</p>
        </div>

        <div>
          <h2 className="footer-titulo">Fale com a gente</h2>
          <ul className="footer-contatos">
            <li>
              <a href={linkContato()} target="_blank" rel="noopener noreferrer">
                <IconeWhatsApp />
                {contato.whatsappExibicao}
              </a>
            </li>
            <li>
              <a href={linkInstagram()} target="_blank" rel="noopener noreferrer">
                <IconeInstagram />@{contato.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-base">
        <p>
          Projeto demonstrativo — empresa fictícia. Faz par com o{' '}
          <a href={contato.repositorioSistema} target="_blank" rel="noopener noreferrer">
            sistema de gestão FitZone
          </a>
          .
        </p>
        <p>
          Site desenvolvido por{' '}
          <a href={contato.github} target="_blank" rel="noopener noreferrer">
            {contato.autor}
          </a>{' '}
          · <a href={contato.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </div>
    </footer>
  );
}
