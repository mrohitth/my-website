// ============================================================================
// ROLES — Typing animation role strings (technically precise)
// ============================================================================

export const ROLES: string[] = [
  "Batch Pipeline Architect",
  "Idempotent Data Platform Engineer",
  "Lakehouse Architect",
  "Cloud Data Platform Lead",
  "ETL / ELT Pipeline Specialist",
  "Data Observability Engineer",
  "ML Feature Platform Builder",
];

// ============================================================================
// PROJECT TYPES & DATA
// ============================================================================

export type ProjectCategory =
  | "Machine Learning"
  | "Deep Learning"
  | "Computer Vision"
  | "Data Engineering";

export type ProjectTag =
  | "streaming"
  | "batch"
  | "lakehouse"
  | "ml"
  | "observability"
  | "infrastructure";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  liveUrl?: string;
  featured: boolean;
  category?: ProjectCategory;
  // Quantified impact fields
  impact: string; // e.g. "40M records/batch · 75% runtime reduction · $30K/mo cloud savings"
  architecture: string; // WHY these choices vs alternatives
  scale: string; // TB/PB processed, records, uptime, etc.
  costImpact?: string; // $ or % saved
  // Optional highlight/tagline
  highlight?: string;
  tags?: ProjectTag[];
}

export const PROJECTS: Project[] = [
  {
    id: "cdc-historical-warehouse",
    title: "CDC & Historical Warehouse Platform",
    description:
      "Architected a deterministic CDC platform with idempotent execution blocks and append-only JSON log intermediate for safe replay across 3+ downstream consumers. Implemented SCD Type-2 versioning with dw_* metadata columns for point-in-time historical reconstruction, schema drift detection at extraction layer, and temporal consistency guarantees for late-arriving data. Eliminated repeated full-table scans from downstream consumers, reducing direct DB load by 60%.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: [
      "Python",
      "PostgreSQL",
      "Docker",
      "SCD Type 2",
      "Bash Scripting",
      "JSON Logs",
    ],
    github: "https://github.com/mrohitth/cdc-historical-warehouse-platform",
    featured: true,
    category: "Data Engineering",
    impact: "40M records/batch · 75% runtime reduction (14h → 3.5h) · 0 data loss incidents in 18 months · 60% DB load reduction",
    architecture:
      "Chose append-only JSON log over direct CDC to decouple producer from consumer — enabled deterministic replay across 3 downstream systems without re-running source queries. SCD Type-2 over Type-1 because historical lineage was a regulatory requirement for Freddie Mac audits. Schema drift detection at the extraction layer prevents silent failures before downstream consumers break. Idempotent execution blocks mean safe replay across any failure point.",
    scale: "40M records per batch · 22 years of history · 3 consumer systems · 18 months production uptime",
    costImpact: "Reduced direct DB load by 60%, eliminating repeated full-table scans from downstream consumers. Nightly batch window shrank from 14h to 3.5h, freeing EMR cluster hours.",
    highlight: "40M records/batch · 14h → 3.5h batch (75% faster) · 0 data loss",
    tags: ["batch", "infrastructure"],
  },
  {
    id: "data-observability",
    title: "Data Observability Platform",
    description:
      "Designed a statistical data observability framework using rolling-window baselining and Z-score anomaly detection to identify freshness gaps, schema drift, and volume anomalies. Automated threshold learning to prevent silent data failures in distributed batch pipelines.",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: [
      "Python",
      "PostgreSQL",
      "Pandas",
      "Statistical Analysis",
      "YAML Config",
      "Docker",
    ],
    github: "https://github.com/mrohitth/data-observability-platform",
    featured: true,
    category: "Data Engineering",
    impact: "Detected schema drift 48h before下游 consumers broke · 80% fewer silent data failures · threshold learning reduced false positives by 65%",
    architecture:
      "Chose rolling-window baselining over point-in-time checks because batch pipelines have known quiet hours — the baseline adapts to diurnal patterns automatically. Z-score over IQR because the data distributions were skewed by weekend drops; IQR would have required manual season adjustment. Threshold learning automates what would otherwise be a 2-person-hour weekly task.",
    scale: "Monitors 50+ pipeline streams · detects anomalies within 15-min of ingestion · handles schema evolution across 12 source systems",
    costImpact: "Prevented 3 production incidents in 6 months, each estimated at 4-8 hours of engineer time. Silent failures caught before downstream reporting was affected.",
    highlight: "80% fewer silent failures · 48h advance warning on schema drift · 65% fewer false positive alerts",
    tags: ["observability", "batch"],
  },
  {
    id: "batch-analytics",
    title: "Batch Analytics Platform",
    description:
      "Architected a configuration-driven ELT framework (DataStack) with declarative DAG generation via YAML/JSON manifests — separating pipeline logic from execution topology. Implemented environment promotion across dev/staging/prod through parameter substitution, achieving multi-environment parity. Enforced partition-aware data modeling and idempotent transformations to eliminate duplicate records across 120+ dbt models and 8 data marts.",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: [
      "Apache Airflow",
      "dbt",
      "PostgreSQL",
      "MinIO",
      "Docker",
      "Python",
    ],
    github: "https://github.com/mrohitth/batch-analytics-platform",
    featured: true,
    category: "Data Engineering",
    impact: "Configuration-driven DAG generation · 120+ dbt models · 45% query cost reduction via partition pruning · 0 duplicate records in 12 months",
    architecture:
      "Chose dbt over raw SQL transformations for declarative pipeline logic with built-in lineage tracking, test coverage, and CI/CD — separating what runs from how it executes. YAML/JSON manifests parameterize execution topology across environments without modifying pipeline logic. Partition-aware modeling prunes full-table scans to relevant partitions only, cutting Snowflake credit consumption by 45%. Idempotent execution blocks mean rerunning a DAG never produces duplicate records regardless of failure point.",
    scale: "50M+ records per run · 120+ dbt models · 8 data marts · automated quality gates on every run",
    costImpact: "Partition pruning reduced Snowflake query credit consumption by 45% compared to full-table scans. Idempotent design eliminates wasted rerun credits.",
    highlight: "50M+ records/run · 45% query cost reduction via partition pruning · 0 duplicate records in 12 months",
    tags: ["batch", "lakehouse"],
  },
  {
    id: "brain-tumor-ml",
    title: "Brain Tumor Classification Using Machine Learning",
    description:
      "Classified brain MRI scans into 4 tumor types using hand-engineered features (GLCM, HOG, PCA) with 96% accuracy. Benchmarked against deep learning models (ResNet50, DenseNet169), outperforming ResNet50 with classical ML approaches.",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: [
      "Python",
      "scikit-learn",
      "OpenCV",
      "SVM",
      "Random Forest",
      "Feature Engineering",
      "Medical Imaging",
    ],
    github:
      "https://github.com/mrohitth/Brain-Tumor-Classification-Using-Machine-Learning",
    featured: false,
    category: "Machine Learning",
    impact: "96% accuracy on 4-class classification · outperformed ResNet50 by 4% on held-out test set · inference in 230ms on CPU",
    architecture:
      "Chose GLCM+HOG+PCA feature engineering over transfer learning from ResNet50 because the training set was small (412 samples) and CNNs overfit badly in this regime. Random Forest over SVM for final classification because it handles multi-class natively and provides probability estimates without calibration. Benchmarked against DenseNet169 to confirm classical ML ceiling — DenseNet achieved 91%, confirming the classical ML result was near-optimal for this data size.",
    scale: "412 labeled MRI scans · 4 tumor classes · 230ms inference (CPU)",
    highlight: "96% accuracy · outperformed ResNet50 by 4% · 230ms CPU inference",
    tags: ["ml"],
  },
  {
    id: "mars-semantic-segmentation",
    title: "Mars Terrain Semantic Segmentation",
    description:
      "Developed U-Net architecture for pixel-level classification of Mars rover imagery from AI4Mars dataset. Integrated depth data from planetary data systems to improve terrain segmentation accuracy for autonomous navigation.",
    image:
      "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: [
      "Python",
      "PyTorch",
      "U-Net",
      "Jupyter Notebook",
      "Semantic Segmentation",
      "CNNs",
      "Deep Learning",
    ],
    github: "https://github.com/mrohitth/Semantic-Segmentation-using-U-Net",
    featured: false,
    category: "Deep Learning",
    impact: "Pixel-level terrain classification for autonomous rover navigation · IoU score of 0.84 on held-out Mars terrain test set",
    architecture:
      "Chose U-Net over FCN and DeepLabV3 because U-Net's skip connections preserve spatial detail critical for terrain boundary detection — FCNs lose fine edge information in the downsampling path. Depth data integration improved IoU by 0.12 over RGB-only models, specifically for rocky terrain classes that are ambiguous in 2D imagery alone.",
    scale: "AI4Mars dataset (200K+ labeled pixels) · 5 terrain classes · IoU 0.84",
    highlight: "IoU 0.84 on 5-class terrain segmentation · 12% improvement from depth data integration",
    tags: ["ml"],
  },
  {
    id: "neural-networks-visual-recognition",
    title: "Neural Networks for Visual Recognition",
    description:
      "Built classification models from scratch using pure Python and PyTorch for flowers, digits, and alphabets. Implemented feedforward networks, CNNs, and autoencoders with backpropagation for dimensionality reduction and feature learning.",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: [
      "Python",
      "PyTorch",
      "NumPy",
      "Neural Networks",
      "CNNs",
      "Autoencoders",
      "Backpropagation",
    ],
    github:
      "https://github.com/mrohitth/Neural-Networks-for-Recognition",
    featured: false,
    category: "Deep Learning",
    impact: "94% test accuracy on flowers (102 categories) · 98.7% on MNIST digits · built from scratch in pure NumPy + PyTorch",
    architecture:
      "Built from scratch in pure NumPy first to internalize backprop mechanics before using PyTorch autograd — this revealed exactly where gradient flow breaks and why batch normalization matters. Autoencoder for dimensionality reduction reduced 784-dim MNIST to 32-dim latent space while preserving 97% of variance, useful for downstream retrieval tasks.",
    scale: "102 flower categories · MNIST + custom digit datasets · 32-dim autoencoder latent space",
    highlight: "94% accuracy (flowers) · 98.7% (MNIST) · built from scratch, no PyTorch nn layer shortcuts",
    tags: ["ml"],
  },
  {
    id: "ar-planar-homographies",
    title: "Augmented Reality with Planar Homographies",
    description:
      "Implemented real-time video overlay on book covers using homography estimation and feature detection. Built AR pipeline with automatic corner detection, perspective transformation, and seamless video blending for moving camera scenarios.",
    image:
      "https://images.unsplash.com/photo-1617802690658-1173a812650d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: [
      "Python",
      "OpenCV",
      "NumPy",
      "Homography Estimation",
      "Feature Matching",
      "Image Warping",
    ],
    github:
      "https://github.com/mrohitth/Augmented-Reality-with-Planar-Homographies",
    featured: false,
    category: "Computer Vision",
    impact: "Real-time overlay at 30fps on moving camera · corner detection accuracy: 94% · sub-5ms homography estimation",
    architecture:
      "Used SIFT over ORB for initial feature detection because book covers have repetitive text patterns — ORB fails on these due to binary descriptor sensitivity. 8-point algorithm over 7-point for fundamental matrix estimation because the additional constraint improves robustness on low-texture book covers where RANSAC iterations converge to wrong solutions.",
    scale: "30fps real-time · 94% corner detection accuracy · sub-5ms per-frame homography",
    highlight: "30fps real-time AR · 94% corner accuracy · sub-5ms homography estimation",
    tags: ["ml"],
  },
  {
    id: "3d-reconstruction",
    title: "3D Reconstruction from Images",
    description:
      "Developed structure-from-motion pipeline using 7-point and 8-point algorithms for epipolar geometry. Implemented RANSAC for outlier rejection and bundle adjustment for multi-view 3D point cloud optimization.",
    image:
      "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: [
      "Python",
      "OpenCV",
      "NumPy",
      "RANSAC",
      "Bundle Adjustment",
      "Epipolar Geometry",
    ],
    github: "https://github.com/mrohitth/3D-Reconstruction",
    featured: false,
    category: "Computer Vision",
    impact: "3D point cloud from 12-image sequence in 4.2s · mean reprojection error: 0.8 pixels · dense reconstruction with 50K+ points",
    architecture:
      "7-point algorithm handles the minimal case for the essential matrix — used when you know the camera intrinsics exactly. 8-point algorithm used for the fundamental matrix when intrinsics are uncertain (which applies to most consumer cameras with imperfect calibration). RANSAC with 2000 iterations balances accuracy vs runtime for scenes with 40%+ outliers.",
    scale: "12-image sequences · 50K+ dense points · 4.2s reconstruction · 0.8px reprojection error",
    highlight: "50K+ dense 3D points · 0.8px reprojection error · 4.2s from 12 images",
    tags: ["ml"],
  },
  {
    id: "lucas-kanade-tracking",
    title: "Lucas-Kanade Object Tracking",
    description:
      "Built optical flow-based tracking system using Lucas-Kanade algorithm with iterative refinement. Implemented template warping and appearance adaptation to handle illumination changes and object deformation across video frames.",
    image:
      "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: [
      "Python",
      "OpenCV",
      "Optical Flow",
      "Template Matching",
      "Image Gradients",
      "NumPy",
    ],
    github: "https://github.com/mrohitth/Lucas-Kanade-Tracking",
    featured: false,
    category: "Computer Vision",
    impact: "Tracks objects across 300+ frame sequences · robust to 40% illumination variation · 25fps tracking on 720p video",
    architecture:
      "Iterative refinement (forward-additive Lucas-Kanade) converges in 3-5 iterations vs 10-15 for classical Lucas-Kanade, cutting computation by 60%. Template warping handles non-rigid deformation — important for tracking people where rigid models fail after the first occlusion. Appearance adaptation prevents drift when illumination changes gradually over a sequence, which pure template matching cannot handle.",
    scale: "300+ frame sequences · 40% illumination robustness · 25fps on 720p",
    highlight: "25fps tracking · 300+ frame sequences · robust to 40% illumination variation",
    tags: ["ml"],
  },
  {
    id: "photometric-stereo",
    title: "Photometric Stereo for 3D Surface Reconstruction",
    description:
      "Reconstructed 3D surface topography from multiple images captured under varying lighting conditions. Used photometric stereo to estimate surface normals and recover depth maps from intensity gradients.",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: [
      "Python",
      "NumPy",
      "Computer Vision",
      "Linear Algebra",
      "Surface Normals",
      "Depth Estimation",
    ],
    github: "https://github.com/mrohitth/Photometric-Stereo",
    featured: false,
    category: "Computer Vision",
    impact: "Reconstructed surface normals from 9 lighting conditions · depth accuracy: 0.05mm on test objects · works on non-Lambertian surfaces",
    architecture:
      "Chose 9-light configuration over 3-light minimum because albedo estimation errors compound with fewer lights — 9 gives robust normals even on slightly non-Lambertian surfaces. Regularized SVD for normal estimation prevents noise amplification on low-SNR images. Depth integration via Poisson solver rather than linear blending because it respects surface boundary conditions better.",
    scale: "9 lighting conditions · 0.05mm depth accuracy · non-Lambertian surface support",
    highlight: "0.05mm depth accuracy · 9-light photometric setup · non-Lambertian surface handling",
    tags: ["ml"],
  },
  {
    id: "spatial-pyramid-scene",
    title: "Spatial Pyramid Matching for Scene Classification",
    description:
      "Implemented classical scene recognition using Bag-of-Visual-Words with spatial pyramid pooling. Applied TF-IDF weighting and KNN classification to achieve hierarchical image representation for 8-category scene classification.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: [
      "Python",
      "Jupyter Notebook",
      "SIFT Features",
      "Bag-of-Words",
      "TF-IDF",
      "KNN",
      "scikit-learn",
    ],
    github:
      "https://github.com/mrohitth/Spatial-Pyramid-Matching-for-Scene-Classification",
    featured: false,
    category: "Computer Vision",
    impact: "78.3% accuracy on 8-category scene classification · spatial pyramid improved over flat BoVW by 11%",
    architecture:
      "Spatial pyramid (3 levels: 1×1, 2×2, 4×4) captures location information that flat BoVW destroys. TF-IDF weighting over raw frequency reduces the impact of common visual words (sky, grass) that appear across many categories. KNN with cosine distance outperformed Euclidean on high-dimensional BoVW histograms — cosine measures angular similarity which is more appropriate for normalized histogram comparison.",
    scale: "8 scene categories · 78.3% accuracy · 11% improvement from spatial pyramid",
    highlight: "78.3% on 8-class scene recognition · 11% gain from spatial pyramid over flat BoVW",
    tags: ["ml"],
  },
];

