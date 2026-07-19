import Link from "next/link";
import { SERVICES } from "@/lib/services";

export function Services() {
  return (
    <section id="services" className="bg-secondary">
      <div className="mx-auto flex flex-col gap-12 px-6 py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-white">
            What we do
          </span>
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Facilities, maintenance, and operational expertise.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex cursor-pointer flex-col gap-3 bg-white p-8 shadow-lg shadow-secondary/20 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="h-1.5 w-10 rounded-full bg-primary transition-colors duration-300 ease-out group-hover:bg-accent" />
              <h3 className="text-lg font-semibold text-neutral transition-colors duration-300 ease-out group-hover:text-primary">
                {service.title}
              </h3>
              <p className="text-sm leading-6 text-neutral-soft">
                {service.description}
              </p>
              <span className="mt-auto pt-2 text-sm font-semibold text-primary transition-transform duration-300 ease-out group-hover:translate-x-1">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
