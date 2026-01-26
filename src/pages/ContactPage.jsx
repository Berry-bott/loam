"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { ScrollReveal } from "../components/ScrollReveal"
import { MagneticButton } from "../components/MagneticButton"

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    details: ["Km 4 Old Itu Road, Ikono, Akwa Ibom State."],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+2348052127771 ", "+2348101073958 "],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["Loampoly@gmail.com"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Monday - Friday: 8am - 5pm", "Saturday: 9am - 1pm"],
  },
]

// const departments = [
//   { name: "General Inquiries", email: "Loampoly@gmail.com" },
//   { name: "Admissions", email: "Loampoly@gmail.com" },
//   { name: "Financial Aid", email: "Loampoly@gmail.com" },
//   { name: "Athletics", email: "Loampoly@gmail.com" },
//   { name: "Alumni Relations", email: "Loampoly@gmail.com" },
// ]

export default function ContactPage() {
  const heroRef = useRef(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formState)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 overflow-hidden">
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <div ref={heroRef} className="absolute inset-0 z-0">
            <img src="/WhatsApp Image 2023-05-13 at 7.13.26 PM (1).jpeg" alt="Loam Polytechic" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/80 to-foreground/100" />

          </div>

          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            <ScrollReveal>
              <p className="text-muted text-sm uppercase tracking-[0.3em] font-medium mb-4">Get In Touch</p>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-background mb-6">
                Contact <span className="italic">Us</span>
              </h1>
              <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto">
                We're here to answer your questions and help you on your journey to Loam Polytechnic.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 px-4 -mt-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <ScrollReveal key={info.title} delay={index * 0.1}>
                  <div className="bg-background border border-border rounded-2xl p-6 text-center h-full shadow-lg">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <info.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <ScrollReveal animation="slideRight">
                <div>
                  <p className="text-sm font-medium text-accent mb-4 uppercase tracking-wider">Send a Message</p>
                  <h2 className="font-serif text-4xl font-bold mb-6">We'd Love to Hear From You</h2>
                  <p className="text-muted-foreground mb-8">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <Input
                          placeholder="Your name"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject</label>
                      <Input
                        placeholder="How can we help?"
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <Textarea
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="rounded-xl resize-none"
                      />
                    </div>
                    <MagneticButton className="inline-block">
                      <Button type="submit" size="lg" className="rounded-full">
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </MagneticButton>
                  </form>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slideLeft">
                <div className="space-y-8">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                  <a href="https://maps.app.goo.gl/cVRDg2anzCEqd5LF6" target="_blank">
                    <img src="/maps.jpeg" alt="Campus Map" className="w-full h-full object-cover" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-background/90 backdrop-blur-sm rounded-xl p-4 shadow-lg text-center">
                        <MapPin className="h-8 w-8 text-accent mx-auto mb-2" />
                        <p className="font-semibold">Loam Polytechnic</p>
                        <p className="text-muted-foreground text-sm"> Km 4 Old Itu Road, Ikono, Akwa Ibom State.</p>
                      </div>
                    </div>
                  </a>

                  </div>

                  <div className="bg-secondary/50 rounded-2xl p-6">
                    <h3 className="font-serif text-xl font-semibold mb-2">Department Contact</h3>
                    <p>Call: +2347052127771</p>
                    {/* <div className="space-y-3">
                      {departments.map((dept) => (
                        <div
                          key={dept.name}
                          className="flex items-center justify-between py-2 border-b border-border last:border-0"
                        >
                          <span className="font-medium">{dept.name}</span>
                          <a href={`mailto:${dept.email}`} className="text-accent text-sm hover:underline">
                            {dept.email}
                          </a>
                        </div>
                      ))}
                    </div> */}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-4 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Schedule a Campus Visit</h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
                Experience Loam Polytechnic firsthand. Schedule a tour and meet our faculty, staff, and students.
              </p>
              <MagneticButton className="inline-block">
                <Button size="lg" variant="secondary" className="rounded-full">
                  Book a Tour
                </Button>
              </MagneticButton>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
