const STATS = [
  { value: "IA aplicada", label: "Modelos de visão computacional treinados para reconhecer doenças em folhas" },
];

export function About() {
  return (
    <section id="sobre" className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Sobre o grupo GAIA
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-neutral sm:text-4xl">
            A tecnologia da informação aplicada ao campo.
          </h2>
          <p className="text-neutral-soft">
            Somos um grupo de pesquisa e extensão da Universidade Estadual de
            Londrina, com o objetivo de agregar valor aos nossos parceiros.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.value} className="rounded-xl bg-mist p-4">
                <p className="text-sm font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-xs leading-5 text-neutral-soft">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 text-neutral-soft">
          <p>
            Nossa equipe reúne pesquisadores e alunos dedicados ao desenvolvimento
            de soluções de tecnologia da informação aplicadas a diferentes
            setores, incluindo a agricultura.
          </p>
          <p>
            Usamos IA para extrair dados de imagens e ajudar o produtor a tomar
            decisões informadas sobre a sua lavoura.
          </p>
        </div>
      </div>
    </section>
  );
}
