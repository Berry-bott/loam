
// import { useEffect, useRef, useState } from "react"
// import { gsap } from "gsap"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// export function HeroSlider({ slides, autoPlayInterval = 5000 }) {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [isAnimating, setIsAnimating] = useState(false)
//   const sliderRef = useRef(null)
//   const slidesRef = useRef([])
//   const progressRef = useRef(null)
//   const textRef = useRef(null)

//   const goToSlide = (index) => {
//     if (isAnimating || index === currentSlide) return
//     setIsAnimating(true)

//     const direction = index > currentSlide ? 1 : -1
//     const currentEl = slidesRef.current[currentSlide]
//     const nextEl = slidesRef.current[index]

//     if (!currentEl || !nextEl) return

//     gsap.to(currentEl, {
//       scale: 1.1,
//       opacity: 0,
//       duration: 1,
//       ease: "power3.inOut",
//     })

//     gsap.fromTo(
//       nextEl,
//       {
//         scale: 1.2,
//         opacity: 0,
//         x: direction * 100,
//       },
//       {
//         scale: 1,
//         opacity: 1,
//         x: 0,
//         duration: 1.2,
//         ease: "power3.out",
//         onComplete: () => setIsAnimating(false),
//       },
//     )

//     if (textRef.current) {
//       gsap.fromTo(
//         textRef.current.children,
//         { y: 60, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 0.8,
//           stagger: 0.1,
//           ease: "power3.out",
//           delay: 0.3,
//         },
//       )
//     }

//     setCurrentSlide(index)
//   }

//   const nextSlide = () => {
//     const next = (currentSlide + 1) % slides.length
//     goToSlide(next)
//   }

//   const prevSlide = () => {
//     const prev = (currentSlide - 1 + slides.length) % slides.length
//     goToSlide(prev)
//   }

//   useEffect(() => {
//     if (progressRef.current) {
//       gsap.fromTo(
//         progressRef.current,
//         { scaleX: 0 },
//         {
//           scaleX: 1,
//           duration: autoPlayInterval / 1000,
//           ease: "none",
//           transformOrigin: "left",
//         },
//       )
//     }

//     const timer = setInterval(nextSlide, autoPlayInterval)
//     return () => clearInterval(timer)
//   }, [currentSlide, autoPlayInterval])

//   useEffect(() => {
//     const firstSlide = slidesRef.current[0]
//     if (firstSlide) {
//       gsap.fromTo(firstSlide, { scale: 1.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" })
//     }

//     if (textRef.current) {
//       gsap.fromTo(
//         textRef.current.children,
//         { y: 80, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.5 },
//       )
//     }
//   }, [])

//   return (
//     <div ref={sliderRef} className="relative w-full h-full overflow-hidden pt-32">
//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           ref={(el) => {
//             slidesRef.current[index] = el
//           }}
//           className={`absolute inset-0 ${index === 0 ? "opacity-100" : "opacity-0"}`}
//         >
//           <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
//           <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/40 to-foreground/70" />
//         </div>
//       ))}

//       <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
//         <p className="text-background/70 text-sm md:text-base uppercase tracking-[0.3em] font-medium mb-4">
//           {slides[currentSlide].subtitle}
//         </p>
//         <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-background max-w-5xl text-balance">
//           {slides[currentSlide].title}
//         </h2>
//       </div>

//       <button
//         onClick={prevSlide}
//         className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/10 backdrop-blur-sm border border-background/20 text-background hover:bg-background/20 transition-all duration-300 group"
//         aria-label="Previous slide"
//       >
//         <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/10 backdrop-blur-sm border border-background/20 text-background hover:bg-background/20 transition-all duration-300 group"
//         aria-label="Next slide"
//       >
//         <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
//       </button>

//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`relative h-1 rounded-full transition-all duration-500 overflow-hidden ${
//               index === currentSlide ? "w-12 bg-background/30" : "w-6 bg-background/30 hover:bg-background/50"
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           >
//             {index === currentSlide && (
//               <div
//                 ref={index === currentSlide ? progressRef : null}
//                 className="absolute inset-0 bg-background rounded-full origin-left"
//               />
//             )}
//           </button>
//         ))}
//       </div>

