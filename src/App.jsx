import React, { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, MapPin, Phone, ExternalLink, Rocket, Award, BriefcaseBusiness, Code2, Database, Cloud, ShieldCheck, Sparkles, ChevronRight, Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import SimpleIconLogo from '@/components/SimpleIconLogo';
import ThemeToggle from '@/components/ThemeToggle';
import Publications from '@/modules/Publications/Publications';
import Certifications from '@/modules/Certifications/Certifications';

const RESUME = {
  name: "Aditya Raj",
  headline: "Senior Software Engineer — Java/Spring Boot · Data Engineering · Azure/GCP",
  location: "Bengaluru, Karnataka, India",
  email: "rajaditya1857@gmail.com",
  phone: "+91 77951 65084",
  links: {
    github: "https://github.com/a-shekhar",
    linkedin: "https://www.linkedin.com/in/ashekharr/",
  },
  summary:
    "SDE with 7+ years across Java/Spring Boot microservices and Spark/Databricks on Azure. Delivered outcomes for Conagra Brands (CPG) and PSCU (payments). Strengths in CDC architectures, governed analytics, PII protection (encryption/RBAC), and Azure DevOps CI/CD. Built Anjori Arts (React + Spring Boot) demonstrating end-to-end ownership.",
  skills: [
    { group: "Back‑End", items: ["Java", "Spring Boot", "Hibernate", "REST APIs", "Microservices", "EJB", "JUnit", "Mockito"] },
    { group: "Data", items: ["Apache Spark", "Databricks", "Delta Lake", "CDC", "Snowflake", "Python", "SQL", "SQLFluff"] },
    { group: "Cloud", items: ["Azure", "GCP", "AWS"] },
    { group: "Databases", items: ["PostgreSQL", "MySQL", "Oracle", "MongoDB"] },
    { group: "DevOps/Containers", items: ["Docker", "Kubernetes", "Git", "Maven", "SonarQube", "Azure DevOps"] },
    { group: "Frontend", items: ["React", "Vite", "Tailwind CSS", "Thymeleaf", "JSF", "PrimeFaces"] },
    { group: "Caching & Messaging", items: ["Redis"] },
  ],
  experience: [
    {
      company: "Sigmoid",
      role: "Software Engineer (SDE‑2)",
      location: "Bengaluru, India",
      dates: "Jun 2022 – Present",
      client: "Conagra Brands (Consumer Packaged Goods)",
      bullets: [
        "Designed a Databricks CDC framework replacing full refreshes with daily increments.",
        "Built ingestion/curation pipelines on Azure with standardized schemas.",
        "Unified SAP R/3 and S/4 data via robust merge logic for reliable analytics.",
        "Implemented automated PII removal with long‑term enforcement.",
        "Enforced SQL standards using SQLFluff in CI for repo‑wide consistency.",
        "Added column‑level encryption with RBAC for fine‑grained controls.",
        "Established Azure DevOps multi‑stage CI/CD reducing manual release friction.",
        "Mentored new hires; coordinated a 4–6 engineer squad and worked with client architects."
      ],
      tech: ["Databricks", "Spark", "Delta Lake", "Python", "SQL", "Azure", "ADF", "Synapse", "AKS", "Key Vault", "Azure DevOps"],
    },
    {
      company: "Accenture",
      role: "Full‑Stack Developer",
      location: "Bengaluru, India",
      dates: "Jul 2018 – Jun 2022",
      client: "PSCU (Payments/Credit Unions)",
      bullets: [
        "Built pricing/configuration platform and billing automations.",
        "Implemented discount and price‑adjustment automation with guardrails.",
        "Established unit testing and supported tech upgrades.",
        "Partnered with QA/BA & client stakeholders to harden releases."
      ],
      tech: ["Java", "Spring", "Hibernate", "EJB", "JSF", "PrimeFaces", "Oracle SQL", "Git", "Maven"],
    },
  ],
  projects: [

    {
      name: "Anjori Arts — E‑commerce Platform",
      year: "2025 – Present",
      description:
        "Production app for original artwork. Mobile‑first UI, SEO, clean code, and fast loads.",
      bullets: [
        "Auth: signup with OTP, email verification, session login, forgot password.",
        "Custom Orders: multi‑image upload, CropperJS cropping, metadata, admin status mgmt.",
        "Infra: Cloudinary, Neon Postgres; Redis for active‑user tracking.",
        "Admin: modern dashboards, optimistic updates, accessibility best practices."
      ],
      tech: ["React", "Vite", "Tailwind 4.x", "Spring Boot", "Cloudinary", "PostgreSQL", "Redis"],
      link: "https://www.anjoriarts.com",
    },
    
    {
      name: "Currency Converter — Microservice",
      year: "2024",
      description: "Lightweight Spring Boot microservice that converts between currencies in real-time using exchange-rate API with caching.",
      bullets: [
        "Exposes REST endpoints: /convert?from=USD&to=INR&amount=100",
        "In-memory and Redis cache with TTL to cut API calls by 90%",
        "Circuit breaker + retry (resilience4j) and request tracing (SLF4J/MDC)",
        "Containerized with Docker; CI on GitHub Actions; ready for Azure App Service"
      ],
      tech: ["Java", "Spring Boot", "Microservices", "API Gateway", "Docker", "Kubernetes",
        "Load Balancer", "ZipKin", "Circuit Breaker"
      ],
      link: "https://github.com/a-shekhar/microservices-tutorial",
    },

  ],
  awards: [
    { title: "SPOT Award", org: "Sigmoid", when: "Q2 2024" },
    { title: "SPOT Award", org: "Sigmoid", when: "Q3 2023" },
    { title: "Pinnacle Award", org: "Accenture", when: "—" },
    { title: "SPARK Award", org: "Accenture", when: "—" },
  ],
};

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`relative scroll-mt-24 ${className}`}>{children}</section>
);

