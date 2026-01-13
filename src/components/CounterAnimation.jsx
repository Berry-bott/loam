"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function CounterAnimation({ end, duration = 2, suffix = "", prefix = "", className = "" }) {
  const ref = useRef(null)
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ref.current) return

    gsap.registerPlugin(ScrollTrigger)

    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      onEnter: () => {
        if (hasAnimated.current) return
        hasAnimated.current = true

        gsap.to(
          {},
          {
            duration,
            onUpdate: function () {
              setCount(Math.round(this.progress() * end))
            },
            ease: "power2.out",
          },
        )
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === ref.current) st.kill()
      })
    }
  }, [end, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}
