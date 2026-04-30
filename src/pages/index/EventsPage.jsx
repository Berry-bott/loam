
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, Clock, MapPin, ArrowRight, X } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Navbar } from "../../components/index/Navbar"
import { Footer } from "../../components/index/Footer"
import { ScrollReveal } from "../../components/index/ScrollReveal"

const upcomingEvents = [
  {
    id: 1,
    title: "Resource Inspection",
    date: "February, 2023",
    location: "Main Campus",
    description: "Member representing Essien Udim State Constituency in Akwa Ibom State House of Assembly, Prince Ukpong Akpabio II,",
    fullDescription: `Loam Polytechnic, Ikono proudly announces a major milestone in its academic journey following the successful accreditation of several National Diploma (ND) programmes by the National Board for Technical Education (NBTE).

      From April 16 to April 18, 2023, an NBTE accreditation team visited the institution for a comprehensive resource inspection. The purpose of the visit was to assess the Polytechnic’s readiness to offer quality technical education in key programme areas. After a thorough evaluation of facilities, staffing, curriculum, and overall academic environment, the Board granted full accreditation for the following National Diploma programmes:

      Accountancy
      Computer Science
      Computer Engineering Technology
      Electrical/Electronics Engineering Technology
      Statistics`,
    image: "/loam (13).jpeg",
    featured: true,
  },
  {
    id: 2,
    title: "Akpabio Extends Scholarship ",
    date: "March, 2025",
    location: "Performing Arts Center",
    description: "Akpabio extends scholarship to degree level for 20 polytechnic students",
      fullDescription: `Member representing Essien Udim State Constituency in Akwa Ibom State House of Assembly, Prince Ukpong Akpabio II, has awarded full scholarships up to Higher National Diploma (HND) or first degree level to 20 students of Loam Polytechnic, Ikono, whom he earlier sponsored for their National Diploma (ND) programme.

      The beneficiaries, who studied Accounting, Electrical/Electronics Engineering and Computer Science, recently completed their ND programmes and will now proceed to higher academic pursuits in public tertiary institutions of their choice.

      Prince Akpabio announced the extension of the scholarship on Saturday while hosting the students to a breakfast meeting at his residence in Ukana, Essien Udim Local Government Area.

      "My greatest joy will be the day you will proceed for NYSC and return successfully to contribute meaningfully to your families and communities." Prince Akpabio said.

      The lawmaker, who is currently pursuing a doctoral degree in Public Administration, announced that more than 50 students are currently benefitting from his educational intervention programmes at secondary, polytechnic and university levels, with special empowerment incentives for first-class graduates.`,
    image: "/event-img.jpeg",
    featured: true,
  },
  {
    id: 3,
    title: "Maiden Matriculation Ceremony",
    date: "May 25, 2026",
    location: "Main Auditorium",
    description: "The matriculation of 2023/2024 and 2024/2025 Students of Loam Polytechnic, Ikono.",
    fullDescription: `Loam Polytechnic Holds Maiden Matriculation Ceremony for 2023/2024 and 2024/2025 Academic Sessions
    Loam Polytechnic, Ikono, marked a historic milestone with the successful hosting of its maiden matriculation ceremony for the 2023/2024 and 2024/2025 academic sessions. The event, held on Friday, March 28, 2025, at the school playground, brought together dignitaries, academic leaders, students, and invited guests in a celebration of growth, vision, and academic excellence.

    The ceremony officially welcomed newly admitted students into the Polytechnic community, symbolizing their formal induction into higher education and their commitment to academic pursuit and discipline.

    The event was graced by the presence of distinguished personalities, including the Executive Governor, Pastor Umo Eno, who was ably represented. Also in attendance was the Honourable Member representing Ikot Ekpene/Obot Akara State Constituency, Hon. Jerry Otu, alongside the institution’s leadership team led by the Rector, Otuekong Eddie Etim.`,
    image: "/event-img2.jpeg",
    featured: true,
  },


    {
    id: 4,
    title: "Convocation Comming",
    date: "Nov, 2026",
    location: "Science Building",
    description: "The convocation ceremony for the graduating class of 2025, celebrating their academic achievements and contributions to the Polytechnic community.",
    image: "/loam (28).jpeg",
    featured: false,
  },
    {
    id: 5,
    title: "Project Defence",
    date: "April 18, 2026",
    location: "Athletic Complex",
    description: " The final project defence for the graduating class of 2025, showcasing their innovative solutions and research findings in various fields of study.",
    image: "/track-field-athletics.jpg",
    featured: false,
  },
   {
    id: 6,
    title: "Parent-Teacher Conference",
    date: "April 3-4, 2026",
    location: "Various Classrooms",
    description: "An opportunity to discuss your child's progress with their teachers and advisors.",
    image: "/parent-teacher-meeting.jpg",
    featured: false,
  },
]



// ─── Modal Component ───────────────────────────────────────────────────────

function EventModal({ event, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto">
        
        {/* Image */}
        <div className="relative aspect-[16/7] overflow-hidden rounded-t-2xl">
          <img
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-6 right-14">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">{event.title}</h2>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-accent" />
              {event.date}
            </span>
            {event.time && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-accent" />
                {event.time}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-accent" />
              {event.location}
            </span>
          </div>

          <div className="space-y-4 text-sm md:text-base leading-relaxed text-foreground/80">
            {event.fullDescription.trim().split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph.trim()}</p>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Button onClick={onClose} variant="outline" className="rounded-full">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function EventsPage() {
  const heroTitleRef = useRef(null)
  const timelineRef = useRef(null)
  const [selectedEvent, setSelectedEvent] = useState(null)

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
      <main className="min-h-screen pt-8">
        
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
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <Button
                        className="w-full mt-6 rounded-full"
                        onClick={() => setSelectedEvent(event)}
                      >
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

        <section className=" py-16 bg-secondary px-4">
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

        <section className="py-16 px-4">
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

      {/* Modal */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  )
}