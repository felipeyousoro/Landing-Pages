"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CONVERSATIONS } from "@/data/mock";
import { buildAssistantReply } from "@/lib/rag-response";
import { uid } from "@/lib/utils";
import type { ChatMessage, Conversation } from "@/types";

interface ChatContextValue {
  conversations: Conversation[];
  activeId: string | null;
  activeConversation: Conversation | null;
  isStreaming: boolean;
  createConversation: (title?: string) => string;
  setActiveId: (id: string | null) => void;
  sendMessage: (content: string) => Promise<void>;
  toggleFavorite: (id: string) => void;
  renameConversation: (id: string, title: string) => void;
  deleteConversation: (id: string) => void;
  duplicateConversation: (id: string) => void;
  setMessageLiked: (messageId: string, liked: boolean | null) => void;
  regenerateLast: () => Promise<void>;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeId) ?? null,
    [conversations, activeId],
  );

  const createConversation = useCallback((title = "Nova conversa") => {
    const id = uid("conv");
    const now = new Date().toISOString();
    const conv: Conversation = {
      id,
      title,
      favorite: false,
      createdAt: now,
      updatedAt: now,
      messages: [],
    };
    setConversations((prev) => [conv, ...prev]);
    setActiveId(id);
    return id;
  }, []);

  const updateConversation = useCallback((id: string, updater: (c: Conversation) => Conversation) => {
    setConversations((prev) => prev.map((c) => (c.id === id ? updater(c) : c)));
  }, []);

  const streamAssistant = useCallback(
    async (conversationId: string, userContent: string, replaceLastAssistant = false) => {
      setIsStreaming(true);
      const reply = buildAssistantReply(userContent);
      const assistantId = uid("msg");
      const base: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
      };

      updateConversation(conversationId, (c) => {
        let msgs = c.messages;
        if (replaceLastAssistant) {
          const lastIdx = [...msgs].reverse().findIndex((m) => m.role === "assistant");
          if (lastIdx >= 0) {
            const realIdx = msgs.length - 1 - lastIdx;
            msgs = msgs.filter((_, i) => i !== realIdx);
          }
        }
        return {
          ...c,
          title: c.messages.length === 0 ? userContent.slice(0, 60) : c.title,
          updatedAt: new Date().toISOString(),
          messages: [...msgs, base],
        };
      });

      const chunks = reply.content.split(/(\s+)/);
      let acc = "";
      for (const chunk of chunks) {
        acc += chunk;
        const snapshot = acc;
        await new Promise((r) => setTimeout(r, 12 + Math.random() * 18));
        updateConversation(conversationId, (c) => ({
          ...c,
          messages: c.messages.map((m) =>
            m.id === assistantId ? { ...m, content: snapshot } : m,
          ),
        }));
      }

      updateConversation(conversationId, (c) => ({
        ...c,
        messages: c.messages.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content: reply.content,
                sources: reply.sources,
                confidence: reply.confidence,
                documentsConsulted: reply.documentsConsulted,
                processingTimeMs: reply.processingTimeMs,
              }
            : m,
        ),
      }));
      setIsStreaming(false);
    },
    [updateConversation],
  );

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isStreaming) return;

      let convId = activeId;
      if (!convId) {
        convId = createConversation(trimmed.slice(0, 60));
      }

      const userMsg: ChatMessage = {
        id: uid("msg"),
        role: "user",
        content: trimmed,
        createdAt: new Date().toISOString(),
      };

      updateConversation(convId, (c) => ({
        ...c,
        title: c.messages.length === 0 ? trimmed.slice(0, 60) : c.title,
        updatedAt: new Date().toISOString(),
        messages: [...c.messages, userMsg],
      }));

      await streamAssistant(convId, trimmed);
    },
    [activeId, createConversation, isStreaming, streamAssistant, updateConversation],
  );

  const regenerateLast = useCallback(async () => {
    if (!activeId || isStreaming) return;
    const conv = conversations.find((c) => c.id === activeId);
    if (!conv) return;
    const lastUser = [...conv.messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    await streamAssistant(activeId, lastUser.content, true);
  }, [activeId, conversations, isStreaming, streamAssistant]);

  const toggleFavorite = useCallback((id: string) => {
    updateConversation(id, (c) => ({ ...c, favorite: !c.favorite }));
  }, [updateConversation]);

  const renameConversation = useCallback(
    (id: string, title: string) => {
      updateConversation(id, (c) => ({ ...c, title }));
    },
    [updateConversation],
  );

  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setActiveId((curr) => (curr === id ? null : curr));
  }, []);

  const duplicateConversation = useCallback((id: string) => {
    setConversations((prev) => {
      const source = prev.find((c) => c.id === id);
      if (!source) return prev;
      const copy: Conversation = {
        ...structuredClone(source),
        id: uid("conv"),
        title: `${source.title} (cópia)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        favorite: false,
      };
      return [copy, ...prev];
    });
  }, []);

  const setMessageLiked = useCallback(
    (messageId: string, liked: boolean | null) => {
      if (!activeId) return;
      updateConversation(activeId, (c) => ({
        ...c,
        messages: c.messages.map((m) => (m.id === messageId ? { ...m, liked } : m)),
      }));
    },
    [activeId, updateConversation],
  );

  const value = useMemo(
    () => ({
      conversations,
      activeId,
      activeConversation,
      isStreaming,
      createConversation,
      setActiveId,
      sendMessage,
      toggleFavorite,
      renameConversation,
      deleteConversation,
      duplicateConversation,
      setMessageLiked,
      regenerateLast,
    }),
    [
      conversations,
      activeId,
      activeConversation,
      isStreaming,
      createConversation,
      sendMessage,
      toggleFavorite,
      renameConversation,
      deleteConversation,
      duplicateConversation,
      setMessageLiked,
      regenerateLast,
    ],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
