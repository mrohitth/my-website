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
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-framer": ["framer-motion"],
          "vendor-gsap": ["gsap"],
          "vendor-charts": ["recharts"],
          "vendor-radix": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-toast",
          ],
          sandbox: [
            path.resolve(
              import.meta.dirname,
              "client",
              "src",
              "components",
              "simulations",
              "DataPlatformSandbox"
            ),
          ],
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