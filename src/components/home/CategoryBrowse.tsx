"use client";

import Link from "next/link";
import { Code2, Palette, Package, BarChart3, Cloud, FlaskConical, Headphones, Settings, Megaphone } from "lucide-react";
import { CATEGORY_LABELS } from "@/lib/utils";
import { motion } from "framer-motion";

const ICONS: Record<string, React.ElementType> = {
  ENGINEERING: Code2, DESIGN: Palette, PRODUCT: Package,
  DATA_SCIENCE: BarChart3, DEVOPS: Cloud, QA: FlaskConical,
  SUPPORT: Headphones, OPERATIONS: Settings, MARKETING: Megaphone,
};

const COLORS: Record<string, string> = {
  ENGINEERING: "from-violet-600/20 to-purple-600/10 border-violet-500/20 text-violet-400",
  DESIGN: "from-pink-600/20 to-rose-600/10 border-pink-500/20 text-pink-400",
  PRODUCT: "from-blue-600/20 to-cyan-600/10 border-blue-500/20 text-blue-400",
  DATA_SCIENCE: "from-amber-600/20 to-orange-600/10 border-amber-500/20 text-amber-400",
  DEVOPS: "from-emerald-600/20 to-teal-600/10 border-emerald-500/20 text-emerald-400",
  QA: "from-red-600/20 to-orange-600/10 border-red-500/20 text-red-400",
  SUPPORT: "from-sky-600/20 to-blue-600/10 border-sky-500/20 text-sky-400",
  OPERATIONS: "from-slate-600/20 to-gray-600/10 border-slate-500/20 text-slate-400",
  MARKETING: "from-fuchsia-600/20 to-purple-600/10 border-fuchsia-500/20 text-fuchsia-400",
};

interface CategoryBrowseProps {
  counts: { category: string; _count: { id: number } }[];
}

export default function CategoryBrowse({ counts }: CategoryBrowseProps) {
  const countMap = Object.fromEntries(counts.map((c) => [c.category, c._count.id]));

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    show: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Browse by Category</h2>
        <p className="text-white/40 text-sm">Explore roles across every discipline</p>
      </div>

      <motion.div 
        variants={container} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
      >
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
          const Icon = ICONS[key] || Code2;
          const color = COLORS[key] || COLORS.ENGINEERING;
          const count = countMap[key] || 0;

          return (
            <motion.div key={key} variants={item} whileHover={{ y: -5, scale: 1.02 }}>
              <Link
                href={`/?category=${key}`}
                className={`group h-full relative block p-4 rounded-2xl border bg-gradient-to-br transition-all duration-200 hover:shadow-lg ${color}`}
              >
                <Icon className="w-5 h-5 mb-3 opacity-80" />
                <p className="font-semibold text-white text-sm leading-tight">{label}</p>
                <p className="text-white/30 text-xs mt-0.5">{count} job{count !== 1 ? "s" : ""}</p>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
