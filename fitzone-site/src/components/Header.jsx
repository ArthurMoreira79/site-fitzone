import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { asset } from '../utils/asset.js';
import './Header.css';

const SECOES = [
  { hash: '#planos', rotulo: 'Planos' },
  { hash: '#modalidades', rotulo: 'Modalidades' },
  { hash: '#aulas', rotulo: 'Aulas' },
  { hash: '#estrutura', rotulo: 'Estrutura' },
  { hash: '#contato', rotulo: 'Contato' },
];

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // fecha o menu com Esc
  useEffect(() => {
    if (!aberto) return;
    const fechar = (e) => e.key === 'Escape' && setAberto(false);
    window.addEventListener('keydown', fechar);
    return () => window.removeEventListener('keydown', fechar);
  }, [aberto]);

  function irPara(e, hash) {
    e.preventDefault();
    setAberto(false);
    if (pathname !== '/') {
      navigate(`/${hash}`);
      return;
    }
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', hash);
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="header-logo" onClick={() => setAberto(false)}>
          <img src={asset('img/logo/logo-fitzone-fundo-escuro.svg')} alt="FitZone, página inicial" width="140" height="31" />
        </Link>

        <button
          type="button"
          className="header-menu"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={aberto}
          aria-controls="menu-principal"
          onClick={() => setAberto((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {aberto ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>

        <nav id="menu-principal" className={`header-nav ${aberto ? 'aberto' : ''}`} aria-label="Navegação principal">
          {SECOES.map((s) => (
            <a key={s.hash} href={`/${s.hash}`} onClick={(e) => irPara(e, s.hash)}>
              {s.rotulo}
            </a>
          ))}
          <NavLink to="/reservas" onClick={() => setAberto(false)}>
            Reservas
          </NavLink>
          <a href="/#aula-experimental" className="btn btn-primario header-cta" onClick={(e) => irPara(e, '#aula-experimental')}>
            Aula experimental
          </a>
        </nav>
      </div>
    </header>
  );
}
