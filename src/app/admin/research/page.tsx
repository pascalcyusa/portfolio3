import { fetchResearch } from "@/utils/api";
import Link from "next/link";
import { PlusCircle, Pencil } from "lucide-react";
import DeleteResearchButton from "./DeleteResearchButton";

export default async function AdminResearchPage() {
  const research = await fetchResearch({ noCache: true });

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-display font-bold">Research</h1>
        <Link
          href="/admin/research/new"
          className="flex items-center gap-2 bg-brand-orange text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          <span>New Research</span>
        </Link>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-800/50 text-gray-400 text-sm">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Lab</th>
              <th className="px-6 py-4 font-medium">ID</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {research.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4 font-medium">{item.title}</td>
                <td className="px-6 py-4 text-gray-400">{item.lab}</td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">{item.id}</td>
                <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                  <Link
                    href={`/admin/research/${item.id}`}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <DeleteResearchButton researchId={item.id} />
                </td>
              </tr>
            ))}
            {research.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No research entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}