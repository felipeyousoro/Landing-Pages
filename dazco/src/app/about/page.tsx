import type { Metadata } from "next";
import Link from "next/link";
import { AboutStats } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ABOUT_PAGE } from "@/lib/about";

export const metadata: Metadata = {
  title: "About Us | Dazco LLC",
  description:
    "Learn about Dazco LLC — facilities, properties, and operational services in Al Ain since 2001.",
};

export default function AboutPage() {
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
                  <li className="font-medium text-neutral">{ABOUT_PAGE.title}</li>
                </ol>
              </nav>
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-neutral sm:text-4xl lg:text-5xl">
                {ABOUT_PAGE.title}
              </h1>
            </div>

            <div className="flex max-w-3xl flex-col gap-5">
              <p className="text-xl font-medium leading-8 text-neutral">
                {ABOUT_PAGE.purpose}
              </p>
              {ABOUT_PAGE.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-7 text-neutral-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <AboutStats />
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
