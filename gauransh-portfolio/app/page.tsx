"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EngineeringProof from "@/components/EngineeringProof";
import FeaturedSystems from "@/components/FeaturedSystems";
import ArchitectureThinking from "@/components/ArchitectureThinking";
import TechnicalExpertise from "@/components/TechnicalExpertise";
import GitHubIntelligence from "@/components/GitHubIntelligence";
import LearningJourney from "@/components/LearningJourney";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-white/10 selection:text-white">
      {/* Floating Sticky Navigation Header */}
      <Navbar />

      {/* Hero Entrance Block */}
      <Hero />

      {/* Verified Metrics KPIs */}
      <EngineeringProof />

      {/* Featured Enterprise Architectures */}
      <FeaturedSystems />

      {/* Interactive Architecture SVG Dataflow Paths */}
      <ArchitectureThinking />

      {/* Domain-Mapped Technical Expertise */}
      <TechnicalExpertise />

      {/* Real-time GitHub Repositories Dashboard */}
      <GitHubIntelligence />

      {/* Vertical Growth Journey Timeline */}
      <LearningJourney />

      {/* Professional ATS Resume Mockup Viewer */}
      <ResumeSection />

      {/* Minimal Validate Form & Coordinates */}
      <ContactSection />

      {/* Micro-SaaS Footing Layer */}
      <footer className="relative py-12 border-t border-zinc-900/60 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <span>
            © {new Date().getFullYear()} Gauransh Kate. All rights reserved.
          </span>
          <div className="flex gap-4">
            <span className="hover:text-zinc-400 transition-colors">
              Designed as a software product
            </span>
            <span>•</span>
            <span className="hover:text-zinc-400 transition-colors">
              Next.js 15 App Router
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
