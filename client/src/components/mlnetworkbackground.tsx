import { useEffect, useRef } from 'react'
import { NETWORK_ANIMATION_CONFIG } from '@/constants/sandbox'

export default function MLNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isMobile || prefersReducedMotion) return

    let width = canvas.parentElement?.offsetWidth || window.innerWidth
    let height = canvas.parentElement?.offsetHeight || window.innerHeight

    canvas.width = width
    canvas.height = height
    canvas.style.willChange = 'transform'

    const nodes: { x: number; y: number; vx: number; vy: number }[] = []

    // Node density: 1 node per 12,500px² of canvas area.
    // At 1920×1080 → ~166 nodes. At 375×812 (mobile) → ~24 nodes.
    // Tuned empirically for visual density vs performance.
    // Mobile uses a more conservative divisor to keep node count low.
    const { nodeAreaDivisor, connectionDistancePx, nodeAlpha, nodeRadiusPx, nodeVelocity } = NETWORK_ANIMATION_CONFIG
    const densityFactor = isMobile ? nodeAreaDivisor * (40_000 / 12_500) : nodeAreaDivisor
    const nodeCount = Math.floor((width * height) / densityFactor)

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * nodeVelocity,
        vy: (Math.random() - 0.5) * nodeVelocity,
      })
    }

    let rafId: number
    let lastFrameTime = 0
    const targetFrameTime = 1000 / 60
    let isRunning = false

    function animate(timestamp: number) {
      if (timestamp - lastFrameTime < targetFrameTime) {
        rafId = requestAnimationFrame(animate)
        return
      }
      lastFrameTime = timestamp

      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDistancePx) {
            ctx.strokeStyle = `rgba(0, 255, 255, ${nodeAlpha * (1 - dist / connectionDistancePx)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      nodes.forEach((node) => {
        ctx.fillStyle = `rgba(0, 255, 255, ${nodeAlpha})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeRadiusPx, 0, Math.PI * 2)
        ctx.fill()
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1
      })

      rafId = requestAnimationFrame(animate)
    }

    function startAnimation() {
      if (isRunning) return
      isRunning = true
      lastFrameTime = 0
      rafId = requestAnimationFrame(animate)
    }

    function stopAnimation() {
      isRunning = false
      if (rafId) cancelAnimationFrame(rafId)
      ctx.clearRect(0, 0, width, height)
    }

    if (typeof document !== 'undefined') {
      if (document.visibilityState === 'visible') {
        startAnimation()
      }

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          startAnimation()
        } else {
          stopAnimation()
        }
      }

      document.addEventListener('visibilitychange', handleVisibilityChange)

      const handleResize = () => {
        width = canvas.parentElement?.offsetWidth || window.innerWidth
        height = canvas.parentElement?.offsetHeight || window.innerHeight
        canvas.width = width
        canvas.height = height
        nodes.length = 0
        const newDensityFactor = width < 768 ? nodeAreaDivisor * (40_000 / 12_500) : nodeAreaDivisor
        const newNodeCount = Math.floor((width * height) / newDensityFactor)
        for (let i = 0; i < newNodeCount; i++) {
          nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * nodeVelocity,
            vy: (Math.random() - 0.5) * nodeVelocity,
          })
        }
      }

      window.addEventListener('resize', handleResize)

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        window.removeEventListener('resize', handleResize)
        stopAnimation()
      }
    } else {
      startAnimation()
      return () => stopAnimation()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  )
}