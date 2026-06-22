"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, Cpu, Database, Network, FileCode2 } from "lucide-react";

const PROOF_CARDS = [
  {
    title: "Production-Style Systems",
    metric: "3 Architectures",
    description: "End-to-end projects featuring clean service architecture, dependency boundaries, and high reliability.",
    icon: Cpu,
    details: ["PrintFlow Platform", "IdentityHub Authentication", "VoiceScribe Speech Pipeline"],
  },
  {
    title: "Spring Security Controls",
    metric: "JWT & RBAC Gateways",
    description: "Stateless security gateways with token encryption, sliding-window expiration, and granular role permissions.",
    icon: ShieldCheck,
    details: ["BCrypt Cryptography", "Security Filter Chains", "Custom Auth Providers"],
  },
  {
    title: "REST APIs Designed",
    metric: "OpenAPI Standard",
    description: "Structured, RESTful API endpoints adhering to standard HTTP statuses, request schemas, and response envelopes.",
    icon: Network,
    details: ["Sub-15ms Route Handlers", "DTO Pattern Mapping", "Swagger/OpenAPI UI Logs"],
  },
  {
    title: "Database Models Created",
    metric: "PostgreSQL & JPA/JPA-SQL",
    description: "Highly relational schemas configured with appropriate primary/foreign keys, joins, indexes, and JPA mappings.",
    icon: Database,
    details: ["Hibernate ORM", "One-to-Many Relationships", "Custom Fetch Profiles"],
  },
  {
    title: "Dockerized Environments",
    metric: "Multi-Stage Containers",
    description: "Deploy-ready container configurations isolating backend systems, databases, and dependencies.",
    icon: ShieldAlert,
    details: ["Docker Compose Orchestration", "Environment-Decoupled Config", "Alpine base layer sizes"],
  },
  {
    title: "Swagger Documented Services",
    metric: "Global Exception Boundaries",
    description: "Auto-generated OpenAPI specification endpoints with schema descriptors and standard error contracts.",
    icon: FileCode2,
    details: ["GlobalExceptionController", "Model validations (@Valid)", "Descriptive UI specs"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  },
};

export default function EngineeringProof() {
  return (
    <section id="proof" className="relative py-24 bg-zinc-950 border-y border-zinc-900 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-left mb-16 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Core Metrics</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mt-2 mb-4">
            Engineering Verification
          </h2>
          <p className="text-zinc-400 font-sans text-base">
            Quantifiable indicators of architectural quality and backend best practices implemented across systems.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROOF_CARDS.map((card, index) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              whileHover={{ y: -6, borderColor: "rgba(255,255,255,0.15)" }}
              className="relative p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 transition-all duration-300 flex flex-col group overflow-hidden glow-border"
            >
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-850 text-zinc-400 group-hover:text-white group-hover:bg-zinc-800 transition-colors duration-300">
                  <card.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase bg-zinc-900/80 px-2.5 py-1 rounded-md border border-zinc-800/40">
                  Verified
                </span>
              </div>

              <div className="flex-1">
                <div className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-1">
                  {card.title}
                </div>
                <div className="text-2xl font-display font-bold text-white mb-3 tracking-tight">
                  {card.metric}
                </div>
                <p className="text-sm text-zinc-400 font-sans leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              <div className="h-px bg-zinc-800/50 my-4" />

              <ul className="flex flex-wrap gap-1.5 mt-auto">
                {card.details.map((detail) => (
                  <li
                    key={detail}
                    className="text-[10px] font-medium font-mono tracking-tight text-zinc-500 bg-zinc-900/40 border border-zinc-800/40 px-2 py-0.5 rounded"
                  >
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
