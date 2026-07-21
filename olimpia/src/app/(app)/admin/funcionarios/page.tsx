"use client";

import { UsersManager } from "@/components/admin/users-manager";

export default function AdminFuncionariosPage() {
  return (
    <UsersManager
      title="Funcionários"
      description="Usuários operacionais com acesso a consultas, conversas e geração de documentos."
      roleFilter="funcionario"
    />
  );
}
