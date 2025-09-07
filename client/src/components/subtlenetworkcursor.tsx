import React, { useRef, useEffect } from "react";

const SubtleNetworkCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    type Node = { x: number; y: number; vx: number; vy: number; life: number };
    const nodes: Node[] = [];

    const maxNodes = 5; // very few nodes for subtlety

    const addNode = (x: number, y: number) => {
      nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.2, // slower movement
        vy: (Math.random() - 0.5) * 0.2,
        life: 60, // frames before disappearing
      });
      if (nodes.length > maxNodes) nodes.shift();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.life--;

        // Draw node
        ctx.fillStyle = `rgba(0, 255, 255, ${0.2 + 0.1 * n.life / 60})`; // very soft cyan
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3, 0, Math.PI * 2); // tiny node
        ctx.fill();

        // Draw connecting line to previous node
        if (i > 0) {
          const prev = nodes[i - 1];
          ctx.strokeStyle = `rgba(0, 255, 255, 0.1)`; // very faint line
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(prev.x, prev.y);
          ctx.stroke();
        }
      }

      // Remove dead nodes
      while (nodes.length && nodes[0].life <= 0) {
        nodes.shift();
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

export default SubtleNetworkCursor;
