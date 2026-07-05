"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { jobSchema, JobFormData } from "@/lib/validations";
import { createJob, updateJob } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Job } from "@prisma/client";
import { cn } from "@/lib/utils";

interface JobFormProps {
  job?: Job;
}

const JOB_TYPES = ["FULL_TIME","PART_TIME","CONTRACT","INTERNSHIP","FREELANCE"];
const WORK_MODES = ["REMOTE","HYBRID","ONSITE"];
const EXP_LEVELS = ["ENTRY","MID","SENIOR","LEAD","EXECUTIVE"];
const CATEGORIES = ["ENGINEERING","DESIGN","PRODUCT","MARKETING","DATA_SCIENCE","DEVOPS","QA","SUPPORT","OPERATIONS","OTHER"];

export default function JobForm({ job }: JobFormProps) {
  const router = useRouter();
  const isEdit = !!job;

  const defaultValues: Partial<JobFormData> = job
    ? {
        ...job,
        responsibilities: job.responsibilities.join("\n"),
        requirements: job.requirements.join("\n"),
        benefits: job.benefits.join("\n"),
        skills: job.skills.join(", "),
        companyWebsite: job.companyWebsite || "",
        companyOverview: job.companyOverview || "",
        salaryMin: job.salaryMin ?? undefined,
        salaryMax: job.salaryMax ?? undefined,
      }
    : { currency: "USD", isFeatured: false, isPublished: true };

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<JobFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(jobSchema) as any,
    defaultValues,
  });

  const onSubmit = async (data: JobFormData) => {
    const result = isEdit ? await updateJob(job!.id, data) : await createJob(data);
    if (result.success) {
      toast.success(isEdit ? "Job updated!" : "Job posted!", { description: "Changes are live." });
      router.push("/dashboard/jobs");
    } else {
      toast.error("Something went wrong", { description: "Please check the form and try again." });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic info */}
      <FormSection title="Job Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Job Title *" error={errors.title?.message}>
            <Input {...register("title")} placeholder="e.g. Senior Frontend Developer" />
          </Field>
          <Field label="Company *" error={errors.company?.message}>
            <Input {...register("company")} placeholder="e.g. Stripe" />
          </Field>
          <Field label="Location *" error={errors.location?.message}>
            <Input {...register("location")} placeholder="e.g. Remote, New York, NY" />
          </Field>
          <Field label="Company Website" error={errors.companyWebsite?.message}>
            <Input {...register("companyWebsite")} placeholder="https://company.com" />
          </Field>
        </div>
      </FormSection>

      {/* Selects */}
      <FormSection title="Role Classification">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Field label="Work Mode *" error={errors.workMode?.message}>
            <Select value={watch("workMode")} onValueChange={(v) => setValue("workMode", v as JobFormData["workMode"])}>
              <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
              <SelectContent>
                {WORK_MODES.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Job Type *" error={errors.jobType?.message}>
            <Select value={watch("jobType")} onValueChange={(v) => setValue("jobType", v as JobFormData["jobType"])}>
              <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
              <SelectContent>
                {JOB_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Experience *" error={errors.experienceLevel?.message}>
            <Select value={watch("experienceLevel")} onValueChange={(v) => setValue("experienceLevel", v as JobFormData["experienceLevel"])}>
              <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
              <SelectContent>
                {EXP_LEVELS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Category *" error={errors.category?.message}>
            <Select value={watch("category")} onValueChange={(v) => setValue("category", v as JobFormData["category"])}>
              <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
        </div>
      </FormSection>

      {/* Salary */}
      <FormSection title="Compensation">
        <div className="grid grid-cols-3 gap-4">
          <Field label="Min Salary" error={errors.salaryMin?.message}>
            <Input {...register("salaryMin")} type="number" placeholder="e.g. 100000" />
          </Field>
          <Field label="Max Salary" error={errors.salaryMax?.message}>
            <Input {...register("salaryMax")} type="number" placeholder="e.g. 150000" />
          </Field>
          <Field label="Currency">
            <Input {...register("currency")} placeholder="USD" />
          </Field>
        </div>
      </FormSection>

      {/* Description */}
      <FormSection title="Description & Details">
        <Field label="Job Description *" error={errors.description?.message}>
          <Textarea {...register("description")} rows={5} placeholder="Describe the role, the team, and what makes this opportunity unique…" />
        </Field>
        <Field label="Responsibilities * (one per line)" error={errors.responsibilities?.message}>
          <Textarea {...register("responsibilities")} rows={4} placeholder={"Lead frontend architecture...\nMentor junior engineers..."} />
        </Field>
        <Field label="Requirements * (one per line)" error={errors.requirements?.message}>
          <Textarea {...register("requirements")} rows={4} placeholder={"5+ years React experience...\nStrong TypeScript skills..."} />
        </Field>
        <Field label="Benefits (one per line)" error={errors.benefits?.message}>
          <Textarea {...register("benefits")} rows={3} placeholder={"Competitive equity...\nRemote-friendly..."} />
        </Field>
        <Field label="Skills * (comma-separated)" error={errors.skills?.message}>
          <Input {...register("skills")} placeholder="React, TypeScript, Node.js, PostgreSQL" />
        </Field>
        <Field label="Company Overview" error={errors.companyOverview?.message}>
          <Textarea {...register("companyOverview")} rows={3} placeholder="Brief description of the company…" />
        </Field>
      </FormSection>

      {/* Toggles */}
      <FormSection title="Publication">
        <div className="flex gap-6">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input type="checkbox" {...register("isPublished")} className="w-4 h-4 rounded accent-violet-500" />
            <span className="text-sm text-white/70 group-hover:text-white transition-colors">Published</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input type="checkbox" {...register("isFeatured")} className="w-4 h-4 rounded accent-violet-500" />
            <span className="text-sm text-white/70 group-hover:text-white transition-colors">Featured</span>
          </label>
        </div>
      </FormSection>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="flex-1 gap-2" variant="gradient">
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSubmitting ? "Saving…" : isEdit ? "Update Job" : "Post Job"}
        </Button>
      </div>
    </form>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 space-y-4">
      <h3 className="text-white font-semibold text-sm pb-3 border-b border-white/[0.06]">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
