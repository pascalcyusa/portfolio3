import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-display font-bold mb-8">Admin Dashboard</h1>
      <p className="text-gray-400 mb-12">
        Welcome to the admin dashboard. Select a section below to manage your portfolio content.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/projects"
          className="p-6 border border-gray-800 rounded-xl hover:border-brand-orange transition-colors group bg-gray-900/50"
        >
          <h2 className="text-2xl font-bold mb-2 group-hover:text-brand-orange transition-colors">Manage Projects</h2>
          <p className="text-gray-400 text-sm">Create, edit, or delete portfolio projects.</p>
        </Link>

        <Link
          href="/admin/research"
          className="p-6 border border-gray-800 rounded-xl hover:border-brand-orange transition-colors group bg-gray-900/50"
        >
          <h2 className="text-2xl font-bold mb-2 group-hover:text-brand-orange transition-colors">Manage Research</h2>
          <p className="text-gray-400 text-sm">Create, edit, or delete research experiences.</p>
        </Link>
      </div>
    </div>
  );
}