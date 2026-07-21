"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  LayoutDashboard,
  ScrollText,
  Shield,
  UserCog,
  Users,
  UsersRound,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/usuarios", label: "Usuários", icon: Users },
  { href: "/admin/gestores", label: "Gestores", icon: UserCog },
  { href: "/admin/funcionarios", label: "Funcionários", icon: UsersRound },
  { href: "/admin/permissoes", label: "Permissões", icon: Shield },
  { href: "/admin/biblioteca", label: "Biblioteca", icon: BookOpen },
  { href: "/admin/logs", label: "Logs", icon: ScrollText },
  { href: "/admin/estatisticas", label: "Estatísticas", icon: BarChart3 },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav
      className="mb-6 overflow-x-auto rounded-2xl border border-border bg-surface p-1.5 shadow-[var(--shadow-sm)]"
      aria-label="Administração"
    >
      <ul className="flex min-w-max gap-1">
        {links.map(({ href, label, icon: Icon, exact }) => {
          const active = exact
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted hover:bg-surface-muted hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
