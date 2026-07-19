import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/json-ld";
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
    return { title: "Service" };
  }

  const path = `/services/${service.slug}`;

  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${service.title} | Dazco LLC`,
      description: service.description,
      url: path,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Dazco LLC`,
      description: service.description,
      images: [service.image],
    },
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
      <JsonLd
        data={[
          serviceJsonLd(service),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/#services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
        <section className="relative flex min-h-[70vh] items-center overflow-hidden">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-neutral/80"
            aria-hidden
          />
          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-24 lg:px-8 lg:py-32">
            <nav aria-label="Breadcrumb" className="text-sm text-white/70">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/#services"
                    className="transition-colors hover:text-white"
                  >
                    Services
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="font-medium text-white">{service.title}</li>
              </ol>
            </nav>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {service.title}
            </h1>
            <p className="max-w-xl text-lg leading-8 text-white/85">
              {service.description}
            </p>
            <div>
              <a
                href="#contact"
                className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-secondary"
              >
                Contact us
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 py-16 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-24">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div className="flex flex-col gap-5">
              {service.body.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-7 text-neutral-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
