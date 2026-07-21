"use client";

import {
  Clock3,
  FileSearch,
  Files,
  MessageSquareText,
  Users,
} from "lucide-react";
import { AdminCharts } from "@/components/admin/admin-charts";
import { Card } from "@/components/ui/card";
import { ADMIN_METRICS } from "@/data/mock";

const metrics = [
  {
    label: "Usuários ativos",
    value: ADMIN_METRICS.activeUsers.toLocaleString("pt-BR"),
    icon: Users,
  },
  {
    label: "Conversas hoje",
    value: ADMIN_METRICS.conversationsToday.toLocaleString("pt-BR"),
    icon: MessageSquareText,
  },
  {
    label: "Documentos indexados",
    value: ADMIN_METRICS.indexedDocuments.toLocaleString("pt-BR"),
    icon: Files,
  },
  {
    label: "Consultas",
    value: ADMIN_METRICS.queriesTotal.toLocaleString("pt-BR"),
    icon: FileSearch,
  },
  {
    label: "Tempo médio",
    value: ADMIN_METRICS.avgResponseTime,
    icon: Clock3,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted">
          Visão geral de uso, base documental e desempenho do assistente.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {metrics.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="relative overflow-hidden !p-4">
            <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-primary-soft/70" />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  {label}
                </p>
                <p className="mt-2 text-2xl font-semibold tabular-nums text-foreground">
                  {value}
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="h-4 w-4" aria-hidden />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AdminCharts />
    </div>
  );
}
