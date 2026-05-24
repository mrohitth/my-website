"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import profilePic from "@/assets/profile4.jpg";
import { EXPERIENCES } from "@/data/portfolio";
import {
  SiPython,
  SiApachespark,
  SiApacheairflow,
  SiAmazon,
  SiMongodb,
  SiSnowflake,
  SiJenkins,
  SiGit,
  SiPostgresql,
  SiDocker,
  SiDbt,
  SiInformatica,
} from "react-icons/si";
import { BarChart3 } from "lucide-react";
import {
  PIPELINE_STAGES,
  getLevelColor,
  getLevelIcon,
} from "@/data/portfolio";

import freddieMacLogo from "@/assets/logos/fm.png";
import bosmosLogo from "@/assets/logos/bosmos-logo.png";
import drcLogo from "@/assets/logos/drc.png";

const EXPERIENCE_LOGOS: Record<string, string[]> = {
  "capco-data-engineer": [freddieMacLogo],
  "bosmos-lead-ai": [bosmosLogo],
  "drc-research-assistant": [drcLogo],
};

const STATS = [
  { value: "3+", label: "Years Experience" },
  { value: "13+", label: "Projects Delivered" },
  { value: "15+", label: "Technologies Mastered" },
];

// Icon resolver for pipeline tools
function ToolIcon({ icon }: { icon?: string }) {
  if (!icon) return <span>⬤</span>;
  const map: Record<string, JSX.Element> = {
    SiPostgresql: <SiPostgresql className="text-blue-600 text-lg" />,
    SiAmazon: <SiAmazon className="text-orange-400 text-lg" />,
    SiMongodb: <SiMongodb className="text-green-500 text-lg" />,
    SiPython: <SiPython className="text-yellow-400 text-lg" />,
    SiApachespark: <SiApachespark className="text-orange-500 text-lg" />,
    SiSnowflake: <SiSnowflake className="text-blue-300 text-lg" />,
    SiApacheairflow: <SiApacheairflow className="text-red-400 text-lg" />,
    SiDocker: <SiDocker className="text-blue-500 text-lg" />,
    SiGit: <SiGit className="text-orange-600 text-lg" />,
    SiJenkins: <SiJenkins className="text-red-500 text-lg" />,
    SiDbt: <SiDbt className="text-orange-400 text-lg" />,
    SiInformatica: <SiInformatica className="text-blue-600 text-lg" />,
    SiElasticsearch: <span>🔍</span>,
  };
  return map[icon] ?? <span>⬤</span>;
}

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
    <>
      <section id="about" className="py-20 px-4 bg-portfolio-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
            {/* Profile Picture */}
            <div className="fade-in md:col-span-1">
              <div
                className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto rounded-2xl"
                data-testid="profile-picture"
              >
                <img
                  src={profilePic}
                  alt="Mathew Thomson"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Bio + Stats */}
            <div className="fade-in md:col-span-1 lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-4xl font-bold mb-6" data-testid="about-title">
                  About Me
                </h2>
                <p className="text-base md:text-lg text-portfolio-muted-foreground max-w-prose">
                  I design and optimize distributed data pipelines on AWS EMR and
                  Snowflake, focusing on performance tuning, cost efficiency, and
                  production reliability. Specializing in cloud-native processing on
                  AWS EMR (EC2/EKS) and Snowflake, I focus on building resilient,
                  metadata-driven pipelines that handle tens of millions of records
                  while optimizing for both compute performance and enterprise-level
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

      <TechStackSection />
    </>
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
          <span className="text-white font-bold text-sm tracking-wide">
            TECHNICAL EXPERTISE
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BarChart3 className="text-portfolio-primary h-8 w-8" />
            <h2 className="text-4xl font-bold text-portfolio-foreground">
              Data Engineering Stack
            </h2>
          </div>
          <p className="text-lg text-portfolio-muted-foreground max-w-2xl mx-auto">
            <span className="text-portfolio-primary font-medium">Scalable</span>{" "}
            end-to-end data infrastructure •{" "}
            <span className="text-emerald-400">Processing millions daily</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PIPELINE_STAGES.map((stage, si) => (
            <div
              key={si}
              className="group bg-portfolio-card border border-portfolio-border rounded-xl p-6 fade-in hover:border-portfolio-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-portfolio-primary/10 hover:-translate-y-2 transform-gpu cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{stage.emoji}</span>
                <div>
                  <h3 className="text-lg font-bold text-portfolio-foreground">{stage.stage}</h3>
                  <p className="text-xs text-portfolio-muted-foreground">{stage.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {stage.tools.map((tool, ti) => (
                  <div
                    key={ti}
                    className="group/t relative bg-portfolio-background/50 border border-portfolio-border/50 rounded-lg p-3 hover:border-portfolio-primary/50 hover:bg-portfolio-background/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-portfolio-primary/20 hover:-translate-y-1 transform cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="group-hover/t:scale-110 transition-all duration-300">
                        <ToolIcon icon={tool.icon} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-portfolio-foreground group-hover/t:text-portfolio-primary transition-colors truncate">
                          {tool.name}
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(tool.level)}`}>
                        {getLevelIcon(tool.level)}
                        {tool.level}
                      </span>
                      <div className="w-12 bg-portfolio-muted/20 rounded-full h-1">
                        <div className={`h-1 rounded-full transition-all duration-500 ${
                          tool.level === "Advanced" ? "w-full bg-emerald-400"
                          : tool.level === "Intermediate" ? "w-3/4 bg-blue-400"
                          : "w-1/4 bg-gray-400"
                        }`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}