# FitZone · Site

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![Vercel](https://img.shields.io/badge/deploy-Vercel-000000?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)

> **Projeto demonstrativo, com empresa fictícia.**

Site público da **FitZone**, academia fictícia em São Luís – MA. É a vitrine da mesma academia administrada pelo [sistema FitZone](https://github.com/ArthurMoreira79/FitZone) (API REST + painel administrativo): os espaços, os preços e a regra de cobrança são os mesmos do sistema.

O objetivo do site é **captar clientes**. Ele apresenta a academia e leva a pessoa até o WhatsApp com a mensagem já pronta, seja para assinar um plano, marcar uma aula experimental ou pedir a reserva de um espaço.

---

## Destaques

- **Mesmas regras do sistema:** os espaços e os preços por hora vêm do enum `TipoAmbiente`, os serviços adicionais do `TipoServico`, e o cálculo das horas segue o `Agendamento.getHorasCobradas()`. Só contam horas completas, com mínimo de 1 hora: 2h40 vira 2h, e 30 minutos vira 1h ([`cobranca.js`](fitzone-site/src/utils/cobranca.js)).
- **Anilhas como código de cor:** cada espaço tem a cor de uma anilha de competição (vermelha para Musculação, verde para Yoga, amarela para Crossfit e azul para Piscina). A cor nunca aparece sozinha: sempre vem com o nome do espaço ao lado.
- **Barra de progresso em forma de barra de supino:** no formulário de reserva, cada etapa concluída coloca uma anilha na barra.
- **Aviso de conflito com a grade:** se o horário pedido coincide com uma aula coletiva no mesmo espaço, o formulário avisa qual aula é e em que horário.
- **Acessibilidade e desempenho pensados desde o início:** contraste conferido pelo WCAG, vídeo do hero desligado no celular e com `prefers-reduced-motion`, fotos em WebP com `srcset` e `loading="lazy"`.

---

## Funcionalidades

### Página inicial

Hero com vídeo, destaques, modalidades, estrutura, grade semanal de aulas, planos, serviços, professores, depoimentos, perguntas frequentes e contato.

- **Planos:** o botão "Quero esse plano" abre o WhatsApp com o plano escolhido.
- **Aula experimental:** formulário curto (nome, WhatsApp, modalidade e período) que monta a mensagem.

| Plano | Preço |
|---|---|
| Diária | R$ 25 |
| Semanal | R$ 70 |
| Mensal | R$ 119 |
| Trimestral | R$ 309 (promoção: sai por R$ 103 por mês, com uma avaliação física de brinde) |

### Reservas privadas (`/reservas`)

Aluguel por hora dos espaços da academia, com serviços adicionais opcionais. O formulário valida data, horário e capacidade, avisa quando o horário passou ou coincide com uma aula, mostra a prévia do valor e envia o pedido pelo WhatsApp. A recepção confirma a disponibilidade: é um pedido, não uma reserva garantida.

| Espaço | Valor por hora | Capacidade |
|---|---|---|
| Sala de Musculação | R$ 100 | 10 pessoas |
| Sala de Yoga | R$ 70 | 20 pessoas |
| Sala de Crossfit | R$ 100 | 15 pessoas |
| Piscina | R$ 80 | 25 pessoas |

| Serviço adicional | Cobrança |
|---|---|
| Avaliação Física | R$ 70, valor fixo |
| Nutricionista | R$ 80, valor fixo |
| Personal Trainer | R$ 50 por hora |
| Locker | R$ 5 por unidade |

### Acessibilidade

- Botão coral sempre com texto Jet Black (contraste de 4,9:1); coral como cor de texto só sobre fundo escuro.
- Navegação por teclado, link "Pular para o conteúdo" e foco automático no primeiro campo com erro nos formulários.

---

## Tecnologias

| Camada | Tecnologias |
|---|---|
| Interface | React 18 · JavaScript |
| Build | Vite 5 |
| Rotas | React Router 6 (`/` e `/reservas`) |
| Estilo | CSS puro com variáveis, sem framework de UI (tokens em `src/styles/tokens.css`) |
| Conteúdo | Arquivos JSON em `src/data/`: planos, espaços, serviços, aulas, professores, depoimentos, FAQ e contato |
| Mídias | Script com `sharp` que gera as fotos em WebP em dois tamanhos para o `srcset` |
| Deploy | Vercel (`vercel.json` com rewrite para o React Router) |

---

## Estrutura do repositório

```
├── fitzone-site/            # o site (projeto React + Vite)
│   ├── src/
│   │   ├── components/      # Header, Footer, Anilha (SVG), SuporteAnilhas, WhatsAppButton
│   │   ├── sections/        # seções da página inicial (Hero, Planos, GradeAulas, Faq...)
│   │   ├── pages/           # Home e Reservas
│   │   ├── reserva/         # FormReserva e BarraProgresso
│   │   ├── data/            # conteúdo em JSON
│   │   ├── utils/           # cobranca, aulas, whatsapp, telefone, formato
│   │   └── styles/          # tokens.css, global.css, formulario.css
│   ├── public/              # fotos em WebP, vídeos e logos usados pelo site
│   └── scripts/             # otimizar-midias.mjs
├── imagens/                 # fotos originais e logo, usadas pelo script de mídias
└── prompts-imagens.md       # prompts usados para gerar as imagens com IA
```

---

## Como rodar localmente

**Pré-requisito:** Node.js 18 ou mais novo.

```bash
cd fitzone-site
npm install
npm run dev
```

O site abre em `http://localhost:5173`. Para gerar a versão de produção, use `npm run build`.

Para regenerar as fotos em WebP a partir da pasta `imagens/`:

```bash
npm run midias
```

> Na Vercel, o **Root Directory** do projeto deve ser `fitzone-site`.

---

## Projetos relacionados

- [**FitZone**](https://github.com/ArthurMoreira79/FitZone): o sistema de gestão da academia, com API REST em Spring Boot, MySQL e painel em React.

---

Fotos e vídeos gerados por IA para este projeto; pessoas e empresa são fictícias.

Feito por [Arthur Moreira](https://github.com/ArthurMoreira79) · Distribuído sob a licença [MIT](LICENSE).
