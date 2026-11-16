import { useState } from 'react';
import { asset, fotoPaisagem } from '../utils/asset.js';
import { linkAulaExperimental } from '../utils/whatsapp.js';
import { mascaraTelefone, telefoneValido } from '../utils/telefone.js';
import { useMidia, useMovimentoReduzido } from '../hooks/useMidia.js';
import './AulaExperimental.css';

const MODALIDADES = ['Musculação', 'Yoga', 'Crossfit', 'Hidroginástica'];
const PERIODOS = ['Manhã (5h às 12h)', 'Tarde (12h às 18h)', 'Noite (18h às 23h)'];

export default function AulaExperimental() {
  const [dados, setDados] = useState({ nome: '', whatsapp: '', modalidade: '', periodo: '' });
  const [tentou, setTentou] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const telaLarga = useMidia('(min-width: 768px)');
  const reduzido = useMovimentoReduzido();

  const erros = {
    nome: dados.nome.trim().length < 2 ? 'Informe seu nome.' : '',
    whatsapp: !telefoneValido(dados.whatsapp) ? 'Informe um WhatsApp com DDD.' : '',
    modalidade: !dados.modalidade ? 'Escolha uma modalidade.' : '',
    periodo: !dados.periodo ? 'Escolha o melhor período.' : '',
  };
  const valido = Object.values(erros).every((e) => !e);
  const mudar = (campo) => (e) =>
    setDados((d) => ({ ...d, [campo]: campo === 'whatsapp' ? mascaraTelefone(e.target.value) : e.target.value }));

  function enviar(e) {
    e.preventDefault();
    setTentou(true);
    if (!valido) {
      // espera o React marcar os campos com aria-invalid antes de levar o foco ao primeiro
      const form = e.currentTarget;
      requestAnimationFrame(() => form.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    window.open(linkAulaExperimental({ ...dados, periodo: dados.periodo.split(' (')[0] }), '_blank', 'noopener');
    setEnviado(true);
  }

  const erro = (campo) => tentou && erros[campo];

  return (
    <section id="aula-experimental" className="aula-exp fundo-escuro" aria-labelledby="aula-exp-titulo">
      <div className="aula-exp-midia" aria-hidden="true">
        {telaLarga && !reduzido ? (
          <video src={asset('video/mulher-treinando.mp4')} autoPlay muted loop playsInline preload="none" />
        ) : (
          <img {...fotoPaisagem('crossfit')} sizes="100vw" alt="" loading="lazy" />
        )}
      </div>

      <div className="container aula-exp-grade">
        <div className="aula-exp-chamada">
          <h2 id="aula-exp-titulo" className="secao-titulo">
            Sua primeira aula é <span className="destaque">por nossa conta</span>
          </h2>
          <p className="secao-sub">
            Escolha a modalidade e o melhor período. A gente monta a mensagem e a recepção confirma o horário pelo WhatsApp.
          </p>
        </div>

        {enviado ? (
          <div className="aula-exp-form aula-exp-ok" role="status">
            <h3>Mensagem pronta!</h3>
            <p>Abrimos o WhatsApp com o seu pedido. É só enviar por lá, e a recepção confirma o horário da sua aula.</p>
            <button type="button" className="btn btn-fantasma" onClick={() => setEnviado(false)}>
              Pedir outra aula
            </button>
          </div>
        ) : (
          <form className="aula-exp-form" onSubmit={enviar} noValidate>
            <div className="campo">
              <label htmlFor="ae-nome">Nome</label>
              <input id="ae-nome" autoComplete="name" value={dados.nome} onChange={mudar('nome')} aria-invalid={!!erro('nome')} aria-describedby="ae-nome-erro" />
              <p id="ae-nome-erro" className="campo-erro">{erro('nome')}</p>
            </div>

            <div className="campo">
              <label htmlFor="ae-whats">WhatsApp</label>
              <input id="ae-whats" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(98) 90000-0000" value={dados.whatsapp} onChange={mudar('whatsapp')} aria-invalid={!!erro('whatsapp')} aria-describedby="ae-whats-erro" />
              <p id="ae-whats-erro" className="campo-erro">{erro('whatsapp')}</p>
            </div>

            <div className="campo">
              <label htmlFor="ae-modalidade">Modalidade</label>
              <select id="ae-modalidade" value={dados.modalidade} onChange={mudar('modalidade')} aria-invalid={!!erro('modalidade')} aria-describedby="ae-modalidade-erro">
                <option value="">Escolha…</option>
                {MODALIDADES.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <p id="ae-modalidade-erro" className="campo-erro">{erro('modalidade')}</p>
            </div>

            <fieldset className="campo" aria-describedby="ae-periodo-erro">
              <legend>Melhor período</legend>
              <div className="opcoes">
                {PERIODOS.map((p) => (
                  <label key={p} className="opcao">
                    <input type="radio" name="periodo" value={p} checked={dados.periodo === p} onChange={mudar('periodo')} aria-invalid={!!erro('periodo')} />
                    <span>{p}</span>
                  </label>
                ))}
              </div>
              <p id="ae-periodo-erro" className="campo-erro">{erro('periodo')}</p>
            </fieldset>

            <button type="submit" className="btn btn-primario">
              Agendar pelo WhatsApp
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
