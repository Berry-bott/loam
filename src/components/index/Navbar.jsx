import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "../ui/button"
import { LazyImage } from "./LazyMedia"
import {
  PORTAL_SUBDOMAIN_URL,
  getAdmissionsUrl,
  getMainWebsitePath,
  isPortalSubdomain,
} from "../../lib/portal-routing"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/student-life", label: "Student Life" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
]

function MainNavLink({ href, label, className, onClick }) {
  if (isPortalSubdomain()) {
    return (
      <a href={getMainWebsitePath(href)} onClick={onClick} className={className}>
        {label}
      </a>
    )
  }

  return (
    <NavLink
      to={href}
      onClick={onClick}
      className={({ isActive }) =>
        `${className} ${isActive ? "text-primary border-b-2 border-primary" : ""}`
      }
    >
      {label}
    </NavLink>
  )
}

const academicsMenu = [
  {
    title: "Admissions",
    items: [
      { label: "Pre-National Diploma (Pre-ND)", to: "/admissions" },
      { label: "National Diploma (ND)", to: "/admissions" },
      { label: "Higher National Diploma (HND)", to: "/admissions" },
      { label: "National Diploma (Part-Time)", to: "/admissions" },
      { label: "Higher National Diploma (Part-Time)", to: "/admissions" },
    ],
  },
  {
    title: "Scholarship Schemes",
    items: [
      { label: "One-year Tuition Free Scholarship", to: "/admissions" },
      { label: "Victory Idewele Scholarship", to: "/admissions" },
      { label: "Prince Akpabio Scholarship", to: "/admissions" },
      { label: "Hon Jerry Otu Scholarship", to: "/admissions" },
      { label: "Father John (Jnr) Scholarship", to: "/admissions" },
    ],
  },
  {
    title: "Departments",
    items: [
      { label: "Accountancy" },
      { label: "Statistics" },
      { label: "Mass Communication" },
      { label: "Computer Science" },
      { label: "Electrical Electronics Enginneringn" },
      { label: "Science Laboratory Technology" },
      { label: "Computer Engineering Technology" },
      { label: "Estate Management" },
      { label: "Hospitality Management" },
    ],
  },
  {
    title: "PRINCIPAL OFFICDRS",
    items: [
      { label: "BoT Chairperson" },
      { label: "Rector" },
      { label: "Deputy Rector Administration" },
      { label: "Deputy Rector Academics" },
      { label: "Registrar" },
      { label: "Bursar" },
      { label: "Librarian" },
      { label: "Director of Programme" },
      { label: "Director of Institution of Continuing Education" },
      { label: "Admission Officer" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Digital Library", to: "/about" },
      { label: "Workshops and Laboratories", to: "/gallery" },
      { label: "Student Experience", to: "/student-life" },
      { label: "Campus Events", to: "/events" },
    ],
  },
]

function MenuItem({ item, onClick }) {
  if (item.to) {
    if (isPortalSubdomain() && item.to !== "/admissions") {
      return (
        <a
          href={getMainWebsitePath(item.to)}
          onClick={onClick}
          className="block text-[15px] leading-6 text-primary-foreground/85 transition-colors hover:text-portal-gold"
        >
          {item.label}
        </a>
      )
    }

    return (
      <Link
        to={item.to === "/admissions" ? getAdmissionsUrl() : item.to}
        onClick={onClick}
        className="block text-[15px] leading-6 text-primary-foreground/85 transition-colors hover:text-portal-gold"
      >
        {item.label}
      </Link>
    )
  }

  return <span className="block text-[15px] leading-6 text-primary-foreground/85">{item.label}</span>
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAcademicsOpen, setIsAcademicsOpen] = useState(false)
  const [isAcademicsHovered, setIsAcademicsHovered] = useState(false)
  const onPortalHost = isPortalSubdomain()

  const normalClass = "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
  const admissionsSection = academicsMenu[0]
  const scholarshipSection = academicsMenu[1]
  const departmentsSection = academicsMenu[2]
  const principalOfficersSection = academicsMenu[3]
  const resourcesSection = academicsMenu[4]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-md border-b border-border">
      <nav className="mx-auto px-4 lg:px-4">
        <div className="flex h-16 items-center justify-between">
          <a href={onPortalHost ? getMainWebsitePath("/") : "/"} className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-primary overflow-hidden">
              <LazyImage
                src="/school-logo.jpeg"
                alt="Loam Polytechnic Logo"
                eager
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-serif text-xl font-semibold text-foreground">
                Loam Polytechnic
              </span>
              <span className="text-[10.5px]">
                Loamy soil for academic excellence
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.slice(0, 2).map((link) => (
              <MainNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                className={normalClass}
              />
            ))}

            <div
              className="group static"
              onMouseEnter={() => setIsAcademicsHovered(true)}
              onMouseLeave={() => setIsAcademicsHovered(false)}
            >
              <button
                type="button"
                className={`${normalClass} flex items-center gap-1 border-b-2 border-transparent pb-0`}
              >
                <span className="transition-transform duration-200 group-hover:-translate-y-0.5">
                  Academics
                </span>
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5 group-hover:rotate-180" />
              </button>

              <div className="invisible absolute left-0 right-0 top-full z-50 -translate-y-1 border-t border-primary/10 bg-primary opacity-0 shadow-[0_18px_42px_rgba(34,12,8,0.22)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-primary/10 bg-primary" />
                <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-5 px-10 py-5 text-primary-foreground md:grid-cols-2 xl:grid-cols-4">
                  <div>
                    <h3 className="border-b border-primary-foreground/25 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-portal-gold">
                      {admissionsSection.title}
                    </h3>
                    <div className="mt-3 space-y-2.5">
                      {admissionsSection.items.map((item) => (
                        <MenuItem key={item.label} item={item} />
                      ))}
                    </div>

                    <h3 className="mt-5 border-b border-primary-foreground/25 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-portal-gold">
                      {scholarshipSection.title}
                    </h3>
                    <div className="mt-3 space-y-2.5">
                      {scholarshipSection.items.map((item) => (
                        <MenuItem key={item.label} item={item} />
                      ))}
                    </div>
                  </div>

                  {[departmentsSection, principalOfficersSection, resourcesSection].map((section) => (
                    <div key={section.title}>
                      <h3 className="border-b border-primary-foreground/25 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-portal-gold">
                        {section.title}
                      </h3>
                      <div className="mt-3 space-y-2.5">
                        {section.items.map((item) => (
                          <MenuItem key={item.label} item={item} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.slice(2).map((link) => (
              <MainNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                className={normalClass}
              />
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a href={PORTAL_SUBDOMAIN_URL}>
              <Button variant="outline" className="rounded-full">
                Portals
              </Button>
            </a>
            <a href={onPortalHost ? getMainWebsitePath("/contact") : "/contact"}>
              <Button className="rounded-full">
                Contact Us
              </Button>
            </a>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.slice(0, 2).map((link) => (
                <MainNavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                />
              ))}

              <div className="rounded-xl border border-border bg-primary/5">
                <button
                  type="button"
                  onClick={() => setIsAcademicsOpen((current) => !current)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-foreground"
                >
                  Academics
                  <ChevronDown className={`h-4 w-4 transition-transform ${isAcademicsOpen ? "rotate-180" : ""}`} />
                </button>

                {isAcademicsOpen ? (
                  <div className="space-y-5 border-t border-border px-4 py-4">
                    {academicsMenu.map((section) => (
                      <div key={section.title}>
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                          {section.title}
                        </h3>
                        <div className="mt-3 space-y-3">
                          {section.items.map((item) =>
                            item.to ? (
                              item.to === "/admissions" ? (
                                <Link
                                  key={item.label}
                                  to={getAdmissionsUrl()}
                                  onClick={() => setIsOpen(false)}
                                  className="block text-sm text-muted-foreground"
                                >
                                  {item.label}
                                </Link>
                              ) : (
                                <a
                                  key={item.label}
                                  href={onPortalHost ? getMainWebsitePath(item.to) : item.to}
                                  onClick={() => setIsOpen(false)}
                                  className="block text-sm text-muted-foreground"
                                >
                                  {item.label}
                                </a>
                              )
                            ) : (
                              <span key={item.label} className="block text-sm text-muted-foreground">
                                {item.label}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              {navLinks.slice(2).map((link) => (
                <MainNavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                />
              ))}

              <a href={onPortalHost ? getMainWebsitePath("/contact") : "/contact"} onClick={() => setIsOpen(false)}>
                <Button className="rounded-full w-fit">
                  Contact Us
                </Button>
              </a>
              <a href={PORTAL_SUBDOMAIN_URL} onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="rounded-full w-fit">
                  Portal
                </Button>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
