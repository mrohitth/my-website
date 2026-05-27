// ============================================================================
// ROLES - Typing animation role strings (technically precise)
// ============================================================================

export const ROLES: string[] = [
  "Batch Pipeline Architect",
  "Idempotent Data Platform Engineer",
  "Lakehouse Architect",
  "Cloud Data Platform Lead",
  "ETL / ELT Pipeline Specialist",
  "Data Observability Engineer",
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
  // Technical spec block (featured cards only)
  specStyle?: string;   // e.g. "SCD Type-2 ELT"
  specVolume?: string;  // e.g. "10M+ records/day"
  specSla?: string;     // e.g. "0ms data-loss (WAL)"
  specAccent?: "cyan" | "amber" | "emerald";
}

export const PROJECTS: Project[] = [
  {
    id: "cdc-historical-warehouse",
    title: "CDC Historical Warehouse Platform",
    description:
      "Engineered a WAL-sourced change data capture pipeline feeding an SCD Type-2 historical warehouse with effective-from/effective-to epoch tracking on every mutated record. Implemented watermark-advancement logic for late-arriving events - records arriving outside the commit window are rehydrated into the correct historical version without full-table re-execution. Schema evolution handled via additive-only column propagation with backward-compatible JSON log versioning, ensuring zero-downtime consumer upgrades.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: [
      "Python",
      "PostgreSQL",
      "CDC",
      "SCD Type 2",
      "Docker",
      "JSON Logs",
    ],
    github: "https://github.com/mrohitth/cdc-historical-warehouse-platform",
    featured: true,
    category: "Data Engineering",
    impact: "WAL extraction · SCD Type-2 temporal versioning · 10M+ daily record mutations · 0ms data-loss SLA (idempotent replay)",
    architecture:
      "WAL-based extraction over trigger-based CDC: triggers fire per-row and create N synchronous write paths under peak load, saturating the source DB connection pool. WAL reads are asynchronous, decoupled from the write path, and replayable from any prior LSN offset. SCD Type-2 over Type-1: regulatory audit requirements mandate point-in-time reconstruction of any record's state at any historical timestamp - Type-1 destroys that lineage on every UPDATE. Late-arriving data via max-watermark advancement: instead of re-running upstream queries, the pipeline computes the logical commit boundary from the WAL offset and inserts the late record into the correct temporal slot using the effective-from epoch - O(1) per record vs O(n) full re-scan.",
    scale: "10M+ daily mutations · WAL-sourced event log · Deterministic replay to any prior epoch",
    highlight: "WAL extraction · SCD Type-2 epoch tracking · 0ms data-loss · Idempotent replay",
    tags: ["batch", "infrastructure", "observability"],
    specStyle: "SCD Type-2 ELT",
    specVolume: "10M+ records/day",
    specSla: "0ms loss (WAL replay)",
    specAccent: "cyan",
  },
  {
    id: "data-observability",
    title: "Data Observability Platform",
    description:
      "Built a configuration-driven statistical baselining engine that computes rolling Z-scores over a 7-day diurnal window to distinguish genuine anomalies from known quiet-hour drops. Validates SLA-bound freshness, null distribution shifts, and schema contract violations across distributed batch workloads. Anomaly fingerprinting (metric + value + threshold hash) collapses duplicate alert storms into single deduplicated events - preventing on-call fatigue from cascading failures.",
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
    impact: "Config-driven anomaly thresholds · Rolling Z-score baselining · Schema drift detection · Freshness SLA enforcement",
    architecture:
      "Rolling 7-day diurnal Z-score over point-in-time threshold checks: batch pipelines have predictable quiet hours (2-5am) where volume drops 80% - a static threshold fires false positives every night. The 7-day rolling window captures the diurnal pattern and sets the expected baseline per-hour slot automatically. Z-score over IQR: weekend data introduces bimodal distributions that IQR handles poorly without manual seasonal decomposition - Z-score on the 7-day window absorbs the weekend trough naturally. Fingerprinted alert deduplication: under a cascade failure, 12 downstream tables all breach freshness simultaneously. Without fingerprinting, 12 identical alerts fire; with hash-based deduplication, one root-cause alert fires and the rest are suppressed until the root cause resolves.",
    scale: "7-day rolling window baseline · Sub-minute anomaly detection · YAML-parameterized threshold registry",
    highlight: "Rolling Z-score baselining · Fingerprinted deduplication · YAML SLA contracts",
    tags: ["observability", "batch"],
    specStyle: "Config-Driven Monitoring",
    specVolume: "7-day diurnal baseline",
    specSla: "Sub-minute detection",
    specAccent: "amber",
  },
  {
    id: "batch-analytics",
    title: "Config-Driven Batch ELT Framework",
    description:
      "Architected a YAML-manifest ELT framework where DAG topology is generated at runtime from dataset configuration files - zero Python changes required to onboard a new schema. Validated PySpark partition optimization at 50M+ synthetic records: coalesce vs repartition boundary detection, AQE skew-join hints, and shuffle spill mitigation via broadcast threshold tuning. SCD Type-2 incremental upserts in dbt ensure downstream historical tables remain consistent across partial-batch retries.",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: [
      "Apache Airflow",
      "dbt",
      "PostgreSQL",
      "Python",
      "PySpark",
      "AWS EMR",
    ],
    github: "https://github.com/mrohitth/batch-analytics-platform",
    featured: true,
    category: "Data Engineering",
    impact: "Config-driven DAG generation · 50M+ record synthetic runs · Zero-code schema onboarding · Shuffle-optimized Spark execution",
    architecture:
      "YAML manifest-driven DAG generation over hard-coded Python DAG files: adding a new dataset requires only a config entry - no Python changes, no re-deploy of the Airflow scheduler. This decoupling means data producers can onboard independently of the DE team. PySpark partition tuning: at 50M rows, using coalesce() instead of repartition() after a shuffle causes output partition skew - repartition() forces a full shuffle to redistribute evenly. AQE broadcast threshold tuning prevents small dimension tables from triggering unnecessary sort-merge joins. SCD Type-2 in dbt incremental mode: on partial batch failure, the upsert replays idempotently - the effective-to date is only closed when the replacement row is fully committed, preventing open-ended historical gaps.",
    scale: "50M+ records/run · YAML manifest-driven topology · Dynamic partition boundary detection",
    highlight: "50M+ records/run · Config-driven DAG generation · AQE shuffle optimization",
    tags: ["batch", "infrastructure"],
    specStyle: "ELT / DAG Orchestration",
    specVolume: "50M+ records/run",
    specSla: "Idempotent partial retry",
    specAccent: "emerald",
  },
  {
    id: "brain-tumor-ml",
    title: "Brain Tumor Classification Using Machine Learning",
    description:
      "Constructed a memory-bounded vectorized feature extraction pipeline (GLCM texture matrices + HOG gradient histograms) processing 224x224 MRI batches with PCA whitening reducing the feature matrix from 2048 to 128 dimensions - required to prevent kernel trick computational blowup on the 412-sample training set. Classical ML achieved 96% accuracy outperforming ResNet50, empirically confirming that CNN transfer learning overfits at this data scale.",
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
    impact: "96% accuracy · 4-class MRI classification · Outperformed ResNet50 by 4pp · 230ms CPU inference",
    architecture:
      "GLCM+HOG+PCA over CNN transfer learning: at 412 training samples, ResNet50 final-layer fine-tuning overfits within 3 epochs - val loss diverges while train loss continues falling. GLCM texture matrices capture the co-occurrence statistics of pixel intensity pairs that characterize tumor tissue texture; HOG captures gradient orientation histograms that encode tumor boundary sharpness. PCA whitening to 128 dims from the raw 2048-dim feature vector is non-negotiable: SVM RBF kernel complexity scales as O(n*d^2) - at d=2048 it becomes computationally intractable on CPU. Dimensionality reduction to 128 preserves 94% of explained variance while bringing inference to 230ms. Random Forest over SVM for the final ensemble: RF handles 4-class natively via majority vote across trees, outputs calibrated probability estimates, and is robust to the remaining feature multicollinearity after PCA.",
    scale: "412 labeled MRI scans · 4 tumor classes · 2048→128 dim PCA · 230ms inference (CPU)",
    highlight: "96% accuracy · Outperformed ResNet50 by 4pp · 230ms CPU inference",
    tags: ["ml"],
  },
  {
    id: "mars-semantic-segmentation",
    title: "Mars Terrain Semantic Segmentation",
    description:
      "Pixel-level terrain classification pipeline ingesting AI4Mars depth+RGB tensor pairs through a U-Net encoder-decoder with skip connections. Depth channel fusion via early concatenation - not late fusion - ensures gradient flow from depth features reaches all decoder layers during backprop. Improved IoU by 0.12 on ambiguous rocky terrain classes where 2D texture alone is insufficient for boundary delineation.",
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
    impact: "IoU 0.84 on 5-class terrain · 12pp improvement via depth channel fusion · Pixel-level classification for autonomous navigation",
    architecture:
      "U-Net over FCN and DeepLabV3: skip connections between encoder and decoder preserve spatial resolution at every scale - FCN's bilinear upsampling from a single bottleneck loses fine boundary detail in the downsampling path, critical for rocky terrain edges. DeepLabV3's atrous convolution is optimized for semantic object segmentation at scale, not pixel-level edge delineation on small-scale textures. Depth channel fusion via early concatenation (4-channel RGBD input) rather than late fusion: late fusion adds a separate depth encoder and combines features at the bottleneck - this means depth gradients must propagate through the full decoder to influence early spatial features, which dilutes their signal in deep networks. Early concatenation ensures depth features are present in every encoder layer's activation map.",
    scale: "AI4Mars dataset (200K+ labeled pixels) · 5 terrain classes · IoU 0.84",
    highlight: "IoU 0.84 on 5-class terrain segmentation · 12pp improvement from depth fusion",
    tags: ["ml"],
  },
  {
    id: "neural-networks-visual-recognition",
    title: "Neural Networks for Visual Recognition",
    description:
      "Implemented feedforward networks, CNNs, and autoencoders from first principles - NumPy vectorized forward and backward passes before migrating to PyTorch autograd. Implementing raw backprop in NumPy exposed exactly where gradient flow breaks under deep architectures (vanishing gradients without batch normalization, exploding gradients without gradient clipping). Autoencoder compresses 784-dim MNIST pixel vectors into a 32-dim latent space via bottleneck encoding - useful as a deterministic feature extractor for downstream retrieval tasks.",
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
    impact: "94% test accuracy on flowers (102 categories) · 98.7% on MNIST digits · vectorized NumPy backprop from scratch",
    architecture:
      "NumPy implementation before PyTorch autograd: autograd abstracts away the chain rule - implementing it manually in NumPy forced explicit understanding of where gradients accumulate, where they vanish (sigmoid saturation at deep layers), and why batch normalization re-centers activations to keep gradients in a healthy range. Autoencoder bottleneck at 32 dims: the 784→256→128→32 encoder compresses while preserving 97% of reconstruction variance - the 32-dim latent space is compact enough for cosine similarity retrieval without requiring a full pixel comparison. This is not PCA; the encoder learns non-linear manifold structure that linear PCA cannot capture.",
    scale: "102 flower categories · MNIST + custom digit datasets · 784→32 dim autoencoder",
    highlight: "94% accuracy (flowers) · 98.7% (MNIST) · NumPy backprop from scratch",
    tags: ["ml"],
  },
  {
    id: "ar-planar-homographies",
    title: "Augmented Reality with Planar Homographies",
    description:
      "Real-time AR pipeline computing per-frame homography matrices via SIFT keypoint matching and RANSAC outlier rejection, warping video frames into the detected book cover plane at 30fps. Sub-5ms per-frame homography estimation achieved by limiting RANSAC to 500 iterations with an adaptive inlier threshold - sufficient for the planar assumption of a flat book cover without full epipolar geometry.",
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
    impact: "Real-time overlay at 30fps on moving camera · 94% corner detection accuracy · sub-5ms homography estimation",
    architecture:
      "SIFT over ORB: book covers contain repetitive text patterns with near-identical local gradients - ORB's binary descriptor (Hamming distance) is sensitive to rotation variance in repetitive patterns and produces ambiguous matches. SIFT's 128-dim floating-point descriptor captures gradient orientation histograms that disambiguate near-identical text glyphs. 8-point algorithm for homography over 7-point: the 7-point algorithm solves for the fundamental matrix with 3 possible solutions, requiring disambiguation - on low-texture book covers where RANSAC samples degenerate configurations, this disambiguation fails. The 8-point algorithm's linear system has a unique least-squares solution that RANSAC can evaluate deterministically.",
    scale: "30fps real-time · 94% corner detection accuracy · sub-5ms per-frame homography",
    highlight: "30fps real-time AR · 94% corner accuracy · sub-5ms homography estimation",
    tags: ["ml"],
  },
  {
    id: "3d-reconstruction",
    title: "3D Reconstruction from Images",
    description:
      "Structure-from-motion pipeline estimating camera pose and sparse 3D point cloud from a 12-image sequence. Essential matrix decomposed via SVD for rotation/translation extraction, followed by triangulation of matched keypoints into a dense 50K+ point cloud. Bundle adjustment minimizes reprojection error jointly over all camera poses and 3D point positions using Levenberg-Marquardt iterations.",
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
    impact: "50K+ dense 3D points · 0.8px mean reprojection error · 4.2s reconstruction from 12 images",
    architecture:
      "7-point algorithm for the essential matrix (known intrinsics): uses the minimum number of point correspondences, producing up to 3 solutions disambiguated by cheirality. Used when camera intrinsics are precisely calibrated. 8-point for fundamental matrix (unknown intrinsics): linear system via SVD with enforced rank-2 constraint on F - more robust when calibration is imperfect, which applies to consumer cameras with lens distortion. RANSAC at 2000 iterations: theoretical minimum iterations to find a clean inlier set at 40% outlier rate is 1168 (99% confidence, 8-point minimal case) - 2000 provides a safety margin without significant runtime cost at 4.2s total.",
    scale: "12-image sequences · 50K+ dense points · 4.2s reconstruction · 0.8px reprojection error",
    highlight: "50K+ dense 3D points · 0.8px reprojection error · 4.2s from 12 images",
    tags: ["ml"],
  },
  {
    id: "lucas-kanade-tracking",
    title: "Lucas-Kanade Object Tracking",
    description:
      "Optical flow tracker using forward-additive Lucas-Kanade with iterative Gauss-Newton refinement - converges in 3-5 iterations vs 10-15 for the classical formulation, reducing per-frame compute by 60%. Template warping handles non-rigid deformation via affine warp composition. Appearance model update (weighted moving average of template) prevents tracker drift under gradual illumination changes across 300+ frame sequences.",
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
    impact: "Tracks objects across 300+ frame sequences · robust to 40% illumination variation · 25fps on 720p",
    architecture:
      "Forward-additive LK over compositional (inverse) LK: forward-additive recomputes the Jacobian each iteration which adds cost but handles large non-rigid deformations better - the Hessian approximation remains valid further from the current warp estimate. Compositional LK precomputes the Hessian at the template, which breaks down for large deformations. Affine warp composition (6 DOF) over rigid translation-only (2 DOF): tracking non-rigid objects like pedestrians requires scale and rotation adaptation or the bounding box drifts after the first partial occlusion. Appearance model update via exponential moving average: pure static template matching fails after 50-100 frames under gradual illumination change - the EMA smoothly incorporates appearance changes without catastrophic template replacement that would lose discriminative features.",
    scale: "300+ frame sequences · 40% illumination robustness · 25fps on 720p",
    highlight: "25fps tracking · 60% fewer Gauss-Newton iterations · robust to 40% illumination variation",
    tags: ["ml"],
  },
  {
    id: "photometric-stereo",
    title: "Photometric Stereo for 3D Surface Reconstruction",
    description:
      "Reconstructed pixel-level surface normals and depth maps by solving the photometric stereo linear system across 9 calibrated lighting directions. Regularized SVD solves the per-pixel albedo and normal estimation problem robustly - the overdetermined 9x3 system provides least-squares noise resilience that the 3-light minimum case cannot. Depth integration via Poisson solver enforces surface integrability boundary conditions, producing smooth depth maps without the integration-path artifacts of simple line-scan accumulation.",
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
    impact: "Surface normals from 9 lighting conditions · 0.05mm depth accuracy · non-Lambertian surface support",
    architecture:
      "9-light configuration over the 3-light minimum: with 3 lights, one outlier (specular highlight or self-shadow) corrupts the entire normal estimate for that pixel - there are no redundant measurements to average out. At 9 lights, the SVD least-squares solution is robust to 2-3 outlier observations per pixel. Regularized SVD over direct matrix inversion: the per-pixel system is 9x3 (overdetermined) - direct inversion would require pseudoinverse which amplifies noise in low-SNR pixels near shadow boundaries. Regularized SVD truncates small singular values that correspond to noise amplification directions. Poisson integration over path integration: path integration accumulates gradient errors along the scan path - a noisy gradient early in the scan path propagates into all subsequent depth estimates. The Poisson solver minimizes the global L2 error of the depth gradient field simultaneously, which spreads errors uniformly rather than concentrating them along a scan path.",
    scale: "9 lighting conditions · 0.05mm depth accuracy · non-Lambertian surface support",
    highlight: "0.05mm depth accuracy · 9-light overdetermined system · Poisson depth integration",
    tags: ["ml"],
  },
  {
    id: "spatial-pyramid-scene",
    title: "Spatial Pyramid Matching for Scene Classification",
    description:
      "Classical scene recognition pipeline: SIFT keypoints vector-quantized into a 1000-word visual vocabulary via k-means, then encoded into 3-level spatial pyramid histograms (1x1, 2x2, 4x4) concatenated into a 21K-dim feature vector. TF-IDF weighting suppresses high-frequency visual words (sky, flat ground) that appear uniformly across categories and contribute no discriminative signal. KNN with cosine distance over Euclidean on L1-normalized histogram vectors.",
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
    impact: "78.3% accuracy on 8-category scene classification · 11pp improvement over flat BoVW",
    architecture:
      "Spatial pyramid over flat BoVW: flat BoVW destroys all spatial information - a beach scene and a mountain scene both have 'sky' visual words at the top and 'ground' visual words at the bottom, but flat BoVW treats them as the same bag regardless of position. The 3-level pyramid preserves quadrant-level location context: 1x1 (global), 2x2 (quadrant), 4x4 (local) encoded separately and concatenated. This hierarchy was first formalized by Lazebnik et al. (CVPR 2006). TF-IDF over raw frequency: visual words like 'clear sky gradient' appear in 7 of 8 categories - raw frequency counting inflates their histogram weight. IDF downweights them proportionally to log(N/df), leaving discriminative words (e.g., 'wave crest texture' for coast) with higher relative weight. Cosine over Euclidean KNN: L1-normalized histograms have fixed sum=1 - the relevant comparison is the angle between histogram vectors (what proportion of the image is each visual word category), not the absolute L2 distance.",
    scale: "8 scene categories · 21K-dim pyramid feature vector · 78.3% accuracy",
    highlight: "78.3% on 8-class scene recognition · 11pp gain from spatial pyramid over flat BoVW",
    tags: ["ml"],
  },
];

