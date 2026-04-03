import { fetchResearch } from "@/utils/api";
import ResearchForm from "../ResearchForm";
import { notFound } from "next/navigation";

export default async function EditResearchPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const researchId = resolvedParams.id;
  const researchList = await fetchResearch();
  const research = researchList.find((r: any) => r.id === researchId);

  if (!research) {
    notFound();
  }

  return (
    <div className="max-w-4xl pb-24">
      <h1 className="text-3xl font-display font-bold mb-8">Edit Research: {research.title}</h1>
      <ResearchForm initialData={research} />
    </div>
  );
}