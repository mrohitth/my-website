import React, { useEffect } from "react";

const ParticleCursor: React.FC = () => {
  useEffect(() => {
    const particles: HTMLDivElement[] = [];

    const createParticle = (x: number, y: number) => {
      const particle = document.createElement("div");
      particle.style.position = "fixed";
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.width = "5px";
      particle.style.height = "5px";
      particle.style.borderRadius = "50%";
      particle.style.backgroundColor = "#0ff"; // Neon data point color
      particle.style.pointerEvents = "none";
      particle.style.opacity = "0.5";
      particle.style.transition = "all 0.3s ease";
      document.body.appendChild(particle);

      particles.push(particle);

      setTimeout(() => {
        particle.style.opacity = "0";
        setTimeout(() => {
          document.body.removeChild(particle);
          particles.shift();
        }, 300);
      }, 100);
    };

    const handleMouseMove = (e: MouseEvent) => {
      createParticle(e.clientX, e.clientY);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null; // This component doesn’t render anything itself
};

export default ParticleCursor;