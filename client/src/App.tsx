// client/src/App.tsx
import { Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Portfolio from "@/pages/portfolio";
import NotFound from "@/pages/not-found";
import { useState } from "react";
import SubtleNetworkCursor from "@/components/subtlenetworkcursor";
import MLNetworkBackground from "@/components/mlnetworkbackground";


// Hash location for GitHub Pages
function HashLocationRouter({ children }: { children: React.ReactNode }) {
  // A simple custom hash location hook
  const [hash, setHash] = useState(() => window.location.hash || "#/");

  const navigate = (to: string) => {
    window.location.hash = to;
    setHash(to);
  };

  const location = hash.replace(/^#/, "") || "/";

  return <Router location={location} onNavigate={navigate}>{children}</Router>;
}

function AppRouter() {
  return (
    <HashLocationRouter>
      {/* Only the Portfolio route */}
      <Portfolio path="/" />
      {/* Remove NotFound entirely */}
    </HashLocationRouter>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppRouter />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
