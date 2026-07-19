import { ContactForm } from "@/components/contact-form";

export function Contact() {
  return (
    <section id="contact" className="bg-primary">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-wide text-white/80">
            Contact
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Let&apos;s talk about your facilities needs.
          </h2>
          <p className="max-w-md text-white/85">
            Tell us about your site, property, or operations requirements and our
            team in Al Ain will get back to you shortly.
          </p>
          <div className="mt-2 flex flex-col gap-1 text-sm text-white/80">
            <span className="font-semibold text-white">Dazco LLC</span>
            <span>AL Shimmari Building, Office no. 111</span>
            <span>Al Ain, Abu Dhabi 14488, UAE</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/20 bg-white p-6 shadow-sm sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
