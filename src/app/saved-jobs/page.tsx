"use client";

import { useEffect, useState } from "react";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import JobCard from "@/components/jobs/JobCard";
import { Job } from "@prisma/client";
import { Bookmark, Loader2 } from "lucide-react";
import Link from "next/link";

export default function SavedJobsPage() {
  const { savedIds, removeSaved } = useSavedJobs();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    
    const fetchData = async () => {
      if (savedIds.length === 0) {
        setJobs([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const r = await fetch(`/api/jobs/saved?ids=${savedIds.join(",")}`);
        const data = await r.json();
        if (!ignore) {
          setJobs(data.jobs || []);
          setLoading(false);
        }
      } catch {
        if (!ignore) setLoading(false);
      }
    };

    const timer = setTimeout(fetchData, 0);
    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [savedIds]);

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Saved Jobs</h1>
          <p className="text-white/40">{savedIds.length} job{savedIds.length !== 1 ? "s" : ""} saved</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center mb-5">
              <Bookmark className="w-7 h-7 text-white/20" />
            </div>
            <h3 className="text-white/60 font-semibold text-lg mb-2">No saved jobs yet</h3>
            <p className="text-white/30 text-sm mb-6 max-w-xs">Browse jobs and click the bookmark icon to save them here.</p>
            <Link href="/" className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all">
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {jobs.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
        )}
      </div>
    </div>
  );
}
