import Link from "next/link";
import { getAllJobs, getAllApplications } from "@/lib/queries";

export const dynamic = "force-dynamic";
import { formatDate, JOB_TYPE_LABELS, WORK_MODE_LABELS } from "@/lib/utils";
import { Plus, Briefcase, Users, TrendingUp, Edit2, Trash2, Eye } from "lucide-react";
import DeleteJobButton from "@/components/dashboard/DeleteJobButton";

export const metadata = { title: "Dashboard – Manage Jobs" };

export default async function DashboardJobsPage() {
  const [jobs, applications] = await Promise.all([getAllJobs(), getAllApplications()]);

  const stats = [
    { label: "Total Jobs", value: jobs.length, icon: Briefcase, color: "text-violet-400" },
    { label: "Applications", value: applications.length, icon: Users, color: "text-emerald-400" },
    { label: "Published", value: jobs.filter((j) => j.isPublished).length, icon: TrendingUp, color: "text-blue-400" },
    { label: "Featured", value: jobs.filter((j) => j.isFeatured).length, icon: TrendingUp, color: "text-amber-400" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Job Dashboard</h1>
            <p className="text-white/40 text-sm">Manage your job listings and applications</p>
          </div>
          <Link
            href="/dashboard/jobs/new"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all shadow-lg shadow-violet-900/30"
          >
            <Plus className="w-4 h-4" /> Post New Job
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
              <s.icon className={`w-5 h-5 ${s.color} mb-3`} />
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-white/40 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Jobs table */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
          <div className="p-5 border-b border-white/[0.06]">
            <h2 className="text-white font-semibold">All Jobs</h2>
          </div>
          {jobs.length === 0 ? (
            <div className="py-16 text-center text-white/30 text-sm">No jobs yet. Post your first one!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.05]">
                    {["Job", "Company", "Type", "Mode", "Status", "Posted", "Actions"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-medium text-white/30 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-white">{job.title}</p>
                        <p className="text-xs text-white/30 mt-0.5">{job.location}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-white/60">{job.company}</td>
                      <td className="px-5 py-4 text-xs text-white/50">{JOB_TYPE_LABELS[job.jobType]}</td>
                      <td className="px-5 py-4 text-xs text-white/50">{WORK_MODE_LABELS[job.workMode]}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border ${job.isPublished ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-white/5 text-white/40 border-white/10"}`}>
                          {job.isPublished ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-white/30">{formatDate(job.createdAt)}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link href={`/jobs/${job.slug}`} className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all">
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <Link href={`/dashboard/jobs/${job.id}/edit`} className="p-1.5 rounded-lg text-white/30 hover:text-violet-400 hover:bg-violet-500/10 transition-all">
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>
                          <DeleteJobButton jobId={job.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Applications */}
        {applications.length > 0 && (
          <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
            <div className="p-5 border-b border-white/[0.06]">
              <h2 className="text-white font-semibold">Recent Applications</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.05]">
                    {["Applicant", "Job", "Email", "Applied"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-medium text-white/30 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {applications.slice(0, 10).map((app) => (
                    <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4 text-sm font-medium text-white">{app.fullName}</td>
                      <td className="px-5 py-4 text-sm text-white/60">{app.job.title}</td>
                      <td className="px-5 py-4 text-xs text-white/40">{app.email}</td>
                      <td className="px-5 py-4 text-xs text-white/30">{formatDate(app.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
