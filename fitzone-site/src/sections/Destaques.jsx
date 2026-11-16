import espacos from '../data/espacos.json';
import { aulasPorSemana } from '../utils/aulas.js';
import './Destaques.css';

const DIFERENCIAIS = [
  {
    titulo: 'Aberta todos os dias',
    texto: 'Das 5h às 23h, inclusive sábado, domingo e feriado.',
    icone: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    titulo: 'Climatizada',
    texto: 'Ar-condicionado em todas as salas e piscina coberta e aquecida.',
    icone: (
      <>
        <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
        <path d="M9.5 4.5 12 6l2.5-1.5M9.5 19.5 12 18l2.5 1.5" />
      </>
    ),
  },
  {
    titulo: 'Estacionamento próprio',
    texto: 'Vagas gratuitas para alunos e para quem reservar um espaço.',
    icone: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3" />
      </>
    ),
  },
];

export default function Destaques() {
  const capacidadeTotal = espacos.length;
  const NUMEROS = [
    { valor: '1.500', unidade: 'm²', rotulo: 'de área de treino' },
    { valor: '18', unidade: 'h', rotulo: 'abertos por dia' },
    { valor: String(aulasPorSemana), unidade: '', rotulo: 'aulas coletivas por semana' },
    { valor: String(capacidadeTotal), unidade: '', rotulo: 'espaços para reserva privada' },
  ];

  return (
    <section className="destaques" aria-label="Diferenciais da FitZone">
      <div className="container">
        <ul className="diferenciais">
          {DIFERENCIAIS.map((d) => (
            <li key={d.titulo}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {d.icone}
              </svg>
              <div>
                <h2>{d.titulo}</h2>
                <p>{d.texto}</p>
              </div>
            </li>
          ))}
        </ul>

        <dl className="numeros">
          {NUMEROS.map((n) => (
            <div key={n.rotulo}>
              <dt>{n.rotulo}</dt>
              <dd>
                {n.valor}
                <small>{n.unidade}</small>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
