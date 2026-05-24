import { useEffect, useRef } from 'react'
import { CURSOR_ANIMATION_CONFIG } from '@/constants/sandbox'

const SubtleNetworkCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.willChange = 'transform'

    type Node = { x: number; y: number; vx: number; vy: number; life: number }

    const {
      maxNodes,
      nodeLifeFrames,
      velocity,
      baseAlpha,
      alphaRange,
      radiusPx,
    } = CURSOR_ANIMATION_CONFIG

    const nodes: Node[] = []

    const addNode = (x: number, y: number) => {
      nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * velocity,
        vy: (Math.random() - 0.5) * velocity,
        life: nodeLifeFrames,
      })
      if (nodes.length > maxNodes) nodes.shift()
    }

    let rafId: number
    let lastFrameTime = 0
    const targetFrameTime = 1000 / 60
    let isRunning = false

    function draw(timestamp: number) {
      if (!isRunning) return

      if (timestamp - lastFrameTime < targetFrameTime) {
        rafId = requestAnimationFrame(draw)
        return
      }
      lastFrameTime = timestamp

      const c = canvas as HTMLCanvasElement
      ctx.clearRect(0, 0, c.width, c.height)

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        n.x += n.vx
        n.y += n.vy
        n.life--

        const alpha = baseAlpha + alphaRange * (n.life / nodeLifeFrames)
        ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, radiusPx, 0, Math.PI * 2)
        ctx.fill()

        if (i > 0) {
          const prev = nodes[i - 1]
          ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(n.x, n.y)
          ctx.lineTo(prev.x, prev.y)
          ctx.stroke()
        }
      }

      while (nodes.length && nodes[0].life <= 0) {
        nodes.shift()
      }

      rafId = requestAnimationFrame(draw)
    }

    function startDrawing() {
      if (isRunning) return
      isRunning = true
      lastFrameTime = 0
      rafId = requestAnimationFrame(draw)
    }

    function stopDrawing() {
      isRunning = false
      if (rafId) cancelAnimationFrame(rafId)
      const c = canvas as HTMLCanvasElement
      ctx.clearRect(0, 0, c.width, c.height)
    }

    if (typeof document !== 'undefined') {
      if (document.visibilityState === 'visible') {
        startDrawing()
      }

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          startDrawing()
        } else {
          stopDrawing()
        }
      }

      document.addEventListener('visibilitychange', handleVisibilityChange)

      const handleResize = () => {
        const c = canvas as HTMLCanvasElement
        c.width = window.innerWidth
        c.height = window.innerHeight
      }

      window.addEventListener('resize', handleResize)

      const handleMouseMove = (e: MouseEvent) => {
        addNode(e.clientX, e.clientY)
      }

      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('mousemove', handleMouseMove)
        stopDrawing()
      }
    } else {
      startDrawing()
      return () => stopDrawing()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
      aria-hidden="true"
    />
  )
}

export default SubtleNetworkCursor