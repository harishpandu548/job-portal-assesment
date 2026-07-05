import { prisma } from "@/lib/prisma";
import { Prisma, JobCategory, JobType, WorkMode, ExperienceLevel } from "@prisma/client";

export interface JobFilters {
  search?: string;
  category?: string;
  workMode?: string;
  jobType?: string;
  experienceLevel?: string;
  location?: string;
  page?: number;
  limit?: number;
}

export async function getJobs(filters: JobFilters = {}) {
  const { search, category, workMode, jobType, experienceLevel, location, page = 1, limit = 12 } = filters;

  const where: Prisma.JobWhereInput = {
    isPublished: true,
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
        { skills: { hasSome: [search] } },
        { location: { contains: search, mode: "insensitive" } },
      ],
    }),
    ...(category && { category: category as JobCategory }),
    ...(workMode && { workMode: workMode as WorkMode }),
    ...(jobType && { jobType: jobType as JobType }),
    ...(experienceLevel && { experienceLevel: experienceLevel as ExperienceLevel }),
    ...(location && { location: { contains: location, mode: "insensitive" } }),
  };

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.job.count({ where }),
  ]);

  return { jobs, total, pages: Math.ceil(total / limit), page };
}

export async function getFeaturedJobs(limit = 6) {
  return prisma.job.findMany({
    where: { isPublished: true, isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getJobBySlug(slug: string) {
  return prisma.job.findUnique({ where: { slug } });
}

export async function getJobById(id: string) {
  return prisma.job.findUnique({ where: { id } });
}

export async function getSimilarJobs(jobId: string, category: JobCategory, limit = 4) {
  return prisma.job.findMany({
    where: { isPublished: true, category, id: { not: jobId } },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getJobsByCategory() {
  return prisma.job.groupBy({
    by: ["category"],
    where: { isPublished: true },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
  });
}

export async function getAllJobs() {
  return prisma.job.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getApplicationsByJobId(jobId: string) {
  return prisma.jobApplication.findMany({
    where: { jobId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAllApplications() {
  return prisma.jobApplication.findMany({
    include: { job: { select: { title: true, company: true, slug: true } } },
    orderBy: { createdAt: "desc" },
  });
}
