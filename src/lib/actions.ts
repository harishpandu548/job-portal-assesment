"use server";

import { prisma } from "@/lib/prisma";
import { applicationSchema, jobSchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function submitApplication(jobId: string, formData: unknown) {
  const parsed = applicationSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors };
  }

  const { fullName, email, phone, portfolioUrl, resumeUrl, coverLetter } = parsed.data;

  try {
    await prisma.jobApplication.create({
      data: {
        jobId,
        fullName,
        email,
        phone: phone || null,
        portfolioUrl: portfolioUrl || null,
        resumeUrl: resumeUrl || null,
        coverLetter: coverLetter || null,
      },
    });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to submit application. Please try again." };
  }
}

export async function createJob(formData: unknown) {
  const parsed = jobSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors };
  }

  const { responsibilities, requirements, benefits, skills, ...rest } = parsed.data;

  const baseSlug = slugify(`${rest.title}-${rest.company}`);
  let slug = baseSlug;
  let counter = 1;
  while (await prisma.job.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }

  try {
    const job = await prisma.job.create({
      data: {
        ...rest,
        slug,
        responsibilities: responsibilities.split("\n").filter(Boolean),
        requirements: requirements.split("\n").filter(Boolean),
        benefits: benefits ? benefits.split("\n").filter(Boolean) : [],
        skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
        companyWebsite: rest.companyWebsite || null,
        companyOverview: rest.companyOverview || null,
        salaryMin: rest.salaryMin ?? null,
        salaryMax: rest.salaryMax ?? null,
      },
    });
    revalidatePath("/");
    revalidatePath("/jobs");
    return { success: true, slug: job.slug };
  } catch {
    return { success: false, error: "Failed to create job." };
  }
}

export async function updateJob(id: string, formData: unknown) {
  const parsed = jobSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors };
  }

  const { responsibilities, requirements, benefits, skills, ...rest } = parsed.data;

  try {
    const job = await prisma.job.update({
      where: { id },
      data: {
        ...rest,
        responsibilities: responsibilities.split("\n").filter(Boolean),
        requirements: requirements.split("\n").filter(Boolean),
        benefits: benefits ? benefits.split("\n").filter(Boolean) : [],
        skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
        companyWebsite: rest.companyWebsite || null,
        companyOverview: rest.companyOverview || null,
        salaryMin: rest.salaryMin ?? null,
        salaryMax: rest.salaryMax ?? null,
      },
    });
    revalidatePath("/");
    revalidatePath(`/jobs/${job.slug}`);
    revalidatePath("/dashboard/jobs");
    return { success: true, slug: job.slug };
  } catch {
    return { success: false, error: "Failed to update job." };
  }
}

export async function deleteJob(id: string) {
  try {
    await prisma.job.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/dashboard/jobs");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete job." };
  }
}
