import Link from "next/link";
import { Zap, ExternalLink, Heart } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Browse Jobs", href: "/" },
    { label: "Saved Jobs", href: "/saved-jobs" },
    { label: "Post a Job", href: "/dashboard/jobs/new" },
    { label: "Dashboard", href: "/dashboard/jobs" },
  ],
  Categories: [
    { label: "Engineering", href: "/?category=ENGINEERING" },
    { label: "Design", href: "/?category=DESIGN" },
    { label: "Product", href: "/?category=PRODUCT" },
    { label: "Data Science", href: "/?category=DATA_SCIENCE" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#070710] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">Job<span className="text-violet-400">Nest</span></span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              The modern job board for software engineers and tech professionals. Find your next opportunity at world-class companies.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[ExternalLink, ExternalLink, ExternalLink].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white/80 font-semibold text-sm mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-white/40 text-sm hover:text-white/70 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} JobNest. Built for take-home assessment.
          </p>
          <p className="text-white/30 text-sm flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-red-400" /> using Next.js & Prisma
          </p>
        </div>
      </div>
    </footer>
  );
}
