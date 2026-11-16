import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import espacos from '../data/espacos.json';
import Anilha from './Anilha.jsx';
import { formatarMoeda } from '../utils/formato.js';
import { useMovimentoReduzido } from '../hooks/useMidia.js';
import './SuporteAnilhas.css';

/**
 * As 4 anilhas lado a lado, como num suporte. Cada uma leva para /reservas com o espaço já escolhido.
 * Giram devagar com o scroll (desligado com prefers-reduced-motion).
 */
export default function SuporteAnilhas({ fundo = 'escuro' }) {
  const ref = useRef(null);
  const reduzido = useMovimentoReduzido();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduzido) {
      el?.style.setProperty('--giro', '0deg');
      return;
    }
    let quadro = 0;
    const atualizar = () => {
      quadro = 0;
      const r = el.getBoundingClientRect();
      // 0 quando o suporte está no meio da tela: o preço fica de pé na hora de ler
      const desvio = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      el.style.setProperty('--giro', `${(desvio * -50).toFixed(2)}deg`);
    };
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(atualizar);
    };
    atualizar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => {
      window.removeEventListener('scroll', aoRolar);
      cancelAnimationFrame(quadro);
    };
  }, [reduzido]);

  return (
    <div className={`suporte suporte-${fundo}`} ref={ref}>
      <ul className="suporte-anilhas">
        {espacos.map((e) => (
          <li key={e.codigo}>
            <Link to={`/reservas?espaco=${e.codigo}#reservar`} className="suporte-link">
              <Anilha espaco={e.codigo} nome={e.nome} gravado={`${formatarMoeda(e.valorHora)}/h`} fundo={fundo} tamanho={180} />
              <span className="suporte-capacidade">Até {e.capacidade} pessoas</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="suporte-base" aria-hidden="true" />
    </div>
  );
}
