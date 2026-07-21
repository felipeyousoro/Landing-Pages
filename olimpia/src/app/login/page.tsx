"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OlimpiaWordmark, PrefeituraLogo } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import type { UserRole } from "@/types";

export default function LoginPage() {
  const { login, user, isLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("ana.mendes@olimpia.sp.gov.br");
  const [password, setPassword] = useState("olimpia2026");
  const [role, setRole] = useState<UserRole>("administrador");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Informe usuário e senha.");
      return;
    }
    login(email, password, role);
    router.push("/");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 10% 0%, #e8f1f8 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 90% 100%, #fff4d0 0%, transparent 50%), linear-gradient(180deg, #f7f9fc 0%, #eef3f8 100%)",
        }}
      />
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        <div className="mb-8 flex flex-col items-center text-center">
          <PrefeituraLogo size={64} className="mb-4" />
          <OlimpiaWordmark size="lg" subtitle />
        </div>
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow-md)] sm:p-8"
        >
          <h1 className="mb-1 text-xl font-semibold">Acesso institucional</h1>
          <p className="mb-6 text-sm text-muted">
            Exclusivo para servidores autenticados da Prefeitura de Olímpia.
          </p>

          <div className="mb-4">
            <Label htmlFor="email">Usuário</Label>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.nome@olimpia.sp.gov.br"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div className="mb-5">
            <Label htmlFor="role">Perfil de demonstração</Label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="administrador">Administrador</option>
              <option value="gestor">Gestor</option>
              <option value="funcionario">Funcionário</option>
            </select>
          </div>

          {error && (
            <p className="mb-3 text-sm text-danger" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" size="lg">
            Entrar
          </Button>
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-sm text-primary hover:underline"
              onClick={() =>
                alert("Protótipo: recupere a senha junto à Secretaria de Administração.")
              }
            >
              Esqueci minha senha
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-xs text-muted">
          Ambiente self-hosted · Sem integração com a internet
        </p>
      </div>
    </div>
  );
}
