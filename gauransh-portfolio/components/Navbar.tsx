"use client";

import React, { useState } from "react";
import { useScroll } from "@/hooks/use-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ShieldCheck } from "lucide-react";

const NAV_ITEMS = [
  { label: "Systems", href: "#systems" },
  { label: "Architecture", href: "#architecture" },
  { label: "Stack", href: "#stack" },
  { label: "GitHub", href: "#github" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useScroll(20);

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/40"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-2 group text-white font-display font-semibold tracking-wide text-lg"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-300">
              <ShieldCheck className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-lg blur-md transition-all duration-300" />
            </div>
            <span>
              gauransh<span className="text-zinc-500">.dev</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/40 border border-zinc-800/50 rounded-full px-2 py-1.5 backdrop-blur-md">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-1.5 rounded-full text-zinc-400 hover:text-white font-sans text-sm font-medium transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-white text-black font-sans text-xs font-semibold hover:bg-zinc-200 transition-colors duration-200"
            >
              Hire Me
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[60px] z-40 md:hidden bg-zinc-950 border-b border-zinc-800 p-6 flex flex-col gap-4 shadow-xl"
          >
            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 rounded-lg text-zinc-400 hover:text-white font-sans text-base font-medium hover:bg-zinc-900 transition-all duration-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="h-px bg-zinc-800 my-2" />
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full justify-center inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-white text-black font-sans text-sm font-semibold hover:bg-zinc-200 transition-all"
            >
              Hire Me
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
