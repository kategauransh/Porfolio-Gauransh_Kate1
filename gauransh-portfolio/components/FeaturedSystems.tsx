"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowRight, CheckCircle2, ShieldCheck, Database, Server, Cpu, Terminal, ArrowUpRight } from "lucide-react";

interface ProjectDetails {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  problem: string;
  architecture: string;
  techStack: string[];
  github: string;
  keyFeatures: string[];
  engineeringDeepDive: {
    sectionTitle: string;
    details: string;
    metrics?: string;
  }[];
  specifications: {
    label: string;
    value: string;
  }[];
}

const SYSTEMS_DATA: ProjectDetails[] = [
  {
    id: "printflow",
    title: "PrintFlow",
    subtitle: "Enterprise Print Queue & Document Management Platform",
    tagline: "High-throughput concurrent queuing service built to orchestrate corporate printer arrays.",
    problem: "Corporate environments experience high print-latency and queue conflicts during peak hours. PrintFlow handles asynchronous jobs, thread-safe memory allocations, and print-node status validations, preventing data leakage across shared network resources.",
    architecture: "Client → REST Gateway → Spring Queue Service (Thread-Safe Concurrent Map) → Printer Node Router → PostgreSQL DB (Audit Logs)",
    techStack: ["Java 17", "Spring Boot", "Spring Data JPA", "PostgreSQL", "Docker", "Maven"],
    github: "https://github.com/kategauransh/OpenOutreach-main", // Redirects to real active repo
    keyFeatures: [
      "Concurrent Job Queuing: Thread-safe manipulation of print queues using Atomic variables and synchronized structures.",
      "Optimized JPA Fetching: Prevented N+1 query problems in Hibernate using custom entity graphs and fetch profiles.",
      "Status Check Polling: Heartbeat listener verifying printer status (Online, Out of Paper, Offline) prior to dispatching jobs.",
    ],
    engineeringDeepDive: [
      {
        sectionTitle: "Transactional Isolation",
        details: "Configured Spring Transactional scopes (`isolation = Isolation.READ_COMMITTED`) to guarantee database consistency when scaling print orders concurrently.",
      },
      {
        sectionTitle: "Memory Thresholding",
        details: "Implemented file boundary interceptors limiting multi-part uploads to 25MB, protecting heap allocations from OutOfMemory (OOM) failures.",
        metrics: "25MB Max Heap Allocation Guard",
      }
    ],
    specifications: [
      { label: "Concurrency Model", value: "CompletableFuture & ExecutorService" },
      { label: "DB Pooling", value: "HikariCP (Max 20 active connections)" },
      { label: "Indexing Scheme", value: "B-Tree index on job_status & owner_id" },
    ]
  },
  {
    id: "identityhub",
    title: "IdentityHub",
    subtitle: "Custom stateless JWT Authentication & Security Gateway",
    tagline: "Production-grade authentication engine leveraging Spring Security and JSON Web Tokens.",
    problem: "Standard web architectures struggle with scalable authentication and token security without incurring session bottlenecks. IdentityHub is a stateless authorization solution implementing sliding-window validation, secure cryptography, and RBAC.",
    architecture: "HTTP Request → JWT Filter → SecurityContextHolder → Custom AuthenticationProvider → DB Verification",
    techStack: ["Java 17", "Spring Security", "JJWT Lib", "BCrypt", "PostgreSQL", "Git"],
    github: "https://github.com/kategauransh/JWT-Authentication-System",
    keyFeatures: [
      "Role-Based Access Control (RBAC): Annotations (`@PreAuthorize`) enforcing strict permissions across administrative routes.",
      "BCrypt Password Hashing: Secure storage utilizing BCrypt with adaptive cost factors (strength level 12) for resistance to lookup attacks.",
      "Token Rotation: Sliding-window expiration mechanics regenerating tokens prior to decay, preventing request interception.",
    ],
    engineeringDeepDive: [
      {
        sectionTitle: "Filter Chain Customization",
        details: "Engineered custom JWT filters bypassed selectively for public routes (`/api/v1/auth/**`), ensuring zero security overhead for asset loading.",
      },
      {
        sectionTitle: "Signature Security",
        details: "Utilized HMAC-SHA512 keys rotated dynamically via system environment variables, avoiding static credential checking.",
        metrics: "HS512 Signature Security",
      }
    ],
    specifications: [
      { label: "Hash Strength", value: "BCrypt (Cost Factor 12)" },
      { label: "Token Lifespan", value: "Access: 15 Min | Refresh: 7 Days" },
      { label: "Route Controls", value: "Method Security (SpEL Expressions)" },
    ]
  },
  {
    id: "voicescribe",
    title: "VoiceScribe",
    subtitle: "Asynchronous AI Transcription & Validation Pipeline",
    tagline: "Audio processing system translating speech to structured JSON datasets via AI integrations.",
    problem: "Asynchronous speech-to-text processing fails when raw inputs contain invalid codecs, corrupt frames, or exceed file limit thresholds. VoiceScribe acts as a pre-validation barrier, mapping exceptions and sanitizing audio paths.",
    architecture: "Multipart Upload → Codec Guard Filter → AI Pipeline → Transcription Service → REST Response Mapper",
    techStack: ["Java 17", "Spring Boot", "OpenAI Whisper API", "Jackson JSON", "Docker", "PostgreSQL"],
    github: "https://github.com/kategauransh/Auto_job_applier_linkedIn", // Redirects to real automation repo
    keyFeatures: [
      "Dynamic Exception Advice: Custom `@RestControllerAdvice` converting application exception handlers to RFC 7807 problem details.",
      "Metadata Sanitization: Removing audio metadata tags before dispatching streams to external Whisper model gateways.",
      "Automated Swagger Specs: Live specifications mapping input payloads, response models, and HTTP error types.",
    ],
    engineeringDeepDive: [
      {
        sectionTitle: "Validation Interceptors",
        details: "Built custom JSR-380 validators ensuring incoming multipart requests verify byte structures instead of relying on unsafe mime-type headers.",
      },
      {
        sectionTitle: "Dynamic Thread Allocations",
        details: "Audio transformations executed within dedicated thread-pools, protecting the primary Spring event loop from blockages.",
        metrics: "Separate I/O Thread Pool",
      }
    ],
    specifications: [
      { label: "API Standards", value: "RFC 7807 Error Specifications" },
      { label: "Media Handling", value: "Multi-part Stream Sanitization" },
      { label: "Validation Engine", value: "Hibernate Validator (Jakarta)" },
    ]
  }
];

