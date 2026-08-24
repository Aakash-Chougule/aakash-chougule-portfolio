import { useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  ArrowRight, ArrowUpRight, BadgeCheck, Code2, Database, Download, ExternalLink,
  Github, Images, Linkedin, Mail, MapPin, Menu, Phone, ShieldCheck, X
} from "lucide-react";
import {
  AnimatePresence, motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform
} from "motion/react";

type GalleryImage = {
  src: string;
  title: string;
  type: "real" | "concept";
};

type CaseStudy = {
  id: string;
  title: string;
  label: string;
  summary: string;
  problem: string;
  approach: string;
  outcomes: string[];
  tech: string[];
  repo: string;
  gallery: GalleryImage[];
};

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const nav = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Stack", "#stack"],
  ["Projects", "#projects"],
  ["GitHub", "#github"],
  ["Certificate", "#certificate"],
  ["Contact", "#contact"],
];

const experience = [
  {
    role: ".NET Developer",
    company: "Vakratund Solutions",
    location: "Pune",
    period: "Dec 2024 - Present",
    description:
      "Developing and maintaining ASP.NET Windows Forms, MVC, Web Application and Web API solutions for client-specific business operations, including REST APIs, JWT security, SQL-backed workflows, debugging and client-driven enhancements.",
    bullets: [
      "ASP.NET Windows Forms, MVC, Web Application and Web API",
      "REST API integration with SQL Server, MySQL and MS Access",
      "JWT authentication and authorization",
      "Vue.js and Tailwind CSS frontend integration",
      "Client requirement analysis, debugging and delivery",
    ],
  },
  {
    role: ".NET Developer Intern",
    company: "ReapMind Innovation Pvt. Ltd.",
    location: "Pune",
    period: "Jun 2024 - Dec 2024",
    description:
      "Developed features for ASP.NET Windows Forms, Web Application and MVC solutions, integrated SQL/MS Access databases, improved UI components and supported testing and debugging.",
    bullets: [
      "C# and ASP.NET development",
      "Windows Forms and MVC features",
      "SQL and MS Access database integration",
      "Debugging and UI improvements",
      "Development and QA collaboration",
    ],
  },
];

const stackGroups = [
  ["Backend", "C#", ".NET/.NET Framework", "ASP.NET Core", "ASP.NET MVC", "Web API", "REST APIs", "JWT", "BCrypt"],
  ["Desktop", "Windows Forms", "ADO.NET", "EF Core", "LINQ", "Validation", "Exception Handling"],
  ["Frontend", "React.js", "JavaScript", "HTML5", "CSS3", "Vue.js", "Tailwind CSS"],
  ["Data & DevOps", "PostgreSQL", "SQL Server", "MySQL", "MS Access", "Kafka", "Docker", "GitHub", "Postman", "Swagger", "Azure", "AWS ECS", "CI/CD"],
];

