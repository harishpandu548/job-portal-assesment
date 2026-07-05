"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  };

  return (
    <section className="relative pt-28 pb-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-violet-600/[0.08] rounded-full blur-[120px]" 
        />
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-blue-600/[0.07] rounded-full blur-[80px]" 
        />
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          className="absolute top-20 right-1/4 w-[250px] h-[250px] bg-emerald-600/[0.05] rounded-full blur-[80px]" 
        />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center"
      >
        {/* Pill badge */}
        <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/40 bg-violet-500/15 text-violet-300 text-xs font-medium mb-8 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>120+ Top Indian Tech Jobs added today</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={item} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none mb-6">
          <span className="text-white">Find your</span>
          <br />
          <span className="gradient-text">next opportunity</span>
        </motion.h1>

        <motion.p variants={item} className="text-white/40 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover top-tier engineering, design, and product roles at world-class companies in India.
          Remote & Hybrid. Curated daily.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#jobs"
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-blue-600 text-white font-bold transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(217,70,239,0.6)]"
          >
            Browse Jobs
            <ArrowRight className="w-4 h-4" />
          </motion.a>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/dashboard/jobs/new"
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl border border-white/20 hover:border-white/40 bg-white/[0.05] hover:bg-white/[0.1] text-white/80 hover:text-white font-semibold transition-all duration-200"
            >
              Post a Job
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating tags */}
        <motion.div variants={item} className="mt-14 flex flex-wrap justify-center gap-2">
          {["Bengaluru", "Remote", "React", "Node.js", "Senior", "Swiggy", "Cred", "Unicorn", "Design"].map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs text-white/40 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
