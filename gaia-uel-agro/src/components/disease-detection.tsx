"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";

const SAMPLES = [
  {
    src: "/disease/pdd-late-blight-scorecam.png",
    diagnosis: "Requeima",
    method: "Score-CAM",
  },
  {
    src: "/disease/pdd-late-blight-gradcam.png",
    diagnosis: "Requeima",
    method: "Grad-CAM++",
  },
  {
    src: "/disease/pdd-septoria-gradcam.png",
    diagnosis: "Septoriose",
    method: "Grad-CAM++",
  },
  {
    src: "/disease/pdd-late-blight-2-gradcam.png",
    diagnosis: "Requeima",
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

const ROADMAP = [
  {
    title: "Construção de aplicativo",
    explanation:
      "Permitir que o usuário identifique em tempo real, pela câmera do celular, quais doenças estão afetando as plantas da sua lavoura.",
  },
  {
    title: "Mapeamento com drones",
    explanation:
      "Realizar a detecção em larga escala a partir de imagens aéreas capturadas por drones, identificando simultaneamente as áreas de foco das doenças.",
  },
  {
    title: "Aplicação com sensores multiespectrais",
    explanation:
      "Realizar a detecção de forma precoce e avaliar o estresse hídrico e a deficiência nutricional.",
  },
];

function RoadmapInfoBubble({
  title,
  explanation,
  isOpen,
  onToggle,
}: {
  title: string;
  explanation: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bubbleId = useId();

  return (
    <div className="relative inline-flex" data-roadmap-bubble>
      <button
        type="button"
        aria-label={`Mais informações sobre ${title}`}
        aria-expanded={isOpen}
        aria-controls={bubbleId}
        onClick={onToggle}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        i
      </button>

      {isOpen && (
        <div
          id={bubbleId}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-20 mb-3 w-64 -translate-x-1/2 rounded-2xl border border-neutral/10 bg-white px-4 py-3 text-left shadow-lg sm:w-72"
        >
          <p className="text-sm leading-6 text-neutral-soft">{explanation}</p>
          <span
            aria-hidden
            className="absolute top-full left-1/2 -mt-px h-3 w-3 -translate-x-1/2 rotate-45 border-r border-b border-neutral/10 bg-white"
          />
        </div>
      )}
    </div>
  );
}

function Roadmap() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as HTMLElement | null;
      if (!target?.closest("[data-roadmap-bubble]")) {
        setOpenIndex(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenIndex(null);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openIndex]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 text-center">
        <h3 className="text-xl font-semibold tracking-tight text-neutral sm:text-2xl">
          Roadmap
        </h3>
        <p className="mx-auto max-w-xl text-sm text-neutral-soft">
          Próximos passos para levar a detecção de doenças do laboratório ao
          campo.
        </p>
      </div>

      <ol className="relative grid gap-6 sm:grid-cols-3">
        <span
          aria-hidden
          className="absolute top-5 right-[16.67%] left-[16.67%] hidden h-px bg-primary/20 sm:block"
        />

        {ROADMAP.map((item, index) => (
          <li
            key={item.title}
            className="relative flex flex-col items-center gap-4 text-center"
          >
            <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-white text-sm font-bold text-primary">
              {index + 1}
            </span>

            <div className="flex items-center justify-center gap-2">
              <span className="text-base font-semibold text-neutral">
                {item.title}
              </span>
              <RoadmapInfoBubble
                title={item.title}
                explanation={item.explanation}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex((current) => (current === index ? null : index))
                }
              />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function MagnifierIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function SampleLightbox({
  sample,
  onClose,
}: {
  sample: (typeof SAMPLES)[number];
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Imagem ampliada: ${sample.diagnosis} com ${sample.method}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral/80 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Fechar imagem ampliada"
        onClick={onClose}
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-neutral transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <span aria-hidden className="text-2xl leading-none">
          ×
        </span>
      </button>

      <figure
        className="relative flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-[4/3] w-full bg-white sm:aspect-[16/10]">
          <Image
            src={sample.src}
            alt={`Diagnóstico de ${sample.diagnosis} com mapa de calor ${sample.method}`}
            fill
            className="object-contain p-4"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>
        <figcaption className="flex flex-col gap-1 border-t border-neutral/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-base font-semibold text-neutral">
            {sample.diagnosis}
          </span>
          <span className="text-xs font-medium uppercase tracking-wide text-accent">
            {sample.method}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}

export function DiseaseDetection() {
  const [lightboxSample, setLightboxSample] = useState<
    (typeof SAMPLES)[number] | null
  >(null);

  useEffect(() => {
    if (!lightboxSample) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setLightboxSample(null);
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxSample]);

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
              className="relative flex flex-col overflow-hidden rounded-2xl border border-neutral/10 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full bg-white">
                <Image
                  src={sample.src}
                  alt={`Diagnóstico de ${sample.diagnosis} com mapa de calor ${sample.method}`}
                  fill
                  className="object-contain p-2"
                />
                <button
                  type="button"
                  aria-label={`Ampliar imagem de ${sample.diagnosis}`}
                  onClick={() => setLightboxSample(sample)}
                  className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-neutral/10 bg-white/95 text-neutral shadow-sm transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <MagnifierIcon className="h-4 w-4" />
                </button>
              </div>
              <figcaption className="flex flex-col gap-1 border-t border-neutral/10 px-4 py-3">
                <span className="text-sm font-semibold text-neutral">
                  {sample.diagnosis}
                </span>
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

        <Roadmap />
      </div>

      {lightboxSample && (
        <SampleLightbox
          sample={lightboxSample}
          onClose={() => setLightboxSample(null)}
        />
      )}
    </section>
  );
}
