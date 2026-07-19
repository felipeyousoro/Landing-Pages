import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getServiceBySlug, SERVICES } from "@/lib/services";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service | Dazco LLC" };
  }

  return {
    title: `${service.title} | Dazco LLC`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <section className="bg-gradient-to-br from-white via-white to-accent/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 lg:px-8 lg:py-24">
            <div className="flex flex-col gap-3">
              <nav aria-label="Breadcrumb" className="text-sm text-neutral-soft">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link
                      href="/"
                      className="transition-colors hover:text-primary"
                    >
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link
                      href="/#services"
                      className="transition-colors hover:text-primary"
                    >
                      Services
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="font-medium text-neutral">{service.title}</li>
                </ol>
              </nav>
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-neutral sm:text-4xl lg:text-5xl">
                {service.title}
              </h1>
            </div>

            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
              <div
                className="flex aspect-[4/3] w-full items-center justify-center bg-neutral/10"
                aria-label="Sample image placeholder"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-soft">
                  SAMPLE
                </span>
              </div>

              <div className="flex flex-col gap-5">
                <p className="text-lg leading-8 text-neutral-soft">
                  {service.description}
                </p>
                {service.body.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base leading-7 text-neutral-soft"
                  >
                    {paragraph}
                  </p>
                ))}
                <div className="pt-2">
                  <a
                    href="#contact"
                    className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary"
                  >
                    Contact us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
