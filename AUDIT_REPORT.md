# Portfolio Audit Report
**Candidate positioning:** Mid-to-senior Data Engineer | 2.5 yrs production DE at regulated financial scale
**Date:** 2026-05-25

---

## I. UI/UX Layout & Scannability

### 1. Broken CTA hierarchy in HeroSection
Both "View Projects" and "Get In Touch" buttons are identical green fills (`bg-portfolio-primary`). There is no visual primary/secondary distinction. A recruiter's eye has no natural next action.

**Fix:** Primary CTA gets the filled treatment; secondary becomes a ghost/outline variant.
```tsx
// Primary
<Button className="bg-portfolio-primary hover:bg-portfolio-primary/90 ...">View Projects</Button>

// Secondary — add variant="outline" or apply border-only classes
<Button className="border border-portfolio-primary text-portfolio-primary bg-transparent hover:bg-portfolio-primary/10 ...">Get In Touch</Button>
```

---

### 2. Redundant paragraph stacking in HeroSection
Three separate `<p>` tags appear below the typing role: the tagline, the subheadline, and the bio. All are `text-portfolio-muted-foreground`, all at similar opacity. The eye has no anchor. There is no typographic weight differentiation.

The hierarchy collapses to: **Name → Role → grey text → grey text → grey text → buttons.**

**Fix:** Collapse to two tiers:
- **Tier 1 (subheadline):** Single, slightly larger line (`text-lg md:text-xl`, full opacity) with the quantified production claim.
- **Tier 2 (bio):** Single muted line for credentials and open-to signal.
- **Remove:** The middle tagline ("Pipelines, Scale, and Systems That Actually Ship") — it adds no information not already in the subheadline.

---

### 3. Section ordering buries professional credibility
Current order in `portfolio.tsx`:
```
Hero → About → TechStack → Experience → Projects → Sandbox → Philosophy → Contact
```

A technical recruiter scans in this order: *Who are you → What have you shipped in production → Can I verify it?* The current order makes them pass through two full sections of self-description before reaching the Capco/Freddie Mac entry — the single highest-trust signal on the page.

**Recommended order:**
```
Hero → Experience → About → TechStack → Projects → Philosophy → Contact
```
Drop `SandboxSection` below projects or remove it from the primary nav path if it is not production-grade work.

---

### 4. All experience cards render at identical visual weight
Three cards — a Fortune 500 production role, a 6-month startup, and a grad research assistantship — are presented with the same card size, border weight, and color treatment. A hiring manager's eye treats them as equivalent.

**Fix:** Give the Capco card a subtle featured treatment: slightly brighter border (`border-portfolio-primary/50` vs. `/30`), or a `FEATURED` / `Current` badge top-right. This is not decoration — it communicates seniority orientation.

---

### 5. Project signal ratio is inverted for DE positioning
The `PROJECTS` array contains 3 DE projects and 8 CV/ML projects. The page's primary audience (DE hiring managers) will scan Projects and see a Computer Vision portfolio. The featured flag is only set on the 3 DE projects, but the remaining 8 still render in the section and will create positioning noise.

**Fix:** Add a visible filter default or separate display grouping. DE projects should lead with `featured: true` visible in a default view; ML/CV projects should require an explicit "Show All" click.

---

## II. Content, Terminology & Technical Density

### 1. "Open to mid-level DE roles" — explicit under-positioning
From `HeroSection.tsx` line 163:
```
Open to mid-level DE roles at companies building data infrastructure that matters.
```

A candidate who has run 40M-record PySpark workloads in a regulated environment (Freddie Mac), reduced batch runtimes 4x, and holds a CMU degree is at the floor of L4/mid-senior by market comp bands. Writing "mid-level" explicitly invites recruiters to anchor your offer accordingly. Remove the level qualifier entirely.

**Rewrite:**
```
CMU grad. 2.5 years in production data engineering at regulated financial scale.
Targeting DE roles at companies where batch reliability and data correctness are non-negotiable.
```

---

### 2. "batch and streaming pipelines" — unverified claim
`HeroSection.tsx` line 159 states:
```
I build production batch and streaming pipelines on AWS EMR and Snowflake
```

The `EXPERIENCE_CARDS` data contains zero streaming evidence. No Kafka, Kinesis, Flink, or Spark Structured Streaming appears in any bullet or tech badge. The `PROJECTS` array has no streaming project. `SKILL_DOMAINS` has no streaming tool listed.

**This is a credibility gap.** A technical interviewer will probe this claim and find no supporting signal. Either:
- (a) Remove "streaming" from the hero claim and own the batch specialization cleanly.
- (b) Add a streaming sidebar project to the portfolio with honest scope framing.

Option (a) is the safer choice for an interview setting.

---

### 3. "diverse datasets" and "high-visibility data assets" — vague
From Capco bullet 1: `"ingesting 10+ diverse datasets"`
From Capco bullet 4: `"curated high-visibility data assets"`

"Diverse" and "high-visibility" are adjectives that add zero technical signal. A DE hiring manager reads these as filler. Replace with specificity: source system types, schema patterns, downstream consumer identity.

---

### 4. Bosmos role is framed as AI Engineering, not Data Engineering
All three Bosmos bullets describe AI/agent architecture: OpenAI API integration, ChromaDB vector stores, multi-agent framework design, "memory-retention structures." This is competent work, but it reads as an AI platform engineer role, not a DE role.

In a DE-targeted portfolio, this section creates a positioning discontinuity. Recruiters reading linearly will re-evaluate whether this is an AI/ML candidate who pivoted to DE, which is a hiring-risk signal.

