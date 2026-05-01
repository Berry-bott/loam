import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Target, Eye, Heart, Lightbulb } from "lucide-react"
import { Navbar } from "../../components/index/Navbar"
import { Footer } from "../../components/index/Footer"
import { ScrollReveal } from "../../components/index/ScrollReveal"
import { ParallaxImage } from "../../components/index/ParallaxImage"
import { CounterAnimation } from "../../components/index/CounterAnimation"

const values = [
  {
    icon: Target,
    title: "Mission",
    description:
      "To acquire, preserve, and promote inclusive access to a wide range of information resources and services that support the educational, cultural, and recreational activities of our community.",
  },
  {
    icon: Eye,
    title: "Vision",
    description:
      "To be the best library and information center that equips and promotes world-class information search, retrieval, and utilization skills for 21st-century learning activitie",
  },
  {
    icon: Heart,
    title: "Values",
    description:
      "Integrity, excellence, respect, responsibility, and community form the foundation of everything we do at Loam Polytechnic.",
  },
  {
    icon: Lightbulb,
    title: "Philosophy",
    description:
      "We believe every student has unique gifts and talents waiting to be discovered. Our role is to create an environment where these can flourish.",
  },
]

const leadership = [
  {
    name: "Otuekong Eddie Etim",
    role: "Rector with NBTE Officials",
    image: "/loam (45).jpeg",
  },
  {
    name: "Dcns Helen Ekong ",
    role: "Chairperson with the Rector",
    image: "/loam (30).jpeg",
  },
  {
    name: "Hon. Jerry Otu",
    role: "State House of Assembly Member with HODs",
    image: "/Loam-members.jpeg",
  },
  {
    name: "Resourc Person",
    role: "Entrepreneurship Development Centre",
    image: "/loam (23).jpeg",
  },
]

const timeline = [
  { year: "2023", event: "Loam Polytechnic founded with 50 students" },
  { year: "2024", event: "New campus expansion and first graduating class of 100" },
  { year: "2025", event: "Introduction of international exchange program" },
  { year: "2025", event: "Innovation lab established" },
  // { year: "2015", event: "Awarded National School of Excellence" },
  // { year: "2025", event: "Celebrating 50 years of educational excellence" },
]

export default function AboutPage() {
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
      const items = timelineRef.current.querySelectorAll(".timeline-item")
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-1 border-4">
        <section className="relative py-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-4">About Loam Polytechnic</p>
                <h1
                  ref={heroTitleRef}
                  className="font-serif text-4xl md:text-5xl  font-bold mb-6 text-balance"
                >
                  Four year of continuous building and shaping of future leaders 
                </h1>
                <p className="text-muted-foreground text-lg">
                  Since 2002, Loam Polytechnic’s e-Library has stood out as the leading CBT Centre in Akwa Ibom State.
                   As the first private polytechnic in the state to provide such extensive facilities and learning space, 
                   the institution has remained at the forefront of educational excellence—blending strong traditional values with innovative approaches to prepare students for a rapidly evolving world.  
                </p>
              </div>

              <ScrollReveal animation="slideLeft">
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="/loam (41).jpeg"
                    alt="Loam Polytechnic campus"
                    className="w-full h-full object-contain"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-16">Our Foundation</h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <ScrollReveal key={value.title} delay={index * 0.1}>
                  <div className="bg-card rounded-xl p-8 h-full">
                    <value.icon className="h-10 w-10 text-accent mb-4" />
                    <h3 className="font-serif text-2xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-16">Our Journey</h2>
            </ScrollReveal>

            <div ref={timelineRef} className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`timeline-item relative flex items-center mb-12 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                    <span className="font-serif text-4xl font-bold text-accent">{item.year}</span>
                    <p className="text-muted-foreground mt-2">{item.event}</p>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16  bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-4">Leadership Team</h2>
              <p className="text-primary-foreground/70 text-center max-w-2xl mx-auto mb-16">
                Meet the dedicated professionals guiding Loam Polytechnic towards continued excellence.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadership.map((person, index) => (
                <ScrollReveal key={person.name} delay={index * 0.1} animation="fadeUp">
                  <div className="text-center group">
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                      <img
                        src={person.image || "/placeholder.svg"}
                        alt={person.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <h3 className="font-serif text-xl font-semibold">{person.name}</h3>
                    <p className="text-primary-foreground/70">{person.role}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal animation="slideRight">
                <ParallaxImage
                  src="/loam (40).jpeg"
                  alt="Students in lab"
                  className="h-[400px] rounded-xl"
                />
              </ScrollReveal>

              <div>
                <ScrollReveal>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">Excellence by the Numbers</h2>
                </ScrollReveal>

                <div className="grid grid-cols-2 gap-8">
                  <ScrollReveal delay={0.1}>
                    <div>
                      <div className="font-serif text-4xl font-bold">
                        <CounterAnimation end={15} suffix=":1" />
                      </div>
                      <p className="text-muted-foreground">Student to Teacher Ratio</p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.2}>
                    <div>
                      <div className="font-serif text-4xl font-bold">
                        <CounterAnimation end={40} suffix="+" />
                      </div>
                      <p className="text-muted-foreground">AP Courses Offered</p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.3}>
                    <div>
                      <div className="font-serif text-4xl font-bold">
                        <CounterAnimation end={95} suffix="%" />
                      </div>
                      <p className="text-muted-foreground">College Acceptance</p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.4}>
                    <div>
                      <div className="font-serif text-4xl font-bold">
                        <CounterAnimation end={25} suffix="+" />
                      </div>
                      <p className="text-muted-foreground">Sports Programs</p>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
