import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import espacos from '../data/espacos.json';
import servicos from '../data/servicos.json';
import contato from '../data/contato.json';
import Anilha from '../components/Anilha.jsx';
import BarraProgresso from './BarraProgresso.jsx';
import { minutos, valorReserva, valorServico } from '../utils/cobranca.js';
import { aulasNoHorario } from '../utils/aulas.js';
import { formatarMoeda, plural } from '../utils/formato.js';
import { linkWhatsApp, mensagemReserva } from '../utils/whatsapp.js';
import { mascaraTelefone, telefoneValido } from '../utils/telefone.js';
import './FormReserva.css';

const USOS = ['Treino reservado', 'Aula particular', 'Turma fechada', 'Evento', 'Outro'];

/** "05:00", "05:30", ... "23:00" */
const HORARIOS = (() => {
  const lista = [];
  for (let m = minutos(contato.abre); m <= minutos(contato.fecha); m += 30) {
    lista.push(`${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`);
  }
  return lista;
})();

const hojeISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const agoraHHMM = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};
const diaDaSemana = (iso) => {
  const [a, m, d] = iso.split('-').map(Number);
  return new Date(a, m - 1, d).getDay();
};

const VAZIO = { espaco: '', data: '', inicio: '', fim: '', uso: '', pessoas: '', nome: '', whatsapp: '', obs: '' };
const SUFIXO = { FIXO: '', POR_HORA: '/h', POR_UNIDADE: '/unidade' };

