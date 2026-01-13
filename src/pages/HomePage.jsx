"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Link } from "react-router-dom"
import { ArrowRight, GraduationCap, Users, Award, BookOpen, Play } from "lucide-react"
import { Button } from "../components/ui/button"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { ScrollReveal } from "../components/ScrollReveal"
import { ParallaxImage } from "../components/ParallaxImage"
import { CounterAnimation } from "../components/CounterAnimation"
import { MagneticButton } from "../components/MagneticButton"
import { FloatingCard } from "../components/FloatingCard"
import { HeroSlider } from "../components/HeroSlider"
import VideoSection from "../components/VideoSection"
import video from "../assets/video/loam-mega.mp4"


const heroSlides = [
  {
    image: "/loam (24).jpeg",
    title: "Loamy soil for academic excellence",
    subtitle: "Welcome to Loam Polytechnic",
  },
  {
    image: "/loam (37).jpeg",
    subtitle: "This is Loam Polytechnic",
    title: "Modern Practical workshops and labs",
  },
  {
    image: "/loam54.jpg",
    title: "Where Dreams Take Flight",
    subtitle: "Loam Polytechnic",
  },
  {
    image: "/loam (40).jpeg",
    title:"Print library with wide range of printed learning materials",
    subtitle: "Loam Polytechnic",
  },
  {
    image: "/loam (41).jpeg",
    title: " State-of-the-art digital library",
    subtitle: "Loam Polytechnic",
  },
]

const features = [
  {
    icon: GraduationCap,
    number: "01",
    title: "Modern Learning Facilities",
    description: "Loam Polytechnic is equipped with modern learning facilities designed to support effective teaching and hands-on training. Our classrooms are spacious, well-ventilated, and fitted with learning aids that make lessons clear and engaging.",
  },
  {
    icon: Users,
    number: "02",
    title: "Experienced Instructors",
    description: "Loam Polytechnic is proud to have a team of experienced and dedicated instructors who are passionate about teaching and skill development. Our instructors are professionals in their fields, with strong academic backgrounds and real industry experience.",
  },
  {
    icon: Award,
    number: "03",
    title: "Affordable Tuition and Accommodation",
    description: "Loam Polytechnic is committed to making quality education accessible to everyone. Our tuition fees are affordable and carefully structured to suit students from different backgrounds, without reducing the quality of training.We also provide safe and comfortable accommodation at a reasonable cost. Our hostels are well-managed, secure, and located close to learning facilities, making it easy for students to focus on their studies.",
  },
  {
    icon: BookOpen,
    number: "04",
    title: "100% Practical-Oriented Courses",
    description: "At Loam Polytechnic, all our courses are designed to be fully practical and hands-on. We believe students learn best by doing, not just by listening. That is why every programme includes regular practical sessions, workshops, and real-life projects.",
  },
]

const stats = [
  { value: 1500, suffix: "+", label: "Students Enrolled" },
  { value: 98, suffix: "%", label: "Graduation Rate" },
  { value: 50, suffix: "+", label: "Years of Excellence" },
  { value: 120, suffix: "+", label: "Expert Faculty" },
]