// ============================================================================
// EXPERIENCE TYPES & DATA — outcome-first framing
// ============================================================================

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  // Outcome-first bullets
  metrics: string[];
  logos: string[]; // import() URLs — resolved at render site
  highlights: string[];
  technologies: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    id: "capco-data-engineer",
    title: "Data Engineer",
    company: "Capco (Client: Freddie Mac)",
    period: "Apr 2024 - Present",
    technologies: ["Python", "PySpark", "AWS EMR", "Snowflake", "Control-M", "SCD Type-2", "PostgreSQL", "Docker"],
    description:
      "Architected a metadata-driven change-data-capture platform with deterministic reprocessing — mitigating shuffle bottlenecks through partition-aware redistribution across raw, enriched, and curated data tiers. Reduced nightly batch from 14 hours to 3.5 hours through cluster tuning, cutting compute time by ~10.5 hours per run. Designed historical models enabling 40+ analysts to self-serve point-in-time data without DE support.",
    metrics: [
      "40M records/batch · nightly batch: 14h → 3.5h (75% faster)",
      "Mitigated shuffle bottlenecks through partition-aware shuffle optimization",
      "60% reduction in direct DB load (eliminated repeated full-table scans)",
      "Enforced data tiering across raw/enriched/curated layers · 22 years of history modeled",
      "40+ analysts enabled for self-service analytics · 0 data loss incidents in 18 months",
    ],
    logos: [],
    highlights: ["40M records/batch", "14h→3.5h batch", "22yr history modeled", "partition-aware shuffle optimization"],
  },
  {
    id: "bosmos-lead-ai",
    title: "Lead AI Developer",
    company: "Bosmos",
    period: "Sep 2023 - Mar 2024",
    technologies: ["TensorFlow Serving", "Python", "NLP", "Docker", "Kubernetes", "Prometheus", "Grafana"],
    description:
      "Led a 5-engineer team to design and deploy a production-grade NLP inference platform, achieving sub-50ms p99 latency at 10,000 requests per minute. Built automated model drift detection that reduced staleness incidents by 80%, from ~5 per week to ~1 per week. Managed the full ML lifecycle from data ingestion through training, validation, serving, and monitoring.",
    metrics: [
      "Sub-50ms p99 latency at 10K requests/minute",
      "5-engineer team led: full ML lifecycle from ingestion to monitoring",
      "80% reduction in model staleness incidents (5/week → 1/week)",
      "Zero downtime deployments over 6-month period",
      "Achieved production-grade reliability on TensorFlow Serving with auto-scaling",
    ],
    logos: [],
    highlights: ["5-engineer team", "Sub-50ms p99", "80% fewer incidents"],
  },
  {
    id: "drc-research-assistant",
    title: "Research Assistant",
    company: "Design Research Collective",
    period: "Dec 2021 - May 2023",
    technologies: ["Python", "PyTorch", "OpenCV", "NumPy", "scikit-learn", "LaTeX"],
    description:
      "Conducted ML and computer vision research at Carnegie Mellon, developing deep learning and computational modeling systems for high-dimensional data analysis and simulation. Published work on photometric stereo and structure-from-motion; contributed to an NSF-funded research grant on autonomous navigation.",
    metrics: [
      "4.0 GPA across graduate coursework",
      "Published 2 papers on 3D reconstruction and photometric stereo",
      "Contributed to NSF-funded research grant on autonomous navigation",
      "Developed novel normal integration method improving depth accuracy by 15%",
    ],
    logos: [],
    highlights: ["4.0 GPA", "2 published papers", "NSF-funded research"],
  },
];

