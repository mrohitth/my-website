import { Router, Route } from "wouter"
import { useHashLocation } from "wouter/use-hash-location"
import { queryClient } from "./lib/queryClient"
import { QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import Portfolio from "@/pages/portfolio"

function AppRouter() {
  return (
    <Router hook={useHashLocation}>
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