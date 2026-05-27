"use client";

import freddieMacLogo from "@/assets/logos/fm.png";
import bosmosLogo from "@/assets/logos/bosmos-logo.png";
import drcLogo from "@/assets/logos/drc.png";

function boldify(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-semibold text-portfolio-foreground">{part}</strong> : part
  );
}

const EXPERIENCE_CARDS = [
  {
    id: "capco-data-engineer",
    featured: true,
    logo: freddieMacLogo,
    company: "Capco (Client: Freddie Mac)",
    title: "Data Engineer",
    period: "Apr 2024 - Present",
    bullets: [
      "Designed and productionized PySpark ETL pipelines on AWS EMR (EC2 + EKS), integrating **10+** source systems — including transactional, reference, and regulatory datasets — processing **40M+** records per daily batch with partition-aware execution strategies.",
      "Tuned PySpark execution plans — dynamic partitioning, broadcast join thresholds, shuffle partition sizing — cutting batch runtimes from **~40 min to sub 10 min** and ensuring on-time SLA delivery for daily risk reporting windows.",
      "Operationalized dependency-aware batch workflows in Control-M and Jenkins across daily and monthly cadences, implementing automated failure recovery paths and job-level SLA alerting to maintain pipeline reliability in a regulated production environment.",
      "Modeled Snowflake analytical schemas using SCD Type-2 patterns for historical lineage, designing clustered tables and materialized aggregation layers to support downstream BI tooling with **sub-30s** query response on **3+ years** of transactional history.",
      "Spearheaded Snowpark-based transformation standardization and Snowflake query optimization, reducing code divergence by **40%** and saving **$16K annually**.",
      "Reconstructed **22+ years** of historical data with Informatica IICS and Snowflake, establishing consistent baselines and improving reconciliation accuracy.",
    ],
    techBadges: ["PySpark", "AWS EMR", "AWS EKS", "Snowflake", "Control-M", "Jenkins", "SQL", "Snowpark", "Informatica"],
  },
  {
    id: "bosmos-lead-ai",
    logo: bosmosLogo,
    company: "Bosmos",
    title: "Lead AI Developer",
    period: "Sep 2023 - Mar 2024",
    bullets: [
      "Architected and deployed an automated multi-agent framework utilizing Python, OpenAI API, and ChromaDB vector stores to automate operational workflows.",
      "Integrated messaging network infrastructure via WhatsApp and Telegram APIs to deliver asynchronous alerts and automated real-time notifications.",
      "Designed a persistent context-store schema using ChromaDB and structured JSON state objects to maintain agent memory across distributed nodes; profiled embedding retrieval paths and reduced end-to-end response latency by **35%** through batched vector lookup and response caching.",
    ],
    techBadges: ["Python", "OpenAI API", "ChromaDB", "Vector Search", "API Integration"],
  },
  {
    id: "drc-research-assistant",
    logo: drcLogo,
    company: "Digital Research Center (DRC)",
    title: "Graduate Research Assistant",
    period: "Dec 2021 - May 2023",
    bullets: [
      "Engineered computer vision (CV) and machine learning (ML) data preprocessing pipelines to ingest and normalize large-scale experimental video datasets.",
      "Built automated frame ingestion and feature extraction pipelines using PyTorch and OpenCV, processing multi-hour video sequences; restructured data preprocessing to leverage vectorized NumPy operations, reducing per-batch pipeline execution time by **40%**.",
    ],
    techBadges: ["Python", "PyTorch", "OpenCV", "Machine Learning", "Computer Vision"],
  },
];

function ExperienceCard({ logo, company, title, period, bullets, techBadges, featured }: (typeof EXPERIENCE_CARDS)[number]) {
  return (
    <div className={`relative bg-portfolio-card border rounded-xl p-5 transition-all duration-300 hover:bg-portfolio-card/80 ${featured ? "border-portfolio-primary/60 hover:border-portfolio-primary/80" : "border-portfolio-border/50 hover:border-portfolio-primary/30"}`}>
      {featured && (
        <span className="absolute top-3 right-3 text-xs font-mono font-semibold text-portfolio-primary bg-portfolio-primary/10 border border-portfolio-primary/30 px-2 py-0.5 rounded">
          Current
        </span>
      )}
      {/* Header - logo left + company/title stacked */}
      <div className="flex items-center gap-3 mb-4">
        <img src={logo} alt={company} className="w-10 h-10 object-contain" />
        <div>
          <h3 className="font-semibold text-portfolio-foreground text-base">{company}</h3>
          <p className="text-portfolio-muted-foreground text-sm">{title}</p>
        </div>
      </div>

      {/* Date badge - on its own line */}
      <span className="font-mono text-xs text-portfolio-muted-foreground bg-portfolio-input px-2 py-1 rounded inline-block mb-4">
        {period}
      </span>

      {/* Bullet list */}
      <ul className="list-disc pl-5 space-y-2 text-portfolio-muted-foreground text-sm leading-relaxed">
        {bullets.map((b, i) => (
          <li key={i}>{boldify(b)}</li>
        ))}
      </ul>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-portfolio-border/30">
        {techBadges.map((badge) => (
          <span key={badge} className="font-mono text-xs text-portfolio-primary bg-portfolio-primary/10 px-2 py-0.5 rounded border border-portfolio-border/30">
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-portfolio-foreground" data-testid="experience-title">
          Experience
        </h2>
        <div className="flex flex-col gap-6">
          {EXPERIENCE_CARDS.map((card) => (
            <ExperienceCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
