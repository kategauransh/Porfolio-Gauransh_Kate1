"use client";

import React, { useState } from "react";
import { Download, Eye, FileText, Check, Copy, ArrowUpRight } from "lucide-react";

export default function ResumeSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("gauranshkate.it@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="resume" className="relative py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-2xl text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Document</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mt-2 mb-4">
              Curriculum Vitae
            </h2>
            <p className="text-zinc-400 font-sans text-base leading-relaxed">
              Verify credentials, technical education milestones, and career experience records.
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="/resume.pdf"
              download="Gauransh_Kate_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-sans font-semibold text-xs hover:bg-zinc-200 transition-all duration-200 shadow-md shadow-white/5"
            >
              <Download className="w-4 h-4 text-zinc-900" />
              Download ATS PDF
            </a>
          </div>
        </div>

        {/* Browser Preview Mock */}
        <div className="rounded-3xl bg-zinc-900/30 border border-zinc-800/80 overflow-hidden shadow-2xl max-w-4xl mx-auto glow-border">
          {/* Mock Browser Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/80 border-b border-zinc-850">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-zinc-850" />
              <span className="w-3 h-3 rounded-full bg-zinc-850" />
              <span className="w-3 h-3 rounded-full bg-zinc-850" />
              <span className="text-[10px] font-mono text-zinc-500 ml-4 tracking-wider">
                GAURANSH_KATE_RESUME.pdf
              </span>
            </div>
            
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors text-xs font-mono"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied Email
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy email contact
                </>
              )}
            </button>
          </div>

          {/* Scrollable Mock Document Body */}
          <div className="p-8 md:p-12 max-h-[640px] overflow-y-auto bg-zinc-950 text-zinc-400 font-sans text-xs md:text-sm space-y-8 select-text">
            {/* Resume Header */}
            <div className="text-center border-b border-zinc-850 pb-6 space-y-2">
              <h3 className="text-2xl font-bold tracking-tight text-white font-display">Gauransh Kate</h3>
              <p className="text-zinc-400 font-mono tracking-widest text-xs uppercase">
                Java Backend Engineer | Pune, India
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-zinc-500 text-[11px] font-mono">
                <a href="mailto:gauranshkate.it@gmail.com" className="hover:text-white transition-colors">gauranshkate.it@gmail.com</a>
                <span>•</span>
                <a href="https://linkedin.com/in/gauranshkate26" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-0.5">LinkedIn <ArrowUpRight className="w-2.5 h-2.5" /></a>
                <span>•</span>
                <a href="https://github.com/kategauransh" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-0.5">GitHub <ArrowUpRight className="w-2.5 h-2.5" /></a>
              </div>
            </div>

            {/* Resume Section: Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono border-b border-zinc-850 pb-1">
                Executive Profile
              </h4>
              <p className="leading-relaxed">
                Focused Java Backend Developer with professional hands-on expertise building microservices, REST APIs, and authentication pipelines. Specialized in Spring Boot configurations, Hibernate JPA relationship mapping, and PostgreSQL design. Competent in Docker environment containerizations and robust API validations.
              </p>
            </div>

            {/* Resume Section: Skills */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono border-b border-zinc-850 pb-1">
                Core Competencies
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <span className="text-zinc-500 block mb-1">LANGUAGES / FRAMEWORKS</span>
                  <span className="text-zinc-300 block">Java (SE/EE), Spring Boot, Spring Security</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1">PERSISTENCE / CONTAINERS</span>
                  <span className="text-zinc-300 block">Hibernate, JPA, PostgreSQL, Docker, Maven</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1">STANDARDS / SYSTEMS</span>
                  <span className="text-zinc-300 block">REST APIs, JWT Tokens, Git, Swagger/OpenAPI</span>
                </div>
              </div>
            </div>

            {/* Resume Section: Work Experience */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono border-b border-zinc-850 pb-1">
                Professional Experience
              </h4>

              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-semibold text-white">Software Engineering Intern</span>
                  <span className="font-mono text-zinc-500">June 2024 - November 2024</span>
                </div>
                <div className="text-zinc-500 font-mono text-[11px]">Tech Solutions | Pune, India</div>
                <ul className="list-disc list-inside space-y-1 mt-2 text-zinc-400">
                  <li>Engineered 12+ RESTful microservice API endpoints in Node.js/Express, reducing average response latencies by 30% through targeted PostgreSQL indexing.</li>
                  <li>Authored 90+ integration tests using Jest, expanding test coverage from 60% to 92% and preventing 15+ pre-release security issues.</li>
                  <li>Performed token validation audits to secure routing paths across internal developer services.</li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-semibold text-white">Core Open-Source Contributor</span>
                  <span className="font-mono text-zinc-500">2023 - Present</span>
                </div>
                <div className="text-zinc-500 font-mono text-[11px]">GitHub / Tech Community</div>
                <ul className="list-disc list-inside space-y-1 mt-2 text-zinc-400">
                  <li>Integrated active learning models (Gaussian Processes) into B2B lead generation modules to rank profiles by embedding similarity.</li>
                  <li>Programmed browser scraping automation strategies including user-agent rotation and rate limiters to preserve site validation constraints.</li>
                </ul>
              </div>
            </div>

            {/* Resume Section: Education */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono border-b border-zinc-850 pb-1">
                Academic Background
              </h4>

              <div className="space-y-1">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-semibold text-white">Bachelor of Engineering in Information Technology</span>
                  <span className="font-mono text-zinc-500">2021 - 2025</span>
                </div>
                <div className="text-zinc-500 font-mono text-[11px]">
                  Shrimati Kashibai Navale College of Engineering | Pune, India
                </div>
                <p className="mt-1 text-zinc-400 text-xs">
                  Coursework: Data Structures & Algorithms, Database Management Systems, Network Security, Operating Systems.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-semibold text-white">Professional Software Training (Full Stack & Java Security)</span>
                  <span className="font-mono text-zinc-500">Sept 2025 - April 2026</span>
                </div>
                <div className="text-zinc-500 font-mono text-[11px]">
                  Naresh I Technologies | Hyderabad, India
                </div>
                <p className="mt-1 text-zinc-400 text-xs">
                  Intense practical training specializing in Enterprise Java configurations, Spring Security filter chains, Hibernate, JPA and SQL.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
