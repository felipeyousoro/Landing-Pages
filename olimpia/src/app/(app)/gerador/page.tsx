"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Copy, FileDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { DOCUMENT_TEMPLATES } from "@/data/mock";
import type { DocumentTemplate } from "@/types";

type Step = "grid" | "form" | "preview";

function buildDocument(
  template: DocumentTemplate,
  values: Record<string, string>,
): string {
  const today = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const header = [
    "PREFEITURA DA ESTÂNCIA TURÍSTICA DE OLÍMPIA",
    "Estado de São Paulo",
    "────────────────────────────────────────",
    "",
  ].join("\n");

  switch (template.id) {
    case "oficio":
      return [
        header,
        `Ofício nº ____/${new Date().getFullYear()}`,
        `Olímpia, ${today}.`,
        "",
        `Ao(À) Sr(a). ${values.destinatario || "____________________"}`,
        "",
        `Assunto: ${values.assunto || "____________________"}`,
        "",
        "Senhor(a),",
        "",
        values.corpo ||
          "Pelo presente, encaminhamos as informações solicitadas para as devidas providências.",
        "",
        "Atenciosamente,",
        "",
        "________________________________",
        "Prefeitura de Olímpia",
      ].join("\n");

    case "memorando":
      return [
        header,
        "MEMORANDO",
        "",
        `Para: ${values.para || "____________________"}`,
        `De: ${values.de || "____________________"}`,
        `Assunto: ${values.assunto || "____________________"}`,
        `Data: ${today}`,
        "",
        values.corpo ||
          "Solicitamos as providências necessárias conforme o disposto neste memorando.",
        "",
        "Respeitosamente,",
        "",
        "________________________________",
      ].join("\n");

    case "parecer":
      return [
        header,
        "PARECER TÉCNICO / JURÍDICO",
        "",
        `Processo nº: ${values.processo || "____________________"}`,
        `Interessado: ${values.interessado || "____________________"}`,
        `Data: ${today}`,
        "",
        "I – ANÁLISE",
        "",
        values.analise || "Análise a ser desenvolvida com base na documentação acostada.",
        "",
        "II – CONCLUSÃO",
        "",
        values.conclusao ||
          "Face ao exposto, opina-se pelo deferimento, salvos melhores juízos.",
        "",
        "É o parecer.",
        "",
        "________________________________",
      ].join("\n");

    case "relatorio":
      return [
        header,
        "RELATÓRIO ADMINISTRATIVO",
        "",
        `Título: ${values.titulo || "____________________"}`,
        `Período: ${values.periodo || "____________________"}`,
        `Data de emissão: ${today}`,
        "",
        "1. INTRODUÇÃO",
        "",
        "O presente relatório tem por finalidade apresentar os resultados e informações relevantes do período indicado.",
        "",
        "2. DESENVOLVIMENTO",
        "",
        values.conteudo ||
          "Conteúdo descritivo das atividades, indicadores e resultados obtidos.",
        "",
        "3. CONSIDERAÇÕES FINAIS",
        "",
        "Permanecemos à disposição para esclarecimentos adicionais.",
        "",
        "________________________________",
        "Prefeitura de Olímpia",
      ].join("\n");

    case "ata":
      return [
        header,
        "ATA DE REUNIÃO",
        "",
        `Aos ${values.data || "____/____/________"}, no local ${values.local || "____________________"}, reuniram-se os participantes para tratar da seguinte pauta:`,
        "",
        "PAUTA",
        values.pauta || "Itens a serem deliberados.",
        "",
        "DELIBERAÇÕES",
        values.deliberacoes || "Registre-se as deliberações tomadas pelos presentes.",
        "",
        "Nada mais havendo a tratar, lavrou-se a presente ata, que vai assinada pelos participantes.",
        "",
        `Olímpia, ${today}.`,
        "",
        "________________________________",
        "Secretário(a) da reunião",
      ].join("\n");

    case "despacho":
      return [
        header,
        "DESPACHO",
        "",
        `Processo nº: ${values.processo || "____________________"}`,
        `Data: ${today}`,
        "",
        values.despacho ||
          "Autorizo o prosseguimento do feito, com as providências cabíveis.",
        "",
        "Cumpra-se.",
        "",
        "________________________________",
        "Autoridade competente",
      ].join("\n");

    case "declaracao":
      return [
        header,
        "DECLARAÇÃO",
        "",
        `Declaramos, para os devidos fins, que ${values.declarante || "____________________"}:`,
        "",
        values.texto ||
          "encontra-se em situação regular perante esta Municipalidade, nos termos da legislação vigente.",
        "",
        `Olímpia, ${today}.`,
        "",
        "________________________________",
        "Prefeitura de Olímpia",
      ].join("\n");

    case "requerimento":
      return [
        header,
        "REQUERIMENTO",
        "",
        `Ilmo(a). Senhor(a),`,
        "",
        `${values.requerente || "____________________"}, vem respeitosamente requerer:`,
        "",
        values.pedido || "o objeto do presente requerimento.",
        "",
        "FUNDAMENTO",
        "",
        values.fundamento ||
          "O pedido encontra respaldo na legislação municipal e nos princípios da Administração Pública.",
        "",
        "Nestes termos, pede deferimento.",
        "",
        `Olímpia, ${today}.`,
        "",
        "________________________________",
        "Requerente",
      ].join("\n");

    default:
      return header + "\nDocumento gerado pelo OlímpIA.";
  }
}

