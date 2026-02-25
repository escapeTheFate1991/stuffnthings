'use client'

import { useEffect, useRef, useState, useCallback, type RefObject } from 'react'

/* ─── Scroll Reveal ─── */
export function useScrollReveal<T extends HTMLElement>(
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px'
): RefObject<T> {
  const ref = useRef<T>(null) as RefObject<T>

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin }
    )

    const el = ref.current
    if (el) {
      el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(
        (child) => observer.observe(child)
      )
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}

/* ─── Count Up Animation ─── */
export function useCountUp<T extends HTMLElement = HTMLDivElement>(
  end: number,
  duration = 2000,
  startOnView = true
): { ref: RefObject<T>; value: number; started: boolean } {
  const ref = useRef<T>(null) as RefObject<T>
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!startOnView) {
      // Animate immediately
      animateCount()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          animateCount()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, duration, startOnView, started])

  function animateCount() {
    const startTime = performance.now()
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  return { ref, value, started }
}

/* ─── 3D Tilt Effect ─── */
export function useTilt<T extends HTMLElement>(
  intensity = 10
): { ref: RefObject<T>; handlers: { onMouseMove: (e: React.MouseEvent) => void; onMouseLeave: () => void } } {
  const ref = useRef<T>(null) as RefObject<T>

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      ref.current.style.transform = `perspective(1000px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.02, 1.02, 1.02)`
    },
    [intensity]
  )

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)'
  }, [])

  return { ref, handlers: { onMouseMove, onMouseLeave } }
}

/* ─── Mouse Parallax ─── */
export function useParallax(strength = 20) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength
      const y = (e.clientY / window.innerHeight - 0.5) * strength
      setOffset({ x, y })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [strength])

  return offset
}

/* ─── Active Section (for nav highlight) ─── */
export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}

