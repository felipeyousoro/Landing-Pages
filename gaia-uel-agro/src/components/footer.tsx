import Image from "next/image";

type FooterProps = {
  mailEnabled: boolean;
};

export function Footer({ mailEnabled }: FooterProps) {
  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/uel-logo-white.png"
              alt="Universidade Estadual de Londrina (UEL)"
              width={40}
              height={40}
              className="h-9 w-9"
            />
            <span className="text-lg font-extrabold tracking-tight text-white">
              GAIA
            </span>
          </div>
          <p className="max-w-xs text-sm text-white/70">
            Agricultura de precisão com Inteligência Artificial e drones,
            ligado à Universidade Estadual de Londrina (UEL).
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-white/70">
          <span className="font-semibold text-white">Contato</span>
          {mailEnabled && (
            <a href="mailto:contato@gaia-uel.com.br" className="transition-colors hover:text-accent">
              contato@gaia-uel.com.br
            </a>
          )}
          <span>Campus Universitário, Londrina - PR</span>
        </div>

        <nav className="flex flex-col gap-2 text-sm text-white/70">
          <span className="font-semibold text-white">Navegação</span>
          <a href="#sobre" className="transition-colors hover:text-accent">
            Sobre
          </a>
          <a href="#deteccao-de-doencas" className="transition-colors hover:text-accent">
            Detecção de Doenças
          </a>
          <a href="#drones" className="transition-colors hover:text-accent">
            Drones
          </a>
          {mailEnabled && (
            <a href="#contato" className="transition-colors hover:text-accent">
              Contato
            </a>
          )}
        </nav>
      </div>
    </footer>
  );
}
