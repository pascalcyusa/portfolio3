"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { DynamicStringArrayInput, DynamicImageArrayInput, DynamicVideoArrayInput } from "@/components/DynamicArrayInputs";

export default function ResearchForm({ initialData }: { initialData?: any }) {
  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    title: initialData?.title || "",
    category: initialData?.category || "",
    lab: initialData?.lab || "",
    period: initialData?.period || "",
    link: initialData?.link || "",
    pdf_url: initialData?.pdf_url || "",
    image: initialData?.image || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    overview: initialData?.overview || [],
    achievements: initialData?.achievements || [],
    images: initialData?.images || [],
    videos: initialData?.videos || [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { getToken } = useAuth();

  const handleUploadClick = async (field: "image" | "pdf_url" | "images" | "videos", index: number | null = null) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = field === "pdf_url" ? "application/pdf" : field === "videos" ? "video/*" : "image/*";
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const token = await getToken();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch(`${apiUrl}/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: fd,
        });

        if (!res.ok) {
          throw new Error(`Upload failed: ${res.statusText}`);
        }

        const data = await res.json();
        const url = data.url;

        if (field === "image" || field === "pdf_url") {
          setFormData({ ...formData, [field]: url });
        } else if (field === "images") {
          if (index !== null) {
            const newImages = [...formData.images];
            newImages[index].url = url;
            setFormData({ ...formData, images: newImages });
          } else {
            setFormData({ ...formData, images: [...formData.images, { url }] });
          }
        } else if (field === "videos") {
          if (index !== null) {
            const newVideos = [...formData.videos];
            newVideos[index].url = url;
            setFormData({ ...formData, videos: newVideos });
          } else {
             setFormData({ ...formData, videos: [...formData.videos, { url, caption: "New Video" }] });
          }
        }
      } catch (err) {
        console.error(err);
        alert("Upload failed.");
      }
    };
    input.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = await getToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

      // If editing, delete old
      if (initialData?.id) {
         await fetch(`${apiUrl}/research/${initialData.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      }

      const res = await fetch(`${apiUrl}/research`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to save research");
      }

      router.push("/admin/research");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to save research.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
      {/* Basic Info */}
      <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 space-y-4">
        <h2 className="text-xl font-bold mb-4">Basic Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Research ID (URL slug)</label>
            <input required type="text" name="id" value={formData.id} onChange={handleChange} disabled={!!initialData} className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white disabled:opacity-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
            <input required type="text" name="category" value={formData.category} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Lab / Institution</label>
            <input required type="text" name="lab" value={formData.lab} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Period</label>
            <input required type="text" name="period" value={formData.period} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Description (Short)</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} rows={2} className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white" />
        </div>
      </div>

      {/* Main Media & Links */}
      <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 space-y-4">
        <h2 className="text-xl font-bold mb-4">Main Media & Links</h2>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Main Cover Image URL</label>
          <div className="flex gap-2">
            <input required type="text" name="image" value={formData.image} onChange={handleChange} className="flex-1 bg-gray-800 border border-gray-700 rounded p-2 text-white" />
            <button type="button" onClick={() => handleUploadClick("image")} className="bg-gray-700 px-4 py-2 rounded text-sm">Upload</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">External Link</label>
            <input type="text" name="link" value={formData.link} onChange={handleChange} className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">PDF URL</label>
            <div className="flex gap-2">
               <input type="text" name="pdf_url" value={formData.pdf_url} onChange={handleChange} className="flex-1 bg-gray-800 border border-gray-700 rounded p-2 text-white" />
               <button type="button" onClick={() => handleUploadClick("pdf_url")} className="bg-gray-700 px-4 py-2 rounded text-sm">Upload</button>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Content Arrays */}
      <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 space-y-2">
        <h2 className="text-xl font-bold mb-4">Detailed Content</h2>

        <DynamicStringArrayInput
          label="Overview Points"
          items={formData.overview}
          onChange={(newItems) => setFormData({ ...formData, overview: newItems })}
        />
        <DynamicStringArrayInput
          label="Achievements"
          items={formData.achievements}
          onChange={(newItems) => setFormData({ ...formData, achievements: newItems })}
        />
      </div>

      {/* Long Text Areas */}
      <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 space-y-4">
        <h2 className="text-xl font-bold mb-4">Long Descriptions</h2>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Content (Markdown supported)</label>
          <textarea name="content" value={formData.content} onChange={handleChange} rows={5} className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white font-mono text-sm" />
        </div>
      </div>

      {/* Gallery & Videos */}
      <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 space-y-2">
        <h2 className="text-xl font-bold mb-4">Media Gallery</h2>

        <DynamicImageArrayInput
          label="Images Gallery"
          items={formData.images}
          onChange={(newItems) => setFormData({ ...formData, images: newItems })}
          onUploadClick={(i) => handleUploadClick("images", i)}
        />

        <DynamicVideoArrayInput
          label="Videos Gallery"
          items={formData.videos}
          onChange={(newItems) => setFormData({ ...formData, videos: newItems })}
          onUploadClick={(i) => handleUploadClick("videos", i)}
        />
      </div>

      <div className="flex justify-end gap-4 sticky bottom-4 bg-gray-900/90 p-4 rounded-xl border border-gray-800 shadow-2xl backdrop-blur-md">
        <button type="button" onClick={() => router.back()} className="px-6 py-2 rounded text-gray-400 hover:text-white transition-colors">Cancel</button>
        <button type="submit" disabled={isSubmitting} className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-2 rounded font-medium transition-colors disabled:opacity-50">
          {isSubmitting ? "Saving..." : "Save Research"}
        </button>
      </div>
    </form>
  );
}