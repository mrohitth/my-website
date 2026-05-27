"use client";

import { useState } from "react";
import { Github } from "lucide-react";
import { PROJECTS, type Project } from "@/data/portfolio";

// ── Local showcase data (featured DE projects) ────────────────────────────────

interface ShowcaseProject {
  id: number;
  title: string;
  tagline: string;
  image: string;
  featured: boolean;
  architecture: string;
  dataVolume: string;
  sla: string;
  highlights: string[];
  rationale: string;
  tech: string[];
}

const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 1,
    title: "CDC Historical Warehouse Platform",
    tagline: "Real-time data lineage with sub-minute SLA",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&h=700",
    featured: true,
    architecture: "SCD Type-2 ELT",
    dataVolume: "10M+ records/day",
    sla: "0ms loss (WAL replay)",
    highlights: [
      "WAL extraction",
      "SCD Type-2 temporal versioning",
      "10M+ daily record mutations",
      "0ms data-loss SLA (idempotent replay)",
    ],
    rationale:
      "WAL-based extraction over trigger-based CDC: triggers fire per-row and create N synchronous write paths under peak load, saturating the source DB connection pool. WAL reads are asynchronous, decoupled from the write path, and replayable from any prior LSN offset. SCD Type-2 over Type-1: regulatory audit requirements mandate point-in-time reconstruction of any record's state at any historical timestamp - Type-1 destroys that lineage on every UPDATE. Late-arriving data via max-watermark advancement: instead of re-running upstream queries, the pipeline computes the logical commit boundary from the WAL offset and correctly sequences late data.",
    tech: ["Apache Airflow", "dbt", "PostgreSQL", "Python", "PySpark"],
  },
  {
    id: 2,
    title: "Data Observability Platform",
    tagline: "Anomaly detection with rolling baseline calibration",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    featured: false,
    architecture: "Config-Driven Monitoring",
    dataVolume: "7-day diurnal baseline",
    sla: "Sub-minute detection",
    highlights: [
      "Config-driven anomaly thresholds",
      "Rolling Z-score baselining",
      "Schema drift detection",
      "Freshness SLA enforcement",
    ],
    rationale:
      "Rolling 7-day diurnal Z-score over point-in-time threshold checks: batch pipelines have predictable quiet hours (2-5am) where volume drops 80% -static threshold fires false positives every night. The 7-day rolling window captures the diurnal pattern and sets the expected baseline per-hour slot automatically. Z-score over IQR: weekend data introduces bimodal distributions that IQR handles poorly without manual seasonal decomposition -Z-score on the 7-day window absorbs the weekend trough naturally. Fingerprinted alert deduplication: under a cascade failure, 12 downstream tables all breach freshness simultaneously. Without fingerprinting, 12 identical alerts fire. Built as a custom, lightweight alternative to Great Expectations -no external dependencies, pure native Python/Pandas, designed to operate inside constrained EMR environments.",
    tech: ["Apache Airflow", "dbt", "PostgreSQL", "Python"],
  },
  {
    id: 3,
    title: "Config-Driven Batch ELT Framework",
    tagline: "Zero-code schema onboarding at scale",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    featured: false,
    architecture: "ELT / DAG Orchestration",
    dataVolume: "50M+ records/run",
    sla: "Idempotent partial retry",
    highlights: [
      "Config-driven DAG generation",
      "50M+ record synthetic runs",
      "Zero-code schema onboarding",
      "Shuffle-optimized Spark execution",
    ],
    rationale:
      "Config-driven DAG generation over hand-coded workflows: onboarding 20 tables with manual Airflow DAGs means 20 separate PRs and weeks of review lag. YAML configs generate the DAG topology automatically -one PR, instant deployment. Spark execution over naive Python loops: sequential iteration on 50M records saturates memory and takes hours. Spark's distributed shuffle completes in minutes with automatic partition boundary detection.",
    tech: ["Apache Airflow", "dbt", "PostgreSQL", "Python", "PySpark", "AWS EMR"],
  },
];

// ── Shared tech badge colors ──────────────────────────────────────────────────

