import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PortalSidebar } from "./PortalSidebar"
import { PortalTopbar } from "./PortalTopbar"
import { clearPortalSession } from "../../lib/portal-auth"

export function PortalShell({
  title,
  subtitle,
  sessionLabel,
  links,
  items,
  logoutItem,
  user,
  children,
  footer,
  showThemeToggle = false,
  searchPlaceholder = "",
}) {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const shellClassName = useMemo(
    () =>
      darkMode
        ? "bg-[#1d1614] text-[#f6ede3]"
        : "bg-[radial-gradient(circle,_rgba(137,110,86,0.18)_1.2px,_transparent_1.2px)] [background-size:28px_28px] bg-[#f4f1eb] text-[#4f2015]",
    [darkMode],
  )

  const panelClassName = darkMode ? "bg-[#211917] border-[#372723]" : "bg-[#fbfaf6] border-[#e8ddd0]"
  const contentClassName = darkMode ? "bg-[#261e1b]" : "bg-[#fffdfa]"

  const handleLogout = () => {
    clearPortalSession()
    navigate("/auth/login")
  }

  return (
    <div className={`min-h-screen ${shellClassName}`}>
      <div className="mx-auto max-w-[1500px]">
        <div className={`overflow-hidden border shadow-[0_30px_70px_rgba(75,21,12,0.12)] sm:rounded-[16px] ${panelClassName}`}>
          <div className="flex min-h-screen sm:min-h-[calc(100vh-24px)]">
            <PortalSidebar
              title={title}
              subtitle={subtitle}
              items={items}
              logoutItem={logoutItem}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              onLogout={handleLogout}
            />

            <div className={`flex min-w-0 flex-1 flex-col ${contentClassName}`}>
              <PortalTopbar
                sessionLabel={sessionLabel}
                links={links}
                user={user}
                onMenuClick={() => setSidebarOpen(true)}
                showThemeToggle={showThemeToggle}
                darkMode={darkMode}
                onThemeToggle={() => setDarkMode((value) => !value)}
                searchPlaceholder={searchPlaceholder}
              />
              <main className="flex-1 px-3 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6">{children}</main>
              {footer ? (
                <footer className="border-t border-[#efe5db] px-3 py-3 text-[10px] uppercase tracking-[0.12em] text-[#a18f80] sm:px-5 lg:px-6">
                  {footer}
                </footer>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
