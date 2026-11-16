import { useMemo, useState } from 'react';
import aulas from '../data/aulas.json';
import espacos from '../data/espacos.json';
import professores from '../data/professores.json';
import { DIAS_SEMANA } from '../utils/formato.js';
import './GradeAulas.css';

const FILTROS = ['Todas', 'Yoga', 'Crossfit', 'Hidroginástica'];
const DIAS = [1, 2, 3, 4, 5, 6]; // segunda a sábado (domingo não tem aula coletiva)

const nomeEspaco = Object.fromEntries(espacos.map((e) => [e.codigo, e.nome]));
const nomeProfessor = Object.fromEntries(professores.map((p) => [p.id, p.nome]));

export default function GradeAulas() {
  const [filtro, setFiltro] = useState('Todas');

  const porDia = useMemo(() => {
    const lista = filtro === 'Todas' ? aulas : aulas.filter((a) => a.modalidade === filtro);
    return DIAS.map((dia) => ({
      dia,
      aulas: lista.filter((a) => a.dias.includes(dia)).sort((a, b) => a.inicio.localeCompare(b.inicio)),
    }));
  }, [filtro]);

  return (
    <section id="aulas" className="secao fundo-claro-2" aria-labelledby="aulas-titulo">
      <div className="container">
        <h2 id="aulas-titulo" className="secao-titulo">
          Grade de <span className="destaque">aulas</span>
        </h2>
        <p className="secao-sub">
          Aulas coletivas inclusas nos planos Mensal e Trimestral. Domingo é dia de musculação e cardio livres.
        </p>

        <div className="grade-filtros" role="group" aria-label="Filtrar por modalidade">
          {FILTROS.map((f) => (
            <button key={f} type="button" className="grade-filtro" aria-pressed={filtro === f} onClick={() => setFiltro(f)}>
              {f}
            </button>
          ))}
        </div>

        <div className="grade" aria-live="polite">
          {porDia.map(({ dia, aulas: doDia }) => (
            <div key={dia} className="grade-dia">
              <h3>{DIAS_SEMANA[dia]}</h3>
              {doDia.length === 0 ? (
                <p className="grade-vazio">Sem aulas de {filtro.toLowerCase()}</p>
              ) : (
                <ul>
                  {doDia.map((a) => (
                    <li key={`${a.modalidade}-${a.inicio}`} className="grade-aula" data-espaco={a.espaco}>
                      <span className="grade-hora">
                        {a.inicio}–{a.fim}
                      </span>
                      <span className="grade-modalidade">{a.modalidade}</span>
                      <span className="grade-info">
                        {nomeEspaco[a.espaco]} · {nomeProfessor[a.professor]}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
