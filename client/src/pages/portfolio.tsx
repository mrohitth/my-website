"use client";

import { Suspense, lazy } from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TechStackSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { Projects2Section } from "@/components/sections/Projects2Section";
import { SandboxSection } from "@/components/sections/SandboxSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { ContactSection } from "@/components/sections/ContactSection";

const SubtleNetworkCursor = lazy(
  () => import("@/components/subtlenetworkcursor")
);

export default function Portfolio() {
  return (
    <div className="relative min-h-screen bg-portfolio-background text-portfolio-foreground subtle-dots">
      {/* Custom cursor */}
      <Suspense fallback={null}>
        <SubtleNetworkCursor />
      </Suspense>

      {/* Sticky navbar */}
      <NavigationBar />

      {/* Page sections */}
      <main id="main-content" aria-label="Portfolio sections">
        <HeroSection />
        <ExperienceSection />
        <AboutSection />
        <TechStackSection />
        <Projects2Section />
        <SandboxSection />
        <PhilosophySection />
        <ContactSection />
      </main>
    </div>
  );
}