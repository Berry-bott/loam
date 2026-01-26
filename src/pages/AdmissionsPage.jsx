"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Calendar, FileText, Users, CheckCircle, Clock, Mail } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { ScrollReveal } from "../components/ScrollReveal"
import { VideoSection } from "../components/VideoSection"
import { MagneticButton } from "../components/MagneticButton"
import { CounterAnimation } from "../components/CounterAnimation"

const admissionSteps = [
  {
    icon: FileText,
    step: "01",
    title: "Submit Application",
    description: "Complete our online application form with all required documents and transcripts.",
  },
  {
    icon: Calendar,
    step: "02",
    title: " Screening",
    description: "Visit our campus on the shaduled screening date, and get all your documents screened by the admission team. ",
  },
  {
    icon: Users,
    step: "03",
    title: "Admission",
    description: "Visit office of the admission officer for your admission letter.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Acceptance",
    description: "Submit your admission decision and complete enrollment procedures.",
  },
]

const deadlines = [
  { program: "Early Decision", date: "November 15, 2025", status: "Open" },
  { program: "Regular Decision", date: "January 15, 2026", status: "Open" },
  { program: "Rolling Admission", date: "Feb 1, 2026", status: "Open" },
  // { program: "Transfer Students", date: "April 1, 2027", status: "Open" },
]

const stats = [
  { value: 85, suffix: "%", label: "Acceptance Rate" },
  { value: 100, suffix: "%", label: "Financial Aid Available" },
  { value: 25, suffix: "", label: "Average Class Size" },
  { value: 40, suffix: "+", label: "Countries Represented" },
]

export default function AdmissionsPage() {
  const heroRef = useRef(null)
  const [email, setEmail] = useState("")

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0.8 },
        {
          opacity: 1,
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
      <main className="min-h-screen pt-16 border overflow-hidden">
        <section className="relative h-[80vh] flex items-center overflow-hidden">
          <div ref={heroRef} className="absolute inset-0 z-0">
            <img
              src="/IMG_5161.jpg"
              alt="Loam Polytechnic"
              className="w-screen h-full object-cover overflow-hidden"
            />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/2 to-transparent" />
          </div>

          <div className="relative z-10 px-4 max-w-7xl mx-auto w-full">
            <div className="max-w-2xl">
              <ScrollReveal>
                <p className="text-muted text-sm uppercase tracking-[0.3em] font-medium mb-4">Admissions</p>
                <h1 className="font-serif text-3xl sm:text-5xl md:text-5xl font-bold text-background mb-6 text-balance">
                  SCHOLARSHIP! SCHOLARSHIP!! SCHOLARSHIP!!! <span className="italic text-md "> Starts Here</span>
                </h1>
                <p className="text-muted text-lg md:text-xl mb-8">
                  Loam Polytechnic is offering a one-year-tuition-free scholarship to suitably qualified candidates to study at Loam Polytechnic, Ikono in any of the following
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                 <MagneticButton>
                  <a
                    href="https://forms.gle/UTabZwtyhN8SpaW19"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      className="rounded-full bg-background text-foreground hover:bg-background/90"
                    >
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </MagneticButton>

                  <MagneticButton>
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full border-background text-background hover:bg-background/10 bg-transparent"
                    >
                      Request Information
                    </Button>
                  </MagneticButton>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-500 text-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <ScrollReveal key={stat.label} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="font-serif text-4xl md:text-5xl font-bold">
                      <CounterAnimation end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-accent-foreground/80 mt-2 text-sm">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

          <section className="py-24 md:py-24 px-4 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols- gap-16 items-center">
              <div>
                <p className="text-sm font-medium text-accent uppercase tracking-wider mb-2">Learn More!</p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2">SCHOLARSHIP!!!</h2>
              </div>
                <p className="text-muted-foreground text-lg "> 
                  Loam Polytechnic is offering a one-year-tuition-free scholarship <br /> to suitably qualified 
                  candidates to study at Loam Polytechnic, <br /> Ikono in any of the following National Diploma 
                  (ND) Courses: 
                </p>
              <ScrollReveal animation="slideRight" className="flex flex-wrap justify-center items- gap-4  ">
                  <MagneticButton>
                  <Button size="lg" className="rounded-full mb-[2px]">
                  •	Statistics 
                  </Button>
                </MagneticButton>
                 <MagneticButton>
                  <Button size="lg" className="rounded-full mb-[2px]">
                  •	Computer Science 
                  </Button>
                </MagneticButton>
                  <MagneticButton>
                  <Button size="lg" className="rounded-full mb-[2px]">
                  •	Accountancy 
                  </Button>
                </MagneticButton>
                  <MagneticButton>
                  <Button size="lg" className="rounded-full mb-[2px]">
                  •	Electrical Electronics Engineering 
                  </Button>
                </MagneticButton>
                  <MagneticButton>
                  <Button size="lg" className="rounded-full mb-[2px]">
                  •	Computer Engineering Technology 
                  </Button>
                </MagneticButton>
                  <MagneticButton>
                  <Button size="lg" className="rounded-full mb-[2px]">
                  •	Business Administration (awaiting) 
                  </Button>
                </MagneticButton>
                  <MagneticButton>
                  <Button size="lg" className="rounded-full mb-[2px]">
                  •	Public Administration (awaiting) 
                  </Button>
                </MagneticButton>
                  <MagneticButton>
                  <Button size="lg" className="rounded-full mb-[2px]">
                  •	Science Lab Technology (awaiting) 
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button size="lg" className="rounded-full mb-[2px]">
                  •	Estate Management (awaiting) 
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button size="lg" className="rounded-full">
                  •	Mass Communication (awaiting)  
                  </Button>
                </MagneticButton>
              </ScrollReveal>

              {/* <ScrollReveal animation="slideLeft">
                <VideoSection
                  videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
                  posterUrl="/loam (19).jpeg"
                  title="Campus Tour"
                />
              </ScrollReveal> */}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-16">
              <p className="text-sm font-medium text-accent mb-4 uppercase tracking-wider">How to Apply</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Simple Admission Process</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our streamlined application process makes it easy for families to join the Loam community.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {admissionSteps.map((step, index) => (
                <ScrollReveal key={step.title} delay={index * 0.1}>
                  <div className="relative">
                    <div className="text-8xl font-serif font-bold text-muted-foreground/10 absolute -top-4 -left-2">
                      {step.step}
                    </div>
                    <div className="relative pt-12">
                      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                        <step.icon className="h-7 w-7 text-accent" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

      

        <section className="py-24 md:py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-16">
              <p className="text-sm font-medium text-accent mb-4 uppercase tracking-wider">Important Dates</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Application Deadlines</h2>
            </ScrollReveal>

            <ScrollReveal>
              <div className="border border-border rounded-2xl overflow-hidden">
                <div className="grid grid-cols-3 bg-secondary/50 p-4 font-semibold">
                  <span>Program</span>
                  <span>Deadline</span>
                  <span>Status</span>
                </div>
                {deadlines.map((deadline, index) => (
                  <div
                    key={deadline.program}
                    className={`grid grid-cols-3 p-4 items-center ${
                      index !== deadlines.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <span className="font-medium">{deadline.program}</span>
                    <span className="text-muted-foreground flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {deadline.date}
                    </span>
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                      {deadline.status}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-24 md:py-32 px-4 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <Mail className="h-12 w-12 mx-auto mb-6 text-primary-foreground/70" />
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Stay Informed</h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Subscribe to receive updates about admissions, open houses, and important deadlines.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-full bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                <Button variant="secondary" className="rounded-full">
                  Subscribe
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
