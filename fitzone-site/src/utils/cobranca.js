// Mesma regra do sistema FitZone (Agendamento.getHorasCobradas e TipoServico.Cobranca):
// só contam horas completas (2h40 -> 2h) e o mínimo é 1 hora (30 min -> 1h).

/** "07:30" -> 450 */
export function minutos(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

/** Horas cobradas entre início e fim ("HH:MM"). Fim antes do início não é uma reserva válida: devolve 0. */
export function horasCobradas(inicio, fim) {
  const duracao = minutos(fim) - minutos(inicio);
  if (duracao <= 0) return 0;
  return Math.max(Math.floor(duracao / 60), 1);
}

/** Valor de um serviço adicional conforme a forma de cobrança do sistema. */
export function valorServico(servico, horas, quantidade = 1) {
  switch (servico.cobranca) {
    case 'FIXO':
      return servico.valor;
    case 'POR_HORA':
      return servico.valor * horas;
    case 'POR_UNIDADE':
      return servico.valor * quantidade;
    default:
      return 0;
  }
}

/**
 * Valor total = horas cobradas × valor/hora do espaço + soma dos serviços.
 * itens: [{ servico, quantidade }]
 */
export function valorReserva({ espaco, inicio, fim, itens = [] }) {
  const horas = horasCobradas(inicio, fim);
  const espacoTotal = horas * espaco.valorHora;
  const servicosTotal = itens.reduce((soma, { servico, quantidade }) => soma + valorServico(servico, horas, quantidade), 0);
  return { horas, espacoTotal, servicosTotal, total: espacoTotal + servicosTotal };
}
