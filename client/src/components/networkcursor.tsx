import React, { useRef, useEffect } from "react";

const NetworkCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];

    const addNode = (x: number, y: number) => {
      nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
      if (nodes.length > 10) nodes.shift(); // Limit number of nodes
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        ctx.fillStyle = "#0ff";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw lines to previous nodes
        if (i > 0) {
          const prev = nodes[i - 1];
          ctx.strokeStyle = "rgba(0, 255, 255, 0.3)";
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(prev.x, prev.y);
          ctx.stroke();
        }
      }

      requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      addNode(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999 }} />;
};

export default NetworkCursor;
