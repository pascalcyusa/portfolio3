import Hero from "@/components/Hero";
import SelectedProjects from "@/components/SelectedProjects";
import SelectedResearch from "@/components/SelectedResearch";
import Skills from "@/components/Skills";
import { fetchProjects, fetchResearch } from "@/utils/api";

export default async function Home() {
  let projectsData = [];
  let researchData = [];
  try {
    const fetchedProjects = await fetchProjects();
    projectsData = fetchedProjects || [];
  } catch (error) {
    projectsData = [];
  }

  try {
    const fetchedResearch = await fetchResearch();
    researchData = fetchedResearch || [];
  } catch (error) {
    researchData = [];
  }

  return (
    <main className="bg-brand-black min-h-screen">
      <Hero />
      {projectsData.length > 0 && <SelectedProjects projects={projectsData} />}
      {researchData.length > 0 && <SelectedResearch research={researchData} />}
      <Skills />
    </main>
  );
}
