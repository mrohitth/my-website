"use client";

import { TrendingUp, Target } from "lucide-react";
import { EXPERIENCES } from "@/data/portfolio";
import freddieMacLogo from "@/assets/logos/fm.png";
import bosmosLogo from "@/assets/logos/bosmos-logo.png";
import drcLogo from "@/assets/logos/drc.png";

const EXPERIENCE_LOGOS: Record<string, string[]> = {
  "capco-data-engineer": [freddieMacLogo],
  "bosmos-lead-ai": [bosmosLogo],
  "drc-research-assistant": [drcLogo],
};

function MetricPill({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-portfolio-primary/10 text-portfolio-primary border border-portfolio-primary/20">
      <Target className="h-2.5 w-2.5" />
      {text}
    </span>
  );
}

function ExperienceTimeline() {
  return (
    <div>
      <h3
        className="text-2xl font-semibold mb-8 flex items-center justify-center gap-2"
        aria-label="Professional Experience"
      >
        <TrendingUp className="text-portfolio-primary h-6 w-6" aria-hidden="true" />
        Experience Journey
      </h3>

      {/* Desktop Timeline */}
      <div className="hidden md:block relative max-w-5xl mx-auto">
        <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-portfolio-primary to-transparent rounded-full">
          <div className="absolute inset-0 bg-gradient-to-r from-portfolio-primary/20 via-portfolio-primary/40 to-portfolio-primary/20 rounded-full animate-pulse" />
        </div>

        <div className="flex justify-between items-start gap-8">
          {EXPERIENCES.map((exp, index) => {
            const logos = EXPERIENCE_LOGOS[exp.id] ?? [];
            const progressWidth = index === 0 ? "w-full" : index === 1 ? "w-3/4" : "w-1/2";
            return (
              <div
                key={exp.id}
                className="group text-center relative flex-1 max-w-sm cursor-pointer transform transition-all duration-500 hover:scale-105"
              >
                {/* Timeline dot with logo */}
                <div className="w-24 h-24 mx-auto backdrop-blur-sm bg-white/10 rounded-full flex items-center justify-center relative z-10 mb-6 shadow-lg group-hover:shadow-2xl group-hover:backdrop-blur-md transition-all duration-500">
                  {logos.length === 1 ? (
                    <img
                      src={logos[0]}
                      alt={exp.company}
                      className={`w-16 h-16 object-contain ${exp.company === "Bosmos" || exp.company.includes("Freddie Mac") ? "scale-125" : ""}`}
                    />
                  ) : (
                    <div className="flex flex-col gap-1">
                      {logos.map((logo, li) => (
                        <img
                          key={li}
                          src={logo}
                          alt={exp.company}
                          className={`object-contain ${exp.company.includes("Freddie Mac") ? (li === 0 ? "w-10 h-10" : "w-6 h-6") : "w-6 h-6"}`}
                        />
                      ))}
                    </div>
                  )}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                </div>

                {/* Content card */}
                <div className="space-y-3 p-4 bg-portfolio-card/30 rounded-xl border border-portfolio-border/30 group-hover:border-portfolio-primary/50 group-hover:bg-portfolio-card/50 transition-all duration-500">
                  <h4 className="text-lg font-bold text-portfolio-foreground group-hover:text-portfolio-primary transition-colors">
                    {exp.title}
                  </h4>
                  <p className="text-portfolio-primary/90 font-semibold text-sm">{exp.company}</p>
                  <p className="text-portfolio-primary font-medium text-xs bg-portfolio-primary/10 px-2 py-1 rounded-full inline-block">
                    {exp.period}
                  </p>

                  {/* Outcome metrics */}
                  {exp.metrics && exp.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-portfolio-border/20">
                      {exp.metrics.slice(0, 3).map((metric, mi) => (
                        <MetricPill key={mi} text={metric} />
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-portfolio-muted-foreground text-sm leading-relaxed group-hover:text-portfolio-foreground transition-colors">
                    {exp.description}
                  </p>

                  {/* Progress bar */}
                  <div className="w-full bg-portfolio-muted/20 rounded-full h-1.5 mt-3">
                    <div
                      className={`h-1.5 bg-gradient-to-r from-portfolio-primary to-emerald-400 rounded-full transition-all duration-1000 ${progressWidth}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="md:hidden">
        <ol className="space-y-6">
          {EXPERIENCES.map((exp, index) => {
            const logos = EXPERIENCE_LOGOS[exp.id] ?? [];
            return (
              <li
                key={exp.id}
                className={`relative pl-20 ${index !== EXPERIENCES.length - 1 ? "after:absolute after:left-8 after:top-16 after:bottom-0 after:w-px after:bg-portfolio-primary/30" : ""}`}
                data-testid={`experience-mobile-${index}`}
              >
                <div className="absolute left-0 w-16 h-16 backdrop-blur-sm bg-white/10 rounded-full flex items-center justify-center">
                  {logos.length === 1 ? (
                    <img
                      src={logos[0]}
                      alt={exp.company}
                      className={`w-12 h-12 object-contain ${exp.company === "Bosmos" || exp.company.includes("Freddie Mac") ? "scale-125" : ""}`}
                    />
                  ) : (
                    <div className="flex flex-col gap-1">
                      {logos.map((logo, li) => (
                        <img key={li} src={logo} alt={exp.company} className="w-6 h-6 object-contain" />
                      ))}
                    </div>
                  )}
                </div>
                <div className="min-w-0 pb-4 ml-4">
                  <div className="flex flex-col mb-2">
                    <h4 className="text-lg font-semibold text-portfolio-foreground">{exp.title}</h4>
                    <span className="text-sm text-portfolio-primary font-medium">{exp.period}</span>
                  </div>
                  <p className="text-portfolio-primary/80 font-medium mb-2">{exp.company}</p>

                  {exp.metrics && exp.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {exp.metrics.slice(0, 2).map((metric, mi) => (
                        <MetricPill key={mi} text={metric} />
                      ))}
                    </div>
                  )}

                  <p className="text-portfolio-muted-foreground text-sm">{exp.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  return <ExperienceTimeline />;
}