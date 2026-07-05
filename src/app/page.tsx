import { Suspense } from "react";
import { getJobs, getFeaturedJobs, getJobsByCategory } from "@/lib/queries";

export const dynamic = "force-dynamic";
import SearchFilters from "@/components/jobs/SearchFilters";
import JobGrid from "@/components/jobs/JobGrid";
import { JobGridSkeleton } from "@/components/jobs/JobSkeleton";
import HeroSection from "@/components/home/HeroSection";
import CategoryBrowse from "@/components/home/CategoryBrowse";
import StatsBar from "@/components/home/StatsBar";

interface HomePageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    workMode?: string;
    jobType?: string;
    experienceLevel?: string;
    page?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);

  const [{ jobs, total, pages }, categoryCounts] = await Promise.all([
    getJobs({
      search: params.search,
      category: params.category,
      workMode: params.workMode,
      jobType: params.jobType,
      experienceLevel: params.experienceLevel,
      page,
      limit: 12,
    }),
    getJobsByCategory(),
  ]);

  const hasFilters = params.search || params.category || params.workMode || params.jobType || params.experienceLevel;

  return (
    <div className="min-h-screen">
      {!hasFilters && <HeroSection />}
      {!hasFilters && <StatsBar total={total} />}
      {!hasFilters && <CategoryBrowse counts={categoryCounts} />}

      <section className={hasFilters ? "pt-28 pb-20" : "py-16"} id="jobs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {!hasFilters && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-1">Latest Openings</h2>
              <p className="text-white/40 text-sm">Fresh opportunities added daily</p>
            </div>
          )}

          <div className="mb-6">
            <Suspense fallback={null}>
              <SearchFilters />
            </Suspense>
          </div>

          <Suspense fallback={<JobGridSkeleton />}>
            <JobGrid jobs={jobs} total={total} />
          </Suspense>

          {pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => {
                const sp = new URLSearchParams(params as Record<string, string>);
                sp.set("page", String(p));
                return (
                  <a
                    key={p}
                    href={`/?${sp.toString()}`}
                    className={`w-9 h-9 rounded-xl text-sm font-medium flex items-center justify-center transition-all ${
                      p === page
                        ? "bg-violet-600 text-white"
                        : "bg-white/[0.04] text-white/50 hover:bg-white/[0.08] hover:text-white border border-white/[0.07]"
                    }`}
                  >
                    {p}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
