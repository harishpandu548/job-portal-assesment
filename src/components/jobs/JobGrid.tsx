import { Job } from "@prisma/client";
import JobCard from "./JobCard";
import { Briefcase } from "lucide-react";

interface JobGridProps {
  jobs: Job[];
  total: number;
}

export default function JobGrid({ jobs, total }: JobGridProps) {
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center mb-5">
          <Briefcase className="w-7 h-7 text-white/20" />
        </div>
        <h3 className="text-white/60 font-semibold text-lg mb-2">No jobs found</h3>
        <p className="text-white/30 text-sm max-w-xs">Try adjusting your search or filters to find what you&apos;re looking for.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-white/40 text-sm">
          <span className="text-white/70 font-medium">{total}</span> job{total !== 1 ? "s" : ""} found
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} featured={job.isFeatured} />
        ))}
      </div>
    </div>
  );
}
