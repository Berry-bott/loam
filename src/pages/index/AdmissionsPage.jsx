// "use client"

// import { useEffect, useRef, useState } from "react"
// import { gsap } from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { ArrowRight, Calendar, FileText, Users, CheckCircle, Clock, Mail } from "lucide-react"
// import { Button } from "../../components/ui/button"
// import { Input } from "../../components/ui/input"
// import { Navbar } from "../../components/index/Navbar"
// import { Footer } from "../../components/index/Footer"
// import { ScrollReveal } from "../../components/index/ScrollReveal"
// import { VideoSection } from "../../components/index/VideoSection"
// import { MagneticButton } from "../../components/index/MagneticButton"
// import { CounterAnimation } from "../../components/index/CounterAnimation"

// const admissionSteps = [
//   {
//     icon: FileText,
//     step: "01",
//     title: "Submit Application",
//     description: "Complete our online application form with all required documents and transcripts.",
//   },
//   {
//     icon: Calendar,
//     step: "02",
//     title: " Screening",
//     description: "Visit our campus on the shaduled screening date, and get all your documents screened by the admission team. ",
//   },
//   {
//     icon: Users,
//     step: "03",
//     title: "Admission",
//     description: "Visit office of the admission officer for your admission letter.",
//   },
//   {
//     icon: CheckCircle,
//     step: "04",
//     title: "Acceptance",
//     description: "Submit your admission decision and complete enrollment procedures.",
//   },
// ]

// const deadlines = [
//   { program: "Early Decision", date: "November 15, 2025", status: "Open" },
//   { program: "Regular Decision", date: "January 15, 2026", status: "Open" },
//   { program: "Rolling Admission", date: "Feb 1, 2026", status: "Open" },
//   // { program: "Transfer Students", date: "April 1, 2027", status: "Open" },
// ]

// const stats = [
//   { value: 85, suffix: "%", label: "Acceptance Rate" },
//   { value: 100, suffix: "%", label: "Financial Aid Available" },
//   { value: 25, suffix: "", label: "Average Class Size" },
//   { value: 40, suffix: "+", label: "Countries Represented" },
// ]

// export default function AdmissionsPage() {
//   const heroRef = useRef(null)
//   const [email, setEmail] = useState("")

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger)

//     if (heroRef.current) {
//       gsap.fromTo(
//         heroRef.current,
//         { opacity: 0.8 },
//         {
//           opacity: 1,
//           ease: "none",
//           scrollTrigger: {
//             trigger: heroRef.current,
//             start: "top top",
//             end: "bottom top",
//             scrub: true,
//           },
//         },
//       )
//     }

//     return () => {
//       ScrollTrigger.getAll().forEach((st) => st.kill())
//     }
//   }, [])

//   return (
//     <>
//       <Navbar />
//       <main className="min-h-screen pt-16 border overflow-hidden">
//         <section className="relative h-[80vh] flex items-center overflow-hidden">
//           <div ref={heroRef} className="absolute inset-0 z-0">
//             <img
//               src="/IMG_5161.jpg"
//               alt="Loam Polytechnic"
//               className="w-screen h-full object-cover overflow-hidden"
//             />
//           <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/2 to-transparent" />
//           </div>

//           <div className="relative z-10 px-4 max-w-7xl mx-auto w-full">
//             <div className="max-w-2xl">
//               <ScrollReveal>
//                 <p className="text-muted text-sm uppercase tracking-[0.3em] font-medium mb-4">Admissions</p>
//                 <h1 className="font-serif text-3xl sm:text-5xl md:text-5xl font-bold text-background mb-6 text-balance">
//                   SCHOLARSHIP! SCHOLARSHIP!! SCHOLARSHIP!!! <span className="italic text-md "> Starts Here</span>
//                 </h1>
//                 <p className="text-muted text-lg md:text-xl mb-8">
//                   Loam Polytechnic is offering a one-year-tuition-free scholarship to suitably qualified candidates to study at Loam Polytechnic, Ikono in any of the following
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-4">
//                  <MagneticButton>
//                   <a
//                     href="https://forms.gle/UTabZwtyhN8SpaW19"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <Button
//                       size="lg"
//                       className="rounded-full bg-background text-foreground hover:bg-background/90"
//                     >
//                       Apply Now
//                       <ArrowRight className="ml-2 h-4 w-4" />
//                     </Button>
//                   </a>
//                 </MagneticButton>

