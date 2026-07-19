const STATS = [
  { value: "IA aplicada", label: "Modelos de visão computacional treinados para reconhecer doenças em folhas" },
  { value: "Drones (VANTs)", label: "Captura aérea multiespectral para monitorar lavouras em larga escala" },
  { value: "UEL Londrina", label: "Pesquisa e extensão conectadas ao Departamento de Computação e à Agronomia" },
];

export function About() {
  return (
    <section id="sobre" className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Sobre o GAIA
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-neutral sm:text-4xl">
            Ciência de dados aplicada ao campo, com a UEL como base.
          </h2>
          <p className="text-neutral-soft">
            O GAIA nasceu na Universidade Estadual de Londrina com um objetivo
            claro: colocar Inteligência Artificial e agricultura de precisão
            ao alcance de produtores e cooperativas. Combinamos redes neurais,
            imagens de drones e conhecimento agronômico para transformar dados
            de campo em decisões rápidas e confiáveis.
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
            Nossa equipe reúne pesquisadores, alunos e colaboradores dedicados
            ao desenvolvimento de soluções de agro 4.0. O trabalho é guiado
            por três frentes complementares: coleta de dados em campo com
            drones, modelos de aprendizado profundo para diagnóstico de
            doenças, e explicabilidade — mostrando exatamente onde e por que
            um modelo identificou um problema na planta.
          </p>
          <p>
            O resultado é um monitoramento fitossanitário mais rápido, mais
            barato e acessível mesmo para pequenas e médias propriedades,
            reduzindo o uso excessivo de defensivos e apoiando um manejo mais
            sustentável da lavoura.
          </p>
        </div>
      </div>
    </section>
  );
}
