import Hero from "@/components/Hero";
import SelectedProjects from "@/components/SelectedProjects";
import SelectedResearch from "@/components/SelectedResearch";
import Skills from "@/components/Skills";
import { fetchProjects, fetchResearch } from "@/utils/api";
import { projects as fallbackProjects } from "@/data/projects";
import { researchData as fallbackResearch } from "@/data/research";

export default async function Home() {
  let projectsData = [];
  let researchData = [];
  try {
    const fetchedProjects = await fetchProjects();
    projectsData = fetchedProjects && fetchedProjects.length > 0 ? fetchedProjects : fallbackProjects;
  } catch (error) {
    projectsData = fallbackProjects;
  }

  try {
    const fetchedResearch = await fetchResearch();
    researchData = fetchedResearch && fetchedResearch.length > 0 ? fetchedResearch : fallbackResearch;
  } catch (error) {
    researchData = fallbackResearch;
  }

  return (
    <main className="bg-brand-black min-h-screen">
      <Hero />
      <SelectedProjects projects={projectsData} />
      <SelectedResearch research={researchData} />
      <Skills />
    </main>
  );
}
