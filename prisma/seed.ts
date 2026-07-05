import { PrismaClient, JobType, WorkMode, ExperienceLevel, JobCategory } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import * as dotenv from "dotenv";
dotenv.config();

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

const indianCities = [
  "Bengaluru, Karnataka", "Hyderabad, Telangana", "Pune, Maharashtra", 
  "Mumbai, Maharashtra", "Gurugram, Haryana", "Noida, Uttar Pradesh", 
  "Chennai, Tamil Nadu", "Remote, India"
];

const companies = [
  { name: "Flipkart", website: "https://flipkart.com", overview: "India's leading e-commerce marketplace." },
  { name: "Swiggy", website: "https://swiggy.com", overview: "India's largest convenience delivery platform." },
  { name: "Zomato", website: "https://zomato.com", overview: "Discover great places to eat around you." },
  { name: "Cred", website: "https://cred.club", overview: "A members-only club that rewards individuals for their timely credit card bill payments." },
  { name: "Razorpay", website: "https://razorpay.com", overview: "Payment gateway for India." },
  { name: "Freshworks", website: "https://freshworks.com", overview: "Customer service software." },
  { name: "Postman", website: "https://postman.com", overview: "API platform for building and using APIs." },
  { name: "BrowserStack", website: "https://browserstack.com", overview: "Software testing platform." },
  { name: "Paytm", website: "https://paytm.com", overview: "India's leading digital payments and financial services company." },
  { name: "Ola", website: "https://olacabs.com", overview: "Ride-sharing company." },
  { name: "Infosys", website: "https://infosys.com", overview: "Global leader in next-generation digital services and consulting." },
  { name: "TCS", website: "https://tcs.com", overview: "IT services, consulting and business solutions organization." },
  { name: "Wipro", website: "https://wipro.com", overview: "Global information technology, consulting and business process services company." },
  { name: "Tech Mahindra", website: "https://techmahindra.com", overview: "Digital transformation, consulting and business re-engineering services." },
  { name: "HCLTech", website: "https://hcltech.com", overview: "Global technology company." },
];

