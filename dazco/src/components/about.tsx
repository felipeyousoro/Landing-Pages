export function About() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            About Dazco
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-neutral sm:text-4xl">
            Built on consistency, driven by results.
          </h2>
        </div>
        <div className="flex flex-col gap-4 text-neutral-soft">
          <p>
            Dazco was built around a simple idea: deliver work that is
            reliable, professional and easy to work with. Every project we
            take on is treated with the same care and attention to detail.
          </p>
          <p>
            Our team blends experience with a fresh, dynamic approach so we
            can adapt quickly to what each client actually needs, rather than
            offering one-size-fits-all solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
