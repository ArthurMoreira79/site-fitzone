import professores from '../data/professores.json';
import { fotoRetrato } from '../utils/asset.js';
import './secoes.css';

export default function Professores() {
  return (
    <section id="professores" className="secao" aria-labelledby="professores-titulo">
      <div className="container">
        <h2 id="professores-titulo" className="secao-titulo">
          Quem treina <span className="destaque">com você</span>
        </h2>
        <p className="secao-sub">Professores que acompanham de perto, do primeiro treino à próxima meta.</p>
        <ul className="professores-grade">
          {professores.map((p) => (
            <li key={p.id} className="professor">
              <img {...fotoRetrato(p.foto)} sizes="(max-width: 560px) 50vw, 25vw" alt={`Retrato de ${p.nome}, ${p.area.toLowerCase()}`} loading="lazy" decoding="async" />
              <div className="professor-texto">
                <h3>{p.nome}</h3>
                <p className="professor-area">{p.area}</p>
                <p>{p.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
