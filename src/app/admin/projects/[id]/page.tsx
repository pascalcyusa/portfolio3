import { fetchProjects } from "@/utils/api";
import ProjectForm from "../ProjectForm";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const projectId = resolvedParams.id;
  const projects = await fetchProjects();
  const project = projects.find((p: any) => p.id === projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl pb-24">
      <h1 className="text-3xl font-display font-bold mb-8">Edit Project: {project.title}</h1>
      <ProjectForm initialData={project} />
    </div>
  );
}