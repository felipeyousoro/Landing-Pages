import Image from "next/image";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-br from-white via-mist to-accent/10"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-24 lg:px-8 lg:py-32">
        <span className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
          <Image
            src="/brand/gaia-logo-dark.png"
            alt="GAIA"
            width={16}
            height={16}
            className="h-4 w-auto"
          />
          GAIA &middot; Universidade Estadual de Londrina
        </span>
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-neutral sm:text-5xl lg:text-6xl">
          Agricultura de precisão a serviço do produtor.
        </h1>
        <p className="max-w-xl text-lg leading-8 text-neutral-soft">
          Usamos inteligência artificial para que o produtor obtenha diagnósticos
          em tempo real da sua lavoura, na palma da mão.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="#deteccao-de-doencas"
            className="rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-secondary"
          >
            Ver a tecnologia em ação
          </a>
        </div>
      </div>
    </section>
  );
}