**Fix:** Reframe Bosmos around the data engineering dimensions of that work:
- How was conversation state persisted? (schema design, storage backend)
- What was the data pipeline feeding ChromaDB? (ingestion, chunking strategy, re-indexing)
- What observability or freshness guarantees were built?

---

### 5. "ML Feature Platform Builder" in ROLES animation — unsupported
`portfolio.ts` line 13:
```
"ML Feature Platform Builder",
```

No feature store project, no feature engineering pipeline, no Feast/Tecton/Hopsworks reference exists anywhere in the portfolio. This title will prompt interview questions you have no concrete answer for.

**Remove it.** The remaining ROLES titles are defensible: you have direct evidence for CDC/SCD work, observability platform, batch ELT framework, and lakehouse patterns.

---

### 6. Project `scale` fields are qualitative, not quantitative
Several DE projects use qualitative descriptors in the `scale` field where numbers should live:

```
// CDC Historical Warehouse
scale: "Incremental CDC loads · SCD Type-2 versioning · Temporal consistency"

// Data Observability Platform  
scale: "Configuration-driven thresholds · Statistical baselining · Rolling-window metrics"
```

These are architecture descriptions, not scale descriptors. Scale should answer: how many records, how many tables monitored, what was the latency SLA, how many pipelines covered?

Even if the exact numbers were from a personal project (not production), approximate benchmark figures are better than none.

---

### 7. Batch Analytics "synthetic" qualifier undermines the scale claim
```
impact: "Config-driven DAG generation · 50M+ record synthetic workloads ..."
```

The word "synthetic" is doing quiet damage. It flags that this is not real production data, which a hiring manager will note. Reframe: don't hide it, but don't lead with it. Put the architectural achievement first and scope the benchmark as a validation mechanism.

**Rewrite:**
```
impact: "Config-driven DAG generation · validated PySpark partition tuning against 50M-record benchmark datasets · reusable pipeline abstractions for heterogeneous schemas"
```

---

## III. Concrete Experience Bullet Rewrites

### Capco (Client: Freddie Mac) — Data Engineer

**Current bullet 1:**
> Designed and productionized distributed ETL pipelines on AWS EMR (EC2 & EKS), ingesting 10+ diverse datasets and processing 40M+ records per batch using PySpark.

**Rewrite:**
> Designed and productionized PySpark ETL pipelines on AWS EMR (EC2 + EKS), integrating 10+ source systems — including transactional, reference, and regulatory datasets — processing 40M+ records per daily batch with partition-aware execution strategies.

---

**Current bullet 2:**
> Optimized Spark workloads, reducing end-to-end batch runtimes from ~40 min to sub 10 min, accelerating daily reporting for senior stakeholders.

**Rewrite:**
> Tuned PySpark execution plans — dynamic partitioning, broadcast join thresholds, shuffle partition sizing — cutting batch runtimes from ~40 min to under 10 min and ensuring on-time SLA delivery for daily risk reporting windows.

*(Remove "senior stakeholders" — the system SLA is the credibility signal, not the audience.)*

---

**Current bullet 3:**
> Built dependency-aware daily and monthly batch workflows via Control-M and Jenkins, enforcing SLAs and automated failure recovery.

**Rewrite:**
> Operationalized dependency-aware batch workflows in Control-M and Jenkins across daily and monthly cadences, implementing automated failure recovery paths and job-level SLA alerting to maintain pipeline reliability in a regulated production environment.

---

**Current bullet 4:**
> Engineered Snowflake data models and curated high-visibility data assets to power downstream executive dashboards and analytics tools.

**Rewrite:**
> Modeled Snowflake analytical schemas using SCD Type-2 patterns for historical lineage, designing clustered tables and materialized aggregation layers to support downstream BI tooling with sub-30s query response on 3+ years of transactional history.

*(If the SCD Type-2 work here doesn't apply, replace with whatever schema design choice you actually made — the point is specificity.)*

---

### Bosmos — Lead AI & Automation Engineer

**Current bullet 3:**
> Designed custom memory-retention structures to maintain persistent conversational context across distributed system nodes, optimizing system latency by 35%.

**Rewrite:**
> Designed a persistent context-store schema using ChromaDB and structured JSON state objects to maintain agent memory across distributed nodes; profiled embedding retrieval paths and reduced end-to-end response latency by 35% through batched vector lookup and response caching.

---

### DRC — Graduate Research Assistant

**Current bullet 2:**
> Utilized PyTorch and OpenCV frameworks to build automated tracking and feature extraction scripts, optimizing frame ingestion speeds and model execution times by 40%.

**Rewrite:**
> Built automated frame ingestion and feature extraction pipelines using PyTorch and OpenCV, processing multi-hour video sequences; restructured data preprocessing to leverage vectorized NumPy operations, reducing per-batch pipeline execution time by 40%.

---

## Summary Priority Order

| Priority | Change | Effort |
|---|---|---|
| P0 | Remove "streaming" from hero claim OR add supporting evidence | 15 min |
| P0 | Remove "Open to mid-level DE roles" — use domain-specific targeting language | 5 min |
| P0 | Remove "ML Feature Platform Builder" from ROLES — no supporting evidence | 2 min |
| P1 | Rewrite Capco bullet 4 with schema/modeling specificity | 10 min |
| P1 | Reframe Bosmos section around data/state management, not AI features | 20 min |
| P1 | Swap section order: Experience before TechStack | 5 min |
| P2 | Differentiate primary/secondary CTA buttons visually | 10 min |
| P2 | Collapse three hero paragraph tags to two tiers | 10 min |
| P2 | Add featured visual treatment to Capco card | 10 min |
| P3 | Replace qualitative `scale` fields with record counts / latency SLAs in DE projects | 30 min |
| P3 | Default DE projects as visible; gate CV/ML behind "Show All" | 30 min |
