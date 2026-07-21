"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  FileText,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquarePlus,
  Settings,
  Star,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { OlimpiaWordmark, PrefeituraLogo } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useChat } from "@/context/chat-context";
import { cn, initials } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Nova conversa", icon: MessageSquarePlus, action: "new" as const },
  { href: "/historico", label: "Histórico", icon: History },
  { href: "/favoritos", label: "Favoritos", icon: Star },
  { href: "/biblioteca", label: "Biblioteca de documentos", icon: BookOpen },
  { href: "/gerador", label: "Gerador de documentos", icon: FileText },
  { href: "/admin", label: "Painel Administrativo", icon: LayoutDashboard, adminOnly: true },
  { href: "/configuracoes", label: "Configurações", icon: Settings },
  { href: "/perfil", label: "Perfil", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { createConversation, setActiveId } = useChat();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const items = navItems.filter((i) => !i.adminOnly || user.role === "administrador");

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-border px-4 py-4">
        <PrefeituraLogo size={36} />
        <OlimpiaWordmark size="sm" />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Principal">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => {
                if (item.action === "new") {
                  e.preventDefault();
                  createConversation();
                  setActiveId(null);
                  router.push("/");
                }
                setOpen(false);
              }}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground/80 hover:bg-surface-muted",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-surface-muted/70 px-3 py-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
            aria-hidden
          >
            {initials(user.name)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-muted">{user.cargo}</p>
            <p className="truncate text-xs text-muted">{user.secretaria}</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed left-3 top-3 z-40 lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
      >
        <Menu className="h-4 w-4" />
      </Button>

      <aside className="hidden h-screen w-72 shrink-0 border-r border-border bg-surface lg:block">
        {content}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[#122033]/40"
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
          />
          <aside className="relative h-full w-[min(20rem,88vw)] bg-surface shadow-[var(--shadow-md)] animate-fade-in-up">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => setOpen(false)}
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </Button>
            {content}
          </aside>
        </div>
      )}
    </>
  );
}

export function AppHeader({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-surface/90 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-3 pl-10 lg:pl-0">
        <p className="text-sm font-medium text-muted">
          {title ?? "Hub oficial de inteligência artificial institucional"}
        </p>
      </div>
      <div className="hidden items-center gap-2 sm:flex">
        <span className="h-2 w-2 rounded-full bg-success" aria-hidden />
        <span className="text-xs text-muted">Base RAG local · Sem internet</span>
      </div>
    </header>
  );
}
