export function About() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            About Dazco
          </span>
          <h2 className="text-3xl font-semibold tracking-tight text-neutral sm:text-4xl">
            Established 2001. Trusted by 120+ organizations.
          </h2>
        </div>
        <div className="flex flex-col gap-4 text-neutral-soft">
          <p>
            Dazco LLC is a facilities company based in Al Ain, Abu Dhabi — locally
            rooted with international reach. We operate across properties and
            facilities management, warehouses and stores operation, building
            general maintenance, IT networking, CCTV, smart homes and offices,
            and supply chain management.
          </p>
          <p>
            As an approved vendor with over 120+ government, semi-government, and
            private entities, our work is driven by a strong, experienced team
            that treats every site and client with the same standard of care.
          </p>
        </div>
      </div>
    </section>
  );
}
