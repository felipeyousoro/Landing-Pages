import Link from "next/link";
import { OlimpiaWordmark } from "@/components/brand/wordmark";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
      <OlimpiaWordmark size="md" />
      <h1 className="text-2xl font-semibold">Documento ou página não encontrada</h1>
      <p className="max-w-md text-sm text-muted">
        O recurso solicitado não existe na base institucional ou o endereço está incorreto.
      </p>
      <Link
        href="/"
        className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary-hover"
      >
        Voltar ao chat
      </Link>
    </div>
  );
}
