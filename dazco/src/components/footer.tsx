import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="flex flex-col gap-4">
          <Image
            src="/brand/dazco-logo-white.png"
            alt="Dazco"
            width={1225}
            height={793}
            className="h-auto w-[140px]"
          />
          <p className="max-w-xs text-sm text-white/70">
            A place of Trust. Facilities, properties, and operational services
            since 2001.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-white/70">
          <span className="font-semibold text-white">Contact</span>
          <span>AL Shimmari Building, Office no. 111</span>
          <span>Al Ain, Abu Dhabi 14488, UAE</span>
          <a
            href="https://www.dazco.ae"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            www.dazco.ae
          </a>
          <a
            href="https://www.linkedin.com/company/dazcogroup"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            LinkedIn
          </a>
        </div>

        <nav className="flex flex-col gap-2 text-sm text-white/70">
          <span className="font-semibold text-white">Navigate</span>
          <Link href="/about" className="transition-colors hover:text-primary">
            About
          </Link>
          <Link
            href="/#services"
            className="transition-colors hover:text-primary"
          >
            Services
          </Link>
          <Link href="/#faq" className="transition-colors hover:text-primary">
            FAQ
          </Link>
          <Link
            href="/#contact"
            className="transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>
      </div>

      <div className="border-t border-white/10 px-6 py-4 lg:px-8">
        <p className="text-center text-xs text-white/50">
          &copy; {year} Dazco LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
