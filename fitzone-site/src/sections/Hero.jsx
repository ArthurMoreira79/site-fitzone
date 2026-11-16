import { asset, fotoPaisagem } from '../utils/asset.js';
import { useMidia, useMovimentoReduzido } from '../hooks/useMidia.js';
import './Hero.css';

// Vídeo só em telas largas e sem "reduzir movimento": no celular fica só o poster,
// e o vídeo nem é baixado (o <video> não é montado).
export default function Hero() {
  const telaLarga = useMidia('(min-width: 768px)');
  const reduzido = useMovimentoReduzido();
  const poster = fotoPaisagem('musculacao-barra');
  const comVideo = telaLarga && !reduzido;

  return (
    <section className="hero fundo-escuro" aria-labelledby="hero-titulo">
      <div className="hero-midia" aria-hidden="true">
        {comVideo ? (
          <video
            className="hero-video"
            src={asset('video/hero.mp4')}
            poster={poster.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <img className="hero-video" {...poster} sizes="100vw" alt="" fetchpriority="high" />
        )}
      </div>

      <div className="container hero-conteudo">
        <p className="hero-sobretitulo">Academia em São Luís · aberta das 5h às 23h</p>
        <h1 id="hero-titulo" className="hero-titulo">
          O ambiente <span className="destaque">transforma!</span>
        </h1>
        <p className="hero-texto">
          Musculação, cardio, yoga, crossfit e piscina num só lugar. Treine com um plano ou reserve uma sala só para você e o seu grupo.
        </p>
        <div className="hero-acoes">
          <a className="btn btn-primario" href="#aula-experimental">
            Agende uma aula experimental
          </a>
          <a className="btn btn-fantasma" href="#planos">
            Ver planos
          </a>
        </div>
      </div>

      {/* anilhas de contorno ao fundo: a forma geométrica da marca */}
      <svg className="hero-circulos" viewBox="0 0 400 400" aria-hidden="true">
        <circle cx="200" cy="200" r="196" />
        <circle cx="200" cy="200" r="150" />
        <circle cx="200" cy="200" r="40" />
      </svg>
    </section>
  );
}
