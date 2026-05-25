// FIX: cards in horizontal scroll containers MUST have flex-shrink-0 + w-80.
// Without these, the Card component (which uses flex flex-col with flex-1 content)
// collapses to zero width in overflow-x-auto containers, causing the card area
// to go blank. This was found by comparing with the feature branch implementation
// in dab3e4fe which correctly applies these classes. ML and CV tabs both use
// horizontal scroll, so both need this fix (both were blanking in production).

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";
import { Github, ChevronDown, ChevronUp, Scale, Layers } from "lucide-react";
import { PROJECTS } from "@/data/portfolio";

type Tab = "ml" | "cv";

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<Tab>("ml");

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
    <section id="projects" className="py-20 px-4 bg-portfolio-background relative">
      <div className="absolute inset-0 opacity-10">
        <div className="honeycomb-pattern" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg className="text-portfolio-primary h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h2 className="text-4xl font-bold" data-testid="projects-title">My Projects</h2>
          </div>
          <p className="text-xl text-portfolio-muted-foreground max-w-2xl mx-auto">
            Production-style distributed data platforms simulating enterprise-scale workloads.
            Each project includes quantified impact, architectural decisions, and scale context.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-portfolio-foreground flex items-center gap-2">
            ⭐ Featured Data Engineering Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} slug={`featured-${index}`} />
            ))}
          </div>
        </div>

        {/* Academic Research & ML Projects */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-portfolio-foreground flex items-center gap-2">
            📚 Academic Research &amp; ML Projects
          </h3>
          <div className="mb-6 border-b border-portfolio-border/30">
            <div className="flex space-x-8">
              <button
                className={`pb-2 px-1 text-sm font-medium transition-colors duration-200 border-b-2 ${
                  activeTab === "ml"
                    ? "border-portfolio-primary text-portfolio-foreground"
                    : "border-transparent text-portfolio-muted-foreground"
                }`}
                onClick={() => setActiveTab("ml")}
                aria-label="ML and Deep Learning projects tab"
                aria-pressed={activeTab === "ml"}
                data-testid="tab-ml"
              >
                Deep Learning &amp; Machine Learning ({mlProjects.length})
              </button>
              <button
                className={`pb-2 px-1 text-sm font-medium transition-colors duration-200 border-b-2 ${
                  activeTab === "cv"
                    ? "border-portfolio-primary text-portfolio-foreground"
                    : "border-transparent text-portfolio-muted-foreground"
                }`}
                onClick={() => setActiveTab("cv")}
                aria-label="Computer Vision projects tab"
                aria-pressed={activeTab === "cv"}
                data-testid="tab-cv"
              >
                Computer Vision ({cvProjects.length})
              </button>
            </div>
          </div>

          <div className="min-h-[400px]">
            {activeTab === "ml" && (
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide" data-testid="ml-projects-container" aria-label="Machine Learning project cards, scroll horizontally" style={{ WebkitOverflowScrolling: "touch", maskImage: "linear-gradient(to right, black 80%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, black 80%, transparent 100%)" }}>
                {mlProjects.length === 0 ? (
                  <p className="text-portfolio-muted-foreground text-sm">No ML projects found.</p>
                ) : (
                  mlProjects.map((project) => {
                    const slug = project.title.toLowerCase().replace(/\s+/g, "-");
                    return (
                      <Card
                        key={project.title}
                        // CRITICAL: flex-shrink-0 + w-80 prevents cards from collapsing
                        // to zero width in the horizontal scroll container (caused blank-out)
                        className="flex-shrink-0 w-80 bg-portfolio-card border-portfolio-border hover:shadow-xl hover:scale-105 hover:z-10 hover:-mx-2 transition-all duration-300 group relative"
                        data-testid={`project-card-${slug}`}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            if (!target.dataset.fallbackUsed) {
                              target.dataset.fallbackUsed = "true";
                              target.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400";
                            }
                          }}
                          data-testid={`project-image-${slug}`}
                        />
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-3 text-portfolio-card-foreground" data-testid={`project-title-${slug}`}>
                            {project.title}
                          </h3>

                          {/* Hidden description that appears on hover */}
                          <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-60 mb-4">
                            <p className="text-portfolio-muted-foreground" data-testid={`project-description-${slug}`}>
                              {project.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4" data-testid={`project-technologies-${slug}`}>
                            {project.technologies.map((tech, techIndex) => (
                              <span
                                key={`${slug}-${techIndex}`}
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
                  })
                )}
              </div>
            )}
            {activeTab === "cv" && (
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide" data-testid="cv-projects-container" aria-label="Computer Vision project cards, scroll horizontally" style={{ WebkitOverflowScrolling: "touch", maskImage: "linear-gradient(to right, black 80%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, black 80%, transparent 100%)" }}>
                {cvProjects.length === 0 ? (
                  <p className="text-portfolio-muted-foreground text-sm">No Computer Vision projects found.</p>
                ) : (
                  cvProjects.map((project) => {
                    const slug = project.title.toLowerCase().replace(/\s+/g, "-");
                    return (
                      <Card
                        key={project.title}
                        // CRITICAL: flex-shrink-0 + w-80 prevents cards from collapsing
                        // to zero width in the horizontal scroll container (caused blank-out)
                        className="flex-shrink-0 w-80 bg-portfolio-card border-portfolio-border hover:shadow-xl hover:scale-105 hover:z-10 hover:-mx-2 transition-all duration-300 group relative"
                        data-testid={`project-card-${slug}`}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            if (!target.dataset.fallbackUsed) {
                              target.dataset.fallbackUsed = "true";
                              target.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400";
                            }
                          }}
                          data-testid={`project-image-${slug}`}
                        />
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-3 text-portfolio-card-foreground" data-testid={`project-title-${slug}`}>
                            {project.title}
                          </h3>

                          {/* Hidden description that appears on hover */}
                          <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-60 mb-4">
                            <p className="text-portfolio-muted-foreground" data-testid={`project-description-${slug}`}>
                              {project.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4" data-testid={`project-technologies-${slug}`}>
                            {project.technologies.map((tech, techIndex) => (
                              <span
                                key={`${slug}-${techIndex}`}
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
                  })
                )}
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

function ProjectCard({ project, slug }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isFeatured = project.featured;

  return (
    <Card
      className="fade-in bg-portfolio-card border-portfolio-border overflow-hidden hover:shadow-xl transition-all duration-300 group relative flex flex-col"
      data-testid={`project-card-${slug}`}
    >
      {isFeatured && (
        <div className="absolute top-2 right-2 bg-portfolio-primary text-white text-xs px-2 py-1 rounded-full font-medium z-10">
          Featured
        </div>
      )}

      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          if (!target.dataset.fallbackUsed) {
            target.dataset.fallbackUsed = "true";
            target.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400";
          }
        }}
        data-testid={`project-image-${slug}`}
      />

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold mb-2 text-portfolio-card-foreground" data-testid={`project-title-${slug}`}>
          {project.title}
        </h3>

        {/* Impact badge */}
        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
            <Scale className="h-3 w-3" />
            {project.impact}
          </span>
        </div>

        {/* Scale context */}
        <div className="text-xs text-portfolio-muted-foreground mb-3 flex items-center gap-1.5">
          <span className="text-portfolio-primary font-medium">Scale:</span> {project.scale}
        </div>

        {/* Description */}
        <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-60 mb-3">
            <p className="text-portfolio-muted-foreground text-sm" data-testid={`project-description-${slug}`}>
              {project.description}
            </p>
          </div>

        {/* Expandable Architecture section */}
        {project.architecture && (
          <div className="mb-3">
            <button
              onClick={() => setExpanded((v) => !v)}
              aria-label={expanded ? "Collapse architecture explanation" : "Expand architecture explanation"}
              className="flex items-center gap-1.5 text-xs text-portfolio-primary hover:text-portfolio-primary/80 transition-colors font-medium"
            >
              <Layers className="h-3.5 w-3.5" />
              Why these choices?
              {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
            {expanded && (
              <div className="mt-2 p-3 bg-portfolio-background/50 rounded-lg border border-portfolio-border/30">
                <p className="text-xs text-portfolio-muted-foreground leading-relaxed">
                  {project.architecture}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4" data-testid={`project-technologies-${slug}`}>
          {project.technologies.map((tech, ti) => (
            <span
              key={ti}
              className="px-2 py-1 bg-portfolio-primary/10 text-portfolio-primary rounded text-xs"
              data-testid={`project-tech-${slug}-${tech.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* GitHub link */}
        <div className="mt-auto">
          <a
            href={project.github}
            className="text-portfolio-primary hover:text-portfolio-primary/80 transition-colors duration-200 flex items-center text-sm font-medium"
            data-testid={`project-github-${slug}`}
          >
            <Github className="mr-2 h-4 w-4" />
            View on GitHub →
          </a>
        </div>
      </div>
    </Card>
  );
}