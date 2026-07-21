"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppHeader, Sidebar } from "@/components/layout/sidebar";
import { useAuth } from "@/context/auth-context";
import { Skeleton } from "@/components/ui/card";

export function AppShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-sm space-y-3 p-6">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader title={title} />
        <main id="conteudo-principal" className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
