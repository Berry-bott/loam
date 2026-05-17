import { Link, useLocation, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight, BookOpen, Sparkles, Users } from "lucide-react"
import { Navbar } from "../../../components/index/Navbar"
import { Footer } from "../../../components/index/Footer"
import { ScrollReveal } from "../../../components/index/ScrollReveal"
import { LazyImage } from "../../../components/index/LazyMedia"
import { Button } from "../../../components/ui/button"
import { getAcademicItemByIdentifier, academicItems } from "./academicData"
import { getAdmissionsUrl } from "../../../lib/portal-routing"

export default function AcademicDetailPage() {
  const { slug } = useParams()
  const location = useLocation()
  const queryIdentifier = location.search.startsWith("?") ? decodeURIComponent(location.search.slice(1)) : ""
  const academicItem = getAcademicItemByIdentifier(queryIdentifier || slug)
  const admissionsUrl = getAdmissionsUrl()

  if (!academicItem) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen px-4 pt-32 pb-20">
          <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-background p-10 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Academic Directory</p>
            <h1 className="mt-4 font-serif text-4xl font-bold">Page not found</h1>
            <p className="mt-4 text-muted-foreground">We could not find the academic detail you were looking for.</p>
            <div className="mt-8 flex justify-center">
              <Link to="/">
                <Button className="rounded-full">Back Home</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const isDepartmentView = academicItem.category === "Departments"
  const isImageDetail = academicItem.category === "Principal Officers" || academicItem.category === "Resources"
  const relatedItems = academicItems
    .filter((item) => item.category === academicItem.category && item.slug !== academicItem.slug)
    .slice(0, 3)
  const aboutLabel = isDepartmentView
    ? "About This Department"
    : academicItem.category === "Principal Officers"
      ? "About This Officer"
      : "About This Resource"

  const sectionCards = isDepartmentView
    ? (academicItem.courses?.length ? academicItem.courses : academicItem.highlights).slice(0, 3).map((item, index) => ({
        title: item,
        eyebrow: `Course ${index + 1}`,
        body: academicItem.highlights[index] || "Core academic work designed to build practical skill and structured understanding.",
        icon: BookOpen,
      }))
    : academicItem.highlights.slice(0, 3).map((item, index) => ({
        title: item,
        eyebrow: index === 0 ? "Institutional Role" : index === 1 ? "Core Focus" : "Strategic Value",
        body: academicItem.description,
        icon: index === 2 ? Sparkles : Users,
      }))

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-secondary/30 pt-16">
        <section className="px-0 py-0">
          <div className="mx-auto min-h-screen max-w-[1240px] bg-background shadow-2xl">
            <div className="relative min-h-[310px] overflow-hidden bg-primary px-8 py-8 text-primary-foreground md:min-h-[360px] md:px-12 md:py-10">
              <div className="absolute inset-0 opacity-95">
                <div className="absolute -left-[12%] top-[10%] h-[220px] w-[145%] rotate-[12deg] rounded-full border-t border-primary-foreground/10" />
                <div className="absolute -left-[16%] top-[20%] h-[250px] w-[150%] rotate-[11deg] rounded-full border-t-2 border-primary-foreground/20" />
                <div className="absolute -left-[8%] top-[30%] h-[210px] w-[138%] rotate-[10deg] rounded-full border-t border-primary-foreground/40" />
                <div className="absolute -left-[10%] top-[42%] h-[240px] w-[142%] rotate-[9deg] rounded-full border-t-2 border-primary-foreground/25" />
                <div className="absolute -left-[18%] top-[53%] h-[260px] w-[155%] rotate-[8deg] rounded-full border-t border-primary-foreground/15" />
                <div className="absolute -left-[6%] top-[63%] h-[190px] w-[132%] rotate-[7deg] rounded-full border-t border-primary-foreground/30" />
              </div>

              <div className="relative z-10 max-w-3xl pt-4 md:pt-8">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back Home
                </Link>
                <p className="mt-12 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary-foreground/50">
                  {isDepartmentView ? "Department of Excellence" : academicItem.category}
                </p>
                <h1 className="mt-3 max-w-2xl font-sans text-4xl font-semibold leading-[0.95] md:text-[4.2rem]">
                  {academicItem.label}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-primary-foreground/80 md:text-[15px]">
                  {academicItem.summary}
                </p>
              </div>
            </div>

            <div className="border-b border-border px-8 py-5 md:px-12">
              <div className="flex flex-wrap items-center justify-center text-center text-[13px] font-semibold text-muted-foreground">
                <span className="border-b-2 border-primary pb-2 text-foreground">{aboutLabel}</span>
              </div>
            </div>

            <div className="border-b border-border px-8 py-10 md:px-12 md:py-12">
              <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr]">
                <ScrollReveal>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      About the Department
                    </p>
                    <p className="mt-6 max-w-[370px] text-2xl font-light italic leading-10 text-accent md:text-[2rem]">
                      "{isDepartmentView ? "Producing the next generation of digital architects and systems engineers." : academicItem.summary}"
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.06}>
                  <div className="space-y-6">
                    <p className="max-w-[720px] text-sm leading-8 text-muted-foreground md:text-[15px]">
                      {academicItem.description}
                    </p>

                    {isImageDetail ? (
                      <div className="max-w-full border-4 h-[320px] overflow-hidden rounded  border-border bg-secondary/30">
                        <div className=" overflow-hidden">
                          <LazyImage src={academicItem.image} alt={academicItem.label} className="h-full w-full object-contain object-top" />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </ScrollReveal>
              </div>
            </div>

            <div className="px-8 py-10 md:px-12 md:py-12">
              <ScrollReveal>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {isDepartmentView ? "Departmental Highlights" : "Key Highlights"}
                </p>
              </ScrollReveal>

              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {sectionCards.map((card, index) => (
                  <ScrollReveal key={card.title} delay={index * 0.05}>
                    <div className="min-h-[230px] border border-border bg-background p-6 shadow-sm">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 text-primary">
                        <card.icon className="h-4 w-4" />
                      </div>
                      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {card.eyebrow}
                      </p>
                      <h2 className="mt-3 text-[15px] font-semibold uppercase leading-6 text-foreground">
                        {card.title}
                      </h2>
                      <p className="mt-4 text-sm leading-7 text-muted-foreground">
                        {card.body}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {relatedItems.length ? (
                <div className="mt-8 grid gap-5 md:grid-cols-3">
                  {relatedItems.map((item, index) => (
                    <ScrollReveal key={item.slug} delay={(index + 1) * 0.05}>
                      <Link
                        to={item.href}
                        className="flex items-center gap-4 border border-border bg-secondary/20 p-4 transition-colors hover:border-primary/30"
                      >
                        <div className="h-14 w-14 overflow-hidden rounded-full bg-secondary">
                          <LazyImage src={item.image} alt={item.label} className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            Related
                          </p>
                          <p className="mt-1 truncate text-sm font-semibold text-foreground">{item.label}</p>
                        </div>
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="border-t border-border bg-secondary/40 px-8 py-7 md:px-12">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div className="max-w-xl text-[11px] leading-6 text-muted-foreground">
                  The department profile above presents the institution's academic direction, key focus areas, and
                  relevant learning pathways in one unified page.
                </div>
                <div className="flex flex-wrap items-center gap-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                    <Link to="/" className="inline-flex items-center gap-2">
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Home
                  </Link>

                  <a href={admissionsUrl} className="inline-flex items-center gap-2">
                    Apply Now
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>

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
