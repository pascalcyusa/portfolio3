"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function DeleteProjectButton({ projectId }: { projectId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { getToken } = useAuth();
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setIsDeleting(true);
    try {
      const token = await getToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

      const res = await fetch(`${apiUrl}/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete project");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the project.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
      title="Delete"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}