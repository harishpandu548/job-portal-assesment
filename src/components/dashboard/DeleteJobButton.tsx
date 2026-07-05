"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteJob } from "@/lib/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteJobButton({ jobId }: { jobId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Delete this job? This action cannot be undone.")) return;
    setLoading(true);
    const result = await deleteJob(jobId);
    if (result.success) {
      toast.success("Job deleted");
      router.refresh();
    } else {
      toast.error("Failed to delete job");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
    >
      {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
    </button>
  );
}