// ============================================================================
// SKILL DOMAINS - organized by pipeline stage (from feature branch)
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
  accentClass: string;
  tools: PipelineTool[];
}

export const SKILL_DOMAINS: PipelineStage[] = [
  {
    stage: "Data Sources",
    emoji: "🗄️",
    description: "Operational systems · WAL streams · columnar lake storage",
    accentClass: "border-l-4 border-l-orange-500/60",
    tools: [
      { name: "PostgreSQL", icon: "SiPostgresql", level: "Advanced", usage: "WAL-based CDC extraction, LSN tracking, OLTP source query optimization", color: "text-blue-400" },
      { name: "S3 / Parquet", icon: "SiAmazon", level: "Advanced", usage: "Partitioned data lake, columnar Parquet storage, lifecycle tiering", color: "text-orange-400" },
      { name: "Informatica", icon: "SiInformatica", level: "Intermediate", usage: "Enterprise cloud integration, hybrid-cloud ETL connector configuration", color: "text-blue-500" },
      { name: "MongoDB", icon: "SiMongodb", level: "Intermediate", usage: "Document store extraction, semi-structured source ingestion", color: "text-green-500" }
    ]
  },
  {
    stage: "Distributed Processing",
    emoji: "⚡",
    description: "PySpark AQE optimization · 40M+ records/day",
    accentClass: "border-l-4 border-l-yellow-400/60",
    tools: [
      { name: "PySpark", icon: "SiApachespark", level: "Advanced", usage: "AQE partition tuning, broadcast join thresholds, shuffle spill mitigation - 40M+ records/daily batch", color: "text-orange-500" },
      { name: "SQL", level: "Advanced", usage: "Window functions, CTEs, correlated subqueries, partition-aware query optimization", color: "text-sky-400" },
      { name: "EMR / EKS", icon: "SiAmazon", level: "Advanced", usage: "Managed Spark cluster provisioning on EC2 & EKS, cost-optimized instance fleet sizing", color: "text-orange-400" },
      { name: "dbt", icon: "SiDbt", level: "Intermediate", usage: "SQL-based incremental ELT, SCD Type-2 macros, freshness source tests", color: "text-orange-400" }
    ]
  },
  {
    stage: "Data Modeling & Warehousing",
    emoji: "🏗️",
    description: "SCD Type-2 temporal fidelity · sub-30s query on 3+ years of history",
    accentClass: "border-l-4 border-l-blue-400/60",
    tools: [
      { name: "Snowflake", icon: "SiSnowflake", level: "Advanced", usage: "Multi-cluster DWH, clustered tables, materialized views, result-set caching", color: "text-blue-300" },
      { name: "SCD Type-2", level: "Advanced", usage: "Effective-from/to epoch versioning, point-in-time reconstruction, idempotent incremental upserts", color: "text-purple-400" },
      { name: "CDC / WAL", level: "Advanced", usage: "WAL-sourced change capture, LSN offset replay, late-arriving event rehydration", color: "text-cyan-400" },
      { name: "Snowpipe", icon: "SiSnowflake", level: "Intermediate", usage: "Trigger-based continuous data loading into Snowflake stages", color: "text-blue-400" }
    ]
  },
  {
    stage: "Pipeline Orchestration",
    emoji: "🎼",
    description: "Enterprise batch scheduling · config-driven DAG generation · CI/CD",
    accentClass: "border-l-4 border-l-purple-400/60",
    tools: [
      { name: "Control-M", level: "Advanced", usage: "Enterprise batch scheduling, cross-job SLA dependency chains, automated failure recovery", color: "text-blue-500" },
      { name: "Airflow", icon: "SiApacheairflow", level: "Intermediate", usage: "YAML-manifest DAG generation, config-driven topology, sensor operator patterns", color: "text-red-400" },
      { name: "Jenkins", icon: "SiJenkins", level: "Intermediate", usage: "CI/CD pipeline automation, artifact promotion, deployment gating", color: "text-red-500" },
      { name: "Docker", icon: "SiDocker", level: "Intermediate", usage: "Containerized pipeline environments, reproducible Spark job builds", color: "text-blue-500" }
    ]
  },
  {
    stage: "Data Observability",
    emoji: "📊",
    description: "Z-score baselining · schema drift detection · fingerprinted deduplication",
    accentClass: "border-l-4 border-l-emerald-400/60",
    tools: [
      { name: "Anomaly Detection", level: "Advanced", usage: "7-day rolling Z-score baselining, diurnal window analysis, fingerprinted alert deduplication", color: "text-emerald-400" },
      { name: "Schema Drift", level: "Advanced", usage: "Additive-only column propagation, backward-compatible schema contract validation", color: "text-teal-400" },
      { name: "Freshness SLA", level: "Intermediate", usage: "Watermark-bound batch completion tracking, breach escalation pipelines", color: "text-yellow-400" },
      { name: "Pandas", icon: "SiPython", level: "Intermediate", usage: "Z-score computation engines, rolling aggregation, custom baselining frameworks", color: "text-yellow-400" }
    ]
  },
  {
    stage: "Cloud Infrastructure",
    emoji: "☁️",
    description: "AWS data platform · Kubernetes/EKS Spark · GitOps practices",
    accentClass: "border-l-4 border-l-sky-400/60",
    tools: [
      { name: "AWS Platform", icon: "SiAmazon", level: "Advanced", usage: "Data lake architecture, cluster IAM roles, cross-account access, EKS workload deployment", color: "text-orange-400" },
      { name: "Kubernetes", icon: "SiKubernetes", level: "Intermediate", usage: "Spark-on-EKS pod resource allocation, rolling deploy strategies for distributed batch", color: "text-blue-500" },
      { name: "Python", icon: "SiPython", level: "Advanced", usage: "Production ETL connectors, WAL extraction frameworks, CDC replay logic", color: "text-yellow-400" },
      { name: "Git", icon: "SiGit", level: "Advanced", usage: "GitFlow branching, versioned schema migration, PR-gate CI integration", color: "text-orange-600" }
    ]
  }
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