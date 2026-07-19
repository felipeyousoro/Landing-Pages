# GAIA UEL Agro - Landing Page

Landing page em Next.js (App Router) + TypeScript + Tailwind CSS para o GAIA,
uma iniciativa de agricultura de precisão com Inteligência Artificial e
drones ligada à Universidade Estadual de Londrina (UEL), com formulário de
contato que envia e-mail por uma rota de backend usando Nodemailer.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS 4](https://tailwindcss.com)
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) para validação de formulário
- [Nodemailer](https://nodemailer.com) para envio do e-mail de contato via SMTP

## Como rodar

Instale as dependências:

```bash
pnpm install
```

Copie o arquivo de ambiente e preencha suas credenciais SMTP:

```bash
cp .env.example .env.local
```

| Variável              | Descrição                                                             |
| ---------------------- | ---------------------------------------------------------------------- |
| `USE_MAIL`            | Chave geral do módulo de e-mail. `false` (padrão) desativa e esconde toda a seção de contato, os botões "Fale com a gente" e a rota `/api/contact`. Use `true` somente após configurar o SMTP abaixo. |
| `SMTP_HOST`           | Servidor SMTP (Gmail, Office365, ou outro provedor)                  |
| `SMTP_PORT`           | Porta SMTP (`587` para TLS, `465` para SSL)                          |
| `SMTP_SECURE`         | `true` para forçar SSL, senão deixe `false`                          |
| `SMTP_USER`           | Usuário da conta SMTP                                                 |
| `SMTP_PASS`           | Senha da conta SMTP / senha de app                                    |
| `CONTACT_TO_EMAIL`    | Caixa de entrada que recebe as mensagens do formulário                |
| `CONTACT_FROM_EMAIL`  | Endereço "De" usado nos e-mails enviados (padrão: `SMTP_USER`)        |

> **Usuários do Gmail:** crie uma [senha de app](https://myaccount.google.com/apppasswords)
> (requer verificação em duas etapas) em vez da senha normal da conta.

Rode o servidor de desenvolvimento:

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura do projeto

```
src/
  app/
    api/contact/route.ts   # Endpoint POST que valida e envia o e-mail de contato
    layout.tsx              # Layout raiz, fontes, metadata
    page.tsx                # Composição da landing page
  components/
    navbar.tsx               # Início / Detecção de Doenças / Drones + CTA de contato
    hero.tsx, about.tsx, disease-detection.tsx, drones.tsx,
    contact.tsx, contact-form.tsx, footer.tsx
  lib/
    contact-schema.ts       # Schema Zod compartilhado (validação client + server)
    mailer.ts                # Transporter Nodemailer + template do e-mail
public/
  brand/                     # Logo da UEL (verde e branco), usado na navbar/rodapé
  disease/                   # Exemplos de diagnóstico de doenças (Grad-CAM / Score-CAM)
ref/                         # Assets originais baixados/gerados como fonte
```

## Módulo de e-mail (USE_MAIL)

O envio de e-mail é controlado por uma única chave, `USE_MAIL`, definida em
`src/lib/feature-flags.ts`. Enquanto `USE_MAIL` não for `"true"`:

- a seção "Contato" não é renderizada na página;
- os botões/links "Fale com a gente" (navbar, herói e rodapé) ficam ocultos;
- a rota `POST /api/contact` responde `404`, mesmo se chamada diretamente.

Isso permite publicar o site sem SMTP configurado. Quando o e-mail estiver
pronto, defina `USE_MAIL=true` e as variáveis `SMTP_*` / `CONTACT_*` no seu
`.env.local` (ou nas variáveis de ambiente do provedor de hospedagem).

## Identidade visual

A seção "Detecção de Doenças" e "Drones" são as duas abas de navegação
adicionais além de "Início", conforme solicitado. As cores em
`src/app/globals.css` usam o verde oficial da UEL (`#00753B`, conforme o
Manual de Identidade Visual da UEL) como cor primária, com um teal
tecnológico como cor de destaque (IA / drones).

### Sobre o logo da UEL

Não existe um logotipo oficial único e público para um "Grupo GAIA" ligado à
UEL voltado a agricultura/drones — a pesquisa encontrou apenas entidades
distintas com nomes parecidos (uma empresa privada "Gaia Agro Solutions"
parceira da UEL em bioinsumos, o centro de pesquisa "CIA-Agro" da UEL/Paraná
sobre IA no agronegócio, e uma "Fábrica de Software GAIA" do Departamento de
Computação da UEL, sem relação com agro). Por isso, a navbar usa o
**símbolo oficial da UEL** (baixado do site institucional, arquivo
`ref/uel-logo-branco.png`, recolorido programaticamente para o verde oficial
da marca — mesma forma, apenas outra cor prevista no manual) ao lado de um
wordmark de texto "GAIA", em vez de um logotipo de terceiros não confirmado.
Se a organização tiver um logotipo próprio, basta substituir os arquivos em
`public/brand/` e o texto "GAIA" no `navbar.tsx`/`footer.tsx`.

As imagens em `public/disease/` (mapas de calor Grad-CAM++/Score-CAM sobre
folhas doentes) foram fornecidas como referência do próprio projeto.

## Build

```bash
pnpm build
pnpm start
```
