import { notFound } from "next/navigation";
import { getJobBySlug, getSimilarJobs } from "@/lib/queries";

export const dynamic = "force-dynamic";
import { formatSalary, formatFullDate, JOB_TYPE_LABELS, WORK_MODE_LABELS, EXPERIENCE_LABELS, CATEGORY_LABELS, WORK_MODE_COLORS, JOB_TYPE_COLORS } from "@/lib/utils";
import { MapPin, DollarSign, Calendar, Briefcase, Wifi, GraduationCap, Globe, Building2, CheckCircle2, Star, ShoppingCart, Utensils, CreditCard, Send, Wallet, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ApplyButton from "@/components/jobs/ApplyButton";
import SaveButton from "@/components/jobs/SaveButton";
import JobCard from "@/components/jobs/JobCard";
import type { Metadata } from "next";

interface JobPageProps {
  params: Promise<{ slug: string }>;
}

const getCompanyIcon = (company: string) => {
  const name = company.toLowerCase();
  if (name.includes("flipkart")) return <ShoppingCart className="w-8 h-8 text-yellow-400" />;
  if (name.includes("swiggy") || name.includes("zomato")) return <Utensils className="w-8 h-8 text-orange-500" />;
  if (name.includes("razorpay")) return <CreditCard className="w-8 h-8 text-blue-500" />;
  if (name.includes("postman")) return <Send className="w-8 h-8 text-orange-500" />;
  if (name.includes("paytm")) return <Wallet className="w-8 h-8 text-blue-400" />;
  if (name.includes("infosys") || name.includes("tcs") || name.includes("wipro") || name.includes("tech mahindra")) {
    return <Code2 className="w-8 h-8 text-emerald-500" />;
  }
  return <Building2 className="w-8 h-8 text-white/50" />;
};

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return { title: "Job Not Found" };
  return {
    title: `${job.title} at ${job.company}`,
    description: job.description.slice(0, 160),
  };
}

export default async function JobDetailPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  const similar = await getSimilarJobs(job.id, job.category, 3);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header card */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center shadow-xl">
                  {getCompanyIcon(job.company)}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white leading-tight mb-1">{job.title}</h1>
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">{job.company}</span>
                    {job.companyWebsite && (
                      <>
                        <span>·</span>
                        <a href={job.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 flex items-center gap-1">
                          <Globe className="w-3 h-3" /> Website
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className={cn("inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border", WORK_MODE_COLORS[job.workMode])}>
                  <Wifi className="w-3 h-3 mr-1.5" />{WORK_MODE_LABELS[job.workMode]}
                </span>
                <span className={cn("inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border", JOB_TYPE_COLORS[job.jobType])}>
                  <Briefcase className="w-3 h-3 mr-1.5" />{JOB_TYPE_LABELS[job.jobType]}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border border-white/10 bg-white/5 text-white/60">
                  <GraduationCap className="w-3 h-3 mr-1.5" />{EXPERIENCE_LABELS[job.experienceLevel]}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border border-white/10 bg-white/5 text-white/60">
                  {CATEGORY_LABELS[job.category]}
                </span>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2 text-white/50">
                  <MapPin className="w-4 h-4 text-white/30" /> {job.location}
                </div>
                <div className="flex items-center gap-2 text-white/50">
                  <DollarSign className="w-4 h-4 text-white/30" />
                  {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                </div>
                <div className="flex items-center gap-2 text-white/50">
                  <Calendar className="w-4 h-4 text-white/30" /> {formatFullDate(job.createdAt)}
                </div>
              </div>
            </div>

            {/* Description */}
            <Section title="About the Role">
              <p className="text-white/60 text-sm leading-relaxed">{job.description}</p>
            </Section>

            {/* Responsibilities */}
            {job.responsibilities.length > 0 && (
              <Section title="Responsibilities">
                <ul className="space-y-2.5">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/60 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* Requirements */}
            {job.requirements.length > 0 && (
              <Section title="Requirements">
                <ul className="space-y-2.5">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/60 text-sm">
                      <Star className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* Benefits */}
            {job.benefits.length > 0 && (
              <Section title="Benefits & Perks">
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map((b, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                      {b}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {/* Company */}
            {job.companyOverview && (
              <Section title={`About ${job.company}`}>
                <p className="text-white/60 text-sm leading-relaxed">{job.companyOverview}</p>
              </Section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="sticky top-24">
              {/* Apply card */}
              <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-900/20 to-blue-900/10 p-5 mb-4">
                <h3 className="text-white font-semibold mb-1">Ready to apply?</h3>
                <p className="text-white/40 text-xs mb-4">Takes less than 5 minutes</p>
                <ApplyButton jobId={job.id} jobTitle={job.title} company={job.company} />
                <div className="mt-3">
                  <SaveButton jobId={job.id} />
                </div>
              </div>

              {/* Skills card */}
              {job.skills.length > 0 && (
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <h3 className="text-white/80 font-semibold text-sm mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((s) => (
                      <span key={s} className="px-3 py-1.5 rounded-xl text-xs text-violet-300 bg-violet-500/10 border border-violet-500/20">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Jobs */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-white mb-6">Similar Opportunities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {similar.map((j) => <JobCard key={j.id} job={j} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
      <h2 className="text-white font-semibold text-base mb-4 pb-3 border-b border-white/[0.06]">{title}</h2>
      {children}
    </div>
  );
}
