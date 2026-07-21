"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Copy,
  History,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Search,
  Share2,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, Card, EmptyState } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useChat } from "@/context/chat-context";
import { cn, formatDateTime } from "@/lib/utils";
import type { Conversation } from "@/types";

export default function HistoricoPage() {
  const router = useRouter();
  const {
    conversations,
    setActiveId,
    toggleFavorite,
    renameConversation,
    deleteConversation,
    duplicateConversation,
  } = useChat();
  const [query, setQuery] = useState("");
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = [...conversations].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
    if (!q) return list;
    return list.filter((c) => c.title.toLowerCase().includes(q));
  }, [conversations, query]);

  function openConversation(id: string) {
    setActiveId(id);
    router.push("/");
  }

  function startRename(c: Conversation) {
    setRenamingId(c.id);
    setRenameValue(c.title);
    setMenuOpenId(null);
  }

  function commitRename(id: string) {
    const title = renameValue.trim();
    if (title) renameConversation(id, title);
    setRenamingId(null);
    setRenameValue("");
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 md:px-8 md:py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Histórico</h1>
          <p className="mt-1 text-sm text-muted">
            Consulte e gerencie conversas anteriores com o OlímpIA.
          </p>
        </div>
        <Badge tone="primary">{conversations.length} conversas</Badge>
      </div>

      <div className="relative mb-5">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar conversas..."
          className="pl-10"
          aria-label="Buscar conversas"
        />
      </div>

      {filtered.length === 0 ? (
        <Card className="hover:shadow-[var(--shadow-sm)]">
          <EmptyState
            icon={<History className="h-6 w-6" />}
            title={query ? "Nenhuma conversa encontrada" : "Histórico vazio"}
            description={
              query
                ? "Tente outro termo de busca."
                : "Inicie uma nova conversa para começar a consultar a base institucional."
            }
          />
        </Card>
      ) : (
        <ul className="space-y-3">
          {filtered.map((c) => (
            <li key={c.id}>
              <Card className="group relative p-0 hover:border-primary/25">
                <div className="flex items-stretch gap-2 p-4">
                  <button
                    type="button"
                    onClick={() => openConversation(c.id)}
                    className="flex min-w-0 flex-1 items-start gap-3 text-left"
                  >
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      {renamingId === c.id ? (
                        <form
                          onClick={(e) => e.stopPropagation()}
                          onSubmit={(e) => {
                            e.preventDefault();
                            commitRename(c.id);
                          }}
                          className="flex flex-wrap items-center gap-2"
                        >
                          <Input
                            autoFocus
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Escape") {
                                setRenamingId(null);
                              }
                            }}
                            className="h-9 max-w-md"
                            aria-label="Novo título"
                          />
                          <Button type="submit" size="sm">
                            Salvar
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => setRenamingId(null)}
                          >
                            Cancelar
                          </Button>
                        </form>
                      ) : (
                        <p className="truncate text-sm font-semibold text-foreground group-hover:text-primary">
                          {c.title}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-muted">
                        Atualizada em {formatDateTime(c.updatedAt)}
                        {c.messages.length > 0 && (
                          <> · {c.messages.length} mensagens</>
                        )}
                      </p>
                    </div>
                  </button>

                  <div className="flex shrink-0 items-start gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={c.favorite ? "Remover dos favoritos" : "Favoritar"}
                      onClick={() => toggleFavorite(c.id)}
                      className={cn(c.favorite && "text-warning")}
                    >
                      <Star className={cn("h-4 w-4", c.favorite && "fill-current")} />
                    </Button>

                    <div className="relative">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Mais ações"
                        aria-expanded={menuOpenId === c.id}
                        onClick={() =>
                          setMenuOpenId((curr) => (curr === c.id ? null : c.id))
                        }
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>

                      {menuOpenId === c.id && (
                        <>
                          <button
                            type="button"
                            className="fixed inset-0 z-10 cursor-default"
                            aria-label="Fechar menu"
                            onClick={() => setMenuOpenId(null)}
                          />
                          <div className="absolute right-0 z-20 mt-1 w-48 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-[var(--shadow-md)]">
                            <MenuItem
                              icon={<Pencil className="h-3.5 w-3.5" />}
                              label="Renomear"
                              onClick={() => startRename(c)}
                            />
                            <MenuItem
                              icon={<Share2 className="h-3.5 w-3.5" />}
                              label="Compartilhar"
                              onClick={() => {
                                setMenuOpenId(null);
                                alert(
                                  "Compartilhamento simulado: um link institucional seria gerado nesta versão.",
                                );
                              }}
                            />
                            <MenuItem
                              icon={<Copy className="h-3.5 w-3.5" />}
                              label="Duplicar"
                              onClick={() => {
                                duplicateConversation(c.id);
                                setMenuOpenId(null);
                              }}
                            />
                            <MenuItem
                              icon={<Trash2 className="h-3.5 w-3.5" />}
                              label="Excluir"
                              danger
                              onClick={() => {
                                setMenuOpenId(null);
                                if (confirm("Excluir esta conversa?")) {
                                  deleteConversation(c.id);
                                }
                              }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
  danger,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors hover:bg-surface-muted",
        danger ? "text-danger" : "text-foreground",
      )}
    >
      {icon}
      {label}
    </button>
  );
}
