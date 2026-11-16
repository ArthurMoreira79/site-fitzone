import { Link } from 'react-router-dom';
import SuporteAnilhas from '../components/SuporteAnilhas.jsx';
import './ReservasPrivadas.css';

export default function ReservasPrivadas() {
  return (
    <section id="reservas" className="secao fundo-escuro reservas-privadas" aria-labelledby="reservas-titulo">
      <div className="container">
        <div className="reservas-topo">
          <div>
            <h2 id="reservas-titulo" className="secao-titulo">
              O espaço <span className="destaque">só para você</span>
            </h2>
            <p className="secao-sub">
              Reserve uma sala ou a piscina por hora para treino reservado, aula particular, turma fechada ou evento. Toque numa anilha para escolher o espaço.
            </p>
          </div>
          <Link to="/reservas#reservar" className="btn btn-primario">
            Reservar um espaço
          </Link>
        </div>

        <SuporteAnilhas fundo="escuro" />

        <p className="reservas-regra">
          Cobramos só horas completas, com mínimo de 1 hora: 2h40 de reserva saem por 2 horas.
        </p>
      </div>
    </section>
  );
}
