import Hero from "@/components/Hero";
import SelectedProjects from "@/components/SelectedProjects";
import SelectedResearch from "@/components/SelectedResearch";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="bg-brand-black min-h-screen">
      <Hero />
      <SelectedProjects />
      <SelectedResearch />
      <Skills />
    </main>
  );
}
