import { fotoPaisagem } from '../utils/asset.js';
import './Modalidades.css';

const MODALIDADES = [
  {
    nome: 'Musculação e cardio',
    foto: 'musculacao-salao',
    alt: 'Salão de musculação com racks, máquinas e halteres pretos',
    texto: 'Salão amplo com racks, máquinas, halteres e uma área de cardio de frente para a cidade.',
    planos: 'Em todos os planos',
  },
  {
    nome: 'Yoga',
    foto: 'yoga',
    alt: 'Sala de yoga com piso de madeira e tapetes enfileirados',
    texto: 'Aulas para todos os níveis, com foco em mobilidade, respiração e postura.',
    planos: 'Planos Mensal e Trimestral',
  },
  {
    nome: 'Crossfit',
    foto: 'crossfit',
    alt: 'Sala de crossfit com rig de barras, remos e bikes',
    texto: 'Treinos intensos em grupo, com cada movimento adaptado ao seu nível.',
    planos: 'Planos Mensal e Trimestral',
  },
  {
    nome: 'Hidroginástica',
    foto: 'piscina',
    alt: 'Piscina coberta com quatro raias',
    texto: 'Exercício na piscina aquecida, que trabalha o corpo todo sem pesar nas articulações.',
    planos: 'Planos Mensal e Trimestral',
  },
];

export default function Modalidades() {
  return (
    <section id="modalidades" className="secao" aria-labelledby="modalidades-titulo">
      <div className="container">
        <h2 id="modalidades-titulo" className="secao-titulo">
          Modalidades
        </h2>
        <p className="secao-sub">Do treino de força à piscina: escolha como quer treinar hoje.</p>
        <div className="modalidades-grade">
          {MODALIDADES.map((m, i) => (
            <article key={m.nome} className={`modalidade ${i === 0 ? 'modalidade-grande' : ''}`}>
              <img {...fotoPaisagem(m.foto)} sizes="(max-width: 700px) 100vw, 50vw" alt={m.alt} loading="lazy" decoding="async" />
              <div className="modalidade-texto">
                <h3>{m.nome}</h3>
                <p>{m.texto}</p>
                <p className="modalidade-planos">{m.planos}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
