import type {
  AdminLog,
  Conversation,
  DocumentTemplate,
  LibraryDocument,
  User,
} from "@/types";

export const CURRENT_USER: User = {
  id: "u1",
  name: "Ana Paula Mendes",
  email: "ana.mendes@olimpia.sp.gov.br",
  role: "administrador",
  cargo: "Analista de Sistemas",
  secretaria: "Secretaria de Administração",
  status: "ativo",
  lastAccess: "2026-07-21T08:42:00",
};

export const USERS: User[] = [
  CURRENT_USER,
  {
    id: "u2",
    name: "Carlos Eduardo Silva",
    email: "carlos.silva@olimpia.sp.gov.br",
    role: "gestor",
    cargo: "Diretor de Departamento",
    secretaria: "Secretaria de Saúde",
    status: "ativo",
    lastAccess: "2026-07-21T09:15:00",
  },
  {
    id: "u3",
    name: "Mariana Costa",
    email: "mariana.costa@olimpia.sp.gov.br",
    role: "funcionario",
    cargo: "Assistente Administrativo",
    secretaria: "Secretaria de Educação",
    status: "ativo",
    lastAccess: "2026-07-20T16:30:00",
  },
  {
    id: "u4",
    name: "Roberto Almeida",
    email: "roberto.almeida@olimpia.sp.gov.br",
    role: "funcionario",
    cargo: "Técnico Legislativo",
    secretaria: "Procuradoria Geral",
    status: "ativo",
    lastAccess: "2026-07-21T07:50:00",
  },
  {
    id: "u5",
    name: "Juliana Ferreira",
    email: "juliana.ferreira@olimpia.sp.gov.br",
    role: "gestor",
    cargo: "Secretária Adjunta",
    secretaria: "Secretaria de Finanças",
    status: "bloqueado",
    lastAccess: "2026-07-10T11:00:00",
  },
  {
    id: "u6",
    name: "Pedro Henrique Santos",
    email: "pedro.santos@olimpia.sp.gov.br",
    role: "funcionario",
    cargo: "Analista de Processos",
    secretaria: "Secretaria de Administração",
    status: "ativo",
    lastAccess: "2026-07-21T10:05:00",
  },
];

export const DOCUMENTS: LibraryDocument[] = [
  {
    id: "d1",
    name: "Lei Orgânica do Município de Olímpia",
    type: "PDF",
    secretaria: "Procuradoria Geral",
    category: "Legislação",
    date: "2024-03-12",
    status: "indexado",
    pages: 86,
  },
  {
    id: "d2",
    name: "Manual de Procedimentos Administrativos",
    type: "PDF",
    secretaria: "Secretaria de Administração",
    category: "Manual",
    date: "2025-01-20",
    status: "indexado",
    pages: 142,
  },
  {
    id: "d3",
    name: "Decreto Municipal nº 4.512/2025",
    type: "PDF",
    secretaria: "Gabinete do Prefeito",
    category: "Decreto",
    date: "2025-06-08",
    status: "indexado",
    pages: 12,
  },
  {
    id: "d4",
    name: "Planilha Orçamentária 2026",
    type: "XLSX",
    secretaria: "Secretaria de Finanças",
    category: "Orçamento",
    date: "2026-02-01",
    status: "indexado",
    pages: 24,
  },
  {
    id: "d5",
    name: "Modelo de Ofício Institucional",
    type: "DOCX",
    secretaria: "Secretaria de Administração",
    category: "Modelo",
    date: "2025-11-15",
    status: "indexado",
    pages: 3,
  },
  {
    id: "d6",
    name: "Regimento Interno da Câmara",
    type: "PDF",
    secretaria: "Procuradoria Geral",
    category: "Legislação",
    date: "2023-09-30",
    status: "indexado",
    pages: 54,
  },
  {
    id: "d7",
    name: "Protocolo de Atendimento ao Cidadão",
    type: "PDF",
    secretaria: "Secretaria de Governo",
    category: "Manual",
    date: "2025-08-22",
    status: "processando",
    pages: 28,
  },
  {
    id: "d8",
    name: "Relatório de Gestão Escolar 2025",
    type: "DOCX",
    secretaria: "Secretaria de Educação",
    category: "Relatório",
    date: "2026-01-10",
    status: "erro",
    pages: 67,
  },
  {
    id: "d9",
    name: "Portaria SEMSA nº 218/2026",
    type: "PDF",
    secretaria: "Secretaria de Saúde",
    category: "Portaria",
    date: "2026-04-03",
    status: "indexado",
    pages: 5,
  },
  {
    id: "d10",
    name: "Inventário Patrimonial 2026",
    type: "XLSX",
    secretaria: "Secretaria de Administração",
    category: "Patrimônio",
    date: "2026-05-18",
    status: "pendente",
    pages: 41,
  },
];

