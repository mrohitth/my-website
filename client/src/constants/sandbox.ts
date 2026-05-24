/**
 * Constants for the Interactive Data Platform Sandbox.
 * Extracted from DataPlatformSandbox.tsx and related components
 * to make tuning values centrally visible and avoid magic numbers.
 */

/** CDC Pipeline configuration — realistic PostgreSQL source parameters. */
export const CDC_CONFIG = {
  /** Target IOPS for a production PostgreSQL 14 database under write load. */
  targetIOPS: 30_000,
  /** Steady-state CDC replication latency — Pg logical decoding overhead. */
  realtimeLatencyMs: 180,
  /** Cold-start / backfill catch-up latency for a 40M row table. */
  catchupLatencyMs: 42_400,
  /** Static IOPS threshold that triggers an alert in the simulation. */
  staticThreshold: 3_000,
} as const

/** Batch processing configuration — simulates Airflow/dbt batch workloads. */
export const BATCH_CONFIG = {
  /** Default rows per micro-batch in the simulation. */
  defaultBatchSize: 10_000,
  /** Baseline row count for the clean scenario tab. */
  cleanBaseRows: 2_000,
  /** Row count for the duplicate flood failure scenario tab. */
  duplicateFloodRows: 5_000,
} as const

/** Canvas node network animation parameters. */
export const NETWORK_ANIMATION_CONFIG = {
  /** Node density: 1 node per N pixels squared. 12,500 ≈ 166 nodes at 1080p. */
  nodeAreaDivisor: 12_500,
  /** Max pixel distance between nodes before connection line is drawn. */
  connectionDistancePx: 120,
  /** Rendered node circle radius in pixels. */
  nodeRadiusPx: 2,
  /** Per-frame opacity of each node dot. */
  nodeAlpha: 0.05,
  /** Node velocity magnitude per frame (random direction). */
  nodeVelocity: 0.5,
} as const

/** Cursor trail animation parameters for the subtle network cursor effect. */
export const CURSOR_ANIMATION_CONFIG = {
  /** Maximum simultaneous trailing nodes following the cursor. */
  maxNodes: 5,
  /** Frames before a cursor node expires and is removed. */
  nodeLifeFrames: 60,
  /** Per-frame velocity lag factor for cursor nodes. */
  velocity: 0.2,
  /** Minimum opacity when a node is newly created. */
  baseAlpha: 0.1,
  /**
   * Alpha range: alpha = baseAlpha + alphaRange * (life / lifeMax).
   * At creation, life = lifeMax → alpha = baseAlpha + alphaRange = 0.4.
   * At expiry, life = 0 → alpha = baseAlpha = 0.1.
   */
  alphaRange: 0.3,
  /** Rendered cursor node radius in pixels. */
  radiusPx: 3,
} as const