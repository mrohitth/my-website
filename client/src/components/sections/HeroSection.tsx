"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ROLES } from "@/data/portfolio";
import heroProfilePic from "@/assets/profile3.webp";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const MLNetworkBackground = lazy(() => import("@/components/mlnetworkbackground"));

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const offset = el.offsetTop - 80;
  window.scrollTo({ top: offset, behavior: "smooth" });
}

export function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero-top");
  const reducedMotion = useReducedMotion();

  // Typing animation - disabled when reduced motion preferred
  useEffect(() => {
    if (reducedMotion) {
      setDisplayedText(ROLES[currentRoleIndex]);
      return;
    }

    const currentRole = ROLES[currentRoleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length - 1));
      }, typingSpeed);
    } else if (!isDeleting && displayedText.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex, reducedMotion]);



  // Section visibility tracking
  useEffect(() => {
    const handleArrow = () => {
      const heroSection = document.getElementById("hero");
      if (!heroSection) return;
      const rect = heroSection.getBoundingClientRect();
      const threshold = window.innerHeight * 0.15;
      setCurrentSection(
        rect.top >= -150 && rect.top <= threshold ? "hero-top" : "other"
      );
    };
    window.addEventListener("scroll", handleArrow, { passive: true });
    handleArrow();
    return () => window.removeEventListener("scroll", handleArrow);
  }, []);

  // Subtle flow background elements
  const subtleFlowElements = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        top: Math.random() * 80 + 10,
        width: Math.random() * 12 + 8,
        duration: Math.random() * 8 + 12,
        delay: Math.random() * -15,
      })),
    []
  );

  return (
    <>
      <section
        id="hero"
        className="hero-gradient min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      >
        {/* ML Network Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Suspense fallback={null}>
            <MLNetworkBackground />
          </Suspense>
        </div>

        {/* Subtle Flow Animation Background - disabled when reduced motion preferred */}
        {!reducedMotion && (
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {subtleFlowElements.map((element) => (
              <div
                key={element.id}
                className="absolute rounded-full bg-cyan-400/75 subtle-flow"
                style={{
                  top: `${element.top}%`,
                  left: "-8px",
                  width: `${element.width * 1.25}px`,
                  height: "3px",
                  animationDuration: `${element.duration}s`,
                  animationDelay: `${element.delay}s`,
                  filter: "blur(1.5px)",
                }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-portfolio-background/20 to-portfolio-background/40" />
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto w-full text-center">
          <div className="fade-in mb-6 md:mb-12 flex justify-center">
            <div className="relative w-32 h-32 sm:w-48 md:w-64 sm:h-48 md:h-64 rounded-full overflow-hidden border-portfolio-primary/30 shadow-lg">
              <img
                src={heroProfilePic}
                alt="Mathew Rohit Thomson, Data Engineer specializing in production Spark and Snowflake pipelines on AWS EMR"
                width={2750}
                height={2580}
                className="w-full h-full object-cover"
                fetchpriority="high"
                decoding="async"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="fade-in"
          >
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6">
              Hey, I&apos;m <span className="gradient-text">Mathew</span>
            </h1>
            {/* Technically precise role title */}
            <div className="text-xl md:text-2xl text-portfolio-muted-foreground mb-6 max-w-2xl mx-auto h-16 flex items-center justify-center">
              <span className="typing-animation">{displayedText}</span>
            </div>

            {/* Tier 1 — Production engineering claim */}
            <p className="text-lg md:text-xl text-portfolio-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              I build production batch pipelines on AWS EMR and Snowflake - currently processing 40M+ records per batch for a Fortune 500 financial services client.
            </p>

            {/* Tier 2 — Credentials + targeting signal */}
            <p className="text-sm md:text-base text-portfolio-muted-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              CMU grad. 2.5 years in production data engineering at regulated financial scale. Targeting DE roles at companies where batch reliability and data correctness are non-negotiable.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-portfolio-primary hover:bg-portfolio-primary/90 text-portfolio-primary-foreground px-8 py-3 font-medium w-40 flex items-center justify-center btn-jump focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                View Projects
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-transparent border border-portfolio-primary text-portfolio-primary hover:bg-portfolio-primary/10 px-8 py-3 font-medium w-40 flex items-center justify-center btn-jump focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Get In Touch
              </Button>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          {currentSection === "hero-top" && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30">
              <button
                onClick={() => scrollToSection("about")}
                aria-label="Scroll down to About section"
                className="bg-portfolio-primary/80 hover:bg-portfolio-primary text-white rounded-full p-2 shadow-lg transition-all animate-bounce focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none"
                style={{ animationDuration: "1.5s" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 2a.75.75 0 0 1 .75.75v8.69l1.22-1.22a.75.75 0 1 1 1.06 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 1 1 1.06-1.06l1.22 1.22V2.75A.75.75 0 0 1 8 2Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}