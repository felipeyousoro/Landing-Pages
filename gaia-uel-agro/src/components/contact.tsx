import { ContactForm } from "@/components/contact-form";

export function Contact() {
  return (
    <section id="contato" className="bg-mist">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Contato
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-neutral sm:text-4xl">
            Vamos falar sobre a sua lavoura.
          </h2>
          <p className="max-w-md text-neutral-soft">
            Preencha o formulário e nossa equipe do GAIA retornará em breve
            para conversar sobre detecção de doenças, voos com drones ou
            parcerias de pesquisa com a UEL.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral/10 bg-white p-6 shadow-sm sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
