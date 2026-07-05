"use client";

import Link from "next/link";
import { Job } from "@prisma/client";
import { MapPin, Clock, DollarSign, Bookmark, BookmarkCheck, ArrowRight, Building2, ShoppingCart, Utensils, CreditCard, Send, Wallet, Code2 } from "lucide-react";
import { cn, formatSalary, formatDate, JOB_TYPE_LABELS, WORK_MODE_LABELS, WORK_MODE_COLORS, JOB_TYPE_COLORS } from "@/lib/utils";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import { motion } from "framer-motion";

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

const getCompanyIcon = (company: string) => {
  const name = company.toLowerCase();
  if (name.includes("flipkart")) return <ShoppingCart className="w-6 h-6 text-yellow-400" />;
  if (name.includes("swiggy") || name.includes("zomato")) return <Utensils className="w-6 h-6 text-orange-500" />;
  if (name.includes("razorpay")) return <CreditCard className="w-6 h-6 text-blue-500" />;
  if (name.includes("postman")) return <Send className="w-6 h-6 text-orange-500" />;
  if (name.includes("paytm")) return <Wallet className="w-6 h-6 text-blue-400" />;
  if (name.includes("infosys") || name.includes("tcs") || name.includes("wipro") || name.includes("tech mahindra")) {
    return <Code2 className="w-6 h-6 text-emerald-500" />;
  }
  return <Building2 className="w-5 h-5 text-white/50" />;
};

export default function JobCard({ job, featured }: JobCardProps) {
  const { isSaved, toggle } = useSavedJobs(job.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative rounded-2xl border overflow-hidden",
        featured
          ? "border-violet-500/40 bg-gradient-to-br from-violet-900/30 via-[#0f0f1a] to-blue-900/20 hover:border-violet-400 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
          : "border-white/[0.07] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
      )}
    >
      {featured && (
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-500/30 text-violet-200 border border-violet-500/50 tracking-wider uppercase shadow-[0_0_10px_rgba(139,92,246,0.5)]">
            Featured
          </span>
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:bg-white/10 transition-colors">
            {getCompanyIcon(job.company)}
          </div>
          <div className="flex-1 min-w-0 pr-8">
            <h3 className="font-semibold text-white text-base leading-tight truncate group-hover:text-violet-300 transition-colors">
              {job.title}
            </h3>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-white/60 text-xs font-medium truncate">{job.company}</span>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium border shadow-sm", WORK_MODE_COLORS[job.workMode])}>
            {WORK_MODE_LABELS[job.workMode]}
          </span>
          <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium border shadow-sm", JOB_TYPE_COLORS[job.jobType])}>
            {JOB_TYPE_LABELS[job.jobType]}
          </span>
        </div>

        {/* Meta */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-white/50 text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-xs font-medium">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="text-emerald-100/90">{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{formatDate(job.createdAt)}</span>
          </div>
        </div>

        {/* Skills */}
        {job.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {job.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="px-2.5 py-1 rounded-md text-[11px] font-medium text-blue-200/70 bg-blue-500/10 border border-blue-500/20">
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="px-2.5 py-1 rounded-md text-[11px] font-medium text-white/40 bg-white/5 border border-white/10">
                +{job.skills.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          <Link
            href={`/jobs/${job.slug}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all duration-200 shadow-lg shadow-violet-900/30 group/btn"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => toggle()}
            className={cn(
              "w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-200 shadow-sm",
              isSaved
                ? "bg-amber-500/20 border-amber-500/50 text-amber-400 hover:bg-amber-500/30"
                : "bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20"
            )}
            aria-label={isSaved ? "Unsave job" : "Save job"}
          >
            {isSaved ? <BookmarkCheck className="w-5 h-5 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" /> : <Bookmark className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
