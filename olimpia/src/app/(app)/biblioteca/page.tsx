"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Eye,
  FileUp,
  MoreHorizontal,
  Pencil,
  RefreshCw,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge, Card, EmptyState } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { DOCUMENTS } from "@/data/mock";
import { cn, formatDate, uid } from "@/lib/utils";
import type {
  DocumentStatus,
  DocumentType,
  LibraryDocument,
  UploadItem,
} from "@/types";

const STATUS_TONE: Record<DocumentStatus, "success" | "warning" | "danger" | "neutral"> = {
  indexado: "success",
  processando: "warning",
  erro: "danger",
  pendente: "neutral",
};

const STATUS_LABEL: Record<DocumentStatus, string> = {
  indexado: "Indexado",
  processando: "Processando",
  erro: "Erro",
  pendente: "Pendente",
};

const ACCEPT = ".pdf,.docx,.xlsx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

function detectType(name: string): DocumentType | null {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return "PDF";
  if (ext === "docx") return "DOCX";
  if (ext === "xlsx") return "XLSX";
  return null;
}

const selectClass =
  "h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export default function BibliotecaPage() {
  const [documents, setDocuments] = useState<LibraryDocument[]>(DOCUMENTS);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [query, setQuery] = useState("");
  const [tipo, setTipo] = useState<string>("");
  const [secretaria, setSecretaria] = useState("");
  const [categoria, setCategoria] = useState("");
  const [status, setStatus] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [editing, setEditing] = useState<LibraryDocument | null>(null);
  const [viewing, setViewing] = useState<LibraryDocument | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    secretaria: "",
    category: "",
    status: "indexado" as DocumentStatus,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const intervalsRef = useRef<Map<string, ReturnType<typeof setInterval>>>(new Map());

  const secretarias = useMemo(
    () => [...new Set(documents.map((d) => d.secretaria))].sort(),
    [documents],
  );
  const categorias = useMemo(
    () => [...new Set(documents.map((d) => d.category))].sort(),
    [documents],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return documents.filter((d) => {
      if (q && !d.name.toLowerCase().includes(q) && !d.category.toLowerCase().includes(q)) {
        return false;
      }
      if (tipo && d.type !== tipo) return false;
      if (secretaria && d.secretaria !== secretaria) return false;
      if (categoria && d.category !== categoria) return false;
      if (status && d.status !== status) return false;
      return true;
    });
  }, [documents, query, tipo, secretaria, categoria, status]);

  const clearUploadInterval = useCallback((id: string) => {
    const handle = intervalsRef.current.get(id);
    if (handle) {
      clearInterval(handle);
      intervalsRef.current.delete(id);
    }
  }, []);

  useEffect(() => {
    return () => {
      intervalsRef.current.forEach((handle) => clearInterval(handle));
      intervalsRef.current.clear();
    };
  }, []);

  const startUploadSimulation = useCallback(
    (item: UploadItem) => {
      const handle = setInterval(() => {
        setUploads((prev) => {
          const current = prev.find((u) => u.id === item.id);
          if (!current || current.status !== "uploading") {
            clearUploadInterval(item.id);
            return prev;
          }

          const next = Math.min(100, current.progress + 8 + Math.floor(Math.random() * 12));
          if (next >= 100) {
            clearUploadInterval(item.id);
            const fail = Math.random() < 0.12;
            if (fail) {
              return prev.map((u) =>
                u.id === item.id
                  ? {
                      ...u,
                      progress: 100,
                      status: "erro" as const,
                      error: "Falha na indexação. Verifique o formato do arquivo.",
                    }
                  : u,
              );
            }

            const pages = 2 + Math.floor(Math.random() * 40);
            queueMicrotask(() => {
              setDocuments((docs) => [
                {
                  id: uid("doc"),
                  name: current.name.replace(/\.[^.]+$/, ""),
                  type: current.type,
                  secretaria: "Secretaria de Administração",
                  category: "Upload",
                  date: new Date().toISOString().slice(0, 10),
                  status: "indexado",
                  pages,
                },
                ...docs,
              ]);
            });

            return prev.map((u) =>
              u.id === item.id
                ? { ...u, progress: 100, pages, status: "concluido" as const }
                : u,
            );
          }

          return prev.map((u) => (u.id === item.id ? { ...u, progress: next } : u));
        });
      }, 280);

      intervalsRef.current.set(item.id, handle);
    },
    [clearUploadInterval],
  );

  function enqueueFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList);
    const nextItems: UploadItem[] = [];

    for (const file of files) {
      const type = detectType(file.name);
      if (!type) {
        alert(`Formato não suportado: ${file.name}. Aceitos: PDF, DOCX, XLSX.`);
        continue;
      }
      nextItems.push({
        id: uid("up"),
        name: file.name,
        type,
        progress: 0,
        date: new Date().toISOString(),
        status: "uploading",
      });
    }

    if (nextItems.length === 0) return;
    setUploads((prev) => [...nextItems, ...prev]);
    nextItems.forEach(startUploadSimulation);
  }

  function openEdit(doc: LibraryDocument) {
    setMenuOpenId(null);
    setEditing(doc);
    setEditForm({
      name: doc.name,
      secretaria: doc.secretaria,
      category: doc.category,
      status: doc.status,
    });
  }

  function saveEdit() {
    if (!editing) return;
    const name = editForm.name.trim();
    if (!name) return;
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === editing.id
          ? {
              ...d,
              name,
              secretaria: editForm.secretaria.trim() || d.secretaria,
              category: editForm.category.trim() || d.category,
              status: editForm.status,
            }
          : d,
      ),
    );
    setEditing(null);
  }

  function deleteDoc(id: string) {
    setMenuOpenId(null);
    if (!confirm("Excluir este documento da biblioteca?")) return;
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }

  function reindex(doc: LibraryDocument) {
    setMenuOpenId(null);
    setDocuments((prev) =>
      prev.map((d) => (d.id === doc.id ? { ...d, status: "processando" } : d)),
    );
    alert(`Reindexação iniciada para “${doc.name}”.`);
    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((d) => (d.id === doc.id ? { ...d, status: "indexado" } : d)),
      );
    }, 1800);
  }

  const hasFilters = Boolean(query || tipo || secretaria || categoria || status);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Biblioteca de documentos
          </h1>
          <p className="mt-1 text-sm text-muted">
            Gerencie a base documental institucional indexada pelo OlímpIA.
          </p>
        </div>
        <Badge tone="primary">{documents.length} documentos</Badge>
      </div>

      {/* Upload */}
      <Card className="mb-6 p-0 hover:shadow-[var(--shadow-sm)]">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold text-foreground">Envio de documentos</h2>
          <p className="mt-0.5 text-xs text-muted">PDF, DOCX ou XLSX · indexação simulada</p>
        </div>
        <div className="p-5">
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT}
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) enqueueFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragOver(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              if (e.dataTransfer.files?.length) enqueueFiles(e.dataTransfer.files);
            }}
            className={cn(
              "flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors",
              dragOver
                ? "border-primary bg-primary-soft/80"
                : "border-border bg-surface-muted/40 hover:border-primary/40 hover:bg-primary-soft/40",
            )}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Arraste arquivos ou clique para selecionar
              </p>
              <p className="mt-1 text-xs text-muted">Formatos aceitos: PDF, DOCX, XLSX</p>
            </div>
          </button>

          {uploads.length > 0 && (
            <div className="mt-5 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Fila de upload
              </p>
              {uploads.map((u) => (
                <div
                  key={u.id}
                  className="rounded-xl border border-border bg-surface px-4 py-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <FileUp className="h-4 w-4 shrink-0 text-primary" />
                        <p className="truncate text-sm font-medium">{u.name}</p>
                        <Badge tone="neutral">{u.type}</Badge>
                        <Badge
                          tone={
                            u.status === "concluido"
                              ? "success"
                              : u.status === "erro"
                                ? "danger"
                                : "warning"
                          }
                        >
                          {u.status === "uploading"
                            ? "Enviando"
                            : u.status === "concluido"
                              ? "Concluído"
                              : "Erro"}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted">
                        {formatDate(u.date)}
                        {u.pages != null && <> · {u.pages} páginas</>}
                        {u.error && <> · {u.error}</>}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-muted">{u.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-muted">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-300",
                        u.status === "erro"
                          ? "bg-danger"
                          : u.status === "concluido"
                            ? "bg-success"
                            : "bg-primary",
                      )}
                      style={{ width: `${u.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Filters */}
      <Card className="mb-5 p-4 hover:shadow-[var(--shadow-sm)]">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Label htmlFor="lib-search">Buscar</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <Input
                id="lib-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nome ou categoria..."
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="lib-tipo">Tipo</Label>
            <select
              id="lib-tipo"
              className={selectClass}
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="PDF">PDF</option>
              <option value="DOCX">DOCX</option>
              <option value="XLSX">XLSX</option>
            </select>
          </div>
          <div>
            <Label htmlFor="lib-secretaria">Secretaria</Label>
            <select
              id="lib-secretaria"
              className={selectClass}
              value={secretaria}
              onChange={(e) => setSecretaria(e.target.value)}
            >
              <option value="">Todas</option>
              {secretarias.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="lib-categoria">Categoria</Label>
            <select
              id="lib-categoria"
              className={selectClass}
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Todas</option>
              {categorias.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="lib-status">Status</Label>
            <select
              id="lib-status"
              className={selectClass}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="indexado">Indexado</option>
              <option value="processando">Processando</option>
              <option value="erro">Erro</option>
              <option value="pendente">Pendente</option>
            </select>
          </div>
        </div>
        {hasFilters && (
          <div className="mt-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setQuery("");
                setTipo("");
                setSecretaria("");
                setCategoria("");
                setStatus("");
              }}
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </Card>

      {/* Table */}
      <Card className="overflow-hidden p-0 hover:shadow-[var(--shadow-sm)]">
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Search className="h-6 w-6" />}
            title={hasFilters ? "Nenhum resultado" : "Biblioteca vazia"}
            description={
              hasFilters
                ? "Ajuste os filtros ou limpe a busca para ver mais documentos."
                : "Envie documentos para popular a base institucional."
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-muted/60 text-xs uppercase tracking-wide text-muted">
                  <th className="px-4 py-3 font-semibold">Nome</th>
                  <th className="px-4 py-3 font-semibold">Tipo</th>
                  <th className="px-4 py-3 font-semibold">Secretaria</th>
                  <th className="px-4 py-3 font-semibold">Categoria</th>
                  <th className="px-4 py-3 font-semibold">Data</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b border-border last:border-0 hover:bg-primary-soft/30"
                  >
                    <td className="max-w-[220px] truncate px-4 py-3 font-medium">{doc.name}</td>
                    <td className="px-4 py-3">
                      <Badge tone="neutral">{doc.type}</Badge>
                    </td>
                    <td className="max-w-[160px] truncate px-4 py-3 text-muted">
                      {doc.secretaria}
                    </td>
                    <td className="px-4 py-3 text-muted">{doc.category}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted">
                      {formatDate(doc.date)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={STATUS_TONE[doc.status]}>
                        {STATUS_LABEL[doc.status]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="relative inline-flex">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          aria-label={`Ações de ${doc.name}`}
                          aria-expanded={menuOpenId === doc.id}
                          onClick={() =>
                            setMenuOpenId((curr) => (curr === doc.id ? null : doc.id))
                          }
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        {menuOpenId === doc.id && (
                          <>
                            <button
                              type="button"
                              className="fixed inset-0 z-10 cursor-default"
                              aria-label="Fechar menu"
                              onClick={() => setMenuOpenId(null)}
                            />
                            <div className="absolute right-0 z-20 mt-1 w-48 overflow-hidden rounded-xl border border-border bg-surface py-1 text-left shadow-[var(--shadow-md)]">
                              <MenuItem
                                icon={<Eye className="h-3.5 w-3.5" />}
                                label="Visualizar"
                                onClick={() => {
                                  setMenuOpenId(null);
                                  setViewing(doc);
                                }}
                              />
                              <MenuItem
                                icon={<Pencil className="h-3.5 w-3.5" />}
                                label="Editar metadados"
                                onClick={() => openEdit(doc)}
                              />
                              <MenuItem
                                icon={<RefreshCw className="h-3.5 w-3.5" />}
                                label="Reindexar"
                                onClick={() => reindex(doc)}
                              />
                              <MenuItem
                                icon={<Trash2 className="h-3.5 w-3.5" />}
                                label="Excluir"
                                danger
                                onClick={() => deleteDoc(doc.id)}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* View modal */}
      <Modal
        open={Boolean(viewing)}
        onClose={() => setViewing(null)}
        title="Visualizar documento"
      >
        {viewing && (
          <div className="space-y-3">
            <p className="text-base font-semibold">{viewing.name}</p>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-muted">Tipo</dt>
                <dd className="font-medium">{viewing.type}</dd>
              </div>
              <div>
                <dt className="text-muted">Páginas</dt>
                <dd className="font-medium">{viewing.pages}</dd>
              </div>
              <div>
                <dt className="text-muted">Secretaria</dt>
                <dd className="font-medium">{viewing.secretaria}</dd>
              </div>
              <div>
                <dt className="text-muted">Categoria</dt>
                <dd className="font-medium">{viewing.category}</dd>
              </div>
              <div>
                <dt className="text-muted">Data</dt>
                <dd className="font-medium">{formatDate(viewing.date)}</dd>
              </div>
              <div>
                <dt className="text-muted">Status</dt>
                <dd>
                  <Badge tone={STATUS_TONE[viewing.status]}>
                    {STATUS_LABEL[viewing.status]}
                  </Badge>
                </dd>
              </div>
            </dl>
            <p className="rounded-xl bg-surface-muted px-3 py-2 text-xs text-muted">
              Pré-visualização simulada — nesta versão o conteúdo do arquivo não é
              renderizado.
            </p>
            <div className="flex justify-end pt-2">
              <Button type="button" variant="outline" onClick={() => setViewing(null)}>
                Fechar
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit metadata modal */}
      <Modal
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title="Editar metadados"
      >
        {editing && (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              saveEdit();
            }}
          >
            <div>
              <Label htmlFor="edit-name">Nome</Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-secretaria">Secretaria</Label>
              <Input
                id="edit-secretaria"
                value={editForm.secretaria}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, secretaria: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-categoria">Categoria</Label>
              <Input
                id="edit-categoria"
                value={editForm.category}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, category: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <select
                id="edit-status"
                className={selectClass}
                value={editForm.status}
                onChange={(e) =>
                  setEditForm((f) => ({
                    ...f,
                    status: e.target.value as DocumentStatus,
                  }))
                }
              >
                <option value="indexado">Indexado</option>
                <option value="processando">Processando</option>
                <option value="erro">Erro</option>
                <option value="pendente">Pendente</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        )}
      </Modal>
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
