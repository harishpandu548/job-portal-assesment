"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Send, CheckCircle, CheckCircle2 } from "lucide-react";
import { applicationSchema, ApplicationFormData } from "@/lib/validations";
import { submitApplication } from "@/lib/actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const APPLIED_KEY = "jobnest_applied_jobs";

function getAppliedIds(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(APPLIED_KEY) || "[]"); } catch { return []; }
}
function markApplied(jobId: string) {
  const ids = getAppliedIds();
  if (!ids.includes(jobId)) localStorage.setItem(APPLIED_KEY, JSON.stringify([...ids, jobId]));
}

interface ApplyButtonProps {
  jobId: string;
  jobTitle: string;
  company: string;
}

export default function ApplyButton({ jobId, jobTitle, company }: ApplyButtonProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try { setHasApplied(getAppliedIds().includes(jobId)); } catch {}
    }, 0);
    return () => clearTimeout(timer);
  }, [jobId]);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ApplicationFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(applicationSchema) as any,
  });

  const onSubmit = async (data: ApplicationFormData) => {
    const result = await submitApplication(jobId, data);
    if (result.success) {
      setSubmitted(true);
      markApplied(jobId);
      setHasApplied(true);
      toast.success("Application submitted!", { description: "We'll be in touch soon." });
      reset();
    } else {
      toast.error("Failed to submit", { description: "Please try again." });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSubmitted(false), 300);
  };

  // Already applied state
  if (hasApplied) {
    return (
      <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-sm">
        <CheckCircle2 className="w-5 h-5" />
        Application Submitted
      </div>
    );
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-full" size="lg" variant="gradient">
        Apply Now
      </Button>

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {submitted ? (
            <div className="py-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-5">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Application Submitted!</h3>
              <p className="text-white/50 text-sm max-w-xs">
                Your application for <strong className="text-white">{jobTitle}</strong> at{" "}
                <strong className="text-white">{company}</strong> has been received.
              </p>
              <Button onClick={handleClose} variant="outline" className="mt-6">Close</Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Apply for {jobTitle}</DialogTitle>
                <DialogDescription>at {company} · Takes under 5 minutes</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Field label="Full Name *" error={errors.fullName?.message}>
                  <Input {...register("fullName")} placeholder="Rahul Sharma" />
                </Field>
                <Field label="Email Address *" error={errors.email?.message}>
                  <Input {...register("email")} type="email" placeholder="rahul@example.com" />
                </Field>
                <Field label="Phone Number" error={errors.phone?.message}>
                  <Input {...register("phone")} type="tel" placeholder="+91 98765 43210" />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Portfolio / LinkedIn" error={errors.portfolioUrl?.message}>
                    <Input {...register("portfolioUrl")} placeholder="https://..." />
                  </Field>
                  <Field label="Resume URL" error={errors.resumeUrl?.message}>
                    <Input {...register("resumeUrl")} placeholder="https://..." />
                  </Field>
                </div>
                <Field label="Cover Note" error={errors.coverLetter?.message}>
                  <Textarea
                    {...register("coverLetter")}
                    rows={4}
                    placeholder="Tell us why you're a great fit for this role…"
                  />
                </Field>
                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={handleClose} className="flex-1">Cancel</Button>
                  <Button type="submit" disabled={isSubmitting} className="flex-1 gap-2" variant="gradient">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {isSubmitting ? "Submitting…" : "Submit Application"}
                  </Button>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
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
