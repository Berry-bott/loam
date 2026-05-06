import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { X } from "lucide-react"
import { Navbar } from "../../components/index/Navbar"
import { Footer } from "../../components/index/Footer"
import { ScrollReveal } from "../../components/index/ScrollReveal"

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
  { id: 6, src: "/conference-hall.jpeg", category: "Hall", title:"Conference Hall" },
  { id: 7, src: "IMG_4730.JPG", category: "Sports", title: "BasketBall Court" },
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

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <section className="py-24 md:py-32 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm font-medium text-muted-foreground mb-4">Photo Gallery</p>
            <h1 ref={heroTitleRef} className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Capturing Moments,
              <br />
              <span className="italic">Creating Memories</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore the vibrant life at Loam Polytechnic through our collection of photographs capturing academic
              achievements, sporting triumphs, and creative expressions.
            </p>
          </div>
        </section>

        <section className="px-4 pb-12">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
          <div className="max-w-7xl mx-auto">
            <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="gallery-item group cursor-pointer"
                  onClick={() => setLightboxImage(image)}
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-end">
                      <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-xs font-medium text-blue-900">{image.category}</span>
                        <h3 className="font-serif text-xl font-semibold text-background">{image.title}</h3>
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
            className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-background hover:text-background/70 transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X className="h-8 w-8" />
            </button>
            <div className="relative max-w-5xl max-h-[80vh] aspect-video">
              <img
                src={lightboxImage.src || "/placeholder.svg"}
                alt={lightboxImage.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <span className="text-xs font-medium text-background/70">{lightboxImage.category}</span>
              <h3 className="font-serif text-2xl font-semibold text-background">{lightboxImage.title}</h3>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
