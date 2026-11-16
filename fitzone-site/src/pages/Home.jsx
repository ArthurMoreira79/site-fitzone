import { useTitulo } from '../hooks/useTitulo.js';
import Hero from '../sections/Hero.jsx';
import Destaques from '../sections/Destaques.jsx';
import Planos from '../sections/Planos.jsx';
import Modalidades from '../sections/Modalidades.jsx';
import GradeAulas from '../sections/GradeAulas.jsx';
import AulaExperimental from '../sections/AulaExperimental.jsx';
import ReservasPrivadas from '../sections/ReservasPrivadas.jsx';
import Servicos from '../sections/Servicos.jsx';
import Estrutura from '../sections/Estrutura.jsx';
import Professores from '../sections/Professores.jsx';
import Depoimentos from '../sections/Depoimentos.jsx';
import Faq from '../sections/Faq.jsx';
import Contato from '../sections/Contato.jsx';

export default function Home() {
  useTitulo(
    'FitZone — Academia em São Luís | Planos e reservas privadas',
    'Academia em São Luís com musculação, cardio, yoga, crossfit e piscina. Planos a partir de R$ 25 e salas para reservar só para você ou seu grupo.'
  );

  return (
    <>
      <Hero />
      <Destaques />
      <Planos />
      <Modalidades />
      <GradeAulas />
      <AulaExperimental />
      <ReservasPrivadas />
      <Servicos />
      <Estrutura />
      <Professores />
      <Depoimentos />
      <Faq />
      <Contato />
    </>
  );
}
