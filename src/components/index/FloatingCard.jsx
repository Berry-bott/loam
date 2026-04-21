"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function FloatingCard({ children, className = "", index = 0 }) {
  const cardRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!cardRef.current) return

    gsap.to(cardRef.current, {
      y: "random(-20, 20)",
      rotation: "random(-3, 3)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.2,
    })

    gsap.fromTo(
      cardRef.current,
      { y: 100, opacity: 0, rotateY: -15 },
      {
        y: 0,
        opacity: 1,
        rotateY: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [index])

  return (
    <div ref={cardRef} className={className} style={{ perspective: "1000px" }}>
      {children}
    </div>
  )
}
