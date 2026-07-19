import Image from "next/image";

const SAMPLES = [
  {
    src: "/disease/pdd-late-blight-scorecam.png",
    diagnosis: "Requeima (Late blight)",
    method: "Score-CAM",
  },
  {
    src: "/disease/pdd-late-blight-gradcam.png",
    diagnosis: "Requeima (Late blight)",
    method: "Grad-CAM++",
  },
  {
    src: "/disease/pdd-septoria-gradcam.png",
    diagnosis: "Septoriose (Septoria leaf spot)",
    method: "Grad-CAM++",
  },
  {
    src: "/disease/pdd-late-blight-2-gradcam.png",
    diagnosis: "Requeima (Late blight)",
    method: "Grad-CAM++",
  },
];

const STEPS = [
  {
    title: "Captura da imagem",
    description:
      "A folha é fotografada em campo ou por drone e enviada ao modelo de classificação.",
  },
  {
    title: "Diagnóstico por IA",
    description:
      "Uma rede neural convolucional identifica a doença mais provável entre as classes conhecidas.",
  },
  {
    title: "Mapa de calor explicativo",
    description:
      "Técnicas como Grad-CAM++ e Score-CAM destacam exatamente as regiões da folha que motivaram o diagnóstico.",
  },
];

export function DiseaseDetection() {
  return (
    <section id="deteccao-de-doencas" className="bg-mist">
      <div className="mx-auto flex flex-col gap-12 px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Detecção de Doenças
          </span>
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-neutral sm:text-4xl">
            Diagnóstico automático de doenças em folhas, com IA explicável.
          </h2>
          <p className="mx-auto max-w-2xl text-neutral-soft">
            Nossos modelos classificam imagens de folhas e mostram, por meio
            de mapas de calor, quais regiões pesaram na decisão — a mesma
            lógica usada para identificar precocemente pragas e doenças em
            imagens capturadas por drones.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SAMPLES.map((sample) => (
            <figure
              key={sample.src}
              className="flex flex-col overflow-hidden rounded-2xl border border-neutral/10 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full bg-white">
                <Image
                  src={sample.src}
                  alt={`Diagnóstico de ${sample.diagnosis} com mapa de calor ${sample.method}`}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <figcaption className="flex flex-col gap-1 border-t border-neutral/10 px-4 py-3">
                <span className="text-sm font-semibold text-neutral">{sample.diagnosis}</span>
                <span className="text-xs font-medium uppercase tracking-wide text-accent">
                  {sample.method}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="flex flex-col gap-3 rounded-2xl border border-neutral/10 bg-white p-8 shadow-sm"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold text-neutral">{step.title}</h3>
              <p className="text-sm leading-6 text-neutral-soft">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
