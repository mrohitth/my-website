import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import profilePic from '@/assets/profile4.jpg';
import heroProfilePic from '@/assets/profile3.jpg';
import cat from '@/assets/cat_up.gif';
import { Github, ExternalLink, Mail, Phone, MapPin, Menu, X, Database, BarChart3, TrendingUp, Code, Zap, Star } from 'lucide-react';
// Import company logos
import bosmosLogo from '@/assets/logos/bosmos-logo.png';
import capcoLogo from '@/assets/logos/capco_logo.png';
import freddieMacLogo from '@/assets/logos/fm.png';
import cmuLogo from '@/assets/logos/cmu_logo.png';
import drcLogo from '@/assets/logos/drc.png';
import { 
  SiPython, 
  SiApachespark, 
  SiApacheairflow, 
  SiAmazon, 
  SiKubernetes, 
  SiMongodb, 
  SiSnowflake, 
  SiJenkins, 
  SiGit,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiTerraform,
  SiGrafana,
  SiDbt,
  SiElasticsearch,
  SiInformatica
} from 'react-icons/si';
import SubtleNetworkCursor from "@/components/subtlenetworkcursor";
import MLNetworkBackground from "@/components/mlnetworkbackground";

export default function Portfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [activeTab, setActiveTab] = useState('ml');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");

  
  // Typing animation for roles
  const roles = [
  "Data Engineer",
  "Python Ninja",
  "Cloud Explorer",
  "Data Pipeline Architect",
  "SQL Sorcerer",
  "Big Data Wrangler",
  "Data Whisperer for Machines",
  "Neural Data Forger",
  "Machine Intelligence Artisan"
];

  // Typing animation for roles
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];

    let typingSpeed = isDeleting ? 50 : 100; // faster delete
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < currentRole.length) {
      // typing forward
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (isDeleting && displayedText.length > 0) {
      // deleting backwards
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length - 1));
      }, typingSpeed);
    } else if (!isDeleting && displayedText.length === currentRole.length) {
      // pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayedText.length === 0) {
      // move to next word
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex]);

  // Generate stable flowing elements with CSS animations (memoized to prevent re-renders)
  const subtleFlowElements = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      top: Math.random() * 80 + 10, // Random vertical position
      width: Math.random() * 12 + 8, // Small width variation
      duration: Math.random() * 8 + 12, // 12-20 second duration (faster than before)
      delay: Math.random() * -15 // Start at different points in animation
    })), []
  );

  // Intro animation state
  const [showIntro, setShowIntro] = useState(true);

  // Hide intro after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 600);
    return () => clearTimeout(timer);
  }, []);

 // to check for down arrow
 useEffect(() => {
  const handleArrow = () => {
    const heroSection = document.getElementById("hero");
    if (!heroSection) return;

    const rect = heroSection.getBoundingClientRect();
    const threshold = window.innerHeight * 0.15;

    // tolerance so tiny scrolls don’t instantly hide it
    const inRange = rect.top >= -150 && rect.top <= threshold;
    setCurrentSection(inRange ? "hero-top" : "other");
  };

  window.addEventListener("scroll", handleArrow);
  handleArrow();
  return () => window.removeEventListener("scroll", handleArrow);
}, []);




  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scrolling for navigation
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

    // Scroll to top function
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // State for navbar visibility
    const [navbarHidden, setNavbarHidden] = useState(true);

    // Scroll-based show/hide effect
    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const threshold = window.innerHeight * 0.05; // 5% of viewport

        if (scrollTop > threshold) {
          setNavbarHidden(false); // show navbar after scrolling past threshold
        } else {
          setNavbarHidden(true); // hide navbar when near top
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  // 3D tilt effect handlers
  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -20;
      const rotateY = ((x - centerX) / centerX) * 20;

      button.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.15)`;
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  }


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Failed to send message. Please try again.');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred. Please try again.');
  }

  setIsSubmitting(false);
};


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const projects = [
    // Featured Data Engineering Projects
    {
      title: "CDC & Historical Warehouse Platform",
      description: "Engineered a metadata-driven CDC pipeline extracting PostgreSQL changes into append-only JSON logs with deterministic replay. Implemented SCD Type-2 versioning and idempotent batch execution to maintain complete historical lineage and auditability for analytics and ML feature generation.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["Python", "PostgreSQL", "Docker", "SCD Type 2", "Bash Scripting", "JSON Logs"],
      github: "https://github.com/mrohitth/cdc-historical-warehouse-platform",
      featured: true
    },
    {
      title: "Data Observability Platform",
      description: "Designed a statistical data observability framework using rolling-window baselining and Z-score anomaly detection to identify freshness gaps, schema drift, and volume anomalies. Automated threshold learning to prevent silent data failures in distributed batch pipelines.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["Python", "PostgreSQL", "Pandas", "Statistical Analysis", "YAML Config", "Docker"],
      github: "https://github.com/mrohitth/data-observability-platform",
      featured: true
    },
    {
      title: "Batch Analytics Platform",
      description: "Built a containerized ELT platform orchestrated with Airflow and dbt to process large-scale event data. Implemented idempotent transformations, partition-aware modeling, and automated quality validation to simulate production-grade analytics workloads.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["Apache Airflow", "dbt", "PostgreSQL", "MinIO", "Docker", "Python"],
      github: "https://github.com/mrohitth/batch-analytics-platform",
      featured: true
    },
    // Academic Research & ML Projects
    {
      title: "Brain Tumor Classification Using Machine Learning",
      description: "Classified brain MRI scans into 4 tumor types using hand-engineered features (GLCM, HOG, PCA) with 96% accuracy. Benchmarked against deep learning models (ResNet50, DenseNet169), outperforming ResNet50 with classical ML approaches.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["Python", "scikit-learn", "OpenCV", "SVM", "Random Forest", "Feature Engineering", "Medical Imaging"],
      github: "https://github.com/mrohitth/Brain-Tumor-Classification-Using-Machine-Learning",
      featured: false,
      category: "Machine Learning"
    },
    {
      title: "Mars Terrain Semantic Segmentation",
      description: "Developed U-Net architecture for pixel-level classification of Mars rover imagery from AI4Mars dataset. Integrated depth data from planetary data systems to improve terrain segmentation accuracy for autonomous navigation.",
      image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["Python", "PyTorch", "U-Net", "Jupyter Notebook", "Semantic Segmentation", "CNNs", "Deep Learning"],
      github: "https://github.com/mrohitth/Semantic-Segmentation-using-U-Net",
      featured: false,
      category: "Deep Learning"
    },
    {
      title: "Neural Networks for Visual Recognition",
      description: "Built classification models from scratch using pure Python and PyTorch for flowers, digits, and alphabets. Implemented feedforward networks, CNNs, and autoencoders with backpropagation for dimensionality reduction and feature learning.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["Python", "PyTorch", "NumPy", "Neural Networks", "CNNs", "Autoencoders", "Backpropagation"],
      github: "https://github.com/mrohitth/Neural-Networks-for-Recognition",
      featured: false,
      category: "Deep Learning"
    },
    {
      title: "Augmented Reality with Planar Homographies",
      description: "Implemented real-time video overlay on book covers using homography estimation and feature detection. Built AR pipeline with automatic corner detection, perspective transformation, and seamless video blending for moving camera scenarios.",
      image: "https://images.unsplash.com/photo-1617802690658-1173a812650d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["Python", "OpenCV", "NumPy", "Homography Estimation", "Feature Matching", "Image Warping"],
      github: "https://github.com/mrohitth/Augmented-Reality-with-Planar-Homographies",
      featured: false,
      category: "Computer Vision"
    },
    {
      title: "3D Reconstruction from Images",
      description: "Developed structure-from-motion pipeline using 7-point and 8-point algorithms for epipolar geometry. Implemented RANSAC for outlier rejection and bundle adjustment for multi-view 3D point cloud optimization.",
      image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["Python", "OpenCV", "NumPy", "RANSAC", "Bundle Adjustment", "Epipolar Geometry"],
      github: "https://github.com/mrohitth/3D-Reconstruction",
      featured: false,
      category: "Computer Vision"
    },
    {
      title: "Lucas-Kanade Object Tracking",
      description: "Built optical flow-based tracking system using Lucas-Kanade algorithm with iterative refinement. Implemented template warping and appearance adaptation to handle illumination changes and object deformation across video frames.",
      image: "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["Python", "OpenCV", "Optical Flow", "Template Matching", "Image Gradients", "NumPy"],
      github: "https://github.com/mrohitth/Lucas-Kanade-Tracking",
      featured: false,
      category: "Computer Vision"
    },
    {
      title: "Photometric Stereo for 3D Surface Reconstruction",
      description: "Reconstructed 3D surface topography from multiple images captured under varying lighting conditions. Used photometric stereo to estimate surface normals and recover depth maps from intensity gradients.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["Python", "NumPy", "Computer Vision", "Linear Algebra", "Surface Normals", "Depth Estimation"],
      github: "https://github.com/mrohitth/Photometric-Stereo",
      featured: false,
      category: "Computer Vision"
    },
    {
      title: "Spatial Pyramid Matching for Scene Classification",
      description: "Implemented classical scene recognition using Bag-of-Visual-Words with spatial pyramid pooling. Applied TF-IDF weighting and KNN classification to achieve hierarchical image representation for 8-category scene classification.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["Python", "Jupyter Notebook", "SIFT Features", "Bag-of-Words", "TF-IDF", "KNN", "scikit-learn"],
      github: "https://github.com/mrohitth/Spatial-Pyramid-Matching-for-Scene-Classification",
      featured: false,
      category: "Computer Vision"
    }
  ];

  // Debug logs for tab switching
  // console.log("Active Tab:", activeTab);
  // console.log("CV Projects Found:", projects.filter(p => 
  //   !p.featured && p.category === "Computer Vision"
  // ).length);
  // console.log("ML Projects Found:", projects.filter(p => 
  //   !p.featured && (p.category === "Machine Learning" || p.category === "Deep Learning")
  // ).length);
  // console.log("All Projects Categories:", projects.map(p => ({title: p.title, category: p.category})));

  // Data Engineering Pipeline organized by stages
  const dataEngineeringPipeline = [
    {
      stage: "Data Sources",
      emoji: "🗄️",
      description: "Operational and analytical data systems",
      tools: [
        { name: "PostgreSQL", icon: SiPostgresql, level: "Advanced", usage: "Relational modeling, OLTP systems", color: "text-blue-600" },
        { name: "AWS S3", icon: SiAmazon, level: "Advanced", usage: "Object storage & data lake", color: "text-orange-400" },
        { name: "CSV/JSON", level: "Advanced", usage: "Flat file & semi-structured data ingestion", color: "text-gray-600" },
        { name: "MongoDB", icon: SiMongodb, level: "Intermediate", usage: "Document-based storage", color: "text-green-500" }
      ]
    },
    {
      stage: "Data Ingestion",
      emoji: "📥",
      description: "Batch ingestion & data integration",
      tools: [
        { name: "Python", icon: SiPython, level: "Advanced", usage: "ETL development, connectors", color: "text-yellow-400" },
        { name: "AWS S3", icon: SiAmazon, level: "Advanced", usage: "Data lake storage & ingestion", color: "text-orange-400" },
        { name: "Informatica IICS", icon: SiInformatica, level: "Intermediate", usage: "Enterprise data ingestion", color: "text-blue-600" },
        { name: "Snowpipe", level: "Intermediate", usage: "Snowflake data loading", color: "text-blue-300" }
      ]
    },
    {
      stage: "Processing & Transformation",
      emoji: "⚡",
      description: "Distributed data processing & modeling",
      tools: [
        { name: "Apache Spark", icon: SiApachespark, level: "Advanced", usage: "Distributed batch processing", color: "text-orange-500" },
        { name: "SQL", level: "Advanced", usage: "Complex joins, CTEs, window functions", color: "text-blue-600" },
        { name: "AWS EMR (EC2/EKS)", icon: SiAmazon, level: "Intermediate", usage: "Managed Spark clusters", color: "text-orange-400" },
        { name: "dbt", icon: SiDbt, level: "Intermediate", usage: "SQL-based transformations & modeling", color: "text-orange-400" }
      ]
    },
    {
      stage: "Storage & Warehousing",
      emoji: "🏗️",
      description: "Scalable cloud data platforms",
      tools: [
        { name: "Snowflake", icon: SiSnowflake, level: "Advanced", usage: "Cloud data warehouse & analytics", color: "text-blue-300" },
        { name: "Data Modeling", level: "Advanced", usage: "Star schema, fact/dimension design", color: "text-purple-500" },
        { name: "AWS S3", icon: SiAmazon, level: "Intermediate", usage: "Data lake storage", color: "text-orange-400" }
      ]
    },
    {
      stage: "Orchestration",
      emoji: "🎼",
      description: "Workflow automation & reliability",
      tools: [
        { name: "Control-M", level: "Advanced", usage: "Enterprise job scheduling", color: "text-blue-600" },
        { name: "Apache Airflow", icon: SiApacheairflow, level: "Intermediate", usage: "DAG-based orchestration", color: "text-red-400" },
        { name: "Jenkins", icon: SiJenkins, level: "Intermediate", usage: "CI/CD pipelines", color: "text-red-500" }
      ]
    },
    {
      stage: "Observability & DevOps",
      emoji: "📊",
      description: "Data reliability & deployment",
      tools: [
        { name: "Git", icon: SiGit, level: "Advanced", usage: "Version control & collaboration", color: "text-orange-600" },
        { name: "Docker", icon: SiDocker, level: "Intermediate", usage: "Containerized environments", color: "text-blue-500" }
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Advanced": return "text-emerald-400 bg-emerald-400/10";
      case "Intermediate": return "text-blue-400 bg-blue-400/10";
      default: return "text-gray-400 bg-gray-400/10";
    }
  };

  // Get animated icon for each skill level
  const getLevelIcon = (level: string) => {
    switch (level) {
      case "Advanced": return <Star className="w-3 h-3 mr-1 group-hover:animate-spin" />;
      case "Intermediate": return <Database className="w-3 h-3 mr-1 group-hover:animate-pulse" />;
      default: return null;
    }
  };

const experiences = [
    {
      title: "Data Engineer",
      company: "Capco (Client: Freddie Mac)",
      period: "Apr 2024 - Present",
      description: "Architecting distributed ETL pipelines on AWS EMR (EC2/EKS) and Snowflake processing 40M+ records per batch. Reduced Spark/SQL runtimes by 75% through partitioning and shuffle optimization. Engineered SCD Type-2 historical models spanning 22+ years to support analytics and ML-driven reporting workloads.",
      logos: [freddieMacLogo]
    },
    {
      title: "Lead AI Developer",
      company: "Bosmos",
      period: "Sep 2023 - Mar 2024",
      description: "Led a 5-engineer team to design and deploy a production-grade NLP platform using TensorFlow. Built scalable inference services and optimized model serving pipelines to achieve low-latency real-time prediction at scale.",
      logos: [bosmosLogo]
    },
    {
      title: "Research Assistant",
      company: "Design Research Collective",
      period: "Dec 2021 - May 2023",
      description: "Conducted ML/CV research at Carnegie Mellon (4.0 GPA), developing deep learning and computational modeling systems for high-dimensional data analysis and simulation.",
      logos: [drcLogo]
    }
  ];

  return (
    <div className="relative min-h-screen bg-portfolio-background text-portfolio-foreground subtle-dots">
      {/* Intro overlay */}
      {showIntro && (
        <div
          className="absolute inset-0 bg-portfolio-background z-50 flex items-center justify-center transition-opacity duration-1000"
        >
          <div className="pipeline-intro" />
        </div>
      )}

      {/* Main Content */}
      <div
        className={`transition-opacity duration-1000 ${
          showIntro ? "opacity-0" : "opacity-100"
        }`}
      >

      {/* Render your custom cursor here */}
      <SubtleNetworkCursor />


      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 bg-portfolio-background/80 backdrop-blur-sm border-b border-portfolio-border transition-transform duration-1000 ${
            navbarHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 px-3 sm:px-6 md:px-10 lg:px-15">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onMouseMove={(e) => {
                const button = e.currentTarget;
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -15;
                const rotateY = ((x - centerX) / centerX) * 15;

                button.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.15)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
                }}
                onClick={() => scrollToSection('hero')}
                className="tilt-button font-bold text-portfolio-primary px-5 py-2.5 text-portfolio-foreground rounded-md hover:text-portfolio-primary hover:bg-portfolio-primary/10 transition-colors"
                style={{ wordSpacing: '0.25rem' }}
                data-testid="logo-button"
              >
                Mathew Thomson
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-8" style={{ perspective: '500px' }}>
                <button
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => scrollToSection('hero')}
                  className="tilt-button inline-flex items-center justify-center px-5 py-2.5 text-portfolio-foreground rounded-md hover:text-portfolio-primary hover:bg-portfolio-primary/10"
                  style={{ wordSpacing: '0.5rem' }}
                  data-testid="nav-home"
                >
                  Home
                </button>
                <button
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => scrollToSection('about')}
                  className="tilt-button inline-flex items-center justify-center px-5 py-2.5 text-portfolio-foreground rounded-md hover:text-portfolio-primary hover:bg-portfolio-primary/10"
                  style={{ wordSpacing: '0.5rem' }}
                  data-testid="nav-about"
                >
                  About
                </button>
                <button
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => scrollToSection('projects')}
                  className="tilt-button inline-flex items-center justify-center px-5 py-2.5 text-portfolio-foreground rounded-md hover:text-portfolio-primary hover:bg-portfolio-primary/10"
                  style={{ wordSpacing: '0.5rem' }}
                  data-testid="nav-projects"
                >
                  Projects
                </button>
                <button
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => scrollToSection('contact')}
                  className="tilt-button inline-flex items-center justify-center px-5 py-2.5 text-portfolio-foreground rounded-md hover:text-portfolio-primary hover:bg-portfolio-primary/10"
                  style={{ wordSpacing: '0.5rem' }}
                  data-testid="nav-contact"
                >
                  Contact
                </button>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-portfolio-foreground hover:text-portfolio-primary hover:bg-portfolio-primary/10 rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-200"
                data-testid="mobile-menu-button"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-16 right-0 h-screen w-64 bg-portfolio-background border-l border-portfolio-border" data-testid="mobile-menu">
            <div className="flex flex-col space-y-5 p-8">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-portfolio-foreground hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 hover:text-transparent bg-clip-text transition-colors duration-200 text-lg text-left"
                data-testid="mobile-nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-portfolio-foreground hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 hover:text-transparent bg-clip-text transition-colors duration-200 text-lg text-left"
                data-testid="mobile-nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-portfolio-foreground hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 hover:text-transparent bg-clip-text transition-colors duration-200 text-lg text-left"
                data-testid="mobile-nav-projects"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-portfolio-foreground hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 hover:text-transparent bg-clip-text transition-colors duration-200 text-lg text-left"
                data-testid="mobile-nav-contact"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
        <section id="hero" className="hero-gradient min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
          {/* ML Network Animated Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <MLNetworkBackground />
          </div>

          {/* Subtle Flow Animation Background */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {subtleFlowElements.map((element) => (
              <div
                key={element.id}
                className="absolute rounded-full bg-cyan-400/75 subtle-flow"
                style={{
                  top: `${element.top}%`,
                  left: '-8px',
                  width: `${element.width * 1.25}px`,
                  height: '3px',
                  animationDuration: `${element.duration}s`,
                  animationDelay: `${element.delay}s`,
                  filter: 'blur(1.5px)',
                }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-portfolio-background/20 to-portfolio-background/40" />
          </div>

          {/* Hero Content */}
          <div className="relative z-20 max-w-4xl mx-auto text-center">
            <div className="fade-in mb-6 md:mb-12 flex justify-center relative">
              {/* Profile image */}
              <div className="relative w-32 h-32 sm:w-48 md:w-64 sm:h-48 md:h-64 rounded-full overflow-hidden border-portfolio-primary/30 shadow-lg">
                <img src={heroProfilePic} alt="Mathew Thomson" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="fade-in">
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6">
                Hey, I'm <span className="gradient-text">Mathew</span>
              </h1>
              <div className="text-xl md:text-2xl text-portfolio-muted-foreground mb-6 max-w-2xl mx-auto h-16 flex items-center justify-center">
                <span className="typing-animation">{displayedText}</span>
              </div>
              <p className="text-lg text-portfolio-muted-foreground/80 mb-12 max-w-xl mx-auto">
                Architecting resilient, cost-optimized data platforms for large-scale financial and ML workloads.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  onClick={() => scrollToSection('projects')}
                  className="bg-portfolio-primary hover:bg-portfolio-primary/90 text-portfolio-primary-foreground px-8 py-3 font-medium w-40 flex items-center justify-center btn-jump"
                >
                  View My Work
                </Button>
                <Button
                  onClick={() => scrollToSection('contact')}
                  className="bg-portfolio-primary hover:bg-portfolio-primary/90 text-portfolio-primary-foreground px-8 py-3 font-medium w-40 flex items-center justify-center btn-jump"
                >
                  Get In Touch
                </Button>
              </div>
            </div>
            {currentSection === "hero-top" && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2">

              <button
                onClick={() => scrollToSection('about')}
                className="bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-600 transition-all animate-bounce [animation-duration:1.5s]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                  <path fillRule="evenodd" d="M8 2a.75.75 0 0 1 .75.75v8.69l1.22-1.22a.75.75 0 1 1 1.06 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 1 1 1.06-1.06l1.22 1.22V2.75A.75.75 0 0 1 8 2Z" clipRule="evenodd" />
                </svg>
              </button>

            </div>
            )}
          </div>
        </section>


      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-portfolio-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
            {/* Profile Picture */}
            <div className="fade-in md:col-span-1">
              <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto rounded-2xl bg-portfolio-muted flex items-center justify-center" data-testid="profile-picture">
                <img src={profilePic} alt="Mathew Thomson" className="w-full h-full object-cover rounded-2xl"/>
              </div>
            </div>
            
            {/* About Content & Experience */}
            <div className="fade-in md:col-span-1 lg:col-span-2 space-y-6 md:space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-6" data-testid="about-title">About Me</h2>
                <div className="space-y-4 text-base md:text-lg text-portfolio-muted-foreground max-w-prose text-left">
                  <p data-testid="about-paragraph-1">
                    I design and optimize distributed data pipelines on AWS EMR and Snowflake, focusing on performance tuning, cost efficiency, and production reliability. Specializing in cloud-native processing on AWS EMR (EC2/EKS) and Snowflake, I focus on building resilient, metadata-driven pipelines that handle tens of millions of records while optimizing for both compute performance and enterprise-level cost-efficiency.
                  </p>
                </div>
              </div>
              
              
              {/* Interactive Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-portfolio-border/30">
                <div className="text-center group cursor-pointer">
                  <div className="text-2xl font-bold text-portfolio-primary group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300">
                    3+
                  </div>
                  <div className="text-sm text-portfolio-muted-foreground group-hover:text-blue-400 transition-colors">
                    Years Experience
                  </div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-2xl font-bold text-portfolio-primary group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-300">
                    13+
                  </div>
                  <div className="text-sm text-portfolio-muted-foreground group-hover:text-emerald-400 transition-colors">
                    Projects Delivered
                  </div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-2xl font-bold text-portfolio-primary group-hover:text-yellow-400 group-hover:scale-110 transition-all duration-300">
                    15+
                  </div>
                  <div className="text-sm text-portfolio-muted-foreground group-hover:text-yellow-400 transition-colors">
                    Technologies Mastered
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Horizontal Experience Timeline */}
          <div className="mt-12 fade-in">
            <h3 className="text-2xl font-semibold mb-8 flex items-center justify-center gap-2" aria-label="Professional Experience">
              <TrendingUp className="text-portfolio-primary h-6 w-6" aria-hidden="true" />
              Experience Journey
            </h3>
            
            {/* Enhanced Experience Journey - Interactive Timeline */}
            <div className="hidden md:block relative max-w-5xl mx-auto">
              {/* Animated Timeline line */}
              <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-portfolio-primary to-transparent rounded-full" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-r from-portfolio-primary/20 via-portfolio-primary/40 to-portfolio-primary/20 rounded-full animate-pulse"></div>
              </div>
              
              <div className="flex justify-between items-start gap-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="group text-center relative flex-1 max-w-sm cursor-pointer transform transition-all duration-500 hover:scale-105" data-testid={`experience-${index}`}>
                    {/* Enhanced Timeline dot with glow */}
                    <div className="w-24 h-24 mx-auto backdrop-blur-sm bg-white/10 rounded-full flex items-center justify-center relative z-10 mb-6 shadow-lg group-hover:shadow-2xl group-hover:backdrop-blur-md transition-all duration-500">
                      {/* Company Logos */}
                      {exp.logos.length === 1 ? (
                        <img 
                          src={exp.logos[0]} 
                          alt={`${exp.company} logo`}
                          className={`w-16 h-16 object-contain ${exp.company === 'Bosmos' || exp.company.includes('Freddie Mac') ? 'scale-125' : ''}`}
                        />
                      ) : (
                        <div className="flex flex-col gap-1">
                          {exp.logos.map((logo, logoIndex) => (
                            <img 
                              key={logoIndex}
                              src={logo} 
                              alt={`${exp.company} logo ${logoIndex + 1}`}
                              className={`object-contain ${exp.company.includes('Freddie Mac') ? (logoIndex === 0 ? 'w-10 h-10' : 'w-6 h-6') : 'w-6 h-6'} ${exp.company.includes('Freddie Mac') ? 'scale-150' : ''}`}
                            />
                          ))}
                        </div>
                      )}
                      {/* Floating indicators */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping group-hover:animate-pulse"></div>
                    </div>
                    
                    {/* Enhanced Experience content */}
                    <div className="space-y-3 p-4 bg-portfolio-card/30 rounded-xl border border-portfolio-border/30 group-hover:border-portfolio-primary/50 group-hover:bg-portfolio-card/50 transition-all duration-500 group-hover:shadow-lg">
                      <h4 className="text-lg font-bold text-portfolio-foreground group-hover:text-portfolio-primary transition-colors" data-testid={`experience-title-${index}`}>
                        {exp.title}
                      </h4>
                      <p className="text-portfolio-primary/90 font-semibold text-sm" data-testid={`experience-company-${index}`}>
                        {exp.company}
                      </p>
                      <p className="text-portfolio-primary font-medium text-xs bg-portfolio-primary/10 px-2 py-1 rounded-full inline-block" data-testid={`experience-period-${index}`}>
                        {exp.period}
                      </p>
                      <p className="text-portfolio-muted-foreground text-sm leading-relaxed group-hover:text-portfolio-foreground transition-colors" data-testid={`experience-description-${index}`}>
                        {exp.description}
                      </p>
                      {/* Progress indicator */}
                      <div className="w-full bg-portfolio-muted/20 rounded-full h-1.5 mt-3">
                        <div 
                          className={`h-1.5 bg-gradient-to-r from-portfolio-primary to-emerald-400 rounded-full transition-all duration-1000 group-hover:shadow-md ${
                            index === 0 ? "w-full" : index === 1 ? "w-3/4" : "w-1/2"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mobile Vertical Timeline */}
            <div className="md:hidden">
              <ol className="space-y-6">
                {experiences.map((exp, index) => (
                  <li key={index} className={`relative pl-20 ${index !== experiences.length - 1 ? 'after:absolute after:left-8 after:top-16 after:bottom-0 after:w-px after:bg-portfolio-primary/30' : ''}`} data-testid={`experience-mobile-${index}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-0 w-16 h-16 backdrop-blur-sm bg-white/10 rounded-full flex items-center justify-center">
                      {/* Company Logos */}
                      {exp.logos.length === 1 ? (
                        <img 
                          src={exp.logos[0]} 
                          alt={`${exp.company} logo`}
                          className={`w-12 h-12 object-contain ${exp.company === 'Bosmos' || exp.company.includes('Freddie Mac') ? 'scale-125' : ''}`}
                        />
                      ) : (
                        <div className="flex flex-col gap-1">
                          {exp.logos.map((logo, logoIndex) => (
                            <img 
                              key={logoIndex}
                              src={logo} 
                              alt={`${exp.company} logo ${logoIndex + 1}`}
                              className={`w-6 h-6 object-contain ${exp.company.includes('Freddie Mac') ? (logoIndex === 0 ? 'w-8 h-8' : 'w-4 h-4') : 'w-4 h-4'} ${exp.company.includes('Freddie Mac') ? 'scale-125' : ''}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Experience content */}
                    <div className="min-w-0 pb-4 ml-4">
                      <div className="flex flex-col mb-2">
                        <h4 className="text-lg font-semibold text-portfolio-foreground" data-testid={`experience-mobile-title-${index}`}>
                          {exp.title}
                        </h4>
                        <span className="text-sm text-portfolio-primary font-medium" data-testid={`experience-mobile-period-${index}`}>
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-portfolio-primary/80 font-medium mb-1" data-testid={`experience-mobile-company-${index}`}>
                        {exp.company}
                      </p>
                      <p className="text-portfolio-muted-foreground text-sm" data-testid={`experience-mobile-description-${index}`}>
                        {exp.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section - Compact Data Engineering Focus */}
      <section id="tech-stack" className="py-20 px-4 bg-gradient-to-br from-portfolio-secondary to-portfolio-secondary/80 relative border-t-4 border-portfolio-primary/30">
        {/* Section Header with Clear Distinction */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-portfolio-primary px-6 py-2 rounded-full shadow-lg">
            <span className="text-white font-bold text-sm tracking-wide">TECHNICAL EXPERTISE</span>
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BarChart3 className="text-portfolio-primary h-8 w-8" />
              <h2 className="text-4xl font-bold text-portfolio-foreground">Data Engineering Stack</h2>
            </div>
            <p className="text-lg text-portfolio-muted-foreground max-w-2xl mx-auto">
              <span className="text-portfolio-primary font-medium">Scalable</span> end-to-end data infrastructure • <span className="text-emerald-400">Processing millions of records daily</span>
            </p>
          </div>
          
          {/* Compact Pipeline Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataEngineeringPipeline.map((stage, stageIndex) => (
              <div key={stageIndex} className="group bg-portfolio-card border border-portfolio-border rounded-xl p-6 fade-in hover:border-portfolio-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-portfolio-primary/10 hover:-translate-y-2 transform-gpu hover:[transform:translateY(-0.5rem)_rotateX(6deg)_rotateY(3deg)] cursor-pointer">
                {/* Stage Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{stage.emoji}</span>
                  <div>
                    <h3 className="text-lg font-bold text-portfolio-foreground">{stage.stage}</h3>
                    <p className="text-xs text-portfolio-muted-foreground">{stage.description}</p>
                  </div>
                </div>

                {/* Compact Tools Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {stage.tools.map((tool, toolIndex) => (
                    <div 
                      key={toolIndex}
                      className="group relative bg-portfolio-background/50 border border-portfolio-border/50 rounded-lg p-3 hover:border-portfolio-primary/50 hover:bg-portfolio-background/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-portfolio-primary/20 hover:-translate-y-1 transform cursor-pointer"
                      data-testid={`tech-${tool.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                    >
                      {/* Tech Icon and Name */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`text-lg ${tool.color} group-hover:scale-110 transition-all duration-300`}>
                          {tool.icon && <tool.icon />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-portfolio-foreground group-hover:text-portfolio-primary transition-colors truncate">
                            {tool.name}
                          </h4>
                        </div>
                      </div>
                      
                      {/* Level Badge */}
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(tool.level)}`}>
                          {getLevelIcon(tool.level)}
                          {tool.level}
                        </span>
                        
                        {/* Mini Progress Bar */}
                        <div className="w-12 bg-portfolio-muted/20 rounded-full h-1">
                          <div 
                            className={`h-1 rounded-full transition-all duration-500 ${
                              tool.level === "Advanced" ? "w-full bg-emerald-400" :
                              tool.level === "Intermediate" ? "w-3/4 bg-blue-400" :
                              tool.level === "Learning" ? "w-1/2 bg-yellow-400" :
                              "w-1/4 bg-gray-400"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-portfolio-background relative">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div className="honeycomb-pattern"></div>
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16 fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
            <BarChart3 className="text-portfolio-primary h-8 w-8" />
              <h2 className="text-4xl font-bold" data-testid="projects-title">My Projects</h2>
            </div>
            <p className="text-xl text-portfolio-muted-foreground max-w-2xl mx-auto" data-testid="projects-description">
              Production-style distributed data platforms simulating enterprise-scale workloads (50M+ records).
            </p>
          </div>
          
          {/* Featured Data Engineering Projects */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-portfolio-foreground flex items-center gap-2">
              ⭐ Featured Data Engineering Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.filter(project => project.featured).map((project, index) => (
                <Card key={index} className="fade-in bg-portfolio-card border-portfolio-border overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group relative" data-testid={`project-card-${index}`}>
                  {project.featured && (
                    <div className="absolute top-2 right-2 bg-portfolio-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                      Featured
                    </div>
                  )}
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-48 object-cover"
                    data-testid={`project-image-${index}`}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-portfolio-card-foreground" data-testid={`project-title-${index}`}>
                      {project.title}
                    </h3>
                    <p className="text-portfolio-muted-foreground mb-4" data-testid={`project-description-${index}`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4" data-testid={`project-technologies-${index}`}>
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2 py-1 bg-portfolio-primary/10 text-portfolio-primary rounded text-xs"
                          data-testid={`project-tech-${index}-${tech.toLowerCase()}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <a 
                        href={project.github} 
                        className="text-portfolio-primary hover:text-portfolio-primary/80 transition-colors duration-200 flex items-center"
                        data-testid={`project-github-${index}`}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        View Project
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Academic Research & ML Projects */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-portfolio-foreground flex items-center gap-2">
              📚 Academic Research & ML Projects
            </h3>
            
            {/* Tabs for Academic Projects */}
            <div className="mb-6 border-b border-portfolio-border/30">
              <div className="flex space-x-8">
                <button 
                  className={`pb-2 px-1 text-sm font-medium transition-colors duration-200 border-b-2 ${
                    activeTab === 'ml' 
                      ? 'border-portfolio-primary text-portfolio-foreground' 
                      : 'border-transparent text-portfolio-muted-foreground'
                  }`}
                  onClick={() => setActiveTab('ml')}
                  data-testid="tab-ml"
                >
                  Deep Learning & Machine Learning Projects
                </button>
                <button 
                  className={`pb-2 px-1 text-sm font-medium transition-colors duration-200 border-b-2 ${
                    activeTab === 'cv' 
                      ? 'border-portfolio-primary text-portfolio-foreground' 
                      : 'border-transparent text-portfolio-muted-foreground'
                  }`}
                  onClick={() => setActiveTab('cv')}
                  data-testid="tab-cv"
                >
                  Computer Vision Projects
                </button>
              </div>
            </div>

            {/* Content Container */}
            <div className="min-h-[400px]">
              {/* ML Projects Tab */}
              {activeTab === 'ml' && (
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide animate-fadeIn" data-testid="ml-projects-container" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {projects.filter(project => !project.featured && 
                    (project.category === "Machine Learning" || project.category === "Deep Learning"))
                    .map((project) => {
                      const projectSlug = project.title.toLowerCase().replace(/\s+/g, '-');
                      return (
                        <Card key={project.title} className="flex-shrink-0 w-80 bg-portfolio-card border-portfolio-border hover:shadow-xl hover:scale-105 hover:z-10 hover:-mx-2 transition-all duration-300 group relative" data-testid={`project-card-${projectSlug}`}>
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-48 object-cover"
                            data-testid={`project-image-${projectSlug}`}
                          />
                          <div className="p-6">
                            <h3 className="text-xl font-semibold mb-3 text-portfolio-card-foreground" data-testid={`project-title-${projectSlug}`}>
                              {project.title}
                            </h3>
                            
                            {/* Hidden description that appears on hover */}
                            <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-60 mb-4">
                              <p className="text-portfolio-muted-foreground" data-testid={`project-description-${projectSlug}`}>
                                {project.description}
                              </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-4" data-testid={`project-technologies-${projectSlug}`}>
                              {project.technologies.map((tech, techIndex) => (
                                <span 
                                  key={`${projectSlug}-${techIndex}`}
                                  className="px-2 py-1 bg-portfolio-primary/10 text-portfolio-primary rounded text-xs"
                                  data-testid={`project-tech-${projectSlug}-${tech.toLowerCase().replace(/\s+/g, '-')}`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <div className="flex gap-3">
                              <a 
                                href={project.github} 
                                className="text-portfolio-primary hover:text-portfolio-primary/80 transition-colors duration-200 flex items-center"
                                data-testid={`project-github-${projectSlug}`}
                              >
                                <Github className="mr-2 h-4 w-4" />
                                View Project
                              </a>
                                                          </div>
                          </div>
                        </Card>
                      );
                    })}
                </div>
              )}

              {/* Computer Vision Projects Tab */}
              {activeTab === 'cv' && (
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide animate-fadeIn" data-testid="cv-projects-container" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {projects.filter(project => !project.featured && project.category === "Computer Vision")
                    .map((project) => {
                      const projectSlug = project.title.toLowerCase().replace(/\s+/g, '-');
                      return (
                        <Card key={project.title} className="flex-shrink-0 w-80 bg-portfolio-card border-portfolio-border hover:shadow-xl hover:scale-105 hover:z-10 hover:-mx-2 transition-all duration-300 group relative" data-testid={`project-card-${projectSlug}`}>
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-48 object-cover"
                            data-testid={`project-image-${projectSlug}`}
                          />
                          <div className="p-6">
                            <h3 className="text-xl font-semibold mb-3 text-portfolio-card-foreground" data-testid={`project-title-${projectSlug}`}>
                              {project.title}
                            </h3>
                            
                            {/* Hidden description that appears on hover */}
                            <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-60 mb-4">
                              <p className="text-portfolio-muted-foreground" data-testid={`project-description-${projectSlug}`}>
                                {project.description}
                              </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-4" data-testid={`project-technologies-${projectSlug}`}>
                              {project.technologies.map((tech, techIndex) => (
                                <span 
                                  key={`${projectSlug}-${techIndex}`}
                                  className="px-2 py-1 bg-portfolio-primary/10 text-portfolio-primary rounded text-xs"
                                  data-testid={`project-tech-${projectSlug}-${tech.toLowerCase().replace(/\s+/g, '-')}`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <div className="flex gap-3">
                              <a 
                                href={project.github} 
                                className="text-portfolio-primary hover:text-portfolio-primary/80 transition-colors duration-200 flex items-center"
                                data-testid={`project-github-${projectSlug}`}
                              >
                                <Github className="mr-2 h-4 w-4" />
                                View Project
                              </a>
                                                          </div>
                          </div>
                        </Card>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-portfolio-secondary relative">
        {show && (
          <Button
            onClick={scrollToTop}
            className="
              fixed bottom-8 right-8 rounded-full p-2 shadow-lg
              z-50 bg-portfolio-primary/90
              transform transition-transform duration-200
              hover:-rotate-12 hover:scale-180
              active:scale-90
              animate-bounce [animation-duration:2s]
            "
          >
            <img
              src={cat}
              alt="Cute cat pointing up"
              className="w-12 h-12 transform transition-transform duration-200 hover:scale-180 hover:-rotate-12"
            />
          </Button>
        )}




        {/* Subtle pulse animation background */}
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold mb-4" data-testid="contact-title">Let's Connect</h2>
            <p className="text-xl text-portfolio-muted-foreground" data-testid="contact-description">
              Ready to discuss data challenges, ML opportunities, or your next big project?
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="fade-in">
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium text-portfolio-foreground mb-2">
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-portfolio-input border-portfolio-border text-portfolio-foreground glow"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-portfolio-foreground mb-2">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-portfolio-input border-portfolio-border text-portfolio-foreground glow"
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="block text-sm font-medium text-portfolio-foreground mb-2">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-portfolio-input border-portfolio-border text-portfolio-foreground resize-vertical glow"
                    data-testid="input-message"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-portfolio-primary hover:bg-portfolio-primary/90 text-portfolio-primary-foreground font-medium py-3 px-6"
                  data-testid="button-submit-form"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Mail className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="fade-in space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4" data-testid="contact-info-title">Get in touch</h3>
                <p className="text-portfolio-muted-foreground" data-testid="contact-info-description">
                  I'm always interested in new opportunities and exciting projects. 
                  Whether you have a question or just want to say hi, feel free to reach out!
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-portfolio-primary text-lg" />
                  <a 
                    href="mailto:mathew.rohit.thomson@gmail.com"
                    className="text-portfolio-foreground hover:text-portfolio-primary transition-colors duration-200"
                    data-testid="link-email"
                  >
                    mathew.rohit.thomson@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-portfolio-primary text-lg" />
                  <a 
                    href="tel:+14122142233"
                    className="text-portfolio-foreground hover:text-portfolio-primary transition-colors duration-200"
                    data-testid="link-phone"
                  >
                    +1 (412) 214-2233
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-portfolio-primary text-lg" />
                  <span className="text-portfolio-foreground" data-testid="text-location">Virginia, USA</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4" data-testid="social-title">Follow me</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/mrohitth"
                    className="w-10 h-10 bg-portfolio-muted hover:bg-portfolio-primary text-portfolio-muted-foreground hover:text-portfolio-primary-foreground rounded-lg flex items-center justify-center transition-all duration-200"
                    data-testid="link-github"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/mrohitth/"
                    className="w-10 h-10 bg-portfolio-muted hover:bg-portfolio-primary text-portfolio-muted-foreground hover:text-portfolio-primary-foreground rounded-lg flex items-center justify-center transition-all duration-200"
                    data-testid="link-linkedin"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://twitter.com/mrohitth" 
                    className="w-10 h-10 bg-portfolio-muted hover:bg-portfolio-primary text-portfolio-muted-foreground hover:text-portfolio-primary-foreground rounded-lg flex items-center justify-center transition-all duration-200"
                    data-testid="link-twitter"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://instagram.com/mrohitth" 
                    className="w-10 h-10 bg-portfolio-muted hover:bg-portfolio-primary text-portfolio-muted-foreground hover:text-portfolio-primary-foreground rounded-lg flex items-center justify-center transition-all duration-200"
                    data-testid="link-instagram"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.987 11.988 11.987s11.987-5.369 11.987-11.987C24.014 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.295C4.198 14.553 3.5 13.26 3.5 11.987c0-1.297.698-2.566 1.626-3.706.875-.805 2.026-1.295 3.323-1.295s2.448.49 3.323 1.295c.928 1.14 1.626 2.409 1.626 3.706 0 1.273-.698 2.566-1.626 3.706-.875.805-2.026 1.295-3.323 1.295zm7.068 0c-1.297 0-2.448-.49-3.323-1.295-.928-1.14-1.626-2.433-1.626-3.706 0-1.297.698-2.566 1.626-3.706.875-.805 2.026-1.295 3.323-1.295s2.448.49 3.323 1.295c.928 1.14 1.626 2.409 1.626 3.706 0 1.273-.698 2.566-1.626 3.706-.875.805-2.026 1.295-3.323 1.295z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-portfolio-background border-t border-portfolio-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-portfolio-muted-foreground" data-testid="footer-text">
            © 2025 Mathew Rohit Thomson. All rights reserved. Built with ❤️ and modern web technologies.
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
}