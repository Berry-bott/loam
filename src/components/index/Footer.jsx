import { Link } from "react-router-dom"

const footerLinks = {
  navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/academics", label: "Academics" },
    { href: "/admissions", label: "Admissions" },
    { href: "/student-life", label: "Student Life" },
    { href: "/gallery", label: "Gallery" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
  ],
  resources: [
    { href: "/adverts", label: "Announcements" },
    { href: "#", label: "Student Portal" },
    { href: "#", label: "Parent Portal" },
    { href: "#", label: "Career Opportunities" },
  ],
  contact: [
    { label: "Loampolytexchnic.edu.com" },
    { label: "Loampoly@gmail.com" },
    { label: "08052127771 or 08101073958" },
    { label: " Km 4 Old Itu Road, Ikono, Akwa Ibom State." },
    { label: "Facebook | X | Instagram | youtube - @loampoly" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <div className="h-12 w-12 rounded-full bg-" >
            <img src="/school-logo.jpeg" alt="" className="rounded-full" />
              </div>
            <div className="flex flex-col">
            <span className="font-serif text-xl font-semibold text-">Loam Polytechnic..
            </span>
            <span className="text-[14px] text-destructive">Loamy soil for academic excellence</span>
            </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              {footerLinks.contact.map((item, idx) => (
                <li key={idx} className="text-primary-foreground text-sm">
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} Loam Polytechnic. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
