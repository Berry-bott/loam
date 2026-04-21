"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Play, X } from "lucide-react"
import { Button } from "../ui/button";

export function VideoSection({ videoUrl, posterUrl, title, description }) {
  const containerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="relative rounded-2xl overflow-hidden">
      {!isPlaying ? (
        <div className="relative aspect-video group cursor-pointer" onClick={() => setIsPlaying(true)}>
          <img
            src={posterUrl || "/placeholder.svg"}
            alt={title || "Video thumbnail"}
            className="w-full  h-[500px]  object-contain transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center transition-colors group-hover:bg-foreground/40">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-background/90 flex items-center justify-center transition-transform group-hover:scale-110">
              <Play className="h-8 w-8 md:h-10 md:w-10 text-background ml-1" fill="currentColor" />
            </div>
          </div>
          {(title || description) && (
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent">
              {title && <h3 className="font-serif text-2xl font-bold text-background mb-2">{title}</h3>}
              {description && <p className="text-background/80">{description}</p>}
            </div>
          )}
        </div>
      ) : (
        <div className="relative aspect-video">
          <video autoPlay controls className="w-full h-full object-cover">
            <source src={videoUrl} type="video/mp4" />
          </video>
          <Button
            size="icon"
            variant="outline"
            className="absolute top-4 right-4 rounded-full border-background/50 text-background hover:bg-background/20 bg-background/10 backdrop-blur-sm"
            onClick={() => setIsPlaying(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default VideoSection
