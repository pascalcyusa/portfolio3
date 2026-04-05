"use client";

import { useState } from "react";
import { PlusCircle, Trash2, GripVertical, Upload } from "lucide-react";

interface DynamicArrayInputProps {
  label: string;
  items: string[];
  onChange: (newItems: string[]) => void;
  placeholder?: string;
}

export function DynamicStringArrayInput({ label, items, onChange, placeholder }: DynamicArrayInputProps) {
  const [newVal, setNewVal] = useState("");

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!newVal.trim()) return;
    onChange([...items, newVal.trim()]);
    setNewVal("");
  };

  const handleRemove = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <div className="space-y-2 mb-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2 bg-gray-800/50 p-2 rounded border border-gray-700">
            <GripVertical className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="flex-1 text-sm text-gray-300 break-words">{item}</p>
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="p-1 text-gray-500 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newVal}
          onChange={(e) => setNewVal(e.target.value)}
          placeholder={placeholder || "Add new item..."}
          className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd(e as any);
            }
          }}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded flex items-center gap-2 text-sm transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Add
        </button>
      </div>
    </div>
  );
}

interface ImageObj {
  url: string;
  caption?: string | null;
}

interface DynamicImageArrayInputProps {
  label: string;
  items: ImageObj[];
  onChange: (newItems: ImageObj[]) => void;
  onUploadClick: (index: number | null) => void;
}

export function DynamicImageArrayInput({ label, items, onChange, onUploadClick }: DynamicImageArrayInputProps) {
  const [newUrl, setNewUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;
    onChange([...items, { url: newUrl.trim(), caption: newCaption.trim() || null }]);
    setNewUrl("");
    setNewCaption("");
  };

  const handleRemove = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const handleEditItem = (index: number, field: "url" | "caption", val: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: val };
    onChange(newItems);
  };

  return (
    <div className="mb-6 border border-gray-800 p-4 rounded-xl bg-gray-900/30">
      <label className="block text-sm font-medium text-gray-300 mb-4">{label}</label>
      <div className="space-y-4 mb-4">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700 relative">
             <button
              type="button"
              onClick={() => handleRemove(i)}
              className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="w-32 h-32 bg-gray-900 rounded border border-gray-700 flex-shrink-0 flex items-center justify-center overflow-hidden">
               {item.url ? (
                 // eslint-disable-next-line @next/next/no-img-element
                 <img src={item.url} alt="preview" className="w-full h-full object-cover" />
               ) : (
                 <span className="text-gray-600 text-xs">No Image</span>
               )}
            </div>
            <div className="flex-1 space-y-3 pt-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={item.url}
                    onChange={(e) => handleEditItem(i, "url", e.target.value)}
                    className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand-orange"
                  />
                  <button
                    type="button"
                    onClick={() => onUploadClick(i)}
                    className="bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-sm flex items-center gap-2 transition-colors"
                  >
                    <Upload className="w-4 h-4" /> Upload
                  </button>
                </div>
              </div>
               <div>
                <label className="block text-xs text-gray-500 mb-1">Caption (optional)</label>
                <input
                  type="text"
                  value={item.caption || ""}
                  onChange={(e) => handleEditItem(i, "caption", e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New */}
      <div className="pt-4 border-t border-gray-800">
        <h4 className="text-sm font-medium text-gray-400 mb-3">Add New Image</h4>
        <div className="flex gap-3 items-start">
          <div className="flex-1 space-y-2">
            <div className="flex gap-2">
               <input
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="Image URL"
                className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
              />
               <button
                type="button"
                onClick={() => onUploadClick(null)}
                className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-sm flex items-center gap-2 transition-colors"
                title="Upload to Cloud Storage"
              >
                <Upload className="w-4 h-4" />
              </button>
            </div>
             <input
              type="text"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              placeholder="Caption (optional)"
              className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAdd(e as any);
                }
              }}
            />
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="bg-brand-orange hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2 text-sm transition-colors mt-0.5"
          >
            <PlusCircle className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}


interface VideoObj {
  url: string;
  caption: string;
}

interface DynamicVideoArrayInputProps {
  label: string;
  items: VideoObj[];
  onChange: (newItems: VideoObj[]) => void;
  onUploadClick: (index: number | null) => void;
}

export function DynamicVideoArrayInput({ label, items, onChange, onUploadClick }: DynamicVideoArrayInputProps) {
  const [newUrl, setNewUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!newUrl.trim() || !newCaption.trim()) {
      alert("Both URL and Caption are required for videos.");
      return;
    }
    onChange([...items, { url: newUrl.trim(), caption: newCaption.trim() }]);
    setNewUrl("");
    setNewCaption("");
  };

  const handleRemove = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const handleEditItem = (index: number, field: "url" | "caption", val: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: val };
    onChange(newItems);
  };

  return (
    <div className="mb-6 border border-gray-800 p-4 rounded-xl bg-gray-900/30">
      <label className="block text-sm font-medium text-gray-300 mb-4">{label}</label>
      <div className="space-y-4 mb-4">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700 relative pr-10">
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="absolute top-4 right-4 p-1 text-gray-500 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="flex-1 space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Video URL</label>
                <div className="flex gap-2">
                   <input
                    type="text"
                    value={item.url}
                    onChange={(e) => handleEditItem(i, "url", e.target.value)}
                    className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand-orange"
                  />
                  <button
                    type="button"
                    onClick={() => onUploadClick(i)}
                    className="bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded text-sm flex items-center gap-2 transition-colors"
                  >
                    <Upload className="w-4 h-4" /> Upload
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Caption (required)</label>
                <input
                  type="text"
                  value={item.caption}
                  onChange={(e) => handleEditItem(i, "caption", e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New */}
      <div className="pt-4 border-t border-gray-800">
        <h4 className="text-sm font-medium text-gray-400 mb-3">Add New Video</h4>
        <div className="flex gap-3 items-start">
          <div className="flex-1 space-y-2">
            <div className="flex gap-2">
               <input
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="Video URL (e.g., YouTube link or upload MP4)"
                className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
              />
               <button
                type="button"
                onClick={() => onUploadClick(null)}
                className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-sm flex items-center gap-2 transition-colors"
                title="Upload to Cloud Storage"
              >
                <Upload className="w-4 h-4" />
              </button>
            </div>
             <input
              type="text"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              placeholder="Caption (required)"
              className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAdd(e as any);
                }
              }}
            />
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="bg-brand-orange hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2 text-sm transition-colors mt-0.5"
          >
            <PlusCircle className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}