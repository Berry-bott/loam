"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Megaphone, Users, BookOpen, Trophy, Star, CheckCircle } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Navbar } from "../../components/index/Navbar"
import { Footer } from "../../components/index/Footer"
import { ScrollReveal } from "../../components/index/ScrollReveal"

const programs = [
  {
    title: "Summer Academic Camp",
    description: "Intensive learning programs in STEM, Arts, and Languages for students aged 10-17.",
    image: "/loam (51).jpeg",
    dates: "June 15 - August 15, 2026",
    price: "From $2,500",
    features: ["Small class sizes", "Expert instructors", "Hands-on projects", "Certificate upon completion"],
  },
  {
    title: "Sports Excellence Program",
    description: "Elite training programs for aspiring athletes in basketball, soccer, swimming, and track.",
    image: "/IMG_4724.JPG",
    dates: "Year-round enrollment",
    price: "From $3,000/semester",
    features: [
      "Professional coaching",
      "State-of-the-art facilities",
      "Competition opportunities",
      "Fitness assessments",
    ],
  },
  {
    title: "Music & Arts Academy",
    description: "Comprehensive training in classical music, contemporary arts, and performing arts.",
    image: "/loam (45).jpeg",
    dates: "September 2026 intake",
    price: "From $2,000/semester",
    features: ["Private lessons available", "Ensemble opportunities", "Annual performances", "Guest masterclasses"],
  },
]

const admissionHighlights = [
  { icon: Star, label: "Top 10 Regional Ranking" },
  { icon: Users, label: "15:1 Student-Teacher Ratio" },
  { icon: Trophy, label: "98% College Acceptance" },
  { icon: BookOpen, label: "40+ AP Courses" },
]

const testimonials = [
  {
    quote:
      "Loam Polytechnic transformed my daughter's approach to learning. The teachers are exceptional and truly care about each student.",
    author: "Sarah M., Parent",
    image: "/woman-portrait.png",
  },
  {
    quote:
      "The opportunities here are incredible. From robotics to debate, I've found my passions and developed skills I never knew I had.",
    author: "James K., Student",
    image: "/young-man-portrait.png",
  },
  {
    quote:
      "As an alumni, I can say that Loam Polytechnic prepared me exceptionally well for university and beyond. Forever grateful.",
    author: "Dr. Emily Chen, Alumni",
    image: "/professional-woman-portrait.png",
  },
]

export default function AdvertsPage() {
  const heroTitleRef = useRef(null)
  const marqueeRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (heroTitleRef.current) {
      gsap.fromTo(
        heroTitleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 },
      )
    }

    if (marqueeRef.current) {
      const marqueeContent = marqueeRef.current.querySelector(".marquee-content")
      if (marqueeContent) {
        gsap.to(marqueeContent, {
          xPercent: -50,
          ease: "none",
          duration: 20,
          repeat: -1,
        })
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Megaphone className="h-4 w-4" />
                  Now Accepting Applications
                </div>
                <h1
                  ref={heroTitleRef}
                  className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance"
                >
                  Shape Your Future at Loam Polytechnic
                </h1>
                <p className="text-muted-foreground text-lg mb-8">
                  Join a community of learners, innovators, and future leaders. Discover programs designed to unlock
                  your full potential.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="rounded-full">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full bg-transparent">
                    Request Info
                  </Button>
                </div>
              </div>

              <ScrollReveal animation="slideLeft">
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                    <img
                      src="/IMG_PIX 2.jpg"
                      alt="Students at Loam Polytechnic"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-background rounded-xl p-6 shadow-lg border border-border">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-10 h-10 rounded-full bg-background border-4 border-background overflow-hidden"
                          >
                            <img
                              src={`/loam (52).jpeg?height=40&width=40&query=student portrait ${i}`}
                              alt="Student"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold">1,500+ Students</p>
                        <p className="text-sm text-muted-foreground">Join our community</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-8 bg-primary text-primary-foreground overflow-hidden">
          <div ref={marqueeRef} className="relative">
            <div className="marquee-content flex gap-12 whitespace-nowrap">
              {[...admissionHighlights, ...admissionHighlights].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <p className="text-sm font-medium text-muted-foreground mb-4">Special Programs</p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold">Explore Our Featured Programs</h2>
              </div>
            </ScrollReveal>

            <div className="space-y-12">
              {programs.map((program, index) => (
                <ScrollReveal key={program.title} animation={index % 2 === 0 ? "slideRight" : "slideLeft"}>
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                        <img
                          src={program.image || "/placeholder.svg"}
                          alt={program.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                      <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">{program.title}</h3>
                      <p className="text-muted-foreground mb-6">{program.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm mb-6">
                        <span className="bg-secondary px-3 py-1 rounded-full">{program.dates}</span>
                        <span className="bg-secondary px-3 py-1 rounded-full">{program.price}</span>
                      </div>
                      <ul className="space-y-2 mb-8">
                        {program.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-accent" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="rounded-full">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-secondary">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-16">What Our Community Says</h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <ScrollReveal key={testimonial.author} delay={index * 0.1}>
                  <div className="bg-muted-foreground rounded-xl p-8 h-full flex flex-col">
                    <p className="text-lg mb-6 flex-grow">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium">{testimonial.author}</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal animation="scale">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/school-campus-beautiful.jpg"
                  alt="Loam Polytechnic Campus"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-foreground/70" />
                <div className="relative z-10 py-24 px-8 text-center absolute inset-0 flex flex-col items-center justify-center">
                  <h2 className="font-serif text-3xl md:text-5xl font-bold text-background mb-6 text-balance">
                    Your Journey Starts Here
                  </h2>
                  <p className="text-background/80 text-lg max-w-2xl mx-auto mb-8">
                    Applications for the 2026-2027 academic year are now open. Take the first step towards an
                    exceptional education.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="rounded-full bg-background text-foreground hover:bg-background/90">
                      Start Application
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full border-background text-background hover:bg-background/10 bg-transparent"
                    >
                      Schedule a Visit
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
