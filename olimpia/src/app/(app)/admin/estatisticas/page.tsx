"use client";

import {
  Activity,
  Database,
  Gauge,
  TrendingUp,
} from "lucide-react";
import { AdminCharts } from "@/components/admin/admin-charts";
import { Card } from "@/components/ui/card";
import {
  ADMIN_METRICS,
  CHART_DAILY_USAGE,
  CHART_USAGE_BY_SECRETARIA,
  SYSTEM_INFO,
} from "@/data/mock";
import { formatDateTime } from "@/lib/utils";

const peakDay = [...CHART_DAILY_USAGE].sort((a, b) => b.usos - a.usos)[0];
const topSecretaria = [...CHART_USAGE_BY_SECRETARIA].sort((a, b) => b.value - a.value)[0];
const weeklyTotal = CHART_DAILY_USAGE.reduce((sum, d) => sum + d.usos, 0);

const extras = [
  {
    label: "Pico semanal",
    value: `${peakDay.day} · ${peakDay.usos}`,
    hint: "Dia com maior utilização",
    icon: Activity,
  },
  {
    label: "Secretaria líder",
    value: topSecretaria.name,
    hint: `${topSecretaria.value.toLocaleString("pt-BR")} consultas`,
    icon: TrendingUp,
  },
  {
    label: "Usos na semana",
    value: weeklyTotal.toLocaleString("pt-BR"),
    hint: "Soma das interações diárias",
    icon: Gauge,
  },
  {
    label: "Base documental",
    value: ADMIN_METRICS.indexedDocuments.toLocaleString("pt-BR"),
    hint: `Atualizada em ${formatDateTime(SYSTEM_INFO.lastBaseUpdate)}`,
    icon: Database,
  },
];

export default function AdminEstatisticasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Estatísticas</h2>
        <p className="text-sm text-muted">
          Indicadores detalhados de adoção, crescimento da base e desempenho operacional.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {extras.map(({ label, value, hint, icon: Icon }) => (
          <Card key={label} className="!p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  {label}
                </p>
                <p className="mt-2 text-xl font-semibold text-foreground">{value}</p>
                <p className="mt-1 text-xs text-muted">{hint}</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Icon className="h-4 w-4" aria-hidden />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="!p-4 md:!p-5">
        <h3 className="text-sm font-semibold text-foreground">Ambiente</h3>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-xs text-muted">Modelo</dt>
            <dd className="mt-0.5 text-sm font-medium">{SYSTEM_INFO.model}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Versão</dt>
            <dd className="mt-0.5 text-sm font-medium">{SYSTEM_INFO.version}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Tempo médio de resposta</dt>
            <dd className="mt-0.5 text-sm font-medium">{ADMIN_METRICS.avgResponseTime}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">Instituição</dt>
            <dd className="mt-0.5 text-sm font-medium">{SYSTEM_INFO.institution}</dd>
          </div>
        </dl>
      </Card>

      <AdminCharts />
    </div>
  );
}
