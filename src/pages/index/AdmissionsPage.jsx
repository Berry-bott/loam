import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Calendar, FileText, Users, CheckCircle, Clock, Mail } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Navbar } from "../../components/index/Navbar"
import { Footer } from "../../components/index/Footer"
import { ScrollReveal } from "../../components/index/ScrollReveal"
import { MagneticButton } from "../../components/index/MagneticButton"
import { CounterAnimation } from "../../components/index/CounterAnimation"
import { ApplicationModal } from "../../components/index/admissions/ApplicationModal"
import { FloatingScholarshipIcon } from "../../components/index/admissions/FloatingScholarshipIcon"
import { LazyImage } from "../../components/index/LazyMedia"

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
    title: "Screening",
    description: "Visit our campus on the scheduled screening date and get all your documents screened by the admission team.",
  },
  {
    icon: Users,
    step: "03",
    title: "Admission",
    description: "Visit the office of the admission officer for your admission letter.",
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
  const [showApplicationModal, setShowApplicationModal] = useState(false)

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
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((scrollTrigger) => scrollTrigger.kill())
    }
  }, [])

  const handleReadGuideline = () => {
    setShowApplicationModal(false)

    window.setTimeout(() => {
      document.getElementById("admission-process")?.scrollIntoView({ behavior: "smooth" })
    }, 120)
  }

  return (
    <>
      <Navbar />
      <FloatingScholarshipIcon />
      <ApplicationModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        onReadGuideline={handleReadGuideline}
      />

      <main className="min-h-screen overflow-hidden pt-16">
        <section className="relative flex h-[80vh] items-center overflow-hidden">
          <div ref={heroRef} className="absolute inset-0 z-0">
            <LazyImage
              src="/admissions-hero-campus.jpg"
              alt="Loam Polytechnic"
              eager
              className="h-full w-screen object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/20 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4">
            <div className="max-w-2xl">
              <ScrollReveal>
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-muted">Admissions</p>
                <button
                  type="button"
                  onClick={() => setShowApplicationModal(true)}
                  className="mb-5 inline-flex animate-bounce items-center rounded-full border border-background/40 bg-primary px-5 py-2 text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground shadow-2xl shadow-primary/40 transition hover:scale-105 hover:bg-primary/90"
                >
                  Admission Ongoing for 2026/2027
                </button>
                <h1 className="mb-6 font-serif text-3xl font-bold text-background text-balance sm:text-5xl">
                  Your Future <span className="italic">Starts Here</span>
                </h1>
                <p className="mb-8 text-lg text-muted md:text-xl">
                  Join Loam Polytechnic and unlock a world-class education at Ikono.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <MagneticButton>
                    <Button
                      size="lg"
                      className="rounded-full bg-background text-foreground hover:bg-background/90"
                      onClick={() => setShowApplicationModal(true)}
                    >
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </MagneticButton>
                  <MagneticButton>
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full border-background bg-transparent text-background hover:bg-background/10"
                      onClick={handleReadGuideline}
                    >
                      View Admission Guide
                    </Button>
                  </MagneticButton>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="bg-gray-500 px-4 py-16 text-background">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, index) => (
                <ScrollReveal key={stat.label} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="font-serif text-4xl font-bold md:text-5xl">
                      <CounterAnimation end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="mt-2 text-sm text-accent-foreground/80">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="apply-form" className="bg-secondary/20 px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <ScrollReveal className="mb-14 text-center">
              <p className="mb-4 text-sm font-medium uppercase tracking-wider text-accent">Online Application</p>
              <h2 className="mb-4 font-serif text-4xl font-bold md:text-5xl">Apply to Loam Polytechnic</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Open the application form in a focused overlay, complete your details, then return here to continue reading the admission guide below.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="rounded-[28px] shadow-2xl border border-border bg-background px-6 py-10 text-center md:px-10">
                <div className="mx-auto max-w-2xl">
                  <h3 className="mb-3 font-serif text-2xl font-semibold md:text-3xl">Ready to start your application?</h3>

                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button size="lg" className="rounded-full" onClick={() => setShowApplicationModal(true)}>
                      Start Application <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full" onClick={handleReadGuideline}>
                      View Admission Guide
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="admission-process" className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal className="mb-16 text-center">
              <p className="mb-4 text-sm font-medium uppercase tracking-wider text-accent">How to Apply</p>
              <h2 className="mb-4 font-serif text-4xl font-bold md:text-5xl">Simple Admission Process</h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Our streamlined application process makes it easy for families to join the Loam community.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {admissionSteps.map((step, index) => (
                <ScrollReveal key={step.title} delay={index * 0.1}>
                  <div className="relative">
                    <div className="absolute -left-2 -top-4 text-8xl font-serif font-bold text-muted-foreground/10">
                      {step.step}
                    </div>
                    <div className="relative pt-12">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                        <step.icon className="h-7 w-7 text-accent" />
                      </div>
                      <h3 className="mb-2 font-serif text-xl font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal className="mb-16 text-center">
              <p className="mb-4 text-sm font-medium uppercase tracking-wider text-accent">Important Dates</p>
              <h2 className="mb-4 font-serif text-4xl font-bold md:text-5xl">Application Deadlines</h2>
            </ScrollReveal>

            <ScrollReveal>
              <div className="overflow-hidden rounded-2xl border border-border">
                <div className="grid grid-cols-3 bg-secondary/50 p-4 font-semibold">
                  <span>Program</span>
                  <span>Deadline</span>
                  <span>Status</span>
                </div>
                {deadlines.map((deadline, index) => (
                  <div
                    key={deadline.program}
                    className={`grid grid-cols-3 items-center p-4 ${index !== deadlines.length - 1 ? "border-b border-border" : ""}`}
                  >
                    <span className="font-medium">{deadline.program}</span>
                    <span className="flex items-center text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      {deadline.date}
                    </span>
                    <span className="inline-flex items-center">
                      <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500" />
                      {deadline.status}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="bg-primary px-4 py-24 text-primary-foreground md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <Mail className="mx-auto mb-6 h-12 w-12 text-primary-foreground/70" />
              <h2 className="mb-6 font-serif text-4xl font-bold md:text-5xl">Stay Informed</h2>
              <p className="mb-8 text-lg text-primary-foreground/80">
                Subscribe to receive updates about admissions, open houses, and important deadlines.
              </p>
              <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="rounded-full border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50"
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
