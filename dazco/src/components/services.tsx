const SERVICES = [
  {
    title: "Properties & Facilities Management",
    description:
      "End-to-end facilities operations that keep properties safe, efficient, and ready for daily use.",
  },
  {
    title: "Warehousing & Stores Operation",
    description:
      "Reliable warehouse and store operations with disciplined processes for storage and logistics.",
  },
  {
    title: "Building General Maintenance",
    description:
      "Preventive and corrective maintenance to protect assets and extend building lifespan.",
  },
  {
    title: "IT Networking",
    description:
      "Network infrastructure and connectivity solutions tailored to offices and facilities.",
  },
  {
    title: "CCTV & Smart Homes / Offices",
    description:
      "Security systems and smart building technology for safer, more connected spaces.",
  },
  {
    title: "Supply Chain Management",
    description:
      "Coordinated supply chain support that keeps materials and operations moving smoothly.",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-neutral/[0.03]">
      <div className="mx-auto flex flex-col gap-12 px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">
            What we do
          </span>
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-neutral sm:text-4xl">
            Facilities, maintenance, and operational expertise.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="flex flex-col gap-3 rounded-2xl border border-neutral/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="h-1.5 w-10 rounded-full bg-primary" />
              <h3 className="text-lg font-semibold text-neutral">{service.title}</h3>
              <p className="text-sm leading-6 text-neutral-soft">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
