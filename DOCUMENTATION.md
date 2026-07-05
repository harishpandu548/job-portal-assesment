# JobNest: Platform Features & Architecture

Hey there! If you're looking to understand what we've built into this job board platform, you're in the right place. I've broken down all the core features, how they work, and why they were built this way. 

This isn't just a basic CRUD app—we spent a lot of time on performance, UX, and making sure it feels like a premium SaaS product.

---

## 1. The Core Job Search Experience
The heart of the application is the job discovery flow. We wanted finding a job to feel lightning fast and highly visual.

* **Advanced Filtering:** Users can filter through jobs by keyword, category, work mode (Remote, Hybrid, On-site), job type (Full-time, Contract), and experience level. The URL updates automatically, making searches easily shareable.
* **Pagination:** Instead of dumping hundreds of jobs onto a single page, we built a smooth pagination system that loads 12 jobs per page.
* **Category Browse:** On the homepage, there's a quick-access category section. The numbers you see there (e.g., "150 Engineering jobs") aren't hardcoded; they are generated in real-time by querying the database.

## 2. Ultra-Fast Performance (Skeleton States)
Because the database is hosted on Neon (Serverless Postgres) in the US, fetching data from India natively has some latency. 
* **The Fix:** We implemented Next.js `loading.tsx` skeleton states. The millisecond you click a job or refresh the page, the UI instantly renders the layout with animated placeholders. It completely masks the database latency and makes the app feel incredibly snappy.

## 3. Saving & Bookmarking Jobs
Not everyone is ready to apply immediately. 
* **Local State Persistence:** Users can click the bookmark icon on any job card to save it. We used a custom `useSavedJobs` hook that ties into `localStorage` using React's `useSyncExternalStore`. 
* **Dedicated Dashboard:** There's a dedicated `/saved-jobs` page where users can manage everything they've bookmarked. The state syncs across tabs instantly without needing a full backend user authentication system.

## 4. The Application Flow
We didn't want users spamming applications or getting confused if their application went through.
* **Apply Button State:** When you fill out the application form and hit submit, the data goes straight into our Postgres database. 
* **Smart UI Feedback:** We save that specific `jobId` to local storage. If you revisit the same job page later, the "Apply Now" button physically changes to a disabled "Application Submitted" state. 

## 5. Premium UI & Animations
The aesthetic was a major focus. We avoided the "boring corporate" look.
* **Framer Motion:** Almost everything on the page is animated. The hero section staggers in, the job cards slide up smoothly as you scroll, and buttons have physical press/scale physics when clicked.
* **Brand Logos:** Instead of generic text avatars, we mapped real companies (like Flipkart, Swiggy, Zomato, Razorpay) to high-quality Lucide icons with their actual brand colors. 
* **Gradients & Glassmorphism:** We used deep violet and cyan glowing gradients to give the buttons and featured cards a modern, Web3/SaaS feel.

## 6. Admin Dashboard
There is a full backend interface at `/dashboard/jobs` designed for recruiters or admins.
* **Full CRUD:** You can create new job postings, edit existing ones, and delete them. The forms are protected and validated on both the client and server using `Zod` and `react-hook-form`.

## 7. Database & Infrastructure
* **Neon PostgreSQL & Prisma:** The entire backend runs on a serverless Postgres instance. 
* **Massive Seed Script:** We wrote a custom TypeScript seeder (`prisma/seed.ts`) that programmatically generated over 550 realistic Indian tech jobs across all categories (Engineering, Marketing, Support, etc.) complete with localized INR salaries (₹).
* **CI/CD Pipeline:** The repository is configured with a GitHub Actions pipeline. On every push to `main`, it caches the Next.js build, installs dependencies, validates the Prisma schema, runs the linter, and tests the build before it ever reaches production.

---

### Tech Stack Summary
If you're looking at the code, here's what we used to put this all together:
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS + custom glassmorphism utilities
- **Database:** PostgreSQL (Neon) + Prisma ORM
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **CI/CD:** GitHub Actions (ready for Vercel deployment)
