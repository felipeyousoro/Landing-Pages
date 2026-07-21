"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CURRENT_USER, USERS } from "@/data/mock";
import type { User, UserRole } from "@/types";

const AUTH_KEY = "olimpia_auth_user";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role?: UserRole) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (raw) {
        setUser(JSON.parse(raw) as User);
      }
    } catch {
      localStorage.removeItem(AUTH_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback((email: string, _password: string, role?: UserRole) => {
    const found =
      USERS.find((u) => u.email.toLowerCase() === email.toLowerCase()) ??
      ({
        ...CURRENT_USER,
        email: email || CURRENT_USER.email,
        role: role ?? "administrador",
      } satisfies User);

    const next = role ? { ...found, role } : found;
    setUser(next);
    localStorage.setItem(AUTH_KEY, JSON.stringify(next));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, role };
      localStorage.setItem(AUTH_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, login, logout, switchRole }),
    [user, isLoading, login, logout, switchRole],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
