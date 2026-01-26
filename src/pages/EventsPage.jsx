"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react"
import { Button } from "../components/ui/button"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { ScrollReveal } from "../components/ScrollReveal"

const upcomingEvents = [
  {
    id: 1,
    title: "Open House 2026",
    date: "February 15, 2026",
    time: "10:00 AM - 2:00 PM",
    location: "Main Campus",
    description:
      "Tour our campus, meet faculty, and learn about our programs. Perfect for prospective students and families.",
    image: "/loam (13).jpeg",
    featured: true,
  },
  {
    id: 2,
    title: "Spring Musical: Les Misérables",
    date: "March 5-7, 2026",
    time: "7:00 PM",
    location: "Performing Arts Center",
    description: "Our talented students bring this Broadway classic to life in an unforgettable production.",
    image: "/IMG_PIX 2.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "Science Fair",
    date: "March 20, 2026",
    time: "9:00 AM - 4:00 PM",
    location: "Science Building",
    description: "Witness innovative projects from our budding scientists across all grade levels.",
    image: "/loam (28).jpeg",
    featured: false,
  },
  {
    id: 4,
    title: "Parent-Teacher Conference",
    date: "April 3-4, 2026",
    time: "3:00 PM - 8:00 PM",
    location: "Various Classrooms",
    description: "An opportunity to discuss your child's progress with their teachers and advisors.",
    image: "/parent-teacher-meeting.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "Track & Field Championships",
    date: "April 18, 2026",
    time: "8:00 AM - 5:00 PM",
    location: "Athletic Complex",
    description: "Cheer on our athletes as they compete in the regional championships.",
    image: "/track-field-athletics.jpg",
    featured: false,
  },
  {
    id: 6,
    title: "Graduation Ceremony",
    date: "May 25, 2026",
    time: "2:00 PM",
    location: "Main Auditorium",
    description: "Celebrate the Class of 2026 as they embark on their next chapter.",
    image: "/loam (28).jpeg",
    featured: true,
  },
]

export default function EventsPage() {
  const heroTitleRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (heroTitleRef.current) {
      gsap.fromTo(
        heroTitleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 },
      )
    }

    if (timelineRef.current) {
      const line = timelineRef.current.querySelector(".timeline-line")
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top center",
              end: "bottom center",
              scrub: 1,
            },
          },
        )
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  const featuredEvents = upcomingEvents.filter((e) => e.featured)
  const regularEvents = upcomingEvents.filter((e) => !e.featured)

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <section className="py-24 md:py-32 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm font-medium text-muted-foreground mb-4">School Events</p>
            <h1 ref={heroTitleRef} className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Where Learning
              <br />
              <span className="italic">Comes Alive</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From academic showcases to cultural celebrations, discover the events that make Loam Polytechnic a
              vibrant community.
            </p>
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8">Featured Events</h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event, index) => (
                <ScrollReveal key={event.id} delay={index * 0.1}>
                  <div className="group bg-card rounded-xl overflow-hidden border border-border hover:border-accent transition-colors duration-300">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <Button className="w-full mt-6 rounded-full">
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

        <section className="py-24 md:py-32 bg-secondary px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-16">Upcoming Schedule</h2>
            </ScrollReveal>

            <div ref={timelineRef} className="relative">
              <div className="timeline-line absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2 origin-top" />

              {regularEvents.map((event, index) => (
                <ScrollReveal key={event.id} delay={index * 0.1}>
                  <div
                    className={`relative flex flex-col md:flex-row items-start mb-12 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`w-full md:w-1/2 pl-8 md:pl-0 ${
                        index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                      }`}
                    >
                      <div className="bg-card rounded-xl p-6 border border-border">
                        <span className="text-sm font-medium text-accent">{event.date}</span>
                        <h3 className="font-serif text-xl font-semibold mt-1 mb-2">{event.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background" />
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal animation="scale">
              <div className="bg-primary text-primary-foreground rounded-2xl p-12">
                <Calendar className="h-12 w-12 mx-auto mb-6" />
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">Never Miss an Event</h2>
                <p className="text-primary-foreground/80 mb-8">
                  Subscribe to our school calendar and stay updated with all events, deadlines, and important dates.
                </p>
                <Button size="lg" variant="secondary" className="rounded-full">
                  Subscribe to Calendar
                  <ArrowRight className="ml-2 h-4 w-4" />
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
