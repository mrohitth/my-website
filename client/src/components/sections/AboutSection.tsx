"use client";

import { useEffect } from "react";
import profilePic from "@/assets/profile4.webp";
import { BarChart3, Database, Zap, Cloud, Code2, Star } from "lucide-react";
import {
  SKILL_DOMAINS,
  getLevelColor,
  getLevelIcon,
  getLevelProgressWidth,
  PipelineStage,
} from "@/data/portfolio";
import {
  SiPython,
  SiApachespark,
  SiApacheairflow,
  SiAmazon,
  SiKubernetes,
  SiMongodb,
  SiSnowflake,
  SiJenkins,
  SiGit,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiTerraform,
  SiGrafana,
  SiDbt,
  SiElasticsearch,
  SiInformatica,
} from "react-icons/si";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  SiPython,
  SiApachespark,
  SiApacheairflow,
  SiAmazon,
  SiKubernetes,
  SiMongodb,
  SiSnowflake,
  SiJenkins,
  SiGit,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiTerraform,
  SiGrafana,
  SiDbt,
  SiElasticsearch,
  SiInformatica,
};

const STATS = [
  { value: "3+", label: "Years Experience" },
  { value: "13+", label: "Projects Delivered" },
  { value: "15+", label: "Technologies Mastered" },
];

const DOMAIN_ICONS: Record<string, JSX.Element> = {
  "Idempotent Data Pipelines & Incremental Processing Platforms": <Zap className="text-yellow-400 h-5 w-5" />,
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
              <img src={profilePic} alt="Mathew R. Thomson, Senior Data Engineer" className="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>

          {/* Bio + Stats */}
          <div className="fade-in md:col-span-1 lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-4xl font-bold mb-6" data-testid="about-title">About Me</h2>
              <p className="text-base md:text-lg text-portfolio-muted-foreground max-w-prose">
                I design and optimize batch data pipelines on AWS EMR and Snowflake, with PySpark performance tuning and partition-aware optimization. I build Snowflake data models and SCD Type-2 historical warehouses for reporting at scale — focusing on production reliability and cost-efficient EMR cluster utilization.
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

function getToolColor(level: string): string {
  switch (level) {
    case "Advanced":
    case "Strong":
      return "w-full bg-emerald-400";
    case "Intermediate":
      return "w-3/4 bg-blue-400";
    case "Working":
      return "w-1/2 bg-yellow-400";
    default:
      return "w-1/4 bg-gray-400";
  }
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
            <h2 className="text-4xl font-bold text-portfolio-foreground">Data Engineering Stack</h2>
          </div>
          <p className="text-lg text-portfolio-muted-foreground max-w-2xl mx-auto">
            <span className="text-portfolio-primary font-medium">Scalable</span> end-to-end data infrastructure —{' '}
            <span className="text-emerald-400">Processing millions of records daily</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_DOMAINS.map((stage: PipelineStage, stageIndex: number) => (
            <div
              key={stageIndex}
              className="group bg-portfolio-card border border-portfolio-border rounded-xl p-6 fade-in hover:border-portfolio-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-portfolio-primary/10 hover:-translate-y-2 transform-gpu hover:[transform:translateY(-0.5rem)_rotateX(6deg)_rotateY(3deg)] cursor-pointer"
            >
              {/* Stage Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{stage.emoji}</span>
                <div>
                  <h3 className="text-lg font-bold text-portfolio-foreground">{stage.stage}</h3>
                  <p className="text-xs text-portfolio-muted-foreground">{stage.description}</p>
                </div>
              </div>

              {/* Compact Tools Grid */}
              <div className="grid grid-cols-2 gap-3">
                {stage.tools.map((tool, toolIndex) => {
                  const IconComponent = tool.icon ? ICON_MAP[tool.icon] : null;
                  return (
                    <div
                      key={toolIndex}
                      className="group relative bg-portfolio-background/50 border border-portfolio-border/50 rounded-lg p-3 hover:border-portfolio-primary/50 hover:bg-portfolio-background/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-portfolio-primary/20 hover:-translate-y-1 transform cursor-pointer"
                      data-testid={`tech-${tool.name.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
                    >
                      {/* Tech Icon and Name */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`text-lg ${tool.color} group-hover:scale-110 transition-all duration-300`}>
                          {IconComponent && <IconComponent />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-portfolio-foreground group-hover:text-portfolio-primary transition-colors truncate">
                            {tool.name}
                          </h4>
                        </div>
                      </div>

                      {/* Level Badge */}
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(tool.level)}`}>
                          {getLevelIcon(tool.level)}
                          {tool.level}
                        </span>

                        {/* Mini Progress Bar */}
                        <div className="w-12 bg-portfolio-muted/20 rounded-full h-1">
                          <div
                            className={`h-1 rounded-full transition-all duration-500 ${getLevelProgressWidth(tool.level)} ${
                              tool.level === "Advanced" || tool.level === "Strong" ? "bg-emerald-500/70 shadow-sm shadow-emerald-400/40" :
                              tool.level === "Intermediate" ? "bg-blue-500/70 shadow-sm shadow-blue-400/30" :
                              tool.level === "Working" ? "bg-amber-500/70 shadow-sm shadow-amber-400/30" :
                              "bg-gray-500/50"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}