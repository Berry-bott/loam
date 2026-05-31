import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { X } from "lucide-react"
import { Navbar } from "../../components/index/Navbar"
import { Footer } from "../../components/index/Footer"
import { ScrollReveal } from "../../components/index/ScrollReveal"
import { LazyImage } from "../../components/index/LazyMedia"

const categories = ["All", "Campus", "Library", "Sports", "Hall", "Computer Science"]

const galleryImages = [
  { id: 1, src: "/e-library.jpeg", category: "Library", title: "Loam Polytechnic E-Library" },
  {
    id: 2,
    src: "/sports-facility.jpeg",
    category: "Sports",
    title: "Sports Facility",
  },
  {
    id: 3,
    src: "/reference-library.jpeg",
    category: "Library",
    title: "Reference Library",
  },
  {
    id: 4,
    src: "/accountancy-laboratory.jpeg",
    category: "Lab",
    title: "Accountancy Laborary",
  },
  { id: 5, src: "/electronics-workshop.jpeg", category: "Workshop", title: "Electronics   Workshop" },
  { id: 6, src: "/conference-hall.jpeg", category: "Hall", title: "Conference Hall" },
  { id: 7, src: "/basketball-court.jpg", category: "Sports", title: "BasketBall Court" },
  { id: 8, src: "/computer-science-lab.jpeg", category: "Arts", title: "Computer Science Lab" },
  { id: 9, src: "/skills-centre.jpeg", category: "Enterprenue", title: "Skills Center" },
  { id: 10, src: "/nbte-meeting.jpeg", category: "Conference", title: "NBTE Meeting " },
  { id: 11, src: "/nbte-accreditation.jpeg", category: "Computer Science", title: "NBTE Accreditation" },
  { id: 12, src: "/networking-lab.jpeg", category: "Computer Science", title: "Networing Lab" },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxImage, setLightboxImage] = useState(null)
  const galleryRef = useRef(null)
  const heroTitleRef = useRef(null)

  const filteredImages =
    selectedCategory === "All" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (heroTitleRef.current) {
      gsap.fromTo(
        heroTitleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  useEffect(() => {
    if (!galleryRef.current) return

    const items = galleryRef.current.querySelectorAll(".gallery-item")

    gsap.fromTo(
      items,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      },
    )
  }, [filteredImages])

  useEffect(() => {
    if (!lightboxImage) return undefined

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxImage(null)
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [lightboxImage])

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <section className="px-4 py-24">
          <div className="mx-auto max-w-7xl text-center">
            <p className="mb-4 text-sm font-medium text-muted-foreground">Photo Gallery</p>
            <h1 ref={heroTitleRef} className="mb-6 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Capturing Moments,
              <br />
              <span className="italic">Creating Memories</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Explore the vibrant life at Loam Polytechnic through our collection of photographs capturing academic
              achievements, sporting triumphs, and creative expressions.
            </p>
          </div>
        </section>

        <section className="px-4 pb-12">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="px-4 pb-24 md:pb-32">
          <div className="mx-auto max-w-7xl">
            <div ref={galleryRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="gallery-item group cursor-pointer"
                  onClick={() => setLightboxImage(image)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <LazyImage
                      src={image.src}
                      alt={image.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-end bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/40">
                      <div className="translate-y-full p-6 transition-transform duration-300 group-hover:translate-y-0">
                        <span className="text-lg font-medium text-white/90">{image.category}</span>
                        <h3 className="font-sans text-2xl font-semibold text-background">{image.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4 backdrop-blur-xl sm:p-6"
            onClick={() => setLightboxImage(null)}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.4))]" />
            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl items-center justify-center sm:min-h-[calc(100vh-3rem)]">
              <div
                className="w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/20 bg-white shadow-[0_35px_100px_rgba(15,23,42,0.28)]"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-stone-200 bg-[linear-gradient(180deg,#fffdf8_0%,#ffffff_100%)] px-5 py-4 sm:px-7">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400">
                      {lightboxImage.category}
                    </p>
                    <h3 className="mt-1 font-sans text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
                      {lightboxImage.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900"
                    onClick={() => setLightboxImage(null)}
                    aria-label="Close gallery modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="bg-stone-950">
                  <LazyImage
                    src={lightboxImage.src}
                    alt={lightboxImage.title}
                    eager
                    className="max-h-[68vh] w-full object-cover lg:max-h-[78vh]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
