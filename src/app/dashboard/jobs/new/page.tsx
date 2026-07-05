import JobForm from "@/components/dashboard/JobForm";
export const metadata = { title: "Post a New Job" };

export default function NewJobPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">Post a New Job</h1>
          <p className="text-white/40 text-sm">Fill in the details below to create a new job listing</p>
        </div>
        <JobForm />
      </div>
    </div>
  );
}
