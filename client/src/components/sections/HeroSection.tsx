"use client";

import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroProfilePic from "@/assets/profile3.webp";
import { ROLES } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const MLNetworkBackground = lazy(() => import("@/components/mlnetworkbackground"));

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
}

export function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero-top");
  const reducedMotion = useReducedMotion();

  // Typing animation — disabled when reduced motion preferred
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
        className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(220 25% 9%) 0%, hsl(220 20% 12%) 100%)" }}
      >
        {/* ML Network Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Suspense fallback={null}>
            <MLNetworkBackground />
          </Suspense>
        </div>

        {/* Subtle Flow Animation Background — disabled when reduced motion preferred */}
        {!reducedMotion && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {subtleFlowElements.map((element) => (
              <div
                key={element.id}
                className="absolute rounded-full animate-float-slow"
                style={{
                  top: `${element.top}%`,
                  left: `${Math.random() * 90}%`,
                  width: `${element.width}px`,
                  height: `${element.width}px`,
                  background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
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
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-6 md:mb-12 flex justify-center">
            <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/10 shadow-lg">
              <img
                src={heroProfilePic}
                alt="Mathew R. Thomson, Data Engineer at Freddie Mac"
                width={2750}
                height={2580}
                className="w-full h-full object-cover"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 text-white">
              Hey, I&apos;m <span className="gradient-text">Mathew</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-6 max-w-2xl mx-auto">
              Data Engineer specializing in production Spark and Snowflake pipelines on AWS EMR
            </p>

            {/* Typing role label */}
            {!reducedMotion && displayedText && (
              <p className="text-lg md:text-xl text-blue-400 mb-6 font-medium tracking-wide">
                {displayedText}
                <span className="animate-pulse text-blue-300">|</span>
              </p>
            )}
            {reducedMotion && ROLES[0] && (
              <p className="text-lg md:text-xl text-blue-400 mb-6 font-medium tracking-wide">
                {ROLES[0]}
              </p>
            )}

            <p className="text-base md:text-lg text-gray-400/80 mb-6 max-w-2xl mx-auto leading-relaxed">
              I build pipelines that handle 40M+ records per batch for a Fortune 500 financial client.
              Currently at Capco, embedded with Freddie Mac&apos;s data team in Northern Virginia.
            </p>

            <p className="text-sm md:text-base text-gray-500 mb-12 max-w-2xl mx-auto">
              CMU MS (4.0 GPA). 3+ years building production DE systems. Ready to contribute to high-impact data teams.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 font-medium"
              >
                View Projects
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-portfolio-primary hover:bg-portfolio-primary/90 text-portfolio-primary-foreground px-8 py-3 font-medium"
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
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all"
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
                    clipRule="evenrod"
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