//                   <MagneticButton>
//                     <Button
//                       size="lg"
//                       variant="outline"
//                       className="rounded-full border-background text-background hover:bg-background/10 bg-transparent"
//                     >
//                       Request Information
//                     </Button>
//                   </MagneticButton>
//                 </div>
//               </ScrollReveal>
//             </div>
//           </div>
//         </section>

//         <section className="py-16 px-4 bg-gray-500 text-background">
//           <div className="max-w-7xl mx-auto">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//               {stats.map((stat, index) => (
//                 <ScrollReveal key={stat.label} delay={index * 0.1}>
//                   <div className="text-center">
//                     <div className="font-serif text-4xl md:text-5xl font-bold">
//                       <CounterAnimation end={stat.value} suffix={stat.suffix} />
//                     </div>
//                     <p className="text-accent-foreground/80 mt-2 text-sm">{stat.label}</p>
//                   </div>
//                 </ScrollReveal>
//               ))}
//             </div>
//           </div>
//         </section>

//           <section className="py-24 md:py-24 px-4 bg-secondary/30">
//           <div className="max-w-7xl mx-auto">
//             <div className="grid grid-cols-1 lg:grid-cols- gap-16 items-center">
//               <div>
//                 <p className="text-sm font-medium text-accent uppercase tracking-wider mb-2">Learn More!</p>
//                 <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2">SCHOLARSHIP!!!</h2>
//               </div>
//                 <p className="text-muted-foreground text-lg "> 
//                   Loam Polytechnic is offering a one-year-tuition-free scholarship <br /> to suitably qualified 
//                   candidates to study at Loam Polytechnic, <br /> Ikono in any of the following National Diploma 
//                   (ND) Courses: 
//                 </p>
//               <ScrollReveal animation="slideRight" className="flex flex-wrap justify-center items- gap-4  ">
//                   <MagneticButton>
//                   <Button size="lg" className="rounded-full mb-[2px]">
//                   •	Statistics 
//                   </Button>
//                 </MagneticButton>
//                  <MagneticButton>
//                   <Button size="lg" className="rounded-full mb-[2px]">
//                   •	Computer Science 
//                   </Button>
//                 </MagneticButton>
//                   <MagneticButton>
//                   <Button size="lg" className="rounded-full mb-[2px]">
//                   •	Accountancy 
//                   </Button>
//                 </MagneticButton>
//                   <MagneticButton>
//                   <Button size="lg" className="rounded-full mb-[2px]">
//                   •	Electrical Electronics Engineering 
//                   </Button>
//                 </MagneticButton>
//                   <MagneticButton>
//                   <Button size="lg" className="rounded-full mb-[2px]">
//                   •	Computer Engineering Technology 
//                   </Button>
//                 </MagneticButton>
//                   <MagneticButton>
//                   <Button size="lg" className="rounded-full mb-[2px]">
//                   •	Business Administration (awaiting) 
//                   </Button>
//                 </MagneticButton>
//                   <MagneticButton>
//                   <Button size="lg" className="rounded-full mb-[2px]">
//                   •	Public Administration (awaiting) 
//                   </Button>
//                 </MagneticButton>
//                   <MagneticButton>
//                   <Button size="lg" className="rounded-full mb-[2px]">
//                   •	Science Lab Technology (awaiting) 
//                   </Button>
//                 </MagneticButton>
//                 <MagneticButton>
//                   <Button size="lg" className="rounded-full mb-[2px]">
//                   •	Estate Management (awaiting) 
//                   </Button>
//                 </MagneticButton>
//                 <MagneticButton>
//                   <Button size="lg" className="rounded-full">
//                   •	Mass Communication (awaiting)  
//                   </Button>
//                 </MagneticButton>
//               </ScrollReveal>

//               {/* <ScrollReveal animation="slideLeft">
//                 <VideoSection
//                   videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
//                   posterUrl="/loam (19).jpeg"
//                   title="Campus Tour"
//                 />
//               </ScrollReveal> */}
//             </div>
//           </div>
//         </section>

