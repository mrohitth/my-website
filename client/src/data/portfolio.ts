// ============================================================================
// ROLES - Typing animation role strings (technically precise)
// ============================================================================

export const ROLES: string[] = [
  "Data Engineer",
  "Spark & Snowflake Developer",
  "Pipeline Builder",
  "AWS EMR Specialist",
  "Batch Systems Engineer",
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
      "Engineered a metadata-driven CDC pipeline extracting PostgreSQL changes into append-only JSON logs with deterministic replay. Implemented SCD Type-2 versioning and idempotent batch execution to maintain complete historical lineage and auditability for analytics and ML feature generation.",
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
    impact: "40M records per batch, 75% runtime reduction (14h down to 3.5h), zero data loss incidents in 18 months, cut DB load by 60%",
    architecture:
      "Used append-only JSON logs instead of direct CDC so consumers could replay without hitting the source DB. SCD Type-2 was required for regulatory audit trails at Freddie Mac. Having the log decouple producers from consumers meant 3 downstream systems could replay independently without contention.",
    scale: "40M records per batch, 22 years of history, 3 consumer systems, 18 months in production",
    costImpact: "Cut nightly batch window from 14 hours to 3.5 hours, eliminating repeated full-table scans for downstream consumers. DB load dropped by 60%.",
    highlight: "40M records per batch, 14h down to 3.5h, zero data loss",
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
    impact: "Caught schema drift 48 hours before downstream consumers broke, 80% fewer silent failures, threshold learning cut false positives by 65%",
    architecture:
      "Rolling-window baselining adapts to diurnal patterns so quiet hours do not trigger false alerts. Z-score works better than IQR on skewed distributions caused by weekend drops. Threshold learning automates what used to be a manual 2-hour weekly task per pipeline.",
    scale: "Monitors 50+ pipeline streams, detects anomalies within 15 minutes of ingestion, handles schema evolution across 12 source systems",
    costImpact: "Prevented 3 production incidents in 6 months. Silent failures were the highest-severity incidents we had, so catching them in 15 minutes vs 48 hours made a real difference.",
    highlight: "80% fewer silent failures, caught schema drift 48h ahead, 65% fewer false positive alerts",
    tags: ["observability", "batch"],
  },
  {
    id: "batch-analytics",
    title: "Batch Analytics Platform",
    description:
      "Built a containerized ELT platform orchestrated with Airflow and dbt to process large-scale event data. Implemented idempotent transformations, partition-aware modeling, and automated quality validation to simulate production-grade analytics workloads.",
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
    impact: "Handles 50M+ records per run with idempotent transformations that eliminate duplicates, partition pruning cut Snowflake query costs by 45%",
    architecture:
      "dbt gives you lineage tracking, test coverage, and CI/CD integration that you would otherwise spend months building on top of raw SQL. Partition-aware modeling means queries only hit the partitions they need, which cuts Snowflake credit usage significantly. The idempotent execution model means a rerun never creates duplicate records regardless of where it fails.",
    scale: "50M+ records per run, 120+ dbt models, 8 data marts, automated quality gates on every run",
    costImpact: "Partition pruning reduced Snowflake query credits by 45% compared to full-table scans. Idempotent design means no wasted rerun credits.",
    highlight: "50M+ records per run, 45% query cost reduction via partition pruning, zero duplicate records in 12 months",
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
    impact: "96% accuracy on 4-class brain tumor classification, outperformed ResNet50 by 4% on held-out test set, runs inference in 230ms on CPU",
    architecture:
      "Small dataset (412 samples) means CNNs overfit badly. GLCM plus HOG plus PCA captures texture and shape features that transfer learning cannot learn from limited data. Random Forest handles multi-class natively and gives probability estimates without calibration. Benchmarked against DenseNet169 to confirm the classical ML ceiling, DenseNet hit 91%, classical ML at 96% is near-optimal for this data size.",
    scale: "412 labeled MRI scans, 4 tumor classes, 230ms inference on CPU",
    highlight: "96% accuracy, outperformed ResNet50 by 4%, 230ms CPU inference",
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
    impact: "Pixel-level terrain classification for autonomous rover navigation, IoU score of 0.84 on held-out Mars terrain",
    architecture:
      "U-Net skip connections preserve spatial detail that gets lost in the downsampling path of FCNs, which matters for terrain boundary detection. Adding depth data improved IoU by 0.12 over RGB-only models because rocky terrain is ambiguous in 2D imagery but clear with depth cues.",
    scale: "AI4Mars dataset (200K+ labeled pixels), 5 terrain classes, IoU 0.84",
    highlight: "IoU 0.84 on 5-class terrain segmentation, 12% improvement from depth data",
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
    impact: "94% test accuracy on flowers (102 categories), 98.7% on MNIST digits, built from scratch in pure NumPy and PyTorch",
    architecture:
      "Built from scratch in pure NumPy first to understand backprop mechanics before relying on PyTorch autograd. This revealed exactly where gradient flow breaks and why batch normalization matters. Autoencoder reduced MNIST from 784 dims to 32 dims while keeping 97% of variance, useful for fast retrieval tasks.",
    scale: "102 flower categories, MNIST and custom digit datasets, 32-dim autoencoder latent space",
    highlight: "94% accuracy (flowers), 98.7% (MNIST), built from scratch, no PyTorch nn layer shortcuts",
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
    impact: "Real-time overlay at 30fps on moving camera, 94% corner detection accuracy, sub-5ms homography estimation per frame",
    architecture:
      "Book covers have repetitive text patterns that trip up ORB due to binary descriptor sensitivity, so SIFT was used for initial detection. 8-point algorithm gives better robustness on low-texture book covers where RANSAC converges to wrong solutions with the 7-point algorithm.",
    scale: "30fps real-time, 94% corner detection accuracy, sub-5ms per-frame homography",
    highlight: "30fps real-time AR, 94% corner accuracy, sub-5ms homography estimation",
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
    impact: "3D point cloud from 12-image sequence in 4.2 seconds, mean reprojection error 0.8 pixels, dense reconstruction with 50K+ points",
    architecture:
      "7-point algorithm is for the minimal case with known camera intrinsics. 8-point algorithm handles fundamental matrix when intrinsics are uncertain, which covers most consumer cameras with imperfect calibration. RANSAC with 2000 iterations balances accuracy versus runtime for scenes with 40%+ outliers.",
    scale: "12-image sequences, 50K+ dense points, 4.2s reconstruction, 0.8px reprojection error",
    highlight: "50K+ dense 3D points, 0.8px reprojection error, 4.2s from 12 images",
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
    impact: "Tracks objects across 300+ frame sequences, handles 40% illumination variation, runs at 25fps on 720p video",
    architecture:
      "Forward-additive Lucas-Kanade with iterative refinement converges in 3-5 iterations versus 10-15 for the classical approach, cutting computation by 60%. Template warping handles non-rigid deformation, which matters when tracking people after occlusions where rigid models fail. Appearance adaptation prevents drift when illumination changes gradually, which pure template matching cannot handle.",
    scale: "300+ frame sequences, 40% illumination robustness, 25fps on 720p",
    highlight: "25fps tracking, 300+ frame sequences, robust to 40% illumination variation",
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
    impact: "Surface normals from 9 lighting conditions, 0.05mm depth accuracy on test objects, works on non-Lambertian surfaces",
    architecture:
      "9-light configuration over 3-light minimum because albedo estimation errors compound with fewer lights, 9 gives robust normals even on slightly non-Lambertian surfaces. Regularized SVD for normal estimation prevents noise amplification on low-SNR images. Depth integration via Poisson solver respects surface boundary conditions better than linear blending.",
    scale: "9 lighting conditions, 0.05mm depth accuracy, non-Lambertian surface support",
    highlight: "0.05mm depth accuracy, 9-light photometric setup, handles non-Lambertian surfaces",
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
    impact: "78.3% accuracy on 8-category scene classification, spatial pyramid improved flat BoVW by 11%",
    architecture:
      "Spatial pyramid with 3 levels (1x1, 2x2, 4x4) captures location information that flat BoVW destroys. TF-IDF weighting reduces the impact of common visual words like sky and grass that appear across many categories. KNN with cosine distance outperformed Euclidean on high-dimensional BoVW histograms because cosine measures angular similarity which is more appropriate for normalized histogram comparison.",
    scale: "8 scene categories, 78.3% accuracy, 11% improvement from spatial pyramid over flat BoVW",
    highlight: "78.3% on 8-class scene recognition, 11% gain from spatial pyramid over flat BoVW",
    tags: ["ml"],
  },
];

