import Image from "next/image";
import { cn } from "@/lib/utils";

export function OlimpiaWordmark({
  className,
  subtitle = false,
  size = "md",
}: {
  className?: string;
  subtitle?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };
  return (
    <div className={cn("flex flex-col", className)}>
      <span
        className={cn(
          "font-semibold tracking-tight text-foreground",
          sizes[size],
        )}
      >
        Olímp
        <span className="font-display font-bold text-primary">IA</span>
      </span>
      {subtitle && (
        <span className="mt-1 text-xs leading-snug text-muted sm:text-sm">
          Inteligência Artificial Institucional da Prefeitura de Olímpia
        </span>
      )}
    </div>
  );
}

export function PrefeituraLogo({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src="/brand/prefeitura-olimpia.svg"
      alt="Prefeitura de Olímpia"
      width={size}
      height={size}
      className={cn("rounded-lg", className)}
      priority
    />
  );
}