//       <div className="absolute bottom-8 right-8 z-20 text-background/70 font-mono text-sm hidden md:block">
//         <span className="text-background font-semibold">{String(currentSlide + 1).padStart(2, "0")}</span>
//         <span className="mx-2">/</span>
//         <span>{String(slides.length).padStart(2, "0")}</span>
//       </div>
//     </div>
//   )
// }




import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function HeroSlider({ slides, autoPlayInterval = 5000 }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const sliderRef = useRef(null)
  const slidesRef = useRef([])
  const progressRef = useRef(null)
  const textRef = useRef(null)

  const goToSlide = useCallback((index) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)

    const direction = index > currentSlide ? 1 : -1
    const currentEl = slidesRef.current[currentSlide]
    const nextEl = slidesRef.current[index]

    if (!currentEl || !nextEl) return

    gsap.to(currentEl, {
      scale: 1.1,
      opacity: 0,
      duration: 1,
      ease: "power3.inOut",
    })

    gsap.fromTo(
      nextEl,
      {
        scale: 1.2,
        opacity: 0,
        x: direction * 100,
      },
      {
        scale: 1,
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        onComplete: () => setIsAnimating(false),
      },
    )

    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3,
        },
      )
    }

    setCurrentSlide(index)
  }, [isAnimating, currentSlide])

  const nextSlide = useCallback(() => {
    const next = (currentSlide + 1) % slides.length
    goToSlide(next)
  }, [currentSlide, slides.length, goToSlide])

  const prevSlide = useCallback(() => {
    const prev = (currentSlide - 1 + slides.length) % slides.length
    goToSlide(prev)
  }, [currentSlide, slides.length, goToSlide])

  useEffect(() => {
    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: autoPlayInterval / 1000,
          ease: "none",
          transformOrigin: "left",
        },
      )
    }

    const timer = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(timer)
  }, [currentSlide, autoPlayInterval, nextSlide])

  useEffect(() => {
    const firstSlide = slidesRef.current[0]
    if (firstSlide) {
      gsap.fromTo(firstSlide, { scale: 1.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" })
    }

    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.5 },
      )
    }
  }, [])

  return (
    <div ref={sliderRef} className="relative w-full h-full overflow-hidden pt-32">
      {slides.map((slide, index) => (
        <div
          key={index}
          ref={(el) => {
            slidesRef.current[index] = el
          }}
          className={`absolute inset-0 ${index === 0 ? "opacity-100" : "opacity-0"}`}
        >
          <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/80 to-foreground/100" />
        </div>
      ))}

      <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <p className="text-blue-500 text-sm md:text-base uppercase tracking-[0.3em] font-medium mb-4">
          {slides[currentSlide].subtitle}
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-background max-w-5xl text-balance">
          {slides[currentSlide].title}
        </h2>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/10 backdrop-blur-sm border border-background/20 text-background hover:bg-background/20 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/10 backdrop-blur-sm border border-background/20 text-background hover:bg-background/20 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="absolute bottom-[65px] left-1/2 -translate-x-1/2 z-20 flex gap-3  ">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative h-1 rounded-full transition-all duration-500 overflow-hidden ${
              index === currentSlide ? "w-12 bg-background/30" : "w-6 bg-background/100 border hover:bg-background"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentSlide && (
              <div
                ref={index === currentSlide ? progressRef : null}
                className="absolute inset-0 bg-background rounded-full origin-left"
              />
            )}
          </button>
        ))}
      </div>

      <div className="absolute bottom-20 right-8 z-20 text-background/70 font-mono text-sm hidden md:block">
        <span className="text-background font-semibold">{String(currentSlide + 1).padStart(2, "0")}</span>
        <span className="mx-2">/</span>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>
    </div>
  )
}