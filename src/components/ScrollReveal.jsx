"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function ScrollReveal({
  children,
  className = "",
  animation = "fadeUp",
  delay = 0,
  duration = 1,
  staggerDelay = 0.1,
}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.registerPlugin(ScrollTrigger)

    const element = ref.current
    let tween

    const baseConfig = {
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
    }

    switch (animation) {
      case "fadeUp":
        tween = gsap.fromTo(element, { y: 80, opacity: 0 }, { y: 0, opacity: 1, ...baseConfig })
        break
      case "fadeIn":
        tween = gsap.fromTo(element, { opacity: 0 }, { opacity: 1, ...baseConfig })
        break
      case "slideLeft":
        tween = gsap.fromTo(element, { x: 100, opacity: 0 }, { x: 0, opacity: 1, ...baseConfig })
        break
      case "slideRight":
        tween = gsap.fromTo(element, { x: -100, opacity: 0 }, { x: 0, opacity: 1, ...baseConfig })
        break
      case "scale":
        tween = gsap.fromTo(element, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, ...baseConfig })
        break
      case "stagger":
        const children = element.children
        tween = gsap.fromTo(children, { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: staggerDelay, ...baseConfig })
        break
      default:
        tween = gsap.fromTo(element, { y: 80, opacity: 0 }, { y: 0, opacity: 1, ...baseConfig })
    }

    return () => {
      if (tween) tween.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === element) st.kill()
      })
    }
  }, [animation, delay, duration, staggerDelay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