export default function FormReserva() {
  const [params] = useSearchParams();
  const [dados, setDados] = useState(() => ({ ...VAZIO, espaco: espacos.some((e) => e.codigo === params.get('espaco')) ? params.get('espaco') : '' }));
  const [marcados, setMarcados] = useState({}); // { CODIGO: true }
  const [lockers, setLockers] = useState(1);
  const [tentou, setTentou] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // clicar numa anilha da home ou num card desta página troca o espaço já escolhido
  useEffect(() => {
    const codigo = params.get('espaco');
    if (espacos.some((e) => e.codigo === codigo)) setDados((d) => ({ ...d, espaco: codigo }));
  }, [params]);

  const espaco = espacos.find((e) => e.codigo === dados.espaco);
  const hoje = hojeISO();
  const mudar = (campo) => (e) =>
    setDados((d) => {
      const valor = campo === 'whatsapp' ? mascaraTelefone(e.target.value) : e.target.value;
      const novo = { ...d, [campo]: valor };
      // fim precisa ficar depois do início
      if (campo === 'inicio' && novo.fim && minutos(novo.fim) <= minutos(valor)) novo.fim = '';
      return novo;
    });

  // ===== validação (critérios de aceite do plano) =====
  const n = Number(dados.pessoas);
  const erros = {
    espaco: !espaco ? 'Escolha um espaço.' : '',
    data: !dados.data ? 'Escolha a data.' : dados.data < hoje ? 'Escolha uma data a partir de hoje.' : '',
    inicio: !dados.inicio
      ? 'Escolha o horário de início.'
      : dados.data === hoje && minutos(dados.inicio) <= minutos(agoraHHMM())
        ? 'Esse horário de hoje já passou.'
        : '',
    fim: !dados.fim ? 'Escolha o horário de fim.' : dados.inicio && minutos(dados.fim) <= minutos(dados.inicio) ? 'O fim precisa ser depois do início.' : '',
    uso: !dados.uso ? 'Escolha o tipo de uso.' : '',
    pessoas: !dados.pessoas
      ? 'Informe o número de pessoas.'
      : !Number.isInteger(n) || n < 1
        ? 'Informe ao menos 1 pessoa.'
        : espaco && n > espaco.capacidade
          ? `A ${espaco.nome} comporta até ${espaco.capacidade} pessoas.`
          : '',
    lockers: marcados.LOCKER && (lockers < 1 || lockers > Math.max(n || 1, 1)) ? 'Os lockers vão de 1 até o número de pessoas.' : '',
    nome: dados.nome.trim().length < 2 ? 'Informe seu nome.' : '',
    whatsapp: !telefoneValido(dados.whatsapp) ? 'Informe um WhatsApp com DDD.' : '',
  };
  const valido = Object.values(erros).every((e) => !e);
  const erro = (campo) => tentou && erros[campo];

  const etapas = [
    !erros.espaco,
    !erros.data,
    !erros.inicio && !erros.fim,
    !erros.uso,
    !erros.pessoas,
    !erros.nome && !erros.whatsapp,
  ];
  // conta em ordem: a barra só carrega a próxima anilha depois da anterior
  const feitas = etapas.findIndex((ok) => !ok) === -1 ? etapas.length : etapas.findIndex((ok) => !ok);

  const horarioOk = espaco && dados.inicio && dados.fim && !erros.fim;
  const itens = servicos.filter((s) => marcados[s.codigo]).map((s) => ({ servico: s, quantidade: s.codigo === 'LOCKER' ? lockers : 1 }));
  const calculo = horarioOk ? valorReserva({ espaco, inicio: dados.inicio, fim: dados.fim, itens }) : null;

  const conflitos = useMemo(() => {
    if (!espaco || !dados.data || !dados.inicio || !dados.fim || erros.fim) return [];
    return aulasNoHorario(espaco.codigo, diaDaSemana(dados.data), dados.inicio, dados.fim);
  }, [espaco, dados.data, dados.inicio, dados.fim, erros.fim]);

  function enviar(e) {
    e.preventDefault();
    setTentou(true);
    if (!valido) {
      // espera o React marcar os campos com aria-invalid antes de levar o foco ao primeiro
      const form = e.currentTarget;
      requestAnimationFrame(() => form.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    const texto = mensagemReserva({
      espaco: espaco.nome,
      data: dados.data,
      inicio: dados.inicio,
      fim: dados.fim,
      uso: dados.uso,
      pessoas: n,
      servicos: itens.map(({ servico, quantidade }) => (servico.codigo === 'LOCKER' ? `${servico.nome} (${quantidade})` : servico.nome)),
      total: calculo.total,
      horas: calculo.horas,
      nome: dados.nome.trim(),
      obs: dados.obs.trim(),
    });
    window.open(linkWhatsApp(texto), '_blank', 'noopener');
    setEnviado(true);
    document.getElementById('reservar')?.scrollIntoView({ block: 'start' });
  }

  function recomecar() {
    setDados(VAZIO);
    setMarcados({});
    setLockers(1);
    setTentou(false);
    setEnviado(false);
  }

  if (enviado) {
    return (
      <div className="reserva-ok" role="status" data-espaco={espaco?.codigo}>
        <h3>Pedido enviado!</h3>
        <p>A recepção confirma a disponibilidade pelo WhatsApp.</p>
        <p className="reserva-ok-obs">
          O WhatsApp abriu numa nova aba com o pedido pronto. Se ele não abriu, toque em “Enviar de novo”.
        </p>
        <div className="reserva-ok-acoes">
          <button type="button" className="btn btn-primario" onClick={() => setEnviado(false)}>
            Enviar de novo
          </button>
          <button type="button" className="btn btn-fantasma" onClick={recomecar}>
            Fazer outro pedido
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="form-reserva" data-espaco={espaco?.codigo} onSubmit={enviar} noValidate>
      <BarraProgresso feitas={feitas} total={etapas.length} espaco={espaco} />

      {/* 1. Espaço */}
      <fieldset className="campo reserva-bloco" aria-describedby="r-espaco-erro">
        <legend>
          <span className="reserva-num">1</span> Espaço
        </legend>
        <div className="seletor-anilhas">
          {espacos.map((e) => (
            <label key={e.codigo} className="seletor-anilha" data-espaco={e.codigo}>
              <input type="radio" name="espaco" value={e.codigo} checked={dados.espaco === e.codigo} onChange={mudar('espaco')} aria-invalid={!!erro('espaco')} />
              <Anilha espaco={e.codigo} nome={e.nome} gravado={`${formatarMoeda(e.valorHora)}/h`} fundo="claro" tamanho={120} />
              <span className="seletor-capacidade">até {e.capacidade} pessoas</span>
            </label>
          ))}
        </div>
        <p id="r-espaco-erro" className="campo-erro">{erro('espaco')}</p>
      </fieldset>

      {/* 2 e 3. Data e horário */}
      <div className="reserva-bloco">
        <p className="reserva-titulo">
          <span className="reserva-num">2</span> Data e horário
        </p>
        <div className="reserva-linha">
          <div className="campo">
            <label htmlFor="r-data">Data</label>
            <input id="r-data" type="date" min={hoje} value={dados.data} onChange={mudar('data')} aria-invalid={!!erro('data')} aria-describedby="r-data-erro" />
            <p id="r-data-erro" className="campo-erro">{erro('data')}</p>
          </div>
          <div className="campo">
            <label htmlFor="r-inicio">Início</label>
            <select id="r-inicio" value={dados.inicio} onChange={mudar('inicio')} aria-invalid={!!erro('inicio')} aria-describedby="r-inicio-erro">
              <option value="">--:--</option>
              {HORARIOS.slice(0, -1).map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>
            <p id="r-inicio-erro" className="campo-erro">{erro('inicio')}</p>
          </div>
          <div className="campo">
            <label htmlFor="r-fim">Fim</label>
            <select id="r-fim" value={dados.fim} onChange={mudar('fim')} aria-invalid={!!erro('fim')} aria-describedby="r-fim-erro">
              <option value="">--:--</option>
              {HORARIOS.filter((h) => !dados.inicio || minutos(h) > minutos(dados.inicio)).map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>
            <p id="r-fim-erro" className="campo-erro">{erro('fim')}</p>
          </div>
        </div>
        <p className="campo-dica">
          Funcionamos das 5h às 23h. Cobramos só horas completas, com mínimo de 1 hora (2h40 → 2h; 30 min → 1h).
        </p>
        {conflitos.length > 0 && (
          <p className="reserva-aviso" role="note">
            Nesse horário tem aula de {conflitos.map((a) => `${a.modalidade.toLowerCase()} (${a.inicio}–${a.fim})`).join(' e ')} na {espaco.nome}. Você pode enviar o pedido mesmo assim, e a recepção sugere outro horário se for preciso.
          </p>
        )}
      </div>

      {/* 4 e 5. Uso e pessoas */}
      <div className="reserva-bloco">
        <p className="reserva-titulo">
          <span className="reserva-num">3</span> Como vai usar
        </p>
        <fieldset className="campo" aria-describedby="r-uso-erro">
          <legend>Tipo de uso</legend>
          <div className="opcoes">
            {USOS.map((u) => (
              <label key={u} className="opcao">
                <input type="radio" name="uso" value={u} checked={dados.uso === u} onChange={mudar('uso')} aria-invalid={!!erro('uso')} />
                <span>{u}</span>
              </label>
            ))}
          </div>
          <p id="r-uso-erro" className="campo-erro">{erro('uso')}</p>
        </fieldset>
        <div className="campo campo-curto">
          <label htmlFor="r-pessoas">Número de pessoas</label>
          <input
            id="r-pessoas"
            type="number"
            inputMode="numeric"
            min="1"
            max={espaco?.capacidade}
            value={dados.pessoas}
            onChange={mudar('pessoas')}
            aria-invalid={!!erro('pessoas') || (!!espaco && n > espaco.capacidade)}
            aria-describedby="r-pessoas-dica r-pessoas-erro"
          />
          <p id="r-pessoas-dica" className="campo-dica">
            {espaco ? `Capacidade da ${espaco.nome}: até ${espaco.capacidade} pessoas.` : 'A capacidade depende do espaço.'}
          </p>
          <p id="r-pessoas-erro" className="campo-erro">
            {erro('pessoas') || (espaco && n > espaco.capacidade ? erros.pessoas : '')}
          </p>
        </div>
      </div>

      {/* 6. Serviços */}
      <fieldset className="campo reserva-bloco">
        <legend>
          <span className="reserva-num">4</span> Serviços adicionais <span className="reserva-opcional">(opcional)</span>
        </legend>
        <ul className="reserva-servicos">
          {servicos.map((s) => (
            <li key={s.codigo}>
              <label className="reserva-servico">
                <input type="checkbox" checked={!!marcados[s.codigo]} onChange={(e) => setMarcados((m) => ({ ...m, [s.codigo]: e.target.checked }))} />
                <span className="reserva-servico-nome">{s.nome}</span>
                <span className="reserva-servico-preco">
                  {formatarMoeda(s.valor)}
                  {SUFIXO[s.cobranca]}
                </span>
              </label>
              {s.codigo === 'LOCKER' && marcados.LOCKER && (
                <div className="campo campo-curto reserva-lockers">
                  <label htmlFor="r-lockers">Quantos lockers?</label>
                  <input id="r-lockers" type="number" min="1" max={Math.max(n || 1, 1)} value={lockers} onChange={(e) => setLockers(Number(e.target.value))} aria-invalid={!!erro('lockers')} aria-describedby="r-lockers-erro" />
                  <p id="r-lockers-erro" className="campo-erro">{erro('lockers')}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </fieldset>

      {/* 7. Dados */}
      <div className="reserva-bloco">
        <p className="reserva-titulo">
          <span className="reserva-num">5</span> Seus dados
        </p>
        <div className="reserva-linha reserva-linha-2">
          <div className="campo">
            <label htmlFor="r-nome">Nome</label>
            <input id="r-nome" autoComplete="name" value={dados.nome} onChange={mudar('nome')} aria-invalid={!!erro('nome')} aria-describedby="r-nome-erro" />
            <p id="r-nome-erro" className="campo-erro">{erro('nome')}</p>
          </div>
          <div className="campo">
            <label htmlFor="r-whats">WhatsApp</label>
            <input id="r-whats" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(98) 90000-0000" value={dados.whatsapp} onChange={mudar('whatsapp')} aria-invalid={!!erro('whatsapp')} aria-describedby="r-whats-erro" />
            <p id="r-whats-erro" className="campo-erro">{erro('whatsapp')}</p>
          </div>
        </div>
        <div className="campo">
          <label htmlFor="r-obs">
            Observações <span className="reserva-opcional">(opcional)</span>
          </label>
          <textarea id="r-obs" value={dados.obs} onChange={mudar('obs')} placeholder="Ex.: é um aniversário, vamos levar bolo e decoração." />
        </div>
      </div>

      {/* 8. Resumo */}
      <div className="reserva-resumo">
        <h3>Resumo</h3>
        {calculo ? (
          <dl>
            <div>
              <dt>
                {espaco.nome} · {plural(calculo.horas, 'hora cobrada', 'horas cobradas')} × {formatarMoeda(espaco.valorHora)}
              </dt>
              <dd>{formatarMoeda(calculo.espacoTotal)}</dd>
            </div>
            {itens.map(({ servico, quantidade }) => (
              <div key={servico.codigo}>
                <dt>
                  {servico.nome}
                  {servico.cobranca === 'POR_HORA' && ` · ${calculo.horas} h`}
                  {servico.cobranca === 'POR_UNIDADE' && ` · ${quantidade} un.`}
                </dt>
                <dd>{formatarMoeda(valorServico(servico, calculo.horas, quantidade))}</dd>
              </div>
            ))}
            <div className="reserva-total">
              <dt>Valor estimado</dt>
              <dd>{formatarMoeda(calculo.total)}</dd>
            </div>
          </dl>
        ) : (
          <p className="reserva-resumo-vazio">Escolha o espaço e o horário para ver a prévia do valor.</p>
        )}
        <p className="reserva-resumo-obs">É um pedido de reserva: a recepção confirma a disponibilidade pelo WhatsApp.</p>
        {tentou && !valido && (
          <p className="campo-erro" role="alert">
            Falta preencher {Object.values(erros).filter(Boolean).length === 1 ? 'um campo' : 'alguns campos'} acima.
          </p>
        )}
        <button type="submit" className="btn btn-primario">
          Enviar pedido pelo WhatsApp
        </button>
      </div>
    </form>
  );
}
