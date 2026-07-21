"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";
import {
  CHART_DAILY_USAGE,
  CHART_DOC_GROWTH,
  CHART_TOP_DOCS,
  CHART_USAGE_BY_SECRETARIA,
} from "@/data/mock";

const PRIMARY = "#0b4f8a";
const PRIMARY_SOFT = "#5a8ab8";
const GRID = "#d8e0ea";

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #d8e0ea",
  boxShadow: "0 8px 24px rgba(15, 35, 60, 0.08)",
  fontSize: 12,
};

export function AdminCharts({ compact = false }: { compact?: boolean }) {
  const height = compact ? 220 : 260;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="!p-4 md:!p-5">
        <h3 className="mb-1 text-sm font-semibold text-foreground">Uso por secretaria</h3>
        <p className="mb-4 text-xs text-muted">Consultas no período atual</p>
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer>
            <BarChart data={CHART_USAGE_BY_SECRETARIA} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#5c6b7e" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#5c6b7e" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="value" name="Consultas" fill={PRIMARY} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="!p-4 md:!p-5">
        <h3 className="mb-1 text-sm font-semibold text-foreground">Crescimento da base</h3>
        <p className="mb-4 text-xs text-muted">Documentos indexados por mês</p>
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer>
            <LineChart data={CHART_DOC_GROWTH} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#5c6b7e" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#5c6b7e" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="docs"
                name="Documentos"
                stroke={PRIMARY}
                strokeWidth={2.5}
                dot={{ r: 3, fill: PRIMARY }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="!p-4 md:!p-5">
        <h3 className="mb-1 text-sm font-semibold text-foreground">Documentos mais consultados</h3>
        <p className="mb-4 text-xs text-muted">Ranking de fontes no RAG</p>
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer>
            <BarChart
              data={CHART_TOP_DOCS}
              layout="vertical"
              margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={GRID} horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#5c6b7e" }} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                width={96}
                tick={{ fontSize: 11, fill: "#5c6b7e" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="consultas" name="Consultas" fill={PRIMARY_SOFT} radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="!p-4 md:!p-5">
        <h3 className="mb-1 text-sm font-semibold text-foreground">Utilização diária</h3>
        <p className="mb-4 text-xs text-muted">Interações na última semana</p>
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer>
            <BarChart data={CHART_DAILY_USAGE} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#5c6b7e" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#5c6b7e" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="usos" name="Usos" fill={PRIMARY} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
