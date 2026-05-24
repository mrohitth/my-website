/**
 * Theme constants — all chart and visualization colors.
 * References CSS custom properties from index.css so dark/light mode
 * variants can be toggled by swapping the CSS variable values.
 */

export const CHART_COLORS = {
  primary: "#3b82f6",    // blue-500 — matches --portfolio-primary
  success: "#22c55e",   // green-500
  danger: "#ef4444",     // red-500
  warning: "#f59e0b",    // amber-500
  secondary: "#64748b",  // slate-500
  muted: "#94a3b8",      // slate-400
  grid: "#1e293b",       // slate-800 — subtle grid lines
};

export const METRIC_COLORS = {
  iops: ["#3b82f6", "#60a5fa"],      // blue spectrum
  success: ["#22c55e", "#4ade80"],    // green spectrum
  danger: ["#ef4444", "#f87171"],     // red spectrum
  warning: ["#f59e0b", "#fbbf24"],    // amber spectrum
  secondary: ["#64748b", "#94a3b8"],  // slate spectrum
  neutral: ["#1e293b", "#334155"],     // dark slate
};

// SandBox tab accent colors (match the 4 tabs)
export const TAB_COLORS = {
  cdc: "#3b82f6",        // blue — PostgreSQL CDC
  batch: "#06b6d4",      // cyan — dbt + Airflow
  observability: "#22c55e", // green — data observability
  schemaDesigner: "#a855f7", // purple — schema designer
} as const;

// Gradient definitions (for CSS class use)
export const GRADIENTS = {
  heroName: "linear-gradient(135deg, hsl(210 100% 60%), hsl(260 100% 70%))",
  cardGlow: "linear-gradient(135deg, hsl(210 100% 60% / 0.1), hsl(260 100% 70% / 0.05))",
};
