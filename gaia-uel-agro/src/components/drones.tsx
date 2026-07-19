const CAPABILITIES = [
  {
    title: "Imagens multiespectrais",
    description:
      "Câmeras RGB, NIR e multiespectrais captam variações de reflectância invisíveis a olho nu, indicando estresse hídrico, nutricional ou sanitário.",
  },
  {
    title: "Mapeamento em larga escala",
    description:
      "Um único voo cobre hectares de lavoura em minutos, gerando ortomosaicos e mapas de índices de vegetação (NDVI e similares).",
  },
  {
    title: "Zonas de manejo",
    description:
      "Cruzamos os mapas aéreos com georreferenciamento (GIS) para indicar exatamente onde aplicar insumos, reduzindo custo e impacto ambiental.",
  },
  {
    title: "Detecção precoce",
    description:
      "Alterações fisiológicas causadas por pragas e doenças são identificadas antes de se tornarem visíveis em campo, ganhando tempo de reação.",
  },
];

export function Drones() {
  return (
    <section id="drones" className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Drones
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-neutral sm:text-4xl">
            Os olhos do GAIA sobre a lavoura.
          </h2>
          <p className="text-neutral-soft">
            Veículos Aéreos Não Tripulados (VANTs) equipados com sensores
            multiespectrais coletam, em poucos minutos, dados que levariam
            dias para serem levantados a pé. Essas imagens alimentam os
            mesmos modelos de IA usados na detecção de doenças, agora
            aplicados a lavouras inteiras.
          </p>
          <p className="text-neutral-soft">
            O fluxo de trabalho do GAIA integra planejamento de voo,
            processamento de imagem e análise preditiva em uma rotina
            pensada para cooperativas, pesquisadores e produtores rurais.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {CAPABILITIES.map((capability) => (
            <div
              key={capability.title}
              className="flex flex-col gap-3 rounded-2xl border border-neutral/10 bg-mist p-6"
            >
              <span className="h-1.5 w-10 rounded-full bg-accent" />
              <h3 className="text-base font-semibold text-neutral">{capability.title}</h3>
              <p className="text-sm leading-6 text-neutral-soft">{capability.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
