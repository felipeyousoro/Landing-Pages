import { ContactForm } from "@/components/contact-form";

export function Contact() {
  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            Contact
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-neutral sm:text-4xl">
            Let&apos;s talk about your project.
          </h2>
          <p className="max-w-md text-neutral-soft">
            Fill out the form and our team will get back to you as soon as
            possible.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral/10 bg-white p-6 shadow-sm sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
