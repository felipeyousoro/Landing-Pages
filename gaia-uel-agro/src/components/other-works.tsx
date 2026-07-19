const WORKS = [
  {
    title: "Cruzamento de dados",
    description:
      "Realizamos o cruzamento de dados das mais diversas fontes para transformá-los em informação ao produtor ou para alimentar sistemas.",
  },
  {
    title: "Análise de dados",
    description:
      "A partir dos mais diversos conjuntos de dados, construímos dashboards e relatórios de BI para fornecer informação ao produtor. Também usamos esses dados no treino de modelos de inteligência artificial que auxiliam com diagnósticos e predições no campo.",
  },
  {
    title: "Pesquisa",
    description:
      "Investigamos seus problemas e modelamos soluções adequadas às necessidades e restrições.",
  },
];

export function OtherWorks() {
  return (
    <section id="outros-trabalhos" className="bg-mist">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Outros trabalhos
          </span>
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-neutral sm:text-4xl">
            Além da detecção, outras frentes de atuação.
          </h2>
          <p className="mx-auto max-w-2xl text-neutral-soft">
            Aplicamos tecnologia da informação e ciência de dados para gerar
            valor em diferentes etapas do ciclo agrícola.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WORKS.map((work) => (
            <div
              key={work.title}
              className="flex flex-col gap-3 rounded-2xl border border-neutral/10 bg-white p-6 shadow-sm"
            >
              <span className="h-1.5 w-10 rounded-full bg-accent" />
              <h3 className="text-base font-semibold text-neutral">{work.title}</h3>
              <p className="text-sm leading-6 text-neutral-soft">{work.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
