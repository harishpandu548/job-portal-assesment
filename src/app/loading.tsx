import { Loader2 } from "lucide-react";
import { JobGridSkeleton } from "@/components/jobs/JobSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Fake Hero Skeleton */}
        <div className="flex flex-col items-center justify-center text-center mb-20 animate-pulse">
          <div className="h-16 w-3/4 max-w-2xl bg-white/5 rounded-2xl mb-6"></div>
          <div className="h-6 w-1/2 max-w-md bg-white/5 rounded-xl mb-10"></div>
          <div className="h-14 w-40 bg-violet-500/20 rounded-xl"></div>
        </div>

        {/* Filters Skeleton */}
        <div className="flex items-center gap-4 mb-8 animate-pulse">
          <div className="h-12 flex-1 bg-white/5 rounded-xl"></div>
          <div className="h-12 w-32 bg-white/5 rounded-xl hidden sm:block"></div>
        </div>

        {/* Jobs Grid Skeleton */}
        <JobGridSkeleton />
      </div>
    </div>
  );
}