const caseStudies: CaseStudy[] = [
  {
    id: "enterprise",
    title: "Enterprise E-Commerce & Order Management System",
    label: "FLAGSHIP / REAL SCREENSHOTS",
    summary:
      "A production-minded full-stack commerce platform built to practice enterprise architecture, secure APIs, payment verification, business rules, asynchronous messaging and containerized delivery.",
    problem:
      "Move beyond basic CRUD by building a system where authentication, orders, GST, payments, data access, messaging and deployment concerns are handled as separate engineering responsibilities.",
    approach:
      "Clean Architecture with Domain, Application, Infrastructure and API layers; React client; PostgreSQL through EF Core; JWT + role authorization; Razorpay integration; Kafka-driven notification workflow; Docker-based services.",
    outcomes: [
      "Registration and login with JWT, BCrypt and seeded roles",
      "Product browsing, cart, checkout and order flow",
      "GST-aware checkout with CGST/SGST breakdown",
      "Razorpay payment UI and server-side verification direction",
      "Kafka + NotificationService asynchronous workflow",
      "Docker images for API, client, notification service, PostgreSQL and Kafka stack",
    ],
    tech: [".NET 10", "ASP.NET Core", "React.js", "EF Core", "PostgreSQL", "Kafka", "Docker", "JWT", "Razorpay"],
    repo: "https://github.com/Aakash-Chougule/EnterpriseECommerce",
    gallery: [
      { src: "/projects/enterprise-ecommerce/home-guest.webp", title: "Public landing experience", type: "real" },
      { src: "/projects/enterprise-ecommerce/login.webp", title: "Login experience", type: "real" },
      { src: "/projects/enterprise-ecommerce/register.webp", title: "Account registration", type: "real" },
      { src: "/projects/enterprise-ecommerce/products.webp", title: "Product catalogue", type: "real" },
      { src: "/projects/enterprise-ecommerce/cart.webp", title: "Cart empty state", type: "real" },
      { src: "/projects/enterprise-ecommerce/checkout.webp", title: "GST-aware checkout", type: "real" },
      { src: "/projects/enterprise-ecommerce/razorpay.webp", title: "Razorpay payment options", type: "real" },
      { src: "/projects/enterprise-ecommerce/docker-images.webp", title: "Docker image stack", type: "real" },
      { src: "/projects/enterprise-ecommerce/docker-containers.webp", title: "Containerized environment", type: "real" },
    ],
  },
  {
    id: "inventory",
    title: "Inventory Management System",
    label: "ASP.NET MVC / API",
    summary:
      "Inventory and stock workflows for store operations, product visibility and reliable day-to-day record retrieval using ASP.NET MVC, Web API and MySQL.",
    problem:
      "Keep product stock, transactions and operational records easy to update and easy to query without relying on manual tracking.",
    approach:
      "Database-backed CRUD modules with product/stock views, structured transaction workflows and API-based communication between modules.",
    outcomes: [
      "Product and stock visibility",
      "Low-stock monitoring",
      "Stock-in / stock-out transaction workflow",
      "MySQL persistence and Web API integration",
    ],
    tech: ["ASP.NET MVC", "ASP.NET Web API", "MySQL", "CRUD"],
    repo: "https://github.com/Aakash-Chougule/Inventry_Management_System",
    gallery: [
      { src: "/projects/inventory-management/dashboard.webp", title: "Inventory dashboard", type: "concept" },
      { src: "/projects/inventory-management/stock-transaction.webp", title: "Stock transaction workflow", type: "concept" },
    ],
  },
  {
    id: "store",
    title: "Store Management System - Luxmi Traders",
    label: "WINDOWS FORMS",
    summary:
      "A C#/.NET desktop business application for sales, inventory and customer records using Windows Forms, ADO.NET, Web API and MySQL.",
    problem:
      "Centralize daily store activity so sales, stock and customer information can be entered and retrieved through structured desktop workflows.",
    approach:
      "Windows Forms screens with validation, database CRUD, reusable entry flows and API-backed component integration.",
    outcomes: [
      "Sales and invoice workflows",
      "Inventory and customer records",
      "Validation and structured data-entry screens",
      "Reliable operational record retrieval",
    ],
    tech: ["C#", ".NET Windows Forms", "ADO.NET", "ASP.NET Web API", "MySQL"],
    repo: "https://github.com/Aakash-Chougule/store_management_system",
    gallery: [
      { src: "/projects/store-management/dashboard.webp", title: "Store operations dashboard", type: "concept" },
      { src: "/projects/store-management/new-sale.webp", title: "Sales / invoice workflow", type: "concept" },
    ],
  },
  {
    id: "dairy",
    title: "Dairy Management Software",
    label: "WINDOWS FORMS",
    summary:
      "Desktop software for milk-production, sales, inventory and daily operational records using C#, Windows Forms, ADO.NET and MySQL.",
    problem:
      "Simplify repetitive dairy record keeping and make daily collection, payment and sales information easier to retrieve.",
    approach:
      "Database-driven Windows Forms workflows for collection entries, supplier records, operational totals and sales tracking.",
    outcomes: [
      "Daily milk-production records",
      "Supplier and collection entry workflows",
      "Sales and inventory tracking",
      "Database-driven operational reporting",
    ],
    tech: ["C#", ".NET Windows Forms", "ADO.NET", "MySQL"],
    repo: "https://github.com/Aakash-Chougule",
    gallery: [
      { src: "/projects/dairy-management/daily-operations.webp", title: "Daily operations dashboard", type: "concept" },
      { src: "/projects/dairy-management/collection-entry.webp", title: "Milk collection entry", type: "concept" },
    ],
  },
  {
    id: "students",
    title: "Student Management System API",
    label: "GITHUB API PROJECT",
    summary:
      "A backend-focused project used to demonstrate structured REST endpoints, student record operations and authenticated API flows.",
    problem:
      "Expose student data through clear API contracts that can be consumed by a frontend or other client application.",
    approach:
      "RESTful endpoint structure, authentication-oriented request flow and database-backed CRUD concepts in a .NET API project.",
    outcomes: [
      "Structured REST endpoint design",
      "Student CRUD workflow",
      "JWT-style protected request flow",
      "Swagger / API testing presentation",
    ],
    tech: ["ASP.NET Core", "Web API", "REST", "JWT", "SQL"],
    repo: "https://github.com/Aakash-Chougule/Student-Management-System-API",
    gallery: [
      { src: "/projects/student-management-api/swagger.webp", title: "Swagger API explorer", type: "concept" },
      { src: "/projects/student-management-api/jwt-flow.webp", title: "Authenticated API flow", type: "concept" },
    ],
  },
  {
    id: "tools",
    title: "Web Tools & Responsive Websites",
    label: "JAVASCRIPT TOOLS",
    summary:
      "Small browser-based utilities focused on practical usability: a YouTube Embed Generator and an Image Format Converter with batch processing, aspect-ratio controls and dark mode.",
    problem:
      "Turn repetitive browser tasks into focused single-purpose utilities that work quickly without complex setup.",
    approach:
      "Responsive HTML/CSS/JavaScript interfaces with client-side processing and simple task-oriented interactions.",
    outcomes: [
      "YouTube URL to embed-code workflow",
      "Drag-and-drop image conversion",
      "Batch processing and format selection",
      "Responsive layouts and dark-mode design",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    repo: "https://github.com/Aakash-Chougule",
    gallery: [
      { src: "/projects/web-tools/youtube-embed-generator.webp", title: "YouTube Embed Generator", type: "concept" },
      { src: "/projects/web-tools/image-converter.webp", title: "Image Format Converter", type: "concept" },
    ],
  },
];

function Heading({ index, eyebrow, title, text }: { index: string; eyebrow: string; title: string; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: .25 }}
      className="mb-10 max-w-4xl"
    >
      <p className="font-mono text-xs font-bold uppercase tracking-[.24em] text-cyan-300">{index} / {eyebrow}</p>
      <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">{title}</h2>
      <p className="mt-5 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">{text}</p>
    </motion.div>
  );
}

