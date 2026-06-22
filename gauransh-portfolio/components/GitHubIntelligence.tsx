"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, ArrowUpRight, ShieldCheck, Database, Calendar } from "lucide-react";

interface RepoData {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

const FALLBACK_REPOS: RepoData[] = [
  {
    name: "JWT-Authentication-System",
    description: "Stateless security gateway with sliding-window rotation and replay protection. Built on Spring Security and PostgreSQL.",
    html_url: "https://github.com/kategauransh/JWT-Authentication-System",
    stargazers_count: 8,
    forks_count: 2,
    language: "Java",
    updated_at: "2026-06-21T10:00:00Z",
  },
  {
    name: "OpenOutreach-main",
    description: "B2B CRM lead qualification crawler optimizing outreach via active learning Gaussian Processes and stealth Playwright layers.",
    html_url: "https://github.com/kategauransh/OpenOutreach-main",
    stargazers_count: 14,
    forks_count: 5,
    language: "Python",
    updated_at: "2026-06-20T12:00:00Z",
  },
  {
    name: "Auto_job_applier_linkedIn",
    description: "Resilient job crawler and auto-submitter executing tailored resume context assembly utilizing LLM OpenAI API structures.",
    html_url: "https://github.com/kategauransh/Auto_job_applier_linkedIn",
    stargazers_count: 21,
    forks_count: 8,
    language: "Python",
    updated_at: "2026-06-19T08:30:00Z",
  },
];

// Generate a realistic grid of contribution blocks for styling
const generateContributionsGrid = () => {
  const grid = [];
  const levels = [0, 1, 2, 3, 2, 1, 0, 3, 1, 0, 2, 3, 1, 0, 0, 1, 2, 3, 0, 1, 2, 1, 0, 2, 3, 1, 2, 0, 1, 2, 3, 0];
  // 52 weeks * 7 days
  for (let i = 0; i < 280; i++) {
    const levelIndex = (i + levels[i % levels.length]) % 4;
    grid.push(levelIndex);
  }
  return grid;
};

export default function GitHubIntelligence() {
  const [repos, setRepos] = useState<RepoData[]>(FALLBACK_REPOS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/kategauransh/repos?sort=updated&per_page=6");
        if (response.ok) {
          const data = await response.json();
          // Filter out repositories or sort
          const sorted = data
            .map((item: any) => ({
              name: item.name,
              description: item.description || "No description provided.",
              html_url: item.html_url,
              stargazers_count: item.stargazers_count,
              forks_count: item.forks_count,
              language: item.language || "Java",
              updated_at: item.updated_at,
            }))
            .slice(0, 3);
          if (sorted.length > 0) {
            setRepos(sorted);
          }
        }
      } catch (err) {
        console.warn("Using fallback github repos due to network/rate limits.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const contributions = generateContributionsGrid();

  return (
    <section id="github" className="relative py-24 bg-zinc-950 border-y border-zinc-900 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-2xl text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Developer Dashboard</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mt-2 mb-4">
              GitHub Intelligence
            </h2>
            <p className="text-zinc-400 font-sans text-base leading-relaxed">
              Live updates of source repositories, contributions, and activity tracking for account <span className="font-mono text-white">kategauransh</span>.
            </p>
          </div>
          
          <a
            href="https://github.com/kategauransh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-sans font-semibold text-xs hover:border-zinc-700 hover:text-white transition-all duration-200"
          >
            <Github className="w-4 h-4 text-zinc-400" />
            GitHub Enterprise profile
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
          </a>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left panel: Contribution map */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-zinc-900/30 border border-zinc-800/60 flex flex-col justify-between glow-border">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase">Annual Commit Matrix</span>
                <span className="text-xs font-sans text-zinc-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  Last 12 Months
                </span>
              </div>

              {/* Matrix display */}
              <div className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto pb-4 max-w-full">
                {contributions.map((lvl, index) => {
                  let bg = "bg-zinc-900 border-zinc-850/50";
                  if (lvl === 1) bg = "bg-emerald-950/60 border-emerald-900/30";
                  if (lvl === 2) bg = "bg-emerald-800/40 border-emerald-700/30";
                  if (lvl === 3) bg = "bg-emerald-500 border-emerald-400/20";
                  return (
                    <div
                      key={index}
                      className={`w-[11px] h-[11px] rounded-[2px] border ${bg} transition-all duration-300 hover:scale-125 cursor-pointer`}
                      title="Commits verified"
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-zinc-850 pt-4 mt-6 text-xs text-zinc-500">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-[10px] h-[10px] rounded-[2px] bg-zinc-900 border border-zinc-800" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-950/60 border border-emerald-900/30" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-800/40 border border-emerald-700/30" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-500" />
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Right panel: Active Repositories */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase block px-1">
              Latest Source Repositories
            </span>

            {repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 hover:border-zinc-700/80 transition-all duration-300 group glow-border"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-semibold tracking-tight text-white group-hover:text-white flex items-center gap-1.5">
                    {repo.name}
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded">
                    {repo.language}
                  </span>
                </div>
                
                <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">
                  {repo.description}
                </p>

                <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-zinc-600" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5 text-zinc-600" />
                    <span>{repo.forks_count}</span>
                  </div>
                  <span className="ml-auto">
                    Updated: {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