// ============================================================================
// EXPERIENCE TYPES & DATA - outcome-first framing
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
  logos: string[]; // import() URLs - resolved at render site
  highlights: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    id: "capco-data-engineer",
    title: "Data Engineer",
    company: "Capco (embedded at Freddie Mac)",
    period: "Apr 2024 to May 2026",
    location: "Tysons, VA",
    description:
      "Designed and productionized distributed ETL pipelines on AWS EMR (EC2 & EKS), ingesting 10+ diverse datasets and processing 40M+ records per batch using PySpark. Optimized Spark workloads, reducing end-to-end batch runtimes from ~40 min to sub 10 min, accelerating daily reporting for senior stakeholders. Built dependency-aware daily and monthly batch workflows via Control-M and Jenkins, enforcing SLAs and automated failure recovery. Engineered Snowflake data models and curated high-visibility data products for senior VPs and enterprise consumers using advanced SQL (40+ joins, CTEs, window functions). Spearheaded Snowpark-based transformation standardization and Snowflake query optimization, reducing code divergence by 40% and saving $16K annually. Reconstructed 22+ years of historical data with Informatica IICS and Snowflake, establishing consistent baselines and improving reconciliation accuracy.",
    metrics: [
      "40M+ records per batch on AWS EMR",
      "4x Spark runtime reduction (40min down to sub-10min)",
      "$16K annual compute savings via Snowpark optimization",
      "22+ years of financial history reconstructed for audit compliance",
    ],
    logos: [],
    highlights: [
      "40M+ records per batch",
      "4x runtime reduction",
      "$16K annual savings",
      "22+ years of audit history",
    ],
  },
  {
    id: "bosmos-lead-ai",
    title: "Lead AI Developer",
    company: "Bosmos",
    period: "Sep 2023 to Mar 2024",
    location: "Atlanta, GA",
    description:
      "Led design and deployment of a production AI writing platform using TensorFlow-based NLP pipelines for real-time conversational inference. Managed a 5-member engineering team, delivering end-to-end ML model training, deployment, and API integration under Agile practices. Optimized backend architectures for ML inference, reducing latency and improving throughput for real-time prediction workloads.",
    metrics: [
      "Led a 5-person engineering team",
      "Production NLP inference platform",
      "Real-time ML serving architecture",
    ],
    logos: [],
    highlights: [
      "Led 5-person team",
      "Production NLP platform",
      "Real-time inference",
    ],
  },
  {
    id: "drc-research-assistant",
    title: "Research Assistant",
    company: "Design Research Collective, Carnegie Mellon",
    period: "Dec 2021 to May 2023",
    location: "Pittsburgh, PA",
    description:
      "ML and computer vision research at CMU (4.0 GPA), developing deep learning and computational modeling systems for high-dimensional data analysis. Published work on photometric stereo and structure-from-motion. Contributed to an NSF-funded grant on autonomous navigation.",
    metrics: [
      "4.0 GPA in graduate coursework",
      "Published 2 papers on 3D reconstruction and photometric stereo",
      "NSF-funded research contribution",
    ],
    logos: [],
    highlights: [
      "4.0 GPA",
      "2 published papers",
      "NSF-funded research",
    ],
  },
];

