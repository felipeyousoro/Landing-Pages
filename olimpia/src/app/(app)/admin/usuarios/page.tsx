"use client";

import { UsersManager } from "@/components/admin/users-manager";

export default function AdminUsuariosPage() {
  return (
    <UsersManager
      title="Usuários"
      description="Gerencie contas, perfis e status de acesso à plataforma OlímpIA."
    />
  );
}
