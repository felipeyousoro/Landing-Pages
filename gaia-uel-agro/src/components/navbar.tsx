"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "#top", label: "Início" },
  { href: "#deteccao-de-doencas", label: "Detecção de Doenças" },
  { href: "#drones", label: "Drones" },
];

type NavbarProps = {
  mailEnabled: boolean;
};

export function Navbar({ mailEnabled }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 lg:px-8">
        <Link
          href="#top"
          className="flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/brand/uel-logo-green.png"
            alt="Universidade Estadual de Londrina (UEL)"
            width={48}
            height={48}
            className="h-10 w-10"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight text-neutral">
              GAIA
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wide text-neutral-soft">
              UEL &middot; Agro
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          {mailEnabled && (
            <a
              href="#contato"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-secondary"
            >
              Fale com a gente
            </a>
          )}
        </div>

        <button
          type="button"
          aria-label="Alternar menu de navegação"
          aria-expanded={isOpen}
          className="flex h-9 w-9 items-center justify-center rounded-md text-neutral md:hidden"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">Alternar menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-6 w-6"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-black/5 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-neutral transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            {mailEnabled && (
              <a
                href="#contato"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-primary px-5 py-2 text-center text-sm font-semibold text-white"
              >
                Fale com a gente
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
