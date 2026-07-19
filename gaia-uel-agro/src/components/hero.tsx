import Image from "next/image";

type HeroProps = {
  mailEnabled: boolean;
};

export function Hero({ mailEnabled }: HeroProps) {
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
            width={14}
            height={24}
            className="h-5 w-auto"
          />
          GAIA &middot; Universidade Estadual de Londrina
        </span>
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-neutral sm:text-5xl lg:text-6xl">
          Inteligência Artificial e drones a serviço da lavoura.
        </h1>
        <p className="max-w-xl text-lg leading-8 text-neutral-soft">
          O GAIA une pesquisa da UEL, visão computacional e imagens aéreas para
          detectar doenças em plantas antes que se tornem prejuízo, ajudando
          produtores a agir na hora certa e com mais precisão.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          {mailEnabled && (
            <a
              href="#contato"
              className="rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-secondary"
            >
              Fale com a gente
            </a>
          )}
          <a
            href="#deteccao-de-doencas"
            className={
              mailEnabled
                ? "rounded-full border border-neutral/15 px-6 py-3 text-center text-sm font-semibold text-neutral transition-colors hover:border-primary hover:text-primary"
                : "rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-secondary"
            }
          >
            Ver a tecnologia em ação
          </a>
        </div>
      </div>
    </section>
  );
}
