import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="flex flex-col gap-4">
          <Image
            src="/brand/dazco-logo-white.png"
            alt="Dazco"
            width={140}
            height={87}
            className="h-10 w-auto"
          />
          <p className="max-w-xs text-sm text-white/70">
            Tell us about your project and our team will get back to you shortly.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-white/70">
          <span className="font-semibold text-white">Contact</span>
          <a href="mailto:contact@dazco.com" className="transition-colors hover:text-primary">
            contact@dazco.com
          </a>
          <a href="tel:+10000000000" className="transition-colors hover:text-primary">
            +1 (000) 000-0000
          </a>
        </div>

        <nav className="flex flex-col gap-2 text-sm text-white/70">
          <span className="font-semibold text-white">Navigate</span>
          <a href="#about" className="transition-colors hover:text-primary">
            About
          </a>
          <a href="#services" className="transition-colors hover:text-primary">
            Services
          </a>
          <a href="#contact" className="transition-colors hover:text-primary">
            Contact
          </a>
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