//         <section className="py-24 md:py-32 px-4">
//           <div className="max-w-7xl mx-auto">
//             <ScrollReveal className="text-center mb-16">
//               <p className="text-sm font-medium text-accent mb-4 uppercase tracking-wider">How to Apply</p>
//               <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Simple Admission Process</h2>
//               <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//                 Our streamlined application process makes it easy for families to join the Loam community.
//               </p>
//             </ScrollReveal>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {admissionSteps.map((step, index) => (
//                 <ScrollReveal key={step.title} delay={index * 0.1}>
//                   <div className="relative">
//                     <div className="text-8xl font-serif font-bold text-muted-foreground/10 absolute -top-4 -left-2">
//                       {step.step}
//                     </div>
//                     <div className="relative pt-12">
//                       <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
//                         <step.icon className="h-7 w-7 text-accent" />
//                       </div>
//                       <h3 className="font-serif text-xl font-semibold mb-2">{step.title}</h3>
//                       <p className="text-muted-foreground">{step.description}</p>
//                     </div>
//                   </div>
//                 </ScrollReveal>
//               ))}
//             </div>
//           </div>
//         </section>

      

//         <section className="py-24 md:py-32 px-4">
//           <div className="max-w-4xl mx-auto">
//             <ScrollReveal className="text-center mb-16">
//               <p className="text-sm font-medium text-accent mb-4 uppercase tracking-wider">Important Dates</p>
//               <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Application Deadlines</h2>
//             </ScrollReveal>

//             <ScrollReveal>
//               <div className="border border-border rounded-2xl overflow-hidden">
//                 <div className="grid grid-cols-3 bg-secondary/50 p-4 font-semibold">
//                   <span>Program</span>
//                   <span>Deadline</span>
//                   <span>Status</span>
//                 </div>
//                 {deadlines.map((deadline, index) => (
//                   <div
//                     key={deadline.program}
//                     className={`grid grid-cols-3 p-4 items-center ${
//                       index !== deadlines.length - 1 ? "border-b border-border" : ""
//                     }`}
//                   >
//                     <span className="font-medium">{deadline.program}</span>
//                     <span className="text-muted-foreground flex items-center">
//                       <Clock className="h-4 w-4 mr-2" />
//                       {deadline.date}
//                     </span>
//                     <span className="inline-flex items-center">
//                       <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
//                       {deadline.status}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </ScrollReveal>
//           </div>
//         </section>

//         <section className="py-24 md:py-32 px-4 bg-primary text-primary-foreground">
//           <div className="max-w-3xl mx-auto text-center">
//             <ScrollReveal>
//               <Mail className="h-12 w-12 mx-auto mb-6 text-primary-foreground/70" />
//               <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Stay Informed</h2>
//               <p className="text-primary-foreground/80 text-lg mb-8">
//                 Subscribe to receive updates about admissions, open houses, and important deadlines.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
//                 <Input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="rounded-full bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50"
//                 />
//                 <Button variant="secondary" className="rounded-full">
//                   Subscribe
//                 </Button>
//               </div>
//             </ScrollReveal>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </>
//   )
// }








import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ArrowRight, Calendar, FileText, Users, CheckCircle,
  Clock, Mail, Upload, ChevronRight, ChevronLeft, X, GraduationCap
} from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Navbar } from "../../components/index/Navbar"
import { Footer } from "../../components/index/Footer"
import { ScrollReveal } from "../../components/index/ScrollReveal"
import { MagneticButton } from "../../components/index/MagneticButton"
import { CounterAnimation } from "../../components/index/CounterAnimation"

// ─── Static data ──────────────────────────────────────────────────────────────

const admissionSteps = [
  { icon: FileText,    step: "01", title: "Submit Application", description: "Complete our online application form with all required documents and transcripts." },
  { icon: Calendar,    step: "02", title: "Screening",          description: "Visit our campus on the scheduled screening date and get all your documents screened by the admission team." },
  { icon: Users,       step: "03", title: "Admission",          description: "Visit the office of the admission officer for your admission letter." },
  { icon: CheckCircle, step: "04", title: "Acceptance",         description: "Submit your admission decision and complete enrollment procedures." },
]

const deadlines = [
  { program: "Early Decision",    date: "November 15, 2025", status: "Open" },
  { program: "Regular Decision",  date: "January 15, 2026",  status: "Open" },
  { program: "Rolling Admission", date: "Feb 1, 2026",       status: "Open" },
]

const stats = [
  { value: 85,  suffix: "%", label: "Acceptance Rate" },
  { value: 100, suffix: "%", label: "Financial Aid Available" },
  { value: 25,  suffix: "",  label: "Average Class Size" },
  { value: 40,  suffix: "+", label: "Countries Represented" },
]

