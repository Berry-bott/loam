
// import { useState } from "react"
// import { Link } from "react-router-dom"
// import { Menu, X } from "lucide-react"
// import { Button } from "./ui/button"

// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/about", label: "About" },
//   // { href: "/academics", label: "Academics" },
//   { href: "/admissions", label: "Admissions" },
//   { href: "/student-life", label: "Student Life" },
//   { href: "/gallery", label: "Gallery" },
//   { href: "/events", label: "Events" },
//   // { href: "/adverts", label: "Adverts" },
// ]

// export function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-md border-b border-border">
//       <nav className="mx-auto px-4  lg:px-4">
//         <div className="flex h-16 items-center justify-between">
//           <Link to="/" className="flex items-center gap-2">
//             <div className="h-9 w-9 rounded-full bg-primary" >
//             <img src="/school-logo.jpeg" alt="" />
//               </div>
//               <div className="flex flex-col">
//             <span className="font-serif text-xl font-semibold text-foreground">Loam Polytechnic..
//             </span>
//             <span className="text-[10.5px] ">Loamy soil for academic excellence</span>
//             </div>
//           </Link>

//           <div className="hidden lg:flex items-center gap-6">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 to={link.href}
//                 className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           <div className="hidden lg:flex items-center gap-3">
//             <Link to="/contact">
//               <Button className="rounded-full">Contact Us</Button>
//             </Link>
//           </div>

//           <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
//             {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>

//         {isOpen && (
//           <div className="lg:hidden py-4 border-t border-border">
//             <div className="flex flex-col gap-4">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   to={link.href}
//                   className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//               <Link to="/contact" onClick={() => setIsOpen(false)}>
//                 <Button className="rounded-full w-fit">Contact Us</Button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   )
// }




import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { Button } from "../ui/button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/admissions", label: "Admissions" },
  { href: "/academics", label: "Academics" },
  { href: "/student-life", label: "Student Life" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const activeClass =
    "text-primary border-b-2 border-primary"

  const normalClass =
    "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-md border-b border-border">
      <nav className="mx-auto px-4 lg:px-4">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
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

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `${normalClass} ${isActive ? activeClass : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop button */}
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

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
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
