"use client";

import { useState } from "react";
import {
  Ban,
  KeyRound,
  Pencil,
  Plus,
  Trash2,
  Unlock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, Card, EmptyState } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { USERS } from "@/data/mock";
import { uid } from "@/lib/utils";
import type { User, UserRole } from "@/types";

const ROLE_LABEL: Record<UserRole, string> = {
  administrador: "Administrador",
  gestor: "Gestor",
  funcionario: "Funcionário",
};

type FormState = {
  name: string;
  email: string;
  cargo: string;
  secretaria: string;
  role: UserRole;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  cargo: "",
  secretaria: "",
  role: "funcionario",
};

export function UsersManager({
  title,
  description,
  roleFilter,
}: {
  title: string;
  description: string;
  roleFilter?: UserRole;
}) {
  const [users, setUsers] = useState<User[]>(() =>
    roleFilter ? USERS.filter((u) => u.role === roleFilter) : [...USERS],
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2200);
  };

  const openCreate = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      role: roleFilter ?? "funcionario",
    });
    setModalOpen(true);
  };

  const openEdit = (user: User) => {
    setEditingId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      cargo: user.cargo,
      secretaria: user.secretaria,
      role: user.role,
    });
    setModalOpen(true);
  };

  const saveUser = () => {
    if (!form.name.trim() || !form.email.trim()) return;

    if (editingId) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingId
            ? {
                ...u,
                name: form.name.trim(),
                email: form.email.trim(),
                cargo: form.cargo.trim(),
                secretaria: form.secretaria.trim(),
                role: roleFilter ?? form.role,
              }
            : u,
        ),
      );
      showToast("Usuário atualizado");
    } else {
      const next: User = {
        id: uid("u"),
        name: form.name.trim(),
        email: form.email.trim(),
        cargo: form.cargo.trim() || "—",
        secretaria: form.secretaria.trim() || "—",
        role: roleFilter ?? form.role,
        status: "ativo",
        lastAccess: new Date().toISOString(),
      };
      setUsers((prev) => [next, ...prev]);
      showToast("Usuário criado");
    }
    setModalOpen(false);
  };

  const removeUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showToast("Usuário excluído");
  };

  const toggleBlock = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "ativo" ? "bloqueado" : "ativo" }
          : u,
      ),
    );
    showToast("Status atualizado");
  };

  const resetPassword = (name: string) => {
    showToast(`Senha resetada para ${name} (simulação)`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted">{description}</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Criar usuário
        </Button>
      </div>

      {toast && (
        <div
          className="rounded-xl border border-primary/20 bg-primary-soft px-4 py-2.5 text-sm text-primary"
          role="status"
        >
          {toast}
        </div>
      )}

      <Card className="!p-0 overflow-hidden">
        {users.length === 0 ? (
          <EmptyState
            title="Nenhum usuário encontrado"
            description="Crie um novo usuário para começar a gerenciar este perfil."
            action={
              <Button onClick={openCreate}>
                <Plus className="h-4 w-4" />
                Criar usuário
              </Button>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-muted/60 text-xs uppercase tracking-wide text-muted">
                  <th className="px-4 py-3 font-semibold">Nome</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Cargo</th>
                  <th className="px-4 py-3 font-semibold">Secretaria</th>
                  <th className="px-4 py-3 font-semibold">Perfil</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-border last:border-0 hover:bg-surface-muted/40"
                  >
                    <td className="px-4 py-3 font-medium text-foreground">{user.name}</td>
                    <td className="px-4 py-3 text-muted">{user.email}</td>
                    <td className="px-4 py-3">{user.cargo}</td>
                    <td className="px-4 py-3">{user.secretaria}</td>
                    <td className="px-4 py-3">
                      <Badge tone="primary">{ROLE_LABEL[user.role]}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={user.status === "ativo" ? "success" : "danger"}>
                        {user.status === "ativo" ? "Ativo" : "Bloqueado"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Editar"
                          onClick={() => openEdit(user)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={user.status === "ativo" ? "Bloquear" : "Desbloquear"}
                          onClick={() => toggleBlock(user.id)}
                        >
                          {user.status === "ativo" ? (
                            <Ban className="h-4 w-4" />
                          ) : (
                            <Unlock className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Resetar senha"
                          onClick={() => resetPassword(user.name)}
                        >
                          <KeyRound className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Excluir"
                          onClick={() => removeUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4 text-danger" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Editar usuário" : "Criar usuário"}
      >
        <div className="space-y-3">
          <div>
            <Label htmlFor="user-name">Nome</Label>
            <Input
              id="user-name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Nome completo"
            />
          </div>
          <div>
            <Label htmlFor="user-email">Email</Label>
            <Input
              id="user-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="nome@olimpia.sp.gov.br"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="user-cargo">Cargo</Label>
              <Input
                id="user-cargo"
                value={form.cargo}
                onChange={(e) => setForm((f) => ({ ...f, cargo: e.target.value }))}
                placeholder="Cargo"
              />
            </div>
            <div>
              <Label htmlFor="user-secretaria">Secretaria</Label>
              <Input
                id="user-secretaria"
                value={form.secretaria}
                onChange={(e) => setForm((f) => ({ ...f, secretaria: e.target.value }))}
                placeholder="Secretaria"
              />
            </div>
          </div>
          {!roleFilter && (
            <div>
              <Label htmlFor="user-role">Perfil</Label>
              <select
                id="user-role"
                className="h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={form.role}
                onChange={(e) =>
                  setForm((f) => ({ ...f, role: e.target.value as UserRole }))
                }
              >
                <option value="administrador">Administrador</option>
                <option value="gestor">Gestor</option>
                <option value="funcionario">Funcionário</option>
              </select>
            </div>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={saveUser}>
              {editingId ? "Salvar alterações" : "Criar usuário"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
