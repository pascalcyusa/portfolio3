import Hero from "@/components/Hero";
import SelectedProjects from "@/components/SelectedProjects";
import ResearchProcess from "@/components/ResearchProcess";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-brand-black min-h-screen">
      <Hero />
      <SelectedProjects />
      <ResearchProcess />
      <Skills />
      <Footer />
    </main>
  );
}