const jobTemplates = [
  {
    titlePrefixes: ["Senior", "Lead", "Staff", ""],
    titleBase: "Frontend Developer",
    category: JobCategory.ENGINEERING,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
    desc: "Join our fast-paced engineering team to build scalable frontend applications used by millions in India.",
    resp: ["Develop interactive UIs", "Optimize application for maximum speed", "Collaborate with cross-functional teams", "Participate in code reviews"],
    req: ["Experience with React and TypeScript", "Strong understanding of web vitals", "Problem-solving skills"],
    baseMin: 1200000, baseMax: 2500000
  },
  {
    titlePrefixes: ["Backend", "Senior Backend", "Principal Backend", ""],
    titleBase: "Engineer",
    category: JobCategory.ENGINEERING,
    skills: ["Node.js", "Express", "PostgreSQL", "Redis", "AWS", "Go"],
    desc: "Design and develop high-performance backend systems and APIs to power our core products.",
    resp: ["Build robust REST/GraphQL APIs", "Database schema design", "Microservices architecture", "Performance tuning"],
    req: ["Strong programming fundamentals", "Experience with Node.js or Go", "SQL/NoSQL expertise", "AWS knowledge"],
    baseMin: 1500000, baseMax: 3500000
  },
  {
    titlePrefixes: ["Full Stack", "Senior Full Stack", "Lead Full Stack", ""],
    titleBase: "Developer",
    category: JobCategory.ENGINEERING,
    skills: ["MERN Stack", "React", "Node.js", "MongoDB", "AWS"],
    desc: "End-to-end product development involving both client and server-side architecture.",
    resp: ["Design client-side and server-side architecture", "Build the front-end of applications", "Manage databases and servers", "Write effective APIs"],
    req: ["Proven experience as a Full Stack Developer", "Knowledge of multiple front-end languages", "Familiarity with databases, web servers, and UI/UX design"],
    baseMin: 1400000, baseMax: 3000000
  },
  {
    titlePrefixes: ["DevOps", "Senior DevOps", "Cloud", "SRE"],
    titleBase: "Engineer",
    category: JobCategory.DEVOPS,
    skills: ["Kubernetes", "Docker", "AWS", "Terraform", "CI/CD", "Linux"],
    desc: "Maintain and scale our cloud infrastructure ensuring high availability and secure deployments.",
    resp: ["Manage cloud infrastructure", "Automate CI/CD pipelines", "Monitor system performance", "Implement security best practices"],
    req: ["Experience with AWS/GCP/Azure", "Strong Linux administration skills", "Proficiency with Kubernetes and Docker"],
    baseMin: 1600000, baseMax: 3500000
  },
  {
    titlePrefixes: ["Data", "Senior Data", "Principal Data", "Machine Learning"],
    titleBase: "Scientist",
    category: JobCategory.DATA_SCIENCE,
    skills: ["Python", "TensorFlow", "PyTorch", "SQL", "Machine Learning", "Data Analysis"],
    desc: "Leverage massive datasets to build predictive models and drive data-driven decision making.",
    resp: ["Analyze large amounts of information", "Build machine learning models", "Collaborate with engineering and product teams", "Present information using data visualization techniques"],
    req: ["Experience in data mining", "Understanding of machine learning algorithms", "Knowledge of R, Python, and SQL"],
    baseMin: 1800000, baseMax: 4000000
  },
  {
    titlePrefixes: ["Product", "Senior Product", "Group Product", ""],
    titleBase: "Manager",
    category: JobCategory.PRODUCT,
    skills: ["Product Strategy", "Agile", "User Research", "Data Analytics", "Roadmapping"],
    desc: "Lead product development lifecycle from ideation to launch, focusing on user experience and business impact.",
    resp: ["Define product vision and strategy", "Create product roadmaps", "Gather and analyze feedback", "Coordinate with engineering, design, and marketing teams"],
    req: ["Proven track record of managing all aspects of a successful product", "Strong problem-solving skills", "Excellent written and verbal communication"],
    baseMin: 1500000, baseMax: 3500000
  },
  {
    titlePrefixes: ["UI/UX", "Senior UI/UX", "Product", "Lead"],
    titleBase: "Designer",
    category: JobCategory.DESIGN,
    skills: ["Figma", "Prototyping", "User Research", "Wireframing", "Adobe Creative Suite"],
    desc: "Create beautiful, intuitive, and user-centric interfaces for our web and mobile applications.",
    resp: ["Gather and evaluate user requirements", "Illustrate design ideas", "Develop UI mockups and prototypes", "Create original graphic designs"],
    req: ["Proven work experience as a UI/UX Designer", "Portfolio of design projects", "Knowledge of wireframe tools"],
    baseMin: 1000000, baseMax: 2200000
  },
  {
    titlePrefixes: ["QA", "Senior QA", "Automation QA", ""],
    titleBase: "Engineer",
    category: JobCategory.QA,
    skills: ["Selenium", "Cypress", "Appium", "Java", "Python", "API Testing"],
    desc: "Ensure the quality of our software products through rigorous automated and manual testing.",
    resp: ["Create detailed, comprehensive and well-structured test plans", "Design, develop and execute automation scripts", "Identify, record, document thoroughly and track bugs"],
    req: ["Proven work experience in software quality assurance", "Strong knowledge of software QA methodologies", "Experience with automated testing tools"],
    baseMin: 800000, baseMax: 1800000
  },
  {
    titlePrefixes: ["Customer", "Technical", "Senior", "Lead"],
    titleBase: "Support Engineer",
    category: JobCategory.SUPPORT,
    skills: ["Zendesk", "Jira", "Linux", "Troubleshooting", "SQL", "APIs"],
    desc: "Provide world-class technical support to our enterprise customers.",
    resp: ["Diagnose and troubleshoot technical issues", "Track computer system issues through to resolution", "Talk clients through a series of actions"],
    req: ["Proven work experience as a Technical Support Engineer", "Good understanding of computer systems", "Excellent problem-solving skills"],
    baseMin: 600000, baseMax: 1500000
  },
  {
    titlePrefixes: ["Business", "Sales", "Revenue", "Senior"],
    titleBase: "Operations Manager",
    category: JobCategory.OPERATIONS,
    skills: ["Salesforce", "Process Optimization", "Excel", "Data Analysis", "Strategy"],
    desc: "Streamline our business operations and optimize revenue generation workflows.",
    resp: ["Manage daily business operations", "Analyze workflow and efficiency", "Develop new business strategies", "Coordinate with different departments"],
    req: ["Experience in business operations or management", "Strong analytical and problem-solving skills", "Excellent leadership abilities"],
    baseMin: 1000000, baseMax: 2500000
  },
  {
    titlePrefixes: ["Digital", "Growth", "Product", "Senior"],
    titleBase: "Marketing Manager",
    category: JobCategory.MARKETING,
    skills: ["SEO", "Google Analytics", "Content Strategy", "Social Media", "Paid Ads"],
    desc: "Drive user acquisition and brand awareness through innovative marketing campaigns.",
    resp: ["Develop and implement marketing strategies", "Manage digital marketing campaigns", "Analyze performance metrics", "Collaborate with content creators"],
    req: ["Proven experience in digital marketing", "Strong analytical skills", "Creative mindset"],
    baseMin: 800000, baseMax: 2000000
  }
];

