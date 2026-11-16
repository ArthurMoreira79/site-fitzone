# FitZone — site

Site público da **FitZone**, academia fictícia em São Luís – MA. É a vitrine da mesma academia gerida pelo
[sistema FitZone](https://github.com/ArthurMoreira79/FitZone) (API + painel administrativo).

> Projeto demonstrativo — empresa fictícia. Desenvolvido por [Arthur Moreira](https://github.com/ArthurMoreira79).

## O que o site faz

O objetivo é **captar clientes**: o site convence e leva a pessoa até o WhatsApp com a mensagem pronta.

- **Planos** (diária, semanal, mensal e trimestral em promoção): “Quero esse plano” abre o WhatsApp com o plano escolhido.
- **Aula experimental**: formulário curto (nome, WhatsApp, modalidade, período) que monta a mensagem.
- **Reservas privadas** (`/reservas`): aluguel por hora da Sala de Musculação, Sala de Yoga, Sala de Crossfit e Piscina.
  O formulário valida data, horário e capacidade, avisa quando o horário coincide com uma aula da grade, mostra a prévia
  do valor e envia o pedido pelo WhatsApp. A recepção confirma a disponibilidade: é um pedido, não uma reserva garantida.

## Coerência com o sistema

- Os espaços e os preços por hora são os do enum `TipoAmbiente`; os serviços adicionais, os do `TipoServico`.
- A regra de cobrança é a mesma do `Agendamento.getHorasCobradas()`: só contam horas completas, com mínimo de 1 hora
  (2h40 → 2h; 30 min → 1h). Ver [`src/utils/cobranca.js`](src/utils/cobranca.js).
- **Anilhas como código de cor**: cada espaço tem a cor de uma anilha de competição (vermelha = Musculação,
  verde = Yoga, amarela = Crossfit, azul = Piscina). A cor nunca é decoração e sempre aparece com o nome do espaço ao lado.

## Stack

- React 18 + Vite 5 + React Router 6, CSS puro com variáveis (sem framework de UI)
- Conteúdo em JSON (`src/data`): planos, espaços, serviços, aulas, professores, depoimentos, FAQ e contato
- Componentes-chave: `Anilha` (SVG), `SuporteAnilhas`, `GradeAulas`, `FormReserva`, `BarraProgresso`
- Deploy na Vercel (`vercel.json` com rewrite para o React Router)

## Rodando

```bash
npm install
npm run dev
```

As fotos ficam em `../imagens` (fora do repositório). Para regenerar as versões WebP em `public/img`:

```bash
npm run midias
```

## Acessibilidade e desempenho

- Contraste conferido pelo WCAG: botão coral sempre com texto Jet Black (4,9:1); coral como texto só sobre fundo escuro.
- O vídeo do hero não é carregado no celular nem com `prefers-reduced-motion` (fica só a imagem).
- Fotos em WebP com `srcset` e `loading="lazy"`; vídeos sem faixa de áudio.
- Navegação por teclado, link “Pular para o conteúdo”, foco no primeiro campo com erro nos formulários.

## Licença

Código livre para estudo. Fotos e vídeos gerados por IA para este projeto; pessoas e empresa são fictícias.
