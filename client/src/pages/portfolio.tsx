"use client";

import { Suspense, lazy } from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SandboxSection } from "@/components/sections/SandboxSection";
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
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SandboxSection />
        <ContactSection />
      </main>
    </div>
  );
}