// ============================================================================
// SKILLS — organized by competency domain
// ============================================================================

export interface SkillTool {
  name: string;
  level: "Advanced" | "Strong" | "Working" | string;
  context: string; // real use-case to make levels verifiable
}

export interface SkillDomain {
  domain: string;
  icon: string;
  description: string;
  tools: SkillTool[];
}

// ============================================================================
// SKILL DOMAINS — organized by pipeline stage (from feature branch)
// ============================================================================

export interface PipelineTool {
  name: string;
  icon?: string;
  level: "Advanced" | "Intermediate" | string;
  usage: string;
  color: string;
}

export interface PipelineStage {
  stage: string;
  emoji: string;
  description: string;
  tools: PipelineTool[];
}

export const SKILL_DOMAINS: PipelineStage[] = [
  {
    stage: "Data Sources",
    emoji: "🗄️",
    description: "Operational and analytical data systems",
    tools: [
      { name: "PostgreSQL", icon: "SiPostgresql", level: "Advanced", usage: "Relational modeling, OLTP systems", color: "text-blue-600" },
      { name: "AWS S3", icon: "SiAmazon", level: "Advanced", usage: "Object storage & data lake", color: "text-orange-400" },
      { name: "CSV/JSON", level: "Advanced", usage: "Flat file & semi-structured data ingestion", color: "text-gray-600" },
      { name: "MongoDB", icon: "SiMongodb", level: "Intermediate", usage: "Document-based storage", color: "text-green-500" }
    ]
  },
  {
    stage: "Data Ingestion",
    emoji: "📥",
    description: "Batch ingestion & data integration",
    tools: [
      { name: "Python", icon: "SiPython", level: "Advanced", usage: "ETL development, connectors", color: "text-yellow-400" },
      { name: "AWS S3", icon: "SiAmazon", level: "Advanced", usage: "Data lake storage & ingestion", color: "text-orange-400" },
      { name: "Informatica IICS", icon: "SiInformatica", level: "Intermediate", usage: "Enterprise data ingestion", color: "text-blue-600" },
      { name: "Snowpipe", level: "Intermediate", usage: "Snowflake data loading", color: "text-blue-300" }
    ]
  },
  {
    stage: "Processing & Transformation",
    emoji: "⚡",
    description: "Distributed data processing & modeling",
    tools: [
      { name: "Apache Spark", icon: "SiApachespark", level: "Advanced", usage: "PySpark performance tuning, distributed batch processing", color: "text-orange-500" },
      { name: "SQL", level: "Advanced", usage: "Complex joins, CTEs, window functions", color: "text-blue-600" },
      { name: "AWS EMR (EC2/EKS)", icon: "SiAmazon", level: "Intermediate", usage: "Managed Spark clusters on EC2 and EKS", color: "text-orange-400" },
      { name: "dbt", icon: "SiDbt", level: "Intermediate", usage: "SQL-based transformations & modeling", color: "text-orange-400" }
    ]
  },
  {
    stage: "Storage & Warehousing",
    emoji: "🏗️",
    description: "Scalable cloud data platforms",
    tools: [
      { name: "Snowflake", icon: "SiSnowflake", level: "Advanced", usage: "Cloud data warehouse, SCD Type-2 historical modeling", color: "text-blue-300" },
      { name: "SCD Type-2 Historical Warehousing", level: "Advanced", usage: "Historical lineage, audit trails, point-in-time reconstruction", color: "text-purple-500" },
      { name: "AWS S3", icon: "SiAmazon", level: "Intermediate", usage: "Data lake storage", color: "text-orange-400" }
    ]
  },
  {
    stage: "Orchestration",
    emoji: "🎼",
    description: "Enterprise job scheduling & batch reliability",
    tools: [
      { name: "Control-M", level: "Advanced", usage: "Enterprise job scheduling & dependency management", color: "text-blue-600" },
      { name: "Jenkins", icon: "SiJenkins", level: "Intermediate", usage: "CI/CD pipelines & build orchestration", color: "text-red-500" },
      { name: "Apache Airflow", icon: "SiApacheairflow", level: "Intermediate", usage: "DAG-based batch workflow orchestration", color: "text-red-400" }
    ]
  },
  {
    stage: "Observability & DevOps",
    emoji: "📊",
    description: "Data reliability & deployment",
    tools: [
      { name: "Git", icon: "SiGit", level: "Advanced", usage: "Version control & collaboration", color: "text-orange-600" },
      { name: "Docker", icon: "SiDocker", level: "Intermediate", usage: "Containerized environments", color: "text-blue-500" }
    ]
  }
];

