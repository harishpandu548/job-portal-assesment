import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "JobNest – Find Your Next Opportunity", template: "%s | JobNest" },
  description: "Discover thousands of tech jobs at world-class companies. Find remote, hybrid, and onsite roles in engineering, design, product, and more.",
  keywords: ["jobs", "tech jobs", "software engineer", "remote work", "job board"],
  openGraph: {
    type: "website",
    title: "JobNest – Find Your Next Opportunity",
    description: "Modern job board for tech professionals",
    siteName: "JobNest",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#0a0a0f] text-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: "#13131f",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#f0f0f5",
            },
          }}
        />
      </body>
    </html>
  );
}
