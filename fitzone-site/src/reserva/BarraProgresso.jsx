/**
 * Barra carregada como progresso do formulário: cada etapa concluída coloca uma anilha
 * (vista de lado) dos dois lados da barra. A primeira é a do espaço escolhido, na cor dele,
 * com o nome escrito ao lado; as outras são neutras.
 */
export default function BarraProgresso({ feitas, total, espaco }) {
  const LARG = 14;
  const alturas = [96, 84, 74, 66, 58, 50];
  const centro = 300;
  const inicioManga = 150; // onde começam as mangas (lado de fora da pegada)

  const anilhas = [];
  for (let i = 0; i < feitas; i++) {
    const h = alturas[i] ?? 44;
    const cor = i === 0 && espaco ? 'var(--cor-anilha)' : i % 2 ? 'var(--cor-escura)' : 'var(--cor-secundaria)';
    const xDir = centro + inicioManga + i * (LARG + 2);
    const xEsq = centro - inicioManga - (i + 1) * (LARG + 2) + 2;
    for (const x of [xEsq, xDir]) {
      anilhas.push(<rect key={`${i}-${x}`} x={x} y={60 - h / 2} width={LARG} height={h} rx="3" fill={cor} stroke="var(--cor-escura)" strokeWidth="1.5" />);
    }
  }

  return (
    <div className="barra-progresso" data-espaco={espaco?.codigo}>
      <svg viewBox="0 0 600 120" aria-hidden="true">
        {/* barra: pegada, colares e mangas */}
        <rect x="40" y="56" width="520" height="8" rx="4" fill="var(--cor-prata)" />
        <rect x={centro - inicioManga - 6} y="48" width="6" height="24" rx="2" fill="#8e9090" />
        <rect x={centro + inicioManga} y="48" width="6" height="24" rx="2" fill="#8e9090" />
        <g transform="translate(0 0)">{anilhas}</g>
      </svg>
      <p className="barra-texto" aria-live="polite">
        <strong>
          {feitas} de {total} etapas
        </strong>
        {espaco ? ` · Reservando: ${espaco.nome}` : ' · Escolha um espaço para começar'}
      </p>
    </div>
  );
}