export default function FeaturedSystems() {
  const [activeTab, setActiveTab] = useState<string>("printflow");

  const currentSystem = SYSTEMS_DATA.find((s) => s.id === activeTab) || SYSTEMS_DATA[0];

  return (
    <section id="systems" className="relative py-24 bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-2xl text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Portfolio</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mt-2 mb-4">
              Featured Systems
            </h2>
            <p className="text-zinc-400 font-sans text-base leading-relaxed">
              In-depth architectural reviews of backend systems built using Spring Boot, Hibernate, and PostgreSQL.
            </p>
          </div>

          {/* Project Selector tabs */}
          <div className="flex gap-1.5 p-1 bg-zinc-900 border border-zinc-800/80 rounded-xl max-w-full overflow-x-auto self-start md:self-end">
            {SYSTEMS_DATA.map((sys) => (
              <button
                key={sys.id}
                onClick={() => setActiveTab(sys.id)}
                className={`px-4 py-2 text-xs font-semibold font-sans rounded-lg transition-all duration-200 whitespace-nowrap ${
                  activeTab === sys.id
                    ? "bg-zinc-800 text-white shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {sys.title}
              </button>
            ))}
          </div>
        </div>

        {/* System Viewer Panel */}
        <div className="min-h-[580px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSystem.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Details */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentSystem.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tight">
                    {currentSystem.title}
                  </h3>
                  <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mt-1.5">
                    {currentSystem.subtitle}
                  </p>
                  <p className="text-base text-zinc-300 font-sans mt-4 leading-relaxed">
                    {currentSystem.tagline}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-850">
                  <h4 className="text-xs font-bold uppercase text-zinc-400 tracking-wider mb-2.5">
                    Business Problem & context
                  </h4>
                  <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                    {currentSystem.problem}
                  </p>
                </div>

                {/* Architecture Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-zinc-500 tracking-wider mb-3">
                    Asymmetric Data Pipeline Flow
                  </h4>
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-zinc-300 overflow-x-auto whitespace-nowrap">
                    {currentSystem.architecture}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-zinc-500 tracking-wider mb-3">
                    Architectural Features
                  </h4>
                  <ul className="space-y-3">
                    {currentSystem.keyFeatures.map((feat) => {
                      const [title, desc] = feat.split(":");
                      return (
                        <li key={feat} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div className="text-sm text-zinc-400 font-sans leading-normal">
                            <strong className="text-white font-medium">{title}:</strong>
                            {desc}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Right Column: Code Specs & Deep Dives */}
              <div className="lg:col-span-5 space-y-6">
                {/* Tech Specs Panel */}
                <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 glow-border">
                  <h4 className="text-xs font-bold uppercase text-zinc-400 tracking-widest mb-4">
                    Technical Specifications
                  </h4>
                  <div className="space-y-4">
                    {currentSystem.specifications.map((spec) => (
                      <div key={spec.label} className="flex justify-between items-center text-xs">
                        <span className="text-zinc-500 font-medium">{spec.label}</span>
                        <span className="text-zinc-300 font-mono font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Engineering Deep Dives */}
                {currentSystem.engineeringDeepDive.map((dive) => (
                  <div
                    key={dive.sectionTitle}
                    className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 glow-border"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-xs font-bold uppercase text-zinc-400 tracking-widest">
                        Deep Dive: {dive.sectionTitle}
                      </h4>
                      {dive.metrics && (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded">
                          {dive.metrics}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                      {dive.details}
                    </p>
                  </div>
                ))}

                {/* Code Links */}
                <div className="flex gap-4">
                  <a
                    href={currentSystem.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-sans font-semibold text-xs hover:border-zinc-700 hover:text-white transition-all duration-200"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Source Repository
                    <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
