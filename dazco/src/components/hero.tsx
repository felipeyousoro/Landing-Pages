export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-br from-white via-white to-accent/10"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-24 lg:px-8 lg:py-32">
        <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
          A place of Trust
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-neutral sm:text-5xl lg:text-6xl">
          Facilities management you can rely on.
        </h1>
        <p className="max-w-xl text-lg leading-8 text-neutral-soft">
          Locally based with international reach. Since 2001, Dazco has delivered
          properties, facilities, warehousing, and maintenance services across the UAE.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="#contact"
            className="rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-secondary"
          >
            Get in touch
          </a>
          <a
            href="#services"
            className="rounded-full border border-neutral/15 px-6 py-3 text-center text-sm font-semibold text-neutral transition-colors hover:border-primary hover:text-primary"
          >
            See our services
          </a>
        </div>
      </div>
    </section>
  );
}
