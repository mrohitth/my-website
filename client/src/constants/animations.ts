/**
 * Animation timing constants — centralized for easy tuning.
 * All values in milliseconds unless noted.
 */

/** Typing animation state machine timing (role rotation in HeroSection). */
export const TYPING_ANIMATION = {
  /** Milliseconds per character added during forward typing. */
  forwardSpeedMs: 100,
  /** Milliseconds per character removed during delete. */
  deleteSpeedMs: 50,
  /** Pause at full text before starting delete, in ms. */
  pauseMs: 1_500,
  /** Delay from mount before animation begins, in ms. */
  introDelayMs: 600,
} as const

/** Scroll-driven UI state thresholds. */
export const SCROLL_ANIMATION = {
  /**
   * Ratio of viewport height for active-section detection threshold.
   * Section is "active" when top of element is within this distance from viewport top.
   */
  viewportThresholdRatio: 0.05,
  /**
   * Ratio of viewport height for the scroll indicator arrow visibility.
   * Arrow hides when hero section top crosses this threshold from viewport top.
   */
  arrowThresholdRatio: 0.15,
  /** Pixel scroll depth before the "scroll to top" button becomes visible. */
  scrollToTopPx: 300,
} as const

/** Subtle flow background elements in HeroSection — randomized at mount. */
export const FLOW_ELEMENTS = {
  /** Animation duration range in seconds [min, max]. */
  durationRangeS: [8, 20] as const,
  /** Animation delay range in seconds [min, max] (negative = starts delayed). */
  delayRangeS: [-15, 0] as const,
  /** Element width range in pixels [min, max]. */
  widthRangePx: [8, 20] as const,
  /** Vertical position range as percent of container height [min, max]. */
  topRangePercent: [10, 90] as const,
} as const