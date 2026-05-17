import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "../ui/button"
import { LazyImage } from "./LazyMedia"
import {
  getPortalUrl,
  getMainWebsitePath,
  isAdmissionsSubdomain,
  isBlogSubdomain,
  isPortalSubdomain,
} from "../../lib/portal-routing"
import { academicSections } from "../../pages/index/academics/academicData"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/student-life", label: "Student Life" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
]

function MainNavLink({ href, label, className, onClick }) {
  if (isPortalSubdomain() || isAdmissionsSubdomain() || isBlogSubdomain()) {
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

const academicsMenu = academicSections.map((section) => ({
  ...section,
  title: section.title === "Principal Officers" ? "PRINCIPAL OFFICERS" : section.title,
  items: section.items.map((item) => ({
    label: item.label,
    to: `/academics?${item.queryKey || item.slug}`,
  })),
}))

function MenuItem({ item, onClick }) {
  if (item.to) {
    if (isPortalSubdomain() || isAdmissionsSubdomain() || isBlogSubdomain()) {
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
        to={item.to}
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
  const [isDesktopAcademicsOpen, setIsDesktopAcademicsOpen] = useState(false)
  const onPortalHost = isPortalSubdomain()
  const onAdmissionsHost = isAdmissionsSubdomain()
  const onBlogHost = isBlogSubdomain()

  const normalClass = "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
  const admissionsSection = academicsMenu[0]
  const scholarshipSection = academicsMenu[1]
  const departmentsSection = academicsMenu[2]
  const principalOfficersSection = academicsMenu[3]
  const resourcesSection = academicsMenu[4]
  const closeAllMenus = () => {
    setIsOpen(false)
    setIsAcademicsOpen(false)
    setIsDesktopAcademicsOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-md border-b border-border">
      <nav className="mx-auto px-4 lg:px-4">
        <div className="flex h-16 items-center justify-between">
          <a href={onPortalHost || onAdmissionsHost || onBlogHost ? getMainWebsitePath("/") : "/"} className="flex items-center gap-2">
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
              onMouseEnter={() => setIsDesktopAcademicsOpen(true)}
              onMouseLeave={() => setIsDesktopAcademicsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsDesktopAcademicsOpen((current) => !current)}
                className={`${normalClass} flex items-center gap-1 border-b-2 border-transparent pb-0`}
              >
                <span className="transition-transform duration-200 group-hover:-translate-y-0.5">
                  Academics
                </span>
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5 group-hover:rotate-180" />
              </button>

              <div
                className={`absolute left-0 right-0 top-full z-50 border-t border-primary/10 bg-primary shadow-[0_18px_42px_rgba(34,12,8,0.22)] transition-all duration-200 ${
                  isDesktopAcademicsOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-1 opacity-0"
                }`}
              >
                <div className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-primary/10 bg-primary" />
                <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-5 px-10 py-5 text-primary-foreground md:grid-cols-2 xl:grid-cols-4">
                  <div>
                    <h3 className="border-b border-primary-foreground/25 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-portal-gold">
                      {admissionsSection.title}
                    </h3>
                    <div className="mt-3 space-y-2.5">
                      {admissionsSection.items.map((item) => (
                        <MenuItem key={item.label} item={item} onClick={closeAllMenus} />
                      ))}
                    </div>

                    <h3 className="mt-5 border-b border-primary-foreground/25 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-portal-gold">
                      {scholarshipSection.title}
                    </h3>
                    <div className="mt-3 space-y-2.5">
                      {scholarshipSection.items.map((item) => (
                        <MenuItem key={item.label} item={item} onClick={closeAllMenus} />
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
                          <MenuItem key={item.label} item={item} onClick={closeAllMenus} />
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
            <a href={getPortalUrl()}>
              <Button variant="outline" className="rounded-full">
                Portals
              </Button>
            </a>
            <a href={onPortalHost || onAdmissionsHost || onBlogHost ? getMainWebsitePath("/contact") : "/contact"}>
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
                              <a
                                key={item.label}
                                href={onPortalHost || onAdmissionsHost || onBlogHost ? getMainWebsitePath(item.to) : item.to}
                                onClick={closeAllMenus}
                                className="block text-sm text-muted-foreground"
                              >
                                {item.label}
                              </a>
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

              <a href={onPortalHost || onAdmissionsHost || onBlogHost ? getMainWebsitePath("/contact") : "/contact"} onClick={() => setIsOpen(false)}>
                <Button className="rounded-full w-fit">
                  Contact Us
                </Button>
              </a>
              <a href={getPortalUrl()} onClick={() => setIsOpen(false)}>
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
