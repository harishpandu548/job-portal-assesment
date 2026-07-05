import { notFound } from "next/navigation";
import { getJobById } from "@/lib/queries";
import JobForm from "@/components/dashboard/JobForm";

interface EditJobPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = { title: "Edit Job" };

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) notFound();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">Edit Job</h1>
          <p className="text-white/40 text-sm">{job.title} at {job.company}</p>
        </div>
        <JobForm job={job} />
      </div>
    </div>
  );
}
