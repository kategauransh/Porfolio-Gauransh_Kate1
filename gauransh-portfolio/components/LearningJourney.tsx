"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Terminal, Award, HelpCircle } from "lucide-react";

interface Milestone {
  stage: string;
  title: string;
  description: string;
  skillsAcquired: string[];
}

const TIMELINE_STEPS: Milestone[] = [
  {
    stage: "Java",
    title: "Core Programming Foundations",
    description: "Deep study of language fundamentals, object-oriented concepts, exception handling, data structures, and the memory model.",
    skillsAcquired: ["Generics", "Collections Framework", "Multithreading", "File I/O"],
  },
  {
    stage: "Spring Framework",
    title: "Dependency Injection & Core Context",
    description: "Learning key inversion of control (IoC) structures, bean configurations, context cycles, and Aspect-Oriented Programming (AOP).",
    skillsAcquired: ["Spring IoC", "Bean Scopes", "Autowiring", "AOP Interceptors"],
  },
  {
    stage: "Spring Boot",
    title: "Auto-Configuration & Micro-APIs",
    description: "Building production-style web microservices, configuration profiles, dependency starters, and embedded Tomcat routing.",
    skillsAcquired: ["Starters", "Profiles Config", "RestController", "Properties files"],
  },
  {
    stage: "Hibernate & JPA",
    title: "Object-Relational Mapping (ORM)",
    description: "Mapping relational databases directly to Java models, transactional boundaries, entity states, and query optimizations.",
    skillsAcquired: ["Entity mapping", "Lazy Loading", "Entity Graphs", "JPQL/Criteria"],
  },
  {
    stage: "Spring Security",
    title: "API Security & JWT Gateways",
    description: "Securing routes, configuring user authentication, managing JSON Web Token signing, validation filters, and RBAC mappings.",
    skillsAcquired: ["Security Filter Chain", "BCrypt Hashing", "JWT Filters", "Method Security"],
  },
  {
    stage: "Microservices",
    title: "Distributed Architecture & Gateways",
    description: "Understanding load balancers, Eureka registry discoveries, gateway configurations, and circuit breaker patterns.",
    skillsAcquired: ["API Gateway", "Eureka Discovery", "Feign Clients", "Config Server"],
  },
];

export default function LearningJourney() {
  return (
    <section id="journey" className="relative py-24 bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-left mb-16 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Milestones</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mt-2 mb-4">
            Engineering Journey
          </h2>
          <p className="text-zinc-400 font-sans text-base leading-relaxed">
            A chronological timeline of framework adoptions, security engineering skills, and system architecture growth.
          </p>
        </div>

        {/* Vertical Timeline container */}
        <div className="relative border-l border-zinc-800/80 ml-4 md:ml-8 space-y-12 py-4">
          {TIMELINE_STEPS.map((step, idx) => (
            <div key={step.stage} className="relative pl-8 group">
              {/* Timeline dot node */}
              <div className="absolute -left-[9px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-950 border-2 border-zinc-800 group-hover:border-indigo-500 transition-colors duration-300">
                <div className="h-1.5 w-1.5 rounded-full bg-zinc-700 group-hover:bg-indigo-400 transition-colors duration-300" />
              </div>

              {/* Timeline Card content */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800/50 hover:border-zinc-800 transition-all duration-300 max-w-3xl relative glow-border"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 px-2 py-0.5 rounded">
                      {step.stage}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600 hidden md:inline" />
                    <h3 className="text-sm font-semibold tracking-tight text-white">
                      {step.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    Phase 0{idx + 1}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-zinc-400 font-sans leading-relaxed mb-4">
                  {step.description}
                </p>

                {/* Sub-badges for skills acquired */}
                <div className="flex flex-wrap gap-1.5">
                  {step.skillsAcquired.map((skill) => (
                    <span
                      key={skill}
                      className="text-[9px] font-mono font-medium tracking-tight text-zinc-500 bg-zinc-900/60 border border-zinc-850 px-2 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