export const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    title: "Consulta sobre Lei Orgânica — competências do Prefeito",
    favorite: true,
    createdAt: "2026-07-20T14:20:00",
    updatedAt: "2026-07-20T14:25:00",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "Quais são as competências do Prefeito segundo a Lei Orgânica?",
        createdAt: "2026-07-20T14:20:00",
      },
      {
        id: "m2",
        role: "assistant",
        content: `De acordo com a **Lei Orgânica do Município de Olímpia**, o Prefeito exerce as seguintes competências principais:

1. **Representar** o Município em juízo e fora dele
2. **Sancionar, promulgar e fazer publicar** as leis
3. **Vetar**, no todo ou em parte, projetos de lei
4. **Nomear e exonerar** secretários e servidores em cargos de confiança
5. **Encaminhar** a proposta orçamentária anual

### Resumo tabular

| Competência | Base legal |
|---|---|
| Representação institucional | Art. 52, I |
| Sanção e promulgação | Art. 52, III |
| Nomeações | Art. 52, VI |

> As respostas do OlímpIA são baseadas exclusivamente na base documental institucional.`,
        createdAt: "2026-07-20T14:21:30",
        sources: [
          {
            id: "d1",
            name: "Lei Orgânica do Município de Olímpia",
            type: "PDF",
            page: 24,
            secretaria: "Procuradoria Geral",
          },
          {
            id: "d2",
            name: "Manual de Procedimentos Administrativos",
            type: "PDF",
            page: 8,
            secretaria: "Secretaria de Administração",
          },
        ],
        confidence: 94,
        documentsConsulted: 3,
        processingTimeMs: 1840,
        liked: true,
      },
    ],
  },
  {
    id: "c2",
    title: "Modelo de memorando interno",
    favorite: false,
    createdAt: "2026-07-19T10:00:00",
    updatedAt: "2026-07-19T10:08:00",
    messages: [
      {
        id: "m3",
        role: "user",
        content: "Como estruturar um memorando interno conforme o manual?",
        createdAt: "2026-07-19T10:00:00",
      },
      {
        id: "m4",
        role: "assistant",
        content: `Conforme o **Manual de Procedimentos Administrativos**, o memorando deve conter:

- Cabeçalho com brasão e identificação da secretaria
- Número sequencial e data
- Destinatário e remetente
- Assunto objetivo
- Corpo do texto em linguagem formal
- Assinatura e cargo

Utilize o **Gerador de Documentos** do OlímpIA para produzir o modelo preenchido.`,
        createdAt: "2026-07-19T10:01:20",
        sources: [
          {
            id: "d2",
            name: "Manual de Procedimentos Administrativos",
            type: "PDF",
            page: 45,
            secretaria: "Secretaria de Administração",
          },
          {
            id: "d5",
            name: "Modelo de Ofício Institucional",
            type: "DOCX",
            page: 1,
            secretaria: "Secretaria de Administração",
          },
        ],
        confidence: 91,
        documentsConsulted: 2,
        processingTimeMs: 1320,
      },
    ],
  },
  {
    id: "c3",
    title: "Decreto 4.512/2025 — resumo",
    favorite: true,
    createdAt: "2026-07-18T09:30:00",
    updatedAt: "2026-07-18T09:35:00",
    messages: [
      {
        id: "m5",
        role: "user",
        content: "Resuma o Decreto Municipal nº 4.512/2025",
        createdAt: "2026-07-18T09:30:00",
      },
      {
        id: "m6",
        role: "assistant",
        content: `O **Decreto Municipal nº 4.512/2025** estabelece diretrizes para a digitalização de processos administrativos na Prefeitura de Olímpia, incluindo:

- Prazos para migração de processos físicos
- Responsabilidades das secretarias
- Uso de assinatura eletrônica institucional
- Critérios de preservação documental`,
        createdAt: "2026-07-18T09:31:10",
        sources: [
          {
            id: "d3",
            name: "Decreto Municipal nº 4.512/2025",
            type: "PDF",
            page: 2,
            secretaria: "Gabinete do Prefeito",
          },
        ],
        confidence: 97,
        documentsConsulted: 1,
        processingTimeMs: 980,
      },
    ],
  },
];

