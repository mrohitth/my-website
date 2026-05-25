// client/src/App.tsx
import { Router, Route } from "wouter"
import { queryClient } from "./lib/queryClient"
import { QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import Portfolio from "@/pages/portfolio"

// Simple router without hash location for Replit
function AppRouter() {
  return (
    <Router>
      <Route path="/" component={Portfolio} />
    </Router>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppRouter />
      </TooltipProvider>
    </QueryClientProvider>
  )
}