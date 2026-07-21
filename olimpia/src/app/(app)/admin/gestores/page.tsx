"use client";

import { UsersManager } from "@/components/admin/users-manager";

export default function AdminGestoresPage() {
  return (
    <UsersManager
      title="Gestores"
      description="Usuários com perfil gestor — coordenação por secretaria e base documental setorial."
      roleFilter="gestor"
    />
  );
}