export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: "oficio",
    name: "Ofício",
    description: "Correspondência oficial externa entre órgãos e entidades.",
    fields: [
      { id: "destinatario", label: "Destinatário", placeholder: "Nome e cargo do destinatário" },
      { id: "assunto", label: "Assunto", placeholder: "Assunto do ofício" },
      { id: "corpo", label: "Corpo do texto", placeholder: "Redija o conteúdo...", multiline: true },
    ],
  },
  {
    id: "memorando",
    name: "Memorando",
    description: "Comunicação interna entre unidades administrativas.",
    fields: [
      { id: "para", label: "Para", placeholder: "Setor / servidor destinatário" },
      { id: "de", label: "De", placeholder: "Setor / servidor remetente" },
      { id: "assunto", label: "Assunto", placeholder: "Assunto do memorando" },
      { id: "corpo", label: "Conteúdo", placeholder: "Redija o conteúdo...", multiline: true },
    ],
  },
  {
    id: "parecer",
    name: "Parecer",
    description: "Manifestação técnica ou jurídica fundamentada.",
    fields: [
      { id: "processo", label: "Nº do processo", placeholder: "Ex: 2026/001234" },
      { id: "interessado", label: "Interessado", placeholder: "Nome do interessado" },
      { id: "analise", label: "Análise", placeholder: "Fundamentos da análise...", multiline: true },
      { id: "conclusao", label: "Conclusão", placeholder: "Conclusão do parecer...", multiline: true },
    ],
  },
  {
    id: "relatorio",
    name: "Relatório",
    description: "Relatório administrativo ou de gestão.",
    fields: [
      { id: "titulo", label: "Título", placeholder: "Título do relatório" },
      { id: "periodo", label: "Período", placeholder: "Ex: Janeiro a Março/2026" },
      { id: "conteudo", label: "Conteúdo", placeholder: "Descreva os fatos e resultados...", multiline: true },
    ],
  },
  {
    id: "ata",
    name: "Ata",
    description: "Registro formal de reunião.",
    fields: [
      { id: "data", label: "Data da reunião", placeholder: "DD/MM/AAAA" },
      { id: "local", label: "Local", placeholder: "Sala / endereço" },
      { id: "pauta", label: "Pauta", placeholder: "Itens da pauta...", multiline: true },
      { id: "deliberacoes", label: "Deliberações", placeholder: "Deliberações...", multiline: true },
    ],
  },
  {
    id: "despacho",
    name: "Despacho",
    description: "Decisão ou encaminhamento em processo administrativo.",
    fields: [
      { id: "processo", label: "Nº do processo", placeholder: "Ex: 2026/001234" },
      { id: "despacho", label: "Texto do despacho", placeholder: "Redija o despacho...", multiline: true },
    ],
  },
  {
    id: "declaracao",
    name: "Declaração",
    description: "Documento declaratório institucional.",
    fields: [
      { id: "declarante", label: "Declarante", placeholder: "Nome completo" },
      { id: "texto", label: "Texto da declaração", placeholder: "Declaramos para os devidos fins...", multiline: true },
    ],
  },
  {
    id: "requerimento",
    name: "Requerimento",
    description: "Solicitação formal a autoridade ou setor.",
    fields: [
      { id: "requerente", label: "Requerente", placeholder: "Nome do requerente" },
      { id: "pedido", label: "Pedido", placeholder: "O que está sendo requerido...", multiline: true },
      { id: "fundamento", label: "Fundamento", placeholder: "Base legal ou justificativa...", multiline: true },
    ],
  },
];

