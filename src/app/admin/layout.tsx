import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-gray-800 p-6 flex flex-col gap-6">
        <h2 className="text-2xl font-display font-bold text-brand-orange">Admin</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/admin" className="text-gray-300 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/projects" className="text-gray-300 hover:text-white transition-colors">
            Projects
          </Link>
          <Link href="/admin/research" className="text-gray-300 hover:text-white transition-colors">
            Research
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
