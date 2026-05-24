"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  ReferenceLine,
  Cell,
  ComposedChart,
} from "recharts";
import { cn } from "@/lib/utils";
import {
  Database,
  Zap,
  Activity,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Layers,
  ArrowDown,
  ArrowRight,
  Box,
  GitBranch,
  FlaskConical,
  Clock,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  Bell,
  Webhook,
  Eye,
  EyeOff,
  Cloud,
} from "lucide-react";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type PipelineMode = "procedural" | "setbased";
type QualityGate = "silent" | "strict";
type AnomalyType = "normal" | "trough" | "spike";
type DetectionMode = "static" | "seasonal";

interface BatchRow {
  id: string;
  stage: string;
  rows: number;
  status: "pending" | "running" | "done" | "failed";
}

interface AnomalyAlert {
  id: string;
  timestamp: number;
  severity: "info" | "warn" | "critical";
  message: string;
  metric: string;
  value: number;
  threshold: number;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function md5(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(8, "0");
}

function generateFingerprint(alert: Omit<AnomalyAlert, "id">): string {
  const payload = `${alert.timestamp}-${alert.metric}-${alert.value}-${alert.threshold}`;
  return md5(payload);
}

function formatTimestamp(ts: number): string {
  return new Date(ts).toISOString().replace("T", " ").substring(0, 19);
}

// ============================================================================
// CHART COLORS & THEME
// ============================================================================

const CHART_COLORS = {
  primary: "#3b82f6",
  secondary: "#06b6d4",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
  muted: "#64748b",
  grid: "#1e293b",
  bg: "#0f172a",
};

const METRIC_COLORS = {
  iops: ["#3b82f6", "#60a5fa"],
  cteloop: ["#ef4444", "#f87171"],
  setbased: ["#22c55e", "#4ade80"],
};

// ============================================================================
// SHARED UI COMPONENTS
// ============================================================================

interface ToggleSwitchProps {
  label: string;
  description: string;
  optionA: string;
  optionB: string;
  value: boolean;
  onChange: (val: boolean) => void;
  accentColor?: string;
}

function ToggleSwitch({
  label,
  description,
  optionA,
  optionB,
  value,
  onChange,
  accentColor = CHART_COLORS.primary,
}: ToggleSwitchProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-100">{label}</p>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(false)}
          className={cn(
            "flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200",
            !value
              ? "text-white shadow-sm"
              : "bg-slate-700/50 text-slate-400 hover:bg-slate-700",
          )}
          style={!value ? { backgroundColor: accentColor } : undefined}
        >
          {optionA}
        </button>
        <button
          onClick={() => onChange(true)}
          className={cn(
            "flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200",
            value
              ? "text-white shadow-sm"
              : "bg-slate-700/50 text-slate-400 hover:bg-slate-700",
          )}
          style={value ? { backgroundColor: accentColor } : undefined}
        >
          {optionB}
        </button>
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "stable";
  icon: React.ReactNode;
  highlight?: boolean;
  color?: string;
}

function MetricCard({ label, value, unit, trend, icon, highlight, color }: MetricCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-300",
        highlight
          ? "border-slate-500/50 bg-slate-800/60 shadow-lg shadow-slate-900/50"
          : "border-slate-700/30 bg-slate-800/20",
      )}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: `${color}20` }}>
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-slate-400">{label}</span>
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-slate-100" style={{ color: highlight ? color : undefined }}>
            {value}
          </span>
          {unit && <span className="text-xs text-slate-500">{unit}</span>}
          {trend && (
            <span className="ml-1">
              {trend === "up" && <TrendingUp className="h-3 w-3 text-green-400" />}
              {trend === "down" && <TrendingDown className="h-3 w-3 text-red-400" />}
              {trend === "stable" && <Activity className="h-3 w-3 text-slate-400" />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TAB NAVIGATION
// ============================================================================

interface TabButtonProps {
  id: number;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  color: string;
}

function TabButton({ id, label, icon, active, onClick, color }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300",
        active
          ? "text-white shadow-lg"
          : "bg-slate-800/40 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200",
      )}
      style={active ? { backgroundColor: color, boxShadow: `0 4px 20px ${color}40` } : undefined}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
      <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-xs">{id + 1}</span>
    </button>
  );
}

// ============================================================================
// VIRTUAL S3 DROPZONE & FILE CARDS
// ============================================================================

// ============================================================================
// TAB 1: CDC PIPELINE SIMULATOR
// ============================================================================

