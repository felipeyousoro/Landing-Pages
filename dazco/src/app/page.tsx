import { About, StatsSection } from "@/components/about";
import { Contact } from "@/components/contact";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { WhyChoose } from "@/components/why-choose";
import { FAQ_ITEMS } from "@/lib/faq";
import { faqJsonLd } from "@/lib/json-ld";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
        <Hero />
        <About />
        <StatsSection />
        <WhyChoose />
        <Services />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
