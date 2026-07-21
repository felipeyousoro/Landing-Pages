"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { formatDateTime, initials } from "@/lib/utils";

const ROLE_LABELS: Record<string, string> = {
  administrador: "Administrador",
  gestor: "Gestor",
  funcionario: "Funcionário",
};

export default function PerfilPage() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  if (!user) return null;

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Preencha todos os campos.");
      return;
    }
    if (newPassword.length < 6) {
      setError("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("A confirmação não confere com a nova senha.");
      return;
    }

    setSuccess("Senha alterada com sucesso. (simulação do protótipo)");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <div className="mx-auto max-w-3xl animate-fade-in-up px-4 py-6 md:px-8 md:py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Perfil
        </h1>
        <p className="mt-1 text-sm text-muted">
          Dados do servidor autenticado na plataforma OlímpIA.
        </p>
      </div>

      <Card className="mb-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-primary-foreground"
            aria-hidden
          >
            {initials(user.name)}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-xl font-semibold text-foreground">{user.name}</h2>
            <p className="text-sm text-muted">
              {ROLE_LABELS[user.role] ?? user.role} · {user.secretaria}
            </p>
          </div>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">Nome</dt>
            <dd className="mt-1 text-sm font-medium text-foreground">{user.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">Cargo</dt>
            <dd className="mt-1 text-sm font-medium text-foreground">{user.cargo}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">
              Secretaria
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">{user.secretaria}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">Email</dt>
            <dd className="mt-1 text-sm font-medium text-foreground">{user.email}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">
              Último acesso
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {formatDateTime(user.lastAccess)}
            </dd>
          </div>
        </dl>
      </Card>

      <Card>
        <h2 className="mb-1 text-lg font-semibold text-foreground">Alterar senha</h2>
        <p className="mb-5 text-sm text-muted">
          Atualize sua senha de acesso institucional. (fluxo simulado)
        </p>

        <form onSubmit={handlePasswordSubmit} className="max-w-md space-y-4">
          <div>
            <Label htmlFor="current-password">Senha atual</Label>
            <Input
              id="current-password"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div>
            <Label htmlFor="new-password">Nova senha</Label>
            <Input
              id="new-password"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirmar nova senha</Label>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-danger" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p className="rounded-xl bg-success-soft px-3 py-2 text-sm text-success" role="status">
              {success}
            </p>
          )}

          <Button type="submit">Salvar nova senha</Button>
        </form>
      </Card>
    </div>
  );
}
