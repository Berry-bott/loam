"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Link } from "react-router-dom"
import { ArrowRight, Trophy, Music, Palette, Users, Heart, Globe, Utensils, Home } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Navbar } from "../../components/index/Navbar"
import { Footer } from "../../components/index/Footer"
import { ScrollReveal } from "../../components/index/ScrollReveal"
import { VideoSection } from "../../components/index/VideoSection"
import { FloatingCard } from "../../components/index/FloatingCard"
import { MagneticButton } from "../../components/index/MagneticButton"
import { LazyImage } from "../../components/index/LazyMedia"

const activities = [
  {
    icon: Trophy,
    title: "Sports",
    description: "15+ varsity sports teams competing at the highest level",
    image: "/sports-excellence-program.jpg",
  },
  {
    icon: Music,
    title: "Performing Arts",
    description: "Theater productions, orchestra, choir, and band programs",
    image: "/performing-arts-students.jpg",
  },
  {
    icon: Palette,
    title: "Visual Arts",
    description: "Sewing, Painting, sculpture, photography, and digital arts",
    image: "/visual-arts-students.jpg",
  },
  {
    icon: Users,
    title: "Clubs & Organizations",
    description: "50+ student-led clubs from robotics to debate",
    image: "/zone-meeting.jpeg",
  },
]

const facilities = [
  { icon: Utensils, title: "Cafeteria", description: "Delicious and hygienic meals with a variety of food options" },
  { icon: Home, title: "Modern Hostel", description: "Comfortable accommodation with well-equipped study areas and relaxation spaces" },
  { icon: Heart, title: "Wellness Centre ", description: "Comprehensive health services and professional counseling support" },
  { icon: Globe, title: "International Skill Centre ", description: "Global training programs and opportunities for skill development and exchange" },
]

const testimonials = [
  {
    quote: "Loam Polytechnic gave me the confidence to pursue my dreams. The community here is like family.",
    name: "Mercy Udoette",
    role: "Class of 2024",
  },
  {
    quote: "The balance between academics and extracurriculars helped me grow as a complete person.",
    name: "James Johnson",
    role: "Class of 2025",
  },
  {
    quote: "I found my passion for science here and now I'm pursuing it In Loam Polytechnic",
    name: "Emilia Matthew",
    role: "Class of 2025",
  },
]

export default function StudentLifePage() {
  const heroRef = useRef(null)
  const marqueeRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (heroRef.current) {
      gsap.to(heroRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
    }

    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 overflow-hidden">
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div ref={heroRef} className="absolute inset-0 z-0">
            <LazyImage
              src="/student-life-hero.jpg"
              alt="Students enjoying campus life"
              eager
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/50" />
          </div>

        <div className="relative shadow-xl z-10 text-center px-4 max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-primary text-sm uppercase tracking-[0.3em] font-bold -mt-16 drop-shadow-lg">
              Student Life
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-background mb-4 text-balance drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
              More Than <span className="italic">Education</span>
            </h1>
            <p className="text-background text-lg md:text-xl max-w-2xl mx-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
              Discover a vibrant community where students thrive through sports, arts, clubs, and lifelong
              friendships.
            </p>
          </ScrollReveal>
        </div>
        </section>

        <section className="py-8 bg-accent text-accent-foreground overflow-hidden">
          <div ref={marqueeRef} className="flex whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 px-4">
                <span className="text-lg font-medium">Athletics</span>
                <span className="text-2xl">•</span>
                <span className="text-lg font-medium">Theater</span>
                <span className="text-2xl">•</span>
                <span className="text-lg font-medium">Music</span>
                <span className="text-2xl">•</span>
                <span className="text-lg font-medium">Art</span>
                <span className="text-2xl">•</span>
                <span className="text-lg font-medium">Debate</span>
                <span className="text-2xl">•</span>
                <span className="text-lg font-medium">Community Service</span>
                <span className="text-2xl">•</span>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 md:py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-16">
              <p className="text-sm font-medium text-accent mb-4 uppercase tracking-wider">Get Involved</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Activities & Programmes</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From competitive sports to creative arts, find your passion and make memories that last a lifetime.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activities.map((activity, index) => (
                <FloatingCard key={activity.title} index={index}>
                  <div className="group relative bg-background border border-border rounded-2xl overflow-hidden hover:border-accent transition-all duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative aspect-square md:aspect-auto">
                        <LazyImage
                          src={activity.image}
                          alt={activity.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                          <activity.icon className="h-6 w-6 text-accent" />
                        </div>
                        <h3 className="font-serif text-2xl font-semibold mb-2">{activity.title}</h3>
                        <p className="text-muted-foreground mb-4">{activity.description}</p>
                        <Link
                          to="#"
                          className="text-accent font-medium inline-flex items-center hover:gap-2 transition-all"
                        >
                          Explore <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </FloatingCard>
              ))}
            </div>
          </div>
        </section>

        <section className="md:pt-16   px-4 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center md:mb-24">
              <p className="text-sm font-medium text-accent mb-4 uppercase tracking-wider">Day in the Life</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Experience Student Life</h2>
            </ScrollReveal>

            <VideoSection
              videoUrl="/loam-video.mp4"
              posterUrl="/student-life-video-poster.jpeg"
              title="A Day at Loam Polytechnic"
              // description="Follow our students through a typical day on campus"
              className="h-[300px] border-8"
            />
          </div>
        </section>

        <section className=" md:pt-4 md:pb-16 px-4 ">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal animation="slideRight">
                <p className="text-lg text-center md:text-left md:text-sm font-medium text-accent mb-4 uppercase tracking-wider">Campus Life</p>
                <h2 className="font-serif text-center md:text-left text-4xl md:text-5xl font-bold mb-6">World-Class Facilities</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Our Polytechnic is designed to support every aspect of student life, from academic pursuits to relaxation
                  and recreation.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {facilities.map((facility) => (
                    <div key={facility.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <facility.icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{facility.title}</h4>
                        <p className="text-muted-foreground text-sm">{facility.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slideLeft">
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <LazyImage
                    src="/campus-facility-block.jpeg"
                    alt="Campus facilities"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-24 mt-16 md:mt-0  md:py-16 px-4 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-16">
              <p className="text-sm font-medium text-primary-foreground/70 mb-4 uppercase tracking-wider">
                Student Stories
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Hear From Our Alumni</h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <ScrollReveal key={testimonial.name} delay={index * 0.1}>
                  <div className="bg-primary-foreground/10 rounded-2xl p-8 h-full">
                    <p className="text-primary-foreground/90 text-lg mb-6 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4">
                      {/* <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div> */}
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-primary-foreground/70 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">Ready to Join Our Community?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton>
                  <Link to="/admissions">
                    <Button size="lg" className="rounded-full">
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="rounded-full bg-transparent">
                      Contact Us
                    </Button>
                  </Link>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
