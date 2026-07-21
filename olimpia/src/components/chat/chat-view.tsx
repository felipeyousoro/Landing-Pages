"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Copy,
  FileText,
  Paperclip,
  RefreshCw,
  Send,
  ThumbsDown,
  ThumbsUp,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, Card } from "@/components/ui/card";
import { QUICK_ACTIONS } from "@/data/mock";
import { useChat } from "@/context/chat-context";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";

function SourceCards({ message }: { message: ChatMessage }) {
  if (!message.sources?.length) return null;
  return (
    <div className="mt-4 space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        Fontes utilizadas
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {message.sources.map((s) => (
          <Card key={`${message.id}-${s.id}-${s.page}`} className="p-3 hover:border-primary/30">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <FileText className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{s.name}</p>
                <p className="text-xs text-muted">
                  {s.type} · Página {s.page} · {s.secretaria}
                </p>
              </div>
              <Button variant="outline" size="sm" type="button">
                <Eye className="h-3.5 w-3.5" />
                Visualizar
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 pt-1">
        {message.confidence != null && (
          <Badge tone="success">Confiança {message.confidence}%</Badge>
        )}
        {message.documentsConsulted != null && (
          <Badge tone="primary">{message.documentsConsulted} documentos consultados</Badge>
        )}
        {message.processingTimeMs != null && (
          <Badge tone="neutral">
            {(message.processingTimeMs / 1000).toFixed(1)}s de processamento
          </Badge>
        )}
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  onCopy,
  onRegenerate,
  onLike,
}: {
  message: ChatMessage;
  onCopy: () => void;
  onRegenerate: () => void;
  onLike: (v: boolean | null) => void;
}) {
  const isUser = message.role === "user";
  return (
    <div
      className={cn(
        "animate-fade-in-up w-full max-w-3xl",
        isUser ? "ml-auto" : "mr-auto",
      )}
    >
      <div
        className={cn(
          "rounded-2xl px-4 py-3 shadow-[var(--shadow-sm)]",
          isUser
            ? "bg-primary text-primary-foreground"
            : "border border-border bg-surface",
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
        ) : (
          <div className="prose-olimpia text-sm">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
      {!isUser && message.content && (
        <>
          <SourceCards message={message} />
          <div className="mt-2 flex flex-wrap gap-1">
            <Button variant="ghost" size="sm" onClick={onCopy} type="button">
              <Copy className="h-3.5 w-3.5" />
              Copiar
            </Button>
            <Button variant="ghost" size="sm" onClick={onRegenerate} type="button">
              <RefreshCw className="h-3.5 w-3.5" />
              Regenerar
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Curtir"
              onClick={() => onLike(message.liked === true ? null : true)}
              className={cn(message.liked === true && "text-success")}
              type="button"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Não curtir"
              onClick={() => onLike(message.liked === false ? null : false)}
              className={cn(message.liked === false && "text-danger")}
              type="button"
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export function ChatView() {
  const {
    activeConversation,
    isStreaming,
    sendMessage,
    setMessageLiked,
    regenerateLast,
  } = useChat();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const messages = activeConversation?.messages ?? [];
  const empty = messages.length === 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  async function handleSend(text?: string) {
    const value = (text ?? input).trim();
    if (!value) return;
    setInput("");
    await sendMessage(value);
  }

  return (
    <div className="relative flex h-[calc(100vh-3.5rem)] flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
        {empty ? (
          <div className="mx-auto flex max-w-4xl flex-col items-center pt-8 md:pt-16">
            <h1 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
              Olímp
              <span className="font-display text-primary">IA</span>
            </h1>
            <p className="mt-3 max-w-xl text-center text-sm text-muted md:text-base">
              Consulte a base documental da Prefeitura de Olímpia com linguagem natural.
              Respostas exclusivas via RAG institucional.
            </p>
            <div className="mt-10 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => handleSend(action.prompt)}
                  className="rounded-2xl border border-border bg-surface p-4 text-left text-sm shadow-[var(--shadow-sm)] transition hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[var(--shadow-md)]"
                >
                  <span className="font-medium text-foreground">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            {messages.map((m) => (
              <MessageBubble
                key={m.id}
                message={m}
                onCopy={() => navigator.clipboard.writeText(m.content)}
                onRegenerate={() => regenerateLast()}
                onLike={(v) => setMessageLiked(m.id, v)}
              />
            ))}
            {isStreaming && (
              <div className="flex items-center gap-2 text-sm text-muted">
                <span className="h-2 w-2 animate-pulse-soft rounded-full bg-primary" />
                OlímpIA está consultando a base documental…
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="border-t border-border bg-surface/95 px-4 py-4 backdrop-blur md:px-8">
        <form
          className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-border bg-surface p-2 shadow-[var(--shadow-md)]"
          onSubmit={(e) => {
            e.preventDefault();
            void handleSend();
          }}
        >
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.docx,.xlsx"
            className="hidden"
            aria-hidden
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Anexar arquivo"
            onClick={() => fileRef.current?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void handleSend();
              }
            }}
            rows={1}
            placeholder="Pergunte sobre documentos, legislações ou peça um documento…"
            className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-muted"
            aria-label="Mensagem"
            disabled={isStreaming}
          />
          <Button type="submit" size="icon" disabled={isStreaming || !input.trim()} aria-label="Enviar">
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-muted">
          OlímpIA utiliza apenas documentos internos indexados. Sem pesquisa na internet.
        </p>
      </div>
    </div>
  );
}
