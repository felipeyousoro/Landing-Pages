"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ErroPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8 text-center hover:shadow-[var(--shadow-md)]">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-danger-soft text-danger">
          <AlertTriangle className="h-7 w-7" aria-hidden />
        </div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
          Erro interno · 500
        </p>
        <h1 className="mb-2 text-xl font-semibold text-foreground">
          Algo deu errado
        </h1>
        <p className="mb-6 text-sm text-muted">
          Ocorreu um erro interno simulado no OlímpIA. Você pode tentar novamente
          ou voltar à conversa principal.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button type="button" onClick={() => router.push("/")}>
            <RefreshCw className="h-4 w-4" />
            Tentar novamente
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/")}>
            Ir para o início
          </Button>
        </div>
      </Card>
    </div>
  );
}
