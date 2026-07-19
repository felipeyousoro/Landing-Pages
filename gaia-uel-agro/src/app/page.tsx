import { About } from "@/components/about";
import { DiseaseDetection } from "@/components/disease-detection";
import { Drones } from "@/components/drones";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { OtherWorks } from "@/components/other-works";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <DiseaseDetection />
        <Drones />
        <OtherWorks />
      </main>
      <Footer />
    </div>
  );
}
