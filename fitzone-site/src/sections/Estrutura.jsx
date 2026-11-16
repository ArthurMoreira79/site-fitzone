import { useEffect, useRef, useState } from 'react';
import { fotoPaisagem } from '../utils/asset.js';
import './secoes.css';

const FOTOS = [
  { nome: 'fachada', legenda: 'Fachada', alt: 'Fachada da FitZone ao anoitecer, com a linha de luz coral no topo do prédio' },
  { nome: 'recepcao', legenda: 'Recepção', alt: 'Recepção com balcão azul, catracas e o salão de musculação ao fundo' },
  { nome: 'musculacao-salao', legenda: 'Salão de musculação', alt: 'Salão de musculação com racks, máquinas e halteres' },
  { nome: 'cardio', legenda: 'Cardio', alt: 'Área de cardio com esteiras, bikes e elípticos de frente para a cidade' },
  { nome: 'vestiario', legenda: 'Vestiário e lockers', alt: 'Vestiário com lockers, bancos de madeira, chuveiros e espelhos redondos' },
  { nome: 'musculacao-barra', legenda: 'Equipamento', alt: 'Barra olímpica com anilhas pretas apoiada no rack' },
];

export default function Estrutura() {
  const [aberta, setAberta] = useState(null);
  const dialogo = useRef(null);

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (aberta !== null && !d.open) d.showModal();
    if (aberta === null && d.open) d.close();
  }, [aberta]);

  const foto = aberta !== null ? FOTOS[aberta] : null;
  const passar = (passo) => setAberta((i) => (i + passo + FOTOS.length) % FOTOS.length);

  return (
    <section id="estrutura" className="secao fundo-claro-2" aria-labelledby="estrutura-titulo">
      <div className="container">
        <h2 id="estrutura-titulo" className="secao-titulo">
          Nossa <span className="destaque">estrutura</span>
        </h2>
        <p className="secao-sub">Tudo pensado para você treinar com conforto, do estacionamento ao vestiário.</p>
        <ul className="galeria">
          {FOTOS.map((f, i) => (
            <li key={f.nome} className={i === 0 ? 'galeria-grande' : ''}>
              <button type="button" onClick={() => setAberta(i)} aria-label={`Ampliar foto: ${f.legenda}`}>
                <img {...fotoPaisagem(f.nome)} sizes="(max-width: 700px) 100vw, 33vw" alt={f.alt} loading="lazy" decoding="async" />
                <span className="galeria-legenda">{f.legenda}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogo}
        className="galeria-dialogo"
        aria-label={foto ? foto.legenda : 'Foto ampliada'}
        onClose={() => setAberta(null)}
        onClick={(e) => e.target === e.currentTarget && setAberta(null)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') passar(1);
          if (e.key === 'ArrowLeft') passar(-1);
        }}
      >
        {foto && (
          <figure>
            <img src={fotoPaisagem(foto.nome).src} alt={foto.alt} width="1376" height="768" />
            <figcaption>{foto.legenda}</figcaption>
          </figure>
        )}
        <div className="galeria-controles">
          <button type="button" className="btn btn-fantasma no-escuro" onClick={() => passar(-1)} aria-label="Foto anterior">
            ←
          </button>
          <button type="button" className="btn btn-primario" onClick={() => setAberta(null)}>
            Fechar
          </button>
          <button type="button" className="btn btn-fantasma no-escuro" onClick={() => passar(1)} aria-label="Próxima foto">
            →
          </button>
        </div>
      </dialog>
    </section>
  );
}
