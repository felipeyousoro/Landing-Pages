import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { DiseaseDetection } from "@/components/disease-detection";
import { Drones } from "@/components/drones";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { isMailEnabled } from "@/lib/feature-flags";

// USE_MAIL is an env-driven kill switch: read it per-request instead of
// baking it into a statically prerendered page, so toggling it takes effect
// without needing a rebuild.
export const dynamic = "force-dynamic";

export default function Home() {
  const mailEnabled = isMailEnabled();

  return (
    <div className="flex flex-1 flex-col">
      <Navbar mailEnabled={mailEnabled} />
      <main className="flex flex-1 flex-col">
        <Hero mailEnabled={mailEnabled} />
        <About />
        <DiseaseDetection />
        <Drones />
        {mailEnabled && <Contact />}
      </main>
      <Footer mailEnabled={mailEnabled} />
    </div>
  );
}
