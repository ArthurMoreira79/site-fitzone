import { useId } from 'react';
import './Anilha.css';

/**
 * Anilha de competição desenhada em SVG. A cor vem do tipo de espaço (data-espaco)
 * e nunca aparece sozinha: o nome do espaço é sempre mostrado ao lado.
 *
 * - espaco: código do sistema (MUSCULACAO, YOGA, CROSSFIT, PISCINA)
 * - nome: nome do espaço (legenda visível)
 * - gravado: texto gravado no lugar do "25 kg" (ex.: "R$ 100/h")
 * - fundo: 'escuro' | 'claro' — define a cor do aro de contraste
 * - tamanho: largura em px (a anilha é quadrada)
 * - legenda: false esconde o nome visível (use só quando o nome já está escrito ao lado)
 */
export default function Anilha({ espaco, nome, gravado, fundo = 'claro', tamanho = 160, legenda = true, className = '' }) {
  const id = useId().replace(/:/g, '');
  const rTexto = 62;

  return (
    <figure
      className={`anilha anilha-fundo-${fundo} ${className}`}
      data-espaco={espaco}
      style={{ '--tamanho': `${tamanho}px` }}
    >
      <svg viewBox="0 0 200 200" role="img" aria-label={gravado ? `${nome}, ${gravado}` : nome}>
        <defs>
          <mask id={`furo-${id}`}>
            <rect width="200" height="200" fill="#fff" />
            <circle cx="100" cy="100" r="15" fill="#000" />
          </mask>
          <path id={`arco-cima-${id}`} d={`M ${100 - rTexto} 100 A ${rTexto} ${rTexto} 0 0 1 ${100 + rTexto} 100`} />
          <path id={`arco-baixo-${id}`} d={`M ${100 - rTexto - 9} 100 A ${rTexto + 9} ${rTexto + 9} 0 0 0 ${100 + rTexto + 9} 100`} />
        </defs>

        <g mask={`url(#furo-${id})`}>
          {/* disco com o aro de contraste */}
          <circle className="anilha-disco" cx="100" cy="100" r="94" />
          {/* borda elevada da borracha */}
          <circle className="anilha-relevo" cx="100" cy="100" r="84" />
          <circle className="anilha-relevo" cx="100" cy="100" r="40" />
          {/* cubo metálico */}
          <circle className="anilha-cubo" cx="100" cy="100" r="28" />
          <circle className="anilha-cubo-borda" cx="100" cy="100" r="21" />
        </g>

        {gravado && (
          <text className="anilha-gravado">
            <textPath href={`#arco-cima-${id}`} startOffset="50%" textAnchor="middle">
              {gravado}
            </textPath>
          </text>
        )}
        <text className="anilha-marca">
          <textPath href={`#arco-baixo-${id}`} startOffset="50%" textAnchor="middle">
            FITZONE
          </textPath>
        </text>
      </svg>
      <figcaption className={legenda ? 'anilha-nome' : 'sr-only'}>{nome}</figcaption>
    </figure>
  );
}
