import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "../ui/button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/admissions", label: "Admissions" },
  { href: "/student-life", label: "Student Life" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
]

const academicsMenu = [
  {
    title: "Admissions",
    items: [
      { label: "National Diploma", to: "/admissions" },
      { label: "Higher National Diploma", to: "/admissions" },
      { label: "Application Process", to: "/admissions" },
      { label: "Entry Requirements", to: "/admissions" },
    ],
  },
  {
    title: "Departments",
    items: [
      { label: "Computer Science" },
      { label: "Computer Engineering" },
      { label: "Electrical Electronics Engineering" },
      { label: "Accountancy" },
      { label: "Statistics" },
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
    return (
      <Link
        to={item.to}
        onClick={onClick}
        className="block text-sm text-primary-foreground/85 transition-colors hover:text-portal-gold"
      >
        {item.label}
      </Link>
    )
  }

  return <span className="block text-sm text-primary-foreground/85">{item.label}</span>
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAcademicsOpen, setIsAcademicsOpen] = useState(false)

  const activeClass = "text-primary border-b-2 border-primary"
  const normalClass = "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-md border-b border-border">
      <nav className="mx-auto px-4 lg:px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-primary overflow-hidden">
              <img
                src="/school-logo.jpeg"
                alt="Loam Polytechnic Logo"
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
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.slice(0, 3).map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) => `${normalClass} ${isActive ? activeClass : ""}`}
              >
                {link.label}
              </NavLink>
            ))}

            <div className="group static">
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Academics
                <ChevronDown className="h-4 w-4" />
              </button>

              <div className="invisible absolute left-0 right-0 top-full z-50 border-t border-primary/10 bg-primary opacity-0 shadow-[0_24px_60px_rgba(34,12,8,0.28)] transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <div className="mx-auto grid max-w-7xl gap-10 px-8 py-8 text-primary-foreground md:grid-cols-3">
                  {academicsMenu.map((section) => (
                    <div key={section.title}>
                      <h3 className="border-b border-primary-foreground/25 pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-portal-gold">
                        {section.title}
                      </h3>
                      <div className="mt-5 space-y-4">
                        {section.items.map((item) => (
                          <MenuItem key={item.label} item={item} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.slice(3).map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) => `${normalClass} ${isActive ? activeClass : ""}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/auth/login">
              <Button variant="outline" className="rounded-full">
                Login
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="rounded-full">
                Contact Us
              </Button>
            </Link>
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
              {navLinks.slice(0, 3).map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold"
                      : "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  }
                >
                  {link.label}
                </NavLink>
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
                              <Link
                                key={item.label}
                                to={item.to}
                                onClick={() => setIsOpen(false)}
                                className="block text-sm text-muted-foreground"
                              >
                                {item.label}
                              </Link>
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

              {navLinks.slice(3).map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary font-semibold"
                      : "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button className="rounded-full w-fit">
                  Contact Us
                </Button>
              </Link>
              <Link to="/auth/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="rounded-full w-fit">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
