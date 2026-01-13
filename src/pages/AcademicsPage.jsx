"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Link } from "react-router-dom"
import { ArrowRight, BookOpen, Microscope, Calculator, Globe, Music, Palette, Code, FlaskConical } from "lucide-react"
import { Button } from "../components/ui/button"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { ScrollReveal } from "../components/ScrollReveal"
import { VideoSection } from "../components/VideoSection"
import { FloatingCard } from "../components/FloatingCard"
import { MagneticButton } from "../components/MagneticButton"

const departments = [
  {
    icon: Microscope,
    title: "Sciences",
    description: "Biology, Chemistry, Physics with state-of-the-art laboratory facilities",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Calculator,
    title: "Mathematics",
    description: "From foundational algebra to advanced calculus and statistics",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Globe,
    title: "Humanities",
    description: "History, Geography, Social Studies, and Global Perspectives",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: BookOpen,
    title: "Languages",
    description: "English Literature, Spanish, French, Mandarin, and Latin",
    color: "bg-rose-500/10 text-rose-600",
  },
  {
    icon: Palette,
    title: "Arts",
    description: "Visual Arts, Drama, Film Studies, and Creative Writing",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    icon: Music,
    title: "Music",
    description: "Orchestra, Choir, Band, and Individual Instrumental Training",
    color: "bg-indigo-500/10 text-indigo-600",
  },
  {
    icon: Code,
    title: "Technology",
    description: "Computer Science, Robotics, AI, and Digital Media",
    color: "bg-cyan-500/10 text-cyan-600",
  },
  {
    icon: FlaskConical,
    title: "Research",
    description: "Independent Research Programs and Science Fair Preparation",
    color: "bg-orange-500/10 text-orange-600",
  },
]

const programs = [
  {
    title: "Elementary School",
    grades: "K-5",
    description: "Building strong foundations through play-based and inquiry-driven learning",
    image: "/loam (35).jpeg",
  },
  {
    title: "Middle School",
    grades: "6-8",
    description: "Developing critical thinking and preparing for academic challenges",
    image: "/loam (37).jpeg",
  },
  {
    title: "High School",
    grades: "9-12",
    description: "Advanced coursework preparing students for top universities worldwide",
    image: "/loam (38).jpeg",
  },
]

export default function AcademicsPage() {
  const heroRef = useRef(null)

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
      <div className="h-screen flex justify-center items-center">
    <h1 className="text-4xl text-foreground ">Work in Progress</h1>
      </div>
      {/* <main className="min-h-screen pt-16">
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div ref={heroRef} className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster="/loam (19).jpeg"
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                type="video/mp4"
              />
            </video>
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
                      <img
                        src={program.image || "/placeholder.svg"}
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
                        to="/admissions"
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
              posterUrl="/loam (19).jpeg"
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
                  <div className="group p-6 border border-border rounded-2xl hover:border-accent transition-all duration-300 h-full">
                    <div className={`w-12 h-12 rounded-xl ${dept.color} flex items-center justify-center mb-4`}>
                      <dept.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-2">{dept.title}</h3>
                    <p className="text-muted-foreground text-sm">{dept.description}</p>
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
                <Link to="/admissions">
                  <Button size="lg" variant="secondary" className="rounded-full bg-background text-primary">
                    Apply for Admission
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </MagneticButton>
            </ScrollReveal>
          </div>
        </section>
      </main> */}
      <Footer />
    </>
  )
}
