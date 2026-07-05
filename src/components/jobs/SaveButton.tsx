"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import { cn } from "@/lib/utils";

export default function SaveButton({ jobId }: { jobId: string }) {
  const { isSaved, toggle } = useSavedJobs(jobId);

  return (
    <button
      onClick={() => toggle()}
      className={cn(
        "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200",
        isSaved
          ? "bg-amber-500/20 border-amber-500/30 text-amber-400 hover:bg-amber-500/30"
          : "bg-white/[0.03] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.07] hover:border-white/20"
      )}
    >
      {isSaved ? (
        <><BookmarkCheck className="w-4 h-4" /> Saved</>
      ) : (
        <><Bookmark className="w-4 h-4" /> Save Job</>
      )}
    </button>
  );
}
