"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, ShieldAlert, Database, Layers, ArrowRight, Activity, Terminal } from "lucide-react";

interface DiagramType {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
}

const DIAGRAMS: DiagramType[] = [
  {
    id: "data-flow",
    name: "Model-Service-Repository Flow",
    description: "Standard layered Spring architecture showing request processing, transactional boundary entry, and persistence.",
    icon: Layers,
  },
  {
    id: "jwt-lifecycle",
    name: "JWT Authentication Gate",
    description: "Flow of token extraction, filter intercepts, security context storage, and JWT token rotation checks.",
    icon: Network,
  },
  {
    id: "request-lifecycle",
    name: "Spring Boot Request Lifecycle",
    description: "Detailed step-by-step route traversal starting at CORS validation filters through Interceptors down to DispatcherServlet.",
    icon: Activity,
  },
  {
    id: "exception-pipeline",
    name: "Global Exception Boundaries",
    description: "Catch-all error mapping intercepts raising exceptions from database/service layers to compile unified REST envelopes.",
    icon: ShieldAlert,
  },
];

export default function ArchitectureThinking() {
  const [selectedDiagram, setSelectedDiagram] = useState<string>("data-flow");

  const currentDiagram = DIAGRAMS.find((d) => d.id === selectedDiagram) || DIAGRAMS[0];

  return (
    <section id="architecture" className="relative py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-left mb-16 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">System Design</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mt-2 mb-4">
            Architecture Thinking
          </h2>
          <p className="text-zinc-400 font-sans text-base leading-relaxed">
            Detailed visualization of request flows, security boundaries, and validation hierarchies within Spring Boot applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left panel: Diagram selector buttons */}
          <div className="lg:col-span-4 space-y-3.5">
            {DIAGRAMS.map((diag) => {
              const IconComp = diag.icon;
              return (
                <button
                  key={diag.id}
                  onClick={() => setSelectedDiagram(diag.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                    selectedDiagram === diag.id
                      ? "bg-zinc-900 border-zinc-700/80 text-white shadow-lg shadow-black/40"
                      : "bg-zinc-900/20 border-zinc-800/40 text-zinc-400 hover:border-zinc-800 hover:text-white"
                  }`}
                >
                  <div className={`p-2.5 rounded-lg border ${
                    selectedDiagram === diag.id
                      ? "bg-zinc-800 border-zinc-750 text-white"
                      : "bg-zinc-900/50 border-zinc-850 text-zinc-500"
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold tracking-tight">{diag.name}</h4>
                    <p className="text-xs text-zinc-500 font-sans mt-1 leading-normal">
                      {diag.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right panel: Live animated diagram container */}
          <div className="lg:col-span-8 p-8 rounded-3xl bg-zinc-900/20 border border-zinc-800/60 min-h-[480px] flex flex-col justify-between overflow-hidden glow-border relative">
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-zinc-950 border border-zinc-800/60 px-2.5 py-1 rounded-md text-[10px] text-zinc-500 font-mono">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
              </span>
              SYSTEM ARCHITECTURE LIVE
            </div>

            <div className="flex-1 flex items-center justify-center py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDiagram}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="w-full flex justify-center"
                >
                  {selectedDiagram === "data-flow" && <DataFlowDiagram />}
                  {selectedDiagram === "jwt-lifecycle" && <JWTAuthenticationDiagram />}
                  {selectedDiagram === "request-lifecycle" && <RequestLifecycleDiagram />}
                  {selectedDiagram === "exception-pipeline" && <ExceptionPipelineDiagram />}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="h-px bg-zinc-800/50 my-4" />
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-sans leading-relaxed">
              <Terminal className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              <span>
                <strong>Architectural Note:</strong> Custom components are decoupled, using dependency injection patterns and clean interface abstractions.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 1. Model-Service-Repository Flow Diagram */
function DataFlowDiagram() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full max-w-lg">
      <div className="flex flex-col items-center p-4 rounded-xl bg-zinc-950 border border-zinc-800/60 w-36 text-center shadow-md">
        <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-wider mb-1 font-sans">1. Client API</span>
        <span className="text-white text-xs font-semibold font-mono">RestController</span>
      </div>

      <motion.div
        animate={{ x: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="rotate-90 md:rotate-0 text-zinc-600"
      >
        <ArrowRight className="w-4 h-4" />
      </motion.div>

      <div className="flex flex-col items-center p-4 rounded-xl bg-zinc-950 border border-zinc-850 w-36 text-center relative shadow-md">
        <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-wider mb-1 font-sans">2. Logics & Tx</span>
        <span className="text-indigo-400 text-xs font-semibold font-mono">Service Layer</span>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[7px] text-zinc-400 font-mono uppercase tracking-widest font-bold">
          Transactional
        </div>
      </div>

      <motion.div
        animate={{ x: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="rotate-90 md:rotate-0 text-zinc-600"
      >
        <ArrowRight className="w-4 h-4" />
      </motion.div>

      <div className="flex flex-col items-center p-4 rounded-xl bg-zinc-950 border border-zinc-800/60 w-36 text-center shadow-md">
        <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-wider mb-1 font-sans">3. JPA Query</span>
        <span className="text-emerald-400 text-xs font-semibold font-mono">Repository</span>
      </div>

      <motion.div
        animate={{ x: [-5, 5, -5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="rotate-90 md:rotate-0 text-zinc-600"
      >
        <ArrowRight className="w-4 h-4" />
      </motion.div>

      <div className="flex flex-col items-center p-4 rounded-xl bg-zinc-950 border border-zinc-850 w-36 text-center shadow-md">
        <span className="text-zinc-500 text-[9px] uppercase font-bold tracking-wider mb-1 font-sans">4. Storage</span>
        <span className="text-cyan-400 text-xs font-semibold font-mono">PostgreSQL</span>
      </div>
    </div>
  );
}

/* 2. JWT Authentication Gate Diagram */
function JWTAuthenticationDiagram() {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      <div className="flex justify-between items-center w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono">
        <span className="text-zinc-400">Incoming API Request</span>
        <span className="text-zinc-500">Headers: {"{Authorization: Bearer <jwt>}"}</span>
      </div>

      <div className="text-zinc-600"><ArrowRight className="w-4 h-4 rotate-90" /></div>

      <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 w-full relative">
        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[7px] text-zinc-400 font-mono font-bold">
          SPRING SECURITY
        </div>
        <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 font-sans mb-2">JWTOncePerRequestFilter</div>
        <div className="space-y-2 text-[11px] font-sans text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <span>Extract token from header</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <span>Validate claims & signature against secret key</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <span>Load UserDetails & populate SecurityContextHolder</span>
          </div>
        </div>
      </div>

      <div className="text-zinc-600"><ArrowRight className="w-4 h-4 rotate-90" /></div>

      <div className="flex justify-between items-center w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono">
        <span className="text-emerald-400 font-semibold">SecurityContext Inject</span>
        <span className="text-zinc-400">Route Execution Allowed</span>
      </div>
    </div>
  );
}

/* 3. Spring Boot Request Lifecycle Diagram */
function RequestLifecycleDiagram() {
  const steps = [
    { name: "CORS/Security Filter", note: "Method constraints checks" },
    { name: "DispatcherServlet", note: "Finds controller handler mappings" },
    { name: "HandlerInterceptor", note: "Pre-handle filters / logs" },
    { name: "Controller Endpoint", note: "Executes business routing logic" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-2xl">
      {steps.map((step, idx) => (
        <div key={step.name} className="relative flex flex-col items-center">
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 w-full text-center min-h-[96px] flex flex-col justify-center shadow-md">
            <span className="text-zinc-500 text-[8px] font-bold uppercase tracking-widest block mb-1">
              Step {idx + 1}
            </span>
            <span className="text-xs font-semibold text-white font-mono block">
              {step.name}
            </span>
            <span className="text-[10px] text-zinc-500 font-sans block mt-1.5 leading-normal">
              {step.note}
            </span>
          </div>
          {idx < 3 && (
            <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-3 text-zinc-700 z-20">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* 4. Global Exception Pipeline Diagram */
function ExceptionPipelineDiagram() {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      <div className="flex items-center justify-between w-full p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono">
        <span className="text-rose-500">Database/Service Layer Fail</span>
        <span className="text-zinc-500">throws EntityNotFoundException</span>
      </div>

      <div className="text-zinc-650"><ArrowRight className="w-4 h-4 rotate-90" /></div>

      <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800/80 w-full relative">
        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[7px] text-rose-400 font-mono font-bold">
          @RestControllerAdvice
        </div>
        <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-sans mb-3">
          GlobalExceptionController
        </div>
        <div className="space-y-2 text-[11px] font-sans text-zinc-400 leading-relaxed">
          <div className="p-2 rounded bg-zinc-900/50 border border-zinc-850 font-mono text-[10px] text-zinc-500">
            @ExceptionHandler(EntityNotFoundException.class)
          </div>
          <div>
            Intercepts target errors, strips internal database stacktraces to prevent leakage, compiles standard RFC 7807 problem json envelopes.
          </div>
        </div>
      </div>

      <div className="text-zinc-650"><ArrowRight className="w-4 h-4 rotate-90" /></div>

      <div className="flex justify-between items-center w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono">
        <span className="text-white">Structured Error Response</span>
        <span className="text-rose-400">{"{ \"status\": 404, \"error\": \"Not Found\" }"}</span>
      </div>
    </div>
  );
}
