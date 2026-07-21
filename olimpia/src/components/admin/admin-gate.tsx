"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { AdminNav } from "./admin-nav";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-8 text-sm text-muted">
        Carregando…
      </div>
    );
  }

  if (user?.role !== "administrador") {
    return (
      <div className="p-6 md:p-8">
        <EmptyState
          icon={<ShieldAlert className="h-6 w-6" />}
          title="Acesso negado"
          description="Esta área é restrita a administradores do sistema OlímpIA. Solicite acesso à Secretaria de Administração se precisar deste painel."
          action={
            <Link href="/">
              <Button variant="primary">Voltar ao início</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up p-4 md:p-6 lg:p-8">
      <header className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Painel administrativo
        </p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-foreground md:text-3xl">
          OlímpIA Admin
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Gestão de usuários, permissões, biblioteca documental e monitoramento da plataforma.
        </p>
      </header>
      <AdminNav />
      {children}
    </div>
  );
}
