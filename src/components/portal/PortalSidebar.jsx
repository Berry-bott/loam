import { Link, NavLink } from "react-router-dom"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"

export function PortalSidebar({
  title,
  subtitle,
  items,
  logoutItem,
  logo = "/school-logo.jpeg",
  isOpen = false,
  onClose,
  onLogout,
}) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[#2b0704]/40 backdrop-blur-sm transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full w-[86vw] max-w-[284px] flex-col overflow-hidden bg-[#61100c] text-white transition-transform lg:static lg:z-auto lg:h-full lg:w-[260px] lg:max-w-none lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Loam Poly"
              className="h-11 w-11 rounded-[4px] border border-white/20 object-cover"
            />
            <div>
              <p className="text-[16px] font-bold uppercase tracking-tight">{title}</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/55">{subtitle}</p>
            </div>
          </Link>
          <button
            className="rounded-md border border-white/15 p-2 text-white/80 lg:hidden"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/student-dashboard" || item.to === "/admin-dashboard"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-[3px] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70 transition-colors",
                  isActive ? "bg-[#7c1711] text-white" : "hover:bg-white/8 hover:text-white",
                )
              }
              onClick={onClose}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/10 px-3 py-4">
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-[3px] px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70 transition-colors hover:bg-white/8 hover:text-white"
          >
            <logoutItem.icon className="h-4 w-4" />
            <span>{logoutItem.label}</span>
          </button>
        </div>
      </aside>
    </>
  )
}
