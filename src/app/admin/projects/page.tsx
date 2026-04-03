import { fetchProjects } from "@/utils/api";
import Link from "next/link";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import DeleteProjectButton from "./DeleteProjectButton";

export default async function AdminProjectsPage() {
  const projects = await fetchProjects();

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-display font-bold">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 bg-brand-orange text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          <span>New Project</span>
        </Link>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-800/50 text-gray-400 text-sm">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">ID</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {projects.map((project: any) => (
              <tr key={project.id} className="hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4 font-medium">{project.title}</td>
                <td className="px-6 py-4 text-gray-400">{project.category}</td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">{project.id}</td>
                <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <DeleteProjectButton projectId={project.id} />
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}