function Gallery({ images, onOpen }: { images: GalleryImage[]; onOpen: (image: GalleryImage) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {images.map((image, index) => (
        <motion.button
          type="button"
          key={image.src}
          onClick={() => onOpen(image)}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * .05 }}
          className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 text-left"
        >
          <div className="relative overflow-hidden">
            <img src={image.src} alt={image.title} loading="lazy" decoding="async" className="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 to-transparent p-4 pt-12">
              <div className="flex items-center justify-between gap-3">
                <p className="font-bold text-white">{image.title}</p>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-black tracking-wider ${
                  image.type === "real"
                    ? "bg-emerald-400/15 text-emerald-300"
                    : "bg-violet-400/15 text-violet-300"
                }`}>
                  {image.type === "real" ? "REAL SCREENSHOT" : "CONCEPT MOCKUP"}
                </span>
              </div>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}


function SignalDivider() {
  return (
    <div aria-hidden="true" className="signal-divider mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <svg viewBox="0 0 1200 70" className="h-14 w-full overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id="signalGradient" x1="0" x2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="18%" stopColor="#22d3ee" />
            <stop offset="55%" stopColor="#3b82f6" />
            <stop offset="82%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="signal-path"
          d="M0 35 C110 35 100 10 210 10 S330 60 440 35 S570 10 680 35 S800 60 920 35 S1080 10 1200 35"
          fill="none"
          stroke="url(#signalGradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle className="signal-dot" cx="0" cy="35" r="5" fill="#67e8f9" />
      </svg>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [sendState, setSendState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [sendError, setSendError] = useState("");
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: .18 });
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(heroProgress, [0, .55, 1], [1, .985, .91]);
  const heroY = useTransform(heroProgress, [0, .55, 1], [0, -12, -100]);
  const heroOpacity = useTransform(heroProgress, [0, .72, 1], [1, 1, 0]);
  const portraitRotate = useTransform(heroProgress, [0, 1], [0, 4]);
  const portraitY = useTransform(heroProgress, [0, 1], [0, -45]);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(700px circle at ${mouseX}px ${mouseY}px, rgba(37,99,235,.16), transparent 55%)`;
  const year = useMemo(() => new Date().getFullYear(), []);

  async function submitContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSendState("sending");
    setSendError("");

    const form = e.currentTarget;
    const now = new Date();
    const dateInput = form.elements.namedItem("date") as HTMLInputElement | null;
    const timeInput = form.elements.namedItem("time") as HTMLInputElement | null;

    if (dateInput) {
      dateInput.value = now.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }

    if (timeInput) {
      timeInput.value = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }

    try {
      const response = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      if (response.status !== 200) {
        throw new Error(`${response.status}: ${response.text}`);
      }

      setSendState("sent");
      form.reset();
    } catch (error) {
      const details = error as { status?: number; text?: string; message?: string };
      const diagnostic = [
        details.status ? `HTTP ${details.status}` : "",
        details.text || details.message || "Unknown EmailJS error",
      ].filter(Boolean).join(" · ");
      console.error("EmailJS error:", error);
      setSendError(diagnostic);
      setSendState("error");
    }
  }

  return (
    <main className="min-h-screen bg-[#050816] text-slate-100">
      <motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 z-[90] h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
        <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3">
          <a href="#home" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-blue-500/15 font-black text-blue-300 ring-1 ring-blue-400/25">AC</span>
            <div>
              <p className="font-bold text-white">Aakash Chougule</p>
              <p className="text-xs text-slate-500">.NET Developer</p>
            </div>
          </a>

          <div className="hidden gap-1 xl:flex">
            {nav.map(([label, href]) => (
              <a key={href} href={href} className="rounded-xl px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white">{label}</a>
            ))}
          </div>

          <a href="#contact" className="hidden rounded-xl bg-white px-4 py-2 text-sm font-black text-slate-950 xl:block">Let's talk</a>

          <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="grid size-10 place-items-center rounded-xl bg-white/5 xl:hidden" aria-label="Toggle navigation">
            {menuOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 8 }} exit={{ opacity: 0, y: -10 }} className="glass mx-auto mt-2 max-w-7xl rounded-2xl p-3 xl:hidden">
              {nav.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5">{label}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section ref={heroRef} id="home" className="relative h-[145vh]">
        <motion.div
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mouseX.set(e.clientX - r.left);
            mouseY.set(e.clientY - r.top);
          }}
          style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}
          className="hero-stage sticky top-0 isolate min-h-screen overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8"
        >
        <div className="grid-mask absolute inset-0 -z-20" />
        <div className="absolute left-[-12rem] top-24 -z-20 size-[34rem] rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute right-[-10rem] top-[25rem] -z-20 size-[34rem] rounded-full bg-violet-600/15 blur-[120px]" />
        <motion.div style={{ background: spotlight }} className="pointer-events-none absolute inset-0 -z-10" />

        <div className="mx-auto grid min-h-[80vh] max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-emerald-300">
              <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,.8)]" />
              Open to .NET opportunities
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }} className="max-w-5xl text-5xl font-black leading-[.96] tracking-[-.05em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              .NET Developer building <span className="text-gradient">web APIs & desktop applications.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16 }} className="mt-7 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
              C#, ASP.NET Core, ASP.NET MVC, Web API, Windows Forms, ADO.NET, EF Core, LINQ and relational databases - with React, Kafka, Docker and cloud knowledge.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .24 }} className="mt-9 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3.5 font-black text-white shadow-[0_16px_50px_rgba(37,99,235,.28)] hover:bg-blue-400">
                Explore projects <ArrowRight size={18}/>
              </a>
              <a href="/Aakash_Chougule_Resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 font-black text-slate-100 hover:bg-white/10">
                <Download size={18}/> View resume
              </a>
            </motion.div>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2"><MapPin size={16}/> Maharashtra, India</span>
              <a href="https://github.com/Aakash-Chougule" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white"><Github size={17}/> GitHub</a>
              <a href="https://www.linkedin.com/in/aakash-chougule-031524186/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white"><Linkedin size={17}/> LinkedIn</a>
            </div>
          </div>

          <motion.div style={{ rotate: portraitRotate, y: portraitY }} initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .18, duration: .6 }} className="relative mx-auto w-full max-w-[520px] will-change-transform">
            <div className="absolute inset-8 rounded-full bg-blue-600/20 blur-[110px]" />
            <div className="glass relative overflow-hidden rounded-[2rem] p-3">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-950">
                <img src="/aakash-profile.jpg" alt="Aakash Chougule" width="1000" height="1250" fetchPriority="high" decoding="async" className="aspect-[4/5] w-full object-cover object-top opacity-95" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050816] via-[#050816]/55 to-transparent"/>
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-slate-950/70 p-4 backdrop-blur-xl">
                  <p className="font-mono text-xs uppercase tracking-[.18em] text-cyan-300">Aakash Chougule</p>
                  <p className="mt-1 text-xl font-black text-white">.NET Developer</p>
                  <p className="mt-1 text-sm text-slate-400">Web API · MVC · Windows Forms · SQL</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .8 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-black uppercase tracking-[.26em] text-slate-500 md:flex"
        >
          Scroll to enter
          <span className="scroll-orb" />
        </motion.a>
        </motion.div>
      </section>

      <SignalDivider />

      <section id="about" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading index="01" eyebrow="About" title="Backend, desktop and database-driven software." text="I focus on maintainable .NET applications, APIs and business software with clear logic, reliable data handling and practical user workflows." />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              [Code2, "Application development", "ASP.NET Core, MVC, Web API, Windows Forms and reusable application logic."],
              [Database, "Data-driven systems", "PostgreSQL, SQL Server, MySQL, MS Access, ADO.NET, EF Core and relational design."],
              [ShieldCheck, "Reliable delivery", "JWT, validation, exception handling, debugging, Swagger/Postman verification and Git workflow."],
            ].map(([Icon, title, text], i) => {
              const C = Icon as typeof Code2;
              return (
                <motion.article key={String(title)} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }} whileHover={{ y: -6 }} className="glass rounded-3xl p-6">
                  <div className="grid size-12 place-items-center rounded-2xl bg-blue-500/10 text-blue-300 ring-1 ring-blue-400/15"><C size={21}/></div>
                  <h3 className="mt-5 text-xl font-black">{String(title)}</h3>
                  <p className="mt-3 leading-7 text-slate-400">{String(text)}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="experience" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading index="02" eyebrow="Experience" title="Building business applications with .NET." text="Hands-on experience developing, maintaining and improving web, API and desktop applications using C#, ASP.NET, SQL and related Microsoft technologies." />
          <div className="space-y-5">
            {experience.map((item, i) => (
              <motion.article key={item.role + item.company} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }} className="glass rounded-3xl p-6 sm:p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-white">{item.role}</h3>
                    <p className="mt-1 font-semibold text-blue-300">{item.company} · {item.location}</p>
                  </div>
                  <span className="rounded-full border border-white/8 bg-white/[.035] px-3 py-1.5 font-mono text-xs text-slate-400">{item.period}</span>
                </div>
                <p className="mt-4 leading-7 text-slate-400">{item.description}</p>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {item.bullets.map((x) => <div key={x} className="rounded-xl bg-slate-950/45 px-3 py-2 text-sm text-slate-400">{x}</div>)}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="stack" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading index="03" eyebrow="Technical skills" title="Technologies I use to build reliable applications." text="A practical .NET-focused stack covering backend development, desktop applications, frontend integration, databases, messaging and delivery tools." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stackGroups.map((g, i) => (
              <motion.article key={g[0]} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -7 }} className="glass rounded-3xl p-6">
                <div className="mb-5 flex justify-between"><h3 className="text-lg font-black">{g[0]}</h3><span className="font-mono text-xs text-blue-300">0{i + 1}</span></div>
                <div className="flex flex-wrap gap-2">{g.slice(1).map((x) => <span key={x} className="rounded-xl border border-white/8 bg-white/[.035] px-3 py-2 text-sm text-slate-300">{x}</span>)}</div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <SignalDivider />

      <section id="projects" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading index="04" eyebrow="Case studies" title="Projects that demonstrate how I build." text="Real screenshots for the active Enterprise E-Commerce platform, plus clearly labelled concept mockups for older projects whose original screenshots are not currently available." />

          <div className="grid gap-5 lg:grid-cols-2">
            {caseStudies.map((study, i) => (
              <motion.article
                key={study.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * .04 }}
                className={`glass overflow-hidden rounded-[2rem] ${study.id === "enterprise" ? "lg:col-span-2" : ""}`}
              >
                <div className={`${study.id === "enterprise" ? "grid lg:grid-cols-[1.05fr_.95fr]" : ""}`}>
                  <div className="p-7 sm:p-8">
                    <span className="rounded-full border border-blue-400/15 bg-blue-400/7 px-3 py-1 text-[11px] font-bold tracking-[.18em] text-blue-300">{study.label}</span>
                    <h3 className="mt-5 text-3xl font-black text-white sm:text-4xl">{study.title}</h3>
                    <p className="mt-4 leading-7 text-slate-400">{study.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {study.tech.slice(0, 7).map((x) => <span key={x} className="rounded-lg bg-slate-950/55 px-2.5 py-1.5 font-mono text-xs text-slate-400">{x}</span>)}
                    </div>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <button type="button" onClick={() => setSelectedStudy(study)} className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950">
                        <Images size={17}/> View case study
                      </button>
                      <a href={study.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black text-white">
                        <Github size={17}/> GitHub
                      </a>
                    </div>
                  </div>

                  {study.id === "enterprise" && (
                    <button type="button" onClick={() => setSelectedStudy(study)} className="relative min-h-[320px] overflow-hidden border-t border-white/8 lg:border-l lg:border-t-0">
                      <img src="/projects/enterprise-ecommerce/checkout.webp" alt="Enterprise E-Commerce checkout" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-left">
                        <div>
                          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-black tracking-wider text-emerald-300">REAL APPLICATION SCREENSHOT</span>
                          <p className="mt-3 text-xl font-black text-white">GST-aware checkout + payment flow</p>
                        </div>
                        <ArrowUpRight className="text-white"/>
                      </div>
                    </button>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading index="05" eyebrow="Architecture" title="A production-minded flagship architecture." text="The project separates business rules, application services, persistence, API concerns and asynchronous notifications instead of placing everything in one project." />
          <div className="glass overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="grid items-center gap-4 lg:grid-cols-7">
              {["React Client","ASP.NET Core API","Application","Domain","Infrastructure","PostgreSQL","Kafka"].map((x, i) => (
                <div key={x} className="relative">
                  <motion.div initial={{ opacity: 0, scale: .94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * .07 }} className="rounded-2xl border border-blue-400/15 bg-slate-950/60 p-4 text-center">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-slate-600">0{i + 1}</p>
                    <p className="mt-2 text-sm font-black text-slate-200">{x}</p>
                  </motion.div>
                  {i < 6 && <motion.div animate={{ opacity: [.25, 1, .25] }} transition={{ duration: 1.6, repeat: Infinity, delay: i * .1 }} className="mx-auto my-2 h-6 w-px bg-gradient-to-b from-cyan-400 to-blue-500 lg:absolute lg:-right-3 lg:top-1/2 lg:my-0 lg:h-px lg:w-6"/>}
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-5"><p className="font-mono text-xs text-emerald-300">PAYMENTS</p><p className="mt-2 font-black">Razorpay verification flow</p></div>
              <div className="rounded-2xl border border-violet-400/15 bg-violet-400/5 p-5"><p className="font-mono text-xs text-violet-300">EVENTS</p><p className="mt-2 font-black">Kafka → NotificationService</p></div>
              <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/5 p-5"><p className="font-mono text-xs text-cyan-300">DELIVERY</p><p className="mt-2 font-black">Docker + CI/CD direction</p></div>
            </div>
          </div>
        </div>
      </section>

      <SignalDivider />

      <section id="github" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading index="06" eyebrow="GitHub activity" title="Code, projects and continuous learning." text="The contribution animation is generated from my GitHub profile workflow and links directly to the public repository history." />
          <div className="glass overflow-hidden rounded-[2rem] p-5 sm:p-7">
            <img
              src="https://raw.githubusercontent.com/Aakash-Chougule/Aakash-Chougule/main/assets/github-snake-dark.svg"
              alt="Aakash Chougule GitHub contribution animation"
              loading="lazy" decoding="async"
              className="w-full"
            />
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="https://github.com/Aakash-Chougule" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-black text-slate-950"><Github size={17}/> Open GitHub</a>
              <a href="https://github.com/Aakash-Chougule?tab=repositories" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-black"><ExternalLink size={17}/> Repositories</a>
            </div>
          </div>
        </div>
      </section>

      <section id="certificate" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading index="07" eyebrow="Certification" title="The Complete ASP.NET MVC 5 Course." text="Udemy certificate of completion for the ASP.NET MVC 5 course by Mosh Hamedani." />
          <div className="glass grid gap-6 overflow-hidden rounded-[2rem] p-5 lg:grid-cols-[1.15fr_.85fr] lg:p-7">
            <a href="/ASP.NET_MVC5_Certificate.pdf" target="_blank" rel="noreferrer" className="overflow-hidden rounded-2xl border border-white/10 bg-white">
              <img src="/certificate-preview.webp" alt="ASP.NET MVC 5 Udemy certificate preview" loading="lazy" decoding="async" className="w-full"/>
            </a>
            <div className="flex flex-col justify-center p-2 sm:p-5">
              <div className="grid size-14 place-items-center rounded-2xl bg-violet-500/10 text-violet-300 ring-1 ring-violet-400/15"><BadgeCheck size={28}/></div>
              <h3 className="mt-5 text-3xl font-black">ASP.NET MVC 5</h3>
              <p className="mt-3 leading-7 text-slate-400">Completed Feb. 12, 2024 · 7.5 total hours · Instructor: Mosh Hamedani.</p>
              <a href="/ASP.NET_MVC5_Certificate.pdf" target="_blank" rel="noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 rounded-2xl bg-white px-5 py-3 font-black text-slate-950"><ExternalLink size={17}/> View certificate</a>
            </div>
          </div>
        </div>
      </section>

      <SignalDivider />

      <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Heading index="08" eyebrow="Contact" title="Let's talk about .NET development." text="Use the form to send a message directly through EmailJS, or contact me through email, phone, GitHub or LinkedIn." />
          <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
            <div className="glass rounded-[2rem] p-7">
              <h3 className="text-2xl font-black">Contact details</h3>
              <div className="mt-6 space-y-3">
                <a href="mailto:aakashc549@gmail.com" className="flex items-center gap-3 rounded-2xl bg-white/[.035] p-4 text-slate-300 hover:text-white"><Mail size={18}/> aakashc549@gmail.com</a>
                <a href="tel:+917378331056" className="flex items-center gap-3 rounded-2xl bg-white/[.035] p-4 text-slate-300 hover:text-white"><Phone size={18}/> +91 73783 31056</a>
                <a href="https://github.com/Aakash-Chougule" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl bg-white/[.035] p-4 text-slate-300 hover:text-white"><Github size={18}/> GitHub</a>
                <a href="https://www.linkedin.com/in/aakash-chougule-031524186/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl bg-white/[.035] p-4 text-slate-300 hover:text-white"><Linkedin size={18}/> LinkedIn</a>
              </div>
            </div>

            <form onSubmit={submitContact} className="glass rounded-[2rem] p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="from_name" autoComplete="name" required placeholder="Your name" className="rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 outline-none focus:border-blue-400/50"/>
                <input name="from_email" type="email" autoComplete="email" required placeholder="Your email" className="rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 outline-none focus:border-blue-400/50"/>
              </div>
              <input type="hidden" name="date" />
              <input type="hidden" name="time" />
              <textarea name="message" required rows={7} placeholder="Tell me about the role or project..." className="mt-4 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 outline-none focus:border-blue-400/50"/>
              <button disabled={sendState === "sending"} type="submit" className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-5 py-3.5 font-black hover:bg-blue-400 disabled:cursor-wait disabled:opacity-60">
                <Mail size={18}/> {sendState === "sending" ? "Sending..." : "Send message"}
              </button>

              {sendState === "sent" && <p className="mt-4 rounded-xl border border-emerald-400/15 bg-emerald-400/5 px-4 py-3 text-sm font-semibold text-emerald-300">Message sent successfully.</p>}
              {sendState === "error" && (
                <div className="mt-4 rounded-xl border border-red-400/15 bg-red-400/5 px-4 py-3 text-sm text-red-200">
                  <p className="font-semibold">The message could not be sent right now. Please email me directly at <a className="underline" href="mailto:aakashc549@gmail.com">aakashc549@gmail.com</a>.</p>
                  {import.meta.env.DEV && sendError && (
                    <details className="mt-2 text-xs text-red-300/80">
                      <summary className="cursor-pointer">Developer diagnostic</summary>
                      <code className="mt-2 block break-all">{sendError}</code>
                    </details>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="glass mx-auto grid max-w-7xl gap-6 rounded-[2rem] p-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-2xl font-black text-white">Aakash Chougule · .NET Developer</p>
            <p className="mt-2 text-slate-400">Web API & Desktop Applications · C# · ASP.NET · SQL · React · Kafka · Docker</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/Aakash_Chougule_Resume.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-black"><Download size={17}/> View resume</a>
            <a href="/Aakash_Chougule_Resume.pdf" download className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-black text-slate-950"><Download size={17}/> Download PDF</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/7 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="font-black text-white">Aakash Chougule</p><p className="mt-1 text-sm text-slate-600">.NET Developer · Web API & Desktop Applications</p></div>
          <p className="text-sm text-slate-600">© {year} · Built with React, TypeScript, Tailwind CSS, Motion & EmailJS</p>
        </div>
      </footer>

      <AnimatePresence>
        {selectedStudy && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/90 p-4 backdrop-blur-xl" onClick={() => setSelectedStudy(null)}>
            <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 16, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="glass mx-auto my-6 max-w-6xl rounded-[2rem] p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs font-black uppercase tracking-[.2em] text-cyan-300">CASE STUDY</p>
                  <h3 className="mt-3 text-3xl font-black sm:text-5xl">{selectedStudy.title}</h3>
                </div>
                <button type="button" onClick={() => setSelectedStudy(null)} className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/5"><X size={19}/></button>
              </div>

              <div className="mt-8 grid gap-5 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-white/[.025] p-5">
                  <p className="font-mono text-xs font-black uppercase tracking-wider text-blue-300">THE PROBLEM</p>
                  <p className="mt-3 leading-7 text-slate-400">{selectedStudy.problem}</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[.025] p-5">
                  <p className="font-mono text-xs font-black uppercase tracking-wider text-violet-300">MY APPROACH</p>
                  <p className="mt-3 leading-7 text-slate-400">{selectedStudy.approach}</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/8 bg-white/[.025] p-5">
                <p className="font-mono text-xs font-black uppercase tracking-wider text-emerald-300">ENGINEERING HIGHLIGHTS</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {selectedStudy.outcomes.map((x, i) => (
                    <div key={x} className="rounded-xl bg-slate-950/45 px-4 py-3 text-sm text-slate-300"><span className="mr-2 font-mono text-blue-300">0{i + 1}</span>{x}</div>
                  ))}
                </div>
              </div>

              {selectedStudy.gallery.some((x) => x.type === "concept") && (
                <p className="mt-6 rounded-xl border border-violet-400/15 bg-violet-400/5 px-4 py-3 text-sm text-violet-200">
                  Concept mockups are representative portfolio visuals created because the original project screenshots are not currently available. They are intentionally labelled and are not presented as live captures.
                </p>
              )}

              <div className="mt-8">
                <Gallery images={selectedStudy.gallery} onOpen={setSelectedImage}/>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={selectedStudy.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-black text-slate-950"><Github size={17}/> Explore repository</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} className="fixed inset-0 z-[120] grid place-items-center bg-black/90 p-4 backdrop-blur-lg">
            <button type="button" onClick={() => setSelectedImage(null)} className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white/10 text-white"><X size={20}/></button>
            <motion.div initial={{ scale: .96 }} animate={{ scale: 1 }} exit={{ scale: .96 }} className="max-h-[90vh] max-w-[95vw]" onClick={(e) => e.stopPropagation()}>
              <img src={selectedImage.src} alt={selectedImage.title} decoding="async" className="max-h-[84vh] max-w-[95vw] rounded-2xl border border-white/10 object-contain shadow-2xl"/>
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="font-bold text-white">{selectedImage.title}</p>
                <span className={`rounded-full px-3 py-1 text-[10px] font-black tracking-wider ${selectedImage.type === "real" ? "bg-emerald-400/15 text-emerald-300" : "bg-violet-400/15 text-violet-300"}`}>
                  {selectedImage.type === "real" ? "REAL SCREENSHOT" : "CONCEPT MOCKUP"}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
