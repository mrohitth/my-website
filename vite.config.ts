import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  base: "/my-website/",
  build: {
    outDir: path.resolve(import.meta.dirname, "client", "dist-frontend"),
    emptyOutDir: true,
    target: "es2020",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "vendor-react";
            if (id.includes("framer-motion")) return "vendor-framer";
            if (id.includes("gsap")) return "vendor-gsap";
            if (id.includes("recharts")) return "vendor-charts";
            if (id.includes("@radix-ui")) return "vendor-radix";
            if (id.includes("d3") || id.includes("victory") || id.includes("chart.js") || id.includes("chartjs")) return "vendor-charts";
          }
          // Sandbox is lazy — split to its own chunk
          if (id.includes("DataPlatformSandbox") || id.includes("sandbox") && id.includes("simulations")) {
            return "vendor-sandbox";
          }
        },
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});