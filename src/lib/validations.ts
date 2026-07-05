import { z } from "zod";

export const applicationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  portfolioUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  resumeUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  coverLetter: z
    .string()
    .min(50, "Cover note must be at least 50 characters")
    .max(2000, "Cover note must be under 2000 characters")
    .optional()
    .or(z.literal("")),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

export const jobSchema = z.object({
  title: z.string().min(3, "Title is required"),
  company: z.string().min(2, "Company name is required"),
  location: z.string().min(2, "Location is required"),
  workMode: z.enum(["REMOTE", "HYBRID", "ONSITE"]),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "FREELANCE"]),
  experienceLevel: z.enum(["ENTRY", "MID", "SENIOR", "LEAD", "EXECUTIVE"]),
  category: z.enum([
    "ENGINEERING", "DESIGN", "PRODUCT", "MARKETING",
    "DATA_SCIENCE", "DEVOPS", "QA", "SUPPORT", "OPERATIONS", "OTHER",
  ]),
  salaryMin: z.coerce.number().min(0).optional(),
  salaryMax: z.coerce.number().min(0).optional(),
  currency: z.string().default("USD"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  responsibilities: z.string(),
  requirements: z.string(),
  benefits: z.string().optional(),
  skills: z.string(),
  companyOverview: z.string().optional(),
  companyWebsite: z.string().url().optional().or(z.literal("")),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
});

export type JobFormData = z.infer<typeof jobSchema>;
