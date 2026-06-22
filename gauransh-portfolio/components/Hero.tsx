"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, FileText, LayoutGrid, Terminal, ShieldCheck, Database, Layers, ArrowRight } from "lucide-react";

const TECH_PILLS = [
  { name: "Spring Boot", icon: Terminal, color: "hover:border-green-500/30 hover:bg-green-500/5 hover:text-green-400" },
  { name: "Spring Security", icon: ShieldCheck, color: "hover:border-blue-500/30 hover:bg-blue-500/5 hover:text-blue-400" },
  { name: "Hibernate", icon: Layers, color: "hover:border-amber-500/30 hover:bg-amber-500/5 hover:text-amber-400" },
  { name: "JPA", icon: Layers, color: "hover:border-yellow-500/30 hover:bg-yellow-500/5 hover:text-yellow-400" },
  { name: "PostgreSQL", icon: Database, color: "hover:border-indigo-500/30 hover:bg-indigo-500/5 hover:text-indigo-400" },
  { name: "Docker", icon: Layers, color: "hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:text-cyan-400" },
  { name: "REST APIs", icon: Terminal, color: "hover:border-rose-500/30 hover:bg-rose-500/5 hover:text-rose-400" },
  { name: "JWT", icon: ShieldCheck, color: "hover:border-purple-500/30 hover:bg-purple-500/5 hover:text-purple-400" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-zinc-950">
      {/* Background Grids & Aurora Blur */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(9,9,11,0)_40%,#09090b_100%)] pointer-events-none" />
      
      {/* Aurora mesh blurs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "2s" }} />

      {/* Spotlight Effect SVG */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter-spotlight)">
            <ellipse
              cx="600"
              cy="-100"
              rx="400"
              ry="250"
              fill="rgba(168, 85, 247, 0.15)"
            />
          </g>
          <defs>
            <filter
              id="filter-spotlight"
              x="0"
              y="-550"
              width="1200"
              height="900"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur" />
            </filter>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Floating status badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-medium tracking-wide mb-8 hover:border-zinc-700 transition-all duration-300 shadow-md shadow-black/40"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Open to Opportunities
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-8xl font-display font-extrabold tracking-tight text-white mb-4 text-glow"
        >
          GAURANSH KATE
        </motion.h1>

        {/* Subheadline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg md:text-2xl font-display font-semibold tracking-widest text-zinc-500 uppercase mb-6"
        >
          JAVA BACKEND ENGINEER
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-base md:text-xl font-sans text-zinc-400 max-w-2xl leading-relaxed mb-10"
        >
          Building secure APIs, authentication systems, and scalable backend platforms using Spring Boot and PostgreSQL. Focused on clean architecture, resilient data layers, and production performance.
        </motion.p>

        {/* Primary CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-4 mb-14"
        >
          <a
            href="#systems"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-zinc-950 font-sans font-semibold text-sm hover:bg-zinc-200 transition-all shadow-lg hover:shadow-white/10"
          >
            View Systems
            <LayoutGrid className="w-4 h-4 text-zinc-950 group-hover:scale-105 transition-transform" />
          </a>

          <a
            href="#resume"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-sans font-semibold text-sm hover:text-white hover:border-zinc-700 transition-all hover:bg-zinc-900/80"
          >
            Download Resume
            <FileText className="w-4 h-4 text-zinc-400" />
          </a>

          <a
            href="https://github.com/kategauransh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-sans font-semibold text-sm hover:text-white hover:border-zinc-700 transition-all hover:bg-zinc-900/80"
          >
            GitHub
            <Github className="w-4 h-4 text-zinc-400" />
          </a>
        </motion.div>

        {/* Technology Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-4xl"
        >
          <div className="flex flex-wrap justify-center gap-2.5">
            {TECH_PILLS.map((tech, index) => (
              <motion.div
                key={tech.name}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/40 border border-zinc-800/60 text-zinc-400 text-sm font-medium transition-all duration-300 cursor-default select-none ${tech.color}`}
              >
                <tech.icon className="w-3.5 h-3.5" />
                <span>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Subtle indicator scroll down */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40 hover:opacity-75 transition-opacity duration-300 cursor-pointer">
        <a href="#proof" className="flex flex-col items-center">
          <span className="text-[10px] tracking-widest uppercase font-medium text-zinc-500">Explore</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-90 text-zinc-400 mt-1" />
          </motion.div>
        </a>
      </div>
    </section>
  );
}
