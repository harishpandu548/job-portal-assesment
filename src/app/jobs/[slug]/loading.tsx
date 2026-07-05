import { Loader2 } from "lucide-react";

export default function JobDetailsLoading() {
  return (
    <div className="min-h-screen pt-28 pb-20 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8">
              <div className="flex gap-5 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-white/5"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-8 w-2/3 bg-white/5 rounded-xl"></div>
                  <div className="h-5 w-1/2 bg-white/5 rounded-lg"></div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-24 bg-white/5 rounded-lg"></div>
                <div className="h-10 w-32 bg-white/5 rounded-lg"></div>
                <div className="h-10 w-28 bg-white/5 rounded-lg"></div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8 space-y-4">
              <div className="h-6 w-40 bg-white/5 rounded-lg mb-4"></div>
              <div className="h-4 w-full bg-white/5 rounded-md"></div>
              <div className="h-4 w-5/6 bg-white/5 rounded-md"></div>
              <div className="h-4 w-4/6 bg-white/5 rounded-md"></div>
            </div>
          </div>
          
          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
              <div className="h-6 w-32 bg-white/5 rounded-lg mb-6"></div>
              <div className="h-12 w-full bg-violet-500/20 rounded-xl mb-3"></div>
              <div className="h-12 w-full bg-white/5 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
