"use client";

import { Bot, Building2, Database, HardDrive, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, Badge } from "@/components/ui/card";
import { Label } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { SYSTEM_INFO } from "@/data/mock";
import { formatDateTime } from "@/lib/utils";
import type { UserRole } from "@/types";

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: "administrador", label: "Administrador" },
  { value: "gestor", label: "Gestor" },
  { value: "funcionario", label: "Funcionário" },
];

export default function ConfiguracoesPage() {
  const { user, switchRole } = useAuth();

  const infoCards = [
    {
      icon: Bot,
      label: "Modelo de IA",
      value: SYSTEM_INFO.model,
      tone: "primary" as const,
    },
    {
      icon: Database,
      label: "Documentos indexados",
      value: SYSTEM_INFO.indexedDocuments.toLocaleString("pt-BR"),
      tone: "success" as const,
    },
    {
      icon: RefreshCw,
      label: "Última atualização da base",
      value: formatDateTime(SYSTEM_INFO.lastBaseUpdate),
      tone: "neutral" as const,
    },
    {
      icon: HardDrive,
      label: "Versão",
      value: SYSTEM_INFO.version,
      tone: "warning" as const,
    },
  ];

  return (
    <div className="mx-auto max-w-4xl animate-fade-in-up px-4 py-6 md:px-8 md:py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Configurações
        </h1>
        <p className="mt-1 text-sm text-muted">
          Informações do ambiente institucional e opções de demonstração.
        </p>
      </div>

      <Card className="mb-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            <Building2 className="h-6 w-6" aria-hidden />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Informação institucional</h2>
            <p className="mt-1 text-sm text-muted">{SYSTEM_INFO.institution}</p>
            <p className="mt-3 text-sm text-foreground/80">
              Plataforma self-hosted de inteligência artificial para consulta à base
              documental municipal, sem dependência de serviços externos.
            </p>
          </div>
        </div>
      </Card>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        {infoCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label}>
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-muted text-primary">
                  <Icon className="h-4 w-4" aria-hidden />
                </div>
                <Badge tone={item.tone}>Sistema</Badge>
              </div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                {item.label}
              </p>
              <p className="mt-1 text-base font-semibold text-foreground">{item.value}</p>
            </Card>
          );
        })}
      </div>

      <Card>
        <h2 className="mb-1 text-lg font-semibold text-foreground">
          Perfil de demonstração
        </h2>
        <p className="mb-5 text-sm text-muted">
          Alterna o papel do usuário atual para validar permissões no protótipo.
          Perfil atual:{" "}
          <span className="font-medium text-foreground">
            {ROLE_OPTIONS.find((r) => r.value === user?.role)?.label ?? "—"}
          </span>
        </p>

        <div>
          <Label htmlFor="demo-role">Papel</Label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <select
              id="demo-role"
              value={user?.role ?? "funcionario"}
              onChange={(e) => switchRole(e.target.value as UserRole)}
              className="h-11 w-full max-w-xs rounded-xl border border-border bg-surface px-3.5 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {ROLE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="flex flex-wrap gap-2">
              {ROLE_OPTIONS.map((opt) => (
                <Button
                  key={opt.value}
                  type="button"
                  size="sm"
                  variant={user?.role === opt.value ? "primary" : "outline"}
                  onClick={() => switchRole(opt.value)}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