const courses = [
  "Statistics",
  "Computer Science",
  "Accountancy",
  "Electrical Electronics Engineering",
  "Computer Engineering Technology",
  "Business Administration",
  "Public Administration",
  "Science Lab Technology",
  "Estate Management",
  "Mass Communication",
]

const formStepLabels = ["Personal Information", "Academic History", "Document Upload", "Review & Submit"]

// ─── Multi-step Application Form ─────────────────────────────────────────────

function ApplicationForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [trackingId] = useState(
    `LP-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`
  )

  const [form, setForm] = useState({
    firstName: "",
    surname: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    residentialAddress: "",
    nationality: "Nigeria",
    stateOfOrigin: "",
    lga: "",
    lastSchool: "",
    graduationYear: "",
    oLevelResults: "",
    chosenCourse: "",
    passport: null,
    oLevelCert: null,
    birthCert: null,
  })

  const progress = Math.round(((step - 1) / (formStepLabels.length - 1)) * 100)

  const handleChange = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleFile = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.files?.[0] ?? null }))

  // ── Success Screen ──
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
          <CheckCircle className="h-10 w-10 text-emerald-600" />
        </div>
        <h2 className="font-serif text-3xl font-bold mb-2">Submission Successful</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Your application for the {new Date().getFullYear()}/{new Date().getFullYear() + 1} Academic Session
          has been received and is currently under review by the admissions board.
        </p>

        <div className="border border-border rounded-2xl p-6 w-full max-w-sm mb-8 bg-secondary/20">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Tracking Identity</p>
          <div className="flex items-center justify-between">
            <span className="font-mono text-2xl font-bold">{trackingId}</span>
            <button
              onClick={() => navigator.clipboard.writeText(trackingId)}
              className="text-xs border border-border rounded-full px-3 py-1 hover:bg-secondary transition-colors"
            >
              Copy ID
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full max-w-sm mb-8 text-sm">
          {[
            { Icon: Mail,         title: "Email Sent",  desc: "Check your inbox for a detailed confirmation receipt." },
            { Icon: Clock,        title: "Review Time", desc: "Initial verification usually takes 3–5 business days." },
            { Icon: CheckCircle,  title: "Need Help?",  desc: "Contact our help desk for any application queries." },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-1">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <p className="font-semibold text-xs">{title}</p>
              <p className="text-muted-foreground text-xs">{desc}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button className="rounded-full">Go to Dashboard</Button>
          <Button variant="outline" className="rounded-full">
            View My Application <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>APPLICATION PROGRESS: {progress}%</span>
          <span>STEP {step} OF {formStepLabels.length}</span>
        </div>
        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-between mb-10 relative">
        <div className="absolute top-4 left-0 right-0 h-px bg-border" style={{ zIndex: 0 }} />
        {formStepLabels.map((label, i) => {
          const num = i + 1
          const done = num < step
          const active = num === step
          return (
            <div key={label} className="flex flex-col items-center gap-2" style={{ zIndex: 1 }}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all
                ${done   ? "bg-accent border-accent text-white"
                : active ? "bg-background border-accent text-accent"
                :          "bg-background border-border text-muted-foreground"}`}>
                {done ? <CheckCircle className="h-4 w-4" /> : num}
              </div>
              <span className={`text-xs text-center hidden sm:block max-w-[80px] leading-tight
                ${active ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Form card */}
      <div className="border border-border rounded-2xl bg-background p-6 md:p-8 shadow-sm">

        {/* ── Step 1: Personal Information ── */}
        {step === 1 && (
          <div>
            <div className="flex items-center gap-2 border-l-4 border-accent pl-3 mb-6">
              <h3 className="font-serif text-xl font-semibold">Personal Details</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">First Name</label>
                <Input placeholder="Adebayo" value={form.firstName} onChange={handleChange("firstName")} className="rounded-lg" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Surname</label>
                <Input placeholder="Oluwaseun" value={form.surname} onChange={handleChange("surname")} className="rounded-lg" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Date of Birth</label>
                <Input type="date" value={form.dateOfBirth} onChange={handleChange("dateOfBirth")} className="rounded-lg" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Gender</label>
                <select value={form.gender} onChange={handleChange("gender")}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Email Address</label>
                <Input type="email" placeholder="example@domain.com" value={form.email} onChange={handleChange("email")} className="rounded-lg" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Phone Number</label>
                <Input placeholder="+234 800 000 0000" value={form.phone} onChange={handleChange("phone")} className="rounded-lg" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Nationality</label>
                <select value={form.nationality} onChange={handleChange("nationality")}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Nigeria</option>
                  <option>Ghana</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">State of Origin</label>
                <Input placeholder="Akwa Ibom" value={form.stateOfOrigin} onChange={handleChange("stateOfOrigin")} className="rounded-lg" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">LGA</label>
                <Input placeholder="Ikono" value={form.lga} onChange={handleChange("lga")} className="rounded-lg" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Residential Address</label>
                <Input placeholder="No. 1, Example Street, City" value={form.residentialAddress} onChange={handleChange("residentialAddress")} className="rounded-lg" />
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Academic History ── */}
        {step === 2 && (
          <div>
            <div className="flex items-center gap-2 border-l-4 border-accent pl-3 mb-6">
              <h3 className="font-serif text-xl font-semibold">Academic History</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Last School Attended</label>
                <Input placeholder="Name of your secondary school" value={form.lastSchool} onChange={handleChange("lastSchool")} className="rounded-lg" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Year of Graduation</label>
                <Input placeholder="e.g. 2023" value={form.graduationYear} onChange={handleChange("graduationYear")} className="rounded-lg" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Chosen Course</label>
                <select value={form.chosenCourse} onChange={handleChange("chosenCourse")}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">Select a course</option>
                  {courses.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">O'Level Results Summary</label>
                <textarea
                  placeholder="e.g. English A1, Mathematics B2, Physics B3 ..."
                  value={form.oLevelResults}
                  onChange={handleChange("oLevelResults")}
                  rows={4}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Step 3: Document Upload ── */}
        {step === 3 && (
          <div>
            <div className="flex items-center gap-2 border-l-4 border-accent pl-3 mb-6">
              <h3 className="font-serif text-xl font-semibold">Document Upload</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Upload clear scans or photos. Accepted formats: PDF, JPG, PNG (max 5MB each).
            </p>
            <div className="flex flex-col gap-5">
              {[
                { label: "Passport Photograph",          key: "passport",   desc: "Recent white-background passport photo" },
                { label: "O'Level Certificate / Result", key: "oLevelCert", desc: "WAEC / NECO result slip or certificate" },
                { label: "Birth Certificate",            key: "birthCert",  desc: "National Population Commission certificate" },
              ].map(({ label, key, desc }) => (
                <div key={key}>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">{label}</label>
                  <p className="text-xs text-muted-foreground mb-2">{desc}</p>
                  <label className={`flex items-center gap-3 border-2 border-dashed rounded-xl p-4 cursor-pointer transition-colors
                    ${form[key] ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}`}>
                    <Upload className={`h-5 w-5 flex-shrink-0 ${form[key] ? "text-accent" : "text-muted-foreground"}`} />
                    <div className="flex-1 min-w-0">
                      {form[key]
                        ? <span className="text-sm font-medium text-accent truncate block">{form[key].name}</span>
                        : <span className="text-sm text-muted-foreground">Click to upload or drag & drop</span>}
                    </div>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFile(key)} />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 4: Review & Submit ── */}
        {step === 4 && (
          <div>
            <div className="flex items-center gap-2 border-l-4 border-accent pl-3 mb-6">
              <h3 className="font-serif text-xl font-semibold">Review & Submit</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Please review your information carefully before submitting.
            </p>

            {[
              {
                title: "Personal Information",
                rows: [
                  ["Full Name",    `${form.firstName} ${form.surname}`],
                  ["Date of Birth", form.dateOfBirth],
                  ["Gender",       form.gender],
                  ["Email",        form.email],
                  ["Phone",        form.phone],
                  ["Nationality",  form.nationality],
                  ["State / LGA",  `${form.stateOfOrigin} / ${form.lga}`],
                ],
              },
              {
                title: "Academic History",
                rows: [
                  ["Last School",     form.lastSchool],
                  ["Graduation Year", form.graduationYear],
                  ["Chosen Course",   form.chosenCourse],
                ],
              },
              {
                title: "Documents",
                rows: [
                  ["Passport",          form.passport?.name  ?? "Not uploaded"],
                  ["O'Level Cert",      form.oLevelCert?.name ?? "Not uploaded"],
                  ["Birth Certificate", form.birthCert?.name  ?? "Not uploaded"],
                ],  
              },
            ].map((section) => (
              <div key={section.title} className="mb-6 border border-border rounded-xl overflow-hidden">
                <div className="bg-secondary/40 px-4 py-2 font-semibold text-sm">{section.title}</div>
                {section.rows.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-2 px-4 py-2 text-sm border-t border-border">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium truncate">{v || <span className="italic text-muted-foreground">—</span>}</span>
                  </div>
                ))}
              </div>
            ))}

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              By submitting this form you confirm that all information provided is accurate and complete.
            </div>
          </div>
        )}

        {/* Nav buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground">
              Save as Draft
            </Button>
            {step > 1 && (
              <Button variant="outline" size="sm" className="rounded-full" onClick={() => setStep((s) => s - 1)}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Back
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground">Cancel</Button>
            {step < formStepLabels.length ? (
              <Button size="sm" className="rounded-full" onClick={() => setStep((s) => s + 1)}>
                Next Step <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button
                size="sm"
                className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => setSubmitted(true)}
              >
                Submit Application <CheckCircle className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Floating Scholarship Icon ────────────────────────────────────────────────

function FloatingScholarshipIcon() {
  const [hovered, setHovered] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {/* Floating button */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-2">

        {/* Tooltip */}
        <div
          className="transition-all duration-300 overflow-hidden"
          style={{ maxWidth: hovered && !showModal ? "240px" : "0px", opacity: hovered && !showModal ? 1 : 0 }}
        >
          <div className="bg-foreground text-background text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg">
            Loam Polytechnic Scholarship
          </div>
        </div>

        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setShowModal(true)}
          className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 border-4 border-background"
        >
          <GraduationCap className="h-6 w-6" />
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-background rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-5">
              <GraduationCap className="h-9 w-9 text-amber-600" />
            </div>

            <h3 className="font-serif text-2xl font-bold mb-2">Scholarship Portal</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Loam Polytechnic Tuition-Free Scholarship
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
              <p className="text-amber-800 font-semibold text-base mb-1">🚧 Not Available Yet</p>
              <p className="text-amber-700 text-sm">
                The scholarship portal is currently closed. Please check back later or subscribe to be notified when applications open.
              </p>
            </div>

            <Button variant="outline" className="rounded-full w-full" onClick={() => setShowModal(false)}>
              Try Again Later
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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
    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()) }
  }, [])

  return (
    <>
      <Navbar />
      <FloatingScholarshipIcon />

      <main className="min-h-screen pt-16 overflow-hidden">

        {/* ── Hero ── */}
        <section className="relative h-[80vh] flex items-center overflow-hidden">
          <div ref={heroRef} className="absolute inset-0 z-0">
            <img src="/IMG_5161.jpg" alt="Loam Polytechnic" className="w-screen h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/20 to-transparent" />
          </div>
          <div className="relative z-10 px-4 max-w-7xl mx-auto w-full">
            <div className="max-w-2xl">
              <ScrollReveal>
                <p className="text-muted text-sm uppercase tracking-[0.3em] font-medium mb-4">Admissions</p>
                <h1 className="font-serif text-3xl sm:text-5xl font-bold text-background mb-6 text-balance">
                  Your Future <span className="italic">Starts Here</span>
                </h1>
                <p className="text-muted text-lg md:text-xl mb-8">
                  Join Loam Polytechnic and unlock a world-class education at Ikono.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton>
                    <Button
                      size="lg"
                      className="rounded-full bg-background text-foreground hover:bg-background/90"
                      onClick={() => document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
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

        {/* ── Stats ── */}
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

        {/* ── Application Form ── */}
        <section id="apply-form" className="py-24 md:py-32 px-4 bg-secondary/20">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-14">
              <p className="text-sm font-medium text-accent mb-4 uppercase tracking-wider">Online Application</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Apply to Loam Polytechnic</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Complete your application in four simple steps. Your progress is saved automatically.
              </p>
            </ScrollReveal>
            <ApplicationForm />
          </div>
        </section>

        {/* ── Admission Process Steps ── */}
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

        {/* ── Deadlines ── */}
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
                    className={`grid grid-cols-3 p-4 items-center ${index !== deadlines.length - 1 ? "border-b border-border" : ""}`}
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

        {/* ── Stay Informed ── */}
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
                <Button variant="secondary" className="rounded-full">Subscribe</Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}