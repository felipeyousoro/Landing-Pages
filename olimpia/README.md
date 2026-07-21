# OlímpIA

Protótipo de alta fidelidade (frontend) da **Inteligência Artificial Institucional da Prefeitura de Olímpia**.

Plataforma self-hosted estilo chat com RAG sobre documentos internos — sem backend e sem integração com a internet.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- lucide-react, recharts, react-markdown

## Como rodar

```bash
cd olimpia
pnpm install
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000). O fluxo inicia em `/login`.

### Demo de login

Qualquer e-mail/senha funciona. Use o seletor **Perfil de demonstração** para testar:

- Administrador — acesso ao painel `/admin`
- Gestor / Funcionário — chat, biblioteca e gerador (sem admin)

Credencial sugerida: `ana.mendes@olimpia.sp.gov.br` / `olimpia2026`

## Módulos

| Rota | Descrição |
|------|-----------|
| `/login` | Autenticação mock |
| `/` | Chat RAG com fontes, streaming e ações rápidas |
| `/historico` / `/favoritos` | Gestão de conversas |
| `/biblioteca` | Base documental + upload drag-and-drop |
| `/gerador` | Modelos administrativos + prévia |
| `/perfil` / `/configuracoes` | Conta e informações do sistema |
| `/admin/*` | Dashboard, usuários, permissões, logs, estatísticas |

## Branding

Substitua o placeholder em `public/brand/prefeitura-olimpia.svg` pela logo oficial da Prefeitura quando disponível.

## Build

```bash
pnpm build
pnpm start
```

## Docker

Sobe o protótipo (Next.js standalone) e um PostgreSQL 16 (sem publicar portas no host;
os serviços se falam pela rede padrão do Compose via o hostname `db`):

```bash
cp .env.example .env
docker compose up --build
```

A app ainda não usa o banco; o serviço `db` fica pronto para integrações futuras.
`DATABASE_URL` do serviço `web` aponta para `db:5432`.
