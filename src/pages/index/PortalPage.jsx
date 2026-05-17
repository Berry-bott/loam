import { FileText, GraduationCap, Settings2 } from "lucide-react"
import { Link } from "react-router-dom"
import { Navbar } from "../../components/index/Navbar"
import { ScrollReveal } from "../../components/index/ScrollReveal"
import { getAdmissionsUrl, getStudentLoginRoute } from "../../lib/portal-routing"

function PortalCard({ title, subtitle, to, icon: Icon, delay = 0 }) {
  const isExternalLink = typeof to === "string" && /^https?:\/\//.test(to)
  const cardContent = (
    <div className="group relative overflow-hidden rounded-md border border-primary bg-white p-8 shadow-[0_12px_28px_rgba(31,41,55,0.10)] transition-all duration-150 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(31,41,55,0.14)]">
      {/* <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-stone-100 transition-all duration-150 group-hover:h-32 group-hover:w-32 group-hover:bg-primary" /> */}

      <div className="absolute right-5 top-5 z-10 transition-transform duration-150 group-hover:scale-105">
        <Icon className="h-[40px] w-[40px] text-primary transition-colors duration-100 " strokeWidth={2.2} />
      </div>

      <div className="relative z-10 flex h-[92px] flex-col justify-between">
        <div className="max-w-[70%]">
          <h2 className="text-[22px] font-semibold tracking-wide text-blue-950 ">{title}</h2>
          <p className="mt-2 text-[15px] leading-7 text-blue-950">{subtitle}</p>
        </div>

        <div className="mt-8 flex items-center gap-2">
          <span className="h-1.5 w-12 rounded-full bg-primary" />
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="h-2 w-2 rounded-full bg-primary" />
        </div>
      </div>
    </div>
  )

  return (
    <ScrollReveal delay={delay}>
      {to ? (
        isExternalLink ? (
          <a href={to} className="block focus:outline-none">
            {cardContent}
          </a>
        ) : (
          <Link to={to} className="block focus:outline-none">
            {cardContent}
          </Link>
        )
      ) : (
        <div aria-disabled="true" className="block cursor-default opacity-95">
          {cardContent}
        </div>
      )}
    </ScrollReveal>
  )
}

export default function PortalPage() {
  const currentHour = new Date().getHours()
  const admissionsUrl = getAdmissionsUrl()
  const portalCards = [
    {
      title: "ADMISSION",
      subtitle: "Admissions Portal",
      to: admissionsUrl,
      icon: FileText,
    },
    {
      title: "STUDENTSLOGIN",
      subtitle: "Student's Portal",
      to: getStudentLoginRoute(),
      icon: GraduationCap,
    },
    {
      title: "CBT",
      subtitle: "Login for CBT exams",
      to: null,
      icon: Settings2,
    },
  ]
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 17
        ? "Good afternoon"
        : "Good evening"

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-100 pt-24">
        <section className="px-4 py-12 md:px-6 ">
          <div className="mx-auto max-w-[1500px]">
            <ScrollReveal className="mx-auto mb-14 max-w-4xl text-center">
              <h1 className="text-pretty text-[42px] font-semibold text-blue-950 md:text-[62px]">
                {greeting}, Students!
              </h1>
              <p className="text-[20px] text-slate-500">
                Your one-stop hub for all Portal Services!
              </p>  
              <div className="mx-auto mt-1 h-1.5 w-36 rounded-full bg-primary" /> 
            </ScrollReveal>

            <div className="grid grid-cols-1 mt-24 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {portalCards.map((card, index) => (
                <PortalCard key={card.title} {...card} delay={index * 0.08} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
