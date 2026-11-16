const moeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** 119 -> "R$ 119" · 102.5 -> "R$ 102,50" */
export const formatarMoeda = (valor) => moeda.format(valor).replace(/ /g, ' ');

export const DIAS_SEMANA = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
export const DIAS_CURTOS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

/** "2026-11-20" -> "20/11 (sexta)" */
export function formatarDataCurta(iso) {
  const [a, m, d] = iso.split('-').map(Number);
  const dia = new Date(a, m - 1, d).getDay();
  return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')} (${DIAS_SEMANA[dia].toLowerCase()})`;
}

export const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`;
