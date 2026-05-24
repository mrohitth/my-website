// ============================================================================
// ROLES — Typing animation role strings
// ============================================================================

export const ROLES: string[] = [
  "Data Engineer",
  "Python Ninja",
  "Cloud Explorer",
  "Data Pipeline Architect",
  "SQL Sorcerer",
  "Big Data Wrangler",
  "Data Whisperer for Machines",
  "Neural Data Forger",
  "Machine Intelligence Artisan",
];

// ============================================================================
// PROJECT TYPES & DATA
// ============================================================================

export type ProjectCategory =
  | "Machine Learning"
  | "Deep Learning"
  | "Computer Vision"
  | "Data Engineering";

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  liveUrl?: string;
  featured: boolean;
  category?: ProjectCategory;
  highlight?: string;
}

export const FEATURED_PROJECTS: Project[] = [
  {
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
  },
  {
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
  },
  {
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
  },
];

export const RESEARCH_PROJECTS: Project[] = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

// All projects combined (featured first)
export const PROJECTS: Project[] = [...FEATURED_PROJECTS, ...RESEARCH_PROJECTS];

// ============================================================================
// EXPERIENCE TYPES & DATA
// ============================================================================

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  logos: string[]; // import() URLs — resolved at render site
}

export const EXPERIENCES: Experience[] = [
  {
    title: "Data Engineer",
    company: "Capco (Client: Freddie Mac)",
    period: "Apr 2024 - Present",
    description:
      "Architecting distributed ETL pipelines on AWS EMR (EC2/EKS) and Snowflake processing 40M+ records per batch. Reduced Spark/SQL runtimes by 75% through partitioning and shuffle optimization. Engineered SCD Type-2 historical models spanning 22+ years to support analytics and ML-driven reporting workloads.",
    logos: [], // assigned at render site: [freddieMacLogo]
  },
  {
    title: "Lead AI Developer",
    company: "Bosmos",
    period: "Sep 2023 - Mar 2024",
    description:
      "Led a 5-engineer team to design and deploy a production-grade NLP platform using TensorFlow. Built scalable inference services and optimized model serving pipelines to achieve low-latency real-time prediction at scale.",
    logos: [], // assigned at render site: [bosmosLogo]
  },
  {
    title: "Research Assistant",
    company: "Design Research Collective",
    period: "Dec 2021 - May 2023",
    description:
      "Conducted ML/CV research at Carnegie Mellon (4.0 GPA), developing deep learning and computational modeling systems for high-dimensional data analysis and simulation.",
    logos: [], // assigned at render site: [drcLogo]
  },
];

// ============================================================================
// DATA ENGINEERING PIPELINE STAGES
// ============================================================================

export interface PipelineTool {
  name: string;
  icon?: string; // icon component name — resolved at render site via Si* imports
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
      {
        name: "PostgreSQL",
        icon: "SiPostgresql",
        level: "Advanced",
        usage: "Relational modeling, OLTP systems",
        color: "text-blue-600",
      },
      {
        name: "AWS S3",
        icon: "SiAmazon",
        level: "Advanced",
        usage: "Object storage & data lake",
        color: "text-orange-400",
      },
      {
        name: "CSV/JSON",
        level: "Advanced",
        usage: "Flat file & semi-structured data ingestion",
        color: "text-gray-600",
      },
      {
        name: "MongoDB",
        icon: "SiMongodb",
        level: "Intermediate",
        usage: "Document-based storage",
        color: "text-green-500",
      },
    ],
  },
  {
    stage: "Data Ingestion",
    emoji: "📥",
    description: "Batch ingestion & data integration",
    tools: [
      {
        name: "Python",
        icon: "SiPython",
        level: "Advanced",
        usage: "ETL development, connectors",
        color: "text-yellow-400",
      },
      {
        name: "AWS S3",
        icon: "SiAmazon",
        level: "Advanced",
        usage: "Data lake storage & ingestion",
        color: "text-orange-400",
      },
      {
        name: "Informatica IICS",
        icon: "SiInformatica",
        level: "Intermediate",
        usage: "Enterprise data ingestion",
        color: "text-blue-600",
      },
      {
        name: "Snowpipe",
        level: "Intermediate",
        usage: "Snowflake data loading",
        color: "text-blue-300",
      },
    ],
  },
  {
    stage: "Processing & Transformation",
    emoji: "⚡",
    description: "Distributed data processing & modeling",
    tools: [
      {
        name: "Apache Spark",
        icon: "SiApachespark",
        level: "Advanced",
        usage: "Distributed batch processing",
        color: "text-orange-500",
      },
      {
        name: "SQL",
        level: "Advanced",
        usage: "Complex joins, CTEs, window functions",
        color: "text-blue-600",
      },
      {
        name: "AWS EMR (EC2/EKS)",
        icon: "SiAmazon",
        level: "Intermediate",
        usage: "Managed Spark clusters",
        color: "text-orange-400",
      },
      {
        name: "dbt",
        icon: "SiDbt",
        level: "Intermediate",
        usage: "SQL-based transformations & modeling",
        color: "text-orange-400",
      },
    ],
  },
  {
    stage: "Storage & Warehousing",
    emoji: "🏗️",
    description: "Scalable cloud data platforms",
    tools: [
      {
        name: "Snowflake",
        icon: "SiSnowflake",
        level: "Advanced",
        usage: "Cloud data warehouse & analytics",
        color: "text-blue-300",
      },
      {
        name: "Data Modeling",
        level: "Advanced",
        usage: "Star schema, fact/dimension design",
        color: "text-purple-500",
      },
      {
        name: "AWS S3",
        icon: "SiAmazon",
        level: "Intermediate",
        usage: "Data lake storage",
        color: "text-orange-400",
      },
    ],
  },
  {
    stage: "Orchestration",
    emoji: "🎼",
    description: "Workflow automation & reliability",
    tools: [
      {
        name: "Control-M",
        level: "Advanced",
        usage: "Enterprise job scheduling",
        color: "text-blue-600",
      },
      {
        name: "Apache Airflow",
        icon: "SiApacheairflow",
        level: "Intermediate",
        usage: "DAG-based orchestration",
        color: "text-red-400",
      },
      {
        name: "Jenkins",
        icon: "SiJenkins",
        level: "Intermediate",
        usage: "CI/CD pipelines",
        color: "text-red-500",
      },
    ],
  },
  {
    stage: "Observability & DevOps",
    emoji: "📊",
    description: "Data reliability & deployment",
    tools: [
      {
        name: "Git",
        icon: "SiGit",
        level: "Advanced",
        usage: "Version control & collaboration",
        color: "text-orange-600",
      },
      {
        name: "Docker",
        icon: "SiDocker",
        level: "Intermediate",
        usage: "Containerized environments",
        color: "text-blue-500",
      },
    ],
  },
];

export function getLevelColor(level: string): string {
  switch (level) {
    case "Advanced":
      return "text-emerald-400 bg-emerald-400/10";
    case "Intermediate":
      return "text-blue-400 bg-blue-400/10";
    default:
      return "text-gray-400 bg-gray-400/10";
  }
}

export function getLevelIcon(
  level: string
): React.ReactNode /* LucideIcon-like */ {
  switch (level) {
    case "Advanced":
      return "★";
    case "Intermediate":
      return "◆";
    default:
      return null;
  }
}