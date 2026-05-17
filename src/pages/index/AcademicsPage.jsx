"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Link } from "react-router-dom"
import { ArrowRight, BookOpen, Microscope, Calculator, Globe, Music, Palette, Code, FlaskConical } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Navbar } from "../../components/index/Navbar"
import { Footer } from "../../components/index/Footer"
import { ScrollReveal } from "../../components/index/ScrollReveal"
import { VideoSection } from "../../components/index/VideoSection"
import { FloatingCard } from "../../components/index/FloatingCard"
import { MagneticButton } from "../../components/index/MagneticButton"
import { LazyImage, LazyVideo } from "../../components/index/LazyMedia"
import { getAdmissionsUrl } from "../../lib/portal-routing"
import { academicSections } from "./academics/academicData"

const departments = [
  {
    icon: Microscope,
    title: "Sciences",
    description: "Biology, Chemistry, Physics with state-of-the-art laboratory facilities",
    color: "bg-emerald-500/10 text-emerald-600",
    slug: "science-laboratory-technology",
  },
  {
    icon: Calculator,
    title: "Mathematics",
    description: "From foundational algebra to advanced calculus and statistics",
    color: "bg-blue-500/10 text-blue-600",
    slug: "statistics",
  },
  {
    icon: Globe,
    title: "Humanities",
    description: "History, Geography, Social Studies, and Global Perspectives",
    color: "bg-amber-500/10 text-amber-600",
    slug: "mass-communication",
  },
  {
    icon: BookOpen,
    title: "Languages",
    description: "English Literature, Spanish, French, Mandarin, and Latin",
    color: "bg-rose-500/10 text-rose-600",
    slug: "admission-officer",
  },
  {
    icon: Palette,
    title: "Arts",
    description: "Visual Arts, Drama, Film Studies, and Creative Writing",
    color: "bg-purple-500/10 text-purple-600",
    slug: "student-experience",
  },
  {
    icon: Music,
    title: "Music",
    description: "Orchestra, Choir, Band, and Individual Instrumental Training",
    color: "bg-indigo-500/10 text-indigo-600",
    slug: "campus-events",
  },
  {
    icon: Code,
    title: "Technology",
    description: "Computer Science, Robotics, AI, and Digital Media",
    color: "bg-cyan-500/10 text-cyan-600",
    slug: "computer-science",
  },
  {
    icon: FlaskConical,
    title: "Research",
    description: "Independent Research Programs and Science Fair Preparation",
    color: "bg-orange-500/10 text-orange-600",
    slug: "digital-library",
  },
]

const programs = [
  {
    title: "Elementary School",
    grades: "K-5",
    description: "Building strong foundations through play-based and inquiry-driven learning",
    image: "/campus-facility-block.jpeg",
    slug: "pre-national-diploma",
  },
  {
    title: "Middle School",
    grades: "6-8",
    description: "Developing critical thinking and preparing for academic challenges",
    image: "/electronics-workshop.jpeg",
    slug: "national-diploma",
  },
  {
    title: "High School",
    grades: "9-12",
    description: "Advanced coursework preparing students for top universities worldwide",
    image: "/networking-lab.jpeg",
    slug: "higher-national-diploma",
  },
]

