"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Shield, Database, LayoutGrid, Award, HardDrive } from "lucide-react";

interface SkillDomain {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  skills: {
    name: string;
    level: string; // e.g. "Advanced", "Expert", "Proficient"
    details: string;
  }[];
}

const EXPERTISE_DOMAINS: SkillDomain[] = [
  {
    id: "backend",
    name: "Backend Engineering",
    description: "Architecting high-throughput, structured Java applications using robust service-oriented layouts.",
    icon: Terminal,
    skills: [
      { name: "Java SE/EE", level: "Advanced", details: "Deep understanding of OOP principles, concurrency constructs (CompletableFuture), streams, and multi-threading." },
      { name: "Spring Boot", level: "Expert", details: "Creating scalable web applications, implementing auto-configurations, DTO patterns, and custom configurations." },
      { name: "Hibernate & JPA", level: "Expert", details: "Mapping entity relationships, managing persistent states, and troubleshooting JPA query latencies." },
      { name: "Maven", level: "Proficient", details: "Project structure management, dependency scope resolution, and lifecycle builds." },
    ],
  },
  {
    id: "database",
    name: "Database Engineering",
    description: "Designing optimized database structures, optimizing relational layers, and managing isolation levels.",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: "Advanced", details: "Relational database setup, managing indices, and querying complex multi-table joins." },
      { name: "Database Design", level: "Advanced", details: "Normalizing tables, designing primary/foreign key relationships, and ensuring referential integrity." },
      { name: "HikariCP", level: "Proficient", details: "Configuring connection pools, connection timeout thresholds, and max pool allocations." },
    ],
  },
  {
    id: "security",
    name: "Security Engineering",
    description: "Implementing stateless security models, credential hashing, and method-level access controls.",
    icon: Shield,
    skills: [
      { name: "Spring Security", level: "Advanced", details: "Customizing SecurityFilterChains, managing public vs protected routes, and configuring AuthenticationManager." },
      { name: "JWT Auth", level: "Advanced", details: "Signing claims, handling token expiration, rotation filters, and sliding-window verifications." },
      { name: "BCrypt Cryptography", level: "Expert", details: "Hashing user passwords with secure salt strengths (strength factors) to protect database tables from compromise." },
      { name: "RBAC Controls", level: "Advanced", details: "Configuring Role-Based Access Control using security context scopes and `@PreAuthorize` method decorators." },
    ],
  },
  {
    id: "design",
    name: "Software Design Thinking",
    description: "Applying decoupled coding structures, SOLID design paradigms, and scalable architecture design patterns.",
    icon: HardDrive,
    skills: [
      { name: "Clean Architecture", level: "Expert", details: "Enforcing clear separation between models, repositories, business logic, and API route controllers." },
      { name: "SOLID Principles", level: "Expert", details: "Ensuring classes have single responsibilities, interfaces are lean, and components are closed to modification." },
      { name: "Design Patterns", level: "Advanced", details: "Implementing Builder, Singleton, Factory, and DTO/DAO patterns for maintainable codebases." },
    ],
  },
  {
    id: "tooling",
    name: "Developer Tooling",
    description: "Isolating runtime environments, managing version controls, and automating release builds.",
    icon: LayoutGrid,
    skills: [
      { name: "Docker", level: "Proficient", details: "Containerizing backend services, setting up Docker Compose networks, and optimizing build layers." },
      { name: "Git & Workflows", level: "Advanced", details: "Structuring repositories, handling branches, commits, merges, and staging updates." },
      { name: "Swagger / OpenAPI", level: "Advanced", details: "Auto-generating interface documentation and annotating controllers for descriptive API layouts." },
    ],
  },
];

export default function TechnicalExpertise() {
  const [activeDomain, setActiveDomain] = useState<string>("backend");

  const currentDomain = EXPERTISE_DOMAINS.find((d) => d.id === activeDomain) || EXPERTISE_DOMAINS[0];

  return (
    <section id="stack" className="relative py-24 bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-left mb-16 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Expertise</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mt-2 mb-4">
            Technical Stack
          </h2>
          <p className="text-zinc-400 font-sans text-base leading-relaxed">
            A comprehensive mapping of engineering capabilities, programming concepts, and framework implementations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Domain Tab List */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {EXPERTISE_DOMAINS.map((domain) => {
              const IconComponent = domain.icon;
              return (
                <button
                  key={domain.id}
                  onClick={() => setActiveDomain(domain.id)}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 flex items-center justify-between ${
                    activeDomain === domain.id
                      ? "bg-zinc-900 border-zinc-700/80 text-white shadow-sm"
                      : "bg-zinc-900/10 border-zinc-800/40 text-zinc-400 hover:border-zinc-850 hover:bg-zinc-900/30"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2 rounded-lg ${
                      activeDomain === domain.id ? "bg-zinc-800 text-white" : "bg-zinc-900 text-zinc-500"
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold tracking-tight">{domain.name}</span>
                  </div>
                  <Award className={`w-3.5 h-3.5 ${
                    activeDomain === domain.id ? "text-indigo-400 opacity-100" : "text-zinc-600 opacity-0"
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Active Domain Panel */}
          <div className="lg:col-span-8 p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/65 min-h-[420px] flex flex-col justify-between glow-border">
            <div>
              <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono mb-4">
                <span>DOMAIN CLASSIFICATION</span>
                <span>/</span>
                <span className="text-zinc-300 font-semibold">{currentDomain.name.toUpperCase()}</span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight mb-2">
                {currentDomain.name}
              </h3>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed mb-8">
                {currentDomain.description}
              </p>

              {/* Skills Sub-Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentDomain.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-white font-sans">{skill.name}</span>
                      <span className="text-[10px] font-mono font-medium tracking-tight text-zinc-400 bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                      {skill.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-zinc-850 mt-10 pt-4 flex flex-wrap gap-2 text-[10px] text-zinc-500 font-mono">
              <span>STANDARDS COMPLIANT</span>
              <span>•</span>
              <span>100% CLEAN ARCHITECTURE</span>
              <span>•</span>
              <span>ENTERPRISE SPEC READY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
