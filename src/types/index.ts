import { Job, JobApplication } from "@prisma/client";

export type { Job, JobApplication };

export type JobWithMeta = Job & {
  _count?: { applications: number };
};

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

export interface PaginatedJobs {
  jobs: Job[];
  total: number;
  pages: number;
  page: number;
}
