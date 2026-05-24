"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import { Activity } from "lucide-react";

const DataPlatformSandbox = lazy(
  () => import("@/components/simulations/DataPlatformSandbox")
);

export function SandboxSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="sandbox" className="mb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-2xl border border-portfolio-border overflow-hidden bg-portfolio-card/50 backdrop-blur-sm">
          {/* CTA Trigger Banner */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="w-full flex items-center justify-between px-6 py-4 transition-all duration-300 hover:bg-portfolio-primary/5 group"
          >
            <div className="flex items-center gap-4">
              {/* Animated icon cluster */}
              <div className="relative flex items-center justify-center h-12 w-12 rounded-xl bg-portfolio-primary/10 border border-portfolio-primary/20">
                <Activity className="h-5 w-5 text-portfolio-primary" />
                <motion.div
                  className="absolute inset-0 border border-portfolio-primary/30 rounded-xl"
                  animate={{ rotate: isOpen ? 0 : 360 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ transformOrigin: "center" }}
                />
                <motion.div
                  className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-cyan-400"
                  animate={
                    isOpen
                      ? {
                          scale: [1, 1.5, 1],
                          opacity: [1, 0.5, 1],
                        }
                      : { scale: 1, opacity: 1 }
                  }
                  transition={{ duration: 1.5, repeat: isOpen ? Infinity : 0 }}
                />
              </div>
              <div className="text-left">
                <p className="text-base font-bold text-portfolio-foreground flex items-center gap-2">
                  <span className="text-xl">🔬</span>
                  Production Data Engineering - Live Sandboxes
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  {!isOpen ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      Status: Dormant - Click to Initialize
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                      Status: Active - Click to Collapse
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Expand/Collapse chevron */}
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="rounded-full bg-portfolio-primary/10 border border-portfolio-primary/20 p-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-portfolio-primary"
                  />
                </svg>
              </motion.div>
            </div>
          </button>

          {/* Expandable Content */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="border-t border-portfolio-border/50 px-6 py-6">
                  {/* Framing header */}
                  <div className="mb-6 pb-6 border-b border-portfolio-border/30">
                    <h3 className="text-2xl font-bold text-portfolio-foreground mb-2">
                      Production Patterns, Interactive
                    </h3>
                    <p className="text-portfolio-muted-foreground text-sm max-w-2xl">
                      These aren&apos;t toy demos. Each sandbox models a real data engineering
                      problem I&apos;ve worked on in production - built so you can see the
                      architecture, tweak the parameters, and understand the trade-offs.
                    </p>
                  </div>

                  {/* Tab callout cards */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {/* CDC Pipeline callout */}
                    <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-cyan-400 font-semibold text-sm">CDC Pipeline</span>
                      </div>
                      <p className="text-xs text-portfolio-muted-foreground leading-relaxed">
                        Models the change data capture patterns I used to reconstruct 22+
                        years of financial history at Freddie Mac. Tune throughput, observe
                        latency behavior, and trigger failure scenarios.
                      </p>
                    </div>

                    {/* Batch Analytics callout */}
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-emerald-400 font-semibold text-sm">Batch Analytics</span>
                      </div>
                      <p className="text-xs text-portfolio-muted-foreground leading-relaxed">
                        Based on the Airflow + dbt ELT framework I built for 50M+ record
                        synthetic datasets, mirroring enterprise batch orchestration patterns.
                        Adjust batch size and watch SLA impact in real time.
                      </p>
                    </div>

                    {/* Data Observability callout */}
                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-amber-400 font-semibold text-sm">Data Observability</span>
                      </div>
                      <p className="text-xs text-portfolio-muted-foreground leading-relaxed">
                        The observability layer every production pipeline needs but most
                        portfolios ignore. Configure detection thresholds and simulate the
                        anomalies that actually break data pipelines: schema drift,
                        freshness gaps, distribution shifts.
                      </p>
                    </div>
                  </div>

                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center h-64 text-muted-foreground">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          <span className="text-sm">
                            Loading Data Platform Sandbox...
                          </span>
                        </div>
                      </div>
                    }
                  >
                    <DataPlatformSandbox />
                  </Suspense>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}