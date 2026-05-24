"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "sandbox", label: "Sandbox" },
  { id: "philosophy", label: "Philosophy" },
  { id: "contact", label: "Contact" },
];

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const offset = 72;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

function NavLink({
  id,
  label,
  isActive,
  onClick,
}: {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "text-portfolio-primary"
          : "text-portfolio-foreground hover:text-portfolio-primary"
      }`}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute bottom-0 left-2 right-2 h-0.5 bg-portfolio-primary rounded-full"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      {hovered && !isActive && (
        <motion.div
          className="absolute bottom-0 left-2 right-2 h-0.5 bg-portfolio-primary/40 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </button>
  );
}

export function NavigationBar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Show/hide navbar based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.05;
      setIsVisible(scrollY <= threshold);
      setIsScrolled(scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((n) => n.id);

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: "-72px 0px 0px 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isVisible ? "-translate-y-full" : "translate-y-0"
        } ${
          isScrolled
            ? "bg-portfolio-background/95 backdrop-blur-md border-b border-portfolio-border/50 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("hero")}
              className="font-bold text-portfolio-primary text-portfolio-foreground hover:text-portfolio-primary hover:bg-portfolio-primary/10 px-4 py-3 rounded-md transition-colors"
              data-testid="logo-button"
            >
              Mathew Thomson
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  isActive={activeSection === item.id}
                  onClick={() => scrollToSection(item.id)}
                />
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4"
              >
                <Button
                  size="sm"
                  className="bg-portfolio-primary hover:bg-portfolio-primary/90 text-portfolio-primary-foreground font-medium"
                >
                  Resume
                </Button>
              </a>
            </div>

            {/* Mobile Nav */}
            <div className="md:hidden">
              <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                <SheetTrigger asChild>
                  <button
                    onClick={() => setIsMobileOpen(true)}
                    className="text-portfolio-foreground hover:text-portfolio-primary hover:bg-portfolio-primary/10 rounded-lg p-2 transition-colors"
                    data-testid="mobile-menu-button"
                    aria-label="Open menu"
                  >
                    <Menu size={24} />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72 bg-portfolio-background border-portfolio-border">
                  <SheetTitle className="text-portfolio-foreground font-bold text-lg">
                    Navigation
                  </SheetTitle>
                  <div className="mt-6 flex flex-col gap-2">
                    {NAV_ITEMS.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          scrollToSection(item.id);
                          setIsMobileOpen(false);
                        }}
                        className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                          activeSection === item.id
                            ? "bg-portfolio-primary/10 text-portfolio-primary"
                            : "text-portfolio-foreground hover:bg-portfolio-muted"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <Button className="w-full bg-portfolio-primary hover:bg-portfolio-primary/90 text-portfolio-primary-foreground font-medium">
                        View Resume
                      </Button>
                    </a>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Scroll-to-top floating button handled in ContactSection */}
    </>
  );
}