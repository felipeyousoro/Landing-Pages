export type UserRole = "administrador" | "gestor" | "funcionario";

export type DocumentType = "PDF" | "DOCX" | "XLSX";

export type DocumentStatus = "indexado" | "processando" | "erro" | "pendente";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  cargo: string;
  secretaria: string;
  avatar?: string;
  status: "ativo" | "bloqueado";
  lastAccess: string;
}

export interface SourceDocument {
  id: string;
  name: string;
  type: DocumentType;
  page: number;
  secretaria: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  sources?: SourceDocument[];
  confidence?: number;
  documentsConsulted?: number;
  processingTimeMs?: number;
  liked?: boolean | null;
}

export interface Conversation {
  id: string;
  title: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface LibraryDocument {
  id: string;
  name: string;
  type: DocumentType;
  secretaria: string;
  category: string;
  date: string;
  status: DocumentStatus;
  pages: number;
}

export interface UploadItem {
  id: string;
  name: string;
  type: DocumentType;
  progress: number;
  pages?: number;
  date: string;
  status: "uploading" | "concluido" | "erro";
  error?: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  fields: { id: string; label: string; placeholder: string; multiline?: boolean }[];
}

export interface AdminLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  detail: string;
  level: "info" | "warning" | "error";
}
