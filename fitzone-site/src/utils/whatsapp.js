import contato from '../data/contato.json';
import { formatarMoeda, formatarDataCurta } from './formato.js';

export function linkWhatsApp(texto) {
  return `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(texto)}`;
}

/** Contato geral (botão flutuante, seção Contato, rodapé): fala com o autor do projeto. */
export const MENSAGEM_CONTATO = 'Olá, Arthur! Vi o site da FitZone, gostei do projeto e quero saber mais.';

export const linkContato = () => linkWhatsApp(MENSAGEM_CONTATO);

/** Abre direto a conversa no Instagram (o Instagram não aceita mensagem pronta). */
export const linkInstagram = () => `https://ig.me/m/${contato.instagram}`;

/** Fluxo A: "Quero esse plano" */
export function linkPlano(plano) {
  return linkWhatsApp(
    `Olá! Quero assinar o plano ${plano.nome} da FitZone (${formatarMoeda(plano.preco)} ${plano.periodo}).`
  );
}

/** Fluxo A: aula experimental */
export function linkAulaExperimental({ nome, whatsapp, modalidade, periodo }) {
  return linkWhatsApp(
    [
      'Olá! Quero agendar uma aula experimental na FitZone.',
      '',
      `Nome: ${nome}`,
      `WhatsApp: ${whatsapp}`,
      `Modalidade: ${modalidade}`,
      `Melhor período: ${periodo}`,
    ].join('\n')
  );
}

/** Fluxo B: pedido de reserva (modelo do plano, seção 5) */
export function mensagemReserva({ espaco, data, inicio, fim, uso, pessoas, servicos, total, horas, nome, obs }) {
  return [
    'Olá! Quero reservar um espaço na FitZone.',
    '',
    `Espaço: ${espaco}`,
    `Data: ${formatarDataCurta(data)}, das ${inicio} às ${fim}`,
    `Uso: ${uso} · ${pessoas} ${pessoas === 1 ? 'pessoa' : 'pessoas'}`,
    `Serviços: ${servicos.length ? servicos.join(', ') : 'nenhum'}`,
    `Valor estimado: ${formatarMoeda(total)} (${horas} h cobradas)`,
    `Nome: ${nome}`,
    `Observações: ${obs || '—'}`,
  ].join('\n');
}
