import Image from "next/image";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[85vh] items-center overflow-hidden"
    >
      <Image
        src="/images/dubai-skyline.jpg"
        alt="Dubai skyline"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-neutral/80" aria-hidden />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-24 lg:px-8 lg:py-32">
        <span className="rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white">
          A place of Trust
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Facilities management you can rely on.
        </h1>
        <p className="max-w-xl text-lg leading-8 text-white/85">
          Locally based with international reach. Since 2001, Dazco has delivered
          properties, facilities, warehousing, and maintenance services across the UAE.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="/#contact"
            className="rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-secondary"
          >
            Get in touch
          </a>
          <a
            href="/#services"
            className="rounded-full border border-white/40 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
          >
            See our services
          </a>
        </div>
      </div>
    </section>
  );
}