export default function AcademicsPage() {
  const heroRef = useRef(null)
  const admissionsUrl = getAdmissionsUrl()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { scale: 1.1 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-16">
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div ref={heroRef} className="absolute inset-0 z-0">
            <LazyVideo
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
              autoPlay
              loop
              muted
              playsInline
              lazy={false}
              preload="metadata"
              className="w-full h-full object-cover"
              poster="/campus-video-poster.jpeg"
            >
            </LazyVideo>
            <div className="absolute inset-0 bg-foreground/60" />
          </div>

          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <ScrollReveal>
              <p className="text-background/70 text-sm uppercase tracking-[0.3em] font-medium mb-4">
                Academic Programs
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-background mb-6 text-balance">
                World-Class <span className="italic">Education</span>
              </h1>
              <p className="text-background/80 text-lg md:text-xl max-w-2xl mx-auto">
                Rigorous academics combined with innovative teaching methods prepare our students for success at the
                world's leading universities.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-24 md:py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-16">
              <p className="text-sm font-medium text-accent mb-4 uppercase tracking-wider">Our Programs</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Education for Every Stage</h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <FloatingCard key={program.title} index={index}>
                  <div className="group bg-background border border-border rounded-2xl overflow-hidden hover:border-accent transition-all duration-500">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <LazyImage
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Grades {program.grades}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-2xl font-semibold mb-2">{program.title}</h3>
                      <p className="text-muted-foreground mb-4">{program.description}</p>
                      <Link
                        to={`/academics?${program.slug}`}
                        className="text-accent font-medium inline-flex items-center hover:gap-2 transition-all"
                      >
                        Learn More <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </FloatingCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-4 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-16">
              <p className="text-sm font-medium text-accent mb-4 uppercase tracking-wider">Inside Our Classrooms</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Experience Learning at Westfield</h2>
            </ScrollReveal>

            <VideoSection
              videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
              posterUrl="/campus-video-poster.jpeg"
              title="Innovation in Education"
              description="See how our teachers create engaging learning experiences"
            />
          </div>
        </section>

        <section className="py-24 md:py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="mb-16">
              <p className="text-sm font-medium text-accent mb-4 uppercase tracking-wider">Departments</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Comprehensive Curriculum</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Our diverse academic departments offer students the opportunity to explore their interests and develop
                expertise across multiple disciplines.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept, index) => (
                <ScrollReveal key={dept.title} delay={index * 0.05}>
                  <Link
                    to={`/academics?${dept.slug}`}
                    className="group block p-6 border border-border rounded-2xl hover:border-accent transition-all duration-300 h-full"
                  >
                    <div className={`w-12 h-12 rounded-xl ${dept.color} flex items-center justify-center mb-4`}>
                      <dept.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-2">{dept.title}</h3>
                    <p className="text-muted-foreground text-sm">{dept.description}</p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-4 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-16">
              <p className="text-sm font-medium text-accent mb-4 uppercase tracking-wider">Academic Directory</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Browse Every Academic Listing</h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Every academic item opens in a single reusable detail page, making the section easier to manage without
                creating dozens of separate pages.
              </p>
            </ScrollReveal>

            <div className="space-y-10">
              {academicSections.map((section, sectionIndex) => (
                <ScrollReveal key={section.title} delay={sectionIndex * 0.04}>
                  <div className="rounded-[2rem] border border-border bg-background/90 p-6 md:p-8 shadow-sm">
                    <div className="flex flex-col gap-3 border-b border-border pb-5 md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
                          Academic Section
                        </p>
                        <h3 className="mt-2 font-serif text-3xl font-semibold">{section.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {section.items.length} item{section.items.length > 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {section.items.map((item) => (
                        <Link
                          key={item.slug}
                          to={`/academics?${item.queryKey || item.slug}`}
                          className="group rounded-2xl border border-border bg-secondary/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-background"
                        >
                          <h4 className="font-serif text-xl font-semibold transition-colors group-hover:text-accent">
                            {item.label}
                          </h4>
                          <p className="mt-3 text-sm text-muted-foreground">{item.summary}</p>
                          <span className="mt-4 inline-flex items-center text-sm font-medium text-accent">
                            View details <ArrowRight className="ml-1 h-4 w-4" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-4 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Academic Journey?</h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
                Discover how Westfield Academy can help your child reach their full potential through our exceptional
                academic programs.
              </p>
              <MagneticButton className="inline-block">
                <a href={admissionsUrl}>
                  <Button size="lg" variant="secondary" className="rounded-full bg-background text-primary">
                    Apply for Admission
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </MagneticButton>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
