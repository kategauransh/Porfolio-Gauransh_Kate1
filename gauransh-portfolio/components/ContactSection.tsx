"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, Send, Loader2, CheckCircle2, ShieldAlert } from "lucide-react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMessage("Please enter all required fields.");
      setStatus("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      // Simulate form submission to backend/service
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left panel: Info & CTAs */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Contact</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mt-2 mb-4">
                Get In Touch
              </h2>
              <p className="text-zinc-400 font-sans text-base leading-relaxed">
                Looking for backend assistance, microservice integrations, or database design audits? Send a query here.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 space-y-4 glow-border">
              <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase block">
                Availability Status
              </span>
              <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                Currently looking for <strong>Java Backend Engineering</strong> positions in Pune, India, or remote-compatible arrangements.
              </p>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-center gap-3.5 text-zinc-400">
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-850">
                  <Mail className="w-4 h-4 text-zinc-500" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">EMAIL INBOX</span>
                  <a href="mailto:gauranshkate.it@gmail.com" className="text-zinc-300 hover:text-white transition-colors">
                    gauranshkate.it@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 text-zinc-400">
                <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-850">
                  <MapPin className="w-4 h-4 text-zinc-500" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">CURRENT LOCATION</span>
                  <span className="text-zinc-300">Pune, Maharashtra, India</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href="https://linkedin.com/in/gauranshkate26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-zinc-500" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/kategauransh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                >
                  <Github className="w-4 h-4 text-zinc-500" />
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Right panel: Contact Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-zinc-900/10 border border-zinc-800/80 shadow-xl glow-border">
            <h3 className="text-sm font-semibold tracking-tight text-white mb-6">
              Transmit secure message envelope
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/25 text-emerald-400 text-xs flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>Transmission Succeeded.</strong> Your message envelope has been submitted. I will respond to this query within 24 hours.
                    </div>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 text-rose-400 text-xs flex items-start gap-3"
                  >
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>Transmission Blocked.</strong> {errorMessage}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2 text-left">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Identified Sender Name
                </label>
                <input
                  type="text"
                  placeholder="E.g., Gaurav Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-all font-sans"
                  disabled={status === "loading"}
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Reply-To Coordinates (Email)
                </label>
                <input
                  type="email"
                  placeholder="E.g., contact@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-all font-sans"
                  disabled={status === "loading"}
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Message Payload Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Outline your requirements, project schedules, or job constraints here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-all font-sans resize-none"
                  disabled={status === "loading"}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 transition-all text-sm font-semibold font-sans disabled:bg-zinc-800 disabled:text-zinc-600"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Transmitting envelope...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Transmit message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
