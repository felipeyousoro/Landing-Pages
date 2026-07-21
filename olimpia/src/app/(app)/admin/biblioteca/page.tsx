"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, Card } from "@/components/ui/card";
import { DOCUMENTS } from "@/data/mock";
import { formatDate } from "@/lib/utils";
import type { DocumentStatus } from "@/types";

const statusTone: Record<DocumentStatus, "success" | "warning" | "danger" | "neutral"> = {
  indexado: "success",
  processando: "warning",
  erro: "danger",
  pendente: "neutral",
};

const statusLabel: Record<DocumentStatus, string> = {
  indexado: "Indexado",
  processando: "Processando",
  erro: "Erro",
  pendente: "Pendente",
};

export default function AdminBibliotecaPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Biblioteca (admin)</h2>
          <p className="text-sm text-muted">
            Visão compacta dos documentos da base. Gestão completa na biblioteca pública.
          </p>
        </div>
        <Link href="/biblioteca">
          <Button variant="outline">
            Abrir biblioteca
            <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-muted/60 text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3 font-semibold">Documento</th>
                <th className="px-4 py-3 font-semibold">Tipo</th>
                <th className="px-4 py-3 font-semibold">Secretaria</th>
                <th className="px-4 py-3 font-semibold">Categoria</th>
                <th className="px-4 py-3 font-semibold">Data</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {DOCUMENTS.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b border-border last:border-0 hover:bg-surface-muted/40"
                >
                  <td className="max-w-[280px] truncate px-4 py-3 font-medium">{doc.name}</td>
                  <td className="px-4 py-3">
                    <Badge tone="neutral">{doc.type}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted">{doc.secretaria}</td>
                  <td className="px-4 py-3">{doc.category}</td>
                  <td className="px-4 py-3 tabular-nums text-muted">{formatDate(doc.date)}</td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone[doc.status]}>{statusLabel[doc.status]}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
