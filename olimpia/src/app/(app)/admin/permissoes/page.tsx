"use client";

import {
  Check,
  Shield,
  UserCog,
  UsersRound,
} from "lucide-react";
import { Badge, Card } from "@/components/ui/card";

const roles = [
  {
    id: "administrador",
    title: "Administrador",
    icon: Shield,
    tone: "primary" as const,
    summary:
      "Controle total da plataforma OlímpIA na Prefeitura de Olímpia. Responsável pela governança do sistema, identidade e base institucional.",
    permissions: [
      "Gerenciar todos os usuários, gestores e funcionários",
      "Definir e revisar permissões de perfil",
      "Administrar a biblioteca documental completa",
      "Reindexar documentos e acompanhar logs do sistema",
      "Visualizar métricas, estatísticas e utilização global",
      "Bloquear contas e resetar senhas",
    ],
  },
  {
    id: "gestor",
    title: "Gestor",
    icon: UserCog,
    tone: "success" as const,
    summary:
      "Coordenação setorial: acompanha o uso na secretaria, organiza a base documental do órgão e apoia a equipe operacional.",
    permissions: [
      "Consultar e conversar com o assistente OlímpIA",
      "Enviar e organizar documentos da própria secretaria",
      "Acompanhar uso e consultas da equipe setorial",
      "Gerar ofícios, memorandos e relatórios institucionais",
      "Visualizar histórico e favoritos da secretaria",
      "Sem acesso ao painel administrativo global",
    ],
  },
  {
    id: "funcionario",
    title: "Funcionário",
    icon: UsersRound,
    tone: "neutral" as const,
    summary:
      "Uso diário do assistente para consultas à legislação, manuais e elaboração de documentos oficiais com rastreabilidade de fontes.",
    permissions: [
      "Iniciar conversas e consultas RAG com citação de fontes",
      "Acessar a biblioteca de documentos autorizados",
      "Usar o gerador de documentos (ofício, memorando, ata etc.)",
      "Salvar favoritos e consultar o próprio histórico",
      "Atualizar perfil e preferências pessoais",
      "Sem gestão de usuários, logs ou métricas administrativas",
    ],
  },
];

export default function AdminPermissoesPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Permissões</h2>
        <p className="text-sm text-muted">
          Matriz de acesso por perfil — Administrador, Gestor e Funcionário.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {roles.map(({ id, title, icon: Icon, tone, summary, permissions }) => (
          <Card key={id} className="flex flex-col !p-5">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <Badge tone={tone}>{title}</Badge>
            </div>
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{summary}</p>
            <ul className="mt-5 flex-1 space-y-2.5">
              {permissions.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-foreground/90">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <Check className="h-3 w-3" aria-hidden />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
