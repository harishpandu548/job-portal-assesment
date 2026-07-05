"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const JOB_TYPES = [
  { value: "FULL_TIME", label: "Full-time" },
  { value: "PART_TIME", label: "Part-time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "INTERNSHIP", label: "Internship" },
  { value: "FREELANCE", label: "Freelance" },
];
const WORK_MODES = [
  { value: "REMOTE", label: "Remote" },
  { value: "HYBRID", label: "Hybrid" },
  { value: "ONSITE", label: "On-site" },
];
const EXP_LEVELS = [
  { value: "ENTRY", label: "Entry Level" },
  { value: "MID", label: "Mid Level" },
  { value: "SENIOR", label: "Senior" },
  { value: "LEAD", label: "Lead" },
  { value: "EXECUTIVE", label: "Executive" },
];
const CATEGORIES = [
  { value: "ENGINEERING", label: "Engineering" },
  { value: "DESIGN", label: "Design" },
  { value: "PRODUCT", label: "Product" },
  { value: "MARKETING", label: "Marketing" },
  { value: "DATA_SCIENCE", label: "Data Science" },
  { value: "DEVOPS", label: "DevOps" },
  { value: "QA", label: "QA & Testing" },
  { value: "SUPPORT", label: "Support" },
  { value: "OPERATIONS", label: "Operations" },
];

export default function SearchFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [showFilters, setShowFilters] = useState(false);

  const [search, setSearch] = useState(params.get("search") || "");
  const [jobType, setJobType] = useState(params.get("jobType") || "");
  const [workMode, setWorkMode] = useState(params.get("workMode") || "");
  const [expLevel, setExpLevel] = useState(params.get("experienceLevel") || "");
  const [category, setCategory] = useState(params.get("category") || "");

  const hasFilters = jobType || workMode || expLevel || category;

  const buildURL = useCallback(
    (overrides: Record<string, string>) => {
      const p = new URLSearchParams();
      const merged = { search, jobType, workMode, experienceLevel: expLevel, category, ...overrides };
      Object.entries(merged).forEach(([k, v]) => { if (v) p.set(k, v); });
      return `/?${p.toString()}`;
    },
    [search, jobType, workMode, expLevel, category]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => router.push(buildURL({ search })));
  };

  const handleFilter = (key: string, val: string) => {
    const map: Record<string, (v: string) => void> = {
      jobType: setJobType, workMode: setWorkMode, experienceLevel: setExpLevel, category: setCategory,
    };
    map[key]?.(val === "all" ? "" : val);
    startTransition(() => router.push(buildURL({ [key]: val === "all" ? "" : val })));
  };

  const clearAll = () => {
    setSearch(""); setJobType(""); setWorkMode(""); setExpLevel(""); setCategory("");
    startTransition(() => router.push("/"));
  };

  return (
    <div className="space-y-3">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jobs, companies, skills…"
          className="pl-11 pr-28 h-12 text-sm rounded-2xl border-white/10 bg-white/[0.03]"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all",
              showFilters || hasFilters
                ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                : "bg-white/[0.05] text-white/50 hover:text-white border border-white/[0.07]"
            )}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters {hasFilters ? "•" : ""}
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-all"
          >
            Search
          </button>
        </div>
      </form>

      {/* Filters panel */}
      {showFilters && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <Select value={category || "all"} onValueChange={(v) => handleFilter("category", v)}>
            <SelectTrigger className="h-10 text-xs"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={jobType || "all"} onValueChange={(v) => handleFilter("jobType", v)}>
            <SelectTrigger className="h-10 text-xs"><SelectValue placeholder="Job Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {JOB_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={workMode || "all"} onValueChange={(v) => handleFilter("workMode", v)}>
            <SelectTrigger className="h-10 text-xs"><SelectValue placeholder="Work Mode" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Modes</SelectItem>
              {WORK_MODES.map((m) => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={expLevel || "all"} onValueChange={(v) => handleFilter("experienceLevel", v)}>
            <SelectTrigger className="h-10 text-xs"><SelectValue placeholder="Experience" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {EXP_LEVELS.map((l) => <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>)}
            </SelectContent>
          </Select>

          {hasFilters && (
            <button onClick={clearAll} className="sm:col-span-4 flex items-center justify-center gap-1.5 text-xs text-white/40 hover:text-white/70 py-1 transition-colors">
              <X className="w-3 h-3" /> Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
