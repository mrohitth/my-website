"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github } from "lucide-react";
import { PROJECTS } from "@/data/portfolio";

type Tab = "ml" | "cv";

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<Tab>("ml");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const mlProjects = PROJECTS.filter(
    (p) =>
      !p.featured &&
      (p.category === "Machine Learning" || p.category === "Deep Learning")
  );
  const cvProjects = PROJECTS.filter(
    (p) => !p.featured && p.category === "Computer Vision"
  );

  return (
    <section
      id="projects"
      className="py-20 px-4 bg-portfolio-background relative"
    >
      {/* Subtle honeycomb background */}
      <div className="absolute inset-0 opacity-10">
        <div className="honeycomb-pattern" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg
              className="text-portfolio-primary h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <h2 className="text-4xl font-bold" data-testid="projects-title">
              My Projects
            </h2>
          </div>
          <p className="text-xl text-portfolio-muted-foreground max-w-2xl mx-auto">
            Production-style distributed data platforms simulating
            enterprise-scale workloads (50M+ records).
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-portfolio-foreground flex items-center gap-2">
            ⭐ Featured Data Engineering Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                slug={`featured-${index}`}
              />
            ))}
          </div>
        </div>

        {/* Sandbox wrapper already rendered in SandboxSection */}

        {/* Academic Research & ML Projects */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-portfolio-foreground flex items-center gap-2">
            📚 Academic Research & ML Projects
          </h3>

          {/* Tabs */}
          <div className="mb-6 border-b border-portfolio-border/30">
            <div className="flex space-x-8">
              <button
                className={`pb-2 px-1 text-sm font-medium transition-colors duration-200 border-b-2 ${
                  activeTab === "ml"
                    ? "border-portfolio-primary text-portfolio-foreground"
                    : "border-transparent text-portfolio-muted-foreground"
                }`}
                onClick={() => setActiveTab("ml")}
                data-testid="tab-ml"
              >
                Deep Learning &amp; Machine Learning Projects
              </button>
              <button
                className={`pb-2 px-1 text-sm font-medium transition-colors duration-200 border-b-2 ${
                  activeTab === "cv"
                    ? "border-portfolio-primary text-portfolio-foreground"
                    : "border-transparent text-portfolio-muted-foreground"
                }`}
                onClick={() => setActiveTab("cv")}
                data-testid="tab-cv"
              >
                Computer Vision Projects
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === "ml" && (
              <div
                className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                data-testid="ml-projects-container"
              >
                {mlProjects.map((project) => {
                  const slug = project.title
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  return (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={0}
                      slug={slug}
                    />
                  );
                })}
              </div>
            )}

            {activeTab === "cv" && (
              <div
                className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                data-testid="cv-projects-container"
              >
                {cvProjects.map((project) => {
                  const slug = project.title
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  return (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={0}
                      slug={slug}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: (typeof PROJECTS)[number];
  index: number;
  slug: string;
}

function ProjectCard({ project, index, slug }: ProjectCardProps) {
  return (
    <Card
      className="fade-in bg-portfolio-card border-portfolio-border overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group relative"
      data-testid={`project-card-${slug}`}
    >
      {project.featured && (
        <div className="absolute top-2 right-2 bg-portfolio-primary text-white text-xs px-2 py-1 rounded-full font-medium">
          Featured
        </div>
      )}
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover"
        data-testid={`project-image-${slug}`}
      />
      <div className="p-6">
        <h3
          className="text-xl font-semibold mb-3 text-portfolio-card-foreground"
          data-testid={`project-title-${slug}`}
        >
          {project.title}
        </h3>
        {/* Hidden description on hover for non-featured */}
        {!project.featured && (
          <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-60 mb-4">
            <p
              className="text-portfolio-muted-foreground"
              data-testid={`project-description-${slug}`}
            >
              {project.description}
            </p>
          </div>
        )}
        {project.featured && (
          <p
            className="text-portfolio-muted-foreground mb-4"
            data-testid={`project-description-${slug}`}
          >
            {project.description}
          </p>
        )}
        <div
          className="flex flex-wrap gap-2 mb-4"
          data-testid={`project-technologies-${slug}`}
        >
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-1 bg-portfolio-primary/10 text-portfolio-primary rounded text-xs"
              data-testid={`project-tech-${slug}-${tech.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <a
            href={project.github}
            className="text-portfolio-primary hover:text-portfolio-primary/80 transition-colors duration-200 flex items-center"
            data-testid={`project-github-${slug}`}
          >
            <Github className="mr-2 h-4 w-4" />
            View Project
          </a>
        </div>
      </div>
    </Card>
  );
}