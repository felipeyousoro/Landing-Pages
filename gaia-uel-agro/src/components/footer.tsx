import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/gaia-logo.png"
              alt="GAIA"
              width={36}
              height={43}
              className="h-10 w-auto"
            />
            <span className="text-lg font-extrabold tracking-tight text-white">
              GAIA
            </span>
          </div>
          <p className="max-w-xs text-sm text-white/70">
            Grupo de pesquisa e extensão da Universidade Estadual de Londrina.
            Tecnologia da informação e inteligência artificial aplicadas à
            agricultura de precisão.
          </p>
          <span className="text-sm text-white/70">
            Campus Universitário, Londrina — PR
          </span>
        </div>

        <nav className="flex flex-col gap-2 text-sm text-white/70">
          <span className="font-semibold text-white">Navegação</span>
          <a href="#sobre" className="transition-colors hover:text-accent">
            Sobre
          </a>
          <a href="#deteccao-de-doencas" className="transition-colors hover:text-accent">
            Detecção de Doenças
          </a>
          {/* <a href="#drones" className="transition-colors hover:text-accent">
            Drones
          </a> */}
          <a href="#outros-trabalhos" className="transition-colors hover:text-accent">
            Outros trabalhos
          </a>
        </nav>
      </div>
    </footer>
  );
}
