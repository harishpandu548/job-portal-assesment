import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSalary(min?: number | null, max?: number | null, currency = "INR"): string {
  if (!min && !max) return "Salary not disclosed";
  const fmt = (n: number) => {
    if (currency === "INR") {
      if (n >= 100000) return `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`;
      return `₹${n.toLocaleString("en-IN")}`;
    }
    return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);
  };
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max!)}`;
}

export function formatDate(date: Date | string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatFullDate(date: Date | string): string {
  return format(new Date(date), "MMM d, yyyy");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
  FREELANCE: "Freelance",
};

export const WORK_MODE_LABELS: Record<string, string> = {
  REMOTE: "Remote",
  HYBRID: "Hybrid",
  ONSITE: "On-site",
};

export const EXPERIENCE_LABELS: Record<string, string> = {
  ENTRY: "Entry Level",
  MID: "Mid Level",
  SENIOR: "Senior",
  LEAD: "Lead",
  EXECUTIVE: "Executive",
};

export const CATEGORY_LABELS: Record<string, string> = {
  ENGINEERING: "Engineering",
  DESIGN: "Design",
  PRODUCT: "Product",
  MARKETING: "Marketing",
  DATA_SCIENCE: "Data Science",
  DEVOPS: "DevOps",
  QA: "QA & Testing",
  SUPPORT: "Support",
  OPERATIONS: "Operations",
  OTHER: "Other",
};

export const WORK_MODE_COLORS: Record<string, string> = {
  REMOTE: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  HYBRID: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  ONSITE: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export const JOB_TYPE_COLORS: Record<string, string> = {
  FULL_TIME: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  PART_TIME: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  CONTRACT: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  INTERNSHIP: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  FREELANCE: "bg-teal-500/10 text-teal-400 border-teal-500/20",
};
