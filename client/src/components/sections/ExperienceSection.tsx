"use client";

import { TrendingUp } from "lucide-react";
import freddieMacLogo from "@/assets/logos/fm.png";
import bosmosLogo from "@/assets/logos/bosmos-logo.png";
import drcLogo from "@/assets/logos/drc.png";

const EXPERIENCE_CARDS = [
  {
    id: "capco-data-engineer",
    logo: freddieMacLogo,
    company: "Capco (Client: Freddie Mac)",
    title: "Data Engineer",
    period: "Apr 2024 - Present",
    bullets: [
      "Designed and productionized distributed ETL pipelines on AWS EMR (EC2 & EKS), ingesting 10+ diverse datasets and processing 40M+ records per batch using PySpark.",
      "Optimized Spark workloads, reducing end-to-end batch runtimes from ~40 min to sub 10 min, accelerating daily reporting for senior stakeholders.",
      "Built dependency-aware daily and monthly batch workflows via Control-M and Jenkins, enforcing SLAs and automated failure recovery.",
      "Engineered Snowflake data models and curated high-visibility data assets to power downstream executive dashboards and analytics tools.",
    ],
    techBadges: ["PySpark", "AWS EMR", "AWS EKS", "Snowflake", "Control-M", "Jenkins", "SQL"],
  },
  {
    id: "bosmos-lead-ai",
    logo: bosmosLogo,
    company: "Bosmos",
    title: "Lead AI & Automation Engineer",
    period: "Sep 2023 - Mar 2024",
    bullets: [
      "Architected and deployed an automated multi-agent framework utilizing Python, OpenAI API, and ChromaDB vector stores to automate operational workflows.",
      "Integrated messaging network infrastructure via WhatsApp and Telegram APIs to deliver asynchronous alerts and automated real-time notifications.",
      "Designed custom memory-retention structures to maintain persistent conversational context across distributed system nodes, optimizing system latency by 35%.",
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
      "Utilized PyTorch and OpenCV frameworks to build automated tracking and feature extraction scripts, optimizing frame ingestion speeds and model execution times by 40%.",
    ],
    techBadges: ["Python", "PyTorch", "OpenCV", "Machine Learning", "Computer Vision"],
  },
];

function ExperienceCard({
  logo,
  company,
  title,
  period,
  bullets,
  techBadges,
}: (typeof EXPERIENCE_CARDS)[number]) {
  return (
    <div className="border border-slate-800 bg-slate-950/40 rounded-xl p-5">
      {/* Header — natural vertical stack */}
      <div className="flex items-center gap-3 mb-4">
        <img src={logo} alt={company} className="w-10 h-10 object-contain" />
        <div>
          <h3 className="font-semibold text-white text-base">{company}</h3>
          <p className="text-slate-400 text-sm">{title}</p>
        </div>
      </div>

      {/* Date badge — on its own line */}
      <span className="font-mono text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded inline-block mb-4">
        {period}
      </span>

      {/* Bullet list — clean, well-spaced */}
      <ul className="list-disc pl-5 space-y-2 text-slate-200 text-sm">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-800">
        {techBadges.map((badge) => (
          <span
            key={badge}
            className="font-mono text-xs bg-slate-800 text-blue-300 px-2 py-0.5 rounded border border-slate-700/50"
          >
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}

function ExperienceSectionInner() {
  return (
    <section className="py-20 px-6" id="experience">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-2xl font-semibold mb-12 flex items-center justify-center gap-2"
          aria-label="Professional Experience"
        >
          <TrendingUp className="text-emerald-400 h-5 w-5" aria-hidden="true" />
          <span className="text-white">Experience</span>
        </h2>

        {/* Mobile-first vertical stack */}
        <div className="flex flex-col gap-6">
          {EXPERIENCE_CARDS.map((card) => (
            <ExperienceCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return <ExperienceSectionInner />;
}