const generateJobs = (count: number) => {
  const generated = [];
  const slugs = new Set();

  for (let i = 0; i < count; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const city = indianCities[Math.floor(Math.random() * indianCities.length)];
    const template = jobTemplates[Math.floor(Math.random() * jobTemplates.length)];
    const prefix = template.titlePrefixes[Math.floor(Math.random() * template.titlePrefixes.length)];
    
    const title = prefix ? `${prefix} ${template.titleBase}` : template.titleBase;
    
    const slugBase = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${company.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    let slug = slugBase;
    let counter = 1;
    while (slugs.has(slug)) {
      slug = `${slugBase}-${counter++}`;
    }
    slugs.add(slug);

    // Randomize salary based on experience prefix
    let salaryMultiplier = 1;
    if (prefix.includes("Senior")) salaryMultiplier = 1.3;
    if (prefix.includes("Lead") || prefix.includes("Principal") || prefix.includes("Group")) salaryMultiplier = 1.6;
    if (prefix.includes("Staff")) salaryMultiplier = 1.8;

    const minSalary = Math.floor((template.baseMin * salaryMultiplier) / 100000) * 100000;
    const maxSalary = Math.floor((template.baseMax * salaryMultiplier) / 100000) * 100000;

    let workMode: WorkMode = WorkMode.HYBRID;
    if (city === "Remote, India") workMode = WorkMode.REMOTE;
    else if (Math.random() > 0.7) workMode = WorkMode.ONSITE;
    else if (Math.random() > 0.8) workMode = WorkMode.REMOTE;

    let expLevel: ExperienceLevel = ExperienceLevel.MID;
    if (prefix.includes("Senior") || prefix.includes("Staff")) expLevel = ExperienceLevel.SENIOR;
    else if (prefix.includes("Lead") || prefix.includes("Principal")) expLevel = ExperienceLevel.LEAD;
    else if (Math.random() > 0.8) expLevel = ExperienceLevel.ENTRY;

    let jobType: JobType = JobType.FULL_TIME;
    if (Math.random() > 0.9) jobType = JobType.CONTRACT;

    generated.push({
      title,
      slug,
      company: company.name,
      companyOverview: company.overview,
      companyWebsite: company.website,
      location: city,
      workMode,
      jobType,
      experienceLevel: expLevel,
      salaryMin: minSalary,
      salaryMax: maxSalary,
      currency: "INR",
      category: template.category,
      isFeatured: Math.random() > 0.85,
      isPublished: true,
      description: template.desc,
      responsibilities: template.resp,
      requirements: template.req,
      benefits: [
        "Comprehensive health insurance (Family coverage)",
        "Provident Fund (PF) and Gratuity",
        "Flexible working hours",
        "Learning and development allowance (₹50,000/year)",
        "Internet and broadband reimbursement",
        "Annual offsites and team retreats"
      ],
      skills: [...template.skills].sort(() => 0.5 - Math.random()).slice(0, 4), // shuffle and take 4
    });
  }
  return generated;
};

async function main() {
  const TOTAL_JOBS = 550;
  console.log(`🌱 Generating ${TOTAL_JOBS} Indian jobs...`);
  const jobs = generateJobs(TOTAL_JOBS);

  console.log("🗑️  Clearing existing jobs...");
  await prisma.jobApplication.deleteMany();
  await prisma.job.deleteMany();

  console.log("🚀 Inserting new jobs (this might take a minute)...");
  let count = 0;
  for (const job of jobs) {
    await prisma.job.create({ data: job as Parameters<typeof prisma.job.create>[0]["data"] });
    count++;
    if (count % 50 === 0) console.log(`   Inserted ${count}/${TOTAL_JOBS}...`);
  }
  
  console.log(`✅ Successfully seeded ${jobs.length} Indian jobs across all categories.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