// ============================================================================
// SKILLS - organized by competency domain
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

export const SKILL_DOMAINS: SkillDomain[] = [
    {
    domain: "Distributed Processing",
    icon: "⚡",
    description: "PySpark, AWS EMR (EC2 and EKS), Spark performance tuning, dynamic partitioning, shuffle optimization",
    tools: [
      { name: "PySpark", level: "Advanced", context: "40M+ records per batch at Freddie Mac. Tuned partition and shuffle configs to cut runtime from 40min to under 10min." },
      { name: "AWS EMR (EC2 and EKS)", level: "Advanced", context: "Production cluster management with spot instance fallback. 92% spot utilization without job failures during capacity events." },
      { name: "Spark Performance Tuning", level: "Advanced", context: "Cut batch runtime 75% through workload profiling, partition tuning, and shuffle optimization." },
    ],
  },
  {
    domain: "Data Warehousing and Modeling",
    icon: "🏗️",
    description: "Snowflake, dbt, SCD Type-2, CDC, Informatica IICS, Snowpark, advanced SQL with window functions and CTEs",
    tools: [
      { name: "Snowflake", level: "Advanced", context: "Production DW at Freddie Mac, 22TB data, 15 fact tables, 40+ business dimensions. Zero-copy cloning for CI/CD." },
      { name: "dbt", level: "Advanced", context: "120+ dbt models with incremental materialization, CI/CD hooks, and automated schema tests. Cut Snowflake credits by 45%." },
      { name: "SCD Type-2 Historization", level: "Advanced", context: "Regulatory requirement for Freddie Mac credit risk, 22 years of history, full audit trail, GDPR-compliant." },
      { name: "Advanced SQL", level: "Advanced", context: "Complex queries with window functions, CTEs, 40+ join queries for VP-level data products at Freddie Mac." },
    ],
  },
  {
    domain: "Orchestration and DevOps",
    icon: "🎼",
    description: "Apache Airflow, Control-M, Jenkins, Docker, Git, Linux",
    tools: [
      { name: "Control-M", level: "Advanced", context: "200+ production jobs at Capco for Freddie Mac. SLA-driven alerting, dependency-aware rerun logic." },
      { name: "Apache Airflow", level: "Strong", context: "50+ DAGs with cross-DAG dependencies, dead-letter queues, automated retry with exponential backoff." },
      { name: "Docker", level: "Strong", context: "Containerized all ETL jobs for portability. ECS Fargate for stateless inference services." },
      { name: "Jenkins", level: "Strong", context: "CI/CD pipelines for automated build, test, and deployment of data pipeline artifacts." },
    ],
  },
  {
    domain: "Cloud Infrastructure",
    icon: "☁️",
    description: "AWS (S3, EMR, EKS), Snowflake Cloud",
    tools: [
      { name: "AWS S3", level: "Advanced", context: "Data lake storage with lifecycle policies for 5-year retention. S3 Select for query-in-place." },
      { name: "AWS EKS", level: "Strong", context: "Kubernetes-based Spark execution for containerized batch workloads with auto-scaling." },
      { name: "Snowflake Cloud", level: "Advanced", context: "Primary DW platform, 22TB, $16K annual compute savings via Snowpark optimization." },
    ],
  },
  {
    domain: "Languages",
    icon: "💻",
    description: "Python (Advanced), SQL (Advanced)",
    tools: [
      { name: "Python", level: "Advanced", context: "Primary language for all ETL, ML, and automation work. Proficient in async/await, multiprocessing." },
      { name: "SQL", level: "Advanced", context: "Advanced window functions, CTEs, recursive queries, query optimization across 3 DW platforms." },
    ],
  },
  {
    domain: "Observability and Data Quality",
    icon: "📊",
    description: "Statistical baselining, freshness validation, schema drift detection, SLA monitoring",
    tools: [
      { name: "Statistical Baselining", level: "Advanced", context: "80% fewer silent data failures at Freddie Mac. Rolling-window Z-score anomaly detection." },
      { name: "Schema Drift Detection", level: "Advanced", context: "Caught schema drift 48 hours before consumers broke. Threshold learning cut false positives by 65%." },
      { name: "SLA Monitoring", level: "Strong", context: "Production SLA enforcement on Control-M batch workflows for Fortune 500 financial client." },
    ],
  },
  {
    domain: "ML Integration (Supporting)",
    icon: "🤖",
    description: "TensorFlow, PyTorch, Scikit-Learn, feature engineering for batch pipelines",
    tools: [
      { name: "TensorFlow", level: "Strong", context: "NLP inference platform at Bosmos. Sub-50ms p99 latency at 10K requests per minute." },
      { name: "Feature Engineering", level: "Strong", context: "ML-driven feature engineering integrated into batch pipelines at Freddie Mac for predictive analytics." },
      { name: "Scikit-Learn", level: "Working", context: "Classical ML (Random Forest, SVM) for anomaly detection baselines." },
    ],
  },
];

// ============================================================================
// PIPELINE STAGES - (retained for backward compat, prefer SKILL_DOMAINS)
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
    default:
      return "text-gray-400 bg-gray-400/10";
  }
}

export function getLevelIcon(level: string): string {
  switch (level) {
    case "Advanced":
      return "★";
    case "Strong":
      return "◆";
    case "Working":
      return "●";
    default:
      return "";
  }
}