export default function GeradorPage() {
  const [step, setStep] = useState<Step>("grid");
  const [selected, setSelected] = useState<DocumentTemplate | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const preview = useMemo(() => {
    if (!selected) return "";
    return buildDocument(selected, values);
  }, [selected, values]);

  function selectTemplate(template: DocumentTemplate) {
    setSelected(template);
    const initial: Record<string, string> = {};
    for (const field of template.fields) {
      initial[field.id] = "";
    }
    setValues(initial);
    setStep("form");
    setCopied(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("preview");
    setCopied(false);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(preview);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Não foi possível copiar o texto.");
    }
  }

  return (
    <div className="mx-auto max-w-5xl animate-fade-in-up px-4 py-6 md:px-8 md:py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Gerador de documentos
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Selecione um modelo institucional, preencha os campos e gere o documento
          formal para a Prefeitura de Olímpia.
        </p>
      </div>

      {step === "grid" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DOCUMENT_TEMPLATES.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => selectTemplate(template)}
              className="text-left"
            >
              <Card className="h-full cursor-pointer transition hover:border-primary/40 hover:bg-primary-soft/40">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <FileText className="h-5 w-5" aria-hidden />
                </div>
                <h2 className="text-base font-semibold text-foreground">{template.name}</h2>
                <p className="mt-1 text-sm text-muted">{template.description}</p>
              </Card>
            </button>
          ))}
        </div>
      )}

      {step === "form" && selected && (
        <Card className="max-w-2xl">
          <button
            type="button"
            onClick={() => {
              setStep("grid");
              setSelected(null);
            }}
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Voltar aos modelos
          </button>

          <h2 className="mb-1 text-xl font-semibold">{selected.name}</h2>
          <p className="mb-6 text-sm text-muted">{selected.description}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {selected.fields.map((field) => (
              <div key={field.id}>
                <Label htmlFor={field.id}>{field.label}</Label>
                {field.multiline ? (
                  <Textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    value={values[field.id] ?? ""}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, [field.id]: e.target.value }))
                    }
                    rows={5}
                  />
                ) : (
                  <Input
                    id={field.id}
                    placeholder={field.placeholder}
                    value={values[field.id] ?? ""}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, [field.id]: e.target.value }))
                    }
                  />
                )}
              </div>
            ))}

            <div className="flex flex-wrap gap-2 pt-2">
              <Button type="submit">Gerar documento</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setStep("grid");
                  setSelected(null);
                }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      {step === "preview" && selected && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("form")}
            >
              Editar
            </Button>
            <Button type="button" variant="secondary" onClick={handleCopy}>
              <Copy className="h-4 w-4" aria-hidden />
              {copied ? "Copiado!" : "Copiar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                alert("Protótipo: exportação em PDF será disponibilizada em breve.")
              }
            >
              <FileDown className="h-4 w-4" aria-hidden />
              Exportar PDF
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                alert("Protótipo: exportação em Word será disponibilizada em breve.")
              }
            >
              <FileDown className="h-4 w-4" aria-hidden />
              Exportar Word
            </Button>
          </div>

          <Card className="bg-[#fafbfc]">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
              Pré-visualização — {selected.name}
            </p>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
              {preview}
            </pre>
          </Card>
        </div>
      )}
    </div>
  );
}
