import ProjectForm from "../ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="max-w-4xl pb-24">
      <h1 className="text-3xl font-display font-bold mb-8">Create New Project</h1>
      <ProjectForm />
    </div>
  );
}