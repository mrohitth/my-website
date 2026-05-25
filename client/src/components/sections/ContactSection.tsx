"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { Github } from "lucide-react";
import cat from "@/assets/cat_up.gif";
import { CONTACT } from "@/data/contact";

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollTopBtn, setShowScrollTopBtn] = useState(false);

  // Scroll-to-top visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollTopBtn(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      console.error(error);
      setFormStatus("error");
    }
  }

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <section id="contact" className="py-20 px-4 bg-portfolio-secondary relative">
      {/* Scroll-to-top button */}
      {showScrollTopBtn && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            onClick={scrollToTop}
            className="rounded-full p-2 shadow-lg bg-portfolio-primary/90 transform transition-transform duration-200 hover:-rotate-12 hover:scale-180 active:scale-90 animate-bounce"
            style={{ animationDuration: "2s" }}
          >
            <img
              src={cat}
              alt="Scroll to top"
              className="w-12 h-12 transform transition-transform duration-200 hover:scale-180 hover:-rotate-12"
            />
          </Button>
        </motion.div>
      )}

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl font-bold mb-4" data-testid="contact-title">
            Let&apos;s Connect
          </h2>
          <p
            className="text-xl text-portfolio-muted-foreground"
            data-testid="contact-description"
          >
            Ready to discuss data challenges, ML opportunities, or your next big
            project?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="fade-in">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              data-testid="contact-form"
              noValidate
            >
              {/* Status announcement for screen readers */}
              <div
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
              >
                {formStatus === "submitting" && "Sending your message..."}
                {formStatus === "success" && "Message sent successfully! Rohit will respond soon."}
                {formStatus === "error" && "Failed to send message. Please try again or contact via email."}
              </div>
              <div>
                <Label
                  htmlFor="name"
                  className="block text-sm font-medium text-portfolio-foreground mb-2"
                >
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
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-portfolio-foreground mb-2"
                >
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
                <Label
                  htmlFor="message"
                  className="block text-sm font-medium text-portfolio-foreground mb-2"
                >
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
                disabled={formStatus === "submitting"}
                aria-busy={formStatus === "submitting"}
                className="w-full bg-portfolio-primary hover:bg-portfolio-primary/90 text-portfolio-primary-foreground font-medium py-3 px-6 focus-visible:ring-2 focus-visible:ring-portfolio-primary focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-background"
                data-testid="button-submit-form"
              >
                {formStatus === "submitting" ? "Sending..." : "Send Message"}
                <Mail className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="fade-in space-y-8">
            <div>
              <h3
                className="text-xl font-semibold mb-4"
                data-testid="contact-info-title"
              >
                Get in touch
              </h3>
              <p
                className="text-portfolio-muted-foreground"
                data-testid="contact-info-description"
              >
                I&apos;m always interested in new opportunities and exciting
                projects. Whether you have a question or just want to say hi,
                feel free to reach out!
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="text-portfolio-primary text-lg" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-portfolio-foreground hover:text-portfolio-primary transition-colors duration-200"
                  data-testid="link-email"
                >
                  {CONTACT.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-portfolio-primary text-lg" />
                <a
                  href={`tel:${CONTACT.phone.replace(/\D/g, "")}`}
                  className="text-portfolio-foreground hover:text-portfolio-primary transition-colors duration-200"
                  data-testid="link-phone"
                >
                  {CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-portfolio-primary text-lg" />
                <span className="text-portfolio-foreground" data-testid="text-location">
                  {CONTACT.location}
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4" data-testid="social-title">
                Follow me
              </h3>
              <div className="flex space-x-4">
                <a
                  href={CONTACT.github}
                  className="w-10 h-10 bg-portfolio-muted hover:bg-portfolio-primary text-portfolio-muted-foreground hover:text-portfolio-primary-foreground rounded-lg flex items-center justify-center transition-all duration-200 focus-visible:ring-2 focus-visible:ring-portfolio-primary focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-background"
                  data-testid="link-github"
                  aria-label="GitHub profile"
                >
                  <Github className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href={CONTACT.linkedin}
                  className="w-10 h-10 bg-portfolio-muted hover:bg-portfolio-primary text-portfolio-muted-foreground hover:text-portfolio-primary-foreground rounded-lg flex items-center justify-center transition-all duration-200 focus-visible:ring-2 focus-visible:ring-portfolio-primary focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-background"
                  data-testid="link-linkedin"
                  aria-label="LinkedIn profile"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href={CONTACT.twitter}
                  className="w-10 h-10 bg-portfolio-muted hover:bg-portfolio-primary text-portfolio-muted-foreground hover:text-portfolio-primary-foreground rounded-lg flex items-center justify-center transition-all duration-200 focus-visible:ring-2 focus-visible:ring-portfolio-primary focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-background"
                  data-testid="link-twitter"
                  aria-label="Twitter profile"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href={CONTACT.instagram}
                  className="w-10 h-10 bg-portfolio-muted hover:bg-portfolio-primary text-portfolio-muted-foreground hover:text-portfolio-primary-foreground rounded-lg flex items-center justify-center transition-all duration-200 focus-visible:ring-2 focus-visible:ring-portfolio-primary focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-background"
                  data-testid="link-instagram"
                  aria-label="Instagram profile"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.987 11.988 11.987s11.987-5.369 11.987-11.987C24.014 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.295C4.198 14.553 3.5 13.26 3.5 11.987c0-1.297.698-2.566 1.626-3.706.875-.805 2.026-1.295 3.323-1.295s2.448.49 3.323 1.295c.928 1.14 1.626 2.409 1.626 3.706 0 1.273-.698 2.566-1.626 3.706-.875.805-2.026 1.295-3.323 1.295zm7.068 0c-1.297 0-2.448-.49-3.323-1.295-.928-1.14-1.626-2.433-1.626-3.706 0-1.297.698-2.566 1.626-3.706.875-.805 2.026-1.295 3.323-1.295s2.448.49 3.323 1.295c.928 1.14 1.626 2.409 1.626 3.706 0 1.273-.698 2.566-1.626 3.706-.875.805-2.026 1.295-3.323 1.295z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-8 mt-16 border-t border-portfolio-border">
          <div className="text-center">
            <p className="text-portfolio-muted-foreground" data-testid="footer-text">
              © 2026 Mathew Rohit Thomson. All rights reserved. Built with ❤️
              and modern web technologies.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}