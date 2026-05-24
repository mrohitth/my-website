"use client";

import { useEffect } from "react";
import profilePic from "@/assets/profile4.jpg";
import { BarChart3, Database, Zap, Cloud, Code2 } from "lucide-react";
import {
  SKILL_DOMAINS,
  getLevelColor,
  getLevelIcon,
} from "@/data/portfolio";

const STATS = [
  { value: "3+", label: "Years Experience" },
  { value: "13+", label: "Projects Delivered" },
  { value: "15+", label: "Technologies Mastered" },
];

const DOMAIN_ICONS: Record<string, JSX.Element> = {
  "Stream Processing & Real-Time Systems": <Zap className="text-yellow-400 h-5 w-5" />,
  "Distributed Data Processing": <BarChart3 className="text-orange-400 h-5 w-5" />,
  "Data Modeling & Warehouse Architecture": <Database className="text-blue-400 h-5 w-5" />,
  "Data Reliability & Observability": <BarChart3 className="text-emerald-400 h-5 w-5" />,
  "Cloud Infrastructure (AWS)": <Cloud className="text-orange-500 h-5 w-5" />,
  "Programming & Scripting": <Code2 className="text-purple-400 h-5 w-5" />,
};

export function AboutSection() {
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
    <section id="about" className="py-20 px-4 bg-portfolio-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          {/* Profile Picture */}
          <div className="fade-in md:col-span-1">
            <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto rounded-2xl" data-testid="profile-picture">
              <img src={profilePic} alt="Mathew Thomson" className="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>

          {/* Bio + Stats */}
          <div className="fade-in md:col-span-1 lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-4xl font-bold mb-6" data-testid="about-title">About Me</h2>
              <p className="text-base md:text-lg text-portfolio-muted-foreground max-w-prose">
                I design and optimize distributed data pipelines on AWS EMR and Snowflake,
                focusing on performance tuning, cost efficiency, and production reliability.
                Specializing in cloud-native processing on AWS EMR (EC2/EKS) and Snowflake, I
                build resilient, metadata-driven pipelines that handle tens of millions of
                records while optimizing for both compute performance and enterprise-level
                cost-efficiency.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-portfolio-border/30">
              {STATS.map((s, i) => (
                <div key={i} className="text-center group cursor-pointer">
                  <div className="text-2xl font-bold text-portfolio-primary group-hover:scale-110 transition-all duration-300">
                    {s.value}
                  </div>
                  <div className="text-sm text-portfolio-muted-foreground group-hover:text-portfolio-primary transition-colors">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TechStackSection() {
  return (
    <section
      id="tech-stack"
      className="py-20 px-4 bg-gradient-to-br from-portfolio-secondary to-portfolio-secondary/80 relative border-t-4 border-portfolio-primary/30"
    >
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-portfolio-primary px-6 py-2 rounded-full shadow-lg">
          <span className="text-white font-bold text-sm tracking-wide">TECHNICAL EXPERTISE</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BarChart3 className="text-portfolio-primary h-8 w-8" />
            <h2 className="text-4xl font-bold text-portfolio-foreground">Skills by Competency Domain</h2>
          </div>
          <p className="text-lg text-portfolio-muted-foreground max-w-2xl mx-auto">
            Each skill is grounded in a <span className="text-portfolio-primary font-medium">real production use case</span> —
            not just a self-assessed level.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_DOMAINS.map((domain, di) => {
            const icon = DOMAIN_ICONS[domain.domain] ?? <BarChart3 className="text-gray-400 h-5 w-5" />;
            return (
              <div
                key={di}
                className="group bg-portfolio-card border border-portfolio-border rounded-xl p-6 fade-in hover:border-portfolio-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-portfolio-primary/10 hover:-translate-y-2 transform-gpu"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-portfolio-primary/10 border border-portfolio-primary/20">
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-portfolio-foreground">{domain.domain}</h3>
                    {domain.description && (
                      <p className="text-xs text-portfolio-muted-foreground mt-0.5">{domain.description}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {domain.tools.map((tool, ti) => (
                    <div key={ti} className="bg-portfolio-background/50 border border-portfolio-border/30 rounded-lg p-3 hover:bg-portfolio-background/80 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-portfolio-foreground">{tool.name}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getLevelColor(tool.level)}`}>
                          {getLevelIcon(tool.level)}{tool.level}
                        </span>
                      </div>
                      <p className="text-xs text-portfolio-muted-foreground leading-relaxed">{tool.context}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}