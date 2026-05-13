
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { LazyImage } from "./LazyMedia"

export function ParallaxImage({ src, alt, className = "", speed = 0.3 }) {
  const containerRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const tween = gsap.to(imageRef.current, {
      yPercent: -20 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })

    return () => {
      tween.kill()
    }
  }, [speed])

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={imageRef} className="relative w-full h-[120%] -top-[10%]">
        <LazyImage src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
    </div>
  )
}
