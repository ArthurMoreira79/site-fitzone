import aulas from '../data/aulas.json';
import { minutos } from './cobranca.js';

/** Total de aulas na semana (cada dia de cada horário conta uma). */
export const aulasPorSemana = aulas.reduce((n, a) => n + a.dias.length, 0);

/** Aulas da grade que acontecem num espaço, num dia da semana (0 = domingo), sobrepostas ao intervalo. */
export function aulasNoHorario(espaco, diaSemana, inicio, fim) {
  const i = minutos(inicio);
  const f = minutos(fim);
  return aulas.filter(
    (a) => a.espaco === espaco && a.dias.includes(diaSemana) && minutos(a.inicio) < f && minutos(a.fim) > i
  );
}
