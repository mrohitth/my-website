"use client";

import { useEffect } from "react";
import { Lightbulb, ShieldCheck, GitBranch } from "lucide-react";

const PRINCIPLES = [
  {
    icon: Lightbulb,
    quote: '"The pipeline is the product, not the data."',
    body: "I've seen teams optimize a query from 2 hours to 20 minutes and call it done. But if that pipeline runs daily for 3 years, that 20-minute improvement is worth 15,000 hours of engineering time. Always optimize for the recurrence — one-time gains are features, recurring gains are products.",
    context: "At Freddie Mac, I fixed a 14-hour batch that ran every night. Cutting it to 3.5 hours saved ~10.5h of EMR cluster time daily. Over 18 months, that's 5,700+ engineer hours — which is the equivalent of 3 full-time engineers working for an entire year.",
  },
  {
    icon: ShieldCheck,
    quote: '"Reliability is a feature, not a checklist."',
    body: "SLOs without SLO-based alerting are just aspirations. Every pipeline I build has explicit freshness thresholds, anomaly baselines, and blast-radius estimates. If I can't tell you the MTTR impact of a schema change before we make it, we shouldn't make it.",
    context: "I built the Data Observability Platform specifically because silent failures were the highest-severity incidents we had — they broke dashboards with no alert, affecting 40+ analysts before anyone noticed. Detecting that in 15 minutes vs 48 hours is the difference between a Slack message and a war room.",
  },
  {
    icon: GitBranch,
    quote: '"Architecture survives contact with production. Designs that don\'t, failed to anticipate scale."',
    body: "I learned this at Carnegie Mellon modeling high-dimensional sensor data — a model that works in the lab fails in production because the distribution shifts. Same is true for data platforms. Every design decision should have a failure mode documented before it goes live.",
    context: "When designing the CDC pipeline at Freddie Mac, I spent 2 weeks on the failure modes before writing a single line of code: What happens when the CDC log is corrupted? What when a consumer falls 3 days behind? What when the schema evolves? Having answers before deployment meant zero data loss incidents in 18 months.",
  },
];

export function PhilosophySection() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-fade-in");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="philosophy" className="py-20 px-4 bg-portfolio-secondary border-t border-portfolio-border/30">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg className="text-portfolio-primary h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h2 className="text-4xl font-bold">How I Think About Data Systems</h2>
          </div>
          <p className="text-lg text-portfolio-muted-foreground max-w-2xl mx-auto">
            Philosophy shaped by{" "}
            <span className="text-portfolio-primary font-semibold">
              18 months of production at Freddie Mac, 6 months at Bosmos, and 2 years of ML research at Carnegie Mellon.
            </span>
          </p>
        </div>

        {/* Principles */}
        <div className="space-y-8">
          {PRINCIPLES.map((principle, i) => {
            const Icon = principle.icon;
            return (
              <div key={i} className="fade-in group">
                {/* Quote block */}
                <div className="relative pl-6 border-l-2 border-portfolio-primary/40 group-hover:border-portfolio-primary transition-colors">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-portfolio-primary flex items-center justify-center">
                    <Icon className="h-3.5 w-3.5 text-white" />
                  </div>

                  <blockquote className="text-xl md:text-2xl font-semibold text-portfolio-foreground mb-4 leading-snug">
                    {principle.quote}
                  </blockquote>

                  <p className="text-base text-portfolio-muted-foreground leading-relaxed mb-4">
                    {principle.body}
                  </p>

                  {/* Real-world context */}
                  <div className="bg-portfolio-card/50 border border-portfolio-border/30 rounded-lg p-4 pl-4 border-l-4 border-l-emerald-400/50">
                    <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                      Real-world example
                    </div>
                    <p className="text-sm text-portfolio-muted-foreground leading-relaxed">
                      {principle.context}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}