function CDCpipelineSimulator() {
  const [pipelineMode, setPipelineMode] = useState<PipelineMode>("setbased");
  const [cdcEvaluated, setCdcEvaluated] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; delay: number; type: "row" | "bulk" }>>([]);
  const [sourceFlash, setSourceFlash] = useState(false);
  const [flowState, setFlowState] = useState<"idle" | "flowing" | "done">("idle");
  const [injecting, setInjecting] = useState(false);
  const [batchSize] = useState(10000);

  const [metricHistory, setMetricHistory] = useState<
    Array<{ batch: number; iops: number; mode: string }>
  >(() => {
    const initial = [];
    for (let i = 0; i < 12; i++) {
      initial.push({ batch: i, iops: 2, mode: "setbased" });
    }
    return initial;
  });

  const [eventStream, setEventStream] = useState<
    Array<{ id: number; type: "INSERT" | "UPDATE" | "DELETE"; rows: number; ts: number }>
  >([]);
  const [metrics, setMetrics] = useState({ totalBatches: 0, totalIOPS: 2, peakIOPS: 2 });

  const streamIdRef = useRef(0);



  const handleInject = useCallback(() => {
    if (!cdcEvaluated) {
      // Trigger with current mode
      setCdcEvaluated(true);
      setFlowState("flowing");
    }
    setInjecting(true);

    const newEvents = Array.from({ length: Math.min(batchSize, 50) }, (_, i) => ({
      id: ++streamIdRef.current,
      type: (["INSERT", "UPDATE", "DELETE"] as const)[Math.floor(Math.random() * 3)],
      rows: Math.floor(Math.random() * 100) + 1,
      ts: Date.now(),
    }));

    setEventStream((prev) => [...prev.slice(-30), ...newEvents]);

    const newIops = pipelineMode === "procedural" ? 30000 : 2;

    setMetrics((prev) => ({
      totalBatches: prev.totalBatches + 1,
      totalIOPS: newIops,
      peakIOPS: Math.max(prev.peakIOPS, newIops),
    }));

    setMetricHistory((prev) => {
      const next = [...prev.slice(-11), { batch: prev.length, iops: newIops, mode: pipelineMode }];
      return next;
    });

    setTimeout(() => setInjecting(false), 600);

    setSourceFlash(pipelineMode === "procedural");

    if (pipelineMode === "procedural") {
      const rowParticles = Array.from({ length: 10 }, (_, i) => ({
        id: Date.now() + i,
        delay: i * 120,
        type: "row" as const,
      }));
      setParticles(rowParticles);
      setTimeout(() => {
        setParticles([]);
        setSourceFlash(false);
        setFlowState("done");
      }, 1200 + 10 * 120);
    } else {
      const bulkParticles = [{ id: Date.now(), delay: 0, type: "bulk" as const }];
      setParticles(bulkParticles);
      setTimeout(() => {
        setParticles([]);
        setFlowState("done");
      }, 800);
    }
  }, [pipelineMode, batchSize, cdcEvaluated]);

  const chartData = useMemo(
    () =>
      metricHistory.map((m, i) => ({
        name: `B${i + 1}`,
        "Set-Based CTE": m.mode === "setbased" ? m.iops : 0,
        "Procedural 3N": m.mode === "procedural" ? m.iops : 0,
      })),
    [metricHistory],
  );

  const isIdle = !cdcEvaluated;

  return (
    <div className="flex flex-col gap-6">
      {/* Architecture Header */}
      <div className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-5">
        <p className="mb-4 text-sm italic text-slate-300 leading-relaxed">
          Contrasting imperative row-by-row data replication with set-based bulk processing. This simulation demonstrates how switching from procedural loops to bulk CTEs saves live databases from connection exhaustion.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-400">Procedural Loop Stats</p>
            <div className="space-y-1 font-mono text-xs text-slate-300">
              <p><span className="text-slate-500">Query Complexity:</span> 3N queries per batch</p>
              <p><span className="text-slate-500">Database IOPS:</span> 30,000+ hits (Max Volume)</p>
              <p><span className="text-slate-500">Est. Compute Time:</span> 42.4s</p>
              <p><span className="text-red-400 font-semibold">Status: Connection Saturated</span></p>
            </div>
          </div>
          <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-400">Bulk CTE Stats</p>
            <div className="space-y-1 font-mono text-xs text-slate-300">
              <p><span className="text-slate-500">Query Complexity:</span> Constant 2 queries total</p>
              <p><span className="text-slate-500">Database IOPS:</span> Flat 2 hits (O(1) Memory)</p>
              <p><span className="text-slate-500">Est. Compute Time:</span> 0.18s</p>
              <p><span className="text-green-400 font-semibold">Status: Ultra-Efficient</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ToggleSwitch
          label="Execution Strategy"
          description="Switch between row-by-row procedural vs. bulk set-based operations"
          optionA="Procedural 3N Loops"
          optionB="Set-Based Bulk CTE"
          value={pipelineMode === "setbased"}
          onChange={(v) => setPipelineMode(v ? "setbased" : "procedural")}
          accentColor={pipelineMode === "setbased" ? CHART_COLORS.success : CHART_COLORS.danger}
        />
        <div className="flex flex-col gap-2 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
          <div>
            <p className="text-sm font-semibold text-slate-100">Batch Configuration</p>
            <p className="text-xs text-slate-400">Incoming change event batch size</p>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-slate-900/60 px-4 py-2">
            <span className="text-xs text-slate-400">Batch Size</span>
            <span className="font-mono text-sm font-bold text-cyan-400">{batchSize.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Inject Button */}
      <motion.button
        onClick={handleInject}
        disabled={injecting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300",
          pipelineMode === "setbased"
            ? "bg-green-500 hover:bg-green-400 shadow-lg shadow-green-500/30"
            : "bg-red-500 hover:bg-red-400 shadow-lg shadow-red-500/30",
          injecting && "opacity-50 cursor-not-allowed",
        )}
      >
        {injecting ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Activity className="h-4 w-4" />
          </motion.div>
        ) : (
          <Zap className="h-4 w-4" />
        )}
        {injecting ? "Injecting..." : "Inject Change Event Batch"}
      </motion.button>

      {/* Live Pipeline Flow Visualizer */}
      <div className="mb-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Source DB Node */}
        <div
          className={cn(
            "flex flex-col items-center gap-1 rounded-xl border-2 px-5 py-3 transition-all duration-300 min-w-[100px]",
            isIdle
              ? "border-slate-600 bg-slate-800/40"
              : sourceFlash && pipelineMode === "procedural"
                ? "border-red-500 bg-red-500/20 shadow-lg shadow-red-500/40 animate-pulse"
                : pipelineMode === "setbased"
                  ? "border-green-500/60 bg-green-500/10"
                  : "border-slate-600 bg-slate-800/40",
          )}
        >
          <Database className={cn("h-5 w-5", !isIdle && sourceFlash && pipelineMode === "procedural" ? "text-red-400" : "text-slate-400")} />
          <span className="text-xs font-medium text-slate-300">Source DB</span>
          {!isIdle && sourceFlash && pipelineMode === "procedural" && (
            <span className="text-xs text-red-400 animate-pulse font-semibold">SATURATED</span>
          )}
          {!isIdle && pipelineMode === "setbased" && (
            <span className="text-xs text-green-400">Bulk Ready</span>
          )}
        </div>

        {/* Connector Path */}
        <div className="relative flex items-center gap-2">
          <div
            className={cn(
              "h-0.5 w-16 sm:w-24 rounded transition-colors duration-300",
              !isIdle && sourceFlash && pipelineMode === "procedural" ? "bg-red-500" : "bg-slate-700",
            )}
          />
          <div className="flex gap-1">
            {particles.map((p) =>
              p.type === "bulk" ? (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -20, scale: 0.5 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: p.delay / 1000 }}
                  className="h-4 w-8 rounded bg-green-400 shadow-lg shadow-green-400/50"
                />
              ) : (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: [0, 1, 1, 0], x: [0, 40, 60, 80] }}
                  transition={{ delay: p.delay / 1000, duration: 0.5, ease: "easeOut" }}
                  className="h-2 w-2 rounded-full bg-red-400 shadow-md shadow-red-400/50"
                />
              ),
            )}
          </div>
          <ArrowRight className={cn("h-4 w-4 transition-colors duration-300", !isIdle && sourceFlash && pipelineMode === "procedural" ? "text-red-400" : "text-slate-500")} />
        </div>

        {/* Data Warehouse Staging Node */}
        <div
          className={cn(
            "flex flex-col items-center gap-1 rounded-xl border-2 px-5 py-3 transition-all duration-300 min-w-[100px]",
            isIdle
              ? "border-slate-600 bg-slate-800/40"
              : pipelineMode === "setbased"
                ? "border-green-500/60 bg-green-500/10"
                : "border-slate-600 bg-slate-800/40",
          )}
        >
          <Layers className={cn("h-5 w-5", !isIdle && pipelineMode === "setbased" ? "text-green-400" : "text-slate-400")} />
          <span className="text-xs font-medium text-slate-300">Warehouse Staging</span>
          {!isIdle && pipelineMode === "setbased" && (
            <span className="text-xs text-green-400">Bulk Payload</span>
          )}
          {!isIdle && pipelineMode === "procedural" && (
            <span className="text-xs text-slate-500">N× Query</span>
          )}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <MetricCard
          label="Batches Processed"
          value={cdcEvaluated ? metrics.totalBatches : "—"}
          icon={<Layers className="h-4 w-4" />}
          color={CHART_COLORS.primary}
          highlight={cdcEvaluated}
        />
        <MetricCard
          label="Current IOPS"
          value={cdcEvaluated ? metrics.totalIOPS.toLocaleString() : "—"}
          unit={cdcEvaluated ? "ops" : undefined}
          trend={cdcEvaluated && metrics.totalIOPS > 1000 ? "up" : cdcEvaluated ? "stable" : undefined}
          icon={<Activity className="h-4 w-4" />}
          color={cdcEvaluated && metrics.totalIOPS > 1000 ? CHART_COLORS.danger : CHART_COLORS.success}
          highlight={cdcEvaluated && metrics.totalIOPS > 1000}
        />
        <MetricCard
          label="Peak IOPS"
          value={cdcEvaluated ? metrics.peakIOPS.toLocaleString() : "—"}
          unit={cdcEvaluated ? "ops" : undefined}
          trend={cdcEvaluated && metrics.peakIOPS > 1000 ? "up" : cdcEvaluated ? "stable" : undefined}
          icon={<TrendingUp className="h-4 w-4" />}
          color={CHART_COLORS.warning}
        />
      </div>

      {/* IOPS Comparison Chart */}
      <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
        <p className="mb-3 text-sm font-semibold text-slate-200">Database IOPS Comparison</p>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
            <XAxis dataKey="name" tick={{ fill: CHART_COLORS.muted, fontSize: 10 }} />
            <YAxis tick={{ fill: CHART_COLORS.muted, fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="Set-Based CTE" fill={CHART_COLORS.success} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Procedural 3N" fill={CHART_COLORS.danger} radius={[4, 4, 0, 0]} />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="mt-2 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs text-slate-400">Set-Based CTE (~2 IOPS)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-xs text-slate-400">Procedural 3N (~30,000 IOPS)</span>
          </div>
        </div>
      </div>

      {/* Live Event Stream */}
      <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
        <p className="mb-3 text-sm font-semibold text-slate-200">Live Change Event Stream</p>
        <div className="flex h-32 flex-col gap-1 overflow-y-auto">
          <AnimatePresence>
            {eventStream.slice(-12).map((evt) => (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 rounded-lg bg-slate-900/60 px-3 py-1.5"
              >
                <span
                  className={cn(
                    "rounded px-2 py-0.5 text-xs font-bold",
                    evt.type === "INSERT" && "bg-green-500/20 text-green-400",
                    evt.type === "UPDATE" && "bg-yellow-500/20 text-yellow-400",
                    evt.type === "DELETE" && "bg-red-500/20 text-red-400",
                  )}
                >
                  {evt.type}
                </span>
                <span className="font-mono text-xs text-slate-400">#{evt.id}</span>
                <span className="font-mono text-xs text-cyan-400">+{evt.rows} rows</span>
                <span className="ml-auto text-xs text-slate-500">{formatTimestamp(evt.ts)}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {eventStream.length === 0 && (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-slate-500">No events yet. Drop a data file or click "Inject".</p>
            </div>
          )}
        </div>
      </div>

      {/* Mode Warning */}
      <AnimatePresence>
        {cdcEvaluated && pipelineMode === "procedural" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3"
          >
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <div>
              <p className="text-sm font-semibold text-red-300">Performance Warning</p>
              <p className="text-xs text-red-400/70">
                Procedural mode issues 3N database round-trips per batch. This creates ~30,000 IOPS and will degrade
                source database performance significantly.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// TAB 2: BATCH ANALYTICS SIMULATOR
// ============================================================================

const DAG_STAGES = [
  { id: "stg_events", label: "stg_events", description: "Raw event ingestion", icon: Box },
  { id: "dim_users", label: "dim_users", description: "User dimension modeling", icon: Layers },
  { id: "fact_orders", label: "fact_orders", description: "Order fact aggregation", icon: GitBranch },
  { id: "dbt_tests", label: "run_dbt_tests", description: "Data quality validation", icon: FlaskConical },
];

const QUALITY_SCENARIOS = [
  { id: "clean", label: "Clean Dataset", description: "Normal data without anomalies" },
  { id: "duplicate_flood", label: "Duplicate Event Flood", description: "Events are duplicated upstream" },
];

function BatchAnalyticsSimulator() {
  const [qualityGate, setQualityGate] = useState<QualityGate>("strict");
  const [executing, setExecuting] = useState(false);
  const [scenario, setScenario] = useState("clean");
  const [batchEvaluated, setBatchEvaluated] = useState(false);
  const [batchRows, setBatchRows] = useState(0);
  const [dagState, setDagState] = useState<Record<string, BatchRow>>(() =>
    DAG_STAGES.reduce(
      (acc, stage) => ({
        ...acc,
        [stage.id]: { id: stage.id, stage: stage.label, rows: 0, status: "pending" },
      }),
      {} as Record<string, BatchRow>,
    ),
  );
  const [alertLog, setAlertLog] = useState<
    Array<{ type: "success" | "warning" | "error"; message: string; ts: number }>
  >([]);



  const handleExecute = useCallback(() => {
    setBatchEvaluated(false);
    setExecuting(true);
    setAlertLog([]);
    const baseRows = scenario === "duplicate_flood" ? 5000 : 2000;
    const corruptedRows = scenario === "duplicate_flood" ? baseRows * 2 : baseRows;

    const stages = [
      { id: "stg_events", rows: baseRows, duration: 400 },
      { id: "dim_users", rows: Math.floor(baseRows * 0.7), duration: 500 },
      { id: "fact_orders", rows: qualityGate === "silent" ? corruptedRows : baseRows, duration: 600 },
      { id: "dbt_tests", rows: 0, duration: 700 },
    ];

    let elapsed = 0;
    stages.forEach((stage, idx) => {
      setTimeout(() => {
        setDagState((prev) => ({
          ...prev,
          [stage.id]: { ...prev[stage.id], rows: stage.rows, status: "running" },
        }));

        setTimeout(() => {
          const isLast = idx === stages.length - 1;

          if (isLast) {
            if (qualityGate === "strict" && scenario === "duplicate_flood") {
              setDagState((prev) => ({
                ...prev,
                [stage.id]: { ...prev[stage.id], rows: 0, status: "failed" },
              }));
              setAlertLog((prev) => [
                ...prev,
                {
                  type: "error",
                  message: `[dbt] ERROR: duplicate_events test failed — found ${corruptedRows - baseRows} extra rows vs. source (${baseRows}). Trigger rule "all_success" aborted pipeline.`,
                  ts: Date.now(),
                },
              ]);
              setBatchRows(corruptedRows);
            } else if (qualityGate === "silent") {
              setDagState((prev) => ({
                ...prev,
                [stage.id]: { ...prev[stage.id], rows: corruptedRows, status: "done" },
              }));
              setAlertLog((prev) => [
                ...prev,
                {
                  type: "warning",
                  message: `[Silent Swallow] Pipeline completed with ${corruptedRows} rows. ${corruptedRows - baseRows} duplicate rows absorbed silently — downstream metrics will be corrupted.`,
                  ts: Date.now(),
                },
              ]);
              setBatchRows(corruptedRows);
            } else {
              setDagState((prev) => ({
                ...prev,
                [stage.id]: { ...prev[stage.id], rows: baseRows, status: "done" },
              }));
              setAlertLog((prev) => [
                ...prev,
                {
                  type: "success",
                  message: `[dbt] All tests passed. Pipeline completed successfully with ${baseRows} validated rows.`,
                  ts: Date.now(),
                },
              ]);
              setBatchRows(baseRows);
            }
            setExecuting(false);
            setBatchEvaluated(true);
          } else {
            setDagState((prev) => ({
              ...prev,
              [stage.id]: { ...prev[stage.id], rows: stage.rows, status: "done" },
            }));
          }
        }, 300);
      }, elapsed);
      elapsed += stage.duration;
    });
  }, [qualityGate, scenario]);

  const isIdle = !batchEvaluated;

  return (
    <div className="flex flex-col gap-6">
      {/* Architecture Header */}
      <div className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-5">
        <p className="mb-4 text-sm italic text-slate-300 leading-relaxed">
          Simulating data quality defense mechanics inside an Airflow DAG. This demonstrates how a silent pipeline allows duplicate event floods to corrupt production warehouses versus how an isolated testing gate blocks data pollution.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-400">Silent Swallow Stats</p>
            <div className="space-y-1 font-mono text-xs text-slate-300">
              <p><span className="text-slate-500">Downstream Integrity:</span> CORRUPTED</p>
              <p><span className="text-slate-500">Data Leakage:</span> 100% of duplicates written</p>
              <p><span className="text-red-400 font-semibold">Recovery Cost: Manual Warehouse Backfill Required</span></p>
            </div>
          </div>
          <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-400">Strict Isolation Stats</p>
            <div className="space-y-1 font-mono text-xs text-slate-300">
              <p><span className="text-slate-500">Downstream Integrity:</span> 100% PROTECTED</p>
              <p><span className="text-slate-500">Data Leakage:</span> 0% (Circuit Breaker Tripped)</p>
              <p><span className="text-green-400 font-semibold">Recovery Cost: $0 (Automated Pipeline Freeze)</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ToggleSwitch
          label="Data Quality Gate"
          description="Defines how pipeline handles quality failures"
          optionA="Silent Swallow"
          optionB="Strict Isolation"
          value={qualityGate === "strict"}
          onChange={(v) => setQualityGate(v ? "strict" : "silent")}
          accentColor={qualityGate === "strict" ? CHART_COLORS.success : CHART_COLORS.warning}
        />
        <div className="flex flex-col gap-2 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
          <div>
            <p className="text-sm font-semibold text-slate-100">Anomaly Scenario</p>
            <p className="text-xs text-slate-400">Data condition injected into batch</p>
          </div>
          <div className="flex gap-2">
            {QUALITY_SCENARIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => setScenario(s.id)}
                className={cn(
                  "flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200",
                  scenario === s.id
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                    : "bg-slate-700/50 text-slate-400 border border-slate-700",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Execute Button */}
      <motion.button
        onClick={handleExecute}
        disabled={executing}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300",
          "bg-cyan-500 hover:bg-cyan-400 shadow-lg shadow-cyan-500/30",
          executing && "opacity-50 cursor-not-allowed",
        )}
      >
        {executing ? (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
            <Activity className="h-4 w-4" />
          </motion.div>
        ) : (
          <Zap className="h-4 w-4" />
        )}
        {executing ? "Executing Batch..." : "Execute Batch Run"}
      </motion.button>

      {/* ── Traffic Light DAG Flow Visualizer ─────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-0 rounded-xl border border-slate-700/40 bg-slate-900/50 px-4 py-3">
        {/* stg_events */}
        <div className="flex flex-col items-center gap-1">
          <motion.div
            animate={
              executing && scenario === "clean"
                ? { borderColor: ["#22c55e"], boxShadow: ["0 0 12px #22c55e"] }
                : executing && scenario === "duplicate_flood" && qualityGate === "silent"
                  ? { borderColor: ["#ef4444", "#7f1d1d", "#ef4444"], boxShadow: ["0 0 12px #ef4444"] }
                  : { borderColor: (isIdle ? "#64748b" : executing ? "#22c55e" : "#64748b"), boxShadow: ["0 0 0px transparent"] }
            }
            transition={{ duration: 0.3, repeat: executing && scenario !== "clean" ? Infinity : 0 }}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl border-2 transition-all duration-300",
              isIdle
                ? "border-slate-600 bg-slate-800/30"
                : executing && scenario === "clean"
                  ? "border-green-500/70 bg-green-500/10"
                  : "border-red-500/70 bg-red-500/10"
            )}
          >
            <Box className={cn("h-5 w-5", isIdle ? "text-slate-400" : executing && scenario === "clean" ? "text-green-400" : "text-red-400")} />
          </motion.div>
          <span className="text-[10px] font-semibold text-slate-300">stg_events</span>
          <span className="text-[9px] text-slate-500">Raw</span>
        </div>

        {/* Arrow 1 */}
        <div className="relative mx-1 flex items-center justify-center sm:mx-2">
          <motion.div
            animate={
              isIdle
                ? { scaleX: 0, backgroundColor: ["#64748b"] }
                : executing && scenario === "clean"
                  ? { scaleX: [0, 1], backgroundColor: ["#22c55e"] }
                  : executing && scenario === "duplicate_flood" && qualityGate === "silent"
                    ? { scaleX: [0, 1], backgroundColor: ["#ef4444"] }
                    : { scaleX: isIdle ? 0 : 1, backgroundColor: ["#64748b"] }
            }
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-0.5 w-6 sm:w-10 rounded-full origin-left"
          />
          <motion.div
            animate={
              executing && qualityGate === "strict" && scenario === "duplicate_flood"
                ? { opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }
                : { opacity: 0 }
            }
            transition={{ duration: 0.3, repeat: Infinity }}
            className="absolute -top-3 rounded bg-red-500/90 px-1.5 py-0.5 text-[8px] font-bold text-white"
          >
            BLOCKED
          </motion.div>
        </div>

        {/* dim_users */}
        <div className="flex flex-col items-center gap-1">
          <motion.div
            animate={
              isIdle
                ? { borderColor: ["#64748b"], boxShadow: ["0 0 0px transparent"] }
                : executing && scenario === "duplicate_flood" && qualityGate === "strict"
                  ? { borderColor: ["#f59e0b"], boxShadow: ["0 0 12px #f59e0b"] }
                  : executing && scenario === "duplicate_flood" && qualityGate === "silent"
                    ? { borderColor: ["#ef4444"], boxShadow: ["0 0 12px #ef4444"] }
                    : { borderColor: ["#64748b"], boxShadow: ["0 0 0px transparent"] }
            }
            transition={{ duration: 0.3 }}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl border-2 transition-all duration-300",
              isIdle
                ? "border-slate-600 bg-slate-800/30"
                : executing && scenario === "duplicate_flood" && qualityGate === "strict"
                  ? "border-yellow-500/70 bg-yellow-500/10"
                  : executing && scenario === "duplicate_flood"
                    ? "border-red-500/70 bg-red-500/10"
                    : "border-slate-600 bg-slate-800/30"
            )}
          >
            <Layers className={cn("h-5 w-5", isIdle ? "text-slate-400" : scenario === "duplicate_flood" && qualityGate === "strict" ? "text-yellow-400" : "text-slate-400")} />
          </motion.div>
          <span className="text-[10px] font-semibold text-slate-300">dim_users</span>
          <span className="text-[9px] text-slate-500">Transform</span>
        </div>

        {/* Arrow 2 */}
        <div className="relative mx-1 flex items-center justify-center sm:mx-2">
          <motion.div
            animate={
              isIdle
                ? { scaleX: 0, backgroundColor: ["#64748b"] }
                : executing && scenario === "clean"
                  ? { scaleX: [0, 1], backgroundColor: ["#22c55e"] }
                  : executing && scenario === "duplicate_flood" && qualityGate === "silent"
                    ? { scaleX: [0, 1], backgroundColor: ["#ef4444"] }
                    : { scaleX: isIdle ? 0 : 1, backgroundColor: ["#64748b"] }
            }
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="h-0.5 w-6 sm:w-10 rounded-full origin-left"
          />
        </div>

        {/* fact_orders */}
        <div className="flex flex-col items-center gap-1">
          <motion.div
            animate={
              isIdle
                ? { borderColor: ["#64748b"], boxShadow: ["0 0 0px transparent"] }
                : executing && scenario === "duplicate_flood" && qualityGate === "silent"
                  ? { borderColor: ["#ef4444", "#7f1d1d"], boxShadow: ["0 0 16px #ef4444"] }
                  : executing && scenario === "duplicate_flood" && qualityGate === "strict"
                    ? { borderColor: ["#f59e0b"], boxShadow: ["0 0 12px #f59e0b"] }
                    : executing && scenario === "clean"
                      ? { borderColor: ["#22c55e"], boxShadow: ["0 0 12px #22c55e"] }
                      : { borderColor: ["#64748b"], boxShadow: ["0 0 0px transparent"] }
            }
            transition={{ duration: 0.3, repeat: executing && scenario === "duplicate_flood" && qualityGate === "silent" ? Infinity : 0 }}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl border-2 transition-all duration-300",
              isIdle
                ? "border-slate-600 bg-slate-800/30"
                : executing && scenario === "duplicate_flood" && qualityGate === "silent"
                  ? "border-red-500/70 bg-red-500/10"
                  : executing && scenario === "duplicate_flood" && qualityGate === "strict"
                    ? "border-yellow-500/70 bg-yellow-500/10"
                    : "border-green-500/70 bg-green-500/10"
            )}
          >
            {executing && scenario === "duplicate_flood" && qualityGate === "silent" ? (
              <XCircle className="h-5 w-5 text-red-400" />
            ) : executing && scenario === "duplicate_flood" && qualityGate === "strict" ? (
              <XCircle className="h-5 w-5 text-yellow-400" />
            ) : (
              <GitBranch className={cn("h-5 w-5", isIdle ? "text-slate-400" : "text-green-400")} />
            )}
          </motion.div>
          <span className="text-[10px] font-semibold text-slate-300">fact_orders</span>
          <span className={cn("text-[9px]", !isIdle && executing && scenario === "duplicate_flood" && qualityGate === "silent" ? "text-red-400 font-bold" : "text-slate-500")}>
            {batchEvaluated && scenario === "duplicate_flood" && qualityGate === "silent" ? "CORRUPTED" : "Aggregated"}
          </span>
        </div>

        {/* Alert badge for Strict + Duplicate */}
        {executing && scenario === "duplicate_flood" && qualityGate === "strict" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ml-3 flex items-center gap-1.5 rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-3 py-1.5"
          >
            <FlaskConical className="h-3.5 w-3.5 text-yellow-400" />
            <span className="text-[9px] font-bold text-yellow-400">dbt_test: Unique Constraint Failed</span>
          </motion.div>
        )}
      </div>

      {/* Row Counter */}
      <div className="grid grid-cols-1 gap-3">
        <MetricCard
          label="Fact Table Row Count"
          value={batchEvaluated && batchRows > 0 ? batchRows.toLocaleString() : "—"}
          icon={<Database className="h-4 w-4" />}
          highlight={batchEvaluated}
          color={CHART_COLORS.secondary}
        />
      </div>

      {/* DAG Visualization */}
      <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
        <p className="mb-4 text-sm font-semibold text-slate-200">Pipeline DAG — dbt + Airflow Orchestration</p>
        <div className="relative flex items-center justify-between gap-2">
          {DAG_STAGES.map((stage, idx) => {
            const state = dagState[stage.id];
            const Icon = stage.icon;
            return (
              <div key={stage.id} className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 1 }}
                  animate={
                    state.status === "running"
                      ? { scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 0.8 } }
                      : state.status === "failed"
                        ? { scale: [1, 0.95, 1] }
                        : {}
                  }
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-all duration-300",
                    isIdle && "border-slate-600 bg-slate-800/40",
                    state.status === "pending" && !isIdle && "border-slate-600 bg-slate-800/40",
                    state.status === "running" && "border-cyan-400 bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/30",
                    state.status === "done" && "border-green-500 bg-green-500/20 text-green-400",
                    state.status === "failed" && "border-red-500 bg-red-500/20 text-red-400 shadow-lg shadow-red-500/30",
                  )}
                >
                  {state.status === "done" ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : state.status === "failed" ? (
                    <XCircle className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </motion.div>
                <p className="mt-2 text-center text-xs font-medium text-slate-300">{stage.label}</p>
                <p className="text-center text-xs text-slate-500">
                  {state.rows > 0 ? `${state.rows.toLocaleString()} rows` : state.status}
                </p>
                {idx < DAG_STAGES.length - 1 && (
                  <div className="pointer-events-none absolute left-1/2 top-6 z-10">
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Alert Log */}
      <div className="flex flex-col gap-2 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
        <p className="text-sm font-semibold text-slate-200">Pipeline Execution Log</p>
        <div className="flex max-h-32 flex-col gap-1 overflow-y-auto">
          {alertLog.map((entry, i) => (
            <div
              key={i}
              className={cn(
                "flex items-start gap-2 rounded-lg px-3 py-2 text-xs font-mono",
                entry.type === "success" && "bg-green-500/10 text-green-400",
                entry.type === "warning" && "bg-yellow-500/10 text-yellow-400",
                entry.type === "error" && "bg-red-500/10 text-red-400",
              )}
            >
              <span className="mt-0.5">
                {entry.type === "success" && <CheckCircle2 className="h-3 w-3" />}
                {entry.type === "warning" && <AlertTriangle className="h-3 w-3" />}
                {entry.type === "error" && <XCircle className="h-3 w-3" />}
              </span>
              <span className="flex-1">{entry.message}</span>
              <span className="text-slate-500">{formatTimestamp(entry.ts)}</span>
            </div>
          ))}
          {alertLog.length === 0 && (
            <p className="py-4 text-center text-sm text-slate-500">No logs yet. Drop a data file above to execute a batch run.</p>
          )}
        </div>
      </div>

      {/* Scenario Warning */}
      <AnimatePresence>
        {batchEvaluated && scenario === "duplicate_flood" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3"
          >
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div>
              <p className="text-sm font-semibold text-yellow-300">Duplicate Event Flood Injected</p>
              <p className="text-xs text-yellow-400/70">
                Upstream system is replicating events. Source has 2,000 rows but pipeline is receiving 4,000. This will
                cause silent data corruption under "Silent Swallow" mode.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// TAB 3: DATA OBSERVABILITY & ANOMALY ENGINE
// ============================================================================

function generateBaselineData(anomalyType: AnomalyType) {
  const data = [];
  for (let h = 0; h < 24; h++) {
    let baseVolume: number;
    let anomalyMagnitude = 0;

    if (h >= 0 && h < 6) {
      baseVolume = 200;
    } else if (h >= 6 && h < 9) {
      baseVolume = 800 + (h - 6) * 300;
    } else if (h >= 9 && h < 12) {
      baseVolume = 1700 + (h - 9) * 200;
    } else if (h >= 12 && h < 14) {
      baseVolume = 2300 + (h - 12) * 100;
    } else if (h >= 14 && h < 18) {
      baseVolume = 2500 - (h - 14) * 200;
    } else if (h >= 18 && h < 21) {
      baseVolume = 1700 - (h - 18) * 400;
    } else {
      baseVolume = 500 - (h - 21) * 100;
    }

    if (anomalyType === "trough" && h >= 2 && h <= 4) {
      anomalyMagnitude = -baseVolume * 0.75;
    } else if (anomalyType === "spike" && h >= 9 && h <= 11) {
      anomalyMagnitude = baseVolume * 1.8;
    } else if (anomalyType === "normal") {
      anomalyMagnitude = (Math.random() - 0.5) * baseVolume * 0.1;
    }

    const actual = Math.max(50, Math.floor(baseVolume + anomalyMagnitude + (Math.random() - 0.5) * baseVolume * 0.05));
    data.push({
      hour: `${h.toString().padStart(2, "0")}:00`,
      baseline: baseVolume,
      actual,
      h,
    });
  }
  return data;
}

function DataObservabilitySimulator() {
  const [anomalyType, setAnomalyType] = useState<AnomalyType>("normal");
  const [detectionMode, setDetectionMode] = useState<DetectionMode>("seasonal");
  const [obsEvaluated, setObsEvaluated] = useState(false);
  const [alerts, setAlerts] = useState<AnomalyAlert[]>([]);
  const [lastAlertFingerprint, setLastAlertFingerprint] = useState<string | null>(null);
  const [runCount, setRunCount] = useState(0);

  const chartData = useMemo(() => generateBaselineData(anomalyType), [anomalyType]);

  const staticThreshold = 3000;
  const hourBaselines: Record<number, { lower: number; upper: number }> = {
    0: { lower: 50, upper: 400 },
    1: { lower: 50, upper: 350 },
    2: { lower: 50, upper: 300 },
    3: { lower: 50, upper: 280 },
    4: { lower: 50, upper: 350 },
    5: { lower: 100, upper: 500 },
    6: { lower: 400, upper: 1200 },
    7: { lower: 800, upper: 2000 },
    8: { lower: 1400, upper: 2800 },
    9: { lower: 1600, upper: 3800 },
    10: { lower: 1800, upper: 4200 },
    11: { lower: 1900, upper: 4000 },
    12: { lower: 2000, upper: 4200 },
    13: { lower: 2100, upper: 4300 },
    14: { lower: 1800, upper: 3800 },
    15: { lower: 1500, upper: 3200 },
    16: { lower: 1200, upper: 2800 },
    17: { lower: 900, upper: 2200 },
    18: { lower: 400, upper: 1200 },
    19: { lower: 200, upper: 800 },
    20: { lower: 150, upper: 600 },
    21: { lower: 100, upper: 500 },
    22: { lower: 80, upper: 450 },
    23: { lower: 60, upper: 400 },
  };



  const handleEvaluate = useCallback(() => {
    const evalData = generateBaselineData(anomalyType);
    const newAlerts: AnomalyAlert[] = [];

    evalData.forEach((point) => {
      let isAnomaly = false;
      let threshold = 0;
      let message = "";

      if (detectionMode === "static") {
        threshold = staticThreshold;
        isAnomaly = point.actual < staticThreshold;
        if (isAnomaly) {
          message = `Volume ${point.actual} below static threshold ${threshold}`;
        }
      } else {
        const baseline = hourBaselines[point.h];
        threshold = baseline?.lower ?? 100;
        isAnomaly = point.actual < baseline.lower;
        if (isAnomaly) {
          message = `Volume ${point.actual} below ${point.h}:00 historical baseline [${baseline.lower}–${baseline.upper}]`;
        }
      }

      if (isAnomaly) {
        const alertSeverity: "critical" | "warn" = point.actual < threshold * 0.5 ? "critical" : "warn";
        const alert: AnomalyAlert = {
          id: `alert-${point.h}-${Date.now()}`,
          timestamp: Date.now(),
          severity: alertSeverity,
          message,
          metric: "data_volume",
          value: point.actual,
          threshold,
        };
        newAlerts.push(alert);
      }
    });

    setAlerts(newAlerts);
    if (newAlerts.length > 0) {
      const fp = generateFingerprint(newAlerts[newAlerts.length - 1]);
      setLastAlertFingerprint(fp);
    }
    setRunCount((c) => c + 1);
    setObsEvaluated(true);
  }, [anomalyType, detectionMode, hourBaselines]);

  const alertRate = chartData.filter((d) => {
    if (detectionMode === "static") return d.actual < staticThreshold;
    const bl = hourBaselines[d.h];
    return bl && d.actual < bl.lower;
  }).length;

  const isIdle = !obsEvaluated;

  return (
    <div className="flex flex-col gap-6">
      {/* Architecture Header */}
      <div className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-5">
        <p className="mb-4 text-sm italic text-slate-300 leading-relaxed">
          Evaluating statistical intelligence in production monitoring. This demonstrates how rigid static tracking rules create catastrophic on-call alert storms during normal off-peak hours versus an hour-of-day seasonal baseline.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-400">Static Threshold Stats</p>
            <div className="space-y-1 font-mono text-xs text-slate-300">
              <p><span className="text-slate-500">False Positive Rate:</span> 84%</p>
              <p><span className="text-slate-500">3 AM Evaluation:</span> Critical False Alarm</p>
              <p><span className="text-red-400 font-semibold">Operational Cost: Severe On-Call Engineer Burnout</span></p>
            </div>
          </div>
          <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-400">Seasonal Baseline Stats</p>
            <div className="space-y-1 font-mono text-xs text-slate-300">
              <p><span className="text-slate-500">False Positive Rate:</span> &lt;1%</p>
              <p><span className="text-slate-500">3 AM Evaluation:</span> Evaluated Safe Against Historical Bucket</p>
              <p><span className="text-green-400 font-semibold">Operational Cost: 0% Noise (Self-Healing Operational Plane)</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
          <div>
            <p className="text-sm font-semibold text-slate-100">Anomaly Injection</p>
            <p className="text-xs text-slate-400">Simulate data volume conditions</p>
          </div>
          <div className="flex flex-col gap-2">
            {(
              [
                { id: "normal", label: "Normal Traffic", desc: "Typical 24-hour pattern" },
                { id: "trough", label: "3 AM Data Trough", desc: "Dramatic night-time drop" },
                { id: "spike", label: "9 AM Spike", desc: "Sudden volume surge" },
              ] as { id: AnomalyType; label: string; desc: string }[]
            ).map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setAnomalyType(opt.id);
                  setAlerts([]);
                }}
                className={cn(
                  "rounded-lg px-3 py-2 text-left text-xs font-medium transition-all duration-200",
                  anomalyType === opt.id
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                    : "bg-slate-700/50 text-slate-400 border border-slate-700",
                )}
              >
                <span className="block font-semibold">{opt.label}</span>
                <span className="text-slate-500">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <ToggleSwitch
          label="Anomaly Detection Logic"
          description="Method used to evaluate violations"
          optionA="Static 3.0 Threshold"
          optionB="Hour-of-Day Seasonal"
          value={detectionMode === "seasonal"}
          onChange={(v) => setDetectionMode(v ? "seasonal" : "static")}
          accentColor={detectionMode === "seasonal" ? CHART_COLORS.success : CHART_COLORS.warning}
        />
      </div>

      {/* Evaluate Button */}
      <motion.button
        onClick={handleEvaluate}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all hover:bg-cyan-400"
      >
        <Eye className="h-4 w-4" />
        Run Anomaly Evaluation
      </motion.button>

      {/* ── System Status Bar ─────────────────────────────────────────────── */}
      <div
        className={cn(
          "flex items-center justify-between rounded-xl border px-5 py-3 transition-all duration-500",
          isIdle
            ? "border-slate-700/50 bg-slate-800/30"
            : alerts.length > 0 && detectionMode === "static"
              ? "border-red-500/60 bg-red-500/10 shadow-lg shadow-red-500/20"
              : alerts.length > 0 && detectionMode === "seasonal"
                ? "border-green-500/60 bg-green-500/10 shadow-lg shadow-green-500/20"
                : "border-green-500/60 bg-green-500/10 shadow-lg shadow-green-500/20",
        )}
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={
              !isIdle && alerts.length > 0 && detectionMode === "static"
                ? { scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.6, repeat: !isIdle && alerts.length > 0 && detectionMode === "static" ? Infinity : 0 }}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg",
              isIdle
                ? "bg-slate-700/50"
                : alerts.length > 0 && detectionMode === "static"
                  ? "bg-red-500/20"
                  : alerts.length > 0 && detectionMode === "seasonal"
                    ? "bg-green-500/20"
                    : "bg-green-500/20",
            )}
          >
            {isIdle ? (
              <Activity className="h-5 w-5 text-slate-400" />
            ) : alerts.length > 0 && detectionMode === "static" ? (
              <Bell className="h-5 w-5 text-red-400" />
            ) : alerts.length > 0 && detectionMode === "seasonal" ? (
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            )}
          </motion.div>
          <div>
            {isIdle ? (
              <>
                <p className="text-sm font-bold text-slate-300">System Status: OPERATIONAL</p>
                <p className="text-xs text-slate-400">Anomaly engine monitoring 24-hour baseline</p>
              </>
            ) : alerts.length > 0 && detectionMode === "static" ? (
              <>
                <p className="text-sm font-bold text-red-400">⚠ ALERT STORM ACTIVE</p>
                <p className="text-xs text-slate-400">
                  {alerts.length} false-positive alerts — 3AM trough below static threshold
                </p>
              </>
            ) : alerts.length > 0 && detectionMode === "seasonal" ? (
              <>
                <p className="text-sm font-bold text-green-400">✓ Anomaly Evaluated Against Historical Bucket</p>
                <p className="text-xs text-slate-400">Zero false alarms — 3AM evaluated against seasonal baseline</p>
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-green-400">System Status: NOMINAL</p>
                <p className="text-xs text-slate-400">All metrics within expected ranges</p>
              </>
            )}
          </div>
        </div>
        <div
          className={cn(
            "rounded-full px-3 py-1 text-xs font-bold",
            isIdle
              ? "bg-slate-700/50 text-slate-400 border border-slate-600"
              : alerts.length > 0 && detectionMode === "static"
                ? "bg-red-500/20 text-red-400 border border-red-500/40"
                : alerts.length > 0 && detectionMode === "seasonal"
                  ? "bg-green-500/20 text-green-400 border border-green-500/40"
                  : "bg-green-500/20 text-green-400 border border-green-500/40",
          )}
        >
          {isIdle ? "NOMINAL" : alerts.length > 0 && detectionMode === "static" ? "CRITICAL" : alerts.length > 0 && detectionMode === "seasonal" ? "SAFE" : "NOMINAL"}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <MetricCard
          label="Alerts Triggered"
          value={obsEvaluated ? alerts.length : "—"}
          icon={<Bell className="h-4 w-4" />}
          color={!isIdle && alerts.length > 5 ? CHART_COLORS.danger : !isIdle && alerts.length > 0 ? CHART_COLORS.warning : CHART_COLORS.success}
          highlight={!isIdle && alerts.length > 0}
        />
        <MetricCard
          label="Alert Rate"
          value={obsEvaluated ? `${alertRate}/24` : "—"}
          unit={obsEvaluated ? "hours" : undefined}
          icon={<Activity className="h-4 w-4" />}
          color={CHART_COLORS.secondary}
        />
        <MetricCard
          label="Detection Mode"
          value={detectionMode === "seasonal" ? "Seasonal" : "Static"}
          icon={<ShieldAlert className="h-4 w-4" />}
          color={detectionMode === "seasonal" ? CHART_COLORS.success : CHART_COLORS.warning}
        />
      </div>

      {/* Volume Chart */}
      <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
        <p className="mb-3 text-sm font-semibold text-slate-200">24-Hour Data Volume — Baseline vs Actual</p>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
            <defs>
              <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.muted} stopOpacity={0.3} />
                <stop offset="95%" stopColor={CHART_COLORS.muted} stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.secondary} stopOpacity={0.6} />
                <stop offset="95%" stopColor={CHART_COLORS.secondary} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
            <XAxis dataKey="hour" tick={{ fill: CHART_COLORS.muted, fontSize: 9 }} interval={3} />
            <YAxis tick={{ fill: CHART_COLORS.muted, fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            {detectionMode === "static" && (
              <ReferenceLine y={staticThreshold} stroke={CHART_COLORS.danger} strokeDasharray="5 5" label={{ value: "Static Threshold", fill: CHART_COLORS.danger, fontSize: 10 }} />
            )}
            {detectionMode === "seasonal" &&
              [2, 3, 4].map((h) => (
                <ReferenceLine
                  key={h}
                  y={hourBaselines[h]?.lower ?? 100}
                  stroke={CHART_COLORS.warning}
                  strokeDasharray="2 4"
                  label={{ value: `${h}:00 lower`, fill: CHART_COLORS.warning, fontSize: 9 }}
                />
              ))}
            <Area
              type="monotone"
              dataKey="baseline"
              stroke={CHART_COLORS.muted}
              fillOpacity={1}
              fill="url(#colorBaseline)"
              strokeWidth={1}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke={CHART_COLORS.secondary}
              fillOpacity={1}
              fill="url(#colorActual)"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-2 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-2 w-4 rounded bg-slate-500/50" />
            <span className="text-xs text-slate-400">Historical Baseline</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-4 rounded bg-cyan-500/60" />
            <span className="text-xs text-slate-400">Actual Volume</span>
          </div>
          {detectionMode === "static" && (
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-4 bg-red-500" style={{ borderBottom: "1px dashed" }} />
              <span className="text-xs text-slate-400">Static Threshold</span>
            </div>
          )}
        </div>
      </div>

      {/* Alert Log */}
      <div className="flex flex-col gap-2 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-200">AlertDispatcher Log</p>
          {obsEvaluated && alerts.length > 0 && (
            <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs text-red-400">
              {alerts.length} alert{alerts.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <div className="flex max-h-40 flex-col gap-1 overflow-y-auto font-mono text-xs">
          {alerts.slice(-5).map((alert) => (
            <div key={alert.id} className="flex flex-col gap-1 rounded-lg bg-slate-900/60 px-3 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded px-1.5 py-0.5 text-xs font-bold uppercase",
                      alert.severity === "critical" && "bg-red-500/20 text-red-400",
                      alert.severity === "warn" && "bg-yellow-500/20 text-yellow-400",
                      alert.severity === "info" && "bg-blue-500/20 text-blue-400",
                    )}
                  >
                    {alert.severity}
                  </span>
                  <span className="text-slate-400">{alert.message}</span>
                </div>
                <span className="text-slate-500">{formatTimestamp(alert.timestamp)}</span>
              </div>
              <div className="flex items-center gap-4 text-slate-500">
                <span>metric: {alert.metric}</span>
                <span>value: {alert.value}</span>
                <span>threshold: {alert.threshold}</span>
              </div>
            </div>
          ))}
          {alerts.length === 0 && (
            <div className="flex items-center gap-2 py-4 text-center text-slate-500">
              <EyeOff className="h-4 w-4" />
              <span>No alerts — system is healthy. Drop a data file to evaluate.</span>
            </div>
          )}
        </div>
      </div>

      {/* Webhook Payload Preview */}
      <AnimatePresence>
        {obsEvaluated && lastAlertFingerprint && alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-2 rounded-xl border border-slate-700/50 bg-slate-900/60 p-4"
          >
            <div className="flex items-center gap-2">
              <Webhook className="h-4 w-4 text-cyan-400" />
              <p className="text-sm font-semibold text-slate-200">AlertDispatcher — Outbound Webhook Payload</p>
            </div>
            <pre className="overflow-x-auto text-xs text-green-400">
{`{
  "alert_fingerprint": "${lastAlertFingerprint}",
  "run_id": "run-${runCount}-${Date.now().toString(36)}",
  "triggered_at": "${new Date().toISOString()}",
  "alert": {
    "severity": "${alerts[alerts.length - 1].severity}",
    "metric": "${alerts[alerts.length - 1].metric}",
    "value": ${alerts[alerts.length - 1].value},
    "threshold": ${alerts[alerts.length - 1].threshold},
    "message": "${alerts[alerts.length - 1].message}"
  },
  "runbook_url": "https://wiki.example.com/runbooks/data-observability/${alerts[alerts.length - 1].metric}",
  "channels": ["#data-alerts", "pagerduty:on-call"]
}`}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT — DataPlatformSandbox
// ============================================================================

const TABS = [
  {
    id: 0,
    key: "cdc",
    label: "PostgreSQL CDC & SCD Type 2",
    icon: <Database className="h-4 w-4" />,
    color: "#3b82f6",
    description: "Change Data Capture pipeline simulator",
  },
  {
    id: 1,
    key: "batch",
    label: "Batch Analytics (dbt + Airflow)",
    icon: <Layers className="h-4 w-4" />,
    color: "#06b6d4",
    description: "ELT pipeline with quality gates",
  },
  {
    id: 2,
    key: "observability",
    label: "Data Observability Engine",
    icon: <Activity className="h-4 w-4" />,
    color: "#22c55e",
    description: "Anomaly detection and alerting",
  },
  {
    id: 3,
    key: "schema-designer",
    label: "Schema Designer",
    icon: <FlaskConical className="h-4 w-4" />,
    color: "#a855f7",
    description: "Design dimensional star schemas and snowflake models",
  },
];

export default function DataPlatformSandbox() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="data-platform-sandbox" className="w-full">
      {/* Section Header */}
      <div className="mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5"
        >
          <Zap className="h-3.5 w-3.5 text-cyan-400" />
          <span className="text-xs font-medium text-cyan-400">Interactive Simulation Lab</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl"
        >
          Data Platform Sandbox
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-3 max-w-2xl text-sm text-slate-400"
        >
          Explore the mechanics of our three production-optimized data platforms. Inject events, toggle execution
          strategies, and observe real-time metrics and anomaly detection — all simulated in your browser.
        </motion.p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        {TABS.map((tab) => (
          <TabButton
            key={tab.key}
            id={tab.id}
            label={tab.label}
            icon={tab.icon}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            color={tab.color}
          />
        ))}
      </div>

      {/* Tab Description */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-6 text-center"
      >
        <p className="text-sm text-slate-400">{TABS[activeTab].description}</p>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-slate-700/50 bg-slate-800/20 p-6 backdrop-blur-sm"
        >
          {activeTab === 0 && <CDCpipelineSimulator key="cdc-0" />}
          {activeTab === 1 && <BatchAnalyticsSimulator key="batch-1" />}
          {activeTab === 2 && <DataObservabilitySimulator key="obs-2" />}
          {activeTab === 3 && <SchemaDesignerSimulator key="schema-3" />}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
// ============================================================================
// SCHEMA DESIGNER SIMULATOR
// ============================================================================

interface SchemaColumn {
  name: string;
  type: string;
  pk: boolean;
  fk: boolean;
  nullable: boolean;
  description: string;
}

interface SchemaTable {
  id: string;
  name: string;
  type: "fact" | "dimension" | "bridge";
  columns: SchemaColumn[];
  x: number;
  y: number;
}

const PRESET_SCHEMAS = [
  {
    name: "Sales & Orders (Star)",
    tables: [
      { id: "fact_orders", name: "FACT_ORDERS", type: "fact" as const, x: 50, y: 40, columns: [
        { name: "ORDER_KEY", type: "BIGINT", pk: true, fk: false, nullable: false, description: "Surrogate key" },
        { name: "ORDER_DATE_KEY", type: "INT", pk: false, fk: true, nullable: false, description: "FK to DIM_DATE" },
        { name: "CUSTOMER_KEY", type: "BIGINT", pk: false, fk: true, nullable: false, description: "FK to DIM_CUSTOMER" },
        { name: "PRODUCT_KEY", type: "BIGINT", pk: false, fk: true, nullable: false, description: "FK to DIM_PRODUCT" },
        { name: "STORE_KEY", type: "BIGINT", pk: false, fk: true, nullable: false, description: "FK to DIM_STORE" },
        { name: "ORDER_AMOUNT", type: "DECIMAL(12,2)", pk: false, fk: false, nullable: false, description: "Gross order value" },
        { name: "ORDER_QTY", type: "INT", pk: false, fk: false, nullable: false, description: "Total line items" },
        { name: "DISCOUNT_AMOUNT", type: "DECIMAL(12,2)", pk: false, fk: false, nullable: true, description: "Promotional discount" },
      ]},
      { id: "dim_date", name: "DIM_DATE", type: "dimension" as const, x: 20, y: 10, columns: [
        { name: "DATE_KEY", type: "INT", pk: true, fk: false, nullable: false, description: "PK (YYYYMMDD)" },
        { name: "CALENDAR_DATE", type: "DATE", pk: false, fk: false, nullable: false, description: "Calendar date" },
        { name: "FISCAL_YEAR", type: "INT", pk: false, fk: false, nullable: false, description: "FY (2024)" },
        { name: "FISCAL_PERIOD", type: "INT", pk: false, fk: false, nullable: false, description: "FP (1-13)" },
        { name: "DAY_OF_WEEK", type: "INT", pk: false, fk: false, nullable: false, description: "1-7" },
        { name: "DAY_NAME", type: "VARCHAR(10)", pk: false, fk: false, nullable: false, description: "Monday-Sunday" },
      ]},
      { id: "dim_customer", name: "DIM_CUSTOMER", type: "dimension" as const, x: 5, y: 55, columns: [
        { name: "CUSTOMER_KEY", type: "BIGINT", pk: true, fk: false, nullable: false, description: "Surrogate key" },
        { name: "CUSTOMER_ID", type: "VARCHAR(20)", pk: false, fk: false, nullable: false, description: "Natural key" },
        { name: "CUSTOMER_NAME", type: "VARCHAR(100)", pk: false, fk: false, nullable: false, description: "Full name" },
        { name: "CUSTOMER_SEGMENT", type: "VARCHAR(20)", pk: false, fk: false, nullable: false, description: "Gold/Silver/Bronze" },
        { name: "CITY", type: "VARCHAR(50)", pk: false, fk: false, nullable: true, description: "City" },
        { name: "STATE", type: "VARCHAR(2)", pk: false, fk: false, nullable: true, description: "State code" },
        { name: "REGION", type: "VARCHAR(20)", pk: false, fk: false, nullable: false, description: "Sales region" },
      ]},
      { id: "dim_product", name: "DIM_PRODUCT", type: "dimension" as const, x: 75, y: 55, columns: [
        { name: "PRODUCT_KEY", type: "BIGINT", pk: true, fk: false, nullable: false, description: "Surrogate key" },
        { name: "PRODUCT_ID", type: "VARCHAR(20)", pk: false, fk: false, nullable: false, description: "SKU" },
        { name: "PRODUCT_NAME", type: "VARCHAR(200)", pk: false, fk: false, nullable: false, description: "Product description" },
        { name: "CATEGORY", type: "VARCHAR(50)", pk: false, fk: false, nullable: false, description: "Product category" },
        { name: "SUBCATEGORY", type: "VARCHAR(50)", pk: false, fk: false, nullable: false, description: "Subcategory" },
        { name: "UNIT_COST", type: "DECIMAL(10,2)", pk: false, fk: false, nullable: false, description: "Standard unit cost" },
        { name: "UNIT_PRICE", type: "DECIMAL(10,2)", pk: false, fk: false, nullable: false, description: "Standard list price" },
      ]},
      { id: "dim_store", name: "DIM_STORE", type: "dimension" as const, x: 60, y: 80, columns: [
        { name: "STORE_KEY", type: "BIGINT", pk: true, fk: false, nullable: false, description: "Surrogate key" },
        { name: "STORE_ID", type: "VARCHAR(10)", pk: false, fk: false, nullable: false, description: "Store number" },
        { name: "STORE_NAME", type: "VARCHAR(100)", pk: false, fk: false, nullable: false, description: "Store name" },
        { name: "STORE_FORMAT", type: "VARCHAR(20)", pk: false, fk: false, nullable: false, description: "Hyper/Super/Express" },
        { name: "STORE_CITY", type: "VARCHAR(50)", pk: false, fk: false, nullable: false, description: "City" },
        { name: "ANNUAL_REVENUE", type: "DECIMAL(12,2)", pk: false, fk: false, nullable: true, description: "Annual revenue" },
        { name: "OPEN_DATE", type: "DATE", pk: false, fk: false, nullable: true, description: "Opening date" },
      ]},
    ],
  },
  {
    name: "SCD Type-2 (Slowly Changing Dimension)",
    tables: [
      { id: "fact_events", name: "FACT_EVENTS", type: "fact" as const, x: 50, y: 50, columns: [
        { name: "EVENT_KEY", type: "BIGINT", pk: true, fk: false, nullable: false, description: "Surrogate key" },
        { name: "CUSTOMER_KEY", type: "BIGINT", pk: false, fk: true, nullable: false, description: "FK to DIM_CUSTOMER_SCD2" },
        { name: "EVENT_DATE", type: "DATE", pk: false, fk: false, nullable: false, description: "Event timestamp" },
        { name: "EVENT_TYPE", type: "VARCHAR(20)", pk: false, fk: false, nullable: false, description: "LOGIN/PURCHASE/LOGOUT" },
        { name: "REVENUE", type: "DECIMAL(10,2)", pk: false, fk: false, nullable: true, description: "Revenue event" },
      ]},
      { id: "dim_customer_scd2", name: "DIM_CUSTOMER_SCD2", type: "dimension" as const, x: 15, y: 20, columns: [
        { name: "CUSTOMER_KEY", type: "BIGINT", pk: true, fk: false, nullable: false, description: "Surrogate key" },
        { name: "CUSTOMER_ID", type: "VARCHAR(20)", pk: false, fk: false, nullable: false, description: "Natural key (business key)" },
        { name: "CUSTOMER_NAME", type: "VARCHAR(100)", pk: false, fk: false, nullable: false, description: "Name at time" },
        { name: "TIER", type: "VARCHAR(10)", pk: false, fk: false, nullable: false, description: "Gold/Silver/Bronze at time" },
        { name: "EFFECTIVE_DATE", type: "DATE", pk: false, fk: false, nullable: false, description: "Row valid from" },
        { name: "EXPIRATION_DATE", type: "DATE", pk: false, fk: false, nullable: false, description: "Row valid to (9999-12-31 if current)" },
        { name: "IS_CURRENT", type: "BOOLEAN", pk: false, fk: false, nullable: false, description: "Current row flag" },
        { name: "VERSION", type: "INT", pk: false, fk: false, nullable: false, description: "Row version number" },
      ]},
    ],
  },
];

function SchemaDesignerSimulator() {
  const [presetIdx, setPresetIdx] = useState(0);
  const [tables, setTables] = useState<SchemaTable[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [showSql, setShowSql] = useState(false);
  const [sqlOutput, setSqlOutput] = useState("");

  // Initialize from preset
  const loadPreset = (idx: number) => {
    const p = PRESET_SCHEMAS[idx];
    setTables(p.tables.map(t => ({ ...t, columns: t.columns.map(c => ({ ...c })) })));
    setSelectedTable(null);
  };

  useEffect(() => { loadPreset(presetIdx); }, [presetIdx]);

  const selected = tables.find(t => t.id === selectedTable);

  const generateSql = (tbl: SchemaTable) => {
    const typeLabel = tbl.type === "fact" ? "FACT TABLE" : tbl.type === "bridge" ? "BRIDGE TABLE" : "DIMENSION TABLE";
    const colDefs = tbl.columns.map(c => {
      const pk = c.pk ? " PRIMARY KEY" : "";
      const nul = c.nullable ? " NULL" : " NOT NULL";
      return `  ${c.name.padEnd(25)} ${c.type.padEnd(20)}${pk}${nul}`;
    }).join(",\n");
    return `CREATE TABLE ${tbl.name} (${typeLabel})\n(\n${colDefs}\n);\n`;
  };

  const renderTableCard = (tbl: SchemaTable) => {
    const typeColors = { fact: "border-blue-500/50 bg-blue-500/5", dimension: "border-emerald-500/50 bg-emerald-500/5", bridge: "border-purple-500/50 bg-purple-500/5" };
    const badgeColors = { fact: "bg-blue-500/20 text-blue-400", dimension: "bg-emerald-500/20 text-emerald-400", bridge: "bg-purple-500/20 text-purple-400" };
    const isSelected = selectedTable === tbl.id;
    return (
      <div
        key={tbl.id}
        onClick={() => setSelectedTable(isSelected ? null : tbl.id)}
        className={cn(
          "cursor-pointer rounded-xl border p-4 transition-all duration-200 hover:scale-105",
          typeColors[tbl.type],
          isSelected ? "ring-2 ring-white/30" : ""
        )}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className={cn("rounded px-2 py-0.5 text-xs font-bold", badgeColors[tbl.type])}>{tbl.type.toUpperCase()}</span>
          <span className="text-xs text-slate-400">{tbl.columns.length} cols</span>
        </div>
        <h4 className="mb-2 font-mono text-sm font-bold text-slate-100">{tbl.name}</h4>
        <div className="space-y-1">
          {tbl.columns.slice(0, 4).map(col => (
            <div key={col.name} className="flex items-center gap-2">
              <span className="text-xs text-slate-400">{col.pk ? "🔑" : col.fk ? "🔗" : "·"}</span>
              <span className="font-mono text-xs text-slate-300">{col.name}</span>
              <span className="ml-auto text-xs text-slate-500">{col.type}</span>
            </div>
          ))}
          {tbl.columns.length > 4 && <div className="text-xs text-slate-500 pl-5">+{tbl.columns.length - 4} more</div>}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Preset Selector */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium text-slate-300">Preset Schema:</label>
        {PRESET_SCHEMAS.map((p, i) => (
          <button key={i} onClick={() => setPresetIdx(i)} className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
            presetIdx === i ? "bg-purple-500/30 text-purple-300 ring-1 ring-purple-500/50" : "bg-slate-700/50 text-slate-400 hover:bg-slate-700"
          )}>{p.name}</button>
        ))}
      </div>

      {/* Schema Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map(tbl => renderTableCard(tbl))}
      </div>

      {/* Relationship Lines (visual hint) */}
      <div className="rounded-lg border border-slate-700/30 bg-slate-900/20 p-4">
        <div className="mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Referenced By (FK Relationships)</div>
        <div className="space-y-1">
          {tables.filter(t => t.type === "fact" || t.type === "bridge").flatMap(ft =>
            ft.columns.filter(c => c.fk).map(c => {
              const refName = c.description.replace("FK to ", "").replace(/.$/, "");
              const targetTable = tables.find(t => t.columns.some(col => col.name === refName));
              return (
                <div key={ft.id + c.name} className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-blue-400">{ft.name}.{c.name}</span>
                  <ArrowRight className="h-3 w-3 text-slate-500" />
                  <span className="font-mono text-emerald-400">{refName}</span>
                  {targetTable && <span className={cn("ml-2 rounded px-1.5 py-0.5 text-xs", targetTable.type === "fact" ? "bg-blue-500/20 text-blue-400" : "bg-emerald-500/20 text-emerald-400")}>{targetTable.type}</span>}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Column Detail */}
      {selected && (
        <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-mono text-sm font-bold text-white">
              {selected.name}
              <span className="ml-2 text-xs text-slate-400">— {selected.columns.length} columns</span>
            </h4>
            <button onClick={() => { setSqlOutput(generateSql(selected)); setShowSql(true); }} className="text-xs text-purple-400 hover:text-purple-300">
              Generate DDL →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-700/50 text-slate-400">
                  <th className="pb-2 text-left font-medium">Column</th>
                  <th className="pb-2 text-left font-medium">Type</th>
                  <th className="pb-2 text-left font-medium">PK</th>
                  <th className="pb-2 text-left font-medium">FK</th>
                  <th className="pb-2 text-left font-medium">Null?</th>
                  <th className="pb-2 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {selected.columns.map(col => (
                  <tr key={col.name} className="border-b border-slate-700/20 hover:bg-slate-700/20">
                    <td className="py-2 font-mono text-slate-200">{col.name}</td>
                    <td className="py-2 font-mono text-slate-400">{col.type}</td>
                    <td className="py-2">{col.pk ? <span className="text-yellow-400">🔑</span> : <span className="text-slate-600">·</span>}</td>
                    <td className="py-2">{col.fk ? <span className="text-blue-400">🔗</span> : <span className="text-slate-600">·</span>}</td>
                    <td className="py-2">{col.nullable ? <span className="text-slate-500">NULL</span> : <span className="text-slate-300">NOT NULL</span>}</td>
                    <td className="py-2 text-slate-400">{col.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DDL Output */}
      {showSql && sqlOutput && (
        <div className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Generated DDL</span>
            <button onClick={() => setShowSql(false)} className="text-xs text-slate-400 hover:text-white">✕ Close</button>
          </div>
          <pre className="overflow-x-auto font-mono text-xs text-emerald-400">{sqlOutput}</pre>
        </div>
      )}

      {/* Star Schema Summary */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <div className="text-2xl font-bold text-blue-400">{tables.filter(t => t.type === "fact").length}</div>
          <div className="text-xs text-slate-400">Fact Tables</div>
        </div>
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
          <div className="text-2xl font-bold text-emerald-400">{tables.filter(t => t.type === "dimension").length}</div>
          <div className="text-xs text-slate-400">Dimension Tables</div>
        </div>
        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
          <div className="text-2xl font-bold text-purple-400">{tables.filter(t => t.type === "bridge").length}</div>
          <div className="text-xs text-slate-400">Bridge Tables</div>
        </div>
      </div>
    </div>
  );
}