const FadeIn = ({ delay = 0, duration = 0.6, y = 16, children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true, amount: 0.2 }}
    className={className}
  >
    {children}
  </motion.div>
);

const Divider = () => (
  <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
);

const Nav = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.3 });

  const links = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#awards", label: "Awards" },
    { href: "#certifications", label: "Certifications" },
    { href: "#publications", label: "Publications" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60 bg-zinc-950/60 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="group inline-flex items-center gap-2">
            <Rocket className="h-5 w-5 text-violet-400 group-hover:rotate-12 transition" />
            <span className="font-semibold text-zinc-200">Aditya Raj</span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-zinc-300 hover:text-white transition">
                {l.label}
              </a>
            ))}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a href={`mailto:${RESUME.email}`} className="ml-2">
                    <Button size="sm" className="bg-violet-600 hover:bg-violet-500 text-white">
                      <Mail className="mr-2 h-4 w-4" /> Contact
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent>Drop me a line</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <ThemeToggle />
          </nav>
        </div>
      </div>
      <motion.div style={{ scaleX }} className="h-[2px] w-full origin-left bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400" />
    </header>
  );
};

const Hero = () => {
  return (
    <Section id="home" className="pt-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <FadeIn className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/70 px-3 py-1 text-xs text-zinc-300">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              Available for SDE‑3/Staff roles
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Building reliable <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">microservices</span> & scalable <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">data platforms</span>
            </h1>
            <p className="mt-4 text-zinc-300 leading-relaxed">
              {RESUME.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects"><Button className="bg-violet-600 hover:bg-violet-500 text-white">View Projects <ArrowRight className="ml-2 h-4 w-4"/></Button></a>
              <a href={RESUME.links.github} target="_blank" rel="noreferrer">
                <Button variant="outline" className="border-white/15 bg-white/5 text-zinc-200 hover:bg-white/10">
                  <Github className="mr-2 h-4 w-4"/> GitHub
                </Button>
              </a>
              <a href={RESUME.links.linkedin} target="_blank" rel="noreferrer">
                <Button variant="outline" className="border-white/15 bg-white/5 text-zinc-200 hover:bg-white/10">
                  <Linkedin className="mr-2 h-4 w-4"/> LinkedIn
                </Button>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-zinc-400">
              <div className="inline-flex items-center gap-2"><MapPin className="h-4 w-4"/>{RESUME.location}</div>
              <a className="inline-flex items-center gap-2 hover:text-zinc-200" href={`tel:${RESUME.phone.replace(/\\s/g, '')}`}><Phone className="h-4 w-4"/>{RESUME.phone}</a>
              <a className="inline-flex items-center gap-2 hover:text-zinc-200" href={`mailto:${RESUME.email}`}><Mail className="h-4 w-4"/>{RESUME.email}</a>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="md:col-span-5">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="aspect-square w-full rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-1 shadow-2xl"
              >
                <div className="relative h-full w-full rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.2),transparent_35%)]">
                  <div className="absolute inset-0 rounded-3xl border border-white/10" />
                  <div className="absolute inset-0 rounded-3xl mix-blend-overlay opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                  <div className="absolute inset-6 grid grid-cols-2 gap-3">
                    {[
                      { icon: <SimpleIconLogo name="Java" className="h-5 w-5" />, label: "Java" },
                      { icon: <SimpleIconLogo name="Spring Boot" className="h-5 w-5" />, label: "Spring Boot" },
                      { icon: <SimpleIconLogo name="PostgreSQL" className="h-5 w-5" />, label: "Database" },
                      { icon: <SimpleIconLogo name="Azure" className="h-5 w-5" />, label: "Azure" },
                    ].map((x, i) => (
                      <motion.div key={i} whileHover={{ y: -6 }} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-zinc-200">
                        <div className="mb-2 text-zinc-300">{x.icon}</div>
                        <div className="text-sm font-medium">{x.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
};

const Experience = () => {
  const items = Array.isArray(RESUME?.experience) ? RESUME.experience : [];

  return (
    <Section id="experience" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Experience</h2>
          <p className="mt-2 text-zinc-400">Impact-first highlights across data platforms and backend systems.</p>
        </FadeIn>

        <div className="mt-10 grid gap-6">
          {items.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 ? 24 : -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-zinc-900/60 border-white/10">
                <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <BriefcaseBusiness className="h-5 w-5 text-violet-400" /> {exp?.role}
                    </CardTitle>
                    <div className="mt-1 text-sm text-zinc-400 flex flex-wrap items-center gap-2">
                      <Building2 className="h-4 w-4" /> {exp?.company} • {exp?.location} • {exp?.dates}
                    </div>
                    {exp?.client && (
                      <div className="mt-1 text-sm text-zinc-400">Client: {exp.client}</div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(exp?.tech ?? exp?.stack ?? []).map((s) => (
                      <Badge key={s} className="bg-white/5 text-zinc-200 border-white/10">{s}</Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="grid gap-2 text-zinc-300 list-disc ml-6">
                    {(exp?.bullets ?? []).map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};


const Projects = () => {
  const [query, setQuery] = useState("");
  const items = RESUME.projects.filter(p => (p.name + p.description + p.tech.join(" ")).toLowerCase().includes(query.toLowerCase()))
  return (
    <Section id="projects" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Projects</h2>
              <p className="mt-2 text-zinc-400">Selected work that shows craft, performance, and ownership.</p>
            </div>
            <div className="md:w-80">
              <Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search projects…" className="bg-zinc-900/60 border-white/10 text-zinc-200 placeholder:text-zinc-500" />
            </div>
          </div>
        </FadeIn>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-zinc-950 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{p.year}</p>
                </div>
                <ExternalLink className="h-5 w-5 text-zinc-400 group-hover:text-zinc-200 transition" />
              </div>
              <p className="mt-4 text-zinc-300">{p.description}</p>
              <ul className="mt-4 grid list-disc ml-5 gap-1 text-sm text-zinc-400">
                {p.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <Badge key={t} className="bg-white/5 text-zinc-200 border-white/10">{t}</Badge>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
};

const Skills = () => {
  return (
    <Section id="skills" className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Skills</h2>
          <p className="mt-2 text-zinc-400">Breadth where needed, depth where it matters.</p>
        </FadeIn>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESUME.skills.map((s, i) => (
            <motion.div key={s.group} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
              <Card className="bg-zinc-900/60 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <ChevronRight className="h-5 w-5 text-cyan-300" /> {s.group}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((it) => (
                      <Badge key={it} className="bg-white/5 text-zinc-200 border-white/10">{it}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const Awards = () => (
  <Section id="awards" className="py-20">
    <div className="mx-auto max-w-7xl px-4">
      <FadeIn>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Awards</h2>
        <p className="mt-2 text-zinc-400">A few recognitions along the way.</p>
      </FadeIn>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {RESUME.awards.map((a, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
            <Card className="bg-zinc-900/60 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-300" /> {a.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-zinc-300">
                <div className="flex items-center gap-2"><Building2 className="h-4 w-4"/> {a.org}</div>
                <div className="text-sm text-zinc-400 mt-1">{a.when}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);

const Contact = () => (
  <Section id="contact" className="py-20">
    <div className="mx-auto max-w-7xl px-4">
      <FadeIn>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Let’s build something</h2>
        <p className="mt-2 text-zinc-400">Reach out for roles, collaborations, or interesting problems.</p>
      </FadeIn>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[{
          icon: <Mail className="h-5 w-5"/>,
          label: "Email",
          value: RESUME.email,
          href: `mailto:${RESUME.email}`,
        },{
          icon: <Linkedin className="h-5 w-5"/>,
          label: "LinkedIn",
          value: "@ashekharr",
          href: RESUME.links.linkedin,
        },{
          icon: <Github className="h-5 w-5"/>,
          label: "GitHub",
          value: "a-shekhar",
          href: RESUME.links.github,
        }].map((c, i) => (
          <motion.a
            key={i}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <Card className="bg-zinc-900/60 border-white/10 hover:border-violet-400/40 transition">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-zinc-200">
                  <div className="rounded-xl bg-white/5 p-2 border border-white/10">{c.icon}</div>
                  <div>
                    <div className="text-sm text-zinc-400">{c.label}</div>
                    <div className="font-medium">{c.value}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.a>
        ))}
      </div>
    </div>
  </Section>
);

const Background = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_20%_-10%,rgba(139,92,246,0.25),transparent),radial-gradient(800px_400px_at_80%_110%,rgba(34,211,238,0.18),transparent)]" />
    <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
  </div>
);


// === Custom sections data ===
const PUBLICATIONS = [
  {
    title: 'Techniques to Preserve the Location of Sink in Wireless Sensor Networks (WSN)',
    outlet: 'IJARIIE',
    link: 'http://ijariie.com/AdminUploadPdf/TECHNIQUES_TO_PRESERVE_THE_LOCATION_OF_SINK_IN_WIRELESS_SENSOR_NETWORKS__ijariie7726.pdf'
  },
  { title: 'Public Key Cryptography in WSN (RSA-based)', outlet: 'Paper Presentation (NIE, 2017)', link: '' }
];

const CERTIFICATIONS = [
  { issuer: 'Microsoft', name: 'Azure Fundamentals', link: 'https://www.credly.com/badges/569af692-750b-4dc6-b84c-cbd98c22d3f9' },
  { issuer: 'Microsoft', name: 'Azure AI Fundamentals', link: 'https://www.credly.com/badges/ccedf39b-9f33-412b-b8c0-1088abcfb4f9' },
  { issuer: 'Microsoft', name: 'Azure Data Fundamentals', link: 'https://www.credly.com/badges/4604d0d6-0272-490d-8548-d1c41fb1a272' },
  { issuer: 'Microsoft', name: 'Security, Compliance & Identity Fundamentals', link: 'https://www.credly.com/badges/234dca4d-e799-49e3-878f-0432229c192e' },
  { issuer: 'Microsoft', name: 'Azure Data Engineer Associate', validity: 'Dec 2022 – Dec 2025', link: 'https://learn.microsoft.com/api/credentials/share/en-us/AdityaRaj-1058/92F058885A57FB4D?sharingId=86126B3B868073D9' },
  { issuer: 'Snowflake', name: 'SnowPro Core Certification', validity: 'Aug 2022 – Aug 2026', link: 'https://www.credly.com/badges/e41b7e7e-4be1-4c7f-ab8c-ba638b97a06c' },
  { issuer: 'Databricks', name: 'Academy Accreditation: Lakehouse Fundamentals', validity: 'Dec 2022 – Dec 2023', link: 'https://credentials.databricks.com/c17a7da4-3a65-4c00-b920-1d445f3b89fb' },
  { issuer: 'Databricks', name: 'Databricks Certified Data Engineer Associate', validity: 'Dec 2024 – Dec 2026', link: 'https://credentials.databricks.com/62239252-4408-49bc-bc76-a37db4400722' },
  { issuer: 'HackerRank', name: 'Java (Intermediate)', link: 'https://www.hackerrank.com/certificates/f7922f3c0c91' },
  { issuer: 'HackerRank', name: 'SQL (Intermediate)', link: 'https://www.hackerrank.com/certificates/88e1e3b3faa3' },
  { issuer: 'HackerRank', name: 'Java (Basic)', link: 'https://www.hackerrank.com/certificates/43ed66a6e44b' },
  { issuer: 'HackerRank', name: 'SQL (Basic)', link: 'https://www.hackerrank.com/certificates/850a68ebbebc' },
  { issuer: 'HackerRank', name: 'C++ (Basic)', link: 'https://www.hackerrank.com/certificates/899f86a52cf2' },
  { issuer: 'HackerRank', name: 'Problem Solving (Basic)', link: 'https://www.hackerrank.com/certificates/7e748ccbe34c' },
];
export default function App() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-zinc-950 text-zinc-200 antialiased">
        <Background />
        <Nav />
        <main>
          <Hero />
          <Divider />
          <Experience />
          <Divider />
          <Projects />
          <Divider />
          <Skills />
          <Divider />
          <Awards />
        </main>
        
          <Divider />
          <section id="certifications" className="py-10">
            <div className="mx-auto max-w-7xl px-4">
              <Certifications items={CERTIFICATIONS} />
            </div>
          </section>
          <Divider />
          <section id="publications" className="py-20">
            <div className="mx-auto max-w-7xl px-4">
              <Publications items={PUBLICATIONS} />
            </div>
          </section>
          <Divider />
          <Contact />
          
<footer className="mt-20 border-t border-white/5 bg-zinc-950/60 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-zinc-500">© {new Date().getFullYear()} Aditya Raj • Built with React + Tailwind</div>
            <div className="flex items-center gap-3">
              <a href={RESUME.links.github} className="text-zinc-400 hover:text-zinc-200"><Github className="h-5 w-5"/></a>
              <a href={RESUME.links.linkedin} className="text-zinc-400 hover:text-zinc-200"><Linkedin className="h-5 w-5"/></a>
              <a href={`mailto:${RESUME.email}`} className="text-zinc-400 hover:text-zinc-200"><Mail className="h-5 w-5"/></a>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}
