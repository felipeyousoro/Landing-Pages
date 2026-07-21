import { DOCUMENTS } from "@/data/mock";
import type { SourceDocument } from "@/types";

const RESPONSES: { match: RegExp; body: string; sourceIds: string[] }[] = [
  {
    match: /lei org[aâ]nica|compet[eê]ncia|prefeito/i,
    body: `Com base na **Lei Orgânica do Município de Olímpia**, as competências do chefe do Executivo incluem:

1. Representar o Município em juízo e fora dele
2. Sancionar, promulgar e publicar as leis
3. Vetar projetos de lei, total ou parcialmente
4. Nomear e exonerar secretários municipais
5. Encaminhar a proposta orçamentária

| Dispositivo | Conteúdo |
|---|---|
| Art. 52 | Competências privativas |
| Art. 53 | Vedações |

> Resposta gerada exclusivamente a partir da base documental institucional (RAG).`,
    sourceIds: ["d1", "d2"],
  },
  {
    match: /decreto|4\.?512/i,
    body: `O **Decreto Municipal nº 4.512/2025** trata da digitalização de processos administrativos:

- Define prazos de migração do físico para o digital
- Estabelece responsabilidades por secretaria
- Regulamenta assinatura eletrônica institucional
- Orienta preservação e guarda documental

Código de referência interno:

\`\`\`
DECRETO-4512/2025 · Gabinete do Prefeito
\`\`\``,
    sourceIds: ["d3"],
  },
  {
    match: /memorando|of[ií]cio|manual|procedimento/i,
    body: `Conforme o **Manual de Procedimentos Administrativos**, documentos oficiais devem observar:

- Identificação clara do remetente e destinatário
- Assunto objetivo na primeira linha
- Linguagem formal e impessoal
- Numeração sequencial e data
- Assinatura com cargo e secretaria

Utilize o **Gerador de Documentos** para produzir ofícios, memorandos e pareceres com prévia institucional.`,
    sourceIds: ["d2", "d5"],
  },
];

const FALLBACK = `Com base nos documentos indexados da Prefeitura de Olímpia, segue a resposta institucional:

A consulta foi processada pelo **OlímpIA** utilizando apenas a base RAG interna — sem acesso à internet.

### Achados principais
- A informação solicitada consta nos manuais e atos normativos municipais indexados
- Recomenda-se validar a página e a secretaria nas fontes abaixo antes de atos oficiais
- Para gerar peças administrativas, use o módulo **Gerador de Documentos**

| Item | Status |
|---|---|
| Base consultada | Institucional |
| Fontes externas | Não utilizadas |`;

export function buildAssistantReply(prompt: string): {
  content: string;
  sources: SourceDocument[];
  confidence: number;
  documentsConsulted: number;
  processingTimeMs: number;
} {
  const matched = RESPONSES.find((r) => r.match.test(prompt));
  const sourceIds = matched?.sourceIds ?? ["d1", "d2", "d3"];
  const sources: SourceDocument[] = sourceIds
    .map((id) => DOCUMENTS.find((d) => d.id === id))
    .filter(Boolean)
    .map((d, i) => ({
      id: d!.id,
      name: d!.name,
      type: d!.type,
      page: [3, 12, 24, 45][i % 4],
      secretaria: d!.secretaria,
    }));

  return {
    content: matched?.body ?? FALLBACK,
    sources,
    confidence: matched ? 92 + Math.floor(Math.random() * 6) : 78 + Math.floor(Math.random() * 10),
    documentsConsulted: sources.length + Math.floor(Math.random() * 2),
    processingTimeMs: 900 + Math.floor(Math.random() * 1200),
  };
}