export default function HomePage() {
  const heroRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (heroRef.current) {
      gsap.to(heroRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen mt-10">

        <section className="relative h-screen overflow-hidden">
          <div ref={heroRef} className="absolute inset-0 z-0 scale-110">
            <HeroSlider slides={heroSlides} autoPlayInterval={6000} />
          </div>

          <div
            ref={ctaRef}
            className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex flex-col sm:flex-row gap-4"
    >
            <MagneticButton>
              <Link to="/admissions">
                <Button
                  size="lg"
                  className="rounded-full bg-background text-foreground hover:bg-background/90 px-8 shadow-xl"
                >
                  1-year Tution-free Scholarship
                  {/* <ArrowRight className="ml-2 h-4 w-4" /> */}
                </Button>
              </Link>
            </MagneticButton>
          <div className="flex gap-4">
            <MagneticButton>
              <Link to="/admissions">
                <Button
                  size="lg"
                  className="rounded-full bg-background text-foreground hover:bg-background/90 px-8 shadow-xl"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/gallery">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-background text-background hover:bg-background/10 bg-transparent px-8 backdrop-blur-sm"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Virtual Tour
                </Button>
              </Link>
            </MagneticButton>
          </div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-20">
            <div className="w-6 h-10 border-2 border-background/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-background/50 rounded-full mt-2" />
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-4 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <p className="text-sm font-medium text-accent mb-4 uppercase tracking-wider">Why Choose Us</p>
              <h2 className="font-serif text-4xl md:text-2xl font-bold mb-4 text-balance max-w-2xl">
               Loam Polytechnic is committed to training students with real-world skills. Our focus is on practical learning, 
               innovation, and preparing students for employment and entrepreneurship.
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
              {features.map((feature, index) => (
                <FloatingCard key={feature.title} index={index}>
                  <div className="group border-[1.5px] border-border bg-background rounded-2xl p-6 hover:border-accent transition-all duration-500 h-full">
                    <div className="flex items-start justify-between mb-6">
                      <span className="font-serif text-7xl font-bold text-muted group-hover:text-accent/30 transition-colors">
                        {feature.number}
                      </span>
                      <feature.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="font-serif text-2xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </FloatingCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-16">
              <p className="text-sm font-medium text-accent mb-4 uppercase tracking-wider">Experience Loam Polytechnic</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">See our campus come alive</h2>
            </ScrollReveal>
              <div className="-mb-32">
            <VideoSection
              videoUrl={video}
              posterUrl="/loam (19).jpeg"
              title="A Day at loam Academy"
              description="Experience the vibrant learning environment that shapes future leaders"
            />

              </div>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal animation="slideRight">
                <div>
                  <p className="text-sm font-medium text-primary-foreground/70 mb-4 uppercase tracking-wider">
                    About Us
                  </p>
                  <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">
                    Shaping minds, building character, inspiring futures
                  </h2>
                  <p className="text-primary-foreground/80 text-lg mb-8">
                    Loam Polytechnic is approved by the Federal Ministry of Education 
                    for academic activities and accredited by National Board for Technical Education (NBTE) for
                     National Diploma (ND) Programmes.
                  </p>
                  <p className="mb-4">•	Electrical Electronics Engineering
                      •	Computer Engineering Technology
                      •	Computer Science
                      •	Accountancy
                      •	Statistics <span className="text-destructive-foreground ">awaiting  more..</span></p>
                  <MagneticButton>
                    <Link to="/about">
                      <Button variant="secondary" size="lg" className="rounded-full text-foreground bg-background">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </MagneticButton>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slideLeft">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src="/loam (30).jpeg"
                    alt="Students in classroom"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className=" text-3xl md:text-4xl font-bold text-center mb-16 text-balance">
                Our Impact in Numbers
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <ScrollReveal key={stat.label} delay={index * 0.1}>
                  <div className="text-center p-6 rounded-2xl bg-gray-100">
                    <div className="font-serif text-4xl md:text-6xl font-bold text-accent">
                      <CounterAnimation end={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-muted-foreground mt-2">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal animation="scale">
              <div className="relative rounded-3xl overflow-hidden">
                <ParallaxImage
                  src="/loam (28).jpeg"
                  alt="Graduation celebration"
                  className="h-[500px]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent flex items-center">
                  <div className="px-8 md:px-16 max-w-2xl">
                    <h2 className="font-serif text-3xl md:text-5xl font-bold text-background mb-6 text-balance">
                      Begin Your Journey Today
                    </h2>
                    <p className="text-muted text-lg mb-8">
                      Join a community dedicated to excellence, innovation, and personal growth.
                    </p>
                    <MagneticButton>
                      <Link to="/contact">
                        <Button size="lg" className="rounded-full bg-background text-foreground hover:bg-background/90">
                          Schedule a Visit
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </MagneticButton>
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