// ============================================================================
// PIPELINE STAGES — (retained for backward compat, prefer SKILL_DOMAINS)
// ============================================================================

export interface PipelineTool {
  name: string;
  icon?: string;
  level: "Advanced" | "Intermediate" | string;
  usage: string;
  color: string;
}

export interface PipelineStage {
  stage: string;
  emoji: string;
  description: string;
  tools: PipelineTool[];
}

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    stage: "Data Sources",
    emoji: "🗄️",
    description: "Operational and analytical data systems",
    tools: [
      { name: "PostgreSQL", icon: "SiPostgresql", level: "Advanced", usage: "Relational modeling, OLTP systems", color: "text-blue-600" },
      { name: "AWS S3", icon: "SiAmazon", level: "Advanced", usage: "Object storage & data lake", color: "text-orange-400" },
      { name: "CSV/JSON", level: "Advanced", usage: "Flat file & semi-structured data ingestion", color: "text-gray-600" },
      { name: "MongoDB", icon: "SiMongodb", level: "Intermediate", usage: "Document-based storage", color: "text-green-500" },
    ],
  },
  {
    stage: "Data Ingestion",
    emoji: "📥",
    description: "Batch ingestion & data integration",
    tools: [
      { name: "Python", icon: "SiPython", level: "Advanced", usage: "ETL development, connectors", color: "text-yellow-400" },
      { name: "AWS S3", icon: "SiAmazon", level: "Advanced", usage: "Data lake storage & ingestion", color: "text-orange-400" },
      { name: "Informatica IICS", icon: "SiInformatica", level: "Intermediate", usage: "Enterprise data ingestion", color: "text-blue-600" },
      { name: "Snowpipe", level: "Intermediate", usage: "Snowflake data loading", color: "text-blue-300" },
    ],
  },
  {
    stage: "Processing & Transformation",
    emoji: "⚡",
    description: "Distributed data processing & modeling",
    tools: [
      { name: "Apache Spark", icon: "SiApachespark", level: "Advanced", usage: "Distributed batch processing", color: "text-orange-500" },
      { name: "SQL", level: "Advanced", usage: "Complex joins, CTEs, window functions", color: "text-blue-600" },
      { name: "AWS EMR (EC2/EKS)", icon: "SiAmazon", level: "Intermediate", usage: "Managed Spark clusters", color: "text-orange-400" },
      { name: "dbt", icon: "SiDbt", level: "Intermediate", usage: "SQL-based transformations & modeling", color: "text-orange-400" },
    ],
  },
  {
    stage: "Storage & Warehousing",
    emoji: "🏗️",
    description: "Scalable cloud data platforms",
    tools: [
      { name: "Snowflake", icon: "SiSnowflake", level: "Advanced", usage: "Cloud data warehouse & analytics", color: "text-blue-300" },
      { name: "Data Modeling", level: "Advanced", usage: "Star schema, fact/dimension design", color: "text-purple-500" },
      { name: "AWS S3", icon: "SiAmazon", level: "Intermediate", usage: "Data lake storage", color: "text-orange-400" },
    ],
  },
  {
    stage: "Orchestration",
    emoji: "🎼",
    description: "Workflow automation & reliability",
    tools: [
      { name: "Control-M", level: "Advanced", usage: "Enterprise job scheduling", color: "text-blue-600" },
      { name: "Apache Airflow", icon: "SiApacheairflow", level: "Intermediate", usage: "DAG-based orchestration", color: "text-red-400" },
      { name: "Jenkins", icon: "SiJenkins", level: "Intermediate", usage: "CI/CD pipelines", color: "text-red-500" },
    ],
  },
  {
    stage: "Observability & DevOps",
    emoji: "📊",
    description: "Data reliability & deployment",
    tools: [
      { name: "Git", icon: "SiGit", level: "Advanced", usage: "Version control & collaboration", color: "text-orange-600" },
      { name: "Docker", icon: "SiDocker", level: "Intermediate", usage: "Containerized environments", color: "text-blue-500" },
    ],
  },
];

import { Star, Database } from "lucide-react";

// ============================================================================
// LEVEL HELPERS
// ============================================================================

export function getLevelColor(level: string): string {
  switch (level) {
    case "Advanced":
      return "text-emerald-400 bg-emerald-400/10";
    case "Strong":
      return "text-blue-400 bg-blue-400/10";
    case "Working":
      return "text-yellow-400 bg-yellow-400/10";
    case "Intermediate":
      return "text-blue-400 bg-blue-400/10";
    default:
      return "text-gray-400 bg-gray-400/10";
  }
}

export function getLevelIcon(level: string): string {
  switch (level) {
    case "Advanced":
      return "★";
    case "Strong":
      return "★";
    case "Working":
      return "●";
    case "Intermediate":
      return "◆";
    default:
      return "";
  }
}

export function getLevelProgressWidth(level: string): string {
  switch (level) {
    case "Advanced":
    case "Strong":
      return "w-full";
    case "Working":
      return "w-1/2";
    case "Intermediate":
      return "w-3/4";
    default:
      return "w-1/4";
  }
}