const TECH_BADGE_COLORS: Record<string, string> = {
  // Data Engineering
  Python:              "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  PostgreSQL:          "bg-blue-600/10 text-blue-400 border-blue-500/20",
  PySpark:             "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Apache Spark":      "bg-orange-500/10 text-orange-400 border-orange-500/20",
  dbt:                 "bg-orange-600/10 text-orange-300 border-orange-600/20",
  "Apache Airflow":    "bg-red-500/10 text-red-400 border-red-500/20",
  "AWS EMR":           "bg-orange-400/10 text-orange-400 border-orange-400/20",
  Docker:              "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Snowflake:           "bg-sky-400/10 text-sky-400 border-sky-400/20",
  // ML / DL / CV
  PyTorch:             "bg-red-500/10 text-red-400 border-red-500/20",
  NumPy:               "bg-blue-400/10 text-blue-300 border-blue-400/20",
  OpenCV:              "bg-green-600/10 text-green-400 border-green-600/20",
  "scikit-learn":      "bg-sky-500/10 text-sky-400 border-sky-500/20",
  "Jupyter Notebook":  "bg-orange-400/10 text-orange-300 border-orange-400/20",
};

function techBadgeClass(tech: string) {
  return (
    TECH_BADGE_COLORS[tech] ??
    "bg-portfolio-primary/10 text-portfolio-primary border-portfolio-primary/20"
  );
}

// ── Shared chevron icon ───────────────────────────────────────────────────────

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s ease",
        flexShrink: 0,
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ── SpecsGrid (featured DE cards only) ───────────────────────────────────────

function SpecsGrid({ project }: { project: ShowcaseProject }) {
  return (
    <div className="grid grid-cols-3 rounded-lg overflow-hidden border border-portfolio-border/40 text-xs">
      {[
        { label: "Architecture", value: project.architecture },
        { label: "Data Volume",  value: project.dataVolume },
        { label: "SLA / Latency", value: project.sla },
      ].map(({ label, value }, i) => (
        <div
          key={label}
          className={`bg-portfolio-background/60 px-3 py-2.5 ${i < 2 ? "border-r border-portfolio-border/40" : ""}`}
        >
          <p
            className="text-[10px] text-portfolio-primary uppercase font-semibold mb-1"
            style={{ letterSpacing: "0.1em" }}
          >
            {label}
          </p>
          <p className="text-xs text-portfolio-foreground font-mono font-medium leading-tight">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}

// ── ShowcaseCard (featured DE masonry cards) ──────────────────────────────────

function ShowcaseCard({
  project,
  index,
  isLarge,
  expandedId,
  onToggle,
}: {
  project: ShowcaseProject;
  index: number;
  isLarge: boolean;
  expandedId: number | null;
  onToggle: (id: number) => void;
}) {
  const isExpanded = expandedId === project.id;

  return (
    <article
      className="bg-portfolio-card border border-portfolio-border/50 rounded-xl overflow-hidden flex flex-col hover:border-portfolio-primary/30 hover:shadow-xl transition-all duration-300 group relative"
    >
      {project.featured && (
        <div className="absolute top-3 right-3 z-10 bg-portfolio-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
          Featured
        </div>
      )}

      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ height: isLarge ? "360px" : "220px" }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ filter: "brightness(0.65) contrast(1.05)" }}
          onError={(e) => {
            const t = e.currentTarget as HTMLImageElement;
            if (!t.dataset.fallbackUsed) {
              t.dataset.fallbackUsed = "true";
              t.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400";
            }
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 20%, hsl(220 25% 11% / 0.95) 100%)" }}
          aria-hidden="true"
        />
      </div>

      <div className="p-6 flex flex-col flex-1 gap-4">
        <div>
          <h3
            className={`font-bold text-portfolio-card-foreground mb-1.5 leading-tight ${isLarge ? "text-2xl" : "text-xl"}`}
          >
            {project.title}
          </h3>
          <p className="text-sm text-portfolio-muted-foreground italic leading-snug">
            {project.tagline}
          </p>
        </div>

        <ul className="space-y-1.5" aria-label="Key highlights">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2.5 text-sm text-portfolio-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-portfolio-primary flex-shrink-0" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>

        <SpecsGrid project={project} />

        <div>
          <button
            onClick={() => onToggle(project.id)}
            aria-expanded={isExpanded}
            aria-controls={`p2-rationale-${project.id}`}
            className="flex items-center justify-between gap-2 w-full text-sm font-medium text-portfolio-primary bg-portfolio-primary/10 hover:bg-portfolio-primary/15 border border-portfolio-primary/20 hover:border-portfolio-primary/40 rounded-lg px-3 py-2 transition-all duration-200"
          >
            <span>Why these architectural choices?</span>
            <ChevronIcon expanded={isExpanded} />
          </button>
          <div
            id={`p2-rationale-${project.id}`}
            className="overflow-hidden transition-all duration-500"
            style={{ maxHeight: isExpanded ? "700px" : "0" }}
            aria-hidden={!isExpanded}
          >
            <div className="mt-3 p-4 bg-portfolio-background/60 border-l-2 border-portfolio-primary/50 rounded-r-lg">
              <p className="text-xs text-portfolio-muted-foreground leading-relaxed font-mono">
                {project.rationale}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto" aria-label="Technology stack">
          {project.tech.map((t) => (
            <span key={t} className={`px-2 py-0.5 rounded text-xs font-medium border ${techBadgeClass(t)}`}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

// ── AcademicCard (horizontal-scroll ML/CV cards) ──────────────────────────────

function AcademicCard({
  project,
  expandedId,
  onToggle,
}: {
  project: Project;
  expandedId: string | null;
  onToggle: (id: string) => void;
}) {
  const isExpanded = expandedId === project.id;

  return (
    // CRITICAL: flex-shrink-0 + w-80 prevents collapse in overflow-x-auto containers
    <article className="flex-shrink-0 w-80 bg-portfolio-card border border-portfolio-border/50 rounded-xl overflow-hidden flex flex-col hover:border-portfolio-primary/30 hover:shadow-xl transition-all duration-300 group">
      {/* Image */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: "180px" }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ filter: "brightness(0.65) contrast(1.05)" }}
          onError={(e) => {
            const t = e.currentTarget as HTMLImageElement;
            if (!t.dataset.fallbackUsed) {
              t.dataset.fallbackUsed = "true";
              t.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400";
            }
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 20%, hsl(220 25% 11% / 0.95) 100%)" }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Title */}
        <h3 className="font-semibold text-lg text-portfolio-card-foreground leading-snug">
          {project.title}
        </h3>

        {/* Impact badge */}
        <span className="inline-flex items-center text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full leading-tight">
          {project.impact}
        </span>

        {/* Description */}
        <p className="text-sm text-portfolio-muted-foreground leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Rationale toggle */}
        {project.architecture && (
          <div>
            <button
              onClick={() => onToggle(project.id)}
              aria-expanded={isExpanded}
              aria-controls={`p2-acad-rationale-${project.id}`}
              className="flex items-center justify-between gap-2 w-full text-xs font-medium text-portfolio-primary bg-portfolio-primary/10 hover:bg-portfolio-primary/15 border border-portfolio-primary/20 hover:border-portfolio-primary/40 rounded-lg px-3 py-2 transition-all duration-200"
            >
              <span>Why these choices?</span>
              <ChevronIcon expanded={isExpanded} />
            </button>
            <div
              id={`p2-acad-rationale-${project.id}`}
              className="overflow-hidden transition-all duration-500"
              style={{ maxHeight: isExpanded ? "600px" : "0" }}
              aria-hidden={!isExpanded}
            >
              <div className="mt-2 p-3 bg-portfolio-background/60 border-l-2 border-portfolio-primary/50 rounded-r-lg">
                <p className="text-xs text-portfolio-muted-foreground leading-relaxed font-mono">
                  {project.architecture}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1" aria-label="Technology stack">
          {project.technologies.map((t) => (
            <span key={t} className={`px-2 py-0.5 rounded text-xs font-medium border ${techBadgeClass(t)}`}>
              {t}
            </span>
          ))}
        </div>

        {/* GitHub link */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-portfolio-primary hover:text-portfolio-primary/80 transition-colors font-medium mt-1"
        >
          <Github className="h-3.5 w-3.5" />
          View on GitHub →
        </a>
      </div>
    </article>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

export function Projects2Section() {
  // Top-level tab: Core DE vs Applied ML & Research
  const [projectTab, setProjectTab] = useState<"de" | "ml">("de");

  // Featured DE cards
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // ML/CV subtabs
  const [activeTab, setActiveTab]                 = useState<"ml" | "cv">("ml");
  const [expandedAcademicId, setExpandedAcademicId] = useState<string | null>(null);

  const mlProjects = PROJECTS.filter(
    (p) => !p.featured && (p.category === "Machine Learning" || p.category === "Deep Learning")
  );
  const cvProjects = PROJECTS.filter(
    (p) => !p.featured && p.category === "Computer Vision"
  );

  const handleFeaturedToggle = (id: number) =>
    setExpandedId((prev) => (prev === id ? null : id));

  const handleAcademicToggle = (id: string) =>
    setExpandedAcademicId((prev) => (prev === id ? null : id));

  return (
    <section id="projects2" className="py-20 px-4 bg-portfolio-background relative">
      {/* Honeycomb background pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="honeycomb-pattern" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-12 fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg
              className="text-portfolio-primary h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <h2 className="text-4xl font-bold">Projects Showcase</h2>
          </div>
          <p className="text-xl text-portfolio-muted-foreground max-w-2xl mx-auto">
            Production systems built for scale, reliability, and precision -with full architectural rationale.
          </p>
        </div>

        {/* ── Top-level tab bar ── */}
        <div className="mb-10 border-b border-portfolio-border/40">
          <div className="flex gap-0">
            <button
              type="button"
              onClick={() => setProjectTab("de")}
              aria-pressed={projectTab === "de"}
              className={`relative px-6 py-3 text-base font-semibold transition-all duration-200 border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-primary focus-visible:ring-offset-2 ${
                projectTab === "de"
                  ? "border-portfolio-primary text-portfolio-foreground"
                  : "border-transparent text-portfolio-muted-foreground hover:text-portfolio-foreground/80"
              }`}
            >
              ⚙️ Core Data Engineering
            </button>
            <button
              type="button"
              onClick={() => setProjectTab("ml")}
              aria-pressed={projectTab === "ml"}
              className={`relative px-6 py-3 text-base font-semibold transition-all duration-200 border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-primary focus-visible:ring-offset-2 ${
                projectTab === "ml"
                  ? "border-portfolio-primary text-portfolio-foreground"
                  : "border-transparent text-portfolio-muted-foreground hover:text-portfolio-foreground/80"
              }`}
            >
              🧠 Applied ML &amp; Research
            </button>
          </div>
        </div>

        {/* ── Core DE tab: Featured masonry grid ── */}
        {projectTab === "de" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SHOWCASE_PROJECTS.map((project, index) => (
              <div key={project.id} className={index === 0 ? "lg:col-span-2" : ""}>
                <ShowcaseCard
                  project={project}
                  index={index}
                  isLarge={index === 0}
                  expandedId={expandedId}
                  onToggle={handleFeaturedToggle}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── Applied ML & Research tab: ML / CV subtabs + horizontal scroll ── */}
        {projectTab === "ml" && (
          <div>
            {/* ML / CV subtabs */}
            <div className="mb-6 border-b border-portfolio-border/30">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("ml")}
                  aria-pressed={activeTab === "ml"}
                  className={`pb-2 px-1 text-sm font-medium transition-colors duration-200 border-b-2 focus-visible:ring-2 focus-visible:ring-portfolio-primary focus-visible:ring-offset-2 focus-visible:outline-none ${
                    activeTab === "ml"
                      ? "border-portfolio-primary text-portfolio-foreground"
                      : "border-transparent text-portfolio-muted-foreground"
                  }`}
                >
                  Deep Learning &amp; Machine Learning ({mlProjects.length})
                </button>
                <button
                  onClick={() => setActiveTab("cv")}
                  aria-pressed={activeTab === "cv"}
                  className={`pb-2 px-1 text-sm font-medium transition-colors duration-200 border-b-2 focus-visible:ring-2 focus-visible:ring-portfolio-primary focus-visible:ring-offset-2 focus-visible:outline-none ${
                    activeTab === "cv"
                      ? "border-portfolio-primary text-portfolio-foreground"
                      : "border-transparent text-portfolio-muted-foreground"
                  }`}
                >
                  Computer Vision ({cvProjects.length})
                </button>
              </div>
            </div>

            {/* Tab panels */}
            <div className="min-h-[480px]">
              {activeTab === "ml" && (
                <div
                  className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
                  aria-label="Machine Learning and Deep Learning project cards, scroll horizontally"
                  style={{
                    WebkitOverflowScrolling: "touch",
                    maskImage: "linear-gradient(to right, black 80%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, black 80%, transparent 100%)",
                  }}
                >
                  {mlProjects.map((project) => (
                    <AcademicCard
                      key={project.id}
                      project={project}
                      expandedId={expandedAcademicId}
                      onToggle={handleAcademicToggle}
                    />
                  ))}
                </div>
              )}
              {activeTab === "cv" && (
                <div
                  className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
                  aria-label="Computer Vision project cards, scroll horizontally"
                  style={{
                    WebkitOverflowScrolling: "touch",
                    maskImage: "linear-gradient(to right, black 80%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, black 80%, transparent 100%)",
                  }}
                >
                  {cvProjects.map((project) => (
                    <AcademicCard
                      key={project.id}
                      project={project}
                      expandedId={expandedAcademicId}
                      onToggle={handleAcademicToggle}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
