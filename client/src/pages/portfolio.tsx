import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Github, ExternalLink, Mail, Phone, MapPin, Menu, X, User, Database, BarChart3, TrendingUp } from 'lucide-react';

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
  const [isDeleting, setIsDeleting] = useState(false);

  
  // Typing animation for roles
  const roles = [
  "Data Engineer",
  "Python Ninja",
  "Cloud Explorer",
  "Data Storyteller",
  "Data Pipeline Architect",
  "Algorithm Tinkerer",
  "Big Data Wrangler",
  "AI/ML Enthusiast",
  "Code Alchemist",
  "Tech Curious",
  "Insights Seeker",
  "SQL Sorcerer",
  "Analytics Problem Solver",
  "Model Builder",
  "Problem Solver Extraordinaire"
];

  // Subtle data flow animation (no React state needed - using CSS animations)

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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('http://localhost:5001/send-contact', {
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
    {
      title: "Real-time Analytics Dashboard",
      description: "Interactive dashboard processing 10M+ daily events with real-time visualizations, custom metrics, and automated alerting.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["React", "Python", "Apache Kafka", "PostgreSQL"],
      github: "#",
      demo: "#"
    },
    {
      title: "Data Pipeline Orchestrator",
      description: "Scalable ETL pipeline handling multi-source data ingestion, transformation, and warehouse loading with monitoring.",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["Apache Airflow", "Python", "Docker", "AWS"],
      github: "#",
      demo: "#"
    },
    {
      title: "ML Model Deployment Platform",
      description: "End-to-end MLOps platform for model training, versioning, deployment, and monitoring with A/B testing capabilities.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["FastAPI", "MLflow", "Kubernetes", "TensorFlow"],
      github: "#",
      demo: "#"
    },
    {
      title: "Customer Segmentation Engine",
      description: "Advanced analytics system using clustering algorithms to segment customers and predict lifetime value.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["Python", "scikit-learn", "Pandas", "Plotly"],
      github: "#",
      demo: "#"
    },
    {
      title: "Financial Risk Assessment API",
      description: "High-performance API serving ML models for real-time credit scoring and fraud detection with 99.9% uptime.",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["FastAPI", "XGBoost", "Redis", "PostgreSQL"],
      github: "#",
      demo: "#"
    },
    {
      title: "Data Quality Monitoring Suite",
      description: "Comprehensive data quality framework with automated testing, lineage tracking, and anomaly detection.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["Python", "Great Expectations", "dbt", "Grafana"],
      github: "#",
      demo: "#"
    }
  ];

  const skills = ["Python", "SQL", "Apache Spark", "React", "PostgreSQL", "Docker", "AWS", "Pandas", "Apache Kafka", "TensorFlow", "FastAPI", "dbt"];

  const experiences = [
    {
      title: "Senior Data Engineer",
      company: "Tech Company",
      period: "2022 - Present",
      description: "Lead data infrastructure design and ML pipeline development"
    },
    {
      title: "Data Engineer",
      company: "Analytics Firm",
      period: "2020 - 2022",
      description: "Built scalable ETL processes and real-time streaming systems"
    },
    {
      title: "Software Developer",
      company: "Startup",
      period: "2019 - 2020",
      description: "Full-stack development with focus on data-driven applications"
    },
    {
      title: "Junior Developer",
      company: "Development Agency",
      period: "2018 - 2019",
      description: "Started programming journey building web applications"
    }
  ];

  return (
    <div className="min-h-screen bg-portfolio-background text-portfolio-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-portfolio-background/80 backdrop-blur-md border-b border-portfolio-border">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 px-6 lg:px-12">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-xl font-bold text-portfolio-primary hover:text-portfolio-primary/80 transition-colors"
                data-testid="logo-button"
              >
                Mathew Thomson
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-12">
                <button 
                  onClick={() => scrollToSection('hero')}
                  className="text-portfolio-foreground hover:text-portfolio-primary transition-colors duration-200"
                  style={{ wordSpacing: '0.5rem' }}
                  data-testid="nav-home"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-portfolio-foreground hover:text-portfolio-primary transition-colors duration-200"
                  style={{ wordSpacing: '0.5rem' }}
                  data-testid="nav-about"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="text-portfolio-foreground hover:text-portfolio-primary transition-colors duration-200"
                  style={{ wordSpacing: '0.5rem' }}
                  data-testid="nav-projects"
                >
                  Projects
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-portfolio-foreground hover:text-portfolio-primary transition-colors duration-200"
                  style={{ wordSpacing: '0.5rem' }}
                  data-testid="nav-contact"
                >
                  Contact
                </button>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-portfolio-foreground hover:text-portfolio-primary p-2"
                data-testid="mobile-menu-button"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-16 right-0 h-screen w-64 bg-portfolio-background border-l border-portfolio-border" data-testid="mobile-menu">
            <div className="flex flex-col space-y-4 p-6">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-portfolio-foreground hover:text-portfolio-primary transition-colors duration-200 text-lg text-left"
                data-testid="mobile-nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-portfolio-foreground hover:text-portfolio-primary transition-colors duration-200 text-lg text-left"
                data-testid="mobile-nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-portfolio-foreground hover:text-portfolio-primary transition-colors duration-200 text-lg text-left"
                data-testid="mobile-nav-projects"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-portfolio-foreground hover:text-portfolio-primary transition-colors duration-200 text-lg text-left"
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
        {/* Subtle Flow Animation Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Very subtle flowing elements */}
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
                filter: 'blur(1.5px)' // very subtle blur
              }}
            />
          ))}
          {/* Gentle gradient overlay to soften edges */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-portfolio-background/20 to-portfolio-background/40" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6" data-testid="hero-title">
              Hey, I'm <span className="gradient-text">Mathew</span>
            </h1>
            <div className="text-xl md:text-2xl text-portfolio-muted-foreground mb-8 max-w-2xl mx-auto h-16 flex items-center justify-center" data-testid="hero-description">
              <span className="typing-animation">
                {displayedText}
              </span>
            </div>
            <p className="text-lg text-portfolio-muted-foreground/80 mb-8 max-w-2xl mx-auto" data-testid="hero-subtitle">
              Engineer of pipelines, architect of insights; building data-driven solutions that simplify complexity and empower smarter decisions at scale
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => scrollToSection('projects')}
                className="bg-portfolio-primary hover:bg-portfolio-primary/90 text-portfolio-primary-foreground px-8 py-3 font-medium w-40 flex items-center justify-center"
                data-testid="button-view-work"
              >
                View My Work
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button
                //variant="outline"
                onClick={() => scrollToSection('contact')}
                //className="bg-transparent border-portfolio-border text-portfolio-foreground hover:bg-portfolio-secondary/60 hover:text-portfolio-foreground px-8 py-3 font-medium"
                className="bg-portfolio-primary hover:bg-portfolio-primary/90 text-portfolio-primary-foreground px-8 py-3 font-medium w-40 flex items-center justify-center"
                data-testid="button-contact"
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-portfolio-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
            {/* Profile Picture */}
            <div className="fade-in md:col-span-1">
              <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto rounded-2xl bg-portfolio-muted flex items-center justify-center" data-testid="profile-picture">
                <User size={80} className="text-portfolio-muted-foreground" />
                {/* Replace with actual image: */}
                {/* <img src="your-profile-photo.jpg" alt="Your Name" className="w-full h-full object-cover rounded-2xl"> */}
              </div>
            </div>
            
            {/* About Content & Experience */}
            <div className="fade-in md:col-span-1 lg:col-span-2 space-y-6 md:space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-6" data-testid="about-title">About Me</h2>
                <div className="space-y-3 md:space-y-4 text-base md:text-lg text-portfolio-muted-foreground max-w-prose text-justify">
                  <p data-testid="about-paragraph-1">
                    I’m a data engineer passionate about building scalable, reliable systems that turn raw data into actionable insights. I specialize in designing robust ETL pipelines, orchestrating complex workflows, and creating analytics platforms that enable data-driven decision-making at scale. Leveraging my expertise in AI and ML, I enhance data engineering solutions with intelligent automation, predictive modeling, and ML-ready infrastructure, bridging the gap between traditional pipelines and advanced analytics. Continuously exploring new technologies, I focus on solving complex data challenges and delivering solutions that drive meaningful business impact.
                  </p>
                </div>
              </div>
              
              
              {/* Separator */}
              <div className="hidden md:block">
                <div className="w-full h-px bg-portfolio-border"></div>
              </div>
              
              {/* Tech Stack */}
              <div>
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Database className="text-portfolio-primary h-6 w-6" aria-hidden="true" />
                  Tech Stack
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3" data-testid="skills-container">
                  {skills.slice(0, 10).map((skill, index) => (
                    <span 
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-portfolio-primary/10 hover:bg-portfolio-primary/20 rounded-lg transition-colors group"
                      data-testid={`skill-${skill.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                    >
                      <div className="w-2 h-2 bg-portfolio-primary opacity-80 rounded-full group-hover:scale-125 transition-transform"></div>
                      <span className="text-sm font-medium text-portfolio-foreground">{skill}</span>
                    </span>
                  ))}
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
            
            {/* Desktop Horizontal Timeline */}
            <div className="hidden md:block relative">
              {/* Timeline line */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-portfolio-primary/30" aria-hidden="true"></div>
              
              <div className="grid grid-cols-4 gap-4">
                {experiences.map((exp, index) => (
                  <div key={index} className="text-center relative" data-testid={`experience-${index}`}>
                    {/* Timeline dot */}
                    <div className="w-12 h-12 mx-auto bg-portfolio-primary rounded-full flex items-center justify-center relative z-10 mb-4">
                      <div className="w-5 h-5 bg-portfolio-secondary rounded-full"></div>
                    </div>
                    
                    {/* Experience content */}
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-portfolio-foreground" data-testid={`experience-title-${index}`}>
                        {exp.title}
                      </h4>
                      <p className="text-portfolio-primary/80 font-medium text-sm" data-testid={`experience-company-${index}`}>
                        {exp.company}
                      </p>
                      <p className="text-portfolio-primary font-medium text-xs" data-testid={`experience-period-${index}`}>
                        {exp.period}
                      </p>
                      <p className="text-portfolio-muted-foreground text-xs leading-tight" data-testid={`experience-description-${index}`}>
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mobile Vertical Timeline */}
            <div className="md:hidden">
              <ol className="space-y-6">
                {experiences.map((exp, index) => (
                  <li key={index} className={`relative pl-10 ${index !== experiences.length - 1 ? 'after:absolute after:left-4 after:top-8 after:bottom-0 after:w-px after:bg-portfolio-primary/30' : ''}`} data-testid={`experience-mobile-${index}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-0 w-8 h-8 bg-portfolio-primary rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-portfolio-secondary rounded-full"></div>
                    </div>
                    
                    {/* Experience content */}
                    <div className="min-w-0 pb-4">
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
              Data-driven solutions that transform business operations and unlock insights from complex datasets.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="fade-in bg-portfolio-card border-portfolio-border overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group" data-testid={`project-card-${index}`}>
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
                      GitHub
                    </a>
                    <a 
                      href={project.demo} 
                      className="text-portfolio-primary hover:text-portfolio-primary/80 transition-colors duration-200 flex items-center"
                      data-testid={`project-demo-${index}`}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-portfolio-secondary relative">
        {/* Subtle pulse animation background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="pulse-bg"></div>
        </div>
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
                    className="w-full bg-portfolio-input border-portfolio-border text-portfolio-foreground"
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
                    className="w-full bg-portfolio-input border-portfolio-border text-portfolio-foreground"
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
                    className="w-full bg-portfolio-input border-portfolio-border text-portfolio-foreground resize-vertical"
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
                    href="#" 
                    className="w-10 h-10 bg-portfolio-muted hover:bg-portfolio-primary text-portfolio-muted-foreground hover:text-portfolio-primary-foreground rounded-lg flex items-center justify-center transition-all duration-200"
                    data-testid="link-twitter"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
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
  );
}
