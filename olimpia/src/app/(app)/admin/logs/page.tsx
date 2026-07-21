"use client";

import { Badge, Card } from "@/components/ui/card";
import { ADMIN_LOGS } from "@/data/mock";
import { formatDateTime } from "@/lib/utils";
import type { AdminLog } from "@/types";

const levelTone: Record<AdminLog["level"], "primary" | "warning" | "danger"> = {
  info: "primary",
  warning: "warning",
  error: "danger",
};

const levelLabel: Record<AdminLog["level"], string> = {
  info: "Info",
  warning: "Alerta",
  error: "Erro",
};

export default function AdminLogsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Logs do sistema</h2>
        <p className="text-sm text-muted">
          Auditoria de ações, uploads, indexação e eventos operacionais.
        </p>
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-muted/60 text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3 font-semibold">Data/Hora</th>
                <th className="px-4 py-3 font-semibold">Nível</th>
                <th className="px-4 py-3 font-semibold">Usuário</th>
                <th className="px-4 py-3 font-semibold">Ação</th>
                <th className="px-4 py-3 font-semibold">Detalhe</th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_LOGS.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-border last:border-0 hover:bg-surface-muted/40"
                >
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums text-muted">
                    {formatDateTime(log.timestamp)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={levelTone[log.level]}>{levelLabel[log.level]}</Badge>
                  </td>
                  <td className="px-4 py-3 font-medium">{log.user}</td>
                  <td className="px-4 py-3">{log.action}</td>
                  <td className="max-w-md px-4 py-3 text-muted">{log.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