export const ADMIN_LOGS: AdminLog[] = [
  {
    id: "l1",
    timestamp: "2026-07-21T10:12:00",
    user: "Ana Paula Mendes",
    action: "Reindexação",
    detail: "Documento d2 reindexado com sucesso",
    level: "info",
  },
  {
    id: "l2",
    timestamp: "2026-07-21T09:48:00",
    user: "Carlos Eduardo Silva",
    action: "Upload",
    detail: "Novo PDF enviado — Portaria SEMSA nº 218/2026",
    level: "info",
  },
  {
    id: "l3",
    timestamp: "2026-07-21T09:20:00",
    user: "Sistema",
    action: "Erro de indexação",
    detail: "Falha ao processar Relatório de Gestão Escolar 2025",
    level: "error",
  },
  {
    id: "l4",
    timestamp: "2026-07-20T17:05:00",
    user: "Ana Paula Mendes",
    action: "Usuário bloqueado",
    detail: "Juliana Ferreira — status alterado para bloqueado",
    level: "warning",
  },
  {
    id: "l5",
    timestamp: "2026-07-20T15:30:00",
    user: "Mariana Costa",
    action: "Consulta RAG",
    detail: "Consulta legislação municipal — 3 fontes",
    level: "info",
  },
];

export const QUICK_ACTIONS = [
  { id: "legislacao", label: "Consultar legislação municipal", prompt: "Quais são os principais dispositivos da Lei Orgânica sobre competências municipais?" },
  { id: "resumo", label: "Resumir PDF", prompt: "Resuma o Manual de Procedimentos Administrativos em tópicos objetivos." },
  { id: "memorando", label: "Criar Memorando", prompt: "Gere um memorando interno solicitando providências sobre digitalização de processos." },
  { id: "oficio", label: "Criar Ofício", prompt: "Elabore um ofício institucional solicitando informações orçamentárias." },
  { id: "relatorio", label: "Criar Relatório", prompt: "Estruture um relatório administrativo sobre uso da plataforma OlímpIA." },
  { id: "decreto", label: "Pesquisar Decreto", prompt: "O que estabelece o Decreto Municipal nº 4.512/2025?" },
  { id: "manual", label: "Consultar Manual", prompt: "Como deve ser protocolado um processo administrativo segundo o manual?" },
  { id: "processo", label: "Buscar Processo Administrativo", prompt: "Quais etapas compõem o trâmite de um processo administrativo municipal?" },
  { id: "parecer", label: "Elaborar Parecer", prompt: "Elabore a estrutura de um parecer técnico sobre contratação de serviços." },
  { id: "ata", label: "Criar Ata de Reunião", prompt: "Monte o modelo de uma ata de reunião de coordenação entre secretarias." },
];

export const ADMIN_METRICS = {
  activeUsers: 128,
  conversationsToday: 347,
  indexedDocuments: 2841,
  queriesTotal: 12560,
  avgResponseTime: "1.8s",
};

export const CHART_USAGE_BY_SECRETARIA = [
  { name: "Administração", value: 420 },
  { name: "Saúde", value: 310 },
  { name: "Educação", value: 280 },
  { name: "Finanças", value: 190 },
  { name: "Governo", value: 150 },
  { name: "Procuradoria", value: 120 },
];

export const CHART_DOC_GROWTH = [
  { month: "Jan", docs: 2100 },
  { month: "Fev", docs: 2250 },
  { month: "Mar", docs: 2380 },
  { month: "Abr", docs: 2510 },
  { month: "Mai", docs: 2680 },
  { month: "Jun", docs: 2750 },
  { month: "Jul", docs: 2841 },
];

export const CHART_TOP_DOCS = [
  { name: "Lei Orgânica", consultas: 890 },
  { name: "Manual Proc.", consultas: 720 },
  { name: "Decreto 4512", consultas: 540 },
  { name: "Regimento", consultas: 410 },
  { name: "Portaria SEMSA", consultas: 280 },
];

export const CHART_DAILY_USAGE = [
  { day: "Seg", usos: 420 },
  { day: "Ter", usos: 510 },
  { day: "Qua", usos: 480 },
  { day: "Qui", usos: 560 },
  { day: "Sex", usos: 490 },
  { day: "Sáb", usos: 120 },
  { day: "Dom", usos: 80 },
];

export const SYSTEM_INFO = {
  model: "OlímpIA RAG v1.4 (self-hosted)",
  indexedDocuments: 2841,
  lastBaseUpdate: "2026-07-21T06:00:00",
  version: "1.0.0-prototype",
  institution: "Prefeitura da Estância Turística de Olímpia